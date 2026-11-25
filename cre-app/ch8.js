/* CRE 학습 앱 · 8장 보전성 — 내용·활동·문제 */
CRE.reg(8,{"name": "보전성", "bok": "BOK Ⅴ.C", "color": "#00a3a3", "keys": ["사후·예방·예측 보전", "최적 교체 주기·RCM", "다운타임·예비품·TPM"], "desc": "CRE 시험 마지막 단원(Maintainability &amp; availability)을 8번의 짧은 활동으로 익혀요. 고장 나도 빨리 고치고, 고장 나기 전에 손보는 법을 배워요."},function(){

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem("cre8-"+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem("cre8-"+k,JSON.stringify(v))}catch(e){}}};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const pct=(v,d=1)=>(v*100).toFixed(d)+"%";
/* ───── 수학 도우미 ───── */
const f2=v=>(+v).toFixed(2),f3=v=>(+v).toFixed(3),f4=v=>(+v).toFixed(4),fmt=n=>Math.round(n).toLocaleString("ko-KR");
function rng(seed){let s=seed%2147483647||1;return()=>(s=s*16807%2147483647)/2147483647}
const lf=n=>{let s=0;for(let i=2;i<=n;i++)s+=Math.log(i);return s};
const poisCum=(m,k)=>{let s=0;for(let i=0;i<=k;i++)s+=Math.exp(-m+i*Math.log(Math.max(m,1e-300))-lf(i));return s};

