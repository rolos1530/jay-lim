/* CRE 학습 앱 · 6장 시험과 모델링 — 내용·활동·문제 */
CRE.reg(6,{"name": "시험과 모델링", "bok": "BOK Ⅳ", "color": "#ff8a1f", "keys": ["아레니우스·역누승·Peck", "직렬·병렬·k/n, 대기 병렬", "몬테카를로·소프트웨어 시험"], "desc": "CRE 시험 여섯째 단원(Reliability testing &amp; modeling)을 8번의 짧은 활동으로 익혀요. 빨리 시험하고, 시스템을 계산하고, 미래를 예측하는 법을 배워요."},function(){

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem("cre6-"+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem("cre6-"+k,JSON.stringify(v))}catch(e){}}};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const pct=(v,d=1)=>(v*100).toFixed(d)+"%";
/* ───── 수학 도우미 ───── */
const f2=v=>(+v).toFixed(2),f3=v=>(+v).toFixed(3),f4=v=>(+v).toFixed(4),fmt=n=>Math.round(n).toLocaleString("ko-KR");
function rng(seed){let s=seed%2147483647||1;return()=>(s=s*16807%2147483647)/2147483647}
const KB=8.617e-5,AFa=(Ea,Tu,Ts)=>Math.exp(Ea/KB*(1/(Tu+273.15)-1/(Ts+273.15)));
const lf=n=>{let s=0;for(let i=2;i<=n;i++)s+=Math.log(i);return s};
const kofn=(k,n,R)=>{let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lf(n)-lf(i)-lf(n-i))*R**i*(1-R)**(n-i);return s};

