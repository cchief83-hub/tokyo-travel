import { useState } from "react";

const TABS = [
  { id: "schedule", label: "일정표", icon: "📅" },
  { id: "hotel", label: "숙소", icon: "🏨" },
  { id: "checklist", label: "준비물", icon: "✅" },
  { id: "rental", label: "렌트카", icon: "🚗" },
  { id: "transport", label: "교통", icon: "🚃" },
  { id: "weather", label: "날씨", icon: "🌤" },
  { id: "places", label: "장소메모", icon: "📍" },
  { id: "phrase", label: "일본어", icon: "🗣" },
  { id: "docs", label: "중요서류", icon: "📄" },
  { id: "tips", label: "여행팁", icon: "💡" },
];

// 구글맵 길찾기 URL 생성
function mapDir(dest) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(dest) + "&travelmode=driving";
}
function mapSearch(q) {
  return "https://www.google.com/maps/search/" + encodeURIComponent(q);
}

const SCHEDULE = [
  {
    date: "5/15", day: "금", theme: "도착 · 가마쿠라 · 후지카와구치코",
    color: "#c8855a",
    items: [
      { time: "07:50", place: "부산 김해공항 출발", note: "에어부산 BX112 · 탑승 2시간 전 도착 권장" },
      { time: "10:00", place: "나리타 공항 도착 (T1)", note: "입국심사 · 짐 수령", map: mapSearch("成田国際空港 第1ターミナル") },
      { time: "10:30", place: "리무진버스 탑승 → 도쿄역", note: "T1 1층 버스 카운터 · 약 1시간 30분 · 어른 3,100엔" },
      { time: "12:00", place: "IX렌탈 픽업 (아사쿠사바시역)", note: "토요타 알파드 · 국제운전면허증 + 여권 필수", map: mapDir("1-16-3 Yanagibashi, Taito-ku, Tokyo") },
      { time: "13:30", place: "가마쿠라 도착 · 관광", note: "대불 · 고마치도리 · 에노덴", map: mapDir("鎌倉大仏 高徳院") },
      { time: "17:30", place: "가마쿠라 저녁식사", note: "스키야키 · 이자카야", map: mapSearch("鎌倉 小町通り レストラン") },
      { time: "19:00", place: "후지카와구치코 출발", note: "렌트카로 약 1시간 30~2시간", map: mapDir("Funatsu 3554, Fujikawaguchiko, Yamanashi") },
      { time: "21:00", place: "더 가든 체크인", note: "늦은 도착 · 숙소 사전 연락 필요", map: mapDir("Funatsu 3554, Fujikawaguchiko, Yamanashi") },
    ],
  },
  {
    date: "5/16", day: "토", theme: "후지산 관광",
    color: "#5a8fc8",
    items: [
      { time: "09:00", place: "후지산 5합목", note: "렌트카로 이동 · 맑은 날 정상 조망", map: mapDir("富士山五合目 富士スバルライン") },
      { time: "11:00", place: "오시노 핫카이 (忍野八海)", note: "후지산 용수 연못 · 세계문화유산", map: mapDir("忍野八海") },
      { time: "13:00", place: "점심식사", note: "카와구치코 호수 주변 식당", map: mapSearch("河口湖 ランチ") },
      { time: "15:00", place: "가와구치코 유람선", note: "호수에서 후지산 조망 · 약 20분", map: mapDir("河口湖遊覧船 天晴") },
      { time: "17:00", place: "온센 거리 산책 · 쇼핑", note: "카와구치코 기념품", map: mapSearch("河口湖 温泉街") },
      { time: "19:00", place: "저녁식사", note: "숙소 또는 근처 식당", map: mapSearch("富士河口湖 夕食 レストラン") },
    ],
  },
  {
    date: "5/17", day: "일", theme: "후지산 → 도쿄 이동",
    color: "#7a5ac8",
    items: [
      { time: "09:00", place: "더 가든 체크아웃", note: "짐 정리 · 렌트카 출발 준비", map: mapSearch("Funatsu 3554, Fujikawaguchiko") },
      { time: "09:30", place: "가와구치코 호수 산책", note: "마지막 후지산 조망", map: mapDir("河口湖") },
      { time: "11:00", place: "도쿄 방면 출발", note: "아사쿠사바시역 방면 · 약 2시간" },
      { time: "13:00", place: "IX렌탈 반납 (아사쿠사바시역)", note: "동일 지점 반납", map: mapDir("1-16-3 Yanagibashi, Taito-ku, Tokyo") },
      { time: "13:30", place: "지하철로 긴시쵸역 이동", note: "JR 소부선 · 약 10분 · 230엔", map: mapDir("錦糸町駅") },
      { time: "14:00", place: "롯데 시티 호텔 체크인", note: "짐 맡기고 도쿄 관광 시작!", map: mapDir("4-6-1 Kinshi, Sumida-ku, Tokyo") },
      { time: "15:00", place: "도쿄 관광", note: "아사쿠사 · 스카이트리 · 우에노", map: mapDir("浅草寺") },
      { time: "19:00", place: "저녁식사", note: "아사쿠사 이자카야", map: mapSearch("浅草 居酒屋") },
    ],
  },
  {
    date: "5/18", day: "월", theme: "오다이바 · 긴자",
    color: "#5ac88a",
    items: [
      { time: "10:00", place: "오다이바 해변공원", note: "자유의 여신상 · 레인보우브리지 산책", map: mapDir("お台場海浜公園") },
      { time: "13:00", place: "다이버시티 도쿄", note: "쇼핑 · 점심식사", map: mapDir("ダイバーシティ東京プラザ") },
      { time: "16:00", place: "긴자 산책", note: "백화점 면세 쇼핑 · 마지막 기념품", map: mapDir("銀座") },
      { time: "19:00", place: "도쿄역 주변 야경", note: "마루노우치 일루미네이션", map: mapDir("東京駅 丸の内") },
    ],
  },
  {
    date: "5/19", day: "화", theme: "귀국일",
    color: "#c8855a",
    items: [
      { time: "07:30", place: "롯데 시티 호텔 체크아웃", note: "짐 챙기기", map: mapDir("4-6-1 Kinshi, Sumida-ku, Tokyo") },
      { time: "08:00", place: "나리타 공항 이동", note: "리무진버스 약 70~90분 · 여유있게 출발", map: mapDir("成田国際空港") },
      { time: "10:55", place: "나리타 공항 출발 (T1)", note: "에어부산 BX111" },
      { time: "13:15", place: "부산 김해공항 도착", note: "입국 후 귀가" },
    ],
  },
];

