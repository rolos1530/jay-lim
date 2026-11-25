/* CRE 학습 앱 · 1장 신뢰성 기본 — 내용·활동·문제 */
CRE.reg(1,{"name": "신뢰성 기본", "bok": "BOK Ⅰ", "color": "#ffcf33", "keys": ["정의 4요소·품질 vs 신뢰성", "욕조 곡선·지수 공식", "MTTF·MTBF·MTTR, 가용도 3형제"], "desc": "CRE 시험 첫 단원(Reliability fundamentals)을 8번의 짧은 활동으로 익혀요. 읽고, 만져 보고, 확인 문제를 풀면 차시 완료!"},function(){

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem("cre1-"+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem("cre1-"+k,JSON.stringify(v))}catch(e){}}};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const pct=(v,d=1)=>(v*100).toFixed(d)+"%";
const fmt=n=>Math.round(n).toLocaleString("ko-KR");
function rng(seed){let s=seed%2147483647||1;return()=>(s=s*16807%2147483647)/2147483647}

/* ───── 차시 데이터 ───── */
const L=[
 {id:"l1",t:"신뢰성이란?",easy:"시간이 지나도 고장 없이 잘 되는 확률",
  pts:[["정의의 4요소","① 확률(몇 %) ② 기능(해야 할 일) ③ 조건(환경·사용법) ④ 시간(얼마 동안). 하나라도 빠지면 신뢰도 숫자는 의미가 없어요."],
       ["품질 vs 신뢰성","품질은 ‘출고하는 순간(t=0)’ 규격에 맞는가, 신뢰성은 ‘시간이 지나도’ 그 품질이 유지되는가예요. 그래서 신뢰성을 ‘시간 축 위의 품질’이라고 불러요."],
       ["신뢰도와 불신뢰도","R(t) = 아직 살아 있는 비율, F(t) = 이미 고장 난 비율. 항상 R(t) + F(t) = 1."],
       ["고장이란?","기능을 못 하게 된 상태. 갑자기 완전히 멈추는 파국 고장, 서서히 나빠지는 열화 고장, 됐다 안 됐다 하는 간헐 고장이 있어요."]],
  tip:"‘조건’에는 온도·습도·진동 같은 환경뿐 아니라 사용 방법(하루 몇 시간, 어떻게 쓰는지)도 들어가요.",
  act:"def",
  q:[["신뢰성 정의의 4요소가 아닌 것은?",["확률","기능","가격","시간"],2,"신뢰성 정의는 확률·기능(의도한 기능)·조건(명시된 조건)·시간(정해진 기간)으로 이루어져요. 가격은 들어가지 않아요."],
     ["‘출고 시점에 규격에 맞는지’를 다루는 것은?",["신뢰성","품질","보전성","가용성"],1,"출고 순간(t=0)의 적합성은 품질, 시간이 지나도 유지되는지는 신뢰성이에요."]]},
 {id:"l2",t:"신뢰성의 가치",easy:"설계에서 고치면 제일 싸다",
  pts:[["회사에 주는 이익","보증(무상수리)·리콜 비용이 줄고, 고객 신뢰와 브랜드 가치가 올라가고, 사고·소송(제조물 책임) 위험이 줄어요."],
       ["1 : 10 : 100 법칙","같은 결함이라도 설계 단계에서 고치면 1, 생산 단계에서 10, 고객 손에 간 뒤엔 100의 비용이 들어요."],
       ["시스템 엔지니어링과 함께","신뢰성은 설계·생산·품질·서비스 팀이 같이 만드는 것. 동시공학(Concurrent engineering)과 DFX(신뢰성·제조성·보전성을 위한 설계)로 처음부터 함께 고려해요."],
       ["수명주기 비용(LCC)","사는 값(획득 비용)보다 쓰는 동안 드는 값(운용·보전·폐기)이 훨씬 클 때가 많아요. 신뢰성이 높으면 LCC가 줄어요."]],
  tip:"기출: ‘오류를 가장 적은 비용으로 발견할 수 있는 단계는?’ → 설계 단계!",
  act:"cost",
  q:[["같은 결함을 고객 사용 단계에서 고치면 설계 단계보다 대략 몇 배 비용이 들까요? (1:10:100 법칙)",["2배","10배","100배","1000배"],2,"설계 1 : 생산 10 : 고객 100. 고객 단계는 설계 단계의 약 100배예요."],
     ["신뢰성이 높아질 때 일반적으로 줄어드는 것은?",["보증 비용","고객 만족","브랜드 가치","시장 점유율"],0,"고장이 줄면 무상수리·리콜 같은 보증 비용이 줄어요. 나머지는 오히려 늘어나요."]]},
 {id:"l3",t:"욕조 곡선",easy:"물건의 일생: 아기 → 어른 → 할아버지",
  pts:[["초기 고장 (감소)","제조 때 생긴 숨은 결함 때문에 처음엔 자주 고장 나다가 점점 줄어요. 와이블 β < 1. 대책: Burn-in, ESS."],
       ["우발 고장 (일정)","고장률 λ가 거의 일정해요. 언제 고장 날지 예측할 수 없고 확률로만 말해요. 지수분포(β = 1)."],
       ["마모 고장 (증가)","닳고 피로가 쌓여 고장이 늘어나요. β > 1. 대책: 예방보전(미리 교체), 수명 설계."],
       ["와이블 분포 하나로","β만 바꾸면 세 구간을 모두 그릴 수 있어서 신뢰성에서 가장 많이 쓰는 분포예요."]],
  tip:"예방보전은 고장률이 ‘늘어나는’ 마모 구간에서만 효과가 있어요. 우발 구간에서 부품을 미리 바꿔도 고장 확률은 안 줄어요.",
  act:"tub",
  q:[["ESS와 Burn-in으로 걸러내려는 고장은?",["초기 고장","우발 고장","마모 고장","설계 변경"],0,"ESS·Burn-in은 고객에게 가기 전에 초기 고장을 미리 드러내는 양산 시험이에요."],
     ["욕조 곡선의 우발 고장 구간을 설명하는 분포는?",["정규분포","지수분포","이항분포","초기하분포"],1,"우발 고장 구간은 고장률이 일정 → 지수분포(와이블 β=1)예요."]]},
 {id:"l4",t:"고장률과 신뢰도 공식",easy:"R(t) = e^(−λt) 하나만 기억!",
  pts:[["고장률 λ","단위 시간당 고장 나는 정도. 예: λ = 0.001/시간 이면 1,000시간에 1번꼴."],
       ["지수분포 신뢰도","R(t) = e^(−λt) = e^(−t/MTBF). 불신뢰도 F(t) = 1 − R(t)."],
       ["MTBF = 1/λ","고장률이 일정할 때만 성립해요. λ = 0.002 → MTBF = 500시간."],
       ["마법의 숫자 37%","t = MTBF 일 때 R = e^(−1) ≈ 0.368. ‘평균 수명만큼 쓰면 63%는 이미 고장’이라는 뜻!"],
       ["순간 고장률 h(t)","h(t) = f(t) / R(t). 지금까지 살아남은 것 중에서 바로 지금 고장 날 비율이에요."]],
  tip:"MTBF는 ‘이 시간까지는 안 고장 난다’는 보증이 아니에요. MTBF 시점엔 오히려 대부분(63%)이 고장 나 있어요.",
  act:"exp",
  q:[["고장률이 일정할 때 MTBF만큼 사용했을 때의 신뢰도는?",["37%","50%","63%","90%"],0,"R = e^(−1) ≈ 0.368. 63%는 그때까지 고장 난 비율이에요."],
     ["고장률 λ = 0.0005/시간인 부품의 MTBF는?",["200시간","500시간","2,000시간","5,000시간"],2,"MTBF = 1/λ = 1/0.0005 = 2,000시간."]]},
 {id:"l5",t:"MTTF · MTBF · MTTR",easy:"고장까지, 고장 사이, 고치는 데 걸리는 시간",
  pts:[["MTTF","Mean Time To Failure. 고치지 않고 버리는 물건(전구, 퓨즈)의 처음 고장까지 평균 시간."],
       ["MTBF","Mean Time Between Failures. 고쳐서 다시 쓰는 물건의 고장과 고장 사이 평균 가동 시간. 점추정 = 총 가동 시간 ÷ 고장 수."],
       ["MTTR","Mean Time To Repair. 평균 수리 시간. 고장 원인을 찾는 진단 시간까지 포함해요."],
       ["MTBF 계산 주의","시험에서 고장 안 난 시료의 시간도 총 가동 시간에 꼭 더해요!"]],
  tip:"기출: 10개를 3,600시간 시험, 5개가 790·1,300·2,200·2,900·3,500시간에 고장 → (5×3,600 + 10,690) ÷ 5 = 5,738시간.",
  act:"sim",
  q:[["MTTR 계산에 포함되는 것은?",["수리 교육 시간","결함 진단 시간","시스템 동작 시간","초기 설치 시간"],1,"고장 원인을 찾는 진단 시간도 수리 시간의 일부예요."],
     ["수리하지 않고 교체해 버리는 부품의 평균 수명을 나타내는 말은?",["MTBF","MTTR","MTTF","MTBM"],2,"수리 불가품은 MTTF, 수리 가능품은 MTBF를 써요."]]},
 {id:"l6",t:"가용도 3형제",easy:"쓰고 싶을 때 쓸 수 있을 확률",
  pts:[["Ai 고유 가용도","MTBF / (MTBF + MTTR). 순수하게 고장 수리만 따져요. 설계가 정하는 이상적인 값."],
       ["Aa 획득(성취) 가용도","MTBM / (MTBM + 평균 보전 시간). 고장 수리 + 예방보전 시간까지 넣어요."],
       ["Ao 운용 가용도","MTBM / (MTBM + MDT). 부품 기다리기, 서류·행정 대기 같은 지연 시간까지 모두 넣은 현실의 값."],
       ["크기 순서","보통 Ai ≥ Aa ≥ Ao. 빼는 시간이 늘어날수록 작아져요."],
       ["시스템 효율","시스템 효율(효과도) = 가용성 × 신뢰성(Dependability) × 임무 능력(Capability)."]],
  tip:"기출: 99% 가용, 수리 40시간 → 0.99 = MTBF/(MTBF+40) → MTBF = 3,960시간.",
  act:"avail",
  q:[["MTBMA 1,700시간, 수리 8시간, 검증 2시간, 부품 대기 24시간일 때 운용 가용도 Ao는 약?",["0.94","0.96","0.98","0.995"],2,"기다리는 시간까지 모두 넣어요: 1,700 / (1,700+8+2+24) ≈ 0.98."],
     ["부품 대기·행정 지연 시간까지 포함하는 가용도는?",["고유 가용도","획득 가용도","운용 가용도","순간 가용도"],2,"현실의 모든 지연을 넣는 것은 운용 가용도(Ao)예요."]]},
 {id:"l7",t:"시정조치와 근본 원인",easy:"불 끄기 → 원인 찾기 → 다시는 안 나게",
  pts:[["시정조치 3단계","즉각 조치(당장 피해 막기) → 임시 조치(잠깐 막아 두기) → 영구 조치(근본 원인 제거)."],
       ["효과 확인과 표준화","영구 조치가 효과 있었는지 확인하고, 작업표준·도면·FMEA에 반영해 문서로 남겨요."],
       ["5 Why","‘왜?’를 다섯 번쯤 물어 겉 증상에서 진짜 원인까지 내려가요."],
       ["피쉬본(특성요인도)","물고기 뼈 모양에 원인을 4M(사람·기계·재료·방법)으로 나눠 적어요."],
       ["시정 vs 예방","시정조치는 이미 생긴 문제의 재발 방지, 예방조치는 아직 안 생긴 문제를 미리 막기."]],
  tip:"FRACAS(고장 보고·분석·시정조치 시스템)의 목적도 결국 ‘같은 고장 재발 방지’예요.",
  act:"rca",
  q:[["근본 원인을 조사하기 위한 기법은?",["QFD","5S","5 Why","Flow chart"],2,"‘왜?’를 반복해 진짜 원인까지 내려가는 5 Why예요."],
     ["시정조치의 마지막 단계로 알맞은 것은?",["즉각 조치","임시 조치","효과 확인 후 표준화","고객 사과"],2,"영구 조치의 효과를 확인하고 문서로 표준화해야 재발하지 않아요."]]},
 {id:"l8",t:"신뢰성 프로그램과 책임",easy:"언제 무엇을 하고, 누구를 지킬까",
  pts:[["목표는 개념 단계에서","신뢰성 목표(요구사항)는 맨 처음 개념·기획 단계에서 정하고, 시스템 → 부품으로 나눠 줘요(신뢰성 할당)."],
       ["단계별 활동","설계: FMEA·디레이팅·예측 / 개발: 시험·신뢰성 성장 / 생산: ESS·Burn-in / 사용: FRACAS·보증 데이터·보전."],
       ["안전과 윤리","ASQ 윤리강령: 대중의 안전·건강·복지를 최우선으로, 정직하고 공정하게, 자기 능력 안에서 일하기."],
       ["제조물 책임(PL) 3결함","설계 결함, 제조 결함, 표시(경고) 결함. 요즘은 회사 책임을 넓게 보는 ‘엄격(무과실) 책임’ 쪽으로 가요."],
       ["남은 위험 알리기","설계로 다 없애지 못한 잔류 위험은 경고 라벨·설명서로 사용자에게 알려야 해요."]],
  tip:"위험 줄이는 순서: 안전한 설계 → 보호장치 → 경고·교육. 교육(라벨)은 마지막 수단이에요.",
  act:"life",
  q:[["신규 제품의 신뢰성 목표를 정하는 단계는?",["시험","개발","생산","개념(기획)"],3,"목표는 맨 처음 개념·기획 단계에서 정해요."],
     ["제조물 책임(PL)의 결함 종류가 아닌 것은?",["설계 결함","제조 결함","표시(경고) 결함","가격 결함"],3,"PL의 3가지 결함은 설계·제조·표시(경고) 결함이에요."]]}
];
const EXTRA=[
 ["l3","욕조 곡선의 3단계를 모두 설명할 수 있는 분포는?",["정규분포","지수분포","와이블 분포","포아송 분포"],2,"와이블은 β만 바꾸면 감소·일정·증가를 모두 그릴 수 있어요."],
 ["l3","예방보전이 고장 확률을 낮추는 경우는?",["고장률이 감소할 때","고장률이 증가할 때","고장률이 일정할 때","우발 고장일 때"],1,"마모 구간처럼 고장률이 늘어날 때만 미리 교체하는 게 효과 있어요."],
 ["l6","시스템이 99% 시간 동안 사용 가능해야 하고, 수리에 40시간이 걸린다. 필요한 MTBF는?",["396시간","3,960시간","4,000시간","39,600시간"],1,"0.99 = MTBF/(MTBF+40) → MTBF = 0.99×40/0.01 = 3,960시간."],
 ["l5","10개를 3,600시간 시험, 5개가 790·1,300·2,200·2,900·3,500시간에 고장(교체 없음). MTBF는?",["2,138","3,600","5,738","7,200"],2,"총 시간 = 5×3,600 + 10,690 = 28,690 → ÷5 = 5,738시간."],
 ["l5","고장 3개가 101, 1,200, 2,100시간에 발생(모두 고장으로 시험 종료). MTBF는?",["1,133.7","1,200","1,800","3,401"],0,"(101 + 1,200 + 2,100) ÷ 3 = 1,133.7시간."],
 ["l4","고장률이 일정한 부품의 MTBF가 1,000시간이다. 500시간 동안 고장 없을 확률은 약?",["0.37","0.50","0.61","0.95"],2,"R = e^(−500/1000) = e^(−0.5) ≈ 0.607."],
 ["l1","R(t) = 0.92일 때 불신뢰도 F(t)는?",["0.08","0.92","1.92","0.46"],0,"R + F = 1 → F = 1 − 0.92 = 0.08."],
 ["l8","위험을 줄이는 통제 방법을 효과 좋은 순서대로 나열하면?",["교육 → 안전장치 → 설계변경","안전장치 → 설계변경 → 교육","설계변경 → 안전장치 → 교육","설계변경 → 교육 → 안전장치"],2,"안전한 설계가 최고, 다음 보호장치, 마지막이 경고·교육이에요."],
 ["l2","시스템 효율(효과도)을 구성하는 세 요소의 곱으로 알맞은 것은?",["가용성 × 신뢰성 × 임무능력","품질 × 비용 × 납기","MTBF × MTTR × λ","S × O × D"],0,"System effectiveness = Availability × Dependability × Capability."],
 ["l7","특성요인도(피쉬본)에서 원인을 나누는 대표적인 4M이 아닌 것은?",["Man(사람)","Machine(기계)","Money(돈)","Method(방법)"],2,"4M은 Man·Machine·Material·Method예요."],
 ["l8", "협력 업체의 신뢰성 관련 활동을 관리할 때 계약에 포함되어야 하는 사항은?", ["협력 업체 직원 수", "신뢰성/품질 특성 항목의 측정 조항", "협력 업체의 광고 계획", "납품 단가 할인 조건"], 1, "협력 업체가 무엇을 어떻게 재고 보고할지(측정 조항)를 정해 둬야 신뢰성을 관리할 수 있어요."],
 ["l1", "신뢰성 관점에서 제품의 핵심 특징은?", ["수명주기 동안 요구되는 기능을 수행한다", "가격이 가장 낮다", "출하 검사에 합격한다", "최신 기술을 사용한다"], 0, "신뢰성은 ‘시간이 지나도’ 요구 기능을 해내는 것이에요."],
 ["l1", "새로운 부품을 검토할 때 신뢰성 엔지니어가 가장 먼저 고려할 사항은?", ["포장 디자인", "부품 색상", "공급사 위치", "운전(작동·필드) 환경"], 3, "같은 부품도 쓰이는 환경(온도·진동·습도)에 따라 신뢰도가 달라져요."],
 ["l8", "신뢰성을 위한 설계(DFR)에서 가장 적절한 설계를 고르기 위해 추정해야 하는 것은?", ["광고 예산", "생산 인원", "사용 가능한 수명 기간", "판매 가격"], 2, "얼마나 오래 써야 하는지(요구 수명)를 알아야 설계 마진을 정할 수 있어요."],
 ["l3", "환경 스트레스 스크리닝(ESS)의 주요 목적은?", ["생산 설비의 신뢰성을 평가한다", "잠재 결함을 초기 고장으로 드러나게 해 출하 전에 걸러낸다", "마모 수명을 연장한다", "설계 마진을 측정한다"], 1, "ESS·번인은 양산 스크리닝이에요. 숨은 제조 결함을 사용 전에 끌어내요. (‘생산 설비 평가’는 자주 고르는 오답)"],
 ["l6", "평균 수리 시간(MTTR)을 결정하는 데 쓸 수 있는 정보는?", ["평균 고장 간격(MTBF)과 가용도", "고장률과 신뢰도", "시험 시료 수", "보증 기간"], 0, "Ai = MTBF/(MTBF+MTTR) 이므로 MTBF와 가용도를 알면 MTTR을 풀 수 있어요."],
 ["l2", "공급 업체로부터 충분한 수량의 양품이 납품되도록 보장하는 요소는?", ["납품 검사 인원 확대", "공급 업체 수 늘리기", "단가 인하", "공급 업체 제조 공정의 변동성 감소"], 3, "검사로 걸러내는 것보다 공정 산포를 줄이는 것이 근본 대책이에요."],
 ["l2", "공급 업체 감사에서 프로세스가 사양을 충족하는지 판단하려면 어떤 정보를 검토해야 하나요?", ["직원 이직률", "재무제표", "Cpk 데이터", "설비 구매일"], 2, "공정 능력 지수 Cpk가 규격 대비 공정 능력을 보여 줘요."],
 ["l7", "시정조치의 효과는 무엇으로 평가할 수 있나요?", ["시정조치 보고서를 작성했는지", "수정된 프로세스의 결과를 측정", "담당자의 의견", "투입한 비용"], 1, "고친 뒤의 결과를 실제로 재 봐야 효과를 알 수 있어요."],
 ["l1", "신뢰성 위험은 무엇에 대한 불확실성의 영향으로 정의되나요?", ["시간(사용 시간)", "성능", "수량", "비용"], 0, "신뢰성은 출하 이후 ‘시간’이 지나도 품질이 유지되는지에 관한 것이에요."],
 ["l1", "제품 품질이 제품 신뢰도에 미치는 영향으로 맞는 것은?", ["출하 검사만이 신뢰도를 결정한다", "품질과 신뢰도는 관계가 없다", "품질이 좋아지면 신뢰도는 떨어진다", "부품 품질이 개선되면 신뢰도가 개선된다"], 3, "t=0의 품질이 좋아야 시간이 지나도 좋은 상태가 유지돼요."],
 ["l5", "운용 데이터로 MTBF를 추정할 때 옳은 것은?", ["점추정값 하나면 충분하다", "고장 안 난 시간은 빼고 계산한다", "MTBF 추정에는 신뢰한계를 함께 제시해야 한다", "수리 시간을 가동 시간에 더한다"], 2, "데이터 양에 따라 불확실성이 있으므로 신뢰구간(한계)을 같이 말해요."],
 ["l2", "제품 수명주기 동안의 ‘최적 신뢰성’ 수준을 가장 잘 설명한 것은?", ["신뢰도 100%", "제품 소유·유지에 드는 총비용이 최소인 수준", "고장이 0인 수준", "개발비가 가장 적은 수준"], 1, "신뢰성 투자 비용과 고장 비용의 합이 최소인 지점이 최적이에요."],
 ["l1", "모든 부품이 정상인데도 원하지 않는 기능을 일으키는 숨은 경로를 찾는 방법은?", ["스니크 회로 분석", "FMEA", "파레토 분석", "가속 수명 시험"], 0, "스니크 회로(숨은 경로)는 고장이 없어도 생기는 문제라 별도 분석이 필요해요."],
 ["l8", "제품 신뢰성에 대한 고객의 기대사항은 개발의 어느 단계에서 입력되나요?", ["폐기", "양산", "신뢰성 시험", "개념 설계"], 3, "고객 기대는 맨 처음 개념 단계에서 신뢰성 목표로 바뀌어요."],
 ["l7", "신뢰성이 목표에 미달해 데이터 분석으로 고장 모드를 골라 시정조치를 진행한다. 이때 기대할 수 있는 것은?", ["보증 기간 연장", "생산량 증가", "신뢰성 성장 예측", "가용도 감소"], 2, "고장 모드를 고쳐 나가면 신뢰성이 올라가는 ‘신뢰성 성장’을 예측할 수 있어요."],
 ["l2", "제조사(OEM)로부터 받은 정보 중 신뢰도의 기록으로 볼 수 있는 것은?", ["생산 계획", "시장 불량(필드 고장) 자료", "원가 자료", "영업 실적"], 1, "실제 사용 중 고장 기록이 신뢰도의 증거예요."],
 ["l3", "전자제품의 번인(Burn-in) 시험을 설명하는 데 쓰는 용어는?", ["환경 스트레스 스크리닝(ESS)", "신뢰성 성장 시험", "HALT", "수락 시험"], 0, "번인은 ESS의 한 형태로, 초기 고장을 걸러내요."],
 ["l5", "평균 수리 시간(MTTR)을 구하는 방법은?", ["총 가동 시간 ÷ 고장 수", "1/λ", "총 수리 시간 ÷ 총 가동 시간", "수리 시간의 합 ÷ 수리 횟수"], 3, "MTTR = 수리 시간 합계 / 수리 건수."],
 ["l8", "ASQ 윤리 규범에서 신뢰성 기술자가 고용주의 동의를 받아야 하는 행위는?", ["학회 논문 읽기", "사내 교육 참석", "외부 컨설팅(자문)", "사내 회의 발표"], 2, "외부 자문은 이해 상충이 생길 수 있어 고용주 동의가 필요해요."],
 ["l1", "다음 중 신뢰성을 정의하는 데 도움이 되는 파라미터는?", ["제품 가격", "고장 시간", "생산 수량", "포장 크기"], 1, "신뢰성은 시간 축 위의 개념이라 고장 시간이 핵심 파라미터예요."],
 ["l3", "욕조 곡선의 초기 고장 단계를 가장 잘 설명한 것은?", ["품질(제조) 관련 결함 때문에 고장률이 높다가 줄어든다", "고장률이 일정하다", "마모로 고장률이 증가한다", "고장률이 0이다"], 0, "초기 고장은 제조·품질 결함이 원인이에요."],
 ["l2", "제조 공정에 결함이 많을 때 표본은 어떻게 수집해야 하나요?", ["마지막 로트에서만", "결함이 많은 시간대에서만", "첫 시간대에서만", "공정 전반에서 일정한 간격으로(편향되지 않게)"], 3, "한쪽에 치우치지 않게 공정 전체에서 고르게 뽑아야 해요."],
 ["l2", "낮은 신뢰도로 인한 비용을 개발 초기에 평가해야 하는 이유는?", ["생산 일정을 당기기 위해", "마케팅 예산을 정하기 위해", "미래의 모든 비용이 고려되도록 하기 위해", "인력을 줄이기 위해"], 2, "초기에 평가해야 보증·리콜 등 나중 비용까지 반영해 설계를 결정할 수 있어요."],
 ["l2", "제품 신뢰도를 향상시키는 조치로 가장 알맞은 것은?", ["출하 검사 인원을 늘린다", "설계·개발 과정에서 설계를 개선한다", "보증 기간을 늘린다", "판매 가격을 올린다"], 1, "신뢰도는 설계에서 만들어져요. 검사는 걸러낼 뿐이에요."],
 ["l6", "고유 가용도(Ai)의 정의는?", ["MTBF / (MTBF + MTTR)", "MTBM / (MTBM + MDT)", "MTTR / MTBF", "1 − MTTR"], 0, "Ai는 고장 수리 시간만 고려해요. MTBM/(MTBM+MDT)는 운용 가용도."],
 ["l6", "고유 가용도(Ai)와 운용 가용도(Ao)의 차이로 맞는 것은?", ["둘은 항상 같다", "Ai는 대기 시간을 포함한다", "Ao는 설계만으로 결정된다", "Ai는 설계의 산물이고, Ao는 사용 환경의 정지 시간(대기 등)까지 포함한다"], 3, "Ao는 부품 대기·행정 지연 같은 현실의 정지 시간을 포함해요."],
 ["l7", "장기 개선 활동(영구 조치)의 주목적은?", ["고장 부품의 빠른 교체", "고객 보상", "고장의 근본 원인 제거", "재고 확보"], 2, "영구 조치는 근본 원인을 없애 재발을 막는 거예요."],
 ["l8", "회전날 제품에 대해 지난 30년간 상해 가능성 고장 보고가 2건 접수됐다. 신뢰성 엔지니어가 할 일은?", ["2건뿐이니 무시한다", "위험 평가를 수행한다", "즉시 단종한다", "고객의 오사용으로 결론짓는다"], 1, "건수가 적어도 상해 가능성이 있으면 위험 평가부터 해요."],
 ["l8", "신제품 개념 단계에서 신뢰성 예측을 하는 주된 목적은?", ["대안 설계들의 상대적인 신뢰성을 비교하기 위해", "보증 비용을 정확히 확정하기 위해", "양산 불량률을 확정하기 위해", "MTTR을 측정하기 위해"], 0, "초기 예측은 절대값보다 설계안끼리 비교하는 데 쓰여요."],
 ["l2", "생산이나 공정에서 신뢰성 기술을 사용하는 주된 이유는?", ["생산성 향상", "광고 효과", "인건비 감소", "보증 비용 감소"], 3, "양산 신뢰성 활동의 목적은 필드 고장과 보증 비용을 줄이는 것이에요. (생산성 향상은 오답)"],
 ["l1", "신뢰성의 정의·서술에 반드시 포함되어야 할 요소는?", ["최적 환경", "제품 가격", "필수(요구) 기능", "생산 수량"], 2, "요구 기능이 정해져야 무엇이 고장인지 정의할 수 있어요. ‘최적’ 환경이 아니라 ‘명시된’ 환경이에요."],
 ["l2", "기업이 제품에 신뢰성 설계를 적용해서 얻는 이득은?", ["생산 비용 감소", "브랜드 명성 향상", "설계 기간 단축", "부품 수 증가"], 1, "신뢰성은 차별화 요소예요. 생산 비용은 오히려 늘 수도 있어요."],
 ["l5", "MTTF와 MTBF의 차이로 적절한 것은?", ["MTTF는 수리 불가 시스템, MTBF는 수리 가능 시스템에 쓴다", "MTTF는 수리 가능, MTBF는 수리 불가", "둘은 완전히 같다", "MTTF는 수리 시간이다"], 0, "매번 나오는 단골 문제예요."],
 ["l2", "신뢰성 있는 제품 설계의 주요 목표가 되어야 하는 것은?", ["이윤 극대화", "시험 기간 최소화", "부품 수 최대화", "수명주기 비용 최소화"], 3, "고객이 소유·운용하는 전체 비용(LCC)을 줄이는 것이 목표예요."],
 ["l8", "신뢰성 엔지니어의 역할과 책임에 대한 설명으로 가장 적절한 것은?", ["생산 일정만 관리한다", "설계와는 관계없다", "설계 검토 프로세스에 깊이 관여한다", "영업 목표를 정한다"], 2, "신뢰성은 설계 단계에서 만들어지므로 설계 검토 참여가 핵심이에요."],
 ["l8", "신뢰성 엔지니어가 제품 개발 팀에 참여할 때 가장 필수적인 기본 기술은?", ["프로그래밍 능력", "효과적으로 상호작용하고 소통하는 능력", "영업 능력", "회계 능력"], 1, "고유 기술에 더해 소통 능력이 필수예요."],
 ["l2", "대형 조직에서 품질 직능과 신뢰성 직능의 최적 관계는?", ["책임이 겹치므로 상호 협력해야 한다", "품질이 신뢰성을 감독한다", "완전히 독립적이어야 한다", "신뢰성이 품질을 대체한다"], 0, "두 직능은 겹치는 영역이 많아 협력이 필요해요."],
 ["l2", "소프트웨어 개발에서 요구사항 : 코딩 : 시험 단계의 오류 수정 상대 비용은 대략?", ["1 : 1 : 1", "100 : 10 : 1", "1 : 2 : 3", "1 : 10 : 100"], 3, "늦게 발견할수록 비용이 크게 늘어요(1:10:100)."],
 ["l8", "고객-공급 업체 관계에서 고객의 책임은?", ["공급 업체의 공정 설계", "공급 업체 직원 교육", "성능 요구사항 제공", "공급 업체 설비 구매"], 2, "고객은 무엇이 필요한지(성능 요구사항)를 명확히 줘야 해요."],
 ["l2", "신뢰할 수 있는 제품을 지속적으로 제공하기 위한 핵심 요소는?", ["검사 강화", "제품 변동성 감소", "가격 인하", "광고 확대"], 1, "산포를 줄여야 꾸준히 같은 신뢰도를 낼 수 있어요."],
 ["l1", "시스템의 신뢰성에 가장 큰 영향을 미치는 것은?", ["필드 사용 환경", "고객의 요구사항과 기대치", "제품 색상", "판매 지역의 인구"], 0, "실제 사용 환경(스트레스)이 고장을 결정해요. (고객 요구는 자주 고르는 오답)"],
 ["l5", "200개의 커패시터를 수명 시험해 5개가 불량이었다. 신뢰도 추정값은?", ["0.025", "0.950", "0.995", "0.975"], 3, "(200 − 5) / 200 = 0.975."]
];
const POOL=[...L.flatMap(l=>l.q.map((q,i)=>({k:l.id+"-"+i,c:l.id,q:q[0],o:q[1],a:q[2],w:q[3]}))),...EXTRA.map((q,i)=>({k:"x"+i,c:q[0],q:q[1],o:q[2],a:q[3],w:q[4]}))];
const lname=id=>L.find(l=>l.id===id).t;