/* ───── 차시 데이터 ───── */
const L=[
 {id:"l1",t:"가속 수명 시험의 원리",easy:"세게 시험하되, 같은 이유로 고장 나게",
  pts:[["왜 가속?","고품질 제품은 정상 조건에서 고장이 너무 안 나요. 온도·전압·습도·진동을 올려 짧게 시험하고 정상 수명을 추정해요."],
       ["꼭 필요한 가정","응력 수준과 수명 분포의 관계가 알려져 있고 유효할 것. 그리고 가속해도 고장 모드·메커니즘이 정상과 같을 것(가속성)."],
       ["고장 모드가 바뀌면?","가속 시험이 정상 시험과 유효한 상관관계를 갖지 않는다는 뜻이라 결과를 쓸 수 없어요."],
       ["좋은 계획","적절한 시험 모델(물리 모델) 선정, 낮은 스트레스 쪽에 시료를 더 많이, 그래픽 분석으로 정상 조건까지 외삽."],
       ["ALT의 이점","수명 예측과 함께 설계·제조상의 결함도 찾을 수 있어요. 응력을 올리면 평균 마모 수명은 줄어요."]],
  tip:"ALT는 주로 부품 수준에서 해요. 완제품 조립체는 높은 응력에서 다른 고장 모드가 섞이기 쉬워요.",
  act:"alt",
  q:[["가속 수명 시험을 하기 위해 반드시 해야 하는 가정은?",["시험이 정상 응력 근처에서 진행된다","응력 수준과 수명 분포 사이의 관계가 알려져 있고 유효하다","시료가 100개 이상이다","고장이 하나도 없어야 한다"],1,"필출이에요. 관계를 알아야 정상 조건으로 환산할 수 있어요."],
     ["가속 시험에서 정상 조건과 다른 고장 모드가 나왔다. 의미는?",["가속 계수가 아주 크다","가속 시험이 정상 시험과 유효한 상관관계를 갖지 않는다","시험이 성공했다","시료가 부족하다"],1,"고장 모드·메커니즘이 같아야 수명을 예측할 수 있어요."]]},
 {id:"l2",t:"아레니우스 모델",easy:"온도 가속의 대표 공식",
  pts:[["공식","AF = exp[ (Ea / k) × (1/Tu − 1/Ts) ]. Tu 사용 온도, Ts 시험 온도, k = 8.617 × 10⁻⁵ eV/K."],
       ["온도는 켈빈!","T(K) = ℃ + 273.15. 섭씨를 그대로 넣으면 틀려요."],
       ["활성화 에너지 Ea","고장 메커니즘마다 달라요(경험 인자). Ea가 클수록 온도에 민감해서 가속이 커요. 같은 시험 결과라면 Ea가 큰 쪽이 상온에서 더 오래 살아요."],
       ["목적","가속 시험 데이터로 동작 온도에서의 고장률(수명)을 예측하는 것. 계산 목표는 가속 계수."],
       ["Ea가 온도에 따라 바뀌면","여러 고장 메커니즘이 섞여 있다는 신호예요."]],
  tip:"사용 수명 = 시험 수명 × AF, 사용 고장률 = 시험 고장률 ÷ AF.",
  act:"arr",
  q:[["전자 시스템 고온 시험에서 아레니우스 모델로 계산하려는 것은?",["설계 계수","안전 계수","가속 계수","계승 계수"],2,"고온 수명을 정상 온도 수명으로 바꾸는 가속 계수예요."],
     ["아레니우스 식에 온도를 넣을 때 써야 하는 단위는?",["섭씨(℃)","화씨(℉)","켈빈(K)","상관없다"],2,"절대 온도 켈빈(℃ + 273.15)을 써요."]]},
 {id:"l3",t:"여러 가속 모델과 메커니즘",easy:"스트레스마다 맞는 공식이 있어요",
  pts:[["역누승 법칙","전압·하중 같은 비열(非熱) 스트레스: 수명 L = C / Vⁿ, AF = (Vs/Vu)ⁿ."],
       ["Peck · 아이링","Peck: 온도 + 습도. 아이링: 온도 + 다른 스트레스를 함께."],
       ["코핀-맨슨 · 블랙","코핀-맨슨: 온도 사이클 피로. 블랙: 전류 밀도에 의한 일렉트로마이그레이션."],
       ["마이너 법칙","여러 크기의 반복 하중이 섞일 때 피로 손상을 더해(누적 손상) 수명을 계산해요. 강철처럼 내구 한계가 있으면 그 아래 응력에서는 사이클 수와 관계없이 고장 나지 않아요."],
       ["크리프","고온에서 지속 하중으로 서서히 변형. 기계적 하중과 고온 유지·온도 사이클을 평가해요."]],
  tip:"환경 스트레스 팩터가 K1 → K2로 바뀌면 새 고장률 = (K2/K1) × λ. 가속 계수의 개념과 같아요.",
  act:"models",
  q:[["비열(non-thermal) 가속 스트레스 시험 데이터를 분석하는 모델은?",["아레니우스","역누승 법칙","마이너 법칙","듀안 모델"],1,"전압·하중 같은 비열 스트레스는 역누승(inverse power law)."],
     ["시간에 따라 다양한 기계적 하중을 받는 부품의 피로 수명을 계산하는 모델은?",["듀안 모델","역누승 모델","마이너 모델","아이링 모델"],2,"누적 손상 법칙이에요. (가속 시험 모델과 헷갈리지 않기)"]]},
 {id:"l4",t:"여러 가지 시험 방법",easy:"단계로 올리고, 하나 죽으면 끝내고, 나빠지는 걸 재고",
  pts:[["스텝 스트레스","고정된 스트레스를 단계적으로 올리며 누적 효과로 평가. 부하-수명 관계를 정량화할 수 있어요. 고장이 실제 사용 때문인지 보려면 고장 메커니즘을 확인해요."],
       ["서든 데스","시료를 그룹으로 나눠 각 그룹의 첫 고장에서 그 그룹을 끝내요. 첫 고장 시간을 그려 분포를 추정. 시료가 싸고 많을 때."],
       ["열화 시험","고장 전에 성능이 나빠지는 정도를 재요. 그 추세로 고장 시간을 예측할 수 있어 고장이 드문 제품에 좋아요."],
       ["HALT · HASS","HALT: 개발 단계에서 망가질 때까지(설계 약점). HASS: 생산품 결함 걸러내기."],
       ["무고장·순차 시험","5장에서 배운 입증 시험이에요."]],
  tip:"‘시료를 그룹으로 나누고 각 그룹 첫 고장에서 종료’ → 서든 데스. 단골 기출!",
  act:"degr",
  q:[["열화 시험의 특징은?",["고장이 나야만 데이터가 생긴다","데이터를 고장 시간 예측에 사용할 수 있다","시료가 필요 없다","항상 파괴 시험이다"],1,"성능 저하 추세를 연장해 고장 시간을 예측해요."],
     ["시료를 같은 크기의 그룹으로 나누고 각 그룹에서 첫 고장이 나면 그 그룹 시험을 끝낸다. 어떤 시험인가요?",["스텝 스트레스","서든 데스","번인","순차 시험"],1,"‘하나 죽으면 끝’이라 서든 데스."]]},
 {id:"l5",t:"시스템 신뢰도: 직렬·병렬·k/n",easy:"블록을 어떻게 잇느냐가 신뢰도를 정해요",
  pts:[["직렬","하나라도 고장 나면 시스템 고장. R = R₁ × R₂ × … , 고장률은 더해요. 부품 수가 적을수록 좋아요."],
       ["능동 병렬","하나만 살아도 OK. R = 1 − (1−R₁)(1−R₂)…"],
       ["k-out-of-n","n개 중 k개 이상 작동해야 함. 이항분포로 계산: R = Σ(i=k..n) nCi Rⁱ(1−R)ⁿ⁻ⁱ."],
       ["지수분포 병렬 공식","λ₁·λ₂ 병렬: e^(−λ₁t) + e^(−λ₂t) − e^(−(λ₁+λ₂)t). 동일 3개 능동 병렬(1/3): 3e^(−λt) − 3e^(−2λt) + e^(−3λt)."],
       ["어디를 개선?","직렬: 개선 폭이 가장 큰(보통 가장 약한) 부품. 병렬: 이미 좋은 부품을 더 좋게 하는 게 효과적이에요."]],
  tip:"직렬-병렬 혼합은 안쪽 병렬 묶음부터 하나의 블록으로 계산한 뒤 직렬로 곱해요.",
  act:"sys",
  q:[["신뢰도 0.9, 0.8, 0.85인 부품 3개가 직렬일 때 옳은 것은?",["하나라도 고장 나면 제품이 고장 난다","가장 좋은 부품의 신뢰도가 시스템 신뢰도다","신뢰도를 더해서 구한다","하나만 살아 있으면 된다"],0,"직렬은 모두 살아야 해요. 개선하려면 가장 낮은 0.8부터!"],
     ["부품 1(0.95) 뒤에 부품 2와 3(각 0.95)이 병렬로 연결되어 있다. 시스템 신뢰도는 약?",["0.857","0.903","0.948","0.998"],2,"0.95 × [1 − (0.05)²] = 0.95 × 0.9975 ≈ 0.948."]]},
 {id:"l6",t:"대기 · 부하 분담 리던던시",easy:"예비 선수는 벤치에서 기다려요",
  pts:[["대기(Standby) 병렬","주 장치가 고장 나면 예비가 켜져요. 완벽한 스위치·동일 λ: R = e^(−λt)(1 + λt). 보조 발전기가 대표적."],
       ["스위치가 완벽하지 않으면","R = e^(−λt)(1 + R_sw·λt)."],
       ["다른 고장률의 대기","R = [λ₂e^(−λ₁t) − λ₁e^(−λ₂t)] / (λ₂ − λ₁)."],
       ["성공 조건","고장이 즉시 감지되고 전환되어야 해요. 대기 중에는 고장이 없다고 가정해요."],
       ["부하 분담","둘이 나눠 지다가 하나가 고장 나면 남은 하나의 고장률이 커져요. 예비품 수는 포아송 누적 확률로 구해요."]],
  tip:"같은 부품 2개라면 보통 대기 병렬(완벽 스위치) > 능동 병렬 > 단독 순서로 신뢰도가 높아요.",
  act:"standby",
  q:[["대기 중복(standby) 시스템이 성공하려면 반드시 만족해야 하는 조건은?",["두 장치가 늘 동시에 동작한다","고장이 발생하면 즉시 감지되어야 한다","스위치가 없어야 한다","고장률이 증가해야 한다"],1,"감지·전환이 핵심이에요."],
     ["동일한 고장률 λ, 완벽한 스위치를 가진 2중 대기 병렬 시스템의 신뢰도는?",["e^(−λt)","2e^(−λt) − e^(−2λt)","e^(−λt)(1 + λt)","1 − (1 − e^(−λt))²"],2,"대기 병렬 공식이에요. 2e^(−λt) − e^(−2λt)는 능동 병렬."]]},
 {id:"l7",t:"시뮬레이션과 마코프",easy:"주사위를 수만 번 던져 미래 맛보기",
  pts:[["몬테카를로","확률 분포에서 난수를 뽑아 운영을 수없이 흉내 내요. 무작위 변동이 핵심일 때 써요. 시스템 신뢰도 예측 가능."],
       ["계산이 오래 걸리는 이유","뽑아야 하는 사건(시행)의 수가 많기 때문이에요."],
       ["입력 데이터","고장·수리 분포, 그리고 현장 지원 데이터에서 얻는 실제 운영 규칙."],
       ["마코프 분석","작동↔고장↔수리 같은 상태 사이를 옮겨 가는 확률(상태 공간)로 신뢰성·가용성을 평가해요."],
       ["FEA (유한 요소 해석)","복합 하중에서의 응력을 컴퓨터로 계산. 시제품을 덜 만들어 시간과 비용을 절약해요."]],
  tip:"난수 생성 자체(‘동질 집단에서 무작위 추출 보장’)는 몬테카를로의 정의가 아니에요. 자주 고르는 오답!",
  act:"mc",
  q:[["시스템의 신뢰도를 예측할 수 있는 시뮬레이션 방법은?",["파레토 분석","몬테카를로 기법","간트 차트","QFD"],1,"난수로 수많은 운영을 흉내 내 확률을 추정해요."],
     ["신뢰성과 가용성을 평가하기 위해 상태 공간 분석을 쓰는 방법은?",["FMEA","마코프 분석","회귀 분석","파레토"],1,"상태 전이 확률(행렬)을 다뤄요."]]},
 {id:"l8",t:"소프트웨어 시험",easy:"속을 보는 시험, 겉만 보는 시험",
  pts:[["화이트박스","코드 구조를 보고 모든 독립 경로·분기를 지나가게 시험. 구조로 시험 품질을 측정해요."],
       ["블랙박스","속은 안 보고 입력과 출력(기능)만. 사용 사례 시험이에요."],
       ["회귀 시험","코드를 고치거나 추가한 뒤 예전 기능을 다시 시험해요."],
       ["결함 삽입","일부러 오류를 넣어 프로그램이 제대로 처리하는지 시험해요."],
       ["운용 프로파일","소프트웨어가 실제로 어떻게 쓰이는지(정의된 사용)와 그 빈도대로 시험해요. 내결함성 설계에서 중복 프로그램은 출력이 기준을 못 맞출 때 활성화돼요."]],
  tip:"제품 성능 시험에는 펌웨어·소프트웨어와 함께 최종 시제품 하드웨어도 들어가야 해요.",
  act:"sw",
  q:[["소프트웨어 블랙박스 시험은 어떤 유형인가요?",["단위 경로 시험","사용 사례 시험","제어 흐름 통합 시험","코드 계측 시험"],1,"속을 보지 않고 기능(사용 사례)만 시험해요."],
     ["코드가 변경된 후 실행해야 할 소프트웨어 시험은?",["베타 시험","회귀 시험","스모크 시험","부하 시험"],1,"고친 곳 때문에 예전 기능이 깨지지 않았는지 다시 확인해요."]]}
];
const EXTRA=[
 ["l8", "소프트웨어 시험에 대한 설명으로 사실인 것은?", ["한 번 통과하면 다시 시험할 필요가 없다", "코드가 추가로 작성되면 시험을 반복해야 한다(회귀)", "블랙박스 시험은 코드 구조를 본다", "화이트박스 시험은 사용자만 한다"], 1, "코드가 바뀌면 회귀 시험으로 다시 확인해요."],
 ["l4", "시료를 하위 그룹으로 나누고 각 그룹의 첫 고장 후 그 그룹 시험을 끝낸다. 첫 고장 시간을 그려 분포 모수를 추정한다. 어떤 시험인가요?", ["서든 데스 시험", "가속 수명", "스텝 스트레스", "번인"], 0, "시료가 싸고 많을 때 쓰는 서든 데스예요."],
 ["l5", "비틀림 스프링이 하루 6.6회 작동하고, 수명은 평균 7,368회·표준편차 100회 정규분포다. 1년 365일 작동할 때 3년 후 신뢰도는 약?", ["0.0793", "0.5000", "0.9800", "0.9207"], 3, "3년 = 365 × 3 × 6.6 = 7,227회 → Z = (7,227 − 7,368)/100 = −1.41 → R = 1 − 0.0793 = 0.9207."],
 ["l2", "전자 시스템 고온 검증에서 아레니우스 모델을 쓰는 이유는 무엇을 계산하기 위함인가요?", ["설계 계수", "안전 계수", "가속 계수", "신뢰 계수"], 2, "고온 시험 수명을 정상 수명으로 바꾸는 계수예요."],
 ["l7", "몬테카를로 시뮬레이션에서 계산 시간이 오래 걸리는 주원인은?", ["분포의 종류", "추출해야 하는 사건(시행)의 수", "컴퓨터 색상", "변수 이름"], 1, "정확도를 높이려면 시행을 많이 해야 해요."],
 ["l8", "소프트웨어 자체의 구조를 이용해 시험의 품질을 측정하는 시험은?", ["화이트박스", "블랙박스", "베타", "사용자 수용"], 0, "구조(코드 경로)를 보는 화이트박스예요."],
 ["l4", "열화 시험의 특징은?", ["고장이 나야만 분석할 수 있다", "시료가 필요 없다", "항상 비용이 더 든다", "데이터를 고장 시간 예측에 사용할 수 있다"], 3, "성능 저하 추세로 고장 시간을 예측해요."],
 ["l7", "여러 재료 특성이 섞인 복합 하중의 영향을 분석하려고 유한 요소 해석(FEA)을 하는 이유는?", ["정확도가 항상 100%라서", "시험이 필요 없어서", "FEA 모델링이 시간과 비용을 절약해서", "규격에 정해져 있어서"], 2, "최근 강조되는 내용이에요. 시제품을 덜 만들 수 있어요."],
 ["l7", "현장 지원 데이터는 몬테카를로 시뮬레이션 입력 중 어떤 값을 제공하나요?", ["고장 및 수리율만", "실제 운영 규칙", "난수 생성기", "시뮬레이션 시간"], 1, "현장에서 실제로 어떻게 운영하는지(운영 규칙)를 알려 줘요. (고장 및 수리율은 자주 고르는 오답)"],
 ["l8", "비디오 게임기의 신뢰도 성능 시험에는 펌웨어, 소프트웨어, 그리고 어떤 최종 시제품 버전이 포함되어야 하나요?", ["하드웨어", "포장", "광고", "설명서"], 0, "시스템 전체(하드웨어 포함)를 시험해야 해요."],
 ["l1", "효과적인 가속 수명 시험을 위해 필요한 단계는?", ["시료 수를 최소로 줄인다", "고장 모드는 무시한다", "정상 조건에서만 시험한다", "적절한 환경적 시험 모델(물리 모델)을 선정한다"], 3, "모델을 정해야 정상 조건으로 외삽할 수 있어요. 낮은 스트레스 쪽에 시료를 많이 넣는 것도 좋아요."],
 ["l8", "소프트웨어 운용 프로파일 기반 시험에서 소프트웨어 기능·동작을 가장 잘 설명한 것은?", ["화이트박스 시험 케이스", "코드 줄 수", "소프트웨어의 정의된 사용", "컴파일 시간"], 2, "실제로 어떻게 쓰이는지(정의된 사용)를 기준으로 해요. (화이트박스 케이스는 오답)"],
 ["l5", "고장률이 각각 λ와 2λ로 일정한 두 독립 부품이 병렬이다. 시스템 신뢰도는?", ["e^(−3λt)", "e^(−λt) + e^(−2λt) − e^(−3λt)", "e^(−λt) × e^(−2λt)", "1 − e^(−3λt)"], 1, "R = R₁ + R₂ − R₁R₂ = e^(−λt) + e^(−2λt) − e^(−3λt)."],
 ["l7", "시스템의 신뢰도를 예측할 수 있는 시뮬레이션 방법은?", ["몬테카를로 기법", "파레토 기법", "간트 기법", "델파이 기법"], 0, "난수로 운영을 흉내 내요."],
 ["l8", "코드가 변경된 후 실행해야 할 소프트웨어 시험은?", ["단위 시험만", "부하 시험", "수락 시험만", "회귀 시험"], 3, "예전 기능이 깨지지 않았는지 확인해요."],
 ["l3", "크리프의 결과로 부품이 고장 났을 때 평가해야 할 요인은?", ["색상", "소음", "기계적 하중", "무게"], 2, "크리프는 고온에서 지속 하중으로 생겨요."],
 ["l5", "부품 w, x, y, z의 현재/재설계 신뢰도가 0.95/0.98, 0.85/0.89, 0.75/0.85, 0.65/0.71이다. 4개가 직렬일 때 하나만 재설계한다면?", ["w", "y", "x", "z"], 1, "직렬은 개선 비율이 가장 큰 것: y(0.75 → 0.85, 약 13% 증가)."],
 ["l5", "같은 부품 w, x, y, z(현재 0.95, 0.85, 0.75, 0.65 / 재설계 0.98, 0.89, 0.85, 0.71)가 병렬일 때 하나만 재설계한다면?", ["w", "x", "y", "z"], 0, "병렬은 불신뢰도 곱이라 이미 좋은 w(0.05 → 0.02, 60% 감소)를 더 좋게 하는 게 효과적."],
 ["l3", "비열(non-thermal) 가속 스트레스 시험 데이터 분석에 쓰는 모델은?", ["아레니우스", "마이너", "Peck", "역누승(역지수) 법칙"], 3, "전압·하중은 역누승 법칙."],
 ["l3", "크리프를 유발하는 노출 조건은?", ["저온 보관", "습도만", "고온 유지 및 온도 사이클링", "정전기"], 2, "크리프는 습도보다 온도 영향이 주예요."],
 ["l6", "스위치(신뢰도 0.99)가 있는 대기 병렬 부품 2개, 각 고장률 0.0001/시간. 1,000시간에서 시스템 신뢰도는?", ["0.9048", "0.9944", "0.9900", "0.9512"], 1, "e^(−0.1)(1 + 0.99 × 0.1) = 0.9048 × 1.099 ≈ 0.9944."],
 ["l3", "운용 스트레스 팩터 K1 환경에서 고장률 λ인 부품을 K2 환경에서 쓰면 새 고장률은?", ["(K2/K1)λ", "(K1/K2)λ", "λ + K2", "λ"], 0, "스트레스 비율만큼 고장률이 바뀌어요(가속 계수 개념)."],
 ["l1", "수명 시험에서 어떤 시료가 보류(중단) 항목으로 처리되는 경우는?", ["예상한 고장 모드로 고장 났을 때", "측정값이 좋을 때", "시험 첫날", "분석 대상과 다른 고장 모드로 고장 나 제외될 때"], 3, "같은 고장 모드만 같은 가속성을 가지므로 다른 모드는 중단으로 처리해요."],
 ["l2", "아레니우스 모델에 대한 설명으로 옳은 것은?", ["습도 가속에만 쓴다", "온도는 섭씨로 넣는다", "가속 시험 데이터로 동작 온도에서의 고장률을 예측하는 데 목적이 있다", "활성화 에너지는 항상 1이다"], 2, "가속 시험 → 동작 온도 환산이 목적이에요."],
 ["l5", "직렬 X1–X2–X3에서 X1 = 610 × 10⁻⁶, X2 = 640 × 10⁻⁶/시간이고 5시간 운용 시 시스템 신뢰도가 0.99 이상이어야 한다. X3의 최대 고장률은?", ["610 × 10⁻⁶", "760 × 10⁻⁶", "640 × 10⁻⁶", "2,010 × 10⁻⁶"], 1, "λ합 ≤ −ln(0.99)/5 ≈ 2,010 × 10⁻⁶ → X3 ≤ 2,010 − 1,250 = 760 × 10⁻⁶."],
 ["l7", "신뢰성과 가용성을 평가하기 위해 변수의 상태 공간 분석을 쓰는 방법은?", ["마코프 분석", "FTA", "고장 형태 분석", "몬테카를로"], 0, "상태 전이 행렬을 다뤄요."],
 ["l2", "두 로트를 125℃에서 1,000시간 시험했더니 고장 수가 같았다. 로트 X는 Ea 1.0 eV, Y는 0.5 eV이다. 25℃에서 예상되는 결과는?", ["두 로트의 수명이 같다", "판단할 수 없다", "로트 Y의 예상 수명이 X보다 길다", "로트 X의 예상 수명이 Y보다 길다"], 3, "중요 기출이에요. Ea가 클수록 가속 계수가 커서, 같은 시험 결과면 상온 수명이 더 길어요."],
 ["l6", "부품 고장률 0.001/시간, 하루 20시간 동작, 고장 나면 즉시 교체한다. 30일 동안 신뢰도 0.95를 달성하려면 최소 몇 개의 예비품이 필요한가요?", ["1개", "3개", "2개", "4개"], 2, "λt = 0.001 × 600 = 0.6. 포아송 누적: 예비 1개 0.878, 2개 0.977 → 2개."],
 ["l6", "완벽하게 전환되는 대기 병렬, 동일 고장률 0.007/시간인 부품 2개. 50시간에서 신뢰도는 약?", ["0.705", "0.951", "0.877", "0.995"], 1, "e^(−0.35)(1 + 0.35) = 0.7047 × 1.35 ≈ 0.951."],
 ["l5", "세 개의 동일한 서브시스템이 능동 병렬이고 최소 1개만 작동하면 된다(일정 고장률 λ). 시스템 신뢰도는?", ["3e^(−λt) − 3e^(−2λt) + e^(−3λt)", "e^(−3λt)", "3e^(−λt)", "1 − e^(−3λt)"], 0, "1 − (1 − e^(−λt))³ 을 전개한 식이에요."],
 ["l6", "부하를 나누는 병렬 2부품: 둘 다 작동할 때 각 고장률 0.0001/시간, 하나가 고장 나면 남은 부품 고장률 0.0003/시간. 1,000시간 신뢰도는 약?", ["0.8187", "0.9048", "0.9950", "0.9746"], 3, "R = e^(−0.2) + [0.0002/(0.0002 − 0.0003)](e^(−0.3) − e^(−0.2)) = 0.8187 + 0.1558 ≈ 0.9746."],
 ["l2", "200℃ 가속 시험에서 평균 고장 시간이 4,000시간이었다. Ea = 0.191 eV일 때 50℃에서 예상 수명은 약?", ["4,000시간", "8,812시간", "35,249시간", "352,490시간"], 2, "AF = exp[0.191/8.617×10⁻⁵ × (1/323.15 − 1/473.15)] ≈ 8.81 → 4,000 × 8.81 ≈ 35,249시간."],
 ["l2", "아레니우스 모델에서 온도에 따라 활성화 에너지가 바뀌는 것을 발견했다. 결론은?", ["측정 오류다", "부품에 여러 고장 메커니즘이 섞여 있다", "Ea는 원래 바뀐다", "가속 계수가 1이다"], 1, "Ea는 메커니즘마다 고유하므로 바뀌면 혼합 메커니즘이에요."],
 ["l4", "23개 부품을 5주 동안 매주 스트레스 25%씩 올려 시험했다. 고장이 실제 사용 때문인지 높은 스트레스 때문인지 판단하려면 무엇을 확인해야 하나요?", ["고장 메커니즘", "시료 색상", "시험 요일", "작업자 이름"], 0, "정상 조건과 같은 메커니즘인지 봐야 해요."],
 ["l4", "위 스텝 스트레스 시험(주차별 고장률 0, 0, 4.3%, 13.6%, 42.1%)에서 도출할 수 있는 결론은?", ["부하와 수명은 관계가 없다", "모든 시료가 불량이다", "시험이 무효다", "부하-수명 관계를 정량화할 수 있다"], 3, "스텝 스트레스 평가의 전형적인 문제예요."],
 ["l3", "온·습도 조건으로 전자 부품 가속 수명 시험을 할 때 쓰기 좋은 모델은?", ["마이너 모델", "듀안 모델", "Peck 모델", "블랙 모델"], 2, "온도 + 습도 = Peck(또는 결합 모델)."],
 ["l3", "강철 합금처럼 내구 한계가 있는 재료의 수명 특성으로 맞는 것은?", ["모든 응력에서 결국 고장 난다", "내구 한계보다 낮은 응력에서는 사이클 수와 관계없이 고장 나지 않는다", "내구 한계는 온도 한계다", "응력이 낮을수록 빨리 고장 난다"], 1, "S-N 곡선의 수평 부분이에요."],
 ["l8", "소프트웨어 프로그램에 오류를 일부러 넣어 시험하는 설계 방법은?", ["결함 삽입 및 오류 처리 시험", "회귀 시험", "베타 시험", "스모크 시험"], 0, "빈출이에요."],
 ["l6", "예비 발전기(고장률 0.001/시간)가 있고 전력 서비스 고장률은 0.00023/시간이다. 완벽한 전환을 가정할 때 연간(8,760시간) 전력 공급 신뢰도는 약?", ["0.133", "0.998", "0.866", "0.173"], 3, "대기 병렬, 다른 고장률: [λ₂e^(−λ₁t) − λ₁e^(−λ₂t)] / (λ₂ − λ₁) ≈ 0.173. 대기 병렬은 꼭 나와요."],
 ["l8", "모듈의 모든 독립 경로를 시험하도록 설계하는 방법은?", ["블랙박스", "베타", "화이트박스", "사용성"], 2, "구조를 다 보는 화이트박스."],
 ["l3", "시간에 따라 다양한 기계적 하중을 받는 부품의 수명 계산에 흔히 쓰는 이론 모델은?", ["듀안 모델", "마이너 모델", "역누승 모델", "아이링 모델"], 1, "최근 자주 나와요. 피로 누적 손상 모델."],
 ["l1", "부품에 가해지는 응력 수준을 높이면?", ["평균 마모 수명이 줄어든다", "평균 마모 수명이 늘어난다", "아무 변화가 없다", "고장 모드가 반드시 사라진다"], 0, "부하-강도 관계에서 응력이 커지면 수명이 짧아져요."],
 ["l1", "가속 수명 시험(ALT)을 하는 이점으로 적절한 것은?", ["시료가 필요 없다", "고장 분석이 필요 없다", "항상 정확한 수명을 준다", "설계 및 제조상의 결함을 식별할 수 있다"], 3, "출제 확률이 높아요. 수명 예측과 함께 결함도 찾아요."],
 ["l6", "정속으로 돌며 전력은 만들지 않고 예비 역할만 하는 보조 터빈 발전기. 이런 중복 구조는?", ["능동 병렬", "직렬", "대기 병렬", "k-out-of-n"], 2, "평소엔 쉬다가 필요할 때 넘겨받는 대기 병렬이에요."],
 ["l1", "가속 수명 시험에서 그래픽 분석의 장점은?", ["시험이 필요 없다", "정상 조건에서의 예상 수명으로 외삽할 수 있다", "모든 고장 모드를 없앤다", "완제품에만 쓸 수 있다"], 1, "적절한 통계 모델로 정상 조건까지 외삽해요."],
 ["l7", "몬테카를로 시뮬레이션은 무엇을 하는 기법인가요?", ["무작위 변동이 핵심인 경우 운영을 시뮬레이션", "동질 집단에서 무작위 표본 추출을 보장", "공정 능력 계산", "고장 원인 분류"], 0, "‘무작위 추출 보장’은 난수 생성에 대한 설명이라 오답이에요."],
 ["l2", "아레니우스 가속 계수는 어떤 것에 종속적인 경험 인자에 따라 달라지나요?", ["작업자", "시험 장비 브랜드", "시료 색상", "고장 메커니즘"], 3, "활성화 에너지는 고장 메커니즘에 따라 정해지는 경험 인자예요."],
 ["l8", "고장 허용(내결함) 시스템에서 중복 소프트웨어 프로그램이 활성화되는 조건은?", ["항상 동시에", "사용자가 원할 때만", "프로그램 출력이 미리 정한 기준을 충족하지 않을 때", "전원이 켜질 때"], 2, "주 프로그램의 출력이 기준을 못 맞추면 중복 프로그램이 넘겨받아요."]
];
const POOL=[...L.flatMap(l=>l.q.map((q,i)=>({k:l.id+"-"+i,c:l.id,q:q[0],o:q[1],a:q[2],w:q[3]}))),...EXTRA.map((q,i)=>({k:"x"+i,c:q[0],q:q[1],o:q[2],a:q[3],w:q[4]}))];
const lname=id=>L.find(l=>l.id===id).t;

