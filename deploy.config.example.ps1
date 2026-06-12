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

# Groq ─ AI 운세 챗봇 주 백엔드 (무료, 매우 빠름). 비우면 Cloudflare AI 폴백만 사용.
# 발급: https://console.groq.com/keys (무료 가입 → Create API Key, gsk_... 형식)
$GROQ_KEY   = ""

# IndexNow ─ Bing·Yandex 즉시 재크롤링용 키 (32자 hex).
# 키 파일을 서버 루트 /{키}.txt 로 업로드해야 함. 비우면 핑 건너뜀.
$INDEXNOW_KEY = ""

# AliExpress 어필리에이트 API (openservice.aliexpress.com 앱 키/시크릿). 비우면 추천상품 패널 미렌더.
$AE_APP_KEY    = ""
$AE_APP_SECRET = ""

# SSH ─ all-lifes.com 서버의 /lucky/ 정적 파일 동기화용
$SSH_HOST   = ""            # 예: all-lifes.com  또는  123.45.67.89
$SSH_USER   = ""            # 예: ubuntu / root
$SSH_PATH   = ""            # 예: /var/www/html/lucky
$SSH_PORT   = "22"          # 기본 22
$SSH_KEY    = ""            # (선택) 개인키 파일 경로. 비우면 비밀번호/기본키 사용
