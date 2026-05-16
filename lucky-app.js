// ═══════════════════════════════════════════════════════════
// LUCKY NUMBER APP — Core Engine
// Algorithms: 사주팔자 (ko) | 九星気学 (ja) | Numerology (western) | Jawanese (id)
// ═══════════════════════════════════════════════════════════

// ── Seeded PRNG (mulberry32) ──────────────────────────────
function mkRng(seed) {
  let s = (seed ^ 0x9e3779b9) >>> 0;
  return function() {
    s += 0x6D2B79F5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 0x100000000;
  };
}

function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickBiased(rng, min, max, count, biased) {
  const pool = [];
  const bs = new Set((biased || []).filter(n => n >= min && n <= max));
  for (let i = min; i <= max; i++) {
    const w = bs.has(i) ? 4 : 1;
    for (let j = 0; j < w; j++) pool.push(i);
  }
  shuffle(pool, rng);
  const seen = new Set(), result = [];
  for (const n of pool) {
    if (!seen.has(n)) { seen.add(n); result.push(n); }
    if (result.length === count) break;
  }
  return result.sort((a, b) => a - b);
}

// ── Korean 사주팔자 ──────────────────────────────────────
const STEMS    = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const STEM_KO  = ['갑','을','병','정','무','기','경','신','임','계'];
const BRANCH_KO = ['자','축','인','묘','진','사','오','미','신','유','술','해'];
const ZODIAC_KO = ['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'];
const ELEMENTS = ['木','木','火','火','土','土','金','金','水','水'];
const ELEMENT_KO = ['목','목','화','화','토','토','금','금','수','수'];
const ELEMENT_LUCKY = {
  '木': [3,8,13,18,23,28,33,38,43],
  '火': [2,7,12,17,22,27,32,37,42],
  '土': [5,10,15,20,25,30,35,40,45],
  '金': [4,9,14,19,24,29,34,39,44],
  '水': [1,6,11,16,21,26,31,36,41],
};
const ELEMENT_COLOR = {
  '木': {name:'초록',hex:'#16a34a',en:'Green'},
  '火': {name:'빨강',hex:'#dc2626',en:'Red'},
  '土': {name:'노랑',hex:'#d97706',en:'Yellow'},
  '金': {name:'흰색',hex:'#94a3b8',en:'White'},
  '水': {name:'파랑',hex:'#1d4ed8',en:'Blue'},
};
const ELEMENT_DAY = {
  '木': {ko:'목요일',en:'Thursday',ja:'木曜日',de:'Donnerstag',fr:'Jeudi',es:'Jueves',pt:'Quinta-feira',it:'Giovedì',id:'Kamis'},
  '火': {ko:'화요일',en:'Tuesday',ja:'火曜日',de:'Dienstag',fr:'Mardi',es:'Martes',pt:'Terça-feira',it:'Martedì',id:'Selasa'},
  '土': {ko:'토요일',en:'Saturday',ja:'土曜日',de:'Samstag',fr:'Samedi',es:'Sábado',pt:'Sábado',it:'Sabato',id:'Sabtu'},
  '金': {ko:'금요일',en:'Friday',ja:'金曜日',de:'Freitag',fr:'Vendredi',es:'Viernes',pt:'Sexta-feira',it:'Venerdì',id:'Jumat'},
  '水': {ko:'수요일',en:'Wednesday',ja:'水曜日',de:'Mittwoch',fr:'Mercredi',es:'Miércoles',pt:'Quarta-feira',it:'Mercoledì',id:'Rabu'},
};

function calcSaju(year, month, day) {
  const si = ((year - 4) % 10 + 10) % 10;
  const bi = ((year - 4) % 12 + 12) % 12;
  const el = ELEMENTS[si];
  const seed = year * 10000 + month * 100 + day + si * 31 + bi * 17;
  return { stemIdx: si, branchIdx: bi, element: el, lucky: ELEMENT_LUCKY[el], seed };
}

// ── Japanese 九星気学 ─────────────────────────────────────
const KYUSEI_NAMES = ['','一白水星','二黒土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];
const KYUSEI_ELEMENTS = ['','水','土','木','木','土','金','金','土','火'];
const KYUSEI_COLORS = ['','#1d4ed8','#92400e','#16a34a','#15803d','#d97706','#6b7280','#dc2626','#78350f','#7c3aed'];
const KYUSEI_LUCKY = {
  1:[1,6,11,16,21,26,31,36,41],
  2:[2,5,8,10,20,25,35,40,43],
  3:[3,8,13,18,23,28,33,38,43],
  4:[3,4,13,14,23,24,33,34,43],
  5:[5,10,15,20,25,30,35,40,45],
  6:[1,6,11,16,21,31,36,41,43],
  7:[4,7,9,14,19,24,29,34,39],
  8:[2,8,10,20,22,28,32,38,42],
  9:[2,7,12,17,22,27,32,37,42],
};
const KYUSEI_ELEMENT_MAP = {'水':'水','木':'木','土':'土','金':'金','火':'火'};

function calcKyusei(year, month, day) {
  const ay = month < 2 ? year - 1 : year;
  let n = ay;
  while (n > 9) { n = String(n).split('').reduce((a,c) => a + parseInt(c), 0); }
  const star = ((11 - n - 1) % 9) + 1;
  const seed = year * 10000 + month * 100 + day + star * 23;
  return { star, element: KYUSEI_ELEMENTS[star], lucky: KYUSEI_LUCKY[star], seed };
}

// ── Western Numerology ────────────────────────────────────
const LIFE_PATH_COLORS = {
  1:{hex:'#dc2626',en:'Red'},2:{hex:'#f59e0b',en:'Orange'},3:{hex:'#d97706',en:'Yellow'},
  4:{hex:'#16a34a',en:'Green'},5:{hex:'#0284c7',en:'Turquoise'},6:{hex:'#1d4ed8',en:'Blue'},
  7:{hex:'#7c3aed',en:'Violet'},8:{hex:'#9d174d',en:'Pink'},9:{hex:'#b45309',en:'Gold'},
  11:{hex:'#6366f1',en:'Indigo'},22:{hex:'#d97706',en:'Amber'},33:{hex:'#dc2626',en:'Crimson'},
};
const LIFE_PATH_DAYS = {
  1:'Sunday',2:'Monday',3:'Wednesday',4:'Saturday',5:'Friday',
  6:'Friday',7:'Monday',8:'Saturday',9:'Tuesday',11:'Monday',22:'Saturday',33:'Wednesday',
};
const LIFE_PATH_LUCKY_BASE = {
  1:[1,10,19,28,37,46,55,64],2:[2,11,20,29,38,47,56,65],
  3:[3,12,21,30,39,48,57,66],4:[4,13,22,31,40,49,58,67],
  5:[5,14,23,32,41,50,59,68],6:[6,15,24,33,42,51,60,69],
  7:[7,16,25,34,43,52,61,62],8:[8,17,26,35,44,53,62,63],
  9:[9,18,27,36,45,54,63,64],11:[11,22,33,44,55,2,13,24],
  22:[22,4,13,31,40,49,58,2],33:[33,6,15,24,3,12,9,18],
};

function digitalRoot(n) {
  if (n === 11 || n === 22 || n === 33) return n;
  return n > 9 ? digitalRoot(String(n).split('').reduce((a,c) => a + parseInt(c), 0)) : n;
}

function calcNumerology(year, month, day) {
  const sum = String(year).split('').reduce((a,c) => a + parseInt(c), 0) + month + day;
  const lpn = digitalRoot(sum);
  const seed = year * 10000 + month * 100 + day + lpn * 37;
  const baseLucky = LIFE_PATH_LUCKY_BASE[lpn] || LIFE_PATH_LUCKY_BASE[9];
  return { lpn, lucky: baseLucky, seed };
}

// ── Javanese Calendar (id) ────────────────────────────────
const PASARAN = ['Legi','Pahing','Pon','Wage','Kliwon'];
const PASARAN_LUCKY = {
  0:[5,10,15,20,25,30,35,40,45],
  1:[1,6,11,16,21,26,31,36,41],
  2:[2,7,12,17,22,27,32,37,42],
  3:[4,9,14,19,24,29,34,39,44],
  4:[3,8,13,18,23,28,33,38,43],
};
const PASARAN_COLORS = ['#16a34a','#d97706','#dc2626','#92400e','#7c3aed'];

function calcJawanese(year, month, day) {
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month < 3 ? month + 13 : month + 1)) + day - 1524;
  const pasaranIdx = ((jd % 5) + 5) % 5;
  const seed = year * 10000 + month * 100 + day + pasaranIdx * 41;
  return { pasaranIdx, lucky: PASARAN_LUCKY[pasaranIdx], seed };
}

// Weton Neptu values (traditional Javanese birth numerology)
const WETON_DAY_NEPTU = [5, 4, 3, 7, 8, 6, 9]; // Sun=5, Mon=4, Tue=3, Wed=7, Thu=8, Fri=6, Sat=9
const WETON_PAS_NEPTU = [5, 9, 7, 4, 8];        // Legi=5, Pahing=9, Pon=7, Wage=4, Kliwon=8

function calcWetonNeptu(year, month, day) {
  const dow = new Date(year, month - 1, day).getDay();
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month < 3 ? month + 13 : month + 1)) + day - 1524;
  const pasIdx = ((jd % 5) + 5) % 5;
  return { neptu: WETON_DAY_NEPTU[dow] + WETON_PAS_NEPTU[pasIdx], dow, pasIdx };
}

// ── Lottery Formats (default per lang) ───────────────────
const FORMATS = {
  ko: { name:'로또 6/45',    main:{min:1,max:45,count:6}, bonus:null },
  ja: { name:'ロト6',        main:{min:1,max:43,count:6}, bonus:null },
  en: { name:'Powerball',    main:{min:1,max:69,count:5}, bonus:{min:1,max:26,count:1,label:'Powerball'} },
  de: { name:'EuroMillions', main:{min:1,max:50,count:5}, bonus:{min:1,max:12,count:2,label:'Lucky Stars'} },
  fr: { name:'EuroMillions', main:{min:1,max:50,count:5}, bonus:{min:1,max:12,count:2,label:'Lucky Stars'} },
  es: { name:'EuroMillions', main:{min:1,max:50,count:5}, bonus:{min:1,max:12,count:2,label:'Lucky Stars'} },
  pt: { name:'Mega-Sena',    main:{min:1,max:60,count:6}, bonus:null },
  it: { name:'SuperEnalotto',main:{min:1,max:90,count:6}, bonus:null },
  id: { name:'Togel 4D',     digits:4 },
};

// ── Extended Lottery Options per language ─────────────────
const LOTTERY_OPTIONS = {
  ko: [
    { id:'lotto645',     name:'로또 6/45',      main:{min:1,max:45,count:6},  bonus:null },
  ],
  en: [
    { id:'powerball',    name:'Powerball',       main:{min:1,max:69,count:5},  bonus:{min:1,max:26,count:1,label:'Powerball'} },
    { id:'megamillions', name:'Mega Millions',   main:{min:1,max:70,count:5},  bonus:{min:1,max:25,count:1,label:'Mega Ball'} },
    { id:'pick4',        name:'Pick 4',          digits:4 },
    { id:'pick3',        name:'Pick 3',          digits:3 },
  ],
  ja: [
    { id:'loto6',        name:'ロト6',            main:{min:1,max:43,count:6},  bonus:null },
    { id:'loto7',        name:'ロト7',            main:{min:1,max:37,count:7},  bonus:null },
    { id:'miniloto',     name:'ミニロト',          main:{min:1,max:31,count:5},  bonus:null },
    { id:'numbers4',     name:'ナンバーズ4',       digits:4 },
    { id:'numbers3',     name:'ナンバーズ3',       digits:3 },
  ],
  de: [
    { id:'euromillions', name:'EuroMillions',    main:{min:1,max:50,count:5},  bonus:{min:1,max:12,count:2,label:'Lucky Stars'} },
    { id:'eurojackpot',  name:'EuroJackpot',     main:{min:1,max:50,count:5},  bonus:{min:1,max:10,count:2,label:'Euro Nums'} },
    { id:'lotto649',     name:'Lotto 6aus49',    main:{min:1,max:49,count:6},  bonus:null },
  ],
  fr: [
    { id:'euromillions', name:'EuroMillions',    main:{min:1,max:50,count:5},  bonus:{min:1,max:12,count:2,label:'Étoiles'} },
    { id:'loto',         name:'Loto',            main:{min:1,max:49,count:5},  bonus:{min:1,max:10,count:1,label:'Chance'} },
    { id:'eurojackpot',  name:'EuroJackpot',     main:{min:1,max:50,count:5},  bonus:{min:1,max:10,count:2,label:'Euro Nums'} },
  ],
  es: [
    { id:'euromillions', name:'EuroMillions',    main:{min:1,max:50,count:5},  bonus:{min:1,max:12,count:2,label:'Estrellas'} },
    { id:'primitiva',    name:'La Primitiva',    main:{min:1,max:49,count:6},  bonus:null },
    { id:'bonoloto',     name:'BonoLoto',        main:{min:1,max:49,count:6},  bonus:null },
  ],
  pt: [
    { id:'megasena',     name:'Mega-Sena',       main:{min:1,max:60,count:6},  bonus:null },
    { id:'lotofacil',    name:'Lotofácil',       main:{min:1,max:25,count:15}, bonus:null },
    { id:'quina',        name:'Quina',           main:{min:1,max:80,count:5},  bonus:null },
  ],
  it: [
    { id:'superenalotto',name:'SuperEnalotto',   main:{min:1,max:90,count:6},  bonus:null },
    { id:'euromillions', name:'EuroMillions',    main:{min:1,max:50,count:5},  bonus:{min:1,max:12,count:2,label:'Stelle'} },
    { id:'eurojackpot',  name:'EuroJackpot',     main:{min:1,max:50,count:5},  bonus:{min:1,max:10,count:2,label:'Euro Nums'} },
  ],
  id: [
    { id:'togel4d',      name:'Togel 4D',        digits:4 },
    { id:'togel3d',      name:'Togel 3D',        digits:3 },
    { id:'togel2d',      name:'Togel 2D',        digits:2 },
  ],
};

// ── UI Fallback Translations (resilience against CDN-cached lang files) ──────
const UI_FALLBACKS = {
  lotterySelectLabel: {ko:'복권 선택',en:'Select Lottery',ja:'宝くじを選択',de:'Lotterie wählen',fr:'Choisir la loterie',es:'Seleccionar lotería',pt:'Selecionar loteria',it:'Seleziona lotteria',id:'Pilih Lotre'},
  setsLabel:          {ko:'추천 세트 수',en:'Number of Sets',ja:'セット数',de:'Anzahl der Tipps',fr:'Nombre de grilles',es:'Número de combinaciones',pt:'Número de jogos',it:'Numero di giocate',id:'Jumlah Set'},
  drawDateLabel:      {ko:'추첨일 입력 (선택) — 더 정밀한 분석',en:'Draw Date (optional) — enhanced precision',ja:'抽選日（任意）— より精密な分析',de:'Ziehungsdatum (optional) — präzisere Analyse',fr:'Date du tirage (facultatif) — plus précise',es:'Fecha del sorteo (opcional) — más precisión',pt:'Data do sorteio (opcional) — mais preciso',it:"Data estrazione (facoltativa) — più precisa",id:'Tanggal undian (opsional) — lebih presisi'},
  whyTitle:           {ko:'왜 이 번호인가?',en:'Why these numbers?',ja:'なぜこの数字？',de:'Warum diese Zahlen?',fr:'Pourquoi ces numéros ?',es:'¿Por qué estos números?',pt:'Por que esses números?',it:'Perché questi numeri?',id:'Mengapa angka ini?'},
  birthEnergyLabel:   {ko:'생년 기운',en:'Birth Energy',ja:'生年の気',de:'Geburtsenergie',fr:'Énergie natale',es:'Energía natal',pt:'Energia natal',it:'Energia natale',id:'Energi Kelahiran'},
  drawEnergyLabel:    {ko:'추첨일 기운',en:'Draw Energy',ja:'抽選日の気',de:'Ziehungsenergie',fr:'Énergie du tirage',es:'Energía del sorteo',pt:'Energia do sorteio',it:"Energia estrazione",id:'Energi Undian'},
  compatScoreLabel:   {ko:'호환도',en:'Compatibility',ja:'相性度',de:'Kompatibilität',fr:'Compatibilité',es:'Compatibilidad',pt:'Compatibilidade',it:'Compatibilità',id:'Kompatibilitas'},
  upcomingLabel:      {ko:'최적 추첨일 TOP 3',en:'Best Draw Dates TOP 3',ja:'おすすめ抽選日 TOP 3',de:'Beste Ziehungstage TOP 3',fr:'Meilleures dates de tirage TOP 3',es:'Mejores fechas de sorteo TOP 3',pt:'Melhores datas de sorteio TOP 3',it:'Migliori date estrazione TOP 3',id:'Tanggal Undian Terbaik TOP 3'},
};

// ── Draw Date Energy Algorithms ───────────────────────────

// Korean: Day Stem (日干) approximation via days from known 甲子日 reference
function calcDayStemIdx(year, month, day) {
  // Reference: Jan 20, 2020 ≈ 甲 day (stem 0) in Korean/Chinese day cycle
  const ref = new Date(2020, 0, 20);
  const diff = Math.round((new Date(year, month - 1, day) - ref) / 86400000);
  return ((diff % 10) + 10) % 10;
}

// Numerology: Universal Day Number
function calcUDN(year, month, day) {
  let n = year + month + day;
  while (n >= 10) n = String(n).split('').reduce((a, d) => a + +d, 0);
  return n || 9;
}

// Kyusei: Day Star (日星) — 9-day cycle
function calcDayKyusei(year, month, day) {
  // Reference: Jan 1, 2000 = 一白水星 day (star 1)
  const diff = Math.round((new Date(year, month - 1, day) - new Date(2000, 0, 1)) / 86400000);
  return ((1 - diff % 9 + 99999 * 9) % 9) + 1;
}

// Javanese: Draw date Pasaran
function calcDrawPasaran(year, month, day) {
  const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month < 3 ? month + 13 : month + 1)) + day - 1524;
  return ((jd % 5) + 5) % 5;
}

// ── Extended Cultural Algorithms ──────────────────────────

// 사주: Month pillar (월주)
const MONTH_BRANCHES = [2,3,4,5,6,7,8,9,10,11,0,1]; // 寅(2)=Jan ... 丑(1)=Dec
function calcMonthPillar(yearStemIdx, month, branchOverride) {
  const branchIdx = branchOverride != null ? branchOverride : MONTH_BRANCHES[month - 1];
  const startStems = [2,4,6,8,0]; // 甲己→丙(2), 乙庚→戊(4), 丙辛→庚(6), 丁壬→壬(8), 戊癸→甲(0)
  const stemIdx = (startStems[yearStemIdx % 5] + (branchIdx - 2 + 12) % 12) % 10;
  return { stemIdx, branchIdx, element: ELEMENTS[stemIdx] };
}

// 사주: Day branch (일지)
function calcDayBranch(year, month, day) {
  const m2 = month < 3 ? month + 13 : month + 1;
  const y2 = month < 3 ? year + 4715 : year + 4716;
  const jd = Math.floor(365.25 * y2) + Math.floor(30.6001 * m2) + day - 1524;
  return ((jd - 2451545 + 3) % 12 + 12) % 12;
}