/* ───── 홈: 오븐 온도계 ───── */
let hEa=0.7;
function homeDraw(){const T=+$("#c6hT").value,af=AFa(hEa,25,T),h=1000*af,y=h/8760;
 $("#c6hTv").textContent=T+"℃";$("#c6hAF").textContent="AF ≈ "+(af<10?af.toFixed(1):fmt(af));
 $("#c6hSay").innerHTML=`시험 <b>1,000시간</b>(약 6주) = 현장 <b>${fmt(h)}시간</b>, 약 <b>${y<1?y.toFixed(2):y.toFixed(1)}년</b>`;
 const full=Math.min(40,Math.floor(y)),part=y<40&&y%1>.05;$("#c6hY").innerHTML=Array.from({length:full},()=>"<i></i>").join("")+(part?'<i class="p"></i>':"");
 const s=$("#c6hS"),W=s.clientWidth,H=s.clientHeight;if(!W)return;const r=Math.min(46,W/5),cx=W/2,top=24,bot=H-r*1.45-8,tw=r*.55,ink=css('--ink'),tom=css('--tom'),soft=css('--soft');
 const Y=t=>bot-r*.6-(t-20)/135*(bot-r*.6-top-10),lv=Y(T);
 s.innerHTML=`<rect x="${cx-tw/2}" y="${top}" width="${tw}" height="${bot-top}" rx="${tw/2}" fill="${css('--paper')}" stroke="${ink}" stroke-width="4"/>`+
  `<rect x="${cx-tw/2+6}" y="${lv}" width="${tw-12}" height="${bot-lv}" rx="${(tw-12)/2}" fill="${tom}"/>`+
  `<circle cx="${cx}" cy="${bot+r*.4}" r="${r}" fill="${tom}" stroke="${ink}" stroke-width="4"/>`+
  [25,50,75,100,125,150].map(t=>`<line x1="${cx+tw/2+4}" x2="${cx+tw/2+16}" y1="${Y(t)}" y2="${Y(t)}" stroke="${ink}" stroke-width="2"/><text x="${cx+tw/2+22}" y="${Y(t)+5}" font-size="14" fill="${soft}">${t}℃</text>`).join("")+
  `<text x="${cx-tw/2-10}" y="${lv+5}" text-anchor="end" font-family="Jua" font-size="20" fill="${tom}">${T}℃</text>`;}
