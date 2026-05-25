# Cloudflare Worker 자동 배포 스크립트
# 사용법: .\deploy-worker.ps1

$ACCOUNT_ID = "9ba6054d0b8a97457cd23dfe558e915e"
$WORKER_NAME = "lucky-multilang"
$SCRIPT_PATH = "$PSScriptRoot\worker-seo-template.js"

# API 토큰 (환경변수로 관리 권장: $env:CF_TOKEN)
$TOKEN = if ($env:CF_TOKEN) { $env:CF_TOKEN } else {
    Read-Host "Cloudflare API Token"
}

Write-Host "Deploying $WORKER_NAME ..." -ForegroundColor Cyan

$tmpScript   = "$env:TEMP\worker.js"
$tmpMetadata = "$env:TEMP\cf-metadata.json"

Copy-Item $SCRIPT_PATH $tmpScript -Force
[System.IO.File]::WriteAllText($tmpMetadata, '{"main_module":"worker.js"}', [System.Text.UTF8Encoding]::new($false))

$response = curl.exe -s -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME" `
  -H "Authorization: Bearer $TOKEN" `
  -F "metadata=@$tmpMetadata;type=application/json" `
  -F "worker.js=@$tmpScript;type=application/javascript+module"

$r = $response | ConvertFrom-Json
if ($r.success) {
    Write-Host "✓ 배포 성공: $($r.result.id)" -ForegroundColor Green
} else {
    Write-Host "✗ 배포 실패:" -ForegroundColor Red
    Write-Host ($r.errors | ConvertTo-Json -Depth 3)
}

Remove-Item $tmpScript, $tmpMetadata -Force -ErrorAction SilentlyContinue
