/* CRE 학습 앱 · 4장 데이터 관리 — 내용·활동·문제 */
CRE.reg(4,{"name": "데이터 관리", "bok": "BOK Ⅲ.B", "color": "#1f9d6b", "keys": ["데이터 출처·관측 중단", "MTBF 하한(χ²)", "고장 분석·파레토·와이블"], "desc": "CRE 시험 넷째 단원(Reliability data management)을 8번의 짧은 활동으로 익혀요. 고장 기록을 모으고, 분석하고, 다시는 안 나게 하는 법을 배워요."},function(){

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem("cre4-"+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem("cre4-"+k,JSON.stringify(v))}catch(e){}}};
const css=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const pct=(v,d=1)=>(v*100).toFixed(d)+"%";
/* ───── 수학 도우미 ───── */
const zUp=p=>{const q=p>.5?1-p:p,t=Math.sqrt(-2*Math.log(q)),x=t-(2.515517+.802853*t+.010328*t*t)/(1+1.432788*t+.189269*t*t+.001308*t*t*t);return p>.5?-x:x};
const chi2=(a,k)=>k===2?-2*Math.log(a):k*(1-2/(9*k)+zUp(a)*Math.sqrt(2/(9*k)))**3;
const f2=v=>(+v).toFixed(2),f3=v=>(+v).toFixed(3),fmt=n=>Math.round(n).toLocaleString("ko-KR");