const CHECKLIST_GROUPS = [
  { title: "서류 · 결제", color: "#e06b5a", items: ["여권 (4명 모두)","국제운전면허증 (1949년 협약 IDP)","항공권 출력 또는 앱","숙소 예약 확인서 (2곳)","렌트카 바우처 (클룩)","여행자보험 서류","신용카드 / 현금 엔화","교통카드 (스이카)"] },
  { title: "의류 · 신발", color: "#5a8fc8", items: ["반팔 티셔츠","얇은 가디건 또는 바람막이","편한 운동화","접이식 우산","선크림 SPF50+","모자"] },
  { title: "부모님 건강 · 의약품", color: "#5ac88a", items: ["평소 복용 약 (5일분+여유)","두통약","지사제 / 소화제","반창고 세트","파스 (이동 대비)","마스크"] },
  { title: "전자기기", color: "#a07ac8", items: ["스마트폰 충전기 (4개)","보조배터리","멀티어댑터 (일본 110V A타입)","이어폰"] },
];

const WEATHER = [
  { date: "5/15", day: "금", icon: "⛅", high: 23, low: 17, desc: "흐림" },
  { date: "5/16", day: "토", icon: "☀", high: 25, low: 18, desc: "맑음" },
  { date: "5/17", day: "일", icon: "☀", high: 26, low: 19, desc: "맑음" },
  { date: "5/18", day: "월", icon: "🌦", high: 22, low: 17, desc: "일부 비" },
  { date: "5/19", day: "화", icon: "⛅", high: 21, low: 16, desc: "흐림" },
];

const PLACES = {
  식당: [
    { name: "후쿠다 天ぷら", area: "아사쿠사", note: "런치 세트 1,800엔 · 뎀뿌라 맛집", mapQ: "天ぷら福田 浅草" },
    { name: "이치란 라멘 一蘭", area: "신주쿠", note: "24시간 · 칸막이 좌석", mapQ: "一蘭 新宿" },
    { name: "츠키지 식당가", area: "츠키지", note: "해산물 · 아침식사 추천", mapQ: "築地場外市場" },
    { name: "긴자 스시", area: "긴자", note: "런치 오마카세 · 예약 권장", mapQ: "銀座 寿司 おまかせ" },
  ],
  관광지: [
    { name: "센소지 浅草寺", area: "아사쿠사", note: "무료 입장 · 이른 아침 추천", mapQ: "浅草寺" },
    { name: "신주쿠 교엔 新宿御苑", area: "신주쿠", note: "입장료 500엔 · 산책 최적", mapQ: "新宿御苑" },
    { name: "도쿄 도청 전망대", area: "신주쿠", note: "무료 · 202m · 후지산 조망", mapQ: "東京都庁展望台" },
    { name: "오다이바 해변공원", area: "오다이바", note: "레인보우브리지 야경 필수", mapQ: "お台場海浜公園" },
  ],
  쇼핑: [
    { name: "마츠모토키요시", area: "아사쿠사", note: "드럭스토어 · 면세 가능", mapQ: "マツモトキヨシ 浅草" },
    { name: "돈키호테 ドン・キホーテ", area: "신주쿠", note: "24시간 · 기념품 저렴", mapQ: "ドン・キホーテ 新宿" },
    { name: "아메요코 시장 アメ横", area: "우에노", note: "건어물 · 과자 · 화장품", mapQ: "アメ横" },
  ],
};

const PHRASES = [
  { cat: "기본 인사", items: [
    { jp: "ありがとうございます", roma: "아리가또 고자이마스", kr: "감사합니다" },
    { jp: "すみません", roma: "스미마셍", kr: "저기요 / 실례합니다" },
    { jp: "はい / いいえ", roma: "하이 / 이이에", kr: "네 / 아니요" },
    { jp: "わかりません", roma: "와카리마셍", kr: "모르겠습니다" },
  ]},
  { cat: "식당에서", items: [
    { jp: "これをください", roma: "고레오 구다사이", kr: "이것 주세요" },
    { jp: "おいしい！", roma: "오이시이!", kr: "맛있어요!" },
    { jp: "お会計をお願いします", roma: "오카이케이오 오네가이시마스", kr: "계산해 주세요" },
    { jp: "カードで払えますか？", roma: "카도데 하라에마스카?", kr: "카드 결제 되나요?" },
  ]},
  { cat: "길찾기 · 긴급", items: [
    { jp: "トイレはどこですか？", roma: "토이레와 도코데스카?", kr: "화장실 어디인가요?" },
    { jp: "～まで行きたいです", roma: "~마데 이키타이데스", kr: "~까지 가고 싶어요" },
    { jp: "写真を撮ってもいいですか？", roma: "샤신오 톳테모 이이데스카?", kr: "사진 찍어도 되나요?" },
    { jp: "助けてください！", roma: "타스케테 구다사이!", kr: "도와주세요!" },
  ]},
];

const GF = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap";