// 사주: Hour branch and pillar (시주)
function calcHourBranch(hour) {
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2);
}
function calcHourPillar(dayStemIdx, hour) {
  const branchIdx = calcHourBranch(hour);
  const startStems = [0,2,4,6,8]; // 甲己日→甲子, 乙庚→丙子, 丙辛→戊子, 丁壬→庚子, 戊癸→壬子
  const stemIdx = (startStems[dayStemIdx % 5] + branchIdx) % 10;
  return { stemIdx, branchIdx, element: ELEMENTS[stemIdx] };
}

// 사주: Five-element balance analysis (오행 강약)
function calcOhaengBalance(elements) {
  const counts = {'木':0,'火':0,'土':0,'金':0,'水':0};
  elements.filter(Boolean).forEach(el => { if (el in counts) counts[el]++; });
  let minEl = '木', minCnt = Infinity;
  for (const [el, cnt] of Object.entries(counts)) {
    if (cnt < minCnt) { minCnt = cnt; minEl = el; }
  }
  const SHENG_PARENT = {'火':'木','土':'火','金':'土','水':'金','木':'水'};
  const yongsin = minCnt === 0 ? SHENG_PARENT[minEl] : minEl;
  return { counts, yongsin, weakElements: Object.entries(counts).filter(([,c]) => c === minCnt).map(([e]) => e) };
}

// 사주: Ten Gods relationship type (십신)
function calcSipsinType(dayStemIdx, otherStemIdx) {
  const NAMES = ['비겁','식상','재성','관성','인성'];
  const diff = (Math.floor(otherStemIdx / 2) - Math.floor(dayStemIdx / 2) + 5) % 5;
  return NAMES[diff];
}

// Western Astrology: Sun Sign
const ZODIAC_SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo',
                      'Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

function getSunSign(month, day) {
  const n = month * 100 + day;
  if (n>=321&&n<=419) return 0;  if (n>=420&&n<=520) return 1;
  if (n>=521&&n<=620) return 2;  if (n>=621&&n<=722) return 3;
  if (n>=723&&n<=822) return 4;  if (n>=823&&n<=922) return 5;
  if (n>=923&&n<=1022) return 6; if (n>=1023&&n<=1121) return 7;
  if (n>=1122&&n<=1221) return 8;
  return (n>=1222 || n<=119) ? 9 : (n<=218 ? 10 : 11);
}

// Western Astrology: Moon Sign (astronomical approximation ~1-2° accuracy)
function getMoonSign(year, month, day) {
  const m2 = month < 3 ? month + 13 : month + 1;
  const y2 = month < 3 ? year + 4715 : year + 4716;
  const jd = Math.floor(365.25 * y2) + Math.floor(30.6001 * m2) + day - 1524.5;
  const d = jd - 2451545.0;
  const toR = x => x * Math.PI / 180;
  const L  = (218.3164477 + 13.17639501 * d) % 360;
  const M  = (134.9634114 + 13.06499295 * d) % 360;
  const F  = (93.2720950  + 13.22935024 * d) % 360;
  const MS = (357.5291    +  0.98560028 * d) % 360;
  const dL = 6.289 * Math.sin(toR(M))
           - 1.274 * Math.sin(toR(2*F - M))
           + 0.658 * Math.sin(toR(2*F))
           - 0.214 * Math.sin(toR(2*M))
           - 0.186 * Math.sin(toR(MS));
  return Math.floor(((L + dL) % 360 + 360) % 360 / 30);
}

// ── Astronomy-engine precise calculations (fallback to approx if not loaded) ──

function getMoonSignPrecise(year, month, day, hour) {
  if (window.Astronomy) {
    try {
      const date = new Date(Date.UTC(year, month - 1, day, hour != null ? hour : 12, 0, 0));
      const moonVec = Astronomy.GeoMoon(date);
      const ecl = Astronomy.Ecliptic(moonVec);
      const lon = ((ecl.elon % 360) + 360) % 360;
      return Math.floor(lon / 30);
    } catch(e) {}
  }
  return getMoonSign(year, month, day);
}

function getSunSignPrecise(year, month, day) {
  if (window.Astronomy) {
    try {
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      const sun = Astronomy.SunPosition(date);
      const lon = ((sun.elon % 360) + 360) % 360;
      return Math.floor(lon / 30);
    } catch(e) {}
  }
  return getSunSign(month, day);
}

// 節 (Jié) — 12 solar terms defining month pillar boundaries in saju
const JIEQI_DATA = [
  {lon:285, branch:1}, // 소한 → 丑月
  {lon:315, branch:2}, // 입춘 → 寅月
  {lon:345, branch:3}, // 경칩 → 卯月
  {lon:15,  branch:4}, // 청명 → 辰月
  {lon:45,  branch:5}, // 입하 → 巳月
  {lon:75,  branch:6}, // 망종 → 午月
  {lon:105, branch:7}, // 소서 → 未月
  {lon:135, branch:8}, // 입추 → 申月
  {lon:165, branch:9}, // 백로 → 酉月
  {lon:195, branch:10},// 한로 → 戌月
  {lon:225, branch:11},// 입동 → 亥月
  {lon:255, branch:0}, // 대설 → 子月
];

function calcMonthBranchByJieqi(year, month, day, birthHour) {
  if (!window.Astronomy) return MONTH_BRANCHES[month - 1];
  try {
    const h = birthHour != null ? birthHour : 12;
    const birthMs = Date.UTC(year, month - 1, day, h, 0, 0);
    let bestBranch = MONTH_BRANCHES[month - 1], bestMs = -Infinity;
    for (const jq of JIEQI_DATA) {
      for (let y = year - 1; y <= year; y++) {
        const start = new Date(Date.UTC(y, 0, 1));
        const found = Astronomy.SearchSunLongitude(jq.lon, start, 366);
        if (!found) continue;
        const t = found.date.getTime();
        if (t <= birthMs && t > bestMs) { bestMs = t; bestBranch = jq.branch; }
      }
    }
    return bestBranch;
  } catch(e) { return MONTH_BRANCHES[month - 1]; }
}

// 九星気学: Month Star (月命星)
const KYUSEI_MONTH_BASE = {1:8,2:5,3:2,4:8,5:5,6:2,7:8,8:5,9:2};
function calcMonthKyusei(yearStar, month) {
  const base = KYUSEI_MONTH_BASE[yearStar] || 8;
  return ((base - (month - 1) - 1 + 99) % 9) + 1;
}

// Fortune score calculation (deterministic from birth seed)
function calcFortuneScores(systemKey, cultural, opts) {
  const { fullSaju, sunSign, moonSign, monthStar, birthHour, seed } = opts;
  let love=50, money=50, career=50, achievement=50;

  if (systemKey === 'saju' && fullSaju) {
    const sc = fullSaju.sipsin || {};
    money       = [40,65,80,92][Math.min(sc['재성']||0, 3)];
    career      = [35,60,78,92][Math.min(sc['관성']||0, 3)];
    achievement = [38,65,83,94][Math.min(sc['인성']||0, 3)];
    const DOHWA = new Set([0,3,6,9]); // 子卯午酉 → 도화살
    const hasDohwa = DOHWA.has(opts.dayBranch || 0) ||
                     (birthHour !== null && DOHWA.has(opts.hourBranch || 0));
    love = Math.min(95, 45 + (hasDohwa ? 22 : 0) +
                    (Object.values(fullSaju.counts || {}).filter(v => v >= 2).length * 5));

  } else if (systemKey === 'kyusei') {
    const ST = {
      1:{love:72,money:55,career:60,achievement:58},2:{love:52,money:78,career:62,achievement:65},
      3:{love:60,money:60,career:68,achievement:80},4:{love:65,money:62,career:65,achievement:85},
      5:{love:50,money:70,career:72,achievement:60},6:{love:55,money:65,career:82,achievement:70},
      7:{love:75,money:70,career:60,achievement:60},8:{love:55,money:82,career:65,achievement:68},
      9:{love:68,money:60,career:85,achievement:72},
    };
    const t = ST[cultural.star] || ST[5];
    const m = ST[monthStar || 5] || ST[5];
    love        = Math.round((t.love        + m.love)        / 2);
    money       = Math.round((t.money       + m.money)       / 2);
    career      = Math.round((t.career      + m.career)      / 2);
    achievement = Math.round((t.achievement + m.achievement)  / 2);

  } else if (systemKey === 'numerology' && sunSign !== null) {
    const LB=[5,10,0,8,5,0,15,12,5,3,8,10];
    const MB=[5,15,3,5,8,12,5,8,3,15,5,5];
    const CB=[12,5,8,5,15,10,8,5,8,15,10,5];
    const AB=[10,5,12,8,15,10,8,12,5,12,15,8];
    love        = 50 + Math.round((LB[sunSign] + LB[moonSign||0]) / 2);
    money       = 50 + Math.round((MB[sunSign] + MB[moonSign||0]) / 2);
    career      = 50 + Math.round((CB[sunSign] + CB[moonSign||0]) / 2);
    achievement = 50 + Math.round((AB[sunSign] + AB[moonSign||0]) / 2);

  } else if (systemKey === 'jawanese') {
    const PT = [
      {love:65,money:70,career:60,achievement:68},{love:55,money:65,career:75,achievement:65},
      {love:70,money:60,career:65,achievement:72},{love:60,money:72,career:68,achievement:60},
      {love:75,money:65,career:70,achievement:75},
    ];
    const t = PT[cultural.pasaranIdx] || PT[0];
    love=t.love; money=t.money; career=t.career; achievement=t.achievement;
  }

  const mkV = offset => {
    const r = mkRng((seed ^ (offset * 0x9e3779b9)) >>> 0);
    return Math.floor(r() * 11) - 5;
  };
  const clamp = v => Math.min(97, Math.max(20, v));
  const lv = s => s >= 73 ? 'high' : s >= 47 ? 'mid' : 'low';
  const ls = clamp(love + mkV(1));
  const ms = clamp(money + mkV(2));
  const cs = clamp(career + mkV(3));
  const as = clamp(achievement + mkV(4));
  return {
    love:        { score: ls, level: lv(ls) },
    money:       { score: ms, level: lv(ms) },
    career:      { score: cs, level: lv(cs) },
    achievement: { score: as, level: lv(as) },
  };
}

// Five-element harmony (五行相生相克)
const OHAENG_SHENG = {'木':'火','火':'土','土':'金','金':'水','水':'木'};
const OHAENG_KE    = {'木':'土','土':'水','水':'火','火':'金','金':'木'};
const ELEMENT_KO_NAME = {'木':'목(나무)','火':'화(불)','土':'토(흙)','金':'금(금속)','水':'수(물)'};

function calcOhaengHarmony(birthEl, drawEl) {
  const H = {
    same:    { rel:'同氣', emoji:'🔥', weight:[6,6], ko:`${ELEMENT_KO_NAME[birthEl]} 기운이 강화 — 두 기운이 합쳐져 최대 에너지`, en:`Same element amplified — double energy`, ja:`同気相助 — エネルギー最大` },
    sheng:   { rel:'相生', emoji:'🌱', weight:[5,3], ko:`생년 기운이 추첨일 기운을 생성 — 최적의 조화`, en:`Birth generates Draw — optimal harmony`, ja:`生年の気が日の気を生む — 最高の調和` },
    recv:    { rel:'受生', emoji:'💧', weight:[5,3], ko:`추첨일 기운이 생년을 보강 — 상호 보완`, en:`Draw reinforces Birth — mutual support`, ja:`日の気が生年を補強 — 相互補完` },
    ke:      { rel:'相克', emoji:'⚔️', weight:[4,2], ko:`생년이 추첨일을 제압 — 생년 에너지 우선`, en:`Birth controls Draw — birth energy dominant`, ja:`生年が日を制す — 生年優先` },
    beKe:    { rel:'被克', emoji:'🛡️', weight:[3,3], ko:`두 기운이 긴장 관계 — 균형 전략 적용`, en:`Tension between energies — balanced approach`, ja:`拮抗 — バランス型` },
    neutral: { rel:'中立', emoji:'⚖️', weight:[4,3], ko:`중립 — 두 기운이 균형있게 작용`, en:`Neutral — balanced energies`, ja:`中立 — バランスよく作用` },
  };
  if (birthEl === drawEl)          return {...H.same,   birthEl, drawEl};
  if (OHAENG_SHENG[birthEl]===drawEl) return {...H.sheng,  birthEl, drawEl};
  if (OHAENG_SHENG[drawEl]===birthEl) return {...H.recv,   birthEl, drawEl};
  if (OHAENG_KE[birthEl]===drawEl)    return {...H.ke,     birthEl, drawEl};
  if (OHAENG_KE[drawEl]===birthEl)    return {...H.beKe,   birthEl, drawEl};
  return {...H.neutral, birthEl, drawEl};
}

// ── Compatibility Score Functions ─────────────────────────

const OHAENG_COMPAT_SCORES = {same:100, sheng:85, recv:75, ke:42, beKe:38, neutral:60};
function calcOhaengCompat(birthEl, drawEl) {
  if (birthEl === drawEl)               return OHAENG_COMPAT_SCORES.same;
  if (OHAENG_SHENG[birthEl] === drawEl) return OHAENG_COMPAT_SCORES.sheng;
  if (OHAENG_SHENG[drawEl] === birthEl) return OHAENG_COMPAT_SCORES.recv;
  if (OHAENG_KE[birthEl] === drawEl)    return OHAENG_COMPAT_SCORES.ke;
  if (OHAENG_KE[drawEl] === birthEl)    return OHAENG_COMPAT_SCORES.beKe;
  return OHAENG_COMPAT_SCORES.neutral;
}

function calcNumerologyCompat(lpn, udn) {
  const norm = n => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : (n % 9 || 9));
  const diff = Math.abs(norm(lpn) - norm(udn));
  return [100, 85, 70, 55, 42, 35, 35, 35, 35][Math.min(diff, 8)];
}

const PASARAN_COMPAT_MATRIX = [
  [100, 60, 75, 55, 85],
  [ 60,100, 85, 75, 55],
  [ 75, 85,100, 60, 70],
  [ 55, 75, 60,100, 85],
  [ 85, 55, 70, 85,100],
];
function calcPasaranCompat(birthP, drawP) {
  return (PASARAN_COMPAT_MATRIX[birthP] || [])[drawP] ?? 60;
}

function scoreAllNumbers(min, max, birthNums, drawNums, birthW, drawW) {
  const bSet = new Set(birthNums), dSet = new Set(drawNums);
  const scores = {};
  for (let n = min; n <= max; n++) {
    let s = 1;
    if (bSet.has(n)) s += birthW;
    if (dSet.has(n)) s += drawW;
    scores[n] = s;
  }
  return scores;
}

function pickWeighted(rng, min, max, count, scoreMap) {
  const pool = [];
  for (let n = min; n <= max; n++) {
    const w = scoreMap[n] || 1;
    for (let i = 0; i < w; i++) pool.push(n);
  }
  shuffle(pool, rng);
  const seen = new Set(), result = [];
  for (const n of pool) {
    if (!seen.has(n)) { seen.add(n); result.push(n); }
    if (result.length === count) break;
  }
  return result.sort((a, b) => a - b);
}

const DRAW_SCHEDULES = {
  lotto645:[6], loto6:[1,4], loto7:[5], miniloto:[2],
  numbers4:[0,1,2,3,4,5,6], numbers3:[0,1,2,3,4,5,6],
  powerball:[1,3,6], megamillions:[2,5],
  pick4:[0,1,2,3,4,5,6], pick3:[0,1,2,3,4,5,6],
  euromillions:[2,5], eurojackpot:[2,5],
  lotto649:[3,6], loto:[2,6],
  primitiva:[4,6], bonoloto:[1,2,3,4,5],
  megasena:[3,6], lotofacil:[1,2,3,4,5,6], quina:[1,2,3,4,5,6],
  superenalotto:[2,4,6],
  togel4d:[1,3,4,6,0], togel3d:[1,3,4,6,0], togel2d:[1,3,4,6,0],
};