/* ───── 차시 데이터 ───── */
const L=[
 {id:"l1",t:"신뢰성 데이터의 출처",easy:"우리 데이터, 남의 데이터, 고객의 데이터",
  pts:[["내부 데이터","사내 개발 시험, 양산 시험, 자기 제품의 필드·보증 기록. 그 회사 제품의 실제 성능을 반영해서 가장 가치가 커요."],
       ["외부 데이터","부품 제조사 데이터, 업계 공통 데이터베이스, 정부 자료(GIDEP: 정부-산업 부품 고장 데이터 교환), MIL-HDBK-217 같은 핸드북."],
       ["필드·보증 데이터","고객이 실제로 쓰다가 생긴 고장. 사용자의 경험을 그대로 보여 줘요. 반품 분석은 제품 성능에 대한 즉각적인 피드백이에요."],
       ["좋은 표본","현장 고장 확률을 추정하려면 실제 생산 라인에서 생산 직원이 만든 제품을 무작위로 뽑아야 해요(시제품·특별 제작품 X)."]],
  tip:"특정 용도에서 부품 신뢰도를 추정할 때는 부품 제조사 데이터가 가장 유용하다는 기출이 있어요(가속 시험 결과는 오답).",
  act:"sources",
  q:[["어느 회사가 자기 내부 신뢰성 데이터를 업계 일반 데이터보다 더 가치 있게 보는 이유는?",["비용이 들지 않아서","그 회사 제품의 실제 성능을 반영해서","항상 데이터 양이 더 많아서","외부 데이터는 쓸 수 없어서"],1,"내부 데이터는 자기 제품·공정·고객 환경을 그대로 반영해요."],
     ["정부-산업 데이터 교환 프로그램(GIDEP)은 어떤 정보의 자원인가요?",["부품 고장 데이터","주식 시세","인사 기록","광고 효과"],0,"GIDEP는 부품 고장·경고 정보를 나누는 프로그램이에요."]]},
 {id:"l2",t:"데이터의 종류와 관측 중단",easy:"끝까지 봤나, 중간에 멈췄나",
  pts:[["완전 데이터","모든 시료가 고장 날 때까지 시험해서 고장 시간을 다 아는 데이터."],
       ["정시 중단 (Type Ⅰ)","정해진 ‘시간’에 시험을 끝내요. 살아남은 시료는 중단 데이터. MTBF 하한 자유도 2r + 2."],
       ["정수 중단 (Type Ⅱ)","정해진 ‘고장 수’에 도달하면 끝내요. 자유도 2r."],
       ["다중 중단","시료마다 다른 시간에 빠지는 경우(다른 고장 모드로 고장, 중간 회수 등)."],
       ["우측 중단","‘아직 고장 안 남’만 알아요. 진짜 수명은 중단 시점보다 길어요(미래에 고장). 좌측 중단은 이미 고장 난 뒤 발견, 구간 중단은 점검 사이 어딘가에서 고장."]],
  tip:"고장 안 난 시료의 시간도 총 시험 시간 T에 꼭 더해요. 빼면 MTBF가 너무 작게 나와요.",
  act:"censor",
  q:[["50개를 50시간 시험하고, 그때까지 고장 안 난 것은 시험에서 뺐다. 어떤 관측 중단인가요?",["정수 중단(Type Ⅱ)","시간 관측 중단(정시, Type Ⅰ)","좌측 중단","완전 데이터"],1,"정해진 시간에 멈췄으니 정시 중단(Type Ⅰ)이에요."],
     ["수명 시험 후 모든 제품의 고장 시간을 알 때, 이 데이터는?",["완전 데이터","중단 데이터","구간 데이터","무효 데이터"],0,"모두 고장까지 관찰했으면 완전(complete) 데이터예요."]]},
 {id:"l3",t:"MTBF 추정과 신뢰 한계",easy:"점 하나보다 ‘적어도 이만큼’이 중요",
  pts:[["점추정","MTBF = T / r. T는 모든 시료의 시험 시간 합, r은 고장 수."],
       ["단측 하한","MTBF ≥ 2T / χ²(α, 자유도). 정시 중단 자유도 2r + 2, 정수 중단 2r."],
       ["양측 구간","2T/χ²(α/2, df) ≤ θ ≤ 2T/χ²(1−α/2, 2r). 하한과 상한을 함께 줘요."],
       ["고장률로 바꾸기","λ = 1/MTBF. 하한 MTBF는 고장률의 상한이 돼요."],
       ["T 구하기 연습","교체하며 시험: T = 시료 수 × 시험 시간. 교체 없이: 고장 난 시간 합 + 살아남은 수 × 시험 시간."]],
  tip:"χ²표는 오른쪽 꼬리 넓이 α로 찾아요. 90% 하한이면 α = 0.10. 정시/정수 구분이 단골 함정!",
  act:"mtbf",
  q:[["정시 중단 시험에서 고장이 5번 났다. MTBF 단측 하한의 χ² 자유도는?",["5","10","11","12"],3,"정시 중단 2r + 2 = 12."],
     ["시료 20개를 고장 시 교체하며 100시간 시험했다. 총 시험 시간 T는?",["100시간","200시간","2,000시간","20,000시간"],2,"교체하면 늘 20개가 돌아가니 T = 20 × 100 = 2,000시간."]]},
 {id:"l4",t:"고장 분석의 순서",easy:"부수기 전에 찍고, 밖에서 안으로",
  pts:[["먼저 기록","분해·파괴 전에 사진·스케치로 고장 증거를 남겨요. 한 번 부수면 되돌릴 수 없어요."],
       ["비파괴 검사","외관, X-ray, 초음파(SAM), 전기 측정으로 위치를 좁혀요."],
       ["파괴 분석 (DPA)","단면을 자르고, 뚜껑을 열어(디캡) 내부를 봐요."],
       ["SEM·EDS","전자 주사 현미경으로 미세한 균열·변형을 보고 고장 메커니즘을 밝혀요. 반도체 고장 메커니즘 찾기에 가장 적합."],
       ["고장 물리 (PoF)","고장 모드·메커니즘·부하·환경을 먼저 이해하고 근본 원인을 찾아요."]],
  tip:"‘DPA 전에 무엇을 하나?’ → 사진·그림으로 고장 증거를 문서화. 기출에 그대로 나왔어요.",
  act:"fa",
  q:[["고장 분석에서 파괴 분석을 하기 전에 해야 할 일은?",["바로 단면을 자른다","사진·그림으로 고장 증거를 기록한다","부품을 폐기한다","새 부품으로 교체해 시험한다"],1,"파괴하면 증거가 사라지니 먼저 기록해요."],
     ["반도체 소자의 고장 메커니즘을 찾는 데 가장 알맞은 장비는?",["전자 주사 현미경(SEM)","오실로스코프","버니어 캘리퍼스","온도계"],0,"SEM으로 미세 구조의 손상을 직접 봐요."]]},
 {id:"l5",t:"고장 모드와 메커니즘",easy:"어떻게 고장 났나, 왜 고장 났나",
  pts:[["고장의 네 얼굴","파국(갑자기 완전 고장), 열화(서서히 나빠짐), 간헐(됐다 안 됐다), 드리프트(값이 조금씩 벗어남)."],
       ["모드 vs 메커니즘","모드는 겉으로 보이는 증상(단선, 누설), 메커니즘은 그렇게 만든 물리·화학 과정(피로, 부식)."],
       ["기계적 메커니즘","피로(반복 하중), 크리프(고온에서 지속 하중), 마모(무른 면이 단단한 면과 마찰), 부식(습기)."],
       ["전기적 메커니즘","일렉트로마이그레이션(큰 전류 밀도·고온, 블랙의 식), 전기적 과부하·정전기, 절연 파괴."],
       ["비물질적 고장","부품은 멀쩡한데 생기는 고장. 전자기 간섭(EMI), 소프트웨어 오류 등."]],
  tip:"‘무른 표면이 단단한 표면과 닿아 생긴 손상’ → 마모. 기출 단골이에요.",
  act:"modes",
  q:[["기계 제품에서 무른 표면이 단단한 표면과 상호작용하며 손상되어 고장 났다. 고장 유형은?",["크리프","부식","마모","피로"],2,"마찰로 표면이 깎이는 마모예요."],
     ["다음 중 비물질적 고장 모드의 예는?",["볼트 파단","전자기 간섭(EMI)","납땜 크랙","부식"],1,"물리적 손상 없이 생기는 고장이에요."]]},
 {id:"l6",t:"FRACAS",easy:"보고 → 분석 → 시정 → 확인, 닫힌 고리",
  pts:[["무엇인가요?","Failure Reporting, Analysis and Corrective Action System. 고장을 기록하고, 분석하고, 고치고, 효과를 확인하는 체계."],
       ["주요 목표","같은 고장의 재발 방지. 그 결과 고객 만족과 신뢰성 성장."],
       ["언제 시작?","프로젝트 초기부터. 그래야 양산 전에 설계 문제를 해결할 수 있어요."],
       ["마지막 단계","시정조치 후 고장이 다시 생기는지 자료를 평가(재발 평가)하고 고리를 닫아요."],
       ["기록할 것","고장 날짜·시간·장소, 증상, 운전 조건, 일련번호, 분석 결과, 시정조치와 효과."]],
  tip:"데이터 수집·보고 시스템이 필수인 이유 → ‘적절하고 유효한 데이터로 개선하기 위해’. 궁극 목적은 늘 개선이에요.",
  act:"fracas",
  q:[["FRACAS의 주요 목표는?",["고장의 재발을 방지한다","수리 부품 비용을 줄인다","시험 시간을 늘린다","부품을 폐기한다"],0,"고장을 보고·분석·시정해 같은 고장이 다시 생기지 않게 해요."],
     ["FRACAS를 프로젝트 초기에 시작하면 어떤 도움이 되나요?",["광고 효과","양산 전에 설계 문제를 해결","생산 인원 감축","보증 기간 단축"],1,"초기에 고장을 모아 고치면 양산 전에 설계 결함을 없앨 수 있어요."]]},
 {id:"l7",t:"파레토와 데이터 분석 도구",easy:"중요한 소수부터 고치기",
  pts:[["파레토 분석","고장 유형을 많은 순서로 늘어놓고 누적 비율을 그려요. 20%의 원인이 80%의 문제를 만든다(중요한 소수)."],
       ["언제 먼저?","고장이 많이 모였을 때 가장 먼저 고장 유형별로 분류(파레토)해서 현상을 파악해요."],
       ["건수 vs 비용","‘재정적 충격’으로 순위를 매기면 결함 수 × 결함당 비용으로 정렬해요. 순서가 바뀔 수 있어요!"],
       ["그 밖의 도구","관리도(공정 변동), 회귀분석(예측), 확률지(분포 확인), 히스토그램(분포 모양)."],
       ["확률 분포의 장점","숫자 표보다 쉽게 이해할 수 있는 형태로 데이터를 보여 줘요."]],
  tip:"‘팀이 프로그램 활동의 우선순위를 정할 때 쓰는 도구는?’ → 파레토 분석.",
  act:"pareto",
  q:[["파레토 분석에 대한 설명으로 맞는 것은?",["시간에 따른 변화를 본다","가장 빈번한 부적합에 주의를 집중시킨다","두 변수의 상관을 본다","공정 능력을 계산한다"],1,"많이 생기는 문제부터 보이게 정렬해요."],
     ["200개를 고장 날 때까지 시험했다. 고장 평가에서 가장 먼저 할 일은?",["와이블 모수 추정","고장 유형별 파레토 차트 작성","신뢰 구간 계산","시정조치 실행"],1,"먼저 고장을 분류해 현상을 파악해요."]]},
 {id:"l8",t:"와이블 분석",easy:"점 찍고, 직선 긋고, β와 η 읽기",
  pts:[["메디안 랭크","n개 중 i번째 고장의 누적 고장률 추정: F ≈ (i − 0.3)/(n + 0.4) (버나드 근사)."],
       ["와이블 확률지","가로 ln(t), 세로 ln(−ln(1−F)). 와이블이면 점들이 직선이 돼요."],
       ["기울기 = β","β < 1 초기, β ≈ 1 우발, β > 1 마모 고장."],
       ["η 읽기","누적 고장률 63.2%에 해당하는 시간이 특성수명 η예요."],
       ["고장 모드가 섞이면","X 모드를 분석할 때 Y·Z 모드로 고장 난 시료는 그 시간에 ‘중단’된 것으로 처리해요."]],
  tip:"와이블 선도에서 고장 점들이 설계 목표점보다 오른쪽에 찍히면 → 시험한 장치가 설계 신뢰도를 넘어선 거예요.",
  act:"weibull",
  q:[["와이블 확률지에서 특성수명 η는 누적 고장률 몇 %에서 읽나요?",["36.8%","50%","63.2%","90%"],2,"F(η) = 1 − e^(−1) ≈ 63.2%."],
     ["고장 모드 X를 와이블 분석할 때, 다른 모드 Y로 고장 난 시료는 어떻게 다루나요?",["X 고장으로 센다","데이터에서 완전히 지운다","그 고장 시간에서 중단된 시료로 처리한다","평균값으로 바꾼다"],2,"다른 모드로 빠진 시료는 X 관점에서는 ‘아직 X로는 고장 안 남’이므로 중단 데이터예요."]]}
];
const EXTRA=[
 ["l4", "반도체 소자의 고장 메커니즘을 찾기에 가장 적합한 기술은?", ["X-ray 형광 두께 측정", "전자 주사 현미경(SEM)", "오실로스코프 파형 관찰", "3차원 좌표 측정"], 1, "SEM은 미세 구조의 손상을 직접 보여 줘요."],
 ["l4", "전자 주사 현미경(SEM)의 용도는?", ["가장 가능성이 높은 고장 메커니즘 식별", "부품 무게 측정", "전압 측정", "생산량 집계"], 0, "빈출 문제예요. SEM은 고장 메커니즘을 밝히는 도구예요."],
 ["l6", "FRACAS의 주요 목표는 취해진 조치가 어떤 효과를 내도록 보장하는 것인가요?", ["부품 표준화", "수리 시간 단축", "시험 비용 절감", "고장의 재발 방지"], 3, "재발 방지가 FRACAS의 핵심 목적이에요."],
 ["l4", "고장 난 기판에 파괴 분석(DPA)을 하기 전에 신뢰성 엔지니어가 해야 할 일은?", ["기판을 세척한다", "새 기판으로 교체한다", "사진이나 그림으로 고장의 증거를 문서화한다", "납땜을 다시 한다"], 2, "고장 분석에서는 증상을 사진·스케치로 정확히 남기는 게 먼저예요."],
 ["l7", "수치 해석 대신 확률 분포(그림)를 사용하는 장점은?", ["계산이 항상 더 정확하다", "쉽게 이해할 수 있는 형태로 데이터를 보여 준다", "데이터가 필요 없다", "표본 크기가 줄어든다"], 1, "분포 그림은 한눈에 이해하기 쉬워요."],
 ["l6", "프로젝트 시작 때부터 효과적인 FRACAS를 운영하면 어떤 일에 도움이 되나요?", ["제조 전에 설계 문제 해결", "판매 가격 결정", "직원 채용", "광고 계획"], 0, "중요 기출이에요. 양산 전에 설계 결함을 잡을 수 있어요."],
 ["l1", "특정 용도에서 부품의 신뢰도를 추정하는 데 가장 유용한 데이터 출처는?", ["부품의 가속 수명 시험 결과", "일반 통계 연감", "경쟁사 광고", "부품 제조사 데이터"], 3, "제조사가 제공하는 데이터를 믿고 써야 해요. (가속 시험 결과는 자주 고르는 오답)"],
 ["l1", "회사가 내부 신뢰성 데이터를 업계 일반 데이터보다 더 가치 있게 보는 이유는 내부 정보가 무엇을 하기 때문인가요?", ["항상 더 많아서", "만들기 쉬워서", "그 회사 제품의 실제 성능을 반영해서", "공개되어 있어서"], 2, "내부 데이터는 자기 제품의 실제 성능을 보여 줘요."],
 ["l2", "시간에 대해 우측 중단(right censored)된 수명 데이터는 언제 발생하는 고장에 대한 것인가요?", ["특정 시간 이전", "현재 시간을 넘어서(아직 고장 안 남)", "시험 시작 순간", "고장과 무관"], 1, "중단 시점까지 살아 있었으니 실제 수명은 그보다 길어요. (‘특정 시간 이전’은 오답)"],
 ["l7", "팀이 프로그램 활동의 우선순위를 정할 때 도움이 되는 도구는?", ["파레토 분석", "간트 차트", "산점도", "히스토그램"], 0, "빈출이에요. 문제를 추려 개선할 것을 정해요."],
 ["l7", "총 200개 제품을 고장 날 때까지 시험했다. 고장 평가를 위해 가장 먼저 할 활동은?", ["시정조치를 실행한다", "와이블 β를 추정한다", "신뢰구간을 구한다", "고장 유형별 파레토 차트를 전개한다"], 3, "현상 파악(분류)이 최우선이에요."],
 ["l7", "파레토 분석에 대한 설명으로 맞는 것은?", ["시간에 따른 추세를 본다", "공정 능력을 계산한다", "가장 빈번하게 발생하는 부적합에 주의를 환기시킨다", "두 변수의 관계를 본다"], 2, "많이 생기는 것부터 보이게 해요."],
 ["l2", "수명 시험 후 모든 제품의 고장 시간이 분석된 경우, 그 데이터는?", ["중단", "완전", "구간", "무효"], 1, "모두 고장까지 관찰했으니 완전 데이터예요."],
 ["l6", "FRACAS의 마지막 단계는?", ["고장 재발에 대한 자료 평가", "고장 분석", "고장 보고서 작성", "부품 교체"], 0, "시정조치 후 재발 여부를 평가하며 고리를 닫아요."],
 ["l1", "특정 시점의 현장 고장 확률을 정량화하려면 어떤 무작위 시험 표본을 써야 하나요?", ["엔지니어가 손으로 만든 시제품", "반품된 고장품만", "가장 좋은 품질의 선별품", "생산 라인에서 생산 직원이 만든 유닛"], 3, "실제 고객에게 가는 것과 같은 조건의 제품이어야 해요."],
 ["l6", "빌트인 시험 장비(BIT)를 주로 사용하는 목적은?", ["생산 속도를 높인다", "제품 무게를 줄인다", "가능한 한 빨리 고장을 검출한다", "포장을 쉽게 한다"], 2, "장비 안에 측정 기능을 넣어 고장을 바로 찾아요."],
 ["l1", "정부-산업 데이터 교환 프로그램(GIDEP)은 어떤 정보의 자원인가요?", ["환율 정보", "부품 고장 데이터", "특허 정보", "인구 통계"], 1, "부품 고장·경보 정보를 공유해요."],
 ["l6", "FRACAS는 무엇을 증가시키는 신뢰성 방법인가요?", ["고객 만족", "생산 인원", "부품 수", "시험 시간"], 0, "고장이 줄어 고객 만족이 올라가요."],
 ["l1", "필드에서 보고된 고장 데이터에 대한 옳은 설명은?", ["실험실 조건을 나타낸다", "분석할 필요가 없다", "항상 완전 데이터다", "그 제품에 대한 사용자의 경험을 나타낸다"], 3, "실제 사용 환경에서의 경험이에요."],
 ["l6", "성능 데이터를 제품의 설계·개발·수명주기 전반에서 수집하는 이유는?", ["광고에 쓰려고", "보고서 분량을 늘리려고", "시정조치를 통해 제품을 개선하려고", "인원을 평가하려고"], 2, "궁극 목적은 개선이에요."],
 ["l8", "신뢰성 수명 시험에서 고장 모드 X, Y, Z가 발견됐다. X 모드를 와이블 선도에 그릴 때 Y·Z 고장은 어떻게 다루나요?", ["X 고장으로 포함한다", "각 고장 시간에서 시험 중단된 유닛으로 처리한다", "무시하고 지운다", "평균 시간으로 바꾼다"], 1, "다른 모드로 빠진 유닛은 X 관점에서 중단 데이터예요."],
 ["l2", "5개 제품 중 1번은 10시간, 4번은 40시간에 고장. 나머지 2·3·5번은 각각 40, 50, 60시간까지 시험했다. 어떤 시험인가요?", ["다중 시간 중도 절단", "정시 중단(Type Ⅰ)", "정수 중단(Type Ⅱ)", "완전 시험"], 0, "유닛마다 다른 시간에 빠졌으니 다중 중단이에요."],
 ["l6", "신뢰성 데이터 수집 프로그램의 주요 목표는?", ["시험 장비를 늘리기 위해", "보고서를 늘리기 위해", "인건비를 줄이기 위해", "제품을 개선하기 위해"], 3, "데이터는 개선을 위해 모아요."],
 ["l6", "데이터 수집·처리·보고 시스템 구축이 기업에 필수인 이유는?", ["법으로 정해져서", "비용이 안 들어서", "적절하고 유효한 데이터로 개선하기 위해", "보험 때문에"], 2, "FRACAS의 궁극적 목적은 개선이에요."],
 ["l1", "모든 제품 반품(AS 요청)에 대한 데이터 분석이 가장 중요한 이유는?", ["고객 오남용을 추적하려고", "제품 성능에 대한 즉각적인 피드백과 분석이 가능해서", "반품을 거절하려고", "재고를 줄이려고"], 1, "반품은 필드 성능을 바로 보여 주는 정보예요. (오남용 추적은 주목적이 아님)"],
 ["l2", "50개 유닛을 50시간 시험했고, 그 시점까지 고장 안 난 유닛은 시험에서 뺐다. 어떤 관측 중단인가요?", ["시간 관측 중단(정시, Type Ⅰ)", "다중 중단", "정수 중단(Type Ⅱ)", "좌측 중단"], 0, "정해진 시간에 멈췄으니 정시 중단이에요."],
 ["l5", "다음 중 비물질적 고장 모드의 예는?", ["볼트 파단", "부식", "납땜 크랙", "전자기적 간섭"], 3, "필출 문제예요. 물리적 손상 없이 생기는 고장이에요."],
 ["l5", "기계 제품에서 무른 표면이 더 단단한 표면과 상호작용하며 생긴 손상으로 고장 났다. 어떤 유형인가요?", ["크리프", "부식", "마모", "피로"], 2, "빈출이에요. 마찰로 깎이는 마모."],
 ["l8", "와이블 확률지에 그린 시험 고장 점들이 설계 목표점보다 오른쪽(긴 시간 쪽)에 있다. 해석은?", ["설계 신뢰도에 못 미친다", "시험한 장치가 설계 신뢰도를 넘어선다", "시험이 잘못됐다", "고장 모드가 섞였다"], 1, "같은 누적 고장률에서 더 오래 버텼다는 뜻이에요."],
 ["l5", "컴퓨터 하드웨어에서 일렉트로마이그레이션을 평가하는 데 쓰는 식은?", ["블랙의 방정식", "아레니우스 식만", "마이너 법칙", "듀안 모델"], 0, "블랙(Black)의 식은 전류 밀도와 온도로 일렉트로마이그레이션 수명을 나타내요."]
];
const POOL=[...L.flatMap(l=>l.q.map((q,i)=>({k:l.id+"-"+i,c:l.id,q:q[0],o:q[1],a:q[2],w:q[3]}))),...EXTRA.map((q,i)=>({k:"x"+i,c:q[0],q:q[1],o:q[2],a:q[3],w:q[4]}))];
const lname=id=>L.find(l=>l.id===id).t;

