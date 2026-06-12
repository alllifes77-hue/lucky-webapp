// ═══════════════════════════════════════════════════════════
// Cloudflare Worker: lucky-multilang
// Routes:
//   all-lifes.com/*/lucky/        → SEO SSR wrapper (per language)
//   all-lifes.com/lucky-og        → Dynamic SVG OG image
//   all-lifes.com/lucky-sitemap.xml → Sitemap
// ═══════════════════════════════════════════════════════════

const APP_URL  = 'https://all-lifes.com/lucky';
const SITE_URL = 'https://all-lifes.com';
const ALL_LANGS = ['ko','en','ja','de','fr','es','pt','it','id'];

// AI 운세 상담 모델
// 주: Groq(매우 빠름, 무료 14,400req/일) — 워커 시크릿 GROQ_KEY 필요
const GROQ_MODEL          = 'llama-3.1-8b-instant';
// 폴백: Cloudflare Workers AI (외부 키 불필요)
const CHAT_MODEL          = '@cf/meta/llama-3.1-8b-instruct';
const CHAT_MODEL_FALLBACK = '@cf/mistral/mistral-7b-instruct-v0.1';


// ── Per-language SEO metadata ────────────────────────────
const LANGS = {
  en: {
    name:'English', locale:'en_US',
    title:'Lucky Number Generator – Free Numerology Lottery Numbers from Your Birthday | Powerball & Mega Millions',
    desc:'Free lucky number generator using Pythagorean numerology. Enter your birthday to get personal Powerball, Mega Millions & Pick 4 numbers. Life Path Number algorithm — instant, no signup.',
    keywords:'lucky number generator,numerology lucky numbers,Powerball lucky numbers,Mega Millions lucky numbers,birthday lucky numbers,life path number lottery,free lottery numbers,lottery number generator,numerology lottery calculator,personal lucky numbers today,birthday numerology,lucky numbers for lottery,lucky numbers by birthday,free Powerball numbers,Mega Millions number generator',
    h1:'Lucky Number Generator',
    body:'Pythagorean Numerology · Life Path Number · Powerball · Mega Millions · 100% Free',
    start:'Generate My Lucky Numbers',
    intro:'Your date of birth holds a unique numerical blueprint that Pythagorean numerology has studied for over 2,500 years. By calculating your Life Path Number — derived by summing all digits of your birth date — this free generator identifies the numbers that carry the strongest vibrational resonance with your personal frequency. Beyond lucky lottery numbers, the app now delivers four comprehensive fortune categories: Love Fortune, Money Fortune, Career &amp; Success, and Achievement — each with a 0–100 score, detailed reading, actionable advice, and lucky tips personalized to your Sun Sign and Moon Sign (Western astrology). Optionally enter your birth hour for deeper astrological analysis. Add a draw date to unlock a compatibility score, per-number energy heatmap (⭐🌱💧), and Top 3 upcoming draw date recommendations. Supports Powerball, Mega Millions, Pick 4, and Pick 3. Your data never leaves your browser — 100% free, no registration required.',
    whyTitle:'Why Pythagorean Numerology for Lottery Numbers?',
    why:'Pythagorean numerology, founded by the Greek philosopher Pythagoras around 500 BCE, holds that numbers are the fundamental language of the universe and every human being carries a unique numerical signature encoded in their birth date. By reducing your full birth date to a single Life Path Number (1–9) or master number (11, 22, 33), you uncover the vibrational frequency that defines your relationship with luck, opportunity, and fortune. This generator goes beyond a simple weighted picker: when you enter a draw date, it calculates the Universal Day Number (UDN) of that date and measures the resonance gap against your Life Path Number — scoring compatibility from 100% (same number) down to 35% (maximum divergence). The result is shown as a visual gauge, a per-number energy heatmap, and a ranked list of the Top 3 upcoming draw days with the highest compatibility in the next 90 days. Whether you play Powerball every Monday and Saturday, or Mega Millions on Tuesday and Friday, the app finds your personal optimal draw day. Millions of people worldwide use their Life Path Number to make lottery selections and navigate life decisions. Whether you are a devoted numerology enthusiast or simply curious, your birthday-based lucky numbers are waiting to be revealed.',
    howTo:{
      title:'How It Works',
      steps:[
        'Enter your date of birth (year, month, day) in the form.',
        'Choose your focus category: Lucky Numbers, Birth Chart, Love Fortune, Money Fortune, Career, or Achievement.',
        'Select your lottery format: Powerball, Mega Millions, Pick 4, or Pick 3.',
        'Choose how many sets of lucky numbers you want: 1, 3, 5, or 10.',
        'Click "Generate My Lucky Numbers" — receive your personalized results instantly.',
      ]
    },
    faq:[
      {q:'How does numerology generate lucky lottery numbers?',a:'Your Life Path Number is calculated by summing all digits of your full birth date and reducing to a single digit (1–9) or master number (11, 22, 33). Each Life Path Number has traditionally resonant numbers that are weighted 4× more heavily in the Powerball and Mega Millions generation pool, giving them a statistically higher probability of selection.'},
      {q:'What is a Life Path Number?',a:'Your Life Path Number is the most important number in Pythagorean numerology. It is derived by summing all digits of your birth date (e.g., 1985+10+15 → reduce to single digit). It represents your core vibrational frequency and has been linked to specific lucky numbers since antiquity.'},
      {q:'Will I always get the same lucky numbers for the same birthday?',a:'Yes — the same birthday always produces the same lucky numbers. The algorithm is fully deterministic based on your birth date and Life Path Number. Your numerological profile does not change, so your core lucky numbers remain consistent.'},
      {q:'How is this different from a random number generator?',a:'A pure random generator selects all numbers with equal probability. This generator weights your 8–9 resonant lucky numbers 4× higher in the selection pool, so they appear more frequently in your results. The outcome is shaped by your personal numerological profile, not pure chance.'},
      {q:'Which lottery formats are supported?',a:'Powerball (5/69 + 1/26), Mega Millions (5/70 + 1/25), Pick 4 (4 digits 0–9), and Pick 3 (3 digits 0–9). Select your preferred format before generating. You can generate 1, 3, 5, or 10 sets at once.'},
      {q:'What does entering a draw date do?',a:'Entering a draw date unlocks three advanced features. ① Compatibility Score (0–100%): The Universal Day Number (UDN) of the draw date is compared against your Life Path Number — same number = 100%, difference of 1 = 85%, down to 35% for high divergence. The score is shown as a visual gauge (e.g., ████████░░ 85%). ② Number Energy Heatmap: Each drawn number is color-coded — ⭐ gold for numbers resonating with both your birth and draw energies (best match), 🌱 green for birth-energy numbers, 💧 blue for draw-energy numbers. ③ Top 3 Best Draw Dates: The app automatically scans the next 90 days of Powerball and Mega Millions draw days and ranks the top 3 by compatibility score, so you always know the most auspicious upcoming draw day.'},
      {q:'What is the difference between Pythagorean and Chaldean numerology?',a:'Pythagorean numerology assigns numbers 1–9 to the letters A–Z sequentially and is the most widely used Western system. Chaldean numerology, originating in ancient Babylon, assigns numbers 1–8 differently and treats 9 as sacred. This generator uses the Pythagorean system, which is the standard for Life Path Number calculations worldwide.'},
      {q:'Does this guarantee winning the lottery?',a:'No. Lottery draws are completely random events and no system can guarantee a win. This app provides entertainment and cultural insight through the lens of Pythagorean numerology. Please play responsibly and within your means.'},
      {q:'Does entering my birth hour improve the reading?',a:'Yes. When you enter your birth hour, the Moon Sign is calculated using precise astronomical data — the actual ecliptic longitude of the Moon at your exact birth time via astronomy-engine — rather than an approximation. This is especially important if you were born near a sign boundary. The birth hour is optional; without it, the app uses noon (12:00) as the default for Moon Sign calculation.'},
      {q:'What fortune categories are included?',a:'Four fortune categories are provided: Love Fortune, Money Fortune, Career &amp; Success, and Achievement. Each shows a 0–100 score, a detailed personal reading, practical advice, and lucky elements based on your Sun Sign and Moon Sign. Bonus: 5 personalized luck-boosting tips are generated from your zodiac profile. All scores are fully deterministic — the same birthday always produces the same results.'},
    ],
    faqH2:'Frequently Asked Questions',
    features:['🔢 Pythagorean Numerology','⭐ Life Path Number','🎯 Powerball & Mega Millions','✅ 100% Free'],
    ogResultTitle:'🍀 My Lucky Numbers: {numbers}',
    ogResultDesc:'Generated from my birthday using numerology. What are yours?',
  },

  de: {
    name:'Deutsch', locale:'de_DE',
    title:'Glückszahlen Generator – Numerologie EuroMillions & Lotto 6aus49 aus Ihrem Geburtstag | Kostenlos',
    desc:'Kostenloser Glückszahlen-Generator mit pythagoräischer Numerologie. EuroMillions, EuroJackpot & Lotto 6aus49 Zahlen aus Ihrem Geburtsdatum. Sofort, ohne Anmeldung.',
    keywords:'Glückszahlen Generator,Numerologie Glückszahlen,EuroMillions Zahlen Generator,Lotto Zahlen Geburtstag,Lebenspfadzahl Numerologie,kostenlose Glückszahlen,Lottozahlen Generator,EuroJackpot Glückszahlen,persönliche Glückszahlen,Geburtsdatum Glückszahlen,Lotto 6aus49 Zahlen,Glückszahlen heute kostenlos,Lottozahlen Geburtstag,Numerologie Lotto,EuroMillions Generator',
    h1:'Glückszahlen Generator',
    body:'Pythagoräische Numerologie · Lebenspfadzahl · EuroMillions · Lotto 6aus49 · Kostenlos',
    start:'Glückszahlen generieren',
    intro:'Ihr Geburtsdatum enthält einen einzigartigen numerischen Bauplan, den die pythagoräische Numerologie seit über 2.500 Jahren entschlüsselt. Durch die Berechnung Ihrer Lebenspfadzahl identifiziert dieser kostenlose Generator die Zahlen mit der stärksten Schwingungsresonanz. Neben Glückszahlen bietet die App jetzt vier umfassende Glückskategorien: Liebesglück, Geldglück, Karriere &amp; Erfolg und Leistungsglück — jeweils mit einem 0–100-Score, einer detaillierten Deutung und Ratschlägen basierend auf Ihrem Sonnen- und Mondzeichen. Geben Sie optional Ihre Geburtszeit ein für eine präzisere Analyse. Geben Sie das Ziehungsdatum ein für Kompatibilitätsscore (⭐🌱💧) und Top 3 Ziehungstage. Keine Anmeldung, keine Datenspeicherung.',
    whyTitle:'Warum pythagoräische Numerologie für Lotto-Zahlen?',
    why:'Die pythagoräische Numerologie, begründet vom griechischen Philosophen Pythagoras um 500 v. Chr., betrachtet Zahlen als die fundamentale Sprache des Universums. Jeder Mensch trägt eine einzigartige numerische Signatur in seinem Geburtsdatum — die Lebenspfadzahl (1–9 oder Meisterzahl 11, 22, 33) — die seine Schwingungsfrequenz und seine Beziehung zu Glück, Gelegenheit und Reichtum bestimmt. Im deutschsprachigen Raum wird Numerologie seit Jahrhunderten genutzt, um günstige Zahlen für bedeutende Entscheidungen zu ermitteln. Dieser kostenlose Generator geht über einfache Gewichtung hinaus: Bei Eingabe des Ziehungsdatums berechnet er die Universelle Tageszahl (UTZ) dieses Tages und misst die Resonanzlücke zur Lebenspfadzahl — mit einem Kompatibilitätsscore von 100% (gleiche Zahl) bis 35% (maximale Abweichung). Das Ergebnis zeigt eine visuelle Messanzeige, eine Energie-Heatmap pro Zahl und eine Rangliste der Top 3 kommenden Ziehungstage mit der höchsten Kompatibilität. Kein Konto erforderlich, keine persönlichen Daten gespeichert.',
    howTo:{
      title:'So funktioniert es',
      steps:[
        'Geben Sie Ihr Geburtsdatum ein (Jahr, Monat, Tag).',
        'Wählen Sie Ihre Kategorie: Glückszahlen, Horoskop, Liebesglück, Geldglück, Karriere oder Leistungsglück.',
        'Wählen Sie Ihre Lotterie: EuroMillions, EuroJackpot oder Lotto 6aus49.',
        'Wählen Sie 1, 3, 5 oder 10 Tipp-Sets.',
        'Klicken Sie auf "Glückszahlen generieren" — sofortige persönliche Ergebnisse.',
      ]
    },
    faq:[
      {q:'Wie funktioniert der Glückszahlen-Generator?',a:'Ihre Lebenspfadzahl wird durch Addition aller Ziffern Ihres Geburtsdatums berechnet und auf eine einstellige Zahl (1–9) oder Meisterzahl (11, 22, 33) reduziert. Die traditionell mit dieser Zahl verbundenen Glückszahlen werden im Auswahlpool mit 4-facher Gewichtung berücksichtigt — für EuroMillions, EuroJackpot und Lotto 6aus49.'},
      {q:'Was ist eine Lebenspfadzahl?',a:'Die Lebenspfadzahl ist die wichtigste Zahl in der pythagoräischen Numerologie. Sie ergibt sich aus der Summe aller Ziffern Ihres vollständigen Geburtsdatums, reduziert auf 1–9 oder eine Meisterzahl (11, 22, 33). Sie repräsentiert Ihre einzigartige Schwingungsfrequenz und wird seit der Antike mit bestimmten Glückszahlen verknüpft.'},
      {q:'Erhalte ich jedes Mal dieselben Zahlen?',a:'Ja — dasselbe Geburtsdatum erzeugt immer dieselben Glückszahlen. Der Algorithmus ist vollständig deterministisch. Ihr numerologisches Profil ändert sich nicht, daher bleiben Ihre Kernglückszahlen konsistent.'},
      {q:'Welche Lotterien werden unterstützt?',a:'EuroMillions (5/50 + 2/12 Lucky Stars), EuroJackpot (5/50 + 2/10), Lotto 6aus49 (6/49). Wählen Sie Ihr bevorzugtes Format vor der Generierung. Sie können 1, 3, 5 oder 10 Tipp-Sets gleichzeitig erstellen.'},
      {q:'Was ist der Unterschied zwischen Lebenspfadzahl und Schicksalszahl?',a:'Die Lebenspfadzahl ergibt sich aus dem vollständigen Geburtsdatum (Tag + Monat + Jahr) und beschreibt Ihren Lebensweg und Ihre Kernfrequenz. Die Schicksalszahl (auch Ausdruckszahl) wird aus den Buchstabenwerten Ihres vollständigen Namens berechnet und beschreibt Ihre Talente. Für Glückszahlen im Lotto wird primär die Lebenspfadzahl verwendet, da sie unveränderlich ist.'},
      {q:'Was bringt die Eingabe eines Ziehungsdatums?',a:'Die Eingabe des Ziehungsdatums schaltet drei Funktionen frei: ① Kompatibilitätsscore (0–100%): Die Universelle Tageszahl (UTZ) des Ziehungstages wird mit Ihrer Lebenspfadzahl verglichen — gleiche Zahl = 100%, 1 Schritt Differenz = 85%, bis zu 35% bei starker Abweichung. Die Anzeige erfolgt als Balken (z. B. ████████░░ 85%). ② Zahlen-Energie-Heatmap: Jede generierte Zahl erhält eine Farbe — ⭐ Gold (beide Energien), 🌱 Grün (Geburtsenergie), 💧 Blau (Ziehungsenergie). ③ Top 3 beste Ziehungstage: Die App scannt automatisch die nächsten 90 Tage aller EuroMillions/EuroJackpot/Lotto-Ziehungen und empfiehlt die 3 Tage mit dem höchsten Kompatibilitätsscore für Ihre persönliche Frequenz.'},
      {q:'Garantiert das einen Lottogewinn?',a:'Nein. Lottoziehungen sind vollständig zufällig, und kein System kann einen Gewinn garantieren. Diese App bietet Unterhaltung und kulturellen Einblick durch die Linse der pythagoräischen Numerologie. Bitte spielen Sie verantwortungsvoll.'},
      {q:'Was ändert sich, wenn ich meine Geburtszeit eingebe?',a:'Mit Eingabe der Geburtszeit wird Ihr Mondzeichen anhand präziser astronomischer Daten berechnet — der tatsächlichen ekliptikalen Länge des Mondes zum genauen Geburtszeitpunkt (via astronomy-engine) — statt als Näherungswert. Dies ist besonders wichtig für Personen, die nahe einem Zeichenwechsel geboren wurden. Die Geburtszeit ist optional; ohne Angabe verwendet die App 12:00 Uhr als Standardzeit.'},
      {q:'Welche Glückskategorien sind enthalten?',a:'Vier Kategorien: Liebesglück, Geldglück, Karriere &amp; Erfolg und Leistungsglück. Jede zeigt einen 0–100-Score, eine detaillierte Deutung, praktische Ratschläge und Glückselemente basierend auf Ihrem Sonnen- und Mondzeichen. Bonus: 5 personalisierte Glückstipps nach Ihrem Sternzeichen-Profil. Alle Scores sind vollständig deterministisch — dasselbe Geburtsdatum liefert immer dieselben Ergebnisse.'},
    ],
    faqH2:'Häufig gestellte Fragen',
    features:['🔢 Pythagoräische Numerologie','⭐ Lebenspfadzahl','🎯 EuroMillions & Lotto 6aus49','✅ Kostenlos'],
    ogResultTitle:'🍀 Meine Glückszahlen: {numbers}',
    ogResultDesc:'Aus meinem Geburtsdatum per Numerologie generiert. Probier es aus!',
  },

  ja: {
    name:'日本語', locale:'ja_JP',
    title:'ラッキーナンバー生成器 – 九星気学・誕生日からロト6・ロト7番号 | 無料',
    desc:'九星気学で誕生日からラッキーナンバーを無料生成。ロト6・ロト7・ミニロト・ナンバーズ4対応。本命星から算出、登録不要・即時表示。',
    keywords:'ラッキーナンバー 誕生日,九星気学 宝くじ,ロト6 番号生成,幸運の数字 誕生日,宝くじ当たる番号,無料ラッキーナンバー,本命星 吉数,ロト7 ラッキーナンバー,ミニロト 番号,ナンバーズ4 予想,九星気学 吉数,誕生日 ロト6 番号,ラッキーナンバー 無料,宝くじ番号 生年月日,ナンバーズ3 予想',
    h1:'ラッキーナンバー生成器',
    body:'九星気学 · 本命星 · ロト6 · ロト7 · ナンバーズ4 · 完全無料',
    start:'ラッキーナンバーを引く',
    intro:'あなたの生年月日は、1,200年以上の歴史を持つ九星気学が解き明かす独自の数字の設計図を持っています。生まれ年から本命星（1〜9の星）を算出し、その五行属性（木・火・土・金・水）に基づく吉数を調和加重アルゴリズムで優先的に選択します。さらに本命星と月命星を組み合わせた恋愛運・金運・仕事運・達成運の4カテゴリと九星別秘策5選も提供します。生まれた時刻（任意）を入力すると、より精密な月命星分析が可能になります。抽選日を入力すると相性度（0〜100%）・数字ごとのエネルギー内訳（⭐🌱💧）・おすすめ抽選日 TOP 3 が自動表示されます。登録不要・データ保存なし・完全無料でご利用いただけます。',
    whyTitle:'なぜ九星気学でラッキーナンバーを引くのか？',
    why:'九星気学は、中国の「奇門遁甲」を日本独自に発展させた1,200年以上の歴史を持つ伝統的な占術体系です。九つの星（一白水星〜九紫火星）が9年周期で循環し、生まれ年によって固定された「本命星」が決まります。本命星はその人の五行属性（木・火・土・金・水）を定め、それぞれの五行には伝統的な吉数が対応しています。木星なら3・8系、火星なら2・7系、土星なら5・10系、金星なら4・9系、水星なら1・6系の数字が特に強い共鳴を持ちます。このラッキーナンバー生成器は吉数を単純に4倍重み付けするだけでなく、抽選日分析システムも備えています。抽選日を入力すると日星（日ごとの九星）が計算され、本命星の五行と抽選日の五行の関係を同気（100%）・相生（85%）・受生（75%）・相克（42%）・被克（38%）の5段階で定量化します。さらに今後90日間のロト6・ロト7抽選日を自動スキャンし、相性スコア上位3日間を推薦します。あなたにとって最も縁起の良い抽選回を合理的に選べます。',
    howTo:{
      title:'使い方',
      steps:[
        '生年月日（年・月・日）を入力してください。',
        'カテゴリを選択してください：ラッキーナンバー・命盤鑑定・恋愛運・金運・仕事運・達成運。',
        '宝くじの種類を選択：ロト6、ロト7、ミニロト、ナンバーズ4など。',
        '生成セット数を選択：1、3、5、または10セット。',
        '「ラッキーナンバーを引く」をクリック — 本命星に基づく番号が即座に表示されます。',
      ]
    },
    faq:[
      {q:'九星気学とは何ですか？',a:'九星気学は1,200年以上の歴史を持つ日本の伝統的な占術です。生まれ年から本命星（一白水星〜九紫火星）を算出し、各星の五行属性（木・火・土・金・水）に基づく吉数が宝くじ番号の生成に活用されます。'},
      {q:'本命星はどのように計算されますか？',a:'生まれ年の各桁を合計し、一桁になるまで繰り返し合計します。その数を11から引き、9で割った余りに1を加えた数が本命星です。例：1985年生まれ → 1+9+8+5=23 → 2+3=5 → 11-5=6 → 本命星は六白金星。'},
      {q:'毎回同じ番号が出ますか？',a:'はい — 同じ生年月日からは常に同じ番号が生成されます。アルゴリズムは完全に決定論的で、あなたの本命星に基づいています。'},
      {q:'対応している宝くじの種類は？',a:'ロト6（6/43）、ロト7（7/37）、ミニロト（5/31）、ナンバーズ4（4桁）、ナンバーズ3（3桁）に対応。1、3、5、10セットを一度に生成できます。'},
      {q:'九星気学の本命星は生涯変わりませんか？',a:'はい。本命星は生まれ年によって固定され、生涯変わりません。ただし「月命星」（生まれ月で決まる）や「日命星」（生まれ日で決まる）もあり、それらは追加的な影響を持つとされています。このアプリは最も重要な本命星を使用します。'},
      {q:'抽選日を入力するとどう変わりますか？',a:'抽選日を入力すると3つの機能が追加されます。① 相性度スコア（0〜100%）: 本命星の五行と抽選日の日星を比較。同気＝100%、相生＝85%、受生＝75%、相克＝42%、被克＝38%で定量化し、バー表示（例: ████████░░ 85%）します。② 数字エネルギー内訳: 生成された各数字の由来を色分け — ⭐ 金（生年・抽選日の両方から共鳴）、🌱 緑（生年エネルギー）、💧 青（抽選日エネルギー）。③ おすすめ抽選日 TOP 3: 今後90日間のロト6・ロト7抽選日を自動スキャンし、あなたの本命星との相性スコアが最も高い3日を推薦します。特定の抽選回を狙う際に大変有効です。'},
      {q:'当選を保証しますか？',a:'保証はできません。宝くじは完全な無作為抽選であり、どんなシステムも当選を保証することはできません。このアプリは九星気学の文化的知恵に基づいたエンターテインメントです。責任ある範囲でお楽しみください。'},
      {q:'生まれた時刻を入力すると何が変わりますか？',a:'時刻（0〜23時）を入力すると、月命星が精密な天文計算（astronomy-engineによる実際の月の黄道経度）で算出されます。また月柱は節気（小寒・立春・啓蟄など）の正確な太陽黄道経度に基づいて決定されるため、従来の簡易テーブルより精度が大幅に向上します。時刻は任意入力で、未入力の場合は正午（12時）を基準に計算されます。'},
      {q:'どのような運勢カテゴリがありますか？',a:'恋愛運・金運・仕事運・達成運の4カテゴリを提供しています。本命星と月命星の組み合わせから0〜100点のスコア、詳細な解説、アドバイス、行運要素を算出します。さらに九星別の運気アップ秘策を5つご提供します。同じ生年月日なら常に同じスコアが出る完全決定論的アルゴリズムです。'},
    ],
    faqH2:'よくある質問',
    features:['⭐ 九星気学','🎯 ロト6・ロト7対応','✅ 完全無料','🔒 データ保存なし'],
    ogResultTitle:'🍀 私のラッキーナンバー: {numbers}',
    ogResultDesc:'九星気学で生年月日から生成。あなたも試してみて →',
  },

  fr: {
    name:'Français', locale:'fr_FR',
    title:'Générateur de Numéros Chanceux – Numérologie EuroMillions & Loto depuis votre Anniversaire | Gratuit',
    desc:'Générez vos numéros EuroMillions, Loto & EuroJackpot chanceux grâce à la numérologie pythagoricienne et votre date de naissance. Numéro de chemin de vie — gratuit, instantané, sans inscription.',
    keywords:'générateur numéros chanceux,numérologie EuroMillions,numéros chance anniversaire,chemin de vie numérologie,numéros gratuits loterie,EuroMillions numéros personnalisés,Loto numéros chance,générer numéros chance,numérologie pythagoricienne,loterie anniversaire,numéros EuroMillions gratuits,Loto numéros date naissance,EuroJackpot numéros chance,numéros chanceux aujourd\'hui,numérologie date naissance',
    h1:'Numéros Chanceux',
    body:'Numérologie Pythagoricienne · Chemin de Vie · EuroMillions · Loto · 100% Gratuit',
    start:'Générer mes numéros chanceux',
    intro:'Votre date de naissance renferme un schéma numérique unique que la numérologie pythagoricienne décode depuis plus de 2 500 ans. En calculant votre Nombre de Chemin de Vie, ce générateur gratuit identifie les numéros portant la plus forte résonance vibratoire avec votre fréquence personnelle. Au-delà des numéros de loterie, l\'application fournit désormais quatre catégories de fortune complètes : Amour, Argent, Carrière &amp; Succès, et Réussite — chacune avec un score 0–100, une lecture personnalisée et des conseils basés sur votre Signe Solaire et Signe Lunaire. Ajoutez l\'heure de naissance pour une analyse plus précise. Ajoutez la date du tirage pour un score de compatibilité (⭐🌱💧) et le Top 3 des prochaines dates idéales. Sans inscription, sans données conservées.',
    whyTitle:'Pourquoi utiliser la numérologie pour vos numéros de loterie ?',
    why:'La numérologie pythagoricienne, fondée par le philosophe grec Pythagore vers 500 av. J.-C., postule que les nombres sont le langage fondamental de l\'univers et que chaque être humain possède une signature numérique unique encodée dans sa date de naissance. En France et dans les pays francophones, la numérologie est pratiquée depuis des siècles pour identifier les chiffres porte-bonheur liés à chaque profil de vie. Votre Nombre de Chemin de Vie (1–9 ou nombre maître 11, 22, 33) détermine les numéros avec lesquels vous résonnez le plus fortement. Ce générateur va au-delà d\'une simple pondération : en saisissant la date du tirage, il calcule le Nombre Universel du Jour (NUJ) et mesure l\'écart de résonance avec votre Chemin de Vie, produisant un score de compatibilité de 100% (même nombre) à 35% (divergence maximale). Une jauge visuelle, une carte thermique par numéro et le classement des Top 3 prochaines dates de tirage avec la meilleure compatibilité complètent le tableau. Résultat : des numéros chanceux véritablement personnalisés et une stratégie de date optimale, calculés instantanément depuis votre anniversaire.',
    howTo:{
      title:'Comment ça marche',
      steps:[
        'Saisissez votre date de naissance (année, mois, jour).',
        'Choisissez votre catégorie : Numéros chanceux, Horoscope, Amour, Argent, Carrière ou Réussite.',
        'Choisissez votre loterie : EuroMillions, Loto ou EuroJackpot.',
        'Sélectionnez 1, 3, 5 ou 10 grilles de numéros.',
        'Cliquez sur "Générer mes numéros chanceux" — résultats instantanés basés sur votre Chemin de Vie.',
      ]
    },
    faq:[
      {q:'Comment ce générateur produit-il des numéros chanceux ?',a:'Votre Nombre de Chemin de Vie est calculé en additionnant tous les chiffres de votre date de naissance et en réduisant au chiffre unique (1–9) ou nombre maître (11, 22, 33). Les numéros résonants de ce chemin de vie sont pondérés 4× plus fort dans le pool EuroMillions ou Loto, augmentant leur probabilité statistique de sélection.'},
      {q:'Qu\'est-ce qu\'un Nombre de Chemin de Vie ?',a:'Le Nombre de Chemin de Vie est le chiffre le plus important de la numérologie pythagoricienne. Il est dérivé en additionnant tous les chiffres de votre date de naissance complète et en réduisant à un seul chiffre ou nombre maître. Il représente votre fréquence vibratoire fondamentale et les numéros avec lesquels vous résonnez le plus.'},
      {q:'Aurai-je toujours les mêmes numéros pour la même date ?',a:'Oui — la même date de naissance produit toujours les mêmes numéros. L\'algorithme est entièrement déterministe. Votre profil numérologique ne change pas, donc vos numéros chanceux essentiels restent constants.'},
      {q:'Quelles loteries sont supportées ?',a:'EuroMillions (5/50 + 2/12 Étoiles), Loto (5/49 + 1/10 Chance), EuroJackpot (5/50 + 2/10). Sélectionnez votre format avant la génération. Vous pouvez créer 1, 3, 5 ou 10 grilles simultanément.'},
      {q:'Quelle est la différence entre numérologie pythagoricienne et chaldéenne ?',a:'La numérologie pythagoricienne attribue les chiffres 1–9 aux lettres A–Z de façon séquentielle et calcule le Chemin de Vie à partir du jour, mois et année de naissance. La numérologie chaldéenne, plus ancienne, utilise une attribution différente et traite le 9 comme sacré. Ce générateur utilise le système pythagoricien, référence mondiale pour le calcul du Chemin de Vie.'},
      {q:'Que change l\'ajout d\'une date de tirage ?',a:'Ajouter la date du tirage déverrouille trois fonctionnalités avancées. ① Score de compatibilité (0–100%) : Le Nombre Universel du Jour (NUJ) du tirage est comparé à votre Chemin de Vie — même nombre = 100%, écart de 1 = 85%, jusqu\'à 35% pour un grand écart. L\'affichage en jauge (ex. ████████░░ 85%) rend la comparaison immédiatement lisible. ② Carte thermique d\'énergie : Chaque numéro tiré est coloré — ⭐ or (résonance des deux énergies), 🌱 vert (énergie natale seule), 💧 bleu (énergie du tirage seule). ③ Top 3 des meilleures dates : L\'application scanne automatiquement les 90 prochains jours de tirages EuroMillions/Loto et recommande les 3 dates avec le score de compatibilité le plus élevé pour votre profil.'},
      {q:'Cela garantit-il un gain à la loterie ?',a:'Non. Les tirages de loterie sont des événements entièrement aléatoires et aucun système ne peut garantir un gain. Cette application offre un divertissement basé sur la numérologie pythagoricienne. Jouez de manière responsable.'},
      {q:'Qu\'apporte l\'ajout de l\'heure de naissance ?',a:'En ajoutant votre heure de naissance, le Signe Lunaire est calculé avec des données astronomiques précises — la longitude écliptique réelle de la Lune à votre heure exacte (via astronomy-engine) — plutôt qu\'une approximation. Cela est particulièrement utile si vous êtes né(e) près d\'un changement de signe. L\'heure est facultative ; sans elle, l\'application utilise 12h00 par défaut.'},
      {q:'Quelles catégories de fortune sont incluses ?',a:'Quatre catégories : Chance en amour, Chance financière, Carrière &amp; Succès, et Réussite. Chacune affiche un score 0–100, une lecture détaillée, des conseils pratiques et des éléments porte-bonheur basés sur votre Signe Solaire et Signe Lunaire. En bonus : 5 conseils porte-bonheur personnalisés selon votre profil zodiacal. Tous les scores sont entièrement déterministes — la même date de naissance produit toujours les mêmes résultats.'},
    ],
    faqH2:'Questions Fréquentes',
    features:['🔢 Numérologie Pythagoricienne','⭐ Chemin de Vie','🎯 EuroMillions & Loto','✅ 100% Gratuit'],
    ogResultTitle:'🍀 Mes numéros chanceux : {numbers}',
    ogResultDesc:'Générés depuis mon anniversaire par numérologie. Essayez →',
  },

  es: {
    name:'Español', locale:'es_ES',
    title:'Generador de Números de la Suerte – Numerología EuroMillions & La Primitiva desde tu Cumpleaños | Gratis',
    desc:'Genera tus números EuroMillions, La Primitiva y BonoLoto de la suerte con numerología pitagórica y tu fecha de nacimiento. Número del camino de vida — gratis, instantáneo, sin registro.',
    keywords:'generador números suerte,numerología EuroMillions,números suerte cumpleaños,camino de vida numerología,números gratis lotería,La Primitiva números,EuroMillions números personalizados,BonoLoto números suerte,numerología pitagórica,lotería cumpleaños,números la primitiva fecha nacimiento,EuroMillions números hoy,numerología lotería gratis,números suerte hoy gratis,generador lotería nacimiento',
    h1:'Números de la Suerte',
    body:'Numerología Pitagórica · Camino de Vida · EuroMillions · La Primitiva · 100% Gratis',
    start:'Generar mis números de la suerte',
    intro:'Tu fecha de nacimiento contiene un plano numérico único que la numerología pitagórica ha descifrado durante más de 2.500 años. Calculando tu Número del Camino de Vida, este generador gratuito identifica los números con mayor resonancia vibratoria. Además de números de lotería, la app ofrece cuatro categorías de fortuna: Suerte en amor, Suerte financiera, Carrera &amp; Éxito y Logros — cada una con una puntuación 0–100, lectura detallada y consejos basados en tu Signo Solar y Signo Lunar. Añade tu hora de nacimiento para un análisis más preciso. Añade la fecha del sorteo para compatibilidad (⭐🌱💧) y Top 3 de fechas óptimas. Sin registro, sin datos guardados.',
    whyTitle:'¿Por qué usar la numerología para tus números de lotería?',
    why:'La numerología pitagórica, desarrollada por el filósofo griego Pitágoras hacia el 500 a.C., sostiene que los números son el lenguaje fundamental del universo y que cada ser humano lleva una firma numérica única en su fecha de nacimiento. En España y Latinoamérica, la numerología se ha practicado durante siglos para identificar los números de la suerte asociados a cada perfil de vida. Tu Número del Camino de Vida (1–9 o número maestro 11, 22, 33) determina los números con los que más resonas vibratoriamente. Este generador va más allá de la simple ponderación: al introducir la fecha del sorteo, calcula el Número Universal del Día (NUD) y mide la brecha de resonancia respecto a tu Camino de Vida, produciendo un score de compatibilidad del 100% (mismo número) al 35% (máxima divergencia). El resultado incluye una barra de progreso visual, una visualización energética por número y el ranking de los Top 3 próximos días de sorteo con mayor compatibilidad en los siguientes 90 días. El resultado son números de la suerte verdaderamente personalizados con estrategia de fecha óptima, calculados instantáneamente desde tu cumpleaños.',
    howTo:{
      title:'Cómo funciona',
      steps:[
        'Introduce tu fecha de nacimiento (año, mes, día).',
        'Elige tu categoría: Números, Horóscopo, Amor, Dinero, Carrera o Logros.',
        'Elige tu lotería: EuroMillions, La Primitiva o BonoLoto.',
        'Selecciona 1, 3, 5 o 10 combinaciones de números.',
        'Haz clic en "Generar mis números de la suerte" — resultados instantáneos basados en tu Camino de Vida.',
      ]
    },
    faq:[
      {q:'¿Cómo genera números de la suerte la numerología?',a:'Tu Número del Camino de Vida se calcula sumando todos los dígitos de tu fecha de nacimiento y reduciendo a un dígito único (1–9) o número maestro (11, 22, 33). Los números resonantes de ese camino se ponderan 4× más fuerte en el pool de EuroMillions o La Primitiva, aumentando su probabilidad estadística.'},
      {q:'¿Qué es el Número del Camino de Vida?',a:'El Número del Camino de Vida es el número más importante de la numerología pitagórica. Se deriva sumando todos los dígitos de tu fecha de nacimiento completa y reduciendo a un dígito único. Representa tu frecuencia vibratoria fundamental y los números con los que mejor resonas.'},
      {q:'¿Siempre obtendré los mismos números con la misma fecha?',a:'Sí — la misma fecha de nacimiento siempre produce los mismos números. El algoritmo es completamente determinista basado en tu Camino de Vida. Tu perfil numerológico no cambia.'},
      {q:'¿Qué loterías están soportadas?',a:'EuroMillions (5/50 + 2/12 Estrellas), La Primitiva (6/49), BonoLoto (6/49). Selecciona tu formato antes de generar. Puedes crear 1, 3, 5 o 10 combinaciones a la vez.'},
      {q:'¿Cuál es la diferencia entre numerología pitagórica y caldea?',a:'La numerología pitagórica asigna números del 1 al 9 a las letras A–Z de forma secuencial y es el sistema occidental más extendido. La numerología caldea, originaria del antiguo Babilonia, usa una asignación diferente y considera el 9 como sagrado. Este generador usa el sistema pitagórico, estándar mundial para el cálculo del Camino de Vida.'},
      {q:'¿Qué aporta agregar una fecha de sorteo?',a:'Agregar la fecha del sorteo activa tres funciones avanzadas. ① Puntuación de compatibilidad (0–100%): El Número Universal del Día (NUD) del sorteo se compara con tu Camino de Vida — mismo número = 100%, diferencia de 1 = 85%, hasta 35% para gran divergencia. La puntuación se muestra como barra visual (ej. ████████░░ 85%). ② Mapa de energía por número: Cada número generado muestra un color — ⭐ dorado (ambas energías resuenan), 🌱 verde (sólo energía natal), 💧 azul (sólo energía del sorteo). ③ Top 3 mejores fechas: La app escanea automáticamente los próximos 90 días de sorteos EuroMillions/La Primitiva y recomienda las 3 fechas con mayor puntuación de compatibilidad para tu perfil personal.'},
      {q:'¿Garantiza ganar la lotería?',a:'No. Los sorteos de lotería son eventos completamente aleatorios y ningún sistema puede garantizar un premio. Esta aplicación ofrece entretenimiento e información cultural a través de la numerología pitagórica. Juega de forma responsable.'},
      {q:'¿Qué cambia si introduzco mi hora de nacimiento?',a:'Al introducir tu hora de nacimiento, el Signo Lunar se calcula con datos astronómicos precisos — la longitud eclíptica real de la Luna en tu hora exacta (via astronomy-engine) — en lugar de una aproximación. Esto es especialmente relevante si naciste cerca de un cambio de signo. La hora es opcional; sin ella, la app utiliza las 12:00 como valor predeterminado.'},
      {q:'¿Qué categorías de fortuna se incluyen?',a:'Cuatro categorías: Suerte en amor, Suerte financiera, Carrera &amp; Éxito y Logros. Cada una muestra una puntuación 0–100, lectura detallada, consejos prácticos y elementos de suerte basados en tu Signo Solar y Signo Lunar. Bonus: 5 consejos personalizados de mejora de suerte según tu perfil zodiacal. Todos los resultados son completamente deterministas — la misma fecha de nacimiento siempre produce los mismos resultados.'},
    ],
    faqH2:'Preguntas Frecuentes',
    features:['🔢 Numerología Pitagórica','⭐ Camino de Vida','🎯 EuroMillions & La Primitiva','✅ 100% Gratis'],
    ogResultTitle:'🍀 Mis números de la suerte: {numbers}',
    ogResultDesc:'Generados desde mi cumpleaños con numerología. ¡Prueba los tuyos →',
  },

  pt: {
    name:'Português', locale:'pt_BR',
    title:'Gerador de Números da Sorte – Numerologia Mega-Sena & Lotofácil do seu Aniversário | Grátis',
    desc:'Gere seus números da Mega-Sena, Lotofácil e Quina com numerologia pitagórica e sua data de nascimento. Número do caminho de vida — grátis, instantâneo, sem cadastro.',
    keywords:'gerador números sorte,numerologia Mega-Sena,números sorte aniversário,caminho de vida numerologia,Lotofácil números,Quina números,números grátis loteria,numerologia pitagórica,loteria aniversário,números personalizados sorte,Mega-Sena números hoje,Lotofácil números data nascimento,numerologia loteria grátis,números da sorte hoje grátis,gerador loteria nascimento',
    h1:'Números da Sorte',
    body:'Numerologia Pitagórica · Caminho de Vida · Mega-Sena · Lotofácil · 100% Grátis',
    start:'Gerar meus números da sorte',
    intro:'Sua data de nascimento contém um plano numérico único que a numerologia pitagórica decifra há mais de 2.500 anos. Calculando seu Número do Caminho de Vida, este gerador gratuito identifica os números com maior ressonância vibratória. Além dos números de loteria, o app oferece quatro categorias de fortuna: Sorte no amor, Sorte financeira, Carreira &amp; Sucesso e Conquistas — cada uma com pontuação 0–100, leitura detalhada e dicas baseadas no seu Signo Solar e Signo Lunar. Insira a hora de nascimento para análise mais precisa. Insira a data do sorteio para compatibilidade (⭐🌱💧) e Top 3 de datas ideais. Sem cadastro, sem dados armazenados.',
    whyTitle:'Por que usar numerologia para seus números de loteria?',
    why:'A numerologia pitagórica, desenvolvida pelo filósofo grego Pitágoras por volta de 500 a.C., afirma que os números são a linguagem fundamental do universo e que cada ser humano carrega uma assinatura numérica única codificada em sua data de nascimento. No Brasil e em Portugal, a numerologia é utilizada há séculos para identificar os números da sorte associados a cada perfil de vida. Seu Número do Caminho de Vida (1–9 ou número mestre 11, 22, 33) determina os números com os quais você mais ressoa vibratoriamente. Este gerador vai além da simples ponderação: ao inserir a data do sorteio, ele calcula o Número Universal do Dia (NUD) e mede a diferença de ressonância em relação ao seu Caminho de Vida, produzindo uma pontuação de compatibilidade de 100% (mesmo número) a 35% (máxima divergência). O resultado inclui uma barra visual, um mapa de energia por número e o ranking dos Top 3 próximos dias de sorteio com maior compatibilidade nos próximos 90 dias. Números da sorte verdadeiramente personalizados com estratégia de data ideal, calculados instantaneamente do seu aniversário.',
    howTo:{
      title:'Como funciona',
      steps:[
        'Insira sua data de nascimento (ano, mês, dia).',
        'Escolha sua categoria: Números, Horóscopo, Amor, Dinheiro, Carreira ou Conquistas.',
        'Escolha sua loteria: Mega-Sena, Lotofácil ou Quina.',
        'Selecione 1, 3, 5 ou 10 jogos de números.',
        'Clique em "Gerar meus números da sorte" — resultados instantâneos baseados no seu Caminho de Vida.',
      ]
    },
    faq:[
      {q:'Como a numerologia gera números da sorte?',a:'Seu Número do Caminho de Vida é calculado somando todos os dígitos da sua data de nascimento completa e reduzindo a um único dígito (1–9) ou número mestre (11, 22, 33). Os números ressonantes desse caminho recebem peso 4× maior no pool da Mega-Sena ou Lotofácil, aumentando sua probabilidade estatística de seleção.'},
      {q:'O que é o Número do Caminho de Vida?',a:'O Número do Caminho de Vida é o número mais importante da numerologia pitagórica. É derivado somando todos os dígitos da sua data de nascimento e reduzindo a um único dígito (1–9) ou número mestre (11, 22, 33). Representa sua frequência vibratória fundamental e os números com os quais você mais ressoa.'},
      {q:'Terei sempre os mesmos números para a mesma data?',a:'Sim — a mesma data de nascimento sempre produz os mesmos números. O algoritmo é completamente determinista baseado no seu Caminho de Vida. Seu perfil numerológico não muda.'},
      {q:'Quais loterias são suportadas?',a:'Mega-Sena (6/60), Lotofácil (15/25), Quina (5/80). Selecione seu formato antes de gerar. Você pode criar 1, 3, 5 ou 10 jogos simultaneamente.'},
      {q:'Qual é a diferença entre numerologia pitagórica e caldeia?',a:'A numerologia pitagórica atribui números de 1 a 9 às letras A–Z sequencialmente e é o sistema ocidental mais utilizado. A numerologia caldeia, originária da antiga Babilônia, usa uma atribuição diferente e considera o 9 sagrado. Este gerador usa o sistema pitagórico, padrão mundial para o cálculo do Caminho de Vida.'},
      {q:'O que muda ao adicionar uma data de sorteio?',a:'Adicionar a data do sorteio ativa três funcionalidades avançadas. ① Pontuação de compatibilidade (0–100%): O Número Universal do Dia (NUD) do sorteio é comparado ao seu Caminho de Vida — mesmo número = 100%, diferença de 1 = 85%, até 35% para grande divergência. A pontuação é mostrada como barra visual (ex. ████████░░ 85%). ② Mapa de energia por número: Cada número gerado recebe uma cor — ⭐ dourado (ambas as energias ressoam), 🌱 verde (energia natal), 💧 azul (energia do sorteio). ③ Top 3 melhores datas: O app escaneia automaticamente os próximos 90 dias de sorteios Mega-Sena/Lotofácil e recomenda as 3 datas com maior pontuação de compatibilidade para seu perfil pessoal.'},
      {q:'Isso garante ganhar na loteria?',a:'Não. Os sorteios de loteria são eventos completamente aleatórios e nenhum sistema pode garantir um prêmio. Este aplicativo oferece entretenimento e insights culturais através da numerologia pitagórica. Jogue com responsabilidade.'},
      {q:'O que muda ao inserir minha hora de nascimento?',a:'Ao inserir sua hora de nascimento, o Signo Lunar é calculado com dados astronômicos precisos — a longitude eclíptica real da Lua no seu momento exato de nascimento (via astronomy-engine) — em vez de uma aproximação. Isso é especialmente importante se você nasceu perto de uma mudança de signo. A hora é opcional; sem ela, o app usa o meio-dia (12:00) como padrão.'},
      {q:'Quais categorias de fortuna estão incluídas?',a:'Quatro categorias: Sorte no amor, Sorte financeira, Carreira &amp; Sucesso e Conquistas. Cada uma exibe uma pontuação 0–100, leitura detalhada, conselhos práticos e elementos de sorte baseados no seu Signo Solar e Signo Lunar. Bônus: 5 dicas personalizadas para aumentar a sorte com base no seu perfil zodiacal. Todos os resultados são completamente deterministas — a mesma data de nascimento sempre produz os mesmos resultados.'},
    ],
    faqH2:'Perguntas Frequentes',
    features:['🔢 Numerologia Pitagórica','⭐ Caminho de Vida','🎯 Mega-Sena & Lotofácil','✅ 100% Grátis'],
    ogResultTitle:'🍀 Meus números da sorte: {numbers}',
    ogResultDesc:'Gerados do meu aniversário com numerologia. Gere os seus →',
  },

  it: {
    name:'Italiano', locale:'it_IT',
    title:'Generatore di Numeri Fortunati – Numerologia SuperEnalotto & EuroMillions dal Compleanno | Gratis',
    desc:'Genera i tuoi numeri SuperEnalotto, EuroMillions ed EuroJackpot fortunati con la numerologia pitagorica e la tua data di nascita. Numero del percorso di vita — gratis, istantaneo, senza registrazione.',
    keywords:'generatore numeri fortunati,numerologia SuperEnalotto,numeri fortuna compleanno,percorso vita numerologia,SuperEnalotto numeri personali,EuroMillions numeri,EuroJackpot numeri,numerologia pitagorica,lotteria compleanno,numeri gratis lotteria,SuperEnalotto numeri oggi,EuroMillions numeri data nascita,numerologia lotteria gratis,numeri fortunati oggi gratis,generatore lotteria nascita',
    h1:'Numeri Fortunati',
    body:'Numerologia Pitagorica · Percorso di Vita · SuperEnalotto · EuroMillions · 100% Gratis',
    start:'Genera i miei numeri fortunati',
    intro:'La tua data di nascita racchiude un progetto numerico unico che la numerologia pitagorica decifra da oltre 2.500 anni. Calcolando il tuo Numero del Percorso di Vita, questo generatore gratuito identifica i numeri con la più forte risonanza vibratoria. Oltre ai numeri di lotteria, l\'app fornisce ora quattro categorie di fortuna: Fortuna in amore, Fortuna finanziaria, Carriera &amp; Successo e Realizzazioni — ognuna con un punteggio 0–100, lettura dettagliata e consigli basati sul tuo Segno Solare e Segno Lunare. Inserisci l\'ora di nascita per un\'analisi più precisa. Aggiungi la data dell\'estrazione per compatibilità (⭐🌱💧) e Top 3 date ottimali. Nessuna registrazione, nessun dato conservato.',
    whyTitle:'Perché usare la numerologia per i tuoi numeri della lotteria?',
    why:'La numerologia pitagorica, fondata dal filosofo greco Pitagora intorno al 500 a.C., afferma che i numeri sono il linguaggio fondamentale dell\'universo e che ogni essere umano porta una firma numerica unica codificata nella propria data di nascita. In Italia, la numerologia è praticata da secoli per identificare i numeri fortunati legati a ogni profilo di vita — una tradizione profondamente radicata nella cultura popolare italiana. Il tuo Numero del Percorso di Vita (1–9 o numero maestro 11, 22, 33) determina i numeri con cui risuoni maggiormente. Questo generatore va oltre la semplice ponderazione: inserendo la data dell\'estrazione, calcola il Numero Universale del Giorno (NUG) e misura il divario di risonanza rispetto al tuo Percorso di Vita, producendo un punteggio di compatibilità dal 100% (stesso numero) al 35% (massima divergenza). Il risultato include una barra visuale, una heatmap per numero e la classifica dei Top 3 prossimi giorni di estrazione con la massima compatibilità nei 90 giorni successivi. Numeri fortunati davvero personalizzati con strategia di data ottimale, calcolati istantaneamente dal tuo compleanno.',
    howTo:{
      title:'Come funziona',
      steps:[
        'Inserisci la tua data di nascita (anno, mese, giorno).',
        'Scegli la tua categoria: Numeri, Oroscopo, Amore, Denaro, Carriera o Successo.',
        'Scegli la tua lotteria: SuperEnalotto, EuroMillions o EuroJackpot.',
        'Seleziona 1, 3, 5 o 10 giocate di numeri.',
        'Clicca su "Genera i miei numeri fortunati" — risultati istantanei basati sul tuo Percorso di Vita.',
      ]
    },
    faq:[
      {q:'Come genera numeri fortunati la numerologia?',a:'Il tuo Numero del Percorso di Vita è calcolato sommando tutte le cifre della tua data di nascita completa e riducendo a una singola cifra (1–9) o numero maestro (11, 22, 33). I numeri risonanti di quel percorso ricevono un peso 4× maggiore nel pool SuperEnalotto o EuroMillions, aumentando la loro probabilità statistica.'},
      {q:'Cos\'è il Numero del Percorso di Vita?',a:'Il Numero del Percorso di Vita è il numero più importante nella numerologia pitagorica. È derivato sommando tutte le cifre della data di nascita completa e riducendo a un singolo numero. Rappresenta la tua frequenza vibratoria fondamentale e i numeri con cui risuoni maggiormente.'},
      {q:'Otterrò sempre gli stessi numeri per la stessa data?',a:'Sì — la stessa data di nascita produce sempre gli stessi numeri. L\'algoritmo è completamente deterministico basato sul tuo Percorso di Vita. Il tuo profilo numerologico non cambia nel tempo.'},
      {q:'Quali lotterie sono supportate?',a:'SuperEnalotto (6/90), EuroMillions (5/50 + 2/12 Stelle), EuroJackpot (5/50 + 2/10). Seleziona il tuo formato prima della generazione. Puoi creare 1, 3, 5 o 10 giocate contemporaneamente.'},
      {q:'Qual è la differenza tra numerologia pitagorica e caldea?',a:'La numerologia pitagorica assegna i numeri 1–9 alle lettere A–Z in modo sequenziale ed è il sistema occidentale più diffuso. La numerologia caldea, originaria dell\'antica Babilonia, usa un\'assegnazione diversa e tratta il 9 come sacro. Questo generatore usa il sistema pitagorico, standard mondiale per il calcolo del Percorso di Vita.'},
      {q:'Cosa cambia aggiungendo una data di estrazione?',a:'Aggiungere la data dell\'estrazione sblocca tre funzioni avanzate. ① Punteggio di compatibilità (0–100%): Il Numero Universale del Giorno (NUG) dell\'estrazione viene confrontato con il tuo Percorso di Vita — stesso numero = 100%, differenza di 1 = 85%, fino a 35% per grande divergenza. Il punteggio è visualizzato come barra (es. ████████░░ 85%). ② Heatmap energetica: Ogni numero generato riceve un colore — ⭐ oro (entrambe le energie risuonano), 🌱 verde (energia natale), 💧 blu (energia estrazione). ③ Top 3 date migliori: L\'app scansiona automaticamente i prossimi 90 giorni di estrazioni SuperEnalotto/EuroMillions e consiglia le 3 date con il punteggio di compatibilità più alto per il tuo profilo.'},
      {q:'Garantisce una vincita alla lotteria?',a:'No. Le estrazioni della lotteria sono eventi completamente casuali e nessun sistema può garantire una vincita. Questa app offre intrattenimento e approfondimenti culturali attraverso la numerologia pitagorica. Gioca responsabilmente.'},
      {q:'Cosa cambia inserendo l\'ora di nascita?',a:'Inserendo l\'ora di nascita, il Segno Lunare viene calcolato con dati astronomici precisi — la longitudine eclittica reale della Luna al momento esatto della nascita (via astronomy-engine) — invece di un\'approssimazione. Questo è particolarmente rilevante per chi è nato vicino a un cambio di segno. L\'ora è facoltativa; senza di essa, l\'app utilizza le 12:00 come valore predefinito.'},
      {q:'Quali categorie di fortuna sono incluse?',a:'Quattro categorie: Fortuna in amore, Fortuna finanziaria, Carriera &amp; Successo e Realizzazioni. Ognuna mostra un punteggio 0–100, lettura dettagliata, consigli pratici e elementi fortunati basati sul tuo Segno Solare e Segno Lunare. Bonus: 5 consigli personalizzati per migliorare la fortuna in base al tuo profilo zodiacale. Tutti i punteggi sono completamente deterministici — la stessa data di nascita produce sempre gli stessi risultati.'},
    ],
    faqH2:'Domande Frequenti',
    features:['🔢 Numerologia Pitagorica','⭐ Percorso di Vita','🎯 SuperEnalotto & EuroMillions','✅ 100% Gratis'],
    ogResultTitle:'🍀 I miei numeri fortunati: {numbers}',
    ogResultDesc:'Generati dal mio compleanno con numerologia. Prova i tuoi →',
  },

  id: {
    name:'Indonesia', locale:'id_ID',
    title:'Generator Angka Keberuntungan – Prediksi Togel 4D Weton Kalender Jawa dari Tanggal Lahir | Gratis',
    desc:'Prediksi angka Togel 4D berdasarkan Weton kalender Jawa & tanggal lahir Anda. Tradisi Primbon 600 tahun. Gratis, tanpa daftar, hasil langsung sesuai Pasaran kelahiran.',
    keywords:'generator angka keberuntungan,prediksi togel weton jawa,angka hoki togel 4D,weton jawa tanggal lahir,primbon angka hoki,kalender jawa togel,prediksi togel gratis,togel 4D 3D 2D,pasaran jawa togel,weton kelahiran angka,angka togel hari ini gratis,prediksi togel 4D weton,togel weton jawa gratis,angka keberuntungan tanggal lahir,primbon togel jawa',
    h1:'Angka Keberuntungan',
    body:'Weton Jawa · Kalender Jawa · Primbon · Togel 4D · 100% Gratis',
    start:'Cari Angka Hoki Saya',
    intro:'Tanggal lahir Anda menentukan Weton dalam kalender Jawa — kombinasi hari Masehi dengan siklus Pasaran 5 hari (Legi, Pahing, Pon, Wage, Kliwon). Tradisi Primbon yang berusia lebih dari 600 tahun menetapkan bahwa setiap Pasaran memiliki angka hoki yang beresonansi kuat. Selain angka Togel, app ini kini menyediakan empat kategori ramalan: Keberuntungan Cinta, Keberuntungan Keuangan, Karier &amp; Sukses, dan Pencapaian — masing-masing dengan skor 0–100, bacaan detail, dan saran berdasarkan profil Pasaran Anda. Bonus: 5 tips meningkatkan hoki berdasarkan Weton. Tambahkan tanggal undian untuk kompatibilitas (⭐🌱💧) dan Top 3 tanggal terbaik. Gratis, tanpa daftar, tanpa penyimpanan data.',
    whyTitle:'Mengapa Weton Jawa untuk Prediksi Togel?',
    why:'Primbon Jawa adalah sistem tradisional perhitungan nasib dan keberuntungan yang telah digunakan selama lebih dari 600 tahun dalam budaya Jawa. Inti dari Primbon adalah konsep Weton — kombinasi unik antara hari dalam kalender Masehi (7 hari) dan hari Pasaran dalam kalender Jawa (5 hari: Legi, Pahing, Pon, Wage, Kliwon). Setiap Pasaran dipercaya membawa resonansi energi yang berbeda dan memiliki angka-angka hoki tersendiri: Legi (5·10·15 dst), Pahing (1·6·11 dst), Pon (2·7·12 dst), Wage (4·9·14 dst), Kliwon (3·8·13 dst). Generator ini mengaplikasikan kearifan lokal ini ke Togel 4D, 3D, dan 2D dengan algoritma bobot harmonis. Saat tanggal undian dimasukkan, sistem menghitung Pasaran hari undian dan mengukur tingkat kesesuaiannya dengan Pasaran kelahiran menggunakan matriks kompatibilitas Weton — menghasilkan skor 0–100% yang divisualisasikan sebagai bar (mis. ████████░░ 85%). Selain itu, 90 hari jadwal undian Togel ke depan dianalisis secara otomatis untuk menemukan Top 3 tanggal dengan kompatibilitas tertinggi. Hasilnya adalah prediksi angka Togel yang benar-benar personal dengan strategi tanggal optimal, mencerminkan energi Weton berdasarkan tradisi Primbon.',
    howTo:{
      title:'Cara Penggunaan',
      steps:[
        'Masukkan tanggal lahir Anda (tahun, bulan, hari).',
        'Pilih kategori: Angka Hoki, Weton, Cinta, Keuangan, Karier, atau Prestasi.',
        'Pilih format Togel: Togel 4D, 3D, atau 2D.',
        'Pilih jumlah set angka: 1, 3, 5, atau 10 set.',
        'Klik "Cari Angka Hoki Saya" — angka berdasarkan Weton Anda muncul seketika.',
      ]
    },
    faq:[
      {q:'Apa itu Weton dan bagaimana hubungannya dengan Togel?',a:'Weton adalah kombinasi hari kalender Masehi (7 hari) dengan hari Pasaran Jawa (5 hari: Legi, Pahing, Pon, Wage, Kliwon). Dalam tradisi Primbon, setiap Pasaran memiliki angka-angka hoki yang beresonansi kuat, yang digunakan sebagai dasar prediksi angka Togel 4D, 3D, dan 2D.'},
      {q:'Bagaimana cara menghitung Pasaran kelahiran saya?',a:'Pasaran kelahiran dihitung menggunakan Julian Day Number dari tanggal lahir Anda, kemudian dibagi 5 dan diambil sisanya (0=Legi, 1=Pahing, 2=Pon, 3=Wage, 4=Kliwon). Generator ini menghitung secara otomatis — cukup masukkan tanggal lahir Anda.'},
      {q:'Apakah angkanya selalu sama untuk tanggal lahir yang sama?',a:'Ya — tanggal lahir yang sama selalu menghasilkan angka yang sama. Algoritma bersifat deterministik berdasarkan Pasaran kelahiran Anda. Profil Weton Anda tidak berubah sepanjang hidup.'},
      {q:'Format Togel apa saja yang didukung?',a:'Togel 4D (4 digit 0–9), Togel 3D (3 digit), dan Togel 2D (2 digit). Pilih format sebelum menghasilkan angka. Anda bisa membuat 1, 3, 5, atau 10 set sekaligus.'},
      {q:'Apa perbedaan Weton dengan sistem primbon lainnya?',a:'Weton adalah komponen utama Primbon yang paling banyak digunakan untuk menentukan keberuntungan dan karakter seseorang. Sistem Primbon lainnya meliputi Pawukon (siklus 210 hari) dan Neptu (nilai numerik Weton). Generator ini fokus pada Pasaran sebagai basis utama karena memiliki korelasi angka yang paling jelas dan terstruktur dalam tradisi prediksi Togel Jawa.'},
      {q:'Apa manfaat menambahkan tanggal undian?',a:'Menambahkan tanggal undian mengaktifkan tiga fitur canggih. ① Skor kompatibilitas (0–100%): Pasaran hari undian dibandingkan dengan Pasaran kelahiran menggunakan matriks kompatibilitas Weton — misalnya Legi × Kliwon = 85%, Legi × Wage = 55%. Skor ditampilkan sebagai bar visual (mis. ████████░░ 85%). ② Visualisasi energi per angka: Setiap angka yang dihasilkan diberi warna — ⭐ emas (kedua energi beresonansi, kecocokan terbaik), 🌱 hijau (energi Pasaran lahir), 💧 biru (energi Pasaran undian). ③ Top 3 tanggal undian terbaik: Aplikasi secara otomatis memindai 90 hari ke depan untuk seluruh jadwal undian Togel dan merekomendasikan 3 tanggal dengan skor kompatibilitas tertinggi terhadap Weton kelahiran Anda.'},
      {q:'Apakah ini menjamin menang Togel?',a:'Tidak. Togel adalah permainan peluang dan tidak ada sistem yang dapat menjamin kemenangan. Generator ini menyediakan hiburan berbasis kearifan lokal kalender Jawa. Bermainlah secara bertanggung jawab dan sesuai kemampuan.'},
      {q:'Kategori ramalan apa saja yang tersedia?',a:'Empat kategori: Keberuntungan Cinta, Keberuntungan Keuangan, Karier &amp; Sukses, dan Pencapaian. Masing-masing menampilkan skor 0–100, bacaan terperinci, saran praktis, dan elemen keberuntungan berdasarkan profil Pasaran Weton Anda. Bonus: 5 tips meningkatkan hoki khusus berdasarkan Pasaran kelahiran. Semua hasil bersifat deterministik — tanggal lahir yang sama selalu menghasilkan skor yang sama.'},
    ],
    faqH2:'Pertanyaan Umum',
    features:['🎴 Weton Kalender Jawa','🎯 Togel 4D · 3D · 2D','✅ 100% Gratis','🔒 Data Aman'],
    ogResultTitle:'🍀 Angka hoki Togel saya: {numbers}',
    ogResultDesc:'Dari tanggal lahir berdasarkan Weton Jawa. Coba punya kamu →',
  },

  ko: {
    name:'한국어', locale:'ko_KR',
    title:'행운의 번호 생성기 – 사주팔자 로또 6/45 번호 생년월일로 뽑기 | 무료',
    desc:'사주팔자와 천간지지 오행으로 나만의 로또 6/45 행운 번호를 무료 생성. 생년월일 입력 즉시 결과. 가입 불필요, 데이터 저장 없음.',
    keywords:'행운의 번호 생성기,사주팔자 로또 번호,생년월일 로또,천간지지 행운번호,오행 로또,무료 로또 번호 생성,로또 6/45 번호,사주 행운번호,오늘 행운번호,생년월일 번호,로또 번호 추천 무료,생년월일로 로또 번호,사주 오행 로또,오늘의 행운번호 무료,로또 번호 생성기',
    h1:'행운의 번호 생성기',
    body:'사주팔자 · 천간지지 · 오행 · 로또 6/45 · 100% 무료',
    start:'내 행운 번호 뽑기',
    intro:'생년월일에는 사주팔자가 수천 년간 연구해온 고유한 오행 에너지가 담겨 있습니다. 태어난 연도의 천간(甲乙丙丁戊己庚辛壬癸)으로 오행(木火土金水)을 결정하고, 각 오행에 전통적으로 연관된 행운 번호를 조화 가중 알고리즘으로 반영해 로또 6/45 번호를 생성합니다. 뿐만 아니라 사주팔자의 오행 분석을 바탕으로 연애운·금전운·직업운·성취운 네 가지 운세 카테고리와 용신(用神) 기반 비책 5가지도 함께 제공합니다. 태어난 시간(시주·時柱)을 선택 입력하면 4주(年柱·月柱·日柱·時柱) 완전 분석과 도화살 여부까지 반영한 더욱 정밀한 운세를 받아볼 수 있습니다. 추첨일을 함께 입력하면 호환도 점수·번호 에너지 구성(⭐🌱💧)·최적 추첨일 TOP 3를 자동 추천합니다. 1~10세트를 한 번에 생성 가능. 데이터는 브라우저에서만 처리되며 저장되지 않습니다.',
    whyTitle:'왜 사주팔자로 로또 번호를 뽑는가?',
    why:'사주팔자(四柱八字)는 2,000년 이상의 역사를 가진 동양의 전통 운명학입니다. 태어난 연·월·일·시의 네 기둥(四柱)에서 천간(天干)과 지지(地支)를 뽑아 여덟 글자(八字)로 개인의 기운을 분석합니다. 이 중 생년의 천간은 개인의 오행(五行) 속성을 결정하는 가장 핵심적인 요소입니다. 오행의 상생(相生)·상극(相剋) 관계는 동양 철학의 근간으로, 각 오행에는 수천 년간 전해 내려오는 행운의 수리(數理)가 연결되어 있습니다. 이 생성기는 단순 가중치를 넘어 추첨일 호환도 분석 시스템까지 갖추고 있습니다. 추첨일을 입력하면 일간(日干) 오행을 자동 산출하고, 생년 오행과의 관계를 동기(同氣, 100%)·상생(相生, 85%)·수생(受生, 75%)·상극(相克, 42%)·피극(被克, 38%)의 5단계로 정량화해 시각적 게이지(예: ████████░░ 85%)로 보여줍니다. 각 번호가 생년 기운(🌱), 추첨일 기운(💧), 또는 두 기운 모두(⭐)에서 왔는지 에너지 구성도 색상으로 표시합니다. 나아가 향후 90일간의 로또 6/45 추첨일을 자동 스캔해 당신의 생년 오행과 가장 높은 호환도를 가진 날짜 3개를 랭킹으로 추천합니다. 생년월일 하나로 즉시, 무료로, 당신만의 번호와 최적 추첨일을 확인해보세요.',
    howTo:{
      title:'사용 방법',
      steps:[
        '생년월일(년·월·일)을 입력하세요.',
        '원하는 카테고리를 선택하세요: 행운 번호·정통 사주·연애운·금전운·직업운·성취운.',
        '복권 형식을 선택하세요: 로또 6/45.',
        '생성할 번호 세트 수를 선택하세요: 1, 3, 5, 또는 10세트.',
        '"내 행운 번호 뽑기" 버튼을 클릭하면 사주팔자 기반 번호가 즉시 생성됩니다.',
      ]
    },
    faq:[
      {q:'사주팔자로 어떻게 로또 번호를 생성하나요?',a:'생년의 천간(십간)으로 오행(木火土金水)을 결정합니다. 각 오행에는 전통적으로 연관된 행운 번호가 있으며(木→3·8, 火→2·7, 土→5·10, 金→4·9, 水→1·6 계열), 이를 로또 선택 풀에 4배 가중치로 반영해 통계적으로 더 자주 선택되도록 합니다.'},
      {q:'오행이란 무엇인가요?',a:'오행(五行)은 목(木)·화(火)·토(土)·금(金)·수(水) 다섯 가지 기운으로, 동양 전통 철학의 핵심 개념입니다. 태어난 연도의 천간으로 자신의 오행을 결정하며, 각 오행은 고유한 특성과 행운 수리를 가집니다. 오행의 상생·상극 관계는 자연과 인간의 에너지 흐름을 설명합니다.'},
      {q:'같은 생년월일이면 항상 같은 번호가 나오나요?',a:'네 — 같은 생년월일은 항상 같은 번호를 생성합니다. 알고리즘은 생년월일과 사주팔자 프로필을 기반으로 완전히 결정론적입니다. 추가 세트를 생성해도 첫 번째 세트는 항상 동일합니다.'},
      {q:'천간지지(60갑자)란 무엇인가요?',a:'천간(天干)은 갑·을·병·정·무·기·경·신·임·계의 10가지, 지지(地支)는 자·축·인·묘·진·사·오·미·신·유·술·해의 12가지입니다. 이 둘의 조합으로 60갑자(60년 주기)가 만들어집니다. 천간의 순서로 오행이 결정되며(갑·을→木, 병·정→火, 무·기→土, 경·신→金, 임·계→水), 이것이 행운 번호 산출의 핵심입니다.'},
      {q:'추첨일을 입력하면 어떻게 달라지나요?',a:'추첨일을 입력하면 세 가지 심화 기능이 추가됩니다. ① 호환도 점수(0~100%): 추첨일의 일간(日干) 오행과 생년 오행의 관계를 동기(同氣)=100%, 상생(相生)=85%, 수생(受生)=75%, 상극(相克)=42%, 피극(被克)=38%로 정량화하고 시각적 게이지(예: ████████░░ 85%)로 표시합니다. ② 번호 에너지 구성: 생성된 각 번호가 어느 기운에서 왔는지 색상으로 표시합니다 — ⭐ 노란색(생년+추첨일 두 기운 모두, 최고 호환), 🌱 초록(생년 기운), 💧 파란색(추첨일 기운). ③ 최적 추첨일 TOP 3: 향후 90일 이내 로또 6/45 추첨일 중 당신의 생년 오행과 가장 높은 호환도를 가진 날짜 3개를 자동 추천합니다. 특정 회차를 겨냥할 때 강력히 권장합니다.'},
      {q:'어떤 복권 형식을 지원하나요?',a:'로또 6/45 (6개 번호, 1~45)를 지원합니다. 1, 3, 5, 10세트를 한 번에 생성할 수 있습니다.'},
      {q:'이 번호로 로또에 당첨될 수 있나요?',a:'아닙니다. 로또는 완전한 무작위 추첨이며 어떤 시스템도 당첨을 보장할 수 없습니다. 이 앱은 사주팔자 전통 지식을 바탕으로 한 오락 서비스입니다. 책임감 있게 즐기세요.'},
      {q:'어떤 운세 카테고리가 제공되나요?',a:'연애운·금전운·직업운·성취운 네 가지 카테고리가 제공됩니다. 각 카테고리는 0~100점 운세 점수, 상세 설명, 조언, 행운 요소와 함께 오행 용신(用神) 기반 비책 5가지를 함께 드립니다. 같은 생년월일이면 항상 같은 점수가 나오는 완전 결정론적 알고리즘입니다.'},
      {q:'태어난 시간을 입력하면 무엇이 달라지나요?',a:'시주(時柱)가 추가되어 사주팔자 4주 완전 분석이 가능해집니다. 시주 천간·지지로 오행 균형(용신)이 더 정밀해지고, 도화살(子·卯·午·酉 시) 여부까지 반영한 연애운 점수를 받을 수 있습니다. 시간 미입력 시에는 3주(년·월·일) 기반 분석이 제공됩니다.'},
    ],
    faqH2:'자주 묻는 질문',
    features:['🀄 사주팔자','⭐ 천간지지·오행','🎯 로또 6/45','✅ 100% 무료'],
    ogResultTitle:'🍀 내 행운 번호: {numbers}',
    ogResultDesc:'사주팔자로 생년월일에서 생성했어요. 당신도 뽑아보세요 →',
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

  const appName = { ko:'행운의 번호', ja:'幸運の数字', en:'Lucky Numbers', de:'Glückszahlen',
    fr:'Numéros Chanceux', es:'Números de la Suerte', pt:'Números da Sorte', it:'Numeri Fortunati', id:'Angka Keberuntungan' };
  const tagline = { ko:'생년월일로 뽑는 나만의 번호', ja:'誕生日から引く幸運の数字', en:'Generated from your birthday',
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

// ── Category slug ↔ cat param mapping ────────────────────
const CAT_SLUGS = {
  ko:{ saju:'saju', love:'love-fortune', money:'money-fortune', career:'career-fortune', achievement:'achievement', gunghap:'gunghap' },
  ja:{ saju:'kyusei', love:'love-fortune', money:'money-fortune', career:'career-fortune', achievement:'achievement', gunghap:'aisei' },
  en:{ saju:'birth-chart', love:'love-fortune', money:'money-fortune', career:'career-fortune', achievement:'achievement', gunghap:'compatibility' },
  de:{ saju:'geburtschart', love:'liebesgluck', money:'geldgluck', career:'karriere', achievement:'leistung', gunghap:'partnerschaft' },
  fr:{ saju:'theme-natal', love:'chance-amour', money:'chance-argent', career:'chance-carriere', achievement:'accomplissement', gunghap:'compatibilite' },
  es:{ saju:'carta-natal', love:'suerte-amor', money:'suerte-dinero', career:'suerte-carrera', achievement:'logros', gunghap:'compatibilidad' },
  pt:{ saju:'mapa-natal', love:'sorte-amor', money:'sorte-dinheiro', career:'sorte-carreira', achievement:'conquistas', gunghap:'compatibilidade' },
  it:{ saju:'tema-natale', love:'fortuna-amore', money:'fortuna-denaro', career:'fortuna-carriera', achievement:'realizzazioni', gunghap:'compatibilita' },
  id:{ saju:'primbon', love:'keberuntungan-cinta', money:'keberuntungan-rezeki', career:'keberuntungan-karir', achievement:'pencapaian', gunghap:'kecocokan' },
};
function slugToCat(lang, slug) {
  const m = CAT_SLUGS[lang]||{}; for(const[c,s]of Object.entries(m)) if(s===slug) return c; return null;
}

// ── Per-language per-category SEO metadata ───────────────
const CAT_META = {
  ko:{
    saju:{ title:'사주팔자 무료 분석 — 생년월일 사주 천간지지·오행·용신·대운·세운', desc:'생년월일로 사주팔자 무료 분석. 천간지지·오행·용신·대운·세운·합충·신살·십이운성·일주론 완전 제공. 가입 불필요.', keywords:'사주팔자,무료사주,사주풀이,오행분석,용신,대운,세운,합충,신살,십이운성,일주론,천간지지,사주무료분석,사주보기', h1:'사주팔자 무료 분석', sub:'천간지지 · 오행 · 용신 · 대운 · 세운 완전 분석', intro:'생년월일(선택: 생시)을 입력하면 사주팔자 완전 분석을 무료로 제공합니다. 연주·월주·일주·시주의 천간지지, 오행 균형, 용신, 대운·세운·월운, 합충, 신살, 십이운성, 일주론까지 포함됩니다.', faq:[{q:'사주팔자란?',a:'태어난 연·월·일·시의 천간지지 여덟 글자로 운명을 분석하는 동양 전통 학문입니다.'},{q:'용신이란?',a:'사주에서 부족한 오행을 보완해주는 핵심 기운입니다. 용신 오행의 색·직업·방위를 활용하면 운이 강화됩니다.'},{q:'대운과 세운 차이?',a:'대운은 약 10년 주기의 큰 운 흐름, 세운은 매년 바뀌는 연간 운세입니다.'},{q:'생시(태어난 시간)가 왜 중요한가요?',a:'시주(時柱)가 추가되면 시간(時干)을 포함해 8글자 완전 사주 분석이 가능합니다. 특히 십이운성·신살 정확도가 높아집니다.'}] },
    love:{ title:'연애운 무료 사주 — 올해 연애운·애정운 사주팔자 분석', desc:'사주팔자 기반 연애운 무료 분석. 0–100 연애 점수, 상세 풀이, 조언, 궁합까지 생년월일 입력만으로 즉시 제공.', keywords:'연애운,사주연애운,올해연애운,애정운,사랑운,무료연애운,생년월일연애,연애점수,연애사주,올해사랑운', h1:'연애운 무료 분석', sub:'오행 · 별자리 기반 연애운 점수 & 상세 풀이', intro:'사주팔자와 별자리를 결합해 올해 연애운을 0–100점으로 분석하고 상세 풀이와 맞춤 조언을 제공합니다.', faq:[{q:'연애운 점수는 어떻게 계산하나요?',a:'오행 균형, 일지 관계, 월지 십신, 태양·달 별자리를 종합해 0-100점으로 산출합니다.'},{q:'궁합도 볼 수 있나요?',a:'카테고리에서 궁합을 선택하면 두 사람의 사주 궁합을 분석합니다.'},{q:'연애운이 낮을 때 어떻게 해야 하나요?',a:'앱에서 제공하는 낮은 점수 전용 조언을 참고하고, 충동적 결정을 피하세요.'}] },
    money:{ title:'금전운 재물운 사주 — 올해 금전운·재물운 사주팔자 분석', desc:'사주팔자 재성(財星) 분석으로 금전운·재물운 무료 분석. 0–100 재물운 점수, 투자·절약 조언 즉시 제공.', keywords:'금전운,재물운,돈복,사주금전운,올해재물운,투자운,재성,무료금전운,사주재물,재물사주,돈운사주', h1:'금전운 · 재물운 무료 분석', sub:'재성(財星) 강도 · 오행 기반 금전운', intro:'재성(財星) 강도를 분석해 올해 금전운 점수와 실천 가능한 재테크 조언을 무료로 제공합니다.', faq:[{q:'금전운은 무엇으로 결정되나요?',a:'재성 강도, 오행 균형, 세운의 재성 흐름으로 금전운이 결정됩니다.'},{q:'투자에 좋은 시기를 알 수 있나요?',a:'재성이 강한 세운·월운 시기가 투자·재물 취득에 유리합니다.'},{q:'금전운이 낮을 때는?',a:'큰 투자를 미루고 지출을 점검하세요.'}] },
    career:{ title:'직업운 취업운 사주 — 올해 직업운·취업운·승진운 사주팔자 분석', desc:'사주팔자 관성(官星) 분석으로 직업운·취업운·승진운 무료 분석. 0–100 커리어 점수, 이직·승진 조언 즉시 제공.', keywords:'직업운,취업운,승진운,사주직업운,관성,올해직장운,커리어운,무료직업운,이직운,직업사주,취업사주', h1:'직업운 · 취업운 무료 분석', sub:'관성(官星) · 오행 기반 커리어운 점수', intro:'관성(官星) 강도와 세운 흐름을 분석해 올해 직업운 점수와 커리어 조언을 무료로 제공합니다.', faq:[{q:'취업에 좋은 시기는?',a:'관성이 강해지는 세운·월운 시기가 취업·승진에 유리합니다.'},{q:'이직 타이밍을 알 수 있나요?',a:'대운·세운에서 관성 변화가 이직 신호입니다.'},{q:'직업운이 낮을 때는?',a:'현 직장에서 실력을 키우고 인간관계를 돈독히 하세요.'}] },
    achievement:{ title:'성취운 학업운 사주 — 목표달성·공부운·시험운 사주팔자 분석', desc:'사주팔자 인성(印星) 분석으로 성취운·학업운 무료 분석. 0–100 점수, 공부·자기계발 조언 즉시 제공.', keywords:'성취운,학업운,공부운,목표달성,인성,사주성취,자기계발운,무료성취운,시험운,올해학업운,공부사주', h1:'성취운 · 학업운 무료 분석', sub:'인성(印星) · 오행 기반 성취·학업운 점수', intro:'인성(印星) 강도를 분석해 올해 성취운 점수와 학업·자기계발 조언을 제공합니다.', faq:[{q:'성취운은 무엇으로 결정되나요?',a:'인성 강도, 오행 균형, 세운의 인성 흐름으로 결정됩니다.'},{q:'시험·자격증에 좋은 시기는?',a:'인성이 강해지는 세운·월운이 학업·자격증 취득에 유리합니다.'},{q:'성취운이 낮을 때는?',a:'작은 목표부터 완수해 자신감을 쌓으세요.'}] },
    gunghap:{ title:'사주 궁합 무료 — 두 사람 생년월일 궁합 오행 합충 분석', desc:'두 사람 생년월일로 사주 궁합 무료 분석. 오행 합충, 궁합 점수, 상세 풀이 즉시 제공. 가입 불필요.', keywords:'사주궁합,궁합보기,무료궁합,생년월일궁합,오행궁합,합충,연애궁합,결혼궁합,궁합점수,두사람궁합,사주궁합보기', h1:'사주 궁합 무료 분석', sub:'오행 합충 · 두 사람 에너지 궁합 완전 분석', intro:'두 사람의 생년월일을 입력하면 오행 합충을 기반으로 궁합 점수와 상세 풀이를 즉시 무료로 제공합니다.', faq:[{q:'궁합 분석은 어떻게 이루어지나요?',a:'연주 오행, 일간 오행, 합충 관계를 종합해 궁합 점수를 산출합니다.'},{q:'궁합이 나쁘면 헤어져야 하나요?',a:'아닙니다. 궁합은 참고 자료입니다. 노력과 소통으로 보완할 수 있습니다.'},{q:'두 사람의 생년월일만 있으면 되나요?',a:'네, 두 사람 각각의 연·월·일만 입력하면 됩니다.'}] },
  },
  ja:{
    saju:{ title:'九星気学 無料診断 — 生年月日から本命星・方位吉凶を算出', desc:'九星気学で生年月日から本命星・月命星・方位吉凶を無料診断。三星分析も提供。登録不要。', keywords:'九星気学,本命星,月命星,方位吉凶,吉方位,三星分析,九星,無料九星気学,生年月日占い,九星気学診断,気学占い無料', h1:'九星気学 無料診断', sub:'本命星 · 月命星 · 方位吉凶 完全分析', intro:'生年月日を入力すると本命星・月命星・日命星の三星と方位吉凶を無料で診断します。引越・転職・旅行の方角選択にも役立ちます。', faq:[{q:'九星気学とは？',a:'古代中国の気学に基づく占術で、生年から算出した本命星(1〜9)で運勢・吉方位を判断します。'},{q:'方位吉凶はどう使う？',a:'引越・旅行・重要な面談など、大きな行動の方角を選ぶ際に参考にします。'},{q:'本命星と月命星の違い？',a:'本命星は年から算出する基本の星、月命星は月から算出するより細かい星です。'}] },
    love:{ title:'恋愛運 無料占い — 生年月日で今年の恋愛運を九星気学で診断', desc:'九星気学と星座で恋愛運を無料診断。0–100点スコア、詳細リーディング、実践的アドバイス。登録不要。', keywords:'恋愛運,九星気学恋愛,今年の恋愛運,恋愛占い,生年月日恋愛,無料恋愛運,愛情運,恋愛スコア,恋愛九星', h1:'恋愛運 無料診断', sub:'九星気学 · 星座 基軸の恋愛運スコア', intro:'九星気学と星座を組み合わせ、今年の恋愛運を0–100点で診断しアドバイスを提供します。', faq:[{q:'恋愛運はどう計算される？',a:'本命星の属性、太陽星座、月星座を組み合わせてスコアを算出します。'},{q:'相性診断もできる？',a:'はい、カテゴリで「相性」を選ぶと2人の相性を診断できます。'},{q:'恋愛運が低い時は？',a:'衝動的な行動を避け、自己啓発に集中しましょう。'}] },
    money:{ title:'金運 無料占い — 生年月日で金運・財運を九星気学で診断', desc:'九星気学で金運を無料診断。0–100点スコア、投資・節約アドバイスを即日提供。登録不要。', keywords:'金運,財運,九星気学金運,今年の金運,無料金運占い,生年月日金運,金運診断,財運占い', h1:'金運 · 財運 無料診断', sub:'九星気学 · 星座 基軸の金運スコア', intro:'九星気学の属性と星座を分析し、今年の金運スコアと実践的な財テクアドバイスを提供します。', faq:[{q:'金運を上げる方法？',a:'吉方位の活用と金色のアイテムが有効とされています。'},{q:'金運が低い時は？',a:'大きな投資を控え、固定費の見直しを優先しましょう。'}] },
    career:{ title:'仕事運 無料占い — 生年月日でキャリア運を九星気学で診断', desc:'九星気学で仕事運・出世運を無料診断。0–100点スコア、転職・昇進アドバイス。登録不要。', keywords:'仕事運,出世運,転職運,九星気学仕事,今年の仕事運,キャリア占い,無料仕事運,昇進運', h1:'仕事運 · キャリア運 無料診断', sub:'九星気学 基軸のキャリアスコア', intro:'本命星の属性と星座から仕事運スコアを算出し、転職・昇進の最適タイミングをお知らせします。', faq:[{q:'転職に良い時期は？',a:'本命星の吉運サイクルと月命星が重なる時期が好転期です。'},{q:'仕事運が低い時は？',a:'現職でのスキルアップと人間関係強化に集中しましょう。'}] },
    achievement:{ title:'学業運 成就運 無料占い — 生年月日で達成運を九星気学で診断', desc:'九星気学で学業運・達成運を無料診断。0–100点スコア、学習アドバイス。登録不要。', keywords:'学業運,成就運,九星気学学業,試験運,勉強運,無料学業占い,達成運,資格試験運', h1:'学業運 · 成就運 無料診断', sub:'九星気学 基軸の達成スコア', intro:'九星気学で学業運と成就運を分析し、試験・資格取得に最適なタイミングをお知らせします。', faq:[{q:'試験に良い時期は？',a:'月命星が学習系の吉運を示す月が好機です。'},{q:'学習効率を上げるには？',a:'吉方位の北（知恵の方位）を学習スペースとして活用する方法があります。'}] },
    gunghap:{ title:'相性診断 無料占い — 生年月日で二人の九星気学相性を診断', desc:'2人の生年月日から九星気学相性を無料診断。相性スコアと詳細リーディングを即日提供。登録不要。', keywords:'相性診断,九星気学相性,生年月日相性,無料相性占い,相性スコア,恋愛相性,結婚相性,二人相性', h1:'相性診断 無料分析', sub:'九星気学 · 五行 相性スコア', intro:'2人の生年月日を入力すると本命星と五行の相性を分析し、相性スコアと詳細リーディングを提供します。', faq:[{q:'相性分析の方法？',a:'2人の本命星属性と五行の相生・相剋関係からスコアを算出します。'},{q:'相性が悪くても大丈夫？',a:'相性はあくまでも参考。コミュニケーションと努力で補えます。'}] },
  },
  en:{
    saju:{ title:'Free Numerology Birth Chart — Life Path, Sun Sign & Moon Sign Analysis', desc:'Free numerology birth chart: Life Path Number, Sun Sign, Moon Sign, fortune scores for Love, Money, Career & Achievement. No signup required.', keywords:'numerology birth chart,life path number analysis,numerology reading birthday,free birth chart,sun sign moon sign analysis,fortune numerology,birthday numerology reading', h1:'Numerology Birth Chart Analysis', sub:'Life Path · Sun Sign · Moon Sign · Fortune Scores', intro:'Enter your birthday for a complete numerology birth chart: Life Path Number, Sun Sign, Moon Sign, and four fortune scores — Love, Money, Career, and Achievement — with detailed readings.', faq:[{q:'What is a numerology birth chart?',a:'A numerology birth chart combines your Life Path Number (from your birth date), Sun Sign (Western astrology), and Moon Sign to provide a multi-dimensional fortune analysis.'},{q:'How accurate is the Moon Sign?',a:'With birth hour, the Moon Sign uses precise astronomical calculation. Without it, noon is used as default.'},{q:'What is the Life Path Number?',a:'Your Life Path Number is the most important number in Pythagorean numerology, derived by summing all digits of your birth date and reducing to 1–9 or master number 11, 22, 33.'}] },
    love:{ title:'Love Fortune Numerology — Free Love & Compatibility Analysis from Birthday', desc:'Free love fortune analysis using numerology, Sun Sign & Moon Sign. Score 0–100, detailed reading, actionable advice. Instant, no signup.', keywords:'love fortune numerology,love compatibility birthday,numerology love reading,free love fortune,Sun Sign love horoscope,Moon Sign love compatibility,birthday love numerology,love score', h1:'Love Fortune Analysis', sub:'Numerology · Sun Sign · Moon Sign Love Score', intro:'Get your personalized love fortune score (0–100) using your Life Path Number, Sun Sign, and Moon Sign — with a detailed reading and practical advice.', faq:[{q:'How is love fortune calculated?',a:'Your Life Path Number, Sun Sign, and Moon Sign are combined to produce a love score with high/mid/low reading and personalized advice.'},{q:'Can I check compatibility with a partner?',a:"Yes — select 'Compatibility' to analyze two people's astrological compatibility."},{q:'What if my love score is low?',a:'Follow the app\'s specific action steps for low-fortune periods. Avoid impulsive decisions.'}] },
    money:{ title:'Money Fortune Numerology — Free Financial Lucky Numbers from Birthday', desc:'Free money fortune analysis using numerology & astrology. Score 0–100, investment and savings advice personalized to your Life Path Number.', keywords:'money fortune numerology,financial lucky numbers,numerology money reading,wealth numerology,financial horoscope birthday,free money fortune,money score numerology', h1:'Money Fortune Analysis', sub:'Numerology · Life Path Number Money Score', intro:'Discover your personal money fortune score and receive practical financial advice based on your Life Path Number and zodiac signs.', faq:[{q:'How is money fortune calculated?',a:"Your Life Path Number, Sun Sign, and Moon Sign are analyzed to generate a 0–100 financial score with customized advice."},{q:'What if my money score is low?',a:'Focus on savings and avoid impulsive purchases. The app provides specific action steps.'},{q:'Is there investment advice?',a:'Yes — high-score periods include investment recommendations; low-score periods advise caution.'}] },
    career:{ title:'Career Fortune Numerology — Free Career & Job Lucky Numbers from Birthday', desc:'Free career fortune analysis using numerology & astrology. Score 0–100, promotion and job-change advice personalized to your Life Path Number.', keywords:'career fortune numerology,job luck numerology,career lucky numbers,numerology career reading,work fortune birthday,promotion luck,free career fortune,job change numerology', h1:'Career Fortune Analysis', sub:'Numerology · Life Path Number Career Score', intro:'Receive a personalized career fortune score (0–100) with advice on promotions, job changes, and career development.', faq:[{q:'How is career fortune calculated?',a:'Life Path Number, Sun Sign, and Moon Sign are analyzed for career alignment.'},{q:'When is a good time to change jobs?',a:"When your career score is high and your Life Path Number aligns with the year's Universal Number."},{q:'What if my career score is low?',a:'Focus on skill-building and networking in your current role.'}] },
    achievement:{ title:'Achievement Fortune Numerology — Free Learning & Goal Fortune from Birthday', desc:'Free achievement and academic fortune using numerology. Score 0–100, study tips and goal-setting advice from your birthday.', keywords:'achievement fortune numerology,study luck numerology,academic fortune birthday,learning numerology,goal achievement numerology,free achievement reading,exam luck numerology', h1:'Achievement Fortune Analysis', sub:'Numerology · Life Path Number Achievement Score', intro:'Get your personal achievement fortune score (0–100) with study tips, goal-setting advice, and lucky elements for success.', faq:[{q:'What affects achievement fortune?',a:'Life Path Number, Sun Sign, and Moon Sign alignment influence your achievement score.'},{q:'Best time to pursue a certification?',a:'When your achievement score is high, it\'s an ideal time to start a new learning goal.'},{q:'What if my achievement score is low?',a:'Complete small tasks first to build momentum, and prioritize rest.'}] },
    gunghap:{ title:'Compatibility Numerology — Free Love Compatibility from Two Birthdays', desc:'Free numerology love compatibility. Enter two birthdays for a compatibility score, detailed reading, and relationship advice. Instant, no signup.', keywords:'compatibility numerology,love compatibility birthday,numerology compatibility test,birthday compatibility,life path compatibility,free compatibility,numerology relationship score', h1:'Compatibility Analysis', sub:'Numerology · Life Path Number Compatibility', intro:'Enter two birthdays to get a numerology compatibility score with a detailed reading and relationship advice.', faq:[{q:'How is compatibility calculated?',a:"Both people's Life Path Numbers, Sun Signs, and elemental attributes are compared for a compatibility score."},{q:'Can bad compatibility be overcome?',a:"Yes. Compatibility is a guide, not a verdict. Communication and effort can bridge any numerical gap."},{q:'Do I need exact birth times?',a:'No — birth date (year, month, day) is sufficient for compatibility analysis.'}] },
  },
  de:{
    saju:{ title:'Numerologie Geburtschart — Kostenlose Analyse aus Ihrem Geburtstag', desc:'Kostenlose Numerologie-Analyse: Lebenspfadzahl, Sonnenzeichen, Mondzeichen & Glücks-Scores. Sofort, ohne Anmeldung.', keywords:'Numerologie Geburtschart,Lebenspfadzahl Analyse,Numerologie Geburtstag,kostenlose Numerologie,Horoskop Numerologie,Glückszahlen Analyse', h1:'Numerologie-Analyse', sub:'Lebenspfadzahl · Sonnen- & Mondzeichen · Glücks-Scores', intro:'Geben Sie Ihr Geburtsdatum ein für eine vollständige Numerologie-Analyse mit Lebenspfadzahl, Sonnenzeichen, Mondzeichen und vier Glücks-Scores.', faq:[{q:'Was ist die Lebenspfadzahl?',a:'Die wichtigste Zahl in der Numerologie, berechnet aus der Summe aller Ziffern Ihres Geburtsdatums.'},{q:'Was ist das Mondzeichen?',a:'Ihr Mondzeichen zeigt Ihre emotionale Natur und beeinflusst Beziehungsthemen.'},{q:'Was sind die vier Glücks-Scores?',a:'Liebesglück, Geldglück, Karriereglück und Leistungsglück — jeweils 0–100 Punkte.'}] },
    love:{ title:'Liebesglück Numerologie — Kostenlose Liebesanalyse aus Geburtstag', desc:'Kostenlose Liebesglück-Analyse mit Numerologie & Horoskop. 0–100 Punkte, detaillierte Deutung, Ratschläge. Sofort.', keywords:'Liebesglück,Numerologie Liebe,Liebeshoroskop Geburtstag,kostenlose Liebesanalyse,Liebes-Score,Numerologie Liebe kostenlos', h1:'Liebesglück-Analyse', sub:'Numerologie · Sonnenzeichen Liebes-Score', intro:'Erhalten Sie Ihren persönlichen Liebesglück-Score (0–100) basierend auf Ihrer Lebenspfadzahl und Ihrem Horoskop.', faq:[{q:'Wie wird das Liebesglück berechnet?',a:'Lebenspfadzahl, Sonnenzeichen und Mondzeichen werden kombiniert.'},{q:'Kann ich eine Partnerschaftsanalyse machen?',a:'Ja, wählen Sie die Kategorie „Partnerschaft" für eine Kompatibilitätsanalyse.'},{q:'Was tun bei niedrigem Liebesglück?',a:'Impulsive Entscheidungen vermeiden und den app-eigenen Ratschlägen folgen.'}] },
    money:{ title:'Geldglück Numerologie — Kostenlose Finanzanalyse aus Geburtstag', desc:'Kostenlose Geldglück-Analyse mit Numerologie. 0–100 Punkte, Investitions- & Spartipps aus Ihrer Lebenspfadzahl. Sofort.', keywords:'Geldglück,Numerologie Geld,Finanzhoroskop Geburtstag,Finanzglück Numerologie,kostenlose Geldanalyse,Finanzglückszahlen', h1:'Geldglück-Analyse', sub:'Numerologie · Lebenspfadzahl Finanz-Score', intro:'Erhalten Sie Ihren persönlichen Finanzglück-Score und praktische Investitionstipps basierend auf Ihrer Lebenspfadzahl.', faq:[{q:'Wie wird das Geldglück berechnet?',a:'Lebenspfadzahl, Sonnenzeichen und Mondzeichen werden für die Finanzanalyse kombiniert.'},{q:'Was tun bei niedrigem Geldglück?',a:'Sparpotenziale identifizieren und große Investitionen verschieben.'},{q:'Gibt es Investitionstipps?',a:'Ja — bei hohem Score werden günstige Investitionsphasen empfohlen; bei niedrigem Score wird Vorsicht geraten.'}] },
    career:{ title:'Karriereglück Numerologie — Kostenlose Berufsanalyse aus Geburtstag', desc:'Kostenlose Karriereglück-Analyse mit Numerologie. 0–100 Punkte, Beförderungs- & Jobwechseltipps. Sofort, ohne Anmeldung.', keywords:'Karriereglück,Berufshoroskop Numerologie,Jobglück Geburtstag,Karrierescore,kostenlose Berufsanalyse,Numerologie Karriere', h1:'Karriereglück-Analyse', sub:'Numerologie · Lebenspfadzahl Karriere-Score', intro:'Erhalten Sie Ihren Karriereglück-Score (0–100) und maßgeschneiderte Tipps für Beförderung und Jobwechsel.', faq:[{q:'Wie wird das Karriereglück berechnet?',a:'Lebenspfadzahl, Sonnenzeichen und Mondzeichen werden für die Karriereanalyse kombiniert.'},{q:'Bester Zeitpunkt für Jobwechsel?',a:'Wenn Ihr Karriere-Score hoch ist und Ihre Lebenspfadzahl mit der Jahreszahl harmoniert.'},{q:'Was tun bei niedrigem Karriereglück?',a:'Aktuelle Fähigkeiten stärken und Netzwerk ausbauen.'}] },
    achievement:{ title:'Leistungsglück Numerologie — Kostenlose Lernanalyse aus Geburtstag', desc:'Kostenlose Leistungsglück-Analyse mit Numerologie. 0–100 Punkte, Lern- und Zielerreichungstipps. Sofort.', keywords:'Leistungsglück,Lernhoroskop Numerologie,Bildungsglück,Zielerreichung Numerologie,kostenlose Leistungsanalyse,Prüfungsglück', h1:'Leistungsglück-Analyse', sub:'Numerologie · Leistungs-Score', intro:'Erhalten Sie Ihren Leistungsglück-Score und Lernstrategien für Ihr numerologisches Profil.', faq:[{q:'Was beeinflusst das Leistungsglück?',a:'Lebenspfadzahl, Sonnenzeichen und Mondzeichen.'},{q:'Bester Zeitpunkt für Prüfungen?',a:'Wenn Ihr Leistungs-Score hoch ist.'},{q:'Was tun bei niedrigem Leistungsglück?',a:'Kleine Ziele zuerst vollenden, um Schwung aufzubauen.'}] },
    gunghap:{ title:'Numerologie Partnerschaft — Kostenlose Kompatibilitätsanalyse', desc:'Kostenlose Kompatibilitätsanalyse mit Numerologie. Zwei Geburtstage eingeben für Score & Deutung. Sofort, ohne Anmeldung.', keywords:'Partnerschaft Numerologie,Kompatibilität Geburtstag,numerologische Kompatibilität,kostenloser Kompatibilitätstest,Beziehungskompatibilität Numerologie', h1:'Partnerschafts-Analyse', sub:'Numerologie · Kompatibilitäts-Score', intro:'Geben Sie zwei Geburtstage ein für eine Kompatibilitätsanalyse basierend auf Lebenspfadzahl und Horoskop.', faq:[{q:'Wie wird Kompatibilität berechnet?',a:'Beide Lebenspfadzahlen und Sternzeichen werden verglichen.'},{q:'Kann schlechte Kompatibilität überwunden werden?',a:'Ja, Kommunikation und Bemühung überwiegen numerologische Differenzen.'},{q:'Brauche ich genaue Geburtszeiten?',a:'Nein — Geburtsdatum (Tag, Monat, Jahr) reicht für die Kompatibilitätsanalyse.'}] },
  },
  fr:{
    saju:{ title:'Thème Numérologique Gratuit — Analyse depuis votre Date de Naissance', desc:'Analyse numérologique gratuite: chemin de vie, signe solaire, signe lunaire & scores de chance. Instantané, sans inscription.', keywords:'thème numérologique,chemin de vie analyse,numérologie anniversaire,horoscope numérologie,numérologie gratuite,analyse numérologique', h1:'Analyse Numérologique', sub:'Chemin de Vie · Signe Solaire & Lunaire · Scores de Chance', intro:'Entrez votre date de naissance pour une analyse numérologique complète avec chemin de vie, signe solaire, lunaire et quatre scores de chance.', faq:[{q:"Qu'est-ce que le chemin de vie?",a:'Votre chemin de vie est le nombre le plus important en numérologie, calculé en additionnant tous les chiffres de votre date de naissance.'},{q:"Qu'est-ce que le signe lunaire?",a:'Votre signe lunaire révèle votre nature émotionnelle et influence vos relations.'},{q:'Quels sont les quatre scores de chance?',a:'Chance amoureuse, chance financière, chance carrière et accomplissement — chacun de 0 à 100.'}] },
    love:{ title:'Chance Amoureuse Numérologie — Analyse Gratuite depuis votre Anniversaire', desc:'Analyse de chance amoureuse gratuite avec numérologie & horoscope. Score 0–100, lecture détaillée, conseils. Instantané.', keywords:'chance amoureuse,numérologie amour,horoscope amour anniversaire,analyse amour gratuite,score amoureux numérologie', h1:'Analyse de Chance Amoureuse', sub:'Numérologie · Signe Solaire Score Amoureux', intro:'Obtenez votre score de chance amoureuse (0–100) basé sur votre chemin de vie et votre horoscope.', faq:[{q:'Comment est calculée la chance amoureuse?',a:'Chemin de vie, signe solaire et lunaire sont combinés.'},{q:'Puis-je vérifier la compatibilité?',a:"Oui, choisissez la catégorie Compatibilité."},{q:"Que faire si le score est bas?",a:"Évitez les décisions impulsives et suivez les conseils personnalisés de l'application."}] },
    money:{ title:'Chance Financière Numérologie — Analyse Gratuite depuis votre Anniversaire', desc:'Analyse de chance financière gratuite avec numérologie. Score 0–100, conseils investissement et épargne. Instantané, sans inscription.', keywords:'chance financière,numérologie argent,finances horoscope anniversaire,fortune financière numérologie,score financier', h1:'Analyse de Chance Financière', sub:'Numérologie · Score Financier', intro:'Obtenez votre score de chance financière et des conseils pratiques basés sur votre numérologie.', faq:[{q:'Comment est calculée la chance financière?',a:'Chemin de vie, signe solaire et lunaire combinés.'},{q:"Que faire si le score est bas?",a:"Constituez une épargne de précaution et évitez les dépenses impulsives."},{q:'Y a-t-il des conseils investissement?',a:'Oui — les périodes à score élevé incluent des recommandations favorables.'}] },
    career:{ title:'Chance Carrière Numérologie — Analyse Professionnelle Gratuite', desc:'Analyse de chance carrière gratuite avec numérologie. Score 0–100, conseils promotion et changement emploi. Instantané.', keywords:'chance carrière,numérologie profession,carrière horoscope anniversaire,score professionnel,numérologie emploi', h1:'Analyse de Chance Carrière', sub:'Numérologie · Score Carrière', intro:'Obtenez votre score de chance carrière (0–100) et des conseils sur la promotion et les changements professionnels.', faq:[{q:'Comment est calculée la chance carrière?',a:'Chemin de vie, signe solaire et lunaire.'},{q:"Meilleur moment pour changer d'emploi?",a:'Quand votre score carrière est élevé.'},{q:'Que faire si le score est bas?',a:'Renforcez vos compétences actuelles et votre réseau professionnel.'}] },
    achievement:{ title:"Chance Accomplissement Numérologie — Analyse d'Objectifs Gratuite", desc:'Analyse de chance accomplissement gratuite. Score 0–100, conseils étude et développement personnel. Instantané.', keywords:'chance accomplissement,numérologie académique,succès scolaire numérologie,développement personnel numérologie', h1:"Analyse d'Accomplissement", sub:'Numérologie · Score de Réussite', intro:"Obtenez votre score d'accomplissement et des stratégies d'apprentissage adaptées à votre profil numérologique.", faq:[{q:"Qu'influence la chance d'accomplissement?",a:'Chemin de vie, signe solaire et lunaire.'},{q:'Meilleur moment pour passer un examen?',a:"Quand votre score d'accomplissement est élevé."},{q:'Que faire si le score est bas?',a:'Complétez de petites tâches pour reprendre confiance.'}] },
    gunghap:{ title:'Compatibilité Numérologique — Analyse Gratuite de deux Anniversaires', desc:'Analyse de compatibilité numérologique gratuite. Score & lecture détaillée pour deux dates de naissance. Instantané, sans inscription.', keywords:'compatibilité numérologique,compatibilité anniversaire,test compatibilité numérologie,compatibilité amour numérologie', h1:'Analyse de Compatibilité', sub:'Numérologie · Score de Compatibilité', intro:'Entrez deux dates de naissance pour une analyse de compatibilité basée sur les chemins de vie et horoscope.', faq:[{q:'Comment est calculée la compatibilité?',a:'Les deux chemins de vie et signes du zodiaque sont comparés.'},{q:'Peut-on surmonter une mauvaise compatibilité?',a:'Oui, la communication et effort priment sur les chiffres.'},{q:"Ai-je besoin d'heures de naissance précises?",a:"Non — la date de naissance (jour, mois, année) suffit."}] },
  },
  es:{
    saju:{ title:'Carta Natal Numerología — Análisis Gratuito desde tu Fecha de Nacimiento', desc:'Análisis numerológico gratuito: número de vida, signo solar, signo lunar y puntuaciones de suerte. Instantáneo, sin registro.', keywords:'carta natal numerología,número de vida análisis,numerología cumpleaños,horóscopo numerología,numerología gratis,análisis numerológico', h1:'Análisis Numerológico', sub:'Número de Vida · Signo Solar & Lunar · Puntuaciones de Suerte', intro:'Ingresa tu fecha de nacimiento para un análisis numerológico completo con número de vida, signo solar, lunar y cuatro puntuaciones de suerte.', faq:[{q:'¿Qué es el número de vida?',a:'El número más importante en numerología, calculado sumando todos los dígitos de tu fecha de nacimiento.'},{q:'¿Qué es el signo lunar?',a:'Tu signo lunar revela tu naturaleza emocional e influye en tus relaciones.'},{q:'¿Cuáles son las cuatro puntuaciones?',a:'Suerte amorosa, financiera, de carrera y de logros — cada una de 0 a 100.'}] },
    love:{ title:'Suerte en el Amor Numerología — Análisis Amoroso Gratuito', desc:'Análisis de suerte amorosa gratuito con numerología y horóscopo. Puntuación 0–100, lectura detallada, consejos. Instantáneo.', keywords:'suerte amor numerología,compatibilidad amorosa cumpleaños,numerología amor gratis,horóscopo amor,score amor numerología', h1:'Análisis de Suerte Amorosa', sub:'Numerología · Signo Solar Puntuación de Amor', intro:'Obtén tu puntuación de suerte amorosa (0–100) basada en tu número de vida y horóscopo.', faq:[{q:'¿Cómo se calcula la suerte amorosa?',a:'Número de vida, signo solar y lunar se combinan.'},{q:'¿Puedo verificar compatibilidad?',a:"Sí, selecciona la categoría Compatibilidad."},{q:'¿Qué hacer con puntuación baja?',a:'Evita decisiones impulsivas y sigue los consejos personalizados de la app.'}] },
    money:{ title:'Suerte Financiera Numerología — Análisis de Dinero Gratuito', desc:'Análisis de suerte financiera gratuito con numerología. Puntuación 0–100, consejos inversión y ahorro personalizados.', keywords:'suerte dinero numerología,finanzas horóscopo cumpleaños,fortuna financiera numerología,score financiero', h1:'Análisis de Suerte Financiera', sub:'Numerología · Puntuación Financiera', intro:'Obtén tu puntuación de suerte financiera y consejos prácticos basados en tu numerología.', faq:[{q:'¿Cómo se calcula la suerte financiera?',a:'Número de vida, signo solar y lunar combinados.'},{q:'¿Qué hacer con puntuación baja?',a:'Construye un fondo de emergencia y evita gastos impulsivos.'},{q:'¿Hay consejos de inversión?',a:'Sí — los períodos de puntuación alta incluyen recomendaciones de inversión.'}] },
    career:{ title:'Suerte en la Carrera Numerología — Análisis Profesional Gratuito', desc:'Análisis de suerte profesional gratuito con numerología. Puntuación 0–100, consejos ascenso y cambio de trabajo.', keywords:'suerte carrera numerología,profesión horóscopo cumpleaños,puntaje carrera,numerología empleo,carrera lucky numbers', h1:'Análisis de Suerte en la Carrera', sub:'Numerología · Puntuación de Carrera', intro:'Obtén tu puntuación de suerte en la carrera (0–100) y consejos sobre ascensos y cambios de trabajo.', faq:[{q:'¿Cómo se calcula la suerte en la carrera?',a:'Número de vida, signo solar y lunar.'},{q:'¿Mejor momento para cambiar de trabajo?',a:'Cuando tu puntuación de carrera es alta.'},{q:'¿Qué hacer con puntuación baja?',a:'Desarrolla tus habilidades actuales y amplía tu red de contactos.'}] },
    achievement:{ title:'Suerte en Logros Numerología — Análisis de Metas y Estudio Gratuito', desc:'Análisis de suerte en logros gratuito con numerología. Puntuación 0–100, consejos de estudio y metas personales.', keywords:'suerte logros numerología,académico horóscopo,éxito escolar numerología,logros numerología gratis', h1:'Análisis de Logros', sub:'Numerología · Puntuación de Logros', intro:'Obtén tu puntuación de logros y estrategias de aprendizaje adaptadas a tu perfil numerológico.', faq:[{q:'¿Qué influye en la suerte de logros?',a:'Número de vida, signo solar y lunar.'},{q:'¿Mejor momento para un examen?',a:'Cuando tu puntuación de logros es alta.'},{q:'¿Qué hacer con puntuación baja?',a:'Completa tareas pequeñas primero para ganar impulso.'}] },
    gunghap:{ title:'Compatibilidad Numerológica — Análisis Gratuito de dos Fechas de Nacimiento', desc:'Análisis de compatibilidad numerológica gratuito. Puntuación & lectura detallada para dos fechas de nacimiento. Instantáneo.', keywords:'compatibilidad numerológica,compatibilidad cumpleaños,test compatibilidad numerología,amor compatibilidad', h1:'Análisis de Compatibilidad', sub:'Numerología · Puntuación de Compatibilidad', intro:'Ingresa dos fechas de nacimiento para un análisis de compatibilidad basado en números de vida y horóscopo.', faq:[{q:'¿Cómo se calcula la compatibilidad?',a:'Se comparan los dos números de vida y signos zodiacales.'},{q:'¿Se puede superar incompatibilidad?',a:'Sí, la comunicación y el esfuerzo superan diferencias numéricas.'},{q:'¿Necesito horarios exactos?',a:'No — solo la fecha de nacimiento es suficiente.'}] },
  },
  pt:{
    saju:{ title:'Mapa Numerológico Gratuito — Análise desde a sua Data de Nascimento', desc:'Análise numerológica gratuita: número do caminho de vida, signo solar, signo lunar e pontuações de sorte. Instantâneo, sem cadastro.', keywords:'mapa numerológico,número caminho vida,numerologia aniversário,horóscopo numerologia,numerologia grátis,análise numerológica', h1:'Análise Numerológica', sub:'Caminho de Vida · Signo Solar & Lunar · Pontuações de Sorte', intro:'Insira sua data de nascimento para uma análise numerológica completa com número do caminho de vida, signo solar, lunar e quatro pontuações de sorte.', faq:[{q:'O que é o número do caminho de vida?',a:'O número mais importante na numerologia, calculado somando todos os dígitos da sua data de nascimento.'},{q:'O que é o signo lunar?',a:'Seu signo lunar revela sua natureza emocional e influencia seus relacionamentos.'},{q:'Quais são as quatro pontuações?',a:'Sorte amorosa, financeira, de carreira e de conquistas — cada uma de 0 a 100.'}] },
    love:{ title:'Sorte no Amor Numerologia — Análise Amorosa Gratuita', desc:'Análise de sorte amorosa gratuita com numerologia e horóscopo. Pontuação 0–100, leitura detalhada, conselhos. Instantâneo.', keywords:'sorte amor numerologia,compatibilidade amorosa aniversário,numerologia amor grátis,horóscopo amor', h1:'Análise de Sorte no Amor', sub:'Numerologia · Signo Solar Pontuação de Amor', intro:'Obtenha sua pontuação de sorte amorosa (0–100) com base no seu caminho de vida e horóscopo.', faq:[{q:'Como é calculada a sorte no amor?',a:'Caminho de vida, signo solar e lunar são combinados.'},{q:'Posso verificar compatibilidade?',a:"Sim, selecione a categoria Compatibilidade."},{q:'O que fazer com pontuação baixa?',a:'Evite decisões impulsivas e siga os conselhos personalizados do app.'}] },
    money:{ title:'Sorte Financeira Numerologia — Análise de Dinheiro Gratuita', desc:'Análise de sorte financeira gratuita com numerologia. Pontuação 0–100, conselhos de investimento e poupança personalizados.', keywords:'sorte dinheiro numerologia,finanças horóscopo aniversário,fortuna financeira numerologia,pontuação financeira', h1:'Análise de Sorte Financeira', sub:'Numerologia · Pontuação Financeira', intro:'Obtenha sua pontuação de sorte financeira e conselhos práticos baseados na sua numerologia.', faq:[{q:'Como é calculada a sorte financeira?',a:'Caminho de vida, signo solar e lunar combinados.'},{q:'O que fazer com pontuação baixa?',a:'Construa um fundo de emergência e evite gastos impulsivos.'},{q:'Há conselhos de investimento?',a:'Sim — períodos de alta pontuação incluem recomendações favoráveis.'}] },
    career:{ title:'Sorte na Carreira Numerologia — Análise Profissional Gratuita', desc:'Análise de sorte na carreira gratuita com numerologia. Pontuação 0–100, conselhos de promoção e mudança de emprego.', keywords:'sorte carreira numerologia,profissão horóscopo aniversário,pontuação carreira,numerologia emprego', h1:'Análise de Sorte na Carreira', sub:'Numerologia · Pontuação de Carreira', intro:'Obtenha sua pontuação de sorte na carreira (0–100) e conselhos sobre promoções e mudanças de emprego.', faq:[{q:'Como é calculada a sorte na carreira?',a:'Caminho de vida, signo solar e lunar.'},{q:'Melhor momento para mudar de emprego?',a:'Quando sua pontuação de carreira está alta.'},{q:'O que fazer com pontuação baixa?',a:'Desenvolva suas habilidades atuais e expanda sua rede de contatos.'}] },
    achievement:{ title:'Sorte em Conquistas Numerologia — Análise de Metas Gratuita', desc:'Análise de sorte em conquistas gratuita com numerologia. Pontuação 0–100, dicas de estudo e metas pessoais.', keywords:'sorte conquistas numerologia,acadêmico horóscopo,sucesso escolar numerologia,conquistas numerologia grátis', h1:'Análise de Conquistas', sub:'Numerologia · Pontuação de Conquistas', intro:'Obtenha sua pontuação de conquistas e estratégias de aprendizagem adaptadas ao seu perfil numerológico.', faq:[{q:'O que influencia a sorte em conquistas?',a:'Caminho de vida, signo solar e lunar.'},{q:'Melhor momento para um exame?',a:'Quando sua pontuação de conquistas está alta.'},{q:'O que fazer com pontuação baixa?',a:'Complete tarefas pequenas primeiro para ganhar impulso.'}] },
    gunghap:{ title:'Compatibilidade Numerológica — Análise Gratuita de duas Datas de Nascimento', desc:'Análise de compatibilidade numerológica gratuita. Pontuação & leitura detalhada para duas datas de nascimento. Instantâneo.', keywords:'compatibilidade numerológica,compatibilidade aniversário,teste compatibilidade numerologia,amor compatibilidade', h1:'Análise de Compatibilidade', sub:'Numerologia · Pontuação de Compatibilidade', intro:'Insira duas datas de nascimento para uma análise de compatibilidade baseada em caminhos de vida e horóscopo.', faq:[{q:'Como é calculada a compatibilidade?',a:'Os dois caminhos de vida e signos zodiacais são comparados.'},{q:'É possível superar incompatibilidade?',a:'Sim, comunicação e esforço superam diferenças numéricas.'},{q:'Preciso de horários exatos?',a:'Não — a data de nascimento é suficiente.'}] },
  },
  it:{
    saju:{ title:'Tema Natale Numerologico — Analisi Gratuita dalla tua Data di Nascita', desc:'Analisi numerologica gratuita: numero del percorso di vita, segno solare, lunare e punteggi di fortuna. Istantaneo, senza registrazione.', keywords:'tema natale numerologico,numero percorso vita,numerologia compleanno,oroscopo numerologia,numerologia gratuita', h1:'Analisi Numerologica', sub:'Percorso di Vita · Segno Solare & Lunare · Punteggi Fortuna', intro:"Inserisci la tua data di nascita per un'analisi numerologica completa con percorso di vita, segno solare, lunare e quattro punteggi di fortuna.", faq:[{q:"Cos'è il numero del percorso di vita?",a:'Il numero più importante nella numerologia, calcolato sommando tutte le cifre della tua data di nascita.'},{q:"Cos'è il segno lunare?",a:'Il tuo segno lunare rivela la tua natura emotiva e influenza le relazioni.'},{q:'Quali sono i quattro punteggi?',a:'Fortuna amorosa, finanziaria, di carriera e di realizzazione — ciascuno da 0 a 100.'}] },
    love:{ title:'Fortuna in Amore Numerologia — Analisi Amorosa Gratuita', desc:"Analisi della fortuna in amore gratuita con numerologia e oroscopo. Punteggio 0–100, lettura dettagliata, consigli. Istantaneo.", keywords:'fortuna amore numerologia,compatibilità amorosa compleanno,numerologia amore gratis,oroscopo amore', h1:'Analisi Fortuna in Amore', sub:'Numerologia · Segno Solare Punteggio Amore', intro:'Ottieni il tuo punteggio di fortuna amorosa (0–100) basato sul tuo percorso di vita e oroscopo.', faq:[{q:'Come si calcola la fortuna in amore?',a:'Percorso di vita, segno solare e lunare vengono combinati.'},{q:'Posso verificare la compatibilità?',a:'Sì, seleziona la categoria Compatibilità.'},{q:'Cosa fare con punteggio basso?',a:'Evita decisioni impulsive e segui i consigli personalizzati.'}] },
    money:{ title:'Fortuna Finanziaria Numerologia — Analisi del Denaro Gratuita', desc:'Analisi della fortuna finanziaria gratuita con numerologia. Punteggio 0–100, consigli investimento e risparmio personalizzati.', keywords:'fortuna denaro numerologia,finanze oroscopo compleanno,fortuna finanziaria numerologia,punteggio finanziario', h1:'Analisi Fortuna Finanziaria', sub:'Numerologia · Punteggio Finanziario', intro:'Ottieni il tuo punteggio di fortuna finanziaria e consigli pratici basati sulla tua numerologia.', faq:[{q:'Come si calcola la fortuna finanziaria?',a:'Percorso di vita, segno solare e lunare combinati.'},{q:'Cosa fare con punteggio basso?',a:'Costruisci un fondo di emergenza ed evita spese impulsive.'},{q:'Ci sono consigli sugli investimenti?',a:'Sì — i periodi ad alto punteggio includono raccomandazioni favorevoli.'}] },
    career:{ title:'Fortuna nella Carriera Numerologia — Analisi Professionale Gratuita', desc:'Analisi della fortuna nella carriera gratuita con numerologia. Punteggio 0–100, consigli su promozione e cambio lavoro.', keywords:'fortuna carriera numerologia,professione oroscopo compleanno,punteggio carriera,numerologia lavoro', h1:'Analisi Fortuna nella Carriera', sub:'Numerologia · Punteggio Carriera', intro:'Ottieni il tuo punteggio di fortuna nella carriera (0–100) e consigli su promozioni e cambi di lavoro.', faq:[{q:'Come si calcola la fortuna nella carriera?',a:'Percorso di vita, segno solare e lunare.'},{q:'Miglior momento per cambiare lavoro?',a:'Quando il punteggio carriera è alto.'},{q:'Cosa fare con punteggio basso?',a:'Rafforza le competenze attuali e amplia la rete professionale.'}] },
    achievement:{ title:'Fortuna nei Risultati Numerologia — Analisi degli Obiettivi Gratuita', desc:'Analisi della fortuna nei risultati gratuita con numerologia. Punteggio 0–100, consigli studio e sviluppo personale.', keywords:'fortuna risultati numerologia,accademico oroscopo,successo scolastico numerologia,realizzazioni numerologia', h1:'Analisi dei Risultati', sub:'Numerologia · Punteggio di Realizzazione', intro:'Ottieni il tuo punteggio di realizzazione e strategie di apprendimento adattate al tuo profilo numerologico.', faq:[{q:'Cosa influenza la fortuna nei risultati?',a:'Percorso di vita, segno solare e lunare.'},{q:'Miglior momento per un esame?',a:'Quando il punteggio di realizzazione è alto.'},{q:'Cosa fare con punteggio basso?',a:'Completa prima compiti piccoli per riprendere slancio.'}] },
    gunghap:{ title:'Compatibilità Numerologica — Analisi Gratuita di due Date di Nascita', desc:'Analisi di compatibilità numerologica gratuita. Punteggio e lettura dettagliata per due date di nascita. Istantaneo.', keywords:'compatibilità numerologica,compatibilità compleanno,test compatibilità numerologia,amore compatibilità', h1:'Analisi di Compatibilità', sub:'Numerologia · Punteggio di Compatibilità', intro:"Inserisci due date di nascita per un'analisi di compatibilità basata su percorsi di vita e oroscopo.", faq:[{q:'Come si calcola la compatibilità?',a:'Vengono confrontati i due percorsi di vita e segni zodiacali.'},{q:"Si può superare l'incompatibilità?",a:'Sì, comunicazione e impegno superano le differenze numeriche.'},{q:'Ho bisogno di orari esatti?',a:'No — la data di nascita è sufficiente.'}] },
  },
  id:{
    saju:{ title:'Primbon Jawa Online Gratis — Weton Tanggal Lahir Lengkap', desc:'Analisis Primbon Jawa gratis berdasarkan Weton dari tanggal lahir. Pasaran, Neptu, Hari Baik, dan ramalan lengkap. Tanpa daftar.', keywords:'primbon jawa,weton jawa,kalender jawa,neptu weton,hari baik jawa,primbon online gratis,tanggal lahir weton,primbon 2026', h1:'Analisis Primbon Jawa', sub:'Weton · Pasaran · Neptu · Hari Baik', intro:'Masukkan tanggal lahir Anda untuk analisis Primbon Jawa lengkap berdasarkan Weton (hari + pasaran) dan nilai Neptu.', faq:[{q:'Apa itu Weton?',a:'Weton adalah kombinasi hari dalam seminggu dan hari pasaran (Legi, Pahing, Pon, Wage, Kliwon) untuk menentukan watak dan keberuntungan.'},{q:'Apa itu Neptu?',a:'Neptu adalah nilai numerik dari hari dan pasaran, digunakan untuk menghitung kecocokan dan hari baik.'},{q:'Apa itu Hari Baik?',a:'Hari yang dianggap menguntungkan berdasarkan kombinasi Weton lahir dan Weton hari tersebut.'}] },
    love:{ title:'Keberuntungan Cinta Primbon — Analisis Asmara Gratis Tanggal Lahir', desc:'Analisis keberuntungan cinta gratis berdasarkan Weton Jawa & horoskop. Skor 0–100, bacaan detail, saran. Instan, tanpa daftar.', keywords:'keberuntungan cinta,primbon asmara,weton cinta,zodiak cinta gratis,jodoh weton,asmara primbon jawa', h1:'Analisis Keberuntungan Cinta', sub:'Primbon Jawa · Horoskop Skor Cinta', intro:'Dapatkan skor keberuntungan cinta (0–100) berdasarkan Weton Jawa dan horoskop Anda.', faq:[{q:'Bagaimana keberuntungan cinta dihitung?',a:'Neptu Weton, tanda matahari, dan tanda bulan dikombinasikan.'},{q:'Bisakah cek kecocokan pasangan?',a:"Ya, pilih kategori Kecocokan."},{q:'Apa yang dilakukan jika skor rendah?',a:'Hindari keputusan impulsif dan ikuti saran aplikasi.'}] },
    money:{ title:'Keberuntungan Rezeki Primbon — Analisis Keuangan Gratis Tanggal Lahir', desc:'Analisis keberuntungan rezeki gratis berdasarkan Weton Jawa. Skor 0–100, saran investasi dan tabungan. Instan.', keywords:'keberuntungan rezeki,primbon uang,weton keuangan,rezeki weton,fortuna keuangan jawa,primbon rezeki', h1:'Analisis Keberuntungan Rezeki', sub:'Primbon Jawa · Skor Keuangan', intro:'Dapatkan skor keberuntungan rezeki dan saran keuangan praktis berdasarkan profil Weton Anda.', faq:[{q:'Bagaimana keberuntungan rezeki dihitung?',a:'Neptu Weton, tanda matahari, dan tanda bulan dikombinasikan.'},{q:'Apa yang dilakukan jika skor rendah?',a:'Bangun dana darurat dan hindari pengeluaran impulsif.'},{q:'Ada saran investasi?',a:'Ya — periode skor tinggi mencakup rekomendasi yang menguntungkan.'}] },
    career:{ title:'Keberuntungan Karir Primbon — Analisis Pekerjaan Gratis Tanggal Lahir', desc:'Analisis keberuntungan karir gratis berdasarkan Weton Jawa. Skor 0–100, saran promosi dan ganti pekerjaan. Instan.', keywords:'keberuntungan karir,primbon pekerjaan,weton karir,nasib pekerjaan jawa,karir primbon,promosi weton', h1:'Analisis Keberuntungan Karir', sub:'Primbon Jawa · Skor Karir', intro:'Dapatkan skor keberuntungan karir (0–100) dan saran tentang promosi dan perubahan pekerjaan.', faq:[{q:'Bagaimana keberuntungan karir dihitung?',a:'Neptu Weton, tanda matahari, dan tanda bulan.'},{q:'Kapan waktu terbaik ganti kerja?',a:'Saat skor karir Anda tinggi dan Weton hari itu menguntungkan.'},{q:'Apa yang dilakukan jika skor rendah?',a:'Kembangkan keahlian saat ini dan perkuat hubungan kerja.'}] },
    achievement:{ title:'Keberuntungan Prestasi Primbon — Analisis Pencapaian Gratis', desc:'Analisis keberuntungan prestasi gratis berdasarkan Weton Jawa. Skor 0–100, tips belajar dan pengembangan diri.', keywords:'keberuntungan pencapaian,primbon belajar,weton prestasi,hari baik ujian,belajar primbon,prestasi jawa', h1:'Analisis Keberuntungan Prestasi', sub:'Primbon Jawa · Skor Pencapaian', intro:'Dapatkan skor pencapaian dan strategi belajar yang disesuaikan dengan profil Weton Anda.', faq:[{q:'Apa yang mempengaruhi keberuntungan prestasi?',a:'Neptu Weton, tanda matahari dan bulan.'},{q:'Kapan waktu terbaik ujian?',a:'Saat Hari Baik dan skor pencapaian tinggi.'},{q:'Apa yang dilakukan jika skor rendah?',a:'Selesaikan tugas kecil terlebih dahulu untuk membangun momentum.'}] },
    gunghap:{ title:'Kecocokan Weton Primbon — Analisis Jodoh Gratis dari Tanggal Lahir', desc:'Analisis kecocokan Weton Jawa gratis. Masukkan dua tanggal lahir untuk skor kecocokan dan bacaan detail. Instan, tanpa daftar.', keywords:'kecocokan weton,jodoh weton jawa,cocok weton,kecocokan pasangan jawa,weton pasaran kecocokan,jodoh primbon', h1:'Analisis Kecocokan Weton', sub:'Primbon Jawa · Skor Kecocokan', intro:'Masukkan dua tanggal lahir untuk analisis kecocokan berdasarkan Weton Jawa dan Neptu.', faq:[{q:'Bagaimana kecocokan dihitung?',a:'Neptu kedua Weton dibandingkan menggunakan formula Primbon tradisional.'},{q:'Apakah kecocokan buruk berarti tidak cocok?',a:'Tidak. Kecocokan adalah panduan, bukan vonis. Komunikasi dan usaha dapat mengatasinya.'},{q:'Perlu waktu lahir yang tepat?',a:'Tidak — tanggal lahir saja sudah cukup.'}] },
  },
};

// ── Shared SEO helpers ───────────────────────────────────
const NAV_FOOTER_CSS = `
.page-nav{background:#0f172a;padding:16px 16px 14px;}
.nav-inner{max-width:780px;margin:0 auto;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}
.page-nav a{color:#94a3b8;text-decoration:none;font-size:12px;padding:5px 12px;border-radius:20px;border:1px solid rgba(148,163,184,.2);white-space:nowrap;}
.page-nav a:hover,.page-nav a.nav-act{background:#4338ca;color:#fff;border-color:#4338ca;}
.site-footer{background:#0f172a;color:#475569;font-size:11px;text-align:center;padding:10px 20px 20px;border-top:1px solid #1e293b;}
.site-footer a{color:#4f46e5;text-decoration:none;margin:0 6px;}
.aff-slot{max-width:640px;margin:18px auto;padding:0 16px;}
.aff-label{font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;}
.aff-card{display:flex;align-items:center;gap:12px;background:#fff;border:1.5px solid #e7e5e4;border-radius:14px;padding:13px 16px;margin-bottom:8px;text-decoration:none;color:#1c1917;box-shadow:0 1px 6px rgba(0,0,0,.05);transition:transform .12s,border-color .12s;}
.aff-card:hover{transform:translateY(-1px);border-color:#d97706;}
.aff-icon{font-size:26px;flex-shrink:0;}
.aff-body{flex:1;display:flex;flex-direction:column;gap:2px;}
.aff-body strong{font-size:14px;font-weight:800;}
.aff-body span{font-size:12px;color:#78716c;}
.aff-cta{flex-shrink:0;background:#d97706;color:#fff;font-size:12px;font-weight:800;padding:7px 14px;border-radius:50px;white-space:nowrap;}
.ads-unit-wrap{max-width:780px;margin:18px auto 6px;padding:0 16px;min-height:50px;}`;

const _NAV_CAT_LABELS = {
  ko:{saju:'🔮 사주',love:'💝 연애운',money:'💰 금전운',career:'💼 직업운',achievement:'🏆 성취운',gunghap:'💑 궁합'},
  ja:{saju:'🔮 九星気学',love:'💝 恋愛運',money:'💰 金運',career:'💼 仕事運',achievement:'🏆 学業運',gunghap:'💑 相性'},
  en:{saju:'🔮 Birth Chart',love:'💝 Love',money:'💰 Money',career:'💼 Career',achievement:'🏆 Achievement',gunghap:'💑 Compatibility'},
  de:{saju:'🔮 Geburtschart',love:'💝 Liebe',money:'💰 Geld',career:'💼 Karriere',achievement:'🏆 Leistung',gunghap:'💑 Partnerschaft'},
  fr:{saju:'🔮 Thème',love:'💝 Amour',money:'💰 Finances',career:'💼 Carrière',achievement:'🏆 Réussite',gunghap:'💑 Compatibilité'},
  es:{saju:'🔮 Carta',love:'💝 Amor',money:'💰 Dinero',career:'💼 Carrera',achievement:'🏆 Logros',gunghap:'💑 Compatibilidad'},
  pt:{saju:'🔮 Mapa',love:'💝 Amor',money:'💰 Dinheiro',career:'💼 Carreira',achievement:'🏆 Conquistas',gunghap:'💑 Compatibilidade'},
  it:{saju:'🔮 Tema',love:'💝 Amore',money:'💰 Denaro',career:'💼 Carriera',achievement:'🏆 Risultati',gunghap:'💑 Compatibilità'},
  id:{saju:'🔮 Primbon',love:'💝 Cinta',money:'💰 Rezeki',career:'💼 Karir',achievement:'🏆 Prestasi',gunghap:'💑 Kecocokan'},
};
const _NAV_MAIN = {ko:'🍀 행운의 번호',ja:'🍀 幸運の数字',en:'🍀 Lucky Numbers',de:'🍀 Glückszahlen',fr:'🍀 Numéros de Chance',es:'🍀 Números de Suerte',pt:'🍀 Números da Sorte',it:'🍀 Numeri Fortunati',id:'🍀 Angka Keberuntungan'};

function buildNavFooter(lang, activePage) {
  const catSlugs = CAT_SLUGS[lang] || {};
  const labels = _NAV_CAT_LABELS[lang] || _NAV_CAT_LABELS.en;
  const mainHref = lang === 'ko' ? `${SITE_URL}/lucky/` : `${SITE_URL}/${lang}/lucky/`;
  const catLinks = Object.entries(catSlugs).map(([cat, slug]) => {
    const href = lang === 'ko' ? `${SITE_URL}/${slug}/` : `${SITE_URL}/${lang}/${slug}/`;
    return `<a href="${href}"${activePage===cat?' class="nav-act"':''}>${esc(labels[cat]||cat)}</a>`;
  }).join('');
  return `${ADS_UNIT}${renderAffSlot(lang)}<nav class="page-nav" aria-label="categories"><div class="nav-inner"><a href="${mainHref}"${activePage==='lucky'?' class="nav-act"':''}>${_NAV_MAIN[lang]||_NAV_MAIN.en}</a>${catLinks}</div></nav><footer class="site-footer"><a href="${SITE_URL}/lucky-sitemap.xml">Sitemap</a> · <a href="${mainHref}">${mainHref}</a></footer>`;
}


// ── AI 운세 상담 시스템 프롬프트 ─────────────────────────
function buildFortuneSystemPrompt(lang, d) {
  const today = new Date().toISOString().slice(0,10);
  // 간결 모드: 질문에 직접 답하고 인사말·서론 없이 핵심만 (토큰 절감 → 무료 한도↑)
  const CONTEXTS = {
    ko:`사주·오행 운세 상담가. 한국어로만. 오늘 ${today}. 질문에 바로 답하고 인사말·서론 없이 핵심만 2~3문장으로 간결하게.`,
    en:`Numerology & astrology advisor. English only. Today ${today}. Answer the question directly in 2-3 short sentences, no greeting or preamble.`,
    ja:`九星・数秘の運勢相談員。日本語のみ。今日${today}。挨拶や前置きなしで質問に直接、2〜3文で簡潔に。`,
    de:`Numerologie-Berater. Nur Deutsch. Heute ${today}. Antworte direkt in 2-3 kurzen Sätzen, ohne Begrüßung.`,
    fr:`Conseiller en numérologie. Français uniquement. Aujourd'hui ${today}. Réponds directement en 2-3 phrases courtes, sans salutation.`,
    es:`Asesor de numerología. Solo español. Hoy ${today}. Responde directo en 2-3 frases cortas, sin saludo.`,
    pt:`Consultor de numerologia. Só português. Hoje ${today}. Responda direto em 2-3 frases curtas, sem saudação.`,
    it:`Consulente di numerologia. Solo italiano. Oggi ${today}. Rispondi diretto in 2-3 frasi brevi, senza saluto.`,
    id:`Konsultan Primbon. Hanya bahasa Indonesia. Hari ini ${today}. Jawab langsung dalam 2-3 kalimat singkat, tanpa salam.`,
  };
  let dataStr = '';
  if (d) {
    const labels = {
      ko:['생년월일','오행','띠','행운번호','연애운','금전운','직업운','성취운'],
      en:['Birth date','Element','Zodiac','Lucky numbers','Love','Money','Career','Achievement'],
      ja:['生年月日','五行','干支','ラッキー数','恋愛運','金運','仕事運','達成運'],
    };
    const lb = labels[lang] || labels.en;
    dataStr = `\n\n[User Fortune Data]\n${lb[0]}: ${d.birthDate||''}\n${lb[1]}: ${d.element||''}\n${lb[2]}: ${d.zodiac||''}\n${lb[3]}: ${d.luckyNums||''}\n${lb[4]}: ${d.loveScore??'?'}/100\n${lb[5]}: ${d.moneyScore??'?'}/100\n${lb[6]}: ${d.careerScore??'?'}/100\n${lb[7]}: ${d.achieveScore??'?'}/100`;
  }
  return (CONTEXTS[lang] || CONTEXTS.en) + dataStr;
}

// ── AdSense (모든 SEO 페이지 공통) ──────────────────────────
// ADS_TAG: head 로더 스크립트 / ADS_UNIT: 수동 디스플레이 광고 단위 (all-life-webapp, slot 8233374508)
const ADS_TAG = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1378943893051810" crossorigin="anonymous"></script>`;
const ADS_UNIT = `<div class="ads-unit-wrap"><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1378943893051810" data-ad-slot="8233374508" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`;

// ── 어필리에이트 슬롯 (링크 확보 시 AFF_OFFERS 만 채우면 전 페이지에 표시) ──
// 형식: lang: [{ icon, title, desc, cta, url }] — url 은 어필리에이트 트래킹 링크.
// 비워두면 아무것도 렌더되지 않음. rel="sponsored nofollow" 로 SEO 안전.
const AFF_OFFERS = {
  // 예시:
  // ko: [{ icon:'🔮', title:'전문 타로 1:1 상담', desc:'첫 상담 50% 할인', cta:'상담 받기', url:'https://example.com/?aff=YOUR_ID' }],
  // en: [{ icon:'✨', title:'Personal Astrology Reading', desc:'First reading 50% off', cta:'Get Reading', url:'https://example.com/?aff=YOUR_ID' }],
};
const AFF_LABELS = { ko:'추천 서비스 · 광고', en:'Recommended · Ad', ja:'おすすめ · 広告', de:'Empfohlen · Anzeige', fr:'Recommandé · Pub', es:'Recomendado · Anuncio', pt:'Recomendado · Anúncio', it:'Consigliato · Annuncio', id:'Rekomendasi · Iklan' };
function renderAffSlot(lang){
  const offers = AFF_OFFERS[lang];
  if (!offers || !offers.length) return '';
  const cards = offers.map(o=>`<a class="aff-card" href="${o.url}" target="_blank" rel="sponsored nofollow noopener"><span class="aff-icon">${o.icon||'⭐'}</span><span class="aff-body"><strong>${esc(o.title)}</strong><span>${esc(o.desc||'')}</span></span><span class="aff-cta">${esc(o.cta||'→')}</span></a>`).join('');
  return `<div class="aff-slot"><div class="aff-label">${AFF_LABELS[lang]||AFF_LABELS.en}</div>${cards}</div>`;
}

// ── Escape HTML ──────────────────────────────────────────
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── hreflang 태그 빌더 (하위 페이지 언어 클러스터링) ──────────
// entries: [{lang, url}] — 같은 콘텐츠의 각 언어 버전. xDefault 지정 시 x-default 추가.
function buildHreflang(entries, xDefault){
  let s = entries.map(e=>`<link rel="alternate" hreflang="${e.lang}" href="${e.url}">`).join('\n');
  if (xDefault) s += `\n<link rel="alternate" hreflang="x-default" href="${xDefault}">`;
  return s;
}
// 출생연도 페이지 언어 클러스터 (ko /YYYY/, en /en/born-YYYY/, ja /ja/YYYYnen/)
function bornYearHreflang(year){
  const y = parseInt(year, 10);
  const e = [];
  if (y>=1950 && y<=2010) e.push({lang:'ko', url:`${SITE_URL}/${y}/`});
  if (y>=1940 && y<=2010) { e.push({lang:'en', url:`${SITE_URL}/en/born-${y}/`}); e.push({lang:'ja', url:`${SITE_URL}/ja/${y}nen/`}); }
  return buildHreflang(e, (y>=1940 && y<=2010) ? `${SITE_URL}/en/born-${y}/` : '');
}

// ── Main fetch handler ───────────────────────────────────
export default {
  async fetch(request, env) {
    const url  = new URL(request.url);
    const path = url.pathname;

    // ── robots.txt ───────────────────────────────────────
    if (path === '/robots.txt') {
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/lucky-sitemap.xml\n`,
        {headers:{'Content-Type':'text/plain;charset=UTF-8','Cache-Control':'public,max-age=86400'}}
      );
    }

    // ── Sitemap ──────────────────────────────────────────
    if (path === '/lucky-sitemap.xml') {
      const lastmod = '2026-06-12'; // 콘텐츠 대규모 변경일 (hreflang·콘텐츠 보강)
      const todayStr = new Date().toISOString().slice(0,10); // today 페이지는 매일 갱신
      const ZODIAC_SLUGS_SM = {
        en:['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'],
        de:['widder','stier','zwillinge','krebs','loewe','jungfrau','waage','skorpion','schuetze','steinbock','wassermann','fische'],
        fr:['belier','taureau','gemeaux','cancer','lion','vierge','balance','scorpion','sagittaire','capricorne','verseau','poissons'],
        es:['aries','tauro','geminis','cancer','leo','virgo','libra','escorpio','sagitario','capricornio','acuario','piscis'],
        pt:['aries','touro','gemeos','cancer','leao','virgem','libra','escorpiao','sagitario','capricornio','aquario','peixes'],
        it:['ariete','toro','gemelli','cancro','leone','vergine','bilancia','scorpione','sagittario','capricorno','acquario','pesci'],
      };
      const COMPAT_PATHS_SM = {ko:'gunghap',en:'compatibility',ja:'compatibility',de:'partnerschaft',fr:'compatibilite',es:'compatibilidad',pt:'compatibilidade',it:'compatibilita',id:'kecocokan'};
      const locs = [
        { lang:'ko', loc:`${SITE_URL}/lucky/`, priority:'1.0' },
        ...['en','ja','de','fr','es','pt','it','id'].map(l => ({ lang:l, loc:`${SITE_URL}/${l}/lucky/`, priority:'0.9' })),
        // Today pages for all 9 langs (매일 콘텐츠 갱신 → lastmod 동적)
        ...ALL_LANGS.map(l => ({ lang:l, loc:`${SITE_URL}/${l}/today/`, priority:'0.8', lm: todayStr })),
        // Angel number pages (en/de/fr/es/pt/it × 10 numbers)
        ...['en','de','fr','es','pt','it'].flatMap(l => {
          const pfx={en:'angel',de:'engel',fr:'ange',es:'angel',pt:'anjo',it:'angelo'};
          return ['111','222','333','444','555','666','777','888','999','1111'].map(n=>({lang:l,loc:`${SITE_URL}/${l}/${pfx[l]}/${n}/`,priority:'0.75'}));
        }),
        // Nine Star Ki (ja, 9 pages)
        ...['ikki','jikoku','sanpoku','yonroku','goo','rokusei','shichishin','hapaku','kyushi'].map(s=>({lang:'ja',loc:`${SITE_URL}/ja/${s}/`,priority:'0.75'})),
        // En born year pages (1940–2010)
        ...[...Array(71)].map((_,i)=>({lang:'en',loc:`${SITE_URL}/en/born-${1940+i}/`,priority:'0.75'})),
        // Ja nen pages (1940–2010)
        ...[...Array(71)].map((_,i)=>({lang:'ja',loc:`${SITE_URL}/ja/${1940+i}nen/`,priority:'0.75'})),
        // Compat pages (ko 제외 — ko 궁합은 루트 /gunghap/ 카테고리로 이미 등록됨. /ko/gunghap/는 301 리다이렉트라 sitemap 부적합)
        ...Object.entries(COMPAT_PATHS_SM).filter(([l])=>l!=='ko').map(([l,slug])=>({ lang:l, loc:`${SITE_URL}/${l}/${slug}/`, priority:'0.7' })),
        // Category pages (9 langs × 6 cats = 54 URLs) — ko는 루트 레벨
        ...ALL_LANGS.filter(l=>CAT_SLUGS[l]).flatMap(l=>Object.entries(CAT_SLUGS[l]).map(([cat,slug])=>({lang:l,loc:l==='ko'?`${SITE_URL}/${slug}/`:`${SITE_URL}/${l}/${slug}/`,priority:'0.85'}))),
        // Zodiac pages
        ...Object.entries(ZODIAC_SLUGS_SM).flatMap(([l,slugs])=>slugs.map(s=>({ lang:l, loc:`${SITE_URL}/${l}/${s}/`, priority:'0.7' }))),
        // 십이지 Chinese zodiac (ko root-level + ja/en/id)
        ...['원숭이','닭','개','돼지','쥐','소','호랑이','토끼','용','뱀','말','양'].map(s=>({lang:'ko',loc:`${SITE_URL}/${encodeURIComponent(s)}/`,priority:'0.75'})),
        ...['saru','tori','inu','i','ne','ushi','tora','u','tatsu','mi','uma','hitsuji'].map(s=>({lang:'ja',loc:`${SITE_URL}/ja/${s}/`,priority:'0.75'})),
        ...['monkey','rooster','dog','pig','rat','ox','tiger','rabbit','dragon','snake','horse','goat'].map(s=>({lang:'en',loc:`${SITE_URL}/en/${s}/`,priority:'0.7'})),
        ...['monyet','ayam','anjing','babi','tikus','kerbau','macan','kelinci','naga','ular','kuda','kambing'].map(s=>({lang:'id',loc:`${SITE_URL}/id/${s}/`,priority:'0.7'})),
        // Ko 출생연도 페이지 (1950-2010)
        ...[...Array(61)].map((_,i)=>({lang:'ko',loc:`${SITE_URL}/${1950+i}/`,priority:'0.8'})),
        // 혈액형 ko + ja
        ...['blood-a','blood-b','blood-o','blood-ab'].map(s=>({lang:'ko',loc:`${SITE_URL}/ko/${s}/`,priority:'0.75'})),
        ...['ketsueki-a','ketsueki-b','ketsueki-o','ketsueki-ab'].map(s=>({lang:'ja',loc:`${SITE_URL}/ja/${s}/`,priority:'0.75'})),
      ];
      const alts = locs.map(l =>
        `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${l.loc}"/>`
      ).join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/lucky/"/>`;

      const urlsXml = locs.map((l) => `  <url>
    <loc>${l.loc}</loc>
    <changefreq>${l.lm ? 'daily' : 'weekly'}</changefreq>
    <priority>${l.priority || '0.7'}</priority>
    <lastmod>${l.lm || lastmod}</lastmod>
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

    // ── AI 운세 상담 (/lucky-chat) ──────────────────────────────
    // 무료 천장 극대화: Groq(주, ~수천회/일·매우 빠름) → 한도 초과/실패 시
    // Cloudflare Workers AI(폴백, 키 불필요)로 자동 전환. 두 무료 티어를 쌓음.
    if (path === '/lucky-chat') {
      const cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      };
      if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
      if (request.method !== 'POST')    return new Response('Method Not Allowed', { status: 405, headers: cors });

      const sseHeaders = { ...cors, 'Content-Type':'text/event-stream', 'Cache-Control':'no-cache', 'X-Accel-Buffering':'no' };
      try {
        const body = await request.json();
        const { lang = 'en', fortuneData = null, messages = [] } = body;
        const systemPrompt = buildFortuneSystemPrompt(lang, fortuneData);
        const userMessages = (messages && messages.length)
          ? messages
          : [{ role: 'user', content: 'Please give me a brief reading based on my data.' }];
        const allMessages = [{ role: 'system', content: systemPrompt }, ...userMessages];

        // 1) Groq 우선 (OpenAI 호환 스트리밍)
        if (env && env.GROQ_KEY) {
          try {
            const gr = await fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${env.GROQ_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ model: GROQ_MODEL, messages: allMessages, stream: true, max_tokens: 300, temperature: 0.6 }),
            });
            if (gr.ok && gr.body) {
              return new Response(gr.body, { headers: sseHeaders });
            }
            // gr.ok=false(429 토큰/요청 한도 등) → 아래 CF 폴백으로
          } catch (eg) { /* 네트워크 오류 → CF 폴백 */ }
        }

        // 2) Cloudflare Workers AI 폴백 (키 불필요)
        if (env && env.AI) {
          let stream;
          try {
            stream = await env.AI.run(CHAT_MODEL, { messages: allMessages, stream: true, max_tokens: 300, temperature: 0.6 });
          } catch (e1) {
            stream = await env.AI.run(CHAT_MODEL_FALLBACK, { messages: allMessages, stream: true, max_tokens: 300, temperature: 0.6 });
          }
          return new Response(stream, { headers: sseHeaders });
        }

        const m = 'data: {"response":"⚠️ AI 서비스가 설정되지 않았습니다."}\n\ndata: [DONE]\n\n';
        return new Response(m, { status: 200, headers: sseHeaders });
      } catch (e) {
        const m = 'data: {"response":"⚠️ 일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요."}\n\ndata: [DONE]\n\n';
        return new Response(m, { status: 200, headers: sseHeaders });
      }
    }

    // ── Category pages: /{lang}/{cat-slug}/ + ko root-level /{cat-slug}/ ──
    {
      // ko는 /ko/ 없이 루트 레벨: /saju/, /love-fortune/ 등
      // 다른 언어: /en/love-fortune/, /ja/kyusei/ 등
      let catLang = null, catSlug = null;
      const catM = path.match(/^\/([a-z]{2,3})\/([a-z][a-z-]*)\/?$/);
      if (catM) {
        catLang = catM[1]; catSlug = catM[2];
        // /ko/saju/ → 301 redirect to /saju/
        if (catLang === 'ko' && slugToCat('ko', catSlug)) {
          return Response.redirect(`${SITE_URL}/${catSlug}/`, 301);
        }
      } else {
        const rootM = path.match(/^\/([a-z][a-z-]+)\/?$/);
        if (rootM && slugToCat('ko', rootM[1])) { catLang = 'ko'; catSlug = rootM[1]; }
      }
      if (catLang && catSlug) {
        const catKey = slugToCat(catLang, catSlug);
        if (catKey && CAT_META[catLang] && CAT_META[catLang][catKey] && LANGS[catLang]) {
          const CM = CAT_META[catLang][catKey];
          const LL = LANGS[catLang];
          // ko는 루트 레벨 canonical
          const catCanonical = catLang === 'ko'
            ? `${SITE_URL}/${catSlug}/`
            : `${SITE_URL}/${catLang}/${catSlug}/`;
          const _catHref = (l) => {
            const sl = CAT_SLUGS[l][catKey];
            return l === 'ko' ? `${SITE_URL}/${sl}/` : `${SITE_URL}/${l}/${sl}/`;
          };
          const catHreflangs = ALL_LANGS.filter(l=>CAT_SLUGS[l]&&CAT_SLUGS[l][catKey]).map(l=>
            `<link rel="alternate" hreflang="${l}" href="${_catHref(l)}">`
          ).join('\n');
          let catIframeSrc = `${APP_URL}/?lang=${catLang}&cat=${catKey}`;
          if (catKey==='gunghap') {
            const cp2=url.searchParams;
            const bd1=cp2.get('bd')||'', bd2=cp2.get('bd2')||'';
            if (bd1) catIframeSrc+=`&bd=${encodeURIComponent(bd1)}`;
            if (bd2) catIframeSrc+=`&bd2=${encodeURIComponent(bd2)}`;
          }
          const catFaqSchema=JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":(CM.faq||[]).map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
          const catAppSchema=JSON.stringify({"@context":"https://schema.org","@type":"WebApplication","name":CM.h1,"description":CM.desc,"url":catCanonical,"applicationCategory":"EntertainmentApplication","inLanguage":catLang,"offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"operatingSystem":"Web","browserRequirements":"Requires JavaScript"});
          const catBreadcrumb=JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"all-lifes.com","item":SITE_URL},{"@type":"ListItem","position":2,"name":LL.h1,"item":catLang==='ko'?`${SITE_URL}/lucky/`:`${SITE_URL}/${catLang}/lucky/`},{"@type":"ListItem","position":3,"name":CM.h1,"item":catCanonical}]});
          const catFaqHtml=(CM.faq||[]).map((f,i)=>`<details class="faq-item"${i===0?' open':''}><summary class="faq-q">${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
          const CAT_GRAD={saju:'linear-gradient(135deg,#1e1b4b,#312e81)',love:'linear-gradient(135deg,#831843,#be185d)',money:'linear-gradient(135deg,#064e3b,#059669)',career:'linear-gradient(135deg,#1e3a5f,#1d4ed8)',achievement:'linear-gradient(135deg,#451a03,#d97706)',gunghap:'linear-gradient(135deg,#4c1d95,#7c3aed)'};
          const catGrad=CAT_GRAD[catKey]||CAT_GRAD.saju;
          const langBarHtmlCat=ALL_LANGS.filter(l=>CAT_SLUGS[l]&&CAT_SLUGS[l][catKey]).map(l=>{const nm=l==='ko'?'한국어':(LANGS[l]?LANGS[l].name:l.toUpperCase());return `<a href="${_catHref(l)}"${l===catLang?' class="active"':''}>${nm}</a>`;}).join('');
          const catHtml=`<!DOCTYPE html>
<html lang="${catLang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1378943893051810" crossorigin="anonymous"></script>
<title>${esc(CM.title)}</title>
<meta name="description" content="${esc(CM.desc)}">
<meta name="keywords" content="${esc(CM.keywords)}">
<link rel="canonical" href="${esc(catCanonical)}">
${catHreflangs}
<meta property="og:title" content="${esc(CM.title)}">
<meta property="og:description" content="${esc(CM.desc)}">
<meta property="og:url" content="${esc(catCanonical)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${LL.locale}">
<meta property="og:image" content="${APP_URL}/og-${catLang}.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(CM.title)}">
<meta name="twitter:description" content="${esc(CM.desc)}">
<script type="application/ld+json">${catAppSchema}</script>
<script type="application/ld+json">${catFaqSchema}</script>
<script type="application/ld+json">${catBreadcrumb}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;color:#1c1917;}
.hero{background:${catGrad};color:#fff;padding:32px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(20px,4vw,34px);font-weight:900;margin-bottom:6px;line-height:1.2;}
.hero p{font-size:13px;color:rgba(255,255,255,0.8);max-width:520px;margin:0 auto 16px;line-height:1.6;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;box-shadow:0 4px 16px rgba(217,119,6,0.4);}
.start-btn:hover{transform:translateY(-1px);}
.lang-bar{background:#1e1b4b;padding:8px 16px;text-align:center;font-size:12px;overflow-x:auto;white-space:nowrap;}
.lang-bar a{color:#a5b4fc;text-decoration:none;margin:0 5px;}
.lang-bar a:hover{color:#fff;}
.lang-bar a.active{color:#fbbf24;font-weight:700;}
iframe{width:100%;border:none;display:block;height:560px;}
.seo-section{background:#fff;border-top:1px solid #e7e5e4;padding:36px 20px 48px;}
.seo-section .inner{max-width:780px;margin:0 auto;}
.seo-intro{font-size:14px;color:#44403c;line-height:1.85;margin-bottom:28px;padding:20px 22px;background:#fffbeb;border-left:4px solid #d97706;border-radius:0 12px 12px 0;}
.section-h2{font-size:18px;font-weight:800;color:#1e1b4b;margin-bottom:16px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:15px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#d97706;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
${NAV_FOOTER_CSS}
</style>
</head>
<body>
<div class="hero">
  <h1>${esc(CM.h1)}</h1>
  <p>${esc(CM.sub)}</p>
  <a class="start-btn" href="#cat-frame">${esc(LL.start)}</a>
</div>
<div class="lang-bar">${langBarHtmlCat}</div>
<iframe id="cat-frame" src="${esc(catIframeSrc)}" scrolling="no" title="${esc(CM.h1)}" loading="lazy"></iframe>
<div class="seo-section">
  <div class="inner">
    ${CM.intro?`<p class="seo-intro">${esc(CM.intro)}</p>`:''}
    ${catFaqHtml?`<section class="faq-section"><h2 class="section-h2">${esc(LL.faqH2||'FAQ')}</h2>${catFaqHtml}</section>`:''}
  </div>
</div>
<script>(function(){var f=document.getElementById('cat-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});f.addEventListener('load',function(){setTimeout(function(){try{var inner=f.contentDocument||f.contentWindow.document;var bh=inner&&inner.body?inner.body.scrollHeight:0;if(bh>100){var h2=bh+24;lastH=h2;f.style.height=h2+'px';}}catch(ex){}},800);});})();</script>
${buildNavFooter(catLang, catKey)}
</body>
</html>`;
          return new Response(catHtml,{headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':(catKey==='gunghap'&&url.searchParams.get('bd')&&url.searchParams.get('bd2'))?'public,max-age=300':'public,max-age=3600','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── Angel number pages (/en/angel/111/, /de/engel/222/, etc.) ───
    {
      const ANGEL_PREFIX = {en:'angel',de:'engel',fr:'ange',es:'angel',pt:'anjo',it:'angelo'};
      const ANGEL_NUMS = ['111','222','333','444','555','666','777','888','999','1111'];
      const angelMatch = path.match(/^\/([a-z]{2})\/(angel|engel|ange|anjo|angelo)\/(\d{3,4})\/?$/);
      if (angelMatch) {
        const aLang = angelMatch[1], aNum = angelMatch[3];
        if (ANGEL_PREFIX[aLang] === angelMatch[2] && ANGEL_NUMS.includes(aNum) && LANGS[aLang]) {
          const ANGEL_MEANINGS = {
            '111':{en:'New beginnings, manifestation, and alignment. Your thoughts are becoming reality — focus on what you truly want.',de:'Neubeginn, Manifestation und Ausrichtung. Ihre Gedanken werden Wirklichkeit.',fr:'Nouveaux débuts, manifestation et alignement. Vos pensées deviennent réalité.',es:'Nuevos comienzos, manifestación y alineación. Tus pensamientos se están convirtiendo en realidad.',pt:'Novos começos, manifestação e alinhamento. Seus pensamentos estão se tornando realidade.',it:'Nuovi inizi, manifestazione e allineamento. I tuoi pensieri stanno diventando realtà.'},
            '222':{en:'Balance, partnership, and faith. Trust the process — you are exactly where you need to be.',de:'Balance, Partnerschaft und Vertrauen. Vertraue dem Prozess.',fr:'Équilibre, partenariat et foi. Faites confiance au processus.',es:'Equilibrio, asociación y fe. Confía en el proceso.',pt:'Equilíbrio, parceria e fé. Confie no processo.',it:'Equilibrio, partnership e fiducia. Fidati del processo.'},
            '333':{en:'Creative energy, self-expression, and growth. The ascended masters are near.',de:'Kreative Energie, Selbstausdruck und Wachstum.',fr:'Énergie créative, expression personnelle et croissance.',es:'Energía creativa, autoexpresión y crecimiento.',pt:'Energia criativa, autoexpressão e crescimento.',it:'Energia creativa, autoespressione e crescita.'},
            '444':{en:'Stability, protection, and angelic presence. You are surrounded by support.',de:'Stabilität, Schutz und engelhafte Präsenz.',fr:'Stabilité, protection et présence angélique.',es:'Estabilidad, protección y presencia angélica.',pt:'Estabilidade, proteção e presença angelical.',it:'Stabilità, protezione e presenza angelica.'},
            '555':{en:'Major change, freedom, and transformation. A significant shift is coming.',de:'Große Veränderung, Freiheit und Transformation.',fr:'Changement majeur, liberté et transformation.',es:'Cambio mayor, libertad y transformación.',pt:'Grande mudança, liberdade e transformação.',it:'Cambiamento importante, libertà e trasformazione.'},
            '666':{en:'Realignment — balance between material and spiritual. Refocus on what truly matters.',de:'Neuausrichtung — Gleichgewicht zwischen Materiellem und Spirituellem.',fr:'Réalignement — équilibre entre matériel et spirituel.',es:'Realineación — equilibrio entre lo material y lo espiritual.',pt:'Realinhamento — equilíbrio entre o material e o espiritual.',it:'Riallineamento — equilibrio tra materiale e spirituale.'},
            '777':{en:'Divine luck, spiritual awakening, and inner wisdom. You are on the right path.',de:'Göttliches Glück, spirituelles Erwachen und innere Weisheit.',fr:'Chance divine, éveil spirituel et sagesse intérieure.',es:'Suerte divina, despertar espiritual y sabiduría interior.',pt:'Sorte divina, despertar espiritual e sabedoria interior.',it:'Fortuna divina, risveglio spirituale e saggezza interiore.'},
            '888':{en:'Abundance, financial flow, and achievement. Prosperity cycles are activating.',de:'Fülle, finanzieller Fluss und Erfolg. Wohlstandszyklen aktivieren sich.',fr:'Abondance, flux financier et accomplissement.',es:'Abundancia, flujo financiero y logro.',pt:'Abundância, fluxo financeiro e realização.',it:'Abbondanza, flusso finanziario e realizzazione.'},
            '999':{en:'Completion, endings, and humanitarian service. A major chapter is closing.',de:'Vollendung, Enden und humanitärer Dienst. Ein großes Kapitel schließt sich.',fr:'Achèvement, fins et service humanitaire.',es:'Culminación, finales y servicio humanitario.',pt:'Conclusão, finais e serviço humanitário.',it:'Completamento, finali e servizio umanitario.'},
            '1111':{en:'Awakening, portal, and alignment. A powerful manifestation gateway is open.',de:'Erwachen, Portal und Ausrichtung. Ein kraftvolles Manifestationstor ist offen.',fr:'Éveil, portail et alignement. Une puissante porte de manifestation est ouverte.',es:'Despertar, portal y alineación. Una poderosa puerta de manifestación está abierta.',pt:'Despertar, portal e alinhamento. Um poderoso portal de manifestação está aberto.',it:'Risveglio, portale e allineamento. Un potente portale di manifestazione è aperto.'},
          };
          const aCanonical = `${SITE_URL}/${aLang}/${ANGEL_PREFIX[aLang]}/${aNum}/`;
          const aHreflang = buildHreflang(Object.keys(ANGEL_PREFIX).map(l=>({lang:l,url:`${SITE_URL}/${l}/${ANGEL_PREFIX[l]}/${aNum}/`})), `${SITE_URL}/en/angel/${aNum}/`);
          const meaning = (ANGEL_MEANINGS[aNum]||{})[aLang] || (ANGEL_MEANINGS[aNum]||{}).en || '';
          const aTitle = aLang==='de'?`Engelszahl ${aNum} Bedeutung — Numerologie & Glückszahlen`:aLang==='fr'?`Nombre Angélique ${aNum} Signification — Numérologie`:aLang==='es'?`Número Angelical ${aNum} Significado — Numerología`:aLang==='pt'?`Número Anjo ${aNum} Significado — Numerologia`:aLang==='it'?`Numero Angelico ${aNum} Significato — Numerologia`:`Angel Number ${aNum} Meaning — Numerology & Lucky Numbers`;
          const aDesc = `${meaning.slice(0,120)}`;
          const aNavNums = ANGEL_NUMS.filter(n=>n!==aNum).map(n=>`<a href="${SITE_URL}/${aLang}/${ANGEL_PREFIX[aLang]}/${n}/">${n}</a>`).join(' ');
          const aFaq = aLang==='de'?[
            {q:`Was bedeutet Engelszahl ${aNum}?`,a:meaning},
            {q:'Wie oft sehe ich Engelszahlen?',a:'Engelszahlen erscheinen, wenn Sie besonders empfänglich für spirituelle Botschaften sind — typischerweise in Zeiten des Wandels.'},
            {q:'Sind Engelszahlen wirklich bedeutsam?',a:'Viele Numerologen und spirituelle Praktiker sehen in wiederkehrenden Zahlenmustern Hinweise des Universums. Ob Sie daran glauben liegt bei Ihnen.'},
          ]:aLang==='fr'?[
            {q:`Que signifie le nombre angélique ${aNum}?`,a:meaning},
            {q:'À quelle fréquence les nombres angéliques apparaissent-ils?',a:'Ils apparaissent quand vous êtes réceptif aux messages spirituels, souvent lors de transitions importantes.'},
            {q:'Les nombres angéliques sont-ils vraiment significatifs?',a:'Nombreux numérологues voient dans ces patterns répétitifs des signes de l\'univers. La signification vous appartient.'},
          ]:aLang==='es'?[
            {q:`¿Qué significa el número angelical ${aNum}?`,a:meaning},
            {q:'¿Con qué frecuencia aparecen los números angelicales?',a:'Aparecen cuando estás receptivo a mensajes espirituales, a menudo en momentos de cambio.'},
            {q:'¿Son realmente significativos los números angelicales?',a:'Muchos numerólogos ven en estos patrones repetitivos señales del universo. El significado es tuyo para interpretarlo.'},
          ]:aLang==='pt'?[
            {q:`O que significa o número anjo ${aNum}?`,a:meaning},
            {q:'Com que frequência os números anjo aparecem?',a:'Eles aparecem quando você está receptivo a mensagens espirituais, frequentemente em momentos de mudança.'},
            {q:'Os números anjo são realmente significativos?',a:'Muitos numerólogos veem nesses padrões repetitivos sinais do universo. O significado é seu para interpretar.'},
          ]:aLang==='it'?[
            {q:`Cosa significa il numero angelico ${aNum}?`,a:meaning},
            {q:'Con quale frequenza appaiono i numeri angelici?',a:'Appaiono quando sei ricettivo ai messaggi spirituali, spesso in momenti di cambiamento.'},
            {q:'I numeri angelici sono davvero significativi?',a:'Molti numerologi vedono in questi pattern ripetuti segnali dell\'universo. Il significato è tuo da interpretare.'},
          ]:[
            {q:`What does angel number ${aNum} mean?`,a:meaning},
            {q:'How often do angel numbers appear?',a:'Angel numbers appear when you are particularly receptive to spiritual messages — typically during periods of change or transition.'},
            {q:'Are angel numbers scientifically proven?',a:'Angel numbers are a concept from numerology and spiritual practice, not mainstream science. Many people find personal meaning and guidance in recognizing these patterns.'},
          ];
          const aFaqHtml = aFaq.map(f=>`<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
          const aFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":aFaq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
          const aHtml = `<!DOCTYPE html><html lang="${aLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(aTitle)}</title>
<meta name="description" content="${esc(aDesc)}">
<link rel="canonical" href="${esc(aCanonical)}">
${aHreflang}
<meta property="og:title" content="${esc(aTitle)}">
<meta property="og:description" content="${esc(aDesc)}">
<meta property="og:url" content="${esc(aCanonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-${aLang}.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${aFaqSchema}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f3ff;}
.hero{background:linear-gradient(135deg,#3b0764,#7c3aed);color:#fff;padding:36px 20px;text-align:center;}
.hero .angel-num{font-size:clamp(52px,12vw,88px);font-weight:900;letter-spacing:-2px;margin-bottom:8px;}
.hero h1{font-size:clamp(18px,3.5vw,28px);font-weight:800;margin-bottom:10px;color:#e9d5ff;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;margin-top:14px;}
.meaning-card{max-width:640px;margin:20px auto;padding:20px 24px;background:#fff;border-radius:14px;box-shadow:0 2px 12px rgba(109,40,217,.12);border-left:4px solid #7c3aed;}
.meaning-card p{font-size:15px;color:#374151;line-height:1.85;}
.num-nav{max-width:640px;margin:16px auto;padding:0 16px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}
.num-nav a{display:inline-block;padding:6px 14px;border-radius:20px;background:#ede9fe;color:#4c1d95;font-size:13px;font-weight:700;text-decoration:none;}
.num-nav a:hover{background:#7c3aed;color:#fff;}
.faq-wrap{max-width:640px;margin:20px auto;padding:0 16px 24px;}
.faq-wrap h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:14px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#7c3aed;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <div class="angel-num">${esc(aNum)}</div>
  <h1>${esc(aTitle)}</h1>
  <a class="start-btn" href="#angel-frame">${LANGS[aLang].start||'Get Lucky Numbers'}</a>
</div>
<div class="meaning-card"><p>${esc(meaning)}</p></div>
<div class="num-nav">${aNavNums}</div>
<div class="faq-wrap"><h2>FAQ</h2>${aFaqHtml}</div>
<iframe id="angel-frame" src="${esc(`${APP_URL}/?lang=${aLang}`)}" scrolling="no" title="${esc(aTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('angel-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter(aLang,'lucky')}
</body></html>`;
          return new Response(aHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=86400','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── Zodiac sign pages (/en/aries/, /de/widder/, etc.) ───
    const ZODIAC_SLUGS = {
      en:['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'],
      de:['widder','stier','zwillinge','krebs','loewe','jungfrau','waage','skorpion','schuetze','steinbock','wassermann','fische'],
      fr:['belier','taureau','gemeaux','cancer','lion','vierge','balance','scorpion','sagittaire','capricorne','verseau','poissons'],
      es:['aries','tauro','geminis','cancer','leo','virgo','libra','escorpio','sagitario','capricornio','acuario','piscis'],
      pt:['aries','touro','gemeos','cancer','leao','virgem','libra','escorpiao','sagitario','capricornio','aquario','peixes'],
      it:['ariete','toro','gemelli','cancro','leone','vergine','bilancia','scorpione','sagittario','capricorno','acquario','pesci'],
    };
    const ZODIAC_NAMES = {
      en:['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'],
      de:['Widder','Stier','Zwillinge','Krebs','Löwe','Jungfrau','Waage','Skorpion','Schütze','Steinbock','Wassermann','Fische'],
      fr:['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'],
      es:['Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'],
      pt:['Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'],
      it:['Ariete','Toro','Gemelli','Cancro','Leone','Vergine','Bilancia','Scorpione','Sagittario','Capricorno','Acquario','Pesci'],
    };
    const ZODIAC_DATES = {
      en:['Mar 21–Apr 19','Apr 20–May 20','May 21–Jun 20','Jun 21–Jul 22','Jul 23–Aug 22','Aug 23–Sep 22','Sep 23–Oct 22','Oct 23–Nov 21','Nov 22–Dec 21','Dec 22–Jan 19','Jan 20–Feb 18','Feb 19–Mar 20'],
      de:['21. Mär–19. Apr','20. Apr–20. Mai','21. Mai–20. Jun','21. Jun–22. Jul','23. Jul–22. Aug','23. Aug–22. Sep','23. Sep–22. Okt','23. Okt–21. Nov','22. Nov–21. Dez','22. Dez–19. Jan','20. Jan–18. Feb','19. Feb–20. Mär'],
      fr:['21 Mar–19 Avr','20 Avr–20 Mai','21 Mai–20 Jun','21 Jun–22 Jul','23 Jul–22 Aoû','23 Aoû–22 Sep','23 Sep–22 Oct','23 Oct–21 Nov','22 Nov–21 Déc','22 Déc–19 Jan','20 Jan–18 Fév','19 Fév–20 Mar'],
      es:['21 Mar–19 Abr','20 Abr–20 May','21 May–20 Jun','21 Jun–22 Jul','23 Jul–22 Ago','23 Ago–22 Sep','23 Sep–22 Oct','23 Oct–21 Nov','22 Nov–21 Dic','22 Dic–19 Ene','20 Ene–18 Feb','19 Feb–20 Mar'],
      pt:['21 Mar–19 Abr','20 Abr–20 Mai','21 Mai–20 Jun','21 Jun–22 Jul','23 Jul–22 Ago','23 Ago–22 Set','23 Set–22 Out','23 Out–21 Nov','22 Nov–21 Dez','22 Dez–19 Jan','20 Jan–18 Fev','19 Fev–20 Mar'],
      it:['21 Mar–19 Apr','20 Apr–20 Mag','21 Mag–20 Giu','21 Giu–22 Lug','23 Lug–22 Ago','23 Ago–22 Set','23 Set–22 Ott','23 Ott–21 Nov','22 Nov–21 Dic','22 Dic–19 Gen','20 Gen–18 Feb','19 Feb–20 Mar'],
    };
    const ZODIAC_LUCKY = [[1,9,19,41],[2,6,24,37],[3,5,12,29],[2,7,11,32],[1,5,9,41],[3,6,14,27],[6,15,24,42],[9,18,28,37],[3,9,21,33],[4,8,13,26],[4,7,11,22],[2,7,12,29]];
    const ZODIAC_EMOJIS = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
    const ZODIAC_TRAITS = {
      en:['Bold, ambitious, and a natural-born leader driven by passion.','Patient, reliable, and sensual — Taurus loves beauty and comfort.','Curious, adaptable, and communicative — Gemini thrives on variety.','Intuitive, nurturing, and emotional — Cancer values home and family.','Generous, creative, and confident — Leo loves the spotlight.','Analytical, practical, and hardworking — Virgo seeks perfection.','Diplomatic, fair-minded, and social — Libra seeks balance.','Passionate, resourceful, and determined — Scorpio dives deep.','Adventurous, optimistic, and freedom-loving — Sagittarius seeks truth.','Disciplined, responsible, and ambitious — Capricorn climbs high.','Original, independent, and humanitarian — Aquarius thinks outside the box.','Compassionate, artistic, and intuitive — Pisces lives between dreams and reality.'],
      de:['Mutig, ehrgeizig und ein geborener Anführer, angetrieben von Leidenschaft.','Geduldig, zuverlässig und sinnlich — Stier liebt Schönheit und Komfort.','Neugierig, anpassungsfähig und kommunikativ — Zwillinge gedeihen durch Abwechslung.','Intuitiv, fürsorglich und emotional — Krebs schätzt Heim und Familie.','Großzügig, kreativ und selbstbewusst — Löwe liebt das Rampenlicht.','Analytisch, praktisch und fleißig — Jungfrau strebt nach Perfektion.','Diplomatisch, gerecht und gesellig — Waage sucht Gleichgewicht.','Leidenschaftlich, einfallsreich und entschlossen — Skorpion geht in die Tiefe.','Abenteuerlustig, optimistisch und freiheitsliebend — Schütze sucht Wahrheit.','Diszipliniert, verantwortungsbewusst und ehrgeizig — Steinbock klettert hoch.','Originell, unabhängig und humanistisch — Wassermann denkt außerhalb der Box.','Mitfühlend, künstlerisch und intuitiv — Fische leben zwischen Träumen und Realität.'],
      fr:['Courageux, ambitieux et un leader né, animé par la passion.','Patient, fiable et sensuel — le Taureau aime la beauté et le confort.','Curieux, adaptable et communicatif — les Gémeaux s\'épanouissent dans la variété.','Intuitif, bienveillant et émotionnel — le Cancer valorise le foyer et la famille.','Généreux, créatif et confiant — le Lion aime être sous les projecteurs.','Analytique, pratique et travailleur — la Vierge recherche la perfection.','Diplomatique, équitable et sociable — la Balance recherche l\'équilibre.','Passionné, plein de ressources et déterminé — le Scorpion plonge en profondeur.','Aventureux, optimiste et épris de liberté — le Sagittaire cherche la vérité.','Discipliné, responsable et ambitieux — le Capricorne grimpe haut.','Original, indépendant et humaniste — le Verseau pense hors des sentiers battus.','Compatissant, artistique et intuitif — les Poissons vivent entre rêves et réalité.'],
      es:['Valiente, ambicioso y líder nato, impulsado por la pasión.','Paciente, confiable y sensual — Tauro ama la belleza y el confort.','Curioso, adaptable y comunicativo — Géminis prospera con la variedad.','Intuitivo, protector y emocional — Cáncer valora el hogar y la familia.','Generoso, creativo y seguro — Leo ama el protagonismo.','Analítico, práctico y trabajador — Virgo busca la perfección.','Diplomático, justo y sociable — Libra busca el equilibrio.','Apasionado, ingenioso y decidido — Escorpio profundiza.','Aventurero, optimista y amante de la libertad — Sagitario busca la verdad.','Disciplinado, responsable y ambicioso — Capricornio escala alto.','Original, independiente y humanitario — Acuario piensa fuera de la caja.','Compasivo, artístico e intuitivo — Piscis vive entre sueños y realidad.'],
      pt:['Ousado, ambicioso e líder nato, movido pela paixão.','Paciente, confiável e sensual — Touro ama a beleza e o conforto.','Curioso, adaptável e comunicativo — Gêmeos prospera com a variedade.','Intuitivo, protetor e emocional — Câncer valoriza o lar e a família.','Generoso, criativo e confiante — Leão ama os holofotes.','Analítico, prático e trabalhador — Virgem busca a perfeição.','Diplomático, justo e sociável — Libra busca o equilíbrio.','Apaixonado, engenhoso e determinado — Escorpião mergulha fundo.','Aventureiro, otimista e amante da liberdade — Sagitário busca a verdade.','Disciplinado, responsável e ambicioso — Capricórnio sobe alto.','Original, independente e humanitário — Aquário pensa fora da caixa.','Compassivo, artístico e intuitivo — Peixes vive entre sonhos e realidade.'],
      it:['Coraggioso, ambizioso e leader nato, guidato dalla passione.','Paziente, affidabile e sensuale — il Toro ama la bellezza e il comfort.','Curioso, adattabile e comunicativo — i Gemelli prosperano nella varietà.','Intuitivo, premuroso ed emotivo — il Cancro valorizza la casa e la famiglia.','Generoso, creativo e sicuro — il Leone ama essere al centro della scena.','Analitico, pratico e laborioso — la Vergine cerca la perfezione.','Diplomatico, equo e socievole — la Bilancia cerca l\'equilibrio.','Appassionato, pieno di risorse e determinato — lo Scorpione scava in profondità.','Avventuroso, ottimista e amante della libertà — il Sagittario cerca la verità.','Disciplinato, responsabile e ambizioso — il Capricorno scala in alto.','Originale, indipendente e umanitario — l\'Acquario pensa fuori dagli schemi.','Compassionevole, artistico e intuitivo — i Pesci vivono tra sogni e realtà.'],
    };
    const zodiacMatch = path.match(/^\/([a-z]{2,3})\/([a-z]+)\/?$/);
    if (zodiacMatch && zodiacMatch[2] !== 'lucky' && zodiacMatch[2] !== 'today' && zodiacMatch[2] !== 'compatibility' && zodiacMatch[2] !== 'gunghap') {
      const zLang = zodiacMatch[1], zSlug = zodiacMatch[2];
      const slugMap = ZODIAC_SLUGS[zLang];
      if (slugMap) {
        const signIdx = slugMap.indexOf(zSlug);
        if (signIdx >= 0 && LANGS[zLang]) {
          const ZL = LANGS[zLang];
          const signName = (ZODIAC_NAMES[zLang] || ZODIAC_NAMES.en)[signIdx];
          const signDates = (ZODIAC_DATES[zLang] || ZODIAC_DATES.en)[signIdx];
          const signTrait = (ZODIAC_TRAITS[zLang] || ZODIAC_TRAITS.en)[signIdx];
          const signEmoji = ZODIAC_EMOJIS[signIdx];
          const signLucky = ZODIAC_LUCKY[signIdx];
          const zCanonical = `${SITE_URL}/${zLang}/${zSlug}/`;
          const zTitle = zLang==='de'?`${signName} Glückszahlen & Horoskop — ${ZL.h1}`:zLang==='fr'?`${signName} Numéros Chanceux & Horoscope — ${ZL.h1}`:zLang==='es'?`${signName} Números de la Suerte & Horóscopo — ${ZL.h1}`:zLang==='pt'?`${signName} Números da Sorte & Horóscopo — ${ZL.h1}`:zLang==='it'?`${signName} Numeri Fortunati & Oroscopo — ${ZL.h1}`:`${signName} Lucky Numbers & Horoscope — ${ZL.h1}`;
          const zDesc  = `${signTrait} ${zLang==='de'?`Kostenlose Glückszahlen für ${signName}`:zLang==='fr'?`Numéros chanceux gratuits pour ${signName}`:zLang==='es'?`Números de la suerte gratuitos para ${signName}`:zLang==='pt'?`Números da sorte gratuitos para ${signName}`:zLang==='it'?`Numeri fortunati gratuiti per ${signName}`:`Free lucky numbers for ${signName}`}.`;
          const zIframe = `${APP_URL}/?lang=${zLang}`;
          const zHref = Object.keys(ZODIAC_SLUGS).map(l=>{
            const s=(ZODIAC_SLUGS[l]||[])[signIdx];
            return s?`<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/${s}/">`:'';
          }).filter(Boolean).join('\n    ');
          const zLuckyBadges = signLucky.map(n=>`<span class="lucky-badge">${n}</span>`).join('');
          const zFaq = zLang==='de'?[
            {q:`Wann ist ${signName}?`,a:`${signName} umfasst den Zeitraum ${signDates}.`},
            {q:`Was sind die Eigenschaften von ${signName}?`,a:signTrait},
            {q:`Was sind die Glückszahlen für ${signName}?`,a:`Die traditionellen Glückszahlen für ${signName} sind: ${signLucky.join(', ')}.`},
            {q:`Wie werden Glückszahlen für ${signName} berechnet?`,a:`Die Glückszahlen basieren auf der Numerologie und den Schwingungseigenschaften des ${signName}-Zeichens.`},
          ]:zLang==='fr'?[
            {q:`Quand est ${signName}?`,a:`${signName} couvre la période du ${signDates}.`},
            {q:`Quelles sont les caractéristiques de ${signName}?`,a:signTrait},
            {q:`Quels sont les numéros chanceux pour ${signName}?`,a:`Les numéros chanceux traditionnels pour ${signName} sont: ${signLucky.join(', ')}.`},
            {q:`Comment les numéros chanceux sont-ils calculés pour ${signName}?`,a:`Les numéros sont basés sur la numérologie et les propriétés vibratoires du signe ${signName}.`},
          ]:zLang==='es'?[
            {q:`¿Cuándo es ${signName}?`,a:`${signName} abarca el período del ${signDates}.`},
            {q:`¿Cuáles son las características de ${signName}?`,a:signTrait},
            {q:`¿Cuáles son los números de la suerte para ${signName}?`,a:`Los números de la suerte tradicionales para ${signName} son: ${signLucky.join(', ')}.`},
            {q:`¿Cómo se calculan los números de la suerte para ${signName}?`,a:`Los números se basan en la numerología y las propiedades vibratorias del signo ${signName}.`},
          ]:zLang==='pt'?[
            {q:`Quando é ${signName}?`,a:`${signName} abrange o período de ${signDates}.`},
            {q:`Quais são as características de ${signName}?`,a:signTrait},
            {q:`Quais são os números da sorte para ${signName}?`,a:`Os números da sorte tradicionais para ${signName} são: ${signLucky.join(', ')}.`},
            {q:`Como os números da sorte são calculados para ${signName}?`,a:`Os números são baseados na numerologia e nas propriedades vibracionais do signo ${signName}.`},
          ]:zLang==='it'?[
            {q:`Quando è ${signName}?`,a:`${signName} copre il periodo dal ${signDates}.`},
            {q:`Quali sono le caratteristiche di ${signName}?`,a:signTrait},
            {q:`Quali sono i numeri fortunati per ${signName}?`,a:`I numeri fortunati tradizionali per ${signName} sono: ${signLucky.join(', ')}.`},
            {q:`Come vengono calcolati i numeri fortunati per ${signName}?`,a:`I numeri si basano sulla numerologia e sulle proprietà vibrazionali del segno ${signName}.`},
          ]:[
            {q:`When is ${signName}?`,a:`${signName} covers the period ${signDates}.`},
            {q:`What are the personality traits of ${signName}?`,a:signTrait},
            {q:`What are the lucky numbers for ${signName}?`,a:`The traditional lucky numbers for ${signName} are: ${signLucky.join(', ')}.`},
            {q:`How are lucky numbers calculated for ${signName}?`,a:`Lucky numbers are based on numerological resonance — each zodiac sign has numbers that vibrate at compatible frequencies, derived from the sign's elemental properties and ruling planet.`},
          ];
          const zFaqHtml = zFaq.map(f=>`<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
          const zFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":zFaq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
          const zHtml = `<!DOCTYPE html><html lang="${zLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(zTitle)}</title>
<meta name="description" content="${esc(zDesc)}">
<link rel="canonical" href="${esc(zCanonical)}">
${zHref}
<meta property="og:title" content="${esc(zTitle)}">
<meta property="og:description" content="${esc(zDesc)}">
<meta property="og:url" content="${esc(zCanonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-${zLang}.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${zFaqSchema}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#1e1b4b,#4c1d95);color:#fff;padding:32px 20px;text-align:center;}
.hero .sign-emoji{font-size:52px;margin-bottom:8px;}
.hero h1{font-size:clamp(20px,4vw,34px);font-weight:900;margin-bottom:6px;}
.hero .dates{font-size:13px;color:#c4b5fd;margin-bottom:14px;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.lucky-badges{max-width:600px;margin:16px auto;padding:0 16px;text-align:center;}
.lucky-badge{display:inline-block;background:#4c1d95;color:#e9d5ff;font-weight:800;font-size:15px;padding:8px 16px;border-radius:10px;margin:4px;}
.trait-card{max-width:600px;margin:16px auto;padding:18px 20px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08);font-size:14px;color:#374151;line-height:1.85;}
.faq-wrap{max-width:640px;margin:20px auto;padding:0 16px 24px;}
.faq-wrap h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:14px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#d97706;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <div class="sign-emoji">${signEmoji}</div>
  <h1>${esc(signName)}</h1>
  <div class="dates">${esc(signDates)}</div>
  <a class="start-btn" href="#zodiac-frame">${esc(ZL.start)}</a>
</div>
<div class="lucky-badges">${zLuckyBadges}</div>
<div class="trait-card">${esc(signTrait)}</div>
<div class="faq-wrap"><h2>FAQ</h2>${zFaqHtml}</div>
<iframe id="zodiac-frame" src="${esc(zIframe)}" scrolling="no" title="${esc(signName)} lucky numbers" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('zodiac-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter(zLang,'lucky')}
</body></html>`;
          return new Response(zHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=3600','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── Today's fortune pages (/ko/today/, /en/today/, all 9 langs) ──────
    const todayMatch = path.match(/^\/(ko|en|ja|de|fr|es|pt|it|id)\/today\/?$/);
    if (todayMatch) {
      const tLang = todayMatch[1];
      const TL = LANGS[tLang] || LANGS.en;
      const today = new Date().toISOString().slice(0,10);
      const tCanonical = `${SITE_URL}/${tLang}/today/`;
      const tHreflang = buildHreflang(ALL_LANGS.map(l=>({lang:l,url:`${SITE_URL}/${l}/today/`})), `${SITE_URL}/en/today/`);
      const TODAY_TITLES = {
        ko:`오늘의 운세 & 행운 번호 — ${today}`,
        en:`Today's Lucky Numbers — ${today} | Free Daily Fortune`,
        ja:`今日の運勢・幸運の数字 — ${today}`,
        de:`Heutige Glückszahlen — ${today}`,
        fr:`Numéros Chanceux du Jour — ${today}`,
        es:`Números de la Suerte Hoy — ${today}`,
        pt:`Números da Sorte Hoje — ${today}`,
        it:`Numeri Fortunati Oggi — ${today}`,
        id:`Angka Keberuntungan Hari Ini — ${today}`,
      };
      const TODAY_DESCS = {
        ko:`오늘(${today}) 날짜 기반 운세와 행운 번호. ${TL.desc}`,
        en:`Free lucky numbers for today, ${today}. ${TL.desc}`,
        ja:`本日(${today})の運勢と幸運の数字。${TL.desc}`,
        de:`Kostenlose Glückszahlen für heute, ${today}. ${TL.desc}`,
        fr:`Numéros chanceux gratuits pour aujourd'hui, ${today}. ${TL.desc}`,
        es:`Números de la suerte gratuitos para hoy, ${today}. ${TL.desc}`,
        pt:`Números da sorte gratuitos para hoje, ${today}. ${TL.desc}`,
        it:`Numeri fortunati gratuiti per oggi, ${today}. ${TL.desc}`,
        id:`Angka keberuntungan gratis untuk hari ini, ${today}. ${TL.desc}`,
      };
      const TODAY_BTNS = {ko:'운세 보기',en:'Get Today\'s Numbers',ja:'運勢を見る',de:'Zahlen abrufen',fr:'Obtenir les numéros',es:'Obtener números',pt:'Obter números',it:'Ottieni i numeri',id:'Dapatkan angka'};
      const TODAY_FAQ = {
        ko:[{q:'오늘의 행운 번호는 어떻게 계산되나요?',a:'오늘 날짜의 유니버설 데이 넘버와 생년월일 기반 라이프 패스 넘버를 결합하여 계산됩니다.'},{q:'매일 달라지나요?',a:'날짜가 바뀌면 유니버설 데이 넘버가 달라지므로 오늘의 번호도 변경됩니다.'},{q:'어떤 복권에 사용할 수 있나요?',a:'로또 6/45 형식으로 제공됩니다. 생년월일을 입력하면 맞춤 번호를 받을 수 있습니다.'}],
        en:[{q:'How are today\'s lucky numbers calculated?',a:'Today\'s Universal Day Number is combined with your Life Path Number to identify the most resonant numbers for the day.'},{q:'Do the numbers change every day?',a:'Yes — as the Universal Day Number changes each day, the resonance pattern shifts, producing fresh recommendations daily.'},{q:'Which lottery formats are supported?',a:'Powerball, Mega Millions, Pick 4, and Pick 3. Enter your birth date below for personalized numbers.'}],
        ja:[{q:'今日のラッキーナンバーはどう計算しますか？',a:'今日の日付のユニバーサルデーナンバーと生年月日から導く本命星を組み合わせて計算します。'},{q:'毎日変わりますか？',a:'はい — 日付が変わるとユニバーサルデーナンバーが変わるため、ラッキーナンバーも更新されます。'},{q:'対応している宝くじは？',a:'ロト6・ロト7・ミニロト・ナンバーズ4に対応しています。'}],
        de:[{q:'Wie werden heutige Glückszahlen berechnet?',a:'Die Universelle Tageszahl von heute wird mit Ihrer Lebenspfadzahl kombiniert.'},{q:'Ändern sich die Zahlen täglich?',a:'Ja — die Universelle Tageszahl ändert sich täglich, was neue Empfehlungen generiert.'},{q:'Welche Lotterien werden unterstützt?',a:'EuroMillions, EuroJackpot und Lotto 6aus49.'}],
        fr:[{q:'Comment les numéros d\'aujourd\'hui sont-ils calculés?',a:'Le Nombre Universel du Jour est combiné avec votre Nombre de Chemin de Vie.'},{q:'Les numéros changent-ils chaque jour?',a:'Oui — le Nombre Universel du Jour évolue quotidiennement.'},{q:'Quelles loteries sont prises en charge?',a:'EuroMillions, EuroJackpot et toutes les loteries nationales.'}],
        es:[{q:'¿Cómo se calculan los números de hoy?',a:'El Número Universal del Día se combina con tu Número de Camino de Vida.'},{q:'¿Los números cambian cada día?',a:'Sí — el Número Universal del Día cambia diariamente.'},{q:'¿Qué loterías están disponibles?',a:'EuroMillones, EuroJackpot y loterias nacionales.'}],
        pt:[{q:'Como os números de hoje são calculados?',a:'O Número Universal do Dia é combinado com o seu Número de Caminho de Vida.'},{q:'Os números mudam todos os dias?',a:'Sim — o Número Universal do Dia muda diariamente.'},{q:'Quais loterias são suportadas?',a:'Mega Sena e outras loterias nacionais.'}],
        it:[{q:'Come vengono calcolati i numeri di oggi?',a:'Il Numero Universale del Giorno viene combinato con il tuo Numero di Percorso di Vita.'},{q:'I numeri cambiano ogni giorno?',a:'Sì — il Numero Universale del Giorno cambia quotidianamente.'},{q:'Quali lotterie sono supportate?',a:'SuperEnalotto e altre lotterie nazionali.'}],
        id:[{q:'Bagaimana angka keberuntungan hari ini dihitung?',a:'Angka Universal Hari digabungkan dengan Nomor Jalur Hidup Anda.'},{q:'Apakah angka berubah setiap hari?',a:'Ya — Angka Universal Hari berubah setiap hari.'},{q:'Lotere apa yang didukung?',a:'Togel dan lotere nasional Indonesia.'}],
      };
      // 콘텐츠 보강: 인트로 단락
      const TODAY_INTRO = {
        ko:`매일 바뀌는 <strong>유니버설 데이 넘버</strong>(오늘 날짜 ${today}의 모든 숫자를 합산해 1~9로 환원한 값)는 그날의 전체적인 에너지 흐름을 나타냅니다. 여기에 당신의 생년월일에서 도출한 라이프 패스 넘버를 결합하면, 오늘 당신과 가장 공명하는 행운 번호를 찾을 수 있습니다. 사주팔자의 천간지지와 오행 분석까지 더해 로또 6/45 형식의 맞춤 번호를 무료로 제공합니다. 아래에 생년월일을 입력하면 즉시 오늘의 번호와 연애·금전·직업·성취운 점수를 확인할 수 있습니다.`,
        en:`Every day carries a unique <strong>Universal Day Number</strong> — derived by reducing today's date (${today}) to a single digit (1–9) — which reflects the overall energy of the day. Combined with your personal Life Path Number from your birth date, it reveals the numbers that resonate most strongly with you today. This free tool blends Pythagorean numerology with daily resonance to generate Powerball, Mega Millions, and Pick 4 numbers tailored to you. Enter your birth date below for instant lucky numbers plus your Love, Money, Career, and Achievement scores.`,
        ja:`毎日変化する<strong>ユニバーサルデーナンバー</strong>（本日${today}の数字をすべて足して1〜9に還元した値）は、その日の全体的なエネルギーを表します。これに生年月日から導く本命星を組み合わせることで、今日のあなたに最も共鳴する幸運の数字が分かります。九星気学と数秘術を融合し、ロト6・ロト7形式の数字を無料で提供します。下に生年月日を入力すると、本日の数字と恋愛・金運・仕事・達成運のスコアがすぐに表示されます。`,
        de:`Jeder Tag trägt eine einzigartige <strong>Universelle Tageszahl</strong> — gebildet aus dem heutigen Datum (${today}), reduziert auf eine Ziffer (1–9). Kombiniert mit Ihrer persönlichen Lebenspfadzahl zeigt sie die Zahlen, die heute am stärksten mit Ihnen schwingen. Dieses kostenlose Tool verbindet pythagoräische Numerologie mit der Tagesresonanz für EuroMillions und Lotto 6aus49. Geben Sie unten Ihr Geburtsdatum ein.`,
        fr:`Chaque jour porte un <strong>Nombre Universel du Jour</strong> unique — obtenu en réduisant la date du jour (${today}) à un seul chiffre (1–9). Combiné à votre Nombre de Chemin de Vie, il révèle les numéros qui résonnent le plus avec vous aujourd'hui. Cet outil gratuit mêle numérologie pythagoricienne et résonance quotidienne pour EuroMillions et le Loto. Entrez votre date de naissance ci-dessous.`,
        es:`Cada día lleva un <strong>Número Universal del Día</strong> único — obtenido reduciendo la fecha de hoy (${today}) a un solo dígito (1–9). Combinado con tu Número de Camino de Vida, revela los números que más resuenan contigo hoy. Esta herramienta gratuita combina numerología pitagórica con la resonancia diaria para EuroMillones. Introduce tu fecha de nacimiento abajo.`,
        pt:`Cada dia carrega um <strong>Número Universal do Dia</strong> único — obtido reduzindo a data de hoje (${today}) a um único dígito (1–9). Combinado com o seu Número de Caminho de Vida, revela os números que mais ressoam com você hoje. Esta ferramenta gratuita combina numerologia pitagórica com a ressonância diária para a Mega-Sena. Insira a sua data de nascimento abaixo.`,
        it:`Ogni giorno porta un <strong>Numero Universale del Giorno</strong> unico — ottenuto riducendo la data di oggi (${today}) a una sola cifra (1–9). Combinato con il tuo Numero del Percorso di Vita, rivela i numeri che risuonano di più con te oggi. Questo strumento gratuito unisce la numerologia pitagorica alla risonanza quotidiana per il SuperEnalotto. Inserisci la tua data di nascita qui sotto.`,
        id:`Setiap hari membawa <strong>Angka Universal Hari</strong> yang unik — diperoleh dengan menjumlahkan tanggal hari ini (${today}) menjadi satu digit (1–9). Dikombinasikan dengan Nomor Jalur Hidup Anda, ia mengungkap angka yang paling beresonansi dengan Anda hari ini. Alat gratis ini memadukan numerologi dengan Primbon Jawa untuk prediksi Togel 4D. Masukkan tanggal lahir Anda di bawah.`,
      };
      const TODAY_FAQ_EXTRA = {
        ko:[{q:'유니버설 데이 넘버란 무엇인가요?',a:'오늘 날짜(연·월·일)의 모든 숫자를 더해 한 자리(1~9)로 환원한 수비학 값으로, 그날의 보편적 에너지를 상징합니다.'},{q:'행운 번호를 매일 확인하는 것이 좋나요?',a:'네. 유니버설 데이 넘버가 매일 달라지므로, 당첨 게임을 하는 날의 에너지에 맞춰 번호를 새로 받아보는 것을 권장합니다.'}],
        en:[{q:'What is a Universal Day Number?',a:'It is a numerology value found by adding all digits of today\'s date (year, month, day) and reducing to a single digit (1–9), symbolizing the universal energy of that day.'},{q:'Should I check my lucky numbers every day?',a:'Yes. Because the Universal Day Number changes daily, it is best to generate fresh numbers that align with the energy of the specific day you play.'}],
        ja:[{q:'ユニバーサルデーナンバーとは？',a:'今日の日付（年・月・日）の数字をすべて足して1桁（1〜9）に還元した数秘術の値で、その日の普遍的なエネルギーを象徴します。'},{q:'毎日確認したほうが良いですか？',a:'はい。ユニバーサルデーナンバーは毎日変わるため、宝くじを買う日のエネルギーに合わせて数字を取得することをおすすめします。'}],
        de:[{q:'Was ist eine Universelle Tageszahl?',a:'Ein Numerologiewert aus der Summe aller Ziffern des heutigen Datums, reduziert auf eine Ziffer (1–9), der die Energie des Tages symbolisiert.'},{q:'Sollte ich täglich nachsehen?',a:'Ja, da sich die Universelle Tageszahl täglich ändert, sind frische Zahlen für den jeweiligen Spieltag am besten.'}],
        fr:[{q:'Qu\'est-ce que le Nombre Universel du Jour?',a:'Une valeur numérologique obtenue en additionnant tous les chiffres de la date du jour, réduite à un seul chiffre (1–9), symbolisant l\'énergie du jour.'},{q:'Dois-je vérifier chaque jour?',a:'Oui, car le Nombre Universel du Jour change quotidiennement, des numéros frais pour le jour de jeu sont préférables.'}],
        es:[{q:'¿Qué es el Número Universal del Día?',a:'Un valor numerológico obtenido sumando todos los dígitos de la fecha de hoy, reducido a un solo dígito (1–9), que simboliza la energía del día.'},{q:'¿Debo consultarlo cada día?',a:'Sí, como el Número Universal del Día cambia a diario, conviene generar números nuevos para el día en que juegas.'}],
        pt:[{q:'O que é o Número Universal do Dia?',a:'Um valor numerológico obtido somando todos os dígitos da data de hoje, reduzido a um único dígito (1–9), que simboliza a energia do dia.'},{q:'Devo verificar todos os dias?',a:'Sim, como o Número Universal do Dia muda diariamente, é melhor gerar números novos para o dia em que você joga.'}],
        it:[{q:'Cos\'è il Numero Universale del Giorno?',a:'Un valore numerologico ottenuto sommando tutte le cifre della data di oggi, ridotto a una cifra (1–9), che simboleggia l\'energia del giorno.'},{q:'Dovrei controllare ogni giorno?',a:'Sì, poiché il Numero Universale del Giorno cambia quotidianamente, è meglio generare numeri nuovi per il giorno in cui giochi.'}],
        id:[{q:'Apa itu Angka Universal Hari?',a:'Nilai numerologi yang diperoleh dengan menjumlahkan semua digit tanggal hari ini, direduksi menjadi satu digit (1–9), melambangkan energi hari itu.'},{q:'Haruskah saya cek setiap hari?',a:'Ya, karena Angka Universal Hari berubah setiap hari, sebaiknya hasilkan angka baru untuk hari Anda bermain.'}],
      };
      const tTitle = TODAY_TITLES[tLang] || TODAY_TITLES.en;
      const tDesc  = TODAY_DESCS[tLang]  || TODAY_DESCS.en;
      const tIntro = TODAY_INTRO[tLang]  || TODAY_INTRO.en;
      const tFaq   = [...(TODAY_FAQ[tLang]||TODAY_FAQ.en), ...(TODAY_FAQ_EXTRA[tLang]||TODAY_FAQ_EXTRA.en)];
      const tFaqHtml = tFaq.map(f=>`<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
      const tFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":tFaq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
      const tIframe = `${APP_URL}/?lang=${tLang}`;
      const tHtml = `<!DOCTYPE html><html lang="${tLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(tTitle)}</title>
<meta name="description" content="${esc(tDesc)}">
<link rel="canonical" href="${esc(tCanonical)}">
${tHreflang}
<meta property="og:title" content="${esc(tTitle)}">
<meta property="og:description" content="${esc(tDesc)}">
<meta property="og:url" content="${esc(tCanonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-${tLang}.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${tFaqSchema}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;padding:32px 20px;text-align:center;}
.hero .today-date{font-size:13px;color:#818cf8;margin-bottom:6px;}
.hero h1{font-size:clamp(18px,4vw,30px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#c4b5fd;max-width:520px;margin:0 auto;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;margin-top:16px;}
.intro-card{max-width:640px;margin:20px auto 0;padding:20px 22px;background:#fff;border-radius:14px;box-shadow:0 2px 10px rgba(0,0,0,.06);font-size:14px;color:#44403c;line-height:1.9;}
.intro-card strong{color:#4c1d95;}
.faq-wrap{max-width:640px;margin:20px auto;padding:0 16px 24px;}
.faq-wrap h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:14px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#d97706;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <div class="today-date">${esc(today)}</div>
  <h1>${esc(tTitle)}</h1>
  <p>${esc(tDesc.slice(0,120))}</p>
  <a class="start-btn" href="#today-frame">${esc(TODAY_BTNS[tLang]||TODAY_BTNS.en)}</a>
</div>
<div class="intro-card">${tIntro}</div>
<div class="faq-wrap"><h2>FAQ</h2>${tFaqHtml}</div>
<iframe id="today-frame" src="${esc(tIframe)}" scrolling="no" title="${esc(tTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('today-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter(tLang,'lucky')}
</body></html>`;
      return new Response(tHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=3600','X-Robots-Tag':'index,follow'}});
    }

    // ── Compatibility share pages (/ko/gunghap/, /en/compatibility/, etc.) ─
    const compatPaths = {ko:'gunghap',en:'compatibility',ja:'compatibility',de:'partnerschaft',fr:'compatibilite',es:'compatibilidad',pt:'compatibilidade',it:'compatibilita',id:'kecocokan'};
    const compatMatch = path.match(/^\/([a-z]{2})\/([a-z]+)\/?$/);
    if (compatMatch) {
      const cLang = compatMatch[1], cSlug = compatMatch[2];
      if (compatPaths[cLang] === cSlug && LANGS[cLang]) {
        const CL = LANGS[cLang];
        const cp = url.searchParams;
        const bd1 = cp.get('bd') || '', bd2 = cp.get('bd2') || '';
        const cCanonical = `${SITE_URL}/${cLang}/${cSlug}/`;
        const cTitle = cLang==='ko'?`궁합 — ${CL.h1}`:cLang==='ja'?`相性 — ${CL.h1}`:`Compatibility — ${CL.h1}`;
        const cDesc = CL.desc;
        let cIframe = `${APP_URL}/?lang=${cLang}&cat=gunghap`;
        if (bd1) cIframe += `&bd=${bd1}`;
        if (bd2) cIframe += `&bd2=${bd2}`;
        let ogT = cTitle, ogD = cDesc;
        if (bd1 && bd2) {
          ogT = (cLang==='ko')?`${bd1.slice(0,4)}년생 × ${bd2.slice(0,4)}년생 궁합 결과`:`Compatibility: ${bd1.slice(0,4)} × ${bd2.slice(0,4)}`;
          ogD = (cLang==='ko')?'사주팔자 궁합 분석 결과를 확인하세요.':CL.desc;
        }
        const cHtml = `<!DOCTYPE html><html lang="${cLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(ogT)}</title>
<meta name="description" content="${esc(ogD)}">
<link rel="canonical" href="${esc(cCanonical)}">
<meta property="og:title" content="${esc(ogT)}">
<meta property="og:description" content="${esc(ogD)}">
<meta property="og:url" content="${esc(cCanonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-${cLang}.png">
<meta name="twitter:card" content="summary_large_image">
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#4c1d95,#6d28d9);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:clamp(20px,4vw,34px);font-weight:900;margin-bottom:8px;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;margin-top:16px;}
iframe{width:100%;border:none;display:block;height:560px;}</style>
</head><body>
<div class="hero"><h1>💑 ${esc(ogT)}</h1><a class="start-btn" href="#lucky-frame">${cLang==='ko'?'궁합 보기':cLang==='ja'?'相性を見る':'Check Compatibility'}</a></div>
<iframe id="lucky-frame" src="${esc(cIframe)}" scrolling="no" title="${esc(cTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('lucky-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
</body></html>`;
        return new Response(cHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control': bd1&&bd2?'public,max-age=300':'public,max-age=3600'}});
      }
    }

    // ── Nine Star Ki pages (/ja/ikki/, /ja/jikoku/, etc.) ───
    {
      const KSK_SLUGS  = ['ikki','jikoku','sanpoku','yonroku','goo','rokusei','shichishin','hapaku','kyushi'];
      const KSK_NAMES  = ['一白水星','二黒土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];
      const KSK_EMOJIS = ['💧','🌑','🌿','🌳','⭐','⚙️','🔱','🏔️','🔥'];
      const KSK_ELEMENT= ['水','土','木','木','土','金','金','土','火'];
      const KSK_COLOR  = ['白色','黒色','碧色','緑色','黄色','白金色','赤色','白色','紫色'];
      const KSK_DIR    = ['北','南西','東','南東','中央','北西','西','北東','南'];
      const KSK_LUCKY  = [[1,6,8],[2,5,8],[3,4,9],[3,4,9],[5,2,8],[6,1,7],[7,6,1],[8,5,2],[9,3,6]];
      const KSK_TRAITS = [
        '直感力が鋭く、柔軟性と知恵を持ちます。困難な状況でも流れに乗る力があります。',
        '勤勉で忍耐強く、大地のような安定感を持ちます。コツコツとした努力が実を結ぶ星です。',
        '行動力があり、新しいものへの好奇心旺盛。創造性と発展の力を持ちます。',
        '穏やかで信頼性が高く、調和を大切にします。人間関係の橋渡し役として才能があります。',
        '強力なエネルギーを持つ中心の星。変化と転換の力があり影響が大きい。',
        '正義感が強く、リーダーシップに優れます。天の恵みと権威を象徴する星です。',
        '社交的で明るく話術に長けます。金運と楽しみを引き寄せる魅力的な星です。',
        '変化と革新を司る山の星。継承と転換期に強く、再出発の力を持ちます。',
        '直感と美的感覚に優れた芸術の星。明るく情熱的で人を惹きつける魅力があります。',
      ];
      const kskM = path.match(/^\/ja\/([a-z]+)\/?$/);
      if (kskM) {
        const kIdx = KSK_SLUGS.indexOf(kskM[1]);
        if (kIdx >= 0) {
          const kName   = KSK_NAMES[kIdx];
          const kEmoji  = KSK_EMOJIS[kIdx];
          const kElem   = KSK_ELEMENT[kIdx];
          const kColor  = KSK_COLOR[kIdx];
          const kDir    = KSK_DIR[kIdx];
          const kLucky  = KSK_LUCKY[kIdx];
          const kTrait  = KSK_TRAITS[kIdx];
          const kCanon  = `${SITE_URL}/ja/${KSK_SLUGS[kIdx]}/`;
          const kTitle  = `${kName}（九星気学）— 幸運の数字・吉方位・運勢`;
          const kDesc   = `${kName}の特徴と運勢。五行：${kElem}、吉方位：${kDir}、吉色：${kColor}。${kTrait}`;
          const kNavLinks = KSK_SLUGS.map((s,i)=>`<a href="${SITE_URL}/ja/${s}/"${i===kIdx?' style="background:#065f46;color:#fff;"':''}>${KSK_NAMES[i]}</a>`).join('');
          const kFaq = [
            {q:`${kName}の生まれ年はいつ？`,a:`九星気学では生まれ年から本命星を割り出します。${kName}の方は、九星の計算式（(11-生まれ年)%9）で${kIdx}になる年が対象です。`},
            {q:`${kName}の性格は？`,a:kTrait},
            {q:`${kName}のラッキーナンバーは？`,a:`${kName}の吉数は ${kLucky.join('・')} です。これらの数字は五行属性「${kElem}」に基づく振動数と調和しています。`},
            {q:'九星気学とは何ですか？',a:'九星気学は中国の九宮術を基盤とした日本の占術です。生まれ年から9つの星（一白〜九紫）のいずれかに分類され、五行（木・火・土・金・水）と方位の吉凶を判断します。'},
          ];
          const kFaqHtml   = kFaq.map(f=>`<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
          const kFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":kFaq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
          const kHtml = `<!DOCTYPE html><html lang="ja"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(kTitle)}</title>
<meta name="description" content="${esc(kDesc)}">
<link rel="canonical" href="${esc(kCanon)}">
<meta property="og:title" content="${esc(kTitle)}">
<meta property="og:description" content="${esc(kDesc)}">
<meta property="og:url" content="${esc(kCanon)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-ja.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${kFaqSchema}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0fdf4;}
.hero{background:linear-gradient(135deg,#14532d,#16a34a);color:#fff;padding:32px 20px;text-align:center;}
.hero .star-emoji{font-size:52px;margin-bottom:8px;}
.hero h1{font-size:clamp(20px,4vw,32px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#bbf7d0;max-width:520px;margin:0 auto 14px;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.stat-grid{display:flex;flex-wrap:wrap;gap:10px;max-width:600px;margin:16px auto;padding:0 16px;}
.stat-card{flex:1;min-width:130px;background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 1px 6px rgba(0,0,0,.08);}
.stat-card strong{display:block;font-size:11px;font-weight:700;color:#166534;margin-bottom:4px;text-transform:uppercase;}
.stat-card span{font-size:14px;color:#374151;font-weight:600;}
.lucky-badges{max-width:600px;margin:0 auto 12px;padding:0 16px;text-align:center;}
.lucky-badge{display:inline-block;background:#166534;color:#bbf7d0;font-weight:800;font-size:15px;padding:8px 16px;border-radius:10px;margin:4px;}
.trait-card{max-width:600px;margin:0 auto 16px;padding:18px 20px;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,.08);font-size:14px;color:#374151;line-height:1.85;}
.star-nav{max-width:700px;margin:16px auto;padding:0 16px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}
.star-nav a{display:inline-block;padding:6px 12px;border-radius:20px;background:#dcfce7;color:#14532d;font-size:12px;font-weight:700;text-decoration:none;}
.star-nav a:hover{background:#16a34a;color:#fff;}
.faq-wrap{max-width:640px;margin:20px auto;padding:0 16px 24px;}
.faq-wrap h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:14px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#16a34a;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <div class="star-emoji">${kEmoji}</div>
  <h1>${esc(kName)}</h1>
  <p>${esc(kTrait)}</p>
  <a class="start-btn" href="#ksk-frame">ラッキーナンバーを引く</a>
</div>
<div class="stat-grid">
  <div class="stat-card"><strong>五行</strong><span>${kElem}</span></div>
  <div class="stat-card"><strong>吉方位</strong><span>${kDir}</span></div>
  <div class="stat-card"><strong>吉色</strong><span>${kColor}</span></div>
</div>
<div class="lucky-badges">${kLucky.map(n=>`<span class="lucky-badge">${n}</span>`).join('')}</div>
<div class="trait-card">${esc(kTrait)}</div>
<div class="star-nav">${kNavLinks}</div>
<div class="faq-wrap"><h2>よくある質問</h2>${kFaqHtml}</div>
<iframe id="ksk-frame" src="${esc(`${APP_URL}/?lang=ja`)}" scrolling="no" title="${esc(kTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('ksk-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter('ja','lucky')}
</body></html>`;
          return new Response(kHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=7200','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── 십이지 Chinese Zodiac pages (/ko/rat/, /ja/nezumi/, /en/rat/, /id/tikus/) ─
    {
      const CZ_KEYS = ['monkey','rooster','dog','pig','rat','ox','tiger','rabbit','dragon','snake','horse','goat'];
      const CZ_EMJ  = {monkey:'🐵',rooster:'🐔',dog:'🐶',pig:'🐷',rat:'🐭',ox:'🐮',tiger:'🐯',rabbit:'🐰',dragon:'🐲',snake:'🐍',horse:'🐴',goat:'🐑'};
      const CZ_BIRTH_YEARS = {monkey:'1956,1968,1980,1992,2004,2016',rooster:'1957,1969,1981,1993,2005,2017',dog:'1958,1970,1982,1994,2006,2018',pig:'1959,1971,1983,1995,2007,2019',rat:'1960,1972,1984,1996,2008,2020',ox:'1961,1973,1985,1997,2009,2021',tiger:'1962,1974,1986,1998,2010,2022',rabbit:'1963,1975,1987,1999,2011,2023',dragon:'1964,1976,1988,2000,2012,2024',snake:'1965,1977,1989,2001,2013,2025',horse:'1966,1978,1990,2002,2014,2026',goat:'1967,1979,1991,2003,2015,2027'};
      const CZ_SLUGS = {
        ko:  ['원숭이','닭','개','돼지','쥐','소','호랑이','토끼','용','뱀','말','양'],
        ja:  ['saru','tori','inu','i','ne','ushi','tora','u','tatsu','mi','uma','hitsuji'],
        en:  ['monkey','rooster','dog','pig','rat','ox','tiger','rabbit','dragon','snake','horse','goat'],
        id:  ['monyet','ayam','anjing','babi','tikus','kerbau','macan','kelinci','naga','ular','kuda','kambing'],
      };
      const CZ_NAMES = {
        ko:  ['원숭이띠','닭띠','개띠','돼지띠','쥐띠','소띠','호랑이띠','토끼띠','용띠','뱀띠','말띠','양띠'],
        ja:  ['申年生(さる)','酉年生(とり)','戌年生(いぬ)','亥年生(いのしし)','子年生(ねずみ)','丑年生(うし)','寅年生(とら)','卯年生(うさぎ)','辰年生(たつ)','巳年生(へび)','午年生(うま)','未年生(ひつじ)'],
        en:  ['Monkey','Rooster','Dog','Pig','Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat'],
        id:  ['Shio Monyet','Shio Ayam','Shio Anjing','Shio Babi','Shio Tikus','Shio Kerbau','Shio Macan','Shio Kelinci','Shio Naga','Shio Ular','Shio Kuda','Shio Kambing'],
      };
      const CZ_TRAITS = {
        monkey:{ko:'영리하고 재치 있으며 적응력이 뛰어남',ja:'賢く機転が利き、柔軟性がある',en:'Clever, witty, and highly adaptable',id:'Cerdas, jenaka, dan adaptif'},
        rooster:{ko:'부지런하고 관찰력이 뛰어나며 자신감 넘침',ja:'勤勉で観察眼があり、自信にあふれる',en:'Diligent, observant, and confident',id:'Rajin, observatif, dan percaya diri'},
        dog:{ko:'충직하고 성실하며 책임감이 강함',ja:'忠実で誠実、責任感が強い',en:'Loyal, honest, and responsible',id:'Setia, jujur, dan bertanggung jawab'},
        pig:{ko:'온화하고 관대하며 성실함',ja:'温かく寛大で誠実',en:'Kind, generous, and diligent',id:'Baik hati, murah hati, dan tekun'},
        rat:{ko:'영리하고 재치 있으며 저축을 잘함',ja:'賢くて機転が利き、蓄財上手',en:'Smart, resourceful, and thrifty',id:'Cerdas, banyak akal, dan hemat'},
        ox:{ko:'근면하고 믿음직하며 결단력 있음',ja:'勤勉で信頼でき、決断力がある',en:'Hardworking, reliable, and determined',id:'Rajin, dapat dipercaya, dan teguh'},
        tiger:{ko:'용감하고 카리스마 있으며 리더십이 강함',ja:'勇敢でカリスマ性があり、リーダーシップが強い',en:'Brave, charismatic, and a natural leader',id:'Berani, karismatik, dan pemimpin alami'},
        rabbit:{ko:'온화하고 섬세하며 예술적 감각이 뛰어남',ja:'穏やかで繊細、芸術的センスがある',en:'Gentle, elegant, and artistically gifted',id:'Lembut, halus, dan berbakat seni'},
        dragon:{ko:'강렬하고 열정적이며 성공 지향적',ja:'力強く情熱的で、成功志向',en:'Powerful, passionate, and success-driven',id:'Kuat, penuh semangat, dan berorientasi sukses'},
        snake:{ko:'직관적이고 우아하며 깊은 사고력 보유',ja:'直感的でエレガント、深い思考力を持つ',en:'Intuitive, elegant, and deeply thoughtful',id:'Intuitif, elegan, dan berpikir mendalam'},
        horse:{ko:'활기차고 독립적이며 자유를 사랑함',ja:'活発で自立心が強く、自由を愛する',en:'Energetic, independent, and freedom-loving',id:'Energik, mandiri, dan mencintai kebebasan'},
        goat:{ko:'창의적이고 온화하며 예술성이 풍부',ja:'創造的で穏やか、芸術性が豊か',en:'Creative, gentle, and artistically rich',id:'Kreatif, lembut, dan kaya seni'},
      };
      const CZ_COMPAT = {rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']};
      const CZ_CLASH  = {rat:'horse',horse:'rat',ox:'goat',goat:'ox',tiger:'monkey',monkey:'tiger',rabbit:'rooster',rooster:'rabbit',dragon:'dog',dog:'dragon',snake:'pig',pig:'snake'};

      const czLangs = Object.keys(CZ_SLUGS);
      let czLang = null, czKey = null;

      // Try /lang/slug/ pattern
      const czM = path.match(/^\/([a-z]{2,3})\/([^\\/]+)\/?$/);
      if (czM && czLangs.includes(czM[1])) {
        const testLang = czM[1], testSlug = decodeURIComponent(czM[2]);
        const idx = (CZ_SLUGS[testLang]||[]).indexOf(testSlug);
        if (idx >= 0) { czLang = testLang; czKey = CZ_KEYS[idx]; }
      }
      // Try ko root-level /쥐/ pattern
      if (!czKey) {
        const koSlugM = path.match(/^\/([^\\/]+)\/?$/);
        if (koSlugM) {
          const testSlug = decodeURIComponent(koSlugM[1]);
          const idx = (CZ_SLUGS.ko||[]).indexOf(testSlug);
          if (idx >= 0) { czLang = 'ko'; czKey = CZ_KEYS[idx]; }
        }
      }

      if (czLang && czKey && LANGS[czLang]) {
        const czIdx = CZ_KEYS.indexOf(czKey);
        const czName = (CZ_NAMES[czLang]||CZ_NAMES.en)[czIdx];
        const czEmoji = CZ_EMJ[czKey];
        const czTrait = (CZ_TRAITS[czKey]||{})[czLang] || (CZ_TRAITS[czKey]||{}).en || '';
        const czBirths = CZ_BIRTH_YEARS[czKey] || '';
        const compatKeys = CZ_COMPAT[czKey]||[];
        const clashKey  = CZ_CLASH[czKey]||'';
        const compatNames = compatKeys.map(k=>(CZ_NAMES[czLang]||CZ_NAMES.en)[CZ_KEYS.indexOf(k)]).join(', ');
        const clashName  = clashKey ? (CZ_NAMES[czLang]||CZ_NAMES.en)[CZ_KEYS.indexOf(clashKey)] : '';
        const CZL = LANGS[czLang];
        const czSlug = (CZ_SLUGS[czLang]||[])[czIdx];
        const czCanonical = czLang==='ko'?`${SITE_URL}/${encodeURIComponent(czSlug)}/`:`${SITE_URL}/${czLang}/${czSlug}/`;

        const czTitleMap = {ko:`${czName} 행운의 번호 — 띠별 운세와 사주`,ja:`${czName}の運勢・幸運の数字`,en:`${czName} Lucky Numbers & Fortune`,id:`${czName} — Angka Keberuntungan & Ramalan`};
        const czDescMap  = {ko:`${czName}(${czBirths}년생)의 행운 번호와 운세. ${czTrait}. 오늘의 행운 번호를 무료로 확인하세요.`,ja:`${czName}(${czBirths})の幸運の数字と運勢。${czTrait}。今すぐ無料で確認。`,en:`${czName} (born ${czBirths}) lucky numbers & fortune. ${czTrait}. Free generator — no signup.`,id:`${czName} (lahir ${czBirths}) — angka keberuntungan & ramalan. ${czTrait}. Gratis, tanpa daftar.`};

        const compatLabel = czLang==='ko'?'삼합(相性 좋음)':czLang==='ja'?'相性が良い':czLang==='id'?'Cocok':'Compatible';
        const clashLabel  = czLang==='ko'?'충(相冲 주의)':czLang==='ja'?'相冲(注意)':czLang==='id'?'Bentrok':'Clash';
        const hreflangLinks = czLangs.filter(l=>CZ_SLUGS[l]).map(l=>{
          const s = (CZ_SLUGS[l]||[])[czIdx];
          if (!s) return '';
          const href = l==='ko'?`${SITE_URL}/${encodeURIComponent(s)}/`:`${SITE_URL}/${l}/${s}/`;
          return `<link rel="alternate" hreflang="${l}" href="${href}">`;
        }).filter(Boolean).join('\n');

        const czHtml = `<!DOCTYPE html><html lang="${czLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(czTitleMap[czLang]||czTitleMap.en)}</title>
<meta name="description" content="${esc(czDescMap[czLang]||czDescMap.en)}">
<link rel="canonical" href="${esc(czCanonical)}">
${hreflangLinks}
<meta property="og:title" content="${esc(czTitleMap[czLang]||czTitleMap.en)}">
<meta property="og:description" content="${esc(czDescMap[czLang]||czDescMap.en)}">
<meta property="og:url" content="${esc(czCanonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-${czLang}.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(czTitleMap[czLang]||czTitleMap.en)},"description":${JSON.stringify(czDescMap[czLang]||czDescMap.en)},"url":${JSON.stringify(czCanonical)}}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#78350f,#b45309);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:clamp(20px,4vw,34px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#fef3c7;max-width:520px;margin:0 auto 12px;}
.start-btn{display:inline-block;background:#fff;color:#78350f;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.info-card{max-width:600px;margin:16px auto;padding:16px 20px;background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,0,0,.08);}
.info-card h2{font-size:15px;font-weight:800;color:#78350f;margin-bottom:8px;}
.badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;margin:3px;}
.badge-green{background:#dcfce7;color:#166534;}.badge-red{background:#fee2e2;color:#991b1b;}
iframe{width:100%;border:none;display:block;height:560px;}
.cz-detail{max-width:780px;margin:0 auto;padding:20px 16px;}
.cz-desc{margin-bottom:16px;padding:18px 20px;background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,0,0,.07);}
.cz-desc h2{font-size:16px;font-weight:800;color:#78350f;margin-bottom:8px;}
.cz-desc p{font-size:14px;color:#44403c;line-height:1.8;}
.cz-grid{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;}
.cz-card{flex:1;min-width:160px;background:#fff;border-radius:10px;padding:12px 14px;box-shadow:0 1px 4px rgba(0,0,0,.07);}
.cz-card strong{display:block;font-size:11px;font-weight:700;color:#92400e;margin-bottom:4px;text-transform:uppercase;}
.cz-card span{font-size:13px;color:#374151;}
.cz-card a{color:#4338ca;text-decoration:none;margin:0 2px;}
.cz-faq h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.cz-faq details{border-bottom:1px solid #e7e5e4;padding:2px 0;}
.cz-faq summary{padding:12px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;color:#1c1917;}
.cz-faq summary::-webkit-details-marker{display:none;}
.cz-faq summary::after{content:'＋';float:right;color:#d97706;}
.cz-faq details[open] summary::after{content:'－';}
.cz-faq p{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:12px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <div style="font-size:60px;margin-bottom:8px;">${czEmoji}</div>
  <h1>${esc(czTitleMap[czLang]||czTitleMap.en)}</h1>
  <p>${esc(czTrait)}</p>
  <p style="font-size:11px;color:#fef3c7;margin-bottom:12px;">${czBirths}</p>
  <a class="start-btn" href="#lucky-frame">${esc(CZL.start)}</a>
</div>
<div class="info-card">
  <h2>${compatLabel}</h2>
  ${compatNames.split(', ').map(n=>`<span class="badge badge-green">${esc(n)}</span>`).join('')}
  ${clashName?`<br><br><h2 style="margin-top:8px;">${clashLabel}</h2><span class="badge badge-red">${esc(clashName)}</span>`:''}
</div>
<div class="cz-detail">
  <div class="cz-desc">
    <h2>${czLang==='ko'?`${czName} 완전 가이드`:czLang==='ja'?`${czName}完全ガイド`:czLang==='id'?`Panduan Lengkap ${czName}`:`Complete Guide to ${czName}`}</h2>
    <p>${esc(czDescMap[czLang]||czDescMap.en)}</p>
  </div>
  <div class="cz-grid">
    <div class="cz-card"><strong>${czLang==='ko'?'출생연도':czLang==='ja'?'生まれ年':czLang==='id'?'Tahun Lahir':'Birth Years'}</strong><span>${czBirths.split(',').map(y=>`<a href="${czLang==='ko'?`${SITE_URL}/${y.trim()}/`:`${SITE_URL}/${czLang}/${czSlug}/`}">${y.trim()}</a>`).join(' · ')}</span></div>
    <div class="cz-card"><strong>${czLang==='ko'?'상생 띠':czLang==='ja'?'相性良':czLang==='id'?'Cocok':'Compatible'}</strong><span>${esc(compatNames)}</span></div>
    ${clashName?`<div class="cz-card"><strong>${czLang==='ko'?'충(注意)':czLang==='ja'?'相冲(注意)':czLang==='id'?'Hindari':'Clash'}</strong><span>${esc(clashName)}</span></div>`:''}
  </div>
  <section class="cz-faq">
    <h2>${czLang==='ko'?'자주 묻는 질문':czLang==='ja'?'よくある質問':czLang==='id'?'Pertanyaan Umum':'Frequently Asked Questions'}</h2>
    <details open><summary>${czLang==='ko'?`${czName}의 성격은?`:czLang==='ja'?`${czName}の性格は？`:czLang==='id'?`Bagaimana sifat ${czName}?`:`What are ${czName} personality traits?`}</summary><p>${esc(czTrait)}</p></details>
    <details><summary>${czLang==='ko'?`${czName}과 잘 맞는 띠는?`:czLang==='ja'?`${czName}と相性が良い干支は？`:czLang==='id'?`Shio apa yang cocok dengan ${czName}?`:`Which zodiac signs are compatible with ${czName}?`}</summary><p>${esc(compatNames)}</p></details>
    <details><summary>${czLang==='ko'?`2026년 ${czName} 운세는?`:czLang==='ja'?`2026年${czName}の運勢は？`:czLang==='id'?`Bagaimana nasib ${czName} tahun 2026?`:`What is the ${czName} fortune in 2026?`}</summary><p>${czLang==='ko'?`2026년 병오년(丙午年)은 말띠 해입니다. ${czName === '말띠'?'본명년(本命年)으로 변화가 많은 한 해입니다. 건강과 인간관계에 특히 주의하세요.':compatKeys.includes('horse')?'삼합의 해로 귀인의 도움으로 행운이 따르는 시기입니다.':CZ_CLASH[czKey]==='horse'?'충(沖)의 해로 건강과 인간관계에 신중히 대처하세요.':'평운의 해입니다. 꾸준한 노력이 좋은 결실을 맺습니다.'}`:czLang==='ja'?`2026年は丙午年(うまどし)です。${CZ_CLASH[czKey]==='horse'?`${czName}は冲の年です。健康と人間関係に注意が必要です。`:compatKeys.includes('horse')?`${czName}は三合の年で、貴人の助けが期待できます。`:`${czName}は平穏な一年になります。コツコツ努力が実を結ぶでしょう。`}`:czLang==='id'?`Tahun 2026 adalah tahun Kuda (Bingwu). ${CZ_CLASH[czKey]==='horse'?`${czName} perlu berhati-hati dalam kesehatan dan hubungan.`:compatKeys.includes('horse')?`${czName} akan mendapat bantuan dan keberuntungan.`:`${czName} dapat meraih hasil melalui kerja keras.`}`:`In 2026 (Year of the Horse), ${CZ_CLASH[czKey]==='horse'?`${czName} faces a clash year — take care of health and relationships.`:compatKeys.includes('horse')?`${czName} enjoys a harmonious year with support and good fortune.`:`${czName} has a stable year — steady effort brings results.`}`}</p></details>
    <details><summary>${czLang==='ko'?'행운 번호를 어떻게 받나요?':czLang==='ja'?'幸運の数字の取得方法は？':czLang==='id'?'Bagaimana cara mendapatkan angka keberuntungan?':'How do I get my lucky numbers?'}</summary><p>${czLang==='ko'?'생년월일을 입력하면 사주팔자 기반 행운 번호를 즉시 무료로 받을 수 있습니다.':czLang==='ja'?'生年月日を入力すると、九星気学に基づいた幸運の数字を無料で取得できます。':czLang==='id'?'Masukkan tanggal lahir Anda untuk mendapatkan angka keberuntungan berdasarkan Primbon Jawa.':'Enter your date of birth to instantly receive free lucky numbers based on your zodiac sign.'}</p></details>
  </section>
</div>
<iframe id="lucky-frame" src="${esc(`${APP_URL}/?lang=${czLang}`)}" scrolling="no" title="${esc(czName)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('lucky-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter(czLang, 'lucky')}
</body></html>`;
        return new Response(czHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=3600','X-Robots-Tag':'index,follow'}});
      }
    }

    // ── Ko 출생연도 페이지 (/1990/, /1985/ etc.) ─────────────────
    {
      const yearM = path.match(/^\/(\d{4})\/?$/);
      if (yearM) {
        const birthYear = parseInt(yearM[1]);
        if (birthYear >= 1940 && birthYear <= 2010) {
          // 십간지 계산
          const STEMS_KO   = ['경(庚)','신(辛)','임(壬)','계(癸)','갑(甲)','을(乙)','병(丙)','정(丁)','무(戊)','기(己)'];
          const BRANCHES_KO= ['신(申)','유(酉)','술(戌)','해(亥)','자(子)','축(丑)','인(寅)','묘(卯)','진(辰)','사(巳)','오(午)','미(未)'];
          const ELEMENTS_KO= ['金','金','水','水','木','木','火','火','土','土'];
          const ZODIAC_KO  = ['원숭이','닭','개','돼지','쥐','소','호랑이','토끼','용','뱀','말','양'];
          const stemIdx    = ((birthYear - 4) % 10 + 10) % 10;
          const branchIdx  = ((birthYear - 4) % 12 + 12) % 12;
          const stemStr    = STEMS_KO[stemIdx];
          const branchStr  = BRANCHES_KO[branchIdx];
          const element    = ELEMENTS_KO[stemIdx];
          const zodiac     = ZODIAC_KO[branchIdx];
          const yearName   = stemStr.split('(')[0]+branchStr.split('(')[0];

          const byCanonical = `${SITE_URL}/${birthYear}/`;
          const byTitle = `${birthYear}년생(${yearName}년) 사주 행운 번호 — ${zodiac}띠 ${element}기운 오늘의 운세`;
          const byDesc  = `${birthYear}년생 ${zodiac}띠(${yearName}년) 사주팔자 기반 행운 번호 무료 생성. ${element}기운 ${stemStr}${branchStr}년생의 오늘의 운세와 금전운, 연애운, 직업운을 확인하세요.`;
          const byIframe = `${APP_URL}/?lang=ko&bd=${birthYear}0101`;

          const byHtml = `<!DOCTYPE html><html lang="ko"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(byTitle)}</title>
<meta name="description" content="${esc(byDesc)}">
<link rel="canonical" href="${esc(byCanonical)}">
${bornYearHreflang(birthYear)}
<meta property="og:title" content="${esc(byTitle)}">
<meta property="og:description" content="${esc(byDesc)}">
<meta property="og:url" content="${esc(byCanonical)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-ko.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(byTitle)},"description":${JSON.stringify(byDesc)},"url":${JSON.stringify(byCanonical)}}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#1e1b4b,#4338ca);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:clamp(18px,4vw,30px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#c7d2fe;max-width:520px;margin:0 auto 12px;}
.start-btn{display:inline-block;background:#fbbf24;color:#1e1b4b;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.info-grid{display:flex;flex-wrap:wrap;gap:10px;max-width:600px;margin:14px auto;padding:0 16px;}
.info-chip{background:#fff;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:700;color:#4338ca;box-shadow:0 1px 4px rgba(0,0,0,.08);}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <h1>🔮 ${esc(byTitle)}</h1>
  <p>${esc(byDesc)}</p>
  <a class="start-btn" href="#lucky-frame">지금 바로 확인하기</a>
</div>
<div class="info-grid">
  <span class="info-chip">🐾 ${zodiac}띠</span>
  <span class="info-chip">☯️ ${element}(${stemStr}${branchStr}년)</span>
  <span class="info-chip">📅 ${birthYear}년생</span>
</div>
<div class="by-faq" style="max-width:600px;margin:0 auto;padding:14px 16px;">
  <section>
    <h2 style="font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;">${birthYear}년생 자주 묻는 질문</h2>
    <details open style="border-bottom:1px solid #e5e7eb;padding:4px 0;">
      <summary style="padding:11px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;">${birthYear}년생(${yearName}년) 사주의 특징은? <span style="float:right;color:#d97706;">＋</span></summary>
      <p style="font-size:13px;color:#6b7280;line-height:1.75;padding-bottom:10px;">${birthYear}년생은 ${stemStr}${branchStr}년 ${zodiac}띠로 오행은 ${element}에 속합니다. ${element === '木' ? '목(木) 기운은 성장·발전·인자함을 상징합니다. 창의적이고 진취적인 성향이 강합니다.' : element === '火' ? '화(火) 기운은 열정·활력·빛을 상징합니다. 열정적이고 사교적인 성향이 강합니다.' : element === '土' ? '토(土) 기운은 안정·신뢰·인내를 상징합니다. 성실하고 믿음직한 성향이 강합니다.' : element === '金' ? '금(金) 기운은 결단·의리·강인함을 상징합니다. 결단력 있고 의리 있는 성향이 강합니다.' : '수(水) 기운은 지혜·유연함·소통을 상징합니다. 지혜롭고 유연한 성향이 강합니다.'}</p>
    </details>
    <details style="border-bottom:1px solid #e5e7eb;padding:4px 0;">
      <summary style="padding:11px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;">${birthYear}년생의 행운 번호는? <span style="float:right;color:#d97706;">＋</span></summary>
      <p style="font-size:13px;color:#6b7280;line-height:1.75;padding-bottom:10px;">아래 앱에 생년월일을 입력하면 사주팔자 기반 행운 번호를 즉시 무료로 받을 수 있습니다. ${element} 기운과 ${zodiac}띠의 특성을 반영한 로또 6/45 형식의 번호가 제공됩니다.</p>
    </details>
    <details style="padding:4px 0;">
      <summary style="padding:11px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;">2026년 ${birthYear}년생 운세는? <span style="float:right;color:#d97706;">＋</span></summary>
      <p style="font-size:13px;color:#6b7280;line-height:1.75;padding-bottom:10px;">2026년은 병오년(丙午年) 말띠 해입니다. ${zodiac}띠와 말띠의 관계를 분석해 연애운·금전운·직업운을 종합 확인하세요. 아래 앱에서 정확한 생년월일을 입력하면 맞춤 운세가 제공됩니다.</p>
    </details>
  </section>
</div>
<iframe id="lucky-frame" src="${esc(byIframe)}" scrolling="no" title="${esc(byTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('lucky-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter('ko', 'lucky')}
</body></html>`;
          return new Response(byHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=7200','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── En born-YYYY pages (/en/born-1990/ etc.) ─────────────────
    {
      const enBornM = path.match(/^\/en\/born-(\d{4})\/?$/);
      if (enBornM) {
        const by = parseInt(enBornM[1]);
        if (by >= 1940 && by <= 2010) {
          const STEMS_EN   = ['Geng(金)','Xin(金)','Ren(水)','Gui(水)','Jia(木)','Yi(木)','Bing(火)','Ding(火)','Wu(土)','Ji(土)'];
          const BRANCHES_EN= ['Monkey','Rooster','Dog','Pig','Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat'];
          const ELEMENTS_EN= ['Metal','Metal','Water','Water','Wood','Wood','Fire','Fire','Earth','Earth'];
          const stemIdx    = ((by - 4) % 10 + 10) % 10;
          const branchIdx  = ((by - 4) % 12 + 12) % 12;
          const stem       = STEMS_EN[stemIdx];
          const branch     = BRANCHES_EN[branchIdx];
          const element    = ELEMENTS_EN[stemIdx];
          const elemDesc   = element==='Metal'?'strength and determination':element==='Water'?'wisdom and adaptability':element==='Wood'?'growth and creativity':element==='Fire'?'passion and charisma':'stability and reliability';
          const enCanon    = `${SITE_URL}/en/born-${by}/`;
          const enTitle    = `Born in ${by} Lucky Numbers — Year of the ${branch} ${element} Element`;
          const enDesc     = `Free Powerball & Mega Millions lucky numbers for people born in ${by}. Year of the ${branch} (${element} element — ${elemDesc}). Instant, no signup required.`;
          const enFaq = [
            {q:`What zodiac is ${by}?`,a:`${by} is the Year of the ${branch} in the Chinese zodiac.`},
            {q:`What element is ${by}?`,a:`${by} is a ${element} year (${stem} stem). ${element} represents ${elemDesc}.`},
            {q:`What are lucky numbers for people born in ${by}?`,a:`Enter your exact birth date below for personalized lucky numbers based on your Life Path Number and ${branch}/${element} energy.`},
            {q:'Is numerology different for each birth year?',a:'Yes — your birth year determines your Chinese zodiac animal and elemental energy, which along with your Life Path Number shapes your unique numerological profile.'},
          ];
          const enFaqHtml   = enFaq.map(f=>`<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
          const enFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":enFaq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
          const enByHtml = `<!DOCTYPE html><html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(enTitle)}</title>
<meta name="description" content="${esc(enDesc)}">
<link rel="canonical" href="${esc(enCanon)}">
${bornYearHreflang(by)}
<meta property="og:title" content="${esc(enTitle)}">
<meta property="og:description" content="${esc(enDesc)}">
<meta property="og:url" content="${esc(enCanon)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-en.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${enFaqSchema}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#1e1b4b,#4338ca);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:clamp(18px,4vw,30px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#c7d2fe;max-width:520px;margin:0 auto 12px;}
.start-btn{display:inline-block;background:#fbbf24;color:#1e1b4b;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.info-grid{display:flex;flex-wrap:wrap;gap:10px;max-width:600px;margin:14px auto;padding:0 16px;}
.info-chip{background:#fff;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:700;color:#4338ca;box-shadow:0 1px 4px rgba(0,0,0,.08);}
.faq-wrap{max-width:640px;margin:20px auto;padding:0 16px 24px;}
.faq-wrap h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:14px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#d97706;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <h1>Born in ${by} — Lucky Numbers</h1>
  <p>${esc(enDesc)}</p>
  <a class="start-btn" href="#en-born-frame">Get My Lucky Numbers</a>
</div>
<div class="info-grid">
  <span class="info-chip">🐾 Year of the ${branch}</span>
  <span class="info-chip">☯️ ${element} (${stem})</span>
  <span class="info-chip">📅 Born ${by}</span>
</div>
<div class="faq-wrap"><h2>Frequently Asked Questions</h2>${enFaqHtml}</div>
<iframe id="en-born-frame" src="${esc(`${APP_URL}/?lang=en&bd=${by}0101`)}" scrolling="no" title="${esc(enTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('en-born-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter('en','lucky')}
</body></html>`;
          return new Response(enByHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=7200','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── Ja YYYYnen pages (/ja/1990nen/ etc.) ─────────────────────
    {
      const jaNenM = path.match(/^\/ja\/(\d{4})nen\/?$/);
      if (jaNenM) {
        const by = parseInt(jaNenM[1]);
        if (by >= 1940 && by <= 2010) {
          const STEMS_JA    = ['庚(こう)','辛(しん)','壬(じん)','癸(き)','甲(こう)','乙(おつ)','丙(へい)','丁(てい)','戊(ぼ)','己(き)'];
          const BRANCHES_JA = ['申(さる)','酉(とり)','戌(いぬ)','亥(いのしし)','子(ね)','丑(うし)','寅(とら)','卯(うさぎ)','辰(たつ)','巳(み)','午(うま)','未(ひつじ)'];
          const ELEMENTS_JA = ['金','金','水','水','木','木','火','火','土','土'];
          const KSK_NAMES_SHORT = ['一白水星','二黒土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];
          const stemIdx    = ((by - 4) % 10 + 10) % 10;
          const branchIdx  = ((by - 4) % 12 + 12) % 12;
          const stemStr    = STEMS_JA[stemIdx];
          const branchStr  = BRANCHES_JA[branchIdx];
          const element    = ELEMENTS_JA[stemIdx];
          const kskIdx     = ((11 - by) % 9 + 9) % 9;
          const kskName    = KSK_NAMES_SHORT[kskIdx];
          const jaCanon    = `${SITE_URL}/ja/${by}nen/`;
          const jaTitle    = `${by}年生まれ幸運の数字 — ${stemStr}${branchStr}年${element}行・九星気学ラッキーナンバー`;
          const jaDesc     = `${by}年生まれ（${stemStr}${branchStr}年、本命星：${kskName}）の幸運の数字を無料で取得。五行${element}の吉数と九星気学に基づくラッキーナンバー。`;
          const jaFaq = [
            {q:`${by}年は何年ですか？`,a:`${by}年は${stemStr}${branchStr}年（${branchStr.split('(')[0]}年）です。`},
            {q:`${by}年生まれの性格は？`,a:`五行は「${element}」です。${element === '木' ? '木の気は成長・発展・仁の象徴。創造的で進取の気性が強い。' : element === '火' ? '火の気は情熱・活力・輝きの象徴。情熱的で社交的な性格。' : element === '土' ? '土の気は安定・信頼・忍耐の象徴。誠実で頼りがいのある性格。' : element === '金' ? '金の気は決断・義理・強さの象徴。決断力があり義理堅い性格。' : '水の気は知恵・柔軟性・コミュニケーションの象徴。知恵深く柔軟な性格。'}`},
            {q:`${by}年生まれの幸運の数字は？`,a:`下のアプリに生年月日を入力すると、九星気学（本命星：${kskName}）と五行「${element}」に基づくラッキーナンバーを無料で取得できます。`},
            {q:'九星気学とは何ですか？',a:'九星気学は生まれ年から9つの星（一白〜九紫）を割り出し、五行と方位の吉凶を判断する日本の占術です。'},
          ];
          const jaFaqHtml   = jaFaq.map(f=>`<details class="faq-item"><summary>${esc(f.q)}</summary><div class="faq-a">${esc(f.a)}</div></details>`).join('');
          const jaFaqSchema = JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":jaFaq.map(f=>({'@type':'Question','name':f.q,'acceptedAnswer':{'@type':'Answer','text':f.a}}))});
          const jaNenHtml = `<!DOCTYPE html><html lang="ja"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(jaTitle)}</title>
<meta name="description" content="${esc(jaDesc)}">
<link rel="canonical" href="${esc(jaCanon)}">
${bornYearHreflang(by)}
<meta property="og:title" content="${esc(jaTitle)}">
<meta property="og:description" content="${esc(jaDesc)}">
<meta property="og:url" content="${esc(jaCanon)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-ja.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${jaFaqSchema}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;}
.hero{background:linear-gradient(135deg,#1e1b4b,#4338ca);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:clamp(18px,4vw,30px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#c7d2fe;max-width:520px;margin:0 auto 12px;}
.start-btn{display:inline-block;background:#fbbf24;color:#1e1b4b;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.info-grid{display:flex;flex-wrap:wrap;gap:10px;max-width:600px;margin:14px auto;padding:0 16px;}
.info-chip{background:#fff;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:700;color:#4338ca;box-shadow:0 1px 4px rgba(0,0,0,.08);}
.faq-wrap{max-width:640px;margin:20px auto;padding:0 16px 24px;}
.faq-wrap h2{font-size:16px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:14px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:17px;color:#d97706;margin-left:10px;flex-shrink:0;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:14px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <h1>🔮 ${esc(jaTitle)}</h1>
  <p>${esc(jaDesc)}</p>
  <a class="start-btn" href="#ja-nen-frame">今すぐ確認する</a>
</div>
<div class="info-grid">
  <span class="info-chip">🐾 ${branchStr}</span>
  <span class="info-chip">☯️ ${element}（${stemStr}${branchStr}年）</span>
  <span class="info-chip">⭐ ${kskName}</span>
  <span class="info-chip">📅 ${by}年生まれ</span>
</div>
<div class="faq-wrap"><h2>${by}年生まれ よくある質問</h2>${jaFaqHtml}</div>
<iframe id="ja-nen-frame" src="${esc(`${APP_URL}/?lang=ja&bd=${by}0101`)}" scrolling="no" title="${esc(jaTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('ja-nen-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter('ja','lucky')}
</body></html>`;
          return new Response(jaNenHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=7200','X-Robots-Tag':'index,follow'}});
        }
      }
    }

    // ── 혈액형 운세 pages (/ko/blood-a/, /ja/ketsueki-a/ etc.) ─
    {
      const BT_SLUGS = {
        ko: {a:'blood-a',b:'blood-b',o:'blood-o',ab:'blood-ab'},
        ja: {a:'ketsueki-a',b:'ketsueki-b',o:'ketsueki-o',ab:'ketsueki-ab'},
      };
      const BT_NAMES = {ko:{a:'A형',b:'B형',o:'O형',ab:'AB형'},ja:{a:'A型',b:'B型',o:'O型',ab:'AB型'}};
      const BT_TRAITS = {
        a: {ko:'꼼꼼하고 성실하며 완벽주의 성향. 책임감이 강하고 섬세함.',ja:'几帳面で誠実、完璧主義。責任感が強く繊細。'},
        b: {ko:'자유롭고 창의적이며 개성이 강함. 에너지가 넘치고 직관적.',ja:'自由奔放でクリエイティブ、個性的。エネルギッシュで直感的。'},
        o: {ko:'자신감 넘치고 리더십이 강함. 낙관적이고 사교적.',ja:'自信に満ち、リーダーシップが強い。楽観的で社交的。'},
        ab:{ko:'이성적이고 예술적이며 독창적. 두 성격을 모두 가짐.',ja:'理性的で芸術的、独創的。二面性を持つ複雑な性格。'},
      };
      const BT_LUCKY = {
        a: {ko:'파란색·초록색 계열, 짝수, 월요일·수요일',ja:'青・緑系、偶数、月曜・水曜'},
        b: {ko:'빨간색·오렌지 계열, 홀수, 화요일·목요일',ja:'赤・オレンジ系、奇数、火曜・木曜'},
        o: {ko:'흰색·금색 계열, 8·6·3, 일요일·금요일',ja:'白・金系、8・6・3、日曜・金曜'},
        ab:{ko:'보라색·은색 계열, 마스터수 11·22, 토요일',ja:'紫・銀系、マスター数11・22、土曜'},
      };
      const BT_INTRO = {
        a:{ko:`혈액형 A형은 동아시아 혈액형 성격학에서 가장 신중하고 성실한 유형으로 여겨집니다. 계획을 중시하고 디테일에 강하며, 주변을 배려하는 섬세함이 돋보입니다. 이러한 안정 지향적 기질은 수비학에서 짝수와 4·2의 에너지와 공명하는 것으로 해석됩니다. 아래에서 생년월일을 입력하면 A형의 성향과 사주 오행을 함께 반영한 오늘의 행운 번호를 무료로 받을 수 있습니다.`,
           ja:`血液型A型は、東アジアの血液型性格学で最も慎重で誠実なタイプとされます。計画性を重んじ細部に強く、周囲への気配りが際立ちます。この安定志向の気質は、数秘術では偶数や4・2のエネルギーと共鳴すると解釈されます。下に生年月日を入力すると、A型の特性と四柱推命の五行を反映した本日の幸運の数字を無料で取得できます。`},
        b:{ko:`혈액형 B형은 자유분방하고 창의적인 유형으로, 개성과 직관이 강한 것이 특징입니다. 틀에 얽매이지 않는 발상과 넘치는 에너지로 새로운 길을 개척하는 힘이 있습니다. 수비학적으로는 홀수와 변화·모험의 5 에너지와 잘 어울립니다. 생년월일을 입력해 B형 기질과 오행 분석을 결합한 오늘의 행운 번호를 무료로 확인해 보세요.`,
           ja:`血液型B型は自由奔放でクリエイティブなタイプで、個性と直感が強いのが特徴です。枠にとらわれない発想とあふれるエネルギーで新しい道を切り開く力があります。数秘術的には奇数や変化・冒険の5エネルギーと相性が良いとされます。生年月日を入力して、B型の気質と五行分析を組み合わせた本日の幸運の数字を無料で確認しましょう。`},
        o:{ko:`혈액형 O형은 자신감과 리더십이 강하고 낙관적이며 사교적인 유형입니다. 목표를 향한 추진력과 사람을 끌어당기는 매력으로 집단의 중심이 되는 경우가 많습니다. 수비학에서는 성취와 풍요의 8, 그리고 6·3의 에너지와 공명합니다. 아래 앱에 생년월일을 입력하면 O형 특성과 사주를 반영한 오늘의 행운 번호를 무료로 받아볼 수 있습니다.`,
           ja:`血液型O型は自信とリーダーシップが強く、楽観的で社交的なタイプです。目標への推進力と人を惹きつける魅力で、集団の中心になることが多いです。数秘術では達成と豊かさの8、そして6・3のエネルギーと共鳴します。下のアプリに生年月日を入力すると、O型の特性と四柱推命を反映した本日の幸運の数字を無料で取得できます。`},
        ab:{ko:`혈액형 AB형은 이성적이면서 예술적이고 독창적인 유형으로, A형과 B형의 두 기질을 함께 지닌 복합적 성격이 특징입니다. 객관적 분석력과 풍부한 감수성을 동시에 갖춰 균형 잡힌 시야를 가집니다. 수비학적으로는 직관과 영감의 마스터수 11·22와 깊이 공명합니다. 생년월일을 입력해 AB형 기질과 오행을 결합한 오늘의 행운 번호를 무료로 확인하세요.`,
           ja:`血液型AB型は理性的でありながら芸術的・独創的なタイプで、A型とB型の二つの気質を併せ持つ複雑な性格が特徴です。客観的な分析力と豊かな感受性を兼ね備え、バランスの取れた視野を持ちます。数秘術的には直感とインスピレーションのマスター数11・22と深く共鳴します。生年月日を入力して、AB型の気質と五行を組み合わせた本日の幸運の数字を無料で確認しましょう。`},
      };

      const btM = path.match(/^\/([a-z]{2})\/([a-z][a-z-]*)\/?$/);
      if (btM) {
        const btLang = btM[1], btSlug = btM[2];
        if (BT_SLUGS[btLang]) {
          const btType = Object.keys(BT_SLUGS[btLang]).find(k=>BT_SLUGS[btLang][k]===btSlug);
          if (btType && LANGS[btLang]) {
            const btName   = BT_NAMES[btLang][btType];
            const btTrait  = (BT_TRAITS[btType]||{})[btLang]||'';
            const btLucky  = (BT_LUCKY[btType]||{})[btLang]||'';
            const btCanon  = `${SITE_URL}/${btLang}/${btSlug}/`;
            const btIntro  = (BT_INTRO[btType]||{})[btLang]||'';
            const btHreflang = buildHreflang([
              {lang:'ko', url:`${SITE_URL}/ko/${BT_SLUGS.ko[btType]}/`},
              {lang:'ja', url:`${SITE_URL}/ja/${BT_SLUGS.ja[btType]}/`},
            ]);
            const btTitle  = btLang==='ko' ? `혈액형 ${btName} 운세 — 오늘의 행운 번호와 사주` : `血液型${btName}の運勢・今日の幸運の数字`;
            const btDesc   = btLang==='ko' ? `혈액형 ${btName}의 성격과 운세. ${btTrait} 오늘의 행운 번호를 무료로 확인하세요.` : `血液型${btName}の性格と運勢。${btTrait}今すぐ幸運の数字を無料で確認。`;
            const btIframe = `${APP_URL}/?lang=${btLang}`;
            const btHtml = `<!DOCTYPE html><html lang="${btLang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
${ADS_TAG}
<title>${esc(btTitle)}</title>
<meta name="description" content="${esc(btDesc)}">
<link rel="canonical" href="${esc(btCanon)}">
${btHreflang}
<meta property="og:title" content="${esc(btTitle)}">
<meta property="og:description" content="${esc(btDesc)}">
<meta property="og:url" content="${esc(btCanon)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${APP_URL}/og-${btLang}.png">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":${JSON.stringify(btTitle)},"description":${JSON.stringify(btDesc)},"url":${JSON.stringify(btCanon)}}</script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fdf2f8;}
.hero{background:linear-gradient(135deg,#831843,#db2777);color:#fff;padding:28px 20px;text-align:center;}
.hero h1{font-size:clamp(18px,4vw,30px);font-weight:900;margin-bottom:8px;}
.hero p{font-size:13px;color:#fce7f3;max-width:520px;margin:0 auto 12px;}
.start-btn{display:inline-block;background:#fff;color:#831843;font-weight:800;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;}
.info-card{max-width:600px;margin:14px auto;padding:14px 18px;background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,0,0,.08);font-size:13px;color:#374151;}
.info-card h2{font-size:14px;font-weight:800;color:#831843;margin-bottom:6px;}
iframe{width:100%;border:none;display:block;height:560px;}
${NAV_FOOTER_CSS}
</style>
</head><body>
<div class="hero">
  <div style="font-size:52px;font-weight:900;margin-bottom:8px;">${btName}</div>
  <h1>${esc(btTitle)}</h1>
  <p>${esc(btTrait)}</p>
  <a class="start-btn" href="#lucky-frame">${btLang==='ko'?'운세 보기':'運勢を見る'}</a>
</div>
<div class="info-card">
  <h2>${btLang==='ko'?'행운의 색상·숫자·요일':'ラッキーカラー・数字・曜日'}</h2>
  <p>${esc(btLucky)}</p>
</div>
<div class="info-card" style="line-height:1.9;">
  <p>${esc(btIntro)}</p>
</div>
<div style="max-width:600px;margin:0 auto;padding:14px 16px;">
  <section>
    <h2 style="font-size:16px;font-weight:800;color:#831843;margin-bottom:12px;">${btLang==='ko'?`혈액형 ${btName} 자주 묻는 질문`:`血液型${btName} よくある質問`}</h2>
    <details open style="border-bottom:1px solid #fce7f3;padding:4px 0;">
      <summary style="padding:11px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;">${btLang==='ko'?`${btName}형의 성격과 특징은?`:`${btName}型の性格と特徴は？`} <span style="float:right;color:#db2777;">＋</span></summary>
      <p style="font-size:13px;color:#6b7280;line-height:1.75;padding-bottom:10px;">${esc(btTrait)}</p>
    </details>
    <details style="border-bottom:1px solid #fce7f3;padding:4px 0;">
      <summary style="padding:11px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;">${btLang==='ko'?`${btName}형의 행운 색상과 숫자는?`:`${btName}型のラッキーカラーと数字は？`} <span style="float:right;color:#db2777;">＋</span></summary>
      <p style="font-size:13px;color:#6b7280;line-height:1.75;padding-bottom:10px;">${esc(btLucky)}</p>
    </details>
    <details style="padding:4px 0;">
      <summary style="padding:11px 0;font-size:14px;font-weight:700;cursor:pointer;list-style:none;">${btLang==='ko'?'행운 번호는 어떻게 받나요?':'幸運の数字の取得方法は？'} <span style="float:right;color:#db2777;">＋</span></summary>
      <p style="font-size:13px;color:#6b7280;line-height:1.75;padding-bottom:10px;">${btLang==='ko'?'아래 앱에 생년월일을 입력하면 사주팔자·혈액형 특성을 반영한 행운 번호를 즉시 무료로 받을 수 있습니다.':'下のアプリに生年月日を入力すると、血液型の特性を反映した幸運の数字を無料で取得できます。'}</p>
    </details>
  </section>
</div>
<iframe id="lucky-frame" src="${esc(btIframe)}" scrolling="no" title="${esc(btTitle)}" loading="lazy"></iframe>
<script>(function(){var f=document.getElementById('lucky-frame');var lastH=560;window.addEventListener('message',function(e){if(e.data&&e.data.type==='lucky-resize'&&e.data.height>100){var h=Math.ceil(e.data.height)+24;if(Math.abs(h-lastH)>4){lastH=h;f.style.height=h+'px';}}});})();</script>
${buildNavFooter(btLang, 'lucky')}
</body></html>`;
            return new Response(btHtml, {headers:{'Content-Type':'text/html;charset=UTF-8','Cache-Control':'public,max-age=3600','X-Robots-Tag':'index,follow'}});
          }
        }
      }
    }

    // ── Language lucky pages (/en/lucky/, /ja/lucky/, etc.) ─
    // /lucky/ itself passes through to Lightsail (direct SPA)
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
    }).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/en/lucky/">`;

    // ── Structured data schemas ──────────────────────────
    const appSchema = JSON.stringify({
      "@context":"https://schema.org","@type":"WebApplication",
      "name":L.h1,"description":L.desc,"url":canonical,
      "applicationCategory":"EntertainmentApplication","inLanguage":lang,
      "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
      "operatingSystem":"Web","browserRequirements":"Requires JavaScript"
    });

    const faqSchema = JSON.stringify({
      "@context":"https://schema.org","@type":"FAQPage",
      "mainEntity":L.faq.map(f=>({
        "@type":"Question","name":f.q,
        "acceptedAnswer":{"@type":"Answer","text":f.a}
      }))
    });

    const howToSchema = L.howTo ? JSON.stringify({
      "@context":"https://schema.org","@type":"HowTo",
      "name":L.howTo.title,
      "description":L.desc,
      "step":L.howTo.steps.map((s,i)=>({
        "@type":"HowToStep","position":i+1,"text":s
      }))
    }) : null;

    const breadcrumbSchema = JSON.stringify({
      "@context":"https://schema.org","@type":"BreadcrumbList",
      "itemListElement":[
        {"@type":"ListItem","position":1,"name":"all-lifes.com","item":SITE_URL},
        {"@type":"ListItem","position":2,"name":L.h1,"item":canonical}
      ]
    });

    const featuresHtml = L.features.map(f => `<span class="chip">${f}</span>`).join('');
    const faqHtml = L.faq.map((f,i) =>
      `<details class="faq-item"${i===0?' open':''}>
        <summary class="faq-q">${esc(f.q)}</summary>
        <div class="faq-a">${esc(f.a)}</div>
      </details>`
    ).join('');
    const howStepsHtml = L.howTo ? L.howTo.steps.map((s,i) =>
      `<div class="how-step"><span class="how-num">${i+1}</span><span class="how-text">${esc(s)}</span></div>`
    ).join('') : '';
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
<meta property="og:title"        content="${esc(ogTitle)}">
<meta property="og:description"  content="${esc(ogDesc)}">
<meta property="og:url"          content="${esc(canonical)}">
<meta property="og:type"         content="website">
<meta property="og:locale"       content="${L.locale}">
<meta property="og:image"        content="${esc(ogImage)}">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="${esc(ogTitle)}">
<meta name="twitter:description" content="${esc(ogDesc)}">
<meta name="twitter:image"       content="${esc(ogImage)}">
<script type="application/ld+json">${appSchema}</script>
<script type="application/ld+json">${faqSchema}</script>
${howToSchema ? `<script type="application/ld+json">${howToSchema}</script>` : ''}
<script type="application/ld+json">${breadcrumbSchema}</script>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fffbeb;color:#1c1917;}
.hero{background:linear-gradient(135deg,#1e1b4b,#312e81,#4c1d95);color:#fff;padding:32px 20px 26px;text-align:center;}
.hero h1{font-size:clamp(22px,4vw,38px);font-weight:900;margin-bottom:8px;line-height:1.2;}
.hero p{font-size:13px;color:#c4b5fd;max-width:560px;margin:0 auto 16px;line-height:1.65;}
.chips{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-bottom:20px;}
.chip{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:20px;padding:5px 14px;font-size:12px;color:#e0e7ff;}
.start-btn{display:inline-block;background:#d97706;color:#fff;font-weight:800;font-size:15px;padding:14px 32px;border-radius:50px;text-decoration:none;box-shadow:0 4px 20px rgba(217,119,6,0.45);transition:transform .15s;}
.start-btn:hover{transform:translateY(-1px);}
.lang-bar{background:#1e1b4b;padding:8px 20px;text-align:center;font-size:12px;overflow-x:auto;white-space:nowrap;}
.lang-bar a{color:#a5b4fc;text-decoration:none;margin:0 6px;}
.lang-bar a:hover{color:#fff;}
.lang-bar a.active{color:#fbbf24;font-weight:700;}
iframe{width:100%;border:none;display:block;height:560px;min-height:0;transition:height .25s ease;}
.seo-section{background:#fff;border-top:1px solid #e7e5e4;padding:40px 20px 48px;}
.seo-section .inner{max-width:780px;margin:0 auto;}
.seo-intro{font-size:14px;color:#44403c;line-height:1.85;margin-bottom:32px;padding:22px 24px;background:#fffbeb;border-left:4px solid #d97706;border-radius:0 12px 12px 0;}
.why-section{margin-bottom:36px;padding:24px;background:#f0f9ff;border-radius:16px;border:1px solid #bae6fd;}
.why-section h2{font-size:17px;font-weight:800;color:#1e1b4b;margin-bottom:12px;}
.why-section p{font-size:14px;color:#374151;line-height:1.85;}
.how-section{margin-bottom:36px;}
.section-h2{font-size:18px;font-weight:800;color:#1e1b4b;margin-bottom:16px;}
.how-steps{display:flex;flex-direction:column;gap:10px;}
.how-step{display:flex;align-items:flex-start;gap:14px;padding:14px 16px;background:#f5f5f4;border-radius:12px;}
.how-num{flex-shrink:0;width:28px;height:28px;background:#d97706;color:#fff;font-weight:900;font-size:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;}
.how-text{font-size:14px;color:#1c1917;line-height:1.6;padding-top:3px;}
.faq-section{margin-top:0;}
.faq-item{border-bottom:1px solid #e7e5e4;}
.faq-item:last-child{border-bottom:none;}
.faq-item summary{list-style:none;padding:16px 0;font-size:14px;font-weight:700;color:#1c1917;cursor:pointer;display:flex;justify-content:space-between;align-items:center;}
.faq-item summary::-webkit-details-marker{display:none;}
.faq-item summary::after{content:'＋';font-size:18px;color:#d97706;flex-shrink:0;margin-left:12px;}
.faq-item[open] summary::after{content:'－';}
.faq-a{font-size:13px;color:#78716c;line-height:1.75;padding-bottom:16px;}
${NAV_FOOTER_CSS}
</style>
</head>
<body>
<div class="hero">
  <h1>${esc(L.h1)}</h1>
  <p>${esc(L.body)}</p>
  <div class="chips">${featuresHtml}</div>
  <a class="start-btn" href="#lucky-frame">${esc(L.start)}</a>
</div>
<div class="lang-bar">${langBarHtml}</div>
<iframe id="lucky-frame" src="${esc(iframeSrc)}" scrolling="no" title="${esc(L.h1)}" loading="lazy"></iframe>
<div class="seo-section">
  <div class="inner">
    ${L.intro ? `<p class="seo-intro">${esc(L.intro)}</p>` : ''}
    ${L.why ? `<section class="why-section"><h2>${esc(L.whyTitle)}</h2><p>${esc(L.why)}</p></section>` : ''}
    ${howStepsHtml ? `<section class="how-section"><h2 class="section-h2">${esc(L.howTo.title)}</h2><div class="how-steps">${howStepsHtml}</div></section>` : ''}
    <section class="faq-section"><h2 class="section-h2">${esc(L.faqH2)}</h2>${faqHtml}</section>
  </div>
</div>
<script>
(function(){
  var f = document.getElementById('lucky-frame');
  var lastH = 560;
  window.addEventListener('message', function(e){
    if(e.data && e.data.type === 'lucky-resize' && e.data.height > 100){
      var h = Math.ceil(e.data.height) + 24;
      if(Math.abs(h - lastH) > 4){ lastH = h; f.style.height = h + 'px'; }
    }
  });
  // Fallback: if no resize message within 2s, check actual content height via CSS
  f.addEventListener('load', function(){
    setTimeout(function(){
      try {
        var inner = f.contentDocument || f.contentWindow.document;
        var bh = inner && inner.body ? inner.body.scrollHeight : 0;
        if(bh > 100){ var h2 = bh + 24; lastH = h2; f.style.height = h2 + 'px'; }
      } catch(ex){}
    }, 800);
  });
})();
</script>
${buildNavFooter(lang,'lucky')}
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