/* ───── 차시 데이터 ───── */
const L=[
 {id:"l1",t:"보전성이란?",easy:"고장 나도 빨리, 쉽게 고칠 수 있게",
  pts:[["정의","정해진 조건과 절차로 보전할 때, 정해진 시간 안에 작동 상태로 되돌릴 확률. 보수성·유지보수특성이라고도 해요."],
       ["보전성 ≠ 유지보수","보전성은 고치기 쉽게 ‘설계’하는 성질, 유지보수는 현장에서 고치는 ‘활동’이에요. 그래서 보전성 분석은 설계 단계가 가장 효과적."],
       ["기본 시간 요소","평균 수리 시간(MTTR). 보전성은 총 수리 시간에 기초해 측정하고, 보전성 예측은 시스템의 복원(되살리기)을 평가해요."],
       ["좋은 보전성 설계","모듈 교체, 쉬운 접근, 자가 진단·고장 표시, 표준 공구, 인적 요소 고려. 수리 가능성은 시제품으로 확인할 수 있어요."]],
  tip:"설계 단계에서 인적 요소를 고려하는 팀은 수리 가능한 시스템의 ‘보전성’을 향상시켜요(기출).",
  act:"good",
  q:[["보전성 분석이 가장 효과적인 단계는?",["견본품 시험","디자인(설계) 단계","양산 직전","적용(사용) 단계"],1,"고치기 쉽게 만드는 건 설계에서 정해져요."],
     ["시스템의 유지보수 특성(보전성)을 측정하는 기본적인 시간 요소는?",["평균 고장 간격","평균 수리 시간(MTTR)","가동 시간","보증 기간"],1,"보전성의 핵심 지표는 MTTR이에요."]]},
 {id:"l2",t:"보전의 종류",easy:"고장 후, 시간 맞춰, 상태 보고",
  pts:[["사후(고장) 보전","고장 난 뒤에 고쳐요. 고장 영향이 작고 값싼 부품에 알맞아요(run-to-failure)."],
       ["예방 보전","정해진 시간·사용량마다 미리 손보거나 교체해요(시간 기준). 예: 1,000시간마다 공구 홀더 교체."],
       ["예측(상태 기반) 보전","진동·온도·오일 상태를 측정해 기준에 닿으면 손봐요(상태 기준). 예: 진동이 일정 수준에 도달하면 베어링 교체."],
       ["개량 보전","같은 고장이 반복되지 않게 설계를 고쳐요."],
       ["예방 보전의 전제","고장 비용이 계획된 보전 비용보다 크다는 가정이에요."]],
  tip:"외우기: 예방 = 시간 기준, 예측 = 컨디션(상태) 기준.",
  act:"kinds",
  q:[["작동 1,000시간마다 공구 홀더를 교체하고, 진동이 일정 수준에 도달하면 베어링을 교체한다. 이 활동은?",["둘 다 예방 보전","공구 홀더는 예방 보전, 베어링은 예측 보전","공구 홀더는 예측 보전, 베어링은 사후 보전","둘 다 사후 보전"],1,"시간 기준은 예방, 측정한 상태 기준은 예측이에요."],
     ["예방적 유지보수의 주요 가정은?",["고장 비용이 계획된 유지보수 비용보다 크다","고장이 절대 나지 않는다","고장률이 감소한다","유지보수 비용이 0이다"],0,"완전 고장이 정기 점검보다 비싸야 예방 보전이 의미 있어요."]]},
 {id:"l3",t:"예방 교체는 언제 효과적일까?",easy:"마모(고장률 증가)일 때만!",
  pts:[["고장률 증가 (β > 1)","마모 구간. 미리 바꾸면 늙은 부품을 젊은 부품으로 바꿔 고장률이 줄어요."],
       ["고장률 일정 (β = 1)","새 부품도 고장 확률이 같아서(무기억성) 미리 바꿔도 효과가 없어요."],
       ["고장률 감소 (β < 1)","초기 고장형. 주기적으로 바꾸면 위험한 ‘아기 시기’를 계속 다시 겪어서 고장 확률이 오히려 늘어요."],
       ["예방 정비의 목적","특정 종류의 고장(기계 장비의 마모 고장)을 막는 것."]],
  tip:"기출: β = 1.8, η = 3,000시간인 부품을 200시간마다 예방 교체 → 마모 영역이라 고장률이 감소해요.",
  act:"saw",
  q:[["고장률이 감소하는 부품을 주기적으로 교체하면 고장 발생 확률은?",["증가한다","감소한다","변하지 않는다","0이 된다"],0,"초기 고장 구간을 계속 반복하게 돼요."],
     ["예방 정비 프로그램이 줄이거나 없애려는 문제는?",["설계 결함","기계 장비의 마모 고장","소프트웨어 오류","우발적 외부 충격"],1,"예방 정비는 마모 고장을 막으려는 것이에요."]]},
 {id:"l4",t:"최적 교체 주기",easy:"너무 자주도, 너무 늦게도 손해",
  pts:[["기본 원칙","총 보전 비용 + 고장 비용을 최소화하는 주기를 찾아요."],
       ["너무 자주 교체하면","예방 교체 비용이 커지고, 멀쩡한 부품을 버려요."],
       ["너무 늦게 교체하면","고장 비용(갑작스런 정지, 2차 피해, 긴급 수리)이 커져요."],
       ["단위 시간당 비용","C(T) = [Cp·R(T) + Cf·F(T)] / (T까지 평균 가동 시간). Cf가 Cp보다 훨씬 클 때 최적점이 생겨요."],
       ["다운타임 기준","비용 대신 단위 시간당 다운타임을 최소화하는 교체 주기를 고를 수도 있어요 → 미리 정한 시점에 예방 교체."]],
  tip:"고장률이 일정(β = 1)이면 어떤 주기든 비용이 줄지 않아서 최적 교체 주기가 없어요.",
  act:"cost",
  q:[["최적 부품 교체의 기본 원칙은?",["교체 비용 최소화","총 보전 비용과 고장 비용의 합 최소화","교체 횟수 최소화","재고 최소화"],1,"필출이에요. 두 비용의 합이 최소인 곳."],
     ["교체 주기를 정해 단위 시간당 다운타임을 최소화하려는 교체 정책은?",["고장 나면 교체","미리 정해진 시점에 예방적 교체","교체 안 함","무작위 교체"],1,"필출이에요. 미리 정한 시점에 바꿔요."]]},
 {id:"l5",t:"신뢰성 중심 보전 (RCM)",easy:"기능을 지키는 데 중요한 정비부터",
  pts:[["목적","시스템 기능을 보존하기 위한 하드웨어 정비의 우선순위 정하기. 높은 우선순위 고장 모드에 알맞은 예방 보전을 고르는 것."],
       ["첫 단계","크리티컬(중요) 시스템을 구분하기. 그다음 주로 FMEA를 수행해요."],
       ["어떤 부품을 계획 교체?","고장률이 시간에 따라 올라가는(마모형) 부품만 계획 교체 대상이에요."],
       ["과업 고르기","상태 감시 가능 → 예측 보전, 마모형 → 정기 교체, 숨은 고장 → 기능 점검, 영향 작고 싸면 → 고장 시 보전, 해당 없음 → 재설계."],
       ["흔한 오답","‘치명 부품의 정비 주기를 최소화’는 RCM의 목적이 아니에요. 주기가 아니라 ‘어떤 정비를 할지’ 정하는 거예요."]],
  tip:"RCM = FMEA + 치명도 + 정비 과업 선택. 1~2문제 꼭 나와요.",
  act:"rcm",
  q:[["신뢰성 중심 보전(RCM) 구현의 첫 번째 단계는?",["정비 비용 분석","고장 나무 분석","신뢰성 할당 검토","크리티컬(중요) 시스템 구분"],3,"무엇이 중요한지 먼저 골라요."],
     ["RCM에서 계획 부품 교체 대상이 되는 고장률 함수는?",["시간이 지날수록 감소","일정","시간이 지날수록 증가","0"],2,"마모형만 미리 바꿔서 효과가 있어요."]]},
 {id:"l6",t:"다운타임과 가용도",easy:"고치는 시간 말고 ‘기다리는 시간’도 줄여요",
  pts:[["정지 시간의 구성","능동 보전 시간(진단·분해·교체·조정·검증) + 지연 시간(부품 대기, 행정, 이동)."],
       ["무효 유지보수 시간","실제로 손을 대지 않고 흘러가는 시간. 교체 부품 대기가 대표적이에요."],
       ["가용도 3형제","Ai = MTBF/(MTBF + MTTR), Aa는 예방 보전까지, Ao는 대기 시간까지 포함."],
       ["가용성을 높이려면","유효(능동) 보수 시간을 줄이거나, 고장 간격을 늘리거나, 대기 시간을 줄여요."],
       ["MTTR 할당","MTTR = Σ(λᵢ·tᵢ) / Σλᵢ. 자주 고장 나는 부품의 수리 시간이 MTTR을 좌우해요."]],
  tip:"수리 가능한 시스템 데이터를 분석하는 첫 목적은 수리 시간을 추정하는 거예요(수리 활동 계획 검토는 오답).",
  act:"down",
  q:[["다음 중 무효 유지보수 시간의 예는?",["고장 진단","부품 교체 작업","교체 부품 대기","수리 후 검증"],2,"손을 대지 못하고 기다리는 시간이에요."],
     ["일정한 고장률을 가진 시스템에서 가용성을 높이는 변화는?",["유효 보수 시간을 줄인다","예비 부품을 없앤다","점검 간격을 무작정 늘린다","수리 인원을 줄인다"],0,"고치는 시간이 줄면 가용도가 올라가요."]]},
 {id:"l7",t:"예비품과 재고",easy:"필요할 때 있을 만큼만",
  pts:[["예비품 수","고장률이 일정하면 기간 동안 고장 수는 포아송분포. 목표 확률을 넘는 가장 작은 예비품 수를 골라요."],
       ["ABC 분석","품목의 약 20%가 비용의 약 80%. A급은 꼼꼼히, C급은 간단히 관리."],
       ["경제적 주문량(EOQ)","√(2 × 연간 수요 × 1회 주문 비용 / 개당 연간 보관 비용)."],
       ["재주문점","리드 타임 동안 쓸 양 + 안전 재고에 닿으면 주문해요."],
       ["필드 데이터","예비품 필요량 결정에는 시장 불량(필드) 데이터가 가장 중요해요."]],
  tip:"예비 부품이 없으면 부품 대기 시간이 늘어 Ao가 떨어져요. 예비품은 가용도와 연결돼요.",
  act:"spares",
  q:[["고장률이 일정할 때 일정 기간 동안의 고장(교체) 수를 모델링하는 분포는?",["정규","포아송","와이블","대수정규"],1,"단위 시간당 발생 횟수 → 포아송."],
     ["ABC 재고 분석의 생각으로 맞는 것은?",["모든 품목을 똑같이 관리한다","적은 수의 품목이 비용의 대부분을 차지하므로 차등 관리한다","가장 싼 품목을 가장 엄격히 관리한다","재고를 0으로 만든다"],1,"20%의 품목이 80%의 비용(파레토 원리)."]]},
 {id:"l8",t:"TPM과 보전 프로그램",easy:"모두가 함께 기계를 돌봐요",
  pts:[["TPM (전원 참여 생산 보전)","작업자가 매일 청소·점검·급유·작은 조정을 책임지고, 전문 보전팀은 큰 수리·개선을 맡아요."],
       ["보전 프로그램 시작","가장 중요하게 설정할 것은 유지보수 담당 직원의 자격 요건이에요(기출)."],
       ["시스템 효율","시스템 효과도 = 가용성 × 신뢰성(Dependability) × 임무 능력(Capability)."],
       ["보전과 인적 요소","정비 실수를 줄이려면 쉬운 접근, 명확한 표시, 표준 절차, 교육이 필요해요."],
       ["소프트웨어 보전","수정(버그), 적응(환경 변화), 완전화(기능 개선), 예방(구조 개선) 보전으로 나눠요."]],
  tip:"‘알려진 모든 고장 모드의 운영 효과’는 보전 프로그램 시작 단계 문제의 자주 고르는 오답이에요.",
  act:"tpm",
  q:[["유지보수 프로그램을 시작할 때 설정해야 하는 가장 중요한 단계는?",["알려진 모든 고장 모드의 운영 효과","유지보수 담당 직원의 자격 요건","정비 공구 색상","보증 기간"],1,"기출이에요. 사람이 준비되어야 프로그램이 돌아가요."],
     ["TPM에서 작업자가 맡는 일로 알맞은 것은?",["설비 재설계","매일 청소·점검·급유 같은 자주 보전","부품 구매 계약","보증 비용 분석"],1,"일상 점검은 작업자가, 큰 수리는 전문 보전팀이 해요."]]}
];
const EXTRA=[
 ["l1", "설계 단계에서 인적 요소를 고려하는 팀은 수리 가능한 시스템의 어떤 측면을 향상시키나요?", ["시스템 가격", "시스템의 보전성", "시스템 무게", "시스템 색상"], 1, "사람이 고치기 쉽게 설계하면 보전성이 좋아져요."],
 ["l1", "보전성 예측은 무엇을 평가하기 위해 사용되나요?", ["시스템의 복원", "시스템의 신뢰성", "시스템의 가격", "시스템의 무게"], 0, "빈출이에요. 고장 후 되살리는 능력(복원)을 평가해요. (신뢰성은 자주 고르는 오답)"],
 ["l1", "시스템의 보전성은 무엇에 기초해 측정되나요?", ["총 가동 시간", "총 판매량", "총 생산량", "총 수리 시간"], 3, "수리에 걸리는 시간이 보전성의 척도예요."],
 ["l1", "시제품을 사용해 결정할 수 있는 것은?", ["시장 점유율", "보증 비용", "수리 가능성", "판매 가격"], 2, "실물이 있어야 분해·교체가 쉬운지 확인할 수 있어요."],
 ["l5", "RCM을 실행하는 가장 근본적인 목적은?", ["정비 인원 감축", "높은 우선순위 고장 모드에 대한 적절한 예방 보전 활동 선정", "부품 재고 최대화", "정비 주기 최소화"], 1, "우선순위 높은 고장 모드에 맞는 과업을 골라요."],
 ["l3", "형상모수 1.8, 척도모수 3,000시간인 와이블 부품을 200시간마다 예방 교체하면?", ["고장률이 감소한다", "고장률이 증가한다", "변화가 없다", "고장률이 0이 된다"], 0, "β = 1.8은 마모 영역이라 미리 바꾸면 고장률이 줄어요. 초기·우발 구간이면 예방 교체가 필요 없어요."],
 ["l3", "예방 정비(유지보수)를 하는 주요한 목적은?", ["보고서를 쓰기 위해", "정비 인원을 늘리기 위해", "부품을 많이 쓰기 위해", "특정 종류의 고장이 발생하는 것을 막기 위해"], 3, "예방 정비는 마모 고장을 막으려는 것이에요."],
 ["l5", "신뢰도 기반 정비 프로그램(RCM)의 목적은?", ["정비 비용 0", "치명적 부품의 정비 주기 최소화", "시스템 기능을 보존하기 위한 하드웨어 정비 우선순위화", "부품 표준화"], 2, "주기를 줄이는 게 아니라 어떤 정비를 할지 정하는 거예요."],
 ["l6", "수리 가능한 시스템 데이터를 분석하는 초기 단계의 목적은?", ["수리 활동 계획을 검토하기 위해", "수리 시간을 추정하기 위해", "보증 비용을 줄이기 위해", "부품을 구매하기 위해"], 1, "먼저 수리 시간 분포를 추정해요. (계획 검토는 오답)"],
 ["l6", "평균 보수 간격(MTBMA)이 1,700시간인 시스템에서 고장 후 수리 8시간, 검증 2시간, 부품 대기 24시간이 걸린다. 운용 가용도는?", ["98.0%", "96.0%", "94.0%", "99.5%"], 0, "중요 기출이에요. Ao = 1,700 / (1,700 + 8 + 2 + 24) ≈ 0.98. 평균 정지 시간(MDT) 전체를 넣어요."],
 ["l6", "시스템이 99%의 시간 동안 사용 가능해야 하고, 고장 시 복구에 40시간이 걸린다. 필요한 MTBF는?", ["396시간", "39,600시간", "4,000시간", "3,960시간"], 3, "빈출이에요. 0.99 = MTBF/(MTBF + 40) → 3,960시간."],
 ["l6", "평균 수리 시간(MTTR)을 결정하는 데 쓸 수 있는 정보는?", ["시료 수", "고장률과 신뢰도", "평균 고장 간격(MTBF)과 가용도", "보증 기간"], 2, "Ai = MTBF/(MTBF + MTTR)을 MTTR에 대해 풀어요."],
 ["l6", "평균 수리 시간을 구하는 방법은?", ["가동 시간 ÷ 고장 수", "수리 시간의 합 ÷ 수리 횟수", "1/λ", "수리 시간 ÷ 가동 시간"], 1, "수리 시간 합계를 건수로 나눠요."],
 ["l6", "고유 가용도(Ai)와 운용 가용도(Ao)의 차이는?", ["Ai는 설계의 산물이고, Ao는 사용 환경의 정지 시간까지 포함한다", "Ao가 항상 더 크다", "둘은 같다", "Ai는 부품 대기 시간을 포함한다"], 0, "Ao는 현실의 대기·행정 시간까지 넣어요."],
 ["l6", "고유 가용도를 정의하는 식은?", ["1 − MTBF", "MTTR / MTBF", "MTBM / (MTBM + MDT)", "MTBF / (MTBF + MTTR)"], 3, "고장 수리 시간만 고려해요."],
 ["l6", "시스템 가용성이란 그 시스템이 어떤 상태인 것인가요?", ["가장 싼 것", "한 번도 고장 나지 않는 것", "필요할 때 사용할 준비가 되어 있는 것", "가장 빠른 것"], 2, "쓰고 싶을 때 쓸 수 있을 확률이에요."],
 ["l1", "빌트인 시험 장비(BIT)가 주로 사용되는 목적은?", ["무게를 줄인다", "가능한 한 빠르게 고장을 검출한다", "생산 속도를 높인다", "포장을 쉽게 한다"], 1, "고장을 빨리 찾으면 진단 시간이 줄어 보전성이 좋아져요."],
 ["l7", "고장률 0.001/시간인 부품이 하루 20시간 동작하고 고장 나면 즉시 교체된다. 30일 동안 0.95 신뢰도를 위해 필요한 최소 예비품 수는?", ["2개", "1개", "3개", "4개"], 0, "μ = 0.001 × 600 = 0.6. 포아송 누적: 1개 0.878, 2개 0.977 → 2개."]
];
const POOL=[...L.flatMap(l=>l.q.map((q,i)=>({k:l.id+"-"+i,c:l.id,q:q[0],o:q[1],a:q[2],w:q[3]}))),...EXTRA.map((q,i)=>({k:"x"+i,c:q[0],q:q[1],o:q[2],a:q[3],w:q[4]}))];
const lname=id=>L.find(l=>l.id===id).t;

