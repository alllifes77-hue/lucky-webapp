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

    # 바인딩: AI(폴백) + (있으면) Groq 시크릿. 시크릿은 매 배포 시 로컬 config 에서 재설정됨.
    $bindings = '{"type":"ai","name":"AI"}'
    if ($GROQ_KEY) {
      $gk = $GROQ_KEY -replace '\\','\\' -replace '"','\"'
      $bindings += ',{"type":"secret_text","name":"GROQ_KEY","text":"' + $gk + '"}'
      Write-Host "  (Groq 시크릿 포함)" -ForegroundColor Gray
    } else {
      Write-Host "  (GROQ_KEY 미설정 → Cloudflare AI 폴백만 사용)" -ForegroundColor Gray
    }
    $metaJson = '{"main_module":"worker.js","bindings":[' + $bindings + ']}'
    [System.IO.File]::WriteAllText($tmpMetadata, $metaJson, [System.Text.UTF8Encoding]::new($false))

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
    # 서버에 올리지 않을 항목 (개발 도구 / 메타 / 워커 소스)
    $blockDirs  = @(".git",".github","node_modules",".claude")
    $blockNames = @("worker-seo-template.js","robots-server.txt")
    $blockPats  = @("*.ps1","generate-*.html","wordpress-*.html","deploy.config*","*.md",".gitignore")

    # staging 으로 배포 대상만 모음
    $stage = Join-Path $env:TEMP "lucky-deploy-stage"
    if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
    New-Item -ItemType Directory -Path $stage -Force | Out-Null

    Get-ChildItem -Path $root -Force | Where-Object {
      $name = $_.Name
      if ($_.PSIsContainer -and ($blockDirs -contains $name)) { return $false }
      if ($blockNames -contains $name) { return $false }
      foreach ($pat in $blockPats) { if ($name -like $pat) { return $false } }
      return $true
    } | ForEach-Object { Copy-Item $_.FullName $stage -Recurse -Force }

    # tar 파일을 로컬에 만든 뒤 scp 전송 (PowerShell 파이프 바이너리 손상 방지)
    $tmpTar  = Join-Path $env:TEMP "lucky-deploy.tar.gz"
    if (Test-Path $tmpTar) { Remove-Item $tmpTar -Force }
    Push-Location $stage
    tar czf $tmpTar *
    Pop-Location

    $sshOpts = @("-p", $SSH_PORT, "-o", "StrictHostKeyChecking=accept-new")
    $scpOpts = @("-P", $SSH_PORT, "-o", "StrictHostKeyChecking=accept-new")
    if ($SSH_KEY) { $sshOpts += @("-i", $SSH_KEY); $scpOpts += @("-i", $SSH_KEY) }

    $target  = "$SSH_USER@$SSH_HOST"
    $remoteTar = "/tmp/lucky-deploy.tar.gz"
    Say "  전송 중 → ${target}:$SSH_PATH" "Gray"

    & scp @scpOpts $tmpTar "${target}:$remoteTar"
    $code = $LASTEXITCODE
    if ($code -eq 0) {
      & ssh @sshOpts $target "mkdir -p '$SSH_PATH' && tar xzf '$remoteTar' -C '$SSH_PATH' && rm -f '$remoteTar'"
      $code = $LASTEXITCODE
    }

    Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue
    Remove-Item $tmpTar -Force -ErrorAction SilentlyContinue

    if ($code -eq 0) { Ok "서버 파일 동기화 완료" }
    else { Warn "SSH 동기화 실패 (exit $code) — HOST/USER/KEY/PATH 확인" }
  }
} else { Warn "[3/4] 동기화 단계 건너뜀 (-SkipSync)" }

# ── 4) 사이트맵 확인 + IndexNow 핑 ──────────────────────────
# (Google 은 robots.txt 의 Sitemap 라인으로 자동 발견. IndexNow 는 Bing·Yandex 즉시 재크롤링)
Say "`n[4/4] 사이트맵 확인 + IndexNow 핑"
try {
  $sm = Invoke-WebRequest -Uri "https://all-lifes.com/lucky-sitemap.xml" -UseBasicParsing -TimeoutSec 15
  Ok "사이트맵 응답 ($($sm.StatusCode))"
  if ($INDEXNOW_KEY) {
    $inUrls = [regex]::Matches($sm.Content, '<loc>([^<]+)</loc>') | ForEach-Object { $_.Groups[1].Value }
    $inPayload = @{ host="all-lifes.com"; key=$INDEXNOW_KEY; keyLocation="https://all-lifes.com/$INDEXNOW_KEY.txt"; urlList=$inUrls } | ConvertTo-Json -Depth 3
    $inFile = Join-Path $env:TEMP "indexnow-deploy.json"
    [System.IO.File]::WriteAllText($inFile, $inPayload, [System.Text.UTF8Encoding]::new($false))
    $inCode = curl.exe -s -o "$env:TEMP\indexnow-resp.txt" -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" -H "Content-Type: application/json; charset=utf-8" --data "@$inFile" --max-time 40
    Remove-Item $inFile -Force -ErrorAction SilentlyContinue
    if ($inCode -eq "200" -or $inCode -eq "202") { Ok "IndexNow 핑 완료 ($($inUrls.Count)개 URL, HTTP $inCode)" }
    else { Warn "IndexNow 핑 실패 (HTTP $inCode — 키 검증 대기 중이면 다음 배포 때 자동 재시도)" }
  } else { Warn "INDEXNOW_KEY 미설정 → IndexNow 핑 건너뜀" }
} catch { Warn "사이트맵/IndexNow 단계 실패 (무시 가능): $($_.Exception.Message)" }

Say "`n=== 배포 완료 ===" "Green"