/* ───── 홈: FRACAS 고리 ───── */
const ST=[["고장 발생·보고","언제·어디서·어떤 조건에서 무엇이 고장 났는지 기록해요. 날짜·시간·장소·증상·일련번호."],["확인·격리","정말 고장인지 재현하고, 고장 난 부품을 찾아 보관해요. 증거는 사진으로!"],["고장 분석","비파괴 → 파괴 분석, SEM 등으로 고장 메커니즘과 근본 원인을 찾아요."],["시정조치","설계·공정·부품을 바꿔 근본 원인을 없애요."],["효과 확인","시정조치 뒤 같은 고장이 다시 생기는지 자료로 평가해요."],["기록·공유","데이터베이스에 남기고 FMEA·설계 기준에 반영해 고리를 닫아요."]];
let hm=0;
function homeDraw(){$("#c4hSay").innerHTML=`<span class="note">${hm+1} / 6 정거장</span><h3>${ST[hm][0]}</h3><p>${ST[hm][1]}</p><div class="qnav"><button class="btn alt" id="c4hPrev">← 이전</button><button class="btn" id="c4hNext">다음 →</button></div><p class="note">고리를 한 바퀴 돌 때마다 고장이 줄고 신뢰성이 자라요(신뢰성 성장).</p>`;
 $("#c4hPrev").onclick=()=>{hm=(hm+5)%6;homeDraw()};$("#c4hNext").onclick=()=>{hm=(hm+1)%6;homeDraw()};
 const s=$("#c4hS"),W=s.clientWidth,H=s.clientHeight;if(!W)return;const cx=W/2,cy=H/2,R=Math.min(Math.min(W,H)/2-58,(W/2-(W<520?96:150))/.866),ink=css('--ink'),sky=css('--sky'),pap=css('--paper'),sm=W<420;
 const P=ST.map((_,i)=>{const a=-Math.PI/2+i*Math.PI/3;return[cx+R*Math.cos(a),cy+R*Math.sin(a)]});
 const motion=matchMedia("(prefers-reduced-motion:reduce)").matches?"":`<circle r="9" fill="${css('--tom')}"><animateMotion dur="9s" repeatCount="indefinite" path="M${cx} ${cy-R} A${R} ${R} 0 1 1 ${cx-.01} ${cy-R}"/></circle>`;
 s.innerHTML=`<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${sky}" stroke-width="10" opacity=".35"/>`+motion+
  P.map(([x,y],i)=>`<g data-st="${i}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="${i===hm?30:24}" fill="${i===hm?css('--sun'):pap}" stroke="${ink}" stroke-width="3"/><text x="${x}" y="${y+7}" text-anchor="middle" font-family="Jua" font-size="20" fill="${ink}" style="stroke:none">${i+1}</text>
  <text x="${x+(x>cx+5?32:x<cx-5?-32:0)}" y="${y+(y<cy-R*.8?-36:y>cy+R*.8?48:5)}" text-anchor="${x>cx+5?"start":x<cx-5?"end":"middle"}" font-family="Jua" font-size="${sm?12:16}" fill="${ink}">${ST[i][0]}</text></g>`).join("")+
  `<text x="${cx}" y="${cy-6}" text-anchor="middle" font-family="Jua" font-size="${sm?22:28}" fill="${ink}">FRACAS</text><text x="${cx}" y="${cy+18}" text-anchor="middle" font-size="14" fill="${css('--soft')}">닫힌 고리</text>`;
 s.querySelectorAll("[data-st]").forEach(g=>g.onclick=()=>{hm=+g.dataset.st;homeDraw()});}
