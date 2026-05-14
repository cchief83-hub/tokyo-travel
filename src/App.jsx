import { useState } from "react";

const TABS = [
  { id: "schedule", label: "일정표", icon: "📅" },
  { id: "hotel", label: "숙소", icon: "🏨" },
  { id: "checklist", label: "준비물", icon: "✅" },
  { id: "rental", label: "렌트카", icon: "🚗" },
  { id: "transport", label: "교통", icon: "🚃" },
  { id: "restaurant", label: "식당", icon: "🍽" },
  { id: "places", label: "장소메모", icon: "📍" },
  { id: "phrase", label: "일본어", icon: "🗣" },
  { id: "docs", label: "중요서류", icon: "📄" },
  { id: "tips", label: "여행팁", icon: "💡" },
];

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
      { time: "11:00", place: "NEX 티켓 교환 → 탑승", note: "B1 북쪽 윙 JR 동일본 여행 서비스 센터 · 여권 + 바우처 제시" },
      { time: "11:53", place: "나리타 익스프레스 도쿄역 도착", note: "약 53분 · 환승 없이 직행", map: mapDir("東京駅") },
      { time: "12:00", place: "도쿄역 → 아사쿠사바시역", note: "JR 소부선 1정거장 · 약 3분 · 170엔" },
      { time: "12:30", place: "IX렌탈 픽업 (아사쿠사바시역)", note: "토요타 알파드 · 국제운전면허증 + 여권 필수", map: mapDir("1-16-3 Yanagibashi, Taito-ku, Tokyo") },
      { time: "14:00", place: "① 가마쿠라 대불 高徳院", note: "도착하자마자 바로! · 입장료 300엔 · ⚠ 17:00 마감", map: mapDir("鎌倉大仏 高徳院") },
      { time: "14:45", place: "② 고마치도리 小町通り", note: "기념품 · 길거리 음식 · ⚠ 17~18시 조기마감 주의", map: mapDir("小町通り 鎌倉") },
      { time: "16:00", place: "③ TANAKA Barber Shop", note: "이사랑통역되나요 촬영지 · ⚠ 사진 전 주인께 양해 필수", map: mapDir("TANAKA Barber Shop Hase Kamakura") },
      { time: "16:15", place: "④ 고쿠라쿠지역 極楽寺駅", note: "차로 5분 · 이사랑통역되나요 촬영지 · 고즈넉한 에노덴 역", map: mapDir("極楽寺駅 鎌倉") },
      { time: "16:30", place: "⑤ 시치리가하마역 수로 포토스팟", note: "차로 5분 · 수로 끝으로 바다가 보이는 인스타 감성 스팟", map: "https://maps.google.com/?cid=12702870331904269387" },
      { time: "16:45", place: "⑥ 시치리가하마 고등학교 앞 건널목", note: "바로 근처 · 에노덴+바다+하늘 포토스팟", map: "https://maps.google.com/?cid=422530369093211191" },
      { time: "17:00", place: "⑦ 시치리가하마 해변 七里ヶ浜", note: "후지산+바다 조망 · 일몰 명소 · 산책 30분", map: "https://maps.google.com/?cid=11344940212826062752" },
      { time: "17:30", place: "⑧ 가마쿠라코코마에역 건널목 🍽", note: "슬램덩크 배경지 · 사진 후 근처에서 저녁식사", map: "https://maps.google.com/?cid=1819797686801071229" },
      { time: "19:00", place: "가마쿠라 저녁식사 후 출발", note: "가마쿠라코코마에역 근처 식당 · 후지카와구치코까지 약 2시간 30분", map: mapSearch("鎌倉高校前 レストラン") },
      { time: "19:00", place: "후지카와구치코 출발", note: "렌트카로 약 2시간 30분", map: mapDir("Funatsu 3554, Fujikawaguchiko, Yamanashi") },
      { time: "21:30", place: "더 가든 체크인", note: "늦은 도착 · 숙소 사전 연락 필요", map: mapDir("Funatsu 3554, Fujikawaguchiko, Yamanashi") },
    ],
  },
  {
    date: "5/16", day: "토", theme: "아라쿠라야마 · 히카와 · 오시노 · 시즈오카",
    color: "#5a8fc8",
    items: [
      { time: "06:30", place: "더 가든 출발", note: "후지산 오전이 가장 맑아요 · 일찍 출발!" },
      { time: "06:40", place: "로손 후지카와구치코 타운홀 📸", note: "SNS 유명 포토스팟 · 편의점+후지산 구도 · 이른 아침 한적 · 5~10분", map: mapDir("ローソン富士河口湖タウンホール") },
      { time: "07:00", place: "아라쿠라야마 센겐 공원", note: "오중탑+후지산 뷰 · 계단 397개 · 이른 아침 한적 · 약 1시간", map: mapDir("新倉山浅間公園 富士吉田") },
      { time: "08:15", place: "히카와 시계점 혼마치도리", note: "레트로 상점가 끝에 후지산 · 차로 5분 · 약 20분", map: mapDir("日川時計店 下吉田本町通り") },
      { time: "08:45", place: "아침식사 (요시다 우동)", note: "후지요시다 명물 · 현지인 맛집", map: mapSearch("吉田うどん 富士吉田") },
      { time: "10:00", place: "오시노 핫카이 (忍野八海)", note: "후지산 용수 연못 · 세계문화유산 · 부모님 산책 최적 · 약 1시간 30분", map: mapDir("忍野八海") },
      { time: "11:45", place: "오이시 공원", note: "5월 라벤더+후지산 파노라마 · 무료 · 차로 20분 · 약 30분", map: mapDir("大石公園 河口湖") },
      { time: "12:30", place: "시즈오카(후지시) 출발 🚗", note: "오시노에서 약 40~50분", map: mapDir("Tadehara, Fuji, Shizuoka") },
      { time: "13:30", place: "후지산 꿈의대교 富士山夢の大橋 📸", note: "414m 보행자 전용 다리 · 다리 끝에 후지산 정면 구도 · 줄서기 있음 · 이른 오후 추천 · 24시간 무료", map: mapDir("富士山夢の大橋 Tadehara Fuji Shizuoka") },
      { time: "14:30", place: "후지스카이뷰 관람차 Fuji Sky View 🎡", note: "후지산+스루가만 뷰 · 투명 바닥 곤돌라 있음 · 10:00~18:00", map: mapDir("Fuji Sky View Iwabuchi Fuji Shizuoka") },
      { time: "15:30", place: "후지산뷰 스타벅스 ☕ 📸", note: "후지카와 서비스에리어(하행) · 창밖으로 후지산 뷰 · 07:00~22:00", map: mapDir("Starbucks Fujikawa Service Area Fuji Shizuoka") },
      { time: "16:30", place: "시즈오카 오뎅거리", note: "시즈오카 명물 오뎅 · 아오바 요코초 이자카야 골목", map: mapSearch("静岡おでん街 青葉横丁") },
      { time: "18:30", place: "후지카와구치코 출발 · 숙소 복귀", note: "약 1시간 30분", map: mapDir("Funatsu 3554, Fujikawaguchiko, Yamanashi") },
      { time: "20:00", place: "더 가든 도착", note: "내일 미시마 대비 일찍 쉬어요!", map: mapSearch("Funatsu 3554 Fujikawaguchiko") },
    ],
  },
  {
    date: "5/17", day: "일", theme: "후지산 → 도쿄 · 아사쿠사 · 도쿄타워",
    color: "#7a5ac8",
    items: [
      { time: "07:30", place: "더 가든 체크아웃", note: "짐 정리 · 렌트카 출발 준비", map: mapSearch("Funatsu 3554, Fujikawaguchiko") },
      { time: "07:40", place: "가와구치코 호수 산책", note: "마지막 후지산 조망 · 30분", map: mapDir("河口湖") },
      { time: "08:10", place: "도쿄 방면 출발", note: "아사쿠사바시역까지 약 2시간" },
      { time: "10:15", place: "IX렌탈 반납 (아사쿠사바시역)", note: "동일 지점 반납 · 렌트카 여행 마무리!", map: mapDir("1-16-3 Yanagibashi, Taito-ku, Tokyo") },
      { time: "10:45", place: "지하철로 긴시쵸역 이동", note: "JR 소부선 · 약 10분 · 230엔", map: mapDir("錦糸町駅") },
      { time: "11:00", place: "롯데 시티 호텔 체크인", note: "짐 맡기고 바로 출발!", map: mapDir("4-6-1 Kinshi, Sumida-ku, Tokyo") },
      { time: "12:00", place: "센소지 · 아사쿠사", note: "나카미세도리 기념품 쇼핑 · 무료입장", map: mapDir("浅草寺") },
      { time: "17:00", place: "시바공원 · 도쿄타워 외관 📸", note: "잔디밭에 앉아 도쿄타워 포토 · 해질녘 황금빛 조명 추천", map: mapDir("芝公園 東京タワー") },
      { time: "18:30", place: "조조지 절 · 도쿄타워 야경 📸", note: "절+도쿄타워 한 프레임 포토스팟", map: mapDir("増上寺 東京タワー") },
      { time: "19:30", place: "오모이데요코초 저녁식사 🍢", note: "신주쿠 서쪽 출구 · 야키토리 이자카야 골목", map: mapDir("思い出横丁 新宿") },
      { time: "20:30", place: "가부키초 야경 🌃", note: "동쪽 출구 도보 5분 · 네온사인 · 가부키초 타워 · 밤에 와야 진짜 감성!", map: mapDir("歌舞伎町 新宿") },
    ],
  },
  {
    date: "5/18", day: "월", theme: "신주쿠 · 하라주쿠 · 시부야",
    color: "#5ac88a",
    items: [
      { time: "10:00", place: "신주쿠 교엔", note: "입장료 500엔 · 넓은 정원 산책 · 부모님 최적 · 월요일 휴무 없음", map: mapDir("新宿御苑") },
      { time: "12:00", place: "신주쿠 점심식사", note: "신주쿠 교엔 근처 · 이치란 라멘 또는 카이센동 추천", map: mapSearch("新宿 ランチ おすすめ") },
      { time: "13:00", place: "알펜 도쿄 — 온러닝 쇼핑 🛍", note: "신주쿠역 동쪽 도보 3분 · 면세 10% + 쿠폰 추가 할인 · 여권 지참!", map: mapDir("アルペン東京 新宿") },
      { time: "14:30", place: "하라주쿠 다케시타도리", note: "크레이프 · 팝 패션 · 구경 재미있는 곳", map: mapDir("竹下通り 原宿") },
      { time: "15:30", place: "산리오 하라주쿠점 🎀", note: "다케시타도리에서 도보 3분 · 1~2F · 시은이 데리고 가기! · 11:00~19:00", map: "https://maps.google.com/?cid=15015373924086568088" },
      { time: "16:30", place: "시부야 스크램블 교차로 📸", note: "맞은편 스타벅스 2층 뷰포인트 추천", map: mapDir("渋谷スクランブル交差点") },
      { time: "17:00", place: "시부야 스카이 전망대", note: "360° 옥상 전망대 · 사전예매 필수!", map: mapDir("渋谷スカイ") },
      { time: "18:30", place: "산리오 시부야109점 🎀", note: "시부야109 6층 · 시은이와 쇼핑 2라운드! · 10:00~21:00", map: "https://maps.google.com/?cid=8019591697534218844" },
      { time: "19:30", place: "시부야 저녁식사 후 귀가 🏨", note: "시부야 스크램블 스퀘어 · 다양한 식당 · 내일 귀국 대비 일찍 쉬어요!", map: mapSearch("渋谷 夕食 レストラン") },
    ],
  },
  {
    date: "5/19", day: "화", theme: "귀국일 · 긴시쵸 → 도쿄역 → 나리타 T1",
    color: "#c8855a",
    items: [
      { time: "07:00", place: "기상 · 짐 최종 정리", note: "캐리어 잠금 · 여권·항공권·NEX 실물 티켓 손에 들고 출발" },
      { time: "07:30", place: "롯데 시티 호텔 체크아웃", note: "프런트 체크아웃 · 잊은 물건 없는지 최종 확인", map: mapDir("4-6-1 Kinshi, Sumida-ku, Tokyo") },
      { time: "07:40", place: "긴시쵸역 출발 → 도쿄역", note: "호텔 5번 출구 → 긴시쵸역 · JR 소부선 탑승 · 약 15분 · 230엔 (스이카 사용)", map: mapDir("錦糸町駅") },
      { time: "08:00", place: "도쿄역 도착 · NEX 승강장 이동", note: "요코스카선·소부선 쾌속 지하 승강장 (B4F) 으로 이동 · 안내판에서 '成田エクスプレス' 확인", map: mapDir("東京駅") },
      { time: "08:10", place: "NEX 도쿄역 탑승 🚄", note: "5/15에 지정받은 실물 티켓으로 탑승 · 짐은 좌석 뒤 선반 또는 출입문 옆 수납공간 이용", map: mapSearch("成田エクスプレス 東京駅 乗り場") },
      { time: "09:03", place: "나리타 공항 T1 도착", note: "약 53분 소요 · 도착 후 바로 체크인 카운터로 이동" },
      { time: "09:10", place: "에어부산 체크인 카운터", note: "BX111 · 출발 105분 전 · T1 3층 카운터 · 수하물 위탁", map: mapSearch("成田空港 第1ターミナル エアプサン チェックイン") },
      { time: "09:40", place: "출국 심사 · 보안 검색", note: "여권 + 탑승권 준비 · 액체류 100ml 이하 · 보조배터리 기내 수하물로" },
      { time: "10:00", place: "면세 쇼핑 · 탑승 대기", note: "T1 면세구역 · 마지막 쇼핑 기회! · 게이트 확인 필수" },
      { time: "10:30", place: "탑승 게이트 이동 · 탑승 시작", note: "출발 25분 전 게이트 앞 대기" },
      { time: "10:55", place: "나리타 공항 출발 ✈", note: "에어부산 BX111 · 나리타 T1 출발" },
      { time: "13:15", place: "부산 김해공항 도착 🎉", note: "입국심사 · 수하물 수령 후 귀가" },
    ],
  },
];

