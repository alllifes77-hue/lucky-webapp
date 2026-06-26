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
// LPN→요일 인덱스(0=일) — 전 언어가 같은 요일을 보도록 (이전엔 en만 계산되고 나머지는 일요일 고정 버그)
const LIFE_PATH_DAY_IDX = {1:0,2:1,3:3,4:6,5:5,6:5,7:1,8:6,9:2,11:1,22:6,33:3};
const DAY_NAMES_FULL = {
  ko:['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  en:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  ja:['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
  de:['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
  fr:['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  es:['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
  pt:['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'],
  it:['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
  id:['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
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

// Gregorian Julian Day Number (integer noon) — corrects ~13-day Julian formula error.
// Verified: gregJD(1900,2,20)=2415071=甲子日, gregJD(1989,10,28)=2447828=辛酉,
//           gregJD(2000,1,1)=2451545=戊午
function gregJD(year, month, day) {
  const Y = month <= 2 ? year - 1 : year;
  const M = month <= 2 ? month + 12 : month;
  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4); // Gregorian correction (B=-13 for 1900-2099)
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + day + B - 1524;
}

// 사주: Day Stem (日干) — Gregorian JD, reference JD 2415071 = 1900-02-20 = 甲子日
function calcDayStemIdx(year, month, day) {
  return ((gregJD(year, month, day) - 2415071) % 10 + 10) % 10;
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

// 사주: Day Branch (日支) — same Gregorian JD reference as calcDayStemIdx
function calcDayBranch(year, month, day) {
  return ((gregJD(year, month, day) - 2415071) % 12 + 12) % 12;
}

// 사주: Hour branch (시지) — supports exact time (hour, minute)
// 자시(子) 23:00~01:00, 축시(丑) 01:00~03:00, ..., 해시(亥) 21:00~23:00
function calcHourBranch(hour, minute) {
  const totalMin = hour * 60 + (minute || 0);
  if (totalMin >= 23 * 60 || totalMin < 60) return 0; // 子時
  return Math.floor((totalMin - 60) / 120) + 1;
}
function calcHourPillar(dayStemIdx, hour, minute) {
  const branchIdx = calcHourBranch(hour, minute || 0);
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

// Approximate sun ecliptic longitude (±1° accuracy) — fallback without Astronomy.js
// Verified: approxSunLon(1989,10,28,11) ≈ 213.6° → 戌月(195°~225°) ✓
function approxSunLon(year, month, day, hour) {
  const h = (hour != null) ? hour : 12;
  const jd = gregJD(year, month, day) + (h - 12) / 24;
  const T = (jd - 2451545) / 36525;
  const L0 = (280.46646 + 36000.76983 * T) % 360;
  const M  = ((357.52911 + 35999.05029 * T) % 360 + 360) % 360;
  const toR = x => x * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T) * Math.sin(toR(M))
          + 0.019993 * Math.sin(toR(2 * M));
  return ((L0 + C) % 360 + 360) % 360;
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

function _approxMonthBranch(year, month, day, birthHour) {
  const lon = approxSunLon(year, month, day, birthHour);
  const idx = Math.floor(((lon - 315 + 360) % 360) / 30);
  return (idx + 2) % 12;
}

function calcMonthBranchByJieqi(year, month, day, birthHour) {
  if (!window.Astronomy) return _approxMonthBranch(year, month, day, birthHour);
  try {
    const h = birthHour != null ? birthHour : 12;
    const birthMs = Date.UTC(year, month - 1, day, h, 0, 0);
    let bestBranch = _approxMonthBranch(year, month, day, birthHour), bestMs = -Infinity;
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
  } catch(e) { return _approxMonthBranch(year, month, day, birthHour); }
}

// ── 大運 (Daeun) — 10-year fortune cycles ─────────────────
// Computes angular distance (in days) from birth to the nearest jieqi
// forward=true → days to NEXT jieqi (순행); false → days since PREV jieqi (역행)
function daysToJieqiForDaeun(year, month, day, birthHour, goForward) {
  const h = birthHour != null ? birthHour : 12;
  const birthLon = approxSunLon(year, month, day, h);
  const currentBranch = _approxMonthBranch(year, month, day, h);
  const jqIdx = JIEQI_DATA.findIndex(j => j.branch === currentBranch);
  if (jqIdx < 0) return 90;
  const currentJq = JIEQI_DATA[jqIdx];
  const nextJq    = JIEQI_DATA[(jqIdx + 1) % 12];
  const DAYS_PER_DEG = 365.25 / 360;
  if (goForward) {
    return ((nextJq.lon - birthLon + 360) % 360) * DAYS_PER_DEG;
  } else {
    return ((birthLon - currentJq.lon + 360) % 360) * DAYS_PER_DEG;
  }
}

// 陽年男·陰年女 → 순행(forward); 陰年男·陽年女 → 역행
function calcDaeunData(year, month, day, birthHour, gender, yearStemIdx) {
  if (!gender) return null;
  const yearStemYin = yearStemIdx % 2 === 1;  // 乙丁己辛癸 = yin (odd index)
  const forward     = (gender === 'male') ? !yearStemYin : yearStemYin;
  const monthBranch = _approxMonthBranch(year, month, day, birthHour);
  const mp          = calcMonthPillar(yearStemIdx, month, monthBranch);
  const days        = daysToJieqiForDaeun(year, month, day, birthHour, forward);
  const totalYears  = days / 3;
  const startAge    = Math.floor(totalYears);
  const startMonths = Math.round((totalYears - startAge) * 12);
  const ageNow      = new Date().getFullYear() - year;
  const periods     = [];
  for (let i = 1; i <= 8; i++) {
    const offset = forward ? i : -i;
    const si = ((mp.stemIdx   + offset) % 10 + 10) % 10;
    const bi = ((mp.branchIdx + offset) % 12 + 12) % 12;
    const ps = startAge + (i - 1) * 10;
    const pe = startAge +  i      * 10 - 1;
    periods.push({ stemIdx: si, branchIdx: bi, element: ELEMENTS[si],
                   periodStart: ps, periodEnd: pe, isCurrent: ageNow >= ps && ageNow <= pe });
  }
  return { forward, startAge, startMonths, periods, yearStemYin, gender };
}

// ── 歲運 (Seun) — Current Year Fortune ───────────────────
function calcSeunData(d) {
  if (d.systemKey !== 'saju' || !d.fullSaju) return null;
  const cy = new Date().getFullYear();
  const si = ((cy - 4) % 10 + 10) % 10;
  const bi = ((cy - 4) % 12 + 12) % 12;
  const seunEl = ELEMENTS[si];
  const dsi = calcDayStemIdx(d.year, d.month, d.day);
  const ys  = d.fullSaju.yongsin;
  const sipsin = calcSipsinType(dsi, si);
  const LIUHAP = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  const brs = [
    {label:'年', bi: d.cultural.branchIdx},
    {label:'月', bi: d.fullSaju.monthPillar.branchIdx},
    {label:'日', bi: d.fullSaju.dayBranch},
  ];
  if (d.fullSaju.hourPillar) brs.push({label:'時', bi: d.fullSaju.hourPillar.branchIdx});
  const rels = [];
  brs.forEach(p => {
    if ((bi+6)%12===p.bi||(p.bi+6)%12===bi) rels.push({type:'冲', label:p.label, bi:p.bi});
    if (LIUHAP.some(lh=>(lh[0]===bi&&lh[1]===p.bi)||(lh[1]===bi&&lh[0]===p.bi))) rels.push({type:'合', label:p.label, bi:p.bi});
  });
  const rel = seunEl===ys?'same':OHAENG_SHENG[seunEl]===ys?'sheng':OHAENG_SHENG[ys]===seunEl?'recv':OHAENG_KE[seunEl]===ys?'ke':OHAENG_KE[ys]===seunEl?'beKe':'neutral';
  const hasChong = rels.some(r=>r.type==='冲');
  const luck = (['same','recv'].includes(rel)&&!hasChong)?'good':(['ke','beKe'].includes(rel)&&hasChong)?'bad':hasChong?'caution':['ke','beKe'].includes(rel)?'caution':'neutral';
  return { cy, si, bi, seunEl, sipsin, rels, rel, luck };
}

// ── 합충(合冲) — Inter-pillar Harmony & Conflict ───────────
function calcHapChongData(d) {
  if (d.systemKey !== 'saju' || !d.fullSaju) return null;
  const dsi = calcDayStemIdx(d.year, d.month, d.day);
  const pillars = [
    {lb:'年', si:d.cultural.stemIdx,              bi:d.cultural.branchIdx},
    {lb:'月', si:d.fullSaju.monthPillar.stemIdx,  bi:d.fullSaju.monthPillar.branchIdx},
    {lb:'日', si:dsi,                             bi:d.fullSaju.dayBranch},
  ];
  if (d.fullSaju.hourPillar) pillars.push({lb:'時', si:d.fullSaju.hourPillar.stemIdx, bi:d.fullSaju.hourPillar.branchIdx});
  const RES = [];
  const STEM_HAP = [[0,5,'土'],[1,6,'金'],[2,7,'水'],[3,8,'木'],[4,9,'火']];
  const LIUHAP   = [[0,1,'土'],[2,11,'木'],[3,10,'火'],[4,9,'金'],[5,8,'水'],[6,7,'土']];
  const SANHE    = [[8,0,4,'申子辰水局'],[11,3,7,'亥卯未木局'],[2,6,10,'寅午戌火局'],[5,9,1,'巳酉丑金局']];
  for (let i=0;i<pillars.length;i++) for (let j=i+1;j<pillars.length;j++) {
    const [a,b]=[pillars[i],pillars[j]];
    const sHap=STEM_HAP.find(p=>(p[0]===a.si&&p[1]===b.si)||(p[0]===b.si&&p[1]===a.si)||(p[0]===Math.min(a.si,b.si)&&p[1]===Math.max(a.si,b.si)));
    if (sHap) RES.push({type:'天干合',sub:`${STEMS[a.si]}${STEMS[b.si]}合${sHap[2]}`,p1:a.lb,p2:b.lb,luck:'good'});
    const lHap=LIUHAP.find(p=>(p[0]===a.bi&&p[1]===b.bi)||(p[0]===b.bi&&p[1]===a.bi));
    if (lHap) RES.push({type:'地支六合',sub:`${BRANCHES[a.bi]}${BRANCHES[b.bi]}合${lHap[2]}`,p1:a.lb,p2:b.lb,luck:'good'});
    if ((a.bi+6)%12===b.bi||(b.bi+6)%12===a.bi) RES.push({type:'地支六冲',sub:`${BRANCHES[a.bi]}${BRANCHES[b.bi]}冲`,p1:a.lb,p2:b.lb,luck:'caution'});
  }
  const brs=pillars.map(p=>p.bi);
  SANHE.forEach(([b1,b2,b3,nm])=>{
    const has=[b1,b2,b3].filter(b=>brs.includes(b));
    if (has.length===3) RES.push({type:'三合局',sub:nm,p1:'',p2:'',luck:'great'});
    else if (has.length===2) {
      const miss=[b1,b2,b3].find(b=>!brs.includes(b));
      RES.push({type:'半三合',sub:`${nm.slice(0,5)} (${BRANCHES[miss]}결여)`,p1:'',p2:'',luck:'good'});
    }
  });
  return RES.length ? RES : null;
}

// ── 신살(神殺) — Special Stars ────────────────────────────
const SANHE_GRP = [
  {members:[8,0,4], yuma:2,  dohwa:9,  hwagae:4 }, // 申子辰
  {members:[11,3,7],yuma:5,  dohwa:0,  hwagae:7 }, // 亥卯未
  {members:[2,6,10],yuma:8,  dohwa:3,  hwagae:10}, // 寅午戌
  {members:[5,9,1], yuma:11, dohwa:6,  hwagae:1 }, // 巳酉丑
];
const GONGMANG_TBL = [[10,11],[8,9],[6,7],[4,5],[2,3],[0,1]];
// 甲子旬→戌亥, 甲戌旬→申酉, 甲申旬→午未, 甲午旬→辰巳, 甲辰旬→寅卯, 甲寅旬→子丑

function calcShinsalData(d) {
  if (d.systemKey !== 'saju') return null;
  const yearBi  = d.cultural.branchIdx;
  const dsi     = calcDayStemIdx(d.year, d.month, d.day);
  const dayBi   = d.fullSaju ? d.fullSaju.dayBranch : calcDayBranch(d.year, d.month, d.day);
  const monthBi = d.fullSaju ? d.fullSaju.monthPillar.branchIdx : 0;
  const hourBi  = d.fullSaju?.hourPillar?.branchIdx ?? null;
  const allBi   = [yearBi, monthBi, dayBi, ...(hourBi!==null?[hourBi]:[])];

  const getGrp = bi => SANHE_GRP.find(g=>g.members.includes(bi));
  const found  = {dohwa:[], yuma:[], hwagae:[]};
  [getGrp(yearBi), getGrp(dayBi)].filter(Boolean).forEach(g => {
    ['dohwa','yuma','hwagae'].forEach(k => {
      if (allBi.includes(g[k]) && !found[k].includes(BRANCHES[g[k]])) found[k].push(BRANCHES[g[k]]);
    });
  });

  // 공망(空亡) — 旬空 based on day pillar's 旬
  const jdIdx = ((gregJD(d.year,d.month,d.day)-2415071)%60+60)%60;
  const gm    = GONGMANG_TBL[Math.floor(jdIdx/10)];
  const gmInChart = gm.filter(b=>allBi.includes(b));

  // 원진살 子未·丑午·寅酉·卯申·辰亥·巳戌
  const WONGIN = [[0,7],[1,6],[2,9],[3,8],[4,11],[5,10]];
  const wongin = WONGIN.filter(([b1,b2])=>allBi.includes(b1)&&allBi.includes(b2)).map(([b1,b2])=>`${BRANCHES[b1]}${BRANCHES[b2]}`);

  // 백호살 甲辰·乙未·丙戌·壬戌·戊辰·己未·庚辰·辛未
  const BAEKHO = [[0,4],[1,7],[2,10],[8,10],[4,4],[5,7],[6,4],[7,7]];
  const baekho = BAEKHO.some(([si,bi])=>si===dsi&&bi===dayBi);

  return { found, gmPair:gm.map(b=>BRANCHES[b]), gmInChart:gmInChart.map(b=>BRANCHES[b]), wongin, baekho };
}

// ── 십이운성(十二運星) — 12 Vitality Stages ──────────────────
const SIPIUNSUNG_STAGES = ['長生','沐浴','冠帶','建祿','帝旺','衰','病','死','墓','絕','胎','養'];
// 長生 branch for each stem: 甲=亥(11),乙=午(6),丙=寅(2),丁=酉(9),戊=寅(2),己=酉(9),庚=巳(5),辛=子(0),壬=申(8),癸=卯(3)
const SIPIUNSUNG_START  = [11,6,2,9,2,9,5,0,8,3];
const SIPIUNSUNG_META   = {
  '長生':{icon:'🌱',lv:2,ko:'생명력이 넘치는 시작 에너지. 새 출발·성장에 최적.',              en:'Long Life — Vibrant start, full potential',      ja:'長生 — 活発な生命力。成長に最適'},
  '沐浴':{icon:'💧',lv:1,ko:'순수·감수성 예민. 천부적 매력과 예술성이 뛰어남.',               en:'Bath — Pure, artistic, magnetic charm',          ja:'沐浴 — 純粋で感受性豊か。芸術・異性運'},
  '冠帶':{icon:'👑',lv:2,ko:'능력을 인정받는 성장기. 사교성·야망·발전 에너지.',               en:'Crown — Ambitious, socially recognized',         ja:'冠帯 — 社交性・野心が強い成長期'},
  '建祿':{icon:'💪',lv:3,ko:'자립·독립 에너지 최강. 전문성과 자존심이 탁월.',                en:'Prosperity — Peak independence & expertise',    ja:'建禄 — 自立・独立エネルギー最強'},
  '帝旺':{icon:'👸',lv:3,ko:'생명력 절정. 지도력·권위·결단력이 탁월한 전성기.',              en:'Emperor — Peak vitality & leadership',           ja:'帝旺 — 生命力絶頂。権威・決断力最高'},
  '衰':  {icon:'🍂',lv:1,ko:'원숙함과 지혜로 전환. 내면의 깊이와 사려 깊음.',                en:'Decline — Mature wisdom, thoughtful',            ja:'衰 — 円熟・知恵へ転換。思慮深さが特徴'},
  '病':  {icon:'🌂',lv:0,ko:'예민한 감수성·예술성. 건강 관리와 신중한 판단이 중요.',          en:'Illness — Sensitive & artistic; care needed',   ja:'病 — 繊細な感受性。健康管理・慎重さ重要'},
  '死':  {icon:'🌙',lv:0,ko:'철학·학문·신앙에서 탁월. 내면 집중과 정신적 깊이.',             en:'Death — Philosophical depth & inner focus',     ja:'死 — 哲学・学問に優れた内面集中'},
  '墓':  {icon:'🗃',lv:1,ko:'깊은 통찰력과 축적 능력. 재물 관리가 뛰어나고 신중함.',          en:'Vault — Deep insight & good accumulation',      ja:'墓 — 深い洞察力・秘密主義。財の蓄積'},
  '絕':  {icon:'🌌',lv:1,ko:'완전한 전환점. 과감한 변화와 혁신을 추구.',                     en:'Void — Radical transformation & innovation',    ja:'絶 — 完全な転換点。大胆な変化・革新'},
  '胎':  {icon:'🥚',lv:1,ko:'새 생명 잉태. 창의적 잠재력과 무한한 가능성.',                  en:'Embryo — Boundless creative potential',         ja:'胎 — 創造的潜在力。無限の可能性'},
  '養':  {icon:'🌺',lv:1,ko:'성장을 위한 준비기. 배움과 보살핌 속에 도약 준비.',              en:'Nourish — Learning & preparing for growth',     ja:'養 — 学び・育みの中で飛躍準備'},
};

// 양간 순행, 음간 역행 from their respective 長生 branches
function calcSipiunsung(stemIdx, branchIdx) {
  const start = SIPIUNSUNG_START[stemIdx];
  const isYin = stemIdx % 2 === 1;
  const stage = isYin ? (start - branchIdx + 12) % 12 : (branchIdx - start + 12) % 12;
  return { stage, name: SIPIUNSUNG_STAGES[stage] };
}

function calcSipiunsungData(d) {
  if (d.systemKey !== 'saju' || !d.fullSaju) return null;
  const dsi = calcDayStemIdx(d.year, d.month, d.day);
  const fj  = d.fullSaju;
  const pillars = [
    {lbl:'年', gz:STEMS[d.cultural.stemIdx]+BRANCHES[d.cultural.branchIdx], bi:d.cultural.branchIdx},
    {lbl:'月', gz:STEMS[fj.monthPillar.stemIdx]+BRANCHES[fj.monthPillar.branchIdx], bi:fj.monthPillar.branchIdx},
    {lbl:'日', gz:STEMS[dsi]+BRANCHES[fj.dayBranch], bi:fj.dayBranch, isDay:true},
  ];
  if (fj.hourPillar) pillars.push({lbl:'時', gz:STEMS[fj.hourPillar.stemIdx]+BRANCHES[fj.hourPillar.branchIdx], bi:fj.hourPillar.branchIdx});
  return pillars.map(p => {
    const siu = calcSipiunsung(dsi, p.bi);
    return { ...p, siu, meta: SIPIUNSUNG_META[siu.name] || {} };
  });
}

// ── 일주론(日柱論) — 60-pillar day-pillar archetypes ─────────
// Format: [archetype, personality_ko (2 sentences), career_ko, love_ko]
// Index = 60-cycle position (甲子=0 … 癸亥=59)
const ILJURON_60 = [
['甲子·沐浴','순수한 매력과 예민한 감수성. 이성을 끌어당기는 천부적 매력과 예술적 재능을 가진 자유로운 지식인.','문화·예술·방송·교육','자유롭고 매력적; 이성운 강함'],
['乙丑·衰','안정을 추구하는 성숙한 현실형. 꾸준한 인내와 원숙한 지혜로 목표를 달성하는 신뢰형.','부동산·금융·농업·식품','신중하고 헌신적인 사랑'],
['丙寅·長生','넘치는 생명력과 밝은 카리스마. 성장 지향적이고 사교성이 탁월한 자연 리더형.','교육·경영·연예·영업','열정적이고 솔직한 사랑'],
['丁卯·病','예민한 감수성과 깊은 예술성. 섬세한 직관력을 가진 창의형; 병지로 건강 기복 주의.','예술·디자인·상담·연구','로맨틱하고 이상적인 사랑'],
['戊辰·冠帶','성장하며 능력을 인정받는 대범한 실용가. 웅장한 스케일과 강한 책임감으로 큰 목표 전진.','건설·부동산·금융·정치','안정 지향적이고 믿음직한 사랑'],
['己巳·帝旺','현실 에너지 절정의 온화한 강자. 봉사 정신과 포용력이 뛰어나며 실용적 지혜로 안정 성취.','교육·의료·서비스·행정','헌신적이고 가정적인 사랑'],
['庚午·沐浴','강렬한 에너지와 이성을 끌어당기는 매력. 활동적이고 화려함 추구; 목욕지 이성운 강함.','연예·스포츠·군사·경영','열정적이고 강한 이성 매력'],
['辛未·衰','세련된 감각과 원숙한 인내심. 꼼꼼하고 철저한 완벽주의자; 미적 안목이 탁월한 전략가.','패션·미용·예술·서비스','꼼꼼하고 배려 깊은 사랑'],
['壬申·長生','생명력 넘치는 지적 탐구자. 빠른 판단과 실행력으로 새 분야를 개척하는 다재다능한 리더.','법조·IT·외교·미디어','자유롭고 지적인 사랑'],
['癸酉·病','예리한 직관과 섬세한 분석력. 병지의 예민함으로 뛰어난 전문성 발휘; 깊은 사고형.','의학·분석·연구·금융','선택적이고 까다로운 사랑'],
['甲戌·養','포용력과 실용성의 성장형 리더. 오랜 준비 끝에 큰 성취를 이루는 외유내강 인물.','경영·부동산·교육·종교','진지하고 현실적인 사랑'],
['乙亥·死','자유로운 영혼과 깊은 철학성. 내면이 풍부하고 예술적 영감이 가득한 정신 깊이형.','예술·문학·종교·교육','매력적이고 자유로운 사랑'],
['丙子·胎','무한한 창의적 잠재력. 새로운 아이디어와 비전이 넘치는 미래 지향적 도전형.','방송·IT·창업·문화','설레고 새로운 사랑'],
['丁丑·墓','깊은 통찰력과 신중한 보수형. 묘지의 기운으로 재물 축적 능력 탁월; 내면이 깊고 풍부.','연구·금융·의료·종교','차분하고 성실한 사랑'],
['戊寅·長生','강한 생명력과 넘치는 포부. 든든한 신뢰형 실행가; 장생의 에너지로 도전 정신이 강함.','정치·건설·기업·군사','열정적이고 주도적인 사랑'],
['己卯·病','온화함 속의 내면 깊이. 병지의 섬세함으로 뛰어난 감수성과 공감 능력을 가진 인내형.','교육·심리·환경·식품','부드럽고 섬세한 사랑'],
['庚辰·養','계획적 성장의 전략형 조직가. 양지의 준비성으로 강한 추진력과 체계적 목표 달성.','금융·행정·군사·건설','현실적이고 안정적인 사랑'],
['辛巳·死','세련된 완벽주의와 내면의 깊이. 사지의 정신적 집중으로 전문 분야에서 독보적 성취.','금융·의학·법조·디자인','품위 있고 이상적인 사랑'],
['壬午·胎','비전이 넘치는 창의적 개척형. 태지의 잠재력으로 새로운 세계를 만들어가는 상상력 소유자.','문화·예술·경영·방송','열정적이고 매력적인 사랑'],
['癸未·墓','섬세한 감수성과 깊은 내공. 묘지의 특성으로 지속적 성장; 예술적 감각과 치유력 탁월.','심리·의료·예술·종교','따뜻하고 헌신적인 사랑'],
['甲申·絕','기존 틀을 깨는 혁신적 도전자. 절지의 에너지로 과감한 변화 추구; 지적 호기심과 자유 기질.','연구·기술·창업·외교','자유롭고 독립적인 사랑'],
['乙酉·絕','독특한 개성과 완벽주의 기질. 절지의 변화 에너지로 자신만의 스타일 구축; 날카로운 미적 감각.','예술·IT·패션·연구','선택적이고 독창적인 사랑'],
['丙戌·墓','깊은 통찰력의 전략가. 묘지의 기운으로 축적된 지혜와 장기적 안목으로 표면 이면을 꿰뚫음.','전략·금융·종교·철학','신중하고 깊이 있는 사랑'],
['丁亥·胎','신비로운 감수성과 창의적 잠재력. 태지의 새로운 시작 에너지로 정신 세계가 깊고 예술적.','예술·종교·의학·연구','깊고 신비로운 사랑'],
['戊子·胎','강한 잠재력의 도전적 개척형. 태지의 무한한 가능성으로 새 분야를 끊임없이 탐색하는 성장형.','경영·IT·창업·건설','열정적이고 주도적인 사랑'],
['己丑·墓','인내심 최강의 축적형 전략가. 묘지의 보수성으로 보이지 않는 곳에서 착실히 준비; 재물 관리 탁월.','금융·부동산·농업·행정','신중하고 책임감 있는 사랑'],
['庚寅·絕','혁신적 도전 정신의 개혁 리더. 절지의 에너지로 기존 틀을 깨는 과감함; 강한 의지와 독립심.','정치·군사·창업·기술','자유롭고 주도적인 사랑'],
['辛卯·絕','독보적 전문성의 독특한 완벽주의자. 절지로 자신만의 독자적 길 구축; 날카롭고 엘리트 의식 강함.','의학·법조·분석·예술','이상적이고 완벽한 사랑'],
['壬辰·墓','깊은 내공의 전략적 비전가. 묘지의 축적력으로 넓은 세계관과 포용력; 장기 전략의 달인.','외교·경영·연구·문화','지적이고 포용적인 사랑'],
['癸巳·胎','직관적 비전의 새로운 시작형. 태지의 에너지로 창의적 가능성이 넘침; 감수성과 변화에 강함.','창작·방송·심리·외교','감성적이고 직관적인 사랑'],
['甲午·死','외강내유의 깊은 사색형. 사지의 정신적 깊이로 철학과 학문 탁월; 역경을 통해 더욱 빛나는 인물.','철학·정치·종교·교육','헌신적이나 이해받길 원함'],
['乙未·養','온화하고 세련된 봉사형. 양지의 성장력으로 끊임없이 발전; 배려심과 인내심이 최강.','의료·복지·예술·서비스','따뜻하고 가정적인 사랑'],
['丙申·病','화려하나 복잡한 내면. 병지의 예민한 감수성으로 창의적이고 변화 추구; 예상치 못한 발상으로 주목.','예술·미디어·IT·여행','자유롭고 변화 무쌍한 사랑'],
['丁酉·長生','세련된 카리스마와 장생의 생명력. 강한 리더십과 예술적 감각의 완벽한 조화; 매력과 능력 동시 발휘.','예술·의학·금융·연구','품위 있고 당당한 사랑'],
['戊戌·墓','깊은 내공의 실용적 현실형. 묘지의 풍부한 경험 축적으로 안정과 신뢰 구축; 신중하고 책임감 핵심.','경영·부동산·종교·행정','신중하고 깊이 있는 사랑'],
['己亥·胎','창의적 잠재력의 온화한 봉사형. 태지의 무한 가능성으로 끊임없이 새로운 방향 탐색; 포용력 강함.','교육·복지·문화·환경','따뜻하고 포용적인 사랑'],
['庚子·死','강철 의지와 깊은 철학. 사지의 정신적 깊이로 겉은 강하나 내면은 사색형; 독자적 철학을 가짐.','군사·정치·연구·법조','진지하고 독립적인 사랑'],
['辛丑·養','완벽한 준비와 인내의 성장형. 양지의 착실한 성장으로 실력 축적; 신뢰와 완성도 추구.','금융·의학·행정·분석','성실하고 책임감 있는 사랑'],
['壬寅·病','창의적 도전과 예민한 감수성. 병지의 내면 복잡성으로 깊은 창의력 발휘; 대담한 비전과 강인한 도전.','법조·외교·창업·IT','자유롭고 비전 있는 사랑'],
['癸卯·長生','장생의 생명력과 자연스러운 친화력. 새 시작에 강하고 직관이 풍부; 탁월한 소통과 창의력.','창작·심리·의료·교육','자연스럽고 친화적인 사랑'],
['甲辰·衰','원숙한 야망과 다양한 재능. 쇠지의 안정감으로 목표를 향해 균형 잡힌 전진; 사교성과 포용력.','경영·정치·교육·문화','진취적이고 균형 잡힌 사랑'],
['乙巳·沐浴','화려한 매력과 창의적 표현력. 목욕지의 강한 이성 매력으로 대인관계가 풍부; 예술적 재능 탁월.','예술·방송·패션·교육','매력적이고 화려한 사랑'],
['丙午·帝旺','카리스마와 지도력의 절정. 제왕지의 최강 에너지로 밝고 강렬하게 주변을 이끄는 중심 인물.','정치·경영·연예·교육','열정적이고 중심적인 사랑'],
['丁未·冠帶','성장하는 따뜻한 예술형. 관대지의 사교성과 깊은 감수성으로 주변을 돌봄; 공감 능력이 탁월.','예술·상담·교육·의료','따뜻하고 공감적인 사랑'],
['戊申·病','끊임없는 도전과 다재다능함. 병지의 변화 에너지로 새로운 분야를 계속 탐색하는 창의적 해결사.','건설·IT·경영·군사','활동적이고 자유로운 사랑'],
['己酉·長生','장생의 활력과 세밀한 완벽주의. 현실 감각이 뛰어난 전문가형; 안정적 성취와 꾸준한 성장 추구.','행정·의료·금융·교육','섬세하고 신중한 사랑'],
['庚戌·衰','원숙한 의지의 전략형 실행가. 쇠지의 안정적 에너지로 오랜 준비 끝에 큰 성취; 근면 성실한 강자.','군사·경영·건설·법조','진지하고 책임감 있는 사랑'],
['辛亥·沐浴','섬세하고 독특한 감수성. 목욕지의 예민함으로 개성 강하고 이성 매력 탁월; 예상치 못한 변화에 강함.','연구·예술·의학·IT','자유롭고 독창적인 사랑'],
['壬子·帝旺','지성과 통찰력의 절정. 제왕지의 최강 壬水로 깊은 기억력과 뛰어난 분석력; 비전이 남다른 지도자.','학문·외교·금융·IT','지적이고 깊이 있는 사랑'],
['癸丑·冠帶','침착하고 성장하는 축적형. 관대지의 인정받는 에너지로 착실히 실력 축적; 인내심과 집중력 탁월.','학문·금융·부동산·행정','성실하고 꾸준한 사랑'],
['甲寅·建祿','건록의 강한 독립심과 자존감. 자기 길을 스스로 개척하는 자립형 리더; 용기와 추진력의 소유자.','창업·정치·군사·스포츠','자유롭고 주도적인 사랑'],
['乙卯·建祿','자연스러운 매력과 건록의 탁월한 에너지. 소통력이 풍부하고 예술성 뛰어남; 이상적인 인간관계 형성.','예술·외교·교육·방송','자연스럽고 매력적인 사랑'],
['丙辰·冠帶','화려한 야망과 관대의 성장 에너지. 창의적이고 큰 무대를 지향하는 도전형; 사교성과 카리스마 겸비.','경영·정치·연예·문화','열정적이고 당당한 사랑'],
['丁巳·帝旺','예술성과 전문성의 절정. 제왕지의 丁火로 독보적 전문성과 강한 자부심; 자기 분야에서 최고 달성.','의학·예술·금융·연구','까다롭지만 헌신적인 사랑'],
['戊午·帝旺','중심을 잡는 넘치는 에너지. 제왕지의 강한 리더십과 실행력; 뜨거운 열정과 든든한 책임감의 소유자.','경영·정치·건설·교육','열정적이고 책임감 강한 사랑'],
['己未·冠帶','원숙하고 포용력 있는 봉사형. 관대지의 에너지로 조용히 사람을 이끄는 성숙한 관리자형.','교육·복지·행정·종교','따뜻하고 성숙한 사랑'],
['庚申·建祿','건록 최강의 독립심과 자존감. 타협 없는 완벽한 자기 실현 추구; 강렬하고 독보적인 강자 유형.','군사·경영·법조·스포츠','강인하고 자유로운 사랑'],
['辛酉·建祿','예리한 완벽주의의 정점. 건록의 辛金으로 독보적 전문성 발휘; 세련되고 엄격한 기준의 소유자.','의학·금융·연구·예술','완벽하고 선택적인 사랑'],
['壬戌·冠帶','깊은 내공의 전략적 성장형. 관대지의 壬水로 뛰어난 통찰력과 포용적 세계관; 장기 전략의 달인.','외교·전략·종교·금융','깊고 신중한 사랑'],
['癸亥·帝旺','무한한 직관과 제왕의 포용력. 가장 깊고 넓은 내면 세계를 가진 영적 지도자형; 신비로운 카리스마.','종교·심리·예술·의학','깊고 신비로운 사랑'],
];

function calcIljuronData(d) {
  if (d.systemKey !== 'saju' || !d.fullSaju) return null;
  const dsi = calcDayStemIdx(d.year, d.month, d.day);
  const dbi = d.fullSaju.dayBranch;
  let cycleIdx = -1;
  for (let n = 0; n < 60; n++) { if (n%10===dsi && n%12===dbi) { cycleIdx=n; break; } }
  if (cycleIdx < 0) return null;
  const e = ILJURON_60[cycleIdx];
  if (!e) return null;
  const siu = calcSipiunsung(dsi, dbi);
  return { ganzhi:STEMS[dsi]+BRANCHES[dbi], dsi, dbi, cycleIdx, name:e[0], personality:e[1], career:e[2], love:e[3], sipiunsung:siu };
}

// ── 월운(月運) — Current Month Fortune ──────────────────────
function calcWoluunData(d) {
  if (d.systemKey !== 'saju' || !d.fullSaju) return null;
  const now = new Date();
  const cy = now.getFullYear(), cm = now.getMonth() + 1;
  const yearSi = ((cy - 4) % 10 + 10) % 10;
  const monthBranch = MONTH_BRANCHES[cm - 1];
  const mp = calcMonthPillar(yearSi, cm, monthBranch);
  const dsi = calcDayStemIdx(d.year, d.month, d.day);
  const sipsin = calcSipsinType(dsi, mp.stemIdx);
  const seunEl = mp.element;
  const ys = d.fullSaju.yongsin;
  const rel = seunEl===ys?'same':OHAENG_SHENG[seunEl]===ys?'sheng':OHAENG_SHENG[ys]===seunEl?'recv':OHAENG_KE[seunEl]===ys?'ke':OHAENG_KE[ys]===seunEl?'beKe':'neutral';
  const allBi = [d.cultural.branchIdx, d.fullSaju.monthPillar.branchIdx, d.fullSaju.dayBranch];
  if (d.fullSaju.hourPillar) allBi.push(d.fullSaju.hourPillar.branchIdx);
  const LIUHAP = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  const rels = [];
  allBi.forEach((bi, i) => {
    const lb = ['年','月','日','時'][i];
    if ((monthBranch+6)%12===bi||(bi+6)%12===monthBranch) rels.push({type:'冲', label:lb, bi});
    if (LIUHAP.some(lh=>(lh[0]===monthBranch&&lh[1]===bi)||(lh[1]===monthBranch&&lh[0]===bi))) rels.push({type:'合', label:lb, bi});
  });
  const hasChong = rels.some(r=>r.type==='冲');
  const luck = (['same','recv'].includes(rel)&&!hasChong)?'good':(['ke','beKe'].includes(rel)&&hasChong)?'bad':hasChong?'caution':['ke','beKe'].includes(rel)?'caution':'neutral';
  return { cy, cm, si:mp.stemIdx, bi:monthBranch, element:mp.element, sipsin, rel, rels, luck, ganzhi:STEMS[mp.stemIdx]+BRANCHES[monthBranch] };
}

// ── 궁합(相性) — Two-person Compatibility ────────────────────
function calcGunghapData(dA, dB) {
  if (!dA || !dB) return null;
  // 비ko 시스템(kyusei/numerology/jawanese)에서도 연주(年柱)를 생년에서 직접 계산해 궁합 산출
  // (이전엔 saju 외 systemKey면 null 반환 → 8개 언어에서 궁합 결과가 아예 안 나오던 버그)
  const _yStem = (d) => (d.cultural && d.cultural.stemIdx != null) ? d.cultural.stemIdx : (((d.year - 4) % 10) + 10) % 10;
  const _yEl   = (d) => (d.cultural && d.cultural.element) ? d.cultural.element : ELEMENTS[_yStem(d)];
  const el1 = _yEl(dA), el2 = _yEl(dB);
  const yearElScore = calcOhaengCompat(el1, el2);
  const db1 = dA.fullSaju ? dA.fullSaju.dayBranch : calcDayBranch(dA.year, dA.month, dA.day);
  const db2 = dB.fullSaju ? dB.fullSaju.dayBranch : calcDayBranch(dB.year, dB.month, dB.day);
  const ds1 = calcDayStemIdx(dA.year, dA.month, dA.day);
  const ds2 = calcDayStemIdx(dB.year, dB.month, dB.day);
  const de1 = ELEMENTS[ds1], de2 = ELEMENTS[ds2];
  const dayElScore = calcOhaengCompat(de1, de2);
  const LIUHAP6 = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  const SANHE3  = [[8,0,4],[11,3,7],[2,6,10],[5,9,1]];
  const STEM_HAP5 = [[0,5],[1,6],[2,7],[3,8],[4,9]];
  let dayBiScore = 60, dayBiType = '';
  if (LIUHAP6.some(p=>(p[0]===db1&&p[1]===db2)||(p[1]===db1&&p[0]===db2))) { dayBiScore=88; dayBiType='六合'; }
  else if ((db1+6)%12===db2||(db2+6)%12===db1) { dayBiScore=30; dayBiType='六冲'; }
  else if (SANHE3.some(g=>g.includes(db1)&&g.includes(db2))) { dayBiScore=82; dayBiType='三合'; }
  const stemHap = STEM_HAP5.find(p=>(p[0]===ds1&&p[1]===ds2)||(p[1]===ds1&&p[0]===ds2));
  const stemHapScore = stemHap ? 85 : 60;
  const sipsinAtoB = calcSipsinType(ds1, _yStem(dB));
  const sipsinBtoA = calcSipsinType(ds2, _yStem(dA));
  const overall = Math.round(yearElScore*0.25 + dayElScore*0.30 + dayBiScore*0.30 + stemHapScore*0.15);
  const compat = overall>=80?'great':overall>=65?'good':overall>=45?'fair':'challenging';
  return { el1, el2, de1, de2, yearElScore, dayElScore, db1, db2, ds1, ds2, dayBiScore, dayBiType, stemHap, stemHapScore, sipsinAtoB, sipsinBtoA, overall, compat };
}

// ── 六曜 (Rokuyo) ── 음력 근사 계산, ja 専用 ──────────────
const LUNAR_EPOCH_JD = 2451563; // 2000-02-05 = 음력 正月初一
const SYNODIC_MONTH  = 29.530588853;

function getLunarApprox(y, m, d) {
  const jd = gregJD(y, m, d);
  const elapsed = jd - LUNAR_EPOCH_JD;
  const monthsElapsed = Math.floor(elapsed / SYNODIC_MONTH);
  const lunarDay = Math.floor(elapsed - monthsElapsed * SYNODIC_MONTH) + 1;
  const lunarMonth = ((monthsElapsed % 12) + 12) % 12 + 1;
  return { lunarMonth, lunarDay };
}
// 0=先勝 1=友引 2=先負 3=仏滅 4=大安 5=赤口
function getRokuyo(y, m, d) {
  const { lunarMonth, lunarDay } = getLunarApprox(y, m, d);
  return (lunarMonth + lunarDay) % 6;
}

// ── 십이지(十二支) Chinese Zodiac + 오늘의 기운 ─────────────
const _CZ_KEYS=['monkey','rooster','dog','pig','rat','ox','tiger','rabbit','dragon','snake','horse','goat'];
const _CZ_EMJ={monkey:'🐵',rooster:'🐔',dog:'🐶',pig:'🐷',rat:'🐭',ox:'🐮',tiger:'🐯',rabbit:'🐰',dragon:'🐲',snake:'🐍',horse:'🐴',goat:'🐑'};
const _CZ_KO={monkey:'원숭이띠',rooster:'닭띠',dog:'개띠',pig:'돼지띠',rat:'쥐띠',ox:'소띠',tiger:'호랑이띠',rabbit:'토끼띠',dragon:'용띠',snake:'뱀띠',horse:'말띠',goat:'양띠'};
const _CZ_JA={monkey:'申年生',rooster:'酉年生',dog:'戌年生',pig:'亥年生',rat:'子年生',ox:'丑年生',tiger:'寅年生',rabbit:'卯年生',dragon:'辰年生',snake:'巳年生',horse:'午年生',goat:'未年生'};
const _CZ_EN={monkey:'Monkey',rooster:'Rooster',dog:'Dog',pig:'Pig',rat:'Rat',ox:'Ox',tiger:'Tiger',rabbit:'Rabbit',dragon:'Dragon',snake:'Snake',horse:'Horse',goat:'Goat'};
const _CZ_ID={monkey:'Monyet',rooster:'Ayam',dog:'Anjing',pig:'Babi',rat:'Tikus',ox:'Kerbau',tiger:'Macan',rabbit:'Kelinci',dragon:'Naga',snake:'Ular',horse:'Kuda',goat:'Kambing'};
const _CZ_DE={monkey:'Affe',rooster:'Hahn',dog:'Hund',pig:'Schwein',rat:'Ratte',ox:'Büffel',tiger:'Tiger',rabbit:'Hase',dragon:'Drache',snake:'Schlange',horse:'Pferd',goat:'Ziege'};
const _CZ_FR={monkey:'Singe',rooster:'Coq',dog:'Chien',pig:'Cochon',rat:'Rat',ox:'Buffle',tiger:'Tigre',rabbit:'Lapin',dragon:'Dragon',snake:'Serpent',horse:'Cheval',goat:'Chèvre'};
const _CZ_ES={monkey:'Mono',rooster:'Gallo',dog:'Perro',pig:'Cerdo',rat:'Rata',ox:'Búfalo',tiger:'Tigre',rabbit:'Conejo',dragon:'Dragón',snake:'Serpiente',horse:'Caballo',goat:'Cabra'};
const _CZ_PT={monkey:'Macaco',rooster:'Galo',dog:'Cão',pig:'Porco',rat:'Rato',ox:'Búfalo',tiger:'Tigre',rabbit:'Coelho',dragon:'Dragão',snake:'Serpente',horse:'Cavalo',goat:'Cabra'};
const _CZ_IT={monkey:'Scimmia',rooster:'Gallo',dog:'Cane',pig:'Maiale',rat:'Topo',ox:'Bufalo',tiger:'Tigre',rabbit:'Coniglio',dragon:'Drago',snake:'Serpente',horse:'Cavallo',goat:'Capra'};
const _CZ_NAME_MAPS={ko:_CZ_KO,ja:_CZ_JA,id:_CZ_ID,de:_CZ_DE,fr:_CZ_FR,es:_CZ_ES,pt:_CZ_PT,it:_CZ_IT,en:_CZ_EN};
function _getCZKey(y){return _CZ_KEYS[((y%12)+12)%12];}
function _getCZName(y,lang){const k=_getCZKey(y);return (_CZ_NAME_MAPS[lang]||_CZ_EN)[k];}
function _getCZBirthYears(y){const ys=[];let s=y;while(s>1951)s-=12;while(s<1951)s+=12;while(s<=2020){ys.push(s);s+=12;}return ys;}
function _getMoonPhase(){
  const t=new Date();const jd=gregJD(t.getFullYear(),t.getMonth()+1,t.getDate());
  const p=((jd-2451563)%29.530588853+29.530588853)%29.530588853/29.530588853;
  if(p<0.03||p>0.97)return{icon:'🌑',key:'new'};
  if(p<0.22)return{icon:'🌒',key:'waxing_crescent'};
  if(p<0.28)return{icon:'🌓',key:'first_quarter'};
  if(p<0.47)return{icon:'🌔',key:'waxing_gibbous'};
  if(p<0.53)return{icon:'🌕',key:'full'};
  if(p<0.72)return{icon:'🌖',key:'waning_gibbous'};
  if(p<0.78)return{icon:'🌗',key:'last_quarter'};
  return{icon:'🌘',key:'waning_crescent'};
}

// ── ko 格局(格局) 판단 ────────────────────────────────────
function calcGeokkuk(data) {
  if (data.systemKey !== 'saju' || !data.fullSaju) return null;
  const fj  = data.fullSaju;
  const dsi = calcDayStemIdx(data.year, data.month, data.day);
  const ss  = fj.sipsin || {};
  const supportCount  = (ss['비겁']||0) + (ss['인성']||0);
  const pressureCount = (ss['재성']||0) + (ss['관성']||0) + (ss['식상']||0);
  const monthEl = fj.monthPillar.element;
  const dayEl   = ELEMENTS[dsi];
  const sheng   = {'木':'水','火':'木','土':'火','金':'土','水':'金'};
  const monthBoost = sheng[dayEl] === monthEl ? 1 : 0;
  const isStrong = (supportCount + monthBoost) >= pressureCount;
  const msi = fj.monthPillar.stemIdx;
  const sipsin = calcSipsinType(dsi, msi);
  const GEOKKUK_MAP = {
    비겁: isStrong ? {name:'양인격(羊刃格)', icon:'⚔️', en:'Yang Blade Pattern', ja:'羊刃格'} : {name:'건록격(建祿格)', icon:'🏛️', en:'Established Prosperity', ja:'建禄格'},
    식상: {name:'식상격(食傷格)', icon:'🎨', en:'Expression Pattern', ja:'食傷格'},
    재성: {name:'재성격(財星格)', icon:'💰', en:'Wealth Pattern', ja:'財星格'},
    관성: {name:'관성격(官星格)', icon:'⚖️', en:'Authority Pattern', ja:'官星格'},
    인성: {name:'인성격(印星格)', icon:'📚', en:'Intelligence Pattern', ja:'印星格'},
  };
  const gk = GEOKKUK_MAP[sipsin] || {name:'잡기격(雜氣格)', icon:'✨', en:'Mixed Pattern', ja:'雑気格'};
  const STRATEGY_KO = {
    strong: '신강 사주는 재성(財星)과 관성(官星)이 용신입니다. 도전적이고 외향적인 활동에서 능력을 발휘하세요. 재물과 명예를 적극적으로 추구하는 것이 유리합니다.',
    weak:   '신약 사주는 인성(印星)과 비겁(比劫)이 용신입니다. 학문, 자기계발, 동료와의 협력에서 힘을 얻으세요. 무리한 확장보다 내실을 다지는 것이 유리합니다.',
  };
  const STRATEGY_EN = {
    strong: 'Strong chart: Wealth and Authority stars are favorable. Channel energy into assertive, outward pursuits. Actively seek recognition and material gain.',
    weak:   'Weak chart: Intelligence and Sibling stars support you. Gain strength through study, self-development, and collaboration. Consolidate before expanding.',
  };
  const STRATEGY_JA = {
    strong: '身強の命式：財星・官星が用神。積極的な外向き活動で才能を発揮。財・名誉を積極的に追求することが有利。',
    weak:   '身弱の命式：印星・比劫が用神。学問・自己成長・仲間との協力で力を得る。拡大より充実が有利。',
  };
  return { isStrong, sipsin, geokkukName:gk.name, geokkukNameEn:gk.en, geokkukNameJa:gk.ja,
           geokkukIcon:gk.icon, supportCount:supportCount+monthBoost, pressureCount,
           strategyKo:STRATEGY_KO[isStrong?'strong':'weak'],
           strategyEn:STRATEGY_EN[isStrong?'strong':'weak'],
           strategyJa:STRATEGY_JA[isStrong?'strong':'weak'] };
}

// ── ja 九星三星 (年/月/日命星) + 방위 길흉 ───────────────
const KYUSEI_DIRECTION_TABLE = {
  1: {best:['北','南東'],  good:['東','西'],       caution:['南西'],     bad:['南']},
  2: {best:['南西','北東'],good:['北西','西'],      caution:['東'],       bad:['南東']},
  3: {best:['東','南東'],  good:['北','南'],        caution:['北西'],     bad:['西']},
  4: {best:['南東','東'],  good:['南','北'],        caution:['西'],       bad:['北西']},
  5: {best:['北東','南西'],good:['中央'],           caution:['東','西'],  bad:['南','北']},
  6: {best:['北西','西'],  good:['南西','北東'],    caution:['南'],       bad:['東']},
  7: {best:['西','北西'],  good:['北東','南西'],    caution:['南東'],     bad:['東']},
  8: {best:['北東','南西'],good:['西','北西'],      caution:['東'],       bad:['南']},
  9: {best:['南','東'],    good:['南東'],           caution:['北'],       bad:['北東']},
};
const KYUSEI_STAR_NAMES_JA = ['','一白水星','二黒土星','三碧木星','四緑木星','五黄土星','六白金星','七赤金星','八白土星','九紫火星'];
const KYUSEI_STAR_NAMES_KO = ['','일백수성','이흑토성','삼벽목성','사록목성','오황토성','육백금성','칠적금성','팔백토성','구자화성'];
const KYUSEI_STAR_DESC_JA  = ['',
  '知性・癒しの星。水の気を持ち、柔軟で洞察力豊か。',
  '勤勉・誠実の星。土の気で安定と忍耐を象徴。',
  '活動・創造の星。木の気で行動力と革新性を持つ。',
  '調和・成長の星。木の気で協調性と信頼を象徴。',
  '変化・中心の星。土の気で強大な変容力を持つ。',
  '権威・天の恵みの星。金の気で決断力と指導力。',
  '喜び・豊かさの星。金の気で社交性と財運を持つ。',
  '山・安定の星。土の気で誠実さと家族運を象徴。',
  '情熱・直感の星。火の気でカリスマと先見性を持つ。',
];

function calcKyuseiSanseiData(data) {
  if (data.systemKey !== 'kyusei' || !data.cultural) return null;
  const yearStar  = data.cultural.star;
  const monthStar = data.monthKyusei || calcMonthKyusei(yearStar, new Date().getMonth()+1);
  const jd        = gregJD(data.year, data.month, data.day);
  const dayStar   = (((Math.floor(jd - 2451549)) % 9) + 9) % 9 || 9;
  const dirTable  = KYUSEI_DIRECTION_TABLE[yearStar] || KYUSEI_DIRECTION_TABLE[5];
  return { yearStar, monthStar, dayStar, dirTable };
}

// ── id Hari Baik 달력 (30일) ─────────────────────────────
function calcHariBaikCalendar(data, numDays) {
  numDays = numDays || 30;
  if (data.systemKey !== 'jawanese') return null;
  const birthNeptu = (data.cultural && data.cultural.neptu) ? data.cultural.neptu : 10;
  const today = new Date();
  const days  = [];
  for (let i = 0; i < numDays; i++) {
    const d  = new Date(today); d.setDate(today.getDate() + i);
    const y  = d.getFullYear(), m = d.getMonth()+1, dd = d.getDate();
    const jd = gregJD(y, m, dd);
    const pasaranIdx = ((jd - 2451551) % 5 + 5) % 5;
    const dayNeptu   = WETON_DAY_NEPTU[d.getDay()];
    const pasNeptu   = WETON_PAS_NEPTU[pasaranIdx];
    const total      = dayNeptu + pasNeptu;
    const combined   = birthNeptu + total;
    const lv = combined >= 25 ? 'great' : combined >= 20 ? 'good' : 'neutral';
    days.push({ y, m, dd, dow:d.getDay(), pasaranIdx, total, combined, lv });
  }
  return days;
}

// ── 연간 운세 달력 (12개월) ──────────────────────────────
function calcAnnualFortune(data) {
  if (data.systemKey !== 'saju' && data.systemKey !== 'kyusei') return null;
  const cy    = new Date().getFullYear();
  const yearSi = ((cy - 4) % 10 + 10) % 10;
  const CHONG_PAIRS = [[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]];
  const scores = [];
  for (let cm = 1; cm <= 12; cm++) {
    const monthBranch = MONTH_BRANCHES[cm - 1];
    const mp  = calcMonthPillar(yearSi, cm, monthBranch);
    let score = 55;
    if (data.systemKey === 'saju' && data.fullSaju) {
      const dsi = calcDayStemIdx(data.year, data.month, data.day);
      const sipsin = calcSipsinType(dsi, mp.stemIdx);
      const SIPSIN_SCORE = {'비겁':55,'식상':62,'재성':72,'관성':67,'인성':74};
      score = SIPSIN_SCORE[sipsin] || 55;
      const monthB = mp.branchIdx;
      const dayB   = data.fullSaju.dayBranch;
      const yearB  = data.cultural.branchIdx;
      const hasChong = CHONG_PAIRS.some(([a,b])=>
        (monthB===a&&(dayB===b||yearB===b))||(monthB===b&&(dayB===a||yearB===a)));
      if (hasChong) score = Math.max(30, score - 18);
    } else if (data.systemKey === 'kyusei') {
      const ST = {1:55,2:60,3:65,4:70,5:50,6:68,7:72,8:62,9:75};
      const base = ST[data.cultural.star] || 55;
      score = base + ((cm % 3 === 0) ? 5 : (cm % 3 === 1) ? -3 : 0);
    }
    scores.push({ month:cm, score:Math.min(95,Math.max(25,score)), element:mp.element, stemIdx:mp.stemIdx });
  }
  return scores;
}

// ── 좋은 날 달력 (시스템별, 30일) ───────────────────────
function calcAuspiciousDates(data, numDays) {
  numDays = numDays || 30;
  const CHONG = {0:6,1:7,2:8,3:9,4:10,5:11,6:0,7:1,8:2,9:3,10:4,11:5};
  const sheng = {'木':'水','火':'木','土':'火','金':'土','水':'金'};
  const today = new Date();
  const days  = [];
  for (let i = 0; i < numDays; i++) {
    const d  = new Date(today); d.setDate(today.getDate() + i);
    const y  = d.getFullYear(), m = d.getMonth()+1, dd = d.getDate();
    const jd = gregJD(y, m, dd);
    if (data.systemKey === 'saju') {
      const daySi      = calcDayStemIdx(y, m, dd);
      const dayEl      = ELEMENTS[daySi];
      const yongsin    = (data.fullSaju && data.fullSaju.yongsin) || data.cultural.element;
      const dayBranch  = calcDayBranch(y, m, dd);
      const birthDayBr = data.fullSaju ? data.fullSaju.dayBranch : null;
      const hasChong   = birthDayBr !== null && CHONG[dayBranch] === birthDayBr;
      const isGood     = (dayEl === yongsin || sheng[yongsin] === dayEl) && !hasChong;
      days.push({y,m,dd,dow:d.getDay(),lv:isGood?'good':'neutral',detail:STEMS[daySi]+BRANCHES[dayBranch]});
    } else if (data.systemKey === 'kyusei') {
      const rokuyo = getRokuyo(y, m, dd);
      const lv = rokuyo===4?'great':rokuyo===0||rokuyo===1?'good':rokuyo===3?'bad':'neutral';
      const ROKUYO = ['先勝','友引','先負','仏滅','大安','赤口'];
      days.push({y,m,dd,dow:d.getDay(),lv,detail:ROKUYO[rokuyo]});
    } else if (data.systemKey === 'jawanese') {
      const pasaranIdx = ((jd - 2451551) % 5 + 5) % 5;
      const birthNeptu = (data.cultural && data.cultural.neptu) ? data.cultural.neptu : 10;
      const dayNeptu   = WETON_DAY_NEPTU[d.getDay()];
      const pasNeptu   = WETON_PAS_NEPTU[pasaranIdx];
      const combined   = birthNeptu + dayNeptu + pasNeptu;
      const lv = combined>=25?'great':combined>=20?'good':'neutral';
      days.push({y,m,dd,dow:d.getDay(),lv,detail:PASARAN[pasaranIdx]});
    } else {
      const udn = calcUDN(y, m, dd);
      const lp  = (data.cultural && data.cultural.lifePathNum) ? data.cultural.lifePathNum : 1;
      const lvN = (udn===lp||udn===(lp===9?1:lp+1)||udn===(lp===1?9:lp-1))?'good':'neutral';
      days.push({y,m,dd,dow:d.getDay(),lv:lvN,detail:`${udn}`});
    }
  }
  return days;
}

// ── 이름 수리 분석 (Pythagorean) ─────────────────────────
const PYTHAGOREAN_TABLE = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8};
const PYTHAGOREAN_VOWELS = new Set(['a','e','i','o','u']);

function reduceToMaster(n) {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split('').reduce((a,c)=>a+parseInt(c),0);
  }
  return n;
}

// 한글 이름 수리 분석 (자모 획수 기반 성명학)
// 초성/종성 = 자음(외면수), 중성 = 모음(영혼수), 전체 = 운명수
const _HANGUL_CHO  = [2,4,2,3,6,5,4,4,8,2,4,1,3,6,4,3,4,4,3]; // ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ
const _HANGUL_JUNG = [2,3,3,4,2,3,3,4,2,4,5,3,3,2,4,5,3,3,1,2,1]; // ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ
const _HANGUL_JONG = [0,2,4,4,2,5,5,3,5,7,9,9,7,9,9,8,4,4,6,2,4,1,3,4,3,4,4,3]; // 받침 없음 + ㄱ..ㅎ

function calcHangulNumerology(name) {
  let consSum = 0, vowSum = 0, any = false;
  for (const ch of name) {
    const code = ch.charCodeAt(0) - 0xAC00;
    if (code < 0 || code > 11171) continue; // 완성형 한글 음절만
    any = true;
    const cho  = Math.floor(code / 588);
    const jung = Math.floor((code % 588) / 28);
    const jong = code % 28;
    consSum += (_HANGUL_CHO[cho] || 0) + (_HANGUL_JONG[jong] || 0);
    vowSum  += (_HANGUL_JUNG[jung] || 0);
  }
  if (!any) return null;
  return {
    name: name.trim(),
    destinyNum:  reduceToMaster(consSum + vowSum),
    soulUrge:    reduceToMaster(vowSum  || 1),
    personality: reduceToMaster(consSum || 1),
  };
}

function calcNameNumerology(name) {
  if (!name || !name.trim()) return null;
  // 한글이 포함되면 자모 획수 성명학으로 분석
  if (/[가-힣]/.test(name)) return calcHangulNumerology(name);
  // 그 외(로마자)는 피타고라스 수비학
  const letters = name.toLowerCase().replace(/[^a-z]/g,'').split('');
  if (!letters.length) return null;
  const destinyNum  = reduceToMaster(letters.reduce((a,c)=>a+(PYTHAGOREAN_TABLE[c]||0),0));
  const soulUrge    = reduceToMaster(letters.filter(c=>PYTHAGOREAN_VOWELS.has(c)).reduce((a,c)=>a+(PYTHAGOREAN_TABLE[c]||0),0)||1);
  const personality = reduceToMaster(letters.filter(c=>!PYTHAGOREAN_VOWELS.has(c)).reduce((a,c)=>a+(PYTHAGOREAN_TABLE[c]||0),0)||1);
  return { name:name.trim(), destinyNum, soulUrge, personality };
}

// getShareUrl은 아래 line ~3759에서 업그레이드됨 (중복 제거)

let _urlParamsFilled = false;
function readUrlParamsAndAutoFill() {
  if (_urlParamsFilled) return;
  _urlParamsFilled = true;
  const p  = new URLSearchParams(location.search);
  const bd = p.get('bd');
  let y, m, d;
  if (bd && bd.length === 8) {
    y = parseInt(bd.slice(0,4)); m = parseInt(bd.slice(4,6)); d = parseInt(bd.slice(6,8));
  } else {
    // legacy params from worker OG links
    y = parseInt(p.get('y')||0); m = parseInt(p.get('m')||0); d = parseInt(p.get('dy')||0);
  }
  if (!y || !m || !d) return;
  const yEl = document.getElementById('bday-year');
  const mEl = document.getElementById('bday-month');
  const dEl = document.getElementById('bday-day');
  if (yEl) yEl.value = y;
  if (mEl) mEl.value = m;
  if (dEl) dEl.value = d;
  const cat = p.get('cat');
  if (cat) selectCategory(cat);
  const gender = p.get('gender');
  if (gender) selectGender(gender);
  const bh = p.get('bh');
  if (bh !== null && bh !== '') {
    const bhEl = document.getElementById('birth-hour');
    if (bhEl) bhEl.value = bh;
  }
  const bd2 = p.get('bd2');
  if (bd2 && bd2.length === 8) {
    const py = parseInt(bd2.slice(0,4)), pm = parseInt(bd2.slice(4,6)), pd = parseInt(bd2.slice(6,8));
    const pyEl = document.getElementById('partner-year');
    const pmEl = document.getElementById('partner-month');
    const pdEl = document.getElementById('partner-day');
    if (pyEl) pyEl.value = py;
    if (pmEl) pmEl.value = pm;
    if (pdEl) pdEl.value = pd;
  }
  // URL 파라미터가 있으면 자동 계산 실행
  setTimeout(() => { if (document.getElementById('s-home')?.classList.contains('active')) startGenerate(); }, 500);
}

// ── 이미지 저장 (html2canvas lazy load) ──────────────────
function saveResultAsImage() {
  const panel = document.getElementById('s-result');
  if (!panel) return;
  const L = window.LUCKY_LANG || {};
  const lang = window.LUCKY_CURRENT_LANG || 'ko';
  const savingMsg = {ko:'저장 중…', en:'Saving…', ja:'保存中…', de:'Speichern…', fr:'Enregistrement…', es:'Guardando…', pt:'Salvando…', it:'Salvataggio…', id:'Menyimpan…'};
  const btn = document.getElementById('btn-save-image');
  if (btn) { btn.textContent = savingMsg[lang] || 'Saving…'; btn.disabled = true; }
  function _doCapture() {
    window.html2canvas(panel, {scale:2, useCORS:true, backgroundColor:'#f5f5f4', logging:false}).then(canvas => {
      const a = document.createElement('a');
      a.download = 'lucky-fortune.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
      if (btn) { btn.textContent = L.btnSaveImage || '🖼️'; btn.disabled = false; }
    }).catch(() => {
      if (btn) { btn.textContent = L.btnSaveImage || '🖼️'; btn.disabled = false; }
    });
  }
  if (window.html2canvas) {
    _doCapture();
  } else {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    s.onload = _doCapture;
    s.onerror = () => { if (btn) { btn.textContent = L.btnSaveImage||'🖼️'; btn.disabled=false; } };
    document.head.appendChild(s);
  }
}

// Lucky direction per five-element
const ELEMENT_DIRECTION = {
  '木': {ko:'동쪽·동남쪽', en:'East / SE', ja:'東・東南'},
  '火': {ko:'남쪽',        en:'South',     ja:'南'},
  '土': {ko:'중앙·남서',   en:'Center / SW',ja:'中央・南西'},
  '金': {ko:'서쪽·북서',   en:'West / NW', ja:'西・北西'},
  '水': {ko:'북쪽',        en:'North',     ja:'北'},
};
function getDirectionByElement(el, lang) {
  return (ELEMENT_DIRECTION[el] || {})[lang] || (ELEMENT_DIRECTION[el] || {}).en || '—';
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

function generateLucky(year, month, day, lang, lotteryId, drawDateStr, setIdx, birthHour, birthMinute, gender) {
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
    cultural.neptu = calcWetonNeptu(year, month, day).neptu;
  } else {
    const s = calcNumerology(year, month, day);
    cultural = s; seed = s.seed; systemKey = 'numerology';
    colorData = LIFE_PATH_COLORS[s.lpn] || LIFE_PATH_COLORS[1];
    const _lpDayIdx = LIFE_PATH_DAY_IDX[s.lpn] ?? 0;
    dayData = Object.fromEntries(Object.keys(DAY_NAMES_FULL).map(l => [l, DAY_NAMES_FULL[l][_lpDayIdx]]));
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

  // ── LMT (진태양시) correction — applies only for languages with known correction ─
  // Korea (ko): KST uses 135°E standard; Seoul is ~127°E → offset = (127-135)*4 = -32 min
  const LMT_OFFSET_MIN = { ko: -32 };
  const lmtOffset = LMT_OFFSET_MIN[lang] || 0;
  let lmtHour = birthHour != null ? birthHour : null;
  let lmtMin  = birthMinute || 0;
  if (lmtHour !== null && lmtOffset !== 0) {
    let totalMin = lmtHour * 60 + lmtMin + lmtOffset;
    if (totalMin < 0) totalMin += 24 * 60;
    if (totalMin >= 24 * 60) totalMin -= 24 * 60;
    lmtHour = Math.floor(totalMin / 60);
    lmtMin  = totalMin % 60;
  }

  // ── Fortune category calculation ─────────────────────────
  let fullSaju = null, sunSign = null, moonSign = null, monthKyusei = null;
  if (systemKey === 'saju') {
    const dayStemIdx = calcDayStemIdx(year, month, day);
    const monthBranch = calcMonthBranchByJieqi(year, month, day, lmtHour != null ? lmtHour : birthHour);
    const monthPillar = calcMonthPillar(cultural.stemIdx, month, monthBranch);
    const dayBranch = calcDayBranch(year, month, day);
    const hourPillar = (lmtHour !== null)
      ? calcHourPillar(dayStemIdx, lmtHour, lmtMin) : null;
    const balance = calcOhaengBalance([
      cultural.element, monthPillar.element, ELEMENTS[dayStemIdx], hourPillar ? hourPillar.element : null
    ]);
    const stems = [cultural.stemIdx, monthPillar.stemIdx, dayStemIdx];
    if (hourPillar) stems.push(hourPillar.stemIdx);
    const sipsin = {};
    stems.slice(1).forEach(si => { const r = calcSipsinType(dayStemIdx, si); sipsin[r] = (sipsin[r] || 0) + 1; });
    fullSaju = { ...balance, sipsin, monthPillar, dayBranch, hourPillar,
                 inputHour: birthHour, inputMin: birthMinute || 0,
                 lmtHour, lmtMin, lmtOffset };
  } else if (systemKey === 'kyusei') {
    monthKyusei = calcMonthKyusei(cultural.star, month);
  } else if (systemKey === 'numerology') {
    sunSign = getSunSignPrecise(year, month, day);
    moonSign = getMoonSignPrecise(year, month, day, birthHour);
  }

  const daeunData = (systemKey === 'saju' && !setIdx)
    ? calcDaeunData(year, month, day, lmtHour, gender, cultural.stemIdx)
    : null;

  // Partial data object used by the three new calc functions
  const _pd = { year, month, day, cultural, systemKey, fullSaju, monthKyusei };
  const seunData       = (systemKey === 'saju' && !setIdx) ? calcSeunData(_pd)       : null;
  const hapChongData   = (systemKey === 'saju' && !setIdx) ? calcHapChongData(_pd)   : null;
  const shinsalData    = (systemKey === 'saju' && !setIdx) ? calcShinsalData(_pd)    : null;
  const sipiunsungData = (systemKey === 'saju' && !setIdx) ? calcSipiunsungData(_pd) : null;
  const iljuronData    = (systemKey === 'saju' && !setIdx) ? calcIljuronData(_pd)    : null;
  const woluunData     = (systemKey === 'saju' && !setIdx) ? calcWoluunData(_pd)     : null;

  const geokkukData      = (systemKey === 'saju' && !setIdx)    ? calcGeokkuk(_pd)           : null;
  const kyuseiSanseiData = (systemKey === 'kyusei' && !setIdx)  ? calcKyuseiSanseiData(_pd)  : null;
  const annualFortune    = !setIdx                               ? calcAnnualFortune(_pd)     : null;
  const auspiciousDates  = !setIdx                               ? calcAuspiciousDates(_pd)   : null;

  const fortuneScores = !setIdx ? calcFortuneScores(systemKey, cultural, {
    fullSaju, sunSign, moonSign,
    monthStar: monthKyusei,
    dayBranch: fullSaju ? fullSaju.dayBranch : null,
    hourBranch: fullSaju && fullSaju.hourPillar ? fullSaju.hourPillar.branchIdx : null,
    birthHour: lmtHour !== null ? lmtHour : null,
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

  return { year, month, day, lang, cultural, colorData, dayData, systemKey, fmt, mainNums, bonusNums, seed, drawEnergy, lotteryId, compatScore, scoreMap, upcomingDates, birthHour: birthHour ?? null, birthMinute: birthMinute ?? 0, fullSaju, sunSign, moonSign, monthKyusei, fortuneScores, daeunData, seunData, hapChongData, shinsalData, sipiunsungData, iljuronData, woluunData, gunghapData: null, gender: gender || null, geokkukData, kyuseiSanseiData, annualFortune, auspiciousDates, czKey: _getCZKey(year) };
}

// ── Render Results ────────────────────────────────────────
function renderResults(data) {
  const L = window.LUCKY_LANG || {};
  const lang = data.lang;
  const cat = window.LUCKY_SELECTED_CAT || 'lucky';
  const CAT_IDX = {lucky:0, saju:1, love:2, money:3, career:4, achievement:5, gunghap:6};
  const CAT_ICONS = {lucky:'🍀', saju:'🔮', love:'💝', money:'💰', career:'💼', achievement:'🏆', gunghap:'💑'};
  const catNames = L.catNames || ['행운 번호','정통 사주','연애운','금전운','직업운','성취운','궁합'];
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
    const LP_LBL = { en:'Life Path', de:'Lebenspfad', fr:'Chemin de Vie', es:'Camino de Vida', pt:'Caminho de Vida', it:'Percorso di Vita', ko:'라이프 패스', ja:'ライフパス', id:'Jalur Hidup' };
    culturalHtml = `<span class="cultural-pill">${LP_LBL[lang]||LP_LBL.en}: ${data.cultural.lpn}</span>`;
  }
  // ── 희귀 등급/퍼센타일 라벨 (오늘 시드 결정론, 재미 톤) ──
  const _t = new Date();
  const _dn = Math.floor(Date.UTC(_t.getFullYear(), _t.getMonth(), _t.getDate()) / 86400000);
  const _pct = 1 + (Math.abs((data.seed || 1) * 9301 + _dn * 49297 + 233) % 99); // 1..99 (낮을수록 희귀)
  const RARITY = {
    legend:{ ko:n=>`🌟 전설급 행운일 · 상위 ${n}%`, en:n=>`🌟 Legendary luck day · Top ${n}%`, ja:n=>`🌟 伝説級の幸運日 · 上位${n}%`, de:n=>`🌟 Legendärer Glückstag · Top ${n}%`, fr:n=>`🌟 Jour de chance légendaire · Top ${n}%`, es:n=>`🌟 Día de suerte legendario · Top ${n}%`, pt:n=>`🌟 Dia de sorte lendário · Top ${n}%`, it:n=>`🌟 Giorno fortunato leggendario · Top ${n}%`, id:n=>`🌟 Hari hoki legendaris · Top ${n}%` },
    rare:{ ko:n=>`✨ 희귀한 행운일 · 상위 ${n}%`, en:n=>`✨ Rare lucky day · Top ${n}%`, ja:n=>`✨ 珍しい幸運日 · 上位${n}%`, de:n=>`✨ Seltener Glückstag · Top ${n}%`, fr:n=>`✨ Jour chanceux rare · Top ${n}%`, es:n=>`✨ Día de suerte raro · Top ${n}%`, pt:n=>`✨ Dia de sorte raro · Top ${n}%`, it:n=>`✨ Raro giorno fortunato · Top ${n}%`, id:n=>`✨ Hari hoki langka · Top ${n}%` },
    good:{ ko:()=>`🍀 좋은 기운이 흐르는 날`, en:()=>`🍀 A day of good energy`, ja:()=>`🍀 良い気が流れる日`, de:()=>`🍀 Ein Tag guter Energie`, fr:()=>`🍀 Un jour de bonne énergie`, es:()=>`🍀 Un día de buena energía`, pt:()=>`🍀 Um dia de boa energia`, it:()=>`🍀 Un giorno di buona energia`, id:()=>`🍀 Hari berenergi baik` },
    calm:{ ko:()=>`🌱 차분히 다지기 좋은 날`, en:()=>`🌱 A calm day for grounding`, ja:()=>`🌱 静かに整えるのに良い日`, de:()=>`🌱 Ein ruhiger Tag zum Erden`, fr:()=>`🌱 Un jour calme pour se recentrer`, es:()=>`🌱 Un día tranquilo para asentarse`, pt:()=>`🌱 Um dia calmo para se firmar`, it:()=>`🌱 Un giorno calmo per radicarsi`, id:()=>`🌱 Hari tenang untuk membumi` },
  };
  const _tier = _pct <= 8 ? 'legend' : _pct <= 30 ? 'rare' : _pct <= 65 ? 'good' : 'calm';
  const _rarFn = (RARITY[_tier][lang] || RARITY[_tier].en);
  const _rarText = _rarFn(_pct);
  const _rarChip = `<span class="cultural-pill" style="background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;font-weight:800;border:none;">${_rarText}</span>`;
  document.getElementById('cultural-info').innerHTML = _rarChip + culturalHtml;

  // ── Clean previous dynamic sections ──────────────────────
  ['detailed-reading-panel','seun-panel','woluun-panel','hapchong-panel','shinsal-panel',
   'sipiunsung-panel','iljuron-panel','today-ilchin-section','fortune-cats-section',
   'single-fortune-section','gunghap-section','geokkuk-panel','kyusei-sansei-panel',
   'hari-baik-panel','annual-calendar-panel','auspicious-calendar-panel','name-panel',
   'cz-badge-panel','daily-energy-panel','ai-chat-panel','ae-aff-panel',
   'biorhythm-panel','birthstone-panel','sunsign-panel','tarot-panel','luckyone-panel','quiz-launcher','score-panel','spin-panel','countdown-panel','invite-panel','nametool-panel','luckyfour-panel','lifepath-panel','dream-panel','angel-panel',
   'retro-panel','electional-panel','moonritual-panel','transit-panel','saturn-panel','solar-panel','lilith-panel','astrocarto-panel','humandesign-panel',
   'socialproof-panel','savebar-panel','recommend-panel','mood-panel','nativeshare-panel'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const lotterySection = document.getElementById('lottery-section');
  const fortuneCard    = document.querySelector('.fortune-card');
  const fsg            = document.getElementById('fortune-summary-grid');

  // 결과 상단 광고 — 핵심 결과(번호/점수) 바로 아래, 가장 잘 보이는 위치
  _resultAdSense('ad-result-top', 360);
  // 알리익스프레스 + ko 쿠팡도 상단(광고 바로 아래)에 배치 — 잘 보이는 위치
  renderAliExpressPanel(data);
  _resultCoupang(lang);
  try { renderSocialProof(data); } catch(e){} // X6 소셜 프루프(결과 상단)

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
    if (data.systemKey === 'jawanese') renderHariBaikPanel(data);

  // ══ SAJU: 정통 사주 전용 ═════════════════════════════════
  } else if (cat === 'saju') {
    if (lotterySection) lotterySection.style.display = 'none';
    if (fortuneCard)    fortuneCard.style.display    = 'none';

    renderFortuneSummaryGrid(data);    // 4-score overview in hero
    renderDetailedReadingPanel(data);  // 4-pillar table + ohaeng + yongsin + daeun
    renderSeunPanel(data);             // annual fortune (세운)
    renderWoluunPanel(data);           // monthly fortune (월운)
    renderHapChongPanel(data);         // pillar harmony & conflict (합충)
    renderShinsalPanel(data);          // special stars (신살)
    renderSipiunsungPanel(data);       // 12-stage vitality (십이운성)
    renderIljuronPanel(data);          // day-pillar archetype (일주론)
    renderTodayIlchin(data);           // today's day stem + interaction
    renderFortuneCategories(data, 'saju'); // all 4 fortune cards
    renderLuckyTips(data);             // yongsin-based tips
    if (data.systemKey === 'saju') renderGeokkukPanel(data);
    if (data.systemKey === 'kyusei') renderKyuseiSanseiPanel(data);
    if (data.systemKey === 'saju' || data.systemKey === 'kyusei') renderAnnualCalendarPanel(data);

  // ══ GUNGHAP: 두 사람 궁합 전용 ═════════════════════════
  } else if (cat === 'gunghap') {
    if (lotterySection) lotterySection.style.display = 'none';
    if (fortuneCard)    fortuneCard.style.display    = 'none';
    renderGunghapPanel(data);

  // ══ FORTUNE: 연애/금전/직업/성취운 전용 (집중형 — 선택한 운만) ══
  } else {
    if (lotterySection) lotterySection.style.display = 'none';
    if (fortuneCard)    fortuneCard.style.display    = 'none';

    renderFortuneSummaryGrid(data, cat); // 선택한 운 점수만 (다른 운 숨김)
    renderSingleFortuneCatCard(data, cat, L); // 선택 운 상세 풀이
    renderLuckyTips(data); // 선택 운 맞춤 팁
  }

  // ── 신규 행운요소 ──
  window._lastLuckyData = data;
  // 집중형 단일 운(연애·금전·직업·성취) 조회 시: 선택한 운 + 핵심 행운정보(행운번호)만 노출하고
  // 다른 운·부가 운세·점성 패널은 숨긴다. 종합 모드(행운번호·사주·궁합)는 전체 노출.
  const _focusedCat = (cat === 'love' || cat === 'money' || cat === 'career' || cat === 'achievement');
  if (_focusedCat) {
    renderLuckyOnePanel(data); // 핵심 행운정보(행운번호)
  } else {
    renderAuspiciousCalendarPanel(data);
    const personName = ((document.getElementById('person-name') || {}).value || '').trim();
    if (personName) renderNamePanel(calcNameNumerology(personName));
    renderDailyEnergyPanel(data);
    renderChineseZodiacBadge(data);
    renderLuckyOnePanel(data);
    try { renderQuizLauncher(data); } catch(e){}
    try { renderScorePanel(data); } catch(e){}
    try { renderSpinPanel(data); } catch(e){}
    try { renderCountdownPanel(data); } catch(e){}
    try { renderInvitePanel(data); } catch(e){}
    try { renderNameToolPanel(data); } catch(e){}
    renderSunSignPanel(data);
    renderLifePathPanel(data);
    renderBiorhythmPanel(data);
    renderTarotPanel(data);
    renderBirthstonePanel(data);
    renderLuckyFourPanel(data);
    renderDreamPanel(data);
    renderAngelPanel(data);
    // 트렌드 코스믹 웨더 (오늘 날짜 기반). 천체계산 실패가 체인을 끊지 않도록 격리
    try { renderTransitPanel(data); } catch(e){}
    try { renderSolarPanel(data); } catch(e){}
    try { renderSaturnPanel(data); } catch(e){}
    try { renderAstroCartoPanel(data); } catch(e){}
    try { renderLilithPanel(data); } catch(e){}
    try { renderHumanDesignPanel(data); } catch(e){}
    try { renderRetroPanel(data); } catch(e){}
    try { renderElectionalPanel(data); } catch(e){}
    try { renderMoonRitualPanel(data); } catch(e){}
  }
  if (!_focusedCat) { try { renderMoodPanel(data); } catch(e){} }     // X4 무드 저널(종합 모드)
  try { renderSaveBar(data); } catch(e){}                            // X5 보관함 저장 바(전 모드)
  if (!_focusedCat) { try { renderRecommendPanel(data); } catch(e){} } // X8 추천 캐러셀(종합 모드)
  try { _initInstallPrompt(); _maybeShowInstall(); } catch(e){}
  try { renderNativeShare(data); } catch(e){}                        // X10 네이티브 공유(모바일·전 모드)
  renderShareBtns(data);
  if (!_focusedCat) renderAIChat(data); // 집중형에서는 일반 AI챗 숨김
  renderFaq();
  _distributeResultAds(); // 콘텐츠 비례 애드센스 자동 분배(self===top·iframe 제외)
  _saveBirthAndHistory(data);
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
      numerology:{ ko:'생년월일 합산으로 생명 경로 수(Life Path Number)를 산출하고 공명 숫자에 가중치를 적용했습니다. 추첨일을 입력하면 그 날의 에너지(UDN)가 결합됩니다.', en:'Life Path Number calculated from birthday. Add draw date to combine Universal Day Number.', ja:'誕生日からライフパスナンバーを算出しました。日付を追加すると宇宙の日数が加わります。', de:'Die Lebenspfadzahl wurde aus Ihrem Geburtsdatum berechnet. Fügen Sie ein Ziehungsdatum hinzu, um die Universelle Tageszahl einzubeziehen.', fr:'Le Nombre du Chemin de Vie a été calculé à partir de votre date de naissance. Ajoutez une date de tirage pour combiner le Nombre Universel du Jour.', es:'El Número del Camino de Vida se calculó a partir de tu fecha de nacimiento. Añade una fecha de sorteo para combinar el Número Universal del Día.', pt:'O Número do Caminho de Vida foi calculado a partir da sua data de nascimento. Adicione uma data de sorteio para combinar o Número Universal do Dia.', it:'Il Numero del Percorso di Vita è stato calcolato dalla tua data di nascita. Aggiungi una data di estrazione per combinare il Numero Universale del Giorno.' },
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

  // 진태양시 보정 안내
  if (fj.lmtOffset && fj.inputHour != null) {
    const KO_JIZHI_NAMES = ['자시(子時)','축시(丑時)','인시(寅時)','묘시(卯時)','진시(辰時)','사시(巳時)','오시(午時)','미시(未時)','신시(申時)','유시(酉時)','술시(戌時)','해시(亥時)'];
    const EN_JIZHI_NAMES = ['Zi (子)','Chou (丑)','Yin (寅)','Mao (卯)','Chen (辰)','Si (巳)','Wu (午)','Wei (未)','Shen (申)','You (酉)','Xu (戌)','Hai (亥)'];
    const branchNames = lang === 'ko' ? KO_JIZHI_NAMES : EN_JIZHI_NAMES;
    const hpBranch = hp ? hp.branchIdx : null;
    const inH = String(fj.inputHour).padStart(2,'0');
    const inM = String(fj.inputMin || 0).padStart(2,'0');
    const ltH = String(fj.lmtHour).padStart(2,'0');
    const ltM = String(fj.lmtMin).padStart(2,'0');
    const siMsg = hpBranch != null ? ` → ${branchNames[hpBranch]}` : '';
    const noteText = lang === 'ko'
      ? `⏱ 입력: ${inH}:${inM} KST → 진태양시 보정(${fj.lmtOffset}분): ${ltH}:${ltM}${siMsg}`
      : `⏱ Input: ${inH}:${inM} → LMT correction (${fj.lmtOffset}min): ${ltH}:${ltM}${siMsg}`;
    html += `<div style="background:rgba(167,139,250,.1);border-left:3px solid #a78bfa;border-radius:0 8px 8px 0;padding:8px 12px;font-size:11px;color:#c4b5fd;margin-bottom:14px;">${noteText}</div>`;
  }

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

  // 大運 timeline
  if (data.daeunData) html += buildDaeunHTML(data, lang);

  // Append flowing narrative analysis
  html += buildSajuNarrativeHTML(data, lang, L);

  return html;
}

// ── 大運 (Daeun) HTML builder ──────────────────────────────────────────────────
function buildDaeunHTML(data, lang) {
  const dd = data.daeunData;
  if (!dd) return '';
  const isKo = lang === 'ko', isJa = lang === 'ja';
  const EC = {'木':'#4ade80','火':'#f87171','土':'#fbbf24','金':'#94a3b8','水':'#60a5fa'};
  const EKO = {'木':'목','火':'화','土':'토','金':'금','水':'수'};
  const title     = isKo ? '대운(大運) 타임라인' : isJa ? '大運タイムライン' : '10-Year Fortune Cycles (大運)';
  const dirText   = dd.forward
    ? (isKo ? '순행(順行) — 양년남·음년녀' : isJa ? '順行' : 'Forward (陽M · 陰F)')
    : (isKo ? '역행(逆行) — 음년남·양년녀' : isJa ? '逆行' : 'Reverse (陰M · 陽F)');
  const startLabel = isKo ? `대운 시작 ${dd.startAge}세${dd.startMonths > 0 ? ` ${dd.startMonths}개월` : ''}`
                   : isJa ? `大運起: ${dd.startAge}歳` : `Starts: age ${dd.startAge}`;
  const nowLabel  = isKo ? '현재' : isJa ? '現在' : 'Now';
  const noGender  = isKo ? '※ 성별을 선택하면 대운이 표시됩니다.' : isJa ? '※ 性別を選択してください。' : '※ Select gender to show daeun.';

  // current age for progress bar
  const _now = new Date();
  const _ageNow = _now.getFullYear() - data.year - ((_now.getMonth()+1 < data.month || (_now.getMonth()+1 === data.month && _now.getDate() < data.day)) ? 1 : 0);

  let cardsHtml = '';
  dd.periods.forEach(p => {
    const c = EC[p.element] || '#fbbf24';
    const elTxt = isKo ? `${EKO[p.element]}(${p.element})` : p.element;
    const ageTxt = `${p.periodStart}–${p.periodEnd}${isKo?'세':isJa?'歳':'y'}`;
    const isNow  = p.isCurrent;
    const nowBadge = isNow ? `<div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:${c};color:#000;font-size:8px;font-weight:800;padding:1px 5px;border-radius:3px;white-space:nowrap;">${nowLabel}</div>` : '';
    const progressPct = isNow ? Math.min(100, Math.max(0, Math.round((_ageNow - p.periodStart) / 10 * 100))) : 0;
    const progressBar = isNow ? `<div style="margin-top:5px;height:4px;background:rgba(255,255,255,.15);border-radius:2px;overflow:hidden;" title="${progressPct}%">
      <div style="height:100%;width:${progressPct}%;background:${c};border-radius:2px;"></div>
    </div>` : '';
    cardsHtml += `<div style="background:${isNow?`rgba(255,251,235,.18)`:'rgba(255,255,255,.06)'};border:2px solid ${isNow?c:'rgba(255,255,255,.14)'};${isNow?`box-shadow:0 0 14px ${c}50;`:''}border-radius:10px;padding:10px 7px;text-align:center;min-width:60px;flex-shrink:0;position:relative;">
      ${nowBadge}
      <div style="font-size:16px;font-weight:900;color:#fbbf24;letter-spacing:.5px;">${STEMS[p.stemIdx]}${BRANCHES[p.branchIdx]}</div>
      <div style="font-size:9px;font-weight:700;color:${c};margin-top:2px;">${elTxt}</div>
      <div style="font-size:9px;color:#c4b5fd;margin-top:3px;line-height:1.4;">${ageTxt}</div>
      ${progressBar}
    </div>`;
  });

  return `<div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,.12);">
    <div style="font-size:10px;font-weight:700;color:#c4b5fd;letter-spacing:.5px;margin-bottom:6px;">🔄 ${title}</div>
    <div style="font-size:10px;color:#a5b4fc;margin-bottom:10px;">${dirText} · ${startLabel}</div>
    <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch;">${cardsHtml}</div>
  </div>`;
}

// ── Saju Narrative — flowing modern analysis text ─────────────────────────────
function buildSajuNarrativeHTML(data, lang, L) {
  const fj = data.fullSaju;
  const s  = data.cultural;
  const dsi = calcDayStemIdx(data.year, data.month, data.day);
  const db  = fj.dayBranch;
  const mp  = fj.monthPillar;
  const hp  = fj.hourPillar;
  const cnts = fj.counts || {};
  const ys   = fj.yongsin;
  const ss   = fj.sipsin || {};
  const fs   = data.fortuneScores || {};
  const lv   = fs.love        || { score: 50, level: 'mid' };
  const mv   = fs.money       || { score: 50, level: 'mid' };
  const cv   = fs.career      || { score: 50, level: 'mid' };
  const isKo = (lang === 'ko');
  const seed = data.seed || 1;
  const v    = seed % 4;

  const DOHWA = new Set([0, 3, 6, 9]);
  const hasDohwa = DOHWA.has(db) || (hp && DOHWA.has(hp.branchIdx));

  // dominant element
  let domEl = '木', domCnt = 0;
  ['木','火','土','金','水'].forEach(el => { if ((cnts[el]||0) > domCnt) { domCnt = cnts[el]||0; domEl = el; } });

  // ── Day Stem personality text ────────────────────────────────────────────────
  const STEM_TAGS_KO  = ['甲木 — 하늘을 향해 뻗는 큰 나무','乙木 — 유연하게 흐르는 넝쿨','丙火 — 온 세상을 밝히는 태양','丁火 — 어둠을 밝히는 촛불','戊土 — 생명을 품는 큰 산','己土 — 생명을 키우는 비옥한 대지','庚金 — 날카롭게 벼려진 칼날','辛金 — 갈고닦아 빛나는 보석','壬水 — 막대한 잠재력의 큰 강','癸水 — 땅속 깊이 흐르는 지하수'];
  const STEM_TAGS_EN  = ['Jia Wood — The Tall Oak','Yi Wood — The Graceful Vine','Bing Fire — The Radiant Sun','Ding Fire — The Steady Flame','Wu Earth — The Vast Mountain','Ji Earth — The Fertile Field','Geng Metal — The Sharp Blade','Xin Metal — The Polished Gem','Ren Water — The Mighty River','Gui Water — The Deep Spring'];

  const DST_P1_KO = [
    '일간이 甲木인 당신은 태어날 때부터 리더의 기질을 안고 온 분입니다. 큰 나무가 하늘을 향해 곧게 뻗듯, 목표를 향해 흔들림 없이 전진하는 강직한 의지가 특징입니다. 처음 만나는 사람에게도 믿음직하고 당당한 인상을 주며, 공동체 안에서 자연스럽게 구심점 역할을 하게 됩니다.',
    '일간이 乙木인 당신은 놀라운 적응력과 사교적 감수성을 타고난 분입니다. 넝쿨이 주변 환경에 맞게 방향을 바꾸며 자라나듯, 어떤 상황에서도 최적의 방법을 찾아내는 유연한 사고력이 돋보입니다. 겉으로는 부드러워 보이지만, 내면의 목표 의식은 결코 흐릿하지 않습니다.',
    '일간이 丙火인 당신은 어디서든 주목받는 태양 같은 에너지의 소유자입니다. 밝고 긍정적인 기운이 주변 사람들에게 전염되며, 모임의 분위기를 순식간에 환하게 바꾸는 타고난 재능이 있습니다. 표현력이 풍부하고 열정적이어서, 무언가를 알리거나 전달하는 역할에서 특히 탁월합니다.',
    '일간이 丁火인 당신은 겉으로는 조용하고 차분해 보이지만, 내면에는 뜨거운 신념과 섬세한 감수성이 자리하고 있습니다. 촛불이 작지만 정확하게 어둠을 밝히듯, 집중하는 한 분야에서 보여주는 전문성과 깊이는 타의 추종을 불허합니다. 피상적인 넓이보다 진정한 깊이를 추구하는 분입니다.',
    '일간이 戊土인 당신은 큰 산처럼 든든하고 신뢰감 넘치는 존재감을 가지고 있습니다. 쉽게 흔들리지 않는 안정감과 포용력으로 주변 사람들의 심리적 버팀목이 되는 경우가 많습니다. 어떤 어려운 상황에서도 쉽게 무너지지 않는 내면의 단단함이 가장 큰 자산입니다.',
    '일간이 己土인 당신은 세심한 관찰력과 실용적 지혜를 가진 분입니다. 비옥한 논밭이 씨앗을 키우듯, 주변 사람들과 아이디어를 섬세하게 보살피며 결실로 이끄는 능력이 있습니다. 현실적이고 체계적인 접근 방식으로 계획을 세우고 실행하는 것에 뛰어납니다.',
    '일간이 庚金인 당신은 명확한 분석력과 단호한 결단력을 타고난 분입니다. 날카로운 칼날처럼 핵심을 정확히 짚어내고, 불필요한 것을 과감히 제거하는 능력이 탁월합니다. 공정함과 정의를 강하게 추구하며, 원칙을 지키는 것에 높은 가치를 두는 성향입니다.',
    '일간이 辛金인 당신은 아름다움, 완성도, 그리고 정교함에 대한 남다른 감각을 가진 분입니다. 보석이 오랜 세월 연마되어 빛을 발하듯, 자신을 끊임없이 갈고닦으며 완성도를 높이는 과정에서 삶의 의미를 찾습니다. 예리한 심미안과 디테일에 대한 집착이 특기입니다.',
    '일간이 壬水인 당신은 끝없이 솟아나는 아이디어와 지칠 줄 모르는 호기심을 가진 창의적 탐험가입니다. 큰 강이 산과 들을 가로질러 흐르듯, 다양한 분야를 자유롭게 넘나들며 독특한 연결 고리를 발견하는 능력이 뛰어납니다. 정체된 환경보다 변화와 이동이 있는 상황에서 에너지가 살아납니다.',
    '일간이 癸水인 당신은 보이지 않는 곳에서 깊고 조용히 흐르는 지하수처럼, 표면 아래의 진실을 꿰뚫어 보는 탁월한 직관력을 가진 분입니다. 심오한 사유와 철학적 성찰을 즐기며, 타인이 미처 보지 못한 패턴과 의미를 읽어내는 능력이 특출합니다.',
  ];
  const DST_P2_KO = [
    '한번 방향을 정하면 끝까지 밀고 나가는 집요함이 최대 강점이지만, 때로는 이 강직함이 고집으로 비칠 수 있습니다. 타인의 의견을 들을 때 방어적으로 반응하는 경향을 스스로 인지하고, 유연성을 의도적으로 연습하면 더 큰 성취를 이룰 수 있습니다.',
    '섬세한 공감 능력으로 상대방의 감정과 필요를 재빠르게 파악하는 탁월한 능력이 있습니다. 어떤 관계에서든 상대를 편안하게 만드는 묘한 매력을 발산하며, 특히 협상·상담·교육 분야에서 두드러진 성과를 냅니다. 다만 타인의 감정에 너무 영향받지 않도록 스스로를 보호하는 경계선이 필요합니다.',
    '丙火의 에너지는 폭발적이고 집중적입니다. 흥미를 느끼는 일에는 모든 에너지를 쏟아붓지만, 관심이 식으면 동력이 급격히 떨어지는 경향이 있습니다. 장기 프로젝트를 지속하려면 작은 마일스톤을 설정하고 성취감을 중간중간 확인하는 습관이 중요합니다.',
    '진심 어린 인간관계를 최우선 가치로 여기며, 한번 신뢰를 쌓은 사람에게는 끝까지 의리를 지킵니다. 이 충성심은 강점이지만, 배신이나 실망에 매우 민감하게 반응할 수 있다는 약점이기도 합니다. 관계에서 기대치를 명확히 소통하는 연습이 심리적 건강에 도움이 됩니다.',
    '장기적 안목으로 큰 그림을 그리고, 묵묵히 실행해 나가는 능력이 탁월합니다. 화려한 결과보다 탄탄한 과정을 중시하는 성향 덕분에, 나이가 들수록 더 빛나는 후덕(厚德)형 인재입니다. 다만 변화가 빠른 환경에서는 의도적으로 새로운 정보를 습득하고 업데이트하는 노력이 필요합니다.',
    '주변 사람들의 세세한 필요를 알아채고 조용히 도움을 주는 것에 깊은 보람을 느낍니다. 이 배려심은 강점이지만, 자신의 필요와 경계를 충분히 표현하지 않아 지치는 경우도 있으니, 자기 돌봄을 우선순위에 올려두는 연습이 필요합니다.',
    '목표를 향해 직선으로 나아가는 추진력은 강점이지만, 때로는 이 직접적인 스타일이 주변 사람들에게 냉정하게 느껴질 수 있습니다. 결과에 집착하는 것에서 한 발 물러서, 과정에서 타인이 경험하는 감정에도 관심을 기울이면 리더십이 한층 성숙해질 것입니다.',
    '높은 자기 기준으로 스스로에게 엄격하게 대하다 보니, 완벽하지 않다고 느낄 때 심한 자기 비판에 빠질 수 있습니다. "충분히 좋음(good enough)"도 훌륭한 결과라는 것을 기억하고, 완벽주의가 자신의 발목을 잡지 않도록 유연성을 키우는 것이 정신 건강의 핵심입니다.',
    '壬水는 직관적이고 전략적인 사고를 동시에 갖추고 있습니다. 복잡한 문제를 큰 그림에서 바라보며 빠르게 핵심을 파악하는 능력과, 여러 가능성을 동시에 탐색하는 사고 방식이 특징입니다. 너무 많은 가능성 앞에서 결정을 미루는 경향도 있으니, 충분한 정보가 모이면 과감하게 실행하는 원칙이 도움이 됩니다.',
    '풍부한 감수성과 깊은 공감 능력으로 타인의 고통과 기쁨을 자신의 것처럼 느낍니다. 이 능력은 치유자·예술가·연구자로서의 탁월한 자질이지만, 타인의 에너지에 쉽게 영향받아 소진될 수 있습니다. 정기적인 혼자만의 시간과 자연 속 충전이 필수입니다.',
  ];
  const DST_P3_KO = [
    '甲木은 봄의 시작, 새로운 출발의 에너지를 상징합니다. 새로운 프로젝트를 개척하거나 팀을 이끄는 선구자 역할에서 진가를 발휘하며, 오랜 준비보다 "일단 시작하고 보완해가는" 방식이 오히려 잘 맞는 스타일입니다.',
    '乙木은 변화하는 환경을 두려워하지 않고, 오히려 그 속에서 기회를 발굴합니다. 하나의 전문 분야보다 복수의 재능을 융합하는 "다재다능한 전문가"로서의 정체성이 적합하며, 빠르게 변화하는 시대일수록 乙木의 유연성은 더욱 빛을 발합니다.',
    '다른 사람에게 영감을 주고 이끄는 역할, 즉 강연·방송·공연·마케팅·세일즈 등 무대 위에서 빛나는 분입니다. 혼자 묵묵히 하는 작업보다 사람들과 에너지를 주고받는 환경에서 최대 생산성이 나옵니다. 자신이 가진 빛을 세상에 나누는 것이 丙火의 삶의 목적입니다.',
    '丁火는 창의적이고 직관적인 사유를 즐깁니다. 예술·글쓰기·심리상담·연구 등 깊은 집중과 내면 탐구가 필요한 분야에서 오래 지속할 수 있는 동력을 발견합니다. 세상에 빛을 전달하되, 자신만의 고요한 공간에서 충전하는 시간도 반드시 필요한 분입니다.',
    '戊土는 부동산·금융·행정·의료·교육 등 안정성과 신뢰성이 핵심인 분야에서 탁월한 역량을 발휘합니다. 사람들이 기댈 수 있는 든든한 토대를 만드는 것, 그것이 戊土의 가장 값진 기여이며 삶의 자부심입니다.',
    '己土는 세부 사항에 강하고, 완성도 높은 결과물을 만드는 것에 집중하는 유형입니다. 빠른 결과보다 탄탄한 완성도를 추구하며, 장기적인 관계와 프로젝트에서 진가를 발휘합니다. 꾸준함이 곧 최대의 무기인 분입니다.',
    '庚金은 법률·경영·엔지니어링·데이터 분석 등 정확성과 원칙이 중요한 분야에서 두각을 나타냅니다. 스스로 기준을 높이 설정하고 그 기준에 맞게 갈고닦는 것에서 깊은 만족감을 얻는 분입니다.',
    '辛金은 예술·패션·뷰티·정밀 과학·의학·글쓰기 등 세밀한 기술과 감각이 요구되는 분야에서 탁월합니다. 소수와 깊은 관계를 맺는 것을 선호하며, 자신만의 독특한 스타일을 발전시키는 것이 삶의 큰 즐거움입니다.',
    '壬水는 기획·전략·연구·IT·미디어·여행·무역 등 광범위한 사고와 이동성이 필요한 분야에서 잠재력을 발휘합니다. 한 분야의 깊이보다 여러 분야의 융합에서 혁신을 만들어내는 유형이며, 국제적 감각이 남다릅니다.',
    '癸水는 심리상담·의학·철학·음악·영성·데이터 과학 등 깊은 통찰력과 인내가 필요한 분야에서 오래 가는 동력을 발견합니다. 내면의 지혜를 믿고, 직관이 이끄는 방향으로 한 걸음씩 나아갈 때 가장 진정성 있는 삶을 살게 됩니다.',
  ];

  const DST_P1_EN = [
    'Your Jia Wood day stem gives you natural leadership and unwavering determination. Like a towering tree reaching skyward, you set clear goals and pursue them with steady conviction. People trust your confident, reliable presence.',
    'Your Yi Wood day stem grants exceptional adaptability and social intelligence. Like a vine finding the best path through any terrain, you discover opportunities that others miss and make people feel at ease.',
    'Your Bing Fire day stem radiates warmth and positivity that lights up every room. You have a natural gift for inspiring others, and your expressive enthusiasm creates uplifting energy wherever you go.',
    'Your Ding Fire day stem reveals deep inner conviction and quiet expertise. Like a candle that illuminates with precision, you bring focused brilliance to everything you deeply commit to.',
    'Your Wu Earth day stem gives you remarkable stability and groundedness. Like a great mountain, you provide a reliable foundation that others naturally depend on in times of uncertainty.',
    'Your Ji Earth day stem brings practical wisdom and meticulous care. Like fertile soil that nurtures growth, you have a gift for developing people and ideas into their fullest potential.',
    'Your Geng Metal day stem gives you decisive analytical power and a strong sense of justice. Like a forged blade, you cut directly to the core of any situation with clarity.',
    'Your Xin Metal day stem endows you with exquisite taste, precision, and a relentless drive for refinement. Like a precious gem that must be polished, you continuously elevate your craft.',
    'Your Ren Water day stem gifts you with boundless creativity and intellectual curiosity. Like a great river flowing across vast landscapes, your mind naturally connects ideas across many domains.',
    'Your Gui Water day stem gives you profound intuition and sensitivity. Like underground spring water, you perceive what lies beneath the surface — patterns, emotions, and hidden truths others miss.',
  ];
  const DST_P2_EN = [
    'Your persistence is your greatest strength, but it can read as stubbornness. Intentionally practicing flexibility and truly hearing alternative viewpoints will amplify your impact significantly.',
    'Your emotional intelligence makes you an excellent connector and communicator. Protect your energy by maintaining healthy boundaries — your empathy is a gift, not an obligation to absorb everyone\'s feelings.',
    'Your enthusiasm is contagious but can burn in short bursts. Setting small milestones and celebrating incremental wins will help you sustain momentum on long-term projects.',
    'You value loyalty and depth over breadth in relationships. Communicating your expectations clearly — before frustration builds — strengthens every connection you hold dear.',
    'Your long-term vision and patient execution create lasting achievements. In fast-moving environments, intentionally seeking new information keeps your steady approach from becoming inertia.',
    'Your attentiveness to others\' needs is a rare gift. Remember to set boundaries so your nurturing nature doesn\'t lead to burnout — caring for yourself is what keeps you able to care for others.',
    'Your directness drives results, but it can feel cold to more emotionally oriented people. Pausing to acknowledge feelings in the process — not just outcomes — elevates your leadership.',
    'Your high standards produce exceptional results. Be gentle with yourself — "good enough" is sometimes the wisest choice, and perfectionism unchecked becomes the enemy of progress.',
    'Your strategic and intuitive thinking give you a unique advantage. Combat decision paralysis by committing to action once you have sufficient information — momentum beats perfection.',
    'Your deep empathy and sensitivity are your superpowers. Protect your energy with regular solitude; you need quiet time to integrate what you absorb from the world around you.',
  ];
  const DST_P3_EN = [
    'You excel at pioneering new paths, launching initiatives, and leading teams toward ambitious goals. Trust your instinct to start — refinement comes in motion.',
    'You thrive in roles requiring versatility, people skills, and creative problem-solving. A multi-hyphenate identity suits you well; your adaptability is your edge in a fast-changing world.',
    'You shine in performance, communication, marketing, and leadership roles where energy exchange is constant. Your purpose is to share your light — let people feel it.',
    'You excel in creative, research, counseling, and artistic pursuits. Depth is your gift; protect the quiet spaces that allow your inner flame to stay bright.',
    'You thrive in finance, real estate, administration, healthcare, and education — fields where reliability and long-term trust are the currency that matters most.',
    'You excel in roles requiring thoroughness, steady execution, and interpersonal care. Consistency is your superpower — what you tend to, grows.',
    'You excel in law, engineering, data analysis, management, and strategy. Your precision and principles create systems and outcomes others can genuinely rely on.',
    'You shine in art, design, medicine, precision sciences, and any craft that rewards mastery. Your taste and dedication set your work apart from the merely competent.',
    'You excel in strategy, research, technology, international affairs, and innovation — anywhere big-picture thinking meets cross-domain curiosity.',
    'You excel in psychology, philosophy, music, spiritual work, and deep analytical roles. Trust the quiet knowing inside you — it sees what logic alone cannot.',
  ];

  const p1 = isKo ? (DST_P1_KO[dsi]||DST_P1_KO[0]) : (DST_P1_EN[dsi]||DST_P1_EN[0]);
  const p2 = isKo ? (DST_P2_KO[dsi]||DST_P2_KO[0]) : (DST_P2_EN[dsi]||DST_P2_EN[0]);
  const p3 = isKo ? (DST_P3_KO[dsi]||DST_P3_KO[0]) : (DST_P3_EN[dsi]||DST_P3_EN[0]);
  const stemTag = isKo ? (STEM_TAGS_KO[dsi]||STEM_TAGS_KO[0]) : (STEM_TAGS_EN[dsi]||STEM_TAGS_EN[0]);

  // ── Day Branch (일지) trait ─────────────────────────────────────────────────
  const BRANCH_TRAIT_KO = [
    '일지(日支)가 子水이어서 지혜롭고 분석적이며, 조용한 환경에서 놀라운 집중력을 발휘하는 기질이 있습니다. 야간이나 고요한 시간대에 창의적 에너지가 특히 활성화되며, 직관으로 상황을 빠르게 파악하는 능력이 돋보입니다.',
    '일지(日支)가 丑土이어서 인내력이 강하고 신중하게 일을 추진하는 기질이 있습니다. 한번 결심한 것은 묵묵히 해내는 뚝심이 있어, 시간이 지날수록 진가를 인정받는 유형입니다.',
    '일지(日支)가 寅木이어서 용감하고 진취적이며 새로운 도전을 두려워하지 않습니다. 행동력이 넘치고 선구자 기질이 강해, 남들이 가지 않은 길을 먼저 개척하는 것에 편안함을 느낍니다.',
    '일지(日支)가 卯木이어서 친근하고 사교적이며 사람들과의 교류에서 활력을 얻습니다. 부드러운 인상 뒤에 날카로운 감각이 있어, 관계 속에서 핵심을 빠르게 파악하는 능력이 있습니다.',
    '일지(日支)가 辰土이어서 포부가 크고 다재다능하며 변화에 잘 적응합니다. 이상이 높고 실행력도 갖추고 있어, 꿈을 현실로 만드는 추진력이 강점입니다.',
    '일지(日支)가 巳火이어서 통찰력과 집중력이 탁월하며 한 분야에 깊이 몰입합니다. 표면보다 본질을 꿰뚫어 보는 시선으로, 복잡한 상황에서도 핵심을 발견하는 능력이 있습니다.',
    '일지(日支)가 午火이어서 열정적이고 표현력이 강하며 사람들 앞에서 빛납니다. 에너지가 넘치고 존재감이 뚜렷해, 어떤 모임에서도 자연스럽게 분위기를 이끌게 됩니다.',
    '일지(日支)가 未土이어서 따뜻한 공감 능력과 예술적 감각을 타고났습니다. 주변과의 조화를 중시하며, 분위기를 부드럽게 만드는 특유의 매력이 있습니다.',
    '일지(日支)가 申金이어서 논리적이고 전략적이며 문제 해결에 뛰어납니다. 복잡한 상황을 빠르게 분석하고 최적의 해결책을 찾아내는 실용적인 사고가 강점입니다.',
    '일지(日支)가 酉金이어서 심미안이 뛰어나고 완성도에 대한 기준이 높습니다. 세부 사항을 놓치지 않으며, 스스로의 기준을 높이 유지하는 것에 자부심을 갖는 타입입니다.',
    '일지(日支)가 戌土이어서 의리가 깊고 원칙이 확고합니다. 한번 믿음을 준 사람에게는 끝까지 든든한 울타리가 되어주는 신뢰할 수 있는 성품의 소유자입니다.',
    '일지(日支)가 亥水이어서 자유를 사랑하고 철학적 사유를 즐깁니다. 독립적인 사고 방식과 넓은 이상을 가지고 있어, 틀에 박힌 방식보다 자신만의 길을 개척하는 것을 선호합니다.',
  ];
  const BRANCH_TRAIT_EN = [
    'Your day branch Zi (子) brings sharp intellect and analytical instincts. You thrive in calm environments and your creative energy peaks during quiet hours.',
    'Your day branch Chou (丑) brings patient determination and methodical follow-through. You grow more impressive over time — a slow-burn, high-value type.',
    'Your day branch Yin (寅) brings boldness and pioneering energy. You are energized by challenge and naturally comfortable at the frontier others hesitate to enter.',
    'Your day branch Mao (卯) brings social warmth and perceptive sensitivity. Behind your approachable exterior lies a sharp instinct for reading people and situations.',
    'Your day branch Chen (辰) brings broad ambition and versatile capability. High ideals backed by real drive make you someone who turns vision into reality.',
    'Your day branch Si (巳) brings deep insight and intense focus. You see below the surface — a natural investigator and specialist in whatever you commit to.',
    'Your day branch Wu (午) brings passionate expression and magnetic presence. You light up any environment and are energized most when performing, leading, or creating.',
    'Your day branch Wei (未) brings warm empathy and artistic sensibility. Harmony matters deeply to you, and your gentle influence often holds groups together.',
    'Your day branch Shen (申) brings sharp analytical thinking and strategic problem-solving. Complex situations are where you tend to shine most clearly.',
    'Your day branch You (酉) brings refined taste and exacting standards. Your attention to detail and aesthetic precision elevate everything you touch.',
    'Your day branch Xu (戌) brings deep loyalty and unshakeable principles. People who earn your trust gain a steadfast ally who never wavers.',
    'Your day branch Hai (亥) brings philosophical independence and a free-spirited outlook. You prefer forging your own path over following well-worn routes.',
  ];
  const branchTrait = isKo ? (BRANCH_TRAIT_KO[db]||'') : (BRANCH_TRAIT_EN[db]||'');

  // ── Five Elements balance text ───────────────────────────────────────────────
  const OHAENG_KO = {
    '木':'木 기운이 강한 사주는 성장·개척·창조의 에너지가 넘칩니다. 새로운 시작과 비전 제시에 탁월하지만, 자기 주장이 강해질 수 있어 유연성과 협력을 의식적으로 연습할 필요가 있습니다.',
    '火':'火 기운이 강한 사주는 열정·표현·카리스마의 에너지가 돋보입니다. 무대 위에서, 사람들 앞에서 빛나는 유형이며, 에너지 소진을 방지하려면 규칙적인 휴식으로 지속력을 보완해야 합니다.',
    '土':'土 기운이 강한 사주는 안정·신뢰·실용의 에너지가 중심입니다. 든든한 토대를 쌓는 데 뛰어나고 장기적 성과를 만들어 내지만, 변화를 받아들이는 유연성을 키우는 것이 성장의 열쇠입니다.',
    '金':'金 기운이 강한 사주는 분석·결단·정의의 에너지가 강합니다. 원칙을 중시하고 효율성이 높지만, 타인의 감정적 필요를 배려하는 소통 방식을 연습하면 관계의 폭이 넓어집니다.',
    '水':'水 기운이 강한 사주는 직관·지혜·유연성의 에너지가 풍부합니다. 창의적이고 적응력이 뛰어나지만, 너무 많은 가능성을 동시에 추구하다 실행력이 흐트러지지 않도록 집중하는 연습이 필요합니다.',
  };
  const WEAK_KO = {
    '木':'반면, 木 에너지가 부족한 부분이 있어 새로운 시작이나 성장 국면에서 에너지가 쉽게 고갈될 수 있습니다. 초록 계열의 환경, 나무와의 접촉, 새로운 도전을 의식적으로 늘리는 것이 균형을 맞추는 방법입니다.',
    '火':'반면, 火 에너지가 약해 열정과 표현이 위축될 수 있는 부분이 있습니다. 빨강·오렌지 계열의 공간, 사람들과의 활발한 교류, 자신의 생각을 소리 내어 말하는 습관이 이 에너지를 보충합니다.',
    '土':'반면, 土 에너지가 부족하여 불안정하거나 일관성이 떨어지는 국면이 생길 수 있습니다. 규칙적인 루틴, 재정 관리, 황토색 계열의 소품이 土의 안정 에너지를 보완합니다.',
    '金':'반면, 金 에너지가 약해 결단력이나 논리적 정리가 어려운 순간이 있을 수 있습니다. 흰색·회색 계열의 공간 정리, 명확한 경계 설정 연습이 金의 날카로움을 보강합니다.',
    '水':'반면, 水 에너지가 부족하여 직관이 흐려지거나 유연성이 떨어지는 상황이 생길 수 있습니다. 명상·일기쓰기·물 근처 산책이 水 에너지를 채우는 가장 좋은 방법입니다.',
  };
  const OHAENG_EN = {
    '木':'Dominant Wood in your chart signals creative, growth-focused energy — pioneering and vision-driven. Balance this with flexibility and genuine openness to collaboration.',
    '火':'Dominant Fire gives you charisma, passion, and expressive power. Guard against burnout by scheduling consistent recovery time between periods of high output.',
    '土':'Dominant Earth brings stability, reliability, and practical wisdom. Your strength is building lasting foundations. Embrace change intentionally to keep evolving.',
    '金':'Dominant Metal gives you analytical precision and strong principles. Your directness drives real results — soften it with empathy for deeper, more lasting connections.',
    '水':'Dominant Water flows with intuition, creativity, and adaptability. Focus on converting your many ideas into committed action — breadth without depth diffuses your power.',
  };
  const WEAK_EN = {
    '木':'Your chart needs more Wood energy — the force of new beginnings and growth. Surround yourself with green plants, engage in new challenges, and embrace fresh starts.',
    '火':'Your chart needs more Fire energy — passion and expression. Use warm colors, spend time with energizing people, and practice voicing your ideas out loud.',
    '土':'Your chart needs more Earth energy — stability and consistency. Build daily routines, manage finances carefully, and use grounding yellow and brown tones in your environment.',
    '金':'Your chart needs more Metal energy — clarity and decisiveness. Declutter your space, practice setting clear boundaries, and use white and grey tones around you.',
    '水':'Your chart needs more Water energy — intuition and flexibility. Meditate regularly, keep a journal, and spend time near water to restore this vital energy.',
  };

  const ohaengBody = isKo
    ? (OHAENG_KO[domEl]||'') + (domEl !== ys ? ' ' + (WEAK_KO[ys]||'') : '')
    : (OHAENG_EN[domEl]||'') + (domEl !== ys ? ' ' + (WEAK_EN[ys]||'') : '');

  // ── Love text (4 variants per level, v = seed%4) ─────────────────────────────
  const LOVE_KO = {
    high: [
      hasDohwa ? '사주에 도화살(桃花殺)이 자리하고 있어 이성에게 자연스러운 매력을 발산하는 기운이 강합니다. 연인이 있다면 관계의 깊이가 한층 더해지는 시기이며, 솔로라면 예상치 못한 인연이 찾아올 가능성이 높습니다. 설레는 감정을 느꼈다면 망설이지 말고 행동으로 옮기세요.' : '감정 에너지를 관장하는 일지의 기운이 활성화되어 있어 이성과의 연결이 자연스럽게 이루어지는 시기입니다. 기존 관계는 더 깊어지고, 새로운 인연은 의미 있는 방식으로 다가옵니다. 자신을 있는 그대로 드러내는 것이 지금의 가장 강력한 매력입니다.',
      hasDohwa ? '도화살 기운이 활성화되어 주변 사람들이 당신에게 더 많은 관심을 가지게 됩니다. 이 에너지를 잘 활용하면 오래 기다려왔던 인연을 만나거나 기존 관계를 더욱 깊게 발전시킬 수 있습니다. 진정성 있는 모습을 유지하세요.' : '연애 에너지가 상승하고 있습니다. 용신의 흐름이 감정 표현을 더 자연스럽게 만들어 주는 시기로, 오래 미뤄왔던 고백이나 감사의 표현을 지금 실행에 옮겨보세요.',
      hasDohwa ? '사주 구조에서 매력 에너지가 강하게 발현되는 시기입니다. 두 사람이 함께 새로운 경험을 하는 것이 관계를 한 단계 발전시키는 열쇠입니다. 사람들이 모이는 곳에 적극적으로 나서보세요.' : '오행 에너지의 흐름이 관계 형성에 유리하게 작동하고 있습니다. 솔로라면 인맥을 적극적으로 넓히고, 연인이 있다면 함께하는 새로운 경험으로 더 깊은 유대를 쌓을 수 있는 최적의 시기입니다.',
      hasDohwa ? '도화살과 활성화된 연애 에너지가 겹쳐 지금이 연애에 있어 중요한 전환점이 될 수 있습니다. 외모와 분위기를 가꾸는 데 조금 더 신경을 쓰면 이 에너지를 증폭시킬 수 있습니다.' : '사주 기둥의 조화가 감정적 연결을 강화하고 있습니다. 진심이 담긴 행동이 지금 가장 강력한 힘을 발휘하는 시기입니다. 관심 있는 상대에게 먼저 다가가는 용기가 좋은 인연을 만드는 첫 번째 조건입니다.',
    ],
    mid: [
      '연애 에너지가 안정적인 흐름을 유지합니다. 거창한 변화보다 꾸준한 노력이 관계를 깊게 만드는 시기입니다. 상대방의 이야기를 더 많이 들어주고 작은 감사를 자주 표현하면 관계가 자연스럽게 성숙해집니다.',
      '연애운이 평온한 수준입니다. 새로운 자극보다 현재 관계의 신뢰를 쌓는 것이 더 가치 있습니다. 일상 속 작은 이벤트나 따뜻한 메시지 하나가 상대에게 큰 의미로 전달될 수 있습니다.',
      '관계 에너지가 고요하게 흐릅니다. 함께하는 일상의 질을 높이는 것에 집중하세요. 공통 관심사를 나누거나 함께 새로운 것을 배우는 경험이 관계에 새로운 활력을 불어넣습니다.',
      '연애에서 큰 기복 없이 안정적인 흐름이 이어집니다. 솔로라면 자기 성장에 집중하는 것이 더 좋은 인연을 끌어당기는 방법입니다. 자신이 행복해질수록 매력도 자연스럽게 발산됩니다.',
    ],
    low: [
      '연애 에너지가 다소 약한 시기입니다. 새로운 만남을 억지로 추진하기보다 자신의 내면을 충실히 돌보는 것이 더 현명합니다. 지금의 자기 충전이 미래에 더 건강한 관계를 맺는 기반이 됩니다.',
      '오행 에너지의 흐름이 감정 영역을 약하게 만들 수 있는 시기입니다. 중요한 감정 표현은 충분히 생각한 후 진행하세요. 경청하는 것이 지금 관계에서 가장 강력한 언어입니다.',
      '감정적으로 예민해지기 쉬운 시기라 사소한 것에 상처받거나 줄 수 있습니다. 충동적인 결정보다 한 발 물러서서 상황을 바라보는 여유가 필요합니다. 관계를 급격히 변화시키려 하기보다 자연스러운 흐름에 맡기세요.',
      '연애 관계에 뜻하지 않은 거리감이 생길 수 있는 시기입니다. 이 간격은 일시적인 것으로, 서로에 대한 이해와 배려가 다시 관계를 가깝게 만들 것입니다. 지금은 인내하는 것이 사랑의 한 형태입니다.',
    ],
  };
  const LOVE_EN = {
    high: [
      hasDohwa ? 'Peach Blossom energy in your chart creates natural romantic magnetism. Existing bonds deepen; singles are positioned to meet meaningful connections. Act on feelings that arise — timing is in your favor.' : 'Your emotional energy is powerfully activated. Connections form naturally and existing bonds deepen. Showing up as your authentic self is your most compelling quality right now.',
      hasDohwa ? 'Peach Blossom energy amplifies your natural attractiveness. Invest slightly more in your presence and make time for social environments where new connections can form.' : 'Love fortune is running high. Self-expression feels more natural than usual — act on feelings you have been hesitating to share.',
      hasDohwa ? 'Your chart positions you as particularly magnetic. Shared new experiences will deepen existing bonds and create natural openings for new ones.' : 'Favorable energy flows through your relational sphere. For singles, expanding your social circle will yield results. For those partnered, shared new adventures strengthen the bond.',
      hasDohwa ? 'Peach Blossom combined with high love fortune makes this a potential turning point. Put yourself in social environments and let your natural energy do the work.' : 'Genuine heartfelt action carries maximum power right now. Reaching out first or making a bold move carries a higher probability of positive outcomes.',
    ],
    mid: [
      'Love fortune is steady. Consistent small acts of care and genuine listening build more depth than grand gestures. Show up reliably and the relationship grows naturally.',
      'Romantic energy is calm. Focus on deepening trust rather than seeking new excitement. A thoughtful message or unexpected small kindness can mean more than you realize.',
      'Relationship energy flows quietly. Sharing new learning experiences or a common interest adds fresh vitality to any connection.',
      'No major love shifts, but steady ground is valuable. Personal growth during this period makes you more attractive — invest in becoming the person you want to be.',
    ],
    low: [
      'Love energy is subdued. Nurturing yourself rather than forcing connections forward is the wiser path. Self-investment now becomes the foundation for healthier relationships ahead.',
      'Emotional sensitivity may be higher. Think carefully before important conversations, and prioritize listening. Patience now prevents larger issues later.',
      'Emotional reactivity is elevated. A pause before responding to relationship friction can prevent words that are hard to take back.',
      'Some temporary distance may enter a relationship. Understanding and consistent small care will restore closeness more reliably than dramatic gestures.',
    ],
  };

  // ── Money text (4 variants per level) ────────────────────────────────────────
  const reiseiCnt = ss['재성'] || 0;
  const MONEY_KO = {
    high: [
      reiseiCnt > 1 ? '재성(財星)이 사주에 풍부하게 자리하고 있어 금전을 끌어당기는 기운이 탁월합니다. 투자나 새로운 수입원 개발에 좋은 타이밍이며, 재성이 강할수록 지출도 커질 수 있으니 명확한 재정 목표와 예산 계획을 병행하는 지혜가 필요합니다.' : '재성(財星) 에너지가 사주에서 활성화되어 금전 흐름이 강해지는 시기입니다. 노력이 금전적 결실로 이어지며 새로운 수입원 개발에 좋은 타이밍입니다. 이 에너지를 잘 활용하면 재정적 도약의 발판을 만들 수 있습니다.',
      '용신 에너지가 재물을 끌어당기는 흐름과 상생하고 있습니다. 평소보다 좋은 금전적 기회가 들어오거나 예상치 못한 수입이 생길 수 있는 시기입니다. 기회가 왔을 때 준비가 되어 있으면 훨씬 큰 결과를 만들 수 있으니, 지금 재정 계획을 미리 정비해두세요.',
      '사주의 오행 에너지가 경제 활동에 유리하게 작용하는 시기입니다. 새로운 수입원을 개발하거나 투자 포트폴리오를 다각화하기에 좋은 때입니다. 단기 이익보다 3~5년의 장기 관점으로 재정 결정을 내리면 더 큰 성과를 얻을 수 있습니다.',
      '재물 에너지가 강한 흐름 속에 있습니다. 자신의 능력을 인정받고 그에 맞는 보상을 받을 수 있는 시기이니, 연봉 협상이나 단가 조정 등 금전적 요청을 망설이지 마세요. 준비된 사람에게 기회가 옵니다.',
    ],
    mid: [
      '금전운이 안정적인 흐름을 유지합니다. 대박보다 꾸준한 저축과 합리적 지출 관리가 재정 건강의 핵심입니다. 가계부나 지출 앱으로 돈의 흐름을 파악하면 어디에 낭비가 있는지 자연스럽게 드러납니다.',
      '재물 에너지가 균형 잡힌 상태입니다. 극적인 변화보다 안정적인 축적이 올바른 전략입니다. 소액이라도 정기적금이나 인덱스 펀드를 시작하면 금액보다 습관이 10년 후 큰 차이를 만들어냅니다.',
      '금전 에너지가 고요하게 흐릅니다. 기존 자원을 효율적으로 관리하는 데 집중하세요. 구독이나 정기 결제 서비스를 점검하고 쓰지 않는 것을 정리하는 것만으로도 한 달 지출이 눈에 띄게 줄어듭니다.',
      '재물운이 평탄한 흐름 속에 있습니다. 소비 전에 필요한 것인지 원하는 것인지 한 번 더 생각하는 작은 습관이 충동 지출을 크게 줄이고 1년 후 재정을 완전히 다른 모습으로 만들어 줍니다.',
    ],
    low: [
      '금전적으로 조심스러운 에너지가 흐릅니다. 무리한 투자나 대출, 보증은 특히 주의가 필요합니다. 비상금 3~6개월치를 확보하는 것을 최우선 목표로 삼으세요. 재정적 여유가 있어야 기회가 왔을 때 잡을 수 있습니다.',
      '재물 에너지가 약한 시기이므로 신중한 금전 관리가 필요합니다. 예상치 못한 지출이 생길 수 있으니 여유 자금을 미리 확보하세요. 지금의 절제가 다음 상승 국면을 위한 종잣돈이 됩니다.',
      '금전 에너지가 저조한 시기입니다. 새로운 투자보다 기존 자산을 지키는 데 집중하세요. 전문 재정 상담사와 상담하거나 재무 계획을 새롭게 점검하면 이 시기가 전화위복이 될 수 있습니다.',
      '오행 에너지의 흐름이 재물 영역을 약하게 만드는 시기입니다. 타인에게 돈을 빌려주거나 보증을 서는 행위는 지금 특히 주의가 필요합니다. 소비 패턴을 점검하고 불필요한 지출을 먼저 줄이는 것이 현재 최선의 전략입니다.',
    ],
  };
  const MONEY_EN = {
    high: [
      reiseiCnt > 1 ? 'Multiple Wealth Stars are active in your chart, creating strong financial momentum. Investment and income expansion are favored — but be aware that strong earning energy can also amplify outflow, so set a clear budget alongside any new ventures.' : 'Wealth Star energy is activated, making effort convert to financial results more readily. Use this window to build foundations that outlast this favorable cycle.',
      'Beneficial energy in your chart supports financial growth. Unexpected income or favorable opportunities may appear. Having a plan ready lets you capture what arrives rather than watching it pass by.',
      'Five Elements energy flows in support of economic activity. Diversifying income or expanding investments fits this period well. Long-term decisions made now with a 3-5 year view tend to outperform short-term moves.',
      'Financial energy is strong. Do not undersell your value — salary negotiations, rate increases, or partnership proposals all carry elevated success probability. Prepared confidence produces results.',
    ],
    mid: [
      'Financial fortune is stable. Consistent saving and rational spending habits serve better than chasing windfalls. Tracking spending reveals leakage you did not know existed — that awareness alone changes behavior.',
      'Wealth energy is balanced. Steady accumulation is the right strategy. Starting even a small recurring investment builds the habit that compounds significantly over a decade.',
      'Financial energy flows quietly. Focus on efficiency with existing resources. Auditing subscriptions often surfaces surprising amounts of recoverable spending.',
      'Money fortune is level. Asking yourself before each purchase whether it is a need or a want is the simplest and most effective filter against impulse spending.',
    ],
    low: [
      'Financial energy is subdued. Aggressive investment, large loans, and guaranteeing others carry elevated risk. Building a 3-6 month emergency fund is the highest-priority move right now.',
      'Wealth energy is weaker this period — careful management is essential. Unexpected expenses may arise, so holding liquid reserves matters. Today\'s discipline becomes tomorrow\'s capital.',
      'Financial energy is low. Defense is better than offense: protect existing assets rather than seeking new gains. Professional financial guidance can turn this period into a genuine planning opportunity.',
      'Energy challenges the financial sphere. Lending money to others or co-signing carries particular risk now. Auditing your spending patterns and cutting unnecessary outflows is the most available lever.',
    ],
  };

  // ── Career text (4 variants per level) ───────────────────────────────────────
  const kwanseongCnt = ss['관성'] || 0;
  const inseongCnt   = ss['인성'] || 0;
  const CAREER_KO = {
    high: [
      kwanseongCnt > 0 ? '관성(官星)이 사주에 자리하여 사회적 인정과 책임 있는 역할이 찾아오는 에너지가 강합니다. 승진·새로운 직책·중요한 프로젝트 리드 등의 기회에 자신감 있게 임하세요. 자신의 성과를 적극적으로 알리는 것이 지금 시기에 특히 중요합니다.' : '인성(印星)이 사주의 중심이 되어 배움·연구·전문성 개발에 탁월한 에너지가 흐릅니다. 새로운 기술을 습득하거나 자격증을 취득하는 것이 직업운을 크게 향상시킵니다. 지식이 가장 강력한 경쟁력이 되는 시기입니다.',
      kwanseongCnt > 0 ? '커리어 에너지가 상승 국면에 있습니다. 평소 도전하지 못했던 포지션이나 업무에 지원하기 좋은 타이밍입니다. 목표를 종이에 구체적으로 적고 실행 계획을 세우면 이 시기의 에너지를 훨씬 효율적으로 활용할 수 있습니다.' : '전문성을 키우는 데 최적화된 에너지 흐름입니다. 업계 트렌드를 공부하거나 새로운 도구와 기술을 익히는 것이 3년 후 커리어를 완전히 다른 레벨로 끌어올립니다.',
      kwanseongCnt > 0 ? '직업 에너지가 강하게 흐릅니다. 노력이 눈에 보이는 성과로 이어지며 주변의 인정이 자연스럽게 따라옵니다. 네트워킹에 시간을 투자하면 이 시기에 만나는 사람들이 미래의 중요한 연결고리가 됩니다.' : '배움의 에너지가 강하게 흐릅니다. 멘토를 찾거나 업계 전문가와의 교류를 늘리는 것이 지금 가장 효과적인 투자입니다. 배운 것을 실제로 적용하는 것까지가 완성입니다.',
      kwanseongCnt > 0 ? '사주의 성공 에너지가 직업 영역에서 발현되고 있습니다. 결단력 있게 행동할수록 더 좋은 결과가 따르며, 적절한 자기 홍보가 기회를 끌어당기는 핵심 열쇠입니다.' : '지식과 전문성이 무기가 되는 시기입니다. 자격증 취득, 강의 수강, 연구 등 전문성을 강화하는 데 투자하세요. 이 시기의 학습이 향후 협상력과 연봉에 직접적인 영향을 미칩니다.',
    ],
    mid: [
      '직업 에너지가 안정적인 흐름 속에 있습니다. 현재 맡은 역할에서 꾸준한 성과를 보여주는 것이 장기적 커리어의 토대가 됩니다. 지금은 존재감을 높이기보다 신뢰를 쌓는 데 집중하는 것이 더 현명한 전략입니다.',
      '커리어 에너지가 균형 잡힌 상태입니다. 기초 역량을 탄탄히 하고 전문성을 깊게 쌓는 것이 미래 도약을 위한 준비입니다. 매일 한 가지 새로운 것을 배우는 습관이 1년 후 큰 차이를 만듭니다.',
      '직업운이 평탄하게 흐릅니다. 현재 위치에서 전문성을 깊게 쌓는 것이 이 시기에 올바른 방향입니다. 업계 트렌드를 꾸준히 모니터링하고 학습을 멈추지 마세요.',
      '커리어 에너지가 고요한 성장의 국면에 있습니다. 화려한 도전보다 현재 업무의 완성도를 높이는 것이 더 의미 있습니다. 멘토와의 교류를 통해 다음 단계의 방향을 미리 설계하세요.',
    ],
    low: [
      '직업 에너지가 다소 저조한 시기입니다. 새로운 도전보다 현재 위치를 지키는 것이 더 중요한 국면입니다. 직장 내 불필요한 갈등을 피하고 기본에 충실하세요. 신뢰를 잃지 않는 것이 지금 가장 중요한 커리어 자산입니다.',
      '커리어 에너지가 약한 시기입니다. 무리한 이직이나 사업 전환보다 현재 역할에 집중하며 내실을 다지는 것이 현명합니다. 이 시기를 역량 강화의 기회로 삼으면 다음 성장 국면에 훨씬 유리한 위치에 서게 됩니다.',
      '직업운이 도전적인 상황을 만들 수 있는 시기입니다. 감정을 조절하며 프로답게 대처하는 것이 최우선입니다. 어려운 상황에서도 전문성을 유지하는 태도가 결국 신뢰와 기회로 돌아옵니다.',
      '커리어 에너지가 낮은 시기이므로 섣부른 직업 변경이나 큰 도전은 신중하게 고려하세요. 대신 자격증 취득이나 기술 강화에 투자하면 직업운이 회복될 때 경쟁력 있는 위치에 서게 됩니다.',
    ],
  };
  const CAREER_EN = {
    high: [
      kwanseongCnt > 0 ? 'Official Star energy signals recognition and expanded responsibility. Leadership opportunities and high-visibility projects are in the flow. Make your contributions visible — this is not the time for quiet diligence alone.' : 'Intelligence Star energy powers learning and professional development. Investing in new skills or certifications delivers outsized returns now. Knowledge is your strongest competitive advantage.',
      kwanseongCnt > 0 ? 'Career energy is ascending. Apply for the position or project you have been hesitating on — timing is favorable. Writing specific goals with an action plan lets you channel this energy far more effectively.' : 'Expertise development is your primary power source. Staying current with industry trends and acquiring new tools compounds your professional value significantly over a 3-year horizon.',
      kwanseongCnt > 0 ? 'Strong career energy means effort converts to visible results. Networking and relationship-building during this period creates connections that may define future opportunities for years.' : 'Learning energy flows strongly. Finding a mentor or deepening exchanges with industry experts is the highest-ROI investment available right now.',
      kwanseongCnt > 0 ? 'Success energy is expressing itself through your career. Decisive action produces better results, and strategic self-promotion done authentically attracts the right opportunities.' : 'Knowledge and expertise become your leverage point. Certifications and research that deepen your specialization now translate directly into negotiating power and earnings over time.',
    ],
    mid: [
      'Career fortune is steady. Consistent performance and reliability build long-term professional reputation. Focus on being the person who delivers well.',
      'Career energy is balanced. Building depth in your core competencies serves you better than pursuing dramatic change right now.',
      'Steady career flow. Deepening your specialization and monitoring industry trends matters more than big moves. Continuous learning is the only sustainable career strategy.',
      'Quiet professional growth mode. Elevating the quality of your current work matters most. A conversation with a mentor about the next chapter is well-timed.',
    ],
    low: [
      'Career energy is lower. Protecting your current position matters more than expanding. Avoid unnecessary friction, focus on reliable delivery, and preserve the trust you have built.',
      'Career energy is subdued. Forced job changes or major pivots carry higher risk. Focus on your current role and build capabilities — when growth energy returns, you will be better positioned.',
      'Challenging career conditions are possible. Emotional regulation and professional conduct are your most valuable assets right now. Composure builds lasting trust.',
      'Career energy is weak this period. Plan carefully before major moves. Instead, invest in certification or skill-building — when fortune turns, you will have a sharper edge.',
    ],
  };

  // ── Month pillar interaction ──────────────────────────────────────────────────
  const SHENG_MAP = {'木':'火','火':'土','土':'金','金':'水','水':'木'};
  const KE_MAP    = {'木':'土','火':'金','土':'水','金':'木','水':'火'};
  const dayEl = ELEMENTS[dsi];
  const mEl   = mp ? mp.element : null;
  let mpInteract = '';
  if (mEl) {
    const rel = SHENG_MAP[mEl] === dayEl ? 'born' : SHENG_MAP[dayEl] === mEl ? 'gen'
              : KE_MAP[mEl] === dayEl ? 'ke' : KE_MAP[dayEl] === mEl ? 'beKe' : 'same';
    const MONTH_KO = {
      born: `이달의 월주 오행(${mEl})이 일간(${dayEl})을 생(生)해주는 상생 구조입니다. 외부 환경이 당신의 성장을 돕는 흐름이므로, 새로운 시도와 도전에 좋은 에너지가 흐르는 달입니다. 평소보다 적극적으로 행동했을 때 좋은 결과가 따릅니다.`,
      gen:  `이달에는 일간(${dayEl})이 월주 오행(${mEl})을 생(生)해주는 흐름입니다. 에너지를 아낌없이 쏟으면 좋은 결과가 따르지만, 과도한 소모를 피하기 위해 충분한 휴식도 함께 챙기세요. 베풀수록 돌아오는 것이 있는 달입니다.`,
      ke:   `이달의 월주 오행(${mEl})이 일간(${dayEl})을 극(剋)하는 구조가 있습니다. 외부 압력이나 예상치 못한 도전이 있을 수 있으니, 평소보다 더 신중하게 결정하고 행동하는 것이 유리합니다. 성급한 결정보다 충분한 검토가 도움이 됩니다.`,
      beKe: `이달에는 일간(${dayEl})이 월주 오행(${mEl})을 극(剋)하는 흐름입니다. 자신의 뜻을 강하게 관철시킬 수 있는 에너지가 있지만, 타인과의 불필요한 충돌을 피하는 부드러운 접근도 함께 유지하세요.`,
      same: `이달의 월주와 일간이 같은 오행(${dayEl}) 계열의 에너지입니다. 자신의 본래 기질이 더욱 강하게 발현되는 달로, 강점이 극대화되는 한편 단점도 함께 증폭될 수 있으니 의식적인 균형 감각이 필요합니다.`,
    };
    const MONTH_EN = {
      born: `This month, the month pillar element (${mEl}) generates your day stem (${dayEl}) — a supportive flow. External conditions work in your favor, and proactive action tends to be rewarded more than usual.`,
      gen:  `This month, your day stem (${dayEl}) feeds the month pillar (${mEl}). Output flows freely, but ensure adequate rest to prevent depletion — giving generously tends to bring returns this month.`,
      ke:   `This month carries some tension: the month pillar (${mEl}) challenges your day stem (${dayEl}). External pressures may arise — respond with extra deliberation rather than reactive speed.`,
      beKe: `This month your day stem (${dayEl}) presses against the month pillar (${mEl}). You have strong drive to assert your direction — calibrate to avoid unnecessary friction with others.`,
      same: `This month, the month pillar shares your day stem element (${dayEl}), amplifying your core nature. Strengths become more powerful and blind spots more visible — stay intentionally balanced.`,
    };
    mpInteract = isKo ? (MONTH_KO[rel]||'') : (MONTH_EN[rel]||'');
  }

  // ── Yongsin extended practice ────────────────────────────────────────────────
  const YONGSIN_KO = {
    '木':'용신이 木인 당신은 성장과 창조의 에너지를 일상에 적극 도입해야 합니다. 초록 식물을 가까이 두거나, 동쪽 방향의 공간에서 집중 작업을 하는 것이 좋습니다. 목요일에 중요한 결정을 내리거나 새로운 일을 시작하면 흐름이 순조롭습니다. 새로운 것을 시작하는 행동 자체가 에너지를 충전하는 방법입니다.',
    '火':'용신이 火인 당신은 열정·소통·표현의 에너지를 의도적으로 키워야 합니다. 빨강이나 오렌지 계열의 소품으로 공간에 활기를 더하고, 화요일에 사람들과의 만남이나 발표를 계획하면 좋습니다. 자신의 감정과 생각을 표현하는 습관, 특히 말하거나 쓰는 것이 에너지를 살립니다.',
    '土':'용신이 土인 당신은 안정·루틴·실행의 에너지를 강화해야 합니다. 황토색이나 노란색 계열의 색상과 토요일의 재정 점검 루틴이 도움이 됩니다. 규칙적인 생활 패턴을 유지하고, 장기 계획을 문서화하여 꾸준히 실행하는 것이 행운의 토대가 됩니다.',
    '金':'용신이 金인 당신은 명확함·원칙·결단의 에너지를 일상에 더해야 합니다. 흰색이나 회색 계열, 서쪽 방향의 공간 정리, 금요일에 중요한 계약이나 협상을 배치하는 것이 유리합니다. 불필요한 것을 비우고 공간과 생각을 정리하는 것 자체가 행운을 부르는 행동입니다.',
    '水':'용신이 水인 당신은 직관·유연성·지혜의 에너지를 일상에 보충해야 합니다. 검정이나 짙은 파란 계열의 색상을 활용하고, 수요일에 중요한 결정이나 창의적 작업을 집중하면 좋습니다. 명상·일기쓰기·물 근처 산책이 내면의 소리를 듣게 해주고 직관을 깨웁니다.',
  };
  const YONGSIN_EN = {
    '木':'Your balancing element is Wood. Surround yourself with green plants, orient your workspace eastward, and leverage Thursdays for new starts. Beginning new things is itself an act of energizing this element.',
    '火':'Your balancing element is Fire. Use red or orange accents in your space, schedule key meetings and presentations on Tuesdays, and practice expressing your thoughts and feelings more openly.',
    '土':'Your balancing element is Earth. Yellow and brown tones, a Saturday financial review routine, and consistent daily habits will anchor your fortune and provide a stable foundation.',
    '金':'Your balancing element is Metal. Clear your space of clutter, use white or grey tones, and leverage Fridays for contracts, negotiations, and analytical decisions.',
    '水':'Your balancing element is Water. Meditate regularly, keep a journal, spend time near water, and use Wednesdays for creative and intuitive work.',
  };

  // ── Hour pillar note ─────────────────────────────────────────────────────────
  let hpSection = '';
  if (hp) {
    const hpEl = hp.element;
    const hpChar = STEMS[hp.stemIdx] + BRANCHES[hp.branchIdx];
    const hpKoName = STEM_KO[hp.stemIdx] + BRANCH_KO[hp.branchIdx];
    const isYongsin = hpEl === ys;
    if (isKo) {
      hpSection = `시주(${hpChar}, ${hpKoName})가 사주에 추가되어 ${hp ? '4주(四柱)' : '3주(三柱)'} 완전 분석이 이루어졌습니다. 시주의 오행 <strong style="color:#fbbf24;">${hpEl}</strong>이(가) ${isYongsin ? '바로 용신 에너지와 일치하여, 타고난 사주가 스스로 균형을 보완하는 매우 길한 구조입니다. 이 에너지를 생활 속에서 적극 활용하세요.' : '사주 전체에 추가적인 에너지를 더합니다. 태어난 시간의 기운을 인식하고 일상에서 활용하면 삶의 방향이 더 명확해집니다.'}`;
    } else {
      hpSection = `Your hour pillar (${hpChar}) brings ${hpEl} element energy, ${isYongsin ? 'which directly reinforces your balancing element — a very favorable configuration that helps you find balance naturally.' : 'adding an extra layer of nuance to your chart. Awareness of this energy can clarify your daily direction.'}`;
    }
  }

  // ── Assemble HTML ────────────────────────────────────────────────────────────
  const SEP  = '<div style="height:1px;background:rgba(255,255,255,.1);margin:16px 0;"></div>';
  const SLBL = (t) => `<div style="font-size:9px;font-weight:800;color:#c4b5fd;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">${t}</div>`;
  const PARA = (t) => `<p style="font-size:13px;color:#e0e7ff;line-height:1.88;margin:0 0 9px;">${t}</p>`;

  const LABELS = isKo
    ? { stem:'✦ 일간(日干) 성격 분석', ohaeng:'✦ 오행 에너지 흐름', monthPillar:'✦ 이달의 에너지 흐름', love:'✦ 연애운 심층 분석', money:'✦ 금전운 분석', career:'✦ 직업·성공운 분석', yongsin:'✦ 용신 활용 — 운을 높이는 실천법', hp:'✦ 시주(時柱) 추가 분석' }
    : { stem:'✦ Day Stem Personality', ohaeng:'✦ Five Elements Balance', monthPillar:"✦ This Month's Energy", love:'✦ Love & Relationships', money:'✦ Wealth & Finance', career:'✦ Career & Success', yongsin:'✦ Balancing Element — Daily Practice', hp:'✦ Hour Pillar Insights' };

  const loveLevel   = lv.level || 'mid';
  const moneyLevel  = mv.level || 'mid';
  const careerLevel = cv.level || 'mid';

  const scorePill = (score, color) => {
    const bg  = score >= 73 ? color + '33' : score >= 47 ? color + '22' : 'rgba(156,163,175,.15)';
    const txt = score >= 73 ? color : score >= 47 ? color + 'cc' : '#9ca3af';
    return `<span style="background:${bg};border-radius:20px;padding:2px 9px;font-size:10px;font-weight:700;color:${txt};margin-left:6px;">${score}${isKo ? '점' : ''}</span>`;
  };

  let html = SEP;

  // 1 · Day Stem
  html += `<div style="margin-bottom:18px;">${SLBL(LABELS.stem)}`;
  html += `<div style="display:inline-block;background:rgba(251,191,36,.13);border:1px solid rgba(251,191,36,.35);border-radius:8px;padding:5px 12px;font-size:11px;font-weight:800;color:#fbbf24;margin-bottom:11px;">${stemTag}</div>`;
  html += PARA(p1) + PARA(p2) + PARA(p3);
  if (branchTrait) html += PARA(branchTrait);
  html += '</div>';

  // 2 · Ohaeng
  html += SEP;
  html += `<div style="margin-bottom:18px;">${SLBL(LABELS.ohaeng)}${PARA(ohaengBody)}</div>`;

  // 2b · Month pillar interaction
  if (mpInteract) {
    html += SEP;
    html += `<div style="margin-bottom:18px;">${SLBL(LABELS.monthPillar)}${PARA(mpInteract)}</div>`;
  }

  // 3 · Love
  const loveTxt = isKo ? ((LOVE_KO[loveLevel]||LOVE_KO.mid)[v]||(LOVE_KO.mid)[0]) : ((LOVE_EN[loveLevel]||LOVE_EN.mid)[v]||(LOVE_EN.mid)[0]);
  html += SEP;
  html += `<div style="margin-bottom:18px;">${SLBL(LABELS.love + scorePill(lv.score||50,'#f472b6'))}${PARA(loveTxt)}</div>`;

  // 4 · Money
  const moneyTxt = isKo ? ((MONEY_KO[moneyLevel]||MONEY_KO.mid)[v]||(MONEY_KO.mid)[0]) : ((MONEY_EN[moneyLevel]||MONEY_EN.mid)[v]||(MONEY_EN.mid)[0]);
  html += SEP;
  html += `<div style="margin-bottom:18px;">${SLBL(LABELS.money + scorePill(mv.score||50,'#fbbf24'))}${PARA(moneyTxt)}</div>`;

  // 5 · Career
  const careerTxt = isKo ? ((CAREER_KO[careerLevel]||CAREER_KO.mid)[v]||(CAREER_KO.mid)[0]) : ((CAREER_EN[careerLevel]||CAREER_EN.mid)[v]||(CAREER_EN.mid)[0]);
  html += SEP;
  html += `<div style="margin-bottom:18px;">${SLBL(LABELS.career + scorePill(cv.score||50,'#818cf8'))}${PARA(careerTxt)}</div>`;

  // 6 · Yongsin
  const ysTxt = isKo ? (YONGSIN_KO[ys]||'') : (YONGSIN_EN[ys]||'');
  if (ysTxt) {
    html += SEP;
    html += `<div style="margin-bottom:18px;">${SLBL(LABELS.yongsin)}${PARA(ysTxt)}</div>`;
  }

  // 7 · Hour Pillar
  if (hpSection) {
    html += SEP;
    html += `<div style="margin-bottom:4px;">${SLBL(LABELS.hp)}${PARA(hpSection)}</div>`;
  }

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
    <div style="font-size:11px;font-weight:700;color:#c4b5fd;margin-bottom:6px;letter-spacing:.5px;">${({en:'Life Path',de:'Lebenspfad',fr:'Chemin de Vie',es:'Camino de Vida',pt:'Caminho de Vida',it:'Percorso di Vita'})[lang]||'Life Path'} ${lpn}</div>
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
function renderFortuneSummaryGrid(data, onlyCat) {
  const el = document.getElementById('fortune-summary-grid');
  if (!el || !data.fortuneScores) return;
  const L = window.LUCKY_LANG || {};
  const S = data.fortuneScores;
  const activeCat = window.LUCKY_SELECTED_CAT || 'lucky';
  let cats = [
    { key:'love',        icon: L.catLoveIcon||'💝',        label: L.catLove||'연애운',   color:'#ec4899' },
    { key:'money',       icon: L.catMoneyIcon||'💰',       label: L.catMoney||'금전운',  color:'#d97706' },
    { key:'career',      icon: L.catCareerIcon||'💼',      label: L.catCareer||'직업운', color:'#4338ca' },
    { key:'achievement', icon: L.catAchievementIcon||'🏆', label: L.catAchievement||'성취운', color:'#7c3aed' },
  ];
  if (onlyCat) cats = cats.filter(c => c.key === onlyCat); // 집중형: 선택한 운만 표시
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

// ── 세운(歲運) — Current Year Fortune ────────────────────
function renderSeunPanel(data) {
  const sd = data.seunData;
  if (!sd) return;
  const L = window.LUCKY_LANG || {};
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const EC = {'木':'#16a34a','火':'#dc2626','土':'#d97706','金':'#64748b','水':'#1d4ed8'};
  const EKO = {'木':'목','火':'화','土':'토','金':'금','水':'수'};
  const seunColor = EC[sd.seunEl]||'#d97706';
  const YGZ = `${STEMS[sd.si]}${BRANCHES[sd.bi]}`;

  const SIPSIN_TXT = {
    ko:{'비겁':'비겁(比劫) — 경쟁과 독립의 해. 동료·형제·경쟁자와의 관계가 부각되며, 주체성과 독립심이 강해집니다.',
        '식상':'식상(食傷) — 창의와 표현의 해. 새로운 아이디어·기술·부업이 꽃피는 시기. 말과 글의 기운이 강합니다.',
        '재성':'재성(財星) — 재물과 활동의 해. 투자·수입·사업에 중요한 변화가 생깁니다. 이성 인연도 강화됩니다.',
        '관성':'관성(官星) — 명예와 책임의 해. 직업적 기회·승진·공적 인정이 옵니다. 법과 규범을 준수하세요.',
        '인성':'인성(印星) — 배움과 보호의 해. 지식 습득·자격증·귀인의 도움이 따릅니다. 학업·연구에 최적입니다.'},
    en:{'비겁':'Peers Year — Independence and competition. Rivals and allies emerge; assert your identity.',
        '식상':'Expression Year — Creativity and skills flourish. Ideas, writing, and side projects thrive.',
        '재성':'Wealth Year — Finance and activity increase. Key changes in income and business.',
        '관성':'Authority Year — Career, promotion, and recognition arrive. Duties and rules matter.',
        '인성':'Wisdom Year — Learning, credentials, and mentors come to your aid. Study and research excel.'},
    ja:{'비겁':'比劫年 — 競争と独立。仲間やライバルとの関係が鍵。',
        '식상':'食傷年 — 創造と表現が花開く。アイデア・副業・技術が輝く。',
        '재성':'財星年 — 財と活動が増す。収入・投資・ビジネスに変化。',
        '관성':'官星年 — キャリア・昇進・社会的評価のチャンス。規律を守ること。',
        '인성':'印星年 — 学習・資格・貴人に恵まれる。勉強や研究に最適。'},
  };

  const LUCK_INFO = {
    good:    {icon:'✅', ko:'길(吉) — 용신에 힘을 더하는 해입니다',     en:'Favorable — boosts your balancing element',    ja:'吉 — 用神を強める年'},
    neutral: {icon:'⚖️', ko:'평(平) — 큰 변화 없이 안정적인 해',       en:'Stable — steady year, no major disruptions',   ja:'平 — 安定した年'},
    caution: {icon:'⚠️', ko:'주의(注意) — 신중한 결정이 필요한 해',     en:'Caution — careful judgment required this year', ja:'注意 — 慎重な判断が必要'},
    bad:     {icon:'🔴', ko:'흉(凶) — 도전과 역경에 대비해야 하는 해', en:'Challenging — prepare for obstacles',            ja:'凶 — 困難に備える'},
  };

  const lk = LUCK_INFO[sd.luck]||LUCK_INFO.neutral;
  const sipsinTxt = ((SIPSIN_TXT[lang]||SIPSIN_TXT.en)[sd.sipsin]) || '';
  const title = isKo?`${sd.cy}년(${YGZ}年) 세운(歲運)`:isJa?`${sd.cy}年(${YGZ}年)歲運`:`${sd.cy} Annual Fortune (${YGZ})`;

  let relHtml = '';
  sd.rels.forEach(r => {
    const rc = r.type==='合' ? '#16a34a' : '#dc2626';
    relHtml += `<span style="display:inline-flex;align-items:center;gap:3px;background:${rc}15;border:1px solid ${rc}40;border-radius:6px;padding:3px 8px;font-size:11px;color:${rc};font-weight:700;margin:2px;">${r.type==='合'?'🔗':'⚔️'} ${isKo?'세운':'歲運'}${BRANCHES[sd.bi]} × ${r.label}支${BRANCHES[r.bi]} → ${r.type}</span>`;
  });

  const tipLine = isKo
    ? `💡 올해 행운 방위: <strong>${getDirectionByElement(sd.seunEl,'ko')}</strong> · 행운 색상: <strong style="color:${seunColor}">${ELEMENT_COLOR[sd.seunEl]?.name||'—'}</strong>`
    : isJa
    ? `💡 今年のラッキー方位: <strong>${getDirectionByElement(sd.seunEl,'ja')}</strong> · カラー: <strong style="color:${seunColor}">${ELEMENT_COLOR[sd.seunEl]?.en||'—'}</strong>`
    : `💡 Lucky direction: <strong>${getDirectionByElement(sd.seunEl,'en')}</strong> · Color: <strong style="color:${seunColor}">${ELEMENT_COLOR[sd.seunEl]?.en||'—'}</strong>`;

  const div = document.createElement('div');
  div.id = 'seun-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #86efac;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#166534;margin-bottom:12px;letter-spacing:.3px;">🌿 ${title}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
      <div style="background:${seunColor};border-radius:12px;padding:10px 14px;text-align:center;flex-shrink:0;">
        <div style="font-size:24px;font-weight:900;color:#fff;">${YGZ}</div>
        <div style="font-size:10px;color:rgba(255,255,255,.85);font-weight:600;margin-top:2px;">${isKo?`${STEM_KO[sd.si]}${BRANCH_KO[sd.bi]}년`:YGZ+'年'}</div>
        <div style="font-size:10px;color:rgba(255,255,255,.8);margin-top:1px;">${sd.seunEl} ${isKo?EKO[sd.seunEl]:sd.seunEl}</div>
      </div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:700;color:#14532d;margin-bottom:5px;">${lk.icon} ${lk[lang]||lk.en}</div>
        <div style="font-size:11px;color:#15803d;font-weight:700;margin-bottom:4px;">${isKo?`일간과의 십신: ${sd.sipsin}`:isJa?`日干との十神: ${sd.sipsin}`:`Relationship: ${sd.sipsin}`}</div>
        <div style="font-size:11px;color:#166534;line-height:1.65;">${sipsinTxt}</div>
      </div>
    </div>
    ${relHtml?`<div style="margin-bottom:10px;flex-wrap:wrap;display:flex;">${relHtml}</div>`:''}
    <div style="background:rgba(22,101,52,.06);border-radius:8px;padding:8px 12px;font-size:11px;color:#166534;line-height:1.6;">${tipLine}</div>`;

  const detail = document.getElementById('detailed-reading-panel');
  if (detail) detail.after(div);
  else document.querySelector('.share-section')?.before(div);
}

// ── 합충(合冲) — Pillar Interactions ─────────────────────
function renderHapChongPanel(data) {
  const hc = data.hapChongData;
  if (!hc || !hc.length) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const title = isKo?'사주 내 합충파(合冲破) 분석':isJa?'命式内合冲分析':'Pillar Harmony & Conflict';

  const TYPE_META = {
    '天干合': {ko:'천간합(天干合) — 두 천간이 결합해 새 오행 생성. 강화된 안정 에너지.',
               en:'Stem Harmony — Two stems unite, generating new elemental energy.',
               ja:'天干合 — 天干が結合し新たな五行を生む。安定エネルギー強化。',
               lc:'good', bc:'#16a34a'},
    '地支六合':{ko:'지지 육합(六合) — 음양 결합으로 안정과 조화의 기운.',
               en:'Six Harmony — Yin-yang branch pairing brings stability.',
               ja:'六合 — 陰陽の結合による安定と調和。',
               lc:'good', bc:'#16a34a'},
    '地支六冲':{ko:'지지 육충(六冲) — 지지 충돌. 변화·이동·불안정이 따르나 돌파력이 생김.',
               en:'Six Conflict — Branch clash brings change, movement, and breakthrough energy.',
               ja:'六冲 — 地支の衝突。変化・移動・突破力。',
               lc:'caution', bc:'#d97706'},
    '三合局':  {ko:'삼합국(三合局) 완성 — 해당 오행 에너지 극대화. 강력한 기운.',
               en:'Three Harmony Complete — Maximum elemental energy concentration.',
               ja:'三合局成立 — 五行エネルギー最大化。',
               lc:'great', bc:'#7c3aed'},
    '半三合':  {ko:'반삼합(半三合) — 미완성이지만 삼합 효과의 절반 이상.',
               en:'Partial Three Harmony — Half of Three Harmony effect applies.',
               ja:'半三合 — 三合の半分以上の効果。',
               lc:'good', bc:'#4338ca'},
  };

  const bgMap  = {great:'#f5f3ff',good:'#f0fdf4',caution:'#fffbeb'};
  const items = hc.map(item => {
    const m = TYPE_META[item.type] || TYPE_META['地支六合'];
    const bg = bgMap[item.luck] || '#f8fafc';
    const pl = item.p1&&item.p2 ? ` (${item.p1}柱↔${item.p2}柱)` : '';
    return `<div style="background:${bg};border-left:3px solid ${m.bc};border-radius:0 10px 10px 0;padding:10px 12px;margin-bottom:8px;">
      <div style="font-size:12px;font-weight:800;color:${m.bc};">${item.sub}${pl}</div>
      <div style="font-size:11px;color:#475569;margin-top:3px;line-height:1.55;">${m[lang]||m.en}</div>
    </div>`;
  }).join('');

  const div = document.createElement('div');
  div.id = 'hapchong-panel';
  div.style.cssText = 'background:#f8fafc;border:2px solid #e2e8f0;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `<div style="font-size:12px;font-weight:800;color:#1e293b;margin-bottom:12px;">⚡ ${title}</div>${items}`;

  const seun = document.getElementById('seun-panel');
  const detail = document.getElementById('detailed-reading-panel');
  if (seun) seun.after(div);
  else if (detail) detail.after(div);
}

// ── 신살(神殺) — Special Stars ────────────────────────────
function renderShinsalPanel(data) {
  const ss = data.shinsalData;
  if (!ss) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const title = isKo?'신살(神殺) 분석':isJa?'神殺分析':'Special Star Analysis';

  const STAR_DEF = {
    dohwa: {
      icon:'🌸', nameKo:'도화살(桃花殺)', nameEn:'Peach Blossom', nameJa:'桃花殺',
      ko:'이성에게 매력적이고 예술·미적 감수성이 풍부합니다. 사교성과 표현력이 강하며 대인관계 운이 두드러집니다.',
      en:'Strong magnetic charm and artistic sensitivity. Outstanding social skills and romantic luck.',
      ja:'異性への魅力と芸術的感受性が豊か。社交性・表現力・対人運が際立つ。',
    },
    yuma: {
      icon:'🐎', nameKo:'역마살(驛馬殺)', nameEn:'Traveling Star', nameJa:'驛馬殺',
      ko:'이동과 변화를 즐기는 활동적 기질. 여행·출장·이사·전직 등 이동 관련 기회가 자주 찾아옵니다.',
      en:'Dynamic nature thriving on movement. Travel, relocation, and career changes come frequently.',
      ja:'移動・変化を好む活動的な気質。旅行・転勤・転職の機会が多い。',
    },
    hwagae: {
      icon:'🎨', nameKo:'화개살(華蓋殺)', nameEn:'Canopy Star', nameJa:'華蓋殺',
      ko:'예술·철학·종교에 탁월한 소질. 혼자 집중할 때 최고 능력 발휘. 고독 속에서 빛나는 타입입니다.',
      en:'Gifted in arts, philosophy, or spirituality. Shines brightest in solitary focused work.',
      ja:'芸術・哲学・宗教に優れた才能。孤独の中でこそ輝く個性。',
    },
  };

  const stars = [];

  // 도화/역마/화개
  ['dohwa','yuma','hwagae'].forEach(k => {
    if (!ss.found[k].length) return;
    const def = STAR_DEF[k];
    const nm = isKo?def.nameKo:isJa?def.nameJa:def.nameEn;
    stars.push({icon:def.icon, name:`${nm} (${ss.found[k].join('·')})`, txt:def[lang]||def.en, color:k==='dohwa'?'#ec4899':k==='yuma'?'#d97706':'#7c3aed'});
  });

  // 공망
  if (ss.gmInChart.length) {
    const gn = ss.gmInChart.join('·');
    const txt = isKo
      ? `공망(空亡) ${gn} — 해당 지지의 영역에서 기대보다 결실이 적거나 허무함을 느낄 수 있습니다. 반면 종교·철학·예술에서 뛰어난 집중력을 발휘하는 경향이 있습니다.`
      : isJa
      ? `空亡(${gn}) — 対応する分野で結実が薄いが、精神・芸術面での集中力が際立つ。`
      : `Void (${gn}) — Related life areas feel unfulfilling; exceptional focus in spiritual/artistic fields.`;
    stars.push({icon:'🕳️', name:isKo?`공망 ${gn}`:isJa?`空亡 ${gn}`:`Void ${gn}`, txt, color:'#64748b'});
  }

  // 원진살
  ss.wongin.forEach(pair => {
    const txt = isKo
      ? `원진살(怨嗔殺) ${pair} — 깊은 인연이지만 오래되면 오해와 갈등이 생기기 쉽습니다. 가까울수록 적정 거리 유지가 중요합니다.`
      : isJa
      ? `怨嗔殺(${pair}) — 深い縁だが長くなると摩擦が生じやすい。適切な距離感が重要。`
      : `Resentment Star (${pair}) — Deep karmic bonds that can turn to friction. Maintain healthy boundaries.`;
    stars.push({icon:'🌀', name:isKo?`원진 ${pair}`:isJa?`怨嗔${pair}`:`Grudge ${pair}`, txt, color:'#dc2626'});
  });

  // 백호살
  if (ss.baekho) {
    const txt = isKo
      ? `백호살(白虎殺) — 강렬하고 날카로운 기운의 일주입니다. 의술·법조·경찰·군인 등 전문직에서 탁월합니다. 사고나 외상에 주의하되, 이 에너지를 전문 분야에서 활용하면 큰 능력을 발휘합니다.`
      : isJa
      ? `白虎殺 — 鋭く強烈なエネルギーの日柱。医師・法律家・警察・軍人などで卓越。専門分野でこのエネルギーを活かして。`
      : `White Tiger Star — Intense, sharp energy in your day pillar. Excellence in medicine, law enforcement, or military. Channel this power into professional mastery.`;
    stars.push({icon:'🐯', name:isKo?'백호살(白虎殺)':isJa?'白虎殺':'White Tiger', txt, color:'#b45309'});
  }

  // 신살 없는 경우
  if (!stars.length) {
    const txt = isKo?'특별한 신살이 없습니다. 오행이 균형 잡힌 안정적인 사주입니다.':isJa?'特別な神殺はありません。五行バランスの良い命式。':'No special stars detected — a well-balanced chart with harmonious energies.';
    stars.push({icon:'⭐', name:'', txt, color:'#16a34a'});
  }

  const items = stars.map(s => `
    <div style="display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.06);">
      <div style="background:${s.color}18;border:1px solid ${s.color}40;border-radius:10px;padding:8px;flex-shrink:0;text-align:center;min-width:46px;">
        <div style="font-size:20px;">${s.icon}</div>
        ${s.name?`<div style="font-size:8px;color:${s.color};font-weight:700;margin-top:2px;line-height:1.3;">${s.name}</div>`:''}
      </div>
      <div style="font-size:12px;color:#374151;line-height:1.7;">${s.txt}</div>
    </div>`).join('');

  const div = document.createElement('div');
  div.id = 'shinsal-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#fff7ed,#fef3c7);border:2px solid #fde68a;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `<div style="font-size:12px;font-weight:800;color:#92400e;margin-bottom:14px;">⭐ ${title}</div>${items}`;

  const hap = document.getElementById('hapchong-panel');
  const seun = document.getElementById('seun-panel');
  const detail = document.getElementById('detailed-reading-panel');
  if (hap) hap.after(div);
  else if (seun) seun.after(div);
  else if (detail) detail.after(div);
}

// ── 십이운성(十二運星) 패널 ──────────────────────────────
function renderSipiunsungPanel(data) {
  const siu = data.sipiunsungData;
  if (!siu || !siu.length) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const title = isKo ? '십이운성(十二運星) — 생명력 단계'
              : isJa ? '十二運星 — 生命力ステージ'
              : 'Twelve Energy Stages';

  const STAGE_META = {
    '長生':{icon:'🌱',ko:'장생 — 새로운 생명력, 밝고 순수한 시작의 에너지',en:'Birth — fresh vitality, pure beginning',ja:'長生 — 新しい生命力、純粋な始まり',lv:3},
    '沐浴':{icon:'🚿',ko:'목욕 — 감수성이 예민하고 매력적이지만 변동이 잦음',en:'Bath — sensitive charm, frequent changes',ja:'沐浴 — 感受性豊か、変動が多い',lv:2},
    '冠帶':{icon:'🎓',ko:'관대 — 사회에 첫발을 내딛는 야심과 성장의 에너지',en:'Crown — ambitious growth, social debut',ja:'冠帯 — 意欲的な成長、社会デビュー',lv:3},
    '建祿':{icon:'🏢',ko:'건록 — 실력이 인정받고 자립하는 전성기 전 단계',en:'Establishment — skill recognized, independence',ja:'建禄 — 実力が認められ自立する段階',lv:3},
    '帝旺':{icon:'👑',ko:'제왕 — 가장 강한 에너지, 카리스마와 지도력의 절정',en:'Emperor — peak power, charisma, leadership',ja:'帝旺 — 最強のエネルギー、カリスマと指導力',lv:3},
    '衰':{icon:'🌅',ko:'쇠 — 에너지가 서서히 약해지는 노련한 원숙기',en:'Decline — mature wisdom, fading energy',ja:'衰 — ゆっくりと衰えゆく熟練の時期',lv:2},
    '病':{icon:'🤒',ko:'병 — 신경이 예민하고 감수성이 강한 내면적 기질',en:'Sickness — sensitive, introspective nature',ja:'病 — 神経質で感受性の強い内省的気質',lv:1},
    '死':{icon:'🌑',ko:'사 — 외유내강형, 집중력과 통찰력이 비범함',en:'Death — iron will beneath calm exterior',ja:'死 — 外柔内剛、集中力と洞察力が非凡',lv:2},
    '墓':{icon:'⚱️',ko:'묘 — 내면에 모으는 힘, 재물과 집착의 에너지',en:'Tomb — accumulating power, attachment energy',ja:'墓 — 内に蓄える力、財と執着のエネルギー',lv:2},
    '絕':{icon:'🌫️',ko:'절 — 이상주의적이고 상상력이 풍부한 영적 기운',en:'Void — idealistic, rich imagination',ja:'絶 — 理想主義的で想像力豊かな霊的気運',lv:1},
    '胎':{icon:'🥚',ko:'태 — 순수하고 유연한 잠재력, 환경 영향을 잘 받음',en:'Conception — pure potential, highly adaptable',ja:'胎 — 純粋で柔軟な潜在力、環境影響を受けやすい',lv:2},
    '養':{icon:'🌿',ko:'양 — 보호받으며 성장하는 온화하고 의존적 기운',en:'Nurture — gentle growth under protection',ja:'養 — 保護のもとで育つ穏やかな依存的気運',lv:2},
  };
  const LV_CLR = ['#9ca3af','#6b7280','#4f46e5','#7c3aed'];

  const cards = siu.map(p => {
    const meta = STAGE_META[p.siu.name] || {};
    const icon = meta.icon || '○';
    const desc = isKo ? (meta.ko||p.siu.name) : isJa ? (meta.ja||p.siu.name) : (meta.en||p.siu.name);
    const lv   = meta.lv ?? 2;
    const clr  = LV_CLR[lv] || '#4f46e5';
    const border = p.isDay ? `border:2px solid ${clr};` : `border:1px solid ${clr}40;`;
    return `<div style="background:#fff;${border}border-radius:14px;padding:12px 10px;text-align:center;flex:1;min-width:0;">
      <div style="font-size:12px;font-weight:700;color:#64748b;margin-bottom:4px;">${p.lbl}주</div>
      <div style="font-size:13px;font-weight:800;color:#1e1b4b;margin-bottom:6px;">${p.gz}</div>
      <div style="font-size:20px;margin-bottom:4px;">${icon}</div>
      <div style="font-size:11px;font-weight:800;color:${clr};">${p.siu.name}</div>
      <div style="font-size:9px;color:#6b7280;line-height:1.5;margin-top:4px;">${desc}</div>
    </div>`;
  }).join('');

  const div = document.createElement('div');
  div.id = 'sipiunsung-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#eef2ff,#e0e7ff);border:2px solid #a5b4fc;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `<div style="font-size:12px;font-weight:800;color:#3730a3;margin-bottom:14px;">🌀 ${title}</div>
    <div style="display:flex;gap:8px;">${cards}</div>`;

  const shinsal = document.getElementById('shinsal-panel');
  const hap     = document.getElementById('hapchong-panel');
  const seun    = document.getElementById('seun-panel');
  const detail  = document.getElementById('detailed-reading-panel');
  const anchor  = shinsal || hap || seun || detail;
  if (anchor) anchor.after(div);
}

// ── 일주론(日柱論) 패널 ──────────────────────────────────
function renderIljuronPanel(data) {
  const ij = data.iljuronData;
  if (!ij) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const title = isKo ? `일주론 — ${ij.ganzhi}일주 분석`
              : isJa ? `日柱論 — ${ij.ganzhi}日柱分析`
              : `Day Pillar — ${ij.ganzhi} Archetype`;
  const e = ILJURON_60[ij.cycleIdx];
  if (!e) return;
  const nameStr = isKo ? ij.name : ij.ganzhi;
  const STAGE_META2 = {
    '長生':{icon:'🌱',ko:'장생',en:'Birth',ja:'長生'},
    '沐浴':{icon:'🚿',ko:'목욕',en:'Bath',ja:'沐浴'},
    '冠帶':{icon:'🎓',ko:'관대',en:'Crown',ja:'冠帯'},
    '建祿':{icon:'🏢',ko:'건록',en:'Establish',ja:'建禄'},
    '帝旺':{icon:'👑',ko:'제왕',en:'Emperor',ja:'帝旺'},
    '衰':{icon:'🌅',ko:'쇠',en:'Decline',ja:'衰'},
    '病':{icon:'🤒',ko:'병',en:'Sick',ja:'病'},
    '死':{icon:'🌑',ko:'사',en:'Still',ja:'死'},
    '墓':{icon:'⚱️',ko:'묘',en:'Tomb',ja:'墓'},
    '絕':{icon:'🌫️',ko:'절',en:'Void',ja:'絶'},
    '胎':{icon:'🥚',ko:'태',en:'Seed',ja:'胎'},
    '養':{icon:'🌿',ko:'양',en:'Nurture',ja:'養'},
  };
  const sm = STAGE_META2[ij.sipiunsung.name] || {};
  const siuLabel = isKo ? `${ij.sipiunsung.name}(${sm.ko||''})` : isJa ? `${ij.sipiunsung.name}(${sm.ja||''})` : `${ij.sipiunsung.name} (${sm.en||''})`;
  const personalityLbl = isKo?'성격·기질':isJa?'性格・気質':'Personality';
  const careerLbl = isKo?'적합 직업':isJa?'適職':'Best Careers';
  const loveLbl   = isKo?'연애 스타일':isJa?'恋愛スタイル':'Love Style';
  const siuLbl    = isKo?'일주 십이운성':isJa?'日柱十二運星':'Day Pillar Stage';

  const careerBadges = e[2].split('·').map(c =>
    `<span style="background:#e0e7ff;color:#3730a3;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700;margin:2px 2px;display:inline-block;">${c.trim()}</span>`
  ).join('');

  const div = document.createElement('div');
  div.id = 'iljuron-panel';
  div.style.cssText = 'background:#fff;border:2px solid #ddd6fe;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#5b21b6;margin-bottom:14px;">🧬 ${title}</div>
    <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);border-radius:14px;padding:14px 16px;margin-bottom:14px;color:#fff;">
      <div style="font-size:10px;font-weight:600;opacity:.8;margin-bottom:4px;">${nameStr}</div>
      <div style="font-size:13px;font-weight:800;line-height:1.6;">${e[1]}</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
      <div style="background:#f8fafc;border-radius:12px;padding:10px 12px;">
        <div style="font-size:10px;font-weight:700;color:#64748b;margin-bottom:6px;">${careerLbl}</div>
        <div>${careerBadges}</div>
      </div>
      <div style="background:#fdf4ff;border-radius:12px;padding:10px 12px;">
        <div style="font-size:10px;font-weight:700;color:#a21caf;margin-bottom:6px;">${loveLbl}</div>
        <div style="font-size:12px;color:#374151;line-height:1.6;">${e[3]}</div>
      </div>
    </div>
    <div style="background:#f0fdf4;border-radius:10px;padding:8px 12px;display:flex;align-items:center;gap:8px;">
      <span style="font-size:18px;">${sm.icon||'○'}</span>
      <div><span style="font-size:10px;font-weight:700;color:#166534;">${siuLbl}: </span><span style="font-size:11px;color:#374151;font-weight:600;">${siuLabel}</span></div>
    </div>`;

  const siuPanel = document.getElementById('sipiunsung-panel');
  const shinsal  = document.getElementById('shinsal-panel');
  const hap      = document.getElementById('hapchong-panel');
  const seun     = document.getElementById('seun-panel');
  const detail   = document.getElementById('detailed-reading-panel');
  const anchor   = siuPanel || shinsal || hap || seun || detail;
  if (anchor) anchor.after(div);
}

// ── 월운(月運) 패널 ──────────────────────────────────────
function renderWoluunPanel(data) {
  const wu = data.woluunData;
  if (!wu) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const MONTH_KO = ['','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  const MONTH_JA = ['','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const monthStr = isKo ? `${wu.cy}년 ${MONTH_KO[wu.cm]}` : isJa ? `${wu.cy}年${MONTH_JA[wu.cm]}` : `${MONTH_KO[wu.cm]} ${wu.cy}`;
  const title = isKo ? `월운(月運) — ${monthStr}` : isJa ? `月運 — ${monthStr}` : `Monthly Fortune — ${monthStr}`;

  const SIPSIN_KO = {비겁:'비겁(比劫)',식상:'식상(食傷)',재성:'재성(財星)',관성:'관성(官星)',인성:'인성(印星)'};
  const SIPSIN_EN = {비겁:'Sibling Star',식상:'Expression Star',재성:'Wealth Star',관성:'Authority Star',인성:'Intelligence Star'};
  const SIPSIN_JA = {비겁:'比劫',식상:'食傷',재성:'財星',관성:'官星',인성:'印星'};
  const sipsinLabel = isKo ? (SIPSIN_KO[wu.sipsin]||wu.sipsin) : isJa ? (SIPSIN_JA[wu.sipsin]||wu.sipsin) : (SIPSIN_EN[wu.sipsin]||wu.sipsin);

  const REL_KO = {
    same:'이달은 일간과 같은 오행입니다. 자신감과 독립심이 강해지는 달입니다.',
    gen:'이달 기운이 일간을 생해줍니다. 지원과 기회가 많아집니다.',
    ctrl:'이달 기운이 일간을 극합니다. 도전과 긴장이 높아지나 성취 기회도 있습니다.',
    drain:'일간이 이달 기운을 설기합니다. 에너지 소모가 크니 페이스 조절이 필요합니다.',
    dominate:'일간이 이달 기운을 극합니다. 의지와 목표 달성 능력이 돋보이는 달입니다.',
  };
  const REL_EN = {
    same:'This month shares your day-element. Self-confidence and independence rise.',
    gen:'This month\'s energy supports yours. Opportunities and support flow in.',
    ctrl:'Month energy challenges yours. Tension rises but achievements are possible.',
    drain:'Your energy feeds this month. Manage your pace carefully.',
    dominate:'You dominate this month\'s energy. Your willpower and goal achievement shine.',
  };
  const REL_JA = {
    same:'今月は日干と同じ五行。自信と独立心が高まる月。',
    gen:'今月の気が日干を生じる。支援と機会が増える月。',
    ctrl:'今月の気が日干を剋する。緊張は高まるが達成の機会もある。',
    drain:'日干が今月の気を洩らす。ペース配分が重要。',
    dominate:'日干が今月の気を剋する。意志力と目標達成能力が際立つ。',
  };

  const relKey = wu.rel;
  const relTxt  = isKo ? (REL_KO[relKey]||'') : isJa ? (REL_JA[relKey]||'') : (REL_EN[relKey]||'');
  const relsHtml = wu.rels && wu.rels.length ? wu.rels.map(r => {
    const badge = r.type === 'hap' ? (isKo?'합':'合') : r.type === 'chong' ? (isKo?'충':'冲') : (isKo?'형':'刑');
    const clr   = r.type === 'hap' ? '#16a34a' : r.type === 'chong' ? '#dc2626' : '#d97706';
    const txt   = isKo ? `${r.branch1}${r.branch2} ${r.type==='hap'?'합':'충/형'}`
                : isJa ? `${r.branch1}${r.branch2} ${r.type==='hap'?'合':'冲/刑'}`
                : `${r.branch1}${r.branch2} ${r.type==='hap'?'Harmony':'Clash'}`;
    return `<span style="background:${clr}18;color:${clr};border:1px solid ${clr}40;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700;margin:2px;">${badge} ${txt}</span>`;
  }).join('') : '';

  const LUCK_KO = {good:'길(吉) — 좋은 달입니다',mid:'중길(中吉) — 무난한 달',low:'주의가 필요한 달'};
  const LUCK_EN = {good:'Auspicious month',mid:'Neutral — steady month',low:'Caution advised'};
  const LUCK_JA = {good:'吉 — 良い月',mid:'中吉 — 無難な月',low:'注意が必要な月'};
  const luckStr = isKo ? LUCK_KO[wu.luck] : isJa ? LUCK_JA[wu.luck] : LUCK_EN[wu.luck];
  const luckClr = wu.luck==='good' ? '#16a34a' : wu.luck==='mid' ? '#d97706' : '#dc2626';

  const ganzhi_lbl = isKo ? '이달 간지' : isJa ? '今月の干支' : 'Month Ganzhi';
  const sipsin_lbl = isKo ? '십신' : isJa ? '十神' : 'Ten Gods';
  const rel_lbl    = isKo ? '오행 관계' : isJa ? '五行関係' : 'Element Relation';
  const el_lbl     = isKo ? '이달 오행' : isJa ? '今月の五行' : 'Month Element';
  const EC = {'木':'#16a34a','火':'#dc2626','土':'#d97706','金':'#64748b','水':'#1d4ed8'};
  const elClr = EC[wu.element] || '#4f46e5';

  const div = document.createElement('div');
  div.id = 'woluun-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#eff6ff,#dbeafe);border:2px solid #93c5fd;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#1e40af;margin-bottom:14px;">📅 ${title}</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px;">
      <div style="background:rgba(255,255,255,.7);border-radius:12px;padding:10px 12px;">
        <div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:4px;">${ganzhi_lbl}</div>
        <div style="font-size:22px;font-weight:800;color:#1e1b4b;">${wu.ganzhi}</div>
      </div>
      <div style="background:rgba(255,255,255,.7);border-radius:12px;padding:10px 12px;">
        <div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:4px;">${el_lbl} / ${sipsin_lbl}</div>
        <div style="font-size:14px;font-weight:800;color:${elClr};">${wu.element}</div>
        <div style="font-size:11px;color:#374151;margin-top:2px;">${sipsinLabel}</div>
      </div>
    </div>
    <div style="background:rgba(255,255,255,.6);border-radius:12px;padding:10px 12px;margin-bottom:10px;">
      <div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:4px;">${rel_lbl}</div>
      <div style="font-size:12px;color:#374151;line-height:1.6;">${relTxt}</div>
    </div>
    ${relsHtml ? `<div style="margin-bottom:10px;">${relsHtml}</div>` : ''}
    <div style="background:${luckClr}18;border:1px solid ${luckClr}40;border-radius:10px;padding:8px 12px;font-size:12px;font-weight:700;color:${luckClr};">
      ✦ ${luckStr}
    </div>`;

  const seun   = document.getElementById('seun-panel');
  const detail = document.getElementById('detailed-reading-panel');
  const anchor = seun || detail;
  if (anchor) anchor.after(div);
}

// ── 궁합(相性) 패널 ──────────────────────────────────────
// 궁합 패널 9개 언어 사전 (verdict: 종합판정 / bars: 분석항목 / sipsin: 십신 / biTypes: 일지 합충 / elements: 오행 표기)
// 궁합 서사 — 점수 대신 강점(s)/도전(c)/타이밍(t) 이야기로 (The Pattern식). tier: great/good/fair/challenging
const GUNGHAP_NARR = {
  ko:{ sLbl:'강점', cLbl:'도전', tLbl:'타이밍',
    great:{s:'서로를 끌어올리는 인연 — 가치관이 닮아 신뢰가 쉽게 쌓입니다.',c:'편안함이 유일한 함정. 함께 계속 성장하려는 노력을 잊지 마세요.',t:'약속과 큰 계획을 세우기 좋은 시기입니다.'},
    good:{s:'서로의 부족함을 채우는 보완적 조합입니다.',c:'솔직한 대화가 작은 틈을 메웁니다.',t:'관계를 깊게 하고 함께할 루틴을 만들기 좋은 때.'},
    fair:{s:'분명한 끌림이 있어요 — 가꿀수록 좋아지는 사이입니다.',c:'차이에는 인내가 필요합니다. 반응보다 경청을 먼저.',t:'천천히. 큰 결정 전에 신뢰를 충분히 쌓으세요.'},
    challenging:{s:'다름이 가장 큰 배움을 줍니다 — 성장의 여지가 있어요.',c:'서로를 이해하는 데 노력이 듭니다. 차이를 존중하세요.',t:'현재에 집중하고, 성급한 약속은 피하세요.'} },
  en:{ sLbl:'Strength', cLbl:'Challenge', tLbl:'Timing',
    great:{s:'You amplify each other — shared values make trust easy.',c:'Comfort is the only risk; keep growing together.',t:'A strong season for commitment and big plans.'},
    good:{s:'Complementary strengths — you balance each other well.',c:'Communicate openly; honesty closes small gaps.',t:'Good time to deepen and build routines together.'},
    fair:{s:'Real chemistry is here, waiting to be nurtured.',c:'Differences need patience — listen before reacting.',t:'Go slow; let trust build before big decisions.'},
    challenging:{s:'Opposites teach the most — there is growth here.',c:'Understanding takes effort; respect the differences.',t:'Focus on the present; avoid rushing commitments.'} },
  ja:{ sLbl:'強み', cLbl:'課題', tLbl:'タイミング',
    great:{s:'互いを高め合う縁 — 価値観が似て信頼が育ちやすい。',c:'唯一の落とし穴は慣れ。共に成長し続けて。',t:'約束や大きな計画に良い時期です。'},
    good:{s:'足りない部分を補い合う相補的な組み合わせ。',c:'率直な対話が小さなずれを埋めます。',t:'関係を深め、習慣を作るのに良い時。'},
    fair:{s:'確かな惹かれ合いがあります — 育てるほど良くなる仲。',c:'違いには忍耐を。反応より傾聴を先に。',t:'ゆっくりと。大きな決断の前に信頼を積んで。'},
    challenging:{s:'違いこそ最大の学び — 成長の余地があります。',c:'理解には努力が要ります。違いを尊重して。',t:'今に集中し、性急な約束は避けて。'} },
  de:{ sLbl:'Stärke', cLbl:'Herausforderung', tLbl:'Timing',
    great:{s:'Ihr verstärkt euch — gemeinsame Werte schaffen Vertrauen.',c:'Bequemlichkeit ist das einzige Risiko; wachst weiter.',t:'Eine starke Phase für Bindung und große Pläne.'},
    good:{s:'Ergänzende Stärken — ihr gleicht euch gut aus.',c:'Sprecht offen; Ehrlichkeit schließt kleine Lücken.',t:'Gute Zeit, um Routinen aufzubauen und zu vertiefen.'},
    fair:{s:'Echte Anziehung ist da und will gepflegt werden.',c:'Unterschiede brauchen Geduld — erst zuhören.',t:'Langsam vorgehen; Vertrauen vor großen Schritten.'},
    challenging:{s:'Gegensätze lehren am meisten — hier steckt Wachstum.',c:'Verständnis kostet Mühe; achtet die Unterschiede.',t:'Auf das Jetzt konzentrieren; nichts überstürzen.'} },
  fr:{ sLbl:'Force', cLbl:'Défi', tLbl:'Moment',
    great:{s:'Vous vous élevez mutuellement — des valeurs communes.',c:'Le confort est le seul risque ; continuez à grandir.',t:'Une belle période pour l’engagement et les grands projets.'},
    good:{s:'Forces complémentaires — vous vous équilibrez bien.',c:'Parlez ouvertement ; la sincérité comble les écarts.',t:'Bon moment pour approfondir et créer des habitudes.'},
    fair:{s:'Une vraie alchimie est là, à cultiver.',c:'Les différences demandent de la patience — écoutez.',t:'Allez lentement ; bâtissez la confiance d’abord.'},
    challenging:{s:'Les opposés enseignent le plus — il y a du potentiel.',c:'Se comprendre demande des efforts ; respectez les écarts.',t:'Restez dans le présent ; ne précipitez rien.'} },
  es:{ sLbl:'Fortaleza', cLbl:'Reto', tLbl:'Momento',
    great:{s:'Se potencian mutuamente — valores afines, confianza fácil.',c:'La comodidad es el único riesgo; sigan creciendo.',t:'Una buena temporada para el compromiso y los planes.'},
    good:{s:'Fortalezas complementarias — se equilibran bien.',c:'Hablen con franqueza; la sinceridad cierra las brechas.',t:'Buen momento para profundizar y crear rutinas.'},
    fair:{s:'Hay química real, esperando ser cultivada.',c:'Las diferencias piden paciencia — escuchen primero.',t:'Vayan despacio; construyan confianza antes de decidir.'},
    challenging:{s:'Los opuestos enseñan más — aquí hay crecimiento.',c:'Entenderse cuesta; respeten las diferencias.',t:'Enfóquense en el presente; sin prisas.'} },
  pt:{ sLbl:'Força', cLbl:'Desafio', tLbl:'Momento',
    great:{s:'Vocês se elevam — valores afins tornam a confiança fácil.',c:'O conforto é o único risco; continuem crescendo.',t:'Uma boa fase para compromisso e grandes planos.'},
    good:{s:'Forças complementares — equilibram-se bem.',c:'Falem abertamente; a sinceridade fecha as lacunas.',t:'Bom momento para aprofundar e criar rotinas.'},
    fair:{s:'Há química real, à espera de ser cultivada.',c:'Diferenças pedem paciência — ouçam primeiro.',t:'Vão devagar; construam confiança antes de decidir.'},
    challenging:{s:'Os opostos ensinam mais — há crescimento aqui.',c:'Entender-se exige esforço; respeitem as diferenças.',t:'Foquem no presente; sem pressa.'} },
  it:{ sLbl:'Forza', cLbl:'Sfida', tLbl:'Tempismo',
    great:{s:'Vi elevate a vicenda — valori affini, fiducia facile.',c:'La comodità è l’unico rischio; continuate a crescere.',t:'Una stagione forte per impegno e grandi progetti.'},
    good:{s:'Forze complementari — vi bilanciate bene.',c:'Parlate apertamente; la sincerità colma le distanze.',t:'Buon momento per approfondire e creare routine.'},
    fair:{s:'C’è vera chimica, da coltivare.',c:'Le differenze chiedono pazienza — ascoltate prima.',t:'Andate piano; costruite fiducia prima di decidere.'},
    challenging:{s:'Gli opposti insegnano di più — qui c’è crescita.',c:'Capirsi richiede impegno; rispettate le differenze.',t:'Concentratevi sul presente; nessuna fretta.'} },
  id:{ sLbl:'Kekuatan', cLbl:'Tantangan', tLbl:'Waktu',
    great:{s:'Kalian saling menguatkan — nilai serupa, percaya mudah.',c:'Kenyamanan satu-satunya risiko; teruslah bertumbuh.',t:'Musim yang kuat untuk komitmen dan rencana besar.'},
    good:{s:'Kekuatan saling melengkapi — kalian seimbang.',c:'Bicaralah terbuka; kejujuran menutup celah kecil.',t:'Waktu baik untuk mendalami dan membangun rutinitas.'},
    fair:{s:'Ada kecocokan nyata, menunggu dipupuk.',c:'Perbedaan butuh kesabaran — dengarkan dulu.',t:'Pelan-pelan; bangun kepercayaan sebelum memutuskan.'},
    challenging:{s:'Yang berbeda paling banyak mengajarkan — ada ruang tumbuh.',c:'Saling memahami butuh usaha; hormati perbedaan.',t:'Fokus pada saat ini; jangan terburu-buru.'} },
};

const GUNGHAP_T = {
  ko: { title:'두 사람 궁합(相性) 분석', pts:'점', tenGods:'십신 관계', branchPrefix:'일지',
    verdict:{great:'천생연분 — 매우 좋은 궁합입니다 ♡',good:'좋은 인연 — 상호 보완적입니다',fair:'보통 — 노력으로 좋아집니다',challenging:'도전적 — 서로 이해와 배려가 필요합니다'},
    bars:['연간 오행','일간 오행','일지 합충','천간 합'],
    sipsin:{비겁:'비겁',식상:'식상',재성:'재성',관성:'관성',인성:'인성'},
    biTypes:{'六合':'육합(六合)','六冲':'육충(六沖)','三合':'삼합(三合)'},
    elements:{'木':'목(木)','火':'화(火)','土':'토(土)','金':'금(金)','水':'수(水)'} },
  en: { title:'Compatibility Analysis', pts:'pts', tenGods:'Ten Gods', branchPrefix:'Branch',
    verdict:{great:'Soulmates — exceptional match ♡',good:'Great match — complementary energies',fair:'Moderate — can improve with effort',challenging:'Challenging — needs mutual understanding'},
    bars:['Year Element','Day Element','Day Branch','Stem Harmony'],
    sipsin:{비겁:'Sibling',식상:'Expression',재성:'Wealth',관성:'Authority',인성:'Intelligence'},
    biTypes:{'六合':'Six Harmony (六合)','六冲':'Six Clash (六冲)','三合':'Triple Harmony (三合)'},
    elements:{'木':'Wood (木)','火':'Fire (火)','土':'Earth (土)','金':'Metal (金)','水':'Water (水)'} },
  ja: { title:'二人の相性分析', pts:'点', tenGods:'十神関係', branchPrefix:'日支',
    verdict:{great:'天生縁分 — 最高の相性 ♡',good:'良縁 — 相互補完的',fair:'普通 — 努力で良くなる',challenging:'挑戦的 — 理解と思いやりが必要'},
    bars:['年干五行','日干五行','日支合冲','天干合'],
    sipsin:{비겁:'比劫',식상:'食傷',재성:'財星',관성:'官星',인성:'印星'},
    biTypes:{'六合':'六合','六冲':'六冲','三合':'三合'},
    elements:{'木':'木','火':'火','土':'土','金':'金','水':'水'} },
  de: { title:'Partnerschafts-Analyse', pts:' Pkt.', tenGods:'Zehn Götter', branchPrefix:'Tageszweig',
    verdict:{great:'Seelenverwandte — außergewöhnliche Verbindung ♡',good:'Sehr gutes Paar — sich ergänzende Energien',fair:'Mittel — kann mit Einsatz wachsen',challenging:'Herausfordernd — braucht gegenseitiges Verständnis'},
    bars:['Jahres-Element','Tages-Element','Tageszweig','Stamm-Harmonie'],
    sipsin:{비겁:'Geschwister',식상:'Ausdruck',재성:'Reichtum',관성:'Autorität',인성:'Weisheit'},
    biTypes:{'六合':'Sechser-Harmonie (六合)','六冲':'Sechser-Konflikt (六冲)','三合':'Dreier-Harmonie (三合)'},
    elements:{'木':'Holz (木)','火':'Feuer (火)','土':'Erde (土)','金':'Metall (金)','水':'Wasser (水)'} },
  fr: { title:'Analyse de Compatibilité', pts:' pts', tenGods:'Dix Dieux', branchPrefix:'Branche du jour',
    verdict:{great:'Âmes sœurs — accord exceptionnel ♡',good:'Très bon duo — énergies complémentaires',fair:"Moyen — peut s'améliorer avec des efforts",challenging:'Exigeant — demande une compréhension mutuelle'},
    bars:["Élément de l'année",'Élément du jour','Branche du jour','Harmonie des tiges'],
    sipsin:{비겁:'Fratrie',식상:'Expression',재성:'Richesse',관성:'Autorité',인성:'Sagesse'},
    biTypes:{'六合':'Harmonie des Six (六合)','六冲':'Conflit des Six (六冲)','三合':'Triple Harmonie (三合)'},
    elements:{'木':'Bois (木)','火':'Feu (火)','土':'Terre (土)','金':'Métal (金)','水':'Eau (水)'} },
  es: { title:'Análisis de Compatibilidad', pts:' pts', tenGods:'Diez Dioses', branchPrefix:'Rama del día',
    verdict:{great:'Almas gemelas — unión excepcional ♡',good:'Gran pareja — energías complementarias',fair:'Moderado — mejora con esfuerzo',challenging:'Desafiante — requiere comprensión mutua'},
    bars:['Elemento del año','Elemento del día','Rama del día','Armonía de tallos'],
    sipsin:{비겁:'Hermandad',식상:'Expresión',재성:'Riqueza',관성:'Autoridad',인성:'Sabiduría'},
    biTypes:{'六合':'Armonía de Seis (六合)','六冲':'Choque de Seis (六冲)','三合':'Triple Armonía (三合)'},
    elements:{'木':'Madera (木)','火':'Fuego (火)','土':'Tierra (土)','金':'Metal (金)','水':'Agua (水)'} },
  pt: { title:'Análise de Compatibilidade', pts:' pts', tenGods:'Dez Deuses', branchPrefix:'Ramo do dia',
    verdict:{great:'Almas gêmeas — combinação excepcional ♡',good:'Ótimo par — energias complementares',fair:'Moderado — melhora com esforço',challenging:'Desafiador — requer compreensão mútua'},
    bars:['Elemento do ano','Elemento do dia','Ramo do dia','Harmonia dos troncos'],
    sipsin:{비겁:'Irmandade',식상:'Expressão',재성:'Riqueza',관성:'Autoridade',인성:'Sabedoria'},
    biTypes:{'六合':'Harmonia dos Seis (六合)','六冲':'Choque dos Seis (六冲)','三合':'Tripla Harmonia (三合)'},
    elements:{'木':'Madeira (木)','火':'Fogo (火)','土':'Terra (土)','金':'Metal (金)','水':'Água (水)'} },
  it: { title:'Analisi di Compatibilità', pts:' pt.', tenGods:'Dieci Divinità', branchPrefix:'Ramo del giorno',
    verdict:{great:'Anime gemelle — intesa eccezionale ♡',good:'Ottima coppia — energie complementari',fair:"Discreta — migliora con l'impegno",challenging:'Impegnativa — richiede comprensione reciproca'},
    bars:["Elemento dell'anno",'Elemento del giorno','Ramo del giorno','Armonia dei tronchi'],
    sipsin:{비겁:'Fratellanza',식상:'Espressione',재성:'Ricchezza',관성:'Autorità',인성:'Saggezza'},
    biTypes:{'六合':'Armonia dei Sei (六合)','六冲':'Scontro dei Sei (六冲)','三合':'Tripla Armonia (三合)'},
    elements:{'木':'Legno (木)','火':'Fuoco (火)','土':'Terra (土)','金':'Metallo (金)','水':'Acqua (水)'} },
  id: { title:'Analisis Kecocokan', pts:' poin', tenGods:'Sepuluh Dewa', branchPrefix:'Cabang hari',
    verdict:{great:'Belahan jiwa — pasangan luar biasa ♡',good:'Pasangan serasi — energi saling melengkapi',fair:'Sedang — membaik dengan usaha',challenging:'Menantang — perlu saling pengertian'},
    bars:['Elemen tahun','Elemen hari','Cabang hari','Harmoni batang'],
    sipsin:{비겁:'Persaudaraan',식상:'Ekspresi',재성:'Kekayaan',관성:'Otoritas',인성:'Kebijaksanaan'},
    biTypes:{'六合':'Harmoni Enam (六合)','六冲':'Benturan Enam (六冲)','三合':'Harmoni Tiga (三合)'},
    elements:{'木':'Kayu (木)','火':'Api (火)','土':'Tanah (土)','金':'Logam (金)','水':'Air (水)'} },
};

function renderGunghapPanel(data) {
  const gh = data.gunghapData;
  const pb = data.partnerData;
  if (!gh || !pb) return;
  const lang = data.lang;
  const T = GUNGHAP_T[lang] || GUNGHAP_T.en;
  const title = T.title;

  const EC = {'木':'#16a34a','火':'#dc2626','土':'#d97706','金':'#64748b','水':'#1d4ed8'};
  const e1Clr = EC[gh.el1] || '#4f46e5', e2Clr = EC[gh.el2] || '#ec4899';

  const compatStr = T.verdict[gh.compat];
  const compatClr = gh.compat==='great'?'#ec4899':gh.compat==='good'?'#16a34a':gh.compat==='fair'?'#d97706':'#dc2626';

  // score ring SVG
  const pct = gh.overall / 100;
  const r = 36, circ = 2 * Math.PI * r;
  const dash = pct * circ, gap = circ - dash;
  const ringColor = gh.overall>=80?'#ec4899':gh.overall>=65?'#16a34a':gh.overall>=45?'#d97706':'#dc2626';
  const ringHTML = `<svg width="100" height="100" viewBox="0 0 100 100" style="transform:rotate(-90deg);">
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="10"/>
    <circle cx="50" cy="50" r="${r}" fill="none" stroke="${ringColor}" stroke-width="10"
      stroke-dasharray="${dash.toFixed(1)} ${gap.toFixed(1)}" stroke-linecap="round"/>
  </svg>
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
    <div style="font-size:20px;font-weight:900;color:${ringColor};">${gh.overall}</div>
    <div style="font-size:9px;color:#6b7280;font-weight:600;">${T.pts}</div>
  </div>`;

  // breakdown bars
  const BARS = [
    {lbl:T.bars[0], score:gh.yearElScore, w:25},
    {lbl:T.bars[1], score:gh.dayElScore,  w:30},
    {lbl:T.bars[2], score:gh.dayBiScore,  w:30},
    {lbl:T.bars[3], score:gh.stemHapScore,w:15},
  ];
  const barsHTML = BARS.map(b => {
    const clr = b.score>=80?'#16a34a':b.score>=60?'#4f46e5':'#dc2626';
    return `<div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
        <span style="font-size:10px;color:#64748b;font-weight:600;">${b.lbl}</span>
        <span style="font-size:10px;font-weight:800;color:${clr};">${b.score}${T.pts}</span>
      </div>
      <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">
        <div style="height:100%;width:${b.score}%;background:${clr};border-radius:3px;transition:width .6s;"></div>
      </div>
    </div>`;
  }).join('');

  // person cards
  const dA = data, dB = pb;
  const yA = `${dA.year}-${String(dA.month).padStart(2,'0')}-${String(dA.day).padStart(2,'0')}`;
  const yB = `${dB.year}-${String(dB.month).padStart(2,'0')}-${String(dB.day).padStart(2,'0')}`;
  const elA = T.elements[gh.el1] || gh.el1;
  const elB = T.elements[gh.el2] || gh.el2;
  // 연주 간지 — 비ko 시스템은 cultural에 stemIdx/branchIdx가 없으므로 생년에서 직접 계산
  const _gz = (d) => {
    const si = (d.cultural && d.cultural.stemIdx != null) ? d.cultural.stemIdx : (((d.year - 4) % 10) + 10) % 10;
    const bi = (d.cultural && d.cultural.branchIdx != null) ? d.cultural.branchIdx : (((d.year - 4) % 12) + 12) % 12;
    return (STEMS[si] || '') + (BRANCHES[bi] || '');
  };

  // sipsin A→B and B→A
  const s1 = T.sipsin[gh.sipsinAtoB] || gh.sipsinAtoB || '';
  const s2 = T.sipsin[gh.sipsinBtoA] || gh.sipsinBtoA || '';
  const arrowLbl = T.tenGods;
  const vsHtml = (s1&&s2) ? `<div style="text-align:center;margin-top:10px;font-size:11px;color:#374151;">
    <span style="font-weight:700;color:#4f46e5;">${s1}</span> ↔ <span style="font-weight:700;color:#ec4899;">${s2}</span>
    <div style="font-size:9px;color:#9ca3af;margin-top:2px;">${arrowLbl}</div>
  </div>` : '';

  const dayBiLbl = gh.dayBiType ? `${T.branchPrefix} · ${T.biTypes[gh.dayBiType] || gh.dayBiType}` : '';

  // ── Wave4: 영역별 4축 + 겉궁합(띠·별자리) — LUX compat 콘텐츠 (없으면 폴백 미표시) ──
  const CPC = ((window.LUX && (window.LUX[lang]||window.LUX.en))||{}).compat;
  let axesHtml = '', outerHtml = '';
  if (CPC) {
    const ax = CPC.axes || {};
    const cl4 = (v)=> v>=75?'#ec4899':v>=55?'#16a34a':'#d97706';
    const chem = gh.dayBiScore, stab = Math.round((gh.yearElScore+gh.dayElScore)/2), comm = gh.stemHapScore, grow = Math.round((gh.overall+gh.dayElScore)/2);
    const abar=(lbl,v)=>`<div style="flex:1;min-width:118px;"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px;"><span style="color:#9d174d;font-weight:700;">${escHtml(lbl||'')}</span><span style="color:${cl4(v)};font-weight:800;">${v}</span></div><div style="height:6px;background:#fce7f3;border-radius:3px;overflow:hidden;"><div style="height:100%;width:${v}%;background:${cl4(v)};border-radius:3px;"></div></div></div>`;
    axesHtml = `<div style="margin-top:12px;"><div style="font-size:10.5px;color:#9d174d;font-weight:700;text-transform:uppercase;margin-bottom:8px;">📊 ${escHtml(CPC.axisTitle||'')}</div><div style="display:flex;gap:10px 14px;flex-wrap:wrap;">${abar(ax.chemistry,chem)}${abar(ax.stability,stab)}${abar(ax.communication,comm)}${abar(ax.growth,grow)}</div></div>`;
    // 겉궁합: 두 사람 띠 관계(삼합/육합/충/무난) + 별자리 원소 관계
    const biA=(data.cultural&&data.cultural.branchIdx!=null)?data.cultural.branchIdx:(((data.year-4)%12)+12)%12;
    const biB=(((pb.year-4)%12)+12)%12;
    let zr='neutral';
    if(biA!==biB && (biA%4)===(biB%4)) zr='triad';
    else if(Math.abs(biA-biB)===6) zr='clash';
    else { const sh=[[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]]; if(sh.some(p=>(p[0]===biA&&p[1]===biB)||(p[0]===biB&&p[1]===biA))) zr='sixHarm'; }
    const siA=_sunSignIdx(data.month,data.day), siB=_sunSignIdx(pb.month,pb.day);
    const eA=_SIGN_ELEM[siA], eB=_SIGN_ELEM[siB];
    let sr='neutral';
    if(eA===eB) sr='same';
    else { const cp={fire:'air',air:'fire',earth:'water',water:'earth'}, ck={fire:'water',water:'fire',earth:'air',air:'earth'}; if(cp[eA]===eB) sr='complement'; else if(ck[eA]===eB) sr='clash'; }
    const czA=_getCZName(data.year,lang), czB=_getCZName(pb.year,lang);
    outerHtml = `<div style="margin-top:12px;background:#fdf2f8;border:1px solid #fbcfe8;border-radius:12px;padding:11px 13px;">
      <div style="font-size:10.5px;color:#9d174d;font-weight:700;text-transform:uppercase;margin-bottom:8px;">🔮 ${escHtml(CPC.outerTitle||'')}</div>
      <div style="display:flex;gap:6px;align-items:baseline;font-size:11.5px;color:#374151;margin-bottom:6px;flex-wrap:wrap;"><span style="font-weight:700;">${escHtml(czA)} × ${escHtml(czB)}</span><span style="color:#9d174d;">— ${escHtml((CPC.zodiacRel||{})[zr]||'')}</span></div>
      <div style="display:flex;gap:6px;align-items:baseline;font-size:11.5px;color:#374151;flex-wrap:wrap;"><span style="font-weight:700;">${_SIGN_EMJ[siA]||''} × ${_SIGN_EMJ[siB]||''}</span><span style="color:#9d174d;">— ${escHtml((CPC.sunRel||{})[sr]||'')}</span></div>
    </div>`;
  }

  const div = document.createElement('div');
  div.id = 'gunghap-section';
  div.style.cssText = 'background:#fff;border:2px solid #fbcfe8;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#9d174d;margin-bottom:14px;">💑 ${title}</div>
    <div style="display:flex;gap:10px;margin-bottom:14px;">
      <div style="flex:1;background:${e1Clr}10;border:2px solid ${e1Clr}40;border-radius:14px;padding:10px 12px;text-align:center;">
        <div style="font-size:20px;margin-bottom:4px;">👤</div>
        <div style="font-size:11px;font-weight:700;color:#374151;">${yA}</div>
        <div style="font-size:12px;font-weight:800;color:${e1Clr};">${_gz(dA)}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px;">${elA}</div>
      </div>
      <div style="display:flex;align-items:center;justify-content:center;font-size:20px;">💞</div>
      <div style="flex:1;background:${e2Clr}10;border:2px solid ${e2Clr}40;border-radius:14px;padding:10px 12px;text-align:center;">
        <div style="font-size:20px;margin-bottom:4px;">👤</div>
        <div style="font-size:11px;font-weight:700;color:#374151;">${yB}</div>
        <div style="font-size:12px;font-weight:800;color:${e2Clr};">${_gz(dB)}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px;">${elB}</div>
      </div>
    </div>
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:14px;">
      <div style="position:relative;flex-shrink:0;">${ringHTML}</div>
      <div style="flex:1;">${barsHTML}</div>
    </div>
    ${dayBiLbl ? `<div style="text-align:center;margin-bottom:8px;"><span style="background:#fdf2f8;border:1px solid #fbcfe8;border-radius:20px;padding:4px 14px;font-size:11px;font-weight:700;color:#9d174d;">${dayBiLbl}</span></div>` : ''}
    ${vsHtml}
    ${(() => {
      const NA = GUNGHAP_NARR[lang] || GUNGHAP_NARR.en;
      const n = NA[gh.compat] || NA.good;
      const row = (lbl,txt,clr) => `<div style="display:flex;gap:9px;align-items:flex-start;margin-bottom:8px;">
        <span style="flex-shrink:0;font-size:10px;font-weight:800;color:#fff;background:${clr};border-radius:6px;padding:3px 8px;min-width:54px;text-align:center;">${lbl}</span>
        <span style="font-size:12px;line-height:1.55;color:#374151;">${txt}</span></div>`;
      return `<div style="margin-top:12px;background:#fff;border:1px solid #fbcfe8;border-radius:14px;padding:13px 14px;">
        ${row(NA.sLbl, n.s, '#16a34a')}${row(NA.cLbl, n.c, '#d97706')}${row(NA.tLbl, n.t, '#7c3aed')}</div>`;
    })()}
    ${axesHtml}
    ${outerHtml}
    <div style="margin-top:12px;text-align:center;background:${compatClr}10;border:1px solid ${compatClr}40;border-radius:14px;padding:10px 14px;font-size:13px;font-weight:700;color:${compatClr};">${compatStr}</div>`;

  const fortuneCats = document.querySelector('.fortune-cats-section');
  const singleFort  = document.querySelector('.single-fortune-section');
  const shareSection = document.querySelector('.share-section');
  const anchor = fortuneCats || singleFort || shareSection;
  if (anchor) anchor.before(div);
  else {
    const results = document.getElementById('results');
    if (results) results.appendChild(div);
  }
}

// ── ko 格局 판단 패널 ────────────────────────────────────
function renderGeokkukPanel(data) {
  const gk = data.geokkukData;
  if (!gk) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const title = isKo?'격국(格局) 분석':isJa?'格局分析':'Pattern Analysis';
  const strongLabel = isKo?'신강(身强)':isJa?'身強':'Strong Day Master';
  const weakLabel   = isKo?'신약(身弱)':isJa?'身弱':'Weak Day Master';
  const gkName = isKo ? gk.geokkukName : isJa ? gk.geokkukNameJa : gk.geokkukNameEn;
  const strategy = isKo ? gk.strategyKo : isJa ? gk.strategyJa : gk.strategyEn;
  const strengthLabel = gk.isStrong ? strongLabel : weakLabel;
  const strengthIcon  = gk.isStrong ? '🌟' : '🌙';
  const strengthClr   = gk.isStrong ? '#d97706' : '#7c3aed';

  const barW = Math.min(100, Math.round(gk.supportCount / Math.max(1, gk.supportCount + gk.pressureCount) * 100));
  const supportLbl = isKo?`지지(비겁+인성): ${gk.supportCount}`:isJa?`支持(比劫+印星): ${gk.supportCount}`:`Support: ${gk.supportCount}`;
  const pressLbl   = isKo?`극화(재관식): ${gk.pressureCount}`:isJa?`剋化(財官食): ${gk.pressureCount}`:`Pressure: ${gk.pressureCount}`;

  const div = document.createElement('div');
  div.id = 'geokkuk-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#fef9c3,#fef3c7);border:2px solid #fde68a;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#92400e;margin-bottom:14px;">⚜️ ${title}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">
      <div style="background:${strengthClr}18;border:2px solid ${strengthClr}40;border-radius:14px;padding:12px 16px;text-align:center;flex-shrink:0;">
        <div style="font-size:26px;">${strengthIcon}</div>
        <div style="font-size:11px;font-weight:800;color:${strengthClr};margin-top:4px;">${strengthLabel}</div>
      </div>
      <div>
        <div style="font-size:18px;font-weight:900;color:#1e1b4b;margin-bottom:4px;">${gk.geokkukIcon} ${gkName}</div>
        <div style="font-size:10px;color:#64748b;margin-bottom:6px;">${supportLbl} &nbsp;|&nbsp; ${pressLbl}</div>
        <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;width:140px;">
          <div style="height:100%;width:${barW}%;background:${strengthClr};border-radius:3px;"></div>
        </div>
      </div>
    </div>
    <div style="background:rgba(255,255,255,.65);border-radius:12px;padding:10px 14px;font-size:12px;color:#374151;line-height:1.7;">${strategy}</div>`;

  const siuPanel = document.getElementById('sipiunsung-panel');
  const shinsal  = document.getElementById('shinsal-panel');
  const hap      = document.getElementById('hapchong-panel');
  const seun     = document.getElementById('seun-panel');
  const detail   = document.getElementById('detailed-reading-panel');
  const anchor   = siuPanel || shinsal || hap || seun || detail;
  if (anchor) anchor.after(div);
}

// ── ja 九星三星 + 방위 길흉 패널 ────────────────────────
function renderKyuseiSanseiPanel(data) {
  const ks = data.kyuseiSanseiData;
  if (!ks) return;
  const lang = data.lang, isJa = lang==='ja', isKo = lang==='ko';
  const title = isJa?'三星分析・方位吉凶':isKo?'삼성 분석 + 방위 길흉':'Three Stars & Direction Fortune';

  const starNames = KYUSEI_STAR_NAMES_JA;
  const starDescs = KYUSEI_STAR_DESC_JA;
  const EC = {'木':'#16a34a','火':'#dc2626','土':'#d97706','金':'#64748b','水':'#1d4ed8'};
  const STAR_EL = {1:'水',2:'土',3:'木',4:'木',5:'土',6:'金',7:'金',8:'土',9:'火'};
  const mkCard = (star, lbl) => {
    const el  = STAR_EL[star] || '土';
    const clr = EC[el] || '#d97706';
    const nm  = starNames[star] || `${star}`;
    const ds  = starDescs[star] || '';
    return `<div style="flex:1;background:rgba(255,255,255,.8);border:2px solid ${clr}30;border-radius:12px;padding:10px 10px;text-align:center;">
      <div style="font-size:9px;font-weight:700;color:#64748b;margin-bottom:4px;">${lbl}</div>
      <div style="font-size:24px;font-weight:900;color:${clr};">${star}</div>
      <div style="font-size:10px;font-weight:700;color:${clr};margin-bottom:4px;">${nm}</div>
      <div style="font-size:9px;color:#6b7280;line-height:1.5;">${ds}</div>
    </div>`;
  };
  const yearLbl  = isJa?'年命星':isKo?'년명성':'Year';
  const monthLbl = isJa?'月命星':isKo?'월명성':'Month';
  const dayLbl   = isJa?'日命星':isKo?'일명성':'Day';
  const starsHtml = `<div style="display:flex;gap:8px;margin-bottom:14px;">
    ${mkCard(ks.yearStar, yearLbl)}
    ${mkCard(ks.monthStar||5, monthLbl)}
    ${mkCard(ks.dayStar||5, dayLbl)}
  </div>`;

  // 방위 길흉
  const DIR_COMPASS = {'北':'N↑','南':'S↓','東':'E→','西':'W←','北東':'NE↗','南東':'SE↘','南西':'SW↙','北西':'NW↖','中央':'◎'};
  const mkDirs = (arr, clr, icon) => arr.map(d =>
    `<span style="background:${clr}18;color:${clr};border:1px solid ${clr}40;border-radius:16px;padding:3px 10px;font-size:11px;font-weight:700;margin:2px 2px;display:inline-block;">${icon} ${d} (${DIR_COMPASS[d]||d})</span>`
  ).join('');
  const bestLbl    = isJa?'大吉方位':isKo?'대길 방위':'Best Direction';
  const goodLbl    = isJa?'吉方位':isKo?'길 방위':'Good Direction';
  const cautionLbl = isJa?'注意方位':isKo?'주의 방위':'Caution';
  const badLbl     = isJa?'凶方位':isKo?'흉 방위':'Avoid';
  const houiHtml = `
    <div style="font-size:10px;font-weight:700;color:#166534;margin-bottom:6px;">🧭 ${isJa?'方位吉凶':isKo?'방위 길흉':'Direction Fortune'}</div>
    <div style="margin-bottom:5px;"><span style="font-size:9px;font-weight:600;color:#64748b;">${bestLbl}: </span>${mkDirs(ks.dirTable.best,'#16a34a','★')}</div>
    <div style="margin-bottom:5px;"><span style="font-size:9px;font-weight:600;color:#64748b;">${goodLbl}: </span>${mkDirs(ks.dirTable.good,'#4f46e5','●')}</div>
    <div style="margin-bottom:5px;"><span style="font-size:9px;font-weight:600;color:#64748b;">${cautionLbl}: </span>${mkDirs(ks.dirTable.caution,'#d97706','▲')}</div>
    <div><span style="font-size:9px;font-weight:600;color:#64748b;">${badLbl}: </span>${mkDirs(ks.dirTable.bad,'#dc2626','✕')}</div>`;

  const div = document.createElement('div');
  div.id = 'kyusei-sansei-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px solid #6ee7b7;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#065f46;margin-bottom:14px;">⭐ ${title}</div>
    ${starsHtml}
    <div style="background:rgba(255,255,255,.65);border-radius:12px;padding:12px 14px;">${houiHtml}</div>`;

  const fortCats = document.querySelector('.fortune-cats-section');
  const share    = document.querySelector('.share-section');
  const anchor   = fortCats || share;
  if (anchor) anchor.before(div);
}

// ── id Hari Baik 달력 패널 ──────────────────────────────
function renderHariBaikPanel(data) {
  const days = calcHariBaikCalendar(data, 30);
  if (!days) return;
  const lang = data.lang;
  const title = 'Hari Baik — Kalender Weton 30 Hari';
  const GREAT_CLR='#16a34a', GOOD_CLR='#d97706', NEU_CLR='#9ca3af';
  const DOW_ID = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
  const MONTH_ID = ['','Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

  const cells = days.map(day => {
    const clr  = day.lv==='great'?GREAT_CLR:day.lv==='good'?GOOD_CLR:NEU_CLR;
    const bg   = day.lv==='great'?'#dcfce7':day.lv==='good'?'#fef9c3':'#f3f4f6';
    const pasNm = PASARAN[day.pasaranIdx] || '';
    return `<div style="background:${bg};border-radius:8px;padding:5px 3px;text-align:center;min-width:0;">
      <div style="font-size:9px;color:#9ca3af;">${DOW_ID[day.dow]}</div>
      <div style="font-size:13px;font-weight:800;color:${clr};">${day.dd}</div>
      <div style="font-size:7px;color:${clr};font-weight:600;line-height:1.2;">${pasNm}</div>
    </div>`;
  }).join('');

  const today = new Date();
  const monthStr = `${MONTH_ID[today.getMonth()+1]} ${today.getFullYear()}`;
  const legend = `<div style="display:flex;gap:10px;margin-bottom:10px;font-size:10px;font-weight:600;">
    <span style="color:${GREAT_CLR};">● Sangat Baik</span>
    <span style="color:${GOOD_CLR};">● Baik</span>
    <span style="color:${NEU_CLR};">● Biasa</span>
  </div>`;

  const div = document.createElement('div');
  div.id = 'hari-baik-panel';
  div.style.cssText = 'background:#fff;border:2px solid #dc2626;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#dc2626;margin-bottom:12px;">🗓️ ${title}</div>
    ${legend}
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">${cells}</div>`;

  const fortCats = document.querySelector('.fortune-cats-section');
  const share    = document.querySelector('.share-section');
  const anchor   = fortCats || share;
  if (anchor) anchor.before(div);
}

// ── 연간 운세 달력 패널 (12개월 바 차트) ─────────────────
function renderAnnualCalendarPanel(data) {
  const scores = data.annualFortune;
  if (!scores || !scores.length) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja';
  const title = isKo?`${new Date().getFullYear()}년 월별 운세`:isJa?`${new Date().getFullYear()}年 月別運勢`:`${new Date().getFullYear()} Monthly Fortune`;
  const EC = {'木':'#16a34a','火':'#dc2626','土':'#d97706','金':'#64748b','水':'#1d4ed8'};
  const MONTH_KO = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  const MONTH_JA = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const MONTH_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthLabels = isKo ? MONTH_KO : isJa ? MONTH_JA : MONTH_EN;
  const nowM = new Date().getMonth() + 1;
  const maxScore = Math.max(...scores.map(s => s.score));

  const bars = scores.map(s => {
    const clr    = EC[s.element] || '#4f46e5';
    const pct    = Math.round(s.score / maxScore * 100);
    const isCurr = s.month === nowM;
    const border = isCurr ? `border:2px solid ${clr};` : '';
    const lbl    = monthLabels[s.month-1];
    return `<div style="flex:1;text-align:center;">
      <div style="font-size:9px;color:#64748b;margin-bottom:3px;font-weight:${isCurr?'800':'400'};">${s.score}</div>
      <div style="background:${isCurr?clr:clr+'60'};height:${pct}%;min-height:8px;border-radius:3px 3px 0 0;${border}transition:height .4s;"></div>
      <div style="font-size:8px;color:${isCurr?clr:'#9ca3af'};margin-top:3px;font-weight:${isCurr?'800':'400'};">${lbl}</div>
    </div>`;
  }).join('');

  const div = document.createElement('div');
  div.id = 'annual-calendar-panel';
  div.style.cssText = 'background:#fff;border:2px solid #e5e7eb;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#374151;margin-bottom:14px;">📊 ${title}</div>
    <div style="display:flex;gap:3px;align-items:flex-end;height:90px;">${bars}</div>`;

  const fortCats = document.querySelector('.fortune-cats-section');
  const share    = document.querySelector('.share-section');
  const anchor   = fortCats || share;
  if (anchor) anchor.before(div);
}

// ── 좋은 날 달력 패널 (30일) ────────────────────────────
function renderAuspiciousCalendarPanel(data) {
  const days = data.auspiciousDates;
  if (!days || !days.length) return;
  const lang = data.lang, isKo = lang==='ko', isJa = lang==='ja', isId = lang==='id';
  const AUSP_TITLE = { ko:'이달의 좋은 날', ja:'今月の吉日', en:'Auspicious Days', de:'Glückstage des Monats', fr:'Jours fastes du mois', es:'Días propicios del mes', pt:'Dias auspiciosos do mês', it:'Giorni propizi del mese', id:'Hari Baik Bulan Ini' };
  const title = AUSP_TITLE[lang] || AUSP_TITLE.en;
  const dowLabels = DAY_NAMES_SHORT[lang] || DAY_NAMES_SHORT.en;

  const cells = days.slice(0,28).map(day => {
    const clr = day.lv==='great'?'#166534':day.lv==='good'?'#92400e':day.lv==='bad'?'#991b1b':'#6b7280';
    const bg  = day.lv==='great'?'#dcfce7':day.lv==='good'?'#fef9c3':day.lv==='bad'?'#fee2e2':'#f3f4f6';
    const detail = day.detail ? `<div style="font-size:7px;color:${clr};line-height:1.2;">${day.detail}</div>` : '';
    return `<div style="background:${bg};border-radius:8px;padding:4px 2px;text-align:center;">
      <div style="font-size:8px;color:#9ca3af;">${dowLabels[day.dow]}</div>
      <div style="font-size:13px;font-weight:800;color:${clr};">${day.dd}</div>
      ${detail}
    </div>`;
  }).join('');

  // legend
  const AUSP_GREAT = { ko:'대길', ja:'大吉', en:'Great', de:'Top', fr:'Excellent', es:'Excelente', pt:'Excelente', it:'Ottimo', id:'Sangat Baik' };
  const AUSP_GOOD  = { ko:'길', ja:'吉', en:'Good', de:'Gut', fr:'Bon', es:'Bueno', pt:'Bom', it:'Buono', id:'Baik' };
  const AUSP_BAD   = { ko:'흉', ja:'凶', en:'Bad', de:'Meiden', fr:'À éviter', es:'Evitar', pt:'Evitar', it:'Da evitare', id:'Hindari' };
  const greatLbl = AUSP_GREAT[lang] || AUSP_GREAT.en;
  const goodLbl  = AUSP_GOOD[lang]  || AUSP_GOOD.en;
  const badLbl   = AUSP_BAD[lang]   || AUSP_BAD.en;
  const legendHtml = `<div style="display:flex;gap:8px;margin-bottom:10px;font-size:10px;font-weight:600;">
    <span style="color:#166534;">● ${greatLbl}</span>
    <span style="color:#92400e;">● ${goodLbl}</span>
    ${(!isId)?`<span style="color:#991b1b;">● ${badLbl}</span>`:''}
  </div>`;

  const div = document.createElement('div');
  div.id = 'auspicious-calendar-panel';
  div.style.cssText = 'background:#fff;border:2px solid #e5e7eb;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#374151;margin-bottom:10px;">📅 ${title}</div>
    ${legendHtml}
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">${cells}</div>`;

  const share = document.querySelector('.share-section');
  if (share) share.before(div);
}

// ── 이름 수리 패널 (동적 렌더) ──────────────────────────
function renderNamePanel(nameResult) {
  // 기존 패널 제거
  const existing = document.getElementById('name-panel');
  if (existing) existing.remove();
  if (!nameResult) return;

  const lang  = window.LUCKY_CURRENT_LANG || 'ko';
  const isKo  = lang==='ko', isJa=lang==='ja';
  const L     = window.LUCKY_LANG || {};
  const NAME_TITLES = {
    ko:`"${nameResult.name}" 수리(數理) 분석`, ja:`"${nameResult.name}" 数理分析`,
    en:`Name Numerology: "${nameResult.name}"`, de:`Namens-Numerologie: "${nameResult.name}"`,
    fr:`Numérologie du Nom : "${nameResult.name}"`, es:`Numerología del Nombre: "${nameResult.name}"`,
    pt:`Numerologia do Nome: "${nameResult.name}"`, it:`Numerologia del Nome: "${nameResult.name}"`,
    id:`Numerologi Nama: "${nameResult.name}"`,
  };
  const title = NAME_TITLES[lang] || NAME_TITLES.en;

  const NUM_DESC = {
    ko:{1:'독립심·개척자·강한 의지력',2:'협동·외교·감수성',3:'창의성·표현력·낙천주의',4:'인내·실용·책임감',5:'자유·변화·모험',6:'조화·봉사·가족애',7:'탐구·지성·신비',8:'야망·성취·물질적 성공',9:'박애·봉사·완성',11:'직관·영감·이상주의',22:'대건설자·실용적 이상',33:'마스터 교사·자비'},
    en:{1:'Independence, leadership, willpower',2:'Cooperation, diplomacy, sensitivity',3:'Creativity, expression, optimism',4:'Patience, practicality, responsibility',5:'Freedom, change, adventure',6:'Harmony, service, family',7:'Inquiry, intellect, mystery',8:'Ambition, achievement, success',9:'Philanthropy, completion, wisdom',11:'Intuition, inspiration, idealism',22:'Master builder, practical idealist',33:'Master teacher, compassion'},
    ja:{1:'独立・開拓・強い意志',2:'協調・外交・感受性',3:'創造性・表現力・楽観主義',4:'忍耐・実用・責任感',5:'自由・変化・冒険',6:'調和・奉仕・家族愛',7:'探求・知性・神秘',8:'野望・達成・物質的成功',9:'博愛・奉仕・完成',11:'直感・インスピレーション・理想主義',22:'大建設者・実用的理想',33:'マスター教師・慈悲'},
    de:{1:'Unabhängigkeit, Führung, Willenskraft',2:'Kooperation, Diplomatie, Sensibilität',3:'Kreativität, Ausdruck, Optimismus',4:'Geduld, Praxissinn, Verantwortung',5:'Freiheit, Wandel, Abenteuer',6:'Harmonie, Hilfsbereitschaft, Familie',7:'Forschergeist, Intellekt, Mystik',8:'Ehrgeiz, Erfolg, Wohlstand',9:'Menschenliebe, Vollendung, Weisheit',11:'Intuition, Inspiration, Idealismus',22:'Großer Baumeister, praktischer Idealist',33:'Meisterlehrer, Mitgefühl'},
    fr:{1:'Indépendance, leadership, volonté',2:'Coopération, diplomatie, sensibilité',3:'Créativité, expression, optimisme',4:'Patience, pragmatisme, responsabilité',5:'Liberté, changement, aventure',6:'Harmonie, service, famille',7:'Curiosité, intellect, mystère',8:'Ambition, réussite, succès',9:'Altruisme, accomplissement, sagesse',11:'Intuition, inspiration, idéalisme',22:'Grand bâtisseur, idéaliste pragmatique',33:'Maître enseignant, compassion'},
    es:{1:'Independencia, liderazgo, voluntad',2:'Cooperación, diplomacia, sensibilidad',3:'Creatividad, expresión, optimismo',4:'Paciencia, practicidad, responsabilidad',5:'Libertad, cambio, aventura',6:'Armonía, servicio, familia',7:'Curiosidad, intelecto, misterio',8:'Ambición, logro, éxito',9:'Altruismo, plenitud, sabiduría',11:'Intuición, inspiración, idealismo',22:'Gran constructor, idealista práctico',33:'Maestro, compasión'},
    pt:{1:'Independência, liderança, força de vontade',2:'Cooperação, diplomacia, sensibilidade',3:'Criatividade, expressão, otimismo',4:'Paciência, praticidade, responsabilidade',5:'Liberdade, mudança, aventura',6:'Harmonia, serviço, família',7:'Curiosidade, intelecto, mistério',8:'Ambição, conquista, sucesso',9:'Altruísmo, plenitude, sabedoria',11:'Intuição, inspiração, idealismo',22:'Grande construtor, idealista prático',33:'Mestre, compaixão'},
    it:{1:'Indipendenza, leadership, volontà',2:'Cooperazione, diplomazia, sensibilità',3:'Creatività, espressione, ottimismo',4:'Pazienza, praticità, responsabilità',5:'Libertà, cambiamento, avventura',6:'Armonia, servizio, famiglia',7:'Curiosità, intelletto, mistero',8:'Ambizione, realizzazione, successo',9:'Altruismo, completezza, saggezza',11:'Intuizione, ispirazione, idealismo',22:'Gran costruttore, idealista pratico',33:'Maestro, compassione'},
    id:{1:'Kemandirian, kepemimpinan, kemauan kuat',2:'Kerja sama, diplomasi, kepekaan',3:'Kreativitas, ekspresi, optimisme',4:'Kesabaran, kepraktisan, tanggung jawab',5:'Kebebasan, perubahan, petualangan',6:'Harmoni, pelayanan, keluarga',7:'Rasa ingin tahu, intelek, misteri',8:'Ambisi, pencapaian, kesuksesan',9:'Kedermawanan, kesempurnaan, kebijaksanaan',11:'Intuisi, inspirasi, idealisme',22:'Pembangun besar, idealis praktis',33:'Guru sejati, kasih sayang'},
  };
  const numDesc = NUM_DESC[lang] || NUM_DESC.en;

  const mkRing = (num, clr, lbl) => `
    <div style="text-align:center;flex:1;">
      <div style="width:56px;height:56px;border-radius:50%;background:${clr};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:#fff;margin:0 auto 6px;">${num}</div>
      <div style="font-size:10px;font-weight:700;color:#374151;margin-bottom:3px;">${lbl}</div>
      <div style="font-size:10px;color:#6b7280;line-height:1.4;">${numDesc[num]||num}</div>
    </div>`;

  const NAME_LBLS = {
    ko:['운명수','영혼수','외면수'], ja:['運命数','魂数','外面数'], en:['Destiny','Soul Urge','Personality'],
    de:['Schicksalszahl','Seelenzahl','Persönlichkeit'], fr:['Nombre du Destin',"Élan de l'Âme",'Personnalité'],
    es:['Número del Destino','Impulso del Alma','Personalidad'], pt:['Número do Destino','Impulso da Alma','Personalidade'],
    it:['Numero del Destino',"Slancio dell'Anima",'Personalità'], id:['Angka Takdir','Dorongan Jiwa','Kepribadian'],
  };
  const [destLbl, soulLbl, persLbl] = NAME_LBLS[lang] || NAME_LBLS.en;

  const div = document.createElement('div');
  div.id = 'name-panel';
  div.style.cssText = 'background:linear-gradient(135deg,#f0f9ff,#e0f2fe);border:2px solid #93c5fd;border-radius:20px;padding:18px 20px;margin-bottom:16px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#1e40af;margin-bottom:14px;">🔢 ${title}</div>
    <div style="display:flex;gap:12px;">
      ${mkRing(nameResult.destinyNum,'#4f46e5',destLbl)}
      ${mkRing(nameResult.soulUrge,'#ec4899',soulLbl)}
      ${mkRing(nameResult.personality,'#d97706',persLbl)}
    </div>`;

  const share = document.querySelector('.share-section');
  if (share) share.before(div);
}

// ── 오늘의 일진(日辰) — daily energy reading ──────────────
function renderTodayIlchin(data) {
  if (data.systemKey !== 'saju') return;
  const today = new Date();
  const ty = today.getFullYear(), tm = today.getMonth() + 1, td = today.getDate();
  const todayStemIdx   = calcDayStemIdx(ty, tm, td);
  const todayBranchIdx = calcDayBranch(ty, tm, td);
  const todayEl  = ELEMENTS[todayStemIdx];
  const birthEl  = data.cultural.element;
  const harmony  = calcOhaengHarmony(birthEl, todayEl);
  const L   = window.LUCKY_LANG || {};
  const lang = data.lang;
  const isKo = lang === 'ko', isJa = lang === 'ja';

  const EC    = {'木':'#16a34a','火':'#dc2626','土':'#d97706','金':'#64748b','水':'#1d4ed8'};
  const EKO   = {'木':'목(木)','火':'화(火)','土':'토(土)','金':'금(金)','水':'수(水)'};
  const color  = EC[todayEl] || '#d97706';
  const today_str = isKo ? `${ty}년 ${tm}월 ${td}일` : isJa ? `${ty}年${tm}月${td}日` : `${tm}/${td}/${ty}`;
  const title  = isKo ? `오늘(${today_str})의 일진` : isJa ? `今日(${today_str})の日辰` : `Today's Energy (${today_str})`;
  const todayGanzhi  = `${STEMS[todayStemIdx]}${BRANCHES[todayBranchIdx]}`;
  const todayReading = isKo ? `${STEM_KO[todayStemIdx]}${BRANCH_KO[todayBranchIdx]}일 — ${EKO[todayEl]}`
                     : isJa ? `${todayGanzhi}日 — ${todayEl}気`
                     : `${todayGanzhi} Day — ${todayEl} Energy`;

  const harmonyKey =
    birthEl === todayEl             ? 'same'   :
    OHAENG_SHENG[birthEl]===todayEl ? 'sheng'  :
    OHAENG_SHENG[todayEl]===birthEl ? 'recv'   :
    OHAENG_KE[birthEl]   ===todayEl ? 'ke'     :
    OHAENG_KE[todayEl]   ===birthEl ? 'beKe'   : 'neutral';
  const compatScore = OHAENG_COMPAT_SCORES[harmonyKey] || 60;
  const harmonyMsg  = isKo ? harmony.ko : isJa ? (harmony.ja || harmony.en) : harmony.en;
  const scoreLvl =
    compatScore >= 75 ? (isKo ? '✨ 오늘은 길한 날' : isJa ? '✨ 吉日です' : '✨ Lucky day') :
    compatScore >= 55 ? (isKo ? '⚖️ 평온한 하루'   : isJa ? '⚖️ 普通の日' : '⚖️ Neutral day') :
                        (isKo ? '⚠️ 신중한 하루'    : isJa ? '⚠️ 慎重に' :  '⚠️ Cautious day');

  const tipLine = isKo
    ? `💡 오늘의 행운 방위: <strong>${getDirectionByElement(todayEl,'ko')}</strong> · 행운 색상: <strong style="color:${color}">${ELEMENT_COLOR[todayEl]?.name||'—'}</strong>`
    : isJa
    ? `💡 今日のラッキー方位: <strong>${getDirectionByElement(todayEl,'ja')}</strong> · カラー: <strong style="color:${color}">${ELEMENT_COLOR[todayEl]?.en||'—'}</strong>`
    : `💡 Lucky direction: <strong>${getDirectionByElement(todayEl,'en')}</strong> · Color: <strong style="color:${color}">${ELEMENT_COLOR[todayEl]?.en||'—'}</strong>`;

  const div = document.createElement('div');
  div.id = 'today-ilchin-section';
  div.style.cssText = 'background:linear-gradient(135deg,#fffbeb,#fef9e7);border:2px solid #fbbf24;border-radius:20px;padding:18px 20px;margin-bottom:20px;';
  div.innerHTML = `
    <div style="font-size:12px;font-weight:800;color:#92400e;margin-bottom:12px;letter-spacing:.3px;">📅 ${title}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px;">
      <div style="background:${color};border-radius:12px;padding:10px 14px;text-align:center;flex-shrink:0;">
        <div style="font-size:24px;font-weight:900;color:#fff;">${todayGanzhi}</div>
        <div style="font-size:10px;color:rgba(255,255,255,.85);font-weight:600;margin-top:2px;">${todayReading}</div>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;color:#78350f;margin-bottom:5px;">${scoreLvl}</div>
        <div style="font-size:12px;color:#92400e;line-height:1.65;">${harmony.emoji} ${harmonyMsg}</div>
      </div>
    </div>
    <div style="background:rgba(180,83,9,.06);border-radius:8px;padding:8px 12px;font-size:11px;color:#78350f;line-height:1.6;">${tipLine}</div>`;

  const shinsalPanel = document.getElementById('shinsal-panel');
  const hapPanel     = document.getElementById('hapchong-panel');
  const seunPanel    = document.getElementById('seun-panel');
  const detailPanel  = document.getElementById('detailed-reading-panel');
  const catSection   = document.getElementById('fortune-cats-section');
  const shareSection = document.querySelector('.share-section');
  const anchor = shinsalPanel || hapPanel || seunPanel || detailPanel;
  if (anchor) anchor.after(div);
  else if (catSection) catSection.before(div);
  else if (shareSection) shareSection.before(div);
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
  const copyLinkLabel = L.btnCopyLink || '🔗 Link';
  const saveImgLabel  = L.btnSaveImage || '📷 Save';

  // 세로 공유 카드 (Spotify Wrapped식) — 맨 앞 강조 버튼
  const CARD_BTN = { ko:'공유 카드', en:'Share Card', ja:'シェアカード', de:'Share-Karte', fr:'Carte à partager', es:'Tarjeta', pt:'Cartão', it:'Card', id:'Kartu' };
  container.insertAdjacentHTML('beforeend',
    `<button class="share-btn copy" onclick="renderShareCard()" style="background:linear-gradient(135deg,#4c1d95,#7c3aed);border:none;color:#fff;font-weight:800;"><span class="sb-icon">✨</span><span>${CARD_BTN[lang]||CARD_BTN.en}</span></button>`);

  // G3) Wordle식 이모지 결과 복사 (채팅 바이럴)
  const _wl=(_gL(data,'wordle'))||{copyButton:'📋'};
  container.insertAdjacentHTML('beforeend',
    `<button class="share-btn copy" onclick="copyLuckyEmoji(this)" style="background:#ecfdf5;border:1.5px solid #6ee7b7;color:#047857;font-weight:700;"><span class="sb-icon">🟩</span><span>${escHtml(_wl.copyButton||'Copy')}</span></button>`);

  // 모바일 OS 공유시트 (지원 브라우저에서만)
  if (navigator.share) {
    const NS = { ko:'공유하기', en:'Share', ja:'共有', de:'Teilen', fr:'Partager', es:'Compartir', pt:'Compartilhar', it:'Condividi', id:'Bagikan' };
    container.insertAdjacentHTML('beforeend',
      `<button class="share-btn copy" onclick="doNativeShare()" style="background:#1c1917;border:1.5px solid #1c1917;color:#fff;"><span class="sb-icon">📤</span><span>${NS[lang]||NS.en}</span></button>`);
  }

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

  // Universal copy-link + image-save buttons (always shown after social buttons)
  container.insertAdjacentHTML('beforeend', `
    <button class="share-btn copy" onclick="doCopyLink(this)" style="background:#f0f9ff;border:1.5px solid #7dd3fc;color:#0369a1;">
      <span class="sb-icon">🔗</span><span id="copy-link-label">${copyLinkLabel}</span>
    </button>
    <button class="share-btn copy" onclick="saveResultAsImage()" style="background:#fdf4ff;border:1.5px solid #d8b4fe;color:#7e22ce;">
      <span class="sb-icon">📷</span><span>${saveImgLabel}</span>
    </button>
  `);
}

// ── 세로 공유 카드 (Spotify Wrapped식) — 순수 canvas 2D, 9:16 (1080×1920) ──
const SHARECARD_T = {
  app:{ko:'행운의 번호',en:'Lucky Numbers',ja:'幸運の数字',de:'Glückszahlen',fr:'Numéros Chanceux',es:'Números de la Suerte',pt:'Números da Sorte',it:'Numeri Fortunati',id:'Angka Keberuntungan'},
  numbers:{ko:'나의 행운 번호',en:'MY LUCKY NUMBERS',ja:'私の幸運の数字',de:'MEINE GLÜCKSZAHLEN',fr:'MES NUMÉROS CHANCEUX',es:'MIS NÚMEROS DE LA SUERTE',pt:'MEUS NÚMEROS DA SORTE',it:'I MIEI NUMERI FORTUNATI',id:'ANGKA KEBERUNTUNGANKU'},
  cta:{ko:'나만의 번호 뽑기',en:'Get yours free',ja:'あなたの数字も無料で',de:'Hol dir deine — gratis',fr:'Obtenez les vôtres',es:'Consigue los tuyos gratis',pt:'Descubra os seus grátis',it:'Scopri i tuoi gratis',id:'Dapatkan milikmu gratis'},
};
function renderShareCard() {
  try {
    const data = lastResult;
    if (!data || !data.mainNums || !data.mainNums.length) return;
    const lang = data.lang || window.LUCKY_CURRENT_LANG || 'ko';
    const T = SHARECARD_T;
    const W = 1080, H = 1920;
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    const x = cv.getContext('2d');
    const CJK = "'Apple SD Gothic Neo','Noto Sans KR','Noto Sans JP','Malgun Gothic','Segoe UI',sans-serif";
    const cx = W/2;

    // 배경 그라데이션
    const bg = x.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#1e1b4b'); bg.addColorStop(.5,'#312e81'); bg.addColorStop(1,'#4c1d95');
    x.fillStyle = bg; x.fillRect(0,0,W,H);
    // 장식 원
    x.fillStyle = 'rgba(124,58,237,.18)'; x.beginPath(); x.arc(930,260,300,0,7); x.fill();
    x.fillStyle = 'rgba(217,119,6,.14)'; x.beginPath(); x.arc(120,1500,260,0,7); x.fill();
    x.textAlign = 'center';

    // 헤더
    x.font = `120px ${CJK}`; x.fillText('🍀', cx, 330);
    x.fillStyle = '#fff'; x.font = `900 76px ${CJK}`; x.fillText(T.app[lang]||T.app.en, cx, 450);
    // 생년월일 + 카테고리
    const cats = (window.LUCKY_LANG && window.LUCKY_LANG.catNames) || [];
    const catIdx = {lucky:0,saju:1,love:2,money:3,career:4,achievement:5,gunghap:6}[window.LUCKY_SELECTED_CAT||'lucky']||0;
    const catLabel = cats[catIdx] || '';
    const bdStr = `${data.year}.${String(data.month).padStart(2,'0')}.${String(data.day).padStart(2,'0')}`;
    x.fillStyle = '#c4b5fd'; x.font = `44px ${CJK}`;
    x.fillText(catLabel ? `${bdStr} · ${catLabel}` : bdStr, cx, 540);

    // "나의 행운 번호" 라벨
    x.fillStyle = '#fbbf24'; x.font = `800 40px ${CJK}`;
    x.fillText(T.numbers[lang]||T.numbers.en, cx, 720);

    // 행운 번호 6개 — 2행 3열 큰 볼
    const nums = data.mainNums.slice(0,6);
    const COL = [['#d97706','#92400e'],['#1d4ed8','#1e3a8a'],['#dc2626','#7f1d1d'],['#059669','#064e3b'],['#7c3aed','#4c1d95'],['#db2777','#831843']];
    const r = 118, gapX = 320, startX = cx - gapX, rowY = [930, 1280];
    nums.forEach((n,i) => {
      const col = i % 3, row = Math.floor(i/3);
      const bx = startX + col*gapX, by = rowY[row];
      const grad = x.createRadialGradient(bx-30,by-40,20,bx,by,r);
      grad.addColorStop(0, COL[i%6][0]); grad.addColorStop(1, COL[i%6][1]);
      x.fillStyle = grad; x.beginPath(); x.arc(bx,by,r,0,7); x.fill();
      x.fillStyle = 'rgba(255,255,255,.25)'; x.beginPath(); x.arc(bx-38,by-46,30,0,7); x.fill();
      x.fillStyle = '#fff'; x.font = `900 ${String(n).length>1?86:96}px ${CJK}`; x.textBaseline='middle';
      x.fillText(String(n), bx, by+4); x.textBaseline='alphabetic';
    });

    // 띠 이모지 + 오행
    const czEmj = (typeof _CZ_EMJ!=='undefined' && _CZ_EMJ[data.czKey]) ? _CZ_EMJ[data.czKey] : '✨';
    x.font = `110px ${CJK}`; x.fillText(czEmj, cx, 1560);

    // 푸터 CTA + 도메인
    x.fillStyle = '#fbbf24'; x.font = `800 46px ${CJK}`; x.fillText(`👉 ${T.cta[lang]||T.cta.en}`, cx, 1720);
    x.fillStyle = '#a5b4fc'; x.font = `700 40px ${CJK}`; x.fillText('all-lifes.com/lucky', cx, 1790);
    x.fillStyle = '#d97706'; x.fillRect(0,0,W,10); x.fillRect(0,H-10,W,10);

    cv.toBlob(async (blob) => {
      if (!blob) return;
      const fname = 'lucky-numbers.png';
      const file = new File([blob], fname, { type:'image/png' });
      const L = window.LUCKY_LANG || {};
      if (navigator.canShare && navigator.canShare({ files:[file] })) {
        try { await navigator.share({ files:[file], text: (L.shareText ? L.shareText.replace('{numbers}', nums.join(', ')) : '') }); return; } catch(e) { if (e && e.name === 'AbortError') return; }
      }
      // 폴백: 다운로드
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = fname; document.body.appendChild(a); a.click();
      setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); }, 1000);
    }, 'image/png');
  } catch(e) {}
}

// ══════════════════════════════════════════════════════════
// AI 운세 상담 챗봇 (Cloudflare Workers AI 백엔드)
// 결과는 위에 그대로 출력되고, 이 패널은 "관련 질문"용으로만 동작.
// (자동 전송 없음 — 사용자가 직접 질문/추천칩 클릭 시에만 호출)
// ══════════════════════════════════════════════════════════
const _AI_LABELS = {
  ko:{title:'🔮 AI 운세 상담', ph:'운세에 대해 물어보세요...', send:'전송',
      welcome:'안녕하세요! 위 운세 결과에 대해 궁금한 점을 자유롭게 물어보세요. 오행·사주를 바탕으로 답해드릴게요. 😊',
      sugg:['올해 금전운을 더 자세히 알려줘','연애운을 높이려면 어떻게 해야 해?','직업·진로에 대한 조언을 줘']},
  en:{title:'🔮 AI Fortune Chat', ph:'Ask about your fortune...', send:'Send',
      welcome:"Hi! Ask me anything about your fortune results above — I'll answer based on your numerology and chart. 😊",
      sugg:['Tell me more about my money luck this year','How can I improve my love life?','Any career advice for me?']},
  ja:{title:'🔮 AI運勢相談', ph:'運勢について質問...', send:'送信',
      welcome:'こんにちは！上の運勢結果について何でも聞いてください。九星・命式をもとにお答えします。😊',
      sugg:['今年の金運をもっと詳しく','恋愛運を上げるには？','仕事・キャリアの助言が欲しい']},
  de:{title:'🔮 KI-Horoskop-Chat', ph:'Frag nach deinem Schicksal...', send:'Senden',
      welcome:'Hallo! Frag mich alles zu deinen Ergebnissen oben – ich antworte auf Basis deiner Numerologie. 😊',
      sugg:['Mehr über mein Geldglück dieses Jahr','Wie verbessere ich mein Liebesleben?','Karriere-Tipps für mich?']},
  fr:{title:'🔮 Chat IA Horoscope', ph:'Posez une question...', send:'Envoyer',
      welcome:'Bonjour ! Posez vos questions sur vos résultats ci-dessus — je réponds selon votre numérologie. 😊',
      sugg:['Plus de détails sur ma chance financière','Comment améliorer ma vie amoureuse ?','Des conseils de carrière ?']},
  es:{title:'🔮 Chat IA del Destino', ph:'Pregunta sobre tu destino...', send:'Enviar',
      welcome:'¡Hola! Pregúntame lo que quieras sobre tus resultados de arriba — responderé según tu numerología. 😊',
      sugg:['Más sobre mi suerte económica este año','¿Cómo mejorar mi vida amorosa?','¿Algún consejo profesional?']},
  pt:{title:'🔮 Chat IA da Sorte', ph:'Pergunte sobre sua sorte...', send:'Enviar',
      welcome:'Olá! Pergunte qualquer coisa sobre seus resultados acima — responderei com base na sua numerologia. 😊',
      sugg:['Mais sobre minha sorte financeira este ano','Como melhorar minha vida amorosa?','Algum conselho de carreira?']},
  it:{title:'🔮 Chat IA Oroscopo', ph:'Chiedi del tuo destino...', send:'Invia',
      welcome:'Ciao! Chiedimi tutto sui tuoi risultati qui sopra — risponderò in base alla tua numerologia. 😊',
      sugg:['Più dettagli sulla mia fortuna economica','Come migliorare la mia vita amorosa?','Qualche consiglio di carriera?']},
  id:{title:'🔮 Obrolan AI Keberuntungan', ph:'Tanya tentang nasibmu...', send:'Kirim',
      welcome:'Halo! Tanyakan apa saja tentang hasil di atas — saya jawab berdasarkan Primbon & numerologi Anda. 😊',
      sugg:['Lebih detail soal rezeki tahun ini','Bagaimana meningkatkan asmara?','Saran karier untuk saya?']},
};

function renderAIChat(data) {
  const lang = data.lang || window.LUCKY_CURRENT_LANG || 'ko';
  const old = document.getElementById('ai-chat-panel');
  if (old) old.remove();

  const fd = {
    birthDate: `${data.year}-${String(data.month).padStart(2,'0')}-${String(data.day).padStart(2,'0')}`,
    element: data.cultural ? data.cultural.element : '',
    zodiac: data.czKey || '',
    luckyNums: (data.mainNums || data.numbers || []).join(', '),
    loveScore:    data.loveData ? data.loveData.score : null,
    moneyScore:   data.moneyData ? data.moneyData.score : null,
    careerScore:  data.careerData ? data.careerData.score : null,
    achieveScore: data.achievementData ? data.achievementData.score : null,
  };
  const lb = _AI_LABELS[lang] || _AI_LABELS.en;
  window._aiChatLang = lang;
  window._aiChatFD   = fd;
  window._aiHistory  = [];
  window._aiSugg     = lb.sugg;

  const chips = lb.sugg.map((s,i)=>
    `<button type="button" onclick="_aiAskSuggestion(${i})" style="background:#fff;border:1px solid #c7d2fe;color:#4338ca;border-radius:50px;padding:7px 13px;font-size:12px;font-weight:600;cursor:pointer;line-height:1.3;text-align:left;">${s}</button>`
  ).join('');

  const panel = document.createElement('div');
  panel.id = 'ai-chat-panel';
  panel.style.cssText = 'background:#fff;border-radius:20px;box-shadow:0 2px 16px rgba(0,0,0,0.10);margin:16px 0;overflow:hidden;';
  panel.innerHTML = `
<div style="background:linear-gradient(135deg,#1e1b4b,#4c1d95);padding:14px 18px;display:flex;align-items:center;gap:10px;">
  <span style="color:#fff;font-weight:800;font-size:15px;">${lb.title}</span>
</div>
<div id="ai-messages" style="padding:16px;min-height:60px;max-height:440px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;"></div>
<div id="ai-suggestions" style="padding:0 14px 12px;display:flex;flex-wrap:wrap;gap:7px;">${chips}</div>
<div style="padding:10px 14px;border-top:1px solid #e5e7eb;display:flex;gap:8px;">
  <input id="ai-input" type="text" placeholder="${lb.ph}"
    style="flex:1;border:1px solid #d1d5db;border-radius:50px;padding:9px 16px;font-size:14px;outline:none;background:#f9fafb;">
  <button id="ai-send-btn" onclick="sendAIChatMessage()"
    style="background:#4c1d95;color:#fff;border:none;border-radius:50px;padding:9px 18px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;">${lb.send}</button>
</div>`;

  const shareSec = document.querySelector('.share-section') || document.getElementById('s-result');
  if (shareSec && shareSec.parentNode) shareSec.insertAdjacentElement('beforebegin', panel);
  else { const r = document.getElementById('s-result'); if (r) r.appendChild(panel); }

  // 자동 전송 없이 환영 메시지만 표시
  _aiAddMessage('assistant', lb.welcome, false);

  const inp = document.getElementById('ai-input');
  if (inp) inp.addEventListener('keydown', function(e){
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendAIChatMessage(); }
  });
}

function _aiAskSuggestion(i) {
  const t = (window._aiSugg || [])[i];
  if (!t) return;
  const inp = document.getElementById('ai-input');
  if (inp) inp.value = t;
  sendAIChatMessage();
}

function _aiAddMessage(role, text, streaming) {
  const msgs = document.getElementById('ai-messages');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.style.cssText = role === 'user'
    ? 'align-self:flex-end;background:#4c1d95;color:#fff;padding:10px 14px;border-radius:16px 16px 4px 16px;font-size:13px;max-width:80%;line-height:1.6;'
    : 'align-self:flex-start;background:#f3f4f6;color:#1c1917;padding:10px 14px;border-radius:16px 16px 16px 4px;font-size:13px;max-width:90%;line-height:1.7;white-space:pre-wrap;';
  if (streaming) {
    div.innerHTML = '<span style="display:inline-block;width:6px;height:6px;background:#9ca3af;border-radius:50%;animation:ai-blink 1s infinite;margin-right:3px;"></span><span style="display:inline-block;width:6px;height:6px;background:#9ca3af;border-radius:50%;animation:ai-blink 1s .3s infinite;margin-right:3px;"></span><span style="display:inline-block;width:6px;height:6px;background:#9ca3af;border-radius:50%;animation:ai-blink 1s .6s infinite;"></span>';
    if (!document.getElementById('ai-blink-style')) {
      const st = document.createElement('style');
      st.id = 'ai-blink-style';
      st.textContent = '@keyframes ai-blink{0%,80%,100%{opacity:.2}40%{opacity:1}}';
      document.head.appendChild(st);
    }
  } else {
    div.textContent = text;
  }
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

async function _aiStreamMessage(history, fd, lang) {
  const btn = document.getElementById('ai-send-btn');
  const inp = document.getElementById('ai-input');
  if (btn) btn.disabled = true;
  if (inp) inp.disabled = true;

  const msgBox = document.getElementById('ai-messages');
  let bubble = msgBox ? msgBox.lastElementChild : null;
  if (!bubble || bubble.dataset.role !== 'assistant-stream') bubble = _aiAddMessage('assistant', '', true);

  try {
    const res = await fetch('https://all-lifes.com/lucky-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang, fortuneData: fd, messages: history }),
    });
    if (!res.ok || !res.body) {
      const errBody = await res.text().catch(() => res.status);
      throw new Error('API ' + res.status + ': ' + errBody);
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '', buf = '';
    if (bubble) bubble.innerHTML = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (payload === '[DONE]' || payload === '') continue;
        try {
          const json = JSON.parse(payload);
          // Workers AI 스트리밍은 {"response":"..."} 형식 (OpenAI 형식도 호환)
          const delta = json.response ?? json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            if (bubble) bubble.textContent = fullText;
            if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
          }
        } catch {}
      }
    }
    const _AI_ERR = { ko:'⚠️ 응답을 받지 못했어요. 잠시 후 다시 시도해주세요.', en:'⚠️ No response received. Please try again shortly.', ja:'⚠️ 応答を受け取れませんでした。しばらくしてからもう一度お試しください。', de:'⚠️ Keine Antwort erhalten. Bitte versuchen Sie es gleich erneut.', fr:'⚠️ Aucune réponse reçue. Veuillez réessayer dans un instant.', es:'⚠️ No se recibió respuesta. Inténtalo de nuevo en un momento.', pt:'⚠️ Nenhuma resposta recebida. Tente novamente em instantes.', it:'⚠️ Nessuna risposta ricevuta. Riprova tra poco.', id:'⚠️ Tidak ada respons. Silakan coba lagi sebentar lagi.' };
    if (!fullText && bubble) bubble.textContent = _AI_ERR[lang] || _AI_ERR.en;
    window._aiHistory = [...history, { role: 'assistant', content: fullText }];
  } catch(e) {
    const _AI_ERR2 = { ko:'⚠️ 연결에 문제가 생겼어요. 잠시 후 다시 시도해주세요.', en:'⚠️ Connection problem. Please try again shortly.', ja:'⚠️ 接続に問題が発生しました。しばらくしてからお試しください。', de:'⚠️ Verbindungsproblem. Bitte versuchen Sie es gleich erneut.', fr:'⚠️ Problème de connexion. Veuillez réessayer dans un instant.', es:'⚠️ Problema de conexión. Inténtalo de nuevo en un momento.', pt:'⚠️ Problema de conexão. Tente novamente em instantes.', it:'⚠️ Problema di connessione. Riprova tra poco.', id:'⚠️ Masalah koneksi. Silakan coba lagi sebentar lagi.' };
    if (bubble) bubble.textContent = _AI_ERR2[lang] || _AI_ERR2.en;
    try { console.warn('lucky-chat error:', e.message); } catch(_) {}
  } finally {
    if (btn) btn.disabled = false;
    if (inp) { inp.disabled = false; inp.focus(); }
  }
}

function sendAIChatMessage() {
  const inp = document.getElementById('ai-input');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text) return;
  inp.value = '';
  // 첫 질문 시 추천칩 숨김
  const sg = document.getElementById('ai-suggestions');
  if (sg) sg.style.display = 'none';
  _aiAddMessage('user', text, false);
  const history = [...(window._aiHistory || []), { role: 'user', content: text }];
  window._aiHistory = history;
  const bubble = _aiAddMessage('assistant', '', true);
  if (bubble) bubble.dataset.role = 'assistant-stream';
  _aiStreamMessage(history, window._aiChatFD, window._aiChatLang);
}

// ══════════════════════════════════════════════════════════
// 편의 기능: 생일 기억 · 최근 운세 기록 · 네이티브 공유 · 로또 당첨번호 비교
// (모두 localStorage/브라우저 API 기반 — 서버 저장 없음)
// ══════════════════════════════════════════════════════════
const _LS_BIRTH = 'lucky_birth_v1';
const _LS_HIST  = 'lucky_history_v1';

function _saveBirthAndHistory(data) {
  try {
    if (!data || !data.year) return;
    const gender = (document.querySelector('.gender-btn.active') || {}).dataset?.gender || null;
    localStorage.setItem(_LS_BIRTH, JSON.stringify({ y:data.year, m:data.month, d:data.day, g:gender }));
    const hist = JSON.parse(localStorage.getItem(_LS_HIST) || '[]');
    const entry = { t:Date.now(), y:data.year, m:data.month, d:data.day,
                    nums:(data.mainNums||data.numbers||[]).slice(0,7), cat:window.LUCKY_SELECTED_CAT||'lucky' };
    // 같은 생일+카테고리 중복은 최신으로 교체
    const dedup = hist.filter(h => !(h.y===entry.y && h.m===entry.m && h.d===entry.d && h.cat===entry.cat));
    dedup.unshift(entry);
    localStorage.setItem(_LS_HIST, JSON.stringify(dedup.slice(0,5)));
  } catch(e) {}
}

// ── 행운 스트릭(연속 출석) — Duolingo식 리텐션 (localStorage, 로컬 자정 기준) ──
const _LS_STREAK = 'lucky_streak_v1';
function _ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function _updateStreak() {
  try {
    const today = _ymd(new Date());
    const y = new Date(); y.setDate(y.getDate()-1);
    const yest = _ymd(y);
    let s = JSON.parse(localStorage.getItem(_LS_STREAK) || 'null') || { last:'', count:0, best:0 };
    if (s.last === today) { /* 오늘 이미 카운트됨 */ }
    else if (s.last === yest) { s.count += 1; }
    else { s.count = 1; }
    s.last = today;
    s.best = Math.max(s.best || 0, s.count);
    localStorage.setItem(_LS_STREAK, JSON.stringify(s));
    return s;
  } catch(e) { return null; }
}
function _renderStreak() {
  try {
    const wrap = document.getElementById('lucky-streak');
    if (!wrap) return;
    const s = _updateStreak();
    if (!s || s.count < 1) { wrap.style.display = 'none'; return; }
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    const days = s.count;
    const nextMile = days < 3 ? 3 : days < 7 ? 7 : days < 14 ? 14 : days < 30 ? 30 : days < 100 ? 100 : null;
    // 복수형 안전: 숫자+단어 분리
    const DAYW = { ko:'일', ja:'日間', en:days===1?'day':'days', de:days===1?'Tag':'Tage', fr:days===1?'jour':'jours', es:days===1?'día':'días', pt:days===1?'dia':'dias', it:days===1?'giorno':'giorni', id:'hari' };
    const STREAK_T = {
      ko:`🔥 ${days}${DAYW.ko} 연속 방문`, ja:`🔥 ${days}${DAYW.ja}連続`, en:`🔥 ${days}-${DAYW.en} streak`,
      de:`🔥 ${days} ${DAYW.de} in Folge`, fr:`🔥 ${days} ${DAYW.fr} d'affilée`, es:`🔥 ${days} ${DAYW.es} seguidos`,
      pt:`🔥 ${days} ${DAYW.pt} seguidos`, it:`🔥 ${days} ${DAYW.it} di fila`, id:`🔥 ${days} ${DAYW.id} beruntun`,
    };
    let mileHtml = '';
    if (nextMile) {
      const left = nextMile - days;
      const LEFT_T = {
        ko:`${nextMile}일까지 ${left}일`, ja:`あと${left}日で${nextMile}日`, en:`${left} to ${nextMile}`,
        de:`noch ${left} bis ${nextMile}`, fr:`${left} avant ${nextMile}`, es:`${left} para ${nextMile}`,
        pt:`${left} para ${nextMile}`, it:`${left} ai ${nextMile}`, id:`${left} lagi ke ${nextMile}`,
      };
      const prog = Math.round((days/nextMile)*100);
      mileHtml = `<div style="flex:1;min-width:120px;">
        <div style="height:6px;background:rgba(0,0,0,.08);border-radius:3px;overflow:hidden;"><div style="height:100%;width:${prog}%;background:linear-gradient(90deg,#f59e0b,#ef4444);border-radius:3px;"></div></div>
        <div style="font-size:10px;color:var(--text3,#a8a29e);margin-top:4px;">${LEFT_T[lang]||LEFT_T.en}</div>
      </div>`;
    }
    wrap.style.display = '';
    wrap.style.cssText = 'display:flex;align-items:center;gap:12px;max-width:500px;margin:0 auto 18px;background:#fff;border:1.5px solid var(--border,#e7e5e4);border-radius:14px;padding:11px 16px;';
    wrap.innerHTML = `<span style="font-size:13px;font-weight:800;color:#ea580c;white-space:nowrap;">${STREAK_T[lang]||STREAK_T.en}</span>${mileHtml}`;
  } catch(e) {}
}

// 정직한 신뢰 신호 — 데이터는 브라우저에만 저장(서버DB 없음)·무가입·무료
function _renderPrivacyNote() {
  try {
    const el = document.getElementById('privacy-note');
    if (!el) return;
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    const T = {
      ko:'🔒 입력 정보는 브라우저에만 저장돼요 · 가입 없이 100% 무료 · 9개 언어 지원',
      en:'🔒 Your data stays in your browser · 100% free, no signup · 9 languages',
      ja:'🔒 入力情報はブラウザ内のみに保存 · 登録不要・完全無料 · 9言語対応',
      de:'🔒 Deine Daten bleiben im Browser · 100% kostenlos, ohne Anmeldung · 9 Sprachen',
      fr:'🔒 Vos données restent dans votre navigateur · 100% gratuit, sans inscription · 9 langues',
      es:'🔒 Tus datos quedan en tu navegador · 100% gratis, sin registro · 9 idiomas',
      pt:'🔒 Seus dados ficam no navegador · 100% grátis, sem cadastro · 9 idiomas',
      it:'🔒 I tuoi dati restano nel browser · 100% gratis, senza registrazione · 9 lingue',
      id:'🔒 Data Anda tetap di browser · 100% gratis, tanpa daftar · 9 bahasa',
    };
    el.textContent = T[lang] || T.en;
  } catch(e) {}
}

// ── 특정 날짜 길흉 계산기 (Astro-Seek식 도구형 진입점) ──────
// 단일 날짜 길흉 판정 (calcAuspiciousDates 로직 미러, 충일은 bad 로 surface)
function _dateLuckOne(data, y, m, dd) {
  const CHONG = {0:6,1:7,2:8,3:9,4:10,5:11,6:0,7:1,8:2,9:3,10:4,11:5};
  const sheng = {'木':'水','火':'木','土':'火','金':'土','水':'金'};
  const d  = new Date(y, m-1, dd);
  const jd = gregJD(y, m, dd);
  if (data.systemKey === 'saju') {
    const daySi = calcDayStemIdx(y, m, dd), dayEl = ELEMENTS[daySi];
    const yongsin = (data.fullSaju && data.fullSaju.yongsin) || data.cultural.element;
    const dayBranch = calcDayBranch(y, m, dd);
    const birthDayBr = data.fullSaju ? data.fullSaju.dayBranch : null;
    const hasChong = birthDayBr !== null && CHONG[dayBranch] === birthDayBr;
    const isGood = (dayEl === yongsin || sheng[yongsin] === dayEl) && !hasChong;
    return { lv: hasChong ? 'bad' : (isGood ? 'good' : 'neutral'), detail: STEMS[daySi]+BRANCHES[dayBranch] };
  } else if (data.systemKey === 'kyusei') {
    const rokuyo = getRokuyo(y, m, dd);
    const lv = rokuyo===4?'great':rokuyo===0||rokuyo===1?'good':rokuyo===3?'bad':'neutral';
    return { lv, detail: ['先勝','友引','先負','仏滅','大安','赤口'][rokuyo] };
  } else if (data.systemKey === 'jawanese') {
    const pasaranIdx = ((jd - 2451551) % 5 + 5) % 5;
    const birthNeptu = (data.cultural && data.cultural.neptu) ? data.cultural.neptu : 10;
    const dayNeptu = WETON_DAY_NEPTU[d.getDay()], pasNeptu = WETON_PAS_NEPTU[pasaranIdx];
    const combined = birthNeptu + dayNeptu + pasNeptu;
    const lv = combined>=25?'great':combined>=20?'good':'neutral';
    return { lv, detail: PASARAN[pasaranIdx] };
  } else {
    const udn = calcUDN(y, m, dd);
    const lp = (data.cultural && (data.cultural.lifePathNum || data.cultural.lpn)) || 1;
    const lvN = (udn===lp||udn===(lp===9?1:lp+1)||udn===(lp===1?9:lp-1))?'good':'neutral';
    return { lv: lvN, detail: 'UDN '+udn };
  }
}

const DATELUCK_UI = {
  title:{ko:'🗓️ 특정 날짜 길흉 보기',en:'🗓️ Lucky Day Checker',ja:'🗓️ 日取りの吉凶チェック',de:'🗓️ Glückstag-Prüfer',fr:'🗓️ Vérificateur de jour',es:'🗓️ Comprobador de día',pt:'🗓️ Verificador de dia',it:'🗓️ Verifica del giorno',id:'🗓️ Cek Hari Baik'},
  hint:{ko:'결혼·계약·시험 등 중요한 날의 길흉을 미리 확인하세요',en:'Check the luck of an important date — wedding, exam, contract',ja:'結婚・契約・試験など大事な日の吉凶を事前にチェック',de:'Prüfe die Gunst eines wichtigen Datums — Hochzeit, Prüfung, Vertrag',fr:'Vérifiez la chance d’une date importante — mariage, examen, contrat',es:'Comprueba la suerte de una fecha importante — boda, examen, contrato',pt:'Veja a sorte de uma data importante — casamento, prova, contrato',it:'Verifica la fortuna di una data importante — matrimonio, esame, contratto',id:'Cek keberuntungan tanggal penting — nikah, ujian, kontrak'},
  dateLabel:{ko:'날짜 선택',en:'Pick a date',ja:'日付を選択',de:'Datum wählen',fr:'Choisir une date',es:'Elegir fecha',pt:'Escolher data',it:'Scegli data',id:'Pilih tanggal'},
  btn:{ko:'길흉 확인',en:'Check',ja:'チェック',de:'Prüfen',fr:'Vérifier',es:'Comprobar',pt:'Verificar',it:'Verifica',id:'Cek'},
  need:{ko:'먼저 위에 생년월일을 입력해주세요',en:'Please enter your birth date above first',ja:'先に上で生年月日を入力してください',de:'Bitte zuerst oben dein Geburtsdatum eingeben',fr:'Veuillez d’abord saisir votre date de naissance ci-dessus',es:'Primero introduce tu fecha de nacimiento arriba',pt:'Primeiro insira sua data de nascimento acima',it:'Inserisci prima la tua data di nascita sopra',id:'Masukkan dulu tanggal lahir Anda di atas'},
  luckyLabel:{ko:'그날의 행운 번호',en:'Lucky numbers for that day',ja:'その日の幸運の数字',de:'Glückszahlen für diesen Tag',fr:'Numéros chanceux du jour',es:'Números de la suerte del día',pt:'Números da sorte do dia',it:'Numeri fortunati del giorno',id:'Angka keberuntungan hari itu'},
};
const DATELUCK_LV = {
  great:{c:'#16a34a',ko:{b:'대길(大吉)',r:'아주 길한 날 — 중요한 일을 진행하기 좋습니다.'},en:{b:'Excellent',r:'A highly auspicious day — great for important plans.'},ja:{b:'大吉',r:'とても良い日 — 大事な事を進めるのに最適。'},de:{b:'Ausgezeichnet',r:'Ein sehr günstiger Tag — ideal für wichtige Vorhaben.'},fr:{b:'Excellent',r:'Un jour très favorable — idéal pour les projets importants.'},es:{b:'Excelente',r:'Un día muy propicio — ideal para planes importantes.'},pt:{b:'Excelente',r:'Um dia muito auspicioso — ótimo para planos importantes.'},it:{b:'Eccellente',r:'Un giorno molto propizio — ideale per progetti importanti.'},id:{b:'Sangat Baik',r:'Hari sangat baik — pas untuk rencana penting.'}},
  good:{c:'#4f46e5',ko:{b:'길(吉)',r:'좋은 기운의 날 — 무난하게 추진할 수 있습니다.'},en:{b:'Favorable',r:'A day of good energy — smooth to move forward.'},ja:{b:'吉',r:'良い気の日 — 無難に進められます。'},de:{b:'Günstig',r:'Ein Tag guter Energie — gut, um voranzukommen.'},fr:{b:'Favorable',r:'Un jour de bonne énergie — propice pour avancer.'},es:{b:'Favorable',r:'Un día de buena energía — propicio para avanzar.'},pt:{b:'Favorável',r:'Um dia de boa energia — tranquilo para avançar.'},it:{b:'Favorevole',r:'Un giorno di buona energia — adatto per procedere.'},id:{b:'Baik',r:'Hari berenergi baik — lancar untuk melangkah.'}},
  neutral:{c:'#6b7280',ko:{b:'평(平)',r:'평이한 날 — 큰 변수 없이 차분하게.'},en:{b:'Neutral',r:'A balanced day — steady, no big surprises.'},ja:{b:'平',r:'平穏な日 — 大きな波なく落ち着いて。'},de:{b:'Neutral',r:'Ein ausgeglichener Tag — ruhig, ohne Überraschungen.'},fr:{b:'Neutre',r:'Un jour équilibré — calme, sans surprises.'},es:{b:'Neutral',r:'Un día equilibrado — tranquilo, sin sorpresas.'},pt:{b:'Neutro',r:'Um dia equilibrado — calmo, sem surpresas.'},it:{b:'Neutro',r:'Un giorno equilibrato — calmo, senza sorprese.'},id:{b:'Netral',r:'Hari seimbang — tenang, tanpa kejutan.'}},
  bad:{c:'#dc2626',ko:{b:'주의(注意)',r:'변동의 기운 — 중요한 결정은 신중히 하세요.'},en:{b:'Caution',r:'A day of flux — make big decisions carefully.'},ja:{b:'注意',r:'変動の気 — 大事な決断は慎重に。'},de:{b:'Vorsicht',r:'Ein Tag des Wandels — große Entscheidungen mit Bedacht.'},fr:{b:'Prudence',r:'Un jour de fluctuations — décidez avec prudence.'},es:{b:'Precaución',r:'Un día de cambios — decide con cuidado.'},pt:{b:'Cuidado',r:'Um dia de mudanças — decida com cautela.'},it:{b:'Attenzione',r:'Un giorno di cambiamenti — decidi con prudenza.'},id:{b:'Hati-hati',r:'Hari penuh perubahan — putuskan dengan hati-hati.'}},
};

function _renderDateLuckTool() {
  try {
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    const U = DATELUCK_UI;
    const g = (o)=>o[lang]||o.en;
    const t = document.getElementById('dl-title'); if (t) t.textContent = g(U.title);
    const h = document.getElementById('dl-hint'); if (h) h.textContent = g(U.hint);
    const dl = document.getElementById('dl-date-label'); if (dl) dl.textContent = g(U.dateLabel);
    const b = document.getElementById('dl-btn'); if (b) b.textContent = g(U.btn);
    const di = document.getElementById('dl-date');
    if (di && !di.value) {
      const tm = new Date(); tm.setDate(tm.getDate()+1);
      di.min = new Date().toISOString().slice(0,10);
      di.value = tm.toISOString().slice(0,10);
    }
  } catch(e) {}
}

function checkDateLuck() {
  try {
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    const out = document.getElementById('dl-result');
    const by = parseInt((document.getElementById('bday-year')||{}).value)||0;
    const bm = parseInt((document.getElementById('bday-month')||{}).value)||0;
    const bd = parseInt((document.getElementById('bday-day')||{}).value)||0;
    if (!by || !bm || !bd) { if (out){ out.style.display='block'; out.innerHTML = `<span style="color:#dc2626;font-size:12px;">${(DATELUCK_UI.need[lang]||DATELUCK_UI.need.en)}</span>`; } return; }
    const dv = (document.getElementById('dl-date')||{}).value;
    if (!dv) return;
    const [ty,tmo,tdd] = dv.split('-').map(Number);
    const base = generateLucky(by, bm, bd, lang);
    const lvInfo = _dateLuckOne(base, ty, tmo, tdd);
    const lvT = (DATELUCK_LV[lvInfo.lv]||DATELUCK_LV.neutral);
    const lvL = lvT[lang]||lvT.en;
    const numData = generateLucky(by, bm, bd, lang, 'lotto645', `${ty}-${String(tmo).padStart(2,'0')}-${String(tdd).padStart(2,'0')}`);
    const nums = (numData.mainNums||[]).slice(0,6);
    const balls = nums.map(n=>`<span style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#4c1d95,#7c3aed);color:#fff;font-weight:900;font-size:13px;margin:2px;">${n}</span>`).join('');
    const dateStr = new Date(ty, tmo-1, tdd).toLocaleDateString(lang==='ko'?'ko-KR':lang, {year:'numeric',month:'long',day:'numeric',weekday:'short'});
    if (out) {
      out.style.display='block';
      out.innerHTML = `
        <div style="text-align:center;margin-bottom:10px;font-size:13px;font-weight:700;color:var(--text2,#78716c);">${dateStr}</div>
        <div style="text-align:center;margin-bottom:8px;"><span style="background:${lvT.c};color:#fff;font-weight:800;font-size:14px;padding:6px 18px;border-radius:50px;">${lvL.b}</span></div>
        <p style="text-align:center;font-size:13px;color:var(--text,#1c1917);line-height:1.6;margin-bottom:12px;">${lvL.r}</p>
        <div style="text-align:center;font-size:11px;font-weight:700;color:var(--text3,#a8a29e);margin-bottom:6px;">${DATELUCK_UI.luckyLabel[lang]||DATELUCK_UI.luckyLabel.en}</div>
        <div style="text-align:center;">${balls}</div>`;
    }
  } catch(e) {}
}

function _restoreBirthInfo() {
  try {
    const s = JSON.parse(localStorage.getItem(_LS_BIRTH) || 'null');
    if (!s) return;
    const set = (id,v) => { const el = document.getElementById(id); if (el && v && !el.value) el.value = v; };
    set('bday-year', s.y); set('bday-month', s.m); set('bday-day', s.d);
    if (s.g) selectGender(s.g);
  } catch(e) {}
}

function _renderHistoryChips() {
  try {
    const wrap = document.getElementById('recent-history');
    if (!wrap) return;
    const hist = JSON.parse(localStorage.getItem(_LS_HIST) || '[]');
    if (!hist.length) { wrap.style.display = 'none'; return; }
    const L = window.LUCKY_LANG || {};
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    const TITLE = { ko:'🕘 최근 기록', en:'🕘 Recent', ja:'🕘 最近の記録', de:'🕘 Verlauf', fr:'🕘 Récent', es:'🕘 Reciente', pt:'🕘 Recente', it:'🕘 Recenti', id:'🕘 Riwayat' };
    const catIcons = { lucky:'🍀', saju:'🔮', love:'💝', money:'💰', career:'💼', achievement:'🏆', gunghap:'💑' };
    wrap.style.display = '';
    wrap.innerHTML = `<div style="font-size:12px;font-weight:700;color:var(--text3,#78716c);margin-bottom:7px;">${TITLE[lang]||TITLE.en}</div>` +
      hist.map((h,i) =>
        `<button type="button" onclick="_useHistory(${i})" style="display:inline-flex;align-items:center;gap:6px;background:#fff;border:1.5px solid var(--border2,#e7e5e4);border-radius:50px;padding:7px 13px;margin:0 6px 6px 0;font-size:12px;font-weight:600;color:var(--text,#1c1917);cursor:pointer;">${catIcons[h.cat]||'🍀'} ${h.y}.${String(h.m).padStart(2,'0')}.${String(h.d).padStart(2,'0')}${h.nums&&h.nums.length?` · ${h.nums.slice(0,3).join(',')}…`:''}</button>`
      ).join('');
  } catch(e) {}
}

function _useHistory(i) {
  try {
    const hist = JSON.parse(localStorage.getItem(_LS_HIST) || '[]');
    const h = hist[i]; if (!h) return;
    document.getElementById('bday-year').value  = h.y;
    document.getElementById('bday-month').value = h.m;
    document.getElementById('bday-day').value   = h.d;
    if (h.cat && typeof selectCategory === 'function' && window.LUCKY_SELECTED_CAT !== h.cat) selectCategory(h.cat);
    startGenerate();
  } catch(e) {}
}

// 모바일 네이티브 공유 (navigator.share 지원 기기에서만 버튼 노출)
function doNativeShare() {
  try {
    const L = window.LUCKY_LANG || {};
    navigator.share({ title: document.title, text: (L.ogResultDesc || L.desc || ''), url: getShareUrl() }).catch(()=>{});
  } catch(e) {}
}

// ── AliExpress 어필리에이트 추천 상품 패널 (전 언어, 결과 화면) ──
const AE_AFF_L = {
  ko:{ title:'🧧 행운 아이템 추천 · 광고', disc:'AliExpress 파트너스 활동으로 일정액의 수수료를 받을 수 있습니다.' },
  en:{ title:'🧧 Lucky Charm Picks · Ad', disc:'As an AliExpress affiliate, we may earn a commission from qualifying purchases.' },
  ja:{ title:'🧧 開運アイテム · 広告', disc:'AliExpressアフィリエイトにより、購入に応じて手数料を受け取る場合があります。' },
  de:{ title:'🧧 Glücksbringer-Auswahl · Anzeige', disc:'Als AliExpress-Partner verdienen wir ggf. an qualifizierten Käufen.' },
  fr:{ title:'🧧 Porte-bonheur · Pub', disc:'En tant que partenaire AliExpress, nous pouvons percevoir une commission sur les achats éligibles.' },
  es:{ title:'🧧 Amuletos de la suerte · Anuncio', disc:'Como afiliados de AliExpress, podemos recibir una comisión por compras elegibles.' },
  pt:{ title:'🧧 Amuletos da sorte · Anúncio', disc:'Como afiliados do AliExpress, podemos receber comissão por compras qualificadas.' },
  it:{ title:'🧧 Portafortuna · Annuncio', disc:'In qualità di affiliati AliExpress, potremmo ricevere una commissione sugli acquisti idonei.' },
  id:{ title:'🧧 Jimat keberuntungan · Iklan', disc:'Sebagai afiliasi AliExpress, kami dapat menerima komisi dari pembelian yang memenuhi syarat.' },
};

async function renderAliExpressPanel(data) {
  try {
    const lang = data.lang || window.LUCKY_CURRENT_LANG || 'ko';
    const lb = AE_AFF_L[lang] || AE_AFF_L.en;

    // 세션 캐시 3시간 (엣지 캐시와 별개로 클라 재호출 절약). v3=지오/통화 변경 캐시버스트
    const ck = 'ae_aff_v3_' + lang;
    let payload = null;
    try {
      const c = JSON.parse(sessionStorage.getItem(ck) || 'null');
      if (c && (Date.now() - c.t) < 3*3600*1000) payload = c.d;
    } catch(_) {}
    if (!payload) {
      const res = await fetch('https://all-lifes.com/ko/aff-products?lang=' + lang + '&v=3');
      if (!res.ok) return;
      payload = await res.json();
      try { sessionStorage.setItem(ck, JSON.stringify({ t: Date.now(), d: payload })); } catch(_) {}
    }
    if (!payload || !payload.ok || !payload.products || !payload.products.length) return;
    if (!document.getElementById('s-result')) return;

    const cards = payload.products.map(p => `
      <a href="${p.url}" target="_blank" rel="sponsored nofollow noopener" style="flex:0 0 122px;text-decoration:none;color:#1c1917;background:#fff;border:1.5px solid #e7e5e4;border-radius:14px;overflow:hidden;">
        <img src="${p.img}" alt="" loading="lazy" style="width:122px;height:122px;object-fit:cover;display:block;">
        <div style="padding:7px 8px 9px;">
          <div style="font-size:10.5px;line-height:1.35;height:28px;overflow:hidden;color:#44403c;">${(p.t||'').replace(/</g,'&lt;').slice(0,60)}</div>
          <div style="font-size:12px;font-weight:800;color:#d97706;margin-top:4px;">${p.price} ${p.cur}</div>
        </div>
      </a>`).join('');

    const old = document.getElementById('ae-aff-panel');
    if (old) old.remove();
    const div = document.createElement('div');
    div.id = 'ae-aff-panel';
    div.style.cssText = 'background:#fff;border:2px solid #e7e5e4;border-radius:20px;padding:16px 0 12px;margin-bottom:16px;overflow:hidden;';
    div.innerHTML = `
      <div style="font-size:12px;font-weight:800;color:#374151;margin:0 18px 10px;">${lb.title}</div>
      <div style="display:flex;gap:9px;overflow-x:auto;padding:0 18px 6px;-webkit-overflow-scrolling:touch;">${cards}</div>
      <p style="font-size:9.5px;color:#a8a29e;margin:8px 18px 0;line-height:1.5;">${lb.disc}</p>`;
    // 상단(결과 번호/광고 바로 아래)에 배치 — 잘 보이는 위치
    const topA = document.getElementById('ad-result-top') || document.querySelector('.fortune-card') || document.getElementById('lottery-section');
    if (topA && topA.parentNode) topA.after(div);
    else { const share = document.querySelector('.share-section'); if (share) share.before(div); }
  } catch(e) {}
}

function doCopyLink(btn) {
  const url = getShareUrl();
  const L = window.LUCKY_LANG || {};
  navigator.clipboard.writeText(url).then(() => {
    const lbl = btn.querySelector('#copy-link-label');
    const orig = lbl ? lbl.textContent : '';
    if (lbl) lbl.textContent = L.btnCopied || '✓ Copied!';
    setTimeout(() => { if (lbl) lbl.textContent = orig; }, 2000);
  }).catch(() => {
    prompt('Copy this URL:', url);
  });
}

function getShareUrl() {
  if (!lastResult) return location.href;
  const d   = lastResult;
  const cat = window.LUCKY_SELECTED_CAT || 'lucky';
  const p   = new URLSearchParams();
  p.set('lang', d.lang);
  p.set('bd', `${d.year}${String(d.month).padStart(2,'0')}${String(d.day).padStart(2,'0')}`);
  // keep legacy params so worker OG still works
  p.set('y', d.year); p.set('m', d.month); p.set('dy', d.day);
  if (cat !== 'lucky') p.set('cat', cat);
  if (d.gender) p.set('gender', d.gender);
  if (d.birthHour !== null && d.birthHour !== undefined) p.set('bh', d.birthHour);
  if (d.partnerData) {
    const pb = d.partnerData;
    p.set('bd2', `${pb.year}${String(pb.month).padStart(2,'0')}${String(pb.day).padStart(2,'0')}`);
  }
  return `${location.origin}${location.pathname}?${p.toString()}`;
}
function getShareText() { return lastResult ? buildShareText(lastResult) : ''; }

// ── 오늘의 기운 패널 ─────────────────────────────────────────
// 데일리 시그니처 한 줄 (Co-Star식) — 날짜 시드로 매일 결정론적 변경, 9개 언어 의역
const DAILY_SIGNATURE = {
  en:["Today rewards the bold — make the call you've been avoiding.","Small moves, big momentum. Start before you feel ready.","The universe is listening. Be specific about what you want.","Luck favors the prepared today. Tidy one corner of your life.","A quiet day for planning — plant a seed you'll harvest later.","Your energy is magnetic right now. Reach out to someone.","Trust the timing. What's delayed isn't denied.","Say yes to the unexpected — today's detour is the point.","Protect your focus. One thing finished beats ten half-started.","Fortune flows to open hands. Give a little, gain a lot."],
  ko:["오늘은 용기에 보상이 따른다 — 미뤄둔 그 연락을 해보세요.","작은 한 걸음이 큰 흐름을 만든다. 준비되기 전에 시작하세요.","우주가 듣고 있다. 원하는 걸 구체적으로 말하세요.","준비된 자에게 운이 온다. 삶의 한 구석을 정돈해보세요.","계획에 좋은 조용한 날 — 나중에 거둘 씨앗을 심으세요.","지금 당신의 기운은 자석 같다. 먼저 손 내밀어보세요.","타이밍을 믿으세요. 늦어진 것은 거절된 게 아닙니다.","예상 밖의 일에 '예'라고 해보세요. 오늘의 우회로가 정답입니다.","집중을 지키세요. 끝낸 하나가 시작만 한 열보다 낫습니다.","행운은 열린 손으로 흐른다. 조금 베풀면 크게 돌아옵니다."],
  ja:["今日は勇気が報われる — 後回しにした連絡をしてみて。","小さな一歩が大きな流れを生む。準備が整う前に始めよう。","宇宙は聞いている。望みを具体的に言葉にして。","備えある人に運は訪れる。生活の片隅を整えてみて。","計画に向く静かな日 — のちに実る種を蒔こう。","今のあなたは磁石のよう。自分から声をかけてみて。","タイミングを信じて。遅れは拒否ではない。","予想外の出来事に「はい」を。今日の寄り道こそが鍵。","集中を守ろう。終えた一つは、始めただけの十に勝る。","幸運は開いた手に流れる。少し与えれば大きく返る。"],
  de:["Heute belohnt der Mut — wage den Anruf, den du aufschiebst.","Kleine Schritte, großer Schwung. Fang an, bevor du dich bereit fühlst.","Das Universum hört zu. Sei genau in dem, was du willst.","Das Glück liebt die Vorbereiteten. Räum eine Ecke deines Lebens auf.","Ein stiller Tag zum Planen — säe, was du später erntest.","Deine Energie ist gerade magnetisch. Geh auf jemanden zu.","Vertraue dem Timing. Verzögert heißt nicht verwehrt.","Sag Ja zum Unerwarteten — der Umweg von heute ist der Sinn.","Schütze deinen Fokus. Eins fertig schlägt zehn halb begonnen.","Glück fließt in offene Hände. Gib etwas, gewinne viel."],
  fr:["Aujourd'hui récompense l'audace — passe l'appel que tu évites.","De petits pas, un grand élan. Commence avant de te sentir prêt.","L'univers écoute. Sois précis sur ce que tu veux.","La chance aime ceux qui se préparent. Range un coin de ta vie.","Un jour calme pour planifier — sème ce que tu récolteras plus tard.","Ton énergie est magnétique en ce moment. Fais le premier pas.","Fais confiance au timing. Retardé ne veut pas dire refusé.","Dis oui à l'imprévu — le détour d'aujourd'hui est l'essentiel.","Protège ta concentration. Une chose finie vaut dix à moitié.","La chance va aux mains ouvertes. Donne un peu, reçois beaucoup."],
  es:["Hoy premia a los audaces — haz esa llamada que evitas.","Pasos pequeños, gran impulso. Empieza antes de sentirte listo.","El universo escucha. Sé específico con lo que deseas.","La suerte favorece a los preparados. Ordena un rincón de tu vida.","Un día tranquilo para planear — siembra lo que cosecharás luego.","Tu energía es magnética ahora. Da el primer paso con alguien.","Confía en el momento. Lo aplazado no es negado.","Di sí a lo inesperado — el desvío de hoy es el punto.","Protege tu enfoque. Una cosa terminada vale por diez a medias.","La fortuna fluye a manos abiertas. Da un poco, gana mucho."],
  pt:["Hoje recompensa a ousadia — faça aquela ligação que evita.","Passos pequenos, grande impulso. Comece antes de se sentir pronto.","O universo escuta. Seja específico sobre o que deseja.","A sorte favorece os preparados. Arrume um canto da sua vida.","Um dia calmo para planejar — plante o que vai colher depois.","Sua energia está magnética agora. Dê o primeiro passo.","Confie no tempo certo. O adiado não é negado.","Diga sim ao inesperado — o desvio de hoje é o ponto.","Proteja seu foco. Uma coisa concluída vale por dez pela metade.","A fortuna flui para mãos abertas. Dê um pouco, ganhe muito."],
  it:["Oggi premia il coraggio — fai quella chiamata che eviti.","Piccoli passi, grande slancio. Inizia prima di sentirti pronto.","L'universo ascolta. Sii preciso su ciò che desideri.","La fortuna ama chi è pronto. Riordina un angolo della tua vita.","Un giorno tranquillo per pianificare — semina ciò che raccoglierai.","La tua energia è magnetica ora. Fai tu il primo passo.","Fidati del tempismo. Ciò che tarda non è negato.","Di' sì all'imprevisto — la deviazione di oggi è il senso.","Proteggi la tua concentrazione. Una cosa finita vale dieci a metà.","La fortuna va alle mani aperte. Dai un po', ricevi molto."],
  id:["Hari ini memihak yang berani — lakukan panggilan yang kau hindari.","Langkah kecil, momentum besar. Mulai sebelum merasa siap.","Semesta mendengar. Spesifiklah tentang yang kau inginkan.","Keberuntungan menyukai yang siap. Rapikan satu sudut hidupmu.","Hari tenang untuk merencana — tanam benih yang kelak kau panen.","Energimu sedang magnetis. Sapa seseorang lebih dulu.","Percayai waktunya. Yang tertunda bukan berarti ditolak.","Katakan ya pada hal tak terduga — belokan hari ini justru intinya.","Jaga fokusmu. Satu yang selesai mengalahkan sepuluh yang separuh.","Rezeki mengalir ke tangan terbuka. Beri sedikit, dapat banyak."],
};

function renderDailyEnergyPanel(data) {
  const existing = document.getElementById('daily-energy-panel');
  if (existing) existing.remove();

  const today = new Date();
  const ty = today.getFullYear(), tm = today.getMonth()+1, td = today.getDate();
  const jd = gregJD(ty, tm, td);

  // 일진 간지
  const stemIdx   = ((Math.floor(jd - 2451551) % 10) + 10) % 10;
  const branchIdx = ((Math.floor(jd - 2451551) % 12) + 12) % 12;
  const el        = ELEMENTS[stemIdx];
  const EL_COLOR  = {'木':'#16a34a','火':'#dc2626','土':'#b45309','金':'#d97706','水':'#2563eb'};
  const EL_KO     = {'木':'목','火':'화','土':'토','金':'금','水':'수'};
  const elColor   = EL_COLOR[el] || '#6b7280';

  // 달 위상
  const moon = _getMoonPhase();
  const L = window.LUCKY_LANG || {};
  const MOON_NAMES = {
    ko:{new:'삭(朔)',waxing_crescent:'초승달',first_quarter:'상현(上弦)',waxing_gibbous:'차는 달',full:'보름달',waning_gibbous:'기우는 달',last_quarter:'하현(下弦)',waning_crescent:'그믐달'},
    ja:{new:'新月',waxing_crescent:'三日月',first_quarter:'上弦の月',waxing_gibbous:'十日夜',full:'満月',waning_gibbous:'十六夜',last_quarter:'下弦の月',waning_crescent:'有明月'},
    en:{new:'New Moon',waxing_crescent:'Waxing Crescent',first_quarter:'First Quarter',waxing_gibbous:'Waxing Gibbous',full:'Full Moon',waning_gibbous:'Waning Gibbous',last_quarter:'Last Quarter',waning_crescent:'Waning Crescent'},
    de:{new:'Neumond',waxing_crescent:'Zunehmende Sichel',first_quarter:'Erstes Viertel',waxing_gibbous:'Zunehmender Mond',full:'Vollmond',waning_gibbous:'Abnehmender Mond',last_quarter:'Letztes Viertel',waning_crescent:'Abnehmende Sichel'},
    fr:{new:'Nouvelle lune',waxing_crescent:'Premier croissant',first_quarter:'Premier quartier',waxing_gibbous:'Gibbeuse croissante',full:'Pleine lune',waning_gibbous:'Gibbeuse décroissante',last_quarter:'Dernier quartier',waning_crescent:'Dernier croissant'},
    es:{new:'Luna nueva',waxing_crescent:'Luna creciente',first_quarter:'Cuarto creciente',waxing_gibbous:'Gibosa creciente',full:'Luna llena',waning_gibbous:'Gibosa menguante',last_quarter:'Cuarto menguante',waning_crescent:'Luna menguante'},
    pt:{new:'Lua nova',waxing_crescent:'Lua crescente',first_quarter:'Quarto crescente',waxing_gibbous:'Gibosa crescente',full:'Lua cheia',waning_gibbous:'Gibosa minguante',last_quarter:'Quarto minguante',waning_crescent:'Lua minguante'},
    it:{new:'Luna nuova',waxing_crescent:'Luna crescente',first_quarter:'Primo quarto',waxing_gibbous:'Gibbosa crescente',full:'Luna piena',waning_gibbous:'Gibbosa calante',last_quarter:'Ultimo quarto',waning_crescent:'Luna calante'},
    id:{new:'Bulan baru',waxing_crescent:'Sabit muda',first_quarter:'Kuartal pertama',waxing_gibbous:'Cembung awal',full:'Purnama',waning_gibbous:'Cembung akhir',last_quarter:'Kuartal akhir',waning_crescent:'Sabit tua'},
  };
  const moonMap = MOON_NAMES[data.lang] || MOON_NAMES.en;
  const moonLabel = moonMap[moon.key] || moon.key;

  // 오늘의 수비학적 수 (Universal Day Number)
  const udn = [ty,tm,td].join('').split('').reduce((a,c)=>a+parseInt(c),0);
  let udnR = udn;
  while(udnR > 9 && udnR !== 11 && udnR !== 22) udnR = String(udnR).split('').reduce((a,c)=>a+parseInt(c),0);
  const UDN_WORDS = {
    en:['','Ambition','Balance','Expression','Stability','Change','Harmony','Wisdom','Power','Completion','Master','Master'],
    ko:['','야망','균형','표현','안정','변화','조화','지혜','파워','완성','마스터','마스터'],
    ja:['','野心','バランス','表現','安定','変化','調和','知恵','パワー','完成','マスター','マスター'],
    de:['','Ehrgeiz','Balance','Ausdruck','Stabilität','Wandel','Harmonie','Weisheit','Kraft','Vollendung','Meister','Meister'],
    fr:['','Ambition','Équilibre','Expression','Stabilité','Changement','Harmonie','Sagesse','Puissance','Accomplissement','Maître','Maître'],
    es:['','Ambición','Equilibrio','Expresión','Estabilidad','Cambio','Armonía','Sabiduría','Poder','Plenitud','Maestro','Maestro'],
    pt:['','Ambição','Equilíbrio','Expressão','Estabilidade','Mudança','Harmonia','Sabedoria','Poder','Plenitude','Mestre','Mestre'],
    it:['','Ambizione','Equilibrio','Espressione','Stabilità','Cambiamento','Armonia','Saggezza','Potere','Completezza','Maestro','Maestro'],
    id:['','Ambisi','Keseimbangan','Ekspresi','Stabilitas','Perubahan','Harmoni','Kebijaksanaan','Kekuatan','Penyelesaian','Master','Master'],
  };
  const udnLabel = (UDN_WORDS[data.lang] || UDN_WORDS.en)[udnR] || '';

  const TITLE = {ko:'오늘의 기운',ja:'今日のエネルギー',en:"Today's Energy",de:'Heutiger Tag',fr:"Énergie du jour",es:'Energía de hoy',pt:'Energia do dia',it:"L'energia di oggi",id:'Energi Hari Ini'};
  const IL_KO  = STEMS[stemIdx]+BRANCHES[branchIdx];
  const IL_TXT = data.lang==='ko' ? `${IL_KO}일 (${EL_KO[el]})`
                : data.lang==='ja' ? `${IL_KO}の日`
                : `${STEMS[stemIdx]}${BRANCHES[branchIdx]}`;

  // 데일리 시그니처 한 줄 (날짜 시드 → 매일 변경)
  const sigPool = DAILY_SIGNATURE[data.lang] || DAILY_SIGNATURE.en;
  const sigLine = sigPool[((jd % sigPool.length) + sigPool.length) % sigPool.length];

  // 천체 이벤트 배너 (신월/보름 ±1일) + 행동 팁
  const CELEBR = {
    new:{ ko:{t:'🌑 신월(新月) — 새 출발과 소원 적기 좋은 날',tip:'이루고 싶은 목표를 한 문장으로 적어보세요.'}, en:{t:'🌑 New Moon — a fresh start, perfect for intentions',tip:'Write down one goal you want to begin.'}, ja:{t:'🌑 新月 — 新しい始まりと願い事に最適',tip:'叶えたい目標を一文で書いてみて。'}, de:{t:'🌑 Neumond — ein Neuanfang, ideal für Vorsätze',tip:'Schreib ein Ziel auf, das du beginnen willst.'}, fr:{t:'🌑 Nouvelle lune — un nouveau départ, idéal pour les intentions',tip:'Note un objectif que tu veux lancer.'}, es:{t:'🌑 Luna nueva — un nuevo comienzo, ideal para intenciones',tip:'Escribe una meta que quieras iniciar.'}, pt:{t:'🌑 Lua nova — um recomeço, ideal para intenções',tip:'Escreva uma meta que deseja começar.'}, it:{t:'🌑 Luna nuova — un nuovo inizio, ideale per i propositi',tip:'Scrivi un obiettivo che vuoi iniziare.'}, id:{t:'🌑 Bulan baru — awal segar, pas untuk niat',tip:'Tulis satu tujuan yang ingin kau mulai.'} },
    full:{ ko:{t:'🌕 보름달 — 결실과 감사, 비움의 날',tip:'고마운 사람에게 마음을 전해보세요.'}, en:{t:'🌕 Full Moon — fruition, gratitude, and release',tip:'Thank someone who helped you lately.'}, ja:{t:'🌕 満月 — 実り・感謝・手放しの日',tip:'お世話になった人に感謝を伝えて。'}, de:{t:'🌕 Vollmond — Ernte, Dankbarkeit und Loslassen',tip:'Danke jemandem, der dir geholfen hat.'}, fr:{t:'🌕 Pleine lune — aboutissement, gratitude et lâcher-prise',tip:'Remercie quelqu’un qui t’a aidé récemment.'}, es:{t:'🌕 Luna llena — culminación, gratitud y soltar',tip:'Agradece a alguien que te ayudó.'}, pt:{t:'🌕 Lua cheia — realização, gratidão e soltar',tip:'Agradeça a alguém que o ajudou.'}, it:{t:'🌕 Luna piena — compimento, gratitudine e lasciar andare',tip:'Ringrazia qualcuno che ti ha aiutato.'}, id:{t:'🌕 Purnama — buah hasil, syukur, dan melepaskan',tip:'Ucapkan terima kasih pada yang membantumu.'} },
  };
  const celeb = CELEBR[moon.key] && CELEBR[moon.key][data.lang] ? CELEBR[moon.key][data.lang] : (CELEBR[moon.key] ? CELEBR[moon.key].en : null);
  const celebHtml = celeb ? `<div style="background:linear-gradient(135deg,#4c1d95,#7c3aed);border-radius:10px;padding:9px 12px;margin-bottom:10px;">
      <div style="font-size:12px;font-weight:800;">${celeb.t}</div>
      <div style="font-size:10.5px;color:#ddd6fe;margin-top:3px;">💡 ${celeb.tip}</div>
    </div>` : '';

  const panel = document.createElement('div');
  panel.id = 'daily-energy-panel';
  panel.style.cssText = 'background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:16px;margin:16px 0;color:#fff;';
  panel.innerHTML = `
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#94a3b8;margin-bottom:10px;text-transform:uppercase;">${TITLE[data.lang]||TITLE.en}</div>
    ${celebHtml}
    <div style="font-size:14px;font-weight:700;line-height:1.55;color:#fef3c7;background:rgba(251,191,36,.08);border-left:3px solid #fbbf24;border-radius:0 10px 10px 0;padding:11px 14px;margin-bottom:12px;">“${sigLine}”</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;text-align:center;">
      <div style="background:rgba(255,255,255,.07);border-radius:10px;padding:10px 6px;">
        <div style="font-size:22px;font-weight:900;color:${elColor};">${IL_KO}</div>
        <div style="font-size:10px;color:#94a3b8;margin-top:3px;">${IL_TXT}</div>
      </div>
      <div style="background:rgba(255,255,255,.07);border-radius:10px;padding:10px 6px;">
        <div style="font-size:28px;">${moon.icon}</div>
        <div style="font-size:10px;color:#94a3b8;margin-top:3px;">${moonLabel}</div>
      </div>
      <div style="background:rgba(255,255,255,.07);border-radius:10px;padding:10px 6px;">
        <div style="font-size:28px;font-weight:900;color:#fbbf24;">${udnR}</div>
        <div style="font-size:10px;color:#94a3b8;margin-top:3px;">${udnLabel}</div>
      </div>
    </div>`;

  const shareSec = document.querySelector('.share-section');
  if (shareSec) shareSec.parentNode.insertBefore(panel, shareSec);
  else document.getElementById('s-result').appendChild(panel);
}

// ══════════════════════════════════════════════════════════
// 신규 행운요소 5종 (바이오리듬·탄생석/화·서양별자리·타로·행운의4요소)
// 콘텐츠: window.LUX[lang] (luck-elements.js, 9개 언어 네이티브)
// 모든 값은 생일·seed·오늘날짜 기반 결정론
// ══════════════════════════════════════════════════════════
function _luxGet(lang){ return (window.LUX && (window.LUX[lang] || window.LUX.en)) || null; }
function _luxDayNum(){ const t=new Date(); return Math.floor(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())/86400000); }
function _luxPick(seed, salt, n){ return Math.floor(mkRng((seed||1) + _luxDayNum()*salt + salt)() * n); }
function _luxInsert(panel){
  const shareSec = document.querySelector('.share-section');
  if (shareSec) shareSec.parentNode.insertBefore(panel, shareSec);
  else { const r=document.getElementById('s-result'); if (r) r.appendChild(panel); }
}
// 서양 태양궁 인덱스 0=양자리..11=물고기
function _sunSignIdx(m, d){
  const t = m*100 + d;
  if (t>=321 && t<=419) return 0;
  if (t>=420 && t<=520) return 1;
  if (t>=521 && t<=620) return 2;
  if (t>=621 && t<=722) return 3;
  if (t>=723 && t<=822) return 4;
  if (t>=823 && t<=922) return 5;
  if (t>=923 && t<=1022) return 6;
  if (t>=1023 && t<=1121) return 7;
  if (t>=1122 && t<=1221) return 8;
  if (t>=1222 || t<=119) return 9;
  if (t>=120 && t<=218) return 10;
  return 11;
}
const _SIGN_EMJ = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
const _SIGN_ELEMCOL = ['#ef4444','#16a34a','#06b6d4','#3b82f6','#ef4444','#16a34a','#06b6d4','#3b82f6','#ef4444','#16a34a','#06b6d4','#3b82f6'];
// 점성 로직: 0=양자리..11=물고기. 원소(불/흙/바람/물)·특성(활동/고정/변통)·극성·수호행성·원소상성
const _SIGN_ELEM = ['fire','earth','air','water','fire','earth','air','water','fire','earth','air','water'];
const _ELEM_IDX = { fire:0, earth:1, air:2, water:3 };
const _ELEM_COMPAT = { fire:{fire:18,air:11,earth:1,water:-8}, earth:{earth:18,water:11,fire:1,air:-8}, air:{air:18,fire:11,water:1,earth:-8}, water:{water:18,earth:11,air:1,fire:-8} };
const _SIGN_MODALITY = [0,1,2,0,1,2,0,1,2,0,1,2]; // 0 활동 1 고정 2 변통
const _SIGN_POLARITY = [0,1,0,1,0,1,0,1,0,1,0,1]; // 0 양 1 음
const _SIGN_PLANET = [0,1,2,3,4,2,1,5,6,7,8,9];    // 화금수달태명목토천해 인덱스
const _ASTRO_TERMS = {
  ko:{ planets:['화성','금성','수성','달','태양','명왕성','목성','토성','천왕성','해왕성'], modality:['활동궁','고정궁','변통궁'], polarity:['양(능동)','음(수용)'], elem:['불','흙','바람','물'] },
  en:{ planets:['Mars','Venus','Mercury','Moon','Sun','Pluto','Jupiter','Saturn','Uranus','Neptune'], modality:['Cardinal','Fixed','Mutable'], polarity:['Positive','Negative'], elem:['Fire','Earth','Air','Water'] },
  ja:{ planets:['火星','金星','水星','月','太陽','冥王星','木星','土星','天王星','海王星'], modality:['活動宮','固定宮','柔軟宮'], polarity:['陽(能動)','陰(受容)'], elem:['火','地','風','水'] },
  de:{ planets:['Mars','Venus','Merkur','Mond','Sonne','Pluto','Jupiter','Saturn','Uranus','Neptun'], modality:['Kardinal','Fix','Veränderlich'], polarity:['Positiv','Negativ'], elem:['Feuer','Erde','Luft','Wasser'] },
  fr:{ planets:['Mars','Vénus','Mercure','Lune','Soleil','Pluton','Jupiter','Saturne','Uranus','Neptune'], modality:['Cardinal','Fixe','Mutable'], polarity:['Positif','Négatif'], elem:['Feu','Terre','Air','Eau'] },
  es:{ planets:['Marte','Venus','Mercurio','Luna','Sol','Plutón','Júpiter','Saturno','Urano','Neptuno'], modality:['Cardinal','Fijo','Mutable'], polarity:['Positivo','Negativo'], elem:['Fuego','Tierra','Aire','Agua'] },
  pt:{ planets:['Marte','Vênus','Mercúrio','Lua','Sol','Plutão','Júpiter','Saturno','Urano','Netuno'], modality:['Cardinal','Fixo','Mutável'], polarity:['Positivo','Negativo'], elem:['Fogo','Terra','Ar','Água'] },
  it:{ planets:['Marte','Venere','Mercurio','Luna','Sole','Plutone','Giove','Saturno','Urano','Nettuno'], modality:['Cardinale','Fisso','Mobile'], polarity:['Positivo','Negativo'], elem:['Fuoco','Terra','Aria','Acqua'] },
  id:{ planets:['Mars','Venus','Merkurius','Bulan','Matahari','Pluto','Jupiter','Saturnus','Uranus','Neptunus'], modality:['Kardinal','Tetap','Mutable'], polarity:['Positif','Negatif'], elem:['Api','Tanah','Udara','Air'] },
};

// ── 1) 바이오리듬 ──────────────────────────────────────────
function renderBiorhythmPanel(data){
  const old=document.getElementById('biorhythm-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.biorhythm) return;
  const B=X.biorhythm;
  const bd=gregJD(data.year,data.month,data.day);
  const t=new Date(); const td=gregJD(t.getFullYear(),t.getMonth()+1,t.getDate());
  const days=td-bd;
  const v=(p)=>Math.round(Math.sin(2*Math.PI*days/p)*100);
  const phys=v(23), emo=v(28), intel=v(33);
  const row=(name,val)=>{
    const st = val>30?B.band.high : val<-30?B.band.low : B.band.mid;
    const col = val>30?'#16a34a' : val<-30?'#dc2626' : '#d97706';
    const w=Math.min(100,Math.abs(val));
    return `<div style="margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;gap:8px;">
        <span style="font-weight:700;color:#3730a3;">${escHtml(name)}</span>
        <span style="color:${col};font-weight:800;white-space:nowrap;">${val>0?'+':''}${val}% · ${escHtml(st)}</span></div>
      <div style="height:8px;background:#e0e7ff;border-radius:4px;overflow:hidden;"><div style="height:100%;width:${w}%;background:${col};border-radius:4px;"></div></div>
    </div>`;
  };
  const avg=(phys+emo+intel)/3;
  const tip = avg>=0 ? B.tipUp : B.tipDown;
  const panel=document.createElement('div');
  panel.id='biorhythm-panel';
  panel.style.cssText='background:linear-gradient(135deg,#eef2ff,#e0e7ff);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#4338ca;margin-bottom:12px;text-transform:uppercase;">📈 ${escHtml(B.title)}</div>
    ${row(B.cycles.physical,phys)}
    ${row(B.cycles.emotional,emo)}
    ${row(B.cycles.intellectual,intel)}
    <div style="background:rgba(67,56,202,.08);border-radius:10px;padding:9px 12px;font-size:12px;color:#3730a3;line-height:1.5;margin-top:10px;">💡 ${escHtml(tip)}</div>
    <div style="font-size:10px;color:#6366f1;margin-top:7px;line-height:1.4;">${escHtml(B.note)}</div>`;
  _luxInsert(panel);
}

// ── 2) 탄생석 · 탄생화 ─────────────────────────────────────
function renderBirthstonePanel(data){
  const old=document.getElementById('birthstone-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.birthstone) return;
  const S=X.birthstone; const mi=Math.max(0,Math.min(11,(data.month||1)-1));
  const m=S.months[mi]; if(!m) return;
  const panel=document.createElement('div');
  panel.id='birthstone-panel';
  panel.style.cssText='background:linear-gradient(135deg,#fff1f2,#ffe4e6);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#be123c;margin-bottom:12px;text-transform:uppercase;">💎 ${escHtml(S.title)}</div>
    <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;">
      <div style="flex:1;min-width:120px;background:rgba(255,255,255,.6);border-radius:12px;padding:12px;text-align:center;">
        <div style="font-size:30px;line-height:1;margin-bottom:6px;">💎</div>
        <div style="font-size:10px;color:#9f1239;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">${escHtml(S.stoneLabel)}</div>
        <div style="font-size:16px;font-weight:900;color:#881337;margin-top:2px;">${escHtml(m.stone)}</div></div>
      <div style="flex:1;min-width:120px;background:rgba(255,255,255,.6);border-radius:12px;padding:12px;text-align:center;">
        <div style="font-size:30px;line-height:1;margin-bottom:6px;">🌸</div>
        <div style="font-size:10px;color:#9f1239;font-weight:700;text-transform:uppercase;letter-spacing:.04em;">${escHtml(S.flowerLabel)}</div>
        <div style="font-size:16px;font-weight:900;color:#881337;margin-top:2px;">${escHtml(m.flower)}</div></div>
    </div>
    <div style="background:rgba(190,18,60,.07);border-radius:10px;padding:9px 12px;font-size:12px;color:#9f1239;line-height:1.5;">✨ ${escHtml(m.meaning)}</div>`;
  _luxInsert(panel);
}

// ── 3) 서양 별자리 (태양궁) 오늘의 운세 ─────────────────────
function renderSunSignPanel(data){
  const old=document.getElementById('sunsign-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.sunSign) return;
  const S=X.sunSign; const lang=data.lang;
  const si=_sunSignIdx(data.month||1, data.day||1);
  const sign=S.signs[si]; if(!sign) return;
  const L=S.labels||{};
  const lbl=(k,fb)=>escHtml(L[k]||fb||'');
  const TERMS=_ASTRO_TERMS[lang]||_ASTRO_TERMS.en;

  // 별자리별 일운 (제너릭 폐기 → dailyBySign[si], 없으면 구버전 daily 폴백)
  let daily='';
  if (S.dailyBySign && S.dailyBySign[si] && S.dailyBySign[si].length)
    daily=S.dailyBySign[si][_luxPick(data.seed,3,S.dailyBySign[si].length)];
  else if (S.daily && S.daily.length)
    daily=S.daily[_luxPick(data.seed,3,S.daily.length)];

  // 달별자리(빅2) — data.moonSign(0=양자리..11=물고기) 재사용, 없으면 직접 산출
  let mi=(data.moonSign!=null && data.moonSign>=0 && data.moonSign<=11)?data.moonSign:null;
  if(mi==null && typeof getMoonSignPrecise==='function'){
    try{ const _m=getMoonSignPrecise(data.year, data.month, data.day, data.birthHour); if(_m>=0 && _m<=11) mi=_m; }catch(e){}
  }
  const moonName=(mi!=null && S.signs[mi])?S.signs[mi].name:null;
  const moonTrait=(mi!=null && S.moonTraits && S.moonTraits[mi])?S.moonTraits[mi]:null;

  // 점성 근거 점수: 내 별자리 원소 vs 오늘 원소 상성 + 분야별 시드 변주 (난수 아님)
  const dn=_luxDayNum();
  const dayElem=['fire','earth','air','water'][dn%4];
  const baseC=_ELEM_COMPAT[_SIGN_ELEM[si]][dayElem];
  const fsc=(salt)=>Math.max(34,Math.min(99, 52+baseC+(_luxPick(data.seed,salt,27)-12)));
  const sLove=fsc(13),sMoney=fsc(17),sHealth=fsc(23),sCareer=fsc(29),sSocial=fsc(31);
  const sOverall=Math.round((sLove+sMoney+sHealth+sCareer+sSocial)/5);

  // 오늘의 별자리 궁합: 원소 상성 + 날짜 회전으로 best/caution
  const msc=(b)=>_ELEM_COMPAT[_SIGN_ELEM[si]][_SIGN_ELEM[b]]*2 + (_luxPick(data.seed,41+b*7,11));
  let best=-1,bestV=-1e9,worst=-1,worstV=1e9;
  for(let b=0;b<12;b++){ if(b===si)continue; const v=msc(b); if(v>bestV){bestV=v;best=b;} if(v<worstV){worstV=v;worst=b;} }

  const elemCol=_SIGN_ELEMCOL[si];
  const bar=(label,val)=>`<div style="flex:1;min-width:96px;">
    <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:3px;gap:6px;"><span style="color:#6b21a8;font-weight:700;">${escHtml(label)}</span><span style="color:#7e22ce;font-weight:800;">${val}%</span></div>
    <div style="height:7px;background:#ede9fe;border-radius:4px;overflow:hidden;"><div style="height:100%;width:${val}%;background:linear-gradient(90deg,#a855f7,#7e22ce);border-radius:4px;"></div></div></div>`;
  const chip=(emj,name,col,bg)=>`<span style="display:inline-flex;align-items:center;gap:4px;background:${bg};color:${col};font-size:11.5px;font-weight:700;padding:4px 11px;border-radius:20px;">${emj} ${escHtml(name)}</span>`;
  const meta=(t,v)=>`<span style="background:rgba(126,34,206,.08);color:#6b21a8;font-size:10.5px;padding:3px 9px;border-radius:8px;"><b style="color:#7e22ce;">${escHtml(t)}</b> ${escHtml(v)}</span>`;

  // 빅3: 상승궁(어센던트) — 출생시각+출생도시 입력 시 정밀 계산
  const RX=X.rising; const ri=_currentRising(data);
  const risingName=(ri!=null && S.signs[ri])?S.signs[ri].name:null;
  const risingHtml=(ri!=null && RX && RX.signs)?`
    <div style="background:rgba(255,255,255,.7);border-radius:12px;padding:10px 12px;margin-bottom:12px;border:1px solid rgba(147,51,234,.18);">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
        <span style="font-size:10px;color:#9333ea;font-weight:700;text-transform:uppercase;letter-spacing:.03em;">⬆️ ${escHtml(RX.risingLabel||'Rising')}</span>
        <span style="font-size:14px;font-weight:900;color:#581c87;">${_SIGN_EMJ[ri]} ${escHtml(risingName)}</span></div>
      <div style="font-size:11.5px;color:#6b21a8;line-height:1.5;">${escHtml(RX.signs[ri])}</div>
    </div>`:'';
  const risingCta=(ri==null && RX && RX.cta)?`<div style="font-size:10.5px;color:#9333ea;background:rgba(147,51,234,.07);border-radius:8px;padding:7px 10px;margin-bottom:12px;line-height:1.45;">✨ ${escHtml(RX.cta)}</div>`:'';
  const b3Title=(ri!=null && RX && RX.bigThreeTitle)?RX.bigThreeTitle:(L.bigTwoTitle||'');

  const bigTwo = `
    <div style="display:flex;gap:9px;margin-bottom:12px;">
      <div style="flex:1;background:rgba(255,255,255,.65);border-radius:12px;padding:10px 12px;">
        <div style="font-size:10px;color:#9333ea;font-weight:700;text-transform:uppercase;letter-spacing:.03em;">☀️ ${lbl('sunLabel','Sun')}</div>
        <div style="font-size:15px;font-weight:900;color:#581c87;margin-top:1px;">${_SIGN_EMJ[si]} ${escHtml(sign.name)}</div>
        <div style="font-size:11px;color:#6b21a8;line-height:1.45;margin-top:4px;">${escHtml(sign.trait)}</div>
      </div>
      ${moonName?`<div style="flex:1;background:rgba(255,255,255,.65);border-radius:12px;padding:10px 12px;">
        <div style="font-size:10px;color:#9333ea;font-weight:700;text-transform:uppercase;letter-spacing:.03em;">🌙 ${lbl('moonLabel','Moon')}</div>
        <div style="font-size:15px;font-weight:900;color:#581c87;margin-top:1px;">${_SIGN_EMJ[mi]} ${escHtml(moonName)}</div>
        <div style="font-size:11px;color:#6b21a8;line-height:1.45;margin-top:4px;">${escHtml(moonTrait||'')}</div>
      </div>`:''}
    </div>`;

  const panel=document.createElement('div');
  panel.id='sunsign-panel';
  panel.style.cssText='background:linear-gradient(135deg,#faf5ff,#f3e8ff);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#7e22ce;margin-bottom:12px;text-transform:uppercase;">${_SIGN_EMJ[si]} ${escHtml(S.title)}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
      <div style="font-size:46px;line-height:1;">${_SIGN_EMJ[si]}</div>
      <div style="flex:1;">
        <div style="font-size:21px;font-weight:900;color:#581c87;">${escHtml(sign.name)}</div>
        <div style="font-size:11px;color:#7e22ce;margin-top:2px;">${escHtml(sign.range)} · <span style="color:${elemCol};font-weight:700;">${escHtml(sign.element)}</span></div>
      </div></div>
    ${b3Title?`<div style="font-size:11px;font-weight:700;color:#7e22ce;margin-bottom:6px;">${escHtml(b3Title)}</div>`:''}
    ${bigTwo}
    ${risingHtml}${risingCta}
    <div style="background:rgba(126,34,206,.09);border-radius:10px;padding:11px 13px;font-size:12.5px;color:#3b0764;line-height:1.6;margin-bottom:12px;"><b>${lbl('overall',S.overallLabel||'Today')}</b> · ${escHtml(daily)}</div>
    <div style="display:flex;gap:10px 12px;flex-wrap:wrap;margin-bottom:12px;">
      ${bar(L.love||S.loveLabel||'Love',sLove)}${bar(L.money||S.moneyLabel||'Money',sMoney)}${bar(L.career||'Career',sCareer)}${bar(L.health||'Health',sHealth)}${bar(L.social||'Social',sSocial)}
    </div>
    <div style="background:rgba(255,255,255,.6);border-radius:12px;padding:10px 12px;margin-bottom:10px;">
      <div style="font-size:10.5px;color:#9333ea;font-weight:700;text-transform:uppercase;margin-bottom:7px;">💞 ${lbl('compatTitle','Compatibility')}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${chip(_SIGN_EMJ[best],(S.signs[best]&&S.signs[best].name)||'',  '#166534','#dcfce7')}
        <span style="font-size:10.5px;color:#16a34a;align-self:center;">${lbl('bestToday','Best')}</span>
        ${chip(_SIGN_EMJ[worst],(S.signs[worst]&&S.signs[worst].name)||'','#92400e','#fef3c7')}
        <span style="font-size:10.5px;color:#d97706;align-self:center;">${lbl('cautionToday','Caution')}</span>
      </div>
    </div>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      ${meta(lbl('planetLabel','Planet'),TERMS.planets[_SIGN_PLANET[si]])}
      ${meta(lbl('modalityLabel','Mode'),TERMS.modality[_SIGN_MODALITY[si]])}
      ${meta(lbl('polarityLabel','Polarity'),TERMS.polarity[_SIGN_POLARITY[si]])}
    </div>`;
  _luxInsert(panel);
}

// ── 4) 오늘의 타로 (메이저 아르카나) — 정/역방향·분야별·3카드·AI챗 ──────
const _TAROT_Q = {
  ko:(n,o)=>`오늘 뽑은 '${n}'(${o}) 타로 카드가 제게 어떤 의미인지 더 자세히 알려주세요.`,
  en:(n,o)=>`Tell me more about what the '${n}' (${o}) tarot card means for me today.`,
  ja:(n,o)=>`今日引いた「${n}」(${o})のタロットカードが私にとってどんな意味か、もっと詳しく教えてください。`,
  de:(n,o)=>`Erzähl mir mehr darüber, was die Tarotkarte „${n}" (${o}) heute für mich bedeutet.`,
  fr:(n,o)=>`Dis-m'en plus sur ce que la carte de tarot « ${n} » (${o}) signifie pour moi aujourd'hui.`,
  es:(n,o)=>`Cuéntame más sobre lo que la carta de tarot '${n}' (${o}) significa para mí hoy.`,
  pt:(n,o)=>`Conte-me mais sobre o que a carta de tarô '${n}' (${o}) significa para mim hoje.`,
  it:(n,o)=>`Dimmi di più su cosa significa per me oggi la carta dei tarocchi '${n}' (${o}).`,
  id:(n,o)=>`Ceritakan lebih lanjut arti kartu tarot '${n}' (${o}) untuk saya hari ini.`,
};
function _tarotAskAI(ci, rev, lang){
  try{
    const X=window.LUX&&(window.LUX[lang]||window.LUX.en); const T=X&&X.tarot; const card=T&&T.cards[ci]; if(!card) return;
    const orient= rev ? (T.reversedLabel||'Reversed') : (T.uprightLabel||'Upright');
    const q=(_TAROT_Q[lang]||_TAROT_Q.en)(card.name, orient);
    const chat=document.getElementById('ai-chat-panel'); if(chat) chat.scrollIntoView({behavior:'smooth',block:'center'});
    const inp=document.getElementById('ai-input');
    if(inp){ inp.value=q; inp.focus(); if(typeof sendAIChatMessage==='function') sendAIChatMessage(); }
  }catch(e){}
}
function renderTarotPanel(data){
  const old=document.getElementById('tarot-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.tarot) return;
  const T=X.tarot; const lang=data.lang;
  const ci=_luxPick(data.seed,7, T.cards.length);
  const card=T.cards[ci]; if(!card) return;
  // 정/역방향 (역방향 콘텐츠 있을 때만, 50% 결정론)
  const canRev=!!card.reversedLine;
  const rev= canRev && _luxPick(data.seed,71,2)===1;
  const orient= rev ? (T.reversedLabel||T.uprightLabel||'') : (T.uprightLabel||'');
  const kw= rev ? (card.reversedKeyword||card.keyword) : card.keyword;
  const line= rev ? card.reversedLine : card.line;
  const rot= rev ? 'transform:rotate(180deg);' : '';
  // 분야별 (콘텐츠 있을 때)
  const FL=T.fieldLabels;
  const fieldRows = (FL && card.love) ? `
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">
      ${[['💕',FL.love,card.love],['💼',FL.work,card.work],['💰',FL.money,card.money]].map(f=>
        `<div style="display:flex;gap:8px;align-items:flex-start;font-size:11.5px;line-height:1.5;"><span style="flex-shrink:0;">${f[0]}</span><span><b style="color:#fcd34d;">${escHtml(f[1])}</b> <span style="color:#e0e7ff;">${escHtml(f[2])}</span></span></div>`).join('')}
    </div>` : '';
  // 3카드 스프레드 (과거·현재·미래, 콘텐츠 있을 때)
  let spread='';
  if(T.spreadTitle && T.positions && T.positions.length===3){
    const idxs=[]; let s=0;
    while(idxs.length<3 && s<60){ const c=_luxPick(data.seed,80+s*7, T.cards.length); if(idxs.indexOf(c)<0) idxs.push(c); s++; }
    while(idxs.length<3) idxs.push(idxs.length);
    spread=`<div style="margin-top:14px;border-top:1px solid rgba(255,255,255,.12);padding-top:12px;">
      <div style="font-size:11px;font-weight:700;color:#c7d2fe;margin-bottom:9px;">🃏 ${escHtml(T.spreadTitle)}</div>
      <div style="display:flex;gap:8px;">
        ${idxs.map((c,k)=>{const cd=T.cards[c]||{};return `<div style="flex:1;background:rgba(255,255,255,.07);border-radius:10px;padding:9px 6px;text-align:center;">
          <div style="font-size:9px;color:#a5b4fc;text-transform:uppercase;letter-spacing:.02em;">${escHtml(T.positions[k])}</div>
          <div style="font-size:20px;margin:4px 0;">🃏</div>
          <div style="font-size:10.5px;font-weight:800;color:#fff;line-height:1.2;">${escHtml(cd.name||'')}</div>
          <div style="font-size:9.5px;color:#fcd34d;margin-top:2px;">${escHtml(cd.keyword||'')}</div>
        </div>`;}).join('')}
      </div></div>`;
  }
  // AI 더 물어보기 (클릭 시점엔 ai-chat-panel 이 이미 렌더됨 — 렌더순서 무관)
  const askBtn = T.askMore ? `
    <button onclick="_tarotAskAI(${ci},${rev?1:0},'${lang}')" style="margin-top:12px;width:100%;background:rgba(251,191,36,.18);color:#fcd34d;border:1px solid rgba(251,191,36,.4);border-radius:10px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;">💬 ${escHtml(T.askMore)}</button>` : '';

  const panel=document.createElement('div');
  panel.id='tarot-panel';
  panel.style.cssText='background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:16px;padding:16px;margin:16px 0;color:#e0e7ff;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#c7d2fe;margin-bottom:6px;text-transform:uppercase;">🔮 ${escHtml(T.title)}</div>
    <div style="font-size:11px;color:#a5b4fc;margin-bottom:12px;line-height:1.4;">${escHtml(T.intro)}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:6px;">
      <div style="width:62px;height:96px;flex-shrink:0;border-radius:10px;background:linear-gradient(160deg,#fbbf24,#f59e0b);display:flex;align-items:center;justify-content:center;font-size:34px;box-shadow:0 4px 14px rgba(0,0,0,.35);border:2px solid #fcd34d;${rot}">🃏</div>
      <div style="flex:1;">
        <div style="font-size:19px;font-weight:900;color:#fff;line-height:1.2;">${escHtml(card.name)}</div>
        <div style="display:inline-block;margin-top:6px;background:${rev?'rgba(248,113,113,.22)':'rgba(251,191,36,.2)'};color:${rev?'#fca5a5':'#fcd34d'};font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">${escHtml(orient)} · ${escHtml(kw)}</div>
      </div></div>
    <div style="background:rgba(255,255,255,.08);border-radius:10px;padding:11px 13px;font-size:12.5px;color:#e0e7ff;line-height:1.6;">${escHtml(line)}</div>
    ${fieldRows}
    ${askBtn}
    ${spread}`;
  _luxInsert(panel);
}

// ── 5) 행운의 4요소 (색·숫자·방위·시간) ─────────────────────
// ════════ 타 산업 성장요소 (그로스) ════════
function _gGet(data){ const X=_luxGet(data.lang); return (X&&X.growth)?X.growth:null; }
function _gL(data,feat){ const g=_gGet(data); return (g&&g[feat])?g[feat]:null; }
// 결정론 데일리 행운점수(40~99) + 정직한 "오늘 에너지" 백분위
function _dailyLuckScore(data){ const r=mkRng((data.seed||1)+_luxDayNum()*7919)(); return 40+Math.floor(r*60); }

// ── G9) 오늘의 행운 점수 뱃지 + 백분위 (게이미피케이션) ──────────
function renderScorePanel(data){
  const old=document.getElementById('score-panel'); if(old) old.remove();
  const S=_gL(data,'score'); if(!S) return;
  const sc=_dailyLuckScore(data); const pct=Math.max(5,Math.min(95,sc-3)); // 점수≈백분위(날짜에너지 기준)
  const deg=Math.round(sc*3.6); const col=sc>=80?'#16a34a':sc>=65?'#d97706':sc>=50?'#0ea5e9':'#7c3aed';
  const ptxt=(S.percentileTpl||'{p}%').replace('{p}',pct);
  const panel=document.createElement('div');
  panel.id='score-panel';
  panel.style.cssText='background:linear-gradient(135deg,#fff,#f8fafc);border-radius:16px;padding:18px 16px;margin:16px 0;text-align:center;box-shadow:0 2px 12px rgba(15,23,42,.07);';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#64748b;margin-bottom:10px;text-transform:uppercase;">⚡ ${escHtml(S.title)}</div>
    <div style="position:relative;width:128px;height:128px;margin:0 auto;">
      <div style="width:128px;height:128px;border-radius:50%;background:conic-gradient(${col} ${deg}deg,#e2e8f0 ${deg}deg);"></div>
      <div style="position:absolute;inset:11px;background:#fff;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <div style="font-size:38px;font-weight:900;color:${col};line-height:1;">${sc}</div>
        <div style="font-size:10px;color:#94a3b8;font-weight:700;">/ 100</div></div></div>
    <div style="font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;margin-top:9px;">${escHtml(S.badgeTagline||'')}</div>
    <div style="font-size:12.5px;color:#475569;line-height:1.5;margin-top:6px;max-width:300px;margin-left:auto;margin-right:auto;">${escHtml(ptxt)}</div>`;
  _luxInsert(panel);
}

// ── G6) 천체 라이브 카운트다운 (보름달·신월·수성역행) ──────────
function renderCountdownPanel(data){
  const old=document.getElementById('countdown-panel'); if(old) old.remove();
  const C=_gL(data,'countdown'); const A=_astro(); if(!C||!A) return;
  try{
    const now=new Date(); const dWord=(C.daysLeft||'{n}d');
    const dleft=(d)=>{ if(!d) return null; return Math.max(0,Math.ceil((d.getTime()-now.getTime())/86400000)); };
    const full=_nextPhaseDate(180,now), nw=_nextPhaseDate(0,now);
    const fL=dleft(full), nL=dleft(nw);
    const merc=_isRetro(A.Body?A.Body.Mercury:'Mercury', now);
    const chip=(emj,lbl,val)=>`<div style="flex:1;min-width:calc(33% - 6px);background:rgba(255,255,255,.7);border-radius:11px;padding:10px 6px;text-align:center;">
      <div style="font-size:20px;line-height:1;">${emj}</div>
      <div style="font-size:9px;color:#3730a3;font-weight:700;text-transform:uppercase;margin-top:3px;line-height:1.2;">${escHtml(lbl)}</div>
      <div style="font-size:14px;font-weight:900;color:#1e1b4b;margin-top:2px;">${escHtml(val)}</div></div>`;
    const dStr=(n)=>n===0?(C.todayWord||'Today'):dWord.replace('{n}',n);
    const mercVal=merc===true?(C.mercuryActiveLabel||'Retrograde'):(C.mercuryDirectLabel||'Direct');
    const CD_TITLE={ko:'천체 카운트다운',en:'Cosmic Countdown',ja:'天体カウントダウン',de:'Kosmischer Countdown',fr:'Compte à rebours cosmique',es:'Cuenta atrás cósmica',pt:'Contagem cósmica',it:'Conto alla rovescia cosmico',id:'Hitung Mundur Kosmik'};
    const cdTitle=C.title||CD_TITLE[data.lang]||CD_TITLE.en;
    const panel=document.createElement('div');
    panel.id='countdown-panel';
    panel.style.cssText='background:linear-gradient(135deg,#eef2ff,#e0e7ff);border-radius:16px;padding:14px 16px;margin:16px 0;';
    panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#3730a3;margin-bottom:9px;text-transform:uppercase;">⏳ ${escHtml(cdTitle)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${chip('🌕',C.fullMoonLabel||'Full Moon',fL!=null?dStr(fL):'—')}
        ${chip('🌑',C.newMoonLabel||'New Moon',nL!=null?dStr(nL):'—')}
        ${chip(merc?'☿️':'☿',C.mercuryRetroLabel||'Mercury',mercVal)}
      </div>`;
    _luxInsert(panel);
  }catch(e){}
}

// ── G5) 오늘의 행운 룰렛 (가챠식 데일리 리워드, 하루 1회) ────────
const _LS_SPIN='lucky_spin_v1';
function renderSpinPanel(data){
  const old=document.getElementById('spin-panel'); if(old) old.remove();
  const SP=_gL(data,'spin'); if(!SP) return;
  const today=_ymd(new Date());
  const seg=8; const r=mkRng((data.seed||1)+_luxDayNum()*104729)();
  const win=Math.floor(r*seg); // 결정론 당첨 칸(0~7)
  const num=1+Math.floor(mkRng((data.seed||1)+_luxDayNum()*15485863)()*99); // 1~99
  const colHex=(data.colorData&&data.colorData.hex)||'#f59e0b';
  const L=window.LUCKY_LANG||{}; const colName=(data.colorData)?((L.colorNames&&L.colorNames[data.colorData.en])||data.colorData.en):'';
  const COLW=['#f59e0b','#ef4444','#8b5cf6','#10b981','#0ea5e9','#ec4899','#f97316','#14b8a6'];
  let st=null; try{ st=JSON.parse(localStorage.getItem(_LS_SPIN)||'null'); }catch(e){}
  const doneToday=st&&st.d===today;
  const segDeg=360/seg; const targetDeg=360*4 + (360 - (win*segDeg + segDeg/2)); // 포인터(위)에 당첨칸 정렬
  const conic=COLW.map((c,i)=>`${c} ${i*segDeg}deg ${(i+1)*segDeg}deg`).join(',');
  const panel=document.createElement('div');
  panel.id='spin-panel';
  panel.style.cssText='background:linear-gradient(135deg,#1e1b4b,#4c1d95);border-radius:16px;padding:18px 16px;margin:16px 0;text-align:center;color:#fff;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#c4b5fd;margin-bottom:12px;text-transform:uppercase;">🎡 ${escHtml(SP.title)}</div>
    <div style="position:relative;width:184px;height:184px;margin:0 auto 6px;">
      <div style="position:absolute;top:-4px;left:50%;transform:translateX(-50%);font-size:22px;z-index:2;">🔻</div>
      <div id="spin-wheel" style="width:184px;height:184px;border-radius:50%;background:conic-gradient(${conic});border:5px solid #fbbf24;box-shadow:0 4px 18px rgba(0,0,0,.35);transition:transform 4s cubic-bezier(.17,.67,.16,1);transform:rotate(0deg);"></div>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;"><div style="width:34px;height:34px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div></div>
    </div>
    <div id="spin-result" style="min-height:54px;margin-top:8px;"></div>
    <button id="spin-btn" style="background:#fbbf24;color:#1e1b4b;border:none;font-weight:900;font-size:15px;padding:11px 30px;border-radius:50px;cursor:pointer;${doneToday?'opacity:.55;':''}">${escHtml(SP.button)}</button>`;
  _luxInsert(panel);
  const wheel=panel.querySelector('#spin-wheel'), btn=panel.querySelector('#spin-btn'), res=panel.querySelector('#spin-result');
  const showResult=()=>{ res.innerHTML=`<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
      <span style="background:rgba(255,255,255,.14);border-radius:10px;padding:7px 11px;font-size:13px;font-weight:800;">🔢 ${escHtml(SP.numberLabel)}: ${num}</span>
      <span style="background:rgba(255,255,255,.14);border-radius:10px;padding:7px 11px;font-size:13px;font-weight:800;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${colHex};margin-right:4px;"></span>${escHtml(colName||SP.colorLabel)}</span></div>`; };
  if(doneToday){ wheel.style.transition='none'; wheel.style.transform=`rotate(${(360 - (win*segDeg+segDeg/2))}deg)`; showResult(); btn.textContent=SP.doneToday||'✓'; btn.disabled=true; }
  btn.addEventListener('click',()=>{ if(btn.disabled) return; btn.disabled=true; btn.style.opacity='.55';
    wheel.style.transform=`rotate(${targetDeg}deg)`;
    setTimeout(()=>{ showResult(); btn.textContent=SP.doneToday||'✓'; try{localStorage.setItem(_LS_SPIN,JSON.stringify({d:today}));}catch(e){} },4100);
  });
}

// ── G3) Wordle식 이모지 결과 복사 (채팅 바이럴) ────────────────
function copyLuckyEmoji(btn){
  const data=window._lastLuckyData; if(!data) return;
  const W=_gL(data,'wordle')||{}; const sc=_dailyLuckScore(data);
  const bars=Math.round(sc/20); const bar='🟩'.repeat(bars)+'⬜'.repeat(5-bars);
  const n1=((_ld_lpn(data)-1)%9)+1;
  const txt=`${W.shareIntro||'🍀 Lucky'} ${_ymd(new Date())}\n${bar} ${sc}/100\n🎯 ${n1}\nall-lifes.com/lucky`;
  const done=()=>{ if(btn){ const o=btn.querySelector('span:last-child'); if(o){ const t=o.textContent; o.textContent=W.copiedMsg||'✓'; setTimeout(()=>o.textContent=t,1500);} } };
  if(navigator.clipboard){ navigator.clipboard.writeText(txt).then(done).catch(done); } else { done(); }
}
function _ld_lpn(data){ try{ return calcNumerology(data.year,data.month||1,data.day||1).lpn; }catch(e){ return 1; } }

// ── G7) PWA 설치 프롬프트 (A2HS 리텐션) ────────────────────────
let _deferredInstall=null;
function _initInstallPrompt(){
  if(window._installInited) return; window._installInited=true;
  window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); _deferredInstall=e; _maybeShowInstall(); });
}
function _maybeShowInstall(){
  if(!_deferredInstall) return;
  try{ if(localStorage.getItem('lucky_install_dismiss')==='1') return; }catch(e){}
  if(document.getElementById('pwa-install')) return;
  const lang=window.LUCKY_CURRENT_LANG||'ko'; const X=window.LUX&&(window.LUX[lang]||window.LUX.en);
  const I=(X&&X.growth&&X.growth.install)||{title:'Add to Home Screen',desc:'',button:'Install',later:'Later'};
  const bar=document.createElement('div');
  bar.id='pwa-install';
  bar.style.cssText='position:fixed;left:10px;right:10px;bottom:12px;max-width:460px;margin:0 auto;background:#1e1b4b;color:#fff;border-radius:14px;padding:13px 15px;box-shadow:0 6px 24px rgba(0,0,0,.3);z-index:9999;display:flex;align-items:center;gap:12px;';
  bar.innerHTML=`<div style="font-size:26px;">🎯</div><div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:800;">${escHtml(I.title)}</div><div style="font-size:11px;color:#c7d2fe;line-height:1.35;">${escHtml(I.desc||'')}</div></div>
    <button id="pwa-yes" style="background:#fbbf24;color:#1e1b4b;border:none;font-weight:800;font-size:13px;padding:8px 14px;border-radius:30px;cursor:pointer;white-space:nowrap;">${escHtml(I.button)}</button>
    <button id="pwa-no" style="background:none;border:none;color:#a5b4fc;font-size:18px;cursor:pointer;line-height:1;">×</button>`;
  document.body.appendChild(bar);
  bar.querySelector('#pwa-yes').addEventListener('click',async()=>{ bar.remove(); if(_deferredInstall){ _deferredInstall.prompt(); try{await _deferredInstall.userChoice;}catch(e){} _deferredInstall=null; } });
  bar.querySelector('#pwa-no').addEventListener('click',()=>{ bar.remove(); try{localStorage.setItem('lucky_install_dismiss','1');}catch(e){} });
}

// ── G1) 행운 아키타입 퀴즈 (BuzzFeed식) ───────────────────────
// 선택지→아키타입 인덱스(0~11) 고정 매핑. 아키타입 순서: 🔥불사조0 🗼등대1 ☄️혜성2 🌳거목3 🌊강물4 ☀️태양5 🧭나침반6 🔑열쇠7 🌟별8 ⛰️산9 🦋나비10 ⚓닻11
const _QUIZ_MAP=[[2,6,5,3],[0,11,8,4],[10,9,1,7],[5,3,4,8],[0,11,10,6],[2,9,1,7],[8,11,5,6],[2,3,4,0]];
const _QUIZ_EMJ=['🔥','🗼','☄️','🌳','🌊','☀️','🧭','🔑','🌟','⛰️','🦋','⚓'];
function startLuckQuiz(){
  const lang=window.LUCKY_CURRENT_LANG||'ko'; const X=window.LUX&&(window.LUX[lang]||window.LUX.en);
  const Q=X&&X.quiz; if(!Q||!Q.questions) return;
  let ov=document.getElementById('quiz-overlay'); if(ov) ov.remove();
  ov=document.createElement('div'); ov.id='quiz-overlay';
  ov.style.cssText='position:fixed;inset:0;background:linear-gradient(160deg,#1e1b4b,#4c1d95);z-index:10000;overflow-y:auto;padding:0;';
  document.body.appendChild(ov); document.body.style.overflow='hidden';
  const votes=new Array(12).fill(0); let qi=0;
  const close=()=>{ ov.remove(); document.body.style.overflow=''; };
  const head=(sub)=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px;"><div style="color:#c4b5fd;font-size:13px;font-weight:800;">🎯 ${escHtml(Q.title)}</div><button id="qx-close" style="background:none;border:none;color:#a5b4fc;font-size:26px;line-height:1;cursor:pointer;">×</button></div>${sub||''}`;
  function renderQ(){
    const q=Q.questions[qi]; const pct=Math.round((qi/Q.questions.length)*100);
    ov.innerHTML=head(`<div style="height:5px;background:rgba(255,255,255,.15);"><div style="height:100%;width:${pct}%;background:#fbbf24;transition:width .3s;"></div></div>`)+
      `<div style="max-width:520px;margin:0 auto;padding:24px 20px 40px;">
        <div style="color:#ddd6fe;font-size:12px;font-weight:700;margin-bottom:8px;">${qi+1} / ${Q.questions.length}</div>
        <h2 style="color:#fff;font-size:clamp(19px,5vw,26px);font-weight:900;line-height:1.35;margin-bottom:22px;">${escHtml(q.q)}</h2>
        <div style="display:flex;flex-direction:column;gap:11px;">
          ${q.opts.map((o,i)=>`<button class="qx-opt" data-i="${i}" style="text-align:left;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.18);color:#fff;font-size:15px;font-weight:600;padding:15px 17px;border-radius:13px;cursor:pointer;transition:all .15s;">${escHtml(o)}</button>`).join('')}
        </div></div>`;
    ov.querySelector('#qx-close').onclick=close;
    ov.querySelectorAll('.qx-opt').forEach(b=>{ b.onmouseenter=()=>{b.style.background='rgba(251,191,36,.25)';b.style.borderColor='#fbbf24';}; b.onmouseleave=()=>{b.style.background='rgba(255,255,255,.1)';b.style.borderColor='rgba(255,255,255,.18)';};
      b.onclick=()=>{ const i=+b.dataset.i; const arch=_QUIZ_MAP[qi][i]; if(arch!=null) votes[arch]+=1; qi++; if(qi<Q.questions.length) renderQ(); else renderResult(); }; });
  }
  function renderResult(){
    let best=0; for(let i=1;i<12;i++) if(votes[i]>votes[best]) best=i;
    const a=Q.archetypes[best]||Q.archetypes[0]; const emj=_QUIZ_EMJ[best];
    const shareTxt=`${a.shareLine||a.name}\n${(window.LUX[lang]&&window.LUX[lang].quiz.title)||''}\nall-lifes.com/lucky`;
    ov.innerHTML=head()+
      `<div style="max-width:520px;margin:0 auto;padding:6px 20px 50px;text-align:center;">
        <div style="font-size:13px;color:#c4b5fd;font-weight:700;margin-bottom:6px;">${escHtml(Q.resultPrefix||'')}</div>
        <div style="font-size:72px;line-height:1;margin:8px 0;">${emj}</div>
        <h1 style="color:#fff;font-size:clamp(26px,7vw,38px);font-weight:900;">${escHtml(a.name)}</h1>
        <div style="color:#fbbf24;font-size:15px;font-weight:800;margin:4px 0 16px;">${escHtml(a.tagline||'')}</div>
        <div style="background:rgba(255,255,255,.1);border-radius:14px;padding:17px 19px;color:#ede9fe;font-size:14.5px;line-height:1.75;text-align:left;">${escHtml(a.desc||'')}</div>
        <div style="display:flex;gap:10px;margin:14px 0;">
          <div style="flex:1;background:rgba(255,255,255,.08);border-radius:12px;padding:12px;"><div style="font-size:10px;color:#a5b4fc;font-weight:700;text-transform:uppercase;">🎨</div><div style="color:#fff;font-weight:800;font-size:14px;margin-top:3px;">${escHtml(a.luckyColor||'')}</div></div>
          <div style="flex:1;background:rgba(255,255,255,.08);border-radius:12px;padding:12px;"><div style="font-size:10px;color:#a5b4fc;font-weight:700;text-transform:uppercase;">💪</div><div style="color:#fff;font-weight:800;font-size:14px;margin-top:3px;">${escHtml(a.strength||'')}</div></div>
        </div>
        <button id="qx-share" style="width:100%;background:#fbbf24;color:#1e1b4b;border:none;font-weight:900;font-size:16px;padding:14px;border-radius:50px;cursor:pointer;margin-bottom:10px;">📤 ${escHtml(Q.shareLabel||'Share')}</button>
        <button id="qx-retake" style="width:100%;background:rgba(255,255,255,.12);color:#fff;border:none;font-weight:700;font-size:14px;padding:12px;border-radius:50px;cursor:pointer;">↻ ${escHtml(Q.retakeLabel||'Retake')}</button>
      </div>`;
    ov.querySelector('#qx-close').onclick=close;
    ov.querySelector('#qx-retake').onclick=()=>{ for(let i=0;i<12;i++)votes[i]=0; qi=0; renderQ(); };
    ov.querySelector('#qx-share').onclick=()=>{ if(navigator.share){ navigator.share({text:shareTxt}).catch(()=>{}); } else if(navigator.clipboard){ navigator.clipboard.writeText(shareTxt); const b=ov.querySelector('#qx-share'); const t=b.textContent; b.textContent='✓'; setTimeout(()=>b.textContent=t,1500); } };
  }
  renderQ();
}
function _maybeAutoQuiz(){ try{ if(new URLSearchParams(location.search).get('openquiz')==='1') setTimeout(startLuckQuiz,400); }catch(e){} }
function renderQuizLauncher(data){
  const old=document.getElementById('quiz-launcher'); if(old)old.remove();
  const X=_luxGet(data.lang); if(!X||!X.quiz) return; const Q=X.quiz;
  const panel=document.createElement('div'); panel.id='quiz-launcher';
  panel.style.cssText='background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:16px;padding:17px;margin:16px 0;text-align:center;color:#fff;cursor:pointer;';
  panel.innerHTML=`<div style="font-size:30px;line-height:1;">🎯</div><div style="font-size:16px;font-weight:900;margin:5px 0 3px;">${escHtml(Q.title)}</div><div style="font-size:12px;color:rgba(255,255,255,.85);margin-bottom:12px;line-height:1.4;">${escHtml(Q.intro)}</div><span style="display:inline-block;background:#fbbf24;color:#1e1b4b;font-weight:800;font-size:14px;padding:9px 26px;border-radius:50px;">${escHtml(Q.startLabel||'Start')} →</span>`;
  panel.onclick=startLuckQuiz;
  _luxInsert(panel);
}

// ── G2) 바이럴 궁합 초대링크 (데이팅식 k-factor) ───────────────
const _CMP_SLUG={ko:'gunghap',en:'compatibility',ja:'compatibility',de:'partnerschaft',fr:'compatibilite',es:'compatibilidad',pt:'compatibilidade',it:'compatibilita',id:'kecocokan'};
function _inviteUrl(data){ const y=data.year, m=('0'+(data.month||1)).slice(-2), d=('0'+(data.day||1)).slice(-2);
  const sl=_CMP_SLUG[data.lang]||'compatibility'; const base=data.lang==='ko'?`https://all-lifes.com/${sl}/`:`https://all-lifes.com/${data.lang}/${sl}/`;
  return `${base}?bd=${y}${m}${d}`; }
function shareInviteLink(){ const data=window._lastLuckyData; if(!data) return;
  const I=_gL(data,'invite')||{}; const url=_inviteUrl(data); const txt=(I.shareText||'{name}').replace('{name}','')+' '+url;
  if(navigator.share){ navigator.share({text:txt}).catch(()=>{}); } else if(navigator.clipboard){ navigator.clipboard.writeText(txt); const b=document.getElementById('invite-btn'); if(b){ const t=b.innerHTML; b.innerHTML='✓'; setTimeout(()=>b.innerHTML=t,1500);} } }
function renderInvitePanel(data){
  const old=document.getElementById('invite-panel'); if(old)old.remove();
  const I=_gL(data,'invite'); if(!I) return;
  const panel=document.createElement('div'); panel.id='invite-panel';
  panel.style.cssText='background:linear-gradient(135deg,#be185d,#db2777);border-radius:16px;padding:17px;margin:16px 0;text-align:center;color:#fff;';
  panel.innerHTML=`<div style="font-size:14px;font-weight:900;margin-bottom:3px;">${escHtml(I.title)}</div>
    <div style="font-size:12px;color:rgba(255,255,255,.88);margin-bottom:12px;line-height:1.45;">${escHtml(I.desc)}</div>
    <button id="invite-btn" style="background:#fff;color:#be185d;border:none;font-weight:800;font-size:14.5px;padding:11px 22px;border-radius:50px;cursor:pointer;">${escHtml(I.button)}</button>`;
  panel.querySelector('#invite-btn').onclick=shareInviteLink;
  _luxInsert(panel);
}

// ── G8) 럭키 네임 (이름 수비학 도구) ──────────────────────────
function renderNameToolPanel(data){
  const old=document.getElementById('nametool-panel'); if(old)old.remove();
  const N=_gL(data,'name'); const X=_luxGet(data.lang); if(!N||!X) return;
  const panel=document.createElement('div'); panel.id='nametool-panel';
  panel.style.cssText='background:linear-gradient(135deg,#fdf4ff,#fae8ff);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#a21caf;margin-bottom:4px;text-transform:uppercase;">🔤 ${escHtml(N.title)}</div>
    <div style="font-size:11px;color:#86198f;margin-bottom:11px;line-height:1.4;">${escHtml(N.intro)}</div>
    <div style="display:flex;gap:8px;"><input id="nt-input" type="text" placeholder="${escHtml(N.placeholder)}" style="flex:1;border:1.5px solid #e9d5ff;border-radius:10px;padding:10px 12px;font-size:14px;outline:none;" maxlength="40">
      <button id="nt-btn" style="background:#c026d3;color:#fff;border:none;font-weight:800;font-size:14px;padding:10px 18px;border-radius:10px;cursor:pointer;white-space:nowrap;">${escHtml(N.button)}</button></div>
    <div id="nt-result" style="margin-top:12px;"></div>`;
  _luxInsert(panel);
  const inp=panel.querySelector('#nt-input'), btn=panel.querySelector('#nt-btn'), res=panel.querySelector('#nt-result');
  const run=()=>{ const nm=(inp.value||'').trim(); if(!nm) return;
    let r; try{ r=(/[가-힣]/.test(nm)?calcHangulNumerology(nm):calcNameNumerology(nm)); }catch(e){ r=null; }
    const dn=r?r.destinyNum:1; const d1=((dn-1)%9)+1; const vibe=(X.luckyOne&&X.luckyOne.meanings&&X.luckyOne.meanings[d1-1])||'';
    res.innerHTML=`<div style="display:flex;gap:9px;align-items:center;background:#fff;border-radius:12px;padding:13px 15px;">
      <div style="font-size:34px;font-weight:900;color:#c026d3;line-height:1;">${dn}</div>
      <div style="flex:1;"><div style="font-size:10px;color:#a21caf;font-weight:700;text-transform:uppercase;">${escHtml(N.numberLabel)}</div>
        <div style="font-size:12.5px;color:#6b21a8;line-height:1.5;margin-top:2px;">${escHtml(vibe)}</div></div></div>`; };
  btn.onclick=run; inp.addEventListener('keydown',e=>{ if(e.key==='Enter') run(); });
}

// ── 단일 행운수 (1·2·3자리, 평생/오늘) — "그냥 내 행운수 하나만" ──
function renderLuckyOnePanel(data){
  const old=document.getElementById('luckyone-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.luckyOne||!X.luckyOne.meanings) return;
  const O=X.luckyOne;
  const nm=calcNumerology(data.year, data.month||1, data.day||1);
  const seed=nm.seed;
  const d1=((nm.lpn-1)%9)+1;                          // 평생 1자리 = 라이프패스 환원(1~9)
  const life2=Math.floor(mkRng(seed*7+13)()*100);     // 평생 2자리 0~99 (고정)
  const life3=Math.floor(mkRng(seed*13+101)()*1000);  // 평생 3자리 0~999 (고정)
  const t1=1+_luxPick(seed,3,9);                       // 오늘 1자리 1~9 (일변동)
  const t2=_luxPick(seed,7,100);                       // 오늘 2자리 0~99
  const t3=_luxPick(seed,13,1000);                     // 오늘 3자리 0~999
  const p2=n=>('0'+n).slice(-2), p3=n=>('00'+n).slice(-3);
  const mean=O.meanings[d1-1]||'';
  const big=(lbl,val)=>`<div style="flex:1;background:#fff;border-radius:13px;padding:13px 6px;text-align:center;box-shadow:0 2px 10px rgba(180,83,9,.13);">
    <div style="font-size:9.5px;color:#b45309;font-weight:700;text-transform:uppercase;letter-spacing:.02em;">${escHtml(lbl)}</div>
    <div style="font-size:33px;font-weight:900;color:#b45309;line-height:1.05;margin-top:3px;letter-spacing:-1px;">${escHtml(String(val))}</div></div>`;
  const sml=(lbl,val)=>`<div style="flex:1;background:rgba(255,255,255,.72);border-radius:11px;padding:9px 4px;text-align:center;">
    <div style="font-size:9px;color:#a16207;font-weight:700;text-transform:uppercase;">${escHtml(lbl)}</div>
    <div style="font-size:22px;font-weight:900;color:#a16207;margin-top:1px;">${escHtml(String(val))}</div></div>`;
  const panel=document.createElement('div');
  panel.id='luckyone-panel';
  panel.style.cssText='background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#b45309;margin-bottom:4px;text-transform:uppercase;">🎯 ${escHtml(O.title)}</div>
    <div style="font-size:11px;color:#92400e;margin-bottom:12px;line-height:1.45;">${escHtml(O.intro)}</div>
    <div style="font-size:10px;font-weight:800;color:#b45309;text-transform:uppercase;letter-spacing:.03em;margin-bottom:6px;">★ ${escHtml(O.lifetimeLabel)}</div>
    <div style="display:flex;gap:8px;margin-bottom:7px;">${big(O.d1Label,d1)}${big(O.d2Label,p2(life2))}${big(O.d3Label,p3(life3))}</div>
    <div style="background:rgba(180,83,9,.08);border-radius:9px;padding:8px 11px;font-size:11.5px;color:#92400e;line-height:1.5;margin-bottom:13px;"><b>${escHtml(O.d1Label)} ${d1}</b> · ${escHtml(mean)}</div>
    <div style="font-size:10px;font-weight:800;color:#a16207;text-transform:uppercase;letter-spacing:.03em;margin-bottom:6px;">📅 ${escHtml(O.todayLabel)}</div>
    <div style="display:flex;gap:8px;">${sml(O.d1Label,t1)}${sml(O.d2Label,p2(t2))}${sml(O.d3Label,p3(t3))}</div>
    <div style="background:rgba(217,119,6,.1);border-radius:10px;padding:9px 12px;font-size:11.5px;color:#92400e;line-height:1.5;margin-top:11px;">🍀 ${escHtml(O.tip)}</div>`;
  _luxInsert(panel);
}

function renderLuckyFourPanel(data){
  const old=document.getElementById('luckyfour-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.luckyFour) return;
  const F=X.luckyFour; const L=window.LUCKY_LANG||{};
  const colorHex=(data.colorData&&data.colorData.hex)||'#f59e0b';
  const colorName=(data.colorData)?((L.colorNames&&L.colorNames[data.colorData.en])||data.colorData.en):'—';
  const num=1+_luxPick(data.seed,11,9);
  const dirIdx=_luxPick(data.seed,5,8);
  const dir=F.directions[dirIdx]||F.directions[0];
  const hourStart=_luxPick(data.seed,19,12)*2;
  const pad=(n)=>(n<10?'0':'')+n;
  const timeWin=`${pad(hourStart)}:00–${pad((hourStart+2)%24)}:00`;
  const cell=(icon,lbl,val,extra)=>`<div style="flex:1;min-width:calc(50% - 5px);background:rgba(255,255,255,.65);border-radius:12px;padding:11px;text-align:center;">
    <div style="font-size:22px;line-height:1;margin-bottom:5px;">${icon}</div>
    <div style="font-size:10px;color:#0e7490;font-weight:700;text-transform:uppercase;letter-spacing:.03em;">${escHtml(lbl)}</div>
    <div style="font-size:15px;font-weight:900;color:#155e75;margin-top:2px;">${extra||''}${escHtml(String(val))}</div></div>`;
  const swatch=`<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${colorHex};vertical-align:middle;margin-right:5px;border:1px solid rgba(0,0,0,.1);"></span>`;
  const panel=document.createElement('div');
  panel.id='luckyfour-panel';
  panel.style.cssText='background:linear-gradient(135deg,#ecfeff,#cffafe);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#0e7490;margin-bottom:12px;text-transform:uppercase;">🧭 ${escHtml(F.title)}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      ${cell('🎨',F.colorLabel,colorName,swatch)}
      ${cell('🔢',F.numberLabel,num)}
      ${cell('🧭',F.directionLabel,dir)}
      ${cell('⏰',F.timeLabel,timeWin)}
    </div>
    <div style="background:rgba(14,116,144,.08);border-radius:10px;padding:9px 12px;font-size:12px;color:#155e75;line-height:1.5;margin-top:10px;">🍀 ${escHtml(F.tip)}</div>`;
  _luxInsert(panel);
}

// ── 6) 수비학 라이프패스 심층 + Personal Year/Month/Day (Wave3) ──────
function renderLifePathPanel(data){
  const old=document.getElementById('lifepath-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.numerology) return;
  const N=X.numerology; if(!N.lifePaths||!N.lifePaths.length) return;
  const L=N.labels||{}; const lbl=(k,fb)=>escHtml(L[k]||fb||'');
  const ds=(n)=>String(n).split('').reduce((a,c)=>a+(parseInt(c)||0),0);
  // 라이프패스(마스터넘버 보존) + 카르마 부채 감지
  let s=ds(data.year)+(data.month||1)+(data.day||1), karmicNum=null;
  while(s>9 && s!==11 && s!==22 && s!==33){ if(s===13||s===14||s===16||s===19) karmicNum=s; s=ds(s); }
  const lp=s;
  const prof=N.lifePaths.find(p=>p.num===lp); if(!prof) return;
  const isMaster=(lp===11||lp===22||lp===33);
  // Personal Year/Month/Day (오늘 날짜 기반 — 매일·매달 변경)
  const r9=(n)=>{ while(n>9) n=ds(n); return n; };
  const t=new Date();
  const PY=r9(r9(data.month||1)+r9(data.day||1)+r9(t.getFullYear()));
  const PM=r9(PY+r9(t.getMonth()+1));
  const PD=r9(PM+r9(t.getDate()));
  const cyc=(n)=>N.cycleThemes.find(c=>c.num===n)||{};
  const row=(ic,label,val)=>`<div style="display:flex;gap:8px;align-items:flex-start;font-size:11.5px;line-height:1.5;margin-bottom:6px;"><span style="flex-shrink:0;">${ic}</span><span><b style="color:#047857;">${escHtml(label)}</b> <span style="color:#065f46;">${escHtml(val)}</span></span></div>`;
  const cChip=(lab,n)=>{const c=cyc(n);return `<div style="flex:1;min-width:88px;background:rgba(255,255,255,.6);border-radius:10px;padding:9px 6px;text-align:center;"><div style="font-size:9px;color:#0f766e;font-weight:700;text-transform:uppercase;">${escHtml(lab)}</div><div style="font-size:20px;font-weight:900;color:#065f46;">${n}</div><div style="font-size:9.5px;color:#047857;line-height:1.25;margin-top:1px;">${escHtml(c.theme||'')}</div></div>`;};
  const panel=document.createElement('div');
  panel.id='lifepath-panel';
  panel.style.cssText='background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#047857;margin-bottom:12px;text-transform:uppercase;">🔢 ${lbl('lifePathTitle','Life Path')}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
      <div style="width:58px;height:58px;flex-shrink:0;border-radius:50%;background:linear-gradient(135deg,#10b981,#047857);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#fff;box-shadow:0 4px 12px rgba(4,120,87,.3);">${lp}</div>
      <div style="flex:1;">
        <div style="font-size:18px;font-weight:900;color:#065f46;">${escHtml(prof.archetype)}</div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:4px;">
          ${isMaster?`<span style="background:#fef3c7;color:#92400e;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">⭐ ${lbl('masterLabel','Master')} ${lp}</span>`:''}
          ${karmicNum?`<span style="background:#fee2e2;color:#991b1b;font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;">⚠️ ${lbl('karmicLabel','Karmic')} ${karmicNum}</span>`:''}
        </div>
      </div></div>
    <div style="background:rgba(4,120,87,.08);border-radius:10px;padding:10px 12px;font-size:12.5px;color:#065f46;line-height:1.6;margin-bottom:11px;">${escHtml(prof.essence)}</div>
    ${row('💪',lbl('strengthLabel','Strength'),prof.strength)}
    ${row('🌑',lbl('shadowLabel','Shadow'),prof.shadow)}
    ${row('💕',lbl('loveLabel','Love'),prof.love)}
    ${row('💼',lbl('careerLabel','Career'),prof.career)}
    ${row('🎯',lbl('lessonLabel','Lesson'),prof.lesson)}
    ${isMaster&&N.masterNote?`<div style="font-size:11px;color:#047857;line-height:1.5;margin:8px 0;">⭐ ${escHtml(N.masterNote)}</div>`:''}
    ${karmicNum&&N.karmic&&N.karmic[String(karmicNum)]?`<div style="font-size:11px;color:#b45309;line-height:1.5;margin:6px 0;">⚠️ ${escHtml(N.karmic[String(karmicNum)])}</div>`:''}
    <div style="border-top:1px solid rgba(4,120,87,.15);padding-top:11px;margin-top:11px;">
      <div style="font-size:10.5px;color:#0f766e;font-weight:700;text-transform:uppercase;margin-bottom:8px;">🔄 ${lbl('cycleTitle','Personal Cycles')}</div>
      <div style="display:flex;gap:8px;">
        ${cChip(lbl('yearLabel','Year'),PY)}${cChip(lbl('monthLabel','Month'),PM)}${cChip(lbl('dayLabel','Day'),PD)}
      </div>
      ${cyc(PD).guidance?`<div style="font-size:11.5px;color:#065f46;line-height:1.5;margin-top:9px;">✨ ${escHtml(cyc(PD).guidance)}</div>`:''}
    </div>`;
  _luxInsert(panel);
}

// ── 7) 꿈해몽 (Wave5) — 보편 꿈 상징 24, 탭하면 의미 ──────────
const _DREAM_EMJ = ['🐷','🐍','💧','🦷','🔥','💩','💰','🐉','👶','✈️','🏃','🌊','🐅','🦅','🌸','💍','🚗','🏠','🩸','👻','🌈','⭐','🐟','⚰️'];
function _dreamReveal(i, lang){
  try{ const X=window.LUX&&(window.LUX[lang]||window.LUX.en); const s=X&&X.dream&&X.dream.symbols[i]; if(!s) return;
    const d=document.getElementById('dream-detail'); if(d) d.innerHTML='<b>'+_DREAM_EMJ[i]+' '+escHtml(s.name)+'</b> — '+escHtml(s.meaning);
    document.querySelectorAll('[id^=dream-c]').forEach(b=>{b.style.background='rgba(255,255,255,.7)';});
    const b=document.getElementById('dream-c'+i); if(b) b.style.background='#ddd6fe';
  }catch(e){}
}
function renderDreamPanel(data){
  const old=document.getElementById('dream-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.dream||!X.dream.symbols||!X.dream.symbols.length) return;
  const D=X.dream;
  const chips=D.symbols.map((s,i)=>`<button onclick="_dreamReveal(${i},'${data.lang}')" id="dream-c${i}" style="background:rgba(255,255,255,.7);border:1px solid #e9d5ff;border-radius:10px;padding:7px 3px;cursor:pointer;text-align:center;">
    <div style="font-size:19px;line-height:1.1;">${_DREAM_EMJ[i]}</div>
    <div style="font-size:9px;color:#6b21a8;font-weight:600;line-height:1.1;margin-top:2px;">${escHtml(s.name)}</div></button>`).join('');
  const panel=document.createElement('div');
  panel.id='dream-panel';
  panel.style.cssText='background:linear-gradient(135deg,#faf5ff,#ede9fe);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#7c3aed;margin-bottom:6px;text-transform:uppercase;">🌙 ${escHtml(D.title)}</div>
    <div style="font-size:11px;color:#7c3aed;margin-bottom:11px;line-height:1.4;">${escHtml(D.intro)}</div>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-bottom:11px;">${chips}</div>
    <div id="dream-detail" style="background:rgba(124,58,237,.08);border-radius:10px;padding:11px 13px;font-size:12px;color:#5b21b6;line-height:1.55;"><b>${_DREAM_EMJ[0]} ${escHtml(D.symbols[0].name)}</b> — ${escHtml(D.symbols[0].meaning)}</div>`;
  _luxInsert(panel);
}

// ── 8) 엔젤넘버 (Wave5) — 오늘의 엔젤넘버(결정론) + 참조 12 ──────
const _ANGEL_NUMS = [111,222,333,444,555,666,777,888,999,1010,1111,1212];
function _angelReveal(i, lang){
  try{ const X=window.LUX&&(window.LUX[lang]||window.LUX.en); const n=X&&X.angel&&X.angel.numbers[i]; if(!n) return;
    const d=document.getElementById('angel-detail'); if(d) d.innerHTML='<b>'+_ANGEL_NUMS[i]+' · '+escHtml(n.keyword)+'</b> — '+escHtml(n.meaning);
    document.querySelectorAll('[id^=angel-c]').forEach(b=>{b.style.background='rgba(255,255,255,.7)';});
    const b=document.getElementById('angel-c'+i); if(b) b.style.background='#fde68a';
  }catch(e){}
}
function renderAngelPanel(data){
  const old=document.getElementById('angel-panel'); if(old) old.remove();
  const X=_luxGet(data.lang); if(!X||!X.angel||!X.angel.numbers||!X.angel.numbers.length) return;
  const A=X.angel; const ti=_luxPick(data.seed,53,12); const today=A.numbers[ti]||A.numbers[0];
  const refs=A.numbers.map((n,i)=>`<button onclick="_angelReveal(${i},'${data.lang}')" id="angel-c${i}" style="background:${i===ti?'#fde68a':'rgba(255,255,255,.7)'};border:1px solid #fcd34d;border-radius:8px;padding:5px 2px;cursor:pointer;font-size:11px;font-weight:800;color:#92400e;">${_ANGEL_NUMS[i]}</button>`).join('');
  const panel=document.createElement('div');
  panel.id='angel-panel';
  panel.style.cssText='background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#b45309;margin-bottom:6px;text-transform:uppercase;">😇 ${escHtml(A.title)}</div>
    <div style="font-size:11px;color:#b45309;margin-bottom:11px;line-height:1.4;">${escHtml(A.intro)}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:11px;">
      <div style="font-size:32px;font-weight:900;color:#d97706;flex-shrink:0;">${_ANGEL_NUMS[ti]}</div>
      <div style="flex:1;"><div style="font-size:10px;color:#b45309;font-weight:700;text-transform:uppercase;">${escHtml(A.todayLabel)} · ${escHtml(today.keyword)}</div>
        <div id="angel-detail" style="font-size:12px;color:#78350f;line-height:1.55;margin-top:3px;">${escHtml(today.meaning)}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:5px;">${refs}</div>`;
  _luxInsert(panel);
}

// ══════════════════════════════════════════════════════════
// 트렌드 Wave1: 코스믹 웨더 (역행·일렉셔널 길일·달위상 의식)
// astronomy-engine 으로 오늘 날짜 기반 100% 결정론 (출생정보 불필요 → 전 사용자 공통).
// 콘텐츠: window.LUX[lang].retro/electional/moonRitual
// ══════════════════════════════════════════════════════════
function _astro(){ return (typeof window!=='undefined' && window.Astronomy) ? window.Astronomy : null; }
function _eclLon(body, date){
  const A=_astro(); if(!A) return null;
  try{
    if(body==='Sun') return ((A.SunPosition(date).elon%360)+360)%360;
    const v = (body==='Moon') ? A.GeoMoon(date) : A.GeoVector(body, date, true);
    return ((A.Ecliptic(v).elon%360)+360)%360;
  }catch(e){ return null; }
}
function _isRetro(body, date){
  const l1=_eclLon(body,date), l2=_eclLon(body,new Date(date.getTime()+86400000));
  if(l1==null||l2==null) return null;
  let d=l2-l1; if(d>180)d-=360; if(d<-180)d+=360;
  return d<0;
}
function _nextStation(body, from, retroNow){
  for(let i=2;i<=240;i+=2){ const dt=new Date(from.getTime()+i*86400000); const r=_isRetro(body,dt); if(r!=null && r!==retroNow) return dt; }
  return null;
}
function _moonPhase(date){ const A=_astro(); if(!A) return null; try{ const ang=A.MoonPhase(date); return {ang, idx:Math.floor(((ang+22.5)%360)/45)%8}; }catch(e){ return null; } }
function _nextPhaseDate(targetAng, date){ const A=_astro(); if(!A) return null; try{ const t=A.SearchMoonPhase(targetAng, date, 45); return t?(t.date||t.tt&&t):null; }catch(e){ return null; } }
function _moonSignNow(date){ const l=_eclLon('Moon',date); return l==null?null:Math.floor(l/30); }
function _isMoonVOC(date){
  const A=_astro(); if(!A) return false;
  try{
    const bodies=['Sun','Mercury','Venus','Mars','Jupiter','Saturn'].map(n=>n==='Sun'?'Sun':A.Body[n]);
    const asp=[0,60,90,120,180];
    const ml0=_eclLon('Moon',date); if(ml0==null) return false;
    const sign=Math.floor(ml0/30); let prev=null;
    for(let s=0;s<=14;s++){
      const dt=new Date(date.getTime()+s*0.2*86400000);
      const ml=_eclLon('Moon',dt); if(ml==null) break;
      if(s>0 && Math.floor(ml/30)!==sign) break;
      const diffs=bodies.map(b=>{const pl=_eclLon(b,dt); if(pl==null)return null; const sep=((ml-pl)%360+360)%360; return asp.map(a=>{let x=sep-a; if(x>180)x-=360; if(x<-180)x+=360; return x;});});
      if(prev){ for(let bi=0;bi<bodies.length;bi++){ if(!diffs[bi]||!prev[bi])continue; for(let ai=0;ai<asp.length;ai++){ if(prev[bi][ai]*diffs[bi][ai]<0 && Math.abs(prev[bi][ai])<8 && Math.abs(diffs[bi][ai])<8) return false; } } }
      prev=diffs;
    }
    return true;
  }catch(e){ return false; }
}
const _MOON_EMJ=['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘'];
const _PLANET_SYM=['☿','♀','♂','♃','♄'];

// ── T1) 행성 역행 트래커 ──────────────────────────────────
function renderRetroPanel(data){
  const old=document.getElementById('retro-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.retro||!X.retro.planets) return;
  const R=X.retro; const now=new Date();
  let bodies; try{ bodies=['Mercury','Venus','Mars','Jupiter','Saturn'].map(n=>A.Body[n]); }catch(e){ return; }
  const rows=R.planets.map((p,i)=>{
    const retro=_isRetro(bodies[i], now); const active=retro===true;
    let cd='';
    if(active){ const st=_nextStation(bodies[i],now,true); if(st){ const days=Math.max(0,Math.ceil((st-now)/86400000)); cd=' · '+escHtml(R.stationLabel)+' D-'+days; } }
    return `<div style="background:rgba(255,255,255,.05);border-radius:10px;padding:9px 11px;margin-bottom:6px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span style="font-size:12.5px;font-weight:700;color:#e2e8f0;">${_PLANET_SYM[i]} ${escHtml(p.name)} <span style="font-size:10px;color:#94a3b8;font-weight:500;">${escHtml(p.theme)}</span></span>
        <span style="font-size:10.5px;font-weight:800;color:${active?'#f87171':'#34d399'};white-space:nowrap;">${active?escHtml(R.statusActive):escHtml(R.statusDirect)}${cd}</span></div>
      ${active?`<div style="font-size:11px;color:#cbd5e1;line-height:1.5;margin-top:5px;">⚠️ ${escHtml(p.retroTip)}</div>`:''}
    </div>`;
  }).join('');
  const panel=document.createElement('div');
  panel.id='retro-panel';
  panel.style.cssText='background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:16px;padding:16px;margin:16px 0;color:#e2e8f0;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#7dd3fc;margin-bottom:6px;text-transform:uppercase;">🪐 ${escHtml(R.title)}</div>
    <div style="font-size:11px;color:#94a3b8;margin-bottom:11px;line-height:1.4;">${escHtml(R.intro)}</div>${rows}`;
  _luxInsert(panel);
}

// ── T2) 일렉셔널 길일 — 행동별 추천 ───────────────────────
const _ELECT=[ {el:['earth'],ph:1,merc:1,voc:1}, {el:['water','air'],ph:1,merc:0,voc:1}, {el:['earth'],ph:0,merc:0,voc:1}, {el:['earth','water'],ph:-1,merc:0,voc:0}, {el:['fire'],ph:1,merc:1,voc:1}, {el:['air','fire'],ph:0,merc:1,voc:0}, {el:['air'],ph:0,merc:1,voc:1}, {el:['earth'],ph:1,merc:1,voc:1} ];
const _ELECT_EMJ=['📝','💕','🏠','🩺','💼','✈️','💬','💰'];
function renderElectionalPanel(data){
  const old=document.getElementById('electional-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.electional||!X.electional.activities) return;
  const E=X.electional; const now=new Date();
  const msi=_moonSignNow(now); if(msi==null) return;
  const moonElem=_SIGN_ELEM[msi]; const mp=_moonPhase(now); const waxing=mp?mp.ang<180:true;
  const mercRetro=_isRetro(A.Body.Mercury, now)===true; const voc=_isMoonVOC(now);
  const moonSignName=(X.sunSign&&X.sunSign.signs&&X.sunSign.signs[msi])?X.sunSign.signs[msi].name:'';
  const score=(i)=>{ const a=_ELECT[i]; let s=58;
    if(a.el.indexOf(moonElem)>=0) s+=16;
    if(a.ph===1) s+= waxing?8:-6; else if(a.ph===-1) s+= waxing?-6:8;
    if(a.merc&&mercRetro) s-=14; if(a.voc&&voc) s-=12;
    s += (Math.floor(mkRng((i+1)+_luxDayNum()*(i+2))()*9)-4);
    return Math.max(28,Math.min(96,s)); };
  const vlabel=(s)=> s>=75?{t:E.verdict.great,c:'#15803d',b:'#dcfce7'} : s>=55?{t:E.verdict.good,c:'#b45309',b:'#fef3c7'} : {t:E.verdict.caution,c:'#b91c1c',b:'#fee2e2'};
  const rows=E.activities.map((act,i)=>{ const s=score(i); const v=vlabel(s); const good=s>=55;
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid #f0fdf4;">
      <span style="font-size:12px;color:#14532d;font-weight:600;">${_ELECT_EMJ[i]} ${escHtml(act.name)}</span>
      <span style="font-size:11px;font-weight:800;color:${v.c};background:${v.b};padding:2px 9px;border-radius:20px;white-space:nowrap;">${escHtml(v.t)}</span></div>`;
  }).join('');
  const panel=document.createElement('div');
  panel.id='electional-panel';
  panel.style.cssText='background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#15803d;margin-bottom:6px;text-transform:uppercase;">📅 ${escHtml(E.title)}</div>
    <div style="font-size:11px;color:#15803d;margin-bottom:9px;line-height:1.4;">${escHtml(E.intro)}</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:9px;">
      <span style="font-size:11px;background:rgba(21,128,61,.1);color:#14532d;padding:3px 10px;border-radius:20px;">🌙 ${escHtml(E.moonLabel)}: ${_MOON_EMJ[mp?mp.idx:0]} ${escHtml(moonSignName)}</span>
      ${voc?`<span style="font-size:11px;background:#fee2e2;color:#b91c1c;padding:3px 10px;border-radius:20px;">⚠️ ${escHtml(E.vocLabel)}</span>`:''}
    </div>
    ${voc?`<div style="font-size:11px;color:#b91c1c;line-height:1.5;margin-bottom:8px;">${escHtml(E.vocTip)}</div>`:''}
    ${rows}`;
  _luxInsert(panel);
}

// ── T3) 달위상 매니페스테이션 의식 ────────────────────────
function _moonIntentKey(){ return 'moon_intent_v1'; }
function _saveMoonIntent(){ try{ const t=document.getElementById('moon-intent'); if(t) localStorage.setItem(_moonIntentKey(), JSON.stringify({t:Date.now(), v:t.value.slice(0,500)})); const b=document.getElementById('moon-intent-saved'); if(b){ b.style.display='inline'; setTimeout(()=>{b.style.display='none';},2000);} }catch(e){} }
function renderMoonRitualPanel(data){
  const old=document.getElementById('moonritual-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.moonRitual||!X.moonRitual.phases) return;
  const M=X.moonRitual; const now=new Date(); const mp=_moonPhase(now); if(!mp) return;
  const ph=M.phases[mp.idx]||M.phases[0];
  const nextNew=_nextPhaseDate(0,now), nextFull=_nextPhaseDate(180,now);
  const fmtD=(d)=>{ try{ return new Intl.DateTimeFormat(data.lang,{month:'short',day:'numeric'}).format(d); }catch(e){ return ''; } };
  let saved=''; try{ const s=JSON.parse(localStorage.getItem(_moonIntentKey())||'null'); if(s&&s.v) saved=s.v; }catch(e){}
  const panel=document.createElement('div');
  panel.id='moonritual-panel';
  panel.style.cssText='background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:16px;padding:16px;margin:16px 0;color:#e0e7ff;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#c4b5fd;margin-bottom:10px;text-transform:uppercase;">🌙 ${escHtml(M.title)}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:11px;">
      <div style="font-size:44px;line-height:1;">${_MOON_EMJ[mp.idx]}</div>
      <div style="flex:1;"><div style="font-size:17px;font-weight:900;color:#fff;">${escHtml(ph.name)}</div>
        ${(nextNew||nextFull)?`<div style="font-size:10px;color:#a5b4fc;margin-top:3px;">${nextNew?'🌑 '+fmtD(nextNew):''}${nextNew&&nextFull?' · ':''}${nextFull?'🌕 '+fmtD(nextFull):''}</div>`:''}
      </div></div>
    <div style="background:rgba(255,255,255,.08);border-radius:10px;padding:10px 12px;font-size:12px;color:#e0e7ff;line-height:1.55;margin-bottom:9px;"><b style="color:#c4b5fd;">${escHtml(M.ritualLabel)}</b> · ${escHtml(ph.ritual)}</div>
    <div style="font-size:11.5px;color:#c7d2fe;line-height:1.5;margin-bottom:9px;">💭 <b>${escHtml(M.journalLabel)}</b> ${escHtml(ph.journal)}</div>
    <textarea id="moon-intent" rows="2" placeholder="..." style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.07);border:1px solid rgba(196,181,253,.3);border-radius:8px;color:#e0e7ff;font-size:12px;padding:8px;resize:vertical;">${escHtml(saved)}</textarea>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px;">
      <span style="font-size:10px;color:#a5b4fc;">🔢 ${escHtml(M.label369)} · ${escHtml(M.tip369)}</span>
      <button onclick="_saveMoonIntent()" style="background:rgba(196,181,253,.2);color:#ddd6fe;border:1px solid rgba(196,181,253,.4);border-radius:8px;padding:5px 12px;font-size:11px;font-weight:700;cursor:pointer;">💾 <span id="moon-intent-saved" style="display:none;">✓</span></button>
    </div>`;
  _luxInsert(panel);
}

// ── T4) 오늘의 코스믹 웨더 — 개인 트랜짓 (Trend Wave2) ───────
// 생일 행성 × 오늘 행성의 어스펙트(합/육각/사각/삼각/대립)로 개인화 데일리.
function _planetLonsAt(date){
  const A=_astro(); if(!A) return null;
  const defs=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
  return defs.map(b=>_eclLon(b==='Sun'?'Sun':(b==='Moon'?'Moon':A.Body[b]), date));
}
function renderTransitPanel(data){
  const old=document.getElementById('transit-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.transits||!X.transits.planets) return;
  const TR=X.transits;
  const bh=(data.birthHour!=null)?data.birthHour:12;
  let natalDate; try{ natalDate=new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,bh,data.birthMinute||0)); }catch(e){ return; }
  const natal=_planetLonsAt(natalDate), today=_planetLonsAt(new Date());
  if(!natal||!today) return;
  const ASP=[{a:0,k:'conjunction',tone:'intense',sym:'☌'},{a:60,k:'sextile',tone:'harmonious',sym:'⚹'},{a:90,k:'square',tone:'challenging',sym:'□'},{a:120,k:'trine',tone:'harmonious',sym:'△'},{a:180,k:'opposition',tone:'challenging',sym:'☍'}];
  const orb=6, hits=[];
  for(let t=0;t<7;t++){ for(let n=0;n<7;n++){
    if(today[t]==null||natal[n]==null) continue;
    let sep=Math.abs(today[t]-natal[n])%360; if(sep>180)sep=360-sep;
    for(const asp of ASP){ const d=Math.abs(sep-asp.a); if(d<=orb) hits.push({t,n,asp,orb:d}); }
  }}
  hits.sort((a,b)=>a.orb-b.orb);
  const seen={}, top=[];
  for(const h of hits){ if(seen[h.t])continue; seen[h.t]=1; top.push(h); if(top.length>=3)break; }
  const SYM=['☉','☽','☿','♀','♂','♃','♄'];
  let body;
  if(top.length){
    body=top.map(h=>{ const tp=TR.planets[h.t], np=TR.planets[h.n]; const reading=tp[h.asp.tone]||'';
      const tc=h.asp.tone==='harmonious'?'#22c55e':h.asp.tone==='challenging'?'#fbbf24':'#c4b5fd';
      return `<div style="background:rgba(255,255,255,.06);border-radius:10px;padding:10px 12px;margin-bottom:7px;">
        <div style="display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800;color:#fff;margin-bottom:5px;flex-wrap:wrap;">${SYM[h.t]} ${escHtml(tp.name)} <span style="color:#a5b4fc;">${h.asp.sym}</span> ${SYM[h.n]} ${escHtml(np.name)}</div>
        <div style="font-size:11.5px;color:#e0e7ff;line-height:1.55;">${escHtml(reading)}</div>
        <div style="margin-top:5px;"><span style="font-size:9.5px;background:${tc}26;color:${tc};padding:2px 9px;border-radius:10px;">${escHtml(TR.aspectLabels[h.asp.k]||'')} · ${escHtml(TR.toneLabels[h.asp.tone]||'')} · ${escHtml(np.natalArea)}</span></div>
      </div>`; }).join('');
  } else body=`<div style="font-size:12px;color:#cbd5e1;line-height:1.55;">${escHtml(TR.noAspect)}</div>`;
  const panel=document.createElement('div');
  panel.id='transit-panel';
  panel.style.cssText='background:linear-gradient(135deg,#312e81,#4338ca);border-radius:16px;padding:16px;margin:16px 0;color:#e0e7ff;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#c7d2fe;margin-bottom:6px;text-transform:uppercase;">✨ ${escHtml(TR.title)}</div>
    <div style="font-size:11px;color:#a5b4fc;margin-bottom:11px;line-height:1.4;">${escHtml(TR.intro)}</div>${body}`;
  _luxInsert(panel);
}

// ── 도시 위경도 테이블 + 어센던트(상승궁) 계산 (Trend Wave4) ──
// [도시명(영문), 위도, 경도(동+), 표준 UTC오프셋(DST 무시)]
const _CITIES=[
['Seoul',37.57,126.98,9],['Busan',35.18,129.08,9],['Incheon',37.46,126.71,9],['Daegu',35.87,128.60,9],
['Tokyo',35.68,139.69,9],['Osaka',34.69,135.50,9],['Nagoya',35.18,136.91,9],['Fukuoka',33.59,130.40,9],['Sapporo',43.06,141.35,9],
['Beijing',39.90,116.41,8],['Shanghai',31.23,121.47,8],['Hong Kong',22.32,114.17,8],['Taipei',25.03,121.57,8],
['Jakarta',-6.21,106.85,7],['Surabaya',-7.25,112.75,7],['Bandung',-6.92,107.61,7],['Medan',3.59,98.67,7],['Denpasar (Bali)',-8.65,115.22,8],['Makassar',-5.15,119.43,8],
['Bangkok',13.76,100.50,7],['Singapore',1.35,103.82,8],['Kuala Lumpur',3.14,101.69,8],['Manila',14.60,120.98,8],['Ho Chi Minh City',10.82,106.63,7],['Hanoi',21.03,105.85,7],
['Mumbai',19.08,72.88,5.5],['Delhi',28.61,77.21,5.5],
['New York',40.71,-74.01,-5],['Los Angeles',34.05,-118.24,-8],['Chicago',41.88,-87.63,-6],['Houston',29.76,-95.37,-6],['Miami',25.76,-80.19,-5],['San Francisco',37.77,-122.42,-8],['Seattle',47.61,-122.33,-8],['Washington DC',38.91,-77.04,-5],['Atlanta',33.75,-84.39,-5],
['Toronto',43.65,-79.38,-5],['Vancouver',49.28,-123.12,-8],
['London',51.51,-0.13,0],['Manchester',53.48,-2.24,0],['Dublin',53.35,-6.26,0],
['Berlin',52.52,13.40,1],['Munich',48.14,11.58,1],['Hamburg',53.55,9.99,1],['Frankfurt',50.11,8.68,1],['Cologne',50.94,6.96,1],['Vienna',48.21,16.37,1],['Zurich',47.37,8.54,1],
['Paris',48.86,2.35,1],['Marseille',43.30,5.37,1],['Lyon',45.76,4.84,1],
['Madrid',40.42,-3.70,1],['Barcelona',41.39,2.17,1],['Valencia',39.47,-0.38,1],['Seville',37.39,-5.99,1],
['Rome',41.90,12.50,1],['Milan',45.46,9.19,1],['Naples',40.85,14.27,1],
['Lisbon',38.72,-9.14,0],['Porto',41.16,-8.63,0],
['Sao Paulo',-23.55,-46.63,-3],['Rio de Janeiro',-22.91,-43.17,-3],['Brasilia',-15.79,-47.88,-3],['Belo Horizonte',-19.92,-43.94,-3],['Salvador',-12.97,-38.50,-3],['Porto Alegre',-30.03,-51.23,-3],['Recife',-8.05,-34.88,-3],
['Mexico City',19.43,-99.13,-6],['Buenos Aires',-34.60,-58.38,-3],['Bogota',4.71,-74.07,-5],['Lima',-12.05,-77.04,-5],['Santiago',-33.45,-70.67,-3],
['Sydney',-33.87,151.21,10],['Melbourne',-37.81,144.96,10],['Auckland',-36.85,174.76,12],
['Moscow',55.76,37.62,3],['Istanbul',41.01,28.98,3],['Dubai',25.20,55.27,4],['Cairo',30.04,31.24,2],['Johannesburg',-26.20,28.05,2],
['Amsterdam',52.37,4.90,1],['Brussels',50.85,4.35,1],['Stockholm',59.33,18.07,1],['Warsaw',52.23,21.01,1]
];
function _ascendant(utcDate, lat, lon){
  const A=_astro(); if(!A||!A.SiderealTime) return null;
  try{
    const gast=A.SiderealTime(utcDate);            // Greenwich apparent sidereal time (hours)
    let lst=((gast + lon/15)%24+24)%24;            // local sidereal time (hours)
    const RAMC=lst*15, eps=23.4367, r=Math.PI/180; // RA of MC (deg), obliquity
    let asc=Math.atan2(Math.cos(RAMC*r), -(Math.sin(RAMC*r)*Math.cos(eps*r)+Math.tan(lat*r)*Math.sin(eps*r)))/r;
    return ((asc%360)+360)%360;
  }catch(e){ return null; }
}
function _currentRising(data){
  if(data.birthHour==null) return null;
  const sel=(typeof document!=='undefined')?document.getElementById('birth-city'):null;
  if(!sel||sel.value==='') return null;
  const c=_CITIES[+sel.value]; if(!c) return null;
  const utc=new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,0,Math.round((data.birthHour-c[3])*60+(data.birthMinute||0))));
  const asc=_ascendant(utc, c[1], c[2]); if(asc==null) return null;
  return Math.floor(asc/30); // 0=양자리..11=물고기
}

// ── T7) 블랙문 릴리스 (달 평균 원지점) (Trend Wave5) ──────────
function _lilithSign(data){
  try{
    const h=(data.birthHour!=null)?data.birthHour:12;
    const jd=gregJD(data.year,(data.month||1),(data.day||1)) + (h-12)/24;
    const T=(jd-2451545)/36525;
    const peri=83.3532465 + 4069.0137287*T - 0.0103200*T*T - T*T*T/80053 + T*T*T*T/18999000;
    const lil=((peri+180)%360+360)%360;
    return Math.floor(lil/30); // 0=양자리..11=물고기
  }catch(e){ return null; }
}
function renderLilithPanel(data){
  const old=document.getElementById('lilith-panel'); if(old)old.remove();
  const X=_luxGet(data.lang); if(!X||!X.lilith||!X.lilith.signs) return;
  const LI=X.lilith; const li=_lilithSign(data); if(li==null) return;
  const signs=(X.sunSign&&X.sunSign.signs)?X.sunSign.signs:null;
  const name=signs?signs[li].name:'';
  const panel=document.createElement('div');
  panel.id='lilith-panel';
  panel.style.cssText='background:linear-gradient(135deg,#18181b,#3b0764);border-radius:16px;padding:16px;margin:16px 0;color:#e9d5ff;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#d8b4fe;margin-bottom:6px;text-transform:uppercase;">🌑 ${escHtml(LI.title)}</div>
    <div style="font-size:11px;color:#c4b5fd;margin-bottom:11px;line-height:1.4;">${escHtml(LI.intro)}</div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
      <div style="font-size:34px;line-height:1;">⚸</div>
      <div><div style="font-size:10px;color:#a78bfa;font-weight:700;text-transform:uppercase;">${escHtml(LI.label)}</div>
        <div style="font-size:17px;font-weight:900;color:#f3e8ff;margin-top:1px;">${_SIGN_EMJ[li]} ${escHtml(name)}</div></div></div>
    <div style="background:rgba(255,255,255,.07);border-radius:10px;padding:11px 13px;font-size:12px;color:#e9d5ff;line-height:1.6;">${escHtml(LI.signs[li])}</div>`;
  _luxInsert(panel);
}

// ── T8) 아스트로카토그래피 라이트 (행운의 도시) (Trend Wave5) ──
function _astroCarto(data){
  const A=_astro(); if(!A||!A.SiderealTime||typeof _CITIES==='undefined') return null;
  try{
    const h=(data.birthHour!=null)?data.birthHour:12;
    const sel=(typeof document!=='undefined')?document.getElementById('birth-city'):null;
    const bc=(sel && sel.value!=='' && _CITIES[+sel.value])?_CITIES[+sel.value]:null;
    const utc = bc ? new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,0,Math.round((h-bc[3])*60+(data.birthMinute||0))))
                   : new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,12,0));
    const gastDeg=((A.SiderealTime(utc)*15)%360+360)%360;
    const eps=23.4367, r=Math.PI/180, bodies=['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn'];
    const mcLon=bodies.map(b=>{ const lon=_eclLon(b==='Sun'?'Sun':(b==='Moon'?'Moon':A.Body[b]), utc); if(lon==null)return null;
      const ra=((Math.atan2(Math.sin(lon*r)*Math.cos(eps*r), Math.cos(lon*r))/r)%360+360)%360;
      let mc=((ra-gastDeg)%360+360)%360; if(mc>180)mc-=360; return mc; });
    const ad=(a,b)=>{ let d=Math.abs(a-b)%360; if(d>180)d=360-d; return d; };
    const W=[0.6,0,0,1,-0.7,1,-0.6]; // 태양+,금성+,화성-,목성+,토성- (달·수성 0)
    const orb=8;
    const out=_CITIES.map((c,ci)=>{ const clon=c[2]; let score=0,dom=-1,domD=999;
      for(let p=0;p<7;p++){ if(mcLon[p]==null)continue;
        const d=Math.min(ad(clon,mcLon[p]), ad(clon, mcLon[p]>0?mcLon[p]-180:mcLon[p]+180));
        if(d<=orb){ const s=(orb-d)/orb; score+=(W[p]||0)*s*10; if(d<domD){domD=d;dom=p;} } }
      return { name:c[0], score, dom, domD };
    }).filter(x=>x.dom>=0);
    out.sort((a,b)=>b.score-a.score);
    return out;
  }catch(e){ return null; }
}
function renderAstroCartoPanel(data){
  const old=document.getElementById('astrocarto-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.astro||!X.astro.planets) return;
  const sel=(typeof document!=='undefined')?document.getElementById('birth-city'):null;
  if(data.birthHour==null || !sel || sel.value==='') return; // 출생시각+도시 필요(정확 UTC)
  const AC=X.astro; const cs=_astroCarto(data); if(!cs||!cs.length) return;
  const PSYM=['☉','☽','☿','♀','♂','♃','♄'];
  const best=cs.filter(x=>x.score>0).slice(0,3);
  if(!best.length) return;
  const row=(x)=>{ const pl=AC.planets[x.dom]||{}; return `<div style="background:rgba(255,255,255,.6);border-radius:10px;padding:9px 12px;margin-bottom:6px;">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><span style="font-size:13px;font-weight:800;color:#0c4a6e;">📍 ${escHtml(x.name)}</span><span style="font-size:11px;font-weight:700;color:#0369a1;">${PSYM[x.dom]} ${escHtml(pl.name||'')}</span></div>
    <div style="font-size:11px;color:#075985;line-height:1.5;margin-top:4px;">${escHtml(pl.vibe||'')}</div></div>`; };
  const panel=document.createElement('div');
  panel.id='astrocarto-panel';
  panel.style.cssText='background:linear-gradient(135deg,#f0f9ff,#bae6fd);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#0369a1;margin-bottom:6px;text-transform:uppercase;">🗺️ ${escHtml(AC.title)}</div>
    <div style="font-size:11px;color:#0369a1;margin-bottom:10px;line-height:1.4;">${escHtml(AC.intro)}</div>
    <div style="font-size:10.5px;color:#0c4a6e;font-weight:700;text-transform:uppercase;margin-bottom:7px;">✨ ${escHtml(AC.bestLabel)}</div>
    ${best.map(row).join('')}`;
  _luxInsert(panel);
}

// ── T6) 휴먼 디자인 (64게이트·9센터·36채널) (Trend Wave6) ──────
// 게이트 휠: 게이트41이 황경 302°(2°물병)에서 시작하는 트로피컬 표준 라베만달라.
const _HD_WHEEL=[41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];
const _HD_START=302.0;
const _HD_CENTERS_MAP={Head:[64,61,63],Ajna:[47,24,4,17,43,11],Throat:[62,23,56,35,12,45,33,8,31,20,16],G:[7,1,13,25,46,2,15,10],Heart:[21,40,26,51],Spleen:[48,57,44,50,32,28,18],Sacral:[5,14,29,59,9,3,42,27,34],SolarPlexus:[6,37,30,55,49,22,36],Root:[53,60,52,19,39,41,58,38,54]};
const _HD_GATE_CENTER=(function(){ const m={}; for(const c in _HD_CENTERS_MAP) _HD_CENTERS_MAP[c].forEach(g=>{m[g]=c;}); return m; })();
const _HD_CHANNELS=[[1,8],[2,14],[3,60],[4,63],[5,15],[6,59],[7,31],[9,52],[10,20],[10,34],[10,57],[11,56],[12,22],[13,33],[16,48],[17,62],[18,58],[19,49],[20,34],[20,57],[21,45],[23,43],[24,61],[25,51],[26,44],[27,50],[28,38],[29,46],[30,41],[32,54],[34,57],[35,36],[37,40],[39,55],[42,53],[47,64]];
function _hdGateLine(lon){ const off=((lon-_HD_START)%360+360)%360; const idx=Math.floor(off/5.625); const within=off-idx*5.625; return {gate:_HD_WHEEL[idx], line:Math.min(6,Math.floor(within/(5.625/6))+1)}; }
function _hdActs(date){
  const A=_astro(); if(!A) return null;
  const sunLon=_eclLon('Sun',date); if(sunLon==null) return null;
  const jd=2440587.5+date.getTime()/86400000, T=(jd-2451545)/36525;
  let node=(125.0445479-1934.1362891*T+0.0020754*T*T)%360; node=((node%360)+360)%360; // 평균 북교점
  const pts=[ sunLon, (sunLon+180)%360, _eclLon('Moon',date), node, (node+180)%360 ];
  for(const b of ['Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto']){ const bd=A.Body?A.Body[b]:null; pts.push(bd?_eclLon(bd,date):null); }
  const acts=pts.map(l=> l==null?null:_hdGateLine(l)).filter(Boolean);
  return { acts, sun:_hdGateLine(sunLon) };
}
function _humanDesign(data){
  const A=_astro(); if(!A) return null;
  try{
    const h=(data.birthHour!=null)?data.birthHour:12;
    const sel=(typeof document!=='undefined')?document.getElementById('birth-city'):null;
    const bc=(sel && sel.value!=='' && typeof _CITIES!=='undefined' && _CITIES[+sel.value])?_CITIES[+sel.value]:null;
    const birthUtc = bc ? new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,0,Math.round((h-bc[3])*60+(data.birthMinute||0))))
                        : new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,h,(data.birthMinute||0)));
    const P=_hdActs(birthUtc); if(!P) return null;
    const sunLon=_eclLon('Sun',birthUtc); const target=((sunLon-88)%360+360)%360; // 디자인=88° 태양호 이전
    let desDate=null;
    try{ if(A.SearchSunLongitude){ const t=A.SearchSunLongitude(target, new Date(birthUtc.getTime()-95*86400000), 95); desDate=t?(t.date||null):null; } }catch(e){}
    if(!desDate) desDate=new Date(birthUtc.getTime()-88*86400000);
    const D=_hdActs(desDate); if(!D) return null;
    const active=new Set(); P.acts.forEach(a=>active.add(a.gate)); D.acts.forEach(a=>active.add(a.gate));
    const definedCenters=new Set(); const edges=[];
    for(const [a,b] of _HD_CHANNELS){ if(active.has(a)&&active.has(b)){ definedCenters.add(_HD_GATE_CENTER[a]); definedCenters.add(_HD_GATE_CENTER[b]); edges.push([_HD_GATE_CENTER[a],_HD_GATE_CENTER[b]]); } }
    const motors=['Sacral','Heart','SolarPlexus','Root'];
    const adj={}; edges.forEach(([x,y])=>{(adj[x]=adj[x]||[]).push(y);(adj[y]=adj[y]||[]).push(x);});
    function reaches(from,to){ if(!definedCenters.has(from)||!definedCenters.has(to))return false; const seen=new Set([from]),q=[from]; while(q.length){const n=q.shift(); if(n===to)return true; (adj[n]||[]).forEach(m=>{if(!seen.has(m)){seen.add(m);q.push(m);}});} return false; }
    const sacral=definedCenters.has('Sacral'), throat=definedCenters.has('Throat');
    const motorThroat = throat && motors.some(mo=>reaches(mo,'Throat'));
    let type;
    if(definedCenters.size===0) type='reflector';
    else if(sacral) type = motorThroat?'mg':'generator';
    else if(throat && motorThroat) type='manifestor';
    else type='projector';
    let auth;
    if(definedCenters.has('SolarPlexus')) auth='emotional';
    else if(definedCenters.has('Sacral')) auth='sacral';
    else if(definedCenters.has('Spleen')) auth='splenic';
    else if(definedCenters.has('Heart')) auth='ego';
    else if(definedCenters.has('G')) auth='self';
    else if(definedCenters.size>0) auth='mental';
    else auth='lunar';
    const profile = P.sun.line + '/' + D.sun.line;
    return { type, auth, profile, definedCount:definedCenters.size };
  }catch(e){ return null; }
}
function renderHumanDesignPanel(data){
  const old=document.getElementById('humandesign-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.hd||!X.hd.types) return;
  const HD=X.hd; const r=_humanDesign(data); if(!r) return;
  const t=HD.types[r.type]; if(!t) return;
  const au=(HD.authorities&&HD.authorities[r.auth])||{};
  const pf=(HD.profiles&&HD.profiles[r.profile])||null;
  const TYPE_EMJ={generator:'⚙️',mg:'⚡',projector:'🎯',manifestor:'🚀',reflector:'🌙'};
  const panel=document.createElement('div');
  panel.id='humandesign-panel';
  panel.style.cssText='background:linear-gradient(135deg,#0f172a,#1e1b4b);border-radius:16px;padding:16px;margin:16px 0;color:#e0e7ff;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#a5b4fc;margin-bottom:6px;text-transform:uppercase;">🧬 ${escHtml(HD.title)}</div>
    <div style="font-size:11px;color:#c7d2fe;margin-bottom:12px;line-height:1.4;">${escHtml(HD.intro)}</div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:11px;">
      <div style="font-size:32px;line-height:1;">${TYPE_EMJ[r.type]||'🧬'}</div>
      <div><div style="font-size:10px;color:#818cf8;font-weight:700;text-transform:uppercase;">${escHtml(HD.typeLabel)}</div>
        <div style="font-size:18px;font-weight:900;color:#eef2ff;margin-top:1px;">${escHtml(t.name)}</div></div></div>
    <div style="background:rgba(129,140,248,.15);border-radius:10px;padding:10px 13px;font-size:12px;color:#e0e7ff;line-height:1.6;margin-bottom:9px;">
      <span style="color:#a5b4fc;font-weight:700;">▸ ${escHtml(HD.strategyLabel)}:</span> ${escHtml(t.strategy)}<br>${escHtml(t.desc)}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:9px 11px;">
        <div style="font-size:9.5px;color:#818cf8;font-weight:700;text-transform:uppercase;">${escHtml(HD.authorityLabel)}</div>
        <div style="font-size:13px;font-weight:800;color:#eef2ff;margin:2px 0 3px;">${escHtml(au.name||'')}</div>
        <div style="font-size:10.5px;color:#c7d2fe;line-height:1.45;">${escHtml(au.desc||'')}</div></div>
      <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:9px 11px;">
        <div style="font-size:9.5px;color:#818cf8;font-weight:700;text-transform:uppercase;">${escHtml(HD.profileLabel)}</div>
        <div style="font-size:13px;font-weight:800;color:#eef2ff;margin:2px 0 3px;">${escHtml(r.profile)}${pf?' · '+escHtml(pf.name):''}</div>
        <div style="font-size:10.5px;color:#c7d2fe;line-height:1.45;">${pf?escHtml(pf.desc):''}</div></div></div>
    <div style="font-size:10px;color:#818cf8;margin-top:9px;line-height:1.4;">${escHtml(HD.definedLabel)}: ${r.definedCount}/9 · ${escHtml(HD.cta)}</div>`;
  _luxInsert(panel);
}

// ── T5) 새턴 리턴 추적기 (Trend Wave3) ───────────────────────
function _saturnReturnInfo(data){
  const A=_astro(); if(!A) return null;
  let nd; try{ nd=new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,12,0)); }catch(e){ return null; }
  const ns=_eclLon(A.Body.Saturn, nd); if(ns==null) return null;
  const now=new Date(); const ageNow=(now-nd)/(365.25*86400000);
  const which = ageNow < 44 ? 1 : 2; const targetAge = which===1 ? 29.5 : 59; const orb=5;
  const startMs=nd.getTime()+(targetAge-2.6)*365.25*86400000, endMs=nd.getTime()+(targetAge+2.6)*365.25*86400000;
  let firstIn=null,lastIn=null,exact=null,minD=999;
  for(let ms=startMs; ms<=endMs; ms+=5*86400000){ const dt=new Date(ms); const s=_eclLon(A.Body.Saturn,dt); if(s==null)continue;
    let diff=Math.abs(s-ns)%360; if(diff>180)diff=360-diff;
    if(diff<=orb){ if(!firstIn)firstIn=dt; lastIn=dt; } if(diff<minD){ minD=diff; exact=dt; } }
  if(!firstIn) return { which, status:'upcoming', progress:0, exact };
  let status,progress;
  if(now<firstIn){ status=(firstIn-now)<400*86400000?'approaching':'upcoming'; progress=0; }
  else if(now>lastIn){ status='completed'; progress=100; }
  else { status='active'; progress=Math.max(1,Math.min(99,Math.round((now-firstIn)/(lastIn-firstIn)*100))); }
  return { which, status, progress, firstIn, lastIn, exact };
}
function renderSaturnPanel(data){
  const old=document.getElementById('saturn-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.saturn) return;
  const S=X.saturn; const info=_saturnReturnInfo(data); if(!info) return;
  const fmt=(d)=>{ try{ return d?new Intl.DateTimeFormat(data.lang,{year:'numeric',month:'short'}).format(d):''; }catch(e){ return ''; } };
  const statusTxt={upcoming:S.upcoming,approaching:S.approaching,active:S.active,completed:S.completed}[info.status]||'';
  const statusCol={upcoming:'#94a3b8',approaching:'#d97706',active:'#7c3aed',completed:'#16a34a'}[info.status]||'#94a3b8';
  const panel=document.createElement('div');
  panel.id='saturn-panel';
  panel.style.cssText='background:linear-gradient(135deg,#1c1917,#44403c);border-radius:16px;padding:16px;margin:16px 0;color:#e7e5e4;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#d6d3d1;margin-bottom:6px;text-transform:uppercase;">♄ ${escHtml(S.title)}</div>
    <div style="font-size:11px;color:#a8a29e;margin-bottom:11px;line-height:1.4;">${escHtml(S.intro)}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;gap:8px;">
      <span style="font-size:13px;font-weight:800;color:#fafaf9;">${escHtml(info.which===1?S.return1:S.return2)}</span>
      <span style="font-size:11px;font-weight:800;color:${statusCol};background:${statusCol}22;padding:2px 10px;border-radius:20px;">${escHtml(statusTxt)}</span></div>
    ${info.firstIn?`<div style="margin-bottom:9px;"><div style="display:flex;justify-content:space-between;font-size:10px;color:#a8a29e;margin-bottom:3px;"><span>${escHtml(S.progressLabel)} ${info.progress}%</span><span>${fmt(info.firstIn)} ~ ${fmt(info.lastIn)}</span></div>
      <div style="height:8px;background:rgba(255,255,255,.12);border-radius:4px;overflow:hidden;"><div style="height:100%;width:${info.progress}%;background:linear-gradient(90deg,#a78bfa,#7c3aed);border-radius:4px;"></div></div></div>`:''}
    <div style="background:rgba(255,255,255,.06);border-radius:10px;padding:10px 12px;font-size:12px;color:#e7e5e4;line-height:1.55;margin-bottom:8px;">${escHtml(S.theme)}</div>
    <div style="font-size:11.5px;color:#d6d3d1;line-height:1.5;">💡 ${escHtml(S.advice)}</div>`;
  _luxInsert(panel);
}

// ── T6) 솔라 리턴 — 올해의 차트 (Trend Wave3) ────────────────
function _solarReturnInfo(data){
  const A=_astro(); if(!A) return null;
  let nd; try{ nd=new Date(Date.UTC(data.year,(data.month||1)-1,data.day||1,12,0)); }catch(e){ return null; }
  const natalSun=_eclLon('Sun', nd); if(natalSun==null) return null;
  const now=new Date(); const m=(data.month||1), d=(data.day||1);
  const thisYrB=new Date(Date.UTC(now.getUTCFullYear(), m-1, Math.max(1,d-6), 0,0));
  const refStart = (new Date(Date.UTC(now.getUTCFullYear(), m-1, d, 12,0)) > now)
    ? new Date(Date.UTC(now.getUTCFullYear()-1, m-1, Math.max(1,d-6), 0,0)) : thisYrB;
  let srDate=null;
  try{ if(A.SearchSunLongitude){ const t=A.SearchSunLongitude(natalSun, refStart, 14); srDate=t?(t.date||null):null; } }catch(e){}
  if(!srDate) srDate=refStart;
  const srMoon=_moonSignNow(srDate); const natalSunSign=Math.floor(natalSun/30);
  return { srDate, srMoon, natalSunSign };
}
function renderSolarPanel(data){
  const old=document.getElementById('solar-panel'); if(old)old.remove();
  const A=_astro(); if(!A) return;
  const X=_luxGet(data.lang); if(!X||!X.solar||!X.solar.moonThemes) return;
  const SL=X.solar; const info=_solarReturnInfo(data); if(!info||info.srMoon==null) return;
  const signs=(X.sunSign&&X.sunSign.signs)?X.sunSign.signs:null;
  const sunName=signs?signs[info.natalSunSign].name:''; const moonName=signs?signs[info.srMoon].name:'';
  const theme=SL.moonThemes[info.srMoon]||'';
  const fmt=(d)=>{ try{ return d?new Intl.DateTimeFormat(data.lang,{year:'numeric',month:'short',day:'numeric'}).format(d):''; }catch(e){ return ''; } };
  const panel=document.createElement('div');
  panel.id='solar-panel';
  panel.style.cssText='background:linear-gradient(135deg,#fff7ed,#fed7aa);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML=`<div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#c2410c;margin-bottom:6px;text-transform:uppercase;">🎂 ${escHtml(SL.title)}</div>
    <div style="font-size:11px;color:#c2410c;margin-bottom:11px;line-height:1.4;">${escHtml(SL.intro)}</div>
    <div style="display:flex;gap:9px;margin-bottom:11px;">
      <div style="flex:1;background:rgba(255,255,255,.6);border-radius:12px;padding:10px 12px;">
        <div style="font-size:9.5px;color:#9a3412;font-weight:700;text-transform:uppercase;">☉ ${escHtml(SL.coreLabel)}</div>
        <div style="font-size:14px;font-weight:900;color:#7c2d12;margin-top:2px;">${escHtml(sunName)}</div></div>
      <div style="flex:1;background:rgba(255,255,255,.6);border-radius:12px;padding:10px 12px;">
        <div style="font-size:9.5px;color:#9a3412;font-weight:700;text-transform:uppercase;">☽ ${escHtml(SL.srMoonLabel)}</div>
        <div style="font-size:14px;font-weight:900;color:#7c2d12;margin-top:2px;">${escHtml(moonName)}</div></div>
    </div>
    <div style="background:rgba(194,65,12,.08);border-radius:10px;padding:10px 12px;font-size:12px;color:#7c2d12;line-height:1.55;"><b>${escHtml(SL.yearThemeLabel)}</b> · ${escHtml(theme)}</div>
    <div style="font-size:10px;color:#9a3412;margin-top:7px;line-height:1.4;">📅 ${fmt(info.srDate)} · ${escHtml(SL.validNote)}</div>`;
  _luxInsert(panel);
}

// ══ 결과화면 광고 (AdSense + ko 쿠팡) ══════════════════════
// 단독 접속(iframe 아님)에서만, 1회 생성(재렌더 시 중복/재push 방지),
// .share-section 앞에 삽입. 크기는 축소(콘텐츠 가독성 우선).
function _resultAdSense(id, maxW){
  if (window.self !== window.top) return;            // iframe 내 삽입 금지(AdSense 정책)
  if (document.getElementById(id)) return;           // 이미 있으면 재생성 안 함
  const share = document.querySelector('.share-section');
  if (!share) return;
  const w = document.createElement('div');
  w.id = id;
  w.style.cssText = 'max-width:'+(maxW||360)+'px;margin:14px auto;min-height:1px;';
  w.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1378943893051810" data-ad-slot="8233374508" data-ad-format="auto" data-full-width-responsive="true"></ins>';
  share.parentNode.insertBefore(w, share);
  try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){}
}
// 결과 콘텐츠 비례 애드센스 자동 분배 — 노출 패널 수에 맞춰 광고 수 결정(최대 4 추가).
// self===top·iframe 제외. 모든 패널 렌더 후 호출, 재렌더 시 이전 분배 광고 제거 후 재배치.
function _distributeResultAds(){
  if (window.self !== window.top) return;
  const inner = document.querySelector('.result-inner');
  if (!inner) return;
  inner.querySelectorAll('.result-ad-dist').forEach(el => el.remove());
  const kids = Array.from(inner.children).filter(el => {
    if (el.id && /^ad-/.test(el.id)) return false;
    if (el.classList && (el.classList.contains('share-section') || el.classList.contains('retry-row') || el.classList.contains('seo-section'))) return false;
    try { if (getComputedStyle(el).display === 'none') return false; } catch(e){}
    return true;
  });
  if (!kids.length) return;
  const targetAds = Math.min(4, Math.max(1, Math.round(kids.length / 4)));
  const step = Math.max(1, Math.floor(kids.length / (targetAds + 1)));
  let added = 0;
  for (let pos = step; pos < kids.length && added < targetAds; pos += step, added++){
    const anchor = kids[pos];
    const w = document.createElement('div');
    w.className = 'result-ad-dist';
    w.style.cssText = 'max-width:400px;margin:18px auto;min-height:1px;';
    w.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1378943893051810" data-ad-slot="8233374508" data-ad-format="auto" data-full-width-responsive="true"></ins>';
    anchor.parentNode.insertBefore(w, anchor.nextSibling);
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch(e){}
  }
}
function _resultCoupang(lang){
  if (window.self !== window.top) return;
  if (lang !== 'ko') return;
  if (document.getElementById('coupang-result')) return;
  // 상단(결과 번호/광고 바로 아래)에 배치 — 잘 보이는 위치
  const topA = document.getElementById('ad-result-top') || document.querySelector('.fortune-card') || document.getElementById('lottery-section');
  if (!topA || !topA.parentNode) return;
  const wrap = document.createElement('div');
  wrap.id = 'coupang-result';
  wrap.style.cssText = 'max-width:680px;margin:14px auto;text-align:center;overflow:hidden;box-sizing:border-box;';
  topA.after(wrap);
  try {
    var cpW = Math.min(680, Math.max(300, document.documentElement.clientWidth - 32));
    var cpF = document.createElement('iframe');
    cpF.src = 'https://ads-partners.coupang.com/widgets.html?id=996633&template=carousel&trackingCode=AF4227535&subId=&width=' + cpW + '&height=140&tsource=';
    cpF.style.cssText = 'width:' + cpW + 'px;max-width:100%;height:140px;border:0;display:block;margin:0 auto;';
    cpF.scrolling = 'no'; cpF.loading = 'lazy'; cpF.referrerPolicy = 'unsafe-url';
    cpF.title = '쿠팡 파트너스 추천 상품';
    wrap.appendChild(cpF);
    var p = document.createElement('p');
    p.style.cssText = 'font-size:10px;color:#9ca3af;margin-top:7px;line-height:1.5;';
    p.textContent = '이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';
    wrap.appendChild(p);
  } catch(e){}
}

// ── 십이지 (Chinese Zodiac) 배지 패널 ───────────────────────
function renderChineseZodiacBadge(data) {
  const existing = document.getElementById('cz-badge-panel');
  if (existing) existing.remove();

  const L = window.LUCKY_LANG || {};
  const czKey = data.czKey || _getCZKey(data.year);
  const czEmj = _CZ_EMJ[czKey];
  const czName = _getCZName(data.year, data.lang);
  const birthYears = _getCZBirthYears(data.year).filter(y=>y>=1924&&y<=2020).join(', ');

  // 올해(2026 = Horse) vs 생띠 관계
  const currentYear = new Date().getFullYear();
  const currentKey  = _getCZKey(currentYear);
  const CZ_CLASH = {rat:'horse',horse:'rat',ox:'goat',goat:'ox',tiger:'monkey',monkey:'tiger',rabbit:'rooster',rooster:'rabbit',dragon:'dog',dog:'dragon',snake:'pig',pig:'snake'};
  const CZ_COMPAT = {rat:['dragon','monkey'],ox:['snake','rooster'],tiger:['horse','dog'],rabbit:['goat','pig'],dragon:['rat','monkey'],snake:['ox','rooster'],horse:['tiger','dog'],goat:['rabbit','pig'],monkey:['rat','dragon'],rooster:['ox','snake'],dog:['tiger','horse'],pig:['rabbit','goat']};

  const YN_OWN = { ko:'⚠️ 본명년(本命年) — 변화가 많은 해. 부적·빨간 속옷으로 액막이를 챙기세요.', ja:'⚠️ 本命年 — 変化の多い年。お守りで厄除けを。', en:'⚠️ Your zodiac year — expect big changes. Wear red for luck.', de:'⚠️ Ihr Tierkreisjahr — große Veränderungen möglich. Rot bringt Glück.', fr:'⚠️ Votre année zodiacale — de grands changements en vue. Portez du rouge porte-bonheur.', es:'⚠️ Tu año zodiacal — se esperan grandes cambios. Viste de rojo para la suerte.', pt:'⚠️ Seu ano zodiacal — grandes mudanças à vista. Use vermelho para dar sorte.', it:'⚠️ Il tuo anno zodiacale — grandi cambiamenti in arrivo. Indossa il rosso portafortuna.', id:'⚠️ Tahun shio Anda — banyak perubahan. Kenakan merah untuk keberuntungan.' };
  const YN_CLASH = { ko:'⚡ 충(沖)의 해 — 올해 건강과 인간관계에 주의가 필요합니다.', ja:'⚡ 冲の年 — 健康と人間関係に注意。', en:'⚡ Clash year — take extra care in health and relationships.', de:'⚡ Konfliktjahr — achten Sie besonders auf Gesundheit und Beziehungen.', fr:'⚡ Année de conflit — prudence avec la santé et les relations.', es:'⚡ Año de choque — cuida especialmente la salud y las relaciones.', pt:'⚡ Ano de conflito — cuide da saúde e dos relacionamentos.', it:'⚡ Anno di conflitto — attenzione a salute e relazioni.', id:'⚡ Tahun bentrok — jaga kesehatan dan hubungan.' };
  const YN_HARM = { ko:'✨ 삼합(三合)의 해 — 귀인의 도움으로 행운이 따르는 시기입니다.', ja:'✨ 三合の年 — 貴人の助けで運気上昇。', en:'✨ Harmonious year — expect support and good fortune.', de:'✨ Harmonisches Jahr — Unterstützung und Glück begleiten Sie.', fr:'✨ Année harmonieuse — soutien et bonne fortune au rendez-vous.', es:'✨ Año armonioso — apoyo y buena fortuna te acompañan.', pt:'✨ Ano harmonioso — apoio e boa sorte o acompanham.', it:'✨ Anno armonioso — sostegno e buona sorte ti accompagnano.', id:'✨ Tahun harmonis — dukungan dan keberuntungan menyertai Anda.' };
  const YN_STABLE = { ko:'🌟 평운의 해 — 꾸준히 노력하면 결실을 맺을 수 있습니다.', ja:'🌟 平運の年 — コツコツ努力が実る年。', en:'🌟 Stable year — steady effort brings results.', de:'🌟 Stabiles Jahr — stetige Anstrengung trägt Früchte.', fr:'🌟 Année stable — un effort régulier porte ses fruits.', es:'🌟 Año estable — el esfuerzo constante da frutos.', pt:'🌟 Ano estável — o esforço constante dá frutos.', it:"🌟 Anno stabile — l'impegno costante dà frutti.", id:'🌟 Tahun stabil — usaha konsisten membuahkan hasil.' };
  const _yn = (m) => m[data.lang] || m.en;
  let yearNote = '', relType = 'stable';
  if (czKey === currentKey) { yearNote = _yn(YN_OWN); relType='own'; }
  else if (CZ_CLASH[czKey] === currentKey) { yearNote = _yn(YN_CLASH); relType='clash'; }
  else if ((CZ_COMPAT[czKey]||[]).includes(currentKey)) { yearNote = _yn(YN_HARM); relType='harm'; }
  else { yearNote = _yn(YN_STABLE); relType='stable'; }

  // ── 오행 띠(60갑자) + 연간 4영역 운세 (LUX cz 콘텐츠, 없으면 폴백) ──
  const _CZ5_ELEM = { ko:['목(木)','화(火)','토(土)','금(金)','수(水)'], en:['Wood','Fire','Earth','Metal','Water'], ja:['木','火','土','金','水'], de:['Holz','Feuer','Erde','Metall','Wasser'], fr:['Bois','Feu','Terre','Métal','Eau'], es:['Madera','Fuego','Tierra','Metal','Agua'], pt:['Madeira','Fogo','Terra','Metal','Água'], it:['Legno','Fuoco','Terra','Metallo','Acqua'], id:['Kayu','Api','Tanah','Logam','Air'] };
  const _CZ5_COL = ['#16a34a','#dc2626','#d97706','#6b7280','#2563eb'];
  const ei = Math.floor((((data.year - 4) % 10 + 10) % 10) / 2);  // 연주 천간 오행 0목1화2토3금4수
  const elemName = (_CZ5_ELEM[data.lang]||_CZ5_ELEM.en)[ei];
  const CZC = ((window.LUX && (window.LUX[data.lang]||window.LUX.en)) || {}).cz;
  const elemLine = (CZC && CZC.elements && CZC.elements[ei]) ? CZC.elements[ei] : '';
  const annual = (CZC && CZC.annual && CZC.annual[relType]) ? CZC.annual[relType] : null;
  const aLbl = (CZC && CZC.areaLabels) ? CZC.areaLabels : null;
  const annualHtml = (annual && aLbl) ? `<div style="background:rgba(255,255,255,.55);border-radius:10px;padding:10px 12px;margin-bottom:10px;">
      <div style="font-size:10.5px;color:#b45309;font-weight:700;text-transform:uppercase;margin-bottom:7px;">📅 ${escHtml(CZC.annualTitle||'')}</div>
      ${[['🌟',aLbl.overall,annual.overall],['💰',aLbl.money,annual.money],['💕',aLbl.love,annual.love],['🌿',aLbl.health,annual.health]].map(a=>`<div style="display:flex;gap:7px;align-items:flex-start;font-size:11px;line-height:1.5;margin-bottom:5px;"><span style="flex-shrink:0;">${a[0]}</span><span><b style="color:#b45309;">${escHtml(a[1])}</b> <span style="color:#78350f;">${escHtml(a[2])}</span></span></div>`).join('')}
    </div>` : '';

  const COMPAT_NAMES = (CZ_COMPAT[czKey]||[]).map(k=>_getCZName(1900+_CZ_KEYS.indexOf(k)*12,data.lang)).join(', ');
  const CLASH_NAME = CZ_CLASH[czKey] ? _getCZName(1900+_CZ_KEYS.indexOf(CZ_CLASH[czKey])*12,data.lang) : '';

  const TITLE = {ko:'나의 띠',ja:'あなたの干支',en:'Your Zodiac Sign',de:'Ihr Tierzeichen',fr:'Votre signe',es:'Tu signo',pt:'Seu signo',it:'Il tuo segno',id:'Shio Anda'};
  const LBL_COMPAT = {ko:'삼합(相生)',ja:'相性良',en:'Compatible',de:'Kompatibel',fr:'Compatible',es:'Compatible',pt:'Compatível',it:'Compatibile',id:'Cocok'};
  const LBL_CLASH  = {ko:'충(相沖)',ja:'相冲',en:'Clash',de:'Konflikt',fr:'Conflit',es:'Conflicto',pt:'Conflito',it:'Conflitto',id:'Bentrok'};

  const panel = document.createElement('div');
  panel.id = 'cz-badge-panel';
  panel.style.cssText = 'background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:16px;padding:16px;margin:16px 0;';
  panel.innerHTML = `
    <div style="font-size:12px;font-weight:700;letter-spacing:.05em;color:#92400e;margin-bottom:12px;text-transform:uppercase;">${TITLE[data.lang]||TITLE.en}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px;">
      <div style="font-size:52px;line-height:1;">${czEmj}</div>
      <div>
        <div style="font-size:22px;font-weight:900;color:#78350f;">${elemLine?`<span style="color:${_CZ5_COL[ei]};">${escHtml(elemName)}</span> `:''}${czName}</div>
        <div style="font-size:11px;color:#92400e;margin-top:3px;">${birthYears}</div>
      </div>
    </div>
    ${elemLine?`<div style="font-size:11.5px;color:#78350f;line-height:1.5;margin-bottom:10px;">${escHtml(elemLine)}</div>`:''}
    <div style="background:rgba(0,0,0,.05);border-radius:10px;padding:10px 12px;font-size:12px;color:#78350f;line-height:1.5;margin-bottom:10px;">${yearNote}</div>
    ${annualHtml}
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      ${COMPAT_NAMES ? `<span style="background:#dcfce7;color:#166534;font-size:11px;padding:4px 10px;border-radius:20px;font-weight:600;">${LBL_COMPAT[data.lang]||LBL_COMPAT.en}: ${COMPAT_NAMES}</span>` : ''}
      ${CLASH_NAME ? `<span style="background:#fee2e2;color:#991b1b;font-size:11px;padding:4px 10px;border-radius:20px;font-weight:600;">${LBL_CLASH[data.lang]||LBL_CLASH.en}: ${CLASH_NAME}</span>` : ''}
    </div>`;

  const shareSec = document.querySelector('.share-section');
  if (shareSec) shareSec.parentNode.insertBefore(panel, shareSec);
  else document.getElementById('s-result').appendChild(panel);
}

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
    const L = window.LUCKY_LANG || {};
    const origHtml = btn.innerHTML;
    btn.innerHTML = `<span>✅</span><span>${L.btnCopied || 'Copied!'}</span>`;
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
  // AdSense bottom unit shows ONLY on the result screen (kept off the home/main
  // screen per owner request); cleared elsewhere. self===top → no AdSense in iframe.
  try {
    const ab = document.getElementById('ad-bottom');
    if (ab) {
      if (id === 's-result' && window.self === window.top) {
        if (!ab.dataset.loaded) {
          ab.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1378943893051810" data-ad-slot="8233374508" data-ad-format="auto" data-full-width-responsive="true"></ins>';
          ab.dataset.loaded = '1';
          (adsbygoogle = window.adsbygoogle || []).push({});
        }
      } else {
        ab.innerHTML = '';
        delete ab.dataset.loaded;
      }
    }
  } catch (e) {}
}

function selectSets(btn) {
  document.querySelectorAll('.sets-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

window.LUCKY_SELECTED_CAT = 'lucky';

function adaptInputForm(cat) {
  const isLucky = cat === 'lucky';
  const isGunghap = cat === 'gunghap';
  const L = window.LUCKY_LANG || {};
  const lang = window.LUCKY_CURRENT_LANG || 'ko';

  // 🎰 룰렛 카테고리: 생일 흐름 불필요 — 입력폼 전체를 숨기고 룰렛 패널만 노출
  const _rlForm = ['lottery-wrap','sets-wrap','bday-block','draw-date-section','birth-time-wrap','name-input-wrap','gender-section','partner-section','btn-generate','txt-input-note','privacy-note'];
  const _rp = document.getElementById('roulette-panel');
  if (cat === 'roulette') {
    _rlForm.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    if (_rp) { _rp.style.display = 'block'; _rlMountAd(); }
    return;
  }
  if (_rp) _rp.style.display = 'none';
  _rlForm.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = ''; }); // 룰렛→타 카테고리 복귀 시 폼 복원

  // Show/hide lottery-only sections
  ['lottery-wrap', 'sets-wrap', 'draw-date-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isLucky ? '' : 'none';
  });

  // Partner section: only for gunghap
  const partnerSection = document.getElementById('partner-section');
  if (partnerSection) partnerSection.style.display = isGunghap ? '' : 'none';

  // Gender section: only for saju/gunghap with ko lang
  const genderSection = document.getElementById('gender-section');
  if (genderSection) genderSection.style.display = (lang === 'ko') ? '' : 'none';

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
    } else if (isGunghap) {
      const GUNGHAP_BTN = {ko:'궁합 보기', en:'Check Compatibility', ja:'相性を見る', de:'Kompatibilität', fr:'Compatibilité', es:'Compatibilidad', pt:'Compatibilidade', it:'Compatibilità', id:'Cek Kecocokan'};
      btn.textContent = GUNGHAP_BTN[lang] || 'Check Compatibility';
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
    } else if (isGunghap) {
      const GUNGHAP_NOTE = {
        ko:'두 사람의 생년월일을 입력하면 사주팔자 기반 궁합을 분석합니다.',
        en:'Enter both birthdates to analyze compatibility via the Four Pillars system.',
        ja:'二人の生年月日を入力して四柱推命で相性を分析します。',
        de:'Gib beide Geburtsdaten ein, um die Kompatibilität zu analysieren.',
        fr:'Entrez deux dates de naissance pour analyser la compatibilité.',
        es:'Ingresa dos fechas de nacimiento para analizar la compatibilidad.',
        pt:'Informe dois aniversários para analisar a compatibilidade.',
        it:'Inserisci due date di nascita per analizzare la compatibilità.',
        id:'Masukkan dua tanggal lahir untuk menganalisis kecocokan.',
      };
      note.textContent = GUNGHAP_NOTE[lang] || GUNGHAP_NOTE.en;
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

// ══ 🎰 행운 룰렛 (홈 카테고리 'roulette') ════════════════════
// 매 스핀 랜덤(생일 불필요). 자리수(1/2/3) 단일선택 → 돌리면 숫자 하나씩 누적 출력.
const ROULETTE_I18N = {
  ko:{cat:'룰렛',title:'🎰 행운 룰렛',sub:'자리수를 고르고 돌려서 행운의 숫자를 하나씩 뽑으세요',d1:'1자리',d2:'2자리',d3:'3자리',spin:'돌리기',reset:'초기화',count:n=>`뽑은 숫자 ${n}개`,note:'오락용 무작위 추첨입니다. 당첨을 보장하지 않습니다.'},
  en:{cat:'Roulette',title:'🎰 Lucky Roulette',sub:'Pick a digit length and spin to draw lucky numbers one by one',d1:'1 digit',d2:'2 digits',d3:'3 digits',spin:'SPIN',reset:'Reset',count:n=>`${n} drawn`,note:'For entertainment only — random draw, no win guaranteed.'},
  ja:{cat:'ルーレット',title:'🎰 ラッキールーレット',sub:'桁数を選んで回し、幸運の数字を一つずつ引きましょう',d1:'1桁',d2:'2桁',d3:'3桁',spin:'回す',reset:'リセット',count:n=>`${n}個`,note:'娯楽用のランダム抽選です。当選を保証しません。'},
  de:{cat:'Roulette',title:'🎰 Glücksroulette',sub:'Stellenzahl wählen und drehen — Zahlen einzeln ziehen',d1:'1-stellig',d2:'2-stellig',d3:'3-stellig',spin:'DREHEN',reset:'Zurücksetzen',count:n=>`${n} gezogen`,note:'Nur zur Unterhaltung — Zufallsziehung, kein Gewinn garantiert.'},
  fr:{cat:'Roulette',title:'🎰 Roulette Chance',sub:'Choisissez le nombre de chiffres et tournez un à un',d1:'1 chiffre',d2:'2 chiffres',d3:'3 chiffres',spin:'TOURNER',reset:'Réinitialiser',count:n=>`${n} tirés`,note:'À titre de divertissement — tirage aléatoire, gain non garanti.'},
  es:{cat:'Ruleta',title:'🎰 Ruleta de la Suerte',sub:'Elige los dígitos y gira para sacar números uno a uno',d1:'1 dígito',d2:'2 dígitos',d3:'3 dígitos',spin:'GIRAR',reset:'Reiniciar',count:n=>`${n} sacados`,note:'Solo entretenimiento — sorteo aleatorio, sin garantía.'},
  pt:{cat:'Roleta',title:'🎰 Roleta da Sorte',sub:'Escolha os dígitos e gire para tirar números um a um',d1:'1 dígito',d2:'2 dígitos',d3:'3 dígitos',spin:'GIRAR',reset:'Limpar',count:n=>`${n} tirados`,note:'Apenas entretenimento — sorteio aleatório, sem garantia.'},
  it:{cat:'Roulette',title:'🎰 Roulette Fortunata',sub:'Scegli le cifre e gira per estrarre numeri uno a uno',d1:'1 cifra',d2:'2 cifre',d3:'3 cifre',spin:'GIRA',reset:'Azzera',count:n=>`${n} estratti`,note:'Solo intrattenimento — estrazione casuale, nessuna vincita garantita.'},
  id:{cat:'Rolet',title:'🎰 Rolet Keberuntungan',sub:'Pilih jumlah digit dan putar untuk menarik angka satu per satu',d1:'1 digit',d2:'2 digit',d3:'3 digit',spin:'PUTAR',reset:'Atur ulang',count:n=>`${n} ditarik`,note:'Hanya hiburan — undian acak, tanpa jaminan menang.'},
};
let _rlDigits = 1, _rlSpinning = false, _rlCount = 0;
function _rlT(){ return ROULETTE_I18N[window.LUCKY_CURRENT_LANG] || ROULETTE_I18N.en; }
function _applyRouletteI18n(lang){
  const t = ROULETTE_I18N[lang] || ROULETTE_I18N.en;
  const set = (id,v)=>{ const e=document.getElementById(id); if(e) e.textContent=v; };
  set('cat-name-7', t.cat);
  set('rl-title', t.title); set('rl-sub', t.sub);
  set('rl-d1', t.d1); set('rl-d2', t.d2); set('rl-d3', t.d3);
  set('rl-spin-txt', t.spin); set('rl-reset', t.reset); set('rl-note', t.note);
  _rlUpdateCount();
}
function setRouletteDigits(n){
  _rlDigits = n;
  [1,2,3].forEach(d=>{ const b=document.getElementById('rl-d'+d); if(b) b.classList.toggle('active', d===n); });
  const disp=document.getElementById('rl-display'); if(disp) disp.textContent = '0'.repeat(n);
}
function _rlUpdateCount(){ const c=document.getElementById('rl-count'); if(c) c.textContent = _rlCount ? _rlT().count(_rlCount) : ''; }
function spinRoulette(){
  if(_rlSpinning) return;
  const disp=document.getElementById('rl-display'); const btn=document.getElementById('rl-spin');
  if(!disp) return;
  _rlSpinning = true; if(btn) btn.disabled = true; disp.classList.add('spin');
  const range = Math.pow(10, _rlDigits);
  const fmt = v => String(v).padStart(_rlDigits,'0');
  const tick = setInterval(()=>{ disp.textContent = fmt(Math.floor(Math.random()*range)); }, 70);
  setTimeout(()=>{
    clearInterval(tick);
    const final = Math.floor(Math.random()*range);
    disp.textContent = fmt(final);
    disp.classList.remove('spin');
    const res=document.getElementById('rl-results');
    if(res){ const chip=document.createElement('span'); chip.className='rl-chip'; chip.textContent=fmt(final); res.appendChild(chip); }
    _rlCount++; _rlUpdateCount();
    _rlSpinning=false; if(btn) btn.disabled=false;
  }, 1100);
}
function resetRoulette(){
  const res=document.getElementById('rl-results'); if(res) res.innerHTML='';
  _rlCount=0; _rlUpdateCount();
  const disp=document.getElementById('rl-display'); if(disp) disp.textContent='0'.repeat(_rlDigits);
}
function _rlMountAd(){
  if(window.self !== window.top) return;            // iframe 내 AdSense 미표시(정책)
  const slot=document.getElementById('rl-ad'); if(!slot || slot.dataset.filled) return;
  slot.dataset.filled='1';
  slot.innerHTML='<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1378943893051810" data-ad-slot="8233374508" data-ad-format="auto" data-full-width-responsive="true"></ins>';
  try{ (adsbygoogle=window.adsbygoogle||[]).push({}); }catch(e){}
}

// ══ 타분야 상위기능 — X6 소셜프루프 · X5 보관함 · X8 추천 ════════
const X_I18N = {
  ko:{viewed:n=>`🔥 오늘 ${n.toLocaleString()}명이 행운을 확인했어요`,watching:n=>`👀 지금 ${n}명이 보는 중`,save:'💾 보관함에 저장',saved:'✅ 저장됨',coll:'📁 내 보관함',collEmpty:'아직 저장한 운세가 없어요',collTitle:'📁 내 행운 보관함',del:'삭제',reco:'✨ 이런 운세도 봐보세요',recoItems:[['🃏','오늘의 타로','tarot/daily'],['💎','행운의 크리스탈','crystals/love'],['🌙','이번달 음력 달력','moon-calendar'],['♈','내 별자리','zodiac-signs'],['✨','매니페스테이션','manifestation'],['🎯','내 행운 숫자','lucky-number']]},
  en:{viewed:n=>`🔥 ${n.toLocaleString()} checked their luck today`,watching:n=>`👀 ${n} viewing now`,save:'💾 Save',saved:'✅ Saved',coll:'📁 My Saved',collEmpty:'No saved readings yet',collTitle:'📁 My Lucky Collection',del:'Delete',reco:'✨ You might also like',recoItems:[['🃏','Tarot of the Day','tarot/daily'],['💎','Lucky Crystals','crystals/love'],['🌙','Moon Calendar','moon-calendar'],['♈','Zodiac Signs','zodiac-signs'],['✨','Manifestation','manifestation'],['🎯','My Lucky Number','lucky-number']]},
  ja:{viewed:n=>`🔥 今日 ${n.toLocaleString()}人が運勢をチェック`,watching:n=>`👀 今 ${n}人が閲覧中`,save:'💾 保存',saved:'✅ 保存済み',coll:'📁 保存した運勢',collEmpty:'まだ保存した運勢はありません',collTitle:'📁 マイ運勢コレクション',del:'削除',reco:'✨ こちらもおすすめ',recoItems:[['🃏','今日のタロット','tarot/daily'],['💎','幸運のクリスタル','crystals/love'],['🌙','今月の月暦','moon-calendar'],['♈','私の星座','zodiac-signs'],['✨','引き寄せ','manifestation'],['🎯','私の幸運数','lucky-number']]},
  de:{viewed:n=>`🔥 Heute haben ${n.toLocaleString()} ihr Glück geprüft`,watching:n=>`👀 ${n} sehen gerade zu`,save:'💾 Speichern',saved:'✅ Gespeichert',coll:'📁 Gespeichert',collEmpty:'Noch nichts gespeichert',collTitle:'📁 Meine Glücks-Sammlung',del:'Löschen',reco:'✨ Das könnte dir gefallen',recoItems:[['🃏','Tageskarte','tarot/daily'],['💎','Glückskristalle','crystals/love'],['🌙','Mondkalender','moon-calendar'],['♈','Mein Sternzeichen','zodiac-signs'],['✨','Manifestieren','manifestation'],['🎯','Meine Glückszahl','lucky-number']]},
  fr:{viewed:n=>`🔥 ${n.toLocaleString()} ont vérifié leur chance aujourd'hui`,watching:n=>`👀 ${n} en train de regarder`,save:'💾 Enregistrer',saved:'✅ Enregistré',coll:'📁 Mes favoris',collEmpty:'Aucun tirage enregistré',collTitle:'📁 Ma collection chance',del:'Supprimer',reco:'✨ Vous aimerez aussi',recoItems:[['🃏','Tarot du jour','tarot/daily'],['💎','Cristaux chance','crystals/love'],['🌙','Calendrier lunaire','moon-calendar'],['♈','Mon signe','zodiac-signs'],['✨','Manifestation','manifestation'],['🎯','Mon numéro','lucky-number']]},
  es:{viewed:n=>`🔥 Hoy ${n.toLocaleString()} consultaron su suerte`,watching:n=>`👀 ${n} viéndolo ahora`,save:'💾 Guardar',saved:'✅ Guardado',coll:'📁 Mis guardados',collEmpty:'Sin tiradas guardadas',collTitle:'📁 Mi colección de suerte',del:'Eliminar',reco:'✨ También te puede gustar',recoItems:[['🃏','Tarot del día','tarot/daily'],['💎','Cristales suerte','crystals/love'],['🌙','Calendario lunar','moon-calendar'],['♈','Mi signo','zodiac-signs'],['✨','Manifestación','manifestation'],['🎯','Mi número','lucky-number']]},
  pt:{viewed:n=>`🔥 Hoje ${n.toLocaleString()} consultaram a sorte`,watching:n=>`👀 ${n} vendo agora`,save:'💾 Salvar',saved:'✅ Salvo',coll:'📁 Meus salvos',collEmpty:'Nenhuma leitura salva',collTitle:'📁 Minha coleção da sorte',del:'Excluir',reco:'✨ Você também pode gostar',recoItems:[['🃏','Tarô do dia','tarot/daily'],['💎','Cristais da sorte','crystals/love'],['🌙','Calendário lunar','moon-calendar'],['♈','Meu signo','zodiac-signs'],['✨','Manifestação','manifestation'],['🎯','Meu número','lucky-number']]},
  it:{viewed:n=>`🔥 Oggi ${n.toLocaleString()} hanno controllato la fortuna`,watching:n=>`👀 ${n} stanno guardando`,save:'💾 Salva',saved:'✅ Salvato',coll:'📁 Salvati',collEmpty:'Nessuna lettura salvata',collTitle:'📁 La mia raccolta fortuna',del:'Elimina',reco:'✨ Potrebbe piacerti anche',recoItems:[['🃏','Tarocco del giorno','tarot/daily'],['💎','Cristalli fortuna','crystals/love'],['🌙','Calendario lunare','moon-calendar'],['♈','Il mio segno','zodiac-signs'],['✨','Manifestazione','manifestation'],['🎯','Il mio numero','lucky-number']]},
  id:{viewed:n=>`🔥 Hari ini ${n.toLocaleString()} cek keberuntungan`,watching:n=>`👀 ${n} sedang melihat`,save:'💾 Simpan',saved:'✅ Tersimpan',coll:'📁 Tersimpan',collEmpty:'Belum ada yang disimpan',collTitle:'📁 Koleksi Keberuntungan',del:'Hapus',reco:'✨ Mungkin Anda suka',recoItems:[['🃏','Tarot Hari Ini','tarot/daily'],['💎','Kristal Keberuntungan','crystals/love'],['🌙','Kalender Bulan','moon-calendar'],['♈','Zodiak Saya','zodiac-signs'],['✨','Manifestasi','manifestation'],['🎯','Angka Saya','lucky-number']]},
};
function _xT(){ return X_I18N[window.LUCKY_CURRENT_LANG] || X_I18N.en; }
function _xDayNum(){ const t=new Date(); return Math.floor(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())/86400000); }
function _xViewed(seed){ const t=new Date(); const prog=(t.getHours()*60+t.getMinutes())/1440; const base=900+Math.abs((_xDayNum()*7919+((seed|0)))%1500); return Math.max(12,Math.floor(base*(0.18+0.82*prog))); }
function _xWatching(){ const t=new Date(); return 6+Math.abs((t.getMinutes()*31+t.getHours()*7)%34); }

// X6 실시간 소셜 프루프 (Booking.com식) — 결과 상단
function renderSocialProof(data){
  const t=_xT(); const wrap=document.createElement('div'); wrap.id='socialproof-panel';
  wrap.style.cssText='max-width:480px;margin:14px auto 0;display:flex;gap:8px;flex-wrap:wrap;justify-content:center;';
  wrap.innerHTML=`<span style="background:#fef3c7;color:#92400e;font-weight:800;font-size:12.5px;padding:7px 13px;border-radius:20px;">${t.viewed(_xViewed(data&&data.seed))}</span><span style="background:#dcfce7;color:#166534;font-weight:800;font-size:12.5px;padding:7px 13px;border-radius:20px;"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#22c55e;margin-right:5px;vertical-align:middle;animation:sppulse 1.5s infinite;"></span>${t.watching(_xWatching())}</span>`;
  const share=document.querySelector('.share-section'); if(share) share.parentNode.insertBefore(wrap, share);
}

// X5 내 행운 보관함 (Pinterest식) — 저장/조회
function _collGet(){ try{ return JSON.parse(localStorage.getItem('lucky_saved')||'[]'); }catch(e){ return []; } }
function _collSet(a){ try{ localStorage.setItem('lucky_saved', JSON.stringify(a.slice(0,50))); }catch(e){} }
function renderSaveBar(data){
  const t=_xT(); const wrap=document.createElement('div'); wrap.id='savebar-panel';
  wrap.style.cssText='max-width:480px;margin:16px auto 0;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;';
  const bs='padding:11px 18px;border-radius:11px;font-size:13.5px;font-weight:800;cursor:pointer;border:2px solid var(--border2,#d6d3d1);background:var(--card,#fff);color:var(--text2,#78716c);';
  wrap.innerHTML=`<button id="x-save-btn" onclick="saveCurrentReading()" style="${bs}">${t.save}</button><button onclick="openCollection()" style="${bs}">${t.coll}</button>`;
  const share=document.querySelector('.share-section'); if(share) share.parentNode.insertBefore(wrap, share);
}
function saveCurrentReading(){
  const d=window._lastLuckyData; if(!d) return;
  const nums=(d.sets&&d.sets[0]&&d.sets[0].mainNums)||d.mainNums||[];
  const a=_collGet(); a.unshift({ cat:window.LUCKY_SELECTED_CAT||'lucky', nums, ts:Date.now() }); _collSet(a);
  const b=document.getElementById('x-save-btn'); if(b){ b.textContent=_xT().saved; b.disabled=true; b.style.opacity='.65'; }
}
function openCollection(){
  const t=_xT(); const arr=_collGet();
  const ex=document.getElementById('x-coll-overlay'); if(ex) ex.remove();
  const ov=document.createElement('div'); ov.id='x-coll-overlay'; ov.className='x-coll-overlay';
  ov.onclick=e=>{ if(e.target===ov) ov.remove(); };
  const CATE={lucky:'🎯',saju:'🔮',love:'💝',money:'💰',career:'💼',achievement:'🏆',gunghap:'💑',roulette:'🎰'};
  const rows = arr.length ? arr.map((it,i)=>{
    const d=new Date(it.ts); const ds=`${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`; const nums=(it.nums||[]).join(' · ');
    return `<div style="display:flex;align-items:center;gap:10px;padding:11px 4px;border-bottom:1px solid var(--border,#e7e5e4);"><span style="font-size:22px;">${CATE[it.cat]||'🍀'}</span><div style="flex:1;min-width:0;"><div style="font-weight:800;font-size:14px;color:var(--text,#1c1917);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${nums||'—'}</div><div style="font-size:11px;color:#a8a29e;">${ds}</div></div><button onclick="_collDel(${i})" style="background:none;border:none;color:#ef4444;font-size:12px;font-weight:700;cursor:pointer;">${t.del}</button></div>`;
  }).join('') : `<p style="text-align:center;color:#a8a29e;padding:34px 0;font-size:14px;">${t.collEmpty}</p>`;
  ov.innerHTML=`<div style="background:var(--card,#fff);border-radius:18px;max-width:420px;width:100%;max-height:80vh;overflow:auto;padding:22px;box-shadow:0 12px 40px rgba(0,0,0,.3);"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><h3 style="font-size:17px;font-weight:900;color:var(--text,#1c1917);">${t.collTitle}</h3><button onclick="document.getElementById('x-coll-overlay').remove()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#9ca3af;">✕</button></div>${rows}</div>`;
  document.body.appendChild(ov);
}
function _collDel(i){ const a=_collGet(); a.splice(i,1); _collSet(a); openCollection(); }

// X8 추천 운세 캐러셀 (Amazon/Netflix식) — 결과 하단, 내부링크 SEO
function renderRecommendPanel(data){
  const t=_xT(); const lang=window.LUCKY_CURRENT_LANG||'ko';
  // X7 랭킹 + X2 리포트 카드 추가
  const XR={ko:[['🏆','오늘의 행운 순위','lucky-ranking'],['📊','나의 행운 리포트','lucky-report']],en:[['🏆',"Today's Ranking",'lucky-ranking'],['📊','My Lucky Report','lucky-report']],ja:[['🏆','今日の運勢ランキング','lucky-ranking'],['📊','私の幸運レポート','lucky-report']],de:[['🏆','Glücks-Ranking','lucky-ranking'],['📊','Glücks-Report','lucky-report']],fr:[['🏆','Classement du jour','lucky-ranking'],['📊','Mon Rapport','lucky-report']],es:[['🏆','Ranking de hoy','lucky-ranking'],['📊','Mi Informe','lucky-report']],pt:[['🏆','Ranking de hoje','lucky-ranking'],['📊','Meu Relatório','lucky-report']],it:[['🏆','Classifica di oggi','lucky-ranking'],['📊','Il mio Report','lucky-report']],id:[['🏆','Peringkat Hari Ini','lucky-ranking'],['📊','Laporanku','lucky-report']]};
  const items=t.recoItems.concat(XR[lang]||XR.en);
  const cards=items.map(([emo,label,path])=>`<a href="/${lang}/${path}/" target="_blank" rel="noopener" class="x-reco-card" style="display:flex;align-items:center;gap:9px;background:var(--card,#fff);border:1.5px solid var(--border,#e7e5e4);border-radius:13px;padding:13px 14px;text-decoration:none;color:var(--text,#1c1917);font-size:13.5px;font-weight:700;transition:transform .12s,border-color .12s;"><span style="font-size:20px;flex-shrink:0;">${emo}</span><span>${label}</span></a>`).join('');
  const wrap=document.createElement('div'); wrap.id='recommend-panel';
  wrap.style.cssText='max-width:480px;margin:18px auto 0;';
  wrap.innerHTML=`<h3 style="font-size:15px;font-weight:900;color:var(--text,#1c1917);text-align:center;margin-bottom:12px;">${t.reco}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;">${cards}</div>`;
  const share=document.querySelector('.share-section'); if(share) share.parentNode.insertBefore(wrap, share);
}

// X4 무드/에너지 저널 (Daylio/Calm식) — 오늘 기분 기록 + 7일 히스토리
const MOOD_EMOJI = ['😄','🙂','😐','😟','😢'];
const MOOD_I18N = {
  ko:{q:'오늘 기분은 어땠나요?',saved:'기록 완료! 내일 또 만나요 🌙',hist:'최근 7일 기분'},
  en:{q:'How are you feeling today?',saved:'Logged! See you tomorrow 🌙',hist:'Last 7 days'},
  ja:{q:'今日の気分は？',saved:'記録しました！また明日 🌙',hist:'最近7日の気分'},
  de:{q:'Wie fühlst du dich heute?',saved:'Gespeichert! Bis morgen 🌙',hist:'Letzte 7 Tage'},
  fr:{q:"Comment te sens-tu aujourd'hui ?",saved:'Enregistré ! À demain 🌙',hist:'7 derniers jours'},
  es:{q:'¿Cómo te sientes hoy?',saved:'¡Guardado! Hasta mañana 🌙',hist:'Últimos 7 días'},
  pt:{q:'Como você se sente hoje?',saved:'Registrado! Até amanhã 🌙',hist:'Últimos 7 dias'},
  it:{q:'Come ti senti oggi?',saved:'Registrato! A domani 🌙',hist:'Ultimi 7 giorni'},
  id:{q:'Bagaimana perasaanmu hari ini?',saved:'Tersimpan! Sampai besok 🌙',hist:'7 hari terakhir'},
};
function _moodGet(){ try{ return JSON.parse(localStorage.getItem('lucky_mood')||'[]'); }catch(e){ return []; } }
function _moodSet(a){ try{ localStorage.setItem('lucky_mood', JSON.stringify(a.slice(0,60))); }catch(e){} }
function logMood(idx){ const today=_ymd(new Date()); const a=_moodGet().filter(x=>x.d!==today); a.unshift({d:today,m:idx}); _moodSet(a); renderMoodPanel(window._lastLuckyData, true); }
function renderMoodPanel(data, replace){
  const lang=window.LUCKY_CURRENT_LANG||'ko'; const t=MOOD_I18N[lang]||MOOD_I18N.en;
  const ex=document.getElementById('mood-panel'); if(ex){ if(!replace) return; ex.remove(); }
  const today=_ymd(new Date()); const all=_moodGet(); const todayEntry=all.find(x=>x.d===today);
  let histHtml=''; for(let i=6;i>=0;i--){ const dd=new Date(); dd.setDate(dd.getDate()-i); const e=all.find(x=>x.d===_ymd(dd)); histHtml+=`<span style="font-size:18px;opacity:${e?1:.25};">${e?MOOD_EMOJI[e.m]:'·'}</span>`; }
  const btns=MOOD_EMOJI.map((em,i)=>{ const on=todayEntry&&todayEntry.m===i; return `<button onclick="logMood(${i})" style="font-size:25px;background:${on?'#ede9fe':'transparent'};border:2px solid ${on?'#7c3aed':'var(--border,#e7e5e4)'};border-radius:12px;width:46px;height:46px;cursor:pointer;transition:transform .12s;">${em}</button>`; }).join('');
  const wrap=document.createElement('div'); wrap.id='mood-panel';
  wrap.style.cssText='max-width:480px;margin:18px auto 0;background:var(--card,#fff);border:1.5px solid var(--border,#e7e5e4);border-radius:16px;padding:18px;text-align:center;';
  wrap.innerHTML=`<div style="font-size:14px;font-weight:800;color:var(--text,#1c1917);margin-bottom:12px;">${todayEntry?t.saved:t.q}</div><div style="display:flex;gap:8px;justify-content:center;margin-bottom:14px;">${btns}</div><div style="font-size:11px;color:#a8a29e;margin-bottom:6px;">${t.hist}</div><div style="display:flex;gap:9px;justify-content:center;">${histHtml}</div>`;
  const share=document.querySelector('.share-section'); if(share) share.parentNode.insertBefore(wrap, share);
}

// X10 네이티브 공유 (Web Share API) — 모바일 원탭 공유
const SHARE_NATIVE = {ko:'📤 공유하기',en:'📤 Share',ja:'📤 シェア',de:'📤 Teilen',fr:'📤 Partager',es:'📤 Compartir',pt:'📤 Compartilhar',it:'📤 Condividi',id:'📤 Bagikan'};
function renderNativeShare(data){
  if(!navigator.share) return;
  const lang=window.LUCKY_CURRENT_LANG||'ko';
  const wrap=document.createElement('div'); wrap.id='nativeshare-panel'; wrap.style.cssText='max-width:480px;margin:16px auto 0;';
  wrap.innerHTML=`<button onclick="_doNativeShare()" style="width:100%;padding:14px;border:none;border-radius:13px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(124,58,237,.3);">${SHARE_NATIVE[lang]||SHARE_NATIVE.en}</button>`;
  const share=document.querySelector('.share-section'); if(share) share.parentNode.insertBefore(wrap, share);
}
function _doNativeShare(){
  const lang=window.LUCKY_CURRENT_LANG||'ko';
  const TXT={ko:'내 오늘의 행운을 확인했어요! 🍀 당신의 행운도 확인해보세요',en:'I just checked my luck today! 🍀 Check yours too',ja:'今日の運勢をチェックしました！🍀 あなたもどうぞ',de:'Ich habe heute mein Glück geprüft! 🍀 Prüfe deins',fr:'J\'ai vérifié ma chance aujourd\'hui ! 🍀 Vérifiez la vôtre',es:'¡Hoy consulté mi suerte! 🍀 Consulta la tuya',pt:'Hoje vi minha sorte! 🍀 Veja a sua',it:'Oggi ho controllato la mia fortuna! 🍀 Controlla la tua',id:'Saya cek keberuntungan hari ini! 🍀 Cek milikmu'};
  const homeUrl = location.origin + (lang==='ko'?'/lucky/':'/'+lang+'/lucky/');
  try{ navigator.share({ title:document.title, text:(TXT[lang]||TXT.en), url:homeUrl }).catch(function(){}); }catch(e){}
}

// X1 온보딩 개인화 (Noom/Duolingo식) — 재방문자 환영 배너 (생일 자동복원·최근기록·스트릭은 기존)
const WELCOME_I18N = {
  ko:{back:'다시 오신 걸 환영해요! ✨',streak:d=>`🔥 ${d}일 연속 방문 중`,cta:'오늘의 행운이 기다리고 있어요'},
  en:{back:'Welcome back! ✨',streak:d=>`🔥 ${d}-day streak`,cta:"Today's luck is waiting for you"},
  ja:{back:'おかえりなさい！✨',streak:d=>`🔥 ${d}日連続`,cta:'今日の運勢が待っています'},
  de:{back:'Willkommen zurück! ✨',streak:d=>`🔥 ${d} Tage in Folge`,cta:'Dein Glück wartet heute'},
  fr:{back:'Bon retour ! ✨',streak:d=>`🔥 ${d} jours d'affilée`,cta:'Votre chance vous attend'},
  es:{back:'¡Bienvenido de nuevo! ✨',streak:d=>`🔥 ${d} días seguidos`,cta:'Tu suerte te espera hoy'},
  pt:{back:'Bem-vindo de volta! ✨',streak:d=>`🔥 ${d} dias seguidos`,cta:'Sua sorte espera por você'},
  it:{back:'Bentornato! ✨',streak:d=>`🔥 ${d} giorni di fila`,cta:'La tua fortuna ti aspetta'},
  id:{back:'Selamat datang kembali! ✨',streak:d=>`🔥 ${d} hari beruntun`,cta:'Keberuntunganmu menanti'},
};
function _xWelcomeBack(){
  try{
    const birth=JSON.parse(localStorage.getItem(_LS_BIRTH)||'null');
    const streak=JSON.parse(localStorage.getItem(_LS_STREAK)||'null');
    const days=(streak&&streak.count)||0;
    if(!birth && days<1) return;                  // 신규 방문자에겐 표시 안 함
    const cont=document.querySelector('.home-content .container');
    if(!cont || document.getElementById('welcome-back')) return;
    const t=WELCOME_I18N[window.LUCKY_CURRENT_LANG]||WELCOME_I18N.en;
    const b=document.createElement('div'); b.id='welcome-back';
    b.style.cssText='max-width:500px;margin:0 auto 16px;background:linear-gradient(135deg,#312e81,#6d28d9);color:#fff;border-radius:16px;padding:16px 20px;display:flex;align-items:center;gap:14px;box-shadow:0 4px 18px rgba(76,29,149,.3);';
    b.innerHTML=`<span style="font-size:30px;">👋</span><div style="flex:1;min-width:0;"><div style="font-weight:900;font-size:15px;">${t.back}</div><div style="font-size:12.5px;color:#ddd6fe;margin-top:2px;">${days>=1?t.streak(days)+' · ':''}${t.cta}</div></div>`;
    cont.insertBefore(b, cont.firstChild);
  }catch(e){}
}

// X9 다크모드 토글 (Linear/Apple식) — 시스템 연동 + 수동 토글, localStorage 저장
function toggleTheme(){
  try{
    const next=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
    document.documentElement.setAttribute('data-theme',next);
    localStorage.setItem('lucky_theme',next);
    const b=document.getElementById('theme-toggle'); if(b) b.textContent=next==='dark'?'☀️':'🌙';
  }catch(e){}
}
function _xMountThemeToggle(){
  try{
    if(document.getElementById('theme-toggle')) return;
    const tb=document.createElement('button'); tb.id='theme-toggle'; tb.type='button';
    tb.setAttribute('aria-label','theme'); tb.onclick=toggleTheme;
    tb.textContent=document.documentElement.getAttribute('data-theme')==='dark'?'☀️':'🌙';
    document.body.appendChild(tb);
  }catch(e){}
}

// 홈 소셜프루프 칩 + 보관함 진입 주입
function _xInitHome(){
  try{ _xMountThemeToggle(); }catch(e){}
  try{ _xWelcomeBack(); }catch(e){}
  try{
    const tc=document.querySelector('.trust-chips');
    if(tc && !document.getElementById('home-social')){
      const t=_xT(); const s=document.createElement('div'); s.id='home-social';
      s.style.cssText='margin-top:14px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;';
      s.innerHTML=`<span style="background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);color:#fde68a;font-weight:700;font-size:12px;padding:6px 13px;border-radius:20px;">${t.viewed(_xViewed(1))}</span><button onclick="openCollection()" style="background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);color:#e0e7ff;font-weight:700;font-size:12px;padding:6px 13px;border-radius:20px;cursor:pointer;">${t.coll}</button>`;
      tc.parentNode.insertBefore(s, tc.nextSibling);
    }
  }catch(e){}
}
(function(){ try{ const st=document.createElement('style'); st.textContent='@keyframes sppulse{0%,100%{opacity:1}50%{opacity:.25}}.x-reco-card:hover{transform:translateY(-2px);border-color:var(--gold,#d97706)!important;}.x-coll-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;}'; document.head.appendChild(st); }catch(e){} })();
if(document.readyState!=='loading') _xInitHome(); else document.addEventListener('DOMContentLoaded', _xInitHome);

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
  const birthHourRaw   = (document.getElementById('birth-hour')   || {}).value || '';
  const birthHour      = birthHourRaw !== '' ? parseInt(birthHourRaw) : null;
  const birthMinuteRaw = (document.getElementById('birth-minute') || {}).value || '';
  const birthMinute    = birthMinuteRaw !== '' ? parseInt(birthMinuteRaw) : 0;
  const gender         = (document.querySelector('.gender-btn.active') || {}).dataset?.gender || null;
  const setsCount   = parseInt((document.querySelector('.sets-btn.active') || {}).dataset?.sets || '1');

  // Update loading screen text per category
  const loadCat = window.LUCKY_SELECTED_CAT || 'lucky';
  const loadL = window.LUCKY_LANG || {};
  const loadLang = window.LUCKY_CURRENT_LANG || 'ko';
  const loadGenSub = document.getElementById('txt-gen-sub');
  if (loadGenSub) {
    if (loadCat !== 'lucky') {
      const IDX = {saju:1, love:2, money:3, career:4, achievement:5, gunghap:6};
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
    const cat  = window.LUCKY_SELECTED_CAT || 'lucky';

    if (cat === 'gunghap') {
      const pyEl = document.getElementById('partner-year');
      const pmEl = document.getElementById('partner-month');
      const pdEl = document.getElementById('partner-day');
      const py = parseInt((pyEl||{}).value) || 0;
      const pm = parseInt((pmEl||{}).value) || 0;
      const pd = parseInt((pdEl||{}).value) || 0;
      if (!py || !pm || !pd || py < 1920 || py > 2009) {
        [pyEl, pmEl, pdEl].forEach(el => {
          if (el && !el.value) { el.classList.add('err'); setTimeout(() => el.classList.remove('err'), 1500); }
        });
        if (pyEl) pyEl.focus();
        showScreen('s-home');
        return;
      }
      const dataA = generateLucky(year, month, day, lang, null, null, 0, birthHour, birthMinute, gender);
      const dataB = generateLucky(py, pm, pd, lang, null, null, 0, null, 0, null);
      const gunghapData = calcGunghapData(dataA, dataB);
      dataA.gunghapData  = gunghapData;
      dataA.partnerData  = dataB;
      dataA.sets = [dataA];
      lastResult = dataA;
      applyLangToResults(lastResult);
      renderResults(lastResult);
      showScreen('s-result');
      return;
    }

    const sets = [];
    for (let i = 0; i < setsCount; i++) {
      sets.push(generateLucky(year, month, day, lang, lotteryId, drawDateStr, i, birthHour, birthMinute, gender));
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

function selectGender(g) {
  document.querySelectorAll('.gender-btn').forEach(b => b.classList.toggle('active', b.dataset.gender === g));
}

function toggleBirthTime() {
  const body = document.getElementById('birth-time-body');
  const icon = document.querySelector('#birth-time-toggle .toggle-icon');
  if (!body) return;
  const open = body.style.display !== 'none' && body.style.display !== '';
  body.style.display = open ? 'none' : 'block';
  if (icon) icon.textContent = open ? '▶' : '▼';
}

function toggleNameInput() {
  const body = document.getElementById('name-input-body');
  const icon = document.querySelector('#name-input-toggle .toggle-icon');
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

  // Partner section label (gunghap)
  const partnerLabelEl = document.getElementById('txt-partner-label');
  if (partnerLabelEl) {
    const PARTNER_LBL = {ko:'💑 상대방 생년월일', en:'💑 Partner\'s Birthday', ja:'💑 お相手の生年月日',
      de:'💑 Geburtstag der Partnerin', fr:'💑 Date de naissance du partenaire',
      es:'💑 Fecha de nacimiento del compañero', pt:'💑 Aniversário do parceiro',
      it:'💑 Data di nascita del partner', id:'💑 Tanggal Lahir Pasangan'};
    partnerLabelEl.textContent = PARTNER_LBL[lang] || PARTNER_LBL.en;
  }

  // Gender section labels
  const gLabelEl = document.getElementById('txt-gender-label');
  if (gLabelEl && L.genderLabel) {
    const noteSpan = gLabelEl.querySelector('span');
    gLabelEl.innerHTML = L.genderLabel + (noteSpan ? ` <span style="font-size:11px;font-weight:400;color:var(--text3);">— ${L.genderNote||''}</span>` : '');
  }
  const gMaleEl = document.getElementById('txt-gender-male');
  if (gMaleEl && L.genderMale) gMaleEl.textContent = L.genderMale;
  const gFemEl = document.getElementById('txt-gender-female');
  if (gFemEl && L.genderFemale) gFemEl.textContent = L.genderFemale;

  // Show 진태양시 hint for Korean saju
  const lmtNoteEl = document.getElementById('txt-lmt-note');
  if (lmtNoteEl) {
    if (lang === 'ko') {
      lmtNoteEl.textContent = '⚠ 진태양시(眞太陽時) 보정 자동 적용 — 서울 기준 -32분 (KST → 태양 실시각)';
      lmtNoteEl.style.display = 'block';
    } else {
      lmtNoteEl.style.display = 'none';
    }
  }

  // Populate birth-hour select
  const hourSel = document.getElementById('birth-hour');
  if (hourSel) {
    const placeholder = L.hourSelectPlaceholder || 'No time selected';
    const useKoJizhi = lang === 'ko' || lang === 'ja';
    const KO_JIZHI = [
      '자시(子時) — 23:00~01:00', '축시(丑時) — 01:00~03:00',
      '인시(寅時) — 03:00~05:00', '묘시(卯時) — 05:00~07:00',
      '진시(辰時) — 07:00~09:00', '사시(巳時) — 09:00~11:00',
      '오시(午時) — 11:00~13:00', '미시(未時) — 13:00~15:00',
      '신시(申時) — 15:00~17:00', '유시(酉時) — 17:00~19:00',
      '술시(戌時) — 19:00~21:00', '해시(亥時) — 21:00~23:00',
    ];
    const JA_JIZHI = [
      '子の刻 — 23:00~01:00', '丑の刻 — 01:00~03:00',
      '寅の刻 — 03:00~05:00', '卯の刻 — 05:00~07:00',
      '辰の刻 — 07:00~09:00', '巳の刻 — 09:00~11:00',
      '午の刻 — 11:00~13:00', '未の刻 — 13:00~15:00',
      '申の刻 — 15:00~17:00', '酉の刻 — 17:00~19:00',
      '戌の刻 — 19:00~21:00', '亥の刻 — 21:00~23:00',
    ];
    const currentVal = hourSel.value;
    hourSel.innerHTML = `<option value="">${placeholder}</option>`;
    // All languages: 24-hour format (ko/ja previously used 시진 starts which caused confusion)
    for (let h = 0; h < 24; h++) {
      const opt = document.createElement('option');
      opt.value = h;
      opt.textContent = `${String(h).padStart(2,'0')}시`;
      hourSel.appendChild(opt);
    }
    if (currentVal !== '') hourSel.value = currentVal;
  }

  // Populate minute select (0–59)
  const minSel = document.getElementById('birth-minute');
  if (minSel) {
    const curMin = minSel.value;
    minSel.innerHTML = `<option value="">00분</option>`;
    for (let m = 1; m < 60; m++) {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = `${String(m).padStart(2,'0')}분`;
      minSel.appendChild(opt);
    }
    if (curMin !== '') minSel.value = curMin;
  }

  // 출생 도시 (상승궁/빅3용) — _CITIES 로 채움
  const citySel = document.getElementById('birth-city');
  if (citySel && typeof _CITIES !== 'undefined') {
    const curCity = citySel.value;
    const rLbl = (((window.LUX && (window.LUX[lang]||window.LUX.en)) || {}).rising || {}).cityLabel;
    citySel.innerHTML = `<option value="">🌍 ${rLbl || 'Birth City'}</option>`;
    _CITIES.forEach((c,i)=>{ const opt=document.createElement('option'); opt.value=i; opt.textContent=c[0]; citySel.appendChild(opt); });
    if (curCity !== '') citySel.value = curCity;
  }

  if (L.docTitle) document.title = L.docTitle;

  const url = lang === 'ko' ? 'https://all-lifes.com/lucky/' : `https://all-lifes.com/lucky/?lang=${lang}`;
  const ogImg = `https://all-lifes.com/lucky/og-${lang}.png`;

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
  _applyRouletteI18n(lang); // 🎰 룰렛(8번째 카테고리) 라벨 + 패널 현지화

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

  // Name input section
  if (L.nameInputLabel) setTxt('txt-name-input-label', L.nameInputLabel);
  if (L.nameInputNote)  setTxt('txt-name-input-note',  L.nameInputNote);
  const _namePh = { ko:'이름 (한글)', ja:'お名前（ローマ字）', en:'Name', de:'Name', fr:'Nom', es:'Nombre', pt:'Nome', it:'Nome', id:'Nama' };
  const _pnEl = document.getElementById('person-name');
  if (_pnEl) _pnEl.placeholder = L.nameInputPlaceholder || _namePh[window.LUCKY_CURRENT_LANG] || _namePh.en;

  // Adapt input form for current category selection
  adaptInputForm(window.LUCKY_SELECTED_CAT || 'lucky');
  readUrlParamsAndAutoFill();
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

// ── 편의 기능 초기화 (생일 복원 + 최근 기록 칩) ──────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { _restoreBirthInfo(); _renderHistoryChips(); _renderStreak(); _renderPrivacyNote(); _renderDateLuckTool(); }, 50);
  try { _initInstallPrompt(); } catch(e){}
  try { _maybeAutoQuiz(); } catch(e){}
});
