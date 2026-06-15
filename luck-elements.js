// luck-elements.js — 신규 행운요소 5종 9개 언어 콘텐츠
// (바이오리듬·탄생석/탄생화·서양별자리·오늘의 타로·행운의 4요소)
// 언어별 네이티브 생성 + 적대적 검증(워크플로) 후 정규화 조립.
// sunSign=Wave1 호로스코프 확장 / tarot=Wave2 정역·분야·스프레드 확장.
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
     "line": "두려움 없이 첫걸음을 내딛는 순수한 모험의 기운입니다.",
     "reversedKeyword": "성급함·망설임",
     "reversedLine": "발걸음을 잠시 멈추고 방향을 점검해 보세요. 무모함을 다듬으면 더 안전한 길이 열립니다.",
     "love": "새로운 만남에 마음을 열어 두면, 예상치 못한 인연이 가볍게 다가올 수 있는 날입니다.",
     "work": "익숙한 틀을 벗어난 시도가 신선한 기회를 만들어 주니, 두려움 없이 첫발을 떼어 보세요.",
     "money": "작은 모험심이 새 기회를 부르지만, 충동적인 지출은 한 번 더 생각해 보면 좋습니다."
    },
    {
     "name": "1. 마법사",
     "keyword": "창조와 실행",
     "line": "가진 재능을 현실로 펼쳐 낼 준비가 된 때입니다.",
     "reversedKeyword": "공회전·자신감 부족",
     "reversedLine": "재능을 의심하기보다, 흩어진 의욕을 한곳에 모아 차근차근 재정비할 시간입니다.",
     "love": "솔직한 표현이 마음의 거리를 좁혀 주니, 먼저 다가가 진심을 전해 보는 하루입니다.",
     "work": "가진 기술과 아이디어를 실행에 옮기기 좋은 때이니, 주저 말고 행동으로 보여 주세요.",
     "money": "기획한 일을 현실로 만들 추진력이 좋으니, 새 수입원을 차분히 설계해 보세요."
    },
    {
     "name": "2. 여사제",
     "keyword": "직관과 지혜",
     "line": "마음 깊은 곳의 목소리에 귀 기울여 보세요.",
     "reversedKeyword": "혼란·외면한 직관",
     "reversedLine": "마음의 소리가 흐릿할 땐 조급해하지 말고, 고요히 내면을 정리하며 답을 기다려 보세요.",
     "love": "말보다 분위기로 전해지는 마음이 있으니, 상대의 미묘한 신호를 따뜻하게 살펴보세요.",
     "work": "겉으로 드러난 정보 너머의 흐름을 읽으면, 조용한 통찰이 좋은 판단으로 이어집니다.",
     "money": "서두르지 말고 직관과 정보를 함께 살피면, 신중한 결정이 자산을 지켜 줍니다."
    },
    {
     "name": "3. 여황제",
     "keyword": "풍요와 사랑",
     "line": "따뜻한 보살핌과 결실이 무르익는 시기입니다.",
     "reversedKeyword": "과보호·소진",
     "reversedLine": "남을 돌보느라 자신을 잊지 않도록, 먼저 스스로의 마음을 따뜻하게 채워 보세요.",
     "love": "넉넉한 애정과 다정함이 관계를 무르익게 하니, 마음껏 사랑을 표현해도 좋은 날입니다.",
     "work": "창의력과 협력의 기운이 풍성하니, 함께 키워 온 결실을 거두기 좋은 시기입니다.",
     "money": "풍요의 흐름이 따르니, 가꾸어 온 노력이 안정된 수확으로 돌아올 수 있습니다."
    },
    {
     "name": "4. 황제",
     "keyword": "안정과 책임",
     "line": "든든한 기반 위에서 주도적으로 이끌어 갈 때입니다.",
     "reversedKeyword": "경직·통제욕",
     "reversedLine": "원칙을 고집하기보다, 유연하게 한 발 물러서서 균형점을 다시 찾아보면 좋겠습니다.",
     "love": "든든하고 한결같은 태도가 신뢰를 주니, 안정감 있는 관계를 다져 가기 좋은 날입니다.",
     "work": "체계와 책임감을 발휘해 주도적으로 이끌면, 흔들림 없는 성과로 이어집니다.",
     "money": "계획적인 관리와 절제가 빛을 발하니, 탄탄한 기반을 다지기 좋은 시기입니다."
    },
    {
     "name": "5. 교황",
     "keyword": "전통과 가르침",
     "line": "신뢰할 수 있는 조언과 배움이 길을 밝혀 줍니다.",
     "reversedKeyword": "형식·고정관념",
     "reversedLine": "관습에 얽매이기보다 자신만의 기준을 점검하며, 진짜 맞는 길인지 차분히 돌아보세요.",
     "love": "신뢰와 약속을 소중히 여기는 마음이, 관계를 한층 깊고 안정되게 만들어 줍니다.",
     "work": "경험 많은 이의 조언과 검증된 방식이, 일을 안전하게 이끌어 주는 하루입니다.",
     "money": "전통적이고 안정적인 방식의 관리가, 재정에 든든한 버팀목이 되어 줍니다."
    },
    {
     "name": "6. 연인",
     "keyword": "사랑과 선택",
     "line": "마음을 따르는 소중한 인연과 결정의 순간입니다.",
     "reversedKeyword": "갈등·선택 미룸",
     "reversedLine": "마음이 둘로 나뉠 땐, 무엇을 진정 원하는지 솔직히 마주하며 천천히 정리해 보세요.",
     "love": "진심으로 끌리는 인연과 마주하는 날이니, 마음이 향하는 곳을 솔직히 따라가 보세요.",
     "work": "함께할 사람이나 방향을 정하는 결정이, 앞으로의 흐름을 좋은 쪽으로 이끕니다.",
     "money": "가치관에 맞는 선택이 중요하니, 마음이 편안한 쪽으로 자금을 운용해 보세요."
    },
    {
     "name": "7. 전차",
     "keyword": "전진과 의지",
     "line": "흔들림 없는 의지로 목표를 향해 나아갑니다.",
     "reversedKeyword": "조급·방향 상실",
     "reversedLine": "속도를 내기 전에 목표를 다시 또렷이 그리고, 흐트러진 마음의 방향을 가다듬어 보세요.",
     "love": "주도적으로 다가가는 적극성이 관계를 진전시키니, 망설임을 내려놓아도 좋은 날입니다.",
     "work": "강한 의지와 집중력으로 밀어붙이면, 목표를 향해 한 걸음 크게 나아갈 수 있습니다.",
     "money": "결단력 있는 추진이 좋은 결과를 부르니, 계획한 일을 흔들림 없이 진행해 보세요."
    },
    {
     "name": "8. 힘",
     "keyword": "용기와 인내",
     "line": "부드러운 마음의 힘으로 어려움을 다스립니다.",
     "reversedKeyword": "자기의심·조바심",
     "reversedLine": "스스로를 다그치기보다, 따뜻한 인내로 마음을 다독이며 천천히 힘을 회복해 보세요.",
     "love": "부드러운 이해와 포용이 관계를 단단하게 하니, 너그러운 마음으로 다가가 보세요.",
     "work": "조급함을 다스리는 차분한 끈기가, 어려운 상황을 슬기롭게 풀어내는 힘이 됩니다.",
     "money": "성급한 판단을 내려놓고 꾸준히 관리하면, 안정된 흐름을 지켜 갈 수 있습니다."
    },
    {
     "name": "9. 은둔자",
     "keyword": "성찰과 탐구",
     "line": "잠시 멈추어 내면을 들여다보는 고요한 시간입니다.",
     "reversedKeyword": "고립·단절",
     "reversedLine": "홀로 깊어지는 것도 좋지만, 마음을 너무 닫지 않도록 적당한 거리를 살펴보세요.",
     "love": "혼자만의 시간을 통해 마음을 정리하면, 진짜 원하는 관계가 또렷이 보이는 날입니다.",
     "work": "잠시 거리를 두고 깊이 사색하면, 본질을 꿰뚫는 현명한 답을 얻을 수 있습니다.",
     "money": "차분히 점검하며 신중을 기하는 자세가, 불필요한 지출을 줄여 주는 시기입니다."
    },
    {
     "name": "10. 운명의 수레바퀴",
     "keyword": "전환과 기회",
     "line": "운의 흐름이 새롭게 돌아가는 변화의 순간입니다.",
     "reversedKeyword": "정체·불운감",
     "reversedLine": "흐름이 더디게 느껴져도, 통제할 수 없는 부분은 내려놓고 할 수 있는 일에 집중해 보세요.",
     "love": "변화의 바람이 인연의 흐름을 새롭게 하니, 다가오는 기회를 열린 마음으로 맞이하세요.",
     "work": "예상 밖의 전환이 좋은 기회로 이어질 수 있으니, 변화의 물결에 유연히 올라타 보세요.",
     "money": "운의 흐름이 돌아가는 시기이니, 좋은 기회가 왔을 때 놓치지 않도록 준비해 두세요."
    },
    {
     "name": "11. 정의",
     "keyword": "균형과 공정",
     "line": "올바른 판단과 정직함이 좋은 결과로 이어집니다.",
     "reversedKeyword": "불공정·책임 회피",
     "reversedLine": "균형이 흔들릴 땐 누구의 탓을 찾기보다, 스스로의 몫을 정직하게 돌아보면 좋겠습니다.",
     "love": "솔직하고 공정한 태도가 신뢰를 키우니, 마음을 투명하게 나누기 좋은 하루입니다.",
     "work": "정확한 판단과 원칙 있는 처신이, 정당한 인정과 좋은 결과로 이어집니다.",
     "money": "투명하고 합리적인 셈이 중요하니, 계약과 거래를 꼼꼼히 살펴보면 좋습니다."
    },
    {
     "name": "12. 매달린 사람",
     "keyword": "성찰과 내려놓음",
     "line": "관점을 바꾸어 보면 새로운 길이 보입니다.",
     "reversedKeyword": "고집·헛수고",
     "reversedLine": "버티기만 하기보다, 잠시 힘을 빼고 관점을 바꾸면 막힌 곳이 자연스레 풀립니다.",
     "love": "조급한 결론을 잠시 미루고 기다려 주면, 관계가 자연스러운 답을 찾아갑니다.",
     "work": "잠시 멈추어 다른 시각으로 바라보면, 막혔던 문제의 새로운 실마리가 보입니다.",
     "money": "당장의 결정을 서두르지 않고 관망하는 여유가, 더 나은 선택을 도와줍니다."
    },
    {
     "name": "13. 죽음",
     "keyword": "끝과 새 출발",
     "line": "낡은 것을 마무리하고 새로운 시작을 맞이합니다.",
     "reversedKeyword": "집착·변화 거부",
     "reversedLine": "끝맺음이 두렵더라도, 놓아주어야 할 것을 부드럽게 내려놓으면 새 길이 열립니다.",
     "love": "지나간 인연을 정리하고 마음을 비우면, 더 잘 맞는 새로운 관계가 찾아옵니다.",
     "work": "낡은 방식을 마무리하고 새 단계로 넘어가기 좋은, 의미 있는 전환의 시기입니다.",
     "money": "효율이 떨어진 지출을 정리하면, 자원이 더 가치 있는 곳으로 흐르게 됩니다."
    },
    {
     "name": "14. 절제",
     "keyword": "조화와 균형",
     "line": "서두르지 않는 절제가 마음의 평온을 가져옵니다.",
     "reversedKeyword": "불균형·과욕",
     "reversedLine": "한쪽으로 치우쳤다면, 무리한 속도를 늦추고 마음과 일상의 균형을 다시 맞춰 보세요.",
     "love": "서두르지 않는 배려와 조화가, 관계를 편안하고 깊은 신뢰로 이끌어 줍니다.",
     "work": "여러 일을 조율하는 균형 감각이, 무리 없이 좋은 성과를 만들어 내는 날입니다.",
     "money": "절제와 균형 잡힌 소비가, 흔들림 없는 재정 흐름을 지켜 주는 시기입니다."
    },
    {
     "name": "15. 악마",
     "keyword": "유혹과 집착",
     "line": "얽매인 마음을 살피고 가볍게 풀어낼 때입니다.",
     "reversedKeyword": "해방·집착 자각",
     "reversedLine": "얽매인 습관이나 관계를 알아차렸다면, 자신을 옥죄던 끈을 천천히 풀어내 보세요.",
     "love": "끌림과 집착을 구분해 보면, 건강한 거리에서 더 편안한 관계를 가꿀 수 있습니다.",
     "work": "당장의 유혹보다 멀리 보는 선택이, 일의 흐름을 건강하게 지켜 줍니다.",
     "money": "충동과 과소비의 고리를 끊으면, 새는 돈을 막고 마음의 여유를 되찾습니다."
    },
    {
     "name": "16. 탑",
     "keyword": "변화와 각성",
     "line": "예상치 못한 변화가 새로운 깨달음을 줍니다.",
     "reversedKeyword": "여진·회피",
     "reversedLine": "갑작스러운 흔들림이 지나갔다면, 무너진 자리를 차분히 살피며 다시 쌓아 가 보세요.",
     "love": "예상 밖의 변화가 오히려 관계의 진심을 드러내니, 두려워 말고 솔직히 마주하세요.",
     "work": "흔들리던 구조가 정리되면서, 더 단단한 토대를 세울 기회가 찾아오는 시기입니다.",
     "money": "갑작스러운 변동에 대비해 두면, 위기를 오히려 정비의 계기로 삼을 수 있습니다."
    },
    {
     "name": "17. 별",
     "keyword": "희망과 영감",
     "line": "맑은 희망이 마음을 환하게 비추는 시기입니다.",
     "reversedKeyword": "낙담·자신감 저하",
     "reversedLine": "희망이 흐려질 땐 스스로를 너무 몰아세우지 말고, 작은 빛부터 천천히 되찾아 보세요.",
     "love": "맑고 진솔한 마음이 인연을 끌어당기니, 부드러운 기대를 품고 다가가도 좋은 날입니다.",
     "work": "새로운 영감과 희망이 길을 밝히니, 오래 품어 온 꿈에 다시 도전해 볼 만합니다.",
     "money": "긍정적인 흐름이 서서히 회복되니, 길게 보고 차분히 계획을 세워 가기 좋습니다."
    },
    {
     "name": "18. 달",
     "keyword": "직관과 상상",
     "line": "어렴풋한 마음을 차분히 들여다보면 길이 보입니다.",
     "reversedKeyword": "불안·오해",
     "reversedLine": "마음이 어수선할 땐 막연한 두려움에 휩쓸리지 말고, 사실과 감정을 차분히 구분해 보세요.",
     "love": "오해가 생기기 쉬운 때이니, 짐작보다 솔직한 대화로 마음을 확인해 보는 하루입니다.",
     "work": "불확실함 속에서도 차분히 정보를 살피면, 어렴풋하던 길이 점차 또렷해집니다.",
     "money": "확실하지 않은 정보에 흔들리지 말고, 신중하게 사실을 확인한 뒤 결정해 보세요."
    },
    {
     "name": "19. 태양",
     "keyword": "기쁨과 성취",
     "line": "밝은 에너지가 가득한 행복하고 성공적인 때입니다.",
     "reversedKeyword": "지연·들뜸",
     "reversedLine": "기쁨이 잠시 가려진 듯해도, 조급해하지 말고 작은 즐거움부터 다시 챙겨 보세요.",
     "love": "밝고 따뜻한 에너지가 관계를 환하게 하니, 솔직한 애정을 마음껏 나누기 좋은 날입니다.",
     "work": "활기와 자신감이 가득하니, 그동안의 노력이 빛나는 성취로 이어지는 시기입니다.",
     "money": "긍정적인 흐름이 따르니, 노력의 결실을 즐기되 들뜬 지출은 가볍게 조절해 보세요."
    },
    {
     "name": "20. 심판",
     "keyword": "각성과 부활",
     "line": "지난날을 돌아보며 새롭게 거듭나는 순간입니다.",
     "reversedKeyword": "자기비판·주저",
     "reversedLine": "지난 일을 너무 엄히 탓하기보다, 배움으로 받아들이고 새 출발의 용기를 내어 보세요.",
     "love": "지난 인연을 돌아보며 마음을 정리하면, 한층 성숙한 사랑으로 나아갈 수 있습니다.",
     "work": "그동안의 경험을 되짚어 보면, 한 단계 도약할 새로운 부름을 알아차리게 됩니다.",
     "money": "지난 선택을 점검하고 재정비하면, 더 현명한 재정 방향을 다시 세울 수 있습니다."
    },
    {
     "name": "21. 세계",
     "keyword": "완성과 성취",
     "line": "하나의 여정이 아름답게 완결되는 충만한 시기입니다.",
     "reversedKeyword": "미완·마무리 지연",
     "reversedLine": "거의 다 왔으니 조급해 말고, 남은 매듭을 차분히 정리하며 끝까지 완성해 보세요.",
     "love": "함께 쌓아 온 마음이 결실을 맺으니, 관계의 한 단계를 충만하게 완성하는 날입니다.",
     "work": "오랜 여정이 아름답게 마무리되니, 성취를 누리며 다음 무대를 준비하기 좋습니다.",
     "money": "노력의 결실이 무르익는 시기이니, 거둔 성과를 안정되게 갈무리하면 좋습니다."
    }
   ],
   "reversedLabel": "역방향",
   "fieldLabels": {
    "love": "연애",
    "work": "일",
    "money": "금전"
   },
   "spreadTitle": "과거·현재·미래 3카드 스프레드",
   "positions": [
    "과거",
    "현재",
    "미래"
   ],
   "askMore": "이 카드에 대해 더 물어보기"
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
   ],
   "dailyBySign": [
    [
     "타고난 추진력이 깨어나는 날입니다. 머뭇거리던 일에 먼저 손을 대면 막혀 있던 흐름이 시원하게 풀립니다.",
     "열정이 앞설수록 상대의 속도도 살펴 주세요. 한 박자 기다려 주는 배려가 관계를 더 단단하게 만듭니다.",
     "결정이 빠른 당신답게 오늘은 망설였던 일을 과감히 시작하기 좋습니다. 첫발만 떼면 나머지는 기세가 끌고 갑니다.",
     "화르르 타오르는 마음을 잠시 가다듬어 보세요. 깊게 숨을 고르면 더 멀리, 더 오래 달릴 힘이 생깁니다.",
     "새로운 기회가 정면에서 다가옵니다. 평소처럼 두려움 없이 부딪쳐 보면 값진 경험으로 돌아옵니다.",
     "급한 마음에 말이 앞설 수 있으니 한 번 더 생각하고 표현해 보세요. 부드러운 한마디가 추진력을 빛나게 합니다."
    ],
    [
     "꾸준함이 빛을 발하는 하루입니다. 서두르지 않고 늘 하던 대로 쌓아 가면 든든한 성과가 손에 잡힙니다.",
     "사랑하는 이에게 작은 정성을 들여 보세요. 따뜻한 식사 한 끼, 다정한 손길이 마음을 깊이 데워 줍니다.",
     "눈앞의 실속을 챙기기 좋은 날입니다. 현실적인 선택이 당신에게 안정과 풍요를 함께 안겨 줍니다.",
     "변화가 불편하더라도 조금만 마음을 열어 보세요. 익숙함 너머에 뜻밖의 편안함이 기다리고 있습니다.",
     "오래 공들인 일에서 결실의 신호가 보입니다. 묵묵히 지켜 온 인내가 든든한 보상으로 이어집니다.",
     "고집을 잠시 내려놓으면 더 좋은 길이 보입니다. 유연함을 더하면 당신의 안정감이 한층 빛납니다."
    ],
    [
     "호기심이 샘솟는 하루입니다. 새로운 정보나 만남이 당신의 하루에 신선한 활력을 불어넣어 줍니다.",
     "가벼운 대화 속에 마음이 통하는 순간이 찾아옵니다. 재치 있는 한마디가 관계의 거리를 좁혀 줍니다.",
     "여러 일을 동시에 다루는 재주가 돋보이는 날입니다. 다만 우선순위 하나만 정해 두면 더 매끄럽게 흘러갑니다.",
     "생각이 많아 마음이 분주할 수 있습니다. 잠시 멈춰 한 가지에 집중하면 머릿속이 한결 맑아집니다.",
     "뜻밖의 소식이나 제안이 새 문을 열어 줍니다. 가벼운 호기심으로 다가가면 좋은 인연이 됩니다.",
     "말이 빠르게 흩어질 수 있으니 약속은 메모로 남겨 두세요. 작은 기록이 신뢰를 단단하게 지켜 줍니다."
    ],
    [
     "마음이 한층 포근해지는 하루입니다. 가까운 사람과 보내는 시간이 당신에게 깊은 안정을 선물합니다.",
     "소중한 이의 마음을 살뜰히 헤아려 보세요. 말없이 건네는 다정함이 관계를 더없이 따뜻하게 합니다.",
     "익숙한 환경에서 능력이 잘 발휘됩니다. 무리한 확장보다 지금 자리에서 차분히 다지는 편이 이롭습니다.",
     "감정의 물결이 잔잔히 일렁일 수 있습니다. 좋아하는 음악이나 따뜻한 차로 마음을 돌봐 주세요.",
     "오래 마음에 둔 인연에게서 반가운 연락이 올 수 있습니다. 진심을 담아 화답하면 정이 깊어집니다.",
     "남의 기분까지 떠안아 지칠 수 있으니 적당한 거리를 두세요. 자신을 먼저 챙기는 일도 사랑입니다."
    ],
    [
     "당당한 존재감이 환하게 빛나는 하루입니다. 자신감을 가지고 나서면 주변의 시선이 자연스레 모입니다.",
     "너그러운 마음이 관계를 따뜻하게 밝힙니다. 먼저 칭찬을 건네면 더 큰 호의가 되어 돌아옵니다.",
     "무대의 중심에 서기 좋은 날입니다. 당신의 리더십이 사람들을 모으고 일을 시원하게 이끌어 갑니다.",
     "인정받고 싶은 마음이 클수록 잠시 겸손을 더해 보세요. 빛나는 당신이 한결 더 사랑스러워집니다.",
     "주목받는 자리에서 좋은 기회가 열립니다. 당당하게 자신을 표현하면 값진 결실로 이어집니다.",
     "자존심에 작은 흠이 나도 크게 흔들리지 마세요. 넓은 도량으로 품으면 당신의 품격이 더 높아집니다."
    ],
    [
     "꼼꼼한 눈썰미가 돋보이는 하루입니다. 작은 부분까지 챙기는 정성이 큰 차이를 만들어 냅니다.",
     "마음을 솔직하게 표현해 보세요. 완벽하지 않아도 진심이 담기면 상대에게 충분히 전해집니다.",
     "계획을 정돈하기 좋은 날입니다. 흩어진 일을 차근차근 정리하면 머릿속도 한결 가벼워집니다.",
     "스스로에게 지나치게 엄격해지지 마세요. 80점이면 충분하다는 마음이 당신을 더 편안하게 합니다.",
     "세심함을 알아봐 주는 기회가 찾아옵니다. 묵묵히 다듬어 온 실력이 좋은 평가로 이어집니다.",
     "사소한 흠이 자꾸 눈에 들어올 수 있습니다. 큰 그림을 떠올리면 불필요한 걱정이 가벼워집니다."
    ],
    [
     "조화로운 감각이 빛나는 하루입니다. 균형 잡힌 판단이 주변에 편안한 분위기를 만들어 줍니다.",
     "사람을 잇는 당신의 매력이 돋보입니다. 다정한 미소 한 번이 관계를 한층 부드럽게 풀어 줍니다.",
     "의견을 조율하는 자리에서 능력이 발휘됩니다. 서로의 입장을 잇는 다리 역할이 좋은 결실을 부릅니다.",
     "결정을 미루다 마음이 무거워질 수 있습니다. 작은 일부터 가볍게 정하면 마음이 한결 편안해집니다.",
     "아름다움과 인연이 가까이 다가오는 날입니다. 마음을 여는 만남이 기분 좋은 변화를 가져옵니다.",
     "모두를 만족시키려다 자신을 놓치지 마세요. 당신의 진심도 똑같이 소중하게 챙겨 주세요."
    ],
    [
     "깊은 집중력이 살아나는 하루입니다. 한 가지에 몰두하면 남들이 못 본 핵심을 또렷이 꿰뚫어 봅니다.",
     "마음을 조금 더 열어 보세요. 신뢰를 건넨 만큼 상대도 진심으로 다가와 관계가 깊어집니다.",
     "끈기가 필요한 일에서 진가가 드러납니다. 끝까지 파고드는 당신의 힘이 묵직한 성과를 만듭니다.",
     "속마음을 너무 오래 담아 두면 무거워집니다. 믿을 만한 이에게 살며시 털어놓으면 한결 가벼워집니다.",
     "숨겨진 기회를 알아보는 통찰이 빛납니다. 직감이 끌리는 쪽에 한 걸음 다가가 보세요.",
     "의심이 깊어질 땐 잠시 멈춰 보세요. 상대의 선의를 믿어 주면 마음의 평화가 찾아옵니다."
    ],
    [
     "자유로운 기운이 넘치는 하루입니다. 낯선 길로 떠나는 작은 모험이 당신에게 신선한 영감을 줍니다.",
     "솔직한 매력이 사람을 끌어당깁니다. 밝은 에너지를 나누면 관계가 즐겁고 편안하게 이어집니다.",
     "넓은 시야가 필요한 일에 강점을 발휘합니다. 큰 그림을 그리면 새로운 가능성이 활짝 열립니다.",
     "낙천적인 마음은 좋지만 약속은 꼭 지켜 주세요. 작은 책임감이 당신의 신뢰를 더 빛나게 합니다.",
     "배움과 여행이 행운을 부르는 날입니다. 호기심을 따라가면 뜻밖의 좋은 인연을 만납니다.",
     "말이 앞서 가벼워 보일 수 있으니 한 번 더 다듬어 보세요. 진중함을 더하면 매력이 깊어집니다."
    ],
    [
     "묵묵한 성실함이 빛나는 하루입니다. 목표를 향해 한 계단씩 오르면 어느새 든든한 위치에 서 있습니다.",
     "무뚝뚝해 보여도 깊은 정을 표현해 보세요. 작은 표현 하나가 관계를 따뜻하게 데워 줍니다.",
     "책임을 맡기 좋은 날입니다. 당신의 신중함과 끈기가 어려운 일도 차분히 풀어 나갑니다.",
     "일에만 몰두하다 자신을 잊지 마세요. 잠깐의 휴식이 더 멀리 나아갈 힘을 되돌려 줍니다.",
     "오래 준비한 일에서 결실의 기회가 찾아옵니다. 꾸준함이 든든한 성과로 보답합니다.",
     "너무 엄격한 기준에 마음이 굳을 수 있습니다. 자신에게도 따뜻한 격려를 건네 주세요."
    ],
    [
     "독창적인 발상이 반짝이는 하루입니다. 남다른 시선이 평범한 일에서 새로운 길을 찾아냅니다.",
     "마음이 통하는 친구와의 시간이 즐겁습니다. 격식 없는 대화가 관계에 신선한 활력을 더합니다.",
     "틀에 얽매이지 않는 아이디어가 빛을 발합니다. 자유로운 발상이 일에 돌파구를 열어 줍니다.",
     "머리로만 생각하다 마음이 멀어지지 않게 하세요. 따뜻한 감정 표현이 관계를 더 가깝게 합니다.",
     "뜻밖의 만남이나 정보가 새 가능성을 엽니다. 열린 마음으로 다가가면 좋은 인연이 됩니다.",
     "혼자만의 방식을 고집하기보다 함께 맞춰 보세요. 협력이 더해지면 아이디어가 더 크게 자랍니다."
    ],
    [
     "풍부한 감성이 차오르는 하루입니다. 따뜻한 상상력이 평범한 순간을 특별하게 물들여 줍니다.",
     "마음을 어루만지는 다정함이 빛납니다. 상대의 슬픔에 공감해 주면 관계가 더없이 깊어집니다.",
     "창의적인 일에서 영감이 샘솟습니다. 직감이 이끄는 대로 표현하면 뜻밖의 좋은 결과가 따릅니다.",
     "감정에 깊이 잠겨 지칠 수 있습니다. 잠시 현실에 발을 디디면 마음이 한결 또렷해집니다.",
     "예술이나 인연에서 기분 좋은 기회가 찾아옵니다. 마음의 문을 열어 두면 행운이 스며듭니다.",
     "남의 부탁을 다 들어주다 지치지 마세요. 부드럽게 거절하는 것도 자신을 지키는 다정함입니다."
    ]
   ],
   "moonTraits": [
    "속마음도 솔직하고 직선적이라 감정이 즉각 드러나며, 화도 빨리 났다가 금세 풀리는 편입니다.",
    "마음이 안정되어야 편안함을 느끼며, 익숙한 사람과 환경 속에서 깊은 정서적 안도를 얻습니다.",
    "감정도 호기심을 따라 가볍게 움직이며, 마음을 말로 풀어내야 속이 후련해지는 사람입니다.",
    "정이 깊고 보호 본능이 강해, 가까운 이를 품을 때 가장 큰 정서적 충만함을 느낍니다.",
    "마음 깊이 인정과 사랑을 바라며, 따뜻한 관심을 받을 때 비로소 안정을 찾는 사람입니다.",
    "속으로 끊임없이 살피고 점검하며, 주변이 정돈되어 있을 때 마음의 평온을 얻습니다.",
    "혼자보다 함께일 때 마음이 편안해지며, 관계의 조화 속에서 정서적 균형을 찾습니다.",
    "감정이 깊고 진하게 흐르며, 한번 마음을 주면 좀처럼 변하지 않는 깊은 애착을 지녔습니다.",
    "마음에 자유가 있어야 숨통이 트이며, 새로운 경험과 낙천적 기대 속에서 활력을 얻습니다.",
    "감정을 쉽게 드러내지 않고 안으로 다스리며, 책임을 다할 때 내면의 안정을 느낍니다.",
    "감정조차 한 발 물러나 바라보며, 정서적 자유와 독립이 보장될 때 가장 편안해집니다.",
    "마음이 물처럼 섬세해 주변 분위기를 깊이 흡수하며, 공감 속에서 정서적 충만을 느낍니다."
   ],
   "labels": {
    "bigTwoTitle": "태양·달 프로필",
    "sunLabel": "태양궁 (겉으로 드러나는 모습)",
    "moonLabel": "달별자리 (마음속 감정)",
    "overall": "총운",
    "love": "애정운",
    "money": "재물운",
    "health": "건강운",
    "career": "직업운",
    "social": "대인운",
    "compatTitle": "오늘의 별자리 궁합",
    "bestToday": "오늘 잘 맞는 별자리",
    "cautionToday": "오늘 조심할 별자리",
    "metaTitle": "별자리 정보",
    "planetLabel": "수호행성",
    "modalityLabel": "특성",
    "polarityLabel": "극성"
   }
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
     "line": "A fresh adventure is calling — step forward with an open, trusting heart.",
     "reversedKeyword": "Hesitation",
     "reversedLine": "A good moment to pause and plan before you leap, so your excitement rests on a little practical preparation.",
     "love": "Approach connection with open curiosity today; lightness and honesty invite a fresh, easy spark.",
     "work": "A new idea or role is worth exploring, so trust your beginner's energy and start small.",
     "money": "A fresh financial chapter opens, though it rewards a clear plan more than pure impulse."
    },
    {
     "name": "The Magician",
     "keyword": "Manifestation",
     "line": "You have all the tools you need; focus your intention and make it real.",
     "reversedKeyword": "Scattered Focus",
     "reversedLine": "Gather your energy toward one clear intention, and your skills will land with far more impact.",
     "love": "You have the charm to express what you truly want, so speak from the heart with confidence.",
     "work": "Your talents are aligned to make things happen, so take focused, decisive action on a goal.",
     "money": "You have the resourcefulness to improve your situation through a deliberate, well-aimed move."
    },
    {
     "name": "The High Priestess",
     "keyword": "Intuition",
     "line": "Listen to your inner voice today — it knows more than it lets on.",
     "reversedKeyword": "Inner Noise",
     "reversedLine": "Quiet the outside chatter and reconnect with your intuition, which already knows the next gentle step.",
     "love": "Listen beneath the words today; unspoken feelings and quiet signals reveal more than open conversation.",
     "work": "Trust your instincts before acting, and let patient observation guide a wiser professional choice.",
     "money": "Hold back from rushing; a thoughtful, intuitive read of the situation protects your resources."
    },
    {
     "name": "The Empress",
     "keyword": "Abundance",
     "line": "Nurture what you love and watch it blossom into something beautiful.",
     "reversedKeyword": "Self-Neglect",
     "reversedLine": "Turn some of your nurturing care inward, replenishing yourself so your warmth can flow freely again.",
     "love": "Warmth and tenderness deepen your bond today, so let affection and generous attention flow openly.",
     "work": "Creative, collaborative energy flourishes now, so nurture your ideas and the people growing them alongside you.",
     "money": "Abundance is supported by patient cultivation, so tend your resources with care rather than haste."
    },
    {
     "name": "The Emperor",
     "keyword": "Structure",
     "line": "A little order and steady leadership bring stability to your day.",
     "reversedKeyword": "Rigidity",
     "reversedLine": "Loosen any overly tight control and invite flexibility, letting steady structure breathe with a little room.",
     "love": "Stability and reliability strengthen your relationship today, so offer steady presence and dependable support.",
     "work": "Solid structure and clear leadership move things forward, so organize your plan and lead with confidence.",
     "money": "Disciplined planning builds lasting security, so set firm boundaries and manage your budget steadily."
    },
    {
     "name": "The Hierophant",
     "keyword": "Tradition",
     "line": "Lean on trusted wisdom or a mentor's guidance to find your footing.",
     "reversedKeyword": "Blind Conformity",
     "reversedLine": "Honor tradition while questioning what no longer fits, so your choices stay genuinely your own.",
     "love": "Shared values and commitment bring harmony today, so honor the meaning you build together.",
     "work": "Guidance, mentorship, or proven methods serve you well, so learn from those who walked the path before you.",
     "money": "Trusted, conventional advice steadies your finances, so lean on established, time-tested approaches."
    },
    {
     "name": "The Lovers",
     "keyword": "Connection",
     "line": "Harmony and heartfelt choices bring you closer to someone special.",
     "reversedKeyword": "Misalignment",
     "reversedLine": "Revisit your values before deciding, and realign your choices with what genuinely matters to you.",
     "love": "A meaningful connection or choice asks for your heart, so choose with honesty and openness.",
     "work": "An important decision or partnership invites alignment, so commit to what reflects your true values.",
     "money": "A financial choice is best made from your values, so weigh your options with clarity and integrity."
    },
    {
     "name": "The Chariot",
     "keyword": "Determination",
     "line": "Stay focused and keep moving — your willpower carries you to victory.",
     "reversedKeyword": "Lost Direction",
     "reversedLine": "Steady your scattered drive and refocus, so your determination pulls you toward one clear destination.",
     "love": "Confidence and clear intention move your relationship forward, so steer toward what you genuinely want.",
     "work": "Focused willpower drives real progress now, so push ahead with discipline and a clear goal.",
     "money": "Determined, controlled effort improves your finances, so stay the course toward a defined target."
    },
    {
     "name": "Strength",
     "keyword": "Inner Courage",
     "line": "Gentle patience and quiet confidence overcome any challenge today.",
     "reversedKeyword": "Self-Doubt",
     "reversedLine": "Be gentle with your own vulnerability, and rebuild confidence through patience rather than forceful pressure.",
     "love": "Patience and compassion soften any tension today, so lead with gentle strength and understanding.",
     "work": "Quiet resilience carries you through challenges, so stay calm and persistent under pressure.",
     "money": "Steady composure helps you handle money matters, so respond with patience rather than panic."
    },
    {
     "name": "The Hermit",
     "keyword": "Reflection",
     "line": "A quiet moment alone brings the clarity you have been seeking.",
     "reversedKeyword": "Isolation",
     "reversedLine": "Honor your need for solitude, but stay gently connected so reflection does not slip into withdrawal.",
     "love": "A reflective pause helps you understand your true feelings, so give yourself thoughtful, honest space.",
     "work": "Step back to gain perspective today, and let careful reflection clarify your next professional move.",
     "money": "A quiet review of your finances brings insight, so examine your situation calmly and honestly."
    },
    {
     "name": "Wheel of Fortune",
     "keyword": "Lucky Turn",
     "line": "Fortune is turning in your favor — welcome the change with open arms.",
     "reversedKeyword": "Resistance",
     "reversedLine": "Work with the shifting tide rather than against it, trusting that cycles turn in their own time.",
     "love": "A natural turn of fortune brings movement today, so welcome change with an open, hopeful heart.",
     "work": "Circumstances are shifting in your favor, so stay adaptable and ready to seize a timely opening.",
     "money": "A change in your financial cycle is unfolding, so remain flexible and open to new opportunity."
    },
    {
     "name": "Justice",
     "keyword": "Fairness",
     "line": "Honesty and balance guide you toward the right decision today.",
     "reversedKeyword": "Imbalance",
     "reversedLine": "Look honestly at the situation and take accountability, so fairness can be gently restored.",
     "love": "Honesty and fairness strengthen your bond today, so communicate clearly and keep things balanced.",
     "work": "Clear, fair decisions move things forward, so weigh the facts carefully and act with integrity.",
     "money": "Balanced, accountable choices protect your finances, so review your commitments honestly and settle matters fairly."
    },
    {
     "name": "The Hanged Man",
     "keyword": "New Perspective",
     "line": "Pause and see things from a fresh angle — patience reveals the answer.",
     "reversedKeyword": "Stalling",
     "reversedLine": "Release what keeps you stuck and shift your perspective, so a fresh view can set you free.",
     "love": "A new perspective deepens understanding today, so pause and see your relationship through fresh eyes.",
     "work": "Surrender to a brief pause and let insight come, then a wiser approach will reveal itself.",
     "money": "A change of viewpoint reframes your finances, so consider a patient, less conventional approach."
    },
    {
     "name": "Death",
     "keyword": "Transformation",
     "line": "Let go of what no longer serves you to make room for something new.",
     "reversedKeyword": "Clinging",
     "reversedLine": "Gently allow a natural ending so something new can begin, trusting transformation as a quiet renewal.",
     "love": "A meaningful transition refreshes your connection today, so release the old and welcome genuine renewal.",
     "work": "An ending clears space for growth, so let go of what is finished and move forward.",
     "money": "Closing an old financial chapter makes room for the new, so embrace a clean, fresh start."
    },
    {
     "name": "Temperance",
     "keyword": "Balance",
     "line": "A calm, measured approach brings harmony to everything you touch.",
     "reversedKeyword": "Excess",
     "reversedLine": "Restore a little balance and moderation, blending the pieces of your life back into gentle harmony.",
     "love": "Patience and balance bring harmony today, so blend your needs with your partner's with grace.",
     "work": "A calm, measured approach yields the best results, so pace yourself and integrate your efforts smoothly.",
     "money": "Moderation and steady balance serve your finances, so spend and save with thoughtful proportion."
    },
    {
     "name": "The Devil",
     "keyword": "Release",
     "line": "Notice what holds you back, and gently free yourself from old habits.",
     "reversedKeyword": "Releasing Chains",
     "reversedLine": "Notice what quietly holds you, and take one honest step toward reclaiming your own freedom.",
     "love": "Examine any unhealthy patterns today, and choose connection that feels genuinely free and respectful.",
     "work": "Watch for habits or pressures that bind you, and reclaim your autonomy with honest awareness.",
     "money": "Be mindful of tempting overcommitment, and free yourself from spending that quietly weighs you down."
    },
    {
     "name": "The Tower",
     "keyword": "Sudden Change",
     "line": "An unexpected shift clears the way for a stronger, truer foundation.",
     "reversedKeyword": "Slow Release",
     "reversedLine": "Even sudden change can clear space for something truer, so steady yourself and rebuild on firmer ground.",
     "love": "An honest revelation can refresh your relationship today, so welcome the clarity that truth brings.",
     "work": "An unexpected shift breaks down what no longer holds, so adapt and rebuild on stronger foundations.",
     "money": "A financial surprise invites honest reassessment, so review your structure and rebuild it more securely."
    },
    {
     "name": "The Star",
     "keyword": "Hope",
     "line": "Keep your hopes high — brighter days and gentle healing are on the way.",
     "reversedKeyword": "Faded Hope",
     "reversedLine": "Reconnect gently with your hope, letting small moments of faith restore your inner light.",
     "love": "Hope and openness renew your connection today, so let trust and tenderness guide your heart.",
     "work": "Inspiration and quiet optimism light your path, so keep faith in your vision and your gifts.",
     "money": "A hopeful, patient outlook supports recovery, so trust that steady effort will brighten your finances."
    },
    {
     "name": "The Moon",
     "keyword": "Imagination",
     "line": "Trust your dreams and intuition, even when the path feels unclear.",
     "reversedKeyword": "Confusion",
     "reversedLine": "Move slowly through uncertainty, and let clarity surface gradually rather than forcing premature conclusions.",
     "love": "Look beneath the surface today, and give unspoken feelings gentle time to become clear.",
     "work": "Things may feel unclear right now, so gather more information before committing to a major decision.",
     "money": "Avoid acting on incomplete information, and wait for clarity before making a financial move."
    },
    {
     "name": "The Sun",
     "keyword": "Joy",
     "line": "Warmth, success, and pure happiness light up your day — enjoy it fully.",
     "reversedKeyword": "Dimmed Light",
     "reversedLine": "Reconnect with simple joys, letting small bright moments gently rekindle your natural optimism.",
     "love": "Warmth, joy, and openness brighten your relationship today, so celebrate the happiness you share.",
     "work": "Success and clarity shine on your efforts, so step forward with confidence and genuine enthusiasm.",
     "money": "A bright, positive phase supports your finances, so enjoy the rewards of your honest work."
    },
    {
     "name": "Judgement",
     "keyword": "Renewal",
     "line": "A meaningful awakening invites you to rise and embrace a new chapter.",
     "reversedKeyword": "Self-Criticism",
     "reversedLine": "Soften your inner judgment, and listen for the honest call that gently invites your renewal.",
     "love": "An honest reckoning deepens your bond today, so reflect together and embrace a fresh understanding.",
     "work": "A moment of clarity calls you to your true path, so answer it with conviction.",
     "money": "A clear-eyed review of past choices guides better decisions, so reassess and move forward wisely."
    },
    {
     "name": "The World",
     "keyword": "Fulfillment",
     "line": "A cycle comes to a joyful close — celebrate how far you have come.",
     "reversedKeyword": "Near Completion",
     "reversedLine": "Honor the final stretch with patience, tying up loose ends so your accomplishment feels whole.",
     "love": "A sense of wholeness and fulfillment graces your relationship today, so cherish how far you have come.",
     "work": "A meaningful achievement comes full circle, so celebrate completion and step toward your next horizon.",
     "money": "Your financial efforts reach a rewarding milestone, so honor your success and plan the next cycle."
    }
   ],
   "reversedLabel": "Reversed",
   "fieldLabels": {
    "love": "Love",
    "work": "Work",
    "money": "Money"
   },
   "spreadTitle": "Past, Present, Future: A Three-Card Spread",
   "positions": [
    "Past",
    "Present",
    "Future"
   ],
   "askMore": "Ask more about this card"
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
   ],
   "dailyBySign": [
    [
     "Your bold spark sets the pace today, Aries, so charge ahead but pause to let others catch up.",
     "A friendly challenge could spark connection now, so channel that fire into play rather than rivalry.",
     "You can knock out a stalled task fast today, so start strong and let momentum carry you.",
     "Patience is your secret weapon now, Aries, so breathe before reacting and victory feels lighter.",
     "An impulsive yes might open a real adventure, so glance before you leap into it.",
     "Watch the urge to rush every word, since a softer tone wins the people you actually want."
    ],
    [
     "Steady hands build something lasting today, Taurus, so trust your slow, sure rhythm over the noise.",
     "Comfort and loyalty draw people close now, so share a simple pleasure with someone you love.",
     "A practical, grounded approach pays off at work, so finish what is already in your capable hands.",
     "Your calm is a gift today, Taurus, so let stubbornness soften into quiet, open patience.",
     "A small indulgence is well earned now, so keep one eye on your longer-term nest egg.",
     "Resist digging in too hard on one point, since a little flexibility keeps your day sweet."
    ],
    [
     "Curiosity lights you up today, Gemini, so follow the questions and let conversations carry you somewhere new.",
     "Your quick wit charms a room now, so reach out and let that bright chatter spark a bond.",
     "Juggling ideas comes easy today, so pick the one that matters most and see it through.",
     "Your busy mind craves variety, Gemini, so feed it learning but give it a moment of stillness too.",
     "A chance message or link could open a door now, so stay curious and reply.",
     "Mind the scatter today, since focusing on one promise beats spreading yourself thin across ten."
    ],
    [
     "Your tender intuition reads the room today, Cancer, so trust that gentle inner nudge before logic.",
     "Nurturing someone close fills you up now, so make space for the people who feel like home.",
     "Working from a place of care brings your best results today, so protect your softer pace.",
     "Your feelings run deep, Cancer, so honor them while keeping the shell open just a little.",
     "A cozy invitation or old connection could warm your whole day, so welcome it in.",
     "Guard against retreating too far inward today, since one honest word reconnects you faster than silence."
    ],
    [
     "Your warm confidence draws all eyes today, Leo, so shine generously and lift others as you rise.",
     "Heartfelt appreciation deepens a bond now, so tell someone exactly why they matter to you.",
     "Bold leadership suits you today, so step forward and let your natural flair carry the project.",
     "Your big heart wants applause, Leo, so let pride share the stage with genuine humility today.",
     "A creative spotlight may find you now, so say yes and let your talent be seen.",
     "Ease off needing to be center stage today, since listening earns the loyalty you truly crave."
    ],
    [
     "Your sharp eye spots what others miss today, Virgo, so refine the details and trust your craft.",
     "Quiet acts of help speak love for you now, so offer practical care to someone you value.",
     "Methodical focus turns a messy task tidy today, so organize first and the work will flow.",
     "Your inner critic is loud, Virgo, so swap harsh self-judgment for steady, kind improvement.",
     "A small fix or smart system could pay off now, so tweak it and watch things click.",
     "Try not to perfect every corner today, since good and finished beats flawless and forever unfinished."
    ],
    [
     "Your gift for balance smooths things over today, Libra, so play peacemaker without losing your own voice.",
     "Harmony with someone you care for feels effortless now, so nurture the beauty and fairness between you.",
     "Collaboration brings out your best at work today, so partner up and let charm open doors.",
     "Your craving for harmony is sweet, Libra, so decide for yourself before the world decides for you.",
     "A graceful introduction or invitation could lift your day, so accept it with that easy poise.",
     "Beware endless weighing today, since a clear choice frees you more than a perfectly fair one."
    ],
    [
     "Your focused intensity cuts straight to the truth today, Scorpio, so trust that deep instinct fully.",
     "Real closeness moves you now, so let your guard down a notch with someone who has earned it.",
     "Determined and resourceful, you finish what others abandon today, so dig in and transform the task.",
     "Your feelings run powerful, Scorpio, so let passion fuel you without letting it grip too tight.",
     "A hidden opportunity may surface now, so investigate quietly and trust what you uncover.",
     "Loosen the urge to control every thread today, since trust given back often returns doubled."
    ],
    [
     "Your adventurous spirit hunts the bigger picture today, Sagittarius, so aim high and chase that horizon.",
     "Honest, hearty connection lifts you now, so share a laugh and a true thought with a friend.",
     "Optimism opens a fresh path at work today, so pitch the bold idea you keep circling.",
     "Your love of freedom is fuel, Sagittarius, so wander wide but keep one promise grounded.",
     "Travel, learning, or a lucky tip could beckon now, so follow that restless curiosity.",
     "Mind blunt honesty today, since a little tact lets your truth actually land where it helps."
    ],
    [
     "Your steady ambition builds real ground today, Capricorn, so take the disciplined step future-you will thank you for.",
     "Loyalty shows in what you do, so let someone close see the warmth beneath your composure now.",
     "Patient, strategic effort pays off at work today, so climb one solid rung and hold it.",
     "Your drive is admirable, Capricorn, so let the climb leave room for rest and quiet joy.",
     "A long-game opportunity could open now, so commit with that practical, far-seeing wisdom of yours.",
     "Ease the weight of doing it all alone today, since sharing the load is strength, not surrender."
    ],
    [
     "Your original mind sparks fresh solutions today, Aquarius, so trust the idea no one else sees yet.",
     "Genuine connection over shared ideals lifts you now, so gather your people around something that matters.",
     "Innovative thinking shines at work today, so propose the unconventional path with quiet confidence.",
     "Your independence is a gift, Aquarius, so let closeness in without fearing it dims your spark.",
     "A surprising opportunity or kindred spirit could appear now, so stay open to the unexpected.",
     "Watch the urge to stay coolly detached today, since one warm gesture builds the future you imagine."
    ],
    [
     "Your gentle imagination flows freely today, Pisces, so let intuition and creativity guide your softer steps.",
     "Compassion draws tender souls near now, so share that quiet empathy with someone who needs it.",
     "Inspired and intuitive, you do your finest work in flow today, so protect a peaceful pocket of time.",
     "Your deep feeling is a strength, Pisces, so dream big while keeping one foot kindly on the ground.",
     "A creative or soulful opening could drift in now, so trust the gentle pull and follow it.",
     "Guard against drifting too far into daydreams today, since one small real step makes the vision true."
    ]
   ],
   "moonTraits": [
    "With the Moon in Aries, your emotions ignite fast and fade fast, craving honest action over slow brooding.",
    "With the Moon in Taurus, your heart settles into calm, finding comfort in steady routines, touch, and reassuring familiar things.",
    "With the Moon in Gemini, your feelings move through words and ideas, needing variety, conversation, and room to think things out.",
    "With the Moon in Cancer, your emotions run deep and protective, soothed most by home, nostalgia, and people who feel safe.",
    "With the Moon in Leo, your heart wants to be seen and adored, warming up through generosity, play, and heartfelt recognition.",
    "With the Moon in Virgo, you process feeling by being useful, finding peace in tidy order, helpfulness, and small acts of care.",
    "With the Moon in Libra, your inner calm depends on harmony, soothed by fairness, beauty, and warm one-on-one connection.",
    "With the Moon in Scorpio, your emotions run intense and private, craving deep trust, real intimacy, and feelings fully felt.",
    "With the Moon in Sagittarius, your heart needs freedom and meaning, lifted by adventure, optimism, and room to roam emotionally.",
    "With the Moon in Capricorn, you guard your feelings carefully, finding security in self-control, responsibility, and quietly earned closeness.",
    "With the Moon in Aquarius, you feel through a thoughtful distance, soothed by friendship, ideals, and the freedom to be yourself.",
    "With the Moon in Pisces, your emotions flow boundless and tender, comforted by compassion, art, and gentle, dreamlike retreat."
   ],
   "labels": {
    "bigTwoTitle": "Your Sun & Moon Profile",
    "sunLabel": "Sun Sign (your outer self)",
    "moonLabel": "Moon Sign (your inner world)",
    "overall": "Overall",
    "love": "Love",
    "money": "Money",
    "health": "Health",
    "career": "Career",
    "social": "Social",
    "compatTitle": "Today's Star Match",
    "bestToday": "Best Match Today",
    "cautionToday": "Handle With Care Today",
    "metaTitle": "Sign Details",
    "planetLabel": "Ruling Planet",
    "modalityLabel": "Modality",
    "polarityLabel": "Polarity"
   }
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
     "line": "まっさらな心で、新しい一歩を踏み出すとき。",
     "reversedKeyword": "見切り発車",
     "reversedLine": "勢いだけで飛び込む前に、足元を確かめて準備を整え直すと安心して進めます。",
     "love": "肩の力を抜いた自然体の自分が、新しい出会いや関係に良い風を呼び込みます。",
     "work": "前例にとらわれず、思いついた一歩を気軽に試してみると道が開けていきます。",
     "money": "新しい使い方やサービスに興味が向く日。小さく試しつつ無理は控えめにしましょう。"
    },
    {
     "name": "魔術師",
     "keyword": "創造",
     "line": "持っている力を活かせば、望みは形になります。",
     "reversedKeyword": "空回り",
     "reversedLine": "力みすぎて空回りしやすいとき。目的をひとつに絞ると本来の力が戻ってきます。",
     "love": "気持ちを言葉にして伝える勇気が、関係を一歩先へと進めてくれそうです。",
     "work": "持っている技術や工夫を惜しまず発揮すれば、成果として形になっていきます。",
     "money": "計画を立てて動けば、収入につながる行動が実を結びやすい流れにあります。"
    },
    {
     "name": "女教皇",
     "keyword": "直感",
     "line": "静かな心の声に、そっと耳を傾けてみましょう。",
     "reversedKeyword": "直感の曇り",
     "reversedLine": "情報に振り回されやすいとき。静かな時間をつくり、内なる声に立ち返りましょう。",
     "love": "焦らず相手の言葉に耳を傾けると、心の距離が静かに縮まっていきます。",
     "work": "表に出ない情報や人の機微を感じ取る力が、判断の支えになってくれます。",
     "money": "衝動より直感を信じて、急がず情報を集めてから決めると安心できます。"
    },
    {
     "name": "女帝",
     "keyword": "豊かさ",
     "line": "愛情と実りに満ちた、穏やかな時間が訪れます。",
     "reversedKeyword": "過保護",
     "reversedLine": "与えすぎや甘やかしに偏りがちなとき。自分をいたわる時間も大切にしましょう。",
     "love": "包み込むような優しさが、相手に安心感を与えて関係を温かく育てます。",
     "work": "創意と思いやりを注いだ仕事が、まわりから自然と評価されていきます。",
     "money": "豊かさが巡りやすい時期。心地よく使い、心地よく蓄えるとよいでしょう。"
    },
    {
     "name": "皇帝",
     "keyword": "安定",
     "line": "確かな意志と行動が、揺るがない基盤を築きます。",
     "reversedKeyword": "頑なさ",
     "reversedLine": "支配や頑固さに傾きやすいとき。一度肩の力を抜いて柔軟さを取り戻しましょう。",
     "love": "頼れる落ち着きが、相手に安心と信頼を感じさせる魅力になります。",
     "work": "段取りと責任感をもって臨めば、土台のしっかりした成果につながります。",
     "money": "計画的な管理が安定を生む日。長い目で見た備えを意識してみましょう。"
    },
    {
     "name": "教皇",
     "keyword": "導き",
     "line": "信頼できる人の助言が、よい道しるべになります。",
     "reversedKeyword": "形式偏重",
     "reversedLine": "決まりごとに縛られすぎないよう、自分に合うやり方を選び直してみましょう。",
     "love": "誠実なふるまいや約束を大切にする姿勢が、信頼を深めてくれます。",
     "work": "経験者の助言や学びの機会が、確かな前進のヒントを与えてくれます。",
     "money": "堅実で正攻法な選択が、安心できる金銭の流れを支えてくれます。"
    },
    {
     "name": "恋人",
     "keyword": "選択",
     "line": "心が惹かれる方へ。素直な気持ちが鍵です。",
     "reversedKeyword": "迷い",
     "reversedLine": "選択に迷うとき。何を大切にしたいかを見つめ直すと心が定まってきます。",
     "love": "心が惹かれる相手との間に、素直な気持ちで通い合う温もりが生まれます。",
     "work": "価値観の合う相手との協力が、思いがけない良い結果を引き寄せます。",
     "money": "大切な選択の前は、自分の本音と向き合ってから決めると後悔しません。"
    },
    {
     "name": "戦車",
     "keyword": "前進",
     "line": "迷いを手放し、前へ進む勇気が実を結びます。",
     "reversedKeyword": "方向のずれ",
     "reversedLine": "勢いが空回りしやすいとき。進む方向をもう一度確かめると軌道が整います。",
     "love": "まっすぐな気持ちで向き合う姿勢が、関係を前向きに動かしていきます。",
     "work": "強い意志と集中力で取り組めば、目標へと着実に近づいていけます。",
     "money": "目標を明確にして行動すれば、努力が金銭面の前進につながります。"
    },
    {
     "name": "力",
     "keyword": "勇気",
     "line": "やさしさと内なる強さで、困難をやわらげます。",
     "reversedKeyword": "自信のゆらぎ",
     "reversedLine": "気持ちがぐらつきやすいとき。焦らず小さな成功を積み、自信を取り戻しましょう。",
     "love": "穏やかで芯のある優しさが、相手の心をやわらかくほぐしていきます。",
     "work": "粘り強さと落ち着きが、難しい場面でも信頼を勝ち取る力になります。",
     "money": "焦らず辛抱強く向き合うことで、無理のない安定へと近づけます。"
    },
    {
     "name": "隠者",
     "keyword": "内省",
     "line": "ひとりの時間が、大切な答えを照らしてくれます。",
     "reversedKeyword": "孤立",
     "reversedLine": "ひとりに閉じこもりすぎないよう、ときに人とのつながりに心を開きましょう。",
     "love": "静かに相手を見つめる時間が、本当に大切な気持ちに気づかせてくれます。",
     "work": "一度立ち止まって考え抜く姿勢が、確かな答えを導いてくれます。",
     "money": "支出を静かに見直す好機。本当に必要なものを見極めてみましょう。"
    },
    {
     "name": "運命の輪",
     "keyword": "転機",
     "line": "流れが動き出すとき。変化を前向きに受け入れて。",
     "reversedKeyword": "流れの停滞",
     "reversedLine": "流れが滞るように感じるとき。焦らず次の波を待つ心の余裕を持ちましょう。",
     "love": "巡ってくる縁の流れに身をゆだねると、思いがけない展開が訪れます。",
     "work": "変化のタイミングをとらえて動けば、好機をしっかり活かせます。",
     "money": "運の巡りが変わる時期。無理せず流れに乗ることが幸運の鍵です。"
    },
    {
     "name": "正義",
     "keyword": "公正",
     "line": "誠実なふるまいが、納得のいく結果を導きます。",
     "reversedKeyword": "不均衡",
     "reversedLine": "判断が偏りやすいとき。一度立ち止まり、公平な視点を取り戻しましょう。",
     "love": "対等で誠実な向き合い方が、信頼に満ちた関係を育てていきます。",
     "work": "公正な判断と責任ある行動が、納得のいく成果へとつながります。",
     "money": "収支のバランスを見直すことで、健やかな金銭の流れが整います。"
    },
    {
     "name": "吊るされた男",
     "keyword": "視点",
     "line": "立ち止まり、見方を変えると新しい発見が。",
     "reversedKeyword": "停滞感",
     "reversedLine": "動けないもどかしさを感じるとき。視点を変えると新しい糸口が見えてきます。",
     "love": "焦らず待つ余裕が、相手との関係に自然な深まりをもたらします。",
     "work": "あえて立ち止まり別の角度から眺めると、解決の道が見えてきます。",
     "money": "今は大きく動かすより、じっくり構える姿勢が安心につながります。"
    },
    {
     "name": "死神",
     "keyword": "再生",
     "line": "ひとつの区切り。次の始まりへと続く道です。",
     "reversedKeyword": "手放せなさ",
     "reversedLine": "終わりを受け入れにくいとき。少しずつ手放すことで次の扉が開いていきます。",
     "love": "過去の区切りを越えた先に、新しい関係の芽生えが待っています。",
     "work": "古いやり方を見直すことで、より身軽に前へ進めるようになります。",
     "money": "不要な出費や習慣を整理すると、金銭の流れがすっきり整います。"
    },
    {
     "name": "節制",
     "keyword": "調和",
     "line": "心地よいバランスが、穏やかな日々を運びます。",
     "reversedKeyword": "ちぐはぐ",
     "reversedLine": "調子が乱れやすいとき。ペースを整え直すと本来の落ち着きが戻ってきます。",
     "love": "穏やかで思いやりのある接し方が、心地よい関係を育ててくれます。",
     "work": "焦らず着実に進める姿勢が、調和のとれた良い成果を生みます。",
     "money": "無理のない配分を心がければ、ゆったりとした安定が保てます。"
    },
    {
     "name": "悪魔",
     "keyword": "気づき",
     "line": "縛られている思い込みに、そっと気づくとき。",
     "reversedKeyword": "執着ほどき",
     "reversedLine": "縛られていた思いに気づくとき。少し距離を置くと心が軽くなっていきます。",
     "love": "依存ではなく信頼を大切にすると、健やかな関係が築けていきます。",
     "work": "惰性のやり方を見直し、本当に望む形へ整え直すとよいでしょう。",
     "money": "つい欲しくなる気持ちと向き合い、必要なものを選ぶ目を持ちましょう。"
    },
    {
     "name": "塔",
     "keyword": "変化",
     "line": "思いがけない変化も、新しい景色への入り口に。",
     "reversedKeyword": "立て直し",
     "reversedLine": "揺れを感じるときこそ、慌てず一歩ずつ土台を整え直していきましょう。",
     "love": "思いがけない変化も、関係を見つめ直す前向きなきっかけになります。",
     "work": "急な状況の変化が、より確かな仕組みづくりへの入り口になります。",
     "money": "不意の出費に備えつつ、土台を整え直す好機ととらえてみましょう。"
    },
    {
     "name": "星",
     "keyword": "希望",
     "line": "明るい希望の光が、あなたの未来を照らします。",
     "reversedKeyword": "希望の探し直し",
     "reversedLine": "希望が見えにくいとき。小さな光を一つずつ見つめると心が満ちてきます。",
     "love": "素直に未来を信じる気持ちが、関係に明るい彩りを添えてくれます。",
     "work": "前向きな展望をもって進めば、努力が着実に実を結んでいきます。",
     "money": "希望を持って計画を立てると、明るい金銭の流れが整っていきます。"
    },
    {
     "name": "月",
     "keyword": "想像",
     "line": "おぼろげな気持ちも、やがて輪郭を結びます。",
     "reversedKeyword": "もやもや",
     "reversedLine": "気持ちが揺れやすいとき。事実を一つずつ確かめると不安が和らいでいきます。",
     "love": "言葉にしにくい思いも、静かに見つめると本心が見えてきます。",
     "work": "曖昧な点は早めに確認すると、思い違いを防いで安心して進めます。",
     "money": "はっきりしない条件は確かめてから判断すると、安心して動けます。"
    },
    {
     "name": "太陽",
     "keyword": "喜び",
     "line": "晴れやかな笑顔があふれる、幸せな一日に。",
     "reversedKeyword": "充電",
     "reversedLine": "勢いが少し陰るとき。無理を控え、自分をいたわると元気が戻ってきます。",
     "love": "晴れやかな笑顔と素直さが、まわりに温かい縁を引き寄せてくれます。",
     "work": "明るい前向きさが、まわりの協力と良い成果を呼び込んでくれます。",
     "money": "順調な流れを楽しみつつ、浮かれすぎない落ち着きも大切にしましょう。"
    },
    {
     "name": "審判",
     "keyword": "再出発",
     "line": "新たな目覚めのとき。前向きな決意が芽生えます。",
     "reversedKeyword": "迷いの長引き",
     "reversedLine": "決めかねるとき。過去を責めず、これからできることに目を向けましょう。",
     "love": "これまでを受け入れ前を向く姿勢が、関係を新たな段階へ導きます。",
     "work": "過去の経験を糧にすれば、次の挑戦へ前向きに踏み出していけます。",
     "money": "これまでの使い方を振り返り、新しい方針を立て直す好機です。"
    },
    {
     "name": "世界",
     "keyword": "達成",
     "line": "ひとつの完成。満ち足りた喜びが訪れます。",
     "reversedKeyword": "あと一歩",
     "reversedLine": "仕上げの直前で力が抜けやすいとき。最後まで丁寧に整えると満ち足ります。",
     "love": "ひとつの節目を迎え、満ち足りた幸せが関係に訪れていきます。",
     "work": "やり遂げた達成感が、次の大きな一歩への自信につながります。",
     "money": "努力が実を結ぶ時期。得た豊かさを次へと上手に活かしましょう。"
    }
   ],
   "reversedLabel": "逆位置",
   "fieldLabels": {
    "love": "恋愛",
    "work": "仕事",
    "money": "金運"
   },
   "spreadTitle": "過去・現在・未来 3枚スプレッド",
   "positions": [
    "過去",
    "現在",
    "未来"
   ],
   "askMore": "このカードについてもっと聞いてみる"
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
   ],
   "dailyBySign": [
    [
     "持ち前の行動力が冴える一日です。気になっていたことに、まず一歩踏み出してみると流れが大きく動きます。",
     "ストレートな物言いが魅力ですが、今日は相手の反応を一拍待つと、人間関係がさらに温かくなります。",
     "新しい挑戦に火がつきやすい日。スピード感を活かしつつ、最後の詰めだけは丁寧に仕上げましょう。",
     "勢いに任せたくなる気分ですが、深呼吸をひとつ。落ち着いた判断が、あなたの推進力をより輝かせます。",
     "ピンときた直感が幸運の入り口になりそう。迷うより、まず動いてみることが嬉しい結果につながります。",
     "元気が有り余る分、急ぎすぎに少し注意を。一日のペース配分を意識すると、夕方まで力を保てます。"
    ],
    [
     "コツコツ積み重ねてきたことが、静かに実を結び始める一日。あなたの粘り強さが確かな安心感を生みます。",
     "身近な人とのんびり過ごす時間が、心の栄養に。美味しいものや心地よい空間が、今日の幸運を運びます。",
     "急がず自分のペースを守ることが正解の日。地に足のついた進め方が、結果的に大きな信頼へと変わります。",
     "変化を急かされても、あなたらしい落ち着きで大丈夫。じっくり考えてから動くことで満足のいく選択ができます。",
     "触れて心地よいもの、五感が喜ぶものに、思わぬ幸運のヒントが隠れていそうな一日です。",
     "頑固になりすぎないよう、ひとつだけ柔らかく。違う意見を受け入れる余白が、新しい豊かさを連れてきます。"
    ],
    [
     "好奇心が冴えわたり、会話や情報のやりとりから嬉しい発見が生まれる一日。フットワークの軽さが味方します。",
     "複数のことを同時に進めるのが得意なあなた。今日は優先順位をひとつ決めると、さらにスムーズに運びます。",
     "気軽な雑談から、思わぬチャンスの糸口が見つかりそう。人と言葉を交わすことを楽しんでみてください。",
     "興味があちこちに向きやすい日。ひとつのテーマに少し腰を据えると、深い学びと手応えが得られます。",
     "新しい知識やアイデアが追い風になる一日。気になった情報はメモしておくと、後でしっかり役立ちます。",
     "言葉が軽やかに弾む分、伝え方に少しだけ心を込めて。誠実なひと言が、信頼をぐっと深めてくれます。"
    ],
    [
     "人を思いやる優しさが、今日いちばんの魅力に。あなたの気遣いが、まわりに穏やかな安心を広げていきます。",
     "大切な人との心の距離が、ふっと縮まりそうな一日。素直な気持ちを伝えると、温かな絆が育まれます。",
     "身近な人を支える働きが、しっかり評価される日。あなたの細やかな配慮を、どうか自分でも認めてあげて。",
     "感情が揺れやすい時は、ひとりの静かな時間を大切に。心を整えれば、また優しく前を向いていけます。",
     "懐かしい人や場所が、思いがけない幸運を運んできそう。ふと浮かんだ顔に連絡してみると吉です。",
     "相手に尽くしすぎて疲れないよう、自分にも優しさを。あなたが満たされてこそ、人にも温かくいられます。"
    ],
    [
     "生まれ持った華やかさが輝く一日。あなたが主役になることで、その場全体がぱっと明るく盛り上がります。",
     "誰かを照らし、励ます言葉に天賦の才。今日のあなたの一言が、まわりに大きな勇気を与えてくれます。",
     "堂々と自分を表現することで道が開ける日。自信を持って前に出れば、嬉しいチャンスが舞い込みます。",
     "注目を集めたい気持ちが高まる分、まわりへの感謝もひと言。器の大きさが、あなたをさらに魅力的にします。",
     "創造力やエンターテインメントの分野に追い風。楽しむ心が、そのまま幸運を引き寄せる原動力になります。",
     "プライドが少し顔を出しそうな日。素直に頼ったり認めたりする柔らかさが、人望をいっそう厚くします。"
    ],
    [
     "細部まで気を配る丁寧さが光る一日。あなたの整える力が、まわりの混乱をすっきりと解きほぐします。",
     "誠実に積み上げる姿が、静かに信頼を集める日。地道な努力を、まわりは確かに見てくれています。",
     "計画的に進めることで、物事が気持ちよく片づく一日。リストにして取り組むと達成感が増します。",
     "完璧を求めすぎて疲れないよう、八割で良しと思う余裕を。その緩みが、かえって良い結果を呼びます。",
     "健康や暮らしを整える小さな工夫に、幸運の種が。今日始めた習慣が、未来の自分を助けてくれます。",
     "気になる点を指摘する前に、まず相手の良い面をひと言。やわらかな伝え方が、関係を心地よく保ちます。"
    ],
    [
     "人と人の間でバランスを取る才が冴える一日。あなたの公平な視点が、場に心地よい調和をもたらします。",
     "美しいものや心地よい雰囲気に、運気のヒントあり。装いや空間を整えると、気分も流れも上向きます。",
     "協力し合うことで物事が円滑に進む日。誰かと組むことで、ひとりでは届かない成果に手が届きます。",
     "あれこれ迷ってしまう時は、まず大切にしたい軸をひとつ。決めてしまえば、心がふっと軽くなります。",
     "人との出会いやご縁に、嬉しいチャンスが潜む一日。笑顔の挨拶が、新しい扉をそっと開いてくれます。",
     "良い人でいようと無理しすぎないで。たまには自分の本音を伝えることが、より誠実な関係を育てます。"
    ],
    [
     "秘めた集中力が冴え、ひとつのことを深く掘り下げられる一日。あなたの探究心が確かな成果を生みます。",
     "信頼できる人との深い結びつきが、心の支えに。表面的でない本音の対話が、絆をぐっと強くします。",
     "本質を見抜く鋭い洞察が、仕事で大きな武器になる日。物事の核心をつかむ力を信じて進みましょう。",
     "感情が深く動きやすい時こそ、少し力を抜いて。執着を手放すと、視界がすっと晴れて軽くなります。",
     "直感がさえる一日。心の奥がざわつくサインに従うと、思いがけない幸運へとつながっていきます。",
     "胸の内をためこみすぎないよう、信頼できる人にそっと共有を。打ち明ける勇気が、心を解放してくれます。"
    ],
    [
     "広い視野と前向きさが輝く一日。新しい世界へ目を向けることで、わくわくする可能性が広がっていきます。",
     "明るく率直なあなたの言葉が、まわりを元気にする日。その朗らかさが、人の輪を自然と引き寄せます。",
     "未知への挑戦やチャンスに恵まれる一日。思い切って飛び込むことが、嬉しい成長と発見につながります。",
     "自由を求める気持ちが高まる分、約束ごとは大切に。けじめが、あなたの伸びやかさをより輝かせます。",
     "旅や学び、新しい出会いに幸運の風が吹きそう。気になる場所へ足を運ぶと、心がぐっと豊かになります。",
     "勢いで話しすぎないよう、ひと呼吸の配慮を。率直さに優しさを添えれば、言葉がもっと深く届きます。"
    ],
    [
     "着実に目標へ近づく一日。あなたの責任感と忍耐力が、まわりからの厚い信頼へと確かに結びつきます。",
     "頼れる存在として、誰かの支えになれる日。あなたのまじめな姿勢が、静かな安心感を周囲に与えます。",
     "長期的な視点で取り組むことが吉。今日の地道な一歩が、未来の大きな成果の土台になっていきます。",
     "頑張りすぎて肩に力が入りやすい時。意識して休む勇気が、あなたの登り続ける力を支えてくれます。",
     "コツコツ続けてきた努力が認められるチャンスの日。実績を、どうか自分自身でも誇りに思ってください。",
     "成果を急ぐあまり厳しくなりすぎないよう。自分にもまわりにも、少しの優しさが良い流れを呼びます。"
    ],
    [
     "独創的なひらめきが冴える一日。人とは違う視点こそが、今日のあなたを際立たせる大きな魅力になります。",
     "仲間との自由なつながりが、心地よい刺激に。立場を超えた対等な交流が、新しい発想を運んできます。",
     "型にとらわれない発想が、仕事で評価される日。あなたらしいアイデアを、自信を持って形にしましょう。",
     "個性を大切にしつつ、まわりへの歩み寄りもひとさじ。理解し合う姿勢が、輪をより豊かにしてくれます。",
     "新しい技術や情報、未来の話題に幸運のヒントあり。好奇心の赴くままに、世界を広げてみてください。",
     "クールに見られがちな日こそ、温かい気持ちを言葉に。素直な思いやりが、距離をぐっと縮めてくれます。"
    ],
    [
     "豊かな感受性と想像力が輝く一日。あなたの優しい共感力が、まわりの心をそっと包み込んでいきます。",
     "人の気持ちに寄り添える日。さりげない思いやりが、大切な誰かにとって何よりの支えになりそうです。",
     "直感やひらめきが冴え、創造的なことに追い風。心に浮かんだイメージを、形にしてみると吉が訪れます。",
     "感情が流されやすい時は、心の境界線をそっと意識して。自分を守ることも、優しさのひとつの形です。",
     "芸術や音楽、静かな祈りの時間に、幸運の気配が。心を癒やすひとときが、明日への力を養ってくれます。",
     "頼まれごとを抱えすぎないよう、時には「ノー」も大切に。無理のない優しさが、長く続く絆を育てます。"
    ]
   ],
   "moonTraits": [
    "内側では負けず嫌いで情熱的。感情が瞬時に燃え上がり、思ったことをまっすぐ表に出したくなる素直さがあります。",
    "心の奥では安定と心地よさを強く求め、慣れた環境や穏やかな関係の中でこそ深い安心を感じる人です。",
    "感情も好奇心とともに軽やかに動き、気持ちを言葉にして分かち合うことで心のバランスを保っていきます。",
    "情に厚く感受性が豊かで、身近な人を守りたい気持ちと、安心できる居場所を求める想いが心の核にあります。",
    "内面では認められ愛されたい想いが強く、まっすぐな愛情表現で人とつながることに喜びを感じる温かさがあります。",
    "心の中では物事をきちんと整えたい繊細さがあり、役に立てたと感じる時にいちばん深い安らぎを覚えます。",
    "感情面では調和を何より大切にし、まわりとの心地よい関係や穏やかな雰囲気の中で心が安定していきます。",
    "内に秘めた感情はとても深く一途で、心から信頼できる相手とだけ本音を分かち合うことで満たされます。",
    "気持ちは自由でおおらか。心が広がる新しい体験や前向きな展望に触れる時、内面が生き生きと輝きます。",
    "感情を表に出すのは控えめでも、内側には深い責任感と、大切な人を着実に支えたい誠実な想いを抱いています。",
    "感情をやや客観的にとらえ、ほどよい距離感と自由を保ちながら、心のつながりを大切にする独立心があります。",
    "共感力がとても豊かで、まわりの感情を敏感に感じ取り、優しさと想像力で心を包み込もうとする人です。"
   ],
   "labels": {
    "bigTwoTitle": "太陽と月のプロフィール",
    "sunLabel": "太陽星座(外に見える自分)",
    "moonLabel": "月星座(心の内側)",
    "overall": "総合運",
    "love": "恋愛運",
    "money": "金運",
    "health": "健康運",
    "career": "仕事運",
    "social": "対人運",
    "compatTitle": "今日の星座相性",
    "bestToday": "今日相性の良い星座",
    "cautionToday": "今日ちょっと注意の星座",
    "metaTitle": "星座の基本情報",
    "planetLabel": "守護星",
    "modalityLabel": "性質",
    "polarityLabel": "極性"
   }
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
     "line": "Ein unbeschwerter Aufbruch lädt Sie ein, dem Leben offen und neugierig zu begegnen.",
     "reversedKeyword": "Unbedachtheit",
     "reversedLine": "Prüfen Sie den nächsten Schritt in Ruhe, damit jugendlicher Schwung nicht zu vorschneller Eile wird.",
     "love": "Begegnen Sie der Liebe heute offen und leicht, ohne sich gleich unter Druck zu setzen.",
     "work": "Ein frischer Anfang im Beruf belohnt Mut, solange Sie neugierig und lernbereit bleiben.",
     "money": "Neue finanzielle Wege locken; gehen Sie sie unbeschwert, aber mit einem klaren Blick."
    },
    {
     "name": "Der Magier",
     "keyword": "Schöpferkraft",
     "line": "Sie haben alle Mittel in der Hand — vertrauen Sie auf Ihr Können und Ihren Willen.",
     "reversedKeyword": "Zerstreuung",
     "reversedLine": "Sammeln Sie Ihre Kräfte bewusst, bevor Sie viele Ideen gleichzeitig in Bewegung setzen.",
     "love": "Sprechen Sie aus, was Sie fühlen; Ihre klaren Worte schaffen heute echte Nähe.",
     "work": "Sie haben alle Mittel zur Hand, um ein Vorhaben tatkräftig und gekonnt umzusetzen.",
     "money": "Mit Geschick und Initiative lässt sich heute eine günstige Gelegenheit aktiv gestalten."
    },
    {
     "name": "Die Hohepriesterin",
     "keyword": "Intuition",
     "line": "Ihre innere Stimme weiß mehr, als Worte sagen — hören Sie still in sich hinein.",
     "reversedKeyword": "Verdrängte Stimme",
     "reversedLine": "Schenken Sie Ihrer Intuition wieder Raum, statt leise Signale im Alltag zu überhören.",
     "love": "Hören Sie auf Ihr Gefühl; ungesagte Sehnsüchte dürfen sich heute behutsam zeigen.",
     "work": "Vertrauen Sie Ihrem Gespür für den richtigen Moment, bevor Sie laut entscheiden.",
     "money": "Beobachten Sie geduldig und sammeln Sie Wissen, ehe Sie finanziell aktiv werden."
    },
    {
     "name": "Die Herrscherin",
     "keyword": "Fülle",
     "line": "Eine Zeit des Wachstums und der Fürsorge — pflegen Sie, was Ihnen am Herzen liegt.",
     "reversedKeyword": "Selbstvernachlässigung",
     "reversedLine": "Wenden Sie Ihre Fürsorge auch sich selbst zu, damit Geben und Empfangen im Gleichgewicht bleiben.",
     "love": "Eine warme, nährende Zeit lädt ein, Zärtlichkeit und Geborgenheit großzügig zu schenken.",
     "work": "Kreative Fülle umgibt Sie; pflegen Sie ein Projekt geduldig, bis es reif gedeiht.",
     "money": "Ihre finanzielle Lage darf wachsen; investieren Sie in das, was nachhaltig Frucht trägt."
    },
    {
     "name": "Der Herrscher",
     "keyword": "Struktur",
     "line": "Klarheit und Verlässlichkeit geben Ihnen jetzt ein starkes Fundament.",
     "reversedKeyword": "Starrheit",
     "reversedLine": "Lockern Sie zu feste Kontrolle behutsam, damit Struktur nicht in Unbeweglichkeit kippt.",
     "love": "Verlässlichkeit und klare Worte geben Ihrer Beziehung heute ein stabiles Fundament.",
     "work": "Mit klarer Ordnung und Führung bringen Sie ein Vorhaben sicher auf Kurs.",
     "money": "Ein durchdachter Plan und feste Grenzen schützen heute Ihre finanzielle Basis."
    },
    {
     "name": "Der Hierophant",
     "keyword": "Tradition",
     "line": "Bewährtes Wissen und gute Ratgeber weisen Ihnen einen sicheren Weg.",
     "reversedKeyword": "Eigener Weg",
     "reversedLine": "Prüfen Sie überlieferte Regeln in Ruhe und wählen Sie, was wirklich zu Ihnen passt.",
     "love": "Gemeinsame Werte und Verlässlichkeit vertiefen heute die Verbindung zu Ihrem Gegenüber.",
     "work": "Bewährtes Wissen und ein guter Mentor weisen Ihnen jetzt einen sicheren Weg.",
     "money": "Solide, erprobte Strategien sind heute wertvoller als riskante finanzielle Experimente."
    },
    {
     "name": "Die Liebenden",
     "keyword": "Verbindung",
     "line": "Eine Herzensentscheidung steht an — folgen Sie dem, was sich aufrichtig anfühlt.",
     "reversedKeyword": "Zwiespalt",
     "reversedLine": "Klären Sie in Ruhe, was Ihr Herz wirklich möchte, bevor Sie eine Entscheidung treffen.",
     "love": "Eine Herzensentscheidung reift; folgen Sie dem, was sich aufrichtig und stimmig anfühlt.",
     "work": "Wählen Sie bewusst zwischen Optionen, die Ihren Werten im Beruf entsprechen.",
     "money": "Treffen Sie finanzielle Entscheidungen im Einklang mit dem, was Ihnen wirklich wichtig ist."
    },
    {
     "name": "Der Wagen",
     "keyword": "Willenskraft",
     "line": "Mit Fokus und Entschlossenheit bringen Sie Ihre Ziele voran.",
     "reversedKeyword": "Richtungssuche",
     "reversedLine": "Bündeln Sie Ihre Energie und finden Sie eine klare Richtung, statt in mehrere zugleich zu ziehen.",
     "love": "Mit Klarheit und gemeinsamer Richtung kommen Sie und Ihr Gegenüber heute gut voran.",
     "work": "Fokus und Entschlossenheit bringen Ihr berufliches Ziel jetzt spürbar in Bewegung.",
     "money": "Ein zielgerichteter, disziplinierter Plan trägt Ihre Finanzen heute ein gutes Stück voran."
    },
    {
     "name": "Die Kraft",
     "keyword": "Sanfte Stärke",
     "line": "Wahre Stärke zeigt sich in Geduld und Mitgefühl — auch mit sich selbst.",
     "reversedKeyword": "Selbstzweifel",
     "reversedLine": "Behandeln Sie sich nachsichtig und sammeln Sie Mut langsam wieder aus Ihrer inneren Mitte.",
     "love": "Begegnen Sie Spannungen mit Geduld und Sanftmut; ruhige Wärme verbindet heute am stärksten.",
     "work": "Innere Ruhe und Beharrlichkeit meistern berufliche Herausforderungen besser als Druck und Härte.",
     "money": "Bleiben Sie bei Geldfragen gelassen; besonnene Geduld führt heute weiter als hastiges Handeln."
    },
    {
     "name": "Der Eremit",
     "keyword": "Einkehr",
     "line": "Ein Moment der Ruhe schenkt Ihnen wertvolle innere Klarheit.",
     "reversedKeyword": "Rückzug",
     "reversedLine": "Achten Sie darauf, dass nötige Stille nicht unbemerkt in dauerhafte Abschottung übergeht.",
     "love": "Ein wenig Raum für sich selbst lässt Ihre Gefühle heute klarer und ruhiger werden.",
     "work": "Ein Moment der Einkehr schenkt Ihnen wertvolle Klarheit für die nächste berufliche Frage.",
     "money": "Treten Sie kurz zurück und prüfen Sie Ihre Finanzen in Ruhe, bevor Sie handeln."
    },
    {
     "name": "Das Rad des Schicksals",
     "keyword": "Wandel",
     "line": "Das Leben dreht sich weiter — gute Wendungen sind in Bewegung.",
     "reversedKeyword": "Stockung",
     "reversedLine": "Bleiben Sie geduldig, wenn sich das Rad langsamer dreht; bald öffnet sich neuer Spielraum.",
     "love": "Das Leben bringt heute Bewegung in Ihre Beziehung; bleiben Sie offen für freundliche Wendungen.",
     "work": "Ein günstiger Wandel ist in Bewegung; ergreifen Sie die Gelegenheit, sobald sie sich zeigt.",
     "money": "Finanzielle Umstände verändern sich; flexibel zu bleiben hilft Ihnen, Chancen heute zu nutzen."
    },
    {
     "name": "Die Gerechtigkeit",
     "keyword": "Ausgleich",
     "line": "Ehrlichkeit und Fairness führen zu einem stimmigen Gleichgewicht.",
     "reversedKeyword": "Unausgewogenheit",
     "reversedLine": "Sehen Sie ehrlich hin, wo etwas aus dem Gleichgewicht geraten ist, und richten Sie es behutsam neu aus.",
     "love": "Ehrlichkeit und Fairness schaffen heute ein stimmiges, ausgewogenes Miteinander in Ihrer Beziehung.",
     "work": "Klare, gerechte Entscheidungen stärken im Beruf Ihre Glaubwürdigkeit und Ihr Ansehen.",
     "money": "Ein nüchterner, fairer Blick auf Einnahmen und Ausgaben bringt Ihre Finanzen ins Lot."
    },
    {
     "name": "Der Gehängte",
     "keyword": "Perspektivwechsel",
     "line": "Ein anderer Blickwinkel öffnet überraschend neue Möglichkeiten.",
     "reversedKeyword": "Festhalten",
     "reversedLine": "Lassen Sie eine Sache los, die Sie festhält, damit eine frische Sicht wieder fließen kann.",
     "love": "Ein neuer Blickwinkel öffnet heute überraschend mehr Verständnis für Ihr Gegenüber.",
     "work": "Innehalten und die Lage anders betrachten bringt im Beruf eine unerwartete Lösung hervor.",
     "money": "Geduldiges Abwarten kann heute klüger sein als ein vorschneller finanzieller Schritt."
    },
    {
     "name": "Der Tod",
     "keyword": "Wandlung",
     "line": "Ein Abschnitt geht zu Ende, damit etwas Frisches beginnen kann.",
     "reversedKeyword": "Zögern",
     "reversedLine": "Erlauben Sie sich, einen überfälligen Abschluss sanft anzunehmen, statt am Vertrauten festzuhalten.",
     "love": "Ein Abschnitt Ihrer Beziehung wandelt sich; geben Sie Raum für eine ehrlichere Form von Nähe.",
     "work": "Lassen Sie Überholtes im Beruf bewusst los, damit etwas Frisches beginnen kann.",
     "money": "Ein finanzieller Wandel steht an; das Ende einer alten Gewohnheit macht Platz für Neues."
    },
    {
     "name": "Die Mäßigkeit",
     "keyword": "Harmonie",
     "line": "Mit Geduld und Maß finden Sie zu einem gesunden Gleichgewicht.",
     "reversedKeyword": "Ungeduld",
     "reversedLine": "Finden Sie bewusst zur Mitte zurück, wenn Eile oder Übermaß die Balance ins Wanken bringen.",
     "love": "Mit Geduld und Maß finden Sie und Ihr Gegenüber heute zu einem sanften Gleichklang.",
     "work": "Ausgewogenheit und ruhiges Tempo bringen im Beruf bessere Ergebnisse als hektischer Aktionismus.",
     "money": "Ein maßvoller Umgang mit Geld schafft heute ein gesundes, tragfähiges Gleichgewicht."
    },
    {
     "name": "Der Teufel",
     "keyword": "Loslösung",
     "line": "Erkennen Sie alte Muster — Sie haben die Freiheit, sich zu lösen.",
     "reversedKeyword": "Lösung",
     "reversedLine": "Erkennen Sie ein einengendes Muster und nutzen Sie die Freiheit, sich Schritt für Schritt zu lösen.",
     "love": "Schauen Sie ehrlich auf Bindungen; bewusste Nähe fühlt sich besser an als heimliche Abhängigkeit.",
     "work": "Hinterfragen Sie, was Sie im Beruf festhält; Sie haben mehr Wahlfreiheit, als es scheint.",
     "money": "Prüfen Sie reizvolle, aber bindende Ausgaben; bewusste Entscheidungen schützen heute Ihre Freiheit."
    },
    {
     "name": "Der Turm",
     "keyword": "Befreiung",
     "line": "Ein plötzlicher Umbruch macht Platz für einen ehrlichen Neuanfang.",
     "reversedKeyword": "Nachbeben",
     "reversedLine": "Geben Sie sich nach einer Erschütterung Zeit; aus dem Aufgebrochenen entsteht ruhig ein neuer Grund.",
     "love": "Ein ehrlicher Umbruch räumt heute auf, was nicht mehr trägt, und schafft Platz für Echtheit.",
     "work": "Eine plötzliche Wende im Beruf bringt Bewegung; sehen Sie darin die Chance zum Neuaufbau.",
     "money": "Ordnen Sie nach einem finanziellen Schreck behutsam neu; ein klares Fundament entsteht jetzt."
    },
    {
     "name": "Der Stern",
     "keyword": "Hoffnung",
     "line": "Ein sanftes Licht der Zuversicht begleitet Sie durch diese Zeit.",
     "reversedKeyword": "Mutlosigkeit",
     "reversedLine": "Lassen Sie ein kleines Licht der Zuversicht zu, auch wenn Hoffnung gerade schwerfällt.",
     "love": "Ein sanftes Gefühl von Vertrauen und Hoffnung begleitet heute Ihre Beziehung.",
     "work": "Bleiben Sie zuversichtlich; eine ruhige innere Klarheit weist Ihnen im Beruf den Weg.",
     "money": "Mit gelassener Hoffnung und einem realistischen Plan klärt sich Ihre finanzielle Lage allmählich."
    },
    {
     "name": "Der Mond",
     "keyword": "Träume",
     "line": "Gefühle und Fantasie melden sich — vertrauen Sie behutsam Ihrer Ahnung.",
     "reversedKeyword": "Verunsicherung",
     "reversedLine": "Tasten Sie sich im Unklaren behutsam voran und unterscheiden Sie ruhig Ahnung von bloßer Sorge.",
     "love": "Gefühle und Fantasie melden sich; sprechen Sie Unklares behutsam an, um Missverständnisse zu klären.",
     "work": "Verlassen Sie sich im Beruf nicht allein auf den ersten Eindruck; prüfen Sie Unklares in Ruhe.",
     "money": "Verschaffen Sie sich Klarheit, bevor Sie bei undurchsichtigen Geldfragen eine Entscheidung treffen."
    },
    {
     "name": "Die Sonne",
     "keyword": "Lebensfreude",
     "line": "Wärme, Klarheit und Freude erhellen Ihren Weg.",
     "reversedKeyword": "Gedämpftes Licht",
     "reversedLine": "Gönnen Sie sich kleine Lichtblicke, wenn die Freude gerade etwas verhalten scheint.",
     "love": "Wärme, Offenheit und Freude erhellen heute Ihre Beziehung und bringen Leichtigkeit ins Miteinander.",
     "work": "Klarheit und gute Laune lassen Sie im Beruf heute mit spürbarem Schwung vorankommen.",
     "money": "Eine erfreuliche Aussicht hellt Ihre finanzielle Stimmung auf; genießen Sie sie mit Augenmaß."
    },
    {
     "name": "Das Gericht",
     "keyword": "Erneuerung",
     "line": "Ein innerer Ruf weckt frische Kraft und einen klaren Aufbruch.",
     "reversedKeyword": "Innerer Aufschub",
     "reversedLine": "Hören Sie wohlwollend auf den leisen inneren Ruf, statt eine fällige Klärung weiter zu vertagen.",
     "love": "Ein offenes Gespräch weckt heute frische Kraft und einen ehrlichen Neuanfang in Ihrer Beziehung.",
     "work": "Ein klarer Entschluss bringt im Beruf neue Energie und ruft Sie zu einem deutlichen Aufbruch.",
     "money": "Eine ehrliche Bilanz Ihrer Finanzen weckt neue Klarheit für einen frischen Neuanfang."
    },
    {
     "name": "Die Welt",
     "keyword": "Vollendung",
     "line": "Ein Kreis schließt sich erfüllend — feiern Sie das Erreichte.",
     "reversedKeyword": "Unvollendung",
     "reversedLine": "Bringen Sie einen letzten offenen Punkt geduldig zu Ende, damit sich der Kreis stimmig schließt.",
     "love": "Ein erfüllender Abschnitt rundet sich; feiern Sie die gewachsene Verbundenheit mit Ihrem Gegenüber.",
     "work": "Ein berufliches Vorhaben vollendet sich erfüllend; würdigen Sie in Ruhe, was Sie erreicht haben.",
     "money": "Ein finanzielles Ziel rückt in greifbare Nähe; ein erfolgreicher Kreis schließt sich."
    }
   ],
   "reversedLabel": "Umgekehrt",
   "fieldLabels": {
    "love": "Liebe",
    "work": "Beruf",
    "money": "Finanzen"
   },
   "spreadTitle": "Drei-Karten-Legung: Vergangenheit, Gegenwart, Zukunft",
   "positions": [
    "Vergangenheit",
    "Gegenwart",
    "Zukunft"
   ],
   "askMore": "Mehr zu dieser Karte fragen"
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
   ],
   "dailyBySign": [
    [
     "Deine Energie sprudelt heute förmlich über, Widder. Nutze diesen Schub für einen mutigen ersten Schritt, doch atme zwischendurch bewusst durch.",
     "In Begegnungen darfst du dein Feuer zeigen, ohne andere zu überrennen. Ein kleiner Moment des Zuhörens öffnet überraschend warme Türen.",
     "Bei der Arbeit zahlt sich dein Pioniergeist aus, wenn du eine festgefahrene Aufgabe einfach beherzt anpackst, statt länger zu zögern.",
     "Mars verleiht dir Tatkraft, doch wahre Stärke liegt heute darin, Ungeduld in gezielten Mut zu verwandeln. Tempo mit Richtung schlägt blinde Eile.",
     "Eine spontane Gelegenheit blitzt auf und ruft geradezu nach deinem Wagemut. Greif zu, aber wirf vorher einen kurzen, prüfenden Blick darauf.",
     "Achte darauf, nicht alles im Alleingang erzwingen zu wollen. Eine kleine Pause schützt heute deine Funken vor unnötigem Verglühen."
    ],
    [
     "Ruhe und Beständigkeit sind heute deine Verbündeten, Stier. Ein Schritt nach dem anderen bringt dich verlässlich ans Ziel, ganz ohne Hektik.",
     "In der Liebe wirkt deine warme, sinnliche Präsenz anziehend. Schenke jemandem ungeteilte Zeit, und die Verbindung vertieft sich ganz natürlich.",
     "Bei der Arbeit lohnt sich dein gründlicher Blick fürs Detail. Was du heute solide aufbaust, trägt morgen erfreulich stabile Früchte.",
     "Venus lädt dich ein, das Schöne im Alltag zu genießen. Gönne dir eine kleine Freude, doch behalte dein Budget sanft im Auge.",
     "Eine Chance reift langsam heran und belohnt deine Geduld. Vertraue deinem inneren Tempo, statt dich von außen drängen zu lassen.",
     "Hüte dich heute vor zu starrem Festhalten am Gewohnten. Eine kleine Offenheit für Neues bewahrt dich vor unnötiger Verbohrtheit."
    ],
    [
     "Dein Geist sprüht heute vor Ideen, Zwilling. Lass deine Neugier von Thema zu Thema springen, doch denke einen Gedanken auch einmal bis zum Ende.",
     "In Gesprächen funkelt dein Charme besonders hell. Ein leichtes, ehrliches Wort knüpft heute schneller Kontakte, als du erwarten würdest.",
     "Bei der Arbeit hilft dir deine flinke Auffassungsgabe, mehreres zugleich zu jonglieren. Setze dabei eine Priorität, damit nichts liegen bleibt.",
     "Merkur schärft dein Denken und deine Worte. Nutze diesen klaren Verstand, um ein Missverständnis behutsam und mit einem Lächeln aufzulösen.",
     "Eine zufällige Information öffnet dir heute eine spannende Tür. Bleib wach und neugierig, denn der nützliche Wink kommt eher beiläufig.",
     "Achte darauf, dich nicht in zu viele Richtungen zu zersplittern. Ein kurzer Moment der Sammlung gibt deiner Vielseitigkeit echten Halt."
    ],
    [
     "Deine feinen Antennen nehmen heute viel wahr, Krebs. Vertraue deinem Bauchgefühl, doch schenke auch dir selbst dieselbe liebevolle Fürsorge.",
     "In der Liebe schaffst du ein Nest voller Geborgenheit. Eine zärtliche Geste zur rechten Zeit sagt heute mehr als viele große Worte.",
     "Bei der Arbeit hilft dir dein Gespür für Stimmungen, im Team zu vermitteln. Setze dabei eine sanfte Grenze, damit du nicht ausbrennst.",
     "Der Mond, dein Herrscher, lässt deine Gefühle heute lebhaft wogen. Nimm sie ernst, doch triff wichtige Entscheidungen erst, wenn die Wellen ruhen.",
     "Eine Gelegenheit im vertrauten Kreis öffnet sich leise. Wer dir nahesteht, könnte dir heute genau die Tür zeigen, die du suchst.",
     "Achte darauf, dich nicht zu sehr in dein Schneckenhaus zurückzuziehen. Ein wenig Mut zur Öffnung bewahrt dich vor stiller Schwermut."
    ],
    [
     "Deine Wärme strahlt heute weit, Löwe, und zieht andere ganz natürlich an. Zeige dein Licht großzügig, doch lass auch anderen die Bühne.",
     "In der Liebe wirkt deine Großherzigkeit magnetisch. Ein ehrliches Kompliment, freigiebig verschenkt, kommt heute mehrfach zu dir zurück.",
     "Bei der Arbeit darf dein Talent ruhig sichtbar werden. Übernimm die Führung bei etwas, das dir am Herzen liegt, und begeistere andere mit.",
     "Die Sonne, dein Herrscher, schenkt dir Selbstvertrauen und Ausstrahlung. Lenke diese Kraft mit Großmut, dann wird aus Stolz echte Größe.",
     "Eine Bühne, im Kleinen oder Großen, eröffnet sich dir heute. Tritt selbstbewusst hervor, dein natürlicher Glanz tut den Rest von allein.",
     "Hüte dich davor, alle Anerkennung für dich allein zu beanspruchen. Wer das Rampenlicht teilt, gewinnt heute noch treuere Bewunderer."
    ],
    [
     "Dein klarer, ordnender Blick bringt heute angenehme Struktur ins Chaos, Jungfrau. Sortiere eine Sache in Ruhe, doch verlange nicht gleich Perfektion.",
     "In Beziehungen zeigst du Liebe durch hilfreiche, durchdachte Taten. Eine kleine Aufmerksamkeit im Alltag wärmt heute mehr als jede große Geste.",
     "Bei der Arbeit glänzen deine Präzision und Verlässlichkeit. Eine sorgfältige Korrektur zur rechten Zeit erspart später einiges an Mühe und Ärger.",
     "Merkur schärft deinen analytischen Sinn. Nutze ihn, um ein Problem geduldig zu zerlegen, statt dich von Details überwältigen zu lassen.",
     "Eine Chance versteckt sich heute im Detail, das andere übersehen. Dein wacher Blick erkennt genau dort den praktischen Vorteil.",
     "Achte darauf, dich und andere nicht zu streng zu beurteilen. Ein nachsichtiges Wort an dich selbst lockert heute manch innere Anspannung."
    ],
    [
     "Dein Sinn für Harmonie schafft heute angenehmes Gleichgewicht, Waage. Suche den schönen Ausgleich, doch wage zwischendurch auch eine klare Entscheidung.",
     "In der Liebe spielt deine Anmut ihre ganze Wirkung aus. Ein faires, einfühlsames Wort bringt heute mehr Nähe und löst leise Spannungen auf.",
     "Bei der Arbeit hilft dir dein diplomatisches Geschick, Gegensätze zu versöhnen. Bring zwei Seiten an einen Tisch, und schon entsteht eine Lösung.",
     "Venus lässt dich Schönheit und Fairness besonders schätzen. Gestalte dein Umfeld ein wenig harmonischer, das hebt heute spürbar deine Stimmung.",
     "Eine Gelegenheit kommt heute über eine Begegnung, die sich gut anfühlt. Folge dem charmanten Faden, er führt dich zu einer feinen Möglichkeit.",
     "Hüte dich vor endlosem Abwägen, das dich lähmt. Triff heute lieber eine gute Wahl, als ewig nach der perfekten zu suchen."
    ],
    [
     "Deine innere Intensität verleiht dir heute tiefe Durchschlagskraft, Skorpion. Richte diese Leidenschaft gezielt auf ein Ziel, das dir wirklich wichtig ist.",
     "In der Liebe suchst du echte Tiefe statt Oberfläche. Ein verletzliches, ehrliches Wort baut heute eine Verbindung, die wahrhaft tragfähig ist.",
     "Bei der Arbeit durchschaust du, was andere übersehen. Vertraue deinem scharfen Instinkt, doch teile deine Einsichten mit etwas Behutsamkeit.",
     "Pluto schenkt dir Wandlungskraft und Tiefe. Lass heute bewusst etwas Altes los, damit Raum für eine kraftvolle Erneuerung entstehen kann.",
     "Eine verborgene Gelegenheit kommt heute ans Licht. Dein Gespür für das Unausgesprochene führt dich genau zu dem, was wirklich zählt.",
     "Achte darauf, Misstrauen nicht zur Festung werden zu lassen. Ein Funken bewusstes Vertrauen entlastet heute dein intensives Herz spürbar."
    ],
    [
     "Dein Optimismus reißt heute andere mit, Schütze. Folge deinem Drang nach Weite und Abenteuer, lass dabei aber ein loses Ende nicht ganz aus dem Blick.",
     "In Beziehungen wirkt deine offene, herzliche Art ansteckend. Teile heute deine Begeisterung, denn deine gute Laune ist ein großzügiges Geschenk.",
     "Bei der Arbeit hilft dir dein Blick fürs große Ganze. Wage einen weiteren Horizont, sichere aber auch den nächsten praktischen Schritt ab.",
     "Jupiter schenkt dir Glück und Wachstum. Bleib heute neugierig und offen, denn eine zufällige Tür könnte sich überraschend weit auftun.",
     "Eine Chance lockt heute aus der Ferne oder durch eine neue Idee. Folge deinem Entdeckergeist, er weiß meist genau, wohin es sich lohnt.",
     "Hüte dich vor allzu großen Versprechungen im Überschwang. Etwas Maß bei deinen Plänen bewahrt heute deine Freiheit und deinen guten Ruf."
    ],
    [
     "Deine Ausdauer und Klarheit tragen dich heute beständig voran, Steinbock. Bau geduldig an deinem Ziel, gönne dir zwischendurch aber einen kleinen Atemzug.",
     "In der Liebe zeigst du Zuneigung durch verlässliche Treue statt großer Worte. Eine ruhige, beständige Geste schafft heute tiefes Vertrauen.",
     "Bei der Arbeit zahlt sich deine Disziplin spürbar aus. Ein wohlüberlegter Schritt heute legt das Fundament für einen späteren soliden Erfolg.",
     "Saturn schenkt dir Struktur und Durchhaltevermögen. Nutze diese Reife, um eine langfristige Sache geduldig und mit klarem Plan voranzubringen.",
     "Eine Gelegenheit belohnt heute deine harte Arbeit. Was du dir mühevoll erarbeitet hast, beginnt nun sichtbar Gestalt anzunehmen.",
     "Achte darauf, vor lauter Pflicht die Leichtigkeit nicht zu vergessen. Eine kurze Freude zwischendurch macht deinen Weg heute deutlich tragfähiger."
    ],
    [
     "Dein origineller Geist sprudelt heute vor unkonventionellen Ideen, Wassermann. Folge deiner Vision, hol dabei aber die Menschen behutsam mit ins Boot.",
     "In Beziehungen schätzt du Freiraum und echte Verbundenheit zugleich. Ein offenes, freundschaftliches Gespräch bringt heute überraschende Nähe.",
     "Bei der Arbeit überrascht dein innovativer Blick das ganze Team. Wage einen neuen Ansatz, doch erkläre ihn klar, damit alle dir folgen können.",
     "Uranus weckt deinen Sinn für das Neue und Unerwartete. Bleib heute offen für einen plötzlichen Geistesblitz, er könnte vieles in Bewegung bringen.",
     "Eine Gelegenheit zeigt sich heute über ein Netzwerk oder eine Gemeinschaft. Teile deine Idee, und die richtigen Menschen finden sich wie von selbst.",
     "Achte darauf, dich vor lauter Eigenständigkeit nicht innerlich zu isolieren. Ein wenig gezeigte Wärme verbindet dich heute spürbar mit anderen."
    ],
    [
     "Deine feinfühlige Vorstellungskraft fließt heute besonders frei, Fische. Folge deiner Intuition und deinen Träumen, halte dabei aber sanft einen Fuß auf dem Boden.",
     "In der Liebe schenkst du tiefes Mitgefühl und echtes Verständnis. Ein zärtlicher, einfühlsamer Moment knüpft heute ein Band, das ans Herz geht.",
     "Bei der Arbeit inspiriert dein kreatives Gespür die Menschen um dich herum. Vertraue deiner Eingebung, sichere sie aber mit einem klaren Schritt ab.",
     "Neptun verstärkt deine Fantasie und dein Einfühlungsvermögen. Lenke diese Sensibilität in einen schöpferischen Ausdruck, statt dich in Tagträumen zu verlieren.",
     "Eine Gelegenheit erreicht dich heute auf leisen, fast unmerklichen Wegen. Vertraue dem feinen Wink deiner Intuition, er führt dich erstaunlich treffsicher.",
     "Achte darauf, dich nicht von fremden Stimmungen überfluten zu lassen. Eine kleine, klare Grenze schützt heute deine sensible, weite Seele."
    ]
   ],
   "moonTraits": [
    "impulsiv, mutig und voller spontaner Tatkraft",
    "ruhig, sinnlich und nach Geborgenheit strebend",
    "neugierig, kommunikativ und geistig beweglich",
    "gefühlvoll, fürsorglich und tief verbunden",
    "warmherzig, großzügig und gern im Mittelpunkt",
    "aufmerksam, hilfsbereit und auf Ordnung bedacht",
    "harmoniebedürftig, taktvoll und um Ausgleich bemüht",
    "intensiv, leidenschaftlich und emotional tiefgründig",
    "optimistisch, freiheitsliebend und voller Tatendrang",
    "beständig, verantwortungsbewusst und zielstrebig",
    "unabhängig, originell und gemeinschaftlich denkend",
    "einfühlsam, fantasievoll und feinfühlig verträumt"
   ],
   "labels": {
    "bigTwoTitle": "Deine zwei Schlüsselzeichen",
    "sunLabel": "Sonnenzeichen",
    "moonLabel": "Mondzeichen",
    "overall": "Allgemein",
    "love": "Liebe",
    "money": "Finanzen",
    "health": "Gesundheit",
    "career": "Beruf",
    "social": "Soziales",
    "compatTitle": "Passende Sternzeichen",
    "bestToday": "Heute günstig",
    "cautionToday": "Heute achtsam",
    "metaTitle": "Dein Sternzeichen-Profil",
    "planetLabel": "Herrscherplanet",
    "modalityLabel": "Modalität",
    "polarityLabel": "Polarität"
   }
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
     "line": "Un nouveau départ plein de spontanéité : avancez l'esprit léger et ouvert à l'aventure.",
     "reversedKeyword": "Imprudence",
     "reversedLine": "Avant de vous élancer, prenez un instant pour regarder où vous posez le pied.",
     "love": "Une rencontre légère pourrait éveiller votre cœur ; laissez-vous surprendre sans tout calculer.",
     "work": "Un nouveau départ s'offre à vous ; osez explorer une voie encore inexplorée.",
     "money": "Une dépense spontanée reste possible aujourd'hui, mais gardez un œil sur l'essentiel."
    },
    {
     "name": "Le Bateleur",
     "keyword": "Initiative",
     "line": "Tous vos talents sont à portée de main : c'est le moment de passer à l'action.",
     "reversedKeyword": "Dispersion",
     "reversedLine": "Recentrez votre énergie sur une seule intention plutôt que de l'éparpiller partout.",
     "love": "Vous avez le pouvoir d'exprimer clairement vos sentiments ; les mots justes rapprochent.",
     "work": "Vos talents sont prêts à se manifester ; passez de l'idée à l'action concrète.",
     "money": "Une opportunité financière demande votre initiative ; les ressources sont déjà entre vos mains."
    },
    {
     "name": "La Papesse",
     "keyword": "Intuition",
     "line": "Écoutez votre voix intérieure : la sagesse se trouve dans le silence et la patience.",
     "reversedKeyword": "Secrets tus",
     "reversedLine": "Écoutez davantage votre intuition ; une vérité intérieure attend d'être enfin entendue.",
     "love": "Laissez le mystère et la patience guider vos sentiments ; tout n'a pas besoin d'être dit.",
     "work": "Faites confiance à votre intuition avant de décider ; observez ce qui reste dans l'ombre.",
     "money": "Avant un engagement financier, prenez le temps de comprendre ce qui n'est pas visible."
    },
    {
     "name": "L'Impératrice",
     "keyword": "Abondance",
     "line": "Créativité et générosité fleurissent : laissez s'épanouir ce que vous semez.",
     "reversedKeyword": "Stagnation",
     "reversedLine": "Reconnectez-vous à ce qui vous nourrit pour laisser de nouveau fleurir votre créativité.",
     "love": "La tendresse et la sensualité embellissent vos liens ; accueillez la douceur sans retenue.",
     "work": "Vos projets entrent dans une phase féconde ; nourrissez-les avec soin et patience.",
     "money": "L'abondance se cultive ; un investissement réfléchi peut porter de beaux fruits."
    },
    {
     "name": "L'Empereur",
     "keyword": "Stabilité",
     "line": "Structure et fermeté vous soutiennent : bâtissez sur des bases solides.",
     "reversedKeyword": "Rigidité",
     "reversedLine": "Assouplissez vos cadres ; un peu de flexibilité renforcera l'autorité que vous cherchez.",
     "love": "Une relation gagne en stabilité ; posez ensemble des bases claires et rassurantes.",
     "work": "La structure et la discipline soutiennent vos ambitions ; organisez avant d'avancer.",
     "money": "Une gestion rigoureuse de votre budget consolide aujourd'hui votre sécurité matérielle."
    },
    {
     "name": "Le Pape",
     "keyword": "Sagesse",
     "line": "Un conseil avisé éclaire votre chemin : faites confiance aux valeurs sûres.",
     "reversedKeyword": "Conformisme",
     "reversedLine": "Interrogez les règles reçues ; cherchez votre propre vérité plutôt que de simplement suivre.",
     "love": "Les valeurs partagées renforcent votre couple ; un engagement sincère prend tout son sens.",
     "work": "Un mentor ou une tradition éprouvée éclaire votre chemin ; sachez vous laisser guider.",
     "money": "Suivez des conseils financiers fiables ; la prudence institutionnelle vous protège aujourd'hui."
    },
    {
     "name": "L'Amoureux",
     "keyword": "Choix",
     "line": "Une décision du cœur s'annonce : suivez ce qui résonne le plus en vous.",
     "reversedKeyword": "Doute",
     "reversedLine": "Clarifiez vos priorités intérieures avant de vous engager dans un choix important.",
     "love": "Un choix du cœur se présente ; écoutez vos valeurs profondes pour aimer en accord avec vous-même.",
     "work": "Une décision demande d'être alignée avec ce qui compte vraiment pour vous.",
     "money": "Pesez vos options financières selon vos convictions, et non selon la pression extérieure."
    },
    {
     "name": "Le Chariot",
     "keyword": "Élan",
     "line": "La volonté vous porte vers la victoire : gardez le cap avec confiance.",
     "reversedKeyword": "Éparpillement",
     "reversedLine": "Reprenez les rênes en douceur ; canalisez vos forces vers un cap unique et clair.",
     "love": "Votre détermination porte la relation ; avancez ensemble avec confiance et élan.",
     "work": "La volonté et la maîtrise vous mènent à la victoire ; gardez le cap fixé.",
     "money": "Une démarche déterminée peut débloquer une situation financière ; persévérez avec discipline."
    },
    {
     "name": "La Justice",
     "keyword": "Équilibre",
     "line": "Honnêteté et équité guident vos pas : chaque action trouve sa juste mesure.",
     "reversedKeyword": "Découragement",
     "reversedLine": "Soyez doux envers vous-même ; la vraie force se nourrit aussi de patience intérieure.",
     "love": "La patience et la bienveillance apaisent les tensions ; la douceur triomphe de la force.",
     "work": "Affrontez les défis avec calme et persévérance ; votre maîtrise intérieure fait la différence.",
     "money": "Gérez vos finances avec sang-froid ; la modération vous évitera bien des regrets."
    },
    {
     "name": "L'Ermite",
     "keyword": "Introspection",
     "line": "Un temps de recul éclaire l'essentiel : la réponse se trouve en vous.",
     "reversedKeyword": "Isolement",
     "reversedLine": "Le retrait est utile, mais veillez à ne pas vous couper de ceux qui comptent.",
     "love": "Un temps de réflexion éclaire vos sentiments ; comprenez votre cœur avant de vous ouvrir.",
     "work": "Prenez du recul pour retrouver votre cap ; la sagesse naît dans le silence.",
     "money": "Avant toute décision financière, accordez-vous un temps de réflexion solitaire et lucide."
    },
    {
     "name": "La Roue de Fortune",
     "keyword": "Cycle",
     "line": "Le vent tourne en votre faveur : accueillez le changement avec sérénité.",
     "reversedKeyword": "Résistance",
     "reversedLine": "Acceptez en douceur ce qui change ; chaque cycle prépare un renouveau bénéfique.",
     "love": "Un tournant favorable se dessine ; laissez le destin rapprocher les cœurs qui s'attirent.",
     "work": "Un cycle tourne en votre faveur ; saisissez sans tarder l'occasion qui se présente.",
     "money": "La chance financière sourit ; restez attentif aux opportunités qui surgissent naturellement."
    },
    {
     "name": "La Force",
     "keyword": "Courage",
     "line": "La douceur l'emporte sur la contrainte : votre force tranquille fait des merveilles.",
     "reversedKeyword": "Déséquilibre",
     "reversedLine": "Recherchez l'équité avec honnêteté ; rétablissez un juste équilibre dans vos relations.",
     "love": "L'honnêteté et l'équilibre nourrissent une relation saine ; agissez avec justesse et clarté.",
     "work": "Une situation se règle équitablement ; assumez vos responsabilités avec intégrité.",
     "money": "Un contrat ou un règlement se conclut justement ; veillez à la transparence des comptes."
    },
    {
     "name": "Le Pendu",
     "keyword": "Recul",
     "line": "Un autre point de vue change tout : lâcher prise ouvre de nouvelles voies.",
     "reversedKeyword": "Blocage",
     "reversedLine": "Si l'attente pèse, changez doucement de perspective pour libérer ce qui est figé.",
     "love": "Un autre regard sur la relation peut tout éclairer ; laissez le temps faire son œuvre.",
     "work": "Une pause vous invite à voir les choses autrement ; le lâcher-prise ouvre des voies.",
     "money": "Suspendez les décisions hâtives ; observez la situation sous un angle nouveau avant d'agir."
    },
    {
     "name": "L'Arcane sans nom",
     "keyword": "Transformation",
     "line": "Une page se tourne pour mieux renaître : laissez place au renouveau.",
     "reversedKeyword": "Inertie",
     "reversedLine": "Laissez partir ce qui pèse encore ; un renouveau profond attend votre consentement.",
     "love": "Une transformation libère votre cœur ; faites place au nouveau en tournant une page.",
     "work": "Une fin nécessaire ouvre un cycle inédit ; accueillez le changement comme une renaissance.",
     "money": "Clôturez ce qui ne sert plus ; cette transition prépare une situation plus saine."
    },
    {
     "name": "Tempérance",
     "keyword": "Harmonie",
     "line": "Patience et équilibre apaisent tout : le juste milieu porte ses fruits.",
     "reversedKeyword": "Excès",
     "reversedLine": "Retrouvez votre mesure intérieure ; un peu de patience rétablira l'harmonie recherchée.",
     "love": "L'harmonie et le compromis renforcent votre lien ; cultivez la patience et l'écoute mutuelle.",
     "work": "La modération et la collaboration portent leurs fruits ; avancez à un rythme équilibré.",
     "money": "Un équilibre financier se construit pas à pas ; évitez les extrêmes et dosez vos dépenses."
    },
    {
     "name": "Le Diable",
     "keyword": "Désir",
     "line": "Reconnaissez vos passions sans vous y enchaîner : la lucidité libère.",
     "reversedKeyword": "Libération",
     "reversedLine": "Identifiez ce qui vous enchaîne pour vous en délivrer en pleine conscience.",
     "love": "Examinez les attachements qui pèsent ; une relation s'épanouit dans la liberté, non dans la dépendance.",
     "work": "Méfiez-vous des compromis qui vous emprisonnent ; gardez votre intégrité et votre liberté.",
     "money": "Surveillez les tentations et les engagements contraignants ; ne cédez pas au matérialisme excessif."
    },
    {
     "name": "La Maison Dieu",
     "keyword": "Révélation",
     "line": "Un bouleversement libérateur fait tomber les illusions : place à un nouveau souffle.",
     "reversedKeyword": "Apaisement",
     "reversedLine": "Après la secousse, reconstruisez patiemment sur des bases enfin plus solides et sincères.",
     "love": "Une vérité qui éclate peut libérer la relation ; l'authenticité ouvre un nouvel équilibre.",
     "work": "Un bouleversement révèle ce qui devait changer ; reconstruisez sur des fondations plus justes.",
     "money": "Un imprévu financier invite à revoir vos appuis ; rebâtissez avec prudence et lucidité."
    },
    {
     "name": "L'Étoile",
     "keyword": "Espérance",
     "line": "Une lumière douce vous guide : gardez espoir, vos rêves prennent forme.",
     "reversedKeyword": "Désespérance",
     "reversedLine": "Ravivez doucement votre espérance ; la lumière revient pour qui garde foi en l'avenir.",
     "love": "L'espoir et la sincérité illuminent vos liens ; ouvrez votre cœur avec confiance et sérénité.",
     "work": "Une inspiration nouvelle guide vos projets ; gardez foi en votre vision et en vos talents.",
     "money": "Une éclaircie financière se profile ; gardez espoir et avancez avec un optimisme mesuré."
    },
    {
     "name": "La Lune",
     "keyword": "Imagination",
     "line": "Suivez votre intuition dans la pénombre : vos émotions ont beaucoup à révéler.",
     "reversedKeyword": "Confusion",
     "reversedLine": "Distinguez doucement le réel de vos craintes ; la clarté reviendra avec un peu de patience.",
     "love": "Des émotions troubles méritent d'être éclaircies ; communiquez pour dissiper les malentendus.",
     "work": "Avancez prudemment dans l'incertitude ; vérifiez les faits avant de vous engager.",
     "money": "Méfiez-vous des apparences trompeuses ; clarifiez chaque détail avant tout engagement financier."
    },
    {
     "name": "Le Soleil",
     "keyword": "Joie",
     "line": "La réussite rayonne et réchauffe : savourez ce bonheur partagé.",
     "reversedKeyword": "Voiles",
     "reversedLine": "Si la joie semble lointaine, accueillez les petites lumières du quotidien pour la raviver.",
     "love": "Le bonheur et la complicité rayonnent ; savourez pleinement la chaleur de cette relation.",
     "work": "La réussite et la clarté vous accompagnent ; votre énergie positive attire les belles occasions.",
     "money": "Une période faste se dessine ; profitez de cette abondance avec gratitude et discernement."
    },
    {
     "name": "Le Jugement",
     "keyword": "Renouveau",
     "line": "Un appel intérieur vous éveille : c'est l'heure d'un nouveau chapitre.",
     "reversedKeyword": "Hésitation",
     "reversedLine": "Écoutez votre appel intérieur sans vous juger ; le renouveau demande un peu de confiance.",
     "love": "Un appel du cœur vous invite à pardonner et à renaître ; écoutez cette voix profonde.",
     "work": "Une vocation se réveille ; répondez à cet appel et embrassez une nouvelle étape de vie.",
     "money": "Un bilan financier honnête ouvre un renouveau ; tirez les leçons du passé pour avancer."
    },
    {
     "name": "Le Monde",
     "keyword": "Accomplissement",
     "line": "Un cycle s'achève en plénitude : célébrez ce que vous avez accompli.",
     "reversedKeyword": "Inachevé",
     "reversedLine": "Une boucle reste à fermer ; complétez patiemment ce qui demande encore votre attention.",
     "love": "Une relation atteint une belle plénitude ; célébrez l'harmonie et l'accomplissement partagés.",
     "work": "Un projet aboutit avec succès ; savourez cette réalisation avant d'ouvrir un nouveau chapitre.",
     "money": "Une réussite financière se concrétise ; cet accomplissement récompense vos efforts soutenus."
    }
   ],
   "reversedLabel": "Inversé",
   "fieldLabels": {
    "love": "Amour",
    "work": "Travail",
    "money": "Argent"
   },
   "spreadTitle": "Tirage en trois cartes : Passé, Présent, Avenir",
   "positions": [
    "Passé",
    "Présent",
    "Avenir"
   ],
   "askMore": "En savoir plus sur cette carte"
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
   ],
   "dailyBySign": [
    [
     "Votre élan martien est au sommet aujourd'hui : lancez-vous dans ce projet en attente, l'audace ouvre la bonne porte.",
     "En couple comme en amitié, votre franc-parler séduit ; dites les choses avec chaleur plutôt qu'avec impatience.",
     "Au travail, prenez l'initiative que personne n'ose : votre énergie de pionnier fait avancer toute l'équipe.",
     "Canalisez votre feu intérieur avant d'agir : une décision réfléchie vaut mieux qu'un départ précipité.",
     "Une occasion rapide se présente et demande du cran ; vous êtes justement la personne taillée pour la saisir.",
     "Tendance à brûler les étapes aujourd'hui : respirez un instant, et votre force ira droit au but sans s'épuiser."
    ],
    [
     "Votre rythme posé est votre meilleur atout : avancez à votre cadence et savourez chaque petite victoire concrète.",
     "En amour, un geste tendre et un dîner soigné valent mille discours ; votre constance vénusienne rassure ceux qui vous aiment.",
     "Côté travail, votre fiabilité paie : finissez patiemment ce que vous avez commencé, on remarque votre sérieux.",
     "Ancrez-vous dans le présent et offrez-vous un vrai plaisir des sens : un bon repas, une belle musique, la nature.",
     "Une opportunité financière stable se profile ; étudiez-la sans vous presser, votre instinct de la valeur voit juste.",
     "Attention à vous braquer face au changement : un peu de souplesse aujourd'hui vous évitera bien des tensions."
    ],
    [
     "Votre vivacité mercurienne pétille : multipliez les contacts, une idée lancée en passant peut tout déclencher.",
     "Côté cœur, la complicité naît dans la conversation ; posez de vraies questions et écoutez la réponse jusqu'au bout.",
     "Au travail, votre agilité fait merveille pour jongler entre les dossiers ; notez vos idées avant qu'elles ne s'envolent.",
     "Votre esprit file dans dix directions : choisissez-en une seule à mener à terme et la journée gagnera en clarté.",
     "Une information précieuse circule autour de vous ; restez curieux, la bonne occasion se cache dans un détail.",
     "Tendance à vous disperser aujourd'hui : un peu de constance transformera votre brillant en résultats tangibles."
    ],
    [
     "Votre sensibilité lunaire est fine aujourd'hui : fiez-vous à votre ressenti, il vous guide vers les bonnes personnes.",
     "En famille comme en amour, votre tendresse fait du bien ; un moment cocooning resserre les liens qui comptent.",
     "Au travail, votre intuition repère ce que les autres manquent ; osez partager cette idée née d'un pressentiment.",
     "Protégez votre énergie sans vous replier : poser une limite douce est aussi une forme de bienveillance envers soi.",
     "Une belle occasion vient d'un proche ou d'un souvenir ; le passé vous tend une main vers quelque chose de bon.",
     "Tendance à trop absorber les humeurs d'autrui : créez-vous une petite bulle au calme pour vous recentrer."
    ],
    [
     "Votre rayonnement solaire attire tous les regards : montrez vos couleurs, votre chaleur illumine la journée de chacun.",
     "En amour, votre générosité fait fondre les cœurs ; un compliment sincère et un brin de panache feront merveille.",
     "Au travail, prenez la lumière sans crainte : votre leadership naturel inspire confiance et donne envie de vous suivre.",
     "Nourrissez votre fierté par la noblesse, pas par l'orgueil ; partager le mérite vous grandira plus encore.",
     "Une scène se prépare où vous pouvez briller ; saisissez-la, votre éclat ouvre des portes inattendues.",
     "Tendance à vouloir tout diriger aujourd'hui : laissez aussi les autres briller, votre couronne n'en sera que plus belle."
    ],
    [
     "Votre sens du détail mercurien est précieux : mettez de l'ordre dans un dossier en suspens, la clarté apaise votre esprit.",
     "En amour, vous montrez votre tendresse par les petits soins ; acceptez aussi qu'on prenne soin de vous en retour.",
     "Au travail, votre rigueur fait la différence ; un ajustement minutieux aujourd'hui évite un gros souci demain.",
     "Visez le mieux, pas la perfection : ce que vous accomplissez est déjà solide, accordez-vous un peu de douceur.",
     "Une occasion d'être utile se présente ; votre fiabilité tranquille sera remarquée et récompensée à sa juste mesure.",
     "Tendance à l'autocritique aujourd'hui : remplacez le jugement par la bienveillance, vous avancerez bien plus sereinement."
    ],
    [
     "Votre charme vénusien crée l'harmonie partout : un mot juste suffit à apaiser une tension et à rétablir l'équilibre.",
     "Côté cœur, la beauté du partage vous comble ; cherchez le compromis qui rend les deux camps heureux.",
     "Au travail, votre diplomatie résout ce que la force ne peut pas ; vous êtes le pont idéal entre les points de vue.",
     "Décider vous coûte parfois : faites confiance à votre premier élan, l'équilibre parfait n'a pas besoin d'exister.",
     "Une belle rencontre ou un partenariat équitable se dessine ; votre élégance ouvre des collaborations prometteuses.",
     "Tendance à vous oublier pour plaire aux autres : honorez aussi vos propres besoins, c'est cela, le vrai équilibre."
    ],
    [
     "Votre intensité plutonienne est magnétique : concentrez-la sur un seul objectif et vous irez plus loin que quiconque.",
     "En amour, vous cherchez le vrai, pas le tiède ; un échange profond et sincère renforce un lien qui compte vraiment.",
     "Au travail, votre flair perce les apparences ; faites confiance à ce que vous pressentez derrière les façades.",
     "Transformez ce qui vous pèse plutôt que de le ruminer : lâcher une rancune ancienne vous rendra une énergie immense.",
     "Une occasion cachée se révèle à qui sait regarder en profondeur ; votre instinct flaire la bonne piste.",
     "Tendance à tout vouloir contrôler aujourd'hui : faire un peu confiance allègera votre charge et vos relations."
    ],
    [
     "Votre souffle jupitérien voit grand : élargissez l'horizon, une idée audacieuse aujourd'hui peut devenir un beau projet.",
     "En amour, votre enthousiasme est contagieux ; proposez l'aventure, le partage d'une expérience nouvelle vous rapproche.",
     "Au travail, votre vision d'ensemble inspire ; ne négligez pas pour autant le détail qui ancre vos belles idées.",
     "Votre soif de liberté est saine : gardez-la, mais une promesse tenue aujourd'hui renforcera la confiance autour de vous.",
     "Une porte vers l'ailleurs s'entrouvre — voyage, formation ou rencontre ; dites oui, l'optimisme vous réussit.",
     "Tendance à promettre plus que possible : visez juste plutôt que loin, et vos engagements porteront vraiment leurs fruits."
    ],
    [
     "Votre patience saturnienne bâtit du solide : un pas méthodique aujourd'hui vous rapproche sûrement d'un objectif ambitieux.",
     "En amour, vous montrez vos sentiments par la fidélité et les actes ; offrez-vous aussi un moment de pure légèreté.",
     "Au travail, votre sérieux force le respect ; votre discipline transforme un effort discret en réussite durable.",
     "Vous portez beaucoup sur vos épaules : déléguer un peu n'est pas une faiblesse, c'est de la sagesse de gestionnaire.",
     "Une occasion de consolider votre position se présente ; votre constance et votre crédibilité ouvrent une voie sérieuse.",
     "Tendance à vous surcharger de devoirs : accordez-vous une vraie pause, votre endurance n'en sera que plus longue."
    ],
    [
     "Votre esprit uranien voit l'avenir : une idée originale aujourd'hui peut surprendre et faire avancer tout le monde.",
     "En amour, vous aimez en gardant votre liberté ; une amitié sincère est souvent le terreau de vos plus beaux liens.",
     "Au travail, votre vision décalée résout autrement un vieux problème ; osez proposer votre approche peu conventionnelle.",
     "Votre indépendance est précieuse, mais un peu de chaleur partagée aujourd'hui nourrira votre cœur autant que vos idées.",
     "Une rencontre ou un collectif tourné vers le futur vous tend les bras ; votre originalité y trouvera sa place.",
     "Tendance à rester dans votre tête aujourd'hui : redescendez vers vos émotions, elles aussi méritent d'être écoutées."
    ],
    [
     "Votre sensibilité neptunienne est une boussole : un rêve ou une intuition d'aujourd'hui contient un message précieux.",
     "En amour, votre empathie touche les cœurs ; votre tendresse sans calcul crée une intimité rare et profonde.",
     "Au travail, votre imagination inspire ; transformez une inspiration fugace en geste concret avant qu'elle ne s'efface.",
     "Vous absorbez tout ce qui vous entoure : un peu de solitude créative aujourd'hui vous rendra clair et léger.",
     "Une occasion née d'un élan du cœur se présente ; suivez votre sensibilité, elle vous mène vers ce qui a du sens.",
     "Tendance à fuir dans le rêve aujourd'hui : gardez un pied sur terre, et votre douceur trouvera son juste ancrage."
    ]
   ],
   "moonTraits": [
    "Émotion vive et spontanée : vous ressentez tout intensément et avez besoin d'agir vite pour apaiser le feu intérieur.",
    "Cœur stable qui cherche la sécurité : vous vous apaisez par le confort, la constance et les plaisirs simples des sens.",
    "Affectivité curieuse et mobile : vous digérez vos émotions en les mettant en mots et avez besoin d'échanges pour vous sentir bien.",
    "Sensibilité profonde et protectrice : votre cœur se nourrit de tendresse, de souvenirs et d'un nid douillet où se réfugier.",
    "Émotion généreuse et chaleureuse : vous avez besoin de vous sentir reconnu et aimé pour rayonner pleinement de l'intérieur.",
    "Intériorité discrète et soucieuse : vous vous rassurez par l'ordre, l'utilité et de petites attentions concrètes du quotidien.",
    "Cœur en quête d'harmonie : votre équilibre émotionnel dépend de la paix, de la beauté et de relations justes et apaisées.",
    "Affectivité intense et secrète : vous ressentez en profondeur et avez besoin de liens vrais, entiers, à l'abri des regards.",
    "Émotion libre et optimiste : votre cœur respire dans l'espace, l'aventure et le sens que vous donnez à votre vie.",
    "Intériorité pudique et solide : vous protégez vos sentiments derrière la maîtrise et vous rassurez par la fiabilité et le temps.",
    "Cœur indépendant et altruiste : vous vivez vos émotions avec recul et vous épanouissez dans la liberté et les liens d'amitié.",
    "Sensibilité fluide et compatissante : votre cœur sans frontière absorbe les émotions du monde et a besoin de douceur et de rêve."
   ],
   "labels": {
    "bigTwoTitle": "Votre profil astral : Soleil et Lune",
    "sunLabel": "Signe solaire — votre image",
    "moonLabel": "Signe lunaire — vos émotions",
    "overall": "Tendance générale",
    "love": "Amour",
    "money": "Argent",
    "health": "Santé",
    "career": "Travail",
    "social": "Relations",
    "compatTitle": "Vos affinités du jour",
    "bestToday": "En harmonie aujourd'hui",
    "cautionToday": "Un peu de vigilance",
    "metaTitle": "Profil du signe",
    "planetLabel": "Planète maîtresse",
    "modalityLabel": "Modalité",
    "polarityLabel": "Polarité"
   }
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
     "line": "Una invitación a empezar de cero con curiosidad y un espíritu libre.",
     "reversedKeyword": "Imprudencia",
     "reversedLine": "Antes de lanzarte, tómate un momento para mirar el terreno y replantear tus pasos con calma.",
     "love": "Abre el corazón a lo nuevo; un encuentro espontáneo puede regalarte una conexión fresca y sincera.",
     "work": "Atrévete a proponer esa idea distinta; tu frescura aporta aire nuevo a un proyecto estancado.",
     "money": "Es buen día para explorar una oportunidad nueva, siempre dando un primer paso pequeño y consciente."
    },
    {
     "name": "El Mago",
     "keyword": "Voluntad",
     "line": "Tienes las herramientas y el talento para hacer realidad tus ideas.",
     "reversedKeyword": "Dispersión",
     "reversedLine": "Reúne tus recursos y enfócate en una sola meta; la energía dispersa pide orden interior y prioridad.",
     "love": "Tienes el poder de dar el primer paso; un gesto sincero y directo abre la puerta al diálogo.",
     "work": "Cuentas con el talento y las herramientas para concretar tu idea; pasa de la intención a la acción.",
     "money": "Tu iniciativa puede transformar un plan en ingreso real; confía en tu capacidad para gestionarlo."
    },
    {
     "name": "La Sacerdotisa",
     "keyword": "Intuición",
     "line": "Escucha tu voz interior; los misterios se revelan con paciencia.",
     "reversedKeyword": "Voz silenciada",
     "reversedLine": "Vuelve a escucharte por dentro; quizá callaste una intuición que ahora pide espacio y atención serena.",
     "love": "Escucha lo que no se dice; la intuición te muestra los sentimientos verdaderos detrás de las palabras.",
     "work": "Confía en tu olfato antes de decidir; una corazonada bien meditada vale más que la prisa.",
     "money": "Investiga con paciencia antes de comprometerte; hay detalles ocultos que tu intuición percibe primero."
    },
    {
     "name": "La Emperatriz",
     "keyword": "Abundancia",
     "line": "Energía fértil y creativa: cuida lo que siembras y florecerá.",
     "reversedKeyword": "Bloqueo creativo",
     "reversedLine": "Cuídate y nútrete primero; cuando recuperes tu energía, la creatividad volverá a fluir con naturalidad.",
     "love": "El cariño florece cuando te muestras receptivo y generoso; nutre el vínculo con ternura cotidiana.",
     "work": "Tu creatividad da frutos hoy; cultiva con paciencia lo que sembraste y verás cómo madura.",
     "money": "La abundancia llega cuidando lo que ya tienes; reinvierte con sensatez y crecerá poco a poco."
    },
    {
     "name": "El Emperador",
     "keyword": "Estructura",
     "line": "La estabilidad y el orden te dan una base firme para avanzar.",
     "reversedKeyword": "Rigidez",
     "reversedLine": "Revisa si el control excesivo te está limitando; un poco de flexibilidad abre caminos más sanos.",
     "love": "La estabilidad y el compromiso firme dan seguridad a la relación; construye sobre bases sólidas.",
     "work": "Pon orden y estructura en tus tareas; una base firme te permite avanzar con autoridad serena.",
     "money": "Organiza tus finanzas con disciplina; un presupuesto claro te da control y tranquilidad duradera."
    },
    {
     "name": "El Sumo Sacerdote",
     "keyword": "Tradición",
     "line": "La sabiduría compartida y los buenos consejos te guían hoy.",
     "reversedKeyword": "Dogmatismo",
     "reversedLine": "Distingue entre la norma útil y la costumbre que ya no sirve; conviene replantear con criterio propio.",
     "love": "Los valores compartidos fortalecen el vínculo; un consejo sabio o un ritual común os acerca hoy.",
     "work": "Apóyate en la experiencia de un mentor; seguir un método probado te ahorra tropiezos innecesarios.",
     "money": "Sigue consejos financieros de confianza; lo tradicional y prudente protege mejor tu patrimonio hoy."
    },
    {
     "name": "Los Enamorados",
     "keyword": "Elección",
     "line": "Una decisión del corazón pide sinceridad y armonía.",
     "reversedKeyword": "Indecisión",
     "reversedLine": "Aclara tus valores antes de elegir; una decisión apresurada del corazón conviene reconsiderar con calma.",
     "love": "Una elección sincera del corazón pide honestidad; la armonía nace cuando hablas desde la verdad.",
     "work": "Tienes que elegir entre dos caminos; decide alineando el proyecto con lo que de verdad valoras.",
     "money": "Sopesa bien una decisión económica importante; elige con el corazón, pero también con la cabeza."
    },
    {
     "name": "El Carro",
     "keyword": "Determinación",
     "line": "Con enfoque y voluntad avanzas hacia tu meta con seguridad.",
     "reversedKeyword": "Falta de rumbo",
     "reversedLine": "Recupera el control de tus riendas; conviene reenfocar la dirección antes de seguir acelerando.",
     "love": "Con enfoque y voluntad superas los obstáculos en la relación; avanza con seguridad hacia lo que deseas.",
     "work": "Tu determinación te lleva lejos hoy; mantén el rumbo claro y los resultados llegarán con fuerza.",
     "money": "La disciplina y el empuje te acercan a tu meta económica; sigue avanzando con foco constante."
    },
    {
     "name": "La Fuerza",
     "keyword": "Coraje",
     "line": "La fuerza interior y la dulzura superan cualquier dificultad.",
     "reversedKeyword": "Inseguridad",
     "reversedLine": "Sé amable contigo en los momentos de duda; la fuerza vuelve cuando te tratas con paciencia interior.",
     "love": "La dulzura y la paciencia conquistan más que la presión; ama desde la calma y la confianza.",
     "work": "Domina la situación con temple, no con prisa; tu fuerza serena inspira respeto y resuelve tensiones.",
     "money": "Maneja las finanzas con paciencia y autocontrol; evita decisiones impulsivas y mantén la calma."
    },
    {
     "name": "El Ermitaño",
     "keyword": "Introspección",
     "line": "Un tiempo de calma y búsqueda interior ilumina tu camino.",
     "reversedKeyword": "Aislamiento",
     "reversedLine": "Buscar calma es sano, pero no te encierres; conviene equilibrar el retiro con compañía amable.",
     "love": "Un tiempo de reflexión aclara lo que sientes; conoce tu corazón antes de dar el siguiente paso.",
     "work": "Tómate un espacio para pensar a fondo; la respuesta que buscas surge desde la calma interior.",
     "money": "Analiza tus cuentas en soledad y con detalle; la prudencia reflexiva te evita gastos innecesarios."
    },
    {
     "name": "La Rueda de la Fortuna",
     "keyword": "Ciclos",
     "line": "Todo cambia; abre los brazos a un nuevo giro favorable.",
     "reversedKeyword": "Resistencia al cambio",
     "reversedLine": "Si algo se atasca, suelta el control y fluye; los ciclos piden adaptarse en vez de forzar.",
     "love": "La rueda gira a tu favor; abre los brazos a un nuevo giro que renueva la relación.",
     "work": "Un cambio inesperado trae oportunidad; adáptate con flexibilidad y aprovecha la nueva corriente.",
     "money": "La fortuna se mueve en tu dirección; mantente atento a una oportunidad que aparece de pronto."
    },
    {
     "name": "La Justicia",
     "keyword": "Equilibrio",
     "line": "La honestidad y el sentido de la justicia traen claridad.",
     "reversedKeyword": "Desequilibrio",
     "reversedLine": "Revisa si estás siendo justo también contigo; reequilibrar la balanza empieza por dentro.",
     "love": "La honestidad y el trato justo traen claridad; la relación crece cuando hay equidad y verdad.",
     "work": "Actúa con transparencia y rectitud; las decisiones justas hoy construyen tu reputación a largo plazo.",
     "money": "Revisa contratos y cuentas con objetividad; el equilibrio financiero nace de números claros y honestos."
    },
    {
     "name": "El Colgado",
     "keyword": "Nueva perspectiva",
     "line": "Mirar las cosas de otra forma revela soluciones inesperadas.",
     "reversedKeyword": "Pausa que se resiste",
     "reversedLine": "Si te sientes en suspenso, deja de forzar la salida; suelta el control y mira la situación desde otro ángulo.",
     "love": "Mirar la relación desde otra perspectiva revela lo que de verdad importa; la pausa también une.",
     "work": "Cambia el enfoque ante un bloqueo; una perspectiva nueva revela la solución que no veías.",
     "money": "Detente antes de decidir; ver tus finanzas desde otro punto de vista abre opciones inesperadas."
    },
    {
     "name": "La Muerte",
     "keyword": "Transformación",
     "line": "Un cierre da paso a una renovación llena de posibilidades.",
     "reversedKeyword": "Apego al pasado",
     "reversedLine": "Despedirse cuesta, pero retener lo que ya terminó cansa; conviene soltar con suavidad para renovarte.",
     "love": "Un cierre da paso a algo más auténtico; deja ir lo que pesa y haz sitio a lo nuevo.",
     "work": "Termina lo que ya cumplió su ciclo; una transformación profesional abre espacio a algo mejor.",
     "money": "Cierra un capítulo financiero que ya no rinde; soltar lo viejo libera recursos para lo nuevo."
    },
    {
     "name": "La Templanza",
     "keyword": "Armonía",
     "line": "La paciencia y el equilibrio te ayudan a encontrar la medida justa.",
     "reversedKeyword": "Excesos",
     "reversedLine": "Si algo se ha desbordado, busca de nuevo la medida justa; el equilibrio se recupera con calma.",
     "love": "La paciencia y la mesura encuentran el punto medio; la relación florece con calma y equilibrio.",
     "work": "Combina ideas y personas con tacto; la moderación y el ritmo justo te dan resultados duraderos.",
     "money": "Encuentra el equilibrio entre ahorrar y disfrutar; la administración mesurada trae paz financiera."
    },
    {
     "name": "El Diablo",
     "keyword": "Ataduras",
     "line": "Reconoce qué te limita para recuperar tu libertad con suavidad.",
     "reversedKeyword": "Liberación",
     "reversedLine": "Reconoce con suavidad qué hábito o vínculo te ata; nombrarlo es el primer paso para soltarlo.",
     "love": "Observa si algún patrón te encadena en la relación; reconocerlo con cariño abre la puerta a la libertad.",
     "work": "Identifica qué te mantiene atado a una rutina que agota; ponerle nombre te devuelve el poder de elegir.",
     "money": "Revisa hábitos de gasto o deudas que te limitan; tomar conciencia es el inicio de tu libertad económica."
    },
    {
     "name": "La Torre",
     "keyword": "Cambio repentino",
     "line": "Lo que se sacude deja espacio para construir algo más auténtico.",
     "reversedKeyword": "Tensión que cede",
     "reversedLine": "Si algo se tambalea, deja que caiga lo que ya no sostiene; después construirás con más verdad.",
     "love": "Lo que se sacude deja sitio a algo más auténtico; una conversación sincera renueva el vínculo.",
     "work": "Un cambio brusco despeja lo que no funcionaba; reconstruye sobre cimientos más honestos y sólidos.",
     "money": "Un imprevisto te obliga a revisar tus finanzas; aprovéchalo para rehacerlas sobre bases más firmes."
    },
    {
     "name": "La Estrella",
     "keyword": "Esperanza",
     "line": "La inspiración y la fe renovada iluminan tu horizonte.",
     "reversedKeyword": "Esperanza nublada",
     "reversedLine": "Si la fe flaquea, vuelve a tus fuentes de calma; la esperanza se reaviva cuidando tu interior.",
     "love": "La inspiración y la fe renovada iluminan el amor; muéstrate auténtico y la conexión brillará.",
     "work": "Vuelve a confiar en tu visión; un proyecto que ilusiona recupera su rumbo con esperanza renovada.",
     "money": "El horizonte se aclara poco a poco; mantén la calma y siembra hoy lo que cosecharás mañana."
    },
    {
     "name": "La Luna",
     "keyword": "Imaginación",
     "line": "Confía en tus sueños e intuiciones; la claridad llegará.",
     "reversedKeyword": "Confusión",
     "reversedLine": "Si las dudas te envuelven, espera a que aclare antes de decidir; la calma disipa los miedos imaginados.",
     "love": "Confía en tus sueños e intuiciones; lo que hoy parece confuso en el amor pronto cobrará claridad.",
     "work": "No todo está dicho aún; deja reposar las dudas y la imagen completa se irá revelando con el tiempo.",
     "money": "Evita decisiones financieras entre la niebla; espera más datos y la claridad llegará por sí sola."
    },
    {
     "name": "El Sol",
     "keyword": "Alegría",
     "line": "Vitalidad, éxito y calidez: un día para brillar con confianza.",
     "reversedKeyword": "Brillo atenuado",
     "reversedLine": "Si te sientes apagado, reconecta con lo que te alegra; tu luz vuelve cuidando los pequeños placeres.",
     "love": "Vitalidad y calidez para el corazón; es un día luminoso para mostrarte tal como eres y brillar.",
     "work": "El éxito y el reconocimiento te acompañan; comparte tu energía y los logros se multiplicarán.",
     "money": "Un día favorable para tus finanzas; la confianza y la claridad atraen buenas noticias económicas."
    },
    {
     "name": "El Juicio",
     "keyword": "Renacimiento",
     "line": "Un despertar interior te invita a empezar una nueva etapa.",
     "reversedKeyword": "Autocrítica",
     "reversedLine": "Sé indulgente contigo al hacer balance; el despertar interior pide comprensión, no juicio severo.",
     "love": "Un despertar interior te invita a una nueva etapa; perdona, suéltate y renueva el vínculo con verdad.",
     "work": "Escucha esa llamada que pide un cambio profesional; es momento de responder a tu vocación auténtica.",
     "money": "Haz balance honesto de tus finanzas; reconocer aciertos y errores te impulsa hacia una etapa mejor."
    },
    {
     "name": "El Mundo",
     "keyword": "Plenitud",
     "line": "Un ciclo se completa con éxito; celebra todo lo logrado.",
     "reversedKeyword": "Cierre pendiente",
     "reversedLine": "Si sientes que algo queda inconcluso, identifica el último paso; completarlo con calma te dará plenitud.",
     "love": "Un ciclo se completa con éxito en el amor; celebra lo construido y disfruta de la plenitud lograda.",
     "work": "Alcanzas la meta de un gran esfuerzo; reconoce tu logro y ábrete con confianza al siguiente reto.",
     "money": "Un objetivo financiero se cumple; celebra el resultado y planifica con serenidad tu próxima meta."
    }
   ],
   "reversedLabel": "En posición invertida",
   "fieldLabels": {
    "love": "Amor",
    "work": "Trabajo",
    "money": "Dinero"
   },
   "spreadTitle": "Tirada de tres cartas: pasado, presente y futuro",
   "positions": [
    "Pasado",
    "Presente",
    "Futuro"
   ],
   "askMore": "Pregúntame más sobre esta carta"
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
   ],
   "dailyBySign": [
    [
     "Tu fuego de Aries arranca el día con un impulso difícil de frenar; canaliza esa chispa hacia una sola meta y verás resultados rápidos.",
     "En tus vínculos, tu franqueza marciana enamora, pero hoy gana más quien escucha un momento antes de lanzarse a responder.",
     "Eres quien abre el camino: toma la iniciativa en ese proyecto estancado y los demás te seguirán con naturalidad.",
     "Tu coraje es tu mayor aliado, aunque la paciencia será la chispa que falta; respira antes de decidir en caliente.",
     "Una puerta nueva se entreabre para los valientes; di que sí a esa propuesta inesperada y confía en tu instinto pionero.",
     "Tanta energía pide control: evita gastar tu fuego en discusiones menores y resérvalo para lo que de verdad importa."
    ],
    [
     "Tu naturaleza terrenal de Tauro pide ritmo pausado; avanza con calma y constancia, y lo que construyas hoy tendrá raíces firmes.",
     "Venus, tu regente, suaviza tus afectos: un gesto sencillo y sincero acercará más que mil palabras a quien quieres.",
     "Tu tenacidad rinde frutos en el trabajo; termina lo empezado antes de abrir un frente nuevo y notarás la diferencia.",
     "Buscas seguridad y eso está bien, pero abre una rendija al cambio: no toda novedad amenaza tu querida estabilidad.",
     "Una oportunidad ligada a tus finanzas o tu talento asoma; evalúala con tu sentido práctico y da un paso medido.",
     "Cuida tu tendencia a aferrarte de más; soltar un detalle pequeño hoy te ahorrará una terquedad innecesaria mañana."
    ],
    [
     "Tu aire de Géminis enciende la mente con mil ideas; elige una y desarróllala, porque tu chispa brilla más cuando se enfoca.",
     "Mercurio agiliza tu palabra: una conversación ligera puede tejer un vínculo valioso, así que anímate a iniciarla.",
     "Tu versatilidad es oro en el trabajo hoy; salta entre tareas con tu agilidad habitual, pero cierra al menos una del todo.",
     "Tu curiosidad pide alimento: aprende algo nuevo aunque sea breve y tu mente inquieta encontrará la calma que busca.",
     "Una noticia o un mensaje abre una posibilidad interesante; tu don para conectar puntos te ayudará a aprovecharla.",
     "Evita dispersarte en demasiados frentes; un poco de foco hoy convierte tu inquietud en logros concretos."
    ],
    [
     "Tu corazón de Cáncer marca el ritmo del día; honra lo que sientes y crea un rincón cálido donde recargar tu sensibilidad.",
     "La Luna, tu regente, intensifica tus emociones: muéstrale tu cariño a quien quieres con esos pequeños cuidados que solo tú sabes dar.",
     "Tu intuición es brújula fiable en el trabajo; confía en esa corazonada antes de seguir solo la lógica fría.",
     "Proteges a los tuyos con ternura, pero hoy recuerda incluirte en ese círculo de cuidado; tu bienestar también cuenta.",
     "Un gesto del pasado o un reencuentro puede traer algo bueno; tu memoria emocional te indicará qué vale la pena retomar.",
     "Si la marea interior sube, no te encierres en tu caparazón; compartir lo que sientes aligera más que guardarlo."
    ],
    [
     "Tu fuego de Leo ilumina el día con calidez y carisma; sal a escena con generosidad y tu brillo natural abrirá caminos.",
     "El Sol, tu regente, agranda tu corazón: comparte reconocimiento con quien te rodea y recibirás el doble de afecto.",
     "Tu liderazgo inspira en el trabajo; lidera con el ejemplo y deja que tu entusiasmo contagie al equipo.",
     "Tu orgullo es noble, pero hoy florece más con humildad; aceptar una idea ajena no apaga tu luz, la multiplica.",
     "Un escenario nuevo te invita a lucirte; di presente con confianza, porque la oportunidad premia a quien se atreve a brillar.",
     "Tanto protagonismo pide equilibrio: dale espacio a los demás y tu generosidad será tu corona más admirada."
    ],
    [
     "Tu energía terrenal de Virgo agudiza el detalle; ordena tu entorno y tu día fluirá con esa precisión que tanto te reconforta.",
     "Mercurio afina tu mirada en los vínculos; cuida menos los fallos del otro y celebra más lo que ya funciona entre ustedes.",
     "Tu método es tu superpoder laboral; depura ese proceso y resolverás con eficiencia lo que a otros agobia.",
     "Tu autoexigencia te impulsa, pero hoy sé tan amable contigo como lo eres con los demás; lo perfecto no es lo único valioso.",
     "Una mejora práctica está a tu alcance; tu ojo analítico detectará justo ese ajuste que lo cambia todo.",
     "Evita perderte en lo minúsculo; da un paso atrás para ver el conjunto y ganarás claridad sin tanto desgaste."
    ],
    [
     "Tu aire de Libra busca armonía hoy; rodéate de belleza y equilibrio, y tu día encontrará ese ritmo grato que tanto valoras.",
     "Venus, tu regente, realza tu encanto en los vínculos; tu tacto natural suaviza cualquier roce y acerca corazones.",
     "Tu diplomacia abre puertas en el trabajo; media con justicia y tu don para conciliar será muy apreciado.",
     "Sopesar opciones es tu arte, pero no dejes que la duda te paralice; a veces decidir imperfecto vale más que esperar lo perfecto.",
     "Una alianza o colaboración se perfila prometedora; tu capacidad de crear puentes la convertirá en algo fructífero.",
     "Cuida tu afán de complacer a todos; poner un límite amable hoy también es una forma de cuidar tu equilibrio."
    ],
    [
     "Tu agua profunda de Escorpio concentra una fuerza intensa; dirígela hacia lo que de verdad te importa y nada se te resistirá.",
     "Plutón remueve tus emociones más hondas; en tus vínculos, abrir un poco de tu mundo interior creará una cercanía auténtica.",
     "Tu enfoque transformador rinde en el trabajo; investiga a fondo ese asunto y descubrirás lo que otros pasan por alto.",
     "Tu pasión es magnética, pero suelta el control donde puedas; confiar un poco más aliviará tensiones innecesarias.",
     "Algo oculto sale a la luz y te beneficia; tu olfato para los secretos te ayudará a usar esa información con sabiduría.",
     "Evita guardar rencor por un detalle; canaliza esa intensidad en renovarte, no en aferrarte a una vieja herida."
    ],
    [
     "Tu fuego de Sagitario enciende ganas de horizonte; persigue una meta ambiciosa con tu optimismo y el camino se abrirá solo.",
     "Júpiter, tu regente, expande tu generosidad; en tus vínculos, tu sinceridad cálida inspira, solo cuida que no resulte demasiado cruda.",
     "Tu visión amplia ilumina el trabajo; piensa en grande y propón esa idea que conecta el presente con un futuro mayor.",
     "Tu sed de libertad es sagrada, pero hoy un compromiso concreto te acerca más a esa aventura que sueñas.",
     "Un viaje, un curso o una idea nueva te tienta; di que sí a explorar, porque la suerte acompaña a tu espíritu aventurero.",
     "Cuida tu entusiasmo de prometer de más; ajusta tus planes a lo posible y tu palabra brillará por cumplida."
    ],
    [
     "Tu energía terrenal de Capricornio construye con paciencia; da hoy un paso firme hacia tu cima y la constancia hará el resto.",
     "Saturno, tu regente, te hace responsable y leal; en tus vínculos, baja un poco la guardia y deja ver tu lado más cálido.",
     "Tu disciplina es tu mejor capital laboral; estructura tu meta en etapas y avanzarás más lejos que nadie.",
     "Cargas mucho sobre tus hombros; recuerda que descansar también es estrategia para quien juega a largo plazo.",
     "Una oportunidad ligada a tu esfuerzo previo madura; tu perseverancia está por recibir el reconocimiento que merece.",
     "Evita la rigidez excesiva; flexibilizar un plan hoy no es debilidad, sino la sabiduría de quien sabe adaptarse."
    ],
    [
     "Tu aire de Acuario despierta ideas originales; atrévete a hacer las cosas a tu manera y tu enfoque único marcará la diferencia.",
     "Urano electriza tus vínculos; valora tu independencia, pero acércate también a quienes comparten tu visión de futuro.",
     "Tu mente innovadora destaca en el trabajo; propón ese método distinto, porque hoy lo poco convencional puede ser la solución.",
     "Tu desapego te da claridad, mas no olvides el calor humano; una idea brillante se vuelve mejor cuando incluye a los demás.",
     "Un proyecto colectivo o una causa te llama; tu perspectiva singular puede ser justo la chispa que el grupo necesita.",
     "Evita encerrarte en tu propia teoría; escuchar otra visión hoy enriquecerá esa idea que tanto defiendes."
    ],
    [
     "Tu agua sensible de Piscis fluye con imaginación; deja que tu intuición guíe el día y encontrarás belleza donde otros no miran.",
     "Neptuno suaviza tus afectos; tu empatía es un regalo en los vínculos, solo recuerda poner un límite cuando lo necesites.",
     "Tu creatividad inspira en el trabajo; confía en esa idea soñadora y dale forma concreta, paso a paso.",
     "Tu sensibilidad es tu fuerza, no tu debilidad; protege tu energía de ambientes pesados y vuelve a tu remanso interior.",
     "Una corazonada artística o espiritual abre algo hermoso; síguela con confianza, que tu intuición rara vez te falla.",
     "Evita perderte en sueños sin acción; aterriza una de tus ideas hoy y la magia se volverá realidad tangible."
    ]
   ],
   "moonTraits": [
    "Con la Luna en Aries, sientes rápido e intenso: tus emociones se encienden al instante y necesitas actuar para calmarlas.",
    "Con la Luna en Tauro, buscas calma y seguridad emocional; el afecto constante y los placeres sencillos son tu mayor consuelo.",
    "Con la Luna en Géminis, procesas lo que sientes hablándolo; tu ánimo es ágil y necesitas variedad para no aburrirte por dentro.",
    "Con la Luna en Cáncer, tu mundo emocional es profundo y protector; el hogar y los seres queridos son tu refugio más íntimo.",
    "Con la Luna en Leo, tu corazón pide calidez y reconocimiento; das afecto con generosidad y florece tu ánimo cuando te sientes valorado.",
    "Con la Luna en Virgo, sientes a través del cuidado y los detalles; ordenar tu entorno te devuelve la serenidad interior.",
    "Con la Luna en Libra, anhelas armonía emocional; la tensión te incomoda y encuentras paz en los vínculos equilibrados y amables.",
    "Con la Luna en Escorpio, tus emociones son intensas y profundas; sientes todo a fondo y proteges tu vulnerabilidad con reserva.",
    "Con la Luna en Sagitario, tu ánimo necesita libertad y esperanza; el optimismo y nuevos horizontes alimentan tu paz interior.",
    "Con la Luna en Capricornio, contienes lo que sientes y buscas dominio emocional; te reconforta saber que tienes todo bajo control.",
    "Con la Luna en Acuario, vives las emociones con cierta distancia; necesitas espacio y entiendes tu mundo interior desde la mente.",
    "Con la Luna en Piscis, tu sensibilidad no tiene fronteras; absorbes el ambiente y la empatía es el lenguaje de tu corazón."
   ],
   "labels": {
    "bigTwoTitle": "Tu perfil solar y lunar",
    "sunLabel": "Signo solar (tu cara visible)",
    "moonLabel": "Signo lunar (tu mundo emocional)",
    "overall": "General",
    "love": "Amor",
    "money": "Dinero",
    "health": "Salud",
    "career": "Trabajo",
    "social": "Relaciones",
    "compatTitle": "Compatibilidad astral de hoy",
    "bestToday": "Mejor afinidad hoy",
    "cautionToday": "Precaución hoy con",
    "metaTitle": "Datos de tu signo",
    "planetLabel": "Planeta regente",
    "modalityLabel": "Modalidad",
    "polarityLabel": "Polaridad"
   }
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
     "line": "Um novo começo cheio de liberdade e fé na jornada que se abre.",
     "reversedKeyword": "Impulsividade",
     "reversedLine": "Vale a pena pisar com calma antes de saltar; reorganize o plano e ouça sua intuição com atenção.",
     "love": "Abra o coração para um começo leve; a espontaneidade aproxima você de alguém especial hoje.",
     "work": "Encare um projeto novo com curiosidade; sua disposição para arriscar abre portas inesperadas.",
     "money": "Um caminho financeiro novo surge; explore com entusiasmo, mas mantenha um pé no chão."
    },
    {
     "name": "O Mago",
     "keyword": "Manifestação",
     "line": "Você tem as ferramentas e o talento para transformar ideias em realidade.",
     "reversedKeyword": "Dispersão",
     "reversedLine": "Reúna suas energias antes de agir; foque a intenção em uma só meta e os recursos se alinham.",
     "love": "Você tem o magnetismo para criar conexão; comunique com clareza o que sente e deseja.",
     "work": "Suas habilidades estão afiadas hoje; reúna as ferramentas certas e transforme ideia em ação.",
     "money": "É um bom dia para colocar um plano financeiro em prática; sua iniciativa atrai resultados."
    },
    {
     "name": "A Sacerdotisa",
     "keyword": "Intuição",
     "line": "Confie na sua voz interior; respostas surgem no silêncio e na paciência.",
     "reversedKeyword": "Bloqueio interior",
     "reversedLine": "Reconecte-se com sua voz interna; reserve um momento de silêncio para reorganizar pensamentos confusos.",
     "love": "Confie na sua intuição sobre o relacionamento; o que está implícito hoje merece sua escuta atenta.",
     "work": "Observe antes de decidir; informações nos bastidores guiam você melhor que a pressa.",
     "money": "Avalie suas finanças com calma e instinto; não revele todos os planos ainda."
    },
    {
     "name": "A Imperatriz",
     "keyword": "Abundância",
     "line": "Tempo de cuidar, criar e colher frutos com generosidade e afeto.",
     "reversedKeyword": "Excesso de cuidado",
     "reversedLine": "Cuide de você primeiro; reequilibre o quanto se doa e preserve um espaço só seu.",
     "love": "O afeto floresce quando você nutre o vínculo com carinho; acolha e seja acolhido hoje.",
     "work": "Sua criatividade está fértil; cultive ideias com paciência e veja um projeto crescer.",
     "money": "Abundância chega quando você cuida do que já tem; gerencie seus recursos com generosidade equilibrada."
    },
    {
     "name": "O Imperador",
     "keyword": "Estrutura",
     "line": "Estabilidade e disciplina constroem bases sólidas para seus planos.",
     "reversedKeyword": "Rigidez",
     "reversedLine": "Suavize o controle e abra-se ao diálogo; estrutura ajuda, mas a flexibilidade traz harmonia.",
     "love": "Um pouco de firmeza e compromisso trazem segurança ao relacionamento; mostre que pode ser confiável.",
     "work": "Organize prioridades e lidere com serenidade; a disciplina de hoje constrói resultados sólidos.",
     "money": "Estabeleça uma estrutura clara para suas finanças; planejamento firme protege seu patrimônio."
    },
    {
     "name": "O Hierofante",
     "keyword": "Tradição",
     "line": "Aprender com mentores e valores compartilhados traz orientação valiosa.",
     "reversedKeyword": "Dogmatismo",
     "reversedLine": "Questione regras que já não servem; busque um conselho confiável e reorganize seus próprios valores.",
     "love": "Valores compartilhados fortalecem o vínculo; busque harmonia entre a tradição e o que vocês desejam.",
     "work": "Apoie-se na orientação de um mentor; seguir um método comprovado traz estabilidade hoje.",
     "money": "Confie em conselhos experientes antes de grandes decisões; o caminho convencional é seguro agora."
    },
    {
     "name": "Os Enamorados",
     "keyword": "União",
     "line": "Escolhas do coração e parcerias harmoniosas iluminam o caminho.",
     "reversedKeyword": "Desalinhamento",
     "reversedLine": "Reavalie o que realmente importa para você; alinhe suas escolhas com seus valores antes de decidir.",
     "love": "Uma escolha sincera do coração convida você a se aproximar de alguém; a harmonia favorece os laços hoje.",
     "work": "Uma parceria ou decisão importante pede o seu sim verdadeiro; alinhe-se com o que valoriza.",
     "money": "Pondere bem antes de unir finanças com alguém; escolha o que ressoa com seus princípios."
    },
    {
     "name": "O Carro",
     "keyword": "Determinação",
     "line": "Foco e vontade conduzem você à vitória sobre os obstáculos.",
     "reversedKeyword": "Dispersão de rumo",
     "reversedLine": "Retome as rédeas com firmeza e calma; defina uma direção clara antes de acelerar de novo.",
     "love": "Sua determinação conduz o relacionamento adiante; mantenha o foco no que vocês querem construir.",
     "work": "Concentre sua força de vontade em uma meta; o avanço firme leva você à vitória hoje.",
     "money": "Disciplina e foco impulsionam suas finanças; siga o plano e mantenha o rumo definido."
    },
    {
     "name": "A Força",
     "keyword": "Coragem",
     "line": "A gentileza e a paciência revelam sua verdadeira força interior.",
     "reversedKeyword": "Autocrítica",
     "reversedLine": "Trate-se com gentileza nos momentos difíceis; sua força real nasce da paciência e da autocompaixão.",
     "love": "Paciência e ternura suavizam qualquer tensão; a coragem gentil aproxima os corações hoje.",
     "work": "Enfrente os desafios com calma confiança; sua persistência serena supera obstáculos no trabalho.",
     "money": "Mantenha a serenidade diante de pressões financeiras; o controle emocional protege suas decisões."
    },
    {
     "name": "O Eremita",
     "keyword": "Reflexão",
     "line": "Um momento de introspecção ilumina o próximo passo da sua jornada.",
     "reversedKeyword": "Isolamento",
     "reversedLine": "Solidão demais pode pesar; reequilibre o recolhimento com a busca cuidadosa de boas companhias.",
     "love": "Um momento de introspecção ilumina o que você busca no amor; respeite seu tempo interior.",
     "work": "Recue um pouco para refletir; a clareza que você procura no trabalho vem do silêncio.",
     "money": "Reflita com calma antes de gastar; uma pausa revela onde economizar com sabedoria."
    },
    {
     "name": "A Roda da Fortuna",
     "keyword": "Ciclos",
     "line": "Mudanças naturais trazem novas oportunidades; flua com o movimento da vida.",
     "reversedKeyword": "Resistência à mudança",
     "reversedLine": "Aceite os ciclos com leveza; quando algo escapa ao seu controle, reorganize-se e siga se adaptando.",
     "love": "Os ventos giram a seu favor no amor; receba as mudanças do coração de braços abertos.",
     "work": "Uma virada favorável surge na carreira; aproveite a oportunidade que o momento oferece.",
     "money": "A sorte financeira muda a seu favor; fique atento às chances que aparecem hoje."
    },
    {
     "name": "A Justiça",
     "keyword": "Equilíbrio",
     "line": "Decisões justas e verdade trazem clareza e harmonia ao seu caminho.",
     "reversedKeyword": "Desequilíbrio",
     "reversedLine": "Reveja onde a balança pendeu; busque honestidade consigo e reorganize o que precisa de justiça.",
     "love": "Honestidade e equilíbrio guiam suas escolhas afetivas; a verdade fortalece a relação hoje.",
     "work": "Tome decisões justas e transparentes; a integridade no trabalho traz reconhecimento merecido.",
     "money": "Equilibre as contas com clareza e justiça; acordos honestos protegem seu dinheiro agora."
    },
    {
     "name": "O Enforcado",
     "keyword": "Nova perspectiva",
     "line": "Pausar e ver as coisas de outro ângulo revela soluções inesperadas.",
     "reversedKeyword": "Estagnação",
     "reversedLine": "Se você se sente preso, talvez seja hora de soltar; reorganize sua perspectiva sem forçar resultados.",
     "love": "Pause e veja o relacionamento de outro ângulo; a paciência revela o que o coração precisa.",
     "work": "Mudar o ponto de vista destrava uma solução; entregue-se à reflexão antes de agir.",
     "money": "Suspenda decisões financeiras apressadas; um novo olhar mostra a saída no momento certo."
    },
    {
     "name": "A Morte",
     "keyword": "Transformação",
     "line": "Um ciclo se encerra para que algo melhor possa florescer.",
     "reversedKeyword": "Apego",
     "reversedLine": "Soltar pode custar, mas é libertador; reorganize-se aos poucos e dê espaço ao que vem renovar.",
     "love": "Deixe ir o que já não floresce no amor; o fim de um ciclo abre espaço para o novo.",
     "work": "Encerre o que não serve mais na carreira; uma transformação abre caminho para algo melhor.",
     "money": "Reavalie hábitos financeiros antigos; abrir mão do que não funciona renova suas finanças."
    },
    {
     "name": "A Temperança",
     "keyword": "Harmonia",
     "line": "Equilíbrio e moderação trazem paz e renovação ao seu dia.",
     "reversedKeyword": "Desequilíbrio interno",
     "reversedLine": "Reencontre seu centro com paciência; reorganize os excessos e busque de novo o ritmo do meio-termo.",
     "love": "Uma postura calma e equilibrada traz harmonia ao relacionamento; modere e acolha hoje.",
     "work": "Combine recursos e talentos com moderação; o equilíbrio rende um trabalho bem feito.",
     "money": "Administre suas finanças com paciência e medida; o equilíbrio constrói segurança aos poucos."
    },
    {
     "name": "O Diabo",
     "keyword": "Libertação",
     "line": "Reconhecer apegos é o primeiro passo para se libertar deles.",
     "reversedKeyword": "Libertação",
     "reversedLine": "Perceba o que prende você e solte-se com gentileza; reorganizar velhos hábitos devolve sua liberdade.",
     "love": "Observe padrões que aprisionam a relação; reconhecer o que limita liberta o amor hoje.",
     "work": "Note dependências ou contratos pesados; questionar o que algema renova sua trajetória profissional.",
     "money": "Examine compromissos financeiros que prendem você; soltar amarras desnecessárias alivia suas contas."
    },
    {
     "name": "A Torre",
     "keyword": "Mudança súbita",
     "line": "Uma reviravolta abre espaço para reconstruções mais verdadeiras.",
     "reversedKeyword": "Tensão acumulada",
     "reversedLine": "A mudança brusca já passou; reorganize as bases com cuidado e construa algo mais verdadeiro agora.",
     "love": "Uma sacudida inesperada limpa o terreno; o que se rompe abre espaço para um vínculo mais sincero.",
     "work": "Uma reviravolta repentina revela o que precisava ruir; reconstrua sobre alicerces mais firmes.",
     "money": "Um imprevisto financeiro pede atenção; encare-o como chance de reorganizar bases mais sólidas."
    },
    {
     "name": "A Estrela",
     "keyword": "Esperança",
     "line": "A inspiração e a fé renovam seus sonhos com luz suave.",
     "reversedKeyword": "Desânimo",
     "reversedLine": "Reacenda a esperança com gentileza; cuide do seu interior e confie que dias mais leves se aproximam.",
     "love": "Mantenha a esperança viva no amor; cura suave e dias luminosos estão a caminho do coração.",
     "work": "Confie no seu potencial e siga sonhando; inspiração e renovação iluminam sua carreira hoje.",
     "money": "A fé serena guia suas finanças; mantenha a calma e oportunidades de cura financeira surgem."
    },
    {
     "name": "A Lua",
     "keyword": "Imaginação",
     "line": "Confie na intuição diante do que ainda não está totalmente claro.",
     "reversedKeyword": "Confusão",
     "reversedLine": "Se algo parece nebuloso, não decida no escuro; reorganize os fatos e dê tempo à clareza chegar.",
     "love": "Confie nos sonhos e na intuição no amor, mesmo quando o caminho ainda parece incerto.",
     "work": "Avance com cautela em meio às incertezas do trabalho; sua intuição revela o passo certo.",
     "money": "Evite decisões financeiras baseadas em suposições; espere a névoa baixar antes de agir."
    },
    {
     "name": "O Sol",
     "keyword": "Alegria",
     "line": "Vitalidade, sucesso e calor humano iluminam todos os seus passos.",
     "reversedKeyword": "Otimismo contido",
     "reversedLine": "Reencontre a leveza aos poucos; reorganize as expectativas e deixe a alegria voltar no seu tempo.",
     "love": "Calor, alegria e felicidade iluminam o amor hoje; viva esse momento radiante plenamente.",
     "work": "Sucesso e reconhecimento brilham na sua carreira; aproveite a energia positiva do dia.",
     "money": "Prosperidade e boas notícias aquecem suas finanças; celebre com gratidão o que conquista."
    },
    {
     "name": "O Julgamento",
     "keyword": "Renascimento",
     "line": "Um despertar interior chama você a recomeçar com mais consciência.",
     "reversedKeyword": "Autocobrança",
     "reversedLine": "Perdoe-se pelo passado com bondade; reorganize a autocrítica e ouça com calma o chamado interior.",
     "love": "Um despertar sincero renova o amor; escute o chamado do coração e abra-se a um novo capítulo.",
     "work": "Um momento de renovação convida você a recomeçar; responda ao chamado da sua vocação hoje.",
     "money": "Reavalie seu rumo financeiro com clareza; um recomeço consciente reposiciona seus recursos."
    },
    {
     "name": "O Mundo",
     "keyword": "Realização",
     "line": "Um ciclo se completa com plenitude, gratidão e conquistas.",
     "reversedKeyword": "Inacabado",
     "reversedLine": "Falta pouco para fechar um ciclo; reorganize o que ficou pendente e siga com paciência até o fim.",
     "love": "Uma fase do amor se completa com plenitude; celebre a harmonia e a realização do coração hoje.",
     "work": "Um ciclo profissional se conclui com sucesso; reconheça sua conquista e abra-se ao próximo passo.",
     "money": "Suas finanças alcançam um ponto de realização; colha os frutos do que construiu com dedicação."
    }
   ],
   "reversedLabel": "Invertida",
   "fieldLabels": {
    "love": "Amor",
    "work": "Trabalho",
    "money": "Dinheiro"
   },
   "spreadTitle": "Tiragem de 3 cartas: Passado, Presente e Futuro",
   "positions": [
    "Passado",
    "Presente",
    "Futuro"
   ],
   "askMore": "Perguntar mais sobre esta carta"
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
   ],
   "dailyBySign": [
    [
     "Sua energia de fogo está a mil hoje, Áries: canalize esse impulso em uma meta concreta e o avanço será real.",
     "Nas relações, sua franqueza encanta, mas dê espaço para o outro responder antes de já partir para a próxima ação.",
     "No trabalho, você abre caminho onde ninguém ousou; lidere com coragem, só não atropele os detalhes pelo caminho.",
     "Marte pede ação, mas respirar três vezes antes de reagir transforma um impulso quente numa decisão certeira.",
     "Uma oportunidade aparece de repente e pede coragem imediata: você nasceu justamente para esses começos ousados.",
     "Cuidado com a pressa, guerreiro: o que parece atraso hoje pode estar te poupando de um caminho errado."
    ],
    [
     "Touro, seu ritmo firme é seu trunfo: avance com calma e constância, pois o que você constrói hoje tende a durar.",
     "No amor, seu carinho se mostra no cuidado prático; um gesto simples e afetuoso vale mais que mil palavras.",
     "No trabalho, sua persistência rende frutos; mantenha o foco no que é estável e evite mudanças por impulso agora.",
     "Vênus te convida a saborear os prazeres da vida com presença: uma boa refeição ou música acalmam seu coração.",
     "Uma chance ligada a dinheiro ou conforto surge; avalie com seu bom senso, sem pressa de decidir nada.",
     "Sua teimosia pode travar um bom acordo hoje; experimente ceder um pouco e veja como tudo flui mais leve."
    ],
    [
     "Gêmeos, sua mente está afiada e curiosa: aproveite para aprender algo novo ou puxar aquela conversa que andava adiando.",
     "Nas relações, seu papo leve aproxima as pessoas; só lembre de ouvir tanto quanto fala para criar laços de verdade.",
     "No trabalho, sua versatilidade resolve vários problemas de uma vez; só evite se dispersar entre tarefas demais.",
     "Mercúrio acelera suas ideias; anote os pensamentos que surgem, pois entre eles mora uma solução brilhante.",
     "Uma troca de mensagens ou um encontro casual pode abrir uma porta inesperada: fique atento aos sinais de hoje.",
     "Sua inquietação pede movimento, mas escolher uma direção e seguir nela evita aquela sensação de não terminar nada."
    ],
    [
     "Câncer, sua sensibilidade está em alta: acolha o que sente e deixe que a intuição guie suas escolhas com gentileza.",
     "No amor, seu cuidado aconchega quem você ama; abra-se um pouco mais e receba também o carinho que merece.",
     "No trabalho, sua memória e empatia fazem diferença; confie no seu instinto ao lidar com pessoas hoje.",
     "A Lua intensifica suas emoções; criar um cantinho tranquilo em casa devolve a paz que seu coração procura.",
     "Uma oportunidade ligada à família ou ao lar aparece com afeto; ela pode trazer mais segurança do que você imagina.",
     "Não leve tudo para o lado pessoal hoje: nem toda palavra tem segunda intenção, proteja seu coração com leveza."
    ],
    [
     "Leão, seu brilho ilumina o ambiente: ocupe o palco com generosidade e contagie todos com sua confiança natural.",
     "No amor, seu calor é magnético; demonstre afeto com aquele gesto grandioso, mas valorize também os elogios alheios.",
     "No trabalho, sua liderança inspira a equipe; reconheça o esforço dos outros e sua estrela brilhará ainda mais forte.",
     "O Sol reforça sua vitalidade; use essa energia para criar algo que tenha a sua cara e te orgulhe de verdade.",
     "Uma chance de se destacar surge hoje: mostre seu talento com coragem, pois você foi feito para esses holofotes.",
     "Cuidado para o orgulho não falar mais alto que o coração: pedir ajuda hoje é um gesto de força, não de fraqueza."
    ],
    [
     "Virgem, seu olhar atento aos detalhes resolve o que parecia complicado: organize um passo de cada vez e tudo se encaixa.",
     "Nas relações, seu cuidado prático demonstra amor; lembre-se de elogiar antes de apontar o que pode melhorar.",
     "No trabalho, sua eficiência impressiona; confie no que já fez bem e evite a armadilha do perfeccionismo paralisante.",
     "Mercúrio afia sua análise; um pequeno ajuste na rotina hoje traz uma sensação gostosa de ordem e clareza.",
     "Uma oportunidade aparece nos detalhes que só você percebe; sua atenção minuciosa pode abrir um caminho valioso.",
     "Pegar leve consigo mesmo é o recado de hoje: o suficiente já é ótimo, não precisa ser impecável para valer a pena."
    ],
    [
     "Libra, seu charme equilibra os ânimos ao redor: use essa diplomacia natural para harmonizar o que andava tenso hoje.",
     "No amor, sua busca por parceria está em foco; cultive a beleza do encontro, mas lembre de também honrar seus desejos.",
     "No trabalho, sua habilidade de mediar fecha acordos justos; confie no seu senso de justiça ao tomar decisões.",
     "Vênus realça seu apreço pela harmonia; um toque de beleza no ambiente eleva o astral e acalma sua mente.",
     "Uma chance ligada a uma parceria surge com bom potencial; pesar os prós e contras te levará à escolha certa.",
     "Tanto pesar os dois lados pode te deixar na dúvida; hoje, escutar seu coração ajuda a finalmente decidir."
    ],
    [
     "Escorpião, sua intensidade revela verdades ocultas: confie na sua intuição profunda e mergulhe no que realmente importa.",
     "No amor, sua entrega é poderosa; permita-se confiar aos poucos e a conexão verdadeira que você busca floresce.",
     "No trabalho, sua determinação supera qualquer obstáculo; foque sua força em uma meta e nada te detém hoje.",
     "Plutão aprofunda suas percepções; transformar uma emoção difícil em ação consciente é seu superpoder de hoje.",
     "Uma oportunidade que pede coragem emocional aparece; sua capacidade de se reinventar é a chave para aproveitá-la.",
     "Soltar o controle um pouquinho hoje traz alívio: nem tudo precisa ser desvendado, alguns mistérios podem só fluir."
    ],
    [
     "Sagitário, seu espírito aventureiro pede horizontes novos: siga aquela curiosidade e o dia abre caminhos animadores.",
     "Nas relações, seu otimismo contagia; compartilhe sua alegria, mas tenha tato com a sinceridade para não ferir ninguém.",
     "No trabalho, sua visão ampla enxerga oportunidades que outros não veem; aposte numa ideia grande com pés no chão.",
     "Júpiter expande sua fé na vida; aprender ou planejar uma viagem reacende aquela chama de liberdade que te move.",
     "Uma chance de crescer e expandir surge no seu caminho; sua coragem de arriscar pode levar você bem longe hoje.",
     "Tanto entusiasmo pede um pouco de foco: terminar o que começou hoje vale mais que iniciar dez aventuras novas."
    ],
    [
     "Capricórnio, sua disciplina é sua maior aliada: cada passo firme hoje te aproxima daquela meta ambiciosa de longo prazo.",
     "No amor, sua lealdade é um porto seguro; mostre seus sentimentos para além da rotina e o vínculo fica mais quente.",
     "No trabalho, sua responsabilidade rende reconhecimento; mantenha o foco e colha os frutos do que vem construindo.",
     "Saturno reforça sua estrutura; um plano bem traçado hoje transforma esforço em conquista sólida e duradoura.",
     "Uma oportunidade ligada a carreira ou status aparece; sua maturidade sabe exatamente como transformá-la em degrau.",
     "Trabalhar é importante, mas hoje reservar um tempo para descansar te deixa ainda mais forte para a escalada."
    ],
    [
     "Aquário, sua mente original enxerga o futuro: aposte numa ideia fora da caixa e inspire quem está à sua volta hoje.",
     "Nas relações, sua autenticidade atrai gente afim; cultive amizades genuínas e abra espaço para a troca de verdade.",
     "No trabalho, sua inovação resolve o que parecia travado; confie na sua visão diferente para propor algo novo.",
     "Urano desperta sua genialidade; permitir-se quebrar uma rotina ultrapassada traz aquele frescor que você adora.",
     "Uma chance ligada a grupos ou causas surge alinhada aos seus ideais; sua visão coletiva faz toda a diferença.",
     "Sua independência é linda, mas hoje deixar alguém se aproximar do seu mundo torna a jornada bem mais rica."
    ],
    [
     "Peixes, sua sensibilidade e imaginação fluem livres: confie na intuição e deixe a criatividade guiar seu dia com suavidade.",
     "No amor, sua empatia toca fundo quem você ama; entregue seu carinho, mas lembre de cuidar também dos seus limites.",
     "No trabalho, sua inspiração traz soluções inesperadas; confie nos seus pressentimentos ao escolher um caminho.",
     "Netuno embala seus sonhos; reservar um momento de silêncio ou arte recarrega sua alma sensível por completo.",
     "Uma oportunidade chega de forma sutil, quase como um sinal; sua intuição sabe reconhecê-la antes da razão.",
     "Cuidado para não absorver as emoções alheias hoje: proteja seu coração gentil com um pouco de espaço só seu."
    ]
   ],
   "moonTraits": [
    "Com a Lua em Áries, suas emoções são rápidas e intensas; você sente na hora, reage por impulso e logo já seguiu em frente.",
    "Com a Lua em Touro, seu coração busca segurança e aconchego; você se acalma com estabilidade, afeto físico e prazeres simples.",
    "Com a Lua em Gêmeos, suas emoções pedem palavras; você precisa conversar e entender o que sente para finalmente se acalmar.",
    "Com a Lua em Câncer, sua sensibilidade é profunda e protetora; você sente tudo intensamente e ama acolher quem está por perto.",
    "Com a Lua em Leão, seu coração precisa de calor e reconhecimento; você se sente vivo quando ama e é amado com generosidade.",
    "Com a Lua em Virgem, você processa as emoções organizando e ajudando; sentir-se útil e ter ordem ao redor traz sua paz interior.",
    "Com a Lua em Libra, seu equilíbrio emocional depende da harmonia; você se sente bem em parceria e busca a paz nas relações.",
    "Com a Lua em Escorpião, suas emoções são intensas e profundas; você sente tudo com força e protege seu coração com lealdade total.",
    "Com a Lua em Sagitário, seu coração precisa de liberdade e sentido; você se anima com aventuras, aprendizado e horizontes amplos.",
    "Com a Lua em Capricórnio, você lida com as emoções de forma contida e madura; sente segurança ao ter controle e objetivos claros.",
    "Com a Lua em Aquário, suas emoções pedem espaço e independência; você sente de um jeito único e valoriza a liberdade de ser quem é.",
    "Com a Lua em Peixes, sua sensibilidade é vasta e empática; você absorve tudo ao redor e encontra paz na arte, no sonho e na compaixão."
   ],
   "labels": {
    "bigTwoTitle": "Seus Dois Grandes: Sol e Lua",
    "sunLabel": "Signo Solar",
    "moonLabel": "Signo Lunar",
    "overall": "Geral",
    "love": "Amor",
    "money": "Dinheiro",
    "health": "Saúde",
    "career": "Carreira",
    "social": "Vida social",
    "compatTitle": "Compatibilidade",
    "bestToday": "Melhor hoje",
    "cautionToday": "Atenção hoje",
    "metaTitle": "Seu perfil astrológico",
    "planetLabel": "Planeta regente",
    "modalityLabel": "Modalidade",
    "polarityLabel": "Polaridade"
   }
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
     "line": "Un nuovo inizio ti chiama: segui la curiosità con cuore leggero.",
     "reversedKeyword": "Esitazione",
     "reversedLine": "Un passo affrettato chiede prudenza: prenditi un momento per ritrovare la direzione prima di partire.",
     "love": "Lasciati sorprendere da un incontro spontaneo: oggi il cuore leggero apre porte inattese in amore.",
     "work": "Accogli un progetto nuovo con curiosità: la freschezza delle idee conta più dell'esperienza.",
     "money": "Una piccola spesa per imparare qualcosa di nuovo oggi può rivelarsi un buon investimento per il futuro."
    },
    {
     "name": "Il Mago",
     "keyword": "Volontà",
     "line": "Hai gli strumenti giusti: trasforma le idee in azioni concrete.",
     "reversedKeyword": "Dispersione",
     "reversedLine": "Le energie sono sparse: riordina le priorità e concentra la volontà su un solo obiettivo concreto.",
     "love": "Hai il carisma per esprimerti con sincerità: parla chiaro e crea una connessione autentica oggi.",
     "work": "Tutti gli strumenti sono nelle tue mani: trasforma un'idea in azione e mostra le tue capacità.",
     "money": "È il momento giusto per avviare un progetto economico: pianifica con intenzione e agisci con metodo."
    },
    {
     "name": "La Papessa",
     "keyword": "Intuito",
     "line": "Ascolta la voce interiore: la risposta è già dentro di te.",
     "reversedKeyword": "Intuito sopito",
     "reversedLine": "Stai trascurando la voce interiore: rientra in te stesso e riascolta con calma i segnali sottili.",
     "love": "Fidati dell'intuito nei rapporti: ciò che senti sotto le parole rivela più di quanto immagini.",
     "work": "Osserva in silenzio prima di decidere: oggi le risposte migliori arrivano dall'ascolto interiore.",
     "money": "Non tutto va detto subito: tieni riservate certe scelte finanziarie e lascia maturare i pensieri."
    },
    {
     "name": "L'Imperatrice",
     "keyword": "Abbondanza",
     "line": "Creatività e calore fioriscono: coltiva ciò che ami.",
     "reversedKeyword": "Blocco creativo",
     "reversedLine": "La cura di te è in pausa: rientra con dolcezza nelle tue passioni e nutri ciò che ti fa fiorire.",
     "love": "Coltiva tenerezza e calore: gesti affettuosi e premurosi fanno fiorire il legame in modo naturale.",
     "work": "La tua creatività è feconda: dai forma alle idee e lascia che i progetti crescano con pazienza.",
     "money": "L'abbondanza arriva nutrendo ciò che ami: investi in ciò che cresce nel tempo, senza fretta."
    },
    {
     "name": "L'Imperatore",
     "keyword": "Stabilità",
     "line": "Struttura e disciplina ti danno solide fondamenta.",
     "reversedKeyword": "Rigidità",
     "reversedLine": "Un eccesso di controllo irrigidisce: allenta le regole e lascia spazio a un po' di flessibilità serena.",
     "love": "Offri stabilità e presenza sicura: una relazione cresce quando entrambi si sentono protetti e rispettati.",
     "work": "Struttura e disciplina danno solide fondamenta: organizza i tuoi compiti e guida con autorevolezza calma.",
     "money": "Un piano ordinato porta sicurezza: definisci un budget chiaro e mantieni le finanze sotto controllo."
    },
    {
     "name": "Il Papa",
     "keyword": "Saggezza",
     "line": "Un buon consiglio o una tradizione ti guidano con chiarezza.",
     "reversedKeyword": "Dogma",
     "reversedLine": "Le vecchie regole stringono: distingui la tradizione utile dai vincoli superati e scegli con discernimento.",
     "love": "Valori condivisi rafforzano il legame: cerca chi onora gli stessi principi e costruisci su basi sincere.",
     "work": "Un consiglio esperto o un mentore ti guidano: affidati alla saggezza di chi ha già percorso la strada.",
     "money": "Segui metodi collaudati e affidabili: in ambito finanziario, oggi la prudenza tradizionale ti protegge bene."
    },
    {
     "name": "Gli Amanti",
     "keyword": "Scelta",
     "line": "Una decisione del cuore chiede sincerità e armonia.",
     "reversedKeyword": "Squilibrio",
     "reversedLine": "Un legame chiede chiarezza: ascolta i tuoi valori e ricomponi l'armonia con sincerità, senza forzare le scelte.",
     "love": "Una scelta del cuore chiede sincerità: scegli con onestà chi risuona davvero con i tuoi valori profondi.",
     "work": "Una decisione importante richiede coerenza: allinea le scelte professionali a ciò in cui credi davvero.",
     "money": "Valuta con il cuore e con la testa: una scelta economica condivisa oggi porta armonia e fiducia."
    },
    {
     "name": "Il Carro",
     "keyword": "Determinazione",
     "line": "Con volontà e direzione, superi ogni ostacolo.",
     "reversedKeyword": "Direzione incerta",
     "reversedLine": "Le forze tirano in direzioni opposte: ritrova il centro e definisci una meta chiara prima di accelerare.",
     "love": "Con determinazione serena conquisti ciò che vuoi: mostra una direzione e il legame avanza con sicurezza.",
     "work": "Concentrazione e volontà ti portano lontano: mantieni la rotta e supererai ogni ostacolo sul cammino.",
     "money": "La disciplina ti premia: con obiettivi chiari e costanza, i tuoi sforzi finanziari prendono slancio."
    },
    {
     "name": "La Forza",
     "keyword": "Coraggio",
     "line": "La vera forza è gentile: dominati con dolcezza e fiducia.",
     "reversedKeyword": "Insicurezza",
     "reversedLine": "La fiducia vacilla un poco: tratta te stesso con gentilezza e riconquista la calma interiore un passo alla volta.",
     "love": "La vera forza è dolce: con pazienza e tenerezza superi le tensioni e rafforzi un legame autentico.",
     "work": "La calma vince la fretta: affronta le sfide con fiducia tranquilla e la situazione si distende.",
     "money": "Gestisci il denaro con sangue freddo: oggi la pazienza e l'autocontrollo evitano scelte impulsive."
    },
    {
     "name": "L'Eremita",
     "keyword": "Riflessione",
     "line": "Un momento di solitudine illumina la tua strada.",
     "reversedKeyword": "Isolamento",
     "reversedLine": "La solitudine pesa: la riflessione è preziosa, ma ricordati di riaprirti agli altri con calma e fiducia.",
     "love": "Un momento di introspezione chiarisce ciò che desideri: comprendi il cuore prima di aprirlo a qualcuno.",
     "work": "Allontanati dal rumore per riflettere: nella quiete trovi la chiarezza che le decisioni importanti richiedono.",
     "money": "Rivedi i conti in tranquillità: un esame attento e ponderato delle finanze ti mostra la via giusta."
    },
    {
     "name": "La Ruota della Fortuna",
     "keyword": "Cambiamento",
     "line": "I cicli girano: accogli il nuovo capitolo con apertura.",
     "reversedKeyword": "Resistenza",
     "reversedLine": "Un ciclo cambia e tu resisti: accogli il movimento con apertura, ogni fase ha il suo senso e il suo tempo.",
     "love": "I cicli girano a tuo favore: accogli un nuovo capitolo affettivo con apertura e cuore fiducioso.",
     "work": "Un cambiamento porta opportunità inattese: adattati con flessibilità e cavalca l'onda del nuovo corso.",
     "money": "La fortuna gira nel verso giusto: cogli un'occasione che si presenta, ma resta misurato e attento."
    },
    {
     "name": "La Giustizia",
     "keyword": "Equilibrio",
     "line": "Verità e responsabilità riportano armonia.",
     "reversedKeyword": "Disequilibrio",
     "reversedLine": "Qualcosa stride con la coscienza: rivedi le scelte con onestà e ristabilisci l'equità, prima dentro di te.",
     "love": "L'onestà costruisce fiducia: sii trasparente e leale, l'equilibrio reciproco fa crescere il rapporto.",
     "work": "Agisci con correttezza e rigore: decisioni giuste e trasparenti rafforzano la tua reputazione professionale.",
     "money": "Metti i conti in ordine con equità: salda i debiti e rispetta gli impegni, la chiarezza ti premia."
    },
    {
     "name": "L'Appeso",
     "keyword": "Nuova prospettiva",
     "line": "Cambia punto di vista: una pausa rivela ciò che conta.",
     "reversedKeyword": "Stallo",
     "reversedLine": "L'attesa si è fatta troppo lunga: forse è tempo di lasciar andare e guardare la situazione da una nuova angolazione.",
     "love": "Cambia prospettiva nei rapporti: oggi una pausa riflessiva ti aiuta a vedere l'amore con occhi nuovi.",
     "work": "Una pausa apparente nasconde una svolta: lascia maturare le cose e accogli un punto di vista diverso.",
     "money": "Rallenta prima di decidere: sospendere un acquisto oggi ti offre la lucidità per scegliere meglio domani."
    },
    {
     "name": "La Morte",
     "keyword": "Trasformazione",
     "line": "Una fine apre la porta a una rinascita: lascia andare con fiducia.",
     "reversedKeyword": "Transizione lenta",
     "reversedLine": "Un cambiamento tarda a completarsi: lascia andare con dolcezza ciò che finisce e fa' spazio a ciò che nasce.",
     "love": "Chiudi con serenità un capitolo finito: lasciar andare il passato libera spazio per un amore più vero.",
     "work": "Una fine apre una rinascita: archivia ciò che non serve più e accogli con coraggio una fase nuova.",
     "money": "Rivedi le vecchie abitudini di spesa: trasformare oggi uno schema obsoleto rinnova in meglio le tue finanze."
    },
    {
     "name": "La Temperanza",
     "keyword": "Armonia",
     "line": "Misura e pazienza creano un equilibrio prezioso.",
     "reversedKeyword": "Eccesso",
     "reversedLine": "L'equilibrio si è incrinato: ritrova misura e pazienza, dosa le energie senza spingere troppo in una direzione.",
     "love": "La pazienza e la misura armonizzano il legame: cerca il giusto mezzo e coltiva una dolce intesa reciproca.",
     "work": "Modera i ritmi e collabora con calma: l'equilibrio tra impegno e riposo rende il lavoro più fluido.",
     "money": "Trova la giusta misura nelle spese: un approccio equilibrato e paziente fa crescere il risparmio nel tempo."
    },
    {
     "name": "Il Diavolo",
     "keyword": "Consapevolezza",
     "line": "Riconosci ciò che ti lega: la libertà è una tua scelta.",
     "reversedKeyword": "Liberazione",
     "reversedLine": "Un legame o un'abitudine ti trattiene: riconosci con lucidità ciò che ti vincola e ritrova la tua libertà.",
     "love": "Osserva ciò che ti lega davvero: distingui il desiderio sano dalle dipendenze e scegli un amore che libera.",
     "work": "Non lasciarti incatenare alla routine: riconosci ciò che ti pesa e ritrova oggi entusiasmo e autonomia.",
     "money": "Attenzione alle tentazioni materiali: evita acquisti impulsivi e libera le finanze da spese non necessarie."
    },
    {
     "name": "La Torre",
     "keyword": "Risveglio",
     "line": "Un cambiamento improvviso fa spazio a basi più autentiche.",
     "reversedKeyword": "Scossa benefica",
     "reversedLine": "Una struttura traballa: invece di temere il crollo, lascia cadere ciò che non regge e ricostruisci più solido.",
     "love": "Una verità improvvisa schiarisce l'aria: affronta con coraggio un chiarimento e libera il legame dal non detto.",
     "work": "Un imprevisto scuote i piani: accoglilo come occasione per ricostruire su fondamenta più autentiche e sane.",
     "money": "Rivedi ciò che credevi sicuro: oggi un controllo attento delle finanze previene sorprese e rafforza la base."
    },
    {
     "name": "La Stella",
     "keyword": "Speranza",
     "line": "Una luce serena ti rinnova: credi nei tuoi sogni.",
     "reversedKeyword": "Fiducia smarrita",
     "reversedLine": "La speranza sembra affievolita: tratta te stesso con dolcezza e riaccendi piano la fiducia, una luce alla volta.",
     "love": "La speranza illumina il cuore: apriti con fiducia e serenità, l'amore fiorisce dove regna l'autenticità.",
     "work": "Una visione ispirata ti guida: coltiva i tuoi sogni con calma fiducia e i progetti prendono luce e forma.",
     "money": "Le prospettive si schiariscono: con ottimismo realistico e pazienza, le tue finanze ritrovano respiro e serenità."
    },
    {
     "name": "La Luna",
     "keyword": "Immaginazione",
     "line": "Fidati dell'intuito tra le ombre: la chiarezza tornerà.",
     "reversedKeyword": "Chiarezza in arrivo",
     "reversedLine": "Le nebbie iniziano a diradarsi: i dubbi si sciolgono piano, dai tempo alle emozioni di trovare la loro luce.",
     "love": "Ascolta le emozioni profonde: ciò che è incerto chiede pazienza, lascia che la verità emerga con dolcezza.",
     "work": "Non tutto è ancora chiaro: procedi con cautela tra le ambiguità e fidati dell'intuito mentre la nebbia si dirada.",
     "money": "Verifica bene prima di impegnarti: in ambito finanziario, diffida di ciò che non è del tutto trasparente."
    },
    {
     "name": "Il Sole",
     "keyword": "Gioia",
     "line": "Calore, successo e vitalità illuminano la tua giornata.",
     "reversedKeyword": "Luce velata",
     "reversedLine": "La gioia è un po' offuscata: ritrova le piccole cose che ti scaldano il cuore e lascia rientrare la serenità.",
     "love": "Calore e gioia illuminano il legame: vivi l'amore con leggerezza e gratitudine, la felicità si moltiplica.",
     "work": "Il successo sorride ai tuoi sforzi: la tua energia positiva contagia gli altri e oggi i progetti brillano.",
     "money": "Un periodo luminoso favorisce le finanze: goditi i frutti del lavoro con gratitudine e saggia generosità."
    },
    {
     "name": "Il Giudizio",
     "keyword": "Rinnovamento",
     "line": "Una chiamata interiore ti invita a un nuovo inizio.",
     "reversedKeyword": "Dubbio interiore",
     "reversedLine": "Un richiamo resta inascoltato: perdona te stesso con compassione e ascolta la chiamata al rinnovamento interiore.",
     "love": "È tempo di un risveglio del cuore: perdona, rinnova e dai una seconda possibilità a un legame sincero.",
     "work": "Una svolta ti chiama a evolvere: rispondi con consapevolezza, è il momento di rinnovare il tuo percorso.",
     "money": "Rivaluta le scelte finanziarie passate: oggi un bilancio onesto e lucido apre la via a una ripartenza saggia."
    },
    {
     "name": "Il Mondo",
     "keyword": "Compimento",
     "line": "Un ciclo si chiude con pienezza: festeggia il traguardo.",
     "reversedKeyword": "Cerchio aperto",
     "reversedLine": "Un traguardo tarda a chiudersi: completa con pazienza l'ultimo passo, ogni dettaglio porta il suo compimento.",
     "love": "Senso di pienezza e armonia nel legame: celebra ciò che avete costruito e apriti a un nuovo, bellissimo ciclo.",
     "work": "Un progetto giunge a compimento con successo: riconosci il valore del cammino e festeggia il traguardo raggiunto.",
     "money": "Le finanze raggiungono un sano equilibrio: raccogli i frutti del tuo impegno e poni basi solide per ciò che verrà."
    }
   ],
   "reversedLabel": "Rovescio",
   "fieldLabels": {
    "love": "Amore",
    "work": "Lavoro",
    "money": "Denaro"
   },
   "spreadTitle": "Stesa a tre carte: passato, presente e futuro",
   "positions": [
    "Passato",
    "Presente",
    "Futuro"
   ],
   "askMore": "Chiedi di più su questa carta"
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
   ],
   "dailyBySign": [
    [
     "La tua scintilla pionieristica è accesa stamattina: lancia quel progetto che rimandavi, ma misura il primo passo invece di bruciare tutto subito.",
     "Nelle relazioni il tuo entusiasmo conquista, però oggi lascia spazio anche all'altro: ascoltare prima di decidere ti renderà ancora più magnetico.",
     "Sul lavoro la tua iniziativa apre porte: proponi l'idea audace e accetta che qualche dettaglio lo perfezionino le persone attorno a te.",
     "Marte ti spinge a correre, ma la vera vittoria oggi è scegliere una battaglia sola e portarla a termine con una pazienza inattesa.",
     "Una nuova occasione bussa all'improvviso e tu sei l'unico pronto a coglierla al volo: fidati dell'istinto, poi controlla i numeri.",
     "L'impazienza è la tua unica vera rivale oggi: un respiro prima di rispondere trasforma un possibile scontro in una piccola conquista."
    ],
    [
     "Rallenta e lascia che i piaceri semplici ti ricarichino: un buon caffè, la luce del mattino, e ritrovi subito la tua solidità naturale.",
     "In amore la tua dolcezza concreta vale più di mille parole: un gesto affettuoso e costante oggi conta doppio per chi ti sta accanto.",
     "Sul lavoro la tua tenacia paga: porta avanti con calma ciò che hai già costruito, evitando di disperderti in troppe novità tutte insieme.",
     "Venere ti invita alla bellezza tangibile: cura il tuo spazio e il tuo corpo, perché il benessere fisico oggi nutre la tua serenità interiore.",
     "Un'opportunità pratica matura lentamente: dalle tempo, perché ciò che cresce con radici salde oggi diventa il tuo guadagno di domani.",
     "Evita di irrigidirti su un'idea: la tua forza è la stabilità, non l'ostinazione, e un piccolo compromesso oggi ti risparmia inutili tensioni."
    ],
    [
     "La tua mente brillante chiede stimoli: leggi, scrivi, attacca bottone con uno sconosciuto e lascia che le idee si moltiplichino da sole.",
     "In amore la parola è il tuo dono: una conversazione leggera e sincera oggi avvicina più di qualsiasi gesto plateale, quindi raccontati davvero.",
     "Sul lavoro la tua versatilità risplende: gestisci più cose insieme, ma scegli una priorità chiara per non lasciare tutto a metà.",
     "Mercurio ti rende curioso e veloce, però oggi prova ad ascoltare fino in fondo prima di rispondere: scoprirai sfumature che ti sfuggivano.",
     "Un contatto inaspettato porta un'occasione interessante: rispondi a quel messaggio, perché il tuo networking oggi apre una porta concreta.",
     "La dispersione è il rischio del giorno: scrivi tre cose da fare e fermati lì, così la tua energia mentale resta lucida fino a sera."
    ],
    [
     "Ascolta il tuo mondo interiore e creati un nido accogliente: oggi proteggere la tua sensibilità non è debolezza, ma intelligenza emotiva.",
     "In amore la tua tenerezza protettiva scalda chi ami: offri ascolto e cura, ricordando però di chiedere anche a te stesso di cosa hai bisogno.",
     "Sul lavoro la tua intuizione legge le persone meglio di ogni report: usala per smussare le tensioni e collaborare, senza assorbire l'umore altrui.",
     "La Luna, tua guida, amplifica le emozioni: se ti senti travolto, un momento di solitudine tranquilla ti restituisce equilibrio e chiarezza.",
     "Un'occasione nasce dai legami di fiducia: una persona cara ti apre una porta, quindi coltiva oggi i rapporti che ti fanno sentire al sicuro.",
     "Attento a non rimuginare sul passato: ciò che è stato ti ha reso forte, ma oggi la tua pace vive nel presente, non nei ricordi dolorosi."
    ],
    [
     "Entra in scena con il tuo calore: la tua presenza luminosa attira opportunità, quindi mostrati senza timore e illumina chi ti circonda.",
     "In amore la tua generosità conquista: un complimento sincero e un gesto plateale oggi accendono il cuore di chi ami, ma ricambia anche l'attenzione.",
     "Sul lavoro la tua leadership naturale ispira: guida con fiducia e ricorda che il vero re ascolta anche le idee di chi gli sta intorno.",
     "Il Sole ti dona vitalità e orgoglio: incanala questa fierezza in qualcosa di creativo, perché oggi brillare ti fa davvero bene all'anima.",
     "Un riconoscimento atteso può arrivare: fatti notare per il tuo talento, ma lascia che siano i risultati a parlare più forte della tua voce.",
     "Modera il bisogno di approvazione: il tuo valore non dipende dagli applausi, e una giornata serena nasce dall'amare prima di tutto te stesso."
    ],
    [
     "Ordina ciò che ti circonda e la mente si schiarisce: oggi la tua precisione trasforma il caos in un sistema che lavora per te in silenzio.",
     "In amore i tuoi piccoli gesti pratici dicono «ti voglio bene» meglio delle parole: cura i dettagli, ma concediti anche un po' di dolce imperfezione.",
     "Sul lavoro la tua diligenza è una marcia in più: affina, correggi, organizza, e lascia che la qualità del tuo lavoro parli da sola per te.",
     "Mercurio acuisce la tua analisi: usala per risolvere un problema concreto, evitando però di pretendere la perfezione assoluta da te stesso.",
     "Un'opportunità nasce dal tuo metodo: qualcuno nota quanto sei affidabile, quindi oggi la tua serietà discreta diventa un vantaggio reale.",
     "Allenta l'autocritica: sei più bravo di quanto ti concedi di credere, e una pausa gentile oggi vale più di un dettaglio perfezionato a fatica."
    ],
    [
     "Cerca armonia e bellezza intorno a te: oggi un ambiente piacevole e una scelta estetica curata rasserenano davvero il tuo umore delicato.",
     "In amore la tua diplomazia crea ponti: ascolta entrambe le versioni con grazia e troverai l'equilibrio che rende felici te e chi ami.",
     "Sul lavoro la tua eleganza relazionale apre porte: sai mediare e unire le persone, una qualità che oggi vale più di mille forzature.",
     "Venere ti spinge verso l'equilibrio: prima di compiacere tutti, chiediti cosa vuoi davvero tu, perché la tua serenità conta quanto la loro.",
     "Un'occasione arriva da una collaborazione: la tua capacità di unire i punti di vista oggi ti rende la persona indispensabile del gruppo.",
     "Evita l'indecisione: pesare ogni opzione all'infinito ti stanca, quindi oggi scegli con il cuore e fidati, la direzione giusta si rivelerà."
    ],
    [
     "La tua intensità è una forza: immergiti in ciò che conta davvero e lascia perdere il superficiale, perché oggi la profondità ti premia.",
     "In amore la tua passione è magnetica: mostra con coraggio un pezzo di vulnerabilità a chi ami, e la fiducia tra voi si farà ancora più profonda.",
     "Sul lavoro la tua determinazione strategica vince: scava sotto la superficie di un problema e troverai la soluzione che agli altri sfugge.",
     "Plutone alimenta la tua capacità di trasformarti: lascia andare ciò che non ti serve più, perché rinascere oggi è il tuo superpotere segreto.",
     "Un'occasione nascosta emerge se segui l'intuito: la tua percezione affilata oggi fiuta ciò che gli altri non vedono, quindi fidati di te.",
     "Attento al rancore: trattenere è la tua tentazione, ma perdonare oggi non ti rende debole, ti libera e ti restituisce un'energia preziosa."
    ],
    [
     "Spalanca i tuoi orizzonti: studia qualcosa di nuovo, sogna un viaggio, e lascia che l'avventura riaccenda il tuo ottimismo contagioso.",
     "In amore la tua libertà è seducente: condividi un'esperienza nuova con chi ami invece di una routine, e il legame ritroverà leggerezza e gioia.",
     "Sul lavoro la tua visione d'insieme è preziosa: punta in alto e ispira gli altri con il tuo entusiasmo, curando però anche i dettagli pratici.",
     "Giove ti regala fortuna ed espansione: oggi è il giorno giusto per una decisione grande, purché la tua sincerità resti sempre gentile.",
     "Un'opportunità lontana si avvicina: dì sì a un invito che ti porta fuori dai soliti confini, perché la fortuna oggi premia chi esplora.",
     "Frena le promesse troppo facili: il tuo slancio entusiasta a volte corre più dei fatti, quindi oggi prometti solo ciò che puoi mantenere."
    ],
    [
     "Costruisci con pazienza il tuo mattone di oggi: la tua perseveranza tranquilla trasforma i piccoli passi quotidiani in traguardi solidi.",
     "In amore la tua serietà è rassicurante: mostra l'affetto concreto che provi con un gesto stabile, perché chi ami ha bisogno di sentirti vicino.",
     "Sul lavoro la tua disciplina è oro: lavora in modo strategico verso l'obiettivo, e oggi la tua affidabilità verrà finalmente notata da chi conta.",
     "Saturno ti chiede struttura e impegno: organizza il lungo termine, ma concediti anche un piccolo riposo, perché scalare richiede pure fiato.",
     "Un'occasione matura premia chi ha seminato: il tuo lavoro paziente di ieri oggi inizia a dare frutti, quindi resta saldo sulla tua rotta.",
     "Non confondere il valore con la sola produttività: oggi concediti di goderti un risultato già raggiunto, senza correre subito al prossimo."
    ],
    [
     "Lascia volare la tua originalità: un'idea fuori dagli schemi oggi è proprio ciò che il mondo intorno a te aspettava senza saperlo.",
     "In amore la tua libertà mentale affascina: offri all'altro spazio e idee da condividere, perché per te l'intimità nasce anche dalla complicità di pensiero.",
     "Sul lavoro la tua visione innovativa anticipa i tempi: proponi la soluzione anticonvenzionale e lascia che la tua prospettiva unica faccia la differenza.",
     "Urano accende lampi di genio improvvisi: annota quell'intuizione fulminea, perché oggi ciò che sembra strano potrebbe rivelarsi geniale domani.",
     "Un'occasione arriva dalla comunità: un gruppo di persone affini condivide con te un'idea che da solo non avresti trovato, quindi apriti agli altri.",
     "Evita di restare distante per principio: la tua libertà non perde nulla se oggi ti concedi un po' di calore umano e una vera vicinanza."
    ],
    [
     "Affidati alla tua intuizione gentile: oggi i sogni e le piccole sensazioni hanno qualcosa da dirti, quindi concediti un momento di silenzio per ascoltarli.",
     "In amore la tua tenerezza empatica avvolge chi ami: offri compassione e fantasia, ma ricorda di proteggere anche i tuoi confini emotivi.",
     "Sul lavoro la tua creatività ispirata trova soluzioni poetiche: porta un tocco d'immaginazione, ma ancora i sogni a un passo pratico e concreto.",
     "Nettuno amplifica la tua sensibilità e la tua arte: lascia che la musica o la bellezza ti ricarichino, perché oggi nutrono la tua anima profonda.",
     "Un'occasione arriva da un gesto di gentilezza: la tua generosità d'animo oggi torna indietro, quindi resta aperto a ciò che la vita ti riserva.",
     "Attento a perderti nelle illusioni: sognare è il tuo dono, ma oggi tieni un piede nella realtà per non scambiare un desiderio per un fatto."
    ]
   ],
   "moonTraits": [
    "Pioniere istintivo: reagisci con slancio e coraggio, e ti senti vivo quando apri la strada per primo.",
    "Cuore stabile: cerchi sicurezza e comfort, e ti calmi tra abbracci, buon cibo e abitudini affettuose.",
    "Mente curiosa: elabori le emozioni parlandone, e ti rasserena lo scambio leggero di idee e parole.",
    "Anima protettiva: senti tutto in profondità, e trovi pace prendendoti cura di chi ami e del tuo nido.",
    "Cuore generoso: hai bisogno di calore e riconoscimento, e fiorisci quando ti senti visto e apprezzato.",
    "Spirito ordinato: ti rassicura la cura dei dettagli, e ritrovi serenità mettendo le cose al loro posto.",
    "Animo armonioso: cerchi equilibrio e bellezza, e stai bene quando intorno a te regna la pace nelle relazioni.",
    "Cuore intenso: vivi le emozioni con profondità totale, e ti fidi solo dei legami autentici e sinceri.",
    "Spirito libero: hai bisogno di spazio e prospettiva, e ritrovi gioia esplorando, viaggiando e sognando in grande.",
    "Cuore disciplinato: ti senti sicuro con la struttura, e dai il meglio quando un obiettivo concreto ti guida.",
    "Mente indipendente: elabori i sentimenti con distacco lucido, e respiri quando hai libertà e idee da condividere.",
    "Anima sensibile: assorbi le emozioni intorno a te, e ti rigeneri nella quiete, nell'arte e nella gentilezza."
   ],
   "labels": {
    "bigTwoTitle": "I tuoi due astri principali",
    "sunLabel": "Sole",
    "moonLabel": "Luna",
    "overall": "Generale",
    "love": "Amore",
    "money": "Denaro",
    "health": "Salute",
    "career": "Carriera",
    "social": "Vita sociale",
    "compatTitle": "Affinità di oggi",
    "bestToday": "Da fare oggi",
    "cautionToday": "Da evitare oggi",
    "metaTitle": "Profilo astrale",
    "planetLabel": "Pianeta guida",
    "modalityLabel": "Modalità",
    "polarityLabel": "Polarità"
   }
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
     "line": "Saatnya melangkah dengan hati terbuka dan jiwa yang ringan menuju petualangan baru.",
     "reversedKeyword": "Gegabah, ragu",
     "reversedLine": "Langkahmu mungkin terburu tanpa arah, jadi tariklah napas dan tata rencana sebelum melompat lebih jauh.",
     "love": "Buka hatimu untuk awal yang segar, sebab keberanian kecil hari ini bisa menumbuhkan kedekatan tak terduga.",
     "work": "Peluang baru menanti, jadi terimalah tantangan dengan rasa ingin tahu meski jalannya masih belum jelas benar.",
     "money": "Saat tepat mencoba ide finansial baru, namun tetap sisihkan cadangan agar semangatmu tidak berubah jadi kelalaian."
    },
    {
     "name": "Sang Pesulap (The Magician)",
     "keyword": "Manifestasi",
     "line": "Kamu punya semua bekal untuk mewujudkan keinginanmu — percayalah pada kemampuanmu.",
     "reversedKeyword": "Manipulasi, ragu",
     "reversedLine": "Kemampuanmu sedang terhambat, maka kembalikan fokus pada niat jujur agar energimu mengalir lagi dengan jernih.",
     "love": "Kamu punya daya tarik untuk memulai percakapan, jadi ungkapkan perasaanmu dengan tulus dan penuh percaya diri.",
     "work": "Semua alat untuk sukses ada di tanganmu, maka wujudkan rencana menjadi tindakan nyata hari ini.",
     "money": "Inisiatifmu bisa membuka sumber pemasukan baru, jadi manfaatkan keterampilan yang sudah kamu kuasai dengan cermat."
    },
    {
     "name": "Pendeta Wanita Agung (The High Priestess)",
     "keyword": "Intuisi",
     "line": "Dengarkan suara batinmu; jawaban yang kamu cari ada dalam keheningan.",
     "reversedKeyword": "Rahasia, abai",
     "reversedLine": "Mungkin kamu mengabaikan bisikan batin, maka luangkan waktu hening untuk menata kembali apa yang sungguh kamu rasakan.",
     "love": "Dengarkan intuisimu soal hubungan, sebab jawaban yang kamu cari sering hadir lewat perasaan, bukan kata-kata.",
     "work": "Amati situasi dengan tenang sebelum bertindak, karena kesabaran membaca pola akan memberimu keunggulan tersembunyi.",
     "money": "Percayai firasatmu soal uang, namun pastikan keputusan tetap didukung pertimbangan yang matang dan masuk akal."
    },
    {
     "name": "Sang Permaisuri (The Empress)",
     "keyword": "Kelimpahan",
     "line": "Energi yang penuh kasih dan subur sedang mengelilingimu — rawat apa yang kamu cintai.",
     "reversedKeyword": "Stagnan, lelah",
     "reversedLine": "Energi merawatmu mungkin terkuras, jadi isi ulang dirimu lebih dulu sebelum mencurahkan perhatian untuk orang lain.",
     "love": "Kelembutan dan kehangatanmu menarik kedekatan, jadi rawat hubungan dengan kasih yang tulus dan penuh kesabaran.",
     "work": "Kreativitasmu sedang subur, maka biarkan ide-ide tumbuh dan wujudkan dalam karya yang nyata dan bermakna.",
     "money": "Kelimpahan datang lewat ketekunan, jadi kelola sumber dayamu dengan bijak agar hasilnya terus berkembang."
    },
    {
     "name": "Sang Kaisar (The Emperor)",
     "keyword": "Kestabilan",
     "line": "Struktur dan kedisiplinan akan membawa rasa aman serta kepemimpinan yang kokoh.",
     "reversedKeyword": "Kaku, dominan",
     "reversedLine": "Kendali yang terlalu kaku bisa menyesakkan, maka beri ruang fleksibel agar struktur tetap kokoh tanpa menekan.",
     "love": "Hadirkan rasa aman dan komitmen yang stabil, sebab pasangan menghargai kehadiranmu yang teguh dan dapat diandalkan.",
     "work": "Susun rencana dengan disiplin dan batas yang jelas, karena keteraturan hari ini menjadi fondasi pencapaianmu nanti.",
     "money": "Kelola keuangan dengan struktur yang rapi, sebab kedisiplinan kecil hari ini menjaga stabilitas jangka panjangmu."
    },
    {
     "name": "Sang Pendeta Tinggi (The Hierophant)",
     "keyword": "Tradisi",
     "line": "Kearifan dan nilai-nilai luhur menuntunmu; belajarlah dari mereka yang berpengalaman.",
     "reversedKeyword": "Kaku aturan",
     "reversedLine": "Tradisi yang membelenggu bisa menahanmu, jadi pertimbangkan jalan baru tanpa harus menyingkirkan nilai yang berharga.",
     "love": "Hubungan tumbuh lewat nilai bersama, jadi bangun komitmen di atas rasa saling hormat dan keyakinan yang sejalan.",
     "work": "Belajar dari mentor atau sistem yang teruji akan memperkuat langkahmu menuju keahlian yang lebih matang.",
     "money": "Ikuti pendekatan keuangan yang teruji dan tradisional, sebab kestabilan sering lahir dari kebijaksanaan yang sudah terbukti."
    },
    {
     "name": "Sang Kekasih (The Lovers)",
     "keyword": "Pilihan Hati",
     "line": "Sebuah keputusan dari hati menanti — selaraskan nilai dan perasaanmu.",
     "reversedKeyword": "Bimbang, retak",
     "reversedLine": "Keselarasan mungkin sedang goyah, maka jujurlah pada nilaimu dan komunikasikan perasaan sebelum jarak makin melebar.",
     "love": "Hari ini menyokong keterhubungan yang dalam, jadi pilih kejujuran hati untuk mempererat ikatan yang berarti bagimu.",
     "work": "Sebuah pilihan penting menanti, maka selaraskan keputusanmu dengan nilai inti agar kerja sama berjalan harmonis.",
     "money": "Pertimbangkan keputusan finansial yang sejalan dengan prinsipmu, sebab keselarasan nilai membawa ketenangan dalam mengelola uang."
    },
    {
     "name": "Sang Kereta Perang (The Chariot)",
     "keyword": "Tekad",
     "line": "Dengan fokus dan kemauan kuat, kamu mampu menaklukkan tantangan di depan.",
     "reversedKeyword": "Arah hilang",
     "reversedLine": "Kemudi mungkin terasa lepas kendali, jadi tata kembali tujuanmu dan kumpulkan tekad sebelum melaju lebih kencang.",
     "love": "Tekad dan kejelasan arah memperkuat hubungan, jadi tunjukkan komitmenmu dengan langkah yang mantap dan konsisten.",
     "work": "Fokus dan disiplin membawamu pada kemenangan, maka arahkan seluruh energi pada satu tujuan yang jelas.",
     "money": "Tetapkan target finansial yang tegas, sebab kedisiplinan menjaga arah akan membawamu menuju hasil yang kamu kejar."
    },
    {
     "name": "Kekuatan (Strength)",
     "keyword": "Keberanian Lembut",
     "line": "Kekuatan sejati lahir dari kesabaran dan kelembutan, bukan paksaan.",
     "reversedKeyword": "Ragu diri",
     "reversedLine": "Kepercayaan dirimu mungkin meredup, maka rawat batinmu dengan lembut agar kekuatan sejati perlahan pulih kembali.",
     "love": "Kesabaran dan kelembutan menumbuhkan cinta, jadi hadapi gesekan dengan hati tenang dan pengertian yang hangat.",
     "work": "Ketahananmu diuji, namun ketenangan dan keyakinan diri akan membawamu melewati tantangan dengan anggun.",
     "money": "Hadapi tekanan keuangan dengan kepala dingin, sebab kesabaran dan ketekunan lebih kuat daripada keputusan tergesa."
    },
    {
     "name": "Sang Pertapa (The Hermit)",
     "keyword": "Perenungan",
     "line": "Luangkan waktu untuk menyendiri; kejernihan akan datang dari refleksi yang tenang.",
     "reversedKeyword": "Terasing, sepi",
     "reversedLine": "Menyendiri itu wajar, namun jangan sampai terkucil, jadi seimbangkan waktu refleksi dengan tetap terhubung pada sekitarmu.",
     "love": "Beri ruang untuk memahami dirimu, sebab kejelasan batin akan membuat hubunganmu lebih jujur dan bermakna.",
     "work": "Saat tepat merenung dan mencari arah, jadi dengarkan kebijaksanaan dalam dirimu sebelum mengambil langkah besar.",
     "money": "Tinjau kembali keuanganmu dengan tenang dan jernih, sebab refleksi yang sabar membantu menyusun rencana yang lebih bijak."
    },
    {
     "name": "Roda Keberuntungan (Wheel of Fortune)",
     "keyword": "Perputaran",
     "line": "Siklus kehidupan sedang berputar; sambut perubahan dengan hati yang terbuka.",
     "reversedKeyword": "Hambatan, tunda",
     "reversedLine": "Roda terasa berbalik arah, maka tetap tenang sebab setiap siklus akan berputar, dan kesabaran menjaga keseimbangan.",
     "love": "Perubahan membawa peluang baru dalam asmara, jadi sambut pergeseran ini dengan hati terbuka dan penuh harapan.",
     "work": "Putaran nasib sedang menguntungkan, maka manfaatkan momentum ini untuk melangkah maju dengan percaya diri.",
     "money": "Peluang finansial bisa berputar ke arahmu, jadi bersiaplah menangkap kesempatan saat waktunya tiba dengan sigap."
    },
    {
     "name": "Keadilan (Justice)",
     "keyword": "Keseimbangan",
     "line": "Kejujuran dan keadilan membawa keselarasan — pertimbangkan segalanya dengan bijak.",
     "reversedKeyword": "Berat sebelah",
     "reversedLine": "Keseimbangan mungkin terganggu, maka tinjau kembali tindakanmu dengan jujur agar keadilan tetap terjaga bagi semua pihak.",
     "love": "Kejujuran dan keadilan memperkuat hubungan, jadi perlakukan pasangan dengan tulus dan tanggung jawab yang seimbang.",
     "work": "Keputusan adil dan jelas membawa hasil baik, maka pertimbangkan setiap pilihan dengan kepala jernih dan integritas.",
     "money": "Tata keuanganmu dengan jujur dan seimbang, sebab keputusan yang adil hari ini membawa ketenangan di kemudian hari."
    },
    {
     "name": "Sang Tergantung (The Hanged Man)",
     "keyword": "Sudut Pandang Baru",
     "line": "Berhenti sejenak dan lihat dari sisi berbeda; jeda ini penuh makna.",
     "reversedKeyword": "Macet, korban",
     "reversedLine": "Mungkin kamu terjebak menunggu, maka lepaskan yang tak bisa diubah dan temukan sudut pandang baru yang menyegarkan.",
     "love": "Coba lihat hubungan dari sudut pandang baru, sebab kesabaran dan kerelaan melepas akan membuka pemahaman lebih dalam.",
     "work": "Jeda sejenak memberimu perspektif segar, jadi gunakan masa ini untuk merenung sebelum bergerak ke arah berbeda.",
     "money": "Tahan dulu keputusan besar soal uang, sebab menunggu dengan sabar bisa mengungkap pilihan yang lebih cerdas."
    },
    {
     "name": "Kematian (Death)",
     "keyword": "Transformasi",
     "line": "Sebuah babak usai agar babak baru bisa dimulai — lepaskan yang tak lagi melayanimu.",
     "reversedKeyword": "Tertahan, takut",
     "reversedLine": "Perubahan mungkin tertunda karena ragu, maka relakan yang usai dengan lembut agar babak baru bisa benar-benar dimulai.",
     "love": "Akhir satu babak membuka ruang bagi yang baru, jadi sambut transformasi dalam hubungan dengan hati yang lapang.",
     "work": "Saatnya melepas cara lama yang tak lagi cocok, sebab pembaruan ini membuka jalan menuju pertumbuhan yang nyata.",
     "money": "Tinggalkan kebiasaan finansial yang menghambat, sebab perubahan ini menyiapkan ruang bagi pendekatan yang lebih sehat."
    },
    {
     "name": "Kesederhanaan (Temperance)",
     "keyword": "Harmoni",
     "line": "Keseimbangan dan kesabaran memadukan segala hal menjadi selaras.",
     "reversedKeyword": "Tak seimbang",
     "reversedLine": "Keselarasan mungkin sedikit goyah, maka cari kembali ritme yang pas antara memberi, menerima, dan beristirahat sejenak.",
     "love": "Kesabaran dan keselarasan memperdalam cinta, jadi rawat hubungan dengan komunikasi tenang dan kompromi yang lembut.",
     "work": "Padukan berbagai unsur dengan sabar, sebab pendekatan yang seimbang membawa hasil kerja yang lebih harmonis.",
     "money": "Kelola uang dengan moderasi dan kesabaran, sebab keseimbangan antara hemat dan menikmati menjaga keuanganmu tetap sehat."
    },
    {
     "name": "Sang Iblis (The Devil)",
     "keyword": "Keterikatan",
     "line": "Kenali belenggu yang kamu ciptakan sendiri; kebebasan ada dalam genggamanmu.",
     "reversedKeyword": "Lepas belenggu",
     "reversedLine": "Kamu mulai sadar pada ikatan yang membatasi, maka kenali pola itu dengan jujur untuk perlahan membebaskan dirimu.",
     "love": "Kenali pola yang mengikat dalam hubungan, sebab kesadaran jujur membantumu memilih kedekatan yang lebih sehat dan bebas.",
     "work": "Periksa apakah ada yang membelenggu langkahmu, maka lepaskan kebiasaan yang menahanmu agar bisa bergerak lebih leluasa.",
     "money": "Waspadai godaan belanja atau utang yang mengikat, sebab kesadaran hari ini menjaga kebebasan finansialmu ke depan."
    },
    {
     "name": "Menara (The Tower)",
     "keyword": "Pembaruan Mendadak",
     "line": "Guncangan tak terduga membuka jalan bagi fondasi yang lebih jujur dan kuat.",
     "reversedKeyword": "Reda, pulih",
     "reversedLine": "Guncangan mungkin mereda perlahan, maka gunakan momen ini untuk membangun ulang fondasi dengan lebih jujur dan kokoh.",
     "love": "Kejujuran terbuka bisa menyegarkan hubungan, jadi sampaikan apa yang terpendam agar ikatan tumbuh lebih kuat dan tulus.",
     "work": "Perubahan mendadak bisa membuka kebenaran baru, maka terimalah sebagai kesempatan menata ulang yang lebih solid.",
     "money": "Tinjau ulang fondasi keuanganmu hari ini, sebab menata kembali yang rapuh kini mencegah guncangan yang lebih besar."
    },
    {
     "name": "Bintang (The Star)",
     "keyword": "Harapan",
     "line": "Cahaya harapan dan ketenangan menyinari jalanmu — percayalah pada masa depan.",
     "reversedKeyword": "Harap pudar",
     "reversedLine": "Harapan mungkin terasa redup sejenak, maka rawat dirimu dengan lembut sebab cahaya batinmu masih menyala diam-diam.",
     "love": "Harapan dan ketulusan menyembuhkan hati, jadi biarkan dirimu terbuka dan percaya pada kedekatan yang sedang tumbuh.",
     "work": "Optimisme menuntunmu pada inspirasi baru, maka percayai visimu dan ambil langkah kecil menuju impian yang jelas.",
     "money": "Masa depan finansial terlihat cerah, jadi tanam harapan lewat langkah perlahan dan rencana yang penuh keyakinan."
    },
    {
     "name": "Bulan (The Moon)",
     "keyword": "Intuisi & Imajinasi",
     "line": "Ikuti firasatmu melewati kabut keraguan; intuisimu lebih tajam dari yang kamu kira.",
     "reversedKeyword": "Bingung, cemas",
     "reversedLine": "Kabut mulai menipis perlahan, maka beri waktu pada dirimu untuk memilah ilusi dari kenyataan dengan tenang.",
     "love": "Dengarkan perasaanmu yang terdalam, sebab kejujuran pada diri sendiri akan menjernihkan kebingungan dalam hubunganmu.",
     "work": "Tidak semua tampak jelas saat ini, maka majulah selangkah demi selangkah sambil mempercayai intuisimu yang halus.",
     "money": "Cermati keputusan keuangan yang masih kabur, sebab kesabaran menelaah detail mencegah salah langkah yang merugikan."
    },
    {
     "name": "Matahari (The Sun)",
     "keyword": "Kegembiraan",
     "line": "Kehangatan, keberhasilan, dan keceriaan sedang bersinar untukmu hari ini.",
     "reversedKeyword": "Redup sesaat",
     "reversedLine": "Cahaya mungkin sedikit terhalang, maka cari sumber kegembiraan kecil agar semangatmu kembali bersinar dengan hangat.",
     "love": "Kehangatan dan keceriaan mendekatkan hati, jadi bagikan kebahagiaan tulus dan nikmati momen indah bersama pasangan.",
     "work": "Energi positif membuka jalan keberhasilan, maka tampilkan dirimu dengan percaya diri dan biarkan potensimu bersinar.",
     "money": "Hari ini membawa kabar finansial yang cerah, jadi syukuri kelimpahan dan kelola hasilnya dengan bijak dan penuh rasa cukup."
    },
    {
     "name": "Penghakiman (Judgement)",
     "keyword": "Kebangkitan",
     "line": "Sebuah panggilan untuk bangkit dan memulai babak baru dengan jiwa yang diperbarui.",
     "reversedKeyword": "Tunda evaluasi",
     "reversedLine": "Mungkin kamu menunda merenungi pelajaran lama, maka dengarkan panggilan batinmu agar bisa bangkit dengan kesadaran baru.",
     "love": "Saatnya memaafkan dan memulai lembaran baru, jadi lepaskan beban masa lalu agar hubunganmu terlahir lebih jujur dan ringan.",
     "work": "Sebuah panggilan atau peluang penting hadir, maka renungkan perjalananmu dan ambil keputusan yang selaras dengan tujuanmu.",
     "money": "Tinjau kembali pelajaran finansial masa lalu, sebab kesadaran jujur hari ini membantumu memulai babak keuangan yang lebih bijak."
    },
    {
     "name": "Dunia (The World)",
     "keyword": "Penyelesaian",
     "line": "Sebuah siklus tuntas dengan indah — rayakan pencapaian dan keutuhanmu.",
     "reversedKeyword": "Hampir rampung",
     "reversedLine": "Sebuah siklus hampir tuntas, maka rapikan langkah terakhir dengan sabar agar pencapaianmu terasa utuh dan bermakna.",
     "love": "Hubungan menuju keutuhan dan kepuasan, jadi syukuri perjalanan bersama dan rayakan ikatan yang tumbuh semakin matang.",
     "work": "Pencapaian besar ada dalam jangkauan, maka selesaikan tahap akhir dengan tekun agar hasilnya benar-benar sempurna.",
     "money": "Tujuan finansialmu hampir terwujud, jadi jaga konsistensi langkah terakhir agar kelimpahan datang secara menyeluruh dan stabil."
    }
   ],
   "reversedLabel": "Posisi Terbalik",
   "fieldLabels": {
    "love": "Asmara",
    "work": "Karier",
    "money": "Keuangan"
   },
   "spreadTitle": "Sebaran Tiga Kartu: Masa Lalu, Kini, dan Nanti",
   "positions": [
    "Masa Lalu",
    "Saat Ini",
    "Masa Depan"
   ],
   "askMore": "Tanya lebih dalam tentang kartu ini"
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
   ],
   "dailyBySign": [
    [
     "Energi Aries-mu menyala sejak pagi; salurkan dorongan itu pada satu target nyata, bukan sepuluh sekaligus.",
     "Sebagai jiwa api, kamu senang memulai duluan; ajak orang lain ikut serta, jangan lari sendirian terlalu jauh.",
     "Di urusan kerja, keberanianmu jadi nilai lebih hari ini; sampaikan idemu, tapi dengarkan tanggapan sebelum melompat.",
     "Mars membuat sumbumu pendek; tarik napas tiga detik sebelum bereaksi, dan banyak gesekan kecil bisa terhindari.",
     "Peluang baru mungkin datang mendadak; rebut yang paling kamu yakini, sisanya cukup kamu catat untuk nanti.",
     "Semangatmu menular, tapi jaga staminamu; satu kemenangan tuntas lebih berharga daripada lima awal yang terbengkalai."
    ],
    [
     "Ritme tenangmu adalah kekuatan; nikmati hari dengan langkah mantap, tak perlu terburu mengejar siapa pun.",
     "Sebagai jiwa bumi, kamu menghargai yang nyata; rawat satu hal kecil yang membuatmu nyaman, entah secangkir kopi atau taman.",
     "Soal uang, nalurimu tajam hari ini; menabung sedikit memang terasa membosankan, tapi bisa jadi penyelamatmu nanti.",
     "Venus melembutkan suasana hatimu; tunjukkan kasih lewat tindakan sederhana, orang terdekat pasti merasakannya.",
     "Perubahan mungkin mengetuk pintu; kamu tak harus langsung setuju, cukup buka diri sedikit pada kemungkinan baru.",
     "Keras kepala itu wajar, tapi coba dengar sudut pandang lain; sedikit keluwesan membuat harimu jauh lebih ringan."
    ],
    [
     "Pikiranmu berlompatan ke mana-mana hari ini; tulis satu daftar singkat agar ide cemerlangmu tak menguap begitu saja.",
     "Sebagai jiwa udara, kamu hidup dari obrolan; satu percakapan ringan bisa membuka pintu yang tak kamu duga.",
     "Di tempat kerja, kelincahanmu dihargai; pilih satu tugas dan tuntaskan dulu sebelum tergoda yang berikutnya.",
     "Merkurius membuat lidahmu lincah; pesonamu memikat, tapi tepati janji kecil agar kepercayaan tetap terjaga.",
     "Rasa penasaran membawamu pada hal segar; pelajari sesuatu yang baru, sekadar untuk menyenangkan otakmu yang aktif.",
     "Kamu mudah bosan; itu bukan kelemahan, asal kamu belajar menamatkan satu hal sebelum berpindah hati."
    ],
    [
     "Hatimu peka hari ini; ciptakan ruang nyaman di rumah, dan energimu akan pulih lebih cepat dari dugaan.",
     "Sebagai jiwa air, kamu merawat orang lain dengan tulus; jangan lupa, dirimu sendiri juga layak dirawat hari ini.",
     "Soal kerja, intuisimu jeli membaca suasana; percayai firasat itu, tapi sandingkan dengan satu fakta sebelum memutuskan.",
     "Bulan, pelindungmu, membuat perasaanmu naik-turun; itu wajar, beri waktu sebelum menanggapi hal yang menyentuh hati.",
     "Sebuah kenangan atau kabar lama mungkin muncul; sambut dengan lembut, lalu lanjutkan langkahmu ke depan.",
     "Kamu cenderung memendam; bercerita pada satu orang tepercaya akan terasa melegakan, dan beban di dada pun mengendur."
    ],
    [
     "Karismamu bersinar hari ini; pancarkan kehangatan itu, tapi beri panggung pada orang lain agar lingkaranmu makin solid.",
     "Sebagai jiwa api, kamu butuh diakui; satu pujian tulus yang kamu beri ke orang lain akan kembali berlipat padamu.",
     "Di urusan kerja, kepemimpinanmu menonjol; pimpin dengan kemurahan hati, bukan sekadar keinginan menjadi pusat perhatian.",
     "Matahari, sang pelindung, mengisimu dengan percaya diri; gunakan untuk menyemangati, bukan untuk mendominasi suasana.",
     "Peluang tampil mungkin datang; ambil dengan anggun, dan ingat untuk berbagi sorotan dengan tim di belakangmu.",
     "Gengsi terkadang membuatmu kaku; sebuah permintaan maaf sederhana justru memperbesar wibawamu, bukan menguranginya."
    ],
    [
     "Mata jelimu menangkap detail yang orang lain lewatkan; manfaatkan hari ini untuk membereskan satu hal yang lama tertunda.",
     "Sebagai jiwa bumi, kamu nyaman dengan keteraturan; satu rencana rapi membuat harimu mengalir tanpa kepanikan berarti.",
     "Soal kerja, ketelitianmu jadi aset besar; selesaikan dengan baik, tapi jangan biarkan obsesi sempurna menahanmu memulai.",
     "Merkurius menajamkan analisismu; sebelum mengkritik diri sendiri, akui dulu hal-hal kecil yang sudah kamu lakukan dengan benar.",
     "Kesempatan membantu mungkin muncul; uluran tangan praktismu sangat berarti, asal kamu tak melupakan batas energimu sendiri.",
     "Kamu mudah cemas pada hal kecil; tarik napas, banyak yang kamu khawatirkan ternyata tak seberat yang dibayangkan."
    ],
    [
     "Hari ini cocok untuk mencari keseimbangan; kamu pandai menengahi, tapi sesekali tegaskan juga apa yang sebenarnya kamu mau.",
     "Sebagai jiwa udara, kamu menghargai harmoni; satu obrolan jujur yang sopan bisa mencairkan ketegangan yang menggantung.",
     "Di tempat kerja, kepekaan estetikamu menonjol; tata segala hal dengan rapi dan adil, kolega akan menghargai sentuhanmu.",
     "Venus membuatmu peka pada keindahan dan relasi; rawat satu hubungan dengan perhatian kecil yang tulus hari ini.",
     "Sebuah pilihan mungkin menanti; kamu tak harus memuaskan semua orang, dengarkan dulu suara hatimu sendiri.",
     "Kebiasaan menunda keputusan bisa melelahkan; pilih satu hal kecil dengan mantap, dan rasa lega akan menyusul."
    ],
    [
     "Fokusmu tajam hari ini; arahkan tekad itu pada satu tujuan, dan kedalamanmu akan menghasilkan sesuatu yang berarti.",
     "Sebagai jiwa air, kamu setia dan intens; tunjukkan kepercayaan pada orang terdekat, ikatan kalian akan terasa makin erat.",
     "Soal kerja, ketekunanmu luar biasa; gali masalah sampai ke akar, tapi beri ruang juga untuk istirahat di sela-sela.",
     "Pluto memberimu naluri yang dalam; firasatmu sering tepat, namun sandingkan dengan keterbukaan agar tak terjebak curiga.",
     "Peluang transformasi mungkin hadir; lepaskan satu hal lama yang membebani, beri ruang untuk versi dirimu yang baru.",
     "Kamu cenderung menyimpan rasa; melepaskan sedikit kendali dan memaafkan akan membuat hatimu jauh lebih lapang."
    ],
    [
     "Semangat petualangmu memuncak; rencanakan satu hal yang membuatmu bersemangat, sekecil apa pun langkah pertamanya.",
     "Sebagai jiwa api, kamu haus makna dan kebebasan; satu pelajaran atau cerita baru bisa menyalakan inspirasimu.",
     "Di urusan kerja, optimismemu menular; sampaikan visi besarmu, tapi tutup dengan satu langkah konkret agar dipercaya.",
     "Jupiter memperluas cakrawalamu; sambut kesempatan baru dengan terbuka, sambil tetap menepati komitmen yang sudah ada.",
     "Sebuah ajakan atau peluang jauh mungkin datang; pertimbangkan baik-baik, dan ingat janji yang sudah kamu buat sebelumnya.",
     "Kejujuranmu menyegarkan, tapi bumbui dengan kelembutan; cara menyampaikan sama pentingnya dengan isi yang kamu sampaikan."
    ],
    [
     "Disiplinmu adalah kekuatan diam-diam; satu langkah kecil yang konsisten hari ini membawamu lebih dekat ke tujuan besar.",
     "Sebagai jiwa bumi, kamu membangun perlahan tapi kokoh; percayai prosesmu, hasil yang matang butuh kesabaran.",
     "Soal kerja, tanggung jawabmu dihormati; pikul tugas penting, tapi izinkan dirimu beristirahat tanpa rasa bersalah.",
     "Saturnus mengajarimu ketekunan; ambisimu sehat, asal kamu sesekali merayakan pencapaian kecil di sepanjang jalan.",
     "Peluang jangka panjang mungkin terbuka; nilai dengan kepala dingin, lalu ambil langkah pertama yang paling masuk akal.",
     "Kamu mudah terlalu serius; sisihkan waktu untuk bersantai, sebab istirahat bukan kemalasan melainkan bagian dari sukses."
    ],
    [
     "Ide orisinalmu mengalir hari ini; bagikan satu di antaranya, sudut pandang unikmu bisa membuka cara berpikir orang lain.",
     "Sebagai jiwa udara, kamu peduli pada hal yang lebih besar; satu langkah kecil untuk komunitas terasa memuaskan hatimu.",
     "Di tempat kerja, inovasimu dihargai; tawarkan solusi segar, tapi jelaskan dengan baik agar tim mudah ikut mewujudkannya.",
     "Uranus mendorongmu berpikir bebas; nikmati keunikanmu, sambil tetap menghangatkan jarak dengan orang-orang terdekat.",
     "Sebuah koneksi baru mungkin muncul; sapa dengan tulus, jaringan yang kamu bangun hari ini berharga untuk nanti.",
     "Kamu kadang terasa berjarak; izinkan satu orang masuk lebih dekat, kehangatan kecil tak akan mengurangi kemandirianmu."
    ],
    [
     "Imajinasimu kaya hari ini; tuangkan ke dalam karya atau catatan kecil, agar inspirasimu tak hanyut begitu saja.",
     "Sebagai jiwa air, kamu berempati dalam; rawat perasaanmu juga, sebab kamu tak bisa menuang dari gelas yang kosong.",
     "Soal kerja, kreativitasmu jadi pembeda; percayai intuisimu, tapi tetapkan satu tenggat agar mimpi berubah jadi hasil nyata.",
     "Neptunus melembutkan dunia di matamu; nikmati keindahannya, sambil sesekali memeriksa kenyataan agar langkahmu tetap mantap.",
     "Sebuah isyarat halus mungkin muncul; percayai firasatmu, lalu pastikan dengan satu fakta sederhana sebelum melangkah.",
     "Kamu mudah menyerap emosi orang lain; beri dirimu ruang tenang sejenak, dan hatimu akan kembali jernih dengan sendirinya."
    ]
   ],
   "moonTraits": [
    "Di dalam hati, kamu ingin bertindak cepat; emosimu menyala spontan, lalu mereda secepat ia datang.",
    "Secara batin, kamu mendamba rasa aman dan kenyamanan; ketenangan membuat perasaanmu kokoh dan stabil.",
    "Perasaanmu butuh diolah lewat kata; kamu merasa lega saat bisa membicarakan apa yang ada di kepala.",
    "Hatimu sangat peka dan penuh kasih; kamu merawat orang lain, dan butuh sarang hangat untuk memulihkan diri.",
    "Di dalam, kamu mendamba kehangatan dan pengakuan; cintamu murah hati, dan hatimu bersinar saat dihargai.",
    "Batinmu mencari keteraturan; kamu merasa tenang saat segala hal tertata rapi dan dapat kamu kendalikan.",
    "Hatimu mendamba keselarasan; kedamaian dan relasi yang adil membuat perasaanmu seimbang dan tenteram.",
    "Perasaanmu dalam dan intens; kamu mencintai sepenuh hati, dan butuh rasa percaya yang sungguh-sungguh.",
    "Jiwamu haus kebebasan dan makna; hatimu paling hidup saat menjelajah hal baru dan cakrawala yang luas.",
    "Di dalam, kamu menjaga emosimu dengan hati-hati; rasa aman datang dari tujuan yang jelas dan pencapaian nyata.",
    "Hatimu berpikir sebelum merasa; kamu butuh ruang dan kebebasan, namun diam-diam mendamba koneksi yang tulus.",
    "Batinmu lembut dan penuh empati; kamu menyerap suasana sekitar, dan butuh waktu tenang untuk menjernihkan rasa."
   ],
   "labels": {
    "bigTwoTitle": "Dua Cahaya Utamamu",
    "sunLabel": "Matahari",
    "moonLabel": "Bulan",
    "overall": "Hari Ini",
    "love": "Cinta",
    "money": "Keuangan",
    "health": "Kesehatan",
    "career": "Karier",
    "social": "Pergaulan",
    "compatTitle": "Kecocokan",
    "bestToday": "Paling Cocok",
    "cautionToday": "Hati-hati",
    "metaTitle": "Cuaca Bintangmu",
    "planetLabel": "Planet",
    "modalityLabel": "Modalitas",
    "polarityLabel": "Polaritas"
   }
  }
 }
};
