# ═══════════════════════════════════════════════════════════
# all-lifes.com 행운 웹앱 ─ 통합 배포 스크립트
# 로컬에서 수정 → 이 스크립트 한 번이면 모두 반영됩니다:
#   1) GitHub 에 커밋 & push
#   2) Cloudflare Worker (SEO 래퍼) 배포
#   3) 서버 /lucky/ 정적 파일 SSH 동기화
#   4) Google 사이트맵 핑
#
# 사용법:
#   .\deploy-all.ps1                  # 변경분을 기본 메시지로 커밋 후 전체 배포
#   .\deploy-all.ps1 -m "수정 내용"    # 커밋 메시지 지정
#   .\deploy-all.ps1 -SkipGit         # 커밋/푸시 건너뛰기 (배포만)
#
# 인증정보는 deploy.config.ps1 (gitignore 됨) 에서 읽습니다.
# ═══════════════════════════════════════════════════════════
param(
  [Alias('m')][string]$Message = "",
  [switch]$SkipGit,
  [switch]$SkipWorker,
  [switch]$SkipSync
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

function Say($t, $c = "Cyan")  { Write-Host $t -ForegroundColor $c }
function Ok($t)   { Write-Host "  OK  $t" -ForegroundColor Green }
function Warn($t) { Write-Host "  !   $t" -ForegroundColor Yellow }
function Die($t)  { Write-Host "  X   $t" -ForegroundColor Red; exit 1 }

# ── 설정 로드 ────────────────────────────────────────────────
$cfgPath = Join-Path $root "deploy.config.ps1"
if (-not (Test-Path $cfgPath)) {
  Warn "deploy.config.ps1 이 없습니다. 예시 파일을 복사해 만드세요:"
  Write-Host "      Copy-Item deploy.config.example.ps1 deploy.config.ps1" -ForegroundColor Gray
  Die  "설정 파일을 채운 뒤 다시 실행하세요."
}
. $cfgPath

# ── 1) GitHub ───────────────────────────────────────────────
if (-not $SkipGit) {
  Say "`n[1/4] GitHub 커밋 & push"
  Push-Location $root
  $changes = git status --porcelain
  if ($changes) {
    git add -A
    if (-not $Message) { $Message = "update: " + (Get-Date -Format "yyyy-MM-dd HH:mm") }
    git commit -m $Message | Out-Null
    Ok "커밋: $Message"
  } else {
    Warn "변경사항 없음 (커밋 생략)"
  }
  git push origin main
  if ($LASTEXITCODE -ne 0) { Pop-Location; Die "git push 실패" }
  Ok "GitHub push 완료"
  Pop-Location
} else { Warn "[1/4] GitHub 단계 건너뜀 (-SkipGit)" }

# ── 2) Cloudflare Worker ────────────────────────────────────
if (-not $SkipWorker) {
  Say "`n[2/4] Cloudflare Worker 배포"
  if (-not $CF_TOKEN) {
    Warn "CF_TOKEN 미설정 → 워커 배포 건너뜀"
  } else {
    $ACCOUNT_ID  = "9ba6054d0b8a97457cd23dfe558e915e"
    $WORKER_NAME = "lucky-multilang"
    $scriptPath  = Join-Path $root "worker-seo-template.js"

    $tmpScript   = Join-Path $env:TEMP "worker.js"
    $tmpMetadata = Join-Path $env:TEMP "cf-metadata.json"
    Copy-Item $scriptPath $tmpScript -Force
    [System.IO.File]::WriteAllText($tmpMetadata, '{"main_module":"worker.js"}', [System.Text.UTF8Encoding]::new($false))

    $resp = curl.exe -s -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME" `
      -H "Authorization: Bearer $CF_TOKEN" `
      -F "metadata=@$tmpMetadata;type=application/json" `
      -F "worker.js=@$tmpScript;type=application/javascript+module"
    Remove-Item $tmpScript, $tmpMetadata -Force -ErrorAction SilentlyContinue

    $r = $resp | ConvertFrom-Json
    if ($r.success) { Ok "워커 배포 성공: $($r.result.id)" }
    else { Warn "워커 배포 실패: $($r.errors | ConvertTo-Json -Depth 3 -Compress)" }
  }
} else { Warn "[2/4] 워커 단계 건너뜀 (-SkipWorker)" }

# ── 3) 서버 정적 파일 SSH 동기화 ────────────────────────────
if (-not $SkipSync) {
  Say "`n[3/4] 서버 /lucky/ 정적 파일 동기화"
  if (-not $SSH_HOST -or -not $SSH_USER -or -not $SSH_PATH) {
    Warn "SSH 설정 미완성 (HOST/USER/PATH) → 파일 동기화 건너뜀"
  } else {
    # 서버로 보낼 정적 파일 목록 (로컬 도구/메타는 제외)
    $include = @(
      "index.html","lucky-app.js","service-worker.js","lucky-style.css",
      "site.webmanifest","lang"
    )
    # og-*.png, favicon, apple-touch-icon, 썸네일 등 패턴 추가
    $patterns = @("og-*.png","favicon*","apple-touch-icon*","*-thumbnail*.png","Luckynumber.jpg")

    # 존재하는 항목만 staging 으로 모음
    $stage = Join-Path $env:TEMP "lucky-deploy-stage"
    if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
    New-Item -ItemType Directory -Path $stage -Force | Out-Null

    foreach ($i in $include) {
      $p = Join-Path $root $i
      if (Test-Path $p) { Copy-Item $p $stage -Recurse -Force }
    }
    foreach ($pat in $patterns) {
      Get-ChildItem -Path $root -Filter $pat -File -ErrorAction SilentlyContinue |
        ForEach-Object { Copy-Item $_.FullName $stage -Force }
    }

    $sshOpts = @("-p", $SSH_PORT, "-o", "StrictHostKeyChecking=accept-new")
    if ($SSH_KEY) { $sshOpts += @("-i", $SSH_KEY) }

    # tar 스트림으로 디렉토리 구조 보존하며 전송
    $target = "$SSH_USER@$SSH_HOST"
    Push-Location $stage
    Say "  전송 중 → ${target}:$SSH_PATH" "Gray"
    tar czf - * | & ssh @sshOpts $target "mkdir -p '$SSH_PATH' && tar xzf - -C '$SSH_PATH'"
    $code = $LASTEXITCODE
    Pop-Location
    Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue

    if ($code -eq 0) { Ok "서버 파일 동기화 완료" }
    else { Warn "SSH 동기화 실패 (exit $code) — HOST/USER/KEY/PATH 확인" }
  }
} else { Warn "[3/4] 동기화 단계 건너뜀 (-SkipSync)" }

# ── 4) Google 사이트맵 핑 ───────────────────────────────────
Say "`n[4/4] Google 사이트맵 핑"
try {
  $ping = Invoke-WebRequest -Uri "https://www.google.com/ping?sitemap=https://all-lifes.com/lucky-sitemap.xml" -UseBasicParsing -TimeoutSec 10
  Ok "Google 핑 완료 ($($ping.StatusCode))"
} catch { Warn "Google 핑 실패 (무시 가능): $($_.Exception.Message)" }

Say "`n=== 배포 완료 ===" "Green"
