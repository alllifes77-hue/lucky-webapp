// luck-elements.js — 신규 행운요소 5종 9개 언어 콘텐츠
// (바이오리듬·탄생석/탄생화·서양별자리·오늘의 타로·행운의 4요소)
// 언어별 네이티브 생성 + 적대적 검증(워크플로 luck-elements-i18n) 후 정규화 조립.
// 모든 문자열 JSON 호환 더블쿼트 — 아포스트로피 안전. 렌더/결정론은 lucky-app.js.
window.LUX = {
 "ko": {
  "lang": "ko",
  "biorhythm": {
   "title": "바이오리듬",
   "note": "바이오리듬은 태어난 날을 기준으로 신체·감정·지성 세 가지 주기가 파도처럼 오르내린다고 보는 가벼운 엔터테인먼트 운세입니다. 오늘의 흐름을 참고하여 컨디션을 가볍게 살펴보세요.",
   "cycles": {
    "physical": "신체 리듬",
    "emotional": "감정 리듬",
    "intellectual": "지성 리듬"
   },
   "band": {
    "high": "고조기",
    "mid": "전환기",
    "low": "저조기"
   },
   "tipUp": "리듬이 올라갈 때는 미뤄 둔 일에 도전하고, 사람들과 적극적으로 교류해 보세요. 좋은 흐름을 즐기되 과욕은 살짝 내려놓으면 더 좋습니다.",
   "tipDown": "리듬이 내려갈 때는 충분히 자고, 중요한 결정은 잠시 미뤄 두세요. 가벼운 산책이나 스트레칭으로 몸과 마음을 부드럽게 풀어 주면 도움이 됩니다."
  },
  "birthstone": {
   "title": "탄생석 & 탄생화",
   "stoneLabel": "탄생석",
   "flowerLabel": "탄생화",
   "months": [
    {
     "stone": "가넷",
     "flower": "수선화",
     "meaning": "변치 않는 우정과 진실한 마음, 그리고 새로운 시작을 의미합니다."
    },
    {
     "stone": "자수정",
     "flower": "프리지어",
     "meaning": "성실함과 마음의 평화, 맑은 지혜를 상징합니다."
    },
    {
     "stone": "아쿠아마린",
     "flower": "벚꽃",
     "meaning": "젊음과 행복, 그리고 잔잔한 용기를 뜻합니다."
    },
    {
     "stone": "다이아몬드",
     "flower": "데이지",
     "meaning": "영원한 사랑과 순수함, 변함없는 약속을 상징합니다."
    },
    {
     "stone": "에메랄드",
     "flower": "은방울꽃",
     "meaning": "행복과 다시 찾아온 행운, 풍요로운 사랑을 의미합니다."
    },
    {
     "stone": "진주",
     "flower": "장미",
     "meaning": "건강과 순결, 그리고 깊은 애정을 상징합니다."
    },
    {
     "stone": "루비",
     "flower": "참제비고깔",
     "meaning": "열정과 용기, 뜨거운 사랑을 뜻합니다."
    },
    {
     "stone": "페리도트",
     "flower": "글라디올러스",
     "meaning": "부부의 행복과 화목, 마음의 안정을 의미합니다."
    },
    {
     "stone": "사파이어",
     "flower": "아스터(과꽃)",
     "meaning": "진실과 성실, 변치 않는 믿음을 상징합니다."
    },
    {
     "stone": "오팔",
     "flower": "메리골드",
     "meaning": "희망과 순수한 마음, 행운을 뜻합니다."
    },
    {
     "stone": "토파즈",
     "flower": "국화",
     "meaning": "우정과 인내, 따뜻한 마음을 상징합니다."
    },
    {
     "stone": "터키석",
     "flower": "포인세티아",
     "meaning": "성공과 번영, 그리고 행운을 부르는 기운을 의미합니다."
    }
   ]
  },
  "tarot": {
   "title": "타로 메이저 아르카나 22장",
   "uprightLabel": "정방향",
   "intro": "메이저 아르카나 22장은 인생의 큰 흐름과 마음의 여정을 보여 주는 상징입니다. 아래 키워드는 정방향을 기준으로 한 가벼운 엔터테인먼트 풀이이니, 오늘의 마음을 비추는 거울처럼 즐겨 보세요.",
   "cards": [
    {
     "name": "0. 바보",
     "keyword": "새로운 시작",
     "line": "두려움 없이 첫걸음을 내딛는 순수한 모험의 기운입니다."
    },
    {
     "name": "1. 마법사",
     "keyword": "창조와 실행",
     "line": "가진 재능을 현실로 펼쳐 낼 준비가 된 때입니다."
    },
    {
     "name": "2. 여사제",
     "keyword": "직관과 지혜",
     "line": "마음 깊은 곳의 목소리에 귀 기울여 보세요."
    },
    {
     "name": "3. 여황제",
     "keyword": "풍요와 사랑",
     "line": "따뜻한 보살핌과 결실이 무르익는 시기입니다."
    },
    {
     "name": "4. 황제",
     "keyword": "안정과 책임",
     "line": "든든한 기반 위에서 주도적으로 이끌어 갈 때입니다."
    },
    {
     "name": "5. 교황",
     "keyword": "전통과 가르침",
     "line": "신뢰할 수 있는 조언과 배움이 길을 밝혀 줍니다."
    },
    {
     "name": "6. 연인",
     "keyword": "사랑과 선택",
     "line": "마음을 따르는 소중한 인연과 결정의 순간입니다."
    },
    {
     "name": "7. 전차",
     "keyword": "전진과 의지",
     "line": "흔들림 없는 의지로 목표를 향해 나아갑니다."
    },
    {
     "name": "8. 힘",
     "keyword": "용기와 인내",
     "line": "부드러운 마음의 힘으로 어려움을 다스립니다."
    },
    {
     "name": "9. 은둔자",
     "keyword": "성찰과 탐구",
     "line": "잠시 멈추어 내면을 들여다보는 고요한 시간입니다."
    },
    {
     "name": "10. 운명의 수레바퀴",
     "keyword": "전환과 기회",
     "line": "운의 흐름이 새롭게 돌아가는 변화의 순간입니다."
    },
    {
     "name": "11. 정의",
     "keyword": "균형과 공정",
     "line": "올바른 판단과 정직함이 좋은 결과로 이어집니다."
    },
    {
     "name": "12. 매달린 사람",
     "keyword": "성찰과 내려놓음",
     "line": "관점을 바꾸어 보면 새로운 길이 보입니다."
    },
    {
     "name": "13. 죽음",
     "keyword": "끝과 새 출발",
     "line": "낡은 것을 마무리하고 새로운 시작을 맞이합니다."
    },
    {
     "name": "14. 절제",
     "keyword": "조화와 균형",
     "line": "서두르지 않는 절제가 마음의 평온을 가져옵니다."
    },
    {
     "name": "15. 악마",
     "keyword": "유혹과 집착",
     "line": "얽매인 마음을 살피고 가볍게 풀어낼 때입니다."
    },
    {
     "name": "16. 탑",
     "keyword": "변화와 각성",
     "line": "예상치 못한 변화가 새로운 깨달음을 줍니다."
    },
    {
     "name": "17. 별",
     "keyword": "희망과 영감",
     "line": "맑은 희망이 마음을 환하게 비추는 시기입니다."
    },
    {
     "name": "18. 달",
     "keyword": "직관과 상상",
     "line": "어렴풋한 마음을 차분히 들여다보면 길이 보입니다."
    },
    {
     "name": "19. 태양",
     "keyword": "기쁨과 성취",
     "line": "밝은 에너지가 가득한 행복하고 성공적인 때입니다."
    },
    {
     "name": "20. 심판",
     "keyword": "각성과 부활",
     "line": "지난날을 돌아보며 새롭게 거듭나는 순간입니다."
    },
    {
     "name": "21. 세계",
     "keyword": "완성과 성취",
     "line": "하나의 여정이 아름답게 완결되는 충만한 시기입니다."
    }
   ]
  },
  "luckyFour": {
   "title": "오늘의 행운 네 가지",
   "colorLabel": "행운의 색",
   "numberLabel": "행운의 숫자",
   "directionLabel": "행운의 방위",
   "timeLabel": "행운의 시간",
   "directions": [
    "북",
    "북동",
    "동",
    "남동",
    "남",
    "남서",
    "서",
    "북서"
   ],
   "tip": "행운의 색을 소품이나 옷차림에 살짝 더하고, 중요한 일은 행운의 시간대에 맞추어 보세요. 외출이나 약속이 있다면 행운의 방위를 가볍게 참고하면 기분 좋은 하루를 보낼 수 있습니다."
  },
  "sunSign": {
   "title": "별자리 운세",
   "overallLabel": "총운",
   "loveLabel": "애정운",
   "moneyLabel": "금전운",
   "luckyColorLabel": "행운의 색",
   "luckyNumberLabel": "행운의 숫자",
   "elementLabel": "원소",
   "signs": [
    {
     "name": "양자리",
     "range": "3월 21일 – 4월 19일",
     "element": "불",
     "trait": "열정적이고 도전을 두려워하지 않는 개척자입니다."
    },
    {
     "name": "황소자리",
     "range": "4월 20일 – 5월 20일",
     "element": "흙",
     "trait": "꾸준하고 현실적이며 안정과 풍요를 추구합니다."
    },
    {
     "name": "쌍둥이자리",
     "range": "5월 21일 – 6월 20일",
     "element": "바람",
     "trait": "호기심 많고 재치 있으며 소통에 능합니다."
    },
    {
     "name": "게자리",
     "range": "6월 21일 – 7월 22일",
     "element": "물",
     "trait": "감수성이 풍부하고 가족과 정을 소중히 여깁니다."
    },
    {
     "name": "사자자리",
     "range": "7월 23일 – 8월 22일",
     "element": "불",
     "trait": "당당하고 너그러우며 타고난 리더십을 지녔습니다."
    },
    {
     "name": "처녀자리",
     "range": "8월 23일 – 9월 22일",
     "element": "흙",
     "trait": "꼼꼼하고 분석적이며 완벽을 추구합니다."
    },
    {
     "name": "천칭자리",
     "range": "9월 23일 – 10월 22일",
     "element": "바람",
     "trait": "조화와 균형을 사랑하고 사교성이 뛰어납니다."
    },
    {
     "name": "전갈자리",
     "range": "10월 23일 – 11월 21일",
     "element": "물",
     "trait": "집중력이 강하고 깊이 있는 통찰을 지녔습니다."
    },
    {
     "name": "사수자리",
     "range": "11월 22일 – 12월 21일",
     "element": "불",
     "trait": "자유롭고 낙천적이며 모험과 배움을 즐깁니다."
    },
    {
     "name": "염소자리",
     "range": "12월 22일 – 1월 19일",
     "element": "흙",
     "trait": "성실하고 책임감이 강하며 목표를 향해 묵묵히 나아갑니다."
    },
    {
     "name": "물병자리",
     "range": "1월 20일 – 2월 18일",
     "element": "바람",
     "trait": "독창적이고 자유로운 사고로 새로움을 추구합니다."
    },
    {
     "name": "물고기자리",
     "range": "2월 19일 – 3월 20일",
     "element": "물",
     "trait": "따뜻하고 감성적이며 상상력이 풍부합니다."
    }
   ],
   "daily": [
    "오늘은 마음에 여유를 두면 뜻밖의 좋은 흐름이 찾아옵니다. 작은 일에도 감사하는 마음을 가져 보세요.",
    "진심 어린 한마디가 관계를 한층 따뜻하게 만듭니다. 먼저 다가가는 용기를 내어 보세요.",
    "충동적인 지출보다 계획적인 소비가 어울리는 날입니다. 작은 절약이 든든한 여유로 돌아옵니다.",
    "차근차근 쌓아 온 노력이 인정받기 시작합니다. 꾸준함을 잃지 마세요.",
    "가벼운 산책이나 스트레칭으로 몸과 마음을 부드럽게 풀어 주세요. 충분한 휴식이 활력을 되찾아 줍니다.",
    "오늘 하루, 자신을 믿고 한 걸음 나아가면 좋은 기운이 함께합니다."
   ]
  }
 },
 "en": {
  "lang": "en",
  "biorhythm": {
   "title": "Your Biorhythm Today",
   "note": "Biorhythm theory suggests three natural cycles — physical, emotional, and intellectual — rise and fall from your birth date, gently shaping each day.",
   "cycles": {
    "physical": "Physical",
    "emotional": "Emotional",
    "intellectual": "Intellectual"
   },
   "band": {
    "high": "Riding high",
    "mid": "Steady and balanced",
    "low": "Resting low"
   },
   "tipUp": "Your energy is peaking, so this is a wonderful day to take initiative and tackle the things you have been putting off.",
   "tipDown": "Your energy is dipping, so be kind to yourself, slow down, and save the big decisions for another day."
  },
  "birthstone": {
   "title": "Birthstone & Birth Flower",
   "stoneLabel": "Birthstone",
   "flowerLabel": "Birth Flower",
   "months": [
    {
     "stone": "Garnet",
     "flower": "Carnation",
     "meaning": "Steadfast trust and a heart full of deep, loyal love."
    },
    {
     "stone": "Amethyst",
     "flower": "Violet",
     "meaning": "Inner calm, clear thinking, and quiet, faithful devotion."
    },
    {
     "stone": "Aquamarine",
     "flower": "Daffodil",
     "meaning": "Fresh beginnings, courage, and bright new hope."
    },
    {
     "stone": "Diamond",
     "flower": "Daisy",
     "meaning": "Enduring strength and pure, innocent affection."
    },
    {
     "stone": "Emerald",
     "flower": "Lily of the Valley",
     "meaning": "Renewal, good fortune, and a return of happiness."
    },
    {
     "stone": "Pearl",
     "flower": "Rose",
     "meaning": "Grace, sincerity, and love expressed from the heart."
    },
    {
     "stone": "Ruby",
     "flower": "Larkspur",
     "meaning": "Passion, vitality, and an open, lighthearted spirit."
    },
    {
     "stone": "Peridot",
     "flower": "Gladiolus",
     "meaning": "Warmth, strength of character, and genuine remembrance."
    },
    {
     "stone": "Sapphire",
     "flower": "Aster",
     "meaning": "Wisdom, loyalty, and a love that quietly endures."
    },
    {
     "stone": "Opal",
     "flower": "Marigold",
     "meaning": "Creativity, warmth, and a comforting sense of hope."
    },
    {
     "stone": "Topaz",
     "flower": "Chrysanthemum",
     "meaning": "Friendship, joy, and honest, cheerful affection."
    },
    {
     "stone": "Turquoise",
     "flower": "Narcissus",
     "meaning": "Good fortune, protection, and faithful kindness."
    }
   ]
  },
  "tarot": {
   "title": "Today's Tarot Card",
   "uprightLabel": "Upright",
   "intro": "Take a breath, focus on your day ahead, and see which card the deck has drawn for you.",
   "cards": [
    {
     "name": "The Fool",
     "keyword": "New Beginnings",
     "line": "A fresh adventure is calling — step forward with an open, trusting heart."
    },
    {
     "name": "The Magician",
     "keyword": "Manifestation",
     "line": "You have all the tools you need; focus your intention and make it real."
    },
    {
     "name": "The High Priestess",
     "keyword": "Intuition",
     "line": "Listen to your inner voice today — it knows more than it lets on."
    },
    {
     "name": "The Empress",
     "keyword": "Abundance",
     "line": "Nurture what you love and watch it blossom into something beautiful."
    },
    {
     "name": "The Emperor",
     "keyword": "Structure",
     "line": "A little order and steady leadership bring stability to your day."
    },
    {
     "name": "The Hierophant",
     "keyword": "Tradition",
     "line": "Lean on trusted wisdom or a mentor's guidance to find your footing."
    },
    {
     "name": "The Lovers",
     "keyword": "Connection",
     "line": "Harmony and heartfelt choices bring you closer to someone special."
    },
    {
     "name": "The Chariot",
     "keyword": "Determination",
     "line": "Stay focused and keep moving — your willpower carries you to victory."
    },
    {
     "name": "Strength",
     "keyword": "Inner Courage",
     "line": "Gentle patience and quiet confidence overcome any challenge today."
    },
    {
     "name": "The Hermit",
     "keyword": "Reflection",
     "line": "A quiet moment alone brings the clarity you have been seeking."
    },
    {
     "name": "Wheel of Fortune",
     "keyword": "Lucky Turn",
     "line": "Fortune is turning in your favor — welcome the change with open arms."
    },
    {
     "name": "Justice",
     "keyword": "Fairness",
     "line": "Honesty and balance guide you toward the right decision today."
    },
    {
     "name": "The Hanged Man",
     "keyword": "New Perspective",
     "line": "Pause and see things from a fresh angle — patience reveals the answer."
    },
    {
     "name": "Death",
     "keyword": "Transformation",
     "line": "Let go of what no longer serves you to make room for something new."
    },
    {
     "name": "Temperance",
     "keyword": "Balance",
     "line": "A calm, measured approach brings harmony to everything you touch."
    },
    {
     "name": "The Devil",
     "keyword": "Release",
     "line": "Notice what holds you back, and gently free yourself from old habits."
    },
    {
     "name": "The Tower",
     "keyword": "Sudden Change",
     "line": "An unexpected shift clears the way for a stronger, truer foundation."
    },
    {
     "name": "The Star",
     "keyword": "Hope",
     "line": "Keep your hopes high — brighter days and gentle healing are on the way."
    },
    {
     "name": "The Moon",
     "keyword": "Imagination",
     "line": "Trust your dreams and intuition, even when the path feels unclear."
    },
    {
     "name": "The Sun",
     "keyword": "Joy",
     "line": "Warmth, success, and pure happiness light up your day — enjoy it fully."
    },
    {
     "name": "Judgement",
     "keyword": "Renewal",
     "line": "A meaningful awakening invites you to rise and embrace a new chapter."
    },
    {
     "name": "The World",
     "keyword": "Fulfillment",
     "line": "A cycle comes to a joyful close — celebrate how far you have come."
    }
   ]
  },
  "luckyFour": {
   "title": "Your Four Lucky Charms",
   "colorLabel": "Lucky Color",
   "numberLabel": "Lucky Number",
   "directionLabel": "Lucky Direction",
   "timeLabel": "Lucky Time",
   "directions": [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest"
   ],
   "tip": "Wear a touch of today's lucky color and head in your lucky direction during your lucky hour to give the day a gentle boost."
  },
  "sunSign": {
   "title": "Your Sun Sign Horoscope",
   "overallLabel": "Overall",
   "loveLabel": "Love",
   "moneyLabel": "Money",
   "luckyColorLabel": "Lucky Color",
   "luckyNumberLabel": "Lucky Number",
   "elementLabel": "Element",
   "signs": [
    {
     "name": "Aries",
     "range": "Mar 21 – Apr 19",
     "element": "Fire",
     "trait": "Bold, energetic, and a natural-born pioneer."
    },
    {
     "name": "Taurus",
     "range": "Apr 20 – May 20",
     "element": "Earth",
     "trait": "Patient, reliable, and quietly devoted."
    },
    {
     "name": "Gemini",
     "range": "May 21 – Jun 20",
     "element": "Air",
     "trait": "Curious, witty, and wonderfully adaptable."
    },
    {
     "name": "Cancer",
     "range": "Jun 21 – Jul 22",
     "element": "Water",
     "trait": "Caring, intuitive, and deeply loyal."
    },
    {
     "name": "Leo",
     "range": "Jul 23 – Aug 22",
     "element": "Fire",
     "trait": "Warm, confident, and generous of spirit."
    },
    {
     "name": "Virgo",
     "range": "Aug 23 – Sep 22",
     "element": "Earth",
     "trait": "Thoughtful, precise, and genuinely helpful."
    },
    {
     "name": "Libra",
     "range": "Sep 23 – Oct 22",
     "element": "Air",
     "trait": "Charming, fair-minded, and a lover of harmony."
    },
    {
     "name": "Scorpio",
     "range": "Oct 23 – Nov 21",
     "element": "Water",
     "trait": "Passionate, perceptive, and fiercely determined."
    },
    {
     "name": "Sagittarius",
     "range": "Nov 22 – Dec 21",
     "element": "Fire",
     "trait": "Adventurous, optimistic, and free-spirited."
    },
    {
     "name": "Capricorn",
     "range": "Dec 22 – Jan 19",
     "element": "Earth",
     "trait": "Ambitious, disciplined, and steadily resilient."
    },
    {
     "name": "Aquarius",
     "range": "Jan 20 – Feb 18",
     "element": "Air",
     "trait": "Original, open-minded, and a true visionary."
    },
    {
     "name": "Pisces",
     "range": "Feb 19 – Mar 20",
     "element": "Water",
     "trait": "Compassionate, imaginative, and gently intuitive."
    }
   ],
   "daily": [
    "A door you thought was closed quietly opens today, so stay alert and welcome the fresh opportunity that comes your way.",
    "Your warm energy draws good people closer today, and a kind word from you may brighten someone's whole day.",
    "Trust the small spark of intuition you feel this morning — it is gently pointing you toward something genuinely good.",
    "Today rewards patience over haste, so take steady steps and let the day's good fortune unfold at its own pace.",
    "A pleasant surprise is waiting in the ordinary moments, so keep your heart open and notice the little joys around you.",
    "Your hard work is quietly paying off, and today you may finally see a hopeful sign that brighter days are ahead."
   ]
  }
 },
 "ja": {
  "lang": "ja",
  "biorhythm": {
   "title": "バイオリズム",
   "note": "バイオリズムは、生年月日を起点とした身体・感情・知性の3つの周期から、今日のコンディションの傾向をやさしく読み解く娯楽です。占いとして気軽にお楽しみください。",
   "cycles": {
    "physical": "身体リズム",
    "emotional": "感情リズム",
    "intellectual": "知性リズム"
   },
   "band": {
    "high": "高調期",
    "mid": "安定期",
    "low": "充電期"
   },
   "tipUp": "波が上向きのときは、心も体も軽やかです。気になっていたことに一歩踏み出してみましょう。",
   "tipDown": "波が下向きのときは、無理をしないのが一番。十分な休息で次の高まりに備えましょう。"
  },
  "birthstone": {
   "title": "誕生石・誕生花",
   "stoneLabel": "誕生石",
   "flowerLabel": "誕生花",
   "months": [
    {
     "stone": "ガーネット",
     "flower": "スイセン",
     "meaning": "真実の友情と変わらぬ心を象徴します。"
    },
    {
     "stone": "アメジスト",
     "flower": "ウメ",
     "meaning": "誠実さと心の落ち着きをもたらします。"
    },
    {
     "stone": "アクアマリン",
     "flower": "サクラ",
     "meaning": "穏やかな勇気と聡明さを表します。"
    },
    {
     "stone": "ダイヤモンド",
     "flower": "サクラソウ",
     "meaning": "永遠の愛と清らかな強さの象徴です。"
    },
    {
     "stone": "エメラルド",
     "flower": "スズラン",
     "meaning": "幸福と再生、豊かな実りを願う石です。"
    },
    {
     "stone": "パール",
     "flower": "バラ",
     "meaning": "健やかさと気品、純粋な心を表します。"
    },
    {
     "stone": "ルビー",
     "flower": "スイレン",
     "meaning": "情熱と勝利、燃えるような生命力の象徴です。"
    },
    {
     "stone": "ペリドット",
     "flower": "ヒマワリ",
     "meaning": "前向きな心と夫婦の幸福を象徴します。"
    },
    {
     "stone": "サファイア",
     "flower": "リンドウ",
     "meaning": "誠実と慈愛、深い信頼を表します。"
    },
    {
     "stone": "オパール",
     "flower": "キンモクセイ",
     "meaning": "希望と幸運を運ぶ、移ろう輝きの石です。"
    },
    {
     "stone": "トパーズ",
     "flower": "キク",
     "meaning": "希望と友情、心の豊かさを象徴します。"
    },
    {
     "stone": "ターコイズ",
     "flower": "ポインセチア",
     "meaning": "成功と幸運、健やかさを願う石です。"
    }
   ]
  },
  "tarot": {
   "title": "タロット 大アルカナ",
   "uprightLabel": "正位置",
   "intro": "大アルカナ22枚は、人生のさまざまな場面を象徴するカードです。今日のあなたへのやさしいメッセージとして、気軽にお楽しみください。",
   "cards": [
    {
     "name": "愚者",
     "keyword": "始まり",
     "line": "まっさらな心で、新しい一歩を踏み出すとき。"
    },
    {
     "name": "魔術師",
     "keyword": "創造",
     "line": "持っている力を活かせば、望みは形になります。"
    },
    {
     "name": "女教皇",
     "keyword": "直感",
     "line": "静かな心の声に、そっと耳を傾けてみましょう。"
    },
    {
     "name": "女帝",
     "keyword": "豊かさ",
     "line": "愛情と実りに満ちた、穏やかな時間が訪れます。"
    },
    {
     "name": "皇帝",
     "keyword": "安定",
     "line": "確かな意志と行動が、揺るがない基盤を築きます。"
    },
    {
     "name": "教皇",
     "keyword": "導き",
     "line": "信頼できる人の助言が、よい道しるべになります。"
    },
    {
     "name": "恋人",
     "keyword": "選択",
     "line": "心が惹かれる方へ。素直な気持ちが鍵です。"
    },
    {
     "name": "戦車",
     "keyword": "前進",
     "line": "迷いを手放し、前へ進む勇気が実を結びます。"
    },
    {
     "name": "力",
     "keyword": "勇気",
     "line": "やさしさと内なる強さで、困難をやわらげます。"
    },
    {
     "name": "隠者",
     "keyword": "内省",
     "line": "ひとりの時間が、大切な答えを照らしてくれます。"
    },
    {
     "name": "運命の輪",
     "keyword": "転機",
     "line": "流れが動き出すとき。変化を前向きに受け入れて。"
    },
    {
     "name": "正義",
     "keyword": "公正",
     "line": "誠実なふるまいが、納得のいく結果を導きます。"
    },
    {
     "name": "吊るされた男",
     "keyword": "視点",
     "line": "立ち止まり、見方を変えると新しい発見が。"
    },
    {
     "name": "死神",
     "keyword": "再生",
     "line": "ひとつの区切り。次の始まりへと続く道です。"
    },
    {
     "name": "節制",
     "keyword": "調和",
     "line": "心地よいバランスが、穏やかな日々を運びます。"
    },
    {
     "name": "悪魔",
     "keyword": "気づき",
     "line": "縛られている思い込みに、そっと気づくとき。"
    },
    {
     "name": "塔",
     "keyword": "変化",
     "line": "思いがけない変化も、新しい景色への入り口に。"
    },
    {
     "name": "星",
     "keyword": "希望",
     "line": "明るい希望の光が、あなたの未来を照らします。"
    },
    {
     "name": "月",
     "keyword": "想像",
     "line": "おぼろげな気持ちも、やがて輪郭を結びます。"
    },
    {
     "name": "太陽",
     "keyword": "喜び",
     "line": "晴れやかな笑顔があふれる、幸せな一日に。"
    },
    {
     "name": "審判",
     "keyword": "再出発",
     "line": "新たな目覚めのとき。前向きな決意が芽生えます。"
    },
    {
     "name": "世界",
     "keyword": "達成",
     "line": "ひとつの完成。満ち足りた喜びが訪れます。"
    }
   ]
  },
  "luckyFour": {
   "title": "今日のラッキー要素",
   "colorLabel": "ラッキーカラー",
   "numberLabel": "ラッキーナンバー",
   "directionLabel": "ラッキー方位",
   "timeLabel": "ラッキータイム",
   "directions": [
    "北",
    "北東",
    "東",
    "南東",
    "南",
    "南西",
    "西",
    "北西"
   ],
   "tip": "ラッキーカラーを小物に取り入れたり、吉方位へ少し足を運んだりすると、運気がやさしく後押しされます。気軽に楽しんでみてください。"
  },
  "sunSign": {
   "title": "12星座占い",
   "overallLabel": "総合運",
   "loveLabel": "恋愛運",
   "moneyLabel": "金運",
   "luckyColorLabel": "ラッキーカラー",
   "luckyNumberLabel": "ラッキーナンバー",
   "elementLabel": "エレメント",
   "signs": [
    {
     "name": "牡羊座",
     "range": "3月21日〜4月19日",
     "element": "火",
     "trait": "情熱的で行動力にあふれ、まっすぐに突き進む開拓者です。"
    },
    {
     "name": "牡牛座",
     "range": "4月20日〜5月20日",
     "element": "地",
     "trait": "おだやかで粘り強く、美しいものと安定を愛します。"
    },
    {
     "name": "双子座",
     "range": "5月21日〜6月20日",
     "element": "風",
     "trait": "好奇心旺盛で機転がきき、会話と情報を楽しみます。"
    },
    {
     "name": "蟹座",
     "range": "6月21日〜7月22日",
     "element": "水",
     "trait": "情に厚く面倒見がよく、家庭や仲間を大切にします。"
    },
    {
     "name": "獅子座",
     "range": "7月23日〜8月22日",
     "element": "火",
     "trait": "華やかで堂々とし、人を惹きつける輝きを放ちます。"
    },
    {
     "name": "乙女座",
     "range": "8月23日〜9月22日",
     "element": "地",
     "trait": "繊細で実直、細やかな気配りと分析力に優れます。"
    },
    {
     "name": "天秤座",
     "range": "9月23日〜10月22日",
     "element": "風",
     "trait": "調和を愛し、公平でバランス感覚に長けた社交家です。"
    },
    {
     "name": "蠍座",
     "range": "10月23日〜11月21日",
     "element": "水",
     "trait": "情熱と一途さを秘め、深い洞察力をもつ人です。"
    },
    {
     "name": "射手座",
     "range": "11月22日〜12月21日",
     "element": "火",
     "trait": "自由を愛し、好奇心と冒険心で世界を広げます。"
    },
    {
     "name": "山羊座",
     "range": "12月22日〜1月19日",
     "element": "地",
     "trait": "堅実で責任感が強く、こつこつと目標を達成します。"
    },
    {
     "name": "水瓶座",
     "range": "1月20日〜2月18日",
     "element": "風",
     "trait": "独創的で自由な発想をもち、未来を見据える人です。"
    },
    {
     "name": "魚座",
     "range": "2月19日〜3月20日",
     "element": "水",
     "trait": "やさしく感受性豊かで、想像力と思いやりにあふれます。"
    }
   ],
   "daily": [
    "今日は心の余裕が、よいご縁や発見を引き寄せてくれそうです。",
    "焦らず自分のペースを大切にすると、物事がなめらかに進みます。",
    "ふとした親切が、思いがけない幸運となって返ってきそうです。",
    "直感がさえる一日。気になったことには素直に従ってみましょう。",
    "小さな一歩が、明日への大きな前進につながっていきます。",
    "笑顔とあいさつが、あなたの周りを明るく照らしてくれます。"
   ]
  }
 },
 "de": {
  "lang": "de",
  "biorhythm": {
   "title": "Biorhythmus",
   "note": "Der Biorhythmus beschreibt drei natürliche Zyklen, die ab Ihrem Geburtstag schwingen. Verstehen Sie ihn als unterhaltsame Orientierung, nicht als feste Vorhersage.",
   "cycles": {
    "physical": "Körperlicher Zyklus",
    "emotional": "Emotionaler Zyklus",
    "intellectual": "Geistiger Zyklus"
   },
   "band": {
    "high": "Hochphase",
    "mid": "Übergangsphase",
    "low": "Ruhephase"
   },
   "tipUp": "An aufsteigenden Tagen fällt Ihnen Initiative leicht — planen Sie Wichtiges und Anspruchsvolles bewusst hierhin.",
   "tipDown": "An absteigenden Tagen lohnt sich Geduld — pflegen Sie Routinen, schlafen Sie ausreichend und seien Sie nachsichtig mit sich."
  },
  "birthstone": {
   "title": "Geburtsstein & Geburtsblume",
   "stoneLabel": "Geburtsstein",
   "flowerLabel": "Geburtsblume",
   "months": [
    {
     "stone": "Granat",
     "flower": "Schneeglöckchen",
     "meaning": "Beständigkeit, Schutz und ein warmes, treues Herz."
    },
    {
     "stone": "Amethyst",
     "flower": "Veilchen",
     "meaning": "Innere Ruhe, Klarheit und besonnene Weisheit."
    },
    {
     "stone": "Aquamarin",
     "flower": "Narzisse",
     "meaning": "Neuanfang, Mut und befreiende Leichtigkeit."
    },
    {
     "stone": "Diamant",
     "flower": "Gänseblümchen",
     "meaning": "Reinheit, Stärke und beständige Liebe."
    },
    {
     "stone": "Smaragd",
     "flower": "Maiglöckchen",
     "meaning": "Hoffnung, Wachstum und glückliche Erneuerung."
    },
    {
     "stone": "Perle",
     "flower": "Rose",
     "meaning": "Anmut, Reinheit und tiefe, aufrichtige Zuneigung."
    },
    {
     "stone": "Rubin",
     "flower": "Rittersporn",
     "meaning": "Leidenschaft, Lebenskraft und mutige Entschlossenheit."
    },
    {
     "stone": "Peridot",
     "flower": "Gladiole",
     "meaning": "Charakterstärke, Aufrichtigkeit und harmonisches Glück."
    },
    {
     "stone": "Saphir",
     "flower": "Aster",
     "meaning": "Treue, Weisheit und innerer Frieden."
    },
    {
     "stone": "Opal",
     "flower": "Ringelblume",
     "meaning": "Inspiration, Fantasie und schillernde Vielfalt."
    },
    {
     "stone": "Topas",
     "flower": "Chrysantheme",
     "meaning": "Freundschaft, Wärme und beständige Zuversicht."
    },
    {
     "stone": "Türkis",
     "flower": "Stechpalme",
     "meaning": "Glück, Schutz und gelassene Zufriedenheit."
    }
   ]
  },
  "tarot": {
   "title": "Tarot — Die Große Arkana",
   "uprightLabel": "Aufrecht",
   "intro": "Die 22 Karten der Großen Arkana erzählen eine symbolische Reise durchs Leben. Lassen Sie sich davon spielerisch inspirieren — als Anstoß zum Nachdenken, nicht als feste Prophezeiung.",
   "cards": [
    {
     "name": "Der Narr",
     "keyword": "Neubeginn",
     "line": "Ein unbeschwerter Aufbruch lädt Sie ein, dem Leben offen und neugierig zu begegnen."
    },
    {
     "name": "Der Magier",
     "keyword": "Schöpferkraft",
     "line": "Sie haben alle Mittel in der Hand — vertrauen Sie auf Ihr Können und Ihren Willen."
    },
    {
     "name": "Die Hohepriesterin",
     "keyword": "Intuition",
     "line": "Ihre innere Stimme weiß mehr, als Worte sagen — hören Sie still in sich hinein."
    },
    {
     "name": "Die Herrscherin",
     "keyword": "Fülle",
     "line": "Eine Zeit des Wachstums und der Fürsorge — pflegen Sie, was Ihnen am Herzen liegt."
    },
    {
     "name": "Der Herrscher",
     "keyword": "Struktur",
     "line": "Klarheit und Verlässlichkeit geben Ihnen jetzt ein starkes Fundament."
    },
    {
     "name": "Der Hierophant",
     "keyword": "Tradition",
     "line": "Bewährtes Wissen und gute Ratgeber weisen Ihnen einen sicheren Weg."
    },
    {
     "name": "Die Liebenden",
     "keyword": "Verbindung",
     "line": "Eine Herzensentscheidung steht an — folgen Sie dem, was sich aufrichtig anfühlt."
    },
    {
     "name": "Der Wagen",
     "keyword": "Willenskraft",
     "line": "Mit Fokus und Entschlossenheit bringen Sie Ihre Ziele voran."
    },
    {
     "name": "Die Kraft",
     "keyword": "Sanfte Stärke",
     "line": "Wahre Stärke zeigt sich in Geduld und Mitgefühl — auch mit sich selbst."
    },
    {
     "name": "Der Eremit",
     "keyword": "Einkehr",
     "line": "Ein Moment der Ruhe schenkt Ihnen wertvolle innere Klarheit."
    },
    {
     "name": "Das Rad des Schicksals",
     "keyword": "Wandel",
     "line": "Das Leben dreht sich weiter — gute Wendungen sind in Bewegung."
    },
    {
     "name": "Die Gerechtigkeit",
     "keyword": "Ausgleich",
     "line": "Ehrlichkeit und Fairness führen zu einem stimmigen Gleichgewicht."
    },
    {
     "name": "Der Gehängte",
     "keyword": "Perspektivwechsel",
     "line": "Ein anderer Blickwinkel öffnet überraschend neue Möglichkeiten."
    },
    {
     "name": "Der Tod",
     "keyword": "Wandlung",
     "line": "Ein Abschnitt geht zu Ende, damit etwas Frisches beginnen kann."
    },
    {
     "name": "Die Mäßigkeit",
     "keyword": "Harmonie",
     "line": "Mit Geduld und Maß finden Sie zu einem gesunden Gleichgewicht."
    },
    {
     "name": "Der Teufel",
     "keyword": "Loslösung",
     "line": "Erkennen Sie alte Muster — Sie haben die Freiheit, sich zu lösen."
    },
    {
     "name": "Der Turm",
     "keyword": "Befreiung",
     "line": "Ein plötzlicher Umbruch macht Platz für einen ehrlichen Neuanfang."
    },
    {
     "name": "Der Stern",
     "keyword": "Hoffnung",
     "line": "Ein sanftes Licht der Zuversicht begleitet Sie durch diese Zeit."
    },
    {
     "name": "Der Mond",
     "keyword": "Träume",
     "line": "Gefühle und Fantasie melden sich — vertrauen Sie behutsam Ihrer Ahnung."
    },
    {
     "name": "Die Sonne",
     "keyword": "Lebensfreude",
     "line": "Wärme, Klarheit und Freude erhellen Ihren Weg."
    },
    {
     "name": "Das Gericht",
     "keyword": "Erneuerung",
     "line": "Ein innerer Ruf weckt frische Kraft und einen klaren Aufbruch."
    },
    {
     "name": "Die Welt",
     "keyword": "Vollendung",
     "line": "Ein Kreis schließt sich erfüllend — feiern Sie das Erreichte."
    }
   ]
  },
  "luckyFour": {
   "title": "Ihre vier Glückselemente",
   "colorLabel": "Glücksfarbe",
   "numberLabel": "Glückszahl",
   "directionLabel": "Glücksrichtung",
   "timeLabel": "Glückszeit",
   "directions": [
    "Norden",
    "Nordosten",
    "Osten",
    "Südosten",
    "Süden",
    "Südwesten",
    "Westen",
    "Nordwesten"
   ],
   "tip": "Bauen Sie Ihre Glücksfarbe und -richtung leicht in den Tag ein — ein farblicher Akzent oder ein Schreibtisch zum Glücksrichtung hin. Sehen Sie es als freundlichen Schwung, nicht als feste Regel."
  },
  "sunSign": {
   "title": "Sternzeichen-Horoskop",
   "overallLabel": "Gesamt",
   "loveLabel": "Liebe",
   "moneyLabel": "Geld",
   "luckyColorLabel": "Glücksfarbe",
   "luckyNumberLabel": "Glückszahl",
   "elementLabel": "Element",
   "signs": [
    {
     "name": "Widder",
     "range": "21. März – 19. April",
     "element": "Feuer",
     "trait": "Mutig, tatkräftig und voller Pioniergeist."
    },
    {
     "name": "Stier",
     "range": "20. April – 20. Mai",
     "element": "Erde",
     "trait": "Beständig, genussvoll und verlässlich."
    },
    {
     "name": "Zwillinge",
     "range": "21. Mai – 20. Juni",
     "element": "Luft",
     "trait": "Neugierig, kommunikativ und vielseitig."
    },
    {
     "name": "Krebs",
     "range": "21. Juni – 22. Juli",
     "element": "Wasser",
     "trait": "Einfühlsam, fürsorglich und intuitiv."
    },
    {
     "name": "Löwe",
     "range": "23. Juli – 22. August",
     "element": "Feuer",
     "trait": "Warmherzig, selbstbewusst und großzügig."
    },
    {
     "name": "Jungfrau",
     "range": "23. August – 22. September",
     "element": "Erde",
     "trait": "Sorgfältig, klug und hilfsbereit."
    },
    {
     "name": "Waage",
     "range": "23. September – 22. Oktober",
     "element": "Luft",
     "trait": "Harmonisch, charmant und gerecht."
    },
    {
     "name": "Skorpion",
     "range": "23. Oktober – 21. November",
     "element": "Wasser",
     "trait": "Tiefgründig, leidenschaftlich und willensstark."
    },
    {
     "name": "Schütze",
     "range": "22. November – 21. Dezember",
     "element": "Feuer",
     "trait": "Optimistisch, freiheitsliebend und abenteuerlustig."
    },
    {
     "name": "Steinbock",
     "range": "22. Dezember – 19. Januar",
     "element": "Erde",
     "trait": "Diszipliniert, ehrgeizig und ausdauernd."
    },
    {
     "name": "Wassermann",
     "range": "20. Januar – 18. Februar",
     "element": "Luft",
     "trait": "Originell, unabhängig und visionär."
    },
    {
     "name": "Fische",
     "range": "19. Februar – 20. März",
     "element": "Wasser",
     "trait": "Fantasievoll, mitfühlend und feinsinnig."
    }
   ],
   "daily": [
    "Heute begünstigt eine warme Begegnung Ihre Stimmung — bleiben Sie offen für Gespräche.",
    "Ein kleiner Schritt bei einem Vorhaben bringt mehr Schwung, als Sie erwarten.",
    "Achten Sie auf Ihre Energie und gönnen Sie sich bewusste Pausen.",
    "Eine kreative Idee will Beachtung — halten Sie sie kurz fest.",
    "In Geldfragen lohnt sich heute ein ruhiger, überlegter Blick.",
    "Ein ehrliches Wort zur richtigen Zeit stärkt eine wichtige Beziehung."
   ]
  }
 },
 "fr": {
  "lang": "fr",
  "biorhythm": {
   "title": "Votre biorythme du jour",
   "note": "Le biorythme est un repère ludique calculé à partir de votre date de naissance : il suit trois cycles qui montent et descendent au fil des jours. À prendre comme un clin d'œil pour rythmer votre journée, sans rien d'absolu.",
   "cycles": {
    "physical": "Cycle physique",
    "emotional": "Cycle émotionnel",
    "intellectual": "Cycle intellectuel"
   },
   "band": {
    "high": "Phase haute",
    "mid": "Phase de transition",
    "low": "Phase basse"
   },
   "tipUp": "Quand la courbe monte, lancez-vous : c'est le bon moment pour les défis, les rencontres et les nouveaux projets.",
   "tipDown": "Quand la courbe descend, soignez votre repos : sommeil, douceur et patience referont le plein d'énergie."
  },
  "birthstone": {
   "title": "Pierre et fleur de naissance",
   "stoneLabel": "Pierre de naissance",
   "flowerLabel": "Fleur de naissance",
   "months": [
    {
     "stone": "Grenat",
     "flower": "Œillet",
     "meaning": "Confiance, fidélité et amitié sincère."
    },
    {
     "stone": "Améthyste",
     "flower": "Violette",
     "meaning": "Sérénité, sagesse et clarté d'esprit."
    },
    {
     "stone": "Aigue-marine",
     "flower": "Jonquille",
     "meaning": "Courage, espoir et renouveau."
    },
    {
     "stone": "Diamant",
     "flower": "Marguerite",
     "meaning": "Pureté, force et amour éternel."
    },
    {
     "stone": "Émeraude",
     "flower": "Muguet",
     "meaning": "Renouveau, chance et bonheur retrouvé."
    },
    {
     "stone": "Perle",
     "flower": "Rose",
     "meaning": "Pureté, douceur et harmonie."
    },
    {
     "stone": "Rubis",
     "flower": "Pied-d'alouette",
     "meaning": "Passion, vitalité et noblesse de cœur."
    },
    {
     "stone": "Péridot",
     "flower": "Glaïeul",
     "meaning": "Force intérieure, prospérité et sincérité."
    },
    {
     "stone": "Saphir",
     "flower": "Aster",
     "meaning": "Sagesse, fidélité et paix de l'âme."
    },
    {
     "stone": "Opale",
     "flower": "Souci",
     "meaning": "Espoir, créativité et inspiration."
    },
    {
     "stone": "Topaze",
     "flower": "Chrysanthème",
     "meaning": "Affection, joie et amitié durable."
    },
    {
     "stone": "Turquoise",
     "flower": "Narcisse",
     "meaning": "Protection, chance et bonne fortune."
    }
   ]
  },
  "tarot": {
   "title": "Les 22 Arcanes majeurs du Tarot",
   "uprightLabel": "À l'endroit",
   "intro": "Les Arcanes majeurs du Tarot de Marseille forment un voyage symbolique. Tirez une carte du jour comme une invitation à la réflexion : un miroir bienveillant, jamais une prédiction figée.",
   "cards": [
    {
     "name": "Le Mat",
     "keyword": "Liberté",
     "line": "Un nouveau départ plein de spontanéité : avancez l'esprit léger et ouvert à l'aventure."
    },
    {
     "name": "Le Bateleur",
     "keyword": "Initiative",
     "line": "Tous vos talents sont à portée de main : c'est le moment de passer à l'action."
    },
    {
     "name": "La Papesse",
     "keyword": "Intuition",
     "line": "Écoutez votre voix intérieure : la sagesse se trouve dans le silence et la patience."
    },
    {
     "name": "L'Impératrice",
     "keyword": "Abondance",
     "line": "Créativité et générosité fleurissent : laissez s'épanouir ce que vous semez."
    },
    {
     "name": "L'Empereur",
     "keyword": "Stabilité",
     "line": "Structure et fermeté vous soutiennent : bâtissez sur des bases solides."
    },
    {
     "name": "Le Pape",
     "keyword": "Sagesse",
     "line": "Un conseil avisé éclaire votre chemin : faites confiance aux valeurs sûres."
    },
    {
     "name": "L'Amoureux",
     "keyword": "Choix",
     "line": "Une décision du cœur s'annonce : suivez ce qui résonne le plus en vous."
    },
    {
     "name": "Le Chariot",
     "keyword": "Élan",
     "line": "La volonté vous porte vers la victoire : gardez le cap avec confiance."
    },
    {
     "name": "La Justice",
     "keyword": "Équilibre",
     "line": "Honnêteté et équité guident vos pas : chaque action trouve sa juste mesure."
    },
    {
     "name": "L'Ermite",
     "keyword": "Introspection",
     "line": "Un temps de recul éclaire l'essentiel : la réponse se trouve en vous."
    },
    {
     "name": "La Roue de Fortune",
     "keyword": "Cycle",
     "line": "Le vent tourne en votre faveur : accueillez le changement avec sérénité."
    },
    {
     "name": "La Force",
     "keyword": "Courage",
     "line": "La douceur l'emporte sur la contrainte : votre force tranquille fait des merveilles."
    },
    {
     "name": "Le Pendu",
     "keyword": "Recul",
     "line": "Un autre point de vue change tout : lâcher prise ouvre de nouvelles voies."
    },
    {
     "name": "L'Arcane sans nom",
     "keyword": "Transformation",
     "line": "Une page se tourne pour mieux renaître : laissez place au renouveau."
    },
    {
     "name": "Tempérance",
     "keyword": "Harmonie",
     "line": "Patience et équilibre apaisent tout : le juste milieu porte ses fruits."
    },
    {
     "name": "Le Diable",
     "keyword": "Désir",
     "line": "Reconnaissez vos passions sans vous y enchaîner : la lucidité libère."
    },
    {
     "name": "La Maison Dieu",
     "keyword": "Révélation",
     "line": "Un bouleversement libérateur fait tomber les illusions : place à un nouveau souffle."
    },
    {
     "name": "L'Étoile",
     "keyword": "Espérance",
     "line": "Une lumière douce vous guide : gardez espoir, vos rêves prennent forme."
    },
    {
     "name": "La Lune",
     "keyword": "Imagination",
     "line": "Suivez votre intuition dans la pénombre : vos émotions ont beaucoup à révéler."
    },
    {
     "name": "Le Soleil",
     "keyword": "Joie",
     "line": "La réussite rayonne et réchauffe : savourez ce bonheur partagé."
    },
    {
     "name": "Le Jugement",
     "keyword": "Renouveau",
     "line": "Un appel intérieur vous éveille : c'est l'heure d'un nouveau chapitre."
    },
    {
     "name": "Le Monde",
     "keyword": "Accomplissement",
     "line": "Un cycle s'achève en plénitude : célébrez ce que vous avez accompli."
    }
   ]
  },
  "luckyFour": {
   "title": "Vos quatre porte-bonheur du jour",
   "colorLabel": "Couleur chanceuse",
   "numberLabel": "Nombre chanceux",
   "directionLabel": "Direction favorable",
   "timeLabel": "Heure faste",
   "directions": [
    "Nord",
    "Nord-Est",
    "Est",
    "Sud-Est",
    "Sud",
    "Sud-Ouest",
    "Ouest",
    "Nord-Ouest"
   ],
   "tip": "Glissez un peu de votre couleur chanceuse dans votre tenue, gardez votre nombre porte-bonheur en tête et profitez de votre heure faste pour les moments importants. À vivre avec le sourire, pour le plaisir."
  },
  "sunSign": {
   "title": "Votre horoscope du jour",
   "overallLabel": "Tendance générale",
   "loveLabel": "Amour",
   "moneyLabel": "Argent",
   "luckyColorLabel": "Couleur chanceuse",
   "luckyNumberLabel": "Nombre chanceux",
   "elementLabel": "Élément",
   "signs": [
    {
     "name": "Bélier",
     "range": "21 mars – 19 avril",
     "element": "Feu",
     "trait": "Audacieux, énergique et plein d'initiative."
    },
    {
     "name": "Taureau",
     "range": "20 avril – 20 mai",
     "element": "Terre",
     "trait": "Fiable, patient et attaché aux plaisirs simples."
    },
    {
     "name": "Gémeaux",
     "range": "21 mai – 20 juin",
     "element": "Air",
     "trait": "Curieux, vif d'esprit et bon communicant."
    },
    {
     "name": "Cancer",
     "range": "21 juin – 22 juillet",
     "element": "Eau",
     "trait": "Sensible, protecteur et profondément intuitif."
    },
    {
     "name": "Lion",
     "range": "23 juillet – 22 août",
     "element": "Feu",
     "trait": "Généreux, rayonnant et naturellement charismatique."
    },
    {
     "name": "Vierge",
     "range": "23 août – 22 septembre",
     "element": "Terre",
     "trait": "Méthodique, attentif et soucieux du détail."
    },
    {
     "name": "Balance",
     "range": "23 septembre – 22 octobre",
     "element": "Air",
     "trait": "Diplomate, harmonieux et épris de justice."
    },
    {
     "name": "Scorpion",
     "range": "23 octobre – 21 novembre",
     "element": "Eau",
     "trait": "Intense, passionné et d'une grande profondeur."
    },
    {
     "name": "Sagittaire",
     "range": "22 novembre – 21 décembre",
     "element": "Feu",
     "trait": "Optimiste, aventureux et avide de liberté."
    },
    {
     "name": "Capricorne",
     "range": "22 décembre – 19 janvier",
     "element": "Terre",
     "trait": "Ambitieux, persévérant et plein de sagesse."
    },
    {
     "name": "Verseau",
     "range": "20 janvier – 18 février",
     "element": "Air",
     "trait": "Original, indépendant et tourné vers l'avenir."
    },
    {
     "name": "Poissons",
     "range": "19 février – 20 mars",
     "element": "Eau",
     "trait": "Imaginatif, empathique et délicatement rêveur."
    }
   ],
   "daily": [
    "Une journée propice aux échanges sincères : votre bonne humeur attire les belles rencontres.",
    "L'énergie est de votre côté pour avancer sur vos projets : faites confiance à votre élan.",
    "Côté cœur, la douceur l'emporte : un geste tendre rapproche les âmes.",
    "Restez attentif à vos finances : une petite prudence aujourd'hui paiera demain.",
    "Votre intuition est particulièrement juste : écoutez ce qu'elle vous souffle.",
    "Accordez-vous un moment de repos : prendre soin de soi, c'est aussi cultiver sa chance."
   ]
  }
 },
 "es": {
  "lang": "es",
  "biorhythm": {
   "title": "Biorritmo",
   "note": "Los biorritmos son una guía lúdica de entretenimiento: tres ciclos naturales que suben y bajan desde tu nacimiento. Tómalos como inspiración para tu día, no como una predicción.",
   "cycles": {
    "physical": "Ciclo físico",
    "emotional": "Ciclo emocional",
    "intellectual": "Ciclo intelectual"
   },
   "band": {
    "high": "Fase alta",
    "mid": "Fase de transición",
    "low": "Fase baja"
   },
   "tipUp": "Cuando un ciclo está en su punto alto, atrévete con lo que requiere empuje: ejercicio, conversaciones importantes o tareas creativas.",
   "tipDown": "En los días bajos, prioriza el descanso, la calma y los pequeños placeres. Recuperarte hoy te fortalece para mañana."
  },
  "birthstone": {
   "title": "Piedra y flor de nacimiento",
   "stoneLabel": "Piedra",
   "flowerLabel": "Flor",
   "months": [
    {
     "stone": "Granate",
     "flower": "Clavel",
     "meaning": "Enero — El granate simboliza la lealtad y la energía protectora; el clavel, el amor sincero y la admiración."
    },
    {
     "stone": "Amatista",
     "flower": "Violeta",
     "meaning": "Febrero — La amatista aporta serenidad y claridad mental; la violeta representa la modestia y la fidelidad."
    },
    {
     "stone": "Aguamarina",
     "flower": "Narciso",
     "meaning": "Marzo — La aguamarina evoca la calma del mar y el valor; el narciso anuncia nuevos comienzos y esperanza."
    },
    {
     "stone": "Diamante",
     "flower": "Guisante de olor",
     "meaning": "Abril — El diamante encarna la fuerza y el amor eterno; el guisante de olor expresa gratitud y delicadeza."
    },
    {
     "stone": "Esmeralda",
     "flower": "Lirio de los valles",
     "meaning": "Mayo — La esmeralda representa la esperanza y la renovación; el lirio de los valles, la dulzura y la felicidad que regresa."
    },
    {
     "stone": "Perla",
     "flower": "Rosa",
     "meaning": "Junio — La perla simboliza la pureza y la sabiduría; la rosa, el amor y la pasión en todas sus formas."
    },
    {
     "stone": "Rubí",
     "flower": "Espuela de caballero",
     "meaning": "Julio — El rubí enciende la pasión y la vitalidad; la espuela de caballero transmite un corazón abierto y ligero."
    },
    {
     "stone": "Peridoto",
     "flower": "Gladiolo",
     "meaning": "Agosto — El peridoto atrae prosperidad y buen ánimo; el gladiolo representa la fortaleza de carácter y la sinceridad."
    },
    {
     "stone": "Zafiro",
     "flower": "Áster",
     "meaning": "Septiembre — El zafiro inspira sabiduría y serenidad; el áster simboliza el amor delicado y la paciencia."
    },
    {
     "stone": "Ópalo",
     "flower": "Caléndula",
     "meaning": "Octubre — El ópalo refleja la creatividad y la esperanza; la caléndula evoca calidez y luz interior."
    },
    {
     "stone": "Topacio",
     "flower": "Crisantemo",
     "meaning": "Noviembre — El topacio aporta confianza y fuerza; el crisantemo representa la alegría y la amistad sincera."
    },
    {
     "stone": "Turquesa",
     "flower": "Narciso de invierno",
     "meaning": "Diciembre — La turquesa es símbolo de buena fortuna y protección; el narciso de invierno anuncia renovación y buenos deseos."
    }
   ]
  },
  "tarot": {
   "title": "Tarot — Arcanos Mayores",
   "uprightLabel": "En posición derecha",
   "intro": "Los 22 Arcanos Mayores del Tarot son un espejo simbólico para la reflexión. Aquí los presentamos como entretenimiento e inspiración: cada carta sugiere un tema para pensar tu día, nunca un destino fijo.",
   "cards": [
    {
     "name": "El Loco",
     "keyword": "Comienzos",
     "line": "Una invitación a empezar de cero con curiosidad y un espíritu libre."
    },
    {
     "name": "El Mago",
     "keyword": "Voluntad",
     "line": "Tienes las herramientas y el talento para hacer realidad tus ideas."
    },
    {
     "name": "La Sacerdotisa",
     "keyword": "Intuición",
     "line": "Escucha tu voz interior; los misterios se revelan con paciencia."
    },
    {
     "name": "La Emperatriz",
     "keyword": "Abundancia",
     "line": "Energía fértil y creativa: cuida lo que siembras y florecerá."
    },
    {
     "name": "El Emperador",
     "keyword": "Estructura",
     "line": "La estabilidad y el orden te dan una base firme para avanzar."
    },
    {
     "name": "El Sumo Sacerdote",
     "keyword": "Tradición",
     "line": "La sabiduría compartida y los buenos consejos te guían hoy."
    },
    {
     "name": "Los Enamorados",
     "keyword": "Elección",
     "line": "Una decisión del corazón pide sinceridad y armonía."
    },
    {
     "name": "El Carro",
     "keyword": "Determinación",
     "line": "Con enfoque y voluntad avanzas hacia tu meta con seguridad."
    },
    {
     "name": "La Fuerza",
     "keyword": "Coraje",
     "line": "La fuerza interior y la dulzura superan cualquier dificultad."
    },
    {
     "name": "El Ermitaño",
     "keyword": "Introspección",
     "line": "Un tiempo de calma y búsqueda interior ilumina tu camino."
    },
    {
     "name": "La Rueda de la Fortuna",
     "keyword": "Ciclos",
     "line": "Todo cambia; abre los brazos a un nuevo giro favorable."
    },
    {
     "name": "La Justicia",
     "keyword": "Equilibrio",
     "line": "La honestidad y el sentido de la justicia traen claridad."
    },
    {
     "name": "El Colgado",
     "keyword": "Nueva perspectiva",
     "line": "Mirar las cosas de otra forma revela soluciones inesperadas."
    },
    {
     "name": "La Muerte",
     "keyword": "Transformación",
     "line": "Un cierre da paso a una renovación llena de posibilidades."
    },
    {
     "name": "La Templanza",
     "keyword": "Armonía",
     "line": "La paciencia y el equilibrio te ayudan a encontrar la medida justa."
    },
    {
     "name": "El Diablo",
     "keyword": "Ataduras",
     "line": "Reconoce qué te limita para recuperar tu libertad con suavidad."
    },
    {
     "name": "La Torre",
     "keyword": "Cambio repentino",
     "line": "Lo que se sacude deja espacio para construir algo más auténtico."
    },
    {
     "name": "La Estrella",
     "keyword": "Esperanza",
     "line": "La inspiración y la fe renovada iluminan tu horizonte."
    },
    {
     "name": "La Luna",
     "keyword": "Imaginación",
     "line": "Confía en tus sueños e intuiciones; la claridad llegará."
    },
    {
     "name": "El Sol",
     "keyword": "Alegría",
     "line": "Vitalidad, éxito y calidez: un día para brillar con confianza."
    },
    {
     "name": "El Juicio",
     "keyword": "Renacimiento",
     "line": "Un despertar interior te invita a empezar una nueva etapa."
    },
    {
     "name": "El Mundo",
     "keyword": "Plenitud",
     "line": "Un ciclo se completa con éxito; celebra todo lo logrado."
    }
   ]
  },
  "luckyFour": {
   "title": "Tus cuatro elementos de la suerte",
   "colorLabel": "Color de la suerte",
   "numberLabel": "Número de la suerte",
   "directionLabel": "Dirección de la suerte",
   "timeLabel": "Hora de la suerte",
   "directions": [
    "Norte",
    "Noreste",
    "Este",
    "Sureste",
    "Sur",
    "Suroeste",
    "Oeste",
    "Noroeste"
   ],
   "tip": "Lleva tu color de la suerte, ten presente tu número y orienta tus momentos importantes hacia tu dirección favorable. Son guiños amables para acompañar tu día con buena energía."
  },
  "sunSign": {
   "title": "Signos del zodiaco",
   "overallLabel": "General",
   "loveLabel": "Amor",
   "moneyLabel": "Dinero",
   "luckyColorLabel": "Color de la suerte",
   "luckyNumberLabel": "Número de la suerte",
   "elementLabel": "Elemento",
   "signs": [
    {
     "name": "Aries",
     "range": "21 mar – 19 abr",
     "element": "Fuego",
     "trait": "Audaz, enérgico y pionero; le encanta tomar la iniciativa."
    },
    {
     "name": "Tauro",
     "range": "20 abr – 20 may",
     "element": "Tierra",
     "trait": "Constante, sensual y leal; valora la estabilidad y el placer."
    },
    {
     "name": "Géminis",
     "range": "21 may – 20 jun",
     "element": "Aire",
     "trait": "Curioso, comunicativo y versátil; mente ágil y sociable."
    },
    {
     "name": "Cáncer",
     "range": "21 jun – 22 jul",
     "element": "Agua",
     "trait": "Sensible, protector e intuitivo; muy apegado a su hogar."
    },
    {
     "name": "Leo",
     "range": "23 jul – 22 ago",
     "element": "Fuego",
     "trait": "Carismático, generoso y seguro; nació para brillar."
    },
    {
     "name": "Virgo",
     "range": "23 ago – 22 sep",
     "element": "Tierra",
     "trait": "Analítico, metódico y servicial; cuida cada detalle."
    },
    {
     "name": "Libra",
     "range": "23 sep – 22 oct",
     "element": "Aire",
     "trait": "Diplomático, encantador y justo; busca la armonía."
    },
    {
     "name": "Escorpio",
     "range": "23 oct – 21 nov",
     "element": "Agua",
     "trait": "Intenso, apasionado y profundo; de gran fuerza interior."
    },
    {
     "name": "Sagitario",
     "range": "22 nov – 21 dic",
     "element": "Fuego",
     "trait": "Aventurero, optimista y filosófico; ama la libertad."
    },
    {
     "name": "Capricornio",
     "range": "22 dic – 19 ene",
     "element": "Tierra",
     "trait": "Ambicioso, disciplinado y paciente; construye a largo plazo."
    },
    {
     "name": "Acuario",
     "range": "20 ene – 18 feb",
     "element": "Aire",
     "trait": "Original, independiente y visionario; piensa diferente."
    },
    {
     "name": "Piscis",
     "range": "19 feb – 20 mar",
     "element": "Agua",
     "trait": "Soñador, empático y creativo; de gran sensibilidad espiritual."
    }
   ],
   "daily": [
    "Hoy los astros te invitan a confiar en tu intuición: una pequeña señal puede abrir una gran oportunidad.",
    "Es un buen día para cuidar tus relaciones; un gesto sincero acerca corazones.",
    "Tu energía está en alza: aprovecha para avanzar en eso que vienes posponiendo.",
    "La calma será tu mejor aliada; respira hondo antes de tomar decisiones importantes.",
    "La fortuna sonríe a quien se atreve; da ese paso con confianza y entusiasmo.",
    "Dedica un momento a ti mismo: el bienestar interior atrae la buena suerte."
   ]
  }
 },
 "pt": {
  "lang": "pt",
  "biorhythm": {
   "title": "Biorritmo",
   "note": "O biorritmo é um modelo de entretenimento que acompanha três ciclos naturais a partir da sua data de nascimento. Use-o como um convite leve à autorreflexão, não como uma previsão definitiva.",
   "cycles": {
    "physical": "Ciclo físico",
    "emotional": "Ciclo emocional",
    "intellectual": "Ciclo intelectual"
   },
   "band": {
    "high": "Fase alta",
    "mid": "Fase de transição",
    "low": "Fase baixa"
   },
   "tipUp": "Quando a curva está em alta, aproveite para avançar em projetos importantes e abraçar novas oportunidades.",
   "tipDown": "Quando a curva está em baixa, seja gentil consigo mesmo: descanse, organize-se e evite decisões precipitadas."
  },
  "birthstone": {
   "title": "Pedra e Flor de Nascimento",
   "stoneLabel": "Pedra de nascimento",
   "flowerLabel": "Flor de nascimento",
   "months": [
    {
     "stone": "Granada",
     "flower": "Cravo",
     "meaning": "Confiança, amizade verdadeira e energia para recomeços."
    },
    {
     "stone": "Ametista",
     "flower": "Violeta",
     "meaning": "Serenidade, clareza mental e proteção espiritual."
    },
    {
     "stone": "Água-marinha",
     "flower": "Narciso",
     "meaning": "Coragem, esperança e renovação dos sentimentos."
    },
    {
     "stone": "Diamante",
     "flower": "Margarida",
     "meaning": "Pureza, amor eterno e força interior."
    },
    {
     "stone": "Esmeralda",
     "flower": "Lírio-do-vale",
     "meaning": "Renascimento, harmonia e abundância no coração."
    },
    {
     "stone": "Pérola",
     "flower": "Rosa",
     "meaning": "Doçura, equilíbrio emocional e elegância natural."
    },
    {
     "stone": "Rubi",
     "flower": "Esporinha",
     "meaning": "Paixão, vitalidade e coragem para amar."
    },
    {
     "stone": "Peridoto",
     "flower": "Gladíolo",
     "meaning": "Prosperidade, leveza e proteção contra a negatividade."
    },
    {
     "stone": "Safira",
     "flower": "Áster",
     "meaning": "Sabedoria, lealdade e paz de espírito."
    },
    {
     "stone": "Opala",
     "flower": "Calêndula",
     "meaning": "Criatividade, inspiração e esperança renovada."
    },
    {
     "stone": "Topázio",
     "flower": "Crisântemo",
     "meaning": "Afeto sincero, alegria e fidelidade."
    },
    {
     "stone": "Turquesa",
     "flower": "Bico-de-papagaio",
     "meaning": "Sorte, amizade e bem-estar ao longo do caminho."
    }
   ]
  },
  "tarot": {
   "title": "Tarô — Arcanos Maiores",
   "uprightLabel": "Carta na posição direita",
   "intro": "Os 22 Arcanos Maiores do Tarô são apresentados aqui apenas como entretenimento e inspiração para a reflexão pessoal. Deixe que cada carta sugira um tema do dia, sem encará-la como destino fixo.",
   "cards": [
    {
     "name": "O Louco",
     "keyword": "Recomeço",
     "line": "Um novo começo cheio de liberdade e fé na jornada que se abre."
    },
    {
     "name": "O Mago",
     "keyword": "Manifestação",
     "line": "Você tem as ferramentas e o talento para transformar ideias em realidade."
    },
    {
     "name": "A Sacerdotisa",
     "keyword": "Intuição",
     "line": "Confie na sua voz interior; respostas surgem no silêncio e na paciência."
    },
    {
     "name": "A Imperatriz",
     "keyword": "Abundância",
     "line": "Tempo de cuidar, criar e colher frutos com generosidade e afeto."
    },
    {
     "name": "O Imperador",
     "keyword": "Estrutura",
     "line": "Estabilidade e disciplina constroem bases sólidas para seus planos."
    },
    {
     "name": "O Hierofante",
     "keyword": "Tradição",
     "line": "Aprender com mentores e valores compartilhados traz orientação valiosa."
    },
    {
     "name": "Os Enamorados",
     "keyword": "União",
     "line": "Escolhas do coração e parcerias harmoniosas iluminam o caminho."
    },
    {
     "name": "O Carro",
     "keyword": "Determinação",
     "line": "Foco e vontade conduzem você à vitória sobre os obstáculos."
    },
    {
     "name": "A Força",
     "keyword": "Coragem",
     "line": "A gentileza e a paciência revelam sua verdadeira força interior."
    },
    {
     "name": "O Eremita",
     "keyword": "Reflexão",
     "line": "Um momento de introspecção ilumina o próximo passo da sua jornada."
    },
    {
     "name": "A Roda da Fortuna",
     "keyword": "Ciclos",
     "line": "Mudanças naturais trazem novas oportunidades; flua com o movimento da vida."
    },
    {
     "name": "A Justiça",
     "keyword": "Equilíbrio",
     "line": "Decisões justas e verdade trazem clareza e harmonia ao seu caminho."
    },
    {
     "name": "O Enforcado",
     "keyword": "Nova perspectiva",
     "line": "Pausar e ver as coisas de outro ângulo revela soluções inesperadas."
    },
    {
     "name": "A Morte",
     "keyword": "Transformação",
     "line": "Um ciclo se encerra para que algo melhor possa florescer."
    },
    {
     "name": "A Temperança",
     "keyword": "Harmonia",
     "line": "Equilíbrio e moderação trazem paz e renovação ao seu dia."
    },
    {
     "name": "O Diabo",
     "keyword": "Libertação",
     "line": "Reconhecer apegos é o primeiro passo para se libertar deles."
    },
    {
     "name": "A Torre",
     "keyword": "Mudança súbita",
     "line": "Uma reviravolta abre espaço para reconstruções mais verdadeiras."
    },
    {
     "name": "A Estrela",
     "keyword": "Esperança",
     "line": "A inspiração e a fé renovam seus sonhos com luz suave."
    },
    {
     "name": "A Lua",
     "keyword": "Imaginação",
     "line": "Confie na intuição diante do que ainda não está totalmente claro."
    },
    {
     "name": "O Sol",
     "keyword": "Alegria",
     "line": "Vitalidade, sucesso e calor humano iluminam todos os seus passos."
    },
    {
     "name": "O Julgamento",
     "keyword": "Renascimento",
     "line": "Um despertar interior chama você a recomeçar com mais consciência."
    },
    {
     "name": "O Mundo",
     "keyword": "Realização",
     "line": "Um ciclo se completa com plenitude, gratidão e conquistas."
    }
   ]
  },
  "luckyFour": {
   "title": "Seus Quatro Elementos da Sorte",
   "colorLabel": "Cor da sorte",
   "numberLabel": "Número da sorte",
   "directionLabel": "Direção da sorte",
   "timeLabel": "Horário da sorte",
   "directions": [
    "Norte",
    "Nordeste",
    "Leste",
    "Sudeste",
    "Sul",
    "Sudoeste",
    "Oeste",
    "Noroeste"
   ],
   "tip": "Combine sua cor, número, direção e horário da sorte para dar um toque especial ao seu dia. Encare tudo como um amuleto divertido que inspira boas energias."
  },
  "sunSign": {
   "title": "Horóscopo do Signo Solar",
   "overallLabel": "Geral",
   "loveLabel": "Amor",
   "moneyLabel": "Dinheiro",
   "luckyColorLabel": "Cor da sorte",
   "luckyNumberLabel": "Número da sorte",
   "elementLabel": "Elemento",
   "signs": [
    {
     "name": "Áries",
     "range": "21 de março – 19 de abril",
     "element": "Fogo",
     "trait": "Corajoso, pioneiro e cheio de iniciativa."
    },
    {
     "name": "Touro",
     "range": "20 de abril – 20 de maio",
     "element": "Terra",
     "trait": "Paciente, leal e amante do conforto."
    },
    {
     "name": "Gêmeos",
     "range": "21 de maio – 20 de junho",
     "element": "Ar",
     "trait": "Curioso, comunicativo e versátil."
    },
    {
     "name": "Câncer",
     "range": "21 de junho – 22 de julho",
     "element": "Água",
     "trait": "Sensível, acolhedor e protetor."
    },
    {
     "name": "Leão",
     "range": "23 de julho – 22 de agosto",
     "element": "Fogo",
     "trait": "Confiante, generoso e carismático."
    },
    {
     "name": "Virgem",
     "range": "23 de agosto – 22 de setembro",
     "element": "Terra",
     "trait": "Detalhista, prático e dedicado."
    },
    {
     "name": "Libra",
     "range": "23 de setembro – 22 de outubro",
     "element": "Ar",
     "trait": "Equilibrado, diplomático e amante da harmonia."
    },
    {
     "name": "Escorpião",
     "range": "23 de outubro – 21 de novembro",
     "element": "Água",
     "trait": "Intenso, determinado e perspicaz."
    },
    {
     "name": "Sagitário",
     "range": "22 de novembro – 21 de dezembro",
     "element": "Fogo",
     "trait": "Aventureiro, otimista e livre."
    },
    {
     "name": "Capricórnio",
     "range": "22 de dezembro – 19 de janeiro",
     "element": "Terra",
     "trait": "Ambicioso, disciplinado e responsável."
    },
    {
     "name": "Aquário",
     "range": "20 de janeiro – 18 de fevereiro",
     "element": "Ar",
     "trait": "Original, inovador e independente."
    },
    {
     "name": "Peixes",
     "range": "19 de fevereiro – 20 de março",
     "element": "Água",
     "trait": "Sonhador, intuitivo e compassivo."
    }
   ],
   "daily": [
    "Hoje os astros sugerem leveza: siga seu ritmo e confie na sua intuição.",
    "Uma conversa sincera pode abrir portas inesperadas. Mantenha o coração aberto.",
    "Cuide da sua energia e reserve um momento só para você ao longo do dia.",
    "Pequenos gestos de gentileza retornam multiplicados. Espalhe boas vibrações.",
    "É um bom dia para organizar ideias e dar o primeiro passo em um projeto.",
    "Permita-se sonhar grande, mas valorize também as pequenas conquistas de hoje."
   ]
  }
 },
 "it": {
  "lang": "it",
  "biorhythm": {
   "title": "Bioritmo",
   "note": "Il bioritmo è un modello di intrattenimento che illustra tre cicli naturali a partire dalla tua data di nascita. Prendilo come uno spunto leggero, non come una previsione.",
   "cycles": {
    "physical": "Ciclo fisico",
    "emotional": "Ciclo emotivo",
    "intellectual": "Ciclo intellettivo"
   },
   "band": {
    "high": "Fase alta",
    "mid": "Fase di transizione",
    "low": "Fase bassa"
   },
   "tipUp": "Quando la curva sale, pianifica le sfide più impegnative e i passi importanti.",
   "tipDown": "Quando la curva scende, rallenta, riposa e rimanda le decisioni che possono attendere."
  },
  "birthstone": {
   "title": "Pietra e fiore natale",
   "stoneLabel": "Pietra natale",
   "flowerLabel": "Fiore natale",
   "months": [
    {
     "stone": "Granato",
     "flower": "Garofano",
     "meaning": "Fiducia in sé, energia costante e amicizia sincera."
    },
    {
     "stone": "Ametista",
     "flower": "Viola",
     "meaning": "Serenità interiore, lucidità mentale e protezione."
    },
    {
     "stone": "Acquamarina",
     "flower": "Giunchiglia",
     "meaning": "Nuovi inizi, calma e comunicazione limpida."
    },
    {
     "stone": "Diamante",
     "flower": "Margherita",
     "meaning": "Purezza, forza e legami che durano nel tempo."
    },
    {
     "stone": "Smeraldo",
     "flower": "Mughetto",
     "meaning": "Rinascita, speranza e amore che cresce."
    },
    {
     "stone": "Perla",
     "flower": "Rosa",
     "meaning": "Dolcezza, eleganza e armonia degli affetti."
    },
    {
     "stone": "Rubino",
     "flower": "Delphinium",
     "meaning": "Passione, coraggio e vitalità del cuore."
    },
    {
     "stone": "Peridoto",
     "flower": "Gladiolo",
     "meaning": "Forza di carattere, prosperità e buon umore."
    },
    {
     "stone": "Zaffiro",
     "flower": "Astro",
     "meaning": "Saggezza, fedeltà e pace della mente."
    },
    {
     "stone": "Opale",
     "flower": "Calendula",
     "meaning": "Creatività, fascino e fortuna che cambia in meglio."
    },
    {
     "stone": "Topazio",
     "flower": "Crisantemo",
     "meaning": "Generosità, calore e affetto duraturo."
    },
    {
     "stone": "Turchese",
     "flower": "Stella di Natale",
     "meaning": "Protezione, buona sorte e serenità."
    }
   ]
  },
  "tarot": {
   "title": "Tarocchi degli Arcani Maggiori",
   "uprightLabel": "Dritto",
   "intro": "I 22 Arcani Maggiori sono un gioco simbolico di intrattenimento: ogni carta offre uno spunto di riflessione, non una previsione del futuro. Lasciati ispirare con leggerezza.",
   "cards": [
    {
     "name": "Il Matto",
     "keyword": "Libertà",
     "line": "Un nuovo inizio ti chiama: segui la curiosità con cuore leggero."
    },
    {
     "name": "Il Mago",
     "keyword": "Volontà",
     "line": "Hai gli strumenti giusti: trasforma le idee in azioni concrete."
    },
    {
     "name": "La Papessa",
     "keyword": "Intuito",
     "line": "Ascolta la voce interiore: la risposta è già dentro di te."
    },
    {
     "name": "L'Imperatrice",
     "keyword": "Abbondanza",
     "line": "Creatività e calore fioriscono: coltiva ciò che ami."
    },
    {
     "name": "L'Imperatore",
     "keyword": "Stabilità",
     "line": "Struttura e disciplina ti danno solide fondamenta."
    },
    {
     "name": "Il Papa",
     "keyword": "Saggezza",
     "line": "Un buon consiglio o una tradizione ti guidano con chiarezza."
    },
    {
     "name": "Gli Amanti",
     "keyword": "Scelta",
     "line": "Una decisione del cuore chiede sincerità e armonia."
    },
    {
     "name": "Il Carro",
     "keyword": "Determinazione",
     "line": "Con volontà e direzione, superi ogni ostacolo."
    },
    {
     "name": "La Forza",
     "keyword": "Coraggio",
     "line": "La vera forza è gentile: dominati con dolcezza e fiducia."
    },
    {
     "name": "L'Eremita",
     "keyword": "Riflessione",
     "line": "Un momento di solitudine illumina la tua strada."
    },
    {
     "name": "La Ruota della Fortuna",
     "keyword": "Cambiamento",
     "line": "I cicli girano: accogli il nuovo capitolo con apertura."
    },
    {
     "name": "La Giustizia",
     "keyword": "Equilibrio",
     "line": "Verità e responsabilità riportano armonia."
    },
    {
     "name": "L'Appeso",
     "keyword": "Nuova prospettiva",
     "line": "Cambia punto di vista: una pausa rivela ciò che conta."
    },
    {
     "name": "La Morte",
     "keyword": "Trasformazione",
     "line": "Una fine apre la porta a una rinascita: lascia andare con fiducia."
    },
    {
     "name": "La Temperanza",
     "keyword": "Armonia",
     "line": "Misura e pazienza creano un equilibrio prezioso."
    },
    {
     "name": "Il Diavolo",
     "keyword": "Consapevolezza",
     "line": "Riconosci ciò che ti lega: la libertà è una tua scelta."
    },
    {
     "name": "La Torre",
     "keyword": "Risveglio",
     "line": "Un cambiamento improvviso fa spazio a basi più autentiche."
    },
    {
     "name": "La Stella",
     "keyword": "Speranza",
     "line": "Una luce serena ti rinnova: credi nei tuoi sogni."
    },
    {
     "name": "La Luna",
     "keyword": "Immaginazione",
     "line": "Fidati dell'intuito tra le ombre: la chiarezza tornerà."
    },
    {
     "name": "Il Sole",
     "keyword": "Gioia",
     "line": "Calore, successo e vitalità illuminano la tua giornata."
    },
    {
     "name": "Il Giudizio",
     "keyword": "Rinnovamento",
     "line": "Una chiamata interiore ti invita a un nuovo inizio."
    },
    {
     "name": "Il Mondo",
     "keyword": "Compimento",
     "line": "Un ciclo si chiude con pienezza: festeggia il traguardo."
    }
   ]
  },
  "luckyFour": {
   "title": "I tuoi quattro portafortuna",
   "colorLabel": "Colore fortunato",
   "numberLabel": "Numero fortunato",
   "directionLabel": "Direzione fortunata",
   "timeLabel": "Orario fortunato",
   "directions": [
    "Nord",
    "Nord-est",
    "Est",
    "Sud-est",
    "Sud",
    "Sud-ovest",
    "Ovest",
    "Nord-ovest"
   ],
   "tip": "Tieni a mente questi piccoli simboli durante la giornata: un tocco del tuo colore o uno sguardo verso la direzione fortunata possono regalarti un sorriso in più."
  },
  "sunSign": {
   "title": "Segno zodiacale",
   "overallLabel": "Generale",
   "loveLabel": "Amore",
   "moneyLabel": "Denaro",
   "luckyColorLabel": "Colore fortunato",
   "luckyNumberLabel": "Numero fortunato",
   "elementLabel": "Elemento",
   "signs": [
    {
     "name": "Ariete",
     "range": "21 mar – 19 apr",
     "element": "Fuoco",
     "trait": "Coraggioso, intraprendente e pieno di energia."
    },
    {
     "name": "Toro",
     "range": "20 apr – 20 mag",
     "element": "Terra",
     "trait": "Concreto, affidabile e amante della bellezza."
    },
    {
     "name": "Gemelli",
     "range": "21 mag – 20 giu",
     "element": "Aria",
     "trait": "Curioso, versatile e brillante nel comunicare."
    },
    {
     "name": "Cancro",
     "range": "21 giu – 22 lug",
     "element": "Acqua",
     "trait": "Sensibile, premuroso e legato agli affetti."
    },
    {
     "name": "Leone",
     "range": "23 lug – 22 ago",
     "element": "Fuoco",
     "trait": "Generoso, carismatico e pieno di calore."
    },
    {
     "name": "Vergine",
     "range": "23 ago – 22 set",
     "element": "Terra",
     "trait": "Preciso, attento ai dettagli e pratico."
    },
    {
     "name": "Bilancia",
     "range": "23 set – 22 ott",
     "element": "Aria",
     "trait": "Equilibrato, diplomatico e amante dell'armonia."
    },
    {
     "name": "Scorpione",
     "range": "23 ott – 21 nov",
     "element": "Acqua",
     "trait": "Intenso, profondo e tenace."
    },
    {
     "name": "Sagittario",
     "range": "22 nov – 21 dic",
     "element": "Fuoco",
     "trait": "Ottimista, avventuroso e amante della libertà."
    },
    {
     "name": "Capricorno",
     "range": "22 dic – 19 gen",
     "element": "Terra",
     "trait": "Ambizioso, paziente e determinato."
    },
    {
     "name": "Acquario",
     "range": "20 gen – 18 feb",
     "element": "Aria",
     "trait": "Originale, indipendente e visionario."
    },
    {
     "name": "Pesci",
     "range": "19 feb – 20 mar",
     "element": "Acqua",
     "trait": "Sognatore, empatico e creativo."
    }
   ],
   "daily": [
    "Oggi le stelle ti invitano a coltivare un piccolo gesto di gentilezza: tornerà a te moltiplicato.",
    "Un'opportunità inattesa potrebbe presentarsi: tieni la mente aperta e ascolta il tuo intuito.",
    "È una buona giornata per riordinare i pensieri e dare priorità a ciò che conta davvero.",
    "Le relazioni sono in primo piano: una conversazione sincera può rafforzare un legame.",
    "Concediti un momento di riposo: ricaricare le energie ti renderà più lucido e sereno.",
    "La fortuna sorride a chi agisce con fiducia: fai quel piccolo passo che rimandavi da tempo."
   ]
  }
 },
 "id": {
  "lang": "id",
  "biorhythm": {
   "title": "Bioritme",
   "note": "Bioritme adalah grafik hiburan yang menggambarkan tiga siklus alami sejak tanggal lahirmu. Anggap sebagai cermin suasana hati yang ringan, bukan ramalan pasti.",
   "cycles": {
    "physical": "Fisik",
    "emotional": "Emosional",
    "intellectual": "Intelektual"
   },
   "band": {
    "high": "Fase Tinggi",
    "mid": "Fase Transisi",
    "low": "Fase Rendah"
   },
   "tipUp": "Saat kurva sedang menanjak, ambil inisiatif: mulai proyek baru, olahraga, atau ungkapkan idemu dengan percaya diri.",
   "tipDown": "Saat kurva sedang menurun, perlambat tempo: cukup tidur, rawat dirimu, dan tunda keputusan besar bila bisa."
  },
  "birthstone": {
   "title": "Batu & Bunga Kelahiran",
   "stoneLabel": "Batu Kelahiran",
   "flowerLabel": "Bunga Kelahiran",
   "months": [
    {
     "stone": "Garnet",
     "flower": "Anyelir",
     "meaning": "Kesetiaan, persahabatan tulus, dan perlindungan."
    },
    {
     "stone": "Kecubung (Amethyst)",
     "flower": "Iris",
     "meaning": "Ketenangan batin, kebijaksanaan, dan kejernihan pikiran."
    },
    {
     "stone": "Aquamarine",
     "flower": "Bunga Air Mata Pengantin",
     "meaning": "Keberanian, harapan, dan ketenangan bagai laut."
    },
    {
     "stone": "Berlian",
     "flower": "Bunga Aster",
     "meaning": "Cinta abadi, kemurnian, dan kekuatan tak tergoyahkan."
    },
    {
     "stone": "Zamrud (Emerald)",
     "flower": "Bunga Bakung",
     "meaning": "Pembaruan, harapan, dan pertumbuhan."
    },
    {
     "stone": "Mutiara",
     "flower": "Mawar",
     "meaning": "Kemurnian, ketulusan, dan keanggunan."
    },
    {
     "stone": "Rubi",
     "flower": "Bunga Larkspur",
     "meaning": "Semangat, cinta yang membara, dan keberanian."
    },
    {
     "stone": "Peridot",
     "flower": "Bunga Gladiol",
     "meaning": "Kekuatan, kemakmuran, dan keceriaan."
    },
    {
     "stone": "Safir (Sapphire)",
     "flower": "Aster",
     "meaning": "Kebijaksanaan, kesetiaan, dan kejujuran."
    },
    {
     "stone": "Opal",
     "flower": "Bunga Marigold",
     "meaning": "Harapan, kreativitas, dan kehangatan."
    },
    {
     "stone": "Topas",
     "flower": "Krisan",
     "meaning": "Kesetiaan, kelimpahan, dan kegembiraan."
    },
    {
     "stone": "Pirus (Turquoise)",
     "flower": "Bunga Narsis",
     "meaning": "Keberuntungan, kebahagiaan, dan awal yang baru."
    }
   ]
  },
  "tarot": {
   "title": "Tarot — 22 Arkana Mayor",
   "uprightLabel": "Tegak",
   "intro": "Tarot di sini hanyalah hiburan untuk merenung dan menemukan inspirasi, bukan ramalan mutlak. Biarkan tiap kartu menjadi cermin untuk merefleksikan dirimu hari ini.",
   "cards": [
    {
     "name": "Si Pandir (The Fool)",
     "keyword": "Awal Baru",
     "line": "Saatnya melangkah dengan hati terbuka dan jiwa yang ringan menuju petualangan baru."
    },
    {
     "name": "Sang Pesulap (The Magician)",
     "keyword": "Manifestasi",
     "line": "Kamu punya semua bekal untuk mewujudkan keinginanmu — percayalah pada kemampuanmu."
    },
    {
     "name": "Pendeta Wanita Agung (The High Priestess)",
     "keyword": "Intuisi",
     "line": "Dengarkan suara batinmu; jawaban yang kamu cari ada dalam keheningan."
    },
    {
     "name": "Sang Permaisuri (The Empress)",
     "keyword": "Kelimpahan",
     "line": "Energi yang penuh kasih dan subur sedang mengelilingimu — rawat apa yang kamu cintai."
    },
    {
     "name": "Sang Kaisar (The Emperor)",
     "keyword": "Kestabilan",
     "line": "Struktur dan kedisiplinan akan membawa rasa aman serta kepemimpinan yang kokoh."
    },
    {
     "name": "Sang Pendeta Tinggi (The Hierophant)",
     "keyword": "Tradisi",
     "line": "Kearifan dan nilai-nilai luhur menuntunmu; belajarlah dari mereka yang berpengalaman."
    },
    {
     "name": "Sang Kekasih (The Lovers)",
     "keyword": "Pilihan Hati",
     "line": "Sebuah keputusan dari hati menanti — selaraskan nilai dan perasaanmu."
    },
    {
     "name": "Sang Kereta Perang (The Chariot)",
     "keyword": "Tekad",
     "line": "Dengan fokus dan kemauan kuat, kamu mampu menaklukkan tantangan di depan."
    },
    {
     "name": "Kekuatan (Strength)",
     "keyword": "Keberanian Lembut",
     "line": "Kekuatan sejati lahir dari kesabaran dan kelembutan, bukan paksaan."
    },
    {
     "name": "Sang Pertapa (The Hermit)",
     "keyword": "Perenungan",
     "line": "Luangkan waktu untuk menyendiri; kejernihan akan datang dari refleksi yang tenang."
    },
    {
     "name": "Roda Keberuntungan (Wheel of Fortune)",
     "keyword": "Perputaran",
     "line": "Siklus kehidupan sedang berputar; sambut perubahan dengan hati yang terbuka."
    },
    {
     "name": "Keadilan (Justice)",
     "keyword": "Keseimbangan",
     "line": "Kejujuran dan keadilan membawa keselarasan — pertimbangkan segalanya dengan bijak."
    },
    {
     "name": "Sang Tergantung (The Hanged Man)",
     "keyword": "Sudut Pandang Baru",
     "line": "Berhenti sejenak dan lihat dari sisi berbeda; jeda ini penuh makna."
    },
    {
     "name": "Kematian (Death)",
     "keyword": "Transformasi",
     "line": "Sebuah babak usai agar babak baru bisa dimulai — lepaskan yang tak lagi melayanimu."
    },
    {
     "name": "Kesederhanaan (Temperance)",
     "keyword": "Harmoni",
     "line": "Keseimbangan dan kesabaran memadukan segala hal menjadi selaras."
    },
    {
     "name": "Sang Iblis (The Devil)",
     "keyword": "Keterikatan",
     "line": "Kenali belenggu yang kamu ciptakan sendiri; kebebasan ada dalam genggamanmu."
    },
    {
     "name": "Menara (The Tower)",
     "keyword": "Pembaruan Mendadak",
     "line": "Guncangan tak terduga membuka jalan bagi fondasi yang lebih jujur dan kuat."
    },
    {
     "name": "Bintang (The Star)",
     "keyword": "Harapan",
     "line": "Cahaya harapan dan ketenangan menyinari jalanmu — percayalah pada masa depan."
    },
    {
     "name": "Bulan (The Moon)",
     "keyword": "Intuisi & Imajinasi",
     "line": "Ikuti firasatmu melewati kabut keraguan; intuisimu lebih tajam dari yang kamu kira."
    },
    {
     "name": "Matahari (The Sun)",
     "keyword": "Kegembiraan",
     "line": "Kehangatan, keberhasilan, dan keceriaan sedang bersinar untukmu hari ini."
    },
    {
     "name": "Penghakiman (Judgement)",
     "keyword": "Kebangkitan",
     "line": "Sebuah panggilan untuk bangkit dan memulai babak baru dengan jiwa yang diperbarui."
    },
    {
     "name": "Dunia (The World)",
     "keyword": "Penyelesaian",
     "line": "Sebuah siklus tuntas dengan indah — rayakan pencapaian dan keutuhanmu."
    }
   ]
  },
  "luckyFour": {
   "title": "Empat Elemen Keberuntungan",
   "colorLabel": "Warna Hoki",
   "numberLabel": "Angka Hoki",
   "directionLabel": "Arah Hoki",
   "timeLabel": "Waktu Hoki",
   "directions": [
    "Utara",
    "Timur Laut",
    "Timur",
    "Tenggara",
    "Selatan",
    "Barat Daya",
    "Barat",
    "Barat Laut"
   ],
   "tip": "Padukan warna, angka, arah, dan waktu hokimu untuk menambah semangat hari ini. Anggap sebagai sentuhan keberuntungan yang menyenangkan, bukan aturan baku."
  },
  "sunSign": {
   "title": "Zodiak (Bintang Matahari)",
   "overallLabel": "Keberuntungan Umum",
   "loveLabel": "Asmara",
   "moneyLabel": "Keuangan",
   "luckyColorLabel": "Warna Hoki",
   "luckyNumberLabel": "Angka Hoki",
   "elementLabel": "Elemen",
   "signs": [
    {
     "name": "Aries",
     "range": "21 Mar – 19 Apr",
     "element": "Api",
     "trait": "Berani, penuh semangat, dan suka memimpin."
    },
    {
     "name": "Taurus",
     "range": "20 Apr – 20 Mei",
     "element": "Tanah",
     "trait": "Setia, sabar, dan menghargai kenyamanan."
    },
    {
     "name": "Gemini",
     "range": "21 Mei – 20 Jun",
     "element": "Udara",
     "trait": "Cerdas, komunikatif, dan penuh rasa ingin tahu."
    },
    {
     "name": "Cancer",
     "range": "21 Jun – 22 Jul",
     "element": "Air",
     "trait": "Penyayang, peka, dan setia pada keluarga."
    },
    {
     "name": "Leo",
     "range": "23 Jul – 22 Agu",
     "element": "Api",
     "trait": "Percaya diri, murah hati, dan karismatik."
    },
    {
     "name": "Virgo",
     "range": "23 Agu – 22 Sep",
     "element": "Tanah",
     "trait": "Teliti, rendah hati, dan suka menolong."
    },
    {
     "name": "Libra",
     "range": "23 Sep – 22 Okt",
     "element": "Udara",
     "trait": "Harmonis, adil, dan pandai bergaul."
    },
    {
     "name": "Scorpio",
     "range": "23 Okt – 21 Nov",
     "element": "Air",
     "trait": "Intens, penuh tekad, dan setia."
    },
    {
     "name": "Sagitarius",
     "range": "22 Nov – 21 Des",
     "element": "Api",
     "trait": "Optimistis, suka petualangan, dan jujur."
    },
    {
     "name": "Capricorn",
     "range": "22 Des – 19 Jan",
     "element": "Tanah",
     "trait": "Disiplin, ambisius, dan bertanggung jawab."
    },
    {
     "name": "Aquarius",
     "range": "20 Jan – 18 Feb",
     "element": "Udara",
     "trait": "Inovatif, mandiri, dan humanis."
    },
    {
     "name": "Pisces",
     "range": "19 Feb – 20 Mar",
     "element": "Air",
     "trait": "Empatik, imajinatif, dan penuh kasih."
    }
   ],
   "daily": [
    "Hari yang cerah untuk memulai sesuatu yang baru — ikuti kata hatimu dengan ringan.",
    "Energi sosialmu sedang bersinar; sapa kabar teman lama bisa membawa kejutan manis.",
    "Saat yang baik untuk merapikan rencana dan menata prioritas dengan tenang.",
    "Intuisimu cukup tajam hari ini — percayai firasat baikmu, namun tetap berpikir jernih.",
    "Luangkan waktu untuk dirimu sendiri; istirahat sejenak mengembalikan semangatmu.",
    "Hal kecil yang penuh perhatian akan mempererat hubunganmu dengan orang terdekat."
   ]
  }
 }
};