const CHECKLIST_GROUPS = [
  { title: "서류 · 결제", color: "#e06b5a", items: ["여권 (4명 모두)","국제운전면허증 (1949년 협약 IDP)","항공권 출력 또는 앱","숙소 예약 확인서 (2곳)","렌트카 바우처 (클룩)","여행자보험 서류","신용카드 / 현금 엔화","교통카드 (스이카)"] },
  { title: "의류 · 신발", color: "#5a8fc8", items: ["반팔 티셔츠","얇은 가디건 또는 바람막이","편한 운동화","접이식 우산","선크림 SPF50+","모자"] },
  { title: "부모님 건강 · 의약품", color: "#5ac88a", items: ["평소 복용 약 (5일분+여유)","두통약","지사제 / 소화제","반창고 세트","파스 (이동 대비)","마스크"] },
  { title: "전자기기", color: "#a07ac8", items: ["스마트폰 충전기 (4개)","보조배터리","멀티어댑터 (일본 110V A타입)","이어폰"] },
];

const RESTAURANTS = {
  "가마쿠라": [
    { name: "미요시 우동 Miyoshi ⭐⭐", area: "고마치도리", note: "수제 우동 · 미슐랭 2스타 맛집. 면을 직접 뽑아서 쫄깃함이 남달라요. 찍어먹는 쯔케멘 스타일로, 새우튀김이랑 같이 먹으면 조합이 딱이에요. 고마치도리 한복판에 있어서 쇼핑하다 들르기 좋아요. 웨이팅 있으니 구글맵 예약 먼저! · 월~금 11:15~18:00 · 토~일 11:15~19:00", mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJzWCs28BFGGARvEa7rlxczIY" },
    { name: "요리도코로 yoridokoro", area: "이나무라가사키", note: "구운 생선 정식 · 에노덴 철길 바로 옆 창가 자리에 앉으면 밥 먹다가 에노덴이 코앞으로 지나가요. 고등어·전갱이 구이 정식에 달걀 흰자를 직접 거품 내서 밥에 비벼먹는 게 특이하고 맛있어요. 아침 7시부터 열어서 후지산 출발 전 들르기 좋아요. 화요일 휴무 · 예약 필수(TableCheck, 예약금 1,000엔)", mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJAQA96VlPGGAR0TqpQJDAg_A" },
    { name: "Espresso D Works ☕🍳", area: "시치리가하마", note: "오므라이스·함박스테이크 · 시치리가하마 해변이 바로 창밖에 펼쳐지는 2층 카페예요. 오므라이스 소스가 진하고 부드러워서 뷰랑 같이 먹으면 배가 두 배로 불러요. 웨이팅이 있으니 도착하자마자 번호표 먼저 뽑으세요. 카드 결제만 가능 · 08:00~20:00", mapUrl: "https://www.google.com/maps/place/Espresso+D+Works/@35.3059027,139.5073276,17z" },
  ],
  "후지카와구치코": [
    { name: "호토 후도 ほうとう不動", area: "가와구치코", note: "호토 전골 · 후지산 기슭 지역의 향토 음식이에요. 칼국수보다 넓고 납작한 면을 된장 국물에 호박·무·당근이랑 푹 끓여낸 냄비 요리예요. 추운 날씨에 딱이고, 후지산 보고 내려온 뒤 몸 녹이기 최고예요. 줄 서는 경우 많으니 여유있게 방문!", mapUrl: "https://www.google.com/maps/search/ほうとう不動+河口湖" },
    { name: "요시다 우동 시로이야", area: "후지요시다", note: "요시다 우동 · 후지요시다 지역 명물로, 일반 우동보다 면이 훨씬 굵고 강하고 쫄깃해요. 말고기 고명을 얹어먹는 현지 스타일인데, 낯설어도 한번 도전해볼 만해요. 아침 일찍부터 열어서 16일 아라쿠라야마 가기 전에 들르기 딱이에요.", mapUrl: "https://www.google.com/maps/search/吉田うどん+しろいや+富士吉田" },
    { name: "더 가든 숙소 식당", area: "후지카와구치코", note: "일본 가정식 정식 · 숙소 안에 있어서 늦게 돌아오는 날 편하게 이용할 수 있어요. 시즈오카 갔다가 밤 늦게 돌아오는 16일 저녁에 특히 유용해요.", mapUrl: "https://www.google.com/maps/search/The+Garden+Fujikawaguchiko" },
  ],
  "시즈오카": [
    { name: "아오바 오뎅 요코초 青葉おでん街", area: "시즈오카 시내", note: "시즈오카 오뎅 · 서울 오뎅이랑 전혀 달라요. 검은 다시마 국물에 꼬치를 담가 우려낸 독특한 맛이에요. 좁은 골목에 이자카야들이 줄지어 있고, 꼬치 하나씩 골라서 서서 먹는 분위기가 시즈오카 밤의 핵심이에요. 저녁 방문 추천!", mapUrl: "https://www.google.com/maps/search/青葉おでん街+静岡" },
    { name: "시즈오카 사쿠라 에비 맛집", area: "시즈오카 시내", note: "벚꽃새우 덮밥 · 스루가만에서만 잡히는 작고 빨간 벚꽃새우를 밥 위에 듬뿍 올린 덮밥이에요. 생새우 또는 튀김 중 선택할 수 있고, 5월이 딱 제철이라 이 시기에 먹으면 최고예요.", mapUrl: "https://www.google.com/maps/search/桜えび丼+静岡" },
    { name: "스타벅스 후지카와 SA ☕", area: "후지카와 SA (고속도로)", note: "커피·음료 · 고속도로 휴게소 안에 있는 스타벅스인데, 창밖으로 후지산이 정면으로 보여요. 시즈오카에서 숙소로 복귀하는 길에 잠깐 들러서 커피 한잔 하며 후지산 구경하기 딱이에요.", mapUrl: "https://www.google.com/maps/search/スターバックス+富士川サービスエリア" },
  ],
  "아사쿠사": [
    { name: "아사쿠사 요코초 浅草横丁", area: "아사쿠사", note: "야키토리·스시·장어 등 · 센소지 바로 옆 건물 4층 전체가 먹거리 공간이에요. 7개 식당이 입점해 있고, 일본 전통 축제 공연을 테이블 바로 옆에서 볼 수 있어요. 에도시대 감성의 분위기가 가족 여행에 딱 맞아요. 12:00~23:00", mapUrl: "https://www.google.com/maps/search/浅草横丁+東京楽天地" },
    { name: "후쿠다 天ぷら", area: "아사쿠사", note: "튀김 덴뿌라 · 해산물과 채소를 얇고 바삭하게 튀겨내는 일본식 튀김 전문점이에요. 기름기 없이 가볍게 먹을 수 있어서 부모님 입맛에도 잘 맞아요. 런치 세트 1,800엔으로 부담 없어요.", mapUrl: "https://www.google.com/maps/search/天ぷら福田+浅草" },
    { name: "아사쿠사 이마한 浅草今半", area: "아사쿠사", note: "스키야키·샤부샤부 · 100년 넘은 노포예요. 달콤한 간장 국물에 와규 소고기를 익혀먹는 스키야키는 일본에서 꼭 먹어봐야 할 요리 중 하나예요. 특별한 저녁 식사로 추천해요. 런치 세트 있음.", mapUrl: "https://www.google.com/maps/search/浅草今半+浅草" },
    { name: "나카미세도리 길거리 음식", area: "나카미세도리", note: "길거리 간식 · 센소지 참배길 양쪽에 늘어선 가게들에서 닌교야키(팥앙금 인형빵), 멜론빵, 전병과자(센베이) 등을 걸어다니며 먹는 재미가 있어요. 시은이도 엄청 좋아할 거예요!", mapUrl: "https://www.google.com/maps/search/仲見世通り+浅草+食べ歩き" },
    { name: "아사쿠사 멘야 무사시", area: "아사쿠사", note: "라멘·츠케멘 · 진한 돈코츠·간장 베이스 라멘 맛집이에요. 면을 국물에 찍어먹는 츠케멘도 인기예요. 웨이팅 있을 수 있어요.", mapUrl: "https://www.google.com/maps/search/麺屋武蔵+浅草" },
  ],
  "오모이데요코초": [
    { name: "오모이데요코초 야키토리 골목", area: "신주쿠 서쪽", note: "야키토리 이자카야 골목 · 신주쿠역 서쪽 출구에서 나오면 바로 보이는 좁은 골목이에요. 쇼와시대 느낌 그대로인 낡은 간판과 연기, 야키토리 굽는 냄새가 가득해요. 일본 드라마에서 본 그 분위기예요. 저녁 추천!", mapUrl: "https://maps.google.com/?cid=11209413547498426191" },
    { name: "야키토리 이자카야 다이치", area: "오모이데요코초", note: "야키토리 · 닭꼬치 모둠과 생맥주 조합이 진리예요. 좌석이 작고 다닥다닥 붙어있어서 옆 사람이랑 어깨 맞대고 먹는 그 좁은 분위기가 오히려 재미있어요.", mapUrl: "https://www.google.com/maps/search/思い出横丁+やきとり" },
    { name: "모츠야키 이자카야", area: "오모이데요코초", note: "내장 구이 모츠야키 · 소·돼지 내장을 꼬치에 꿰어 구워내는 전문점이에요. 현지인 단골이 많은 진짜 서민 이자카야 분위기예요. 안 드셔봤다면 한번 도전해볼 만해요!", mapUrl: "https://www.google.com/maps/search/思い出横丁+もつ焼き" },
  ],
  "가부키초": [
    { name: "이치란 라멘 신주쿠점 一蘭", area: "가부키초", note: "돈코츠 라멘 · 후쿠오카 원조 돈코츠 라멘 체인이에요. 1인 칸막이 좌석에 앉아서 면 굵기·국물 진하기·파 양 등을 본인 취향대로 주문지에 체크해서 내면 줘요. 가부키초 야경 보고 늦게 먹어도 되는 24시간 영업!", mapUrl: "https://www.google.com/maps/search/一蘭+新宿歌舞伎町" },
    { name: "가부키초 타워 레스토랑", area: "가부키초", note: "다양한 장르 · 가부키초 타워 내 여러 식당이 입점해 있어요. 네온사인 야경이 내려다보이는 자리에서 식사할 수 있어요. 이자카야·일식·양식 다양하게 선택 가능해요.", mapUrl: "https://www.google.com/maps/search/歌舞伎町タワー+レストラン" },
    { name: "규카츠 모토무라 牛かつ", area: "신주쿠", note: "규카츠 소고기 돈카츠 · 돼지 대신 소고기를 튀긴 거예요. 겉은 바삭하고 안은 레어로 튀겨서 작은 돌판에 직접 구워가며 먹는 방식이에요. 처음엔 낯설지만 한 번 먹으면 빠져요. 줄 서는 맛집!", mapUrl: "https://www.google.com/maps/search/牛かつもと村+新宿" },
  ],
  "신주쿠": [
    { name: "신주쿠 카이센동 우오가시", area: "신주쿠", note: "해산물 덮밥 · 참치·연어·성게·이쿠라(연어알) 등 신선한 해산물을 밥 위에 듬뿍 올려주는 덮밥이에요. 신주쿠 교엔 산책 후 점심으로 딱이에요.", mapUrl: "https://www.google.com/maps/search/新宿+海鮮丼" },
    { name: "쿠로부타 돈카츠 마이센", area: "신주쿠", note: "돈카츠 · 가고시마산 흑돼지(쿠로부타)를 두껍게 잘라 바삭하게 튀긴 돈카츠예요. 일반 돈카츠보다 육즙이 훨씬 풍부해요. 70년 된 노포라 믿고 먹을 수 있어요. 런치 세트 인기!", mapUrl: "https://www.google.com/maps/search/まい泉+新宿" },
    { name: "신주쿠 스시 오마카세", area: "신주쿠", note: "스시 오마카세 · 셰프가 그날 가장 좋은 생선으로 코스를 짜서 한 점씩 내주는 방식이에요. 점심에는 3,000엔대로 비교적 합리적이에요. 일본에서 스시 제대로 먹어보고 싶다면 추천! 예약 권장.", mapUrl: "https://www.google.com/maps/search/新宿+寿司+おまかせ+ランチ" },
  ],
  "시부야": [
    { name: "시부야 스크램블 스퀘어 레스토랑", area: "시부야", note: "다양한 장르 · 시부야 스카이 전망대가 있는 바로 그 건물이에요. 레스토랑 층에서 야경 내려다보며 먹을 수 있어요. 일식·이탈리안·카페 등 다양해서 가족 입맛에 맞게 고르기 좋아요.", mapUrl: "https://www.google.com/maps/search/渋谷スクランブルスクエア+レストラン" },
    { name: "이치란 라멘 시부야점", area: "시부야", note: "돈코츠 라멘 · 신주쿠점이랑 같은 이치란이에요. 시부야 저녁 일정 마치고 돌아가는 길에 야식으로 먹기 딱이에요. 24시간 영업.", mapUrl: "https://www.google.com/maps/search/一蘭+渋谷" },
    { name: "시부야 히카리에 레스토랑", area: "시부야", note: "다양한 장르 · 시부야역에서 바로 연결되는 히카리에 건물 11층이에요. 비 오거나 덥거나 추울 때 이동 없이 바로 들어가서 먹을 수 있어서 편해요.", mapUrl: "https://www.google.com/maps/search/渋谷ヒカリエ+レストラン" },
    { name: "마구로 식당 참치 전문", area: "시부야", note: "참치 해산물 덮밥 · 참치 뱃살(토로)·붉은살(아카미)을 듬뿍 올린 마구로동이에요. 일본에서 참치를 이 가격에 이 퀄리티로 먹을 수 있는 건 흔치 않아요. 런치·디너 모두 가능.", mapUrl: "https://www.google.com/maps/search/渋谷+まぐろ丼" },
  ],
};

const PLACES = {
    { name: "후지요시다 시청 앞 보행로", area: "후지요시다", note: "전봇대+후지산 압도적 구도 · SNS 바이럴 스팟 · 새벽~아침 시간대 추천", mapUrl: "https://www.google.com/maps/search/富士吉田市役所+富士山+撮影スポット", photoUrl: "https://drive.google.com/file/d/14tpss_nfnnQke4CK2POwaVI-TvwrU563/view?usp=drivesdk" },
    { name: "후지큐 하이랜드 대관람차", area: "후지요시다", note: "관람차+후지산 한 프레임 포토스팟 · 입장 무료 (놀이기구별 요금)", mapUrl: "https://www.google.com/maps/search/富士急ハイランド", photoUrl: "https://drive.google.com/file/d/1KtKDpuD9-t6DWKRCojwo52G8g9Ufh-2X/view?usp=drivesdk" },
    { name: "후지산 5합목", area: "후지산", note: "렌트카로 이동 · 맑은 날 정상 조망 · 오전이 확률 높음", mapUrl: "https://www.google.com/maps/search/富士山五合目+富士スバルライン" },
    { name: "오시노 핫카이 忍野八海", area: "오시노", note: "후지산 용수 연못 · 세계문화유산 · 부모님 산책 최적", mapUrl: "https://www.google.com/maps/search/忍野八海" },
    { name: "가와구치코 유람선", area: "가와구치코", note: "호수에서 후지산 조망 · 약 20분", mapUrl: "https://www.google.com/maps/search/河口湖遊覧船" },
    { name: "오이시 공원 大石公園", area: "가와구치코", note: "라벤더+후지산 · 5월 꽃밭 시즌 · 무료입장", mapUrl: "https://www.google.com/maps/search/大石公園+河口湖" },
  ],
  시부야: [
    { name: "시부야 스크램블 교차로", area: "시부야", note: "세계에서 가장 바쁜 횡단보도 · 맞은편 스타벅스 2층 뷰포인트", mapUrl: "https://maps.google.com/?cid=10518167498657889568" },
    { name: "시부야 스카이 Shibuya Sky", area: "시부야", note: "360° 옥상 전망대 · 사전예매 필수 · 화요일 휴무", mapUrl: "https://maps.google.com/?cid=8019591697534218844" },
    { name: "시부야 스크램블 스퀘어", area: "시부야", note: "시부야 스카이 입점 건물 · 쇼핑 · 레스토랑", mapUrl: "https://maps.google.com/?cid=13329726600088760943" },
  ],
  하라주쿠: [
    { name: "다케시타도리 竹下通り", area: "하라주쿠", note: "일본 최고 크레이프 · 팝 패션 · 하라주쿠역 도보 1분", mapUrl: "https://maps.google.com/?cid=14534979862793551001" },
    { name: "메이지 신궁 明治神宮", area: "하라주쿠", note: "도쿄 최대 신사 · 울창한 숲길 · 무료입장", mapUrl: "https://maps.google.com/?cid=10557131434248978590" },
    { name: "오모테산도 表参道", area: "오모테산도", note: "명품 거리 · 카페 · 건축 감상", mapUrl: "https://www.google.com/maps/search/表参道+東京" },
  ],
  신주쿠: [
    { name: "오모이데 요코초 思い出横丁", area: "신주쿠", note: "추억의 골목 · 이자카야 야키토리 · 야경 감성", mapUrl: "https://maps.google.com/?cid=11209413547498426191" },
    { name: "신주쿠 교엔 新宿御苑", area: "신주쿠", note: "입장료 500엔 · 부모님 산책 최적 · 월요일 휴무", mapUrl: "https://maps.google.com/?cid=14439497453018948607" },
    { name: "도쿄 도청 전망대", area: "신주쿠", note: "무료 · 202m · 후지산 조망 가능", mapUrl: "https://www.google.com/maps/search/東京都庁展望台" },
    { name: "가부키초 歌舞伎町", area: "신주쿠", note: "네온사인 야경 · 가부키초 타워 · 저녁 추천", mapUrl: "https://www.google.com/maps/search/歌舞伎町+新宿" },
  ],
  관광지: [
    { name: "센소지 浅草寺", area: "아사쿠사", note: "무료 입장 · 이른 아침 추천", mapUrl: "https://maps.google.com/?cid=10715857298462072914" },
    { name: "시바 공원 芝公園", area: "다이몬", note: "잔디밭에 앉아 도쿄타워 포토스팟 · 무료 · 24시간", mapUrl: "https://maps.google.com/?cid=11312766523862247942", photoUrl: "https://drive.google.com/file/d/1zgyczU96mPgF0PH1lM08CH1u9oZzpIfh/view?usp=drivesdk" },
    { name: "조조지 절 増上寺", area: "다이몬", note: "도쿄타워+절 한 프레임 최고 포토스팟", mapUrl: "https://maps.google.com/?cid=9846179875119807780" },
    { name: "도쿄타워 외관", area: "다이몬", note: "해질녘~야경 추천 · 무료", mapUrl: "https://maps.google.com/?cid=5195627782660688349" },
    { name: "아자부다이힐스 麻布台ヒルズ", area: "롯폰기", note: "2023년 오픈 · 도쿄타워 뷰 · 팀랩 보더리스", mapUrl: "https://maps.google.com/?cid=4557431226793109441" },
    { name: "롯폰기 힐즈 六本木ヒルズ", area: "롯폰기", note: "도쿄타워 야경 뷰포인트 · 거미 조형물 포토스팟", mapUrl: "https://maps.google.com/?cid=6628738211295053826" },
  ],
  쇼핑: [
    { name: "알펜 도쿄 (온러닝 구매 추천)", area: "신주쿠", note: "온러닝 전 라인업 · 면세 10% + 쿠폰 할인 추가 · 발 분석 기계 보유", mapUrl: "https://www.google.com/maps/search/アルペン東京+新宿3丁目", couponUrl: "https://drive.google.com/file/d/1fyoHyl6447Qygq1W5QJGLYi9G7i1FPbp/view?usp=drivesdk" },
    { name: "마츠모토키요시", area: "아사쿠사", note: "드럭스토어 · 면세 가능", mapUrl: "https://www.google.com/maps/search/マツモトキヨシ+浅草" },
    { name: "돈키호테 ドン・キホーテ", area: "신주쿠", note: "24시간 · 기념품 저렴", mapUrl: "https://www.google.com/maps/search/ドン・キホーテ+新宿" },
    { name: "아메요코 시장 アメ横", area: "우에노", note: "건어물 · 과자 · 화장품", mapUrl: "https://www.google.com/maps/search/アメ横+上野" },
  ],
  가마쿠라: [
    { name: "① 가마쿠라 대불 高徳院", area: "하세", note: "14:00 · 도착하자마자 바로! · 입장료 300엔 · ⚠ 17:00 마감", mapUrl: "https://maps.google.com/?cid=2216777826481991500" },
    { name: "② 고마치도리 小町通り", area: "가마쿠라역", note: "14:45 · 기념품 · 길거리 음식 · ⚠ 17~18시 조기마감 주의", mapUrl: "https://www.google.com/maps/search/小町通り+鎌倉" },
    { name: "③ TANAKA Barber Shop", area: "하세", note: "16:00 · 이사랑통역되나요 촬영지 · ⚠ 사진 전 주인께 양해 필수", mapUrl: "https://maps.google.com/?cid=15869312336643053071", photoUrl: "https://drive.google.com/file/d/1S9M6abVDcxsRL6N8_tQLc2P8m0V_jN6w/view?usp=drivesdk" },
    { name: "④ 고쿠라쿠지역 極楽寺駅", area: "고쿠라쿠지", note: "16:15 · 차로 5분 · 이사랑통역되나요 촬영지 · 고즈넉한 에노덴 역", mapUrl: "https://www.google.com/maps/search/極楽寺駅+鎌倉" },
    { name: "⑤ 시치리가하마역 수로 포토스팟", area: "시치리가하마", note: "16:30 · 차로 5분 · 수로 끝으로 바다가 보이는 인스타 감성 스팟", mapUrl: "https://maps.google.com/?cid=12702870331904269387", photoUrl: "https://drive.google.com/file/d/1DFVxMk6rWIZRo9gHZepXx5YCATj0mqGu/view?usp=drivesdk" },
    { name: "⑥ 시치리가하마 고등학교 앞 건널목", area: "시치리가하마", note: "16:45 · 바로 근처 · 에노덴+바다+하늘 포토스팟", mapUrl: "https://maps.google.com/?cid=422530369093211191", photoUrl: "https://drive.google.com/file/d/17upNDDb2ZuUunVAZs5O6GHE5l-cfczz1/view?usp=drivesdk" },
    { name: "⑦ 시치리가하마 해변 七里ヶ浜", area: "시치리가하마", note: "17:00 · 후지산+바다 조망 · 일몰 명소 · 산책 30분", mapUrl: "https://maps.google.com/?cid=11344940212826062752", photoUrl: "https://drive.google.com/file/d/1bJos7bdBh_JFvJ_xi4keOQ4eMQ_ZjuhK/view?usp=drivesdk" },
    { name: "⑧ 가마쿠라코코마에역 건널목 🍽", area: "가마쿠라코코마에", note: "17:30 · 슬램덩크 배경지 · 사진 후 근처에서 저녁식사", mapUrl: "https://maps.google.com/?cid=1819797686801071229", photoUrl: "https://drive.google.com/file/d/1BkKHGece8qrkVxFF0-x6outDtpNSyxGz/view?usp=drivesdk" },
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
  const [placeTab, setPlaceTab] = useState("가마쿠라");
  const [phraseTab, setPhraseTab] = useState("기본 인사");
  const [restaurantTab, setRestaurantTab] = useState("가마쿠라");
  const [weatherData, setWeatherData] = useState({});
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherCity, setWeatherCity] = useState("tokyo");
  const [hoveredSpot, setHoveredSpot] = useState(null);

  const WEATHER_CITIES = [
    { id: "tokyo", label: "도쿄", query: "Tokyo,JP", icon: "🗼" },
    { id: "kamakura", label: "가마쿠라", query: "Kamakura,JP", icon: "⛩" },
    { id: "kawaguchiko", label: "카와구치코", query: "Fujikawaguchiko,JP", icon: "🗻" },
  ];

  const API_KEY = "309c87e14189378b05a0e9573ebbdddd";

  async function fetchWeather(cityQuery) {
    try {
      const res = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityQuery + "&appid=" + API_KEY + "&units=metric&lang=kr&cnt=40");
      return await res.json();
    } catch (e) { return null; }
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
        const dirs = ["북","북동","동","남동","남","남서","서","북서"];
        const windDir = dirs[Math.round(noon.wind.deg / 45) % 8];
        let icon = "⛅";
        if (id >= 200 && id < 300) icon = "⛈";
        else if (id >= 300 && id < 400) icon = "🌦";
        else if (id >= 500 && id < 600) icon = "🌧";
        else if (id >= 600 && id < 700) icon = "❄";
        else if (id >= 700 && id < 800) icon = "🌫";
        else if (id === 800) icon = "☀";
        else if (id > 800) icon = "⛅";
        let windLevel = wind < 3 ? "약풍" : wind < 7 ? "보통" : wind < 11 ? "강풍" : "매우 강함";
        const d = new Date(date);
        const dnames = ["일","월","화","수","목","금","토"];
        return { date: (d.getMonth()+1)+"/"+d.getDate(), day: dnames[d.getDay()], high, low, desc, icon, wind, windDir, windLevel };
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
    .hero-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); margin-bottom: 20px; letter-spacing: 0.05em; }
    .pill-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .pill { font-size: 12px; padding: 5px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.6); }
    .tab-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; background: #1a1612; padding: 2px; }
    .tab-btn { padding: 10px 4px; border: none; cursor: pointer; text-align: center; transition: all 0.2s; background: #2a2420; color: rgba(255,255,255,0.4); }
    .tab-btn.active { background: #f5f2ed; color: #1a1612; }
    .tab-icon { font-size: 15px; margin-bottom: 3px; }
    .tab-label { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; }
    .body { padding: 20px; }
    .section-title { font-size: 11px; letter-spacing: 0.25em; color: rgba(26,22,18,0.4); text-transform: uppercase; margin-bottom: 16px; padding-bottom: 10px; border-bottom: 1px solid rgba(26,22,18,0.1); }
    .card { background: #fff; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
    .card-label { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(26,22,18,0.4); margin-bottom: 14px; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; padding: 9px 0; border-bottom: 1px solid rgba(26,22,18,0.06); gap: 16px; }
    .row:last-child { border-bottom: none; padding-bottom: 0; }
    .row-l { font-size: 12px; color: rgba(26,22,18,0.45); flex-shrink: 0; min-width: 90px; line-height: 1.5; }
    .row-r { font-size: 13px; color: #1a1612; font-weight: 500; text-align: right; line-height: 1.5; }
    .tag { display: inline-block; font-size: 10px; padding: 3px 9px; border-radius: 20px; font-weight: 600; letter-spacing: 0.04em; }
    .link-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 14px; padding: 9px 16px; border-radius: 8px; font-size: 12px; font-weight: 600; text-decoration: none; letter-spacing: 0.03em; transition: opacity 0.15s; }
    .link-btn:hover { opacity: 0.8; }
    .tl-item { display: flex; gap: 14px; margin-bottom: 14px; }
    .tl-item:last-child { margin-bottom: 0; }
    .tl-time { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(26,22,18,0.35); min-width: 38px; padding-top: 2px; }
    .tl-dot { width: 6px; height: 6px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
    .tl-place { font-size: 13px; font-weight: 600; color: #1a1612; line-height: 1.4; }
    .tl-note { font-size: 11px; color: rgba(26,22,18,0.45); margin-top: 3px; line-height: 1.5; }
    .check-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(26,22,18,0.06); cursor: pointer; transition: opacity 0.15s; }
    .check-row:last-child { border-bottom: none; }
    .check-row:hover { opacity: 0.75; }
    .checkbox { width: 20px; height: 20px; border-radius: 6px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; transition: all 0.15s; }
    .check-text { font-size: 13px; color: #1a1612; transition: all 0.15s; }
    .check-text.done { color: rgba(26,22,18,0.3); text-decoration: line-through; }
    .progress-track { height: 3px; background: rgba(26,22,18,0.08); border-radius: 2px; margin-bottom: 20px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 2px; transition: width 0.4s ease; }
    .w-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
    .w-card { border-radius: 10px; padding: 12px 6px; text-align: center; border: 1px solid rgba(26,22,18,0.08); }
    .w-date { font-size: 10px; color: rgba(26,22,18,0.4); margin-bottom: 6px; font-family: 'DM Mono', monospace; }
    .w-icon { font-size: 22px; margin-bottom: 6px; }
    .w-temp { font-size: 12px; font-weight: 600; color: #1a1612; }
    .w-desc { font-size: 10px; color: rgba(26,22,18,0.4); margin-top: 3px; }
    .inner-tab-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 20px; }
    .inner-tab { padding: 10px 8px; border: 1px solid rgba(26,22,18,0.12); border-radius: 8px; background: #fafafa; font-size: 12px; font-weight: 600; color: rgba(26,22,18,0.4); cursor: pointer; white-space: nowrap; text-align: center; font-family: 'DM Sans', sans-serif; transition: all 0.15s; overflow: hidden; text-overflow: ellipsis; }
    .inner-tab.active { background: #1a1612; color: #fff; border-color: #1a1612; }
    .place-tab-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; }
    .place-tab-btn { padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(26,22,18,0.15); background: transparent; color: rgba(26,22,18,0.5); font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
    .place-tab-btn.active { background: #1a1612; color: #fff; border-color: #1a1612; }
    .place-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(26,22,18,0.06); cursor: pointer; transition: opacity 0.15s; }
    .place-item:last-child { border-bottom: none; }
    .place-item:hover { opacity: 0.7; }
    .place-name { font-size: 13px; font-weight: 600; color: #1a1612; }
    .place-note { font-size: 11px; color: rgba(26,22,18,0.45); margin-top: 3px; }
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
    .warn-card { background: #fff9f0; border: 1px solid rgba(200,133,90,0.3); border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; }
    .info-card { background: #f0f6ff; border: 1px solid rgba(90,143,200,0.25); border-radius: 12px; padding: 16px 20px; margin-bottom: 12px; }
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
    const bg = color === "green" ? "#e8f4ea" : color === "blue" ? "#eef3fb" : "#fdf3ec";
    const tc = color === "green" ? "#2e7d32" : color === "blue" ? "#3a6aaa" : "#b06030";
    return (
      <a href={href} target="_blank" rel="noreferrer" className="link-btn" style={{ background: bg, color: tc }}>
        {children}
      </a>
    );
  }

  function renderSchedule() {
    const day = SCHEDULE[scheduleTab];
    const scheduleCityMap = ["kamakura", "kawaguchiko", "kawaguchiko", "tokyo", "tokyo"];
    const scheduleCityId = scheduleCityMap[scheduleTab];
    const scheduleWeather = weatherData[scheduleCityId];
    const scheduleCityLabel = { kamakura: "가마쿠라", kawaguchiko: "카와구치코", tokyo: "도쿄" };
    const dayWeather = scheduleWeather ? scheduleWeather.find(w => {
      const m = w.date.split("/");
      return m[0] === "5" && m[1] === String(15 + scheduleTab);
    }) : null;
    if (!scheduleWeather && !weatherLoading) loadWeather(scheduleCityId);

    return (
      <div>
        <div className="inner-tab-row">
          {SCHEDULE.map((d, di) => (
            <button key={di} className={"inner-tab" + (scheduleTab === di ? " active" : "")} onClick={() => setScheduleTab(di)}>
              {d.date} {d.day}
            </button>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg, #e8f4fb 0%, #f0f8ff 100%)", border: "1px solid rgba(90,143,200,0.25)", borderRadius: 12, padding: "12px 16px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>{dayWeather ? dayWeather.icon : "🌤"}</span>
            <div>
              <div style={{ fontSize: 11, color: "rgba(26,22,18,0.45)", marginBottom: 2 }}>{scheduleCityLabel[scheduleCityId]} 날씨</div>
              {dayWeather ? (
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1612" }}>{dayWeather.desc} · {dayWeather.high}°/{dayWeather.low}°C</div>
              ) : (
                <div style={{ fontSize: 12, color: "rgba(26,22,18,0.4)" }}>{weatherLoading ? "날씨 불러오는 중..." : "날씨 정보 없음"}</div>
              )}
            </div>
          </div>
          {dayWeather && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "rgba(26,22,18,0.45)" }}>바람</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#3a6aaa" }}>{dayWeather.windDir} {dayWeather.wind}m/s</div>
            </div>
          )}
        </div>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 22, fontWeight: 500, color: day.color }}>{day.date} <span style={{ fontSize: 14 }}>{day.day}</span></div>
            <div>
              <div className="card-label" style={{ marginBottom: 2 }}>DAY {scheduleTab + 1}</div>
              <div style={{ fontSize: 12, color: "rgba(26,22,18,0.5)" }}>{day.theme}</div>
            </div>
          </div>
          {day.items.map((item, ii) => (
            <div key={ii} className="tl-item">
              <span className="tl-time">{item.time}</span>
              <div className="tl-dot" style={{ background: day.color }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div className="tl-place">{item.place}</div>
                  {item.map && (
                    <a href={item.map} target="_blank" rel="noreferrer" style={{ flexShrink: 0, fontSize: 10, padding: "3px 8px", borderRadius: 12, background: "#e8f4ea", color: "#2e7d32", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>🗺 길찾기</a>
                  )}
                </div>
                {item.note && <div className="tl-note">{item.note}</div>}
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  function renderHotel() {
    const tabs = ["더 가든", "롯데 시티 호텔", "공통 안내"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => <button key={i} className={"inner-tab" + (hotelTab === i ? " active" : "")} onClick={() => setHotelTab(i)}>{t}</button>)}
        </div>
        {hotelTab === 0 && (
          <Card>
            <div className="card-label" style={{ color: "#5a8fc8" }}>더 가든 · THE GARDEN</div>
            <span className="tag" style={{ background: "#eef3fb", color: "#3a6aaa", marginBottom: 14, display: "inline-block" }}>5/15 ~ 5/17 · 2박</span>
            <Row l="예약처" v="여기어때" /><Row l="공급사 예약번호" v="1691545792" />
            <Row l="주소" v="Funatsu 3554, Fujikawaguchiko 401-0301" />
            <Row l="전화" v="81-555-285677" /><Row l="체크인" v="5/15 (금) 15:00" />
            <Row l="체크아웃" v="5/17 (일) 11:00" /><Row l="객실" v="Deluxe Mountain View Room" />
            <Row l="결제" v="전액 사전결제 완료" /><Row l="취소 정책" v="5/14 이전 무료취소 가능" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <LinkBtn href="https://drive.google.com/file/d/1zFcbuZs0LEzj_0Ae_4WR_WziA65W788Q/view?usp=drivesdk" color="blue">📄 예약확인서 보기</LinkBtn>
              <LinkBtn href="https://www.google.com/maps/dir/?api=1&destination=Funatsu+3554+Fujikawaguchiko+Yamanashi&travelmode=driving" color="green">🗺 길찾기</LinkBtn>
            </div>
          </Card>
        )}
        {hotelTab === 1 && (
          <Card>
            <div className="card-label" style={{ color: "#c8855a" }}>롯데 시티 호텔 킨시쵸 도쿄</div>
            <span className="tag" style={{ background: "#fdf3ec", color: "#b06030", marginBottom: 14, display: "inline-block" }}>5/17 ~ 5/19 · 2박</span>
            <Row l="예약처" v="여기어때 (최저가보장)" />
            <Row l="주소" v="4-6-1 Kinshi, Sumida-ku, Tokyo 130-0013" />
            <Row l="전화" v="+81-3-5619-1066" /><Row l="체크인" v="5/17 (일) 15:00" />
            <Row l="체크아웃" v="5/19 (화) 11:00" /><Row l="객실" v="Standard Deluxe Twin (금연)" />
            <Row l="가까운 역" v="긴시초역 5번 출구 바로 연결" /><Row l="부대시설" v="2F Bulks Gym 무료 (24시간)" />
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
              const done = !!checks[gi + "-" + ii];
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
          {tabs.map((t, i) => <button key={i} className={"inner-tab" + (rentalTab === i ? " active" : "")} onClick={() => setRentalTab(i)}>{t}</button>)}
        </div>
        {rentalTab === 0 && (
          <Card>
            <div className="card-label" style={{ color: "#3a8a5a", marginBottom: 14 }}>예약 차량 — 확정</div>
            <Row l="업체" v="IX RENTAL (아이엑스 렌탈)" /><Row l="차량" v="토요타 알파드 (밴, 7인승)" />
            <Row l="클룩 예약번호" v="UZV451629" /><Row l="확정번호" v="R798425183766597" />
            <Row l="대여" v="2026년 5월 15일 (금) 12:00" /><Row l="반납" v="2026년 5월 17일 (일) 12:00" />
            <Row l="요금" v="US$ 171.15 (전액 결제)" /><Row l="주행거리" v="무제한" /><Row l="연료" v="Full to Full" />
            <Row l="무료 취소" v="5월 14일 12:00 이전" /><Row l="보험" v="어드밴스드 플러스 (CDW · TPL · NOC)" />
            <Row l="업체 연락처" v="+81-03-5809-3228" /><Row l="카카오" v="+8108032261688" />
            <LinkBtn href="https://drive.google.com/file/d/1Kb3NsJzCFhcYkMZRV73uq2vDeq08ZydE/view?usp=drivesdk" color="green">📄 렌트카 바우처 보기</LinkBtn>
          </Card>
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
            <Row l="여권" v="픽업하는 모든 운전자 원본" /><Row l="운전면허증" v="한국 운전면허증 원본" />
            <Row l="국제운전면허증" v="1949년 협약 IDP 원본" /><Row l="현장 추가" v="ETC 카드 · GPS · 카시트 구매 가능" />
          </Card>
        )}
        {rentalTab === 3 && (
          <Card>
            <div className="card-label" style={{ marginBottom: 14 }}>일본 운전 주의사항</div>
            <Row l="통행 방향" v="좌측통행 (한국과 반대)" /><Row l="고속도로" v="ETC 카드 또는 현금" />
            <Row l="주유" v="셀프 주유 많음 (セルフ)" /><Row l="내비" v="구글맵 또는 Yahoo! カーナビ" />
          </Card>
        )}
        {rentalTab === 4 && (
          <div className="warn-card">
            <div className="card-label" style={{ color: "#b06030", marginBottom: 8 }}>⚠ 국제운전면허증 필수</div>
            <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.9 }}>
              일본은 <strong>국제운전면허증(IDP)</strong> 필수예요.<br />
              한국 면허증만으로는 운전 불가해요.<br />
              <strong>1949년 협약</strong> 형식만 인정돼요.<br /><br />
              <strong>발급 방법:</strong> 전국 운전면허시험장 또는 경찰서 민원실<br />
              <strong>준비물:</strong> 운전면허증 + 여권 + 증명사진 1매 + 수수료 8,500원<br />
              <strong>발급 시간:</strong> 당일 즉시 발급
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderTransport() {
    const steps = [
      { icon: "✈", num: "STEP 1", title: "나리타 T1 도착 (10:00)", desc: "입국심사 · 짐 수령 후 B1 북쪽 윙으로 이동" },
      { icon: "🚄", num: "STEP 2", title: "NEX 티켓 교환 (B1 북쪽 윙)", desc: "JR 동일본 여행 서비스 센터 · 여권 + 바우처 제시 · 운영 08:30~19:00" },
      { icon: "🚆", num: "STEP 3", title: "나리타 익스프레스 탑승 → 도쿄역", desc: "약 53분 · 환승 없이 도쿄역 직행 · 짐 공간 완비" },
      { icon: "🚇", num: "STEP 4", title: "도쿄역 → 아사쿠사바시역", desc: "JR 소부선 · 1정거장 약 3분 · 170엔" },
      { icon: "🚗", num: "STEP 5", title: "IX렌탈 픽업 (12:00)", desc: "아사쿠사바시역 동쪽 출구 도보 5분 · 국제운전면허증 + 여권 지참" },
    ];
    const tabs = ["나리타→렌트카", "반납→호텔", "귀국 이동", "NEX 예약정보", "스이카 카드"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => <button key={i} className={"inner-tab" + (transportTab === i ? " active" : "")} onClick={() => setTransportTab(i)}>{t}</button>)}
        </div>
        {transportTab === 0 && (
          <div>
            <Card>
              <div className="card-label" style={{ color: "#c8855a", marginBottom: 14 }}>나리타 → IX렌탈 아사쿠사바시 (5/15)</div>
              {steps.map((s, i) => (
                <div key={i} className="step-item">
                  <div className="step-icon">{s.icon}</div>
                  <div><div className="step-num" style={{ color: "#c8855a" }}>{s.num}</div><div className="step-title">{s.title}</div><div className="step-desc">{s.desc}</div></div>
                </div>
              ))}
            </Card>
            <div className="info-card">
              <div className="card-label" style={{ color: "#3a6aaa", marginBottom: 6 }}>⚠ NEX 티켓 교환 주의</div>
              <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.8 }}>
                티켓 교환은 <strong>나리타 공항 터미널에서만 가능</strong>해요.<br />
                도쿄역 등 다른 역에서는 교환 불가예요.
              </div>
            </div>
          </div>
        )}
        {transportTab === 1 && (
          <Card>
            <div className="card-label" style={{ color: "#5a8fc8", marginBottom: 14 }}>렌트카 반납 → 롯데 시티 호텔 (5/17)</div>
            <Row l="반납" v="IX렌탈 아사쿠사바시역점" /><Row l="이동" v="JR 소부선 탑승" />
            <Row l="도착" v="긴시쵸역 약 10분 · 230엔" /><Row l="숙소까지" v="긴시쵸역 5번 출구 → 롯데 시티 호텔 도보 1분" />
          </Card>
        )}
        {transportTab === 2 && (
          <div>
            <Card>
              <div className="card-label" style={{ marginBottom: 14 }}>귀국일 나리타 이동 (5/19)</div>
              <Row l="출발지" v="롯데 시티 호텔 킨시쵸" /><Row l="이동" v="긴시쵸역 → JR 소부선 → 도쿄역" />
              <Row l="NEX 탑승" v="도쿄역 → 나리타 T1 (53분)" /><Row l="출발 권장" v="BX111 10:55 기준 → 08:00 이전 출발" />
            </Card>
            <div className="warn-card">
              <div className="card-label" style={{ color: "#b06030", marginBottom: 6 }}>⚠ 귀국일 체크리스트</div>
              <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.8 }}>
                복편 NEX는 왕복 티켓으로 이용<br />
                티켓 교환 없이 <strong>바우처 QR코드 그대로 사용</strong>
              </div>
            </div>
          </div>
        )}
        {transportTab === 3 && (
          <Card>
            <div className="card-label" style={{ color: "#3a8a5a", marginBottom: 14 }}>나리타 익스프레스 예약 정보</div>
            <Row l="예약번호" v="BQP828461" /><Row l="티켓 종류" v="왕복 (나리타 공항↔도쿄)" />
            <Row l="인원" v="성인 3명 · 아동(만 6-11세) 1명" />
            <Row l="교환 장소" v="나리타 T1 — JR 동일본 여행 서비스 센터 B1 북쪽 윙" />
            <Row l="교환 운영시간" v="08:30 ~ 19:00" /><Row l="필요 서류" v="여권 + 모바일 바우처" />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <LinkBtn href="https://drive.google.com/file/d/1bMbXZ85A0ZqJ1WL66twdUZX94NBKDjHZ/view?usp=drivesdk" color="green">📄 NEX 바우처 보기</LinkBtn>
              <LinkBtn href="https://drive.google.com/file/d/1wICgiS7xEgfY3aFH9M08moUdzUq0HhsV/view?usp=drivesdk" color="blue">🎫 QR코드 보기</LinkBtn>
            </div>
          </Card>
        )}
        {transportTab === 4 && (
          <div>
            <Card>
              <div className="card-label" style={{ color: "#e06b5a", marginBottom: 14 }}>💳 나리타 공항 스이카 구매</div>
              <Row l="구매 장소" v="JR 동일본 여행 서비스 센터 (B1 북쪽 윙)" />
              <Row l="위치" v="1층 도착 로비 나오자마자 정면 왼쪽 · 영어·한국어 안내 가능" />
              <Row l="운영시간" v="08:30~19:00" />
              <Row l="초기 충전 권장" v="1인당 3,000~5,000엔 (보증금 500엔 포함)" />
              <Row l="4명 합산" v="총 12,000~20,000엔 준비" />
              <Row l="보증금" v="500엔 · 귀국 시 나리타 JR 창구에서 환불" />
              <Row l="사용처" v="전철 · 버스 · 편의점 · 자판기" />
            </Card>
            <div className="info-card">
              <div className="card-label" style={{ color: "#3a6aaa", marginBottom: 8 }}>자동판매기에서도 구매 가능</div>
              <div style={{ fontSize: 13, color: "rgba(26,22,18,0.65)", lineHeight: 1.8 }}>
                JR 개찰구 근처 초록색 자동판매기에서<br />
                <strong>Suica 선택 → New Suica → 금액 입력</strong>으로 바로 구매 가능해요.
              </div>
              <a href="https://m.blog.naver.com/llk33/224235470148" target="_blank" rel="noreferrer"
                className="link-btn" style={{ background: "#eef3fb", color: "#3a6aaa", marginTop: 10 }}>
                📖 스이카 구매 상세 가이드
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderRestaurant() {
    const items = RESTAURANTS[restaurantTab] || [];
    return (
      <div>
        <div className="section-title">지역별 식당</div>
        <div className="place-tab-row">
          {Object.keys(RESTAURANTS).map(k => (
            <button key={k} className={"place-tab-btn" + (restaurantTab === k ? " active" : "")} onClick={() => setRestaurantTab(k)}>{k}</button>
          ))}
        </div>
        <Card>
          {items.map((p, i) => (
            <div key={i} className="place-item" onClick={() => window.open(p.mapUrl, "_blank")}>
              <div style={{ flex: 1 }}>
                <div className="place-name">{p.name}</div>
                <div style={{ fontSize: 10, color: "#3a6aaa", fontWeight: 600, marginTop: 2, marginBottom: 4 }}>{p.area}</div>
                <div className="place-note">{p.note}</div>
              </div>
              <span style={{ fontSize: 11, color: "#c8855a", flexShrink: 0, marginLeft: 10 }}>📍→</span>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  function renderWeather() {
    const city = WEATHER_CITIES.find(c => c.id === weatherCity);
    const data = weatherData[weatherCity];
    if (!data && !weatherLoading) loadWeather(weatherCity);
    return (
      <div>
        <div className="section-title">실시간 날씨</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {WEATHER_CITIES.map(c => (
            <button key={c.id} onClick={() => { setWeatherCity(c.id); loadWeather(c.id); }}
              style={{ padding: "7px 16px", borderRadius: 20, border: "1px solid", borderColor: weatherCity === c.id ? "#1a1612" : "rgba(26,22,18,0.15)", background: weatherCity === c.id ? "#1a1612" : "transparent", color: weatherCity === c.id ? "#fff" : "rgba(26,22,18,0.5)", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
        <Card>
          <div className="card-label" style={{ marginBottom: 14 }}>{city.icon} {city.label} · 5일 예보</div>
          {weatherLoading && !data ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "rgba(26,22,18,0.4)", fontSize: 13 }}>날씨 불러오는 중...</div>
          ) : data ? (
            <div>
              <div className="w-grid">
                {data.map((w, i) => (
                  <div key={i} className="w-card" style={{ background: i === 0 ? "#fffbf7" : "#fafafa", borderColor: i === 0 ? "rgba(200,133,90,0.3)" : "rgba(26,22,18,0.08)" }}>
                    <div className="w-date">{w.date}<br />{w.day}</div>
                    <div className="w-icon">{w.icon}</div>
                    <div className="w-temp">{w.high}° / {w.low}°</div>
                    <div className="w-desc">{w.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, borderTop: "1px solid rgba(26,22,18,0.06)", paddingTop: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(26,22,18,0.35)", marginBottom: 10 }}>💨 바람 (낮 12시 기준)</div>
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
            <div style={{ textAlign: "center", padding: "30px 0", color: "rgba(26,22,18,0.4)", fontSize: 13 }}>날씨를 불러올 수 없어요</div>
          )}
        </Card>
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
    // 가마쿠라 8곳 좌표 (실제 위경도 → SVG 좌표 변환)
    const kamakuraSpots = [
      { num: "①", name: "가마쿠라 대불", lat: 35.3168, lng: 139.5357, url: "https://maps.google.com/?cid=2216777826481991500" },
      { num: "②", name: "고마치도리", lat: 35.3223, lng: 139.5527, url: "https://maps.google.com/?cid=4598977894697418712" },
      { num: "③", name: "TANAKA Barber", lat: 35.3110, lng: 139.5348, url: "https://maps.google.com/?cid=15869312336643053071" },
      { num: "④", name: "고쿠라쿠지역", lat: 35.3095, lng: 139.5290, url: "https://maps.google.com/?cid=15015373924086568088" },
      { num: "⑤", name: "시치리가하마역 수로", lat: 35.3062, lng: 139.5102, url: "https://maps.google.com/?cid=12702870331904269387" },
      { num: "⑥", name: "시치리가하마 고교 건널목", lat: 35.3044, lng: 139.5136, url: "https://maps.google.com/?cid=422530369093211191" },
      { num: "⑦", name: "시치리가하마 해변", lat: 35.3039, lng: 139.5143, url: "https://maps.google.com/?cid=16867240316128842765" },
      { num: "⑧", name: "가마쿠라코코마에역", lat: 35.3067, lng: 139.5006, url: "https://maps.google.com/?cid=1819797686801071229" },
    ];

    // 좌표 → SVG 픽셀 변환
    const minLat = 35.298, maxLat = 35.328, minLng = 139.495, maxLng = 139.560;
    const W = 340, H = 180;
    const toX = (lng) => ((lng - minLng) / (maxLng - minLng)) * W;
    const toY = (lat) => ((maxLat - lat) / (maxLat - minLat)) * H;

    // 동선 연결선 포인트
    const linePoints = kamakuraSpots.map(s => `${toX(s.lng)},${toY(s.lat)}`).join(" ");

    return (
      <div>
        <div className="section-title">가고 싶은 장소</div>
        <div className="place-tab-row">
          {Object.keys(PLACES).map(k => (
            <button key={k} className={"place-tab-btn" + (placeTab === k ? " active" : "")} onClick={() => setPlaceTab(k)}>{k}</button>
          ))}
        </div>

        {placeTab === "가마쿠라" && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", marginBottom: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(26,22,18,0.4)", marginBottom: 10 }}>📍 가마쿠라 동선 지도 · 핀 누르면 지도 열림</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", borderRadius: 8, background: "#f0f4f0" }}>
              {/* 배경 — 바다 */}
              <rect x="0" y={H * 0.72} width={W} height={H * 0.28} fill="#c8dff0" opacity="0.6" />
              {/* 바다 레이블 */}
              <text x={W * 0.25} y={H * 0.9} fontSize="8" fill="#5a8fc8" opacity="0.7" textAnchor="middle">相模湾 (사가미 만)</text>

              {/* 동선 연결선 */}
              <polyline points={linePoints} fill="none" stroke="#c8855a" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />

              {/* 핀 */}
              {kamakuraSpots.map((s, i) => {
                const x = toX(s.lng);
                const y = toY(s.lat);
                const isHovered = hoveredSpot === i;
                return (
                  <g key={i} style={{ cursor: "pointer" }}
                    onClick={() => window.open(s.url, "_blank")}
                    onMouseEnter={() => setHoveredSpot(i)}
                    onMouseLeave={() => setHoveredSpot(null)}>
                    {/* 호버 툴팁 */}
                    {isHovered && (
                      <g>
                        <rect x={x - 40} y={y - 28} width={80} height={16} rx="4" fill="#1a1612" opacity="0.85" />
                        <text x={x} y={y - 17} fontSize="8" fill="#fff" textAnchor="middle">{s.name}</text>
                      </g>
                    )}
                    {/* 핀 원 */}
                    <circle cx={x} cy={y} r={isHovered ? 11 : 9} fill={isHovered ? "#c8855a" : "#1a1612"} opacity="0.9" />
                    <text x={x} y={y + 4} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="bold">{s.num}</text>
                  </g>
                );
              })}
            </svg>
            {/* 범례 */}
            <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
              {kamakuraSpots.map((s, i) => (
                <span key={i} onClick={() => window.open(s.url, "_blank")}
                  style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: "#f5f2ed", color: "#1a1612", cursor: "pointer", fontWeight: 500 }}>
                  {s.num} {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <Card>
          {PLACES[placeTab].map((p, i) => (
            <div key={i} className="place-item" onClick={() => window.open(p.mapUrl || "https://www.google.com/maps/search/" + encodeURIComponent(p.mapQ), "_blank")}>
              <div style={{ flex: 1 }}>
                <div className="place-name">{p.name}</div>
                <div className="place-note">{p.note}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0, marginLeft: 12 }}>
                <span className="tag" style={{ background: "#eef3fb", color: "#3a6aaa" }}>{p.area}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  {p.photoUrl && (
                    <button onClick={(e) => { e.stopPropagation(); window.open(p.photoUrl, "_blank"); }}
                      style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "#fff3e0", border: "1px solid rgba(200,133,90,0.4)", color: "#c8855a", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>📷 사진</button>
                  )}
                  {p.couponUrl && (
                    <button onClick={(e) => { e.stopPropagation(); window.open(p.couponUrl, "_blank"); }}
                      style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "#e8f5e9", border: "1px solid rgba(58,138,90,0.4)", color: "#3a8a5a", cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>🎫 쿠폰</button>
                  )}
                  <span style={{ fontSize: 11, color: p.mapUrl ? "#c8855a" : "rgba(26,22,18,0.3)", alignSelf: "center" }}>{p.mapUrl ? "📍→" : "지도 →"}</span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  function renderPhrase() {
    const items = PHRASES[phraseTab] || [];
    return (
      <div>
        <div className="section-title">자주 쓰는 일본어</div>
        <div className="place-tab-row">
          {Object.keys(PHRASES).map(k => (
            <button key={k} className={"place-tab-btn" + (phraseTab === k ? " active" : "")} onClick={() => setPhraseTab(k)}>{k}</button>
          ))}
        </div>
        <Card>
          <div className="card-label" style={{ marginBottom: 14 }}>{phraseTab}</div>
          {items.map((item, ii) => (
            <div key={ii} className="phrase-item" style={{ paddingTop: ii === 0 ? 0 : 12, borderTop: ii === 0 ? "none" : "1px solid rgba(26,22,18,0.06)", borderBottom: "none" }}>
              <div className="phrase-jp">{item.jp}</div>
              <div className="phrase-roma">{item.roma}</div>
              <div className="phrase-kr">{item.kr}</div>
            </div>
          ))}
        </Card>
      </div>
    );
  }

  function renderDocs() {
    const tabs = ["항공권", "바우처 · 이티켓"];
    return (
      <div>
        <div className="inner-tab-row">
          {tabs.map((t, i) => <button key={i} className={"inner-tab" + (docsTab === i ? " active" : "")} onClick={() => setDocsTab(i)}>{t}</button>)}
        </div>
        {docsTab === 0 && (
          <div>
            <Card>
              <div className="card-label" style={{ color: "#5a8fc8" }}>가는 편</div>
              <span className="tag" style={{ background: "#eef3fb", color: "#3a6aaa", marginBottom: 14, display: "inline-block" }}>5/15 (금) · BX 112</span>
              <Row l="항공사" v="에어부산 (Air Busan)" /><Row l="출발" v="부산 김해 (PUS) 07:50" />
              <Row l="도착" v="나리타 (NRT) T1 10:00" /><Row l="예약번호 (항공사)" v="KDELAW" />
              <Row l="예약번호 (여행사)" v="EESHHV" /><Row l="클래스" v="일반석 (D)" />
            </Card>
            <Card>
              <div className="card-label" style={{ color: "#c8855a" }}>오는 편</div>
              <span className="tag" style={{ background: "#fdf3ec", color: "#b06030", marginBottom: 14, display: "inline-block" }}>5/19 (화) · BX 111</span>
              <Row l="항공사" v="에어부산 (Air Busan)" /><Row l="출발" v="나리타 (NRT) T1 10:55" />
              <Row l="도착" v="부산 김해 (PUS) 13:15" /><Row l="예약번호 (항공사)" v="KDSLAW" />
              <Row l="예약번호 (여행사)" v="EESHHV" />
            </Card>
          </div>
        )}
        {docsTab === 1 && (
          <div>
            <Card>
              <div className="card-label" style={{ marginBottom: 14 }}>✈ 이티켓 — 탑승객 4명</div>
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
            <Card>
              <div className="card-label" style={{ marginBottom: 14 }}>📄 바우처 모음</div>
              {[
                { name: "더 가든 — 숙소 바우처", sub: "5/15~5/17 · 2박", url: "https://drive.google.com/file/d/1zFcbuZs0LEzj_0Ae_4WR_WziA65W788Q/view?usp=drivesdk", color: "#3a6aaa", bg: "#eef3fb" },
                { name: "롯데 시티 호텔 — 숙소 바우처", sub: "5/17~5/19 · 2박", url: "https://drive.google.com/file/d/1MWGAx0Nmv1fENrJnJrKajJ6-QuR8QdkN/view?usp=drivesdk", color: "#b06030", bg: "#fdf3ec" },
                { name: "IX렌탈 — 렌트카 바우처", sub: "5/15 12:30 ~ 5/17 12:00", url: "https://drive.google.com/file/d/1Kb3NsJzCFhcYkMZRV73uq2vDeq08ZydE/view?usp=drivesdk", color: "#3a8a5a", bg: "#eef7f2" },
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
          </div>
        )}
      </div>
    );
  }

  function renderTips() {
    const tips = [
      { area: "가마쿠라", color: "#c8855a", icon: "⛩", items: [
        { title: "대불 마감 주의", desc: "고토쿠인 대불이 오후 5시 마감이에요. 도착하자마자 바로 가세요." },
        { title: "에노덴은 시간 봐서 결정", desc: "5/15 오후 2시 도착이라 에노덴은 시간이 빠듯할 수 있어요. 당일 상황에 맞게 선택하세요." },
        { title: "고마치도리 상점 일찍 닫아요", desc: "오후 5~6시면 문 닫는 가게가 많아요. 쇼핑은 대불 관람 전에 하세요." },
        { title: "주차장 미리 확인", desc: "가마쿠라역 근처 주차장이 협소하고 비싸요. 도착 전 구글맵으로 미리 확인 추천해요." },
      ]},
      { area: "후지산", color: "#5a8fc8", icon: "🗻", items: [
        { title: "오전이 날씨 확률 높아요", desc: "5합목에서 후지산 정상을 보려면 맑아야 해요. 오전 9시 이전 출발하면 확률이 높아요." },
        { title: "방한 준비 필수", desc: "5합목은 도쿄보다 기온이 10도 이상 낮아요. 얇은 패딩이나 바람막이를 꼭 챙기세요." },
        { title: "오시노 핫카이 추천", desc: "주차장도 있고 여유롭게 산책할 수 있어요. 부모님 모시기 딱 좋은 곳이에요." },
        { title: "후지큐 하이랜드는 선택", desc: "놀이공원이라 체력과 시간 고려해서 결정하세요. 외관 구경만 해도 충분해요." },
      ]},
      { area: "도쿄", color: "#5ac88a", icon: "🗼", items: [
        { title: "숙소에서 아사쿠사 가까워요", desc: "롯데 시티 호텔에서 아사쿠사까지 지하철 5분 거리예요. 5/17 오후 체크인 후 바로 가기 딱 좋아요." },
        { title: "긴자 면세 쇼핑 시 여권 필수", desc: "백화점 면세 카운터 이용 시 여권 제시해야 해요." },
        { title: "도보 거리 조절하세요", desc: "부모님 체력 고려해서 하루 1만 5천 보 이내로 일정 짜는 게 좋아요." },
      ]},
      { area: "공통 팁", color: "#a07ac8", icon: "💴", items: [
        { title: "현금을 넉넉히 준비하세요", desc: "일본은 아직 현금 위주 가게가 많아요. 1인당 3~5만 엔 환전 추천해요." },
        { title: "트레블로그 — 세븐일레븐 ATM 무료 출금", desc: "트레블로그(마스터카드)는 세븐일레븐 세븐뱅크 ATM에서 엔화 무료 출금 가능해요. 세븐일레븐은 일본 전국 어디서나 찾기 쉬워서 편해요. 단, 유니온페이 버전은 안 되고 마스터카드 버전이어야 해요!" },
        { title: "화장실은 구글맵 검색", desc: "구글맵에서 'トイレ' 검색하면 주변 공중화장실이 바로 나와요." },
        { title: "구글맵 하나면 충분해요", desc: "도보·대중교통·자동차 내비 모두 한국어로 안내돼요. 역 출구 번호까지 세세하게 알려줘요." },
      ]},
    ];
    const tip = tips[tipsTab];
    return (
      <div>
        <div className="inner-tab-row">
          {tips.map((t, i) => (
            <button key={i} className={"inner-tab" + (tipsTab === i ? " active" : "")} onClick={() => setTipsTab(i)}>
              {t.icon} {t.area}
            </button>
          ))}
        </div>
        <Card>
          <div className="card-label" style={{ color: tip.color, marginBottom: 16 }}>{tip.icon} {tip.area}</div>
          {tip.items.map((item, ii) => (
            <div key={ii} style={{ padding: "12px 0", borderBottom: ii < tip.items.length - 1 ? "1px solid rgba(26,22,18,0.06)" : "none" }}>
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

  const RENDERERS = { schedule: renderSchedule, hotel: renderHotel, checklist: renderChecklist, rental: renderRental, transport: renderTransport, restaurant: renderRestaurant, places: renderPlaces, phrase: renderPhrase, docs: renderDocs, tips: renderTips };

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
          <span className="pill">도쿄 · 후지산 · 가마쿠라 · 후지카와구치코</span>
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