const homeRO=new ResizeObserver(homeDraw);homeRO.observe($("#c4hFig"));
let ro=null;
const ACT={
 sources(el){el.innerHTML=`<h3>활동: 내부 데이터일까, 외부 데이터일까?</h3><p>각 자료가 어디서 온 것인지 골라 보세요.</p><div class="sort" id="so"></div>`;
  sorter($("#so"),[["우리 회사 개발 시험의 고장 기록","내부"],["부품 제조사가 준 데이터시트의 고장률","외부"],["우리 제품의 보증 수리(반품) 기록","내부"],["GIDEP 부품 고장 정보","외부"],["MIL-HDBK-217 고장률 표","외부"],["우리 공장 양산 ESS 결과","내부"]],["내부","외부"]);},
 censor(el){const T=[560,1400,120,880,410,1150,340,700],RM={5:300,7:650};
  el.innerHTML=`<h3>활동: 시험을 어떻게 끝낼까?</h3><p>시료 8개의 진짜 수명은 정해져 있어요. 시험을 끝내는 방식을 바꾸면 우리가 ‘보는’ 데이터가 달라져요. <b class="hit">✕</b> 고장, <b>→</b> 중단(아직 안 고장).</p>
  <div class="chips" id="cm"><button class="chip on" data-m="c">완전 (모두 고장까지)</button><button class="chip" data-m="t">정시 중단 (500시간)</button><button class="chip" data-m="f">정수 중단 (4번째 고장)</button><button class="chip" data-m="m">다중 중단</button></div>
  <div class="units" id="cu"></div><div class="stats" id="cs"></div><p id="cn"></p>`;
  let m="c";const draw=()=>{const f4=[...T].sort((a,b)=>a-b)[3];let r=0,sum=0;
   const rows=T.map((t,i)=>{let end=t,fail=true;if(m==="t"&&t>500){end=500;fail=false}if(m==="f"&&t>f4){end=f4;fail=false}if(m==="m"&&RM[i]!=null&&RM[i]<t){end=RM[i];fail=false}if(fail)r++;sum+=end;return[end,fail]});
   const stop=m==="t"?500:m==="f"?f4:null;
   $("#cu").innerHTML=rows.map(([e,f],i)=>`<div class="unit"><span>시료 ${i+1}</span><div class="track"><i style="width:${e/1500*100}%"></i><b class="${f?"x":"s"}" style="left:${e/1500*100}%">${f?"✕":"→"}</b>${stop?`<span class="cut" style="left:${stop/1500*100}%"></span>`:""}</div></div>`).join("");
   const df=m==="t"?2*r+2:2*r;
   $("#cs").innerHTML=[[r+"개","고장 수 r"],[fmt(sum)+"h","총 시험 시간 T"],[fmt(sum/r)+"h","MTBF = T/r"],[df,"하한 χ² 자유도"]].map(([v,t])=>`<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("");
   $("#cn").innerHTML={c:"모든 시료가 고장 날 때까지 봤어요. 가장 정확하지만 시간이 가장 오래 걸려요.",t:"500시간에 멈췄어요. 살아남은 시료의 500시간도 T에 더했어요. 정시 중단이라 자유도는 <b>2r + 2</b>.",f:`4번째 고장(${f4}시간)에서 멈췄어요. 정수 중단이라 자유도는 <b>2r</b>.`,m:"시료 6은 300시간, 시료 8은 650시간에 다른 이유(다른 고장 모드, 회수)로 빠졌어요. 시간마다 다르게 빠지는 다중 중단이에요."}[m];};
  $("#cm").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;m=b.dataset.m;$$("#cm .chip").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 mtbf(el){el.innerHTML=`<h3>활동: MTBF 하한 계산기</h3><p>기출 숫자를 버튼으로 넣어 보고, 직접 바꿔 보세요.</p>
  <div class="chips"><button class="chip" data-pr="50000,4,t,0.9">기출: 50,000h · 4고장 · 정시 · 90%</button><button class="chip" data-pr="1200,4,f,0.95">기출: 1,200h · 4고장 · 정수 · 95%</button><button class="chip" data-pr="1600,10,f,0.95">기출: 1,600h · 10고장 · 정수 · 95%</button></div>
  <div class="two"><div>
   <div class="row"><label for="mT">총 시험 시간 T</label><input id="mT" type="number" min="1" value="50000"></div>
   <div class="row"><label for="mR">고장 수 r</label><input id="mR" type="number" min="0" value="4"></div>
   <div class="row"><label>중단 방식</label><span class="chips" id="mk" style="margin:0"><button class="chip on" data-k="t">정시</button><button class="chip" data-k="f">정수</button></span></div>
   <div class="row"><label for="mC">신뢰수준</label><input id="mC" type="number" min="0.5" max="0.995" step="0.01" value="0.9"></div></div>
  <div><div class="big" id="mL"></div><p id="mF"></p><div class="stats" id="mS"></div></div></div>
  <p class="note">χ² 값은 근사식(윌슨-힐퍼티)으로 계산해 표 값과 1% 안쪽으로 차이 날 수 있어요. 시험에서는 χ²표를 쓰세요.</p>`;
  let k="t";const draw=()=>{const T=Math.max(0,+$("#mT").value||0),r=Math.max(0,Math.round(+$("#mR").value||0)),C=Math.min(.995,Math.max(.5,+$("#mC").value||.9)),a=1-C,df=k==="t"?2*r+2:2*r;
   if(k==="f"&&r<1){$("#mL").textContent="—";$("#mF").textContent="정수 중단은 고장이 1개 이상 있어야 해요.";$("#mS").innerHTML="";return}
   const x=chi2(a,df),lo=2*T/x;$("#mL").textContent=`θ ≥ ${fmt(lo)}h`;
   $("#mF").innerHTML=`하한 = 2T / χ²(${f2(a)}, ${df}) = ${fmt(2*T)} / ${x.toFixed(2)} = <b>${fmt(lo)}시간</b>`;
   $("#mS").innerHTML=[[r?fmt(T/r)+"h":"—","점추정 T/r"],[df,"자유도"],[(1/lo).toExponential(2),"고장률 상한 /h"]].map(([v,t])=>`<div class="stat"><b>${v}</b><span>${t}</span></div>`).join("")};
  el.querySelectorAll("input").forEach(i=>i.oninput=draw);
  $("#mk").addEventListener("click",e=>{const b=e.target.closest("[data-k]");if(!b)return;k=b.dataset.k;$$("#mk .chip").forEach(x=>x.classList.toggle("on",x===b));draw()});
  el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{const [T,r,kk,C]=b.dataset.pr.split(",");$("#mT").value=T;$("#mR").value=r;$("#mC").value=C;k=kk;$$("#mk .chip").forEach(x=>x.classList.toggle("on",x.dataset.k===k));el.querySelectorAll("[data-pr]").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 fa(el){orderGame(el,"활동: 고장 분석 순서 맞추기","고장 난 기판이 들어왔어요. 분석 단계를 올바른 순서대로 눌러 보세요.",["증거 기록: 사진·스케치·고장 정보 정리","비파괴 검사: 외관·X-ray·전기 측정","파괴 분석: 단면·디캡(DPA)","메커니즘 규명: SEM·EDS로 미세 관찰","근본 원인과 시정조치: 보고서·FRACAS 등록"],"되돌릴 수 없는 단계는 늘 뒤쪽이에요.");},
 modes(el){el.innerHTML=`<h3>활동 1: 고장의 네 얼굴</h3><div class="sort" id="m1"></div><h3 style="margin-top:22px">활동 2: 이 메커니즘을 부르는 스트레스는?</h3><div class="sort" id="m2"></div>`;
  sorter($("#m1"),[["전원이 갑자기 완전히 나감","파국"],["LED 밝기가 몇 년에 걸쳐 어두워짐","열화"],["커넥터를 흔들면 화면이 깜빡임","간헐"],["센서 값이 조금씩 기준에서 벗어남","드리프트"]],["파국","열화","간헐","드리프트"]);
  sorter($("#m2"),[["피로 균열","반복 하중"],["크리프 변형","고온 지속 하중"],["부식","습기"],["일렉트로마이그레이션","큰 전류"],["마모","마찰"]],["반복 하중","고온 지속 하중","습기","큰 전류","마찰"]);},
 fracas(el){el.innerHTML=`<h3>활동: 고장 보고서에 적을까, 말까?</h3><p>FRACAS 고장 보고서에 꼭 들어가야 할 정보를 골라 보세요.</p><div class="sort" id="fr"></div>`;
  sorter($("#fr"),[["고장 난 날짜·시간·장소","적는다"],["고장 증상과 운전 조건","적는다"],["부품 일련번호·로트","적는다"],["담당자의 그날 기분","필요 없다"],["시정조치 내용과 효과 확인 결과","적는다"],["경쟁사 제품 가격","필요 없다"]],["적는다","필요 없다"]);},
 pareto(el){const D=[["납땜 크랙",42,12],["커넥터 접촉 불량",28,8],["팬 소음",15,30],["소프트웨어 멈춤",9,5],["케이스 균열",4,60],["기타",2,10]];
  el.innerHTML=`<h3>활동: 파레토 차트 만들기</h3><p>한 달간 필드 고장 100건이에요. 기준을 바꾸면 무엇부터 고칠지가 달라져요. 빨간 막대가 누적 80%까지의 ‘중요한 소수’예요.</p>
  <div class="chips" id="pm"><button class="chip on" data-m="n">건수 기준</button><button class="chip" data-m="c">비용 기준 (건수 × 건당 비용)</button></div><div class="par" id="pb"></div><p id="pn"></p><p class="note">예시 데이터예요. 건당 비용 단위는 만 원.</p>`;
  let m="n";const draw=()=>{const R=D.map(([n,c,u])=>({n,v:m==="n"?c:c*u,c,u})).sort((a,b)=>b.v-a.v),tot=R.reduce((a,b)=>a+b.v,0),mx=R[0].v;let cum=0;
   $("#pb").innerHTML=R.map(r=>{const before=cum;cum+=r.v;return `<div class="parr${before/tot<.8?" vf":""}"><span>${r.n}</span><div class="bar"><i style="width:${r.v/mx*100}%"></i></div><span class="v">${m==="n"?r.v+"건":fmt(r.v)} · ${Math.round(cum/tot*100)}%</span></div>`}).join("");
   $("#pn").innerHTML=m==="n"?"건수로는 <b>납땜 크랙</b>이 1위예요. 위 두 항목이 70%를 차지해요.":"비용으로 보면 <b>팬 소음</b>(15건 × 30)이 납땜 크랙과 비슷하게 올라오고, 4건뿐인 <b>케이스 균열</b>도 3위로 뛰어요. ‘재정적 충격’ 문제는 이렇게 곱해서 순위를 매겨요."};
  $("#pm").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;m=b.dataset.m;$$("#pm .chip").forEach(x=>x.classList.toggle("on",x===b));draw()});draw();},
 weibull(el){el.innerHTML=`<h3>활동: 와이블 확률지에 점 찍기</h3><p>고장 시간(시간)을 쉼표로 넣으면 메디안 랭크로 점을 찍고 직선을 맞춰 β와 η를 읽어 줘요.</p>
  <label for="wd" class="note">고장 시간</label><textarea id="wd" class="ta">310, 480, 620, 760, 880, 1020, 1200, 1460</textarea>
  <div class="chips"><button class="chip" data-pr="310, 480, 620, 760, 880, 1020, 1200, 1460">마모형 예시</button><button class="chip" data-pr="5, 18, 40, 95, 210, 480, 900, 1900">초기 고장형 예시</button><button class="chip" data-pr="120, 260, 400, 560, 750, 980, 1300, 1900">우발형 예시</button></div>
  <div class="two"><div class="fig" id="wF"><svg id="wS" role="img" aria-label="와이블 확률지"></svg></div><div><div class="stats" id="wst"></div><p id="wsay"></p></div></div>`;
  const s=$("#wS");const draw=()=>{const t=($("#wd").value.match(/[0-9]+(\.[0-9]+)?/g)||[]).map(Number).filter(v=>v>0).sort((a,b)=>a-b).slice(0,40),n=t.length;
   if(n<3){$("#wst").innerHTML="";$("#wsay").textContent="고장 시간을 3개 이상 넣어 주세요.";s.innerHTML="";return}
   const P=t.map((v,i)=>{const F=(i+1-.3)/(n+.4);return[Math.log(v),Math.log(-Math.log(1-F)),F]});
   const mx=P.reduce((a,p)=>a+p[0],0)/n,my=P.reduce((a,p)=>a+p[1],0)/n,b=P.reduce((a,p)=>a+(p[0]-mx)*(p[1]-my),0)/P.reduce((a,p)=>a+(p[0]-mx)**2,0),c=my-b*mx,eta=Math.exp(-c/b);
   $("#wst").innerHTML=[[b.toFixed(2),"모양 β (기울기)"],[fmt(eta)+"h","특성수명 η"],[(Math.exp(-((500/eta)**b))*100).toFixed(1)+"%","R(500h)"]].map(([v,tt])=>`<div class="stat"><b>${v}</b><span>${tt}</span></div>`).join("");
   $("#wsay").innerHTML=b<.95?"β < 1: <b>초기 고장</b>형이에요. 번인·ESS를 검토해요.":b<=1.15?"β ≈ 1: <b>우발 고장</b>형(지수분포에 가까움).":"β > 1: <b>마모 고장</b>형이에요. 예방 교체가 효과 있어요.";
   const W=s.clientWidth,H=s.clientHeight;if(!W)return;const a=44,bb=W-14,T=14,B=H-30,x0=Math.log(t[0])-.3,x1=Math.log(t[n-1])+.3,y0=Math.log(-Math.log(1-.02)),y1=Math.log(-Math.log(1-.98));
   const X=v=>a+(v-x0)/(x1-x0)*(bb-a),Y=v=>B-(v-y0)/(y1-y0)*(B-T),ink=css('--ink'),soft=css('--soft'),sky=css('--sky'),tom=css('--tom');
   const yt=[.05,.2,.5,.632,.9].map(F=>[Math.log(-Math.log(1-F)),F]);
   s.innerHTML=yt.map(([v,F])=>`<line x1="${a}" x2="${bb}" y1="${Y(v)}" y2="${Y(v)}" stroke="${F===.632?tom:css('--line')}" stroke-width="${F===.632?2:1}" ${F===.632?'stroke-dasharray="6 4"':""}/><text x="${a-6}" y="${Y(v)+4}" text-anchor="end" font-size="13" fill="${F===.632?tom:soft}">${(F*100).toFixed(F===.632?1:0)}%</text>`).join("")+
    `<line x1="${a}" y1="${B}" x2="${bb}" y2="${B}" stroke="${ink}" stroke-width="2"/><line x1="${a}" y1="${T}" x2="${a}" y2="${B}" stroke="${ink}" stroke-width="2"/>`+
    `<line x1="${X(x0)}" y1="${Y(b*x0+c)}" x2="${X(x1)}" y2="${Y(b*x1+c)}" stroke="${sky}" stroke-width="3"/>`+
    P.map(p=>`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="6" fill="${tom}"/>`).join("")+
    `<line x1="${X(Math.log(eta))}" x2="${X(Math.log(eta))}" y1="${Y(0)}" y2="${B}" stroke="${tom}" stroke-dasharray="4 4"/><text x="${X(Math.log(eta))}" y="${B+20}" text-anchor="middle" font-size="13" fill="${tom}">η</text>`+
    `<text x="${bb}" y="${B+20}" text-anchor="end" font-size="13" fill="${soft}">시간 (로그 눈금) →</text>`};
  $("#wd").oninput=draw;el.querySelectorAll("[data-pr]").forEach(b=>b.onclick=()=>{$("#wd").value=b.dataset.pr;draw()});
  ro=new ResizeObserver(draw);ro.observe($("#wF"));}
};
return {L,POOL,ACT,homeDraw:homeDraw,stopRO:()=>{if(ro){ro.disconnect();ro=null}}};
});