export default function TokyoApp() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [checks, setChecks] = useState({});
  const [expandedDay, setExpandedDay] = useState(0);
  const [placeTab, setPlaceTab] = useState("식당");
  const [phraseOpen, setPhraseOpen] = useState({ 0: true, 1: true, 2: true });

  const toggleCheck = (gi, ii) => {
    const key = gi + "-" + ii;
    setChecks(p => ({ ...p, [key]: !p[key] }));
  };

  const totalItems = CHECKLIST_GROUPS.reduce((s, g) => s + g.items.length, 0);
  const checkedCount = Object.values(checks).filter(Boolean).length;

  const css = `
    @import url('${GF}');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .app { font-family: 'DM Sans', sans-serif; background: #f5f2ed; min-height: 100vh; color: #1a1612; max-width: 680px; margin: 0 auto; }
    .hero { background: #1a1612; padding: 36px 24px 28px; position: relative; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 80% 20%, rgba(200,133,90,0.25) 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, rgba(90,143,200,0.2) 0%, transparent 50%); pointer-events: none; }
    .hero-jp { font-family: 'Noto Serif JP', serif; font-size: 11px; letter-spacing: 0.3em; color: rgba(255,255,255,0.35); margin-bottom: 10px; text-transform: uppercase; }
    .hero-title { font-family: 'Noto Serif JP', serif; font-size: 36px; font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 6px; }
    .hero-sub { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); margin-bottom: 20px; letter-spacing: 0.05em; }
    .pill-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .pill { font-size: 12px; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); font-weight: 400; letter-spacing: 0.04em; }
    .tab-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; background: #1a1612; padding: 2px; }
    .tab-btn { padding: 10px 4px; border: none; cursor: pointer; text-align: center; transition: all 0.2s; background: #2a2420; color: rgba(255,255,255,0.4); }
    .tab-btn.active { background: #f5f2ed; color: #1a1612; }
    .tab-icon { font-size: 15px; margin-bottom: 3px; }
    .tab-label { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; }
    .body { padding: 20px; }
    .section-title { font-family: 'Noto Serif JP', serif; font-size: 11px; letter-spacing: 0.25em; color: rgba(26,22,18,0.4); text-transform: uppercase; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid rgba(26,22,18,0.1); }
    .card { background: #fff; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .card-label { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(26,22,18,0.4); margin-bottom: 14px; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; padding: 9px 0; border-bottom: 1px solid rgba(26,22,18,0.06); gap: 16px; }
    .row:last-child { border-bottom: none; padding-bottom: 0; }
    .row-l { font-size: 12px; color: rgba(26,22,18,0.45); flex-shrink: 0; min-width: 90px; line-height: 1.5; }
    .row-r { font-size: 13px; color: #1a1612; font-weight: 500; text-align: right; line-height: 1.5; }
    .tag { display: inline-block; font-size: 10px; padding: 3px 9px; border-radius: 20px; font-weight: 600; letter-spacing: 0.04em; }
    .link-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; padding: 9px 16px; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none; letter-spacing: 0.03em; transition: opacity 0.15s; }
    .link-btn:hover { opacity: 0.8; }
    .day-btn { width: 100%; display: flex; justify-content: space-between; align-items: center; background: none; border: none; cursor: pointer; padding: 0; text-align: left; }
    .day-date { font-family: 'DM Mono', monospace; font-size: 18px; font-weight: 500; line-height: 1; }
    .day-day { font-size: 11px; color: rgba(26,22,18,0.4); margin-top: 2px; letter-spacing: 0.08em; }
    .day-theme { font-size: 12px; color: rgba(26,22,18,0.5); margin-top: 4px; }
    .day-arrow { font-size: 12px; color: rgba(26,22,18,0.3); transition: transform 0.2s; }
    .day-arrow.open { transform: rotate(180deg); }
    .timeline { padding-top: 14px; }
    .tl-item { display: flex; gap: 14px; margin-bottom: 14px; position: relative; }
    .tl-item:last-child { margin-bottom: 0; }
    .tl-time { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(26,22,18,0.35); min-width: 38px; padding-top: 2px; }
    .tl-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
    .tl-place { font-size: 13px; font-weight: 600; color: #1a1612; line-height: 1.4; }
    .tl-note { font-size: 11px; color: rgba(26,22,18,0.45); margin-top: 3px; line-height: 1.5; }
    .check-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(26,22,18,0.06); cursor: pointer; transition: opacity 0.15s; }
    .check-row:last-child { border-bottom: none; }
    .check-row:hover { opacity: 0.75; }
    .checkbox { width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; transition: all 0.15s; }
    .check-text { font-size: 13px; font-weight: 400; color: #1a1612; transition: all 0.15s; }
    .check-text.done { color: rgba(26,22,18,0.3); text-decoration: line-through; }
    .progress-track { height: 3px; background: rgba(26,22,18,0.08); border-radius: 2px; margin-bottom: 20px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
    .w-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
    .w-card { border-radius: 10px; padding: 12px 6px; text-align: center; border: 1px solid rgba(26,22,18,0.08); }
    .w-date { font-size: 10px; color: rgba(26,22,18,0.4); margin-bottom: 6px; font-family: 'DM Mono', monospace; letter-spacing: 0.04em; }
    .w-icon { font-size: 22px; margin-bottom: 6px; }
    .w-temp { font-size: 12px; font-weight: 600; color: #1a1612; }
    .w-desc { font-size: 10px; color: rgba(26,22,18,0.4); margin-top: 3px; }
    .place-tab-row { display: flex; gap: 6px; margin-bottom: 16px; }
    .place-tab-btn { padding: 6px 16px; border-radius: 20px; border: 1px solid rgba(26,22,18,0.15); background: transparent; color: rgba(26,22,18,0.5); font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
    .place-tab-btn.active { background: #1a1612; color: #fff; border-color: #1a1612; }
    .place-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(26,22,18,0.06); cursor: pointer; transition: opacity 0.15s; }
    .place-item:last-child { border-bottom: none; }
    .place-item:hover { opacity: 0.7; }
    .place-name { font-size: 13px; font-weight: 600; color: #1a1612; }
    .place-note { font-size: 11px; color: rgba(26,22,18,0.45); margin-top: 3px; }
    .place-map { font-size: 11px; color: rgba(26,22,18,0.3); }
    .phrase-cat { font-size: 10px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(26,22,18,0.35); margin-bottom: 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
    .phrase-jp { font-family: 'Noto Serif JP', serif; font-size: 16px; font-weight: 600; color: #1a1612; margin-bottom: 4px; }
    .phrase-roma { font-family: 'DM Mono', monospace; font-size: 11px; color: #c8855a; margin-bottom: 3px; }
    .phrase-kr { font-size: 12px; color: rgba(26,22,18,0.5); }
    .phrase-item { padding: 12px 0; border-bottom: 1px solid rgba(26,22,18,0.06); }
    .phrase-item:last-child { border-bottom: none; }
    .step-item { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(26,22,18,0.06); }
    .step-item:last-child { border-bottom: none; }
    .step-icon { font-size: 20px; min-width: 28px; }
    .step-num { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 3px; }
    .step-title { font-size: 13px; font-weight: 600; color: #1a1612; margin-bottom: 3px; }
    .step-desc { font-size: 11px; color: rgba(26,22,18,0.5); line-height: 1.6; }
    .doc-ticket { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(26,22,18,0.06); }
    .doc-ticket:last-child { border-bottom: none; }
    .toilet-item { display: flex; gap: 14px; padding: 10px 0; border-bottom: 1px solid rgba(26,22,18,0.06); align-items: flex-start; }
    .toilet-item:last-child { border-bottom: none; }
    .toilet-num { width: 26px; height: 26px; border-radius: 50%; background: #1a1612; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .warn-card { background: #fff9f0; border: 1px solid rgba(200,133,90,0.3); border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; }
    .info-card { background: #f0f6ff; border: 1px solid rgba(90,143,200,0.25); border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; }
    .mono { font-family: 'DM Mono', monospace; }
  `;

  function Card({ children, className, style }) {
    return <div className={className || "card"} style={style}>{children}</div>;
  }

  function Row({ l, v, hot }) {
    return (
      <div className="row">
        <span className="row-l">{l}</span>
        <span className="row-r" style={hot ? { color: "#c8855a" } : {}}>{v}</span>
      </div>
    );
  }

  function LinkBtn({ href, color, children }) {
    var bg = color === "green" ? "#e8f4ea" : color === "blue" ? "#eef3fb" : color === "warm" ? "#fdf3ec" : "#fdf3ec";
    var tc = color === "green" ? "#2e7d32" : color === "blue" ? "#3a6aaa" : "#b06030";
    return (
      <a href={href} target="_blank" rel="noreferrer" className="link-btn" style={{ background: bg, color: tc }}>
        {children}
      </a>
    );
  }

  function renderSchedule() {
    return (
      <div>
        <div className="section-title">여행 일정 — 5박 5일</div>
        {SCHEDULE.map((day, di) => (
          <Card key={di}>
            <button className="day-btn" onClick={() => setExpandedDay(expandedDay === di ? -1 : di)}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div>
                  <div className="day-date" style={{ color: day.color }}>{day.date} <span style={{ fontSize: 13 }}>{day.day}</span></div>
                </div>
                <div>
                  <div className="card-label" style={{ marginBottom: 2 }}>DAY {di + 1}</div>
                  <div className="day-theme">{day.theme}</div>
                </div>
              </div>
              <div className={"day-arrow" + (expandedDay === di ? " open" : "")}>▼</div>
            </button>
            {expandedDay === di && (
              <div className="timeline">
                {day.items.map((item, ii) => (
                  <div key={ii} className="tl-item">
                    <span className="tl-time">{item.time}</span>
                    <div className="tl-dot" style={{ background: day.color }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                        <div className="tl-place">{item.place}</div>
                        {item.map && (
                          <a href={item.map} target="_blank" rel="noreferrer"
                            style={{ flexShrink: 0, fontSize: 10, padding: "3px 8px", borderRadius: 12, background: "#e8f4ea", color: "#2e7d32", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
                            🗺 길찾기
                          </a>
                        )}
                      </div>
                      {item.note && <div className="tl-note">{item.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  }

  function renderHotel() {
    return (
      <div>
        <div className="section-title">숙소 정보</div>
        <Card>
          <div className="card-label" style={{ color: "#5a8fc8" }}>더 가든 · THE GARDEN</div>
          <div className="tag" style={{ background: "#eef3fb", color: "#3a6aaa", marginBottom: 14 }}>5/15 ~ 5/17 · 2박</div>
          <Row l="예약처" v="여기어때" />
          <Row l="공급사 예약번호" v="1691545792" />
          <Row l="주소" v="Funatsu 3554, Fujikawaguchiko 401-0301" />
          <Row l="전화" v="81-555-285677" />
          <Row l="체크인" v="5/15 (금) 15:00" />
          <Row l="체크아웃" v="5/17 (일) 11:00" />
          <Row l="객실" v="Deluxe Mountain View Room" />
          <Row l="결제" v="전액 사전결제 완료" />
          <Row l="취소 정책" v="5/14 이전 무료취소 가능" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <LinkBtn href="https://drive.google.com/file/d/1zFcbuZs0LEzj_0Ae_4WR_WziA65W788Q/view?usp=drivesdk" color="blue">📄 예약확인서 보기</LinkBtn>
            <LinkBtn href="https://www.google.com/maps/dir/?api=1&destination=Funatsu+3554+Fujikawaguchiko+Yamanashi&travelmode=driving" color="green">🗺 길찾기</LinkBtn>
          </div>
        </Card>
        <Card>
          <div className="card-label" style={{ color: "#c8855a" }}>롯데 시티 호텔 킨시쵸 도쿄</div>
          <div className="tag" style={{ background: "#fdf3ec", color: "#b06030", marginBottom: 14 }}>5/17 ~ 5/19 · 2박</div>
          <Row l="예약처" v="여기어때 (최저가보장)" />
          <Row l="주소" v="4-6-1 Kinshi, Sumida-ku, Tokyo 130-0013" />
          <Row l="전화" v="+81-3-5619-1066" />
          <Row l="체크인" v="5/17 (일) 15:00" />
          <Row l="체크아웃" v="5/19 (화) 11:00" />
          <Row l="객실" v="Standard Deluxe Twin (금연)" />
          <Row l="가까운 역" v="긴시초역 5번 출구 바로 연결" />
          <Row l="부대시설" v="2F Bulks Gym 무료 (24시간)" />
          <Row l="결제" v="전액 사전결제 (환불 불가)" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <LinkBtn href="https://drive.google.com/file/d/1MWGAx0Nmv1fENrJnJrKajJ6-QuR8QdkN/view?usp=drivesdk" color="warm">📄 예약확인서 보기</LinkBtn>
            <LinkBtn href="https://www.google.com/maps/dir/?api=1&destination=4-6-1+Kinshi+Sumida-ku+Tokyo&travelmode=driving" color="green">🗺 길찾기</LinkBtn>
          </div>
        </Card>
        <div className="info-card">
          <div className="card-label" style={{ marginBottom: 8 }}>체크인 공통 안내</div>
          <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.9 }}>
            체크인 시 <strong>예약확인서(Voucher) + 여권</strong> 제시 필수<br />
            신용카드 보증금 요청될 수 있음 (실제 청구 아님)<br />
            여기어때 고객센터 <strong>+82-1670-6250</strong> (09:00~03:00 KST)
          </div>
        </div>
      </div>
    );
  }

  function renderChecklist() {
    return (
      <div>
        <div className="section-title">여행 준비물 체크리스트</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: "rgba(26,22,18,0.45)" }}>전체 진행률</span>
          <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{checkedCount} / {totalItems}</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: Math.round(checkedCount / totalItems * 100) + "%", background: "linear-gradient(90deg, #c8855a, #e0a070)" }} />
        </div>
        {CHECKLIST_GROUPS.map((g, gi) => (
          <Card key={gi}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div className="card-label" style={{ color: g.color, marginBottom: 0 }}>{g.title}</div>
              <span className="tag" style={{ background: g.color + "18", color: g.color }}>
                {g.items.filter((_, ii) => checks[gi + "-" + ii]).length} / {g.items.length}
              </span>
            </div>
            {g.items.map((item, ii) => {
              var done = !!checks[gi + "-" + ii];
              return (
                <div key={ii} className="check-row" onClick={() => toggleCheck(gi, ii)}>
                  <div className="checkbox" style={{ background: done ? g.color : "transparent", border: done ? "none" : "1.5px solid rgba(26,22,18,0.2)" }}>
                    {done && <span style={{ color: "#fff" }}>✓</span>}
                  </div>
                  <span className={"check-text" + (done ? " done" : "")}>{item}</span>
                </div>
              );
            })}
          </Card>
        ))}
      </div>
    );
  }

  function renderRental() {
    return (
      <div>
        <div className="section-title">렌트카 정보</div>
        <div className="warn-card">
          <div className="card-label" style={{ color: "#b06030", marginBottom: 6 }}>국제운전면허증 필수</div>
          <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.8 }}>일본은 국제운전면허증(IDP) 필수. 1949년 협약 형식만 인정. 한국 면허증만으로는 운전 불가. 출발 전 반드시 발급!</div>
        </div>
        <Card>
          <div className="card-label" style={{ color: "#3a8a5a" }}>예약 차량 — 확정</div>
          <Row l="업체" v="IX RENTAL (아이엑스 렌탈)" />
          <Row l="차량" v="토요타 알파드 (밴, 7인승)" />
          <Row l="클룩 예약번호" v="UZV451629" />
          <Row l="확정번호" v="R798425183766597" />
          <Row l="대여" v="2026년 5월 15일 (금) 12:00" />
          <Row l="반납" v="2026년 5월 17일 (일) 12:00" />
          <Row l="요금" v="US$ 171.15 (전액 결제)" />
          <Row l="운전자 추가" v="1인 무료" />
          <Row l="주행거리" v="무제한" />
          <Row l="연료" v="Full to Full" />
          <Row l="무료 취소" v="5월 14일 12:00 이전" />
          <Row l="보험" v="어드밴스드 플러스 (CDW · TPL · NOC)" />
          <Row l="업체 연락처" v="+81-03-5809-3228" />
          <Row l="카카오" v="+8108032261688" />
          <LinkBtn href="https://drive.google.com/file/d/1Kb3NsJzCFhcYkMZRV73uq2vDeq08ZydE/view?usp=drivesdk" color="green">렌트카 바우처 보기</LinkBtn>
        </Card>
        <Card>
          <div className="card-label">대여 · 반납 위치</div>
          <Row l="장소" v="IX렌탈 아사쿠사바시역점" />
          <Row l="주소" v="1-16-3 Yanagibashi, Taito-ku, Tokyo 111-0053" />
          <Row l="대여→반납" v="동일 지점 (편도 수수료 없음)" />
          <Row l="영업시간" v="08:00~20:00 무료 / 20:01~21:00 +3,000엔" />
          <Row l="오시는 길" v="동쪽 출구 → 50m → 우회전 → 150m" />
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <LinkBtn href="https://maps.app.goo.gl/iJ9aTQE9UvKXZUfDA" color="blue">📍 위치 보기</LinkBtn>
            <LinkBtn href="https://www.google.com/maps/dir/?api=1&destination=1-16-3+Yanagibashi+Taito-ku+Tokyo&travelmode=transit" color="green">🗺 길찾기</LinkBtn>
          </div>
        </Card>
        <Card>
          <div className="card-label">픽업 시 필수 지참</div>
          <Row l="여권" v="픽업하는 모든 운전자 원본" />
          <Row l="운전면허증" v="한국 운전면허증 원본" />
          <Row l="국제운전면허증" v="1949년 협약 IDP 원본" />
          <Row l="현장 추가" v="ETC 카드 · GPS · 카시트 구매 가능" />
        </Card>
        <Card>
          <div className="card-label">일본 운전 주의사항</div>
          <Row l="통행 방향" v="좌측통행 (한국과 반대)" />
          <Row l="고속도로" v="ETC 카드 또는 현금" />
          <Row l="주유" v="셀프 주유 많음 (セルフ)" />
          <Row l="내비" v="구글맵 또는 Yahoo! カーナビ" />
        </Card>
      </div>
    );
  }

  function renderTransport() {
    var steps = [
      { icon: "✈", num: "STEP 1", title: "나리타 T1 도착 (10:00)", desc: "입국심사 · 짐 수령 후 1층으로 이동" },
      { icon: "🚌", num: "STEP 2", title: "리무진버스 탑승 → 도쿄역", desc: "T1 1층 버스 카운터 · 약 1시간 30분 · 어른 3,100엔 / 어린이 1,550엔" },
      { icon: "🚇", num: "STEP 3", title: "도쿄역 → 아사쿠사바시역", desc: "JR 소부선 · 약 10분 · 230엔" },
      { icon: "🚗", num: "STEP 4", title: "IX렌탈 픽업 (12:00)", desc: "아사쿠사바시역 동쪽 출구 도보 5분 · 국제운전면허증 + 여권 지참" },
    ];
    return (
      <div>
        <div className="section-title">이동 경로 안내</div>
        <Card>
          <div className="card-label" style={{ color: "#c8855a" }}>나리타 → IX렌탈 아사쿠사바시 (5/15)</div>
          {steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-icon">{step.icon}</div>
              <div>
                <div className="step-num" style={{ color: "#c8855a" }}>{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card>
          <div className="card-label" style={{ color: "#5a8fc8" }}>렌트카 반납 → 롯데 시티 호텔 (5/17)</div>
          <Row l="반납" v="IX렌탈 아사쿠사바시역점" />
          <Row l="이동" v="JR 소부선 탑승" />
          <Row l="도착" v="긴시쵸역 약 10분 · 230엔" />
          <Row l="숙소까지" v="긴시쵸역 5번 출구 → 롯데 시티 호텔 도보 1분" />
        </Card>
        <Card>
          <div className="card-label">귀국일 나리타 이동 (5/19)</div>
          <Row l="출발지" v="롯데 시티 호텔 킨시쵸" />
          <Row l="이동" v="리무진버스 (도쿄역 경유)" />
          <Row l="소요시간" v="약 70~90분" />
          <Row l="출발 권장" v="BX111 10:55 기준 → 08:00 이전" />
        </Card>
        <Card>
          <div className="card-label">IC 카드 (스이카 / 파스모)</div>
          <Row l="구입" v="공항 · 역 자동판매기" />
          <Row l="초기 충전 권장" v="1인당 3,000~5,000엔" />
          <Row l="보증금" v="500엔 (귀국 시 환불)" />
          <Row l="사용처" v="전철 · 버스 · 편의점 · 자판기" />
        </Card>
        <Card>
          <div className="card-label">유용한 앱</div>
          <Row l="Google Maps" v="대중교통 경로 · 매우 정확" />
          <Row l="乗換案内" v="일본 전철 환승 특화" />
          <Row l="Yahoo! カーナビ" v="렌트카 내비용" />
          <Row l="Google 번역" v="카메라 번역 기능 유용" />
        </Card>
      </div>
    );
  }

  function renderWeather() {
    return (
      <div>
        <div className="section-title">도쿄 예상 날씨</div>
        <Card>
          <div className="w-grid">
            {WEATHER.map((w, i) => (
              <div key={i} className="w-card" style={{ background: (i === 1 || i === 2) ? "#fffbf7" : "#fafafa", borderColor: (i === 1 || i === 2) ? "rgba(200,133,90,0.25)" : "rgba(26,22,18,0.08)" }}>
                <div className="w-date">{w.date}<br />{w.day}</div>
                <div className="w-icon">{w.icon}</div>
                <div className="w-temp">{w.high}° / {w.low}°</div>
                <div className="w-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="card-label">5월 도쿄 날씨 특징</div>
          <Row l="평균 기온" v="낮 22~26°C / 밤 15~18°C" />
          <Row l="강수 가능성" v="비교적 낮음 (우기 전)" />
          <Row l="준비물" v="얇은 겉옷 · 접이식 우산" />
          <Row l="자외선" v="강함 — 선크림 필수" />
        </Card>
      </div>
    );
  }

  function renderPlaces() {
    function openMap(q) { window.open("https://www.google.com/maps/search/" + encodeURIComponent(q), "_blank"); }
    return (
      <div>
        <div className="section-title">가고 싶은 장소</div>
        <div className="place-tab-row">
          {Object.keys(PLACES).map(k => (
            <button key={k} className={"place-tab-btn" + (placeTab === k ? " active" : "")} onClick={() => setPlaceTab(k)}>{k}</button>
          ))}
        </div>
        <Card>
          {PLACES[placeTab].map((p, i) => (
            <div key={i} className="place-item" onClick={() => openMap(p.mapQ)}>
              <div>
                <div className="place-name">{p.name}</div>
                <div className="place-note">{p.note}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0, marginLeft: 12 }}>
                <span className="tag" style={{ background: "#eef3fb", color: "#3a6aaa" }}>{p.area}</span>
                <span className="place-map">지도 →</span>
              </div>
            </div>
          ))}
        </Card>
        <p style={{ fontSize: 11, color: "rgba(26,22,18,0.3)", textAlign: "center", marginTop: 8 }}>장소를 탭하면 구글 지도가 열립니다</p>
      </div>
    );
  }

  function renderPhrase() {
    return (
      <div>
        <div className="section-title">자주 쓰는 일본어</div>
        {PHRASES.map((group, gi) => {
          var open = phraseOpen[gi] !== false;
          return (
            <Card key={gi}>
              <div className="phrase-cat" onClick={() => setPhraseOpen(p => ({ ...p, [gi]: !open }))}>
                <span>{group.cat}</span>
                <span style={{ fontSize: 10 }}>{open ? "▲" : "▼"}</span>
              </div>
              {open && group.items.map((item, ii, a) => (
                <div key={ii} className="phrase-item" style={{ paddingTop: ii === 0 ? 0 : 12, borderTop: ii === 0 ? "none" : "1px solid rgba(26,22,18,0.06)", borderBottom: "none" }}>
                  <div className="phrase-jp">{item.jp}</div>
                  <div className="phrase-roma">{item.roma}</div>
                  <div className="phrase-kr">{item.kr}</div>
                </div>
              ))}
            </Card>
          );
        })}
      </div>
    );
  }

  function renderDocs() {
    return (
      <div>
        <div className="section-title">중요 서류 모음</div>
        <Card>
          <div className="card-label" style={{ color: "#5a8fc8" }}>가는 편</div>
          <div className="tag" style={{ background: "#eef3fb", color: "#3a6aaa", marginBottom: 14 }}>5/15 (금) · BX 112</div>
          <Row l="항공사" v="에어부산 (Air Busan)" />
          <Row l="출발" v="부산 김해 (PUS) 07:50" />
          <Row l="도착" v="나리타 (NRT) T1 10:00" />
          <Row l="예약번호 (항공사)" v="KDELAW" />
          <Row l="예약번호 (여행사)" v="EESHHV" />
          <Row l="클래스" v="일반석 (D)" />
        </Card>
        <Card>
          <div className="card-label" style={{ color: "#c8855a" }}>오는 편</div>
          <div className="tag" style={{ background: "#fdf3ec", color: "#b06030", marginBottom: 14 }}>5/19 (화) · BX 111</div>
          <Row l="항공사" v="에어부산 (Air Busan)" />
          <Row l="출발" v="나리타 (NRT) T1 10:55" />
          <Row l="도착" v="부산 김해 (PUS) 13:15" />
          <Row l="예약번호 (항공사)" v="KDSLAW" />
          <Row l="예약번호 (여행사)" v="EESHHV" />
        </Card>
        <Card>
          <div className="card-label">탑승객 4명 — 이티켓</div>
          {[
            ["KIM / YOUNGDEOK MR", "https://drive.google.com/file/d/13A5LBjiUUtxEr0CxKY1WOx9Xb_XZBm6B/view?usp=drivesdk"],
            ["KIM / HONGGWON MR", "https://drive.google.com/file/d/1PNT8JPpSNm6SlP2VD4AcTi-uzQWlTC-E/view?usp=drivesdk"],
            ["CHOI / JUNGLIM MS", "https://drive.google.com/file/d/120IOzF53Hcm3E5kyITcm7GEau1RI5Rie/view?usp=drivesdk"],
            ["KIM / SIEUN MISS CHD", "https://drive.google.com/file/d/1o3yzX010C0qXRAiZMS8i-nvlQeTzL0Qu/view?usp=drivesdk"],
          ].map((r, i, a) => (
            <div key={i} className="doc-ticket">
              <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1612" }}>{r[0]}</span>
              <a href={r[1]} target="_blank" rel="noreferrer" className="tag" style={{ background: "#fdf3ec", color: "#b06030", textDecoration: "none", flexShrink: 0 }}>티켓 보기</a>
            </div>
          ))}
        </Card>
        <Card>
          <div className="card-label">바우처 모음</div>
          {[
            { name: "더 가든 — 숙소 바우처", sub: "5/15~5/17 · 2박", url: "https://drive.google.com/file/d/1zFcbuZs0LEzj_0Ae_4WR_WziA65W788Q/view?usp=drivesdk", color: "#3a6aaa", bg: "#eef3fb" },
            { name: "롯데 시티 호텔 — 숙소 바우처", sub: "5/17~5/19 · 2박", url: "https://drive.google.com/file/d/1MWGAx0Nmv1fENrJnJrKajJ6-QuR8QdkN/view?usp=drivesdk", color: "#b06030", bg: "#fdf3ec" },
            { name: "IX렌탈 — 렌트카 바우처", sub: "5/15 12:00 ~ 5/17 12:00", url: "https://drive.google.com/file/d/1Kb3NsJzCFhcYkMZRV73uq2vDeq08ZydE/view?usp=drivesdk", color: "#3a8a5a", bg: "#eef7f2" },
          ].map((v, i, a) => (
            <div key={i} className="doc-ticket" style={{ borderBottom: i < a.length - 1 ? "1px solid rgba(26,22,18,0.06)" : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1612", marginBottom: 2 }}>{v.name}</div>
                <div style={{ fontSize: 11, color: "rgba(26,22,18,0.4)" }}>{v.sub}</div>
              </div>
              <a href={v.url} target="_blank" rel="noreferrer" className="tag" style={{ background: v.bg, color: v.color, textDecoration: "none", flexShrink: 0 }}>보기</a>
            </div>
          ))}
        </Card>
        <Card>
          <div className="card-label">비상 연락처</div>
          <Row l="주일 한국 대사관" v="+81-3-3452-7611" hot />
          <Row l="일본 구급" v="119" hot />
          <Row l="일본 경찰" v="110" hot />
          <Row l="여행자보험" v="—" />
          <Row l="신용카드 분실" v="카드사 국제 전화번호" />
        </Card>
      </div>
    );
  }

  function renderTips() {
    var tips = [
      {
        area: "가마쿠라", color: "#c8855a", icon: "⛩",
        items: [
          { title: "대불 마감 주의", desc: "고토쿠인 대불이 오후 5시 마감이에요. 도착하자마자 바로 가세요." },
          { title: "에노덴은 시간 봐서 결정", desc: "5/15 오후 2시 도착이라 에노덴은 시간이 빠듯할 수 있어요. 당일 상황에 맞게 선택하세요." },
          { title: "고마치도리 상점 일찍 닫아요", desc: "오후 5~6시면 문 닫는 가게가 많아요. 쇼핑은 대불 관람 전에 하세요." },
          { title: "주차장 미리 확인", desc: "가마쿠라역 근처 주차장이 협소하고 비싸요. 도착 전 구글맵으로 미리 확인 추천해요." },
        ],
      },
      {
        area: "후지산", color: "#5a8fc8", icon: "🗻",
        items: [
          { title: "오전이 날씨 확률 높아요", desc: "5합목에서 후지산 정상을 보려면 맑아야 해요. 오전 9시 이전 출발하면 확률이 높아요." },
          { title: "방한 준비 필수", desc: "5합목은 도쿄보다 기온이 10도 이상 낮아요. 얇은 패딩이나 바람막이를 꼭 챙기세요." },
          { title: "오시노 핫카이 추천", desc: "주차장도 있고 여유롭게 산책할 수 있어요. 부모님 모시기 딱 좋은 곳이에요." },
          { title: "후지큐 하이랜드는 선택", desc: "놀이공원이라 체력과 시간 고려해서 결정하세요. 외관 구경만 해도 충분해요." },
        ],
      },
      {
        area: "도쿄", color: "#5ac88a", icon: "🗼",
        items: [
          { title: "숙소에서 아사쿠사·스카이트리 가까워요", desc: "롯데 시티 호텔에서 아사쿠사까지 지하철 5분 거리예요. 5/17 오후 체크인 후 바로 가기 딱 좋아요." },
          { title: "오다이바 이동 방법", desc: "유리카모메 또는 린카이선 탑승. 구글맵에서 검색하면 바로 나와요." },
          { title: "긴자 면세 쇼핑 시 여권 필수", desc: "백화점 면세 카운터 이용 시 여권 제시해야 해요. 미쓰코시·마츠야 백화점 추천." },
          { title: "도보 거리 조절하세요", desc: "부모님 체력 고려해서 하루 1만 5천 보 이내로 일정 짜는 게 좋아요." },
        ],
      },
      {
        area: "공통 팁", color: "#a07ac8", icon: "💴",
        items: [
          { title: "현금을 넉넉히 준비하세요", desc: "일본은 아직 현금 위주 가게가 많아요. 1인당 3~5만 엔 환전 추천해요." },
          { title: "편의점 ATM 활용", desc: "세븐일레븐·로손 ATM에서 해외 카드로 엔화 출금 가능해요. 수수료가 저렴해요." },
          { title: "화장실은 구글맵 검색", desc: "구글맵에서 'トイレ' 검색하면 주변 공중화장실이 바로 나와요. 편의점도 대부분 이용 가능해요." },
          { title: "구글맵 하나면 충분해요", desc: "도보·대중교통·자동차 내비 모두 한국어로 안내돼요. 역 출구 번호까지 세세하게 알려줘요." },
        ],
      },
    ];

    return (
      <div>
        <div className="section-title">여행 꿀팁</div>
        {tips.map((section, si) => (
          <Card key={si}>
            <div className="card-label" style={{ color: section.color, marginBottom: 16 }}>
              {section.icon} {section.area}
            </div>
            {section.items.map((item, ii) => (
              <div key={ii} style={{
                padding: "12px 0",
                borderBottom: ii < section.items.length - 1 ? "1px solid rgba(26,22,18,0.06)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: section.color, flexShrink: 0, marginTop: 5 }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1612" }}>{item.title}</div>
                </div>
                <div style={{ fontSize: 12, color: "rgba(26,22,18,0.55)", lineHeight: 1.7, paddingLeft: 14 }}>{item.desc}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    );
  }

  var RENDERERS = { schedule: renderSchedule, hotel: renderHotel, checklist: renderChecklist, rental: renderRental, transport: renderTransport, weather: renderWeather, places: renderPlaces, phrase: renderPhrase, docs: renderDocs, tips: renderTips };

  return (
    <div className="app">
      <style>{css}</style>
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-jp">Tokyo / Fuji / Kamakura — 2026</div>
        <div className="hero-title">도쿄 여행</div>
        <div className="hero-sub">가족 여행 · 5박 5일</div>
        <div className="pill-row">
          <span className="pill">✈ 5/15 — 5/19</span>
          <span className="pill">4명</span>
          <span className="pill">도쿄 · 후지산 · 가마쿠라</span>
        </div>
      </div>
      <div className="tab-grid">
        {TABS.map(t => (
          <button key={t.id} className={"tab-btn" + (activeTab === t.id ? " active" : "")} onClick={() => setActiveTab(t.id)}>
            <div className="tab-icon">{t.icon}</div>
            <div className="tab-label">{t.label}</div>
          </button>
        ))}
      </div>
      <div className="body">
        {RENDERERS[activeTab] && RENDERERS[activeTab]()}
      </div>
    </div>
  );
}
