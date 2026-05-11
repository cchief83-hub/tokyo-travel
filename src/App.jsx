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
      { time: "10:30", place: "NEX 티켓 교환 → 탑승", note: "B1 북쪽 윙 JR 동일본 여행 서비스 센터 · 여권 + 바우처 제시" },
      { time: "11:23", place: "나리타 익스프레스 도쿄역 도착", note: "약 53분 · 환승 없이 직행", map: mapDir("東京駅") },
      { time: "11:30", place: "도쿄역 → 아사쿠사바시역", note: "JR 소부선 1정거장 · 약 3분 · 170엔" },
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
    date: "5/17", day: "일", theme: "후지산 → 도쿄 · 아사쿠사 · 도쿄타워",
    color: "#7a5ac8",
    items: [
      { time: "09:00", place: "더 가든 체크아웃", note: "짐 정리 · 렌트카 출발 준비", map: mapSearch("Funatsu 3554, Fujikawaguchiko") },
      { time: "09:30", place: "가와구치코 호수 산책", note: "마지막 후지산 조망", map: mapDir("河口湖") },
      { time: "11:00", place: "도쿄 방면 출발", note: "아사쿠사바시역 방면 · 약 2시간" },
      { time: "13:00", place: "IX렌탈 반납 (아사쿠사바시역)", note: "동일 지점 반납", map: mapDir("1-16-3 Yanagibashi, Taito-ku, Tokyo") },
      { time: "13:30", place: "지하철로 긴시쵸역 이동", note: "JR 소부선 · 약 10분 · 230엔", map: mapDir("錦糸町駅") },
      { time: "14:00", place: "롯데 시티 호텔 체크인", note: "짐 맡기고 바로 출발!", map: mapDir("4-6-1 Kinshi, Sumida-ku, Tokyo") },
      { time: "15:00", place: "센소지 · 아사쿠사", note: "나카미세도리 기념품 쇼핑 · 무료입장", map: mapDir("浅草寺") },
      { time: "17:00", place: "시바공원 · 도쿄타워 외관 📸", note: "잔디밭에 앉아 도쿄타워 포토 · 해질녘 황금빛 조명 추천", map: mapDir("芝公園 東京タワー") },
      { time: "18:30", place: "조조지 절 · 도쿄타워 야경 📸", note: "절+도쿄타워 한 프레임 포토스팟", map: mapDir("増上寺 東京タワー") },
      { time: "19:30", place: "오모이데요코초 저녁식사", note: "신주쿠 서쪽 · 야키토리 이자카야 골목 · 야경 감성", map: mapDir("思い出横丁 新宿") },
    ],
  },
  {
    date: "5/18", day: "월", theme: "신주쿠 · 하라주쿠 · 시부야",
    color: "#5ac88a",
    items: [
      { time: "10:00", place: "신주쿠 교엔", note: "입장료 500엔 · 넓은 정원 산책 · 부모님 최적 · 월요일 휴무 없음", map: mapDir("新宿御苑") },
      { time: "12:00", place: "오모이데요코초 점심", note: "신주쿠역 서쪽 출구 도보 1분 · 야키토리·라멘", map: mapDir("思い出横丁 新宿") },
      { time: "13:00", place: "알펜 도쿄 — 온러닝 쇼핑 🛍", note: "신주쿠역 동쪽 도보 3분 · 면세 10% + 쿠폰 추가 할인 · 여권 지참!", map: mapDir("アルペン東京 新宿") },
      { time: "13:30", place: "가부키초", note: "네온사인 · 가부키초 타워 외관 구경", map: mapDir("歌舞伎町 新宿") },
      { time: "15:00", place: "하라주쿠 다케시타도리", note: "크레이프 · 팝 패션 · 구경 재미있는 곳", map: mapDir("竹下通り 原宿") },
      { time: "16:30", place: "시부야 스크램블 교차로 📸", note: "맞은편 스타벅스 2층 뷰포인트 추천", map: mapDir("渋谷スクランブル交差点") },
      { time: "17:30", place: "시부야 스카이 전망대", note: "360° 옥상 전망대 · 사전예매 필수!", map: mapDir("渋谷スカイ") },
      { time: "19:30", place: "시부야 저녁식사", note: "시부야 스크램블 스퀘어 · 다양한 식당", map: mapSearch("渋谷 夕食 レストラン") },
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

const PLACES = {
  식당: [
    { name: "후쿠다 天ぷら", area: "아사쿠사", note: "런치 세트 1,800엔 · 뎀뿌라 맛집", mapQ: "天ぷら福田 浅草", mapUrl: "https://www.google.com/maps/search/天ぷら福田+浅草" },
    { name: "이치란 라멘 一蘭", area: "신주쿠", note: "24시간 · 칸막이 좌석", mapQ: "一蘭 新宿", mapUrl: "https://www.google.com/maps/search/一蘭+新宿" },
    { name: "츠키지 식당가", area: "츠키지", note: "해산물 · 아침식사 추천", mapQ: "築地場外市場", mapUrl: "https://www.google.com/maps/search/築地場外市場" },
    { name: "긴자 스시", area: "긴자", note: "런치 오마카세 · 예약 권장", mapQ: "銀座 寿司 おまかせ", mapUrl: "https://www.google.com/maps/search/銀座+寿司+おまかせ" },
  ],
  후지산: [
    { name: "후지요시다 시청 앞 보행로", area: "후지요시다", note: "전봇대+후지산 압도적 구도 · SNS 바이럴 스팟 · 새벽~아침 시간대 추천 · 후지큐 하이랜드 도보 10분", mapQ: "富士吉田市役所 富士山 撮影スポット", mapUrl: "https://maps.google.com/?cid=10710673484613427011", photoUrl: "https://drive.google.com/file/d/14tpss_nfnnQke4CK2POwaVI-TvwrU563/view?usp=drivesdk" },
    { name: "후지큐 하이랜드 대관람차", area: "후지요시다", note: "관람차+후지산 한 프레임 포토스팟 · 더 가든에서 차로 20분 · 입장 무료 (놀이기구별 요금)", mapQ: "富士急ハイランド", mapUrl: "https://maps.google.com/?cid=14420058890310148144", photoUrl: "https://drive.google.com/file/d/1KtKDpuD9-t6DWKRCojwo52G8g9Ufh-2X/view?usp=drivesdk" },
    { name: "후지산 5합목", area: "후지산", note: "렌트카로 이동 · 맑은 날 정상 조망 · 오전이 확률 높음", mapQ: "富士山五合目 富士スバルライン", mapUrl: "https://www.google.com/maps/search/富士山五合目+富士スバルライン" },
    { name: "오시노 핫카이 忍野八海", area: "오시노", note: "후지산 용수 연못 · 세계문화유산 · 부모님 산책 최적", mapQ: "忍野八海", mapUrl: "https://www.google.com/maps/search/忍野八海" },
    { name: "가와구치코 유람선", area: "가와구치코", note: "호수에서 후지산 조망 · 약 20분", mapQ: "河口湖遊覧船", mapUrl: "https://www.google.com/maps/search/河口湖遊覧船" },
    { name: "오이시 공원 大石公園", area: "가와구치코", note: "라벤더+후지산 · 5월 꽃밭 시즌 · 무료입장", mapQ: "大石公園 河口湖", mapUrl: "https://www.google.com/maps/search/大石公園+河口湖" },
  ],
  시부야: [
    { name: "시부야 스크램블 교차로", area: "시부야", note: "세계에서 가장 바쁜 횡단보도 · 맞은편 스타벅스 2층 뷰포인트", mapQ: "渋谷スクランブル交差点", mapUrl: "https://maps.google.com/?cid=10518167498657889568" },
    { name: "시부야 스카이 Shibuya Sky", area: "시부야", note: "360° 옥상 전망대 · 스크램블 교차로 조감 · 사전예매 필수 · 화요일 휴무", mapQ: "渋谷スカイ", mapUrl: "https://maps.google.com/?cid=8019591697534218844" },
    { name: "시부야 스크램블 스퀘어", area: "시부야", note: "시부야 스카이 입점 건물 · 쇼핑 · 레스토랑", mapQ: "渋谷スクランブルスクエア", mapUrl: "https://maps.google.com/?cid=13329726600088760943" },
  ],
  하라주쿠: [
    { name: "다케시타도리 竹下通り", area: "하라주쿠", note: "일본 최고 크레이프 · 팝 패션 · 하라주쿠역 도보 1분", mapQ: "竹下通り 原宿", mapUrl: "https://maps.google.com/?cid=14534979862793551001" },
    { name: "메이지 신궁 明治神宮", area: "하라주쿠", note: "도쿄 최대 신사 · 울창한 숲길 · 무료입장 · 다케시타도리 바로 옆", mapQ: "明治神宮", mapUrl: "https://maps.google.com/?cid=10557131434248978590" },
    { name: "오모테산도 表参道", area: "오모테산도", note: "명품 거리 · 카페 · 건축 감상 · 메이지 신궁에서 도보 10분", mapQ: "表参道 東京", mapUrl: "https://www.google.com/maps/search/表参道+東京" },
  ],
  신주쿠: [
    { name: "오모이데 요코초 思い出横丁", area: "신주쿠", note: "추억의 골목 · 이자카야 야키토리 · 야경 감성 · 신주쿠역 서쪽 출구 도보 1분", mapQ: "思い出横丁 新宿", mapUrl: "https://maps.google.com/?cid=11209413547498426191" },
    { name: "신주쿠 교엔 新宿御苑", area: "신주쿠", note: "입장료 500엔 · 일·영·프 정원 · 부모님 산책 최적 · 월요일 휴무", mapQ: "新宿御苑", mapUrl: "https://maps.google.com/?cid=14439497453018948607" },
    { name: "도쿄 도청 전망대", area: "신주쿠", note: "무료 · 202m · 후지산 조망 가능 · 남북 두 동 운영", mapQ: "東京都庁展望台", mapUrl: "https://www.google.com/maps/search/東京都庁展望台" },
    { name: "가부키초 歌舞伎町", area: "신주쿠", note: "네온사인 야경 · 가부키초 타워 · 이자카야 밀집 · 저녁 추천", mapQ: "歌舞伎町 新宿", mapUrl: "https://www.google.com/maps/search/歌舞伎町+新宿" },
  ],
  관광지: [
    { name: "센소지 浅草寺", area: "아사쿠사", note: "무료 입장 · 이른 아침 추천", mapQ: "浅草寺", mapUrl: "https://www.google.com/maps/search/浅草寺" },
    { name: "신주쿠 교엔 新宿御苑", area: "신주쿠", note: "입장료 500엔 · 산책 최적", mapQ: "新宿御苑", mapUrl: "https://www.google.com/maps/search/新宿御苑" },
    { name: "도쿄 도청 전망대", area: "신주쿠", note: "무료 · 202m · 후지산 조망", mapQ: "東京都庁展望台", mapUrl: "https://www.google.com/maps/search/東京都庁展望台" },
    { name: "오다이바 해변공원", area: "오다이바", note: "레인보우브리지 야경 필수", mapQ: "お台場海浜公園", mapUrl: "https://www.google.com/maps/search/お台場海浜公園" },
    { name: "시바 공원 芝公園", area: "다이몬", note: "잔디밭에 앉아 도쿄타워 올려다보는 포토스팟 · 무료 · 24시간 · 조조지 절 도보 2분", mapQ: "芝公園 東京タワー", mapUrl: "https://maps.google.com/?cid=11312766523862247942", photoUrl: "https://drive.google.com/file/d/1zgyczU96mPgF0PH1lM08CH1u9oZzpIfh/view?usp=drivesdk" },
    { name: "조조지 절 増上寺", area: "다이몬", note: "도쿄타워+절 한 프레임 최고 포토스팟 · 무료입장 · 시바공원 도보 2분", mapQ: "増上寺 東京タワー", mapUrl: "https://maps.google.com/?cid=9846179875119807780" },
    { name: "도쿄타워 외관", area: "다이몬", note: "주차장 코너 셀카 삼각대 포토존 · 무료 · 해질녘~야경 추천", mapQ: "東京タワー", mapUrl: "https://maps.google.com/?cid=5195627782660688349" },
    { name: "아자부다이힐스 麻布台ヒルズ", area: "롯폰기", note: "2023년 오픈 도쿄 최신 랜드마크 · 크림색 건물 포토스팟 · 도쿄타워 뷰 · 팀랩 보더리스", mapQ: "麻布台ヒルズ", mapUrl: "https://maps.google.com/?cid=4557431226793109441" },
    { name: "롯폰기 힐즈 六本木ヒルズ", area: "롯폰기", note: "도쿄타워 야경 뷰포인트 · 저녁식사 · 거미 조형물 포토스팟", mapQ: "六本木ヒルズ", mapUrl: "https://maps.google.com/?cid=6628738211295053826" },
  ],
  쇼핑: [
    { name: "알펜 도쿄 (온러닝 구매 추천)", area: "신주쿠", note: "온러닝 전 라인업 · 면세 10% + 쿠폰 할인 추가 · 1층 러닝 전문관 · 발 분석 기계 보유", mapQ: "アルペン東京 新宿", mapUrl: "https://www.google.com/maps/search/アルペン東京+新宿3丁目23", couponUrl: "https://drive.google.com/file/d/1fyoHyl6447Qygq1W5QJGLYi9G7i1FPbp/view?usp=drivesdk" },
    { name: "마츠모토키요시", area: "아사쿠사", note: "드럭스토어 · 면세 가능", mapQ: "マツモトキヨシ 浅草" },
    { name: "돈키호테 ドン・キホーテ", area: "신주쿠", note: "24시간 · 기념품 저렴", mapQ: "ドン・キホーテ 新宿" },
    { name: "아메요코 시장 アメ横", area: "우에노", note: "건어물 · 과자 · 화장품", mapQ: "アメ横" },
  ],
  가마쿠라: [
    { name: "시치리가하마 해변 七里ヶ浜", area: "시치리가하마", note: "후지산+바다 조망 · 일몰 명소 · 에노덴역 도보 5분", mapQ: "七里ヶ浜海岸 鎌倉", mapUrl: "https://maps.google.com/?cid=11344940212826062752", photoUrl: "https://drive.google.com/file/d/1bJos7bdBh_JFvJ_xi4keOQ4eMQ_ZjuhK/view?usp=drivesdk" },
    { name: "가마쿠라코코마에역 건널목", area: "가마쿠라코코마에", note: "슬램덩크 배경지 · 에노덴+바다 한 프레임 · 포토스팟", mapQ: "鎌倉高校前駅 踏切", mapUrl: "https://maps.google.com/?cid=1819797686801071229", photoUrl: "https://drive.google.com/file/d/1BkKHGece8qrkVxFF0-x6outDtpNSyxGz/view?usp=drivesdk" },
    { name: "TANAKA Barber Shop", area: "하세", note: "이사랑통역되나요 촬영지 · 하세역 도보 2분 · ⚠ 사진 전 주인께 양해 필수", mapQ: "TANAKA Barber Shop Hase Kamakura", mapUrl: "https://maps.google.com/?cid=15869312336643053071", photoUrl: "https://drive.google.com/file/d/1S9M6abVDcxsRL6N8_tQLc2P8m0V_jN6w/view?usp=drivesdk" },
    { name: "시치리가하마 고등학교 앞 건널목", area: "시치리가하마", note: "에노덴+바다+하늘 포토스팟 · 드라마틱한 구도", mapQ: "七里ヶ浜高校 踏切 鎌倉", mapUrl: "https://maps.google.com/?cid=422530369093211191", photoUrl: "https://drive.google.com/file/d/17upNDDb2ZuUunVAZs5O6GHE5l-cfczz1/view?usp=drivesdk" },
    { name: "시치리가하마역 수로 포토스팟", area: "시치리가하마", note: "수로 끝으로 바다가 보이는 인스타 감성 스팟 · 역 바로 옆", mapQ: "七里ヶ浜駅 水路 鎌倉", mapUrl: "https://maps.google.com/?cid=12702870331904269387", photoUrl: "https://drive.google.com/file/d/1DFVxMk6rWIZRo9gHZepXx5YCATj0mqGu/view?usp=drivesdk" },
    { name: "가마쿠라 대불 高徳院", area: "하세", note: "오후 5시 마감 · 입장료 300엔 · 1순위 방문 추천", mapQ: "鎌倉大仏 高徳院", mapUrl: "https://www.google.com/maps/search/高徳院+鎌倉大仏" },
    { name: "고마치도리 小町通り", area: "가마쿠라역", note: "쇼핑 · 길거리 음식 · 오후 5~6시 조기 마감", mapQ: "小町通り 鎌倉", mapUrl: "https://www.google.com/maps/search/小町通り+鎌倉" },
    { name: "고쿠라쿠지역 極楽寺駅", area: "고쿠라쿠지", note: "이사랑통역되나요 촬영지 · 고즈넉한 에노덴 역", mapQ: "極楽寺駅", mapUrl: "https://www.google.com/maps/search/極楽寺駅+鎌倉" },
  ],
};

const PHRASES = {
  "기본 인사": [
    { jp: "ありがとうございます", roma: "아리가또 고자이마스", kr: "감사합니다" },
    { jp: "すみません", roma: "스미마셍", kr: "저기요 / 실례합니다" },
    { jp: "はい / いいえ", roma: "하이 / 이이에", kr: "네 / 아니요" },
    { jp: "わかりません", roma: "와카리마셍", kr: "모르겠습니다" },
    { jp: "もう一度お願いします", roma: "모이치도 오네가이시마스", kr: "다시 한번 말씀해 주세요" },
    { jp: "ゆっくり話してください", roma: "윳쿠리 하나시테 구다사이", kr: "천천히 말해주세요" },
  ],
  "식당에서": [
    { jp: "一人です / 二人です", roma: "히토리데스 / 후타리데스", kr: "1명이요 / 2명이요" },
    { jp: "これをください", roma: "고레오 구다사이", kr: "이것 주세요" },
    { jp: "おすすめは何ですか？", roma: "오스스메와 난데스카?", kr: "추천 메뉴는 뭔가요?" },
    { jp: "おいしい！", roma: "오이시이!", kr: "맛있어요!" },
    { jp: "お会計をお願いします", roma: "오카이케이오 오네가이시마스", kr: "계산해 주세요" },
    { jp: "カードで払えますか？", roma: "카도데 하라에마스카?", kr: "카드 결제 되나요?" },
    { jp: "領収書をください", roma: "료슈쇼오 구다사이", kr: "영수증 주세요" },
    { jp: "辛くないものはありますか？", roma: "카라쿠나이 모노와 아리마스카?", kr: "안 매운 음식 있나요?" },
  ],
  "쇼핑할때": [
    { jp: "これはいくらですか？", roma: "고레와 이쿠라데스카?", kr: "이거 얼마예요?" },
    { jp: "試着できますか？", roma: "시챠쿠 데키마스카?", kr: "입어봐도 되나요?" },
    { jp: "もう少し安くなりますか？", roma: "모우 스코시 야스쿠 나리마스카?", kr: "좀 깎아줄 수 있나요?" },
    { jp: "免税できますか？", roma: "멘제이 데키마스카?", kr: "면세 되나요?" },
    { jp: "袋をください", roma: "후쿠로오 구다사이", kr: "봉투 주세요" },
    { jp: "別々に包んでください", roma: "베츠베츠니 쯔츤데 구다사이", kr: "따로따로 포장해 주세요" },
    { jp: "大きいサイズはありますか？", roma: "오키이 사이즈와 아리마스카?", kr: "큰 사이즈 있나요?" },
  ],
  "교통·길찾기": [
    { jp: "～はどこですか？", roma: "~와 도코데스카?", kr: "~은 어디인가요?" },
    { jp: "トイレはどこですか？", roma: "토이레와 도코데스카?", kr: "화장실 어디인가요?" },
    { jp: "～まで行きたいです", roma: "~마데 이키타이데스", kr: "~까지 가고 싶어요" },
    { jp: "この電車は～に止まりますか？", roma: "고노 덴샤와 ~니 토마리마스카?", kr: "이 전철은 ~에 서나요?" },
    { jp: "～番出口はどこですか？", roma: "~반 데구치와 도코데스카?", kr: "~번 출구 어디인가요?" },
    { jp: "タクシーを呼んでください", roma: "타쿠시오 욘데 구다사이", kr: "택시 불러 주세요" },
  ],
  "공항에서": [
    { jp: "搭乗口はどこですか？", roma: "토죠구치와 도코데스카?", kr: "탑승구 어디인가요?" },
    { jp: "荷物を預けたいです", roma: "니모츠오 아즈케타이데스", kr: "짐을 맡기고 싶어요" },
    { jp: "両替所はどこですか？", roma: "료가에쇼와 도코데스카?", kr: "환전소 어디인가요?" },
    { jp: "SIMカードはどこで買えますか？", roma: "심카도와 도코데 카에마스카?", kr: "유심카드 어디서 살 수 있나요?" },
    { jp: "バスはどこから乗りますか？", roma: "바스와 도코카라 노리마스카?", kr: "버스 어디서 타나요?" },
  ],
  "긴급상황": [
    { jp: "助けてください！", roma: "타스케테 구다사이!", kr: "도와주세요!" },
    { jp: "救急車を呼んでください", roma: "큐큐샤오 욘데 구다사이", kr: "구급차 불러 주세요" },
    { jp: "警察を呼んでください", roma: "케이사츠오 욘데 구다사이", kr: "경찰 불러 주세요" },
    { jp: "財布を盗まれました", roma: "사이후오 누스마레마시타", kr: "지갑을 도난당했어요" },
    { jp: "病院はどこですか？", roma: "뵤인와 도코데스카?", kr: "병원 어디인가요?" },
    { jp: "韓国語が話せる方はいますか？", roma: "칸코쿠고가 하나세루 카타와 이마스카?", kr: "한국어 하시는 분 있나요?" },
  ],
  "사진촬영": [
    { jp: "写真を撮ってもいいですか？", roma: "샤신오 톳테모 이이데스카?", kr: "사진 찍어도 되나요?" },
    { jp: "写真を撮ってもらえますか？", roma: "샤신오 톳테 모라에마스카?", kr: "사진 찍어 주실 수 있나요?" },
    { jp: "一緒に写真を撮ってもいいですか？", roma: "잇쇼니 샤신오 톳테모 이이데스카?", kr: "같이 사진 찍어도 될까요?" },
    { jp: "もう一枚お願いします", roma: "모이치마이 오네가이시마스", kr: "한 장 더 부탁해요" },
  ],
};

const GF = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap";

export default function TokyoApp() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [scheduleTab, setScheduleTab] = useState(0);
  const [hotelTab, setHotelTab] = useState(0);
  const [transportTab, setTransportTab] = useState(0);
  const [docsTab, setDocsTab] = useState(0);
  const [tipsTab, setTipsTab] = useState(0);
  const [rentalTab, setRentalTab] = useState(0);
  const [checks, setChecks] = useState({});
  const [expandedDay, setExpandedDay] = useState(0);
  const [placeTab, setPlaceTab] = useState("식당");
  const [phraseTab, setPhraseTab] = useState("기본 인사");
  const [weatherData, setWeatherData] = useState({});
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherCity, setWeatherCity] = useState("tokyo");

  const WEATHER_CITIES = [
    { id: "tokyo", label: "도쿄", query: "Tokyo,JP", icon: "🗼" },
    { id: "kamakura", label: "가마쿠라", query: "Kamakura,JP", icon: "⛩" },
    { id: "kawaguchiko", label: "카와구치코", query: "Fujikawaguchiko,JP", icon: "🗻" },
  ];

  const API_KEY = "309c87e14189378b05a0e9573ebbdddd";

  async function fetchWeather(cityQuery) {
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + cityQuery + "&appid=" + API_KEY + "&units=metric&lang=kr&cnt=40"
      );
      const data = await res.json();
      return data;
    } catch (e) {
      return null;
    }
  }

  async function loadWeather(cityId) {
    if (weatherData[cityId]) return;
    setWeatherLoading(true);
    const city = WEATHER_CITIES.find(c => c.id === cityId);
    const data = await fetchWeather(city.query);
    if (data && data.list) {
      const days = {};
      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!days[date]) days[date] = [];
        days[date].push(item);
      });
        const result = Object.entries(days).slice(0, 5).map(([date, items]) => {
          const temps = items.map(i => i.main.temp);
          const high = Math.round(Math.max(...temps));
          const low = Math.round(Math.min(...temps));
          const noon = items.find(i => i.dt_txt.includes("12:00")) || items[0];
          const desc = noon.weather[0].description;
          const id = noon.weather[0].id;
          const wind = Math.round(noon.wind.speed * 10) / 10;
          const windDeg = noon.wind.deg;
          const dirs = ["북","북동","동","남동","남","남서","서","북서"];
          const windDir = dirs[Math.round(windDeg / 45) % 8];
          let icon = "⛅";
          if (id >= 200 && id < 300) icon = "⛈";
          else if (id >= 300 && id < 400) icon = "🌦";
          else if (id >= 500 && id < 600) icon = "🌧";
          else if (id >= 600 && id < 700) icon = "❄";
          else if (id >= 700 && id < 800) icon = "🌫";
          else if (id === 800) icon = "☀";
          else if (id > 800) icon = "⛅";
          let windLevel = "";
          if (wind < 3) windLevel = "약풍";
          else if (wind < 7) windLevel = "보통";
          else if (wind < 11) windLevel = "강풍";
          else windLevel = "매우 강함";
          const d = new Date(date);
          const days2 = ["일","월","화","수","목","금","토"];
          return {
            date: (d.getMonth()+1) + "/" + d.getDate(),
            day: days2[d.getDay()],
            high, low, desc, icon, wind, windDir, windLevel
          };
        });
      setWeatherData(prev => ({ ...prev, [cityId]: result }));
    }
    setWeatherLoading(false);
  }

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
    .hero-jp { font-family: 'Noto Serif JP', serif; font-size: 13px; letter-spacing: 0.15em; color: rgba(255,255,255,0.7); margin-bottom: 10px; }
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
    .inner-tab-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 20px; }
    .inner-tab { padding: 10px 8px; border: 1px solid rgba(26,22,18,0.12); border-radius: 8px; background: #fafafa; font-size: 12px; font-weight: 600; color: rgba(26,22,18,0.4); cursor: pointer; white-space: nowrap; text-align: center; font-family: 'DM Sans', sans-serif; transition: all 0.15s; overflow: hidden; text-overflow: ellipsis; }
    .inner-tab.active { background: #1a1612; color: #fff; border-color: #1a1612; }
    .place-tab-btn { padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(26,22,18,0.15); background: transparent; color: rgba(26,22,18,0.5); font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
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
    const day = SCHEDULE[scheduleTab];

    // 날짜별 날씨 도시 매핑
    const scheduleCityMap = ["kamakura", "kawaguchiko", "kawaguchiko", "tokyo", "tokyo"];
    const scheduleCityId = scheduleCityMap[scheduleTab];
    const scheduleWeather = weatherData[scheduleCityId];
    const scheduleCityLabel = { kamakura: "가마쿠라", kawaguchiko: "카와구치코", tokyo: "도쿄" };

    // 날짜에 맞는 날씨 데이터 찾기 (5/15~5/19)
    const targetDate = "2026-05-" + String(14 + scheduleTab + 1).padStart(2, "0");
    const dayWeather = scheduleWeather ? scheduleWeather.find(w => {
      const m = w.date.split("/");
      return m[0] === "5" && m[1] === String(15 + scheduleTab);
    }) : null;

    // 날씨 아직 없으면 로드
    if (!scheduleWeather && !weatherLoading) {
      loadWeather(scheduleCityId);
    }

    return (
      <div>
        {/* 날짜 탭 */}
        <div className="inner-tab-row">
          {SCHEDULE.map((d, di) => (
            <button key={di} className={"inner-tab" + (scheduleTab === di ? " active" : "")}
              onClick={() => setScheduleTab(di)}>
              {d.date} {d.day}
            </button>
          ))}
        </div>

        {/* 날씨 카드 */}
        <div style={{
          background: "linear-gradient(135deg, #e8f4fb 0%, #f0f8ff 100%)",
          border: "1px solid rgba(90,143,200,0.25)",
          borderRadius: 12, padding: "12px 16px", marginBottom: 12,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>{dayWeather ? dayWeather.icon : "🌤"}</span>
            <div>
              <div style={{ fontSize: 11, color: "rgba(26,22,18,0.45)", marginBottom: 2 }}>
                {scheduleCityLabel[scheduleCityId]} 날씨
              </div>
              {dayWeather ? (
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1612" }}>
                  {dayWeather.desc} · {dayWeather.high}°/{dayWeather.low}°C
                </div>
              ) : (
                <div style={{ fontSize: 12, color: "rgba(26,22,18,0.4)" }}>
                  {weatherLoading ? "날씨 불러오는 중..." : "날씨 정보 없음"}
                </div>
              )}
            </div>
          </div>
          {dayWeather && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(26,22,18,0.45)" }}>바람</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3a6aaa" }}>
                {dayWeather.windDir} {dayWeather.wind}m/s
              </div>
            </div>
          )}
        </div>

        {/* 선택된 날 내용 */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div className="day-date" style={{ color: day.color, fontSize: 22 }}>{day.date} <span style={{ fontSize: 14 }}>{day.day}</span></div>
            <div>
              <div className="card-label" style={{ marginBottom: 2 }}>DAY {scheduleTab + 1}</div>
              <div className="day-theme">{day.theme}</div>
            </div>
          </div>
          <div className="timeline" style={{ display: "block", paddingTop: 0 }}>
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
        </Card>
      </div>
    );
  }

  function renderHotel() {
    const tabs = ["더 가든", "롯데 시티 호텔", "공통 안내"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => (
            <button key={i} className={"inner-tab" + (hotelTab === i ? " active" : "")} onClick={() => setHotelTab(i)}>{t}</button>
          ))}
        </div>
        {hotelTab === 0 && (
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
        )}
        {hotelTab === 1 && (
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
        )}
        {hotelTab === 2 && (
          <div className="info-card">
            <div className="card-label" style={{ marginBottom: 8 }}>체크인 공통 안내</div>
            <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.9 }}>
              체크인 시 <strong>예약확인서(Voucher) + 여권</strong> 제시 필수<br />
              신용카드 보증금 요청될 수 있음 (실제 청구 아님)<br />
              여기어때 고객센터 <strong>+82-1670-6250</strong> (09:00~03:00 KST)
            </div>
          </div>
        )}
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
    const tabs = ["예약 차량", "대여·반납 위치", "픽업 준비물", "운전 주의", "국제면허 안내"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => (
            <button key={i} className={"inner-tab" + (rentalTab === i ? " active" : "")}
              onClick={() => setRentalTab(i)}>{t}</button>
          ))}
        </div>

        {rentalTab === 0 && (
          <div>
            <Card>
              <div className="card-label" style={{ color: "#3a8a5a", marginBottom: 14 }}>예약 차량 — 확정</div>
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
              <LinkBtn href="https://drive.google.com/file/d/1Kb3NsJzCFhcYkMZRV73uq2vDeq08ZydE/view?usp=drivesdk" color="green">📄 렌트카 바우처 보기</LinkBtn>
            </Card>
          </div>
        )}

        {rentalTab === 1 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>대여 · 반납 위치</div>
            <Row l="장소" v="IX렌탈 아사쿠사바시역점" />
            <Row l="주소" v="1-16-3 Yanagibashi, Taito-ku, Tokyo 111-0053" />
            <Row l="대여→반납" v="동일 지점 (편도 수수료 없음)" />
            <Row l="영업시간" v="08:00~20:00 무료 / 20:01~21:00 +3,000엔" />
            <Row l="오시는 길" v="아사쿠사바시역 동쪽 출구 → 50m → 우회전 → 150m" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <LinkBtn href="https://maps.app.goo.gl/iJ9aTQE9UvKXZUfDA" color="blue">📍 위치 보기</LinkBtn>
              <LinkBtn href="https://www.google.com/maps/dir/?api=1&destination=1-16-3+Yanagibashi+Taito-ku+Tokyo&travelmode=transit" color="green">🗺 길찾기</LinkBtn>
            </div>
          </Card>
        )}

        {rentalTab === 2 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>픽업 시 필수 지참</div>
            <Row l="여권" v="픽업하는 모든 운전자 원본" />
            <Row l="운전면허증" v="한국 운전면허증 원본" />
            <Row l="국제운전면허증" v="1949년 협약 IDP 원본" />
            <Row l="현장 추가" v="ETC 카드 · GPS · 카시트 구매 가능" />
          </Card>
        )}

        {rentalTab === 3 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>일본 운전 주의사항</div>
            <Row l="통행 방향" v="좌측통행 (한국과 반대)" />
            <Row l="고속도로" v="ETC 카드 또는 현금" />
            <Row l="주유" v="셀프 주유 많음 (セルフ)" />
            <Row l="내비" v="구글맵 또는 Yahoo! カーナビ" />
          </Card>
        )}

        {rentalTab === 4 && (
          <div className="warn-card">
            <div className="card-label" style={{ color: "#b06030", marginBottom: 8 }}>⚠ 국제운전면허증 필수</div>
            <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.9 }}>
              일본은 <strong>국제운전면허증(IDP)</strong> 필수예요.<br />
              한국 면허증만으로는 운전 불가해요.<br />
              <strong>1949년 협약</strong> 형식만 인정돼요.<br />
              출발 전 반드시 발급하세요!<br /><br />
              <strong>발급 방법:</strong> 전국 운전면허시험장 또는 경찰서 민원실 방문<br />
              <strong>준비물:</strong> 운전면허증 + 여권 + 증명사진 1매 + 수수료 8,500원<br />
              <strong>발급 시간:</strong> 당일 즉시 발급
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderTransport() {
    var steps = [
      { icon: "✈", num: "STEP 1", title: "나리타 T1 도착 (10:00)", desc: "입국심사 · 짐 수령 후 B1 북쪽 윙으로 이동" },
      { icon: "🚄", num: "STEP 2", title: "NEX 티켓 교환 (B1 북쪽 윙)", desc: "JR 동일본 여행 서비스 센터 · 여권 + 바우처 제시 · 운영 08:30~19:00" },
      { icon: "🚆", num: "STEP 3", title: "나리타 익스프레스 탑승 → 도쿄역", desc: "약 53분 · 환승 없이 도쿄역 직행 · 짐 공간 완비" },
      { icon: "🚇", num: "STEP 4", title: "도쿄역 → 아사쿠사바시역", desc: "JR 소부선 · 1정거장 약 3분 · 170엔" },
      { icon: "🚗", num: "STEP 5", title: "IX렌탈 픽업 (12:00)", desc: "아사쿠사바시역 동쪽 출구 도보 5분 · 국제운전면허증 + 여권 지참" },
    ];
    const tabs = ["나리타→렌트카", "반납→호텔", "귀국 이동", "NEX 예약정보", "IC카드"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => (
            <button key={i} className={"inner-tab" + (transportTab === i ? " active" : "")} onClick={() => setTransportTab(i)}>{t}</button>
          ))}
        </div>
        {transportTab === 0 && (
          <div>
            <Card>
              <div className="card-label" style={{ color: "#c8855a", marginBottom: 14 }}>나리타 → IX렌탈 아사쿠사바시 (5/15)</div>
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
            <div className="info-card">
              <div className="card-label" style={{ color: "#3a6aaa", marginBottom: 6 }}>⚠ NEX 티켓 교환 주의</div>
              <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.8 }}>
                티켓 교환은 <strong>나리타 공항 터미널에서만 가능</strong>해요.<br />
                도쿄역 등 다른 역에서는 교환 불가예요.<br />
                여권 + 모바일 바우처 함께 제시하세요.
              </div>
            </div>
          </div>
        )}
        {transportTab === 1 && (
          <Card>
            <div className="card-label" style={{ color: "#5a8fc8", marginBottom: 14 }}>렌트카 반납 → 롯데 시티 호텔 (5/17)</div>
            <Row l="반납" v="IX렌탈 아사쿠사바시역점" />
            <Row l="이동" v="JR 소부선 탑승" />
            <Row l="도착" v="긴시쵸역 약 10분 · 230엔" />
            <Row l="숙소까지" v="긴시쵸역 5번 출구 → 롯데 시티 호텔 도보 1분" />
          </Card>
        )}
        {transportTab === 2 && (
          <div>
            <Card>
              <div className="card-label" style={{ marginBottom: 14 }}>귀국일 나리타 이동 (5/19)</div>
              <Row l="출발지" v="롯데 시티 호텔 킨시쵸" />
              <Row l="이동" v="긴시쵸역 → JR 소부선 → 도쿄역" />
              <Row l="소요" v="긴시쵸→도쿄역 약 3분" />
              <Row l="NEX 탑승" v="도쿄역 → 나리타 T1 (53분)" />
              <Row l="출발 권장" v="BX111 10:55 기준 → 08:00 이전 출발" />
            </Card>
            <div className="warn-card">
              <div className="card-label" style={{ color: "#b06030", marginBottom: 6 }}>⚠ 귀국일 체크리스트</div>
              <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.8 }}>
                복편 NEX는 왕복 티켓으로 이용<br />
                도쿄역 NEX 승강장에서 나리타행 탑승<br />
                티켓 교환 없이 <strong>바우처 QR코드 그대로 사용</strong>
              </div>
            </div>
          </div>
        )}
        {transportTab === 3 && (
          <div>
            <Card>
              <div className="card-label" style={{ color: "#3a8a5a", marginBottom: 14 }}>나리타 익스프레스 예약 정보</div>
              <Row l="예약번호" v="BQP828461" />
              <Row l="티켓 종류" v="왕복 (나리타 공항↔도쿄)" />
              <Row l="이용 날짜" v="2026년 5월 15일" />
              <Row l="인원" v="성인 3명 · 아동(만 6-11세) 1명" />
              <Row l="교환 장소" v="나리타 T1 — JR 동일본 여행 서비스 센터 B1 북쪽 윙" />
              <Row l="교환 운영시간" v="08:30 ~ 19:00" />
              <Row l="필요 서류" v="여권 + 모바일 바우처" />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <LinkBtn href="https://drive.google.com/file/d/1bMbXZ85A0ZqJ1WL66twdUZX94NBKDjHZ/view?usp=drivesdk" color="green">📄 NEX 바우처 보기</LinkBtn>
                <LinkBtn href="https://drive.google.com/file/d/1wICgiS7xEgfY3aFH9M08moUdzUq0HhsV/view?usp=drivesdk" color="blue">🎫 QR코드 보기</LinkBtn>
              </div>
            </Card>
          </div>
        )}
        {transportTab === 4 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>IC 카드 (스이카 / 파스모)</div>
            <Row l="구입" v="공항 · 역 자동판매기" />
            <Row l="초기 충전 권장" v="1인당 3,000~5,000엔" />
            <Row l="보증금" v="500엔 (귀국 시 환불)" />
            <Row l="사용처" v="전철 · 버스 · 편의점 · 자판기" />
          </Card>
        )}
      </div>
    );
  }

  function renderWeather() {
    const city = WEATHER_CITIES.find(c => c.id === weatherCity);
    const data = weatherData[weatherCity];

    // 탭 클릭 시 날씨 로드
    function handleCityClick(id) {
      setWeatherCity(id);
      loadWeather(id);
    }

    // 첫 진입 시 자동 로드
    if (!data && !weatherLoading) {
      loadWeather(weatherCity);
    }

    return (
      <div>
        <div className="section-title">실시간 날씨</div>

        {/* 도시 선택 탭 */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {WEATHER_CITIES.map(c => (
            <button key={c.id}
              onClick={() => handleCityClick(c.id)}
              style={{
                padding: "7px 16px", borderRadius: 20, border: "1px solid",
                borderColor: weatherCity === c.id ? "#1a1612" : "rgba(26,22,18,0.15)",
                background: weatherCity === c.id ? "#1a1612" : "transparent",
                color: weatherCity === c.id ? "#fff" : "rgba(26,22,18,0.5)",
                fontSize: 12, fontWeight: 500, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* 날씨 카드 */}
        <Card>
          <div className="card-label" style={{ marginBottom: 14 }}>
            {city.icon} {city.label} · 5일 예보
          </div>
          {weatherLoading ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "rgba(26,22,18,0.4)", fontSize: 13 }}>
              날씨 불러오는 중...
            </div>
          ) : data ? (
            <div>
              <div className="w-grid">
                {data.map((w, i) => (
                  <div key={i} className="w-card" style={{
                    background: i === 0 ? "#fffbf7" : "#fafafa",
                    borderColor: i === 0 ? "rgba(200,133,90,0.3)" : "rgba(26,22,18,0.08)"
                  }}>
                    <div className="w-date">{w.date}<br />{w.day}</div>
                    <div className="w-icon">{w.icon}</div>
                    <div className="w-temp">{w.high}° / {w.low}°</div>
                    <div className="w-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
              {/* 바람 정보 행 */}
              <div style={{ marginTop: 14, borderTop: "1px solid rgba(26,22,18,0.06)", paddingTop: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,22,18,0.35)", marginBottom: 10 }}>
                  💨 바람 (낮 12시 기준)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                  {data.map((w, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "rgba(26,22,18,0.4)", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>{w.date}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: w.wind >= 7 ? "#c8855a" : "#1a1612" }}>{w.wind}<span style={{ fontSize: 9, fontWeight: 400, marginLeft: 1 }}>m/s</span></div>
                      <div style={{ fontSize: 10, color: "rgba(26,22,18,0.45)", marginTop: 2 }}>{w.windDir}풍</div>
                      <div style={{ fontSize: 9, marginTop: 2, padding: "2px 4px", borderRadius: 4, background: w.wind >= 7 ? "#fdf3ec" : "#f5f5f5", color: w.wind >= 7 ? "#b06030" : "rgba(26,22,18,0.4)" }}>{w.windLevel}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "30px 0", color: "rgba(26,22,18,0.4)", fontSize: 13 }}>
              날씨를 불러올 수 없어요
            </div>
          )}
        </Card>

        {/* 날씨 팁 */}
        <Card>
          <div className="card-label">5월 날씨 준비물</div>
          <Row l="기온" v="낮 22~26°C / 밤 15~18°C" />
          <Row l="후지산 5합목" v="도쿄보다 10°C 이상 낮아요 · 바람막이 필수" />
          <Row l="강수" v="비교적 낮음 (우기 전)" />
          <Row l="자외선" v="강함 — 선크림 SPF50+ 필수" />
          <Row l="준비물" v="얇은 겉옷 · 접이식 우산" />
        </Card>
      </div>
    );
  }

  function renderPlaces() {
    function openMap(p) {
      const url = p.mapUrl || "https://www.google.com/maps/search/" + encodeURIComponent(p.mapQ);
      window.open(url, "_blank");
    }
    function openPhoto(e, p) {
      e.stopPropagation();
      window.open(p.photoUrl, "_blank");
    }
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
            <div key={i} className="place-item" onClick={() => openMap(p)}>
              <div style={{ flex: 1 }}>
                <div className="place-name">{p.name}</div>
                <div className="place-note">{p.note}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0, marginLeft: 12 }}>
                <span className="tag" style={{ background: "#eef3fb", color: "#3a6aaa" }}>{p.area}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {p.photoUrl && (
                    <button onClick={(e) => openPhoto(e, p)} style={{
                      fontSize: 11, padding: "3px 8px", borderRadius: 6,
                      background: "#fff3e0", border: "1px solid rgba(200,133,90,0.4)",
                      color: "#c8855a", cursor: "pointer", fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>📷 사진</button>
                  )}
                  {p.couponUrl && (
                    <button onClick={() => window.open(p.couponUrl, "_blank")} style={{
                      fontSize: 11, padding: "3px 8px", borderRadius: 6,
                      background: "#e8f5e9", border: "1px solid rgba(58,138,90,0.4)",
                      color: "#3a8a5a", cursor: "pointer", fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>🎫 쿠폰</button>
                  )}
                  <span className="place-map" style={{ color: p.mapUrl ? "#c8855a" : "rgba(26,22,18,0.3)", alignSelf: "center" }}>
                    {p.mapUrl ? "📍→" : "지도 →"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Card>
        <p style={{ fontSize: 11, color: "rgba(26,22,18,0.3)", textAlign: "center", marginTop: 8 }}>
          장소 탭 → 구글 지도 · 📷 버튼 → 참고 사진
        </p>
      </div>
    );
  }

  function renderPhrase() {
    const items = PHRASES[phraseTab] || [];
    return (
      <div>
        <div className="section-title">자주 쓰는 일본어</div>
        {/* 카테고리 탭 - flex wrap */}
        <div className="place-tab-row">
          {Object.keys(PHRASES).map(k => (
            <button key={k}
              className={"place-tab-btn" + (phraseTab === k ? " active" : "")}
              onClick={() => setPhraseTab(k)}>
              {k}
            </button>
          ))}
        </div>
        <Card>
          <div className="card-label" style={{ marginBottom: 14 }}>{phraseTab}</div>
          {items.map((item, ii) => (
            <div key={ii} className="phrase-item" style={{
              paddingTop: ii === 0 ? 0 : 12,
              borderTop: ii === 0 ? "none" : "1px solid rgba(26,22,18,0.06)",
              borderBottom: "none",
            }}>
              <div className="phrase-jp">{item.jp}</div>
              <div className="phrase-roma">{item.roma}</div>
              <div className="phrase-kr">{item.kr}</div>
            </div>
          ))}
        </Card>
        <p style={{ fontSize: 11, color: "rgba(26,22,18,0.3)", textAlign: "center", marginTop: 8 }}>
          탭을 선택하면 상황별 표현이 나와요
        </p>
      </div>
    );
  }

  function renderDocs() {
    const tabs = ["항공권", "탑승객", "바우처", "비상연락처"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => (
            <button key={i} className={"inner-tab" + (docsTab === i ? " active" : "")} onClick={() => setDocsTab(i)}>{t}</button>
          ))}
        </div>
        {docsTab === 0 && (
          <div>
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
          </div>
        )}
        {docsTab === 1 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>탑승객 4명 — 이티켓</div>
            {[
              ["KIM / YOUNGDEOK MR", "https://drive.google.com/file/d/13A5LBjiUUtxEr0CxKY1WOx9Xb_XZBm6B/view?usp=drivesdk"],
              ["KIM / HONGGWON MR", "https://drive.google.com/file/d/1PNT8JPpSNm6SlP2VD4AcTi-uzQWlTC-E/view?usp=drivesdk"],
              ["CHOI / JUNGLIM MS", "https://drive.google.com/file/d/120IOzF53Hcm3E5kyITcm7GEau1RI5Rie/view?usp=drivesdk"],
              ["KIM / SIEUN MISS CHD", "https://drive.google.com/file/d/1o3yzX010C0qXRAiZMS8i-nvlQeTzL0Qu/view?usp=drivesdk"],
            ].map((r, i) => (
              <div key={i} className="doc-ticket">
                <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1612" }}>{r[0]}</span>
                <a href={r[1]} target="_blank" rel="noreferrer" className="tag" style={{ background: "#fdf3ec", color: "#b06030", textDecoration: "none", flexShrink: 0 }}>티켓 보기</a>
              </div>
            ))}
          </Card>
        )}
        {docsTab === 2 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>바우처 모음</div>
            {[
              { name: "더 가든 — 숙소 바우처", sub: "5/15~5/17 · 2박", url: "https://drive.google.com/file/d/1zFcbuZs0LEzj_0Ae_4WR_WziA65W788Q/view?usp=drivesdk", color: "#3a6aaa", bg: "#eef3fb" },
              { name: "롯데 시티 호텔 — 숙소 바우처", sub: "5/17~5/19 · 2박", url: "https://drive.google.com/file/d/1MWGAx0Nmv1fENrJnJrKajJ6-QuR8QdkN/view?usp=drivesdk", color: "#b06030", bg: "#fdf3ec" },
              { name: "IX렌탈 — 렌트카 바우처", sub: "5/15 12:00 ~ 5/17 12:00", url: "https://drive.google.com/file/d/1Kb3NsJzCFhcYkMZRV73uq2vDeq08ZydE/view?usp=drivesdk", color: "#3a8a5a", bg: "#eef7f2" },
              { name: "나리타 익스프레스 — NEX 바우처", sub: "왕복 · 예약번호 BQP828461 · 5/15 & 5/19", url: "https://drive.google.com/file/d/1bMbXZ85A0ZqJ1WL66twdUZX94NBKDjHZ/view?usp=drivesdk", color: "#3a6aaa", bg: "#eef3fb" },
              { name: "나리타 익스프레스 — QR코드", sub: "지정석 자동판매기 발권용 · 예약번호 E20895", url: "https://drive.google.com/file/d/1wICgiS7xEgfY3aFH9M08moUdzUq0HhsV/view?usp=drivesdk", color: "#3a6aaa", bg: "#eef3fb" },
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
        )}
        {docsTab === 3 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>비상 연락처</div>
            <Row l="주일 한국 대사관" v="+81-3-3452-7611" hot />
            <Row l="일본 구급" v="119" hot />
            <Row l="일본 경찰" v="110" hot />
            <Row l="여행자보험" v="—" />
            <Row l="신용카드 분실" v="카드사 국제 전화번호" />
          </Card>
        )}
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
        area: "나리타 T1 스이카 구매", color: "#e06b5a", icon: "💳",
        items: [
          { title: "입국심사 후 1층으로 이동", desc: "수하물 수취 후 세관 통과하면 1층 도착 로비예요. 여기서 스이카를 구매할 수 있어요." },
          { title: "구매 장소 — JR 동일본 여행 서비스 센터", desc: "1층 도착 로비 나오자마자 정면 왼쪽에 'JR EAST Travel Service Center'가 있어요. 여기서 스이카 카드를 구매하세요. 영어·한국어 안내 가능해요." },
          { title: "자동판매기에서도 구매 가능", desc: "JR 개찰구 근처 초록색 자동판매기에서도 구매할 수 있어요. 화면에서 'Suica' 선택 → 'New Suica' → 금액 입력 순서로 진행하면 돼요." },
          { title: "초기 구매 금액", desc: "카드 보증금 500엔 포함이에요. 1인당 3,000~5,000엔 충전 추천해요. 4명이면 총 12,000~20,000엔 준비하세요." },
          { title: "충전 방법", desc: "역 내 자동판매기에서 언제든 충전 가능해요. 편의점(세븐일레븐 등)에서도 충전할 수 있어요." },
          { title: "귀국 시 환불", desc: "한국 귀국 후 일본 방문 시 다시 사용 가능해요. 환불 원하면 나리타 JR 창구에서 잔액 + 보증금 500엔 돌려받을 수 있어요." },
        ],
        link: { label: "📖 스이카 구매 상세 가이드", url: "https://m.blog.naver.com/llk33/224235470148" },
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
    const tip = tips[tipsTab];
    return (
      <div>
        <div className="inner-tab-row">
          {tips.map((t, i) => (
            <button key={i} className={"inner-tab" + (tipsTab === i ? " active" : "")}
              onClick={() => setTipsTab(i)}>
              {t.icon} {t.area}
            </button>
          ))}
        </div>
        <Card>
          <div className="card-label" style={{ color: tip.color, marginBottom: 16 }}>
            {tip.icon} {tip.area}
          </div>
          {tip.items.map((item, ii) => (
            <div key={ii} style={{
              padding: "12px 0",
              borderBottom: ii < tip.items.length - 1 ? "1px solid rgba(26,22,18,0.06)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: tip.color, flexShrink: 0, marginTop: 5 }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1612" }}>{item.title}</div>
              </div>
              <div style={{ fontSize: 12, color: "rgba(26,22,18,0.55)", lineHeight: 1.7, paddingLeft: 14 }}>{item.desc}</div>
            </div>
          ))}
          {tip.link && (
            <a href={tip.link.url} target="_blank" rel="noreferrer" className="link-btn" style={{ background: "#eef3fb", color: "#3a6aaa", marginTop: 14 }}>
              {tip.link.label}
            </a>
          )}
        </Card>
      </div>
    );
  }

  var RENDERERS = { schedule: renderSchedule, hotel: renderHotel, checklist: renderChecklist, rental: renderRental, transport: renderTransport, weather: renderWeather, places: renderPlaces, phrase: renderPhrase, docs: renderDocs, tips: renderTips };

  return (
    <div className="app">
      <style>{css}</style>
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-jp">우리들의 행복한 칠순여행 🎊</div>
        <div className="hero-title">도쿄 여행</div>
        <div className="hero-sub">가족 여행 · 4박 5일</div>
        <div className="pill-row">
          <span className="pill">✈ 5/15 — 5/19</span>
          <span className="pill">4명</span>
          <span className="pill">도쿄 · 후지산 · 가마쿠라 · 후지카와구치코 · 시즈오카</span>
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
