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

function generateLucky(year, month, day, lang, lotteryId, drawDateStr) {
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
      // Combine: birth lucky at harmony.weight[0]x, draw lucky at harmony.weight[1]x
      const birthPool = s.lucky.flatMap(n => Array(harmony.weight[0]).fill(n));
      const drawPool  = ELEMENT_LUCKY[drawEl].flatMap(n => Array(harmony.weight[1]).fill(n));
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

  const rng = mkRng(seed);
  let mainNums, bonusNums = null;

  if (fmt.digits) {
    mainNums = [];
    for (let i = 0; i < fmt.digits; i++) mainNums.push(Math.floor(rng() * 10));
  } else {
    mainNums = pickBiased(rng, fmt.main.min, fmt.main.max, fmt.main.count, luckyBase);
    if (fmt.bonus) {
      bonusNums = pickBiased(rng, fmt.bonus.min, fmt.bonus.max, fmt.bonus.count, luckyBase);
    }
  }

  return { year, month, day, lang, cultural, colorData, dayData, systemKey, fmt, mainNums, bonusNums, seed, drawEnergy, lotteryId };
}

// ── Render Results ────────────────────────────────────────
function renderResults(data) {
  const L = window.LUCKY_LANG || {};
  const lang = data.lang;

  // Cultural info in hero
  let culturalHtml = '';
  if (data.systemKey === 'saju') {
    const s = data.cultural;
    const si = s.stemIdx, bi = s.branchIdx;
    culturalHtml = `
      <span class="cultural-pill">${STEMS[si]}${BRANCHES[bi]}(${STEM_KO[si]}${BRANCH_KO[bi]})년생</span>
      <span class="cultural-pill">${ZODIAC_KO[bi]}띠</span>
      <span class="cultural-pill">오행: ${s.element}(${ELEMENT_KO[si]})</span>
    `;
  } else if (data.systemKey === 'kyusei') {
    const s = data.cultural;
    culturalHtml = `<span class="cultural-pill">本命星: ${KYUSEI_NAMES[s.star]}</span>
      <span class="cultural-pill">属性: ${KYUSEI_ELEMENTS[s.star]}</span>`;
  } else if (data.systemKey === 'jawanese') {
    const s = data.cultural;
    culturalHtml = `<span class="cultural-pill">Weton: ${PASARAN[s.pasaranIdx]}</span>`;
  } else {
    const s = data.cultural;
    culturalHtml = `<span class="cultural-pill">Life Path: ${s.lpn}</span>`;
  }
  document.getElementById('cultural-info').innerHTML = culturalHtml;

  // Format name
  document.getElementById('lottery-format-name').textContent = data.fmt.name || 'Lucky Numbers';

  // Main balls
  const mainEl = document.getElementById('main-balls');
  mainEl.innerHTML = '';
  if (data.fmt.togel) {
    data.mainNums.forEach((n, i) => {
      const ball = document.createElement('div');
      ball.className = `ball ball-digit`;
      ball.style.animationDelay = `${i * 0.12}s`;
      ball.textContent = n;
      mainEl.appendChild(ball);
    });
    // Show 3D and 2D sub-numbers below
    const digits = data.mainNums;
    const d3 = digits.slice(1).join('');
    const d2 = digits.slice(2).join('');
    const subRow = document.createElement('div');
    subRow.style.cssText = 'margin-top:14px;font-size:13px;color:#78716c;';
    subRow.innerHTML = `<strong>3D:</strong> ${d3} &nbsp;|&nbsp; <strong>2D:</strong> ${d2}`;
    mainEl.parentElement.appendChild(subRow);
  } else {
    const fmtKey = lang === 'ko' ? 'ko' : lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : lang === 'pt' ? 'pt' : lang === 'it' ? 'it' : 'euro';
    data.mainNums.forEach((n, i) => {
      const ball = document.createElement('div');
      ball.className = `ball ${ballClass(n, fmtKey)}`;
      ball.style.animationDelay = `${i * 0.12}s`;
      ball.textContent = n;
      mainEl.appendChild(ball);
    });
  }

  // Bonus balls
  const bonusRow = document.getElementById('bonus-row');
  if (data.bonusNums && data.fmt.bonus) {
    bonusRow.style.display = '';
    document.getElementById('bonus-label').textContent = data.fmt.bonus.label;
    const bonusEl = document.getElementById('bonus-balls');
    bonusEl.innerHTML = '';
    const bKey = lang === 'en' ? 'en-bonus' : 'euro-star';
    data.bonusNums.forEach((n, i) => {
      const ball = document.createElement('div');
      ball.className = `ball sz-sm ${ballClass(n, bKey)}`;
      ball.style.animationDelay = `${(data.mainNums.length + i) * 0.12}s`;
      ball.textContent = n;
      bonusEl.appendChild(ball);
    });
  } else {
    bonusRow.style.display = 'none';
  }

  // Fortune grid
  const dayName = data.dayData ? (data.dayData[lang] || data.dayData.en || '—') : '—';
  const colorName = L.colorNames ? (L.colorNames[data.colorData.en] || data.colorData.en) : data.colorData.en;

  const gridEl = document.getElementById('fortune-grid');
  const luckyColorLabel = L.luckyColorLabel || 'Lucky Color';
  const luckyDayLabel   = L.luckyDayLabel   || 'Lucky Day';
  const systemLabel     = L.systemLabel     || 'System';
  const systemName      = L.systemName      || getSytemName(data.systemKey, lang);

  gridEl.innerHTML = `
    <div class="fortune-item">
      <div class="fortune-item-icon" style="color:${data.colorData.hex}">⬤</div>
      <div class="fortune-item-label">${luckyColorLabel}</div>
      <div class="fortune-item-value" style="color:${data.colorData.hex}">${colorName}</div>
    </div>
    <div class="fortune-item">
      <div class="fortune-item-icon">📅</div>
      <div class="fortune-item-label">${luckyDayLabel}</div>
      <div class="fortune-item-value">${dayName}</div>
    </div>
    <div class="fortune-item">
      <div class="fortune-item-icon">🔮</div>
      <div class="fortune-item-label">${systemLabel}</div>
      <div class="fortune-item-value" style="font-size:12px">${systemName}</div>
    </div>
  `;

  // Fortune message
  const fortunes = L.fortunes;
  if (fortunes && fortunes.length) {
    const msgIdx = Math.floor(mkRng(data.seed + 999)() * fortunes.length);
    document.getElementById('fortune-msg').textContent = fortunes[msgIdx];
  }

  // "Why these numbers?" insight panel
  renderDrawEnergyPanel(data);

  // Share buttons
  renderShareBtns(data);

  // FAQ
  renderFaq();
}