$("#c6hT").addEventListener("input",homeDraw);
$("#c6hE").addEventListener("click",e=>{const b=e.target.closest("[data-e]");if(!b)return;hEa=+b.dataset.e;$$("#c6hE .chip").forEach(x=>x.classList.toggle("on",x===b));homeDraw()});
const homeRO=new ResizeObserver(homeDraw);homeRO.observe($("#c6hFig"));
let ro=null;
const ACT={
 alt(el){el.innerHTML=`<h3>활동: 이 가속 시험 계획, 괜찮을까?</h3><p>각 계획이 좋은지, 문제가 있는지 골라 보세요.</p><div class="sort" id="al"></div>`;
  sorter($("#al"),[["가속 조건에서도 정상 조건과 같은 고장 메커니즘이 나온다","좋은 계획"],["온도를 너무 올려 플라스틱 케이스가 녹아 버렸다","문제 있음"],["응력-수명 관계(물리 모델)를 먼저 정하고 시작한다","좋은 계획"],["가장 낮은 스트레스 수준에 시료를 더 많이 배정한다","좋은 계획"],["완제품 전체에 모든 스트레스를 최대로 걸고 수명을 외삽한다","문제 있음"],["높은 스트레스 한 수준에서만 시험하고 모델 없이 정상 수명을 말한다","문제 있음"]],["좋은 계획","문제 있음"]);},
 arr(el){el.innerHTML=`<h3>활동: 아레니우스 가속 계수 계산기</h3>
  <div class="chips"><button class="chip" data-pr="0.191,50,200,4000">기출: 200℃에서 4,000시간, Ea 0.191 → 50℃ 수명</button><button class="chip" data-pr="0.7,40,125,1000">예시: 125℃ 1,000시간 → 40℃</button></div>
  <div class="two"><div>
   <div class="row"><label for="aE">활성화 에너지 Ea</label><input id="aE" type="number" step="0.01" min="0.05" value="0.191"><span class="note">eV</span></div>
   <div class="row"><label for="aU">사용 온도</label><input id="aU" type="number" value="50"><span class="note">℃</span></div>
   <div class="row"><label for="aS">시험 온도</label><input id="aS" type="number" value="200"><span class="note">℃</span></div>
   <div class="row"><label for="aL">시험 수명</label><input id="aL" type="number" min="0" value="4000"><span class="note">시간</span></div></div>
  <div><div class="big" id="aB"></div><p id="aF"></p><div class="stats" id="aC"></div></div></div>`;
  const draw=()=>{const E=Math.max(.01,+$("#aE").value||.01),Tu=+$("#aU").value,Ts=+$("#aS").value,Lt=Math.max(0,+$("#aL").value||0),af=AFa(E,Tu,Ts);
   $("#aB").textContent=fmt(Lt*af)+"시간";
   $("#aF").innerHTML=`AF = exp[ ${E} / 8.617×10⁻⁵ × (1/${(Tu+273.15).toFixed(2)} − 1/${(Ts+273.15).toFixed(2)}) ] = <b>${af<100?af.toFixed(3):fmt(af)}</b><br>사용 수명 = ${fmt(Lt)} × ${af<100?af.toFixed(3):fmt(af)}`;
   $("#aC").innerHTML=[0.5,1.0].map(e=>[AFa(e,Tu,Ts),`Ea ${e.toFixed(1)} eV일 때 AF`]).map(([v,t])=>`<div class="stat"><b>${v<100?v.toFixed(1):fmt(v)}</b><span>${t}</span></div>`).join("")};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{const [E,u,s2,l]=b.dataset.pr.split(",");$("#aE").value=E;$("#aU").value=u;$("#aS").value=s2;$("#aL").value=l;el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 models(el){el.innerHTML=`<h3>활동 1: 스트레스와 모델 짝짓기</h3><div class="sort" id="mo"></div>
  <h3 style="margin-top:22px">활동 2: 역누승 법칙 계산</h3><p class="note">AF = (시험 전압 / 사용 전압)ⁿ</p>
  <div class="row"><label for="vU">사용 전압</label><input id="vU" type="number" value="5"><label for="vS" style="min-width:auto">시험 전압</label><input id="vS" type="number" value="8"><label for="vN" style="min-width:auto">지수 n</label><input id="vN" type="number" step="0.1" value="3"></div><p id="vR"></p>`;
  sorter($("#mo"),[["온도만 올린다","아레니우스"],["전압이나 기계 하중을 올린다","역누승"],["온도와 습도를 함께 올린다","Peck"],["온도를 오르내리며 반복한다","코핀-맨슨"],["크기가 다른 반복 하중의 피로 손상을 더한다","마이너"]],["아레니우스","역누승","Peck","코핀-맨슨","마이너"]);
  const draw=()=>{const u=+$("#vU").value,s2=+$("#vS").value,n=+$("#vN").value,af=u>0?(s2/u)**n:NaN;$("#vR").innerHTML=isFinite(af)?`AF = (${s2}/${u})^${n} = <b>${af.toFixed(2)}</b> → 시험 100시간 ≈ 사용 ${fmt(100*af)}시간`:"전압을 0보다 크게 넣어 주세요."};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);draw();},
 degr(el){const U=[[.010,1],[.014,2],[.008,3],[.012,4],[.017,5]];
  el.innerHTML=`<h3>활동: 열화 시험으로 고장 시간 예측하기</h3><p>LED 5개의 밝기를 500시간까지 쟀어요(점). 아직 하나도 고장 나지 않았지만, 줄어드는 추세를 연장하면(점선) ‘고장 기준’에 닿는 시간을 예측할 수 있어요.</p>
  <div class="row"><label for="dTh">고장 기준 밝기</label><input id="dTh" type="range" min="50" max="90" step="1" value="70"><span id="dThv" class="nw"></span></div>
  <div class="two"><div class="fig" id="dF"><svg id="dS" role="img" aria-label="밝기 열화 추세와 고장 기준선"></svg></div><div><div class="stats" id="dSt"></div><p class="note">예시 데이터예요. 실제로는 예측된 고장 시간들로 와이블 분석을 이어서 해요.</p></div></div>`;
  const r=rng(77),pts=U.map(([sl])=>[100,200,300,400,500].map(t=>[t,100-sl*t+(r()-.5)*1.2]));
  const s=$("#dS");const draw=()=>{const th=+$("#dTh").value;$("#dThv").textContent=th+"%";const ft=U.map(([sl])=>(100-th)/sl);
   $("#dSt").innerHTML=ft.map((t,i)=>`<div class="stat"><b>${fmt(t)}h</b><span>LED ${i+1} 예측 고장</span></div>`).join("");
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=44,b=W-12,T=14,B=H-28,xm=Math.max(...ft)*1.08,X=t=>a+t/xm*(b-a),Y=v=>B-(v-40)/62*(B-T),ink=css('--ink'),soft=css('--soft'),tom=css('--tom'),cols=["#2f7bf6","#1f9d6b","#e0b020","#9b6bff","#e0407a"];
   s.innerHTML=`<line x1="${a}" y1="${B}" x2="${b}" y2="${B}" stroke="${ink}" stroke-width="2"/><line x1="${a}" y1="${T}" x2="${a}" y2="${B}" stroke="${ink}" stroke-width="2"/>`+
    [50,75,100].map(v=>`<text x="${a-6}" y="${Y(v)+4}" text-anchor="end" font-size="13" fill="${soft}">${v}%</text>`).join("")+
    `<line x1="${a}" x2="${b}" y1="${Y(th)}" y2="${Y(th)}" stroke="${tom}" stroke-width="2.5"/><text x="${a+8}" y="${Y(th)+18}" font-size="13" fill="${tom}">고장 기준 ${th}%</text>`+
    `<line x1="${X(500)}" x2="${X(500)}" y1="${T}" y2="${B}" stroke="${css('--line')}" stroke-dasharray="4 4"/><text x="${X(500)+4}" y="${T+12}" font-size="13" fill="${soft}">측정 끝(500h)</text>`+
    U.map(([sl],i)=>`<line x1="${X(0)}" y1="${Y(100)}" x2="${X(ft[i])}" y2="${Y(th)}" stroke="${cols[i]}" stroke-width="2" stroke-dasharray="6 5"/>`+pts[i].map(([t,v])=>`<circle cx="${X(t)}" cy="${Y(v)}" r="4.5" fill="${cols[i]}"/>`).join("")+`<circle cx="${X(ft[i])}" cy="${Y(th)}" r="6" fill="none" stroke="${cols[i]}" stroke-width="3"/>`).join("")+
    `<text x="${b}" y="${B+20}" text-anchor="end" font-size="13" fill="${soft}">시간 → ${fmt(xm)}h</text>`};
  $("#dTh").oninput=draw;ro=new ResizeObserver(draw);ro.observe($("#dF"));},
 sys(el){el.innerHTML=`<h3>활동: k-out-of-n 블록 놀이</h3><p>n개 중 k개 이상만 작동하면 되는 시스템이에요. k = n이면 직렬, k = 1이면 병렬이에요.</p>
  <div class="chips" id="sp"><button class="chip" data-pr="3,3,0.9">직렬 3개</button><button class="chip" data-pr="3,1,0.9">병렬 3개</button><button class="chip" data-pr="4,2,0.8">기출: 4개 중 2개, R 0.8</button><button class="chip" data-pr="3,2,0.9">2-out-of-3 투표</button></div>
  <div class="row"><label for="sn">부품 수 n</label><input id="sn" type="range" min="1" max="8" value="4"><span id="snv" class="nw"></span></div>
  <div class="row"><label for="sk">필요한 수 k</label><input id="sk" type="range" min="1" max="8" value="2"><span id="skv" class="nw"></span></div>
  <div class="row"><label for="sr">부품 신뢰도 R</label><input id="sr" type="range" min="0.5" max="0.99" step="0.01" value="0.8"><span id="srv" class="nw"></span></div>
  <div class="rbd" id="sb"></div><div class="big" id="sR"></div><p id="sF"></p>`;
  const draw=()=>{const n=+$("#sn").value;$("#sk").max=n;const k=Math.min(+$("#sk").value,n),R=+$("#sr").value;$("#sk").value=k;
   $("#snv").textContent=n;$("#skv").textContent=k;$("#srv").textContent=f2(R);const Rs=kofn(k,n,R);
   $("#sb").innerHTML=Array.from({length:n},(_,i)=>`<span class="blk">부품 ${i+1} · ${f2(R)}</span>`).join("")+`<span class="knote">${k===n?"직렬: 모두 작동해야 함":k===1?"병렬: 하나만 작동하면 됨":n+"개 중 "+k+"개 이상 작동"}</span>`;
   $("#sR").textContent="R = "+f4(Rs);
   $("#sF").textContent=k===n?`직렬: ${f2(R)}^${n} = ${f4(Rs)}`:k===1?`병렬: 1 − (1 − ${f2(R)})^${n} = ${f4(Rs)}`:`R = Σ(i=${k}..${n}) ${n}Ci · ${f2(R)}^i · ${f2(1-R)}^(${n}−i) = ${f4(Rs)}  (= 1 − 작동 ${k-1}개 이하일 확률)`};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{const [n,k,R]=b.dataset.pr.split(",");$("#sn").value=n;$("#sk").max=n;$("#sk").value=k;$("#sr").value=R;el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 standby(el){el.innerHTML=`<h3>활동: 단독 vs 능동 병렬 vs 대기 병렬</h3><p>같은 부품 2개(고장률 λ)를 어떻게 쓰느냐에 따라 신뢰도 곡선이 달라져요.</p>
  <div class="chips"><button class="chip" data-pr="0.007,50,1">기출: λ 0.007, 50시간, 완벽 스위치</button><button class="chip" data-pr="0.0001,1000,0.99">기출: λ 0.0001, 1,000시간, 스위치 0.99</button></div>
  <div class="two"><div class="fig" id="bF"><svg id="bS" role="img" aria-label="세 구성의 신뢰도 곡선"></svg></div><div>
   <div class="row"><label for="bl">고장률 λ</label><input id="bl" type="number" step="0.0001" min="0.00001" value="0.007"></div>
   <div class="row"><label for="bt">시간 t</label><input id="bt" type="number" min="0" value="50"></div>
   <div class="row"><label for="bw">스위치 신뢰도</label><input id="bw" type="range" min="0.8" max="1" step="0.01" value="1"><span id="bwv" class="nw"></span></div>
   <div class="stats" id="bSt"></div></div></div>
  <p class="note">대기 병렬: R = e^(−λt)(1 + R_sw·λt), 능동 병렬: 2e^(−λt) − e^(−2λt).</p>`;
  const s=$("#bS");const draw=()=>{const l=Math.max(1e-6,+$("#bl").value||1e-6),t=Math.max(0,+$("#bt").value||0),w=+$("#bw").value;$("#bwv").textContent=f2(w);
   const f=[[x=>Math.exp(-l*x),"단독",css('--soft')],[x=>2*Math.exp(-l*x)-Math.exp(-2*l*x),"능동 병렬",css('--sky')],[x=>Math.exp(-l*x)*(1+w*l*x),"대기 병렬",css('--tom')]];
   $("#bSt").innerHTML=f.map(([g,n])=>`<div class="stat"><b>${f4(g(t))}</b><span>${n} R(${fmt(t)})</span></div>`).join("");
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const xm=3/l,a=40,b=W-12,T=14,B=H-28,X=x=>a+x/xm*(b-a),Y=v=>B-v*(B-T),ink=css('--ink'),soft=css('--soft');
   s.innerHTML=`<line x1="${a}" y1="${B}" x2="${b}" y2="${B}" stroke="${ink}" stroke-width="2"/><line x1="${a}" y1="${T}" x2="${a}" y2="${B}" stroke="${ink}" stroke-width="2"/>`+
    [0,.5,1].map(v=>`<text x="${a-6}" y="${Y(v)+4}" text-anchor="end" font-size="13" fill="${soft}">${v}</text>`).join("")+
    f.map(([g,n,c],j)=>{let d="";for(let i=0;i<=120;i++){const x=i/120*xm;d+=(i?"L":"M")+X(x).toFixed(1)+" "+Y(g(x)).toFixed(1)}return `<path d="${d}" fill="none" stroke="${c}" stroke-width="4"/><text x="${X(xm*.45+j*xm*.12)}" y="${Y(g(xm*.45+j*xm*.12))-8}" font-size="13" fill="${c}">${n}</text>`}).join("")+
    (t<=xm?`<line x1="${X(t)}" x2="${X(t)}" y1="${T}" y2="${B}" stroke="${ink}" stroke-dasharray="4 4"/>`:"")+`<text x="${b}" y="${B+20}" text-anchor="end" font-size="13" fill="${soft}">시간 → ${fmt(xm)}</text>`};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{const [l,t,w]=b.dataset.pr.split(",");$("#bl").value=l;$("#bt").value=t;$("#bw").value=w;el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});
  ro=new ResizeObserver(draw);ro.observe($("#bF"));},
 mc(el){el.innerHTML=`<h3>활동: 몬테카를로로 2-out-of-3 신뢰도 추정</h3><p>부품 신뢰도 0.9인 투표 시스템(3개 중 2개 이상 작동)을 컴퓨터로 여러 번 ‘작동’시켜 봐요. 정답은 0.9720이에요.</p>
  <div class="chips" id="mn"><button class="chip" data-n="20">20번</button><button class="chip on" data-n="200">200번</button><button class="chip" data-n="2000">2,000번</button><button class="chip" data-n="20000">20,000번</button></div><button class="btn alt" id="mgo">다시 던지기</button>
  <div class="two" style="margin-top:12px"><div class="fig" id="mF"><svg id="mS" role="img" aria-label="시행 횟수에 따른 추정값 변화"></svg></div><div><div class="stats" id="mSt"></div><p class="note">시행이 많을수록 정답에 가까워지지만 계산 시간도 늘어요. 몬테카를로 계산 시간의 주원인은 뽑아야 하는 사건의 수예요.</p></div></div>`;
  let N=200,seed=1;const s=$("#mS");const run=()=>{const r=rng(seed*7919+N),tr=[];let ok=0;for(let i=1;i<=N;i++){const up=(r()<.9)+(r()<.9)+(r()<.9);if(up>=2)ok++;if(i%Math.max(1,Math.floor(N/150))===0||i===N)tr.push([i,ok/i])}
   $("#mSt").innerHTML=[[f4(ok/N),"추정 신뢰도"],["0.9720","정답"],[(Math.abs(ok/N-.972)*100).toFixed(2)+"%p","차이"]].map(([v,t])=>`<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("");
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=44,b=W-12,T=14,B=H-28,X=i=>a+i/N*(b-a),Y=v=>B-(Math.max(.8,v)-.8)/.2*(B-T),ink=css('--ink'),soft=css('--soft');
   s.innerHTML=`<line x1="${a}" y1="${B}" x2="${b}" y2="${B}" stroke="${ink}" stroke-width="2"/><line x1="${a}" y1="${T}" x2="${a}" y2="${B}" stroke="${ink}" stroke-width="2"/>`+
    [.8,.9,1].map(v=>`<text x="${a-6}" y="${Y(v)+4}" text-anchor="end" font-size="13" fill="${soft}">${v.toFixed(1)}</text>`).join("")+
    `<line x1="${a}" x2="${b}" y1="${Y(.972)}" y2="${Y(.972)}" stroke="${css('--tom')}" stroke-width="2" stroke-dasharray="6 4"/><text x="${b}" y="${Y(.972)-6}" text-anchor="end" font-size="13" fill="${css('--tom')}">정답 0.972</text>`+
    `<path d="${tr.map(([i,v],j)=>(j?"L":"M")+X(i).toFixed(1)+" "+Y(v).toFixed(1)).join("")}" fill="none" stroke="${css('--sky')}" stroke-width="3"/><text x="${b}" y="${B+20}" text-anchor="end" font-size="13" fill="${soft}">시행 수 → ${fmt(N)}</text>`};
  $("#mn").addEventListener("click",e=>{const b=e.target.closest("[data-n]");if(!b)return;N=+b.dataset.n;$$("#mn .chip").forEach(x=>x.classList.toggle("on",x===b));run()});
  $("#mgo").onclick=()=>{seed++;run()};ro=new ResizeObserver(run);ro.observe($("#mF"));},
 sw(el){el.innerHTML=`<h3>활동: 어떤 소프트웨어 시험일까?</h3><p>상황에 맞는 시험을 골라 보세요.</p><div class="sort" id="sw"></div>`;
  sorter($("#sw"),[["버그를 고친 뒤 예전 기능이 그대로 되는지 다시 확인","회귀"],["코드의 모든 분기와 독립 경로를 한 번씩 지나가게 설계","화이트박스"],["속은 모르고 사용자 시나리오대로 입력하고 결과만 확인","블랙박스"],["일부러 잘못된 값을 넣어 오류 처리가 되는지 확인","결함 삽입"],["실제 사용자들이 쓰는 빈도대로 기능을 시험","운용 프로파일"]],["회귀","화이트박스","블랙박스","결함 삽입","운용 프로파일"]);}
};
return {L,POOL,ACT,homeDraw:homeDraw,stopRO:()=>{if(ro){ro.disconnect();ro=null}}};
});