/* ───── 홈: 1년 정비 일지 ───── */
const YEAR=8760,LIFE=(()=>{const r=rng(424242);return Array.from({length:4},()=>Array.from({length:30},()=>2500*(-Math.log(1-r()))**(1/3)))})();
let hm=0;
function sim(m){return LIFE.map(ls=>{const ev=[];let t=0,i=0;while(t<YEAR&&i<ls.length){const L0=ls[i++];
  if(m===0){t+=L0;if(t<YEAR){ev.push(["f",t,24]);t+=24}}
  else if(m===1){if(L0<1500){t+=L0;if(t<YEAR){ev.push(["f",t,24]);t+=24}}else{t+=1500;if(t<YEAR){ev.push(["p",t,4]);t+=4}}}
  else{const warn=L0*0.9;t+=warn;if(t<YEAR){ev.push(["p",t,4]);t+=4}}}
 return ev})}
function homeDraw(){const R=sim(hm),f=R.flat().filter(e=>e[0]==="f"),p=R.flat().filter(e=>e[0]==="p"),dt=f.length*24+p.length*4;
 $("#c8hMo").innerHTML="<span>월</span>"+Array.from({length:12},(_,i)=>`<span>${i+1}</span>`).join("");
 $("#c8hLog").innerHTML=R.map((ev,i)=>`<div class="lrow"><span>베어링 ${i+1}</span><div class="lbar">${ev.map(([k,t,d])=>`<i class="${k}" style="left:${t/YEAR*100}%;width:${d/YEAR*100}%" title="${k==="f"?"고장 정지":"계획 정지"}"></i>`).join("")}</div></div>`).join("");
 $("#c8hSt").innerHTML=[[f.length+"번","갑작스런 고장"],[p.length+"번","계획 교체"],[fmt(dt)+"h","정지 시간 합계"],[((1-dt/(YEAR*4))*100).toFixed(2)+"%","베어링 가동률"]].map(([v,t])=>`<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("");
 $("#c8hSay").innerHTML=["고장 날 때까지 써서 교체 횟수는 가장 적지만, 모든 정지가 <b>갑작스런 고장</b>이라 생산 계획이 깨지고 정지 시간이 길어요.","1,500시간마다 바꾸니 대부분 <b>계획 정지</b>가 됐어요. 하지만 일찍 고장 나는 베어링은 여전히 갑자기 멈추고, 멀쩡한 베어링도 버리게 돼요.","진동이 커지는 신호(수명의 약 90%)를 보고 바꿔서 거의 모든 정지가 <b>짧은 계획 정지</b>예요. 부품도 끝까지 쓰지만, 감시 장비와 측정 비용이 들어요."][hm];}
$("#c8hM").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;hm=+b.dataset.m;$$("#c8hM .chip").forEach(x=>x.classList.toggle("on",x===b));homeDraw()});
let ro=null;const ROS=[];
const ACT={
 good(el){el.innerHTML=`<h3>활동: 보전성이 좋은 설계일까?</h3><p>고치기 쉬운 설계인지, 고치기 어려운 설계인지 골라 보세요.</p><div class="sort" id="gd"></div>`;
  sorter($("#gd"),[["고장 난 전원부를 모듈째 빼서 교체","좋은 설계"],["필터를 바꾸려면 기계 뒷판 12개 나사를 풀어야 함","나쁜 설계"],["고장 위치를 화면에 코드로 표시하는 자가 진단","좋은 설계"],["특수 공구가 있어야만 열 수 있는 덮개","나쁜 설계"],["커넥터 모양이 달라서 잘못 꽂을 수 없음","좋은 설계"],["부품 번호 표시가 없어 매번 도면을 찾아야 함","나쁜 설계"]],["좋은 설계","나쁜 설계"]);},
 kinds(el){el.innerHTML=`<h3>활동: 어떤 보전일까?</h3><p>각 정비 활동이 어떤 종류인지 골라 보세요.</p><div class="sort" id="kd"></div>`;
  sorter($("#kd"),[["전구가 나가면 그때 갈아 끼움","사후"],["작동 1,000시간마다 공구 홀더 교체","예방"],["진동이 기준을 넘으면 베어링 교체","예측"],["오일 분석에서 금속 가루가 늘면 기어 점검","예측"],["매년 3월에 필터 일괄 교체","예방"],["같은 축이 자꾸 부러져서 재질을 바꿈","개량"]],["사후","예방","예측","개량"]);},
 saw(el){el.innerHTML=`<h3>활동: 톱니 모양 고장률</h3><p>부품을 T시간마다 새것으로 바꾸면 고장률 h(t)가 처음으로 되돌아가 톱니 모양이 돼요(빨강). 바꾸지 않을 때(회색 점선)와 비교해 보세요. η = 1,000시간.</p>
  <div class="row"><label for="sb">모양 β</label><input id="sb" type="range" min="0.5" max="3" step="0.1" value="2"><span id="sbv" class="nw"></span></div>
  <div class="row"><label for="st">교체 주기 T</label><input id="st" type="range" min="100" max="1500" step="50" value="400"><span id="stv" class="nw"></span></div>
  <div class="two"><div class="fig" id="sF"><svg id="sS" role="img" aria-label="교체 주기에 따른 톱니 모양 고장률"></svg></div><div><div class="stats" id="sSt"></div><p id="sN"></p></div></div>`;
  const s=$("#sS");const draw=()=>{const b=+$("#sb").value,T=+$("#st").value,e=1000,Hz=2000;$("#sbv").textContent=b.toFixed(1);$("#stv").textContent=T+"h";
   const h=t=>b/e*(Math.max(t,1)/e)**(b-1),withR=(T/e)**b/T,noR=(Hz/e)**b/Hz;
   $("#sSt").innerHTML=[[(withR*1000).toFixed(2),"교체 시 평균 고장률 (/1000h)"],[(noR*1000).toFixed(2),`교체 안 할 때 (${fmt(Hz)}h 동안)`]].map(([v,t])=>`<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("");
   $("#sN").innerHTML=b>1.05?"β > 1(마모형): 미리 바꾸면 평균 고장률이 <b>줄어요</b>. 예방 교체가 효과 있어요.":b<.95?"β < 1(초기 고장형): 미리 바꾸면 위험한 초기 구간을 계속 반복해서 평균 고장률이 <b>오히려 늘어요</b>.":"β ≈ 1(우발형): 새것이나 헌것이나 같아서 교체해도 <b>변화가 없어요</b>.";
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=44,bb=W-12,TT=14,B=H-28,X=t=>a+t/Hz*(bb-a),ym=Math.max(h(Hz),h(5),h(T))*1.1,Y=v=>B-Math.min(v,ym)/ym*(B-TT),ink=css('--ink'),soft=css('--soft');
   let d0="",d1="";for(let i=0;i<=200;i++){const t=i/200*Hz;d0+=(i?"L":"M")+X(t).toFixed(1)+" "+Y(h(t)).toFixed(1);d1+=(i?"L":"M")+X(t).toFixed(1)+" "+Y(h(t%T)).toFixed(1)}
   s.innerHTML=`<line x1="${a}" y1="${B}" x2="${bb}" y2="${B}" stroke="${ink}" stroke-width="2"/><line x1="${a}" y1="${TT}" x2="${a}" y2="${B}" stroke="${ink}" stroke-width="2"/>`+
    `<path d="${d0}" fill="none" stroke="${soft}" stroke-width="3" stroke-dasharray="7 5"/><path d="${d1}" fill="none" stroke="${css('--tom')}" stroke-width="3"/>`+
    `<text x="${a+6}" y="${TT+12}" font-size="13" fill="${soft}">h(t)</text><text x="${bb}" y="${B+20}" text-anchor="end" font-size="13" fill="${soft}">시간 → ${fmt(Hz)}h</text>`};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);ROS.push(ro=new ResizeObserver(draw));ro.observe($("#sF"));},
 cost(el){el.innerHTML=`<h3>활동: 최적 교체 주기 찾기</h3><p>예방 교체 비용 Cp와 고장 후 교체 비용 Cf, 마모 정도 β를 바꿔 보세요. 곡선이 가장 낮은 곳이 최적 주기예요. η = 1,000시간.</p>
  <div class="two"><div>
   <div class="row"><label for="cp">예방 교체 비용 Cp</label><input id="cp" type="number" min="1" value="100"><span class="note">만 원</span></div>
   <div class="row"><label for="cf">고장 교체 비용 Cf</label><input id="cf" type="number" min="1" value="1000"><span class="note">만 원</span></div>
   <div class="row"><label for="cb">모양 β</label><input id="cb" type="range" min="1" max="4" step="0.1" value="2.5"><span id="cbv" class="nw"></span></div>
   <div class="stats" id="cSt"></div><p id="cN"></p></div>
  <div class="fig" id="cF"><svg id="cS" role="img" aria-label="교체 주기에 따른 단위 시간당 비용 곡선"></svg></div></div>`;
  const s=$("#cS");const draw=()=>{const Cp=Math.max(1,+$("#cp").value||1),Cf=Math.max(1,+$("#cf").value||1),b=+$("#cb").value,e=1000;$("#cbv").textContent=b.toFixed(1);
   const R=t=>Math.exp(-((t/e)**b));const C=T=>{let I=0,n=60;for(let i=0;i<n;i++){const t=(i+.5)/n*T;I+=R(t)*T/n}return(Cp*R(T)+Cf*(1-R(T)))/I};
   const Ts=[];for(let T=50;T<=2500;T+=25)Ts.push([T,C(T)]);let best=Ts[0];Ts.forEach(p=>{if(p[1]<best[1])best=p});
   let mt=0;for(let i=0;i<400;i++)mt+=R((i+.5)/400*6000)*6000/400;const noRep=Cf/mt;
   $("#cSt").innerHTML=[[fmt(best[0])+"h","최적 교체 주기"],[(best[1]*1000).toFixed(1),"그때 비용 (/1000h)"],[(noRep*1000).toFixed(1),"교체 안 할 때 (/1000h)"]].map(([v,t])=>`<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("");
   $("#cN").innerHTML=best[0]>=2400?"곡선이 계속 내려가요. 미리 바꾸는 이득이 거의 없어요(β가 1에 가깝거나 Cf가 Cp와 비슷할 때).":`약 ${fmt(best[0])}시간마다 바꾸면 고장 후에만 바꿀 때보다 비용이 ${Math.round((1-best[1]/noRep)*100)}% 줄어요.`;
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=44,bb=W-12,T0=14,B=H-28,X=t=>a+t/2500*(bb-a),ym=Math.min(Math.max(...Ts.map(p=>p[1])),best[1]*4),Y=v=>B-Math.min(v,ym)/ym*(B-T0),ink=css('--ink'),soft=css('--soft');
   s.innerHTML=`<line x1="${a}" y1="${B}" x2="${bb}" y2="${B}" stroke="${ink}" stroke-width="2"/><line x1="${a}" y1="${T0}" x2="${a}" y2="${B}" stroke="${ink}" stroke-width="2"/>`+
    `<path d="${Ts.map((p,i)=>(i?"L":"M")+X(p[0]).toFixed(1)+" "+Y(p[1]).toFixed(1)).join("")}" fill="none" stroke="${css('--sky')}" stroke-width="4"/>`+
    `<line x1="${a}" x2="${bb}" y1="${Y(noRep)}" y2="${Y(noRep)}" stroke="${soft}" stroke-dasharray="6 5" stroke-width="2"/><text x="${bb}" y="${Y(noRep)-6}" text-anchor="end" font-size="13" fill="${soft}">교체 안 함</text>`+
    `<circle cx="${X(best[0])}" cy="${Y(best[1])}" r="8" fill="${css('--tom')}"/>`+[0,1000,2000].map(t=>`<text x="${X(t)}" y="${B+20}" text-anchor="middle" font-size="13" fill="${soft}">${t}h</text>`).join("")};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);ROS.push(ro=new ResizeObserver(draw));ro.observe($("#cF"));},
 rcm(el){el.innerHTML=`<h3>활동: RCM 정비 과업 고르기</h3><p>FMEA로 찾은 고장 모드마다 알맞은 정비 과업을 골라 보세요.</p><div class="sort" id="rc"></div>`;
  sorter($("#rc"),[["펌프 베어링: 진동이 서서히 커진 뒤 고장","상태 감시"],["타이밍 벨트: 정해진 수명쯤 마모로 끊어짐","정기 교체"],["비상 발전기: 평소엔 안 써서 고장 나도 모름","기능 점검"],["사무실 형광등: 싸고 고장 영향이 작음","고장 시 보전"],["예측도 감시도 안 되는데 고장이 치명적임","재설계"]],["상태 감시","정기 교체","기능 점검","고장 시 보전","재설계"]);},
 down(el){el.innerHTML=`<h3>활동: 정지 시간 쪼개 보기</h3><p>고장 한 번에 드는 시간을 넣어 보세요. 노랑은 손을 대는 능동 보전, 회색은 기다리는 무효 시간이에요.</p>
  <div class="chips"><button class="chip" data-pr="1700,3,4,2,24,0">기출: MTBMA 1,700, 수리 8, 검증 2, 부품 대기 24</button><button class="chip" data-pr="1700,3,4,2,2,0">부품을 미리 비축하면</button></div>
  <div class="two"><div>
   <div class="row"><label for="w0">MTBF</label><input id="w0" type="number" min="1" value="1700"></div>
   <div class="row"><label for="w1">진단</label><input id="w1" type="number" min="0" value="3"></div>
   <div class="row"><label for="w2">분해·교체</label><input id="w2" type="number" min="0" value="4"></div>
   <div class="row"><label for="w3">검증</label><input id="w3" type="number" min="0" value="2"></div>
   <div class="row"><label for="w4">부품 대기</label><input id="w4" type="number" min="0" value="24"></div>
   <div class="row"><label for="w5">행정·이동 대기</label><input id="w5" type="number" min="0" value="0"></div></div>
  <div><div class="sbar" id="wB"></div><div class="legend"><span style="--c:var(--sun)">능동 보전</span><span style="--c:var(--soft)">무효(대기) 시간</span></div><div class="stats" id="wS"></div><p id="wN"></p></div></div>`;
  const draw=()=>{const v=[0,1,2,3,4,5].map(i=>Math.max(0,+$("#w"+i).value||0)),act=v[1]+v[2]+v[3],dly=v[4]+v[5],tot=act+dly||1,u=Math.max(1,v[0]);
   $("#wB").innerHTML=`<i style="width:${act/tot*100}%;background:var(--sun)"></i><i style="width:${dly/tot*100}%;background:var(--soft)"></i>`;
   $("#wS").innerHTML=[[(u/(u+act)*100).toFixed(2)+"%","Ai (능동 보전만)"],[(u/(u+act+dly)*100).toFixed(2)+"%","Ao (대기 포함)"],[Math.round(dly/tot*100)+"%","정지 중 무효 시간 비율"]].map(([a,b])=>`<div class="stat"><b>${a}</b><span>${b}</span></div>`).join("");
   $("#wN").innerHTML=dly>act?"정지 시간의 대부분이 <b>기다리는 시간</b>이에요. 수리 기술보다 예비품·물류 개선이 Ao를 더 크게 올려요.":"정지 시간의 대부분이 실제 수리예요. 모듈 교체·자가 진단 같은 보전성 설계가 효과적이에요."};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{b.dataset.pr.split(",").forEach((x,i)=>$("#w"+i).value=x);el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 spares(el){el.innerHTML=`<h3>활동: 예비품 몇 개 준비할까?</h3>
  <div class="chips"><button class="chip" data-pr="0.001,1,600,0.95">기출: λ 0.001, 하루 20시간 × 30일, 95%</button><button class="chip" data-pr="0.0002,50,2000,0.9">현장 50대, 2,000시간, 90%</button></div>
  <div class="two"><div>
   <div class="row"><label for="pl">부품 고장률 λ</label><input id="pl" type="number" step="0.0001" min="0" value="0.001"><span class="note">/시간</span></div>
   <div class="row"><label for="pn">사용 대수</label><input id="pn" type="number" min="1" value="1"></div>
   <div class="row"><label for="pt">기간</label><input id="pt" type="number" min="1" value="600"><span class="note">시간</span></div>
   <div class="row"><label for="pp">목표 확률</label><input id="pp" type="number" step="0.01" min="0.5" max="0.999" value="0.95"></div></div>
  <div><div class="big" id="pB"></div><p id="pN"></p><div class="par" id="pT"></div></div></div>
  <div class="card" style="margin-top:12px"><h3>경제적 주문량(EOQ)</h3><div class="row"><label for="eD">연간 수요</label><input id="eD" type="number" value="1200"><label for="eS" style="min-width:auto">1회 주문 비용</label><input id="eS" type="number" value="50000"><label for="eH" style="min-width:auto">개당 연 보관 비용</label><input id="eH" type="number" value="3000"></div><p id="eR"></p></div>`;
  const draw=()=>{const l=Math.max(0,+$("#pl").value||0),n=Math.max(1,+$("#pn").value||1),t=Math.max(1,+$("#pt").value||1),P=Math.min(.999,Math.max(.5,+$("#pp").value||.95)),m=l*n*t;let k=0;while(poisCum(m,k)<P&&k<200)k++;
   $("#pB").textContent=k+"개";$("#pN").innerHTML=`기대 고장 수 μ = λ × 대수 × 시간 = ${m.toFixed(2)}. 포아송 누적 확률이 ${P} 이상이 되는 가장 작은 예비품 수예요.`;
   $("#pT").innerHTML=Array.from({length:Math.min(k+2,12)},(_,i)=>{const c=poisCum(m,i);return `<div class="parr${i===k?" vf":""}"><span>예비 ${i}개</span><div class="bar"><i style="width:${c*100}%"></i></div><span class="v">${f3(c)}</span></div>`}).join("");
   const D=+$("#eD").value,S=+$("#eS").value,H=+$("#eH").value;$("#eR").innerHTML=H>0&&D>0&&S>0?`EOQ = √(2 × ${fmt(D)} × ${fmt(S)} / ${fmt(H)}) = <b>${fmt(Math.sqrt(2*D*S/H))}개</b>씩 주문`:"값을 모두 0보다 크게 넣어 주세요."};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{const [l,n,t,p]=b.dataset.pr.split(",");$("#pl").value=l;$("#pn").value=n;$("#pt").value=t;$("#pp").value=p;el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 tpm(el){el.innerHTML=`<h3>활동: 작업자의 자주 보전일까, 전문 보전팀 일일까?</h3><div class="sort" id="tp"></div>`;
  sorter($("#tp"),[["작업 시작 전 설비 청소와 급유","작업자"],["볼트 풀림·이상 소음 매일 점검","작업자"],["주축 베어링 분해 교체","전문 보전팀"],["고장 원인 분석과 설비 개선 설계","전문 보전팀"],["필터 막힘 확인과 간단한 교체","작업자"]],["작업자","전문 보전팀"]);}
};
return {L,POOL,ACT,homeDraw:homeDraw,stopRO:()=>{ROS.splice(0).forEach(o=>o.disconnect());ro=null}};
});
