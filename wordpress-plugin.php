<?php
/**
 * Plugin Name: 행운의 번호
 * Plugin URI: https://all-lifes.com
 * Description: 사주팔자·오행 기반 행운의 번호 생성기를 WordPress에 임베드합니다. [lucky_numbers] 단축코드로 사용하세요.
 * Version: 1.0.0
 * Author: JeybeeIcon
 * Author URI: https://all-lifes.com
 * License: GPL v2 or later
 * Text Domain: lucky-numbers
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'LUCKY_VERSION', '1.0.0' );
define( 'LUCKY_APP_URL', 'https://all-lifes.com/lucky' );

function lucky_enqueue_assets() {
    wp_register_style(
        'lucky-numbers-css',
        plugin_dir_url(__FILE__) . 'lucky-style.css',
        [],
        LUCKY_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'lucky_enqueue_assets' );

// 사용법: [lucky_numbers]  또는  [lucky_numbers lang="en"]
function lucky_numbers_shortcode( $atts ) {
    $atts    = shortcode_atts( [ 'lang' => 'ko' ], $atts, 'lucky_numbers' );
    $lang    = sanitize_key( $atts['lang'] );
    $app_src = esc_url( LUCKY_APP_URL . '/?lang=' . $lang );

    wp_enqueue_style( 'lucky-numbers-css' );

    $faqs = [
        ['q'=>'같은 생년월일이면 항상 같은 번호가 나오나요?',
         'a'=>'네, 동일한 생년월일 입력 시 항상 동일한 번호가 생성됩니다. 사주팔자와 오행 계산이 결정론적(deterministic) 알고리즘으로 이루어지기 때문에 「나만의 번호」라는 개념을 구현할 수 있습니다.'],
        ['q'=>'개인정보(생년월일)가 서버에 저장되나요?',
         'a'=>'전혀 저장되지 않습니다. 모든 계산은 브라우저 내(클라이언트 사이드)에서만 이루어지며, 생년월일 데이터는 서버로 전송되지 않습니다.'],
        ['q'=>'이 번호로 실제 로또에 당첨될 수 있나요?',
         'a'=>'로또 추첨은 완전한 무작위(random)이므로 특정 번호의 당첨을 보장할 수 없습니다. 이 앱은 사주팔자·오행 철학을 바탕으로 한 엔터테인먼트 서비스입니다. 책임감 있는 복권 이용을 권장합니다.'],
        ['q'=>'시(時)는 왜 입력하지 않나요?',
         'a'=>'출생 시각은 정확히 모르는 경우가 많아 연주(年柱) 기반으로 오행을 산출합니다. 연주의 천간이 오행 특성을 가장 뚜렷하게 나타내며 행운의 번호 생성에 충분한 변별력을 제공합니다.'],
        ['q'=>'영어, 일본어 등 다른 언어 버전도 있나요?',
         'a'=>'있습니다. 영어(Numerology·Powerball), 일본어(九星気学·ロト6), 독일어·프랑스어·스페인어·이탈리아어(수비학·EuroMillions), 포르투갈어(Mega-Sena), 인도네시아어(Weton·Togel 4D) 버전이 제공됩니다.'],
        ['q'=>'모바일에서도 사용할 수 있나요?',
         'a'=>'네, PC·태블릿·스마트폰 모두에서 동일하게 사용 가능합니다. 별도 앱 설치 없이 브라우저에서 바로 이용하세요.'],
    ];

    ob_start();
?>
<div class="lk-wrap">

  <div class="lk-hero">
    <p class="lk-eyebrow">🍀 무료 행운 번호 생성기</p>
    <h2 class="lk-hero-title">사주팔자로 뽑는 나만의 행운의 번호</h2>
    <p class="lk-hero-sub">생년월일 하나로 천간지지(天干地支)를 계산하고,<br>오행(木火土金水)에 맞는 행운의 로또 번호를 즉시 생성합니다.</p>
    <div class="lk-chips">
      <span class="lk-chip">🔮 사주팔자 알고리즘</span>
      <span class="lk-chip">🎯 로또 6/45</span>
      <span class="lk-chip">✅ 100% 무료</span>
      <span class="lk-chip">🔒 데이터 미저장</span>
    </div>
  </div>

  <div class="lk-app-wrap">
    <iframe id="lk-frame" src="<?php echo $app_src; ?>" scrolling="no" title="사주팔자 행운의 번호 생성기" loading="lazy"></iframe>
  </div>

  <div class="lk-section">
    <h2 class="lk-section-title">사주팔자(四柱八字)로 행운의 번호를 뽑는 원리</h2>
    <p>사주팔자는 태어난 연(年)·월(月)·일(日)·시(時)를 각각 천간(天干)과 지지(地支)로 나타낸 동양 철학의 운명 체계입니다. 이 앱은 생년월일의 <strong>연주(年柱)</strong>를 기준으로 천간지지를 산출하고, 그에 대응하는 <strong>오행 속성</strong>을 추출해 행운의 번호 생성에 반영합니다.</p>
    <p>예를 들어 1990년생의 연주는 <strong>경오(庚午)</strong>로, 천간 庚은 <strong>金(금)</strong> 오행에 해당합니다. 金 오행의 행운 숫자(4·9)는 번호 풀에서 4배 높은 가중치를 가지고, 나머지 번호는 시드 기반 난수로 채워집니다.</p>
    <div class="lk-table-wrap">
      <table class="lk-table">
        <thead><tr><th>천간(天干)</th><th>오행</th><th>행운 숫자</th><th>상징 색</th></tr></thead>
        <tbody>
          <tr><td>甲(갑) · 乙(을)</td><td>🌳 木 (나무)</td><td>3, 8</td><td>청색(靑)</td></tr>
          <tr><td>丙(병) · 丁(정)</td><td>🔥 火 (불)</td><td>2, 7</td><td>적색(赤)</td></tr>
          <tr><td>戊(무) · 己(기)</td><td>🌍 土 (흙)</td><td>5, 0</td><td>황색(黃)</td></tr>
          <tr><td>庚(경) · 辛(신)</td><td>⚙️ 金 (금속)</td><td>4, 9</td><td>백색(白)</td></tr>
          <tr><td>壬(임) · 癸(계)</td><td>💧 水 (물)</td><td>1, 6</td><td>흑색(黑)</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="lk-section">
    <h2 class="lk-section-title">오행(五行)별 행운의 숫자와 의미</h2>
    <p>동양 철학에서 만물은 木·火·土·金·水 다섯 가지 기운으로 이루어집니다. 각 오행은 고유한 행운 숫자와 상징 색을 가지며, 해당 기운이 강한 날이나 상황에서 그 숫자의 에너지가 활성화된다고 전해집니다.</p>
    <div class="lk-ohaeng">
      <div class="lk-oh oh-wood"><div class="oh-icon">🌳</div><div class="oh-name">木 (나무)</div><div class="oh-nums">3 · 8</div><div class="oh-meaning">성장 · 창조</div></div>
      <div class="lk-oh oh-fire"><div class="oh-icon">🔥</div><div class="oh-name">火 (불)</div><div class="oh-nums">2 · 7</div><div class="oh-meaning">열정 · 번영</div></div>
      <div class="lk-oh oh-earth"><div class="oh-icon">🌍</div><div class="oh-name">土 (흙)</div><div class="oh-nums">5 · 0</div><div class="oh-meaning">안정 · 중심</div></div>
      <div class="lk-oh oh-metal"><div class="oh-icon">⚙️</div><div class="oh-name">金 (금속)</div><div class="oh-nums">4 · 9</div><div class="oh-meaning">결실 · 수확</div></div>
      <div class="lk-oh oh-water"><div class="oh-icon">💧</div><div class="oh-name">水 (물)</div><div class="oh-nums">1 · 6</div><div class="oh-meaning">지혜 · 흐름</div></div>
    </div>
  </div>

  <div class="lk-section">
    <h2 class="lk-section-title">이용 방법 — 3단계로 완성</h2>
    <ol class="lk-steps">
      <li>
        <div class="step-num">1</div>
        <div class="step-body"><strong>생년월일 입력</strong><span>위 앱에서 본인의 생년월일(년/월/일)을 선택합니다. 양력 기준이며 1900년부터 현재까지 지원합니다.</span></div>
      </li>
      <li>
        <div class="step-num">2</div>
        <div class="step-body"><strong>행운의 번호 생성</strong><span>「행운의 번호 뽑기」 버튼을 누르면 사주팔자 알고리즘이 오행을 계산하고 2~3초 내에 로또 6/45 번호 6개를 생성합니다.</span></div>
      </li>
      <li>
        <div class="step-num">3</div>
        <div class="step-body"><strong>결과 확인 및 공유</strong><span>번호와 함께 오행 속성, 행운의 색·요일, 재물운 메시지를 확인하세요. 카카오톡·밴드·X(트위터)로 바로 공유 가능합니다.</span></div>
      </li>
    </ol>
  </div>

  <div class="lk-section">
    <h2 class="lk-section-title">자주 묻는 질문</h2>
    <div class="lk-faq">
      <?php foreach ( $faqs as $i => $faq ) : ?>
      <div class="lk-faq-item">
        <button class="lk-faq-q" aria-expanded="false" aria-controls="lk-faq-a-<?php echo $i; ?>">
          <?php echo esc_html( $faq['q'] ); ?>
          <span class="lk-faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="lk-faq-a" id="lk-faq-a-<?php echo $i; ?>" hidden>
          <?php echo esc_html( $faq['a'] ); ?>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="lk-notice">
    ⚠️ <strong>책임감 있는 복권 이용 안내:</strong> 본 서비스는 사주팔자·오행 철학을 활용한 엔터테인먼트 목적의 번호 생성기입니다. 로또 당첨을 보장하지 않으며, 과도한 복권 구매는 삼가 주시기 바랍니다. 도박문제 상담전화: 1336
  </div>

</div>

<script>
(function(){
  window.addEventListener('message', function(e){
    if (e.data && e.data.type === 'lucky-resize') {
      var f = document.getElementById('lk-frame');
      if (f) f.style.height = (e.data.height + 40) + 'px';
    }
  });
  document.querySelectorAll('.lk-faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      var answer   = document.getElementById(this.getAttribute('aria-controls'));
      this.setAttribute('aria-expanded', String(!expanded));
      this.querySelector('.lk-faq-icon').textContent = expanded ? '+' : '－';
      expanded ? answer.setAttribute('hidden','') : answer.removeAttribute('hidden');
    });
  });
})();
</script>
<?php
    return ob_get_clean();
}
add_shortcode( 'lucky_numbers', 'lucky_numbers_shortcode' );

function lucky_admin_menu() {
    add_options_page( '행운의 번호 설정', '행운의 번호', 'manage_options', 'lucky-numbers-settings', 'lucky_settings_page' );
}
add_action( 'admin_menu', 'lucky_admin_menu' );

function lucky_settings_page() { ?>
<div class="wrap">
  <h1>🍀 행운의 번호 설정</h1>
  <h2>사용 방법</h2>
  <ol style="line-height:2.2;">
    <li>원하는 WordPress 페이지 편집기를 엽니다.</li>
    <li><strong>단축코드 블록</strong>을 추가하고 <code>[lucky_numbers]</code>를 입력합니다.</li>
    <li>페이지를 공개하면 행운의 번호 앱과 SEO 콘텐츠가 함께 표시됩니다.</li>
  </ol>
  <h3>단축코드 옵션</h3>
  <table class="widefat" style="max-width:500px;">
    <thead><tr><th>속성</th><th>기본값</th><th>설명</th></tr></thead>
    <tbody>
      <tr><td><code>lang</code></td><td>ko</td><td>언어 코드 (ko / en / ja / de / fr / es / pt / it / id)</td></tr>
    </tbody>
  </table>
  <br>
  <p>플러그인 폴더에 <code>lucky-style.css</code>와 <code>wordpress-plugin.php</code> 두 파일이 함께 있어야 합니다.</p>
</div>
<?php }
