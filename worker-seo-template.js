// ═══════════════════════════════════════════════════════════
// Cloudflare Worker: lucky-multilang
// Routes:
//   all-lifes.com/*/lucky/   → SEO SSR wrapper (per language)
//   all-lifes.com/lucky-og   → Dynamic SVG OG image
//   all-lifes.com/lucky-sitemap.xml → Sitemap
// ═══════════════════════════════════════════════════════════

const APP_URL  = 'https://lucky.all-lifes.com';
const SITE_URL = 'https://all-lifes.com';
const ALL_LANGS = ['ko','en','ja','de','fr','es','pt','it','id'];

// ── Per-language metadata ────────────────────────────────
const LANGS = {
  en: {
    name:'English', locale:'en_US',
    title:'Lucky Number Generator – Numerology Lottery Numbers from Your Birthday',
    desc:"Generate your personal lucky lottery numbers using numerology and your date of birth. Free Powerball format. Instant, no signup.",
    keywords:'lucky number generator,numerology lucky numbers,birthday lucky numbers,Powerball,life path number',
    h1:'Lucky Number Generator', body:'Numerology · Life Path Number · Powerball Format · 100% Free · Instant Results',
    start:'Generate My Lucky Numbers',
    faq:[
      {q:'How does numerology generate lucky numbers?',a:'Your Life Path Number is calculated by summing all digits of your birth date. Each number has traditionally associated lucky numbers used to bias the Powerball-format generation.'},
      {q:'Will I get the same numbers every time?',a:'Yes — the same birthday always produces the same numbers. The algorithm is deterministic.'},
      {q:'Does this guarantee winning the lottery?',a:'No. Lottery draws are random. This app provides entertainment and cultural insight through numerology.'},
    ],
    faqH2:'FAQ',
    features:['🔢 Life Path Numerology','🎯 Powerball Format','✅ 100% Free','🔒 No Data Stored'],
    ogResultTitle:'🍀 My Lucky Numbers: {numbers}',
    ogResultDesc:'Generated from my birthday using numerology. What are yours?',
  },
  de: {
    name:'Deutsch', locale:'de_DE',
    title:'Glückszahlen Generator – Numerologie EuroMillions aus Ihrem Geburtstag',
    desc:'Erstellen Sie Ihre persönlichen Glückszahlen mit Numerologie und Ihrem Geburtsdatum. EuroMillions-Format, kostenlos.',
    keywords:'Glückszahlen,Numerologie,EuroMillions,Lebenspfadzahl,kostenlos',
    h1:'Glückszahlen Generator', body:'Numerologie · Lebenspfadzahl · EuroMillions · Kostenlos',
    start:'Glückszahlen generieren',
    faq:[
      {q:'Wie funktioniert der Glückszahlen-Generator?',a:'Ihre Lebenspfadzahl wird durch Addition aller Ziffern Ihres Geburtsdatums berechnet. Traditionell zugeordnete Glückszahlen beeinflussen die EuroMillions-Generierung.'},
      {q:'Sind die Zahlen jedes Mal gleich?',a:'Ja — dasselbe Geburtsdatum erzeugt immer dieselben Zahlen.'},
      {q:'Garantiert das einen Gewinn?',a:'Nein. Dies ist Unterhaltung auf Basis von Numerologie.'},
    ],
    faqH2:'Häufige Fragen',
    features:['🔢 Kabalah-Numerologie','🎯 EuroMillions','✅ Kostenlos','🔒 Keine Daten'],
    ogResultTitle:'🍀 Meine Glückszahlen: {numbers}',
    ogResultDesc:'Aus meinem Geburtsdatum per Numerologie generiert. Probier es aus!',
  },
  ja: {
    name:'日本語', locale:'ja_JP',
    title:'幸運の番号 - 九星気学ロト6番号 | 生年月日で引く無料占い',
    desc:'九星気学で本命星を算出し、あなただけの幸運の番号をロト6形式で無料生成。',
    keywords:'幸運の番号,九星気学,ロト6,本命星,ラッキーナンバー,無料',
    h1:'幸運の番号', body:'九星気学 · 本命星 · ロト6形式 · 完全無料',
    start:'幸運の番号を引く',
    faq:[
      {q:'九星気学とは？',a:'生年月日から本命星（一白〜九紫）を算出し、その星の五行属性に応じた幸運の数字を生成する東洋の占術です。'},
      {q:'毎回同じ番号が出ますか？',a:'はい、同じ生年月日からは常に同じ番号が生成されます。'},
      {q:'宝くじ当選を保証しますか？',a:'保証はできません。エンターテインメントとしてお楽しみください。'},
    ],
    faqH2:'よくある質問',
    features:['⭐ 九星気学','🎯 ロト6形式','✅ 完全無料','🔒 データ非保存'],
    ogResultTitle:'🍀 私の幸運番号: {numbers}',
    ogResultDesc:'九星気学で生年月日から生成。あなたも試してみて →',
  },
  fr: {
    name:'Français', locale:'fr_FR',
    title:'Générateur de Numéros Chanceux – Numérologie EuroMillions',
    desc:'Générez vos numéros chanceux avec la numérologie et votre date de naissance. EuroMillions gratuit.',
    keywords:'numéros chanceux,numérologie,EuroMillions,chemin de vie,gratuit',
    h1:'Numéros Chanceux', body:'Numérologie · Chemin de Vie · EuroMillions · 100% Gratuit',
    start:'Générer mes numéros',
    faq:[
      {q:'Comment fonctionne ce générateur ?',a:'Votre numéro de chemin de vie est calculé à partir de votre date de naissance pour générer des numéros chanceux EuroMillions.'},
      {q:'Aurai-je les mêmes numéros chaque fois ?',a:'Oui — la même date produit toujours les mêmes numéros.'},
      {q:'Cela garantit-il un gain ?',a:'Non. Ceci est un divertissement basé sur la numérologie.'},
    ],
    faqH2:'FAQ',
    features:['🔢 Numérologie','🎯 EuroMillions','✅ Gratuit','🔒 Aucune donnée'],
    ogResultTitle:'🍀 Mes numéros chanceux: {numbers}',
    ogResultDesc:'Générés depuis mon anniversaire par numérologie. Essayez →',
  },
  es: {
    name:'Español', locale:'es_ES',
    title:'Generador de Números de la Suerte – Numerología EuroMillions',
    desc:'Genera tus números de la suerte con numerología y tu fecha de nacimiento. EuroMillions gratis.',
    keywords:'números de la suerte,numerología,EuroMillions,camino de vida,gratis',
    h1:'Números de la Suerte', body:'Numerología · Camino de Vida · EuroMillions · 100% Gratis',
    start:'Generar mis números',
    faq:[
      {q:'¿Cómo funciona este generador?',a:'Tu número de camino de vida se calcula desde tu fecha de nacimiento para generar números EuroMillions.'},
      {q:'¿Obtendré los mismos números siempre?',a:'Sí — la misma fecha siempre produce los mismos números.'},
      {q:'¿Garantiza ganar la lotería?',a:'No. Esto es entretenimiento basado en numerología.'},
    ],
    faqH2:'Preguntas Frecuentes',
    features:['🔢 Numerología','🎯 EuroMillions','✅ Gratis','🔒 Sin datos'],
    ogResultTitle:'🍀 Mis números de la suerte: {numbers}',
    ogResultDesc:'Generados desde mi cumpleaños con numerología. ¡Prueba los tuyos →',
  },
  pt: {
    name:'Português', locale:'pt_BR',
    title:'Gerador de Números da Sorte – Numerologia Mega-Sena',
    desc:'Gere seus números da sorte com numerologia e data de nascimento. Formato Mega-Sena grátis.',
    keywords:'números da sorte,numerologia,Mega-Sena,caminho de vida,grátis',
    h1:'Números da Sorte', body:'Numerologia · Caminho de Vida · Mega-Sena · 100% Grátis',
    start:'Gerar meus números',
    faq:[
      {q:'Como funciona o gerador?',a:'Seu número do caminho de vida é calculado a partir da data de nascimento para gerar números Mega-Sena.'},
      {q:'Terei os mesmos números sempre?',a:'Sim — a mesma data sempre produz os mesmos números.'},
      {q:'Garante ganhar na loteria?',a:'Não. Este é um entretenimento baseado em numerologia.'},
    ],
    faqH2:'Perguntas Frequentes',
    features:['🔢 Numerologia','🎯 Mega-Sena','✅ Grátis','🔒 Sem dados'],
    ogResultTitle:'🍀 Meus números da sorte: {numbers}',
    ogResultDesc:'Gerados do meu aniversário com numerologia. Gere os seus →',
  },
  it: {
    name:'Italiano', locale:'it_IT',
    title:'Generatore di Numeri Fortunati – Numerologia SuperEnalotto',
    desc:'Genera i tuoi numeri fortunati con la numerologia e la tua data di nascita. Formato SuperEnalotto gratis.',
    keywords:'numeri fortunati,numerologia,SuperEnalotto,percorso di vita,gratis',
    h1:'Numeri Fortunati', body:'Numerologia · Percorso di Vita · SuperEnalotto · 100% Gratis',
    start:'Genera i miei numeri',
    faq:[
      {q:'Come funziona questo generatore?',a:'Il tuo numero del percorso di vita viene calcolato dalla data di nascita per generare numeri SuperEnalotto.'},
      {q:'Otterrò gli stessi numeri ogni volta?',a:'Sì — la stessa data produce sempre gli stessi numeri.'},
      {q:'Garantisce una vincita?',a:'No. Questo è intrattenimento basato sulla numerologia.'},
    ],
    faqH2:'Domande Frequenti',
    features:['🔢 Numerologia','🎯 SuperEnalotto','✅ Gratis','🔒 Nessun dato'],
    ogResultTitle:'🍀 I miei numeri fortunati: {numbers}',
    ogResultDesc:'Generati dal mio compleanno con numerologia. Prova i tuoi →',
  },
  id: {
    name:'Indonesia', locale:'id_ID',
    title:'Generator Angka Keberuntungan – Togel 4D dari Weton Kalender Jawa',
    desc:'Dapatkan angka Togel 4D dari Weton kalender Jawa berdasarkan tanggal lahir. Gratis, tanpa daftar.',
    keywords:'angka keberuntungan,togel 4D,weton jawa,kalender jawa,angka hoki,gratis',
    h1:'Angka Keberuntungan', body:'Weton Jawa · Kalender Jawa · Togel 4D · 100% Gratis',
    start:'Cari Angka Hoki',
    faq:[
      {q:'Apa itu Weton?',a:'Weton adalah kombinasi hari Masehi dengan hari pasaran Jawa (Legi, Pahing, Pon, Wage, Kliwon), digunakan untuk prediksi Togel dalam primbon Jawa.'},
      {q:'Apakah angkanya selalu sama?',a:'Ya — tanggal lahir yang sama selalu menghasilkan angka yang sama.'},
      {q:'Apakah menjamin menang Togel?',a:'Tidak. Ini adalah hiburan berdasarkan kearifan lokal.'},
    ],
    faqH2:'Pertanyaan Umum',
    features:['🔮 Weton Jawa','🎯 Togel 4D','✅ Gratis','🔒 Data Aman'],
    ogResultTitle:'🍀 Angka hoki saya: {numbers}',
    ogResultDesc:'Dari tanggal lahir berdasarkan Weton Jawa. Coba punya kamu →',
  },
};