function renderDrawEnergyPanel(data) {
  const existing = document.getElementById('draw-energy-panel');
  if (existing) existing.remove();

  const lang = data.lang;
  const L = window.LUCKY_LANG || {};
  const panel = document.createElement('div');
  panel.id = 'draw-energy-panel';
  panel.style.cssText = 'background:#f0fdf4;border:2px solid #86efac;border-radius:20px;padding:22px;margin-bottom:20px;';

  let html = `<div style="font-size:13px;font-weight:800;color:#15803d;letter-spacing:.5px;margin-bottom:14px;">🔍 ${L.whyTitle||'왜 이 번호인가?'}</div>`;

  if (data.drawEnergy) {
    const de = data.drawEnergy;

    if (de.type === 'saju') {
      const h = de.harmony;
      const birthElName = ELEMENT_KO_NAME[de.birthEl]||de.birthEl;
      const drawElName  = ELEMENT_KO_NAME[de.drawEl]||de.drawEl;
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:14px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${L.birthEnergyLabel||'생년 기운'}</div>
            <div style="font-size:22px;">${de.birthEl}</div>
            <div style="font-size:12px;font-weight:700;color:#1c1917;">${birthElName}</div>
          </div>
          <div style="font-size:24px;text-align:center;">${h.emoji}</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${L.drawEnergyLabel||'추첨일 기운'}</div>
            <div style="font-size:22px;">${de.drawEl}</div>
            <div style="font-size:12px;font-weight:700;color:#1c1917;">${drawElName}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;">
          <strong>${h.rel} (${h.emoji})</strong> — ${h[lang]||h.en}
        </div>`;
    } else if (de.type === 'kyusei') {
      const h = de.harmony;
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:14px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${L.birthEnergyLabel||'本命星'}</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${KYUSEI_NAMES[de.birthStar]||de.birthStar}</div>
          </div>
          <div style="font-size:24px;text-align:center;">${h.emoji}</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${L.drawEnergyLabel||'日星'}</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${KYUSEI_NAMES[de.drawStar]||de.drawStar}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;">
          ${h.ja||h.en}
        </div>`;
    } else if (de.type === 'numerology') {
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:14px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${L.birthEnergyLabel||'Life Path'}</div>
            <div style="font-size:32px;font-weight:900;color:#1e1b4b;">${de.lpn}</div>
          </div>
          <div style="font-size:24px;text-align:center;">✕</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">${L.drawEnergyLabel||'Universal Day'}</div>
            <div style="font-size:32px;font-weight:900;color:#1e1b4b;">${de.udn}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;">
          Life Path ${de.lpn} × Universal Day ${de.udn} — resonance applied to number selection
        </div>`;
    } else if (de.type === 'jawanese') {
      html += `
        <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;margin-bottom:14px;">
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">Weton Lahir</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${de.birthName}</div>
          </div>
          <div style="font-size:24px;text-align:center;">+</div>
          <div style="background:#fff;border-radius:12px;padding:12px;text-align:center;border:1px solid #e7e5e4;">
            <div style="font-size:10px;color:#78716c;font-weight:600;margin-bottom:4px;">Pasaran Togel</div>
            <div style="font-size:18px;font-weight:800;color:#1e1b4b;">${de.drawName}</div>
          </div>
        </div>
        <div style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #bbf7d0;font-size:13px;color:#166534;line-height:1.7;">
          Kombinasi Weton lahir (${de.birthName}) dan pasaran hari pengundian (${de.drawName}) diterapkan pada pemilihan angka.
        </div>`;
    }
  } else {
    // No draw date — show base explanation
    const baseExplain = {
      saju:      { ko:'연주(年柱) 천간에서 오행을 산출해 전통 행운 숫자에 4배 가중치를 적용했습니다. 추첨일을 입력하면 일진(日辰) 에너지까지 결합해 더 정밀한 번호가 생성됩니다.', en:'Birth year element analyzed via Four Pillars. Add draw date for enhanced precision.', ja:'生年の天干から五行を算出し、伝統的な吉数に4倍の重みを適用しました。' },
      kyusei:    { ko:'본명성(本命星)으로 오행을 산출하고 행운 숫자에 가중치를 부여했습니다. 추첨일을 입력하면 일성(日星)과의 상호작용이 반영됩니다.', en:'Nine Star Ki birth star analyzed. Add draw date to incorporate day star interaction.', ja:'本命星の五行から吉数を算出しました。日付を追加すると日星との相互作用が反映されます。' },
      numerology:{ ko:'생년월일 합산으로 생명 경로 수(Life Path Number)를 산출하고 공명 숫자에 가중치를 적용했습니다. 추첨일을 입력하면 그 날의 에너지(UDN)가 결합됩니다.', en:'Life Path Number calculated from birthday. Add draw date to combine Universal Day Number.', ja:'誕生日からライフパスナンバーを算出しました。日付を追加すると宇宙の日数が加わります。' },
      jawanese:  { ko:'생년월일의 파사란(Pasaran)을 산출하고 전통 행운 숫자에 가중치를 적용했습니다. 추첨일을 입력하면 당일 파사란이 결합됩니다.', en:'Birth date Pasaran (Weton) calculated. Add draw date to combine draw day Pasaran.', id:'Pasaran hari lahir dihitung. Tambahkan tanggal undian untuk kombinasi Pasaran hari undian.' },
    };
    const txt = baseExplain[data.systemKey]?.[lang] || baseExplain[data.systemKey]?.en || '';
    html += `<div style="font-size:13px;color:#166534;line-height:1.7;">${txt}</div>`;
  }

  panel.innerHTML = html;

  // Insert before share section
  const shareSection = document.querySelector('.share-section');
  if (shareSection) shareSection.before(panel);
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
  const nums = data.fmt.togel
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

function startGenerate() {
  const input = document.getElementById('birthday-input');
  const val = input.value;
  if (!val) {
    input.focus();
    input.style.borderColor = '#dc2626';
    setTimeout(() => { input.style.borderColor = ''; }, 1500);
    return;
  }
  const [year, month, day] = val.split('-').map(Number);
  const lotteryId  = (document.getElementById('lottery-select')  || {}).value || null;
  const drawDateStr = (document.getElementById('draw-date-input') || {}).value || null;
  showScreen('s-gen');
  setTimeout(() => {
    const lang = window.LUCKY_CURRENT_LANG || 'ko';
    lastResult = generateLucky(year, month, day, lang, lotteryId, drawDateStr);
    applyLangToResults(lastResult);
    renderResults(lastResult);
    showScreen('s-result');
  }, 2400);
}

function resetApp() {
  showScreen('s-home');
  // Clean up togel sub-row if present
  const subRow = document.querySelector('#main-balls + div');
  if (subRow) subRow.remove();
}

// ── applyLang (static text updates) ──────────────────────
function applyLang() {
  const L = window.LUCKY_LANG;
  if (!L) return;
  const lang = window.LUCKY_CURRENT_LANG || 'ko';

  document.documentElement.lang = L.htmlLang || lang;
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

  // Check URL params for direct result share
  const p = new URLSearchParams(location.search);
  if (p.get('y') && p.get('m') && p.get('dy')) {
    const year = parseInt(p.get('y')), month = parseInt(p.get('m')), day = parseInt(p.get('dy'));
    if (year && month && day) {
      document.getElementById('birthday-input').value = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }
  }

  // Send initial height to parent (Worker SSR iframe)
  setTimeout(sendHeight, 300);
  setTimeout(sendHeight, 800);

  // Keep reporting height on any resize
  if (window.ResizeObserver) {
    new ResizeObserver(sendHeight).observe(document.body);
  }
});