const DAY_NAMES_SHORT = {
  ko:['일','월','화','수','목','금','토'],
  en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  ja:['日','月','火','水','木','金','土'],
  de:['So','Mo','Di','Mi','Do','Fr','Sa'],
  fr:['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
  es:['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
  pt:['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  it:['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
  id:['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
};

function findNextDrawDates(year, month, day, cultural, systemKey, lang, lotteryId, maxN) {
  maxN = maxN || 3;
  const sched = DRAW_SCHEDULES[lotteryId];
  if (!sched || !sched.length) return [];
  const today = new Date();
  const found = [];
  for (let i = 0; i < 90 && found.length < maxN * 4; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    const dow = d.getDay();
    if (!sched.includes(dow)) continue;
    const dy = d.getFullYear(), dm = d.getMonth() + 1, dd = d.getDate();
    let score, rel = '';
    if (systemKey === 'saju') {
      const drawEl = ELEMENTS[calcDayStemIdx(dy, dm, dd)];
      score = calcOhaengCompat(cultural.element, drawEl);
      const h = calcOhaengHarmony(cultural.element, drawEl);
      rel = h.rel + ' ' + h.emoji;
    } else if (systemKey === 'kyusei') {
      const drawStar = calcDayKyusei(dy, dm, dd);
      const drawEl = KYUSEI_ELEMENTS[drawStar] || cultural.element;
      score = calcOhaengCompat(cultural.element, drawEl);
      const h = calcOhaengHarmony(cultural.element, drawEl);
      rel = (KYUSEI_NAMES[drawStar] || drawStar) + ' ' + h.emoji;
    } else if (systemKey === 'jawanese') {
      const drawPas = calcDrawPasaran(dy, dm, dd);
      score = calcPasaranCompat(cultural.pasaranIdx, drawPas);
      rel = PASARAN[drawPas];
    } else {
      const udn = calcUDN(dy, dm, dd);
      score = calcNumerologyCompat(cultural.lpn, udn);
      rel = 'UDN ' + udn;
    }
    found.push({ date: `${dy}-${String(dm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`, score, rel, dow });
  }
  found.sort((a, b) => b.score - a.score);
  return found.slice(0, maxN);
}

// ── Ball color by range ───────────────────────────────────
function ballClass(n, format) {
  if (format === 'ko') {
    if (n <= 10) return 'ball-y';
    if (n <= 20) return 'ball-b';
    if (n <= 30) return 'ball-r';
    if (n <= 40) return 'ball-g';
    return 'ball-gr';
  }
  if (format === 'ja') {
    if (n <= 10) return 'ball-y';
    if (n <= 20) return 'ball-b';
    if (n <= 30) return 'ball-r';
    if (n <= 43) return 'ball-gr';
  }
  if (format === 'en') return n <= 35 ? 'ball-b' : 'ball-g'; // powerball main
  if (format === 'en-bonus') return 'ball-r';
  if (format === 'euro') return n <= 25 ? 'ball-b' : 'ball-g';
  if (format === 'euro-star') return 'ball-y';
  if (format === 'pt') return 'ball-gr';
  if (format === 'it') {
    if (n <= 30) return 'ball-b';
    if (n <= 60) return 'ball-r';
    return 'ball-p';
  }
  if (format === 'digit') {
    const colors = ['ball-y','ball-b','ball-r','ball-gr','ball-p','ball-pk','ball-y','ball-b','ball-r','ball-gr'];
    return colors[n] || 'ball-g';
  }
  return 'ball-b';
}

// ── Main Generate Function ────────────────────────────────
let lastResult = null;

function generateLucky(year, month, day, lang, lotteryId, drawDateStr, setIdx, birthHour) {
  // Resolve lottery format
  const opts = LOTTERY_OPTIONS[lang] || LOTTERY_OPTIONS.en;
  const lotto = (lotteryId ? opts.find(l => l.id === lotteryId) : null) || opts[0];
  const fmt   = lotto;

  let cultural, seed, luckyBase, colorData, dayData, systemKey, drawEnergy = null;

  // Parse draw date
  let dy, dm, dd;
  if (drawDateStr) {
    [dy, dm, dd] = drawDateStr.split('-').map(Number);
  }

  if (lang === 'ko') {
    const s = calcSaju(year, month, day);
    cultural = s; seed = s.seed; systemKey = 'saju';
    colorData = ELEMENT_COLOR[s.element];
    dayData   = ELEMENT_DAY[s.element];
    if (dy) {
      const dsi = calcDayStemIdx(dy, dm, dd);
      const drawEl = ELEMENTS[dsi];
      const harmony = calcOhaengHarmony(s.element, drawEl);
      drawEnergy = { type:'saju', birthEl:s.element, drawEl, dayStemIdx:dsi, harmony };
      luckyBase = [...new Set([...s.lucky, ...ELEMENT_LUCKY[drawEl]])];
      seed = seed + dy * 10000 + dm * 100 + dd;
    } else {
      luckyBase = s.lucky;
    }
  } else if (lang === 'ja') {
    const s = calcKyusei(year, month, day);
    cultural = s; seed = s.seed; systemKey = 'kyusei';
    colorData = { hex: KYUSEI_COLORS[s.star] || ELEMENT_COLOR['水'].hex, en: ELEMENT_COLOR[s.element]?.en || 'Blue' };
    dayData   = ELEMENT_DAY[s.element] || ELEMENT_DAY['水'];
    if (dy) {
      const drawStar = calcDayKyusei(dy, dm, dd);
      const drawEl   = KYUSEI_ELEMENTS[drawStar] || s.element;
      const harmony  = calcOhaengHarmony(s.element, drawEl);
      drawEnergy = { type:'kyusei', birthStar:s.star, drawStar, birthEl:s.element, drawEl, harmony };
      luckyBase = [...new Set([...s.lucky, ...(KYUSEI_LUCKY[drawStar] || s.lucky)])];
      seed = seed + dy * 10000 + dm * 100 + dd;
    } else {
      luckyBase = s.lucky;
    }
  } else if (lang === 'id') {
    const s = calcJawanese(year, month, day);
    cultural = s; seed = s.seed; systemKey = 'jawanese';
    colorData = { hex: PASARAN_COLORS[s.pasaranIdx], en: 'Purple' };
    dayData   = ELEMENT_DAY['土'];
    if (dy) {
      const drawPas = calcDrawPasaran(dy, dm, dd);
      drawEnergy = { type:'jawanese', birthPas:s.pasaranIdx, drawPas,
        birthName: PASARAN[s.pasaranIdx], drawName: PASARAN[drawPas] };
      luckyBase = [...new Set([...PASARAN_LUCKY[s.pasaranIdx], ...PASARAN_LUCKY[drawPas]])];
      seed = seed + dy * 10000 + dm * 100 + dd;
    } else {
      luckyBase = s.lucky;
    }
  } else {
    const s = calcNumerology(year, month, day);
    cultural = s; seed = s.seed; systemKey = 'numerology';
    colorData = LIFE_PATH_COLORS[s.lpn] || LIFE_PATH_COLORS[1];
    dayData   = { ko:'일요일', en: LIFE_PATH_DAYS[s.lpn]||'Sunday', ja:'日曜日', de:'Sonntag', fr:'Dimanche', es:'Domingo', pt:'Domingo', it:'Domenica', id:'Minggu' };
    if (dy) {
      const udn = calcUDN(dy, dm, dd);
      drawEnergy = { type:'numerology', lpn:s.lpn, udn };
      const udnLucky = LIFE_PATH_LUCKY_BASE[udn] || LIFE_PATH_LUCKY_BASE[9];
      luckyBase = [...new Set([...s.lucky, ...udnLucky])];
      seed = seed + dy * 10000 + dm * 100 + dd;
    } else {
      luckyBase = s.lucky;
    }
  }

  // Compute compat score + weighted scoreMap when draw date is provided
  let compatScore = null, scoreMap = null;
  if (drawEnergy && fmt.main) {
    if (systemKey === 'saju') {
      compatScore = calcOhaengCompat(cultural.element, drawEnergy.drawEl);
      scoreMap = scoreAllNumbers(fmt.main.min, fmt.main.max,
        cultural.lucky, ELEMENT_LUCKY[drawEnergy.drawEl]||[],
        drawEnergy.harmony.weight[0], drawEnergy.harmony.weight[1]);
      drawEnergy.birthNums = cultural.lucky;
      drawEnergy.drawNums  = ELEMENT_LUCKY[drawEnergy.drawEl]||[];
    } else if (systemKey === 'kyusei') {
      compatScore = calcOhaengCompat(cultural.element, drawEnergy.drawEl);
      scoreMap = scoreAllNumbers(fmt.main.min, fmt.main.max,
        cultural.lucky, KYUSEI_LUCKY[drawEnergy.drawStar]||[],
        drawEnergy.harmony.weight[0], drawEnergy.harmony.weight[1]);
      drawEnergy.birthNums = cultural.lucky;
      drawEnergy.drawNums  = KYUSEI_LUCKY[drawEnergy.drawStar]||[];
    } else if (systemKey === 'jawanese') {
      compatScore = calcPasaranCompat(cultural.pasaranIdx, drawEnergy.drawPas);
      scoreMap = scoreAllNumbers(fmt.main.min, fmt.main.max,
        PASARAN_LUCKY[cultural.pasaranIdx]||[], PASARAN_LUCKY[drawEnergy.drawPas]||[], 6, 4);
      drawEnergy.birthNums = PASARAN_LUCKY[cultural.pasaranIdx]||[];
      drawEnergy.drawNums  = PASARAN_LUCKY[drawEnergy.drawPas]||[];
    } else {
      compatScore = calcNumerologyCompat(cultural.lpn, drawEnergy.udn);
      const udnL = LIFE_PATH_LUCKY_BASE[drawEnergy.udn]||[];
      scoreMap = scoreAllNumbers(fmt.main.min, fmt.main.max, cultural.lucky, udnL, 6, 4);
      drawEnergy.birthNums = cultural.lucky;
      drawEnergy.drawNums  = udnL;
    }
    drawEnergy.compatScore = compatScore;
  }
  const upcomingDates = !setIdx
    ? findNextDrawDates(year, month, day, cultural, systemKey, lang, lotteryId||(LOTTERY_OPTIONS[lang]?.[0]?.id))
    : null;

  // ── Fortune category calculation ─────────────────────────
  let fullSaju = null, sunSign = null, moonSign = null, monthKyusei = null;
  if (systemKey === 'saju') {
    const dayStemIdx = calcDayStemIdx(year, month, day);
    const monthBranch = calcMonthBranchByJieqi(year, month, day, birthHour);
    const monthPillar = calcMonthPillar(cultural.stemIdx, month, monthBranch);
    const dayBranch = calcDayBranch(year, month, day);
    const hourPillar = (birthHour !== null && birthHour !== undefined)
      ? calcHourPillar(dayStemIdx, birthHour) : null;
    const balance = calcOhaengBalance([
      cultural.element, monthPillar.element, ELEMENTS[dayStemIdx], hourPillar ? hourPillar.element : null
    ]);
    const stems = [cultural.stemIdx, monthPillar.stemIdx, dayStemIdx];
    if (hourPillar) stems.push(hourPillar.stemIdx);
    const sipsin = {};
    stems.slice(1).forEach(si => { const r = calcSipsinType(dayStemIdx, si); sipsin[r] = (sipsin[r] || 0) + 1; });
    fullSaju = { ...balance, sipsin, monthPillar, dayBranch, hourPillar };
  } else if (systemKey === 'kyusei') {
    monthKyusei = calcMonthKyusei(cultural.star, month);
  } else if (systemKey === 'numerology') {
    sunSign = getSunSignPrecise(year, month, day);
    moonSign = getMoonSignPrecise(year, month, day, birthHour);
  }

  const fortuneScores = !setIdx ? calcFortuneScores(systemKey, cultural, {
    fullSaju, sunSign, moonSign,
    monthStar: monthKyusei,
    dayBranch: fullSaju ? fullSaju.dayBranch : null,
    hourBranch: fullSaju && fullSaju.hourPillar ? fullSaju.hourPillar.branchIdx : null,
    birthHour: (birthHour !== null && birthHour !== undefined) ? birthHour : null,
    seed,
  }) : null;

  if (setIdx) seed = ((seed >>> 0) + setIdx * 999983) >>> 0;
  const rng = mkRng(seed);
  let mainNums, bonusNums = null;

  if (fmt.digits) {
    mainNums = [];
    for (let i = 0; i < fmt.digits; i++) mainNums.push(Math.floor(rng() * 10));
  } else {
    mainNums = scoreMap
      ? pickWeighted(rng, fmt.main.min, fmt.main.max, fmt.main.count, scoreMap)
      : pickBiased(rng, fmt.main.min, fmt.main.max, fmt.main.count, luckyBase);
    if (fmt.bonus) {
      bonusNums = pickBiased(rng, fmt.bonus.min, fmt.bonus.max, fmt.bonus.count, luckyBase);
    }
  }

  return { year, month, day, lang, cultural, colorData, dayData, systemKey, fmt, mainNums, bonusNums, seed, drawEnergy, lotteryId, compatScore, scoreMap, upcomingDates, birthHour: birthHour ?? null, fullSaju, sunSign, moonSign, monthKyusei, fortuneScores };
}

// ── Render Results ────────────────────────────────────────
function renderResults(data) {
  const L = window.LUCKY_LANG || {};
  const lang = data.lang;
  const cat = window.LUCKY_SELECTED_CAT || 'lucky';
  const CAT_IDX = {lucky:0, saju:1, love:2, money:3, career:4, achievement:5};
  const CAT_ICONS = {lucky:'🍀', saju:'🔮', love:'💝', money:'💰', career:'💼', achievement:'🏆'};
  const catNames = L.catNames || ['행운 번호','정통 사주','연애운','금전운','직업운','성취운'];
  const catLabel = catNames[CAT_IDX[cat]] || catNames[0];

  // ── Hero: badge + title ───────────────────────────────────
  const badgeEl = document.getElementById('result-badge');
  const titleEl = document.getElementById('txt-result-title');
  if (badgeEl) badgeEl.textContent = `${CAT_ICONS[cat]||'🍀'} ${catLabel}`;
  if (titleEl) titleEl.textContent = catLabel;

  // ── Cultural info pills ───────────────────────────────────
  let culturalHtml = '';
  if (data.systemKey === 'saju') {
    const s = data.cultural, si = s.stemIdx, bi = s.branchIdx;
    culturalHtml = `<span class="cultural-pill">${STEMS[si]}${BRANCHES[bi]}(${STEM_KO[si]}${BRANCH_KO[bi]})년생</span><span class="cultural-pill">${ZODIAC_KO[bi]}띠</span><span class="cultural-pill">오행: ${s.element}(${ELEMENT_KO[si]})</span>`;
  } else if (data.systemKey === 'kyusei') {
    const s = data.cultural;
    culturalHtml = `<span class="cultural-pill">本命星: ${KYUSEI_NAMES[s.star]}</span><span class="cultural-pill">属性: ${KYUSEI_ELEMENTS[s.star]}</span>`;
  } else if (data.systemKey === 'jawanese') {
    culturalHtml = `<span class="cultural-pill">Weton: ${PASARAN[data.cultural.pasaranIdx]}</span>`;
  } else {
    culturalHtml = `<span class="cultural-pill">Life Path: ${data.cultural.lpn}</span>`;
  }
  document.getElementById('cultural-info').innerHTML = culturalHtml;

  // ── Clean previous dynamic sections ──────────────────────
  ['detailed-reading-panel','fortune-cats-section','single-fortune-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const lotterySection = document.getElementById('lottery-section');
  const fortuneCard    = document.querySelector('.fortune-card');
  const fsg            = document.getElementById('fortune-summary-grid');

  // ══ LUCKY: 행운 번호 전용 ════════════════════════════════
  if (cat === 'lucky') {
    if (lotterySection) lotterySection.style.display = '';
    if (fortuneCard)    fortuneCard.style.display    = '';
    if (fsg)            fsg.innerHTML = ''; // no fortune scores in hero for lucky mode

    renderLotterySets(data.sets || [data], L, lang);

    const dayName   = data.dayData ? (data.dayData[lang] || data.dayData.en || '—') : '—';
    const colorName = L.colorNames ? (L.colorNames[data.colorData.en] || data.colorData.en) : data.colorData.en;
    document.getElementById('fortune-grid').innerHTML = `
      <div class="fortune-item"><div class="fortune-item-icon" style="color:${data.colorData.hex}">⬤</div><div class="fortune-item-label">${L.luckyColorLabel||'Lucky Color'}</div><div class="fortune-item-value" style="color:${data.colorData.hex}">${colorName}</div></div>
      <div class="fortune-item"><div class="fortune-item-icon">📅</div><div class="fortune-item-label">${L.luckyDayLabel||'Lucky Day'}</div><div class="fortune-item-value">${dayName}</div></div>
      <div class="fortune-item"><div class="fortune-item-icon">🔮</div><div class="fortune-item-label">${L.systemLabel||'System'}</div><div class="fortune-item-value" style="font-size:12px">${getSytemName(data.systemKey, lang)}</div></div>`;

    const fortunes = L.fortunes;
    if (fortunes && fortunes.length) {
      document.getElementById('fortune-msg').textContent = fortunes[Math.floor(mkRng(data.seed+999)()*fortunes.length)];
    }

    renderInterpretation(data);
    renderDrawEnergyPanel(data);
    renderAlgorithmPanel(data);

  // ══ SAJU: 정통 사주 전용 ═════════════════════════════════
  } else if (cat === 'saju') {
    if (lotterySection) lotterySection.style.display = 'none';
    if (fortuneCard)    fortuneCard.style.display    = 'none';

    renderFortuneSummaryGrid(data); // 4-score overview in hero
    renderDetailedReadingPanel(data); // 4-pillar table + ohaeng + yongsin
    renderFortuneCategories(data, 'saju'); // all 4 fortune cards (none highlighted)
    renderLuckyTips(data); // yongsin-based tips

  // ══ FORTUNE: 연애/금전/직업/성취운 전용 ══════════════════
  } else {
    if (lotterySection) lotterySection.style.display = 'none';
    if (fortuneCard)    fortuneCard.style.display    = 'none';

    renderFortuneSummaryGrid(data); // all 4 scores for context, selected highlighted
    renderSingleFortuneCatCard(data, cat, L); // full single-cat reading
    renderLuckyTips(data); // category-specific tips
  }

  renderShareBtns(data);
  renderFaq();
}

const SET_NUMS = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'];

function renderLotterySets(setsData, L, lang) {
  const section = document.getElementById('lottery-section');
  const multi = setsData.length > 1;
  const fmtName = setsData[0].fmt.name || 'Lucky Numbers';
  const lottLabel = L.lotteryLabel || 'Lucky Numbers';
  const fmtKey = lang === 'ko' ? 'ko' : lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : lang === 'pt' ? 'pt' : lang === 'it' ? 'it' : 'euro';

  let html = `
    <div class="lottery-format-name" id="lottery-format-name">${escHtml(fmtName)}</div>
    <div class="lottery-label" id="txt-lottery-label">${escHtml(lottLabel)}</div>
  `;

  setsData.forEach((data, idx) => {
    html += `<div class="set-block">`;
    if (multi) html += `<div class="set-num-label">${SET_NUMS[idx] || (idx + 1)}</div>`;

    html += `<div class="balls-row">`;
    if (data.fmt.digits) {
      data.mainNums.forEach((n, i) => {
        html += `<div class="ball ball-digit" style="animation-delay:${i * 0.12}s">${n}</div>`;
      });
    } else {
      data.mainNums.forEach((n, i) => {
        html += `<div class="ball ${ballClass(n, fmtKey)}" style="animation-delay:${i * 0.12}s">${n}</div>`;
      });
    }
    html += `</div>`;

    if (data.bonusNums && data.fmt.bonus) {
      const bKey = lang === 'en' ? 'en-bonus' : 'euro-star';
      html += `<div class="bonus-row" style="display:flex"><div class="bonus-label">${escHtml(data.fmt.bonus.label)}</div><div class="balls-row">`;
      data.bonusNums.forEach((n, i) => {
        html += `<div class="ball sz-sm ${ballClass(n, bKey)}" style="animation-delay:${(data.mainNums.length + i) * 0.12}s">${n}</div>`;
      });
      html += `</div></div>`;
    }

    if (data.fmt.digits === 4) {
      const d3 = data.mainNums.slice(1).join('');
      const d2 = data.mainNums.slice(2).join('');
      html += `<div style="margin-top:8px;font-size:12px;color:#78716c;"><strong>3D:</strong> ${d3} &nbsp;|&nbsp; <strong>2D:</strong> ${d2}</div>`;
    }

    html += `</div>`;
  });

  section.innerHTML = html;
}

function renderDrawEnergyPanel(data) {
  const existing = document.getElementById('draw-energy-panel');
  if (existing) existing.remove();

  const lang = data.lang;
  const L = window.LUCKY_LANG || {};
  const panel = document.createElement('div');
  panel.id = 'draw-energy-panel';
  panel.style.cssText = 'background:#f0fdf4;border:2px solid #86efac;border-radius:20px;padding:22px;margin-bottom:20px;';

  const fb = k => L[k] || (UI_FALLBACKS[k] && UI_FALLBACKS[k][lang]) || '';
  let html = `<div style="font-size:13px;font-weight:800;color:#15803d;letter-spacing:.5px;margin-bottom:14px;">🔍 ${fb('whyTitle')}</div>`;

  if (data.drawEnergy) {
    const de = data.drawEnergy;
    const compat = de.compatScore || 0;
    const filled = Math.round(compat / 10);
    const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);
    const gColor = compat >= 80 ? '#16a34a' : compat >= 60 ? '#d97706' : '#dc2626';

    // ── Compatibility Score Gauge ──────────────────────────
    html += `
      <div style="background:#fff;border-radius:14px;padding:14px 16px;margin-bottom:14px;border:1px solid #bbf7d0;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
          <div style="font-size:12px;font-weight:700;color:#374151;">${fb('compatScoreLabel')||'Compatibility'}</div>
          <div style="font-size:26px;font-weight:900;color:${gColor};">${compat}%</div>
        </div>
        <div style="font-family:monospace;font-size:18px;color:${gColor};letter-spacing:3px;margin-bottom:4px;">${bar}</div>
      </div>`;

    // ── Energy Comparison ─────────────────────────────────
    if (de.type === 'saju') {
      const h = de.harmony;
      const birthElName = ELEMENT_KO_NAME[de.birthEl]||de.birthEl;
      const drawElName  = ELEMENT_KO_NAME[de.drawEl]||de.drawEl;
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:12px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${fb('birthEnergyLabel')}</div>
            <div style="font-size:22px;">${de.birthEl}</div>
            <div style="font-size:12px;font-weight:700;color:#1c1917;">${birthElName}</div>
          </div>
          <div style="font-size:24px;text-align:center;">${h.emoji}</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${fb('drawEnergyLabel')}</div>
            <div style="font-size:22px;">${de.drawEl}</div>
            <div style="font-size:12px;font-weight:700;color:#1c1917;">${drawElName}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;margin-bottom:12px;">
          <strong>${h.rel} ${h.emoji}</strong> — ${h[lang]||h.en}
        </div>`;
    } else if (de.type === 'kyusei') {
      const h = de.harmony;
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:12px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${fb('birthEnergyLabel')||'本命星'}</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${KYUSEI_NAMES[de.birthStar]||de.birthStar}</div>
          </div>
          <div style="font-size:24px;text-align:center;">${h.emoji}</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${fb('drawEnergyLabel')||'日星'}</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${KYUSEI_NAMES[de.drawStar]||de.drawStar}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;margin-bottom:12px;">
          ${h[lang === 'ja' ? 'ja' : 'en']||h.en}
        </div>`;
    } else if (de.type === 'numerology') {
      const compatTxt = {
        en:`Life Path ${de.lpn} × Universal Day ${de.udn} resonance: ${compat}% — numbers biased toward combined frequency`,
        ko:`생명 경로 수 ${de.lpn} × 추첨일 에너지(UDN) ${de.udn} 공명 점수 ${compat}% — 두 에너지의 교점 숫자를 우선 선택`,
        de:`Lebenspfad ${de.lpn} × Universeller Tag ${de.udn} Resonanz ${compat}% — Zahlen auf kombinierte Frequenz gewichtet`,
        fr:`Chemin de Vie ${de.lpn} × Numéro Universel du jour ${de.udn} résonance ${compat}%`,
        es:`Camino de Vida ${de.lpn} × Día Universal ${de.udn} resonancia ${compat}%`,
        pt:`Caminho de Vida ${de.lpn} × Dia Universal ${de.udn} ressonância ${compat}%`,
        it:`Percorso di Vita ${de.lpn} × Giorno Universale ${de.udn} risonanza ${compat}%`,
      };
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:12px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${fb('birthEnergyLabel')||'Life Path'}</div>
            <div style="font-size:32px;font-weight:900;color:#1e1b4b;">${de.lpn}</div>
          </div>
          <div style="font-size:24px;text-align:center;">✕</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${fb('drawEnergyLabel')||'Universal Day'}</div>
            <div style="font-size:32px;font-weight:900;color:#1e1b4b;">${de.udn}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;margin-bottom:12px;">
          ${compatTxt[lang]||compatTxt.en}
        </div>`;
    } else if (de.type === 'jawanese') {
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:12px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">Weton Lahir</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${de.birthName}</div>
          </div>
          <div style="font-size:24px;text-align:center;">+</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">Pasaran Undian</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${de.drawName}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;margin-bottom:12px;">
          Kompatibilitas Weton ${de.birthName} × Pasaran undian ${de.drawName}: ${compat}%
        </div>`;
    }

    // ── Number Energy Heatmap ─────────────────────────────
    const mainNums = data.mainNums || [];
    const birthSet = new Set(de.birthNums || []);
    const drawSet  = new Set(de.drawNums || []);
    const numsHtml = mainNums.map(n => {
      const inB = birthSet.has(n), inD = drawSet.has(n);
      let bg, icon;
      if (inB && inD)  { bg='#fef08a'; icon='⭐'; }
      else if (inB)    { bg='#bbf7d0'; icon='🌱'; }
      else if (inD)    { bg='#bae6fd'; icon='💧'; }
      else             { bg='#f5f5f4'; icon=''; }
      return `<div style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;margin:3px;">
        <div style="background:${bg};border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;border:2px solid rgba(0,0,0,.08);">${n}</div>
        <div style="font-size:10px;line-height:1;">${icon}</div>
      </div>`;
    }).join('');

    const heatmapTitle = {ko:'번호별 에너지 구성',en:'Number Energy Breakdown',ja:'数字エネルギー内訳',de:'Energie der Zahlen',fr:'Composition énergétique',es:'Composición energética',pt:'Composição de energia',it:'Composizione energetica',id:'Komposisi Energi Angka'};
    const legBoth  = {ko:'⭐ 최고 호환',en:'⭐ Best Match',ja:'⭐ 最高相性',de:'⭐ Beste',fr:'⭐ Meilleur',es:'⭐ Mejor',pt:'⭐ Melhor',it:'⭐ Migliore',id:'⭐ Terbaik'};
    const legBirth = {ko:'🌱 생년 기운',en:'🌱 Birth Energy',ja:'🌱 生年',de:'🌱 Geburt',fr:'🌱 Naissance',es:'🌱 Nacimiento',pt:'🌱 Nascimento',it:'🌱 Nascita',id:'🌱 Lahir'};
    const legDraw  = {ko:'💧 추첨일 기운',en:'💧 Draw Energy',ja:'💧 抽選日',de:'💧 Ziehung',fr:'💧 Tirage',es:'💧 Sorteo',pt:'💧 Sorteio',it:'💧 Estrazione',id:'💧 Undian'};

    html += `
      <div style="background:#fff;border-radius:12px;padding:12px 14px;border:1px solid #e5e7eb;">
        <div style="font-size:11px;font-weight:700;color:#374151;margin-bottom:8px;">${heatmapTitle[lang]||heatmapTitle.en}</div>
        <div style="display:flex;flex-wrap:wrap;">${numsHtml}</div>
        <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;">
          <span style="font-size:10px;color:#374151;">${legBoth[lang]||legBoth.en}</span>
          <span style="font-size:10px;color:#374151;">${legBirth[lang]||legBirth.en}</span>
          <span style="font-size:10px;color:#374151;">${legDraw[lang]||legDraw.en}</span>
        </div>
      </div>`;

  } else {
    // No draw date — base explanation
    const baseExplain = {
      saju:      { ko:'연주(年柱) 천간에서 오행을 산출해 전통 행운 숫자에 4배 가중치를 적용했습니다. 추첨일을 입력하면 일진(日辰) 에너지까지 결합해 더 정밀한 번호가 생성됩니다.', en:'Birth year element analyzed via Four Pillars. Add draw date for enhanced precision.', ja:'生年の天干から五行を算出し、伝統的な吉数に4倍の重みを適用しました。' },
      kyusei:    { ko:'본명성(本命星)으로 오행을 산출하고 행운 숫자에 가중치를 부여했습니다. 추첨일을 입력하면 일성(日星)과의 상호작용이 반영됩니다.', en:'Nine Star Ki birth star analyzed. Add draw date to incorporate day star interaction.', ja:'本命星の五行から吉数を算出しました。日付を追加すると日星との相互作用が反映されます。' },
      numerology:{ ko:'생년월일 합산으로 생명 경로 수(Life Path Number)를 산출하고 공명 숫자에 가중치를 적용했습니다. 추첨일을 입력하면 그 날의 에너지(UDN)가 결합됩니다.', en:'Life Path Number calculated from birthday. Add draw date to combine Universal Day Number.', ja:'誕生日からライフパスナンバーを算出しました。日付を追加すると宇宙の日数が加わります。' },
      jawanese:  { ko:'생년월일의 파사란(Pasaran)을 산출하고 전통 행운 숫자에 가중치를 적용했습니다. 추첨일을 입력하면 당일 파사란이 결합됩니다.', en:'Birth date Pasaran (Weton) calculated. Add draw date to combine draw day Pasaran.', id:'Pasaran hari lahir dihitung. Tambahkan tanggal undian untuk kombinasi Pasaran hari undian.' },
    };
    const txt = baseExplain[data.systemKey]?.[lang] || baseExplain[data.systemKey]?.en || '';
    html += `<div style="font-size:13px;color:#166534;line-height:1.7;margin-bottom:14px;">${txt}</div>`;
  }

  // ── Upcoming Best Draw Dates ──────────────────────────────
  const upcoming = data.upcomingDates;
  if (upcoming && upcoming.length > 0) {
    const upLabel = (UI_FALLBACKS.upcomingLabel||{})[lang] || 'Best Draw Dates TOP 3';
    const dayNames = DAY_NAMES_SHORT[lang] || DAY_NAMES_SHORT.en;
    html += `
      <div style="background:#fff;border-radius:12px;padding:12px 14px;border:1px solid #e5e7eb;margin-top:14px;">
        <div style="font-size:11px;font-weight:700;color:#374151;margin-bottom:10px;">📅 ${upLabel}</div>`;
    upcoming.forEach((ud, i) => {
      const rankEmoji = ['🥇','🥈','🥉'][i] || '▸';
      const sc = ud.score || 0;
      const bar2 = '█'.repeat(Math.round(sc/10)) + '░'.repeat(10-Math.round(sc/10));
      const barColor = sc >= 80 ? '#16a34a' : sc >= 60 ? '#d97706' : '#6b7280';
      const [uy, um, udd] = ud.date.split('-');
      const dateStr = lang === 'ko' ? `${uy}.${um}.${udd}` : lang === 'ja' ? `${uy}/${um}/${udd}` : `${udd}/${um}/${uy}`;
      html += `
        <div style="display:flex;align-items:center;gap:8px;padding:7px 0;${i < upcoming.length-1 ? 'border-bottom:1px solid #f3f4f6;' : ''}">
          <div style="font-size:15px;min-width:20px;">${rankEmoji}</div>
          <div style="min-width:78px;font-size:12px;font-weight:700;color:#111827;">${dateStr}</div>
          <div style="min-width:18px;font-size:11px;color:#6b7280;">${dayNames[ud.dow]||''}</div>
          <div style="flex:1;font-family:monospace;font-size:11px;color:${barColor};overflow:hidden;">${bar2}</div>
          <div style="font-size:11px;font-weight:700;color:${barColor};min-width:30px;text-align:right;">${sc}%</div>
          <div style="font-size:10px;color:#6b7280;max-width:60px;text-align:right;overflow:hidden;white-space:nowrap;">${ud.rel||''}</div>
        </div>`;
    });
    html += `</div>`;
  }

  panel.innerHTML = html;

  // Insert before share section
  const shareSection = document.querySelector('.share-section');
  if (shareSection) shareSection.before(panel);
}

function renderInterpretation(data) {
  const existing = document.getElementById('interpretation-panel');
  if (existing) existing.remove();

  const lang = data.lang;
  const luckyNums = data.cultural.lucky || [];
  const numsStr = luckyNums.join(', ');

  const TITLE = {
    ko:'🔮 나의 번호 해석',en:'🔮 Your Number Reading',ja:'🔮 あなたの数字の解釈',
    de:'🔮 Ihre Zahlen-Deutung',fr:'🔮 Votre Lecture Personnelle',es:'🔮 Tu Lectura Personal',
    pt:'🔮 Sua Leitura Pessoal',it:'🔮 La Tua Lettura Personale',id:'🔮 Pembacaan Angka Anda',
  };

  let body = '';

  if (data.systemKey === 'saju') {
    const s = data.cultural;
    const ganji = `${STEMS[s.stemIdx]}${BRANCHES[s.branchIdx]}`;
    const elName = ELEMENT_KO_NAME[s.element] || s.element;
    body = `<strong>${data.year}년</strong>생은 육십갑자(六十甲子)로 <strong>${ganji}(${STEM_KO[s.stemIdx]}${BRANCH_KO[s.branchIdx]})년</strong>입니다. 천간(天干) <strong>${STEMS[s.stemIdx]}(${STEM_KO[s.stemIdx]})</strong>은 오행 중 <strong>${elName}</strong>에 속합니다.<br><br>3,000년 역사의 사주팔자 전통에서 <strong>${elName}</strong> 기운을 타고난 사람에게는 <strong>${numsStr}</strong>이 강한 에너지 공명을 가진 행운의 숫자로 전해집니다. 이 ${luckyNums.length}개 숫자는 번호 생성 풀에서 다른 숫자보다 <strong>4배 높은 비중</strong>으로 포함되었기 때문에, 오늘의 행운 번호에 통계적으로 더 높은 확률로 선택되었습니다.`;

  } else if (data.systemKey === 'kyusei') {
    const s = data.cultural;
    const starName = KYUSEI_NAMES[s.star];
    const elName = KYUSEI_ELEMENTS[s.star];
    body = `${data.year}年生まれのあなたの<strong>本命星は${starName}</strong>です。<br><br>1,200年の歴史を持つ九星気学では、${starName}は<strong>${elName}行</strong>の性質を持ち、<strong>${numsStr}</strong>が吉数として伝えられています。今回の生成では、これら${luckyNums.length}つの吉数が選択プールに<strong>4倍の重み</strong>で組み込まれており、他の数字よりも統計的に選ばれやすい確率で今日の番号に反映されています。`;

  } else if (data.systemKey === 'jawanese') {
    const s = data.cultural;
    const pas = PASARAN[s.pasaranIdx];
    body = `Tanggal lahir Anda jatuh pada <strong>Pasaran ${pas}</strong> dalam kalender Jawa.<br><br>Menurut tradisi <strong>Primbon</strong> yang telah ada selama lebih dari 600 tahun, Pasaran <strong>${pas}</strong> beresonansi kuat dengan angka <strong>${numsStr}</strong>. Dalam proses pemilihan angka Togel Anda, ${luckyNums.length} angka hoki ini dimasukkan ke kolam seleksi dengan <strong>bobot 4× lebih tinggi</strong> dibanding angka lainnya — sehingga secara statistik lebih berpeluang muncul sebagai angka keberuntungan Anda hari ini.`;

  } else {
    const s = data.cultural;
    const lpn = s.lpn;
    const NUMO = {
      en: `Your birth date digits sum to <strong>Life Path Number ${lpn}</strong>.<br><br>In Pythagorean numerology (570 BC), Life Path <strong>${lpn}</strong> carries a unique vibrational frequency traditionally linked to <strong>${numsStr}</strong>. These ${luckyNums.length} numbers are weighted <strong>4× higher</strong> in your selection pool — making them statistically more likely to appear in your lucky numbers today.`,
      de: `Die Ziffern Ihres Geburtsdatums ergeben die <strong>Lebenspfadzahl ${lpn}</strong>.<br><br>In der pythagoräischen Numerologie (570 v. Chr.) trägt Lebenspfad <strong>${lpn}</strong> eine einzigartige Schwingungsfrequenz, die traditionell mit <strong>${numsStr}</strong> resoniert. Diese ${luckyNums.length} Zahlen werden mit <strong>4-facher Gewichtung</strong> in Ihren Auswahlpool aufgenommen — sie erscheinen heute statistisch häufiger in Ihren Glückszahlen.`,
      fr: `Les chiffres de votre date de naissance donnent le <strong>Nombre de Chemin de Vie ${lpn}</strong>.<br><br>Dans la numérologie pythagoricienne (570 av. J.-C.), le Chemin de Vie <strong>${lpn}</strong> possède une fréquence vibratoire unique, liée traditionnellement à <strong>${numsStr}</strong>. Ces ${luckyNums.length} numéros sont pondérés <strong>4× plus fort</strong> dans votre réservoir — ils apparaissent donc statistiquement plus souvent dans vos numéros chanceux aujourd'hui.`,
      es: `Los dígitos de tu fecha de nacimiento suman el <strong>Número del Camino de Vida ${lpn}</strong>.<br><br>En la numerología pitagórica (570 a.C.), el Camino de Vida <strong>${lpn}</strong> posee una frecuencia vibratoria única vinculada tradicionalmente a <strong>${numsStr}</strong>. Estos ${luckyNums.length} números tienen un <strong>peso 4× mayor</strong> en tu grupo de selección — apareciendo estadísticamente con más frecuencia en tus números de la suerte hoy.`,
      pt: `Os dígitos da sua data de nascimento somam o <strong>Número do Caminho de Vida ${lpn}</strong>.<br><br>Na numerologia pitagórica (570 a.C.), o Caminho de Vida <strong>${lpn}</strong> possui uma frequência vibratória única, ligada tradicionalmente a <strong>${numsStr}</strong>. Esses ${luckyNums.length} números têm <strong>peso 4× maior</strong> no seu pool de seleção — aparecendo estatisticamente com mais frequência nos seus números da sorte hoje.`,
      it: `Le cifre della tua data di nascita sommano al <strong>Numero del Percorso di Vita ${lpn}</strong>.<br><br>Nella numerologia pitagorica (570 a.C.), il Percorso di Vita <strong>${lpn}</strong> possiede una frequenza vibratoria unica, legata tradizionalmente a <strong>${numsStr}</strong>. Questi ${luckyNums.length} numeri hanno un <strong>peso 4× maggiore</strong> nel tuo pool di selezione — apparendo statisticamente più spesso nei tuoi numeri fortunati oggi.`,
      ko: `생년월일 숫자 합산으로 당신의 <strong>생명 경로 수는 ${lpn}</strong>입니다.<br><br>피타고라스 수비학(기원전 570년)에서 경로 수 <strong>${lpn}</strong>은 <strong>${numsStr}</strong>과 강한 진동 에너지를 공유한다고 알려져 있습니다. 이 ${luckyNums.length}개 숫자는 번호 생성 풀에서 <strong>4배 높은 가중치</strong>로 포함되어 통계적으로 더 높은 확률로 오늘의 행운 번호에 반영되었습니다.`,
    };
    body = NUMO[lang] || NUMO.en;
  }

  const panel = document.createElement('div');
  panel.id = 'interpretation-panel';
  panel.style.cssText = 'background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border:2px solid #7dd3fc;border-radius:20px;padding:20px 22px;margin-bottom:20px;font-size:13px;color:#0c4a6e;line-height:1.9;';
  panel.innerHTML = `
    <div style="font-size:13px;font-weight:800;color:#0369a1;letter-spacing:.5px;margin-bottom:10px;">${TITLE[lang]||TITLE.en}</div>
    <div>${body}</div>
  `;

  const shareSection = document.querySelector('.share-section');
  if (shareSection) shareSection.before(panel);
}

function renderAlgorithmPanel(data) {
  const existing = document.getElementById('algorithm-panel');
  if (existing) existing.remove();

  const lang = data.lang;

  const ALGO = {
    panelTitle: {
      ko:'🔬 왜 이 번호들의 확률이 높은가?',
      en:'🔬 Why These Numbers Have Higher Probability',
      ja:'🔬 なぜこれらの数字の確率が高いのか',
      de:'🔬 Warum diese Zahlen wahrscheinlicher sind',
      fr:'🔬 Pourquoi ces numéros sont plus probables',
      es:'🔬 Por qué estos números tienen mayor probabilidad',
      pt:'🔬 Por que esses números têm maior probabilidade',
      it:'🔬 Perché questi numeri hanno probabilità maggiore',
      id:'🔬 Mengapa angka ini memiliki probabilitas lebih tinggi',
    },
    systemOrigin: {
      saju: {
        ko:'사주팔자(四柱八字)는 3,000년 이상의 역사를 지닌 동양 운명 분석 체계입니다. 생년월일에서 천간(天干)과 지지(地支)를 추출해 오행(木·火·土·金·水)으로 분류하고, 각 오행에 전통적으로 배속된 행운 숫자를 도출합니다.',
        en:'Four Pillars of Destiny (四柱八字) is a 3,000+ year-old Eastern fate analysis system. The birth year is mapped to Heavenly Stems and Earthly Branches, then classified into one of the Five Elements (Wood·Fire·Earth·Metal·Water), each with traditionally assigned lucky numbers.',
        ja:'四柱推命は3,000年以上の歴史を持つ東洋の運命分析体系です。生年月日から天干・地支を抽出し、五行（木・火・土・金・水）に分類して、各五行に伝統的に配属された吉数を導出します。',
        de:'Die Vier Säulen des Schicksals (四柱八字) ist ein über 3.000 Jahre altes östliches Schicksalsanalysesystem. Das Geburtsjahr wird auf Himmlische Stämme und Irdische Zweige abgebildet und einem der Fünf Elemente zugeordnet.',
        fr:'Les Quatre Piliers du Destin (四柱八字) est un système d\'analyse du destin oriental vieux de plus de 3 000 ans. L\'année de naissance est mappée aux Tiges Célestes et Branches Terrestres, puis classée dans l\'un des Cinq Éléments.',
        es:'Los Cuatro Pilares del Destino (四柱八字) es un sistema oriental de análisis del destino con más de 3.000 años de historia. El año de nacimiento se asigna a Tallos Celestiales y Ramas Terrestres, luego se clasifica en uno de los Cinco Elementos.',
        pt:'Os Quatro Pilares do Destino (四柱八字) é um sistema oriental de análise do destino com mais de 3.000 anos. O ano de nascimento é mapeado para Caules Celestiais e Galhos Terrestres, depois classificado em um dos Cinco Elementos.',
        it:'I Quattro Pilastri del Destino (四柱八字) è un sistema orientale di analisi del destino con oltre 3.000 anni di storia. L\'anno di nascita viene mappato su Steli Celesti e Rami Terrestri, poi classificato in uno dei Cinque Elementi.',
        id:'Empat Pilar Nasib (四柱八字) adalah sistem analisis nasib Timur berusia lebih dari 3.000 tahun. Tahun kelahiran dipetakan ke Batang Langit dan Cabang Bumi, lalu diklasifikasikan ke salah satu dari Lima Elemen.',
      },
      kyusei: {
        ko:'구성기학(九星気学)은 1,200년 이상의 역사를 가진 일본 전통 점술입니다. 탄생년도에서 1~9의 본명성(本命星)을 산출하고, 각 별의 오행 속성에 따라 행운 숫자를 전통적으로 도출합니다.',
        en:'Nine Star Ki (九星気学) is a 1,200+ year-old Japanese divination system. The birth year determines a Life Star (1–9), each with a Five Element attribute and traditionally associated lucky numbers.',
        ja:'九星気学は1,200年以上の歴史を持つ日本伝統の占術です。生まれ年から本命星（1〜9）を算出し、各星の五行属性に基づく吉数を伝統的に導出します。',
        de:'Nine Star Ki (九星気学) ist ein über 1.200 Jahre altes japanisches Wahrsagesystem. Das Geburtsjahr bestimmt einen Lebensstern (1–9) mit einem Fünf-Elemente-Attribut und traditionell zugeordneten Glückszahlen.',
        fr:'Nine Star Ki (九星気学) est un système divinatoire japonais vieux de plus de 1.200 ans. L\'année de naissance détermine une Étoile de Vie (1–9) avec un attribut des Cinq Éléments et des numéros chanceux associés.',
        es:'Nine Star Ki (九星気学) es un sistema de adivinación japonés de más de 1.200 años. El año de nacimiento determina una Estrella de Vida (1–9) con un atributo de los Cinco Elementos y números de la suerte asociados.',
        pt:'Nine Star Ki (九星気学) é um sistema de adivinhação japonês de mais de 1.200 anos. O ano de nascimento determina uma Estrela de Vida (1–9) com um atributo dos Cinco Elementos e números sortudos associados.',
        it:'Nine Star Ki (九星気学) è un sistema divinatorio giapponese di oltre 1.200 anni. L\'anno di nascita determina una Stella di Vita (1–9) con un attributo dei Cinque Elementi e numeri fortunati associati.',
        id:'Nine Star Ki (九星気学) adalah sistem ramalan Jepang berusia lebih dari 1.200 tahun. Tahun kelahiran menentukan Bintang Kehidupan (1–9) dengan atribut Lima Elemen dan angka hoki yang terkait secara tradisional.',
      },
      numerology: {
        ko:'수비학(數秘學)은 고대 피타고라스(기원전 570~495)에서 유래한 숫자 분석 체계입니다. 생년월일의 모든 숫자를 합산해 생명 경로 수(Life Path Number, 1~9 또는 마스터넘버 11·22·33)를 산출하며, 각 번호는 고유한 진동수와 공명 행운 숫자를 지닙니다.',
        en:'Numerology traces to the Pythagorean school (570–495 BC). All digits of the birth date are summed to derive the Life Path Number (1–9, or master numbers 11·22·33). Each number vibrates at a unique frequency with resonant lucky numbers confirmed across Kabbalistic and modern traditions.',
        ja:'数秘術はピタゴラス学派（紀元前570〜495年）に由来します。生年月日のすべての数字を合計してライフパスナンバー（1〜9またはマスターナンバー11·22·33）を算出し、各数字は固有の振動数と共鳴する吉数を持ちます。',
        de:'Numerologie geht auf die pythagoräische Schule (570–495 v. Chr.) zurück. Alle Ziffern des Geburtsdatums werden summiert, um die Lebenspfadzahl (1–9 oder Meisterzahlen 11·22·33) zu ermitteln.',
        fr:'La numérologie remonte à l\'école pythagoricienne (570–495 av. J.-C.). Toutes les chiffres de la date de naissance sont additionnées pour dériver le Nombre de Chemin de Vie (1–9 ou nombres maîtres 11·22·33).',
        es:'La numerología se remonta a la escuela pitagórica (570–495 a.C.). Todos los dígitos de la fecha de nacimiento se suman para derivar el Número del Camino de Vida (1–9 o números maestros 11·22·33).',
        pt:'A numerologia remonta à escola pitagórica (570–495 a.C.). Todos os dígitos da data de nascimento são somados para derivar o Número do Caminho de Vida (1–9 ou números mestres 11·22·33).',
        it:'La numerologia risale alla scuola pitagorica (570–495 a.C.). Tutte le cifre della data di nascita vengono sommate per ricavare il Numero del Percorso di Vita (1–9 o numeri maestri 11·22·33).',
        id:'Numerologi berasal dari mazhab Pythagoras (570–495 SM). Semua digit tanggal lahir dijumlahkan untuk mendapatkan Nomor Jalur Kehidupan (1–9 atau nomor master 11·22·33).',
      },
      jawanese: {
        ko:'자와 달력의 Weton은 7일 양력과 5일 파사란 주기(Legi·Pahing·Pon·Wage·Kliwon)의 조합입니다. 프리봄(Primbon) 전통에서 각 파사란은 특정 숫자와 공명 관계를 가지며, 이를 Togel 번호 생성에 활용합니다.',
        en:'Javanese Weton combines the 7-day Gregorian week with the 5-day Pasaran cycle (Legi·Pahing·Pon·Wage·Kliwon). In the Primbon tradition — a 600+ year-old Javanese manuscript — each Pasaran resonates with specific numbers used for Togel number generation.',
        ja:'ジャワ暦のWetonは7日周期と5日周期のパサラン（Legi·Pahing·Pon·Wage·Kliwon）の組み合わせです。600年以上の歴史を持つプリンボン伝統では、各パサランが特定の数字と共鳴します。',
        de:'Das Javanische Weton kombiniert die 7-tägige Gregorianische Woche mit dem 5-tägigen Pasaran-Zyklus (Legi·Pahing·Pon·Wage·Kliwon). In der 600+ Jahre alten Primbon-Tradition resoniert jedes Pasaran mit spezifischen Glückszahlen.',
        fr:'Le Weton javanais combine la semaine grégorienne de 7 jours avec le cycle Pasaran de 5 jours (Legi·Pahing·Pon·Wage·Kliwon). Dans la tradition Primbon (600+ ans), chaque Pasaran résonne avec des numéros spécifiques.',
        es:'El Weton javanés combina la semana gregoriana de 7 días con el ciclo Pasaran de 5 días (Legi·Pahing·Pon·Wage·Kliwon). En la tradición Primbon (más de 600 años), cada Pasaran resuena con números específicos.',
        pt:'O Weton javanês combina a semana gregoriana de 7 dias com o ciclo Pasaran de 5 dias (Legi·Pahing·Pon·Wage·Kliwon). Na tradição Primbon (600+ anos), cada Pasaran ressoa com números específicos.',
        it:'Il Weton giavanese combina la settimana gregoriana di 7 giorni con il ciclo Pasaran di 5 giorni (Legi·Pahing·Pon·Wage·Kliwon). Nella tradizione Primbon (600+ anni), ogni Pasaran risuona con numeri specifici.',
        id:'Weton Jawa menggabungkan siklus 7 hari Masehi dengan siklus 5 hari Pasaran (Legi·Pahing·Pon·Wage·Kliwon). Dalam tradisi Primbon (600+ tahun), setiap Pasaran beresonansi dengan angka-angka tertentu.',
      },
    },
    calcChainTitle: {ko:'계산 과정',en:'Calculation Chain',ja:'計算プロセス',de:'Rechenweg',fr:'Processus de calcul',es:'Proceso de cálculo',pt:'Processo de cálculo',it:'Processo di calcolo',id:'Proses perhitungan'},
    luckyPoolTitle: {ko:'행운 번호 풀 (4배 가중치)',en:'Lucky Number Pool (4× weighted)',ja:'吉数プール（4倍の重み）',de:'Glückszahlen-Pool (4-fach)',fr:'Réservoir de numéros chanceux (4×)',es:'Grupo de números de la suerte (4×)',pt:'Pool de números sortudos (4×)',it:'Pool di numeri fortunati (4×)',id:'Kumpulan angka hoki (bobot 4×)'},
    probabilityTitle: {ko:'확률 원리',en:'Probability Principle',ja:'確率の原理',de:'Wahrscheinlichkeitsprinzip',fr:'Principe de probabilité',es:'Principio de probabilidad',pt:'Princípio de probabilidade',it:'Principio di probabilità',id:'Prinsip probabilitas'},
    probabilityDesc: {
      ko:'행운 번호 풀의 각 숫자는 선택 풀에 4번 삽입되고, 일반 숫자는 1번만 삽입됩니다. 이로 인해 9개의 행운 번호가 전체 범위의 다른 숫자들보다 통계적으로 선택될 확률이 높아집니다.',
      en:'Each lucky number is inserted 4 times into the selection pool, while ordinary numbers are inserted only once. This makes the lucky numbers statistically more likely to be selected compared to all other numbers in the range.',
      ja:'各吉数は選択プールに4回挿入され、通常の数字は1回のみ挿入されます。これにより、吉数が全範囲の他の数字よりも統計的に選択されやすくなります。',
      de:'Jede Glückszahl wird 4-mal in den Auswahlpool eingefügt, während gewöhnliche Zahlen nur einmal eingefügt werden. Dadurch werden die Glückszahlen statistisch häufiger ausgewählt.',
      fr:'Chaque numéro chanceux est inséré 4 fois dans le pool de sélection, tandis que les numéros ordinaires ne sont insérés qu\'une seule fois. Cela rend les numéros chanceux statistiquement plus susceptibles d\'être sélectionnés.',
      es:'Cada número de la suerte se inserta 4 veces en el grupo de selección, mientras que los números ordinarios se insertan solo una vez. Esto hace que los números de la suerte tengan estadísticamente más probabilidades de ser seleccionados.',
      pt:'Cada número sortudo é inserido 4 vezes no pool de seleção, enquanto os números ordinários são inseridos apenas uma vez. Isso torna os números sortudos estatisticamente mais prováveis de serem selecionados.',
      it:'Ogni numero fortunato viene inserito 4 volte nel pool di selezione, mentre i numeri ordinari vengono inseriti solo una volta. Ciò rende i numeri fortunati statisticamente più probabili di essere selezionati.',
      id:'Setiap angka hoki dimasukkan 4 kali ke dalam kolam seleksi, sedangkan angka biasa hanya dimasukkan sekali. Ini membuat angka-angka hoki secara statistik lebih mungkin terpilih.',
    },
    disclaimer: {
      ko:'※ 로또는 완전한 무작위 추첨 게임입니다. 이 분석은 전통 문화 지혜에 기반한 오락 콘텐츠이며, 당첨을 보장하지 않습니다.',
      en:'※ Lottery draws are completely random events. This analysis is entertainment based on cultural tradition and does not guarantee any winnings. Please play responsibly.',
      ja:'※ 宝くじは完全な無作為抽選です。この分析は文化的伝統に基づいたエンターテインメントであり、当選を保証するものではありません。',
      de:'※ Lottoziehungen sind vollständig zufällig. Diese Analyse dient der Unterhaltung basierend auf kultureller Tradition und garantiert keine Gewinne.',
      fr:'※ Les tirages de loterie sont des événements complètement aléatoires. Cette analyse est un divertissement basé sur la tradition culturelle et ne garantit aucun gain.',
      es:'※ Los sorteos de lotería son eventos completamente aleatorios. Este análisis es entretenimiento basado en la tradición cultural y no garantiza ningún premio.',
      pt:'※ Os sorteios de loteria são eventos completamente aleatórios. Esta análise é entretenimento baseado na tradição cultural e não garante nenhum prêmio.',
      it:'※ Le estrazioni della lotteria sono eventi completamente casuali. Questa analisi è intrattenimento basato sulla tradizione culturale e non garantisce vincite.',
      id:'※ Pengundian togel adalah peristiwa acak sepenuhnya. Analisis ini adalah hiburan berdasarkan tradisi budaya dan tidak menjamin kemenangan apapun.',
    },
  };

  const t = k => ALGO[k]?.[lang] || ALGO[k]?.en || '';
  const boxStyle = 'display:inline-block;padding:6px 10px;border-radius:8px;border:1px solid #d6d3d1;background:#fff;font-size:12px;font-weight:700;color:#1c1917;';
  const arrowStyle = 'display:inline-block;color:#d97706;font-weight:900;font-size:14px;padding:0 2px;';

  // Calculation chain
  let chainHtml = '<div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin:10px 0 4px;">';
  if (data.systemKey === 'saju') {
    const s = data.cultural;
    chainHtml += `<span style="${boxStyle}">${data.year}년</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}">${STEMS[s.stemIdx]}${BRANCHES[s.branchIdx]}(${STEM_KO[s.stemIdx]}${BRANCH_KO[s.branchIdx]})년</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#d4fce0;border-color:#86efac;">오행: ${s.element}(${ELEMENT_KO[s.stemIdx]})</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#fef9c3;border-color:#fde047;">행운수 9개</span>`;
  } else if (data.systemKey === 'kyusei') {
    const s = data.cultural;
    chainHtml += `<span style="${boxStyle}">${data.year}年</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}">${KYUSEI_NAMES[s.star]}</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#d4fce0;border-color:#86efac;">属性: ${KYUSEI_ELEMENTS[s.star]}行</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#fef9c3;border-color:#fde047;">吉数9個</span>`;
  } else if (data.systemKey === 'numerology') {
    const s = data.cultural;
    const digitSum = String(data.year).split('').reduce((a,c)=>a+parseInt(c),0) + data.month + data.day;
    chainHtml += `<span style="${boxStyle}">${data.year}-${String(data.month).padStart(2,'0')}-${String(data.day).padStart(2,'0')}</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}">∑ = ${digitSum}</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#d4fce0;border-color:#86efac;">LPN: ${s.lpn}</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#fef9c3;border-color:#fde047;">Lucky 8${lang==='ko'?'개':lang==='ja'?'個':''}</span>`;
  } else if (data.systemKey === 'jawanese') {
    const s = data.cultural;
    chainHtml += `<span style="${boxStyle}">${data.year}-${String(data.month).padStart(2,'0')}-${String(data.day).padStart(2,'0')}</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#d4fce0;border-color:#86efac;">Pasaran: ${PASARAN[s.pasaranIdx]}</span>`;
    chainHtml += `<span style="${arrowStyle}">→</span>`;
    chainHtml += `<span style="${boxStyle}background:#fef9c3;border-color:#fde047;">Angka Hoki 9</span>`;
  }
  chainHtml += '</div>';

  // Lucky pool gold balls
  const luckyNums = data.cultural.lucky || [];
  const ballS = 'display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#fff;font-weight:900;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.18);margin:2px;';
  const poolHtml = luckyNums.map(n => `<span style="${ballS}">${n}</span>`).join('');

  const luckyWord = {ko:'행운 번호',en:'Lucky',ja:'吉数',de:'Glück',fr:'Chanceux',es:'Suerte',pt:'Sorte',it:'Fortuna',id:'Hoki'};
  const otherWord = {ko:'일반 번호',en:'Others',ja:'普通の数字',de:'Andere',fr:'Autres',es:'Otros',pt:'Outros',it:'Altri',id:'Lainnya'};

  const panel = document.createElement('div');
  panel.id = 'algorithm-panel';
  panel.style.cssText = 'background:#fffbeb;border:2px solid #fde68a;border-radius:20px;padding:22px;margin-bottom:20px;';

  panel.innerHTML = `
    <div style="font-size:13px;font-weight:800;color:#92400e;letter-spacing:.5px;margin-bottom:12px;">${t('panelTitle')}</div>
    <div style="font-size:12px;color:#78350f;line-height:1.7;margin-bottom:14px;padding:12px;background:#fffde7;border-radius:10px;border:1px solid #fde68a;">
      ${ALGO.systemOrigin[data.systemKey]?.[lang] || ALGO.systemOrigin[data.systemKey]?.en || ''}
    </div>
    <div style="font-size:11px;font-weight:800;color:#b45309;letter-spacing:.5px;text-transform:uppercase;margin-bottom:2px;">${t('calcChainTitle')}</div>
    ${chainHtml}
    <div style="font-size:11px;font-weight:800;color:#b45309;letter-spacing:.5px;text-transform:uppercase;margin:12px 0 6px;">${t('luckyPoolTitle')}</div>
    <div style="margin-bottom:14px;">${poolHtml}</div>
    <div style="font-size:11px;font-weight:800;color:#b45309;letter-spacing:.5px;text-transform:uppercase;margin-bottom:8px;">${t('probabilityTitle')}</div>
    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:12px 14px;margin-bottom:12px;">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:8px;">
        <div style="text-align:center;">
          <div style="font-size:28px;font-weight:900;color:#b45309;line-height:1;">4×</div>
          <div style="font-size:10px;color:#78716c;font-weight:600;margin-top:2px;">${luckyWord[lang]||luckyWord.en}</div>
        </div>
        <div style="font-size:16px;color:#d97706;font-weight:700;">vs</div>
        <div style="text-align:center;">
          <div style="font-size:28px;font-weight:900;color:#78716c;line-height:1;">1×</div>
          <div style="font-size:10px;color:#78716c;font-weight:600;margin-top:2px;">${otherWord[lang]||otherWord.en}</div>
        </div>
      </div>
      <div style="font-size:12px;color:#78350f;line-height:1.6;">${t('probabilityDesc')}</div>
    </div>
    <div style="font-size:11px;color:#b45309;line-height:1.5;font-style:italic;">${t('disclaimer')}</div>
  `;

  const shareSection = document.querySelector('.share-section');
  if (shareSection) shareSection.before(panel);
}

// ── Detailed Reading Panel (정통 사주 / 命盤 / Birth Chart / Weton) ──────────

function renderDetailedReadingPanel(data) {
  const existing = document.getElementById('detailed-reading-panel');
  if (existing) existing.remove();

  const L = window.LUCKY_LANG || {};
  const lang = data.lang;

  const TITLE = {
    ko:'나의 사주 상세 분석', en:'My Detailed Fortune Reading', ja:'私の詳細鑑定',
    de:'Meine detaillierte Analyse', fr:'Mon analyse détaillée', es:'Mi análisis detallado',
    pt:'Minha análise detalhada', it:'La mia analisi dettagliata', id:'Analisis Detail Saya',
  };
  const title = L.catDetailTitle || TITLE[lang] || TITLE.en;

  let html = `<div style="font-size:14px;font-weight:800;color:#fbbf24;letter-spacing:.5px;margin-bottom:16px;">🔮 ${title}</div>`;

  if (data.systemKey === 'saju' && data.fullSaju) {
    html += buildSajuDetailHTML(data, lang, L);
  } else if (data.systemKey === 'kyusei') {
    html += buildKyuseiDetailHTML(data, lang, L);
  } else if (data.systemKey === 'numerology') {
    html += buildNumerologyDetailHTML(data, lang, L);
  } else if (data.systemKey === 'jawanese') {
    html += buildJawaneseDetailHTML(data, lang, L);
  }

  const panel = document.createElement('div');
  panel.id = 'detailed-reading-panel';
  panel.style.cssText = 'background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:20px;padding:22px;margin-bottom:20px;border:1px solid rgba(255,255,255,.1);';
  panel.innerHTML = html;

  const lotterySection = document.getElementById('lottery-section');
  if (lotterySection) lotterySection.before(panel);
}

function buildSajuDetailHTML(data, lang, L) {
  const s = data.cultural;
  const fj = data.fullSaju;
  const dsi = calcDayStemIdx(data.year, data.month, data.day);
  const hp = fj.hourPillar;
  const mp = fj.monthPillar;

  const cell = 'background:rgba(255,255,255,.08);border-radius:8px;padding:10px;text-align:center;';
  const lbl  = 'font-size:9px;color:#c4b5fd;font-weight:600;letter-spacing:.5px;margin-bottom:4px;';
  const main = 'font-size:16px;font-weight:800;color:#fbbf24;';
  const sub  = 'font-size:10px;color:#a5b4fc;margin-top:2px;';
  const PILLAR_LABELS = {ko:['연주(年柱)','월주(月柱)','일주(日柱)','시주(時柱)'], ja:['年柱','月柱','日柱','時柱'], en:['Year','Month','Day','Hour']};
  const pl = PILLAR_LABELS[lang] || PILLAR_LABELS.en;
  const cols = hp ? 4 : 3;

  let html = `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;margin-bottom:14px;">`;
  // 연주
  html += `<div style="${cell}"><div style="${lbl}">${pl[0]}</div><div style="${main}">${STEMS[s.stemIdx]}${BRANCHES[s.branchIdx]}</div><div style="${sub}">${STEM_KO[s.stemIdx]}${BRANCH_KO[s.branchIdx]}</div><div style="${sub}">${s.element}</div></div>`;
  // 월주
  html += `<div style="${cell}"><div style="${lbl}">${pl[1]}</div><div style="${main}">${STEMS[mp.stemIdx]}${BRANCHES[mp.branchIdx]}</div><div style="${sub}">${STEM_KO[mp.stemIdx]}${BRANCH_KO[mp.branchIdx]}</div><div style="${sub}">${mp.element}</div></div>`;
  // 일주
  html += `<div style="${cell}"><div style="${lbl}">${pl[2]}</div><div style="${main}">${STEMS[dsi]}${BRANCHES[fj.dayBranch]}</div><div style="${sub}">${STEM_KO[dsi]}${BRANCH_KO[fj.dayBranch]}</div><div style="${sub}">${ELEMENTS[dsi]}</div></div>`;
  // 시주
  if (hp) html += `<div style="${cell}"><div style="${lbl}">${pl[3]}</div><div style="${main}">${STEMS[hp.stemIdx]}${BRANCHES[hp.branchIdx]}</div><div style="${sub}">${STEM_KO[hp.stemIdx]}${BRANCH_KO[hp.branchIdx]}</div><div style="${sub}">${hp.element}</div></div>`;
  html += '</div>';

  // 오행 분포
  const cnts = fj.counts || {};
  const EC = {'木':'#4ade80','火':'#f87171','土':'#fbbf24','金':'#94a3b8','水':'#60a5fa'};
  const EL = lang === 'ja' ? {'木':'木','火':'火','土':'土','金':'金','水':'水'} : {'木':'목(木)','火':'화(火)','土':'토(土)','金':'금(金)','水':'수(水)'};
  const maxC = Math.max(...['木','火','土','金','水'].map(e => cnts[e] || 0), 1);
  const ohaengTitle = lang === 'ko' ? '오행 분포' : lang === 'ja' ? '五行バランス' : 'Five Elements';
  html += `<div style="margin-bottom:14px;"><div style="font-size:10px;font-weight:700;color:#c4b5fd;margin-bottom:8px;letter-spacing:.5px;">${ohaengTitle}</div>`;
  ['木','火','土','金','水'].forEach(el => {
    const c = cnts[el] || 0;
    html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;">
      <div style="min-width:52px;font-size:11px;color:${EC[el]};font-weight:700;">${EL[el]}</div>
      <div style="flex:1;background:rgba(255,255,255,.1);border-radius:3px;height:6px;">
        <div style="background:${EC[el]};width:${Math.round(c/maxC*100)}%;height:100%;border-radius:3px;"></div>
      </div>
      <div style="font-size:11px;color:#e0e7ff;min-width:14px;text-align:right;">${c}</div>
    </div>`;
  });
  html += '</div>';

  // 용신 / balancing element
  const ys = fj.yongsin;
  const YONGSIN = {
    '木':{ko:'나무 기운 보강 — 초록 계열, 동쪽 방향, 목요일이 오늘의 힘을 키웁니다. 새로운 시작과 성장에 집중하세요.',en:'Boost Wood energy — green tones, east direction, Thursdays. Focus on growth and new beginnings.',ja:'木気を補う — 緑系、東向き、木曜日。成長と新しいスタートに集中しましょう.'},
    '火':{ko:'불 기운 보강 — 빨강·오렌지 계열, 남쪽 방향, 화요일이 길합니다. 자신감과 소통을 늘리세요.',en:'Boost Fire energy — red/orange, south direction, Tuesdays. Build confidence and communicate more.',ja:'火気を補う — 赤・オレンジ、南向き、火曜日。自信と表現力を高めましょう。'},
    '土':{ko:'흙 기운 보강 — 노랑·황토색, 중앙, 토요일이 안정을 줍니다. 꾸준함과 재정 관리가 핵심입니다.',en:'Boost Earth energy — yellow/brown, center, Saturdays. Build consistency and manage finances.',ja:'土気を補う — 黄・土色、中央、土曜日。地道な積み重ねと財務管理が鍵。'},
    '金':{ko:'금 기운 보강 — 흰색·회색, 서쪽 방향, 금요일이 결단력을 높입니다. 분석과 정리에 집중하세요.',en:'Boost Metal energy — white/grey, west direction, Fridays. Sharpen analysis and decision-making.',ja:'金気を補う — 白・グレー、西向き、金曜日。決断力と精度を高めましょう。'},
    '水':{ko:'물 기운 보강 — 검정·파랑 계열, 북쪽 방향, 수요일이 직관을 깨웁니다. 유연한 사고를 연습하세요.',en:'Boost Water energy — black/blue, north direction, Wednesdays. Practice flexible, intuitive thinking.',ja:'水気を補う — 黒・青系、北向き、水曜日。直感と柔軟な思考を育てましょう。'},
  };
  const ysText = (YONGSIN[ys]||{})[lang] || (YONGSIN[ys]||{}).en || '';
  const ysLabel = lang === 'ko' ? '용신 (내게 필요한 에너지)' : lang === 'ja' ? '用神（必要な五行）' : 'Balancing Element';
  html += `<div style="background:rgba(255,255,255,.06);border-radius:12px;padding:12px 14px;">
    <div style="font-size:10px;font-weight:700;color:#c4b5fd;letter-spacing:.5px;margin-bottom:8px;">${ysLabel}</div>
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="width:36px;height:36px;border-radius:50%;background:${EC[ys]||'#fbbf24'};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#fff;flex-shrink:0;">${ys}</div>
      <div style="font-size:12px;color:#e0e7ff;line-height:1.65;">${ysText}</div>
    </div>
  </div>`;

  return html;
}

function buildKyuseiDetailHTML(data, lang, L) {
  const s = data.cultural;
  const mstar = data.monthKyusei || 5;
  const TRAITS = {
    1:{ja:'分析・哲学・独創性',en:'Analysis, philosophy, originality'},
    2:{ja:'安定・実直・包容力',en:'Stability, sincerity, nurturing'},
    3:{ja:'行動・革新・情熱',en:'Action, innovation, passion'},
    4:{ja:'柔軟・社交・誠実',en:'Flexibility, sociability, sincerity'},
    5:{ja:'カリスマ・変革・中心',en:'Charisma, transformation, center'},
    6:{ja:'リーダーシップ・責任・明晰',en:'Leadership, responsibility, clarity'},
    7:{ja:'魅力・コミュニケーション・楽観',en:'Charm, communication, optimism'},
    8:{ja:'勤勉・忍耐・信頼',en:'Diligence, patience, trust'},
    9:{ja:'知性・創造・表現力',en:'Intellect, creativity, expression'},
  };
  const cell = 'background:rgba(255,255,255,.08);border-radius:10px;padding:12px;text-align:center;';
  const bTrait = TRAITS[s.star]||TRAITS[5];
  const mTrait = TRAITS[mstar]||TRAITS[5];
  const tl = lang === 'ja';

  let html = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
    <div style="${cell}">
      <div style="font-size:9px;color:#c4b5fd;font-weight:700;margin-bottom:6px;">${tl?'本命星':'Life Star'}</div>
      <div style="font-size:17px;font-weight:800;color:#fbbf24;">${KYUSEI_NAMES[s.star]}</div>
      <div style="font-size:11px;color:#a5b4fc;margin-top:4px;">${KYUSEI_ELEMENTS[s.star]}行</div>
      <div style="font-size:10px;color:#e0e7ff;margin-top:5px;line-height:1.4;">${bTrait[tl?'ja':'en']}</div>
    </div>
    <div style="${cell}">
      <div style="font-size:9px;color:#c4b5fd;font-weight:700;margin-bottom:6px;">${tl?'月命星':'Month Star'}</div>
      <div style="font-size:17px;font-weight:800;color:#60a5fa;">${KYUSEI_NAMES[mstar]}</div>
      <div style="font-size:11px;color:#a5b4fc;margin-top:4px;">${KYUSEI_ELEMENTS[mstar]}行</div>
      <div style="font-size:10px;color:#e0e7ff;margin-top:5px;line-height:1.4;">${mTrait[tl?'ja':'en']}</div>
    </div>
  </div>`;

  const h = calcOhaengHarmony(KYUSEI_ELEMENTS[s.star], KYUSEI_ELEMENTS[mstar]);
  html += `<div style="background:rgba(255,255,255,.06);border-radius:10px;padding:12px;font-size:12px;color:#e0e7ff;line-height:1.7;">
    <strong style="color:#fbbf24;">${KYUSEI_ELEMENTS[s.star]} × ${KYUSEI_ELEMENTS[mstar]} ${h.emoji}</strong>
    — ${h[tl?'ja':'en']||h.en}
  </div>`;
  return html;
}

function buildNumerologyDetailHTML(data, lang, L) {
  const lpn = data.cultural.lpn;
  const sunSign = data.sunSign;
  const moonSign = data.moonSign;
  const LP_TRAITS = {
    1:{en:'The Leader — independent, driven, pioneering. You thrive when blazing your own trail.',de:'Der Anführer — unabhängig, entschlossen, bahnbrechend.',fr:'Le Leader — indépendant, déterminé, pionnier.',es:'El Líder — independiente, decidido, pionero.',pt:'O Líder — independente, determinado, pioneiro.',it:'Il Leader — indipendente, deciso, pioniere.'},
    2:{en:'The Diplomat — sensitive, cooperative, intuitive. You excel in partnerships and mediation.',de:'Der Diplomat — sensibel, kooperativ, intuitiv. Exzellent in Partnerschaften.',fr:'Le Diplomate — sensible, coopératif, intuitif.',es:'El Diplomático — sensible, cooperativo, intuitivo.',pt:'O Diplomata — sensível, cooperativo, intuitivo.',it:'Il Diplomatico — sensibile, cooperativo, intuitivo.'},
    3:{en:'The Creative — expressive, joyful, artistic. You inspire others through communication.',de:'Der Kreative — ausdrucksstark, fröhlich, künstlerisch.',fr:'Le Créatif — expressif, joyeux, artistique.',es:'El Creativo — expresivo, alegre, artístico.',pt:'O Criativo — expressivo, alegre, artístico.',it:'Il Creativo — espressivo, gioioso, artistico.'},
    4:{en:'The Builder — practical, disciplined, methodical. You create lasting systems.',de:'Der Erbauer — praktisch, diszipliniert, methodisch.',fr:'Le Bâtisseur — pratique, discipliné, méthodique.',es:'El Constructor — práctico, disciplinado, metódico.',pt:'O Construtor — prático, disciplinado, metódico.',it:'Il Costruttore — pratico, disciplinato, metodico.'},
    5:{en:'The Freedom Seeker — adventurous, versatile, progressive. Variety fuels you.',de:'Der Freiheitssucher — abenteuerlustig, vielseitig, fortschrittlich.',fr:'Le Chercheur de Liberté — aventurier, polyvalent, progressif.',es:'El Buscador de Libertad — aventurero, versátil, progresivo.',pt:'O Buscador — aventureiro, versátil, progressivo.',it:'Il Cercatore di Libertà — avventuroso, versatile, progressivo.'},
    6:{en:'The Nurturer — caring, responsible, harmonious. You bring healing and balance.',de:'Der Fürsorger — fürsorglich, verantwortungsbewusst, harmonisch.',fr:'Le Soignant — attentionné, responsable, harmonieux.',es:'El Cuidador — compasivo, responsable, armonioso.',pt:'O Cuidador — carinhoso, responsável, harmonioso.',it:'Il Curatore — premuroso, responsabile, armonioso.'},
    7:{en:'The Seeker — analytical, introspective, spiritual. You uncover deep truths through reflection.',de:'Der Sucher — analytisch, introspektiv, spirituell.',fr:'Le Chercheur — analytique, introspectif, spirituel.',es:'El Buscador — analítico, introspectivo, espiritual.',pt:'O Buscador — analítico, introspectivo, espiritual.',it:'Il Cercatore — analitico, introspettivo, spirituale.'},
    8:{en:'The Powerhouse — ambitious, strategic, authoritative. Built for leadership and achievement.',de:'Der Machtmensch — ehrgeizig, strategisch, autoritär.',fr:'Le Puissant — ambitieux, stratégique, autoritaire.',es:'El Poderoso — ambicioso, estratégico, autoritario.',pt:'O Poderoso — ambicioso, estratégico, autoritário.',it:'Il Potente — ambizioso, strategico, autorevole.'},
    9:{en:'The Humanitarian — compassionate, wise, idealistic. Here to serve the greater good.',de:'Der Humanist — mitfühlend, weise, idealistisch.',fr:'L\'Humaniste — compatissant, sage, idéaliste.',es:'El Humanitario — compasivo, sabio, idealista.',pt:'O Humanitário — compassivo, sábio, idealista.',it:'L\'Umanista — compassionevole, saggio, idealista.'},
    11:{en:'Intuitive Master — visionary, inspirational, highly sensitive. You illuminate others.',de:'Intuitiver Meister — visionär, inspirierend, hochsensibel.',fr:'Maître Intuitif — visionnaire, inspirant, très sensible.',es:'Maestro Intuitivo — visionario, inspirador, muy sensible.',pt:'Mestre Intuitivo — visionário, inspirador, altamente sensível.',it:'Maestro Intuitivo — visionario, ispirante, molto sensibile.'},
    22:{en:'Master Builder — practical visionary, disciplined creator. You manifest grand visions.',de:'Meisterbauer — praktischer Visionär, disziplinierter Schöpfer.',fr:'Grand Bâtisseur — visionnaire pratique, créateur discipliné.',es:'Gran Constructor — visionario práctico, creador disciplinado.',pt:'Grande Construtor — visionário prático, criador disciplinado.',it:'Grande Costruttore — visionario pratico, creatore disciplinato.'},
    33:{en:'Master Teacher — selfless, compassionate, creative. You elevate humanity.',de:'Meisterlehrer — selbstlos, mitfühlend, kreativ.',fr:'Maître Enseignant — altruiste, compatissant, créatif.',es:'Maestro Enseñante — altruista, compasivo, creativo.',pt:'Mestre Professor — altruísta, compassivo, criativo.',it:'Maestro Insegnante — altruistico, compassionevole, creativo.'},
  };

  const trait = (LP_TRAITS[lpn]||LP_TRAITS[9])[lang] || (LP_TRAITS[lpn]||LP_TRAITS[9]).en;
  const zodiacSymbols = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
  const zodiacNames = (L.zodiacNames)||['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  const sunLbl = L.sunSignLabel || 'Sun Sign';
  const moonLbl = L.moonSignLabel || 'Moon Sign';

  let html = `<div style="background:rgba(255,255,255,.06);border-radius:10px;padding:12px 14px;margin-bottom:12px;">
    <div style="font-size:11px;font-weight:700;color:#c4b5fd;margin-bottom:6px;letter-spacing:.5px;">Life Path ${lpn}</div>
    <div style="font-size:13px;color:#e0e7ff;line-height:1.65;">${trait}</div>
  </div>`;

  if (sunSign !== null) {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:10px 12px;text-align:center;">
        <div style="font-size:10px;color:#c4b5fd;font-weight:700;margin-bottom:4px;">${sunLbl}</div>
        <div style="font-size:26px;">${zodiacSymbols[sunSign]}</div>
        <div style="font-size:12px;color:#fbbf24;font-weight:700;">${zodiacNames[sunSign]||''}</div>
      </div>
      <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:10px 12px;text-align:center;">
        <div style="font-size:10px;color:#c4b5fd;font-weight:700;margin-bottom:4px;">${moonLbl}</div>
        <div style="font-size:26px;">${moonSign !== null ? zodiacSymbols[moonSign] : '🌙'}</div>
        <div style="font-size:12px;color:#60a5fa;font-weight:700;">${moonSign !== null ? (zodiacNames[moonSign]||'') : '—'}</div>
      </div>
    </div>`;
  }
  return html;
}

function buildJawaneseDetailHTML(data, lang, L) {
  const s = data.cultural;
  const wn = calcWetonNeptu(data.year, data.month, data.day);
  const ID_DAYS = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const dayName = ID_DAYS[wn.dow];
  const pasName = PASARAN[wn.pasIdx];
  const totN = wn.neptu;
  const dayN = WETON_DAY_NEPTU[wn.dow];
  const pasN = WETON_PAS_NEPTU[wn.pasIdx];

  const PAS_TRAIT = {
    0:{id:'Legi — aura kemakmuran dan keberuntungan alami. Anda memiliki daya tarik yang mengundang rezeki.',en:'Legi — prosperity aura and natural luck. You carry an energy that attracts abundance.'},
    1:{id:'Pahing — kekuatan dan tekad tanpa henti. Semangat juang yang tinggi menjadi keunggulan Anda.',en:'Pahing — strength and relentless determination. Your fighting spirit is your biggest advantage.'},
    2:{id:'Pon — ketenangan dan kebijaksanaan mendalam. Anda pemikir strategis dengan intuisi yang kuat.',en:'Pon — calm and deep wisdom. You are a strategic thinker with sharp intuition.'},
    3:{id:'Wage — kreativitas dan jiwa bebas. Anda penuh ide segar dan selalu mencari pengalaman baru.',en:'Wage — creativity and free spirit. You are full of fresh ideas and always seek new experiences.'},
    4:{id:'Kliwon — kepekaan spiritual yang tinggi. Anda memiliki intuisi batin dan kemampuan membaca situasi.',en:'Kliwon — high spiritual sensitivity. You possess strong inner knowing and read situations well.'},
  };
  const NEPTU_LVL = totN >= 15 ? {id:'Pemimpin alami dengan pengaruh kuat.',en:'Natural leader with strong influence.'} :
                   totN >= 12 ? {id:'Berenergi tinggi dan ambisius.',en:'High energy and ambitious.'} :
                   totN >= 9  ? {id:'Seimbang dan mudah beradaptasi.',en:'Balanced and adaptable.'} :
                                {id:'Intuitif dan sensitif terhadap lingkungan.',en:'Intuitive and sensitive to your environment.'};

  const pasTrait = (PAS_TRAIT[wn.pasIdx]||PAS_TRAIT[0])[lang==='id'?'id':'en'];
  const neptuMean = NEPTU_LVL[lang==='id'?'id':'en'];
  const wetonLbl = lang === 'id' ? 'Weton Lahir' : 'Birth Weton';
  const neptuLbl = lang === 'id' ? 'Jumlah Neptu' : 'Neptu Score';

  return `<div style="background:rgba(255,255,255,.08);border-radius:10px;padding:14px;margin-bottom:12px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
      <div>
        <div style="font-size:10px;color:#c4b5fd;font-weight:700;margin-bottom:3px;">${wetonLbl}</div>
        <div style="font-size:20px;font-weight:800;color:#fbbf24;">${dayName} ${pasName}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#c4b5fd;font-weight:700;margin-bottom:2px;">${neptuLbl}</div>
        <div style="font-size:28px;font-weight:900;color:#4ade80;">${totN}</div>
        <div style="font-size:10px;color:#a5b4fc;">(${dayN} + ${pasN})</div>
      </div>
    </div>
    <div style="font-size:12px;color:#e0e7ff;line-height:1.65;margin-bottom:6px;">${pasTrait}</div>
    <div style="font-size:11px;color:#a5b4fc;font-style:italic;">${neptuMean}</div>
  </div>`;
}

function getSytemName(key, lang) {
  const names = {
    saju:      {ko:'사주팔자',ja:'四柱推命',en:'Four Pillars',de:'Vier Säulen',fr:'Quatre Piliers',es:'Cuatro Pilares',pt:'Quatro Pilares',it:'Quattro Pilastri',id:'Empat Pilar'},
    kyusei:    {ko:'구성기학',ja:'九星気学',en:'Nine Star Ki',de:'Neun-Stern-Ki',fr:'Neuf Étoiles',es:'Nueve Estrellas',pt:'Nove Estrelas Ki',it:'Nove Stelle Ki',id:'Nine Star Ki'},
    numerology:{ko:'수비학',  ja:'数秘術',  en:'Numerology', de:'Numerologie', fr:'Numérologie',es:'Numerología',  pt:'Numerologia',    it:'Numerologia',   id:'Numerologi'},
    jawanese:  {ko:'자와력',  ja:'ジャワ暦',en:'Javanese Cal.',de:'Javanisch',  fr:'Cal. Javanais',es:'Calendario Javanés',pt:'Cal. Javanês',it:'Cal. Javanese',id:'Kalender Jawa'},
  };
  const map = names[key] || names.numerology;
  return map[lang] || map.en;
}

// ── Fortune Summary Grid (4 mini circles) ─────────────────
function renderFortuneSummaryGrid(data) {
  const el = document.getElementById('fortune-summary-grid');
  if (!el || !data.fortuneScores) return;
  const L = window.LUCKY_LANG || {};
  const S = data.fortuneScores;
  const activeCat = window.LUCKY_SELECTED_CAT || 'lucky';
  const cats = [
    { key:'love',        icon: L.catLoveIcon||'💝',        label: L.catLove||'연애운',   color:'#ec4899' },
    { key:'money',       icon: L.catMoneyIcon||'💰',       label: L.catMoney||'금전운',  color:'#d97706' },
    { key:'career',      icon: L.catCareerIcon||'💼',      label: L.catCareer||'직업운', color:'#4338ca' },
    { key:'achievement', icon: L.catAchievementIcon||'🏆', label: L.catAchievement||'성취운', color:'#7c3aed' },
  ];
  el.innerHTML = cats.map(c => {
    const s = S[c.key] || {};
    const isActive = activeCat === c.key;
    const ring = isActive ? `box-shadow:0 0 0 3px #fff,0 0 0 5px ${c.color};transform:scale(1.12);` : '';
    return `<div class="fsg-item">
      <div class="fsg-circle" style="background:${c.color};${ring}">${s.score||'—'}</div>
      <div class="fsg-label" style="${isActive?'color:#fff;font-weight:800;':''}">${c.icon} ${c.label}</div>
    </div>`;
  }).join('');
}

// ── Fortune Category Cards ─────────────────────────────────
// ── Single focused fortune card (for love/money/career/achievement mode) ─
function renderSingleFortuneCatCard(data, cat, L) {
  if (!data.fortuneScores) return;
  const S = data.fortuneScores;
  const seed = data.seed;

  const CAT_MAP = {
    love:        { icon: L.catLoveIcon||'💝',        title: L.catLove||'연애운',   color:'#ec4899', textPool: L.fortuneLove, advicePool: L.fortuneLoveAdvice, luckyPool: L.fortuneLoveLucky },
    money:       { icon: L.catMoneyIcon||'💰',       title: L.catMoney||'금전운',  color:'#d97706', textPool: L.fortuneMoney, advicePool: L.fortuneMoneyAdvice, luckyPool: L.fortuneMoneyLucky },
    career:      { icon: L.catCareerIcon||'💼',      title: L.catCareer||'직업운', color:'#4338ca', textPool: L.fortuneCareer, advicePool: L.fortuneCareerAdvice, luckyPool: L.fortuneCareerLucky },
    achievement: { icon: L.catAchievementIcon||'🏆', title: L.catAchievement||'성취운', color:'#7c3aed', textPool: L.fortuneAchievement, advicePool: L.fortuneAchievementAdvice, luckyPool: L.fortuneAchievementLucky },
  };

  const c = CAT_MAP[cat];
  if (!c) return;

  const s = S[cat] || { score: 50, level: 'mid' };
  const textArr = c.textPool ? (c.textPool[s.level] || c.textPool.mid || []) : [];
  const advArr  = c.advicePool ? (c.advicePool[s.level] || c.advicePool.mid || []) : [];
  const luckArr = c.luckyPool ? (c.luckyPool[s.level] || c.luckyPool.mid || []) : [];
  const lvLabel = s.level==='high'?(L.scoreHigh||'좋음'):s.level==='mid'?(L.scoreMid||'보통'):(L.scoreLow||'주의');
  const scoreLabel = L.scoreLabel || '점';
  const advLabel   = L.adviceLabel || '💡 조언';
  const luckyLabel = L.luckyElementLabel || '🎯 행운 요소';

  const textHtml = textArr.map(t =>
    `<p style="font-size:14px;color:var(--text2);line-height:1.85;margin-bottom:12px;">${t}</p>`
  ).join('');

  const advHtml = advArr.map(a =>
    `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;">
       <span style="color:${c.color};font-size:16px;flex-shrink:0;">›</span>
       <span style="font-size:13px;color:var(--text2);line-height:1.7;">${a}</span>
     </div>`
  ).join('');

  const luckHtml = luckArr.map(lk =>
    `<span style="background:${c.color}1a;color:${c.color};padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;margin:3px;display:inline-block;">${lk}</span>`
  ).join('');

  const html = `<div style="margin-bottom:16px;">
    <div style="background:linear-gradient(135deg,${c.color}14,${c.color}05);border:2px solid ${c.color}35;border-radius:20px;padding:24px;margin-bottom:14px;">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
        <div style="font-size:52px;line-height:1;">${c.icon}</div>
        <div style="flex:1;">
          <div style="font-size:21px;font-weight:900;color:var(--text);">${c.title}</div>
          <div style="font-size:13px;color:${c.color};font-weight:700;margin-top:4px;">${lvLabel}</div>
        </div>
        <div style="text-align:center;">
          <div style="width:70px;height:70px;border-radius:50%;background:${c.color};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;box-shadow:0 8px 22px ${c.color}55;">${s.score}</div>
          <div style="font-size:10px;color:var(--text3);margin-top:5px;font-weight:600;">${scoreLabel}</div>
        </div>
      </div>
      <div style="height:10px;background:rgba(0,0,0,.08);border-radius:5px;overflow:hidden;margin-bottom:20px;">
        <div style="height:100%;width:${s.score}%;background:linear-gradient(90deg,${c.color}bb,${c.color});border-radius:5px;"></div>
      </div>
      ${textHtml}
    </div>
    ${advArr.length ? `<div style="background:var(--card);border-radius:16px;padding:18px;margin-bottom:12px;box-shadow:var(--shadow);">
      <div style="font-size:13px;font-weight:800;color:var(--text);margin-bottom:12px;">${advLabel}</div>${advHtml}</div>` : ''}
    ${luckArr.length ? `<div style="background:var(--card);border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow);">
      <div style="font-size:13px;font-weight:800;color:var(--text);margin-bottom:10px;">${luckyLabel}</div>
      <div style="display:flex;flex-wrap:wrap;">${luckHtml}</div></div>` : ''}
  </div>`;

  const wrap = document.createElement('div');
  wrap.id = 'single-fortune-section';
  wrap.innerHTML = html;
  const shareSection = document.querySelector('.share-section');
  if (shareSection) shareSection.before(wrap);
}

function renderFortuneCategories(data, selectedCat) {
  if (!data.fortuneScores) return;
  const L = window.LUCKY_LANG || {};
  const S = data.fortuneScores;
  const lang = data.lang;
  const seed = data.seed;
  const pick = arr => arr && arr.length ? arr[seed % arr.length] : '';
  const activeCat = selectedCat || window.LUCKY_SELECTED_CAT || 'lucky';

  const cats = [
    {
      key:'love', icon: L.catLoveIcon||'💝', title: L.catLove||'연애운', color:'#ec4899',
      textPool: L.fortuneLove, advicePool: L.fortuneLoveAdvice, luckyPool: L.fortuneLoveLucky,
    },
    {
      key:'money', icon: L.catMoneyIcon||'💰', title: L.catMoney||'금전운', color:'#d97706',
      textPool: L.fortuneMoney, advicePool: L.fortuneMoneyAdvice, luckyPool: L.fortuneMoneyLucky,
    },
    {
      key:'career', icon: L.catCareerIcon||'💼', title: L.catCareer||'직업운', color:'#4338ca',
      textPool: L.fortuneCareer, advicePool: L.fortuneCareerAdvice, luckyPool: L.fortuneCareerLucky,
    },
    {
      key:'achievement', icon: L.catAchievementIcon||'🏆', title: L.catAchievement||'성취운', color:'#7c3aed',
      textPool: L.fortuneAchievement, advicePool: L.fortuneAchievementAdvice, luckyPool: L.fortuneAchievementLucky,
    },
  ];

  const scoreLabel = L.scoreLabel || '점';
  const advLabel   = L.adviceLabel || '💡 조언';
  const luckyLabel = L.luckyElementLabel || '🎯 행운 요소';

  const catKeys = ['love','money','career','achievement'];
  const isFortuneSelected = catKeys.includes(activeCat);

  let html = `<div style="margin-bottom:6px;margin-top:4px;">`;
  cats.forEach(c => {
    const s = S[c.key] || { score: 50, level: 'mid' };
    const textArr = c.textPool ? (c.textPool[s.level] || c.textPool.mid || []) : [];
    const advArr  = c.advicePool ? (c.advicePool[s.level] || c.advicePool.mid || []) : [];
    const luckArr = c.luckyPool ? (c.luckyPool[s.level] || c.luckyPool.mid || []) : [];
    const desc   = pick(textArr) || '';
    const advice = pick(advArr)  || '';
    const lucky  = pick(luckArr) || '';
    const lvLabel = s.level === 'high' ? (L.scoreHigh||'좋음') : s.level === 'mid' ? (L.scoreMid||'보통') : (L.scoreLow||'주의');
    const isActive = activeCat === c.key;
    const selectedStyle = isActive ? `box-shadow:0 0 0 3px ${c.color},var(--shadow);transform:translateY(-2px);` : '';
    const dataId = `cat-card-${c.key}`;
    html += `<div id="${dataId}" class="fortune-cat-card${isActive ? ' fortune-cat-selected' : ''}" style="--cat-color:${c.color};${selectedStyle}">
      <div class="fortune-cat-header">
        <div class="fortune-cat-icon">${c.icon}</div>
        <div>
          <div class="fortune-cat-title">${c.title}${isActive ? ' ✓' : ''}</div>
          <div class="fortune-cat-score-bar"><div class="fortune-cat-score-fill" style="width:${s.score}%"></div></div>
          <div class="fortune-cat-score-text">${s.score}${scoreLabel} · ${lvLabel}</div>
        </div>
      </div>
      ${desc ? `<div class="fortune-cat-desc">${desc}</div>` : ''}
      ${advice ? `<div class="fortune-cat-advice">${advLabel}: ${advice}</div>` : ''}
      ${lucky ? `<div class="fortune-cat-lucky">${luckyLabel}: ${lucky}</div>` : ''}
    </div>`;
  });
  html += `</div>`;

  const shareSection = document.querySelector('.share-section');
  if (!shareSection) return;
  const wrap = document.createElement('div');
  wrap.id = 'fortune-cats-section';
  wrap.innerHTML = html;
  shareSection.before(wrap);

  // Scroll to selected category card
  if (isFortuneSelected) {
    const targetCard = document.getElementById(`cat-card-${activeCat}`);
    if (targetCard) setTimeout(() => targetCard.scrollIntoView({ behavior:'smooth', block:'center' }), 300);
  }
}

// ── Lucky Tips (비책) ─────────────────────────────────────
function renderLuckyTips(data) {
  if (!data.fortuneScores) return;
  const L = window.LUCKY_LANG || {};
  const seed = data.seed;

  let tips = [];
  if (data.systemKey === 'saju' && data.fullSaju && L.tipsByElement) {
    const yong = data.fullSaju.yongsin || '木';
    const pool = L.tipsByElement[yong] || L.tipsByElement['木'] || [];
    tips = pool.slice(0, 5);
  } else if (data.systemKey === 'numerology' && data.sunSign !== null && L.tipsBySign) {
    const pool = L.tipsBySign[data.sunSign] || L.tipsBySign[0] || [];
    tips = pool.slice(0, 5);
  } else if (data.systemKey === 'jawanese' && L.tipsByPasaran) {
    const idx = data.cultural && data.cultural.pasaranIdx != null ? data.cultural.pasaranIdx : 0;
    const pool = L.tipsByPasaran[idx] || L.tipsByPasaran[0] || [];
    tips = pool.slice(0, 5);
  } else if (data.systemKey === 'kyusei' && L.tipsByKyusei) {
    const star = data.cultural ? data.cultural.star : 5;
    const pool = L.tipsByKyusei[star] || L.tipsByKyusei[5] || [];
    tips = pool.slice(0, 5);
  }

  if (!tips.length) return;

  const title = L.catTips || '운을 높이는 비책';
  const itemsHtml = tips.map((t, i) =>
    `<div class="tips-item"><div class="tips-num">${i+1}</div><div style="font-size:13px;color:#166534;line-height:1.65;">${t}</div></div>`
  ).join('');

  const div = document.createElement('div');
  div.className = 'tips-section';
  div.innerHTML = `<div style="font-size:14px;font-weight:800;color:#166534;margin-bottom:14px;">✨ ${title}</div>${itemsHtml}`;

  const catSection = document.getElementById('fortune-cats-section');
  if (catSection) catSection.appendChild(div);
  else {
    const shareSection = document.querySelector('.share-section');
    if (shareSection) shareSection.before(div);
  }
}

// ── Share Buttons ─────────────────────────────────────────
const SHARE_PLATFORMS = {
  ko: [{id:'kakao',label:'카카오톡'},{id:'band',label:'Band'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  ja: [{id:'line',label:'LINE'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  en: [{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  de: [{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  fr: [{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'twitter',label:'X (Twitter)'},{id:'copy'}],
  es: [{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  pt: [{id:'whatsapp',label:'WhatsApp'},{id:'twitter',label:'X (Twitter)'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  it: [{id:'whatsapp',label:'WhatsApp'},{id:'facebook',label:'Facebook'},{id:'copy'}],
  id: [{id:'whatsapp',label:'WhatsApp'},{id:'line',label:'LINE'},{id:'facebook',label:'Facebook'},{id:'copy'}],
};

function buildShareText(data) {
  const L = window.LUCKY_LANG || {};
  const nums = data.fmt.digits
    ? data.mainNums.join('')
    : data.mainNums.join(', ') + (data.bonusNums ? ' + ' + data.bonusNums.join(', ') : '');
  const tpl = L.shareText || '🍀 Lucky Numbers: {numbers}\nTry yours →';
  return tpl.replace('{numbers}', nums);
}

function renderShareBtns(data) {
  const lang = data.lang;
  const plats = SHARE_PLATFORMS[lang] || SHARE_PLATFORMS.en;
  const container = document.getElementById('share-btns');
  container.innerHTML = '';
  const L = window.LUCKY_LANG || {};
  const copyLabel = L.copyLabel || 'Copy';

  plats.forEach(p => {
    let btn;
    switch (p.id) {
      case 'kakao':
        btn = `<button class="share-btn kakao" onclick="doShareKakao()"><span class="sb-icon">💛</span><span>${p.label}</span></button>`;
        break;
      case 'band':
        btn = `<button class="share-btn band" onclick="doShareBand()"><span class="sb-icon">B</span><span>${p.label}</span></button>`;
        break;
      case 'twitter':
        btn = `<button class="share-btn twitter" onclick="doShareTwitter()"><span class="sb-icon">✕</span><span>${p.label}</span></button>`;
        break;
      case 'facebook':
        btn = `<button class="share-btn facebook" onclick="doShareFacebook()"><span class="sb-icon">f</span><span>${p.label}</span></button>`;
        break;
      case 'whatsapp':
        btn = `<button class="share-btn whatsapp" onclick="doShareWhatsApp()"><span class="sb-icon">💬</span><span>${p.label}</span></button>`;
        break;
      case 'line':
        btn = `<button class="share-btn line" onclick="doShareLine()"><span class="sb-icon">L</span><span>${p.label}</span></button>`;
        break;
      case 'copy':
        btn = `<button class="share-btn copy" onclick="doShareCopy(this)"><span class="sb-icon">📋</span><span>${copyLabel}</span></button>`;
        break;
    }
    if (btn) container.insertAdjacentHTML('beforeend', btn);
  });
}

function getShareUrl() {
  if (!lastResult) return location.href;
  const d = lastResult;
  return `${location.origin}${location.pathname}?lang=${d.lang}&y=${d.year}&m=${d.month}&dy=${d.day}`;
}
function getShareText() { return lastResult ? buildShareText(lastResult) : ''; }

function doShareKakao() {
  const text = getShareText();
  const url = getShareUrl();
  try {
    if (window.Kakao && Kakao.isInitialized()) {
      Kakao.Share.sendDefault({ objectType:'text', text: text + '\n' + url, link:{mobileWebUrl:url,webUrl:url} });
      return;
    }
  } catch(e){}
  window.open(`https://story.kakao.com/share?url=${encodeURIComponent(url)}`,'_blank','noopener');
}
function doShareBand() {
  const text = getShareText() + '\n' + getShareUrl();
  window.open(`https://band.us/plugin/share?body=${encodeURIComponent(text)}&route=${encodeURIComponent(getShareUrl())}`,'_blank','noopener');
}
function doShareTwitter() {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}&url=${encodeURIComponent(getShareUrl())}`,'_blank','noopener');
}
function doShareFacebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,'_blank','noopener');
}
function doShareWhatsApp() {
  const text = getShareText() + '\n' + getShareUrl();
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank','noopener');
}
function doShareLine() {
  const text = getShareText() + '\n' + getShareUrl();
  window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(text)}`,'_blank','noopener');
}
function doShareCopy(btn) {
  const text = getShareText() + '\n' + getShareUrl();
  navigator.clipboard.writeText(text).then(() => {
    const origHtml = btn.innerHTML;
    btn.innerHTML = '<span>✅</span><span>Copied!</span>';
    setTimeout(() => { btn.innerHTML = origHtml; }, 2000);
  });
}

// ── FAQ render ────────────────────────────────────────────
function renderFaq() {
  const L = window.LUCKY_LANG || {};
  const items = L.faqItems || DEFAULT_FAQ;
  const el = document.getElementById('faq-list');
  el.innerHTML = items.map(f => `
    <div class="faq-item">
      <div class="faq-q">${escHtml(f.q)}</div>
      <div class="faq-a">${escHtml(f.a)}</div>
    </div>`).join('');
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const DEFAULT_FAQ = [
  {q:'사주팔자로 어떻게 행운의 번호를 뽑나요?',a:'생년월일에서 천간지지(연주)를 추출하고 오행(목·화·토·금·수)을 분석합니다. 각 오행에는 전통적으로 배속된 행운 숫자가 있으며, 이를 기반으로 로또 6/45 형식의 번호를 생성합니다.'},
  {q:'매일 같은 번호가 나오나요?',a:'같은 생년월일이면 항상 동일한 번호가 생성됩니다. 사주팔자 분석은 태어난 날의 천간지지를 기반으로 하기 때문입니다. 물론 로또는 확률 게임이므로 당첨을 보장하지는 않습니다.'},
  {q:'이 앱을 무료로 사용할 수 있나요?',a:'네, 완전 무료입니다. 회원가입이나 개인정보 입력 없이 생년월일만 입력하면 바로 행운 번호를 받을 수 있습니다.'},
];

// ── App Flow ──────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.parent.postMessage({ type: 'lucky-resize', height: document.body.scrollHeight }, '*');
    }, 200);
  }
}

function selectSets(btn) {
  document.querySelectorAll('.sets-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

window.LUCKY_SELECTED_CAT = 'lucky';

function adaptInputForm(cat) {
  const isLucky = cat === 'lucky';
  const L = window.LUCKY_LANG || {};
  const lang = window.LUCKY_CURRENT_LANG || 'ko';

  // Show/hide lottery-only sections
  ['lottery-wrap', 'sets-wrap', 'draw-date-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isLucky ? '' : 'none';
  });

  // Birth time: always visible; auto-expand for non-lucky
  const btwrap = document.getElementById('birth-time-wrap');
  if (btwrap) btwrap.style.display = '';
  if (!isLucky) {
    const body = document.getElementById('birth-time-body');
    if (body && body.style.display === 'none') {
      body.style.display = 'block';
      const icon = document.querySelector('#birth-time-toggle .toggle-icon');
      if (icon) icon.textContent = '▼';
    }
  }

  // Generate button text
  const btn = document.getElementById('txt-btn-generate');
  if (btn) {
    if (isLucky) {
      btn.textContent = L.btnGenerate || 'Generate';
    } else {
      const IDX = {saju:1, love:2, money:3, career:4, achievement:5};
      const catLabel = ((L.catNames || [])[IDX[cat]]) || cat;
      const SUFFIX = {ko:'보기', en:'View', ja:'を見る', de:'Anzeigen', fr:'Voir', es:'Ver', pt:'Ver', it:'Vedere', id:'Lihat'};
      btn.textContent = catLabel + ' ' + (SUFFIX[lang] || '→');
    }
  }

  // Input note text
  const note = document.getElementById('txt-input-note');
  if (note) {
    if (isLucky) {
      note.textContent = L.inputNote || '';
    } else {
      const IDX = {saju:1, love:2, money:3, career:4, achievement:5};
      const catLabel = ((L.catNames || [])[IDX[cat]]) || cat;
      const SFXS = {
        ko:' 분석을 위해 생년월일을 입력하세요. 태어난 시간 추가 시 더 정확합니다.',
        en:' analysis. Enter birthdate. Adding birth hour improves accuracy.',
        ja:'の分析のため生年月日を入力してください。時刻を入力するとより精密です。',
        de:'-Analyse. Geburtsdatum eingeben. Geburtszeit verbessert die Genauigkeit.',
        fr:' — analyse. Entrez votre date de naissance. L\'heure améliore la précision.',
        es:' análisis. Ingresa tu fecha de nacimiento. La hora mejora la precisión.',
        pt:' análise. Informe a data de nascimento. A hora melhora a precisão.',
        it:' analisi. Inserisci la data di nascita. L\'ora migliora la precisione.',
        id:' analisis. Masukkan tanggal lahir. Jam lahir meningkatkan akurasi.',
      };
      note.textContent = catLabel + (SFXS[lang] || ' analysis.');
    }
  }
}

function selectCategory(cat) {
  window.LUCKY_SELECTED_CAT = cat;
  document.querySelectorAll('.cat-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  adaptInputForm(cat);
}

function startGenerate() {
  const yearEl  = document.getElementById('bday-year');
  const monthEl = document.getElementById('bday-month');
  const dayEl   = document.getElementById('bday-day');
  const year  = parseInt(yearEl.value)  || 0;
  const month = parseInt(monthEl.value) || 0;
  const day   = parseInt(dayEl.value)   || 0;
  if (!year || !month || !day || year < 1920 || year > 2009) {
    [yearEl, monthEl, dayEl].forEach(el => {
      if (!el.value) { el.classList.add('err'); setTimeout(() => el.classList.remove('err'), 1500); }
    });
    yearEl.focus();
    return;
  }
  const lotteryId = (document.getElementById('lottery-select') || {}).value || null;
  const drawYear  = parseInt((document.getElementById('draw-year')  || {}).value || 0);
  const drawMonth = parseInt((document.getElementById('draw-month') || {}).value || 0);
  const drawDay   = parseInt((document.getElementById('draw-day')   || {}).value || 0);
  const drawDateStr = (drawYear && drawMonth && drawDay)
    ? `${drawYear}-${String(drawMonth).padStart(2,'0')}-${String(drawDay).padStart(2,'0')}`
    : null;
  const birthHourRaw = (document.getElementById('birth-hour') || {}).value || '';
  const birthHour = birthHourRaw !== '' ? parseInt(birthHourRaw) : null;
  const setsCount   = parseInt((document.querySelector('.sets-btn.active') || {}).dataset?.sets || '1');

  // Update loading screen text per category
  const loadCat = window.LUCKY_SELECTED_CAT || 'lucky';
  const loadL = window.LUCKY_LANG || {};
  const loadLang = window.LUCKY_CURRENT_LANG || 'ko';
  const loadGenSub = document.getElementById('txt-gen-sub');
  if (loadGenSub) {
    if (loadCat !== 'lucky') {
      const IDX = {saju:1, love:2, money:3, career:4, achievement:5};
      const catLabel = ((loadL.catNames||[])[IDX[loadCat]]) || loadCat;
      const SFXA = {ko:'를 분석하고 있습니다…', en:' analysis in progress…', ja:'を分析しています…',
        de:' wird analysiert…', fr:' en cours d\'analyse…', es:' analizando…',
        pt:' sendo analisado…', it:' in corso di analisi…', id:' sedang dianalisis…'};
      loadGenSub.textContent = catLabel + (SFXA[loadLang] || '…');
    } else {
      loadGenSub.textContent = loadL.genSub || loadGenSub.textContent;
    }
  }

  showScreen('s-gen');
  setTimeout(() => {
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    const sets = [];
    for (let i = 0; i < setsCount; i++) {
      sets.push(generateLucky(year, month, day, lang, lotteryId, drawDateStr, i, birthHour));
    }
    lastResult = { ...sets[0], sets };
    applyLangToResults(lastResult);
    renderResults(lastResult);
    showScreen('s-result');
  }, 2400);
}

function resetApp() {
  showScreen('s-home');
}

function toggleBirthTime() {
  const body = document.getElementById('birth-time-body');
  const icon = document.querySelector('#birth-time-toggle .toggle-icon');
  if (!body) return;
  const open = body.style.display !== 'none' && body.style.display !== '';
  body.style.display = open ? 'none' : 'block';
  if (icon) icon.textContent = open ? '▶' : '▼';
}

// ── applyLang (static text updates) ──────────────────────
function applyLang() {
  const L = window.LUCKY_LANG;
  if (!L) return;
  const lang = window.LUCKY_CURRENT_LANG || 'ko';

  document.documentElement.lang = L.htmlLang || lang;
  const BDAY_PH = {
    year:  {ko:'예) 1985',en:'e.g. 1985',ja:'例) 1985',de:'z.B. 1985',fr:'ex. 1985',es:'ej. 1985',pt:'ex. 1985',it:'es. 1985',id:'cth. 1985'},
    month: {ko:'10',en:'10',ja:'10',de:'10',fr:'10',es:'10',pt:'10',it:'10',id:'10'},
    day:   {ko:'15',en:'15',ja:'15',de:'15',fr:'15',es:'15',pt:'15',it:'15',id:'15'},
  };
  const DRAW_PH = {
    year:  {ko:'연도',en:'Year', ja:'年', de:'Jahr',  fr:'Année',es:'Año', pt:'Ano', it:'Anno',  id:'Tahun'},
    month: {ko:'월',  en:'Month',ja:'月', de:'Monat', fr:'Mois', es:'Mes', pt:'Mês', it:'Mese',  id:'Bulan'},
    day:   {ko:'일',  en:'Day',  ja:'日', de:'Tag',   fr:'Jour', es:'Día', pt:'Dia', it:'Giorno',id:'Tgl'},
  };
  const setph = (id, ph) => { const el = document.getElementById(id); if (el) el.placeholder = ph; };
  setph('bday-year',  BDAY_PH.year[lang]  || 'e.g. 1985');
  setph('bday-month', BDAY_PH.month[lang] || '10');
  setph('bday-day',   BDAY_PH.day[lang]   || '15');
  setph('draw-year',  DRAW_PH.year[lang]  || 'Year');
  setph('draw-month', DRAW_PH.month[lang] || 'Month');
  setph('draw-day',   DRAW_PH.day[lang]   || 'Day');
  const hintEl = document.getElementById('date-hint');
  if (hintEl) hintEl.style.display = 'none';

  // Birth time toggle label/note
  const btLabel = document.getElementById('txt-birth-time-label');
  if (btLabel) btLabel.textContent = L.birthTimeLabel || 'Birth Time (optional)';
  const btNote = document.getElementById('txt-birth-time-note');
  if (btNote) btNote.textContent = L.birthTimeNote || '';

  // Populate birth-hour select
  const hourSel = document.getElementById('birth-hour');
  if (hourSel) {
    const placeholder = L.hourSelectPlaceholder || 'No time selected';
    const useKoJizhi = lang === 'ko' || lang === 'ja';
    const KO_JIZHI = ['자시(子)','축시(丑)','인시(寅)','묘시(卯)','진시(辰)','사시(巳)',
                       '오시(午)','미시(未)','신시(申)','유시(酉)','술시(戌)','해시(亥)'];
    const JA_JIZHI = ['子の刻(23-1時)','丑の刻(1-3時)','寅の刻(3-5時)','卯の刻(5-7時)',
                       '辰の刻(7-9時)','巳の刻(9-11時)','午の刻(11-13時)','未の刻(13-15時)',
                       '申の刻(15-17時)','酉の刻(17-19時)','戌の刻(19-21時)','亥の刻(21-23時)'];
    const currentVal = hourSel.value;
    hourSel.innerHTML = `<option value="">${placeholder}</option>`;
    if (lang === 'ko') {
      // 12 시진 (子時=23/0, 丑時=1, ...) mapped to representative hour
      const jizhiHours = [23,1,3,5,7,9,11,13,15,17,19,21];
      KO_JIZHI.forEach((label, i) => {
        const opt = document.createElement('option');
        opt.value = jizhiHours[i];
        opt.textContent = label;
        hourSel.appendChild(opt);
      });
    } else if (lang === 'ja') {
      const jizhiHours = [23,1,3,5,7,9,11,13,15,17,19,21];
      JA_JIZHI.forEach((label, i) => {
        const opt = document.createElement('option');
        opt.value = jizhiHours[i];
        opt.textContent = label;
        hourSel.appendChild(opt);
      });
    } else {
      for (let h = 0; h < 24; h++) {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = `${String(h).padStart(2,'0')}:00`;
        hourSel.appendChild(opt);
      }
    }
    if (currentVal !== '') hourSel.value = currentVal;
  }

  if (L.docTitle) document.title = L.docTitle;

  const url = lang === 'ko' ? 'https://lucky.all-lifes.com/' : `https://lucky.all-lifes.com/?lang=${lang}`;
  const ogImg = `https://lucky.all-lifes.com/og-${lang}.png`;

  function setMeta(sel, val) { const m = document.querySelector(sel); if(m&&val) m.content = val; }
  function setAttr(sel, attr, val) { const m = document.querySelector(sel); if(m&&val) m[attr] = val; }

  setMeta('meta[name="description"]', L.metaDesc);
  setMeta('meta[name="keywords"]', L.metaKeywords);
  setMeta('meta[property="og:locale"]', L.ogLocale);
  setMeta('meta[property="og:title"]', L.docTitle);
  setMeta('meta[property="og:description"]', L.metaDesc);
  setMeta('meta[property="og:image"]', ogImg);
  setMeta('meta[property="og:url"]', url);
  setMeta('meta[name="twitter:image"]', ogImg);
  setAttr('link[rel="canonical"]', 'href', url);

  function setTxt(id, val) { const el = document.getElementById(id); if(el && val) el.innerHTML = val; }
  setTxt('txt-eyebrow', L.eyebrow);
  setTxt('txt-hero-h1', L.heroH1);
  setTxt('txt-hero-sub', L.heroSub);
  setTxt('txt-birthday-label', L.birthdayLabel);
  setTxt('txt-btn-generate', L.btnGenerate);
  setTxt('txt-input-note', L.inputNote);
  setTxt('txt-gen-title', L.genTitle);
  setTxt('txt-gen-sub', L.genSub);
  setTxt('txt-result-title', L.resultTitle);
  setTxt('txt-share-title', L.shareTitle);
  setTxt('txt-share-desc', L.shareDesc);
  setTxt('txt-btn-retry', L.btnRetry);
  setTxt('txt-faq-h2', L.faqH2);
  setTxt('txt-lottery-label', L.lotteryLabel);
  setTxt('result-badge', L.resultBadge || '🍀 Lucky');
  const getLbl = k => L[k] || (UI_FALLBACKS[k] && UI_FALLBACKS[k][lang]) || '';
  setTxt('txt-lottery-select-label', getLbl('lotterySelectLabel'));
  setTxt('txt-draw-date-label', getLbl('drawDateLabel'));
  setTxt('txt-draw-date-note', L.drawDateNote);
  setTxt('txt-sets-label', getLbl('setsLabel'));

  // Category selection buttons
  const catSelectLabelEl = document.getElementById('txt-cat-select-label');
  if (catSelectLabelEl && L.catSelectLabel) catSelectLabelEl.textContent = L.catSelectLabel;
  if (L.catNames && Array.isArray(L.catNames)) {
    document.querySelectorAll('.cat-btn-label').forEach((el, i) => {
      if (L.catNames[i]) el.textContent = L.catNames[i];
    });
  }

  // Trust chips
  if (L.trustChips) {
    const chips = document.querySelectorAll('#trust-chips .trust-chip');
    L.trustChips.forEach((t, i) => { if(chips[i]) chips[i].textContent = t; });
  }

  // Method card
  setTxt('txt-method-title', L.methodTitle);
  setTxt('txt-method-desc', L.methodDesc);
  if (L.methodBadges) {
    const bds = document.querySelectorAll('#method-badges .method-badge');
    L.methodBadges.forEach((t, i) => { if(bds[i]) bds[i].textContent = t; });
  }

  // Adapt input form for current category selection
  adaptInputForm(window.LUCKY_SELECTED_CAT || 'lucky');
}

function applyLangToResults(data) {
  const L = window.LUCKY_LANG;
  if (!L) return;
}

// ── Init ──────────────────────────────────────────────────
function sendHeight() {
  window.parent.postMessage({ type: 'lucky-resize', height: document.body.scrollHeight }, '*');
}

function initLotterySelect() {
  const sel = document.getElementById('lottery-select');
  if (!sel) return;
  const lang = window.LUCKY_CURRENT_LANG || 'ko';
  const opts = LOTTERY_OPTIONS[lang] || LOTTERY_OPTIONS.en;
  sel.innerHTML = opts.map(o => `<option value="${o.id}">${o.name}</option>`).join('');

  let badge = document.getElementById('lottery-name-badge');
  if (opts.length <= 1) {
    sel.style.display = 'none';
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'lottery-name-badge';
      badge.className = 'lottery-name-badge';
      sel.insertAdjacentElement('afterend', badge);
    }
    badge.textContent = '🎫 ' + (opts[0] ? opts[0].name : '—');
    badge.style.display = '';
  } else {
    sel.style.display = '';
    if (badge) badge.style.display = 'none';
  }
}

function toggleDrawDate() {
  const btn  = document.getElementById('draw-date-toggle');
  const body = document.getElementById('draw-date-body');
  if (!btn || !body) return;
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  renderFaq();
  initLotterySelect();

  // Date hint show/hide on focus/input
  const _hint = document.getElementById('date-hint');
  if (_hint) {
    const _bdayIds = ['bday-year','bday-month','bday-day'];
    const _hasVal = () => _bdayIds.some(id => (document.getElementById(id)||{}).value);
    _bdayIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('focus', () => _hint.classList.add('hidden'));
      el.addEventListener('blur',  () => { if (!_hasVal()) _hint.classList.remove('hidden'); });
      el.addEventListener('input', () => _hint.classList.add('hidden'));
    });
  }

  // Check URL params for direct result share
  const p = new URLSearchParams(location.search);
  if (p.get('y') && p.get('m') && p.get('dy')) {
    const year = parseInt(p.get('y')), month = parseInt(p.get('m')), day = parseInt(p.get('dy'));
    if (year && month && day) {
      document.getElementById('bday-year').value  = year;
      document.getElementById('bday-month').value = month;
      document.getElementById('bday-day').value   = day;
    }
  }

  // When embedded in an iframe, min-height:100vh creates a feedback loop:
  // iframe grows → 100vh inside grows → body.scrollHeight grows → iframe grows again.
  // Fix: strip min-height from body and all screens when running inside an iframe.
  if (window.self !== window.top) {
    document.body.style.minHeight = '0';
    ['s-home', 's-gen', 's-result'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.style.minHeight = '0';
    });
  }

  // Send initial height to parent (Worker SSR iframe)
  setTimeout(sendHeight, 300);
  setTimeout(sendHeight, 800);

  // Keep reporting height on any resize (debounced to avoid rapid-fire)
  if (window.ResizeObserver && window.self !== window.top) {
    var _rTimer;
    new ResizeObserver(function() {
      clearTimeout(_rTimer);
      _rTimer = setTimeout(sendHeight, 150);
    }).observe(document.body);
  }
});