/* ───── 홈: 전구 100개 ───── */
const life=(()=>{const r=rng(20261124);return Array.from({length:100},()=>-1000*Math.log(1-r()))})();
$("#c1hLamps").innerHTML=life.map(()=>`<span class="lamp"></span>`).join("");
function lampsDraw(){const t=+$("#c1hT").value,on=life.filter(x=>x>t).length;
 $$("#c1hLamps .lamp").forEach((el,i)=>el.classList.toggle("off",life[i]<=t));
 $("#c1hTv").textContent=fmt(t)+"시간";$("#c1hR").textContent=`R = ${on}%`;
 $("#c1hNote").textContent=`켜진 전구 ${on}개 · 공식 e^(−${t}/1000) = ${pct(Math.exp(-t/1000))}`;}
$("#c1hT").addEventListener("input",lampsDraw);

let ro=null;const ROS=[];
const ACT={
 def(el){const P=[["확률","90%","몇 퍼센트로 말해요. ‘절대 안 고장 남’은 신뢰성의 말이 아니에요."],["기능","펑크 없이 잘 굴러가기","무엇을 하면 ‘정상’인지 먼저 정해야 고장을 셀 수 있어요."],["조건","보통 도로, 하루 1시간","험한 산길이면 같은 자전거라도 신뢰도가 달라져요."],["시간","1년 동안","시간을 말하지 않으면 신뢰도는 숫자가 될 수 없어요."]];
  el.innerHTML=`<h3>활동: 문장 속 4요소 찾기</h3><p>아래 문장에서 낱말을 눌러 어떤 요소인지 확인해 보세요.</p>
  <p class="def" style="line-height:2.1">“이 자전거가 <button class="chip" data-p="2">보통 도로, 하루 1시간</button> 조건에서 <button class="chip" data-p="3">1년 동안</button> <button class="chip" data-p="1">펑크 없이 잘 굴러갈</button> <button class="chip" data-p="0">확률은 90%</button>이다.”</p>
  <div class="card" id="dSay"><p class="note">낱말을 하나 눌러 보세요. 4개를 다 찾으면 완성!</p></div>
  <h3 style="margin-top:20px">품질과 신뢰성, 무엇일까?</h3><div class="sort" id="qr"></div>`;
  const seen=new Set();el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const p=P[+b.dataset.p];seen.add(b.dataset.p);b.classList.add("on");
   $("#dSay").innerHTML=`<h3>${p[0]}</h3><p><b>${b.textContent}</b> — ${p[2]}</p><p class="note">${seen.size} / 4 찾음${seen.size===4?" · 다 찾았어요!":""}</p>`});
  sorter($("#qr"),[["출고 검사에서 치수가 규격 안에 있다","품질"],["3년 써도 처음 성능을 유지한다","신뢰성"],["불량률 0.1% (공장 출하 기준)","품질"],["1만 시간 동안 고장 없이 작동할 확률 95%","신뢰성"]],["품질","신뢰성"]);},
 cost(el){const S=[["설계",1],["생산",10],["고객",100]];
  el.innerHTML=`<h3>활동: 결함을 어디서 찾을까?</h3><p>결함 1개를 발견한 단계를 골라 보세요. 동전 하나 = 비용 1이에요.</p>
  <div class="chips" id="cs">${S.map((s,i)=>`<button class="chip${i===2?" on":""}" data-s="${i}">${s[0]} 단계에서 발견</button>`).join("")}</div>
  <div class="two" style="align-items:center"><div class="coins" id="coins"></div><div><div class="big" id="cBig"></div><p id="cSay"></p>
  <div class="row"><label for="cn">결함 개수</label><input id="cn" type="number" min="1" value="20"></div><p class="note" id="cTot"></p></div></div>`;
  let s=2;const draw=()=>{const n=Math.max(1,+$("#cn").value||1);
   $("#coins").innerHTML=S.map(([nm,c],i)=>`<div class="stack${i===s?" hl":""}"><span class="cap">${nm}<br>${c}</span>${Array.from({length:Math.max(1,Math.round(Math.log10(c)*8+1))},()=>'<i class="coin"></i>').join("")}</div>`).join("");
   $("#cBig").textContent=`× ${S[s][1]}`;
   $("#cSay").textContent=["설계 도면 위에서 고치면 지우개 한 번이면 돼요.","이미 금형·공정이 만들어져서 바꾸려면 재작업·폐기 비용이 들어요.","리콜·무상수리·배송·브랜드 손상·소송까지… 가장 비싸요."][s];
   $("#cTot").textContent=`결함 ${n}개 → 설계 ${fmt(n)} · 생산 ${fmt(n*10)} · 고객 ${fmt(n*100)} (지금 고른 단계: ${fmt(n*S[s][1])})`;};
  el.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{s=+b.dataset.s;el.querySelectorAll("[data-s]").forEach(x=>x.classList.toggle("on",x===b));draw()});
  $("#cn").oninput=draw;draw();},
 tub(el){el.innerHTML=`<h3>활동: 욕조 곡선 위에 짝 맞추기</h3>
  <div class="fig" id="tubF"><svg id="tub" role="img" aria-label="욕조 곡선: 초기 고장 감소, 우발 고장 일정, 마모 고장 증가"></svg></div>
  <p>각 낱말이 욕조 곡선의 어느 구간과 관련 있는지 골라 보세요.</p><div class="sort" id="ts"></div>`;
  const s=$("#tub");const draw=()=>{const W=s.clientWidth,H=s.clientHeight;if(!W)return;const Lm=24,R=W-12,T=58,B=H-36,f=x=>.75*Math.exp(-x/.08)+.12+.62*Math.exp((x-1)/.09);
   const X=x=>Lm+x*(R-Lm),Y=y=>B-(y/.95)*(B-T);let d="";for(let i=0;i<=120;i++){const x=i/120;d+=(i?"L":"M")+X(x).toFixed(1)+" "+Y(Math.min(f(x),.95)).toFixed(1)}
   const z=[[0,.24,"#ffcf33","초기 고장","β<1 · 감소"],[.24,.76,"#2f7bf6","우발 고장","β=1 · 일정"],[.76,1,"#ff5a4e","마모 고장","β>1 · 증가"]],sm=W<440;
   s.innerHTML=z.map(([a,b,c,t,u])=>`<rect x="${X(a)}" y="${T-8}" width="${X(b)-X(a)}" height="${B-T+8}" fill="${c}" opacity=".18"/><text x="${(X(a)+X(b))/2}" y="${T-30}" text-anchor="middle" font-family="Jua" font-size="${sm?15:19}" fill="${css('--ink')}">${t}</text><text x="${(X(a)+X(b))/2}" y="${T-12}" text-anchor="middle" font-size="${sm?12:14}" fill="${css('--soft')}">${u}</text>`).join("")+
   `<line x1="${Lm}" y1="${B}" x2="${R}" y2="${B}" stroke="${css('--ink')}" stroke-width="2"/><line x1="${Lm}" y1="${T-8}" x2="${Lm}" y2="${B}" stroke="${css('--ink')}" stroke-width="2"/><path d="${d}" fill="none" stroke="${css('--ink')}" stroke-width="5" stroke-linecap="round"/><text x="${R}" y="${B+24}" text-anchor="end" font-size="14" fill="${css('--soft')}">시간 →</text><text x="${Lm+6}" y="${B+24}" font-size="14" fill="${css('--soft')}">↑ 고장률</text>`};
  ROS.push(ro=new ResizeObserver(draw));ro.observe($("#tubF"));
  sorter($("#ts"),[["Burn-in·ESS로 걸러낸다","초기"],["예방보전(미리 교체)이 효과적","마모"],["지수분포, λ 일정","우발"],["납땜 불량 같은 숨은 제조 결함","초기"],["베어링이 닳고 금속 피로가 쌓임","마모"],["번개 같은 예상 못 한 외부 충격","우발"]],["초기","우발","마모"]);},
 exp(el){el.innerHTML=`<h3>활동: 신뢰도 곡선 만지기</h3>
  <div class="two"><div class="fig" id="expF"><svg id="expS" role="img" aria-label="지수분포 신뢰도 곡선 R(t)"></svg></div>
  <div><div class="row"><label for="eM">MTBF (시간)</label><input id="eM" type="number" min="1" value="1000"></div>
  <div class="row"><label for="eT">사용 시간 t</label><input id="eT" type="range" min="0" max="3" step="0.01" value="0.5"></div>
  <div class="big" id="eR"></div><p id="eF"></p><p class="note" id="eL"></p>
  <div class="chips"><button class="chip" data-t="0.1">t = 0.1 MTBF</button><button class="chip" data-t="0.69">t = 0.69 MTBF (반감)</button><button class="chip" data-t="1">t = MTBF</button><button class="chip" data-t="2">t = 2 MTBF</button></div></div></div>`;
  const s=$("#expS");const draw=()=>{const m=Math.max(1,+$("#eM").value||1),k=+$("#eT").value,t=k*m,R=Math.exp(-k);
   $("#eR").textContent=`R = ${pct(R)}`;$("#eF").innerHTML=`t = <span class="nw">${fmt(t)}시간</span> · R = e^(−${fmt(t)}/${fmt(m)}) = ${R.toFixed(3)} · 불신뢰도 F = ${pct(1-R)}`;
   $("#eL").textContent=`고장률 λ = 1/MTBF = ${(1/m).toPrecision(3)} /시간`;
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=44,b=W-14,T=14,B=H-34,X=x=>a+x/3*(b-a),Y=y=>B-y*(B-T);
   let d="";for(let i=0;i<=120;i++){const x=i/40;d+=(i?"L":"M")+X(x).toFixed(1)+" "+Y(Math.exp(-x)).toFixed(1)}
   s.innerHTML=`<path d="${d} L${X(3)} ${B} L${X(0)} ${B}Z" fill="${css('--sky')}" opacity=".14"/><path d="${d}" fill="none" stroke="${css('--sky')}" stroke-width="5"/>
   <line x1="${a}" y1="${B}" x2="${b}" y2="${B}" stroke="${css('--ink')}" stroke-width="2"/><line x1="${a}" y1="${T}" x2="${a}" y2="${B}" stroke="${css('--ink')}" stroke-width="2"/>
   ${[0,1,2,3].map(v=>`<text x="${X(v)}" y="${B+20}" text-anchor="${v===3?"end":v?"middle":"start"}" font-size="13" fill="${css('--soft')}">${v?v+"×MTBF":"0"}</text>`).join("")}
   ${[0,.5,1].map(v=>`<text x="${a-6}" y="${Y(v)+4}" text-anchor="end" font-size="13" fill="${css('--soft')}">${v*100}%</text>`).join("")}
   <line x1="${X(k)}" y1="${Y(R)}" x2="${X(k)}" y2="${B}" stroke="${css('--tom')}" stroke-dasharray="5 4" stroke-width="2"/><line x1="${a}" y1="${Y(R)}" x2="${X(k)}" y2="${Y(R)}" stroke="${css('--tom')}" stroke-dasharray="5 4" stroke-width="2"/>
   <circle cx="${X(k)}" cy="${Y(R)}" r="8" fill="${css('--tom')}"/>`};
  $("#eM").oninput=draw;$("#eT").oninput=draw;el.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{$("#eT").value=b.dataset.t;draw()});
  ROS.push(ro=new ResizeObserver(draw));ro.observe($("#expF"));},
 sim(el){el.innerHTML=`<h3>활동: 기계 한 대의 1만 시간 일기</h3><p>기계가 돌다가(초록) 고장 나면 수리(빨강)하고 다시 돌아요. 목표값을 바꾸고 ‘다시 돌리기’를 눌러 실제 기록에서 MTBF·MTTR·가용도를 계산해 보세요.</p>
  <div class="row"><label for="sM">목표 MTBF</label><input id="sM" type="number" min="50" value="800"><span class="note">시간</span></div>
  <div class="row"><label for="sR">목표 MTTR</label><input id="sR" type="number" min="1" value="60"><span class="note">시간</span><button class="btn alt" id="sGo">다시 돌리기</button></div>
  <div class="tl" id="tl" role="img" aria-label="가동과 수리 시간 막대"></div>
  <div class="legend"><span style="--c:var(--leaf)">가동</span><span style="--c:var(--tom)">수리 중</span><span>0 ~ 10,000시간</span></div>
  <div class="stats" id="sSt"></div><p class="note" id="sF"></p>`;
  let seed=7;const run=()=>{const M=Math.max(50,+$("#sM").value||800),Rr=Math.max(1,+$("#sR").value||60),r=rng(seed*7919+13);const seg=[];let t=0,up=0,dn=0,n=0;
   while(t<10000){const u=Math.min(-M*Math.log(1-r()),10000-t);seg.push(["u",u]);up+=u;t+=u;if(t>=10000)break;const d=Math.min(-Rr*Math.log(1-r()),10000-t);seg.push(["d",d]);dn+=d;n++;t+=d}
   $("#tl").innerHTML=seg.map(([k,v])=>`<i class="${k}" style="width:${v/100}%"></i>`).join("");
   $("#sSt").innerHTML=[[n+"번","고장 횟수"],[n?fmt(up/n)+"h":"—","관측 MTBF"],[n?fmt(dn/n)+"h":"—","관측 MTTR"],[pct(up/10000),"실제 가동률"],[pct(M/(M+Rr)),"이론 Ai"]].map(([a,b])=>`<div class="stat"><b>${a}</b><span>${b}</span></div>`).join("");
   $("#sF").textContent=n?`MTBF = 총 가동 ${fmt(up)}h ÷ 고장 ${n}번 · MTTR = 총 수리 ${fmt(dn)}h ÷ ${n}번 · 가용도 ≈ MTBF/(MTBF+MTTR) = ${pct((up/n)/((up/n)+(dn/n)))}`:"이번엔 고장이 없었어요! 다시 돌려 보세요.";};
  $("#sGo").onclick=()=>{seed++;run()};$("#sM").oninput=run;$("#sR").oninput=run;run();},
 avail(el){el.innerHTML=`<h3>활동: 시간 막대로 보는 가용도 3형제</h3><p>고장 1번이 생기는 한 주기 동안의 시간을 넣어 보세요. 빼는 시간이 늘어날수록 가용도가 작아져요.</p>
  <div class="chips"><button class="chip" data-pr="a">기출 ① 99%·수리 40h</button><button class="chip" data-pr="b">기출 ② Ao 문제</button><button class="chip" data-pr="c">우리 공장 예시</button></div>
  <div class="two"><div>
   <div class="row"><label for="aU">가동 시간 (MTBF·MTBM)</label><input id="aU" type="number" min="1" value="1700"></div>
   <div class="row"><label for="aC">고장 수리 (MTTR)</label><input id="aC" type="number" min="0" value="8"></div>
   <div class="row"><label for="aP">예방보전·검증</label><input id="aP" type="number" min="0" value="2"></div>
   <div class="row"><label for="aD">부품·행정 대기</label><input id="aD" type="number" min="0" value="24"></div></div>
  <div><div class="sbar" id="aBar"></div><div class="legend"><span style="--c:var(--leaf)">가동</span><span style="--c:var(--tom)">수리</span><span style="--c:var(--sun)">예방보전</span><span style="--c:var(--soft)">대기</span></div>
   <div class="av" id="aV"></div></div></div><p class="note" id="aN"></p>`;
  const P={a:[3960,40,0,0],b:[1700,8,2,24],c:[500,6,4,30]};
  const draw=()=>{const [u,c,p,d]=["#aU","#aC","#aP","#aD"].map(i=>Math.max(0,+$(i).value||0)),tot=u+c+p+d||1;
   $("#aBar").innerHTML=[[u,"var(--leaf)"],[c,"var(--tom)"],[p,"var(--sun)"],[d,"var(--soft)"]].map(([v,col])=>`<i style="width:${v/tot*100}%;background:${col};${v?"min-width:3px":""}"></i>`).join("");
   const A=[["Ai","MTBF / (MTBF + 수리)",u/(u+c||1)],["Aa","+ 예방보전까지",u/(u+c+p||1)],["Ao","+ 대기 시간까지",u/tot]];
   $("#aV").innerHTML=A.map(([n,s,v])=>`<div class="avr"><b>${n}</b><div><div class="mbar" style="background:var(--line);height:14px"><i style="width:${v*100}%;background:var(--sky)"></i></div><span class="note">${s}</span></div><span class="v">${pct(v,2)}</span></div>`).join("");
   $("#aN").textContent=`Ao = ${fmt(u)} / (${fmt(u)} + ${c} + ${p} + ${d}) = ${(u/tot).toFixed(4)}`;};
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{P[b.dataset.pr].forEach((v,i)=>$(["#aU","#aC","#aP","#aD"][i]).value=v);el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);draw();},
 rca(el){const ST=["즉각 조치: 문제 제품 출하 멈추기","임시 조치: 전수 검사로 불량 걸러내기","근본 원인 분석: 5 Why·피쉬본","영구 조치: 원인 제거(설계·공정 변경)","효과 확인 후 표준화: 작업표준·FMEA 반영"];
  const WH=[["기계가 멈췄다. 왜?","과부하로 퓨즈가 끊어졌다."],["왜 과부하가 걸렸나?","베어링 윤활이 부족했다."],["왜 윤활이 부족했나?","윤활 펌프가 기름을 제대로 빨아올리지 못했다."],["왜 못 빨아올렸나?","펌프 축이 닳아서 덜컥거렸다."],["왜 축이 닳았나?","여과기가 없어서 쇳가루가 들어갔다. ← 근본 원인"]];
  el.innerHTML=`<h3>활동 1: 시정조치 순서 맞추기</h3><p>섞여 있는 단계를 올바른 순서대로 눌러 보세요.</p><div class="chips" id="rPool"></div><ol class="order" id="rOut" style="padding:0"></ol><p class="note" id="rMsg"></p>
  <h3 style="margin-top:22px">활동 2: 5 Why 내려가기</h3><p>‘왜?’ 버튼을 눌러 겉 증상에서 근본 원인까지 내려가 보세요. 퓨즈만 갈면 또 끊어져요!</p>
  <button class="btn" id="wBtn">왜?</button><div class="why" id="wOut"></div>`;
  let k=0;const order=ST.map((s,i)=>i).sort((a,b)=>((a*7+3)%5)-((b*7+3)%5));
  const pool=()=>{$("#rPool").innerHTML=order.filter(i=>i>=k).map(i=>`<button class="chip" data-r="${i}">${ST[i].split(":")[0]}</button>`).join("")||'<span class="jua" style="color:var(--leaf);font-size:20px">완벽해요! 이 순서를 기억하세요.</span>';
   $("#rPool").querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{if(+b.dataset.r===k){$("#rOut").insertAdjacentHTML("beforeend",`<li>${k+1}. ${ST[k]}</li>`);k++;$("#rMsg").textContent="";pool()}else{b.classList.add("no");$("#rMsg").textContent="앗, 그 단계는 아직이에요. 지금 바로 해야 할 일을 먼저 생각해 보세요.";setTimeout(()=>b.classList.remove("no"),600)}})};pool();
  let w=0;$("#wBtn").onclick=()=>{if(w>=WH.length){w=0;$("#wOut").innerHTML="";$("#wBtn").textContent="왜?";return}
   $("#wOut").insertAdjacentHTML("beforeend",`<div class="${w===WH.length-1?"root":""}"><b>${w+1}. ${WH[w][0]}</b><br>${WH[w][1]}</div>`);w++;
   if(w===WH.length)$("#wBtn").textContent="처음부터";};},
 life(el){el.innerHTML=`<h3>활동: 이 활동은 수명주기의 어느 단계?</h3><p>신뢰성 활동을 알맞은 단계에 연결해 보세요.</p><div class="sort" id="lf"></div>`;
  sorter($("#lf"),[["신뢰성 목표(요구사항) 정하기","개념"],["FMEA·디레이팅·신뢰성 예측","설계"],["시제품 시험으로 신뢰성 성장","개발"],["ESS·Burn-in으로 초기 불량 걸러내기","생산"],["FRACAS·보증 데이터로 고장 추적","사용"],["시스템 목표를 부품별로 나눠 주기(할당)","개념"]],["개념","설계","개발","생산","사용"]);}
};

return {L,POOL,ACT,homeDraw:lampsDraw,stopRO:()=>{ROS.splice(0).forEach(o=>o.disconnect());ro=null}};
});
