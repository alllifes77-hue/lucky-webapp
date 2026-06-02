# ── 배포 설정 예시 ──────────────────────────────────────────
# 이 파일을 deploy.config.ps1 로 복사한 뒤 값을 채우세요.
# deploy.config.ps1 은 .gitignore 에 등록되어 git 에 올라가지 않습니다.
#
#   Copy-Item deploy.config.example.ps1 deploy.config.ps1
#
# 값을 비워두면 deploy-all.ps1 실행 시 그 단계는 건너뜁니다.

# Cloudflare ─ 워커(SEO 래퍼) 배포용 API 토큰
# 발급: https://dash.cloudflare.com/profile/api-tokens → "Edit Cloudflare Workers"
$CF_TOKEN   = ""

# SSH ─ all-lifes.com 서버의 /lucky/ 정적 파일 동기화용
$SSH_HOST   = ""            # 예: all-lifes.com  또는  123.45.67.89
$SSH_USER   = ""            # 예: ubuntu / root
$SSH_PATH   = ""            # 예: /var/www/html/lucky
$SSH_PORT   = "22"          # 기본 22
$SSH_KEY    = ""            # (선택) 개인키 파일 경로. 비우면 비밀번호/기본키 사용
