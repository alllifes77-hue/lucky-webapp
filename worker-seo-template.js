// ═══════════════════════════════════════════════════════════
// Cloudflare Worker: lucky-multilang
// Routes:
//   all-lifes.com/*/lucky/        → SEO SSR wrapper (per language)
//   all-lifes.com/lucky-og        → Dynamic SVG OG image
//   all-lifes.com/lucky-sitemap.xml → Sitemap
// ═══════════════════════════════════════════════════════════

const APP_URL  = 'https://lucky.all-lifes.com';
const SITE_URL = 'https://all-lifes.com';
const ALL_LANGS = ['ko','en','ja','de','fr','es','pt','it','id'];

// ── Per-language SEO metadata ────────────────────────────
const LANGS = {
  en: {
    name:'English', locale:'en_US',
    title:'Lucky Number Generator – Free Numerology Lottery Numbers from Your Birthday | Powerball & Mega Millions',
    desc:'Free lucky number generator using Pythagorean numerology. Enter your birthday to get personal Powerball, Mega Millions & Pick 4 numbers. Life Path Number algorithm — instant, no signup.',
    keywords:'lucky number generator,numerology lucky numbers,Powerball lucky numbers,Mega Millions lucky numbers,birthday lucky numbers,life path number lottery,free lottery numbers,lottery number generator,numerology lottery calculator,personal lucky numbers today,birthday numerology',
    h1:'Lucky Number Generator',
    body:'Pythagorean Numerology · Life Path Number · Powerball · Mega Millions · 100% Free',
    start:'Generate My Lucky Numbers',
    intro:'Your date of birth holds a unique numerical blueprint that Pythagorean numerology has studied for over 2,500 years. By calculating your Life Path Number — derived by summing all digits of your birth date — this free generator identifies the numbers that carry the strongest vibrational resonance with your personal frequency. These lucky numbers are weighted 4× higher in the Powerball and Mega Millions selection pool, making them statistically more likely to appear in your results. Supports Powerball, Mega Millions, Pick 4, and Pick 3. Multiple sets (1, 3, 5, or 10) can be generated at once. Your data never leaves your browser — 100% free, no registration required.',
    howTo:{
      title:'How It Works',
      steps:[
        'Enter your date of birth (year, month, day) in the form.',
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
      {q:'Can I add a draw date for more precise numbers?',a:'Yes. Entering the upcoming draw date activates the Universal Day Number (UDN) calculation, which combines the draw date\'s numerological energy with your birth energy. This refines the selection for that specific date and is recommended for targeting a particular draw.'},
      {q:'Does this guarantee winning the lottery?',a:'No. Lottery draws are completely random events and no system can guarantee a win. This app provides entertainment and cultural insight through the lens of Pythagorean numerology. Please play responsibly and within your means.'},
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
    keywords:'Glückszahlen Generator,Numerologie Glückszahlen,EuroMillions Zahlen Generator,Lotto Zahlen Geburtstag,Lebenspfadzahl Numerologie,kostenlose Glückszahlen,Lottozahlen Generator,EuroJackpot Glückszahlen,persönliche Glückszahlen,Geburtsdatum Glückszahlen',
    h1:'Glückszahlen Generator',
    body:'Pythagoräische Numerologie · Lebenspfadzahl · EuroMillions · Lotto 6aus49 · Kostenlos',
    start:'Glückszahlen generieren',
    intro:'Ihr Geburtsdatum enthält einen einzigartigen numerischen Bauplan, den die pythagoräische Numerologie seit über 2.500 Jahren entschlüsselt. Durch die Berechnung Ihrer Lebenspfadzahl — gewonnen durch Addition aller Ziffern Ihres Geburtsdatums — identifiziert dieser kostenlose Generator die Zahlen mit der stärksten Schwingungsresonanz zu Ihrer persönlichen Frequenz. Diese Glückszahlen werden im Auswahlpool für EuroMillions, EuroJackpot und Lotto 6aus49 mit 4-facher Gewichtung berücksichtigt, sodass sie statistisch häufiger in Ihren Ergebnissen erscheinen. Keine Anmeldung erforderlich, keine Daten gespeichert.',
    howTo:{
      title:'So funktioniert es',
      steps:[
        'Geben Sie Ihr Geburtsdatum ein (Jahr, Monat, Tag).',
        'Wählen Sie Ihre Lotterie: EuroMillions, EuroJackpot oder Lotto 6aus49.',
        'Wählen Sie 1, 3, 5 oder 10 Tipp-Sets.',
        'Klicken Sie auf "Glückszahlen generieren" — sofortige persönliche Ergebnisse.',
      ]
    },
    faq:[
      {q:'Wie funktioniert der Glückszahlen-Generator?',a:'Ihre Lebenspfadzahl wird durch Addition aller Ziffern Ihres Geburtsdatums berechnet und auf eine einstellige Zahl (1–9) oder Meisterzahl (11, 22, 33) reduziert. Die traditionell mit dieser Zahl verbundenen Glückszahlen werden im Auswahlpool mit 4-facher Gewichtung berücksichtigt — für EuroMillions, EuroJackpot und Lotto 6aus49.'},
      {q:'Was ist eine Lebenspfadzahl?',a:'Die Lebenspfadzahl ist die wichtigste Zahl in der pythagoräischen Numerologie. Sie ergibt sich aus der Summe aller Ziffern Ihres vollständigen Geburtsdatums, reduziert auf 1–9 oder eine Meisterzahl (11, 22, 33). Sie repräsentiert Ihre einzigartige Schwingungsfrequenz.'},
      {q:'Erhalte ich jedes Mal dieselben Zahlen?',a:'Ja — dasselbe Geburtsdatum erzeugt immer dieselben Glückszahlen. Der Algorithmus ist vollständig deterministisch. Ihr numerologisches Profil ändert sich nicht, daher bleiben Ihre Kernglückszahlen konsistent.'},
      {q:'Welche Lotterien werden unterstützt?',a:'EuroMillions (5/50 + 2/12 Lucky Stars), EuroJackpot (5/50 + 2/10), Lotto 6aus49 (6/49). Wählen Sie Ihr bevorzugtes Format vor der Generierung. Sie können 1, 3, 5 oder 10 Tipp-Sets gleichzeitig erstellen.'},
      {q:'Was bringt die Eingabe eines Ziehungsdatums?',a:'Die optionale Eingabe des Ziehungsdatums aktiviert die Berechnung der Universellen Tageszahl (UTZ), die die numerologische Energie des Ziehungstages mit Ihrer Geburtsenergie kombiniert — für noch präzisere Ergebnisse.'},
      {q:'Garantiert das einen Lottogewinn?',a:'Nein. Lottoziehungen sind vollständig zufällig, und kein System kann einen Gewinn garantieren. Diese App bietet Unterhaltung und kulturellen Einblick durch die Linse der pythagoräischen Numerologie. Bitte spielen Sie verantwortungsvoll.'},
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
    keywords:'ラッキーナンバー 誕生日,九星気学 宝くじ,ロト6 番号生成,幸運の数字 誕生日,宝くじ当たる番号,無料ラッキーナンバー,本命星 吉数,ロト7 ラッキーナンバー,ミニロト 番号,ナンバーズ4 予想',
    h1:'ラッキーナンバー生成器',
    body:'九星気学 · 本命星 · ロト6 · ロト7 · ナンバーズ4 · 完全無料',
    start:'ラッキーナンバーを引く',
    intro:'あなたの生年月日は、1,200年以上の歴史を持つ九星気学が解き明かす独自の数字の設計図を持っています。生まれ年から本命星（1〜9の星）を算出し、その五行属性（木・火・土・金・水）に基づく吉数を特定します。これらの吉数はロト6・ロト7・ミニロト・ナンバーズ4の選択プールで4倍の重みを持ち、統計的に選ばれやすくなります。登録不要・データ保存なし・完全無料でご利用いただけます。',
    howTo:{
      title:'使い方',
      steps:[
        '生年月日（年・月・日）を入力してください。',
        '宝くじの種類を選択：ロト6、ロト7、ミニロト、ナンバーズ4など。',
        '生成セット数を選択：1、3、5、または10セット。',
        '「ラッキーナンバーを引く」をクリック — 本命星に基づく番号が即座に表示されます。',
      ]
    },
    faq:[
      {q:'九星気学とは何ですか？',a:'九星気学は1,200年以上の歴史を持つ日本の伝統的な占術です。生まれ年から本命星（一白水星〜九紫火星）を算出し、各星の五行属性（木・火・土・金・水）に基づく吉数が宝くじ番号の生成に活用されます。'},
      {q:'本命星はどのように計算されますか？',a:'生まれ年の各桁を合計し、一桁になるまで繰り返し合計します。その数を11から引き、9で割った余りに1を加えた数が本命星です。例：1985年生まれ → 1+9+8+5=23 → 2+3=5 → 本命星は五黄土星。'},
      {q:'毎回同じ番号が出ますか？',a:'はい — 同じ生年月日からは常に同じ番号が生成されます。アルゴリズムは完全に決定論的で、あなたの本命星に基づいています。'},
      {q:'対応している宝くじの種類は？',a:'ロト6（6/43）、ロト7（7/37）、ミニロト（5/31）、ナンバーズ4（4桁）、ナンバーズ3（3桁）に対応。1、3、5、10セットを一度に生成できます。'},
      {q:'抽選日を入力するとどう変わりますか？',a:'抽選日を入力すると日星（日ごとの九星）が計算され、あなたの本命星エネルギーと組み合わせることで、その抽選日に特化したより精密な番号が生成されます。'},
      {q:'当選を保証しますか？',a:'保証はできません。宝くじは完全な無作為抽選であり、どんなシステムも当選を保証することはできません。このアプリは九星気学の文化的知恵に基づいたエンターテインメントです。責任ある範囲でお楽しみください。'},
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
    keywords:'générateur numéros chanceux,numérologie EuroMillions,numéros chance anniversaire,chemin de vie numérologie,numéros gratuits loterie,EuroMillions numéros personnalisés,Loto numéros chance,générer numéros chance,numérologie pythagoricienne,loterie anniversaire',
    h1:'Numéros Chanceux',
    body:'Numérologie Pythagoricienne · Chemin de Vie · EuroMillions · Loto · 100% Gratuit',
    start:'Générer mes numéros chanceux',
    intro:'Votre date de naissance renferme un schéma numérique unique que la numérologie pythagoricienne décode depuis plus de 2 500 ans. En calculant votre Nombre de Chemin de Vie — la somme réduite de tous les chiffres de votre date de naissance — ce générateur gratuit identifie les numéros portant la plus forte résonance vibratoire avec votre fréquence personnelle. Ces numéros chanceux bénéficient d\'un poids 4× supérieur dans le pool EuroMillions, Loto et EuroJackpot, les rendant statistiquement plus susceptibles d\'apparaître dans vos résultats. Aucune inscription, aucune donnée conservée.',
    howTo:{
      title:'Comment ça marche',
      steps:[
        'Saisissez votre date de naissance (année, mois, jour).',
        'Choisissez votre loterie : EuroMillions, Loto ou EuroJackpot.',
        'Sélectionnez 1, 3, 5 ou 10 grilles de numéros.',
        'Cliquez sur "Générer mes numéros chanceux" — résultats instantanés basés sur votre Chemin de Vie.',
      ]
    },
    faq:[
      {q:'Comment ce générateur produit-il des numéros chanceux ?',a:'Votre Nombre de Chemin de Vie est calculé en additionnant tous les chiffres de votre date de naissance et en réduisant au chiffre unique (1–9) ou nombre maître (11, 22, 33). Les numéros résonants de ce chemin de vie sont pondérés 4× plus fort dans le pool EuroMillions ou Loto, augmentant leur probabilité statistique de sélection.'},
      {q:'Qu\'est-ce qu\'un Nombre de Chemin de Vie ?',a:'Le Nombre de Chemin de Vie est le chiffre le plus important de la numérologie pythagoricienne. Il est dérivé en additionnant tous les chiffres de votre date de naissance complète et en réduisant à un seul chiffre ou nombre maître. Il représente votre fréquence vibratoire fondamentale.'},
      {q:'Aurai-je toujours les mêmes numéros pour la même date ?',a:'Oui — la même date de naissance produit toujours les mêmes numéros. L\'algorithme est entièrement déterministe. Votre profil numérologique ne change pas, donc vos numéros chanceux essentiels restent constants.'},
      {q:'Quelles loteries sont supportées ?',a:'EuroMillions (5/50 + 2/12 Étoiles), Loto (5/49 + 1/10 Chance), EuroJackpot (5/50 + 2/10). Sélectionnez votre format avant la génération. Vous pouvez créer 1, 3, 5 ou 10 grilles simultanément.'},
      {q:'Que change l\'ajout d\'une date de tirage ?',a:'Saisir la date du tirage active le calcul du Nombre Universel du Jour (NUJ), qui combine l\'énergie numérologique de la date du tirage avec votre énergie natale — pour une sélection encore plus précise pour ce tirage spécifique.'},
      {q:'Cela garantit-il un gain à la loterie ?',a:'Non. Les tirages de loterie sont des événements entièrement aléatoires et aucun système ne peut garantir un gain. Cette application offre un divertissement basé sur la numérologie pythagoricienne. Jouez de manière responsable.'},
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
    keywords:'generador números suerte,numerología EuroMillions,números suerte cumpleaños,camino de vida numerología,números gratis lotería,La Primitiva números,EuroMillions números personalizados,BonoLoto números suerte,numerología pitagórica,lotería cumpleaños',
    h1:'Números de la Suerte',
    body:'Numerología Pitagórica · Camino de Vida · EuroMillions · La Primitiva · 100% Gratis',
    start:'Generar mis números de la suerte',
    intro:'Tu fecha de nacimiento contiene un plano numérico único que la numerología pitagórica ha descifrado durante más de 2.500 años. Calculando tu Número del Camino de Vida — la suma reducida de todos los dígitos de tu fecha de nacimiento — este generador gratuito identifica los números con mayor resonancia vibratoria con tu frecuencia personal. Estos números de la suerte tienen un peso 4× superior en el pool de EuroMillions, La Primitiva y BonoLoto, haciéndolos estadísticamente más probables en tus resultados. Sin registro, sin datos guardados.',
    howTo:{
      title:'Cómo funciona',
      steps:[
        'Introduce tu fecha de nacimiento (año, mes, día).',
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
      {q:'¿Qué aporta agregar una fecha de sorteo?',a:'Introducir la fecha del sorteo activa el cálculo del Número Universal del Día (NUD), que combina la energía numerológica de esa fecha con tu energía natal, refinando la selección para ese sorteo específico.'},
      {q:'¿Garantiza ganar la lotería?',a:'No. Los sorteos de lotería son eventos completamente aleatorios y ningún sistema puede garantizar un premio. Esta aplicación ofrece entretenimiento e información cultural a través de la numerología pitagórica. Juega de forma responsable.'},
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
    keywords:'gerador números sorte,numerologia Mega-Sena,números sorte aniversário,caminho de vida numerologia,Lotofácil números,Quina números,números grátis loteria,numerologia pitagórica,loteria aniversário,números personalizados sorte',
    h1:'Números da Sorte',
    body:'Numerologia Pitagórica · Caminho de Vida · Mega-Sena · Lotofácil · 100% Grátis',
    start:'Gerar meus números da sorte',
    intro:'Sua data de nascimento contém um plano numérico único que a numerologia pitagórica decifra há mais de 2.500 anos. Calculando seu Número do Caminho de Vida — a soma reduzida de todos os dígitos da sua data de nascimento — este gerador gratuito identifica os números com maior ressonância vibratória com sua frequência pessoal. Esses números da sorte têm peso 4× maior no pool da Mega-Sena, Lotofácil e Quina, tornando-os estatisticamente mais prováveis nos seus resultados. Sem cadastro, sem dados armazenados.',
    howTo:{
      title:'Como funciona',
      steps:[
        'Insira sua data de nascimento (ano, mês, dia).',
        'Escolha sua loteria: Mega-Sena, Lotofácil ou Quina.',
        'Selecione 1, 3, 5 ou 10 jogos de números.',
        'Clique em "Gerar meus números da sorte" — resultados instantâneos baseados no seu Caminho de Vida.',
      ]
    },
    faq:[
      {q:'Como a numerologia gera números da sorte?',a:'Seu Número do Caminho de Vida é calculado somando todos os dígitos da sua data de nascimento completa e reduzindo a um único dígito (1–9) ou número mestre (11, 22, 33). Os números ressonantes desse caminho recebem peso 4× maior no pool da Mega-Sena ou Lotofácil, aumentando sua probabilidade estatística de seleção.'},
      {q:'O que é o Número do Caminho de Vida?',a:'O Número do Caminho de Vida é o número mais importante da numerologia pitagórica. É derivado somando todos os dígitos da sua data de nascimento e reduzindo a um único dígito (1–9) ou número mestre (11, 22, 33). Representa sua frequência vibratória fundamental.'},
      {q:'Terei sempre os mesmos números para a mesma data?',a:'Sim — a mesma data de nascimento sempre produz os mesmos números. O algoritmo é completamente determinista baseado no seu Caminho de Vida. Seu perfil numerológico não muda.'},
      {q:'Quais loterias são suportadas?',a:'Mega-Sena (6/60), Lotofácil (15/25), Quina (5/80). Selecione seu formato antes de gerar. Você pode criar 1, 3, 5 ou 10 jogos simultaneamente.'},
      {q:'O que muda ao adicionar uma data de sorteio?',a:'Inserir a data do sorteio ativa o cálculo do Número Universal do Dia (NUD), que combina a energia numerológica dessa data com sua energia natal — refinando a seleção para aquele sorteio específico.'},
      {q:'Isso garante ganhar na loteria?',a:'Não. Os sorteios de loteria são eventos completamente aleatórios e nenhum sistema pode garantir um prêmio. Este aplicativo oferece entretenimento e insights culturais através da numerologia pitagórica. Jogue com responsabilidade.'},
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
    keywords:'generatore numeri fortunati,numerologia SuperEnalotto,numeri fortuna compleanno,percorso vita numerologia,SuperEnalotto numeri personali,EuroMillions numeri,EuroJackpot numeri,numerologia pitagorica,lotteria compleanno,numeri gratis lotteria',
    h1:'Numeri Fortunati',
    body:'Numerologia Pitagorica · Percorso di Vita · SuperEnalotto · EuroMillions · 100% Gratis',
    start:'Genera i miei numeri fortunati',
    intro:'La tua data di nascita racchiude un progetto numerico unico che la numerologia pitagorica decifra da oltre 2.500 anni. Calcolando il tuo Numero del Percorso di Vita — la somma ridotta di tutte le cifre della tua data di nascita — questo generatore gratuito identifica i numeri con la più forte risonanza vibratoria con la tua frequenza personale. Questi numeri fortunati hanno un peso 4× maggiore nel pool di SuperEnalotto, EuroMillions ed EuroJackpot, rendendoli statisticamente più probabili nei tuoi risultati. Nessuna registrazione, nessun dato conservato.',
    howTo:{
      title:'Come funziona',
      steps:[
        'Inserisci la tua data di nascita (anno, mese, giorno).',
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
      {q:'Cosa cambia aggiungendo una data di estrazione?',a:'Inserire la data dell\'estrazione attiva il calcolo del Numero Universale del Giorno (NUG), che combina l\'energia numerologica di quella data con la tua energia natale — affinando la selezione per quella specifica estrazione.'},
      {q:'Garantisce una vincita alla lotteria?',a:'No. Le estrazioni della lotteria sono eventi completamente casuali e nessun sistema può garantire una vincita. Questa app offre intrattenimento e approfondimenti culturali attraverso la numerologia pitagorica. Gioca responsabilmente.'},
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
    keywords:'generator angka keberuntungan,prediksi togel weton jawa,angka hoki togel 4D,weton jawa tanggal lahir,primbon angka hoki,kalender jawa togel,prediksi togel gratis,togel 4D 3D 2D,pasaran jawa togel,weton kelahiran angka',
    h1:'Angka Keberuntungan',
    body:'Weton Jawa · Kalender Jawa · Primbon · Togel 4D · 100% Gratis',
    start:'Cari Angka Hoki Saya',
    intro:'Tanggal lahir Anda menentukan Weton dalam kalender Jawa — kombinasi hari Masehi 7 hari dengan siklus Pasaran 5 hari (Legi, Pahing, Pon, Wage, Kliwon). Tradisi Primbon yang berusia lebih dari 600 tahun menetapkan bahwa setiap Pasaran memiliki angka-angka hoki yang beresonansi kuat. Generator ini menghitung Pasaran kelahiran Anda dan memberikan bobot 4× lebih tinggi pada angka-angka hoki tersebut dalam pool pemilihan Togel 4D. Hasilnya: prediksi angka Togel yang mencerminkan energi Weton Anda secara personal. Gratis, tanpa daftar, tanpa penyimpanan data.',
    howTo:{
      title:'Cara Penggunaan',
      steps:[
        'Masukkan tanggal lahir Anda (tahun, bulan, hari).',
        'Pilih format Togel: Togel 4D, 3D, atau 2D.',
        'Pilih jumlah set angka: 1, 3, 5, atau 10 set.',
        'Klik "Cari Angka Hoki Saya" — angka berdasarkan Weton Anda muncul seketika.',
      ]
    },
    faq:[
      {q:'Apa itu Weton dan bagaimana hubungannya dengan Togel?',a:'Weton adalah kombinasi hari kalender Masehi (7 hari) dengan hari Pasaran Jawa (5 hari: Legi, Pahing, Pon, Wage, Kliwon). Dalam tradisi Primbon, setiap Pasaran memiliki angka-angka hoki yang beresonansi kuat, yang digunakan sebagai dasar prediksi angka Togel 4D, 3D, dan 2D.'},
      {q:'Bagaimana generator ini bekerja?',a:'Tanggal lahir Anda dikonversi ke kalender Jawa untuk menentukan Pasaran. Angka-angka hoki dari Pasaran tersebut mendapat bobot 4× lebih tinggi dalam pool pemilihan Togel, sehingga secara statistik lebih berpeluang muncul dalam hasil angka hoki Anda.'},
      {q:'Apakah angkanya selalu sama untuk tanggal lahir yang sama?',a:'Ya — tanggal lahir yang sama selalu menghasilkan angka yang sama. Algoritma bersifat deterministik berdasarkan Pasaran kelahiran Anda. Profil numerologi Anda tidak berubah.'},
      {q:'Format Togel apa saja yang didukung?',a:'Togel 4D (4 digit 0–9), Togel 3D (3 digit), dan Togel 2D (2 digit). Pilih format sebelum menghasilkan angka. Anda bisa membuat 1, 3, 5, atau 10 set sekaligus.'},
      {q:'Apa manfaat menambahkan tanggal undian?',a:'Memasukkan tanggal undian mengaktifkan penghitungan Pasaran hari undian, yang dikombinasikan dengan Pasaran kelahiran Anda untuk menghasilkan angka yang lebih presisi dan spesifik untuk hari undian tersebut.'},
      {q:'Apakah ini lebih akurat dari prediksi togel lainnya?',a:'Generator ini menggunakan kearifan lokal Primbon Jawa yang telah teruji selama 600+ tahun, dikombinasikan dengan bobot probabilitas 4× untuk angka-angka hoki Weton Anda. Ini lebih personal daripada prediksi acak biasa.'},
      {q:'Apakah ini menjamin menang Togel?',a:'Tidak. Togel adalah permainan peluang dan tidak ada sistem yang dapat menjamin kemenangan. Generator ini menyediakan hiburan berbasis kearifan lokal kalender Jawa. Bermainlah secara bertanggung jawab dan sesuai kemampuan.'},
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
    keywords:'행운의 번호 생성기,사주팔자 로또 번호,생년월일 로또,천간지지 행운번호,오행 로또,무료 로또 번호 생성,로또 6/45 번호,사주 행운번호,오늘 행운번호,생년월일 번호',
    h1:'행운의 번호 생성기',
    body:'사주팔자 · 천간지지 · 오행 · 로또 6/45 · 100% 무료',
    start:'내 행운 번호 뽑기',
    intro:'생년월일에는 사주팔자가 수천 년간 연구해온 고유한 오행 에너지가 담겨 있습니다. 태어난 연도의 천간(甲乙丙丁戊己庚辛壬癸)으로 오행(木火土金水)을 결정하고, 각 오행에 전통적으로 연관된 행운 번호를 선택 풀에 4배 가중치로 반영해 로또 6/45 번호를 생성합니다. 목(木)→3·8계열, 화(火)→2·7계열, 토(土)→5·10계열, 금(金)→4·9계열, 수(水)→1·6계열의 전통 오행 수리를 활용합니다. 1~10세트를 한 번에 생성 가능. 브라우저에서만 처리되며 데이터는 저장되지 않습니다.',
    howTo:{
      title:'사용 방법',
      steps:[
        '생년월일(년·월·일)을 입력하세요.',
        '복권 형식을 선택하세요: 로또 6/45.',
        '생성할 번호 세트 수를 선택하세요: 1, 3, 5, 또는 10세트.',
        '"내 행운 번호 뽑기" 버튼을 클릭하면 사주팔자 기반 번호가 즉시 생성됩니다.',
      ]
    },
    faq:[
      {q:'사주팔자로 어떻게 로또 번호를 생성하나요?',a:'생년의 천간(십간)으로 오행(木火土金水)을 결정합니다. 각 오행에는 전통적으로 연관된 행운 번호가 있으며(木→3·8, 火→2·7, 土→5·10, 金→4·9, 水→1·6 계열), 이를 로또 선택 풀에 4배 가중치로 반영해 통계적으로 더 자주 선택되도록 합니다.'},
      {q:'오행이란 무엇인가요?',a:'오행(五行)은 목(木)·화(火)·토(土)·금(金)·수(水) 다섯 가지 기운으로, 동양 전통 철학의 핵심 개념입니다. 태어난 연도의 천간으로 자신의 오행을 결정하며, 각 오행은 고유한 특성과 행운 수리를 가집니다.'},
      {q:'같은 생년월일이면 항상 같은 번호가 나오나요?',a:'네 — 같은 생년월일은 항상 같은 번호를 생성합니다. 알고리즘은 생년월일과 사주팔자 프로필을 기반으로 완전히 결정론적입니다. 추가 세트를 생성해도 첫 번째 세트는 항상 동일합니다.'},
      {q:'추첨일을 입력하면 어떻게 달라지나요?',a:'추첨일을 입력하면 해당 일의 일간(日干) 오행이 계산됩니다. 생년 오행과 추첨일 오행의 상생·상극 관계에 따라 가중치가 다르게 부여되어 더 정밀한 번호가 생성됩니다. 특정 회차를 겨냥할 때 권장합니다.'},
      {q:'어떤 복권 형식을 지원하나요?',a:'로또 6/45 (6개 번호, 1~45)를 지원합니다. 1, 3, 5, 10세트를 한 번에 생성할 수 있습니다.'},
      {q:'이 번호로 로또에 당첨될 수 있나요?',a:'아닙니다. 로또는 완전한 무작위 추첨이며 어떤 시스템도 당첨을 보장할 수 없습니다. 이 앱은 사주팔자 전통 지식을 바탕으로 한 오락 서비스입니다. 책임감 있게 즐기세요.'},
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

    // ── Language lucky pages (/lucky/, /en/lucky/, /ja/lucky/, etc.) ─
    const isKo = path === '/lucky/' || path === '/lucky';
    const match = path.match(/^\/([a-z]{2})\/lucky/);
    if (!isKo && !match) return fetch(request);
    const lang = isKo ? 'ko' : match[1];
    if (!LANGS[lang]) return fetch(request);

    const L = LANGS[lang];
    const p = url.searchParams;
    const canonical = lang === 'ko' ? `${SITE_URL}/lucky/` : `${SITE_URL}/${lang}/lucky/`;

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
iframe{width:100%;border:none;display:block;min-height:900px;transition:height .2s ease;}
.seo-section{background:#fff;border-top:1px solid #e7e5e4;padding:40px 20px 48px;}
.seo-section .inner{max-width:780px;margin:0 auto;}
.seo-intro{font-size:14px;color:#44403c;line-height:1.85;margin-bottom:36px;padding:22px 24px;background:#fffbeb;border-left:4px solid #d97706;border-radius:0 12px 12px 0;}
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
    ${howStepsHtml ? `<section class="how-section"><h2 class="section-h2">${esc(L.howTo.title)}</h2><div class="how-steps">${howStepsHtml}</div></section>` : ''}
    <section class="faq-section"><h2 class="section-h2">${esc(L.faqH2)}</h2>${faqHtml}</section>
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
  f.addEventListener('load', function(){
    setTimeout(function(){ if(parseInt(f.style.height) < 600) f.style.height = '1000px'; }, 1500);
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