// ── OG Image Generator ───────────────────────────────────
function generateOGImage(numbers, lang) {
  const L = LANGS[lang] || LANGS.en;
  const nums = (numbers || '7 15 22 31 38 42').split(/[\s,]+/).filter(Boolean).slice(0, 7);

  const BALL_COLORS = [
    {bg:'#d97706',shadow:'#92400e'},
    {bg:'#1d4ed8',shadow:'#1e3a8a'},
    {bg:'#dc2626',shadow:'#7f1d1d'},
    {bg:'#374151',shadow:'#111827'},
    {bg:'#059669',shadow:'#064e3b'},
    {bg:'#7c3aed',shadow:'#4c1d95'},
    {bg:'#db2777',shadow:'#831843'},
  ];

  const ballsSvg = nums.map((n, i) => {
    const c = BALL_COLORS[i % BALL_COLORS.length];
    const x = 180 + i * 130;
    return `
      <circle cx="${x}" cy="370" r="52" fill="${c.bg}" filter="url(#shadow)"/>
      <circle cx="${x}" cy="358" r="52" fill="${c.bg}"/>
      <circle cx="${x - 14}" cy="348" r="18" fill="rgba(255,255,255,0.22)"/>
      <text x="${x}" y="366" font-family="Arial Black,Arial" font-size="${n.length > 1 ? 32 : 36}" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">${n}</text>
    `;
  }).join('');

  const appName = { ko:'행운의 번호', ja:'幸運の番号', en:'Lucky Numbers', de:'Glückszahlen',
    fr:'Numéros Chanceux', es:'Números de la Suerte', pt:'Números da Sorte', it:'Numeri Fortunati', id:'Angka Keberuntungan' };
  const tagline = { ko:'생년월일로 뽑는 나만의 번호', ja:'生年月日から引く幸運の番号', en:'Generated from your birthday',
    de:'Aus Ihrem Geburtstag', fr:'Depuis votre anniversaire', es:'Desde tu cumpleaños',
    pt:'Do seu aniversário', it:'Dal tuo compleanno', id:'Dari tanggal lahir Anda' };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#1e1b4b"/>
    <stop offset="50%" stop-color="#312e81"/>
    <stop offset="100%" stop-color="#4c1d95"/>
  </linearGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.5)"/>
  </filter>
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<circle cx="1050" cy="80" r="200" fill="#7c3aed" fill-opacity="0.07"/>
<circle cx="100" cy="520" r="160" fill="#d97706" fill-opacity="0.06"/>
<rect x="0" y="0" width="8" height="630" fill="#d97706"/>
<text x="58" y="56" font-family="Arial,Helvetica" font-size="16" font-weight="700" letter-spacing="3" fill="#c4b5fd" opacity="0.9">🍀 ${(appName[lang] || appName.en).toUpperCase()}</text>
<text x="1148" y="56" font-family="Arial,Helvetica" font-size="15" fill="#6366f1" text-anchor="end" opacity="0.8">all-lifes.com</text>
<text x="600" y="170" font-family="Arial Black,Arial" font-size="52" font-weight="900" fill="white" text-anchor="middle" filter="url(#glow)">🍀</text>
<text x="600" y="248" font-family="Arial Black,Arial" font-size="38" font-weight="900" fill="white" text-anchor="middle">${appName[lang] || appName.en}</text>
<text x="600" y="296" font-family="Arial,Helvetica" font-size="18" fill="#c4b5fd" text-anchor="middle" opacity="0.9">${tagline[lang] || tagline.en}</text>
${ballsSvg}
<rect x="0" y="618" width="1200" height="12" fill="#d97706" opacity="0.3"/>
</svg>`;
}

// ── Escape HTML ──────────────────────────────────────────
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── Main fetch handler ───────────────────────────────────
export default {
  async fetch(request) {
    const url  = new URL(request.url);
    const path = url.pathname;

    // ── Sitemap ──────────────────────────────────────────
    if (path === '/lucky-sitemap.xml') {
      const lastmod = '2026-05-13';
      const locs = [
        { lang:'ko', loc:`${SITE_URL}/lucky/` },
        ...['en','ja','de','fr','es','pt','it','id'].map(l => ({ lang:l, loc:`${SITE_URL}/${l}/lucky/` })),
      ];
      const alts = locs.map(l =>
        `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${l.loc}"/>`
      ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/lucky/"/>`;

      const urlsXml = locs.map((l, i) => `  <url>
    <loc>${l.loc}</loc>
${alts}
    <changefreq>weekly</changefreq>
    <priority>${i === 0 ? '1.0' : '0.9'}</priority>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n');

      return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>`, { headers:{'Content-Type':'application/xml;charset=UTF-8','Cache-Control':'public,max-age=86400'} });
    }

    // ── OG Image (/lucky-og?numbers=7,15,22&lang=ko) ────
    if (path === '/lucky-og' || path === '/lucky-og/') {
      const p = url.searchParams;
      const svg = generateOGImage(p.get('numbers') || '', p.get('lang') || 'en');
      return new Response(svg, {
        headers: { 'Content-Type':'image/svg+xml', 'Cache-Control':'public,max-age=3600', 'Access-Control-Allow-Origin':'*' }
      });
    }

    // ── Language lucky pages (/en/lucky/, /ja/lucky/, etc.) ─
    const match = path.match(/^\/([a-z]{2})\/lucky/);
    if (!match) return fetch(request);
    const lang = match[1];
    if (!LANGS[lang]) return fetch(request);

    const L = LANGS[lang];
    const p = url.searchParams;
    const canonical = `${SITE_URL}/${lang}/lucky/`;

    // Result share params
    const isShare = p.get('y') && p.get('m') && p.get('dy');
    const sharedNums = p.get('nums') || '';

    let ogTitle, ogDesc, ogImage;
    if (isShare && sharedNums) {
      ogTitle = (L.ogResultTitle || '🍀 Lucky Numbers: {numbers}').replace('{numbers}', sharedNums);
      ogDesc  = L.ogResultDesc || L.desc;
      ogImage = `${SITE_URL}/lucky-og?numbers=${encodeURIComponent(sharedNums)}&lang=${lang}`;
    } else {
      ogTitle = L.title;
      ogDesc  = L.desc;
      ogImage = `${APP_URL}/og-${lang}.png`;
    }

    const iframeSrc = `${APP_URL}/?lang=${lang}${isShare ? `&y=${p.get('y')}&m=${p.get('m')}&dy=${p.get('dy')}` : ''}`;

    const hreflangs = ALL_LANGS.map(l => {
      const href = l === 'ko' ? `${SITE_URL}/lucky/` : `${SITE_URL}/${l}/lucky/`;
      return `<link rel="alternate" hreflang="${l}" href="${href}">`;
    }).join('\n    ');

    const appSchema = JSON.stringify({
      "@context":"https://schema.org","@type":"WebApplication",
      "name":L.h1,"description":L.desc,"url":canonical,
      "applicationCategory":"EntertainmentApplication","inLanguage":lang,
      "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
      "operatingSystem":"Web"
    });
    const faqSchema = JSON.stringify({
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity":L.faq.map(f=>({
        "@type":"Question","name":f.q,
        "acceptedAnswer":{"@type":"Answer","text":f.a}
      }))
    });

    const featuresHtml = L.features.map(f => `<span class="chip">${f}</span>`).join('');
    const faqHtml = L.faq.map(f =>
      `<div class="faq-item"><div class="faq-q">${esc(f.q)}</div><div class="faq-a">${esc(f.a)}</div></div>`
    ).join('');
    const langBarHtml = ALL_LANGS.map(l => {
      const href = l === 'ko' ? `${SITE_URL}/lucky/` : `${SITE_URL}/${l}/lucky/`;
      const name = l === 'ko' ? '한국어' : (LANGS[l] ? LANGS[l].name : l.toUpperCase());
      return `<a href="${href}"${l === lang ? ' class="active"' : ''}>${name}</a>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1378943893051810" crossorigin="anonymous"></script>
<title>${esc(ogTitle)}</title>
<meta name="description" content="${esc(ogDesc)}">
<meta name="keywords" content="${esc(L.keywords)}">
<link rel="canonical" href="${esc(canonical)}">
${hreflangs}
<meta property="og:title"       content="${esc(ogTitle)}">
<meta property="og:description" content="${esc(ogDesc)}">
<meta property="og:url"         content="${esc(canonical)}">
<meta property="og:type"        content="website">
<meta property="og:locale"      content="${L.locale}">
<meta property="og:image"       content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${esc(ogTitle)}">
<meta name="twitter:description" content="${esc(ogDesc)}">
<meta name="twitter:image"       content="${esc(ogImage)}">
<script type="application/ld+json">${appSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;color:#1c1917;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#4c1d95);color:#fff;padding:28px 20px 22px;text-align:center;}
.hero h1{font-size:clamp(20px,3.5vw,34px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#c4b5fd;max-width:540px;margin:0 auto 14px;line-height:1.6;}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-bottom:18px;}
.chip{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:4px 13px;font-size:12px;color:#e0e7ff;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:14px;padding:12px 28px;border-radius:50px;text-decoration:none;box-shadow:0 4px 18px rgba(217,119,6,0.4);}
.lang-bar{background:#1e1b4b;padding:7px 20px;text-align:center;font-size:12px;}
.lang-bar a{color:#a5b4fc;text-decoration:none;margin:0 5px;}
.lang-bar a:hover{color:#fff;}
.lang-bar a.active{color:#fbbf24;font-weight:700;}
iframe{width:100%;border:none;display:block;min-height:900px;transition:height 0.2s ease;}
.seo-section{background:#fff;border-top:1px solid #e7e5e4;padding:36px 20px;}
.seo-section .inner{max-width:760px;margin:0 auto;}
.seo-section h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:20px;}
.faq-item{border-bottom:1px solid #e7e5e4;padding:14px 0;}
.faq-item:last-child{border-bottom:none;}
.faq-q{font-size:14px;font-weight:700;color:#1c1917;margin-bottom:5px;}
.faq-a{font-size:13px;color:#78716c;line-height:1.7;}
</style>
</head>
<body>
<div class="hero">
  <h1>${esc(L.h1)}</h1>
  <p>${esc(L.body)}</p>
  <div class="chips">${featuresHtml}</div>
  <a class="start-btn" href="${esc(iframeSrc)}">${esc(L.start)}</a>
</div>
<div class="lang-bar">${langBarHtml}</div>
<iframe id="lucky-frame" src="${esc(iframeSrc)}" scrolling="no" title="${esc(L.h1)}"></iframe>
<div class="seo-section">
  <div class="inner">
    <h2>${esc(L.faqH2)}</h2>
    ${faqHtml}
  </div>
</div>
<script>
(function(){
  var f = document.getElementById('lucky-frame');
  window.addEventListener('message', function(e){
    if(e.data && e.data.type === 'lucky-resize' && e.data.height > 200){
      f.style.height = (e.data.height + 40) + 'px';
    }
  });
  // Fallback: expand iframe after load if no message received
  f.addEventListener('load', function(){
    setTimeout(function(){
      if(parseInt(f.style.height) < 600){
        f.style.height = '1000px';
      }
    }, 1500);
  });
})();
</script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type':'text/html;charset=UTF-8',
        'Cache-Control': isShare ? 'public,max-age=300' : 'public,max-age=3600',
        'X-Robots-Tag':'index,follow'
      }
    });
  }
};
