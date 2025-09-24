import { gangnamGu } from '../../../_constants/map/gangnam';
import { seochoGu } from '../../../_constants/map/seocho';
import { songpaGu } from '../../../_constants/map/songpa';
import { yongsanGu } from '../../../_constants/map/yongsan';
import { seongbukGu } from '../../../_constants/map/seongbuk';
import { Region } from '../../../_types/map';

// 추가 구 데이터 정의
const jongnoGu: Region = {
  id: "jongno",
  name: "종로구",
  color: "#FF6B6B",
  districts: [
    { id: "sajik", name: "사직동", neighborhoods: ["사직동"] },
    { id: "samcheong", name: "삼청동", neighborhoods: ["삼청동"] },
    { id: "buam", name: "부암동", neighborhoods: ["부암동"] },
    { id: "pyeongchang", name: "평창동", neighborhoods: ["평창동"] },
    { id: "muak", name: "무악동", neighborhoods: ["무악동"] },
    { id: "교남동", name: "교남동", neighborhoods: ["교남동"] },
    { id: "가회동", name: "가회동", neighborhoods: ["가회동"] },
    { id: "종로1234가동", name: "종로1·2·3·4가동", neighborhoods: ["종로1가", "종로2가", "종로3가", "종로4가"] },
    { id: "종로5·6가동", name: "종로5·6가동", neighborhoods: ["종로5가", "종로6가"] },
    { id: "이화동", name: "이화동", neighborhoods: ["이화동"] },
    { id: "혜화동", name: "혜화동", neighborhoods: ["혜화동"] },
    { id: "창신1동", name: "창신1동", neighborhoods: ["창신동"] },
    { id: "창신2동", name: "창신2동", neighborhoods: ["창신동"] },
    { id: "창신3동", name: "창신3동", neighborhoods: ["창신동"] },
    { id: "숭인1동", name: "숭인1동", neighborhoods: ["숭인동"] },
    { id: "숭인2동", name: "숭인2동", neighborhoods: ["숭인동"] },
    { id: "청운효자동", name: "청운효자동", neighborhoods: ["청운동", "효자동"] }
  ]
};

const jungGu: Region = {
  id: "jung",
  name: "중구",
  color: "#4ECDC4",
  districts: [
    { id: "소공동", name: "소공동", neighborhoods: ["소공동"] },
    { id: "회현동", name: "회현동", neighborhoods: ["회현동"] },
    { id: "명동", name: "명동", neighborhoods: ["명동"] },
    { id: "필동", name: "필동", neighborhoods: ["필동"] },
    { id: "장충동", name: "장충동", neighborhoods: ["장충동"] },
    { id: "광희동", name: "광희동", neighborhoods: ["광희동"] },
    { id: "을지로동", name: "을지로동", neighborhoods: ["을지로1가", "을지로2가", "을지로3가"] },
    { id: "신당동", name: "신당동", neighborhoods: ["신당동"] },
    { id: "다산동", name: "다산동", neighborhoods: ["다산동"] },
    { id: "약수동", name: "약수동", neighborhoods: ["약수동"] },
    { id: "청구동", name: "청구동", neighborhoods: ["청구동"] },
    { id: "신당5동", name: "신당5동", neighborhoods: ["신당동"] },
    { id: "동화동", name: "동화동", neighborhoods: ["동화동"] },
    { id: "황학동", name: "황학동", neighborhoods: ["황학동"] },
    { id: "중림동", name: "중림동", neighborhoods: ["중림동"] }
  ]
};

const seongdongGu: Region = {
  id: "seongdong",
  name: "성동구",
  color: "#96CEB4",
  districts: [
    { id: "왕십리2동", name: "왕십리2동", neighborhoods: ["왕십리동"] },
    { id: "마장동", name: "마장동", neighborhoods: ["마장동"] },
    { id: "사근동", name: "사근동", neighborhoods: ["사근동"] },
    { id: "행당1동", name: "행당1동", neighborhoods: ["행당동"] },
    { id: "행당2동", name: "행당2동", neighborhoods: ["행당동"] },
    { id: "응봉동", name: "응봉동", neighborhoods: ["응봉동"] },
    { id: "금호1가동", name: "금호1가동", neighborhoods: ["금호1가"] },
    { id: "금호2·3가동", name: "금호2·3가동", neighborhoods: ["금호2가", "금호3가"] },
    { id: "금호4가동", name: "금호4가동", neighborhoods: ["금호4가"] },
    { id: "옥수동", name: "옥수동", neighborhoods: ["옥수동"] },
    { id: "성수1가1동", name: "성수1가1동", neighborhoods: ["성수1가"] },
    { id: "성수1가2동", name: "성수1가2동", neighborhoods: ["성수1가"] },
    { id: "성수2가1동", name: "성수2가1동", neighborhoods: ["성수2가"] },
    { id: "성수2가3동", name: "성수2가3동", neighborhoods: ["성수2가"] },
    { id: "송정동", name: "송정동", neighborhoods: ["송정동"] },
    { id: "용답동", name: "용답동", neighborhoods: ["용답동"] },
    { id: "왕십리도선동", name: "왕십리도선동", neighborhoods: ["왕십리동", "도선동"] }
  ]
};

const gwangjinGu: Region = {
  id: "gwangjin",
  name: "광진구",
  color: "#FFEAA7",
  districts: [
    { id: "화양동", name: "화양동", neighborhoods: ["화양동"] },
    { id: "군자동", name: "군자동", neighborhoods: ["군자동"] },
    { id: "중곡1동", name: "중곡1동", neighborhoods: ["중곡동"] },
    { id: "중곡2동", name: "중곡2동", neighborhoods: ["중곡동"] },
    { id: "중곡3동", name: "중곡3동", neighborhoods: ["중곡동"] },
    { id: "중곡4동", name: "중곡4동", neighborhoods: ["중곡동"] },
    { id: "능동", name: "능동", neighborhoods: ["능동"] },
    { id: "구의1동", name: "구의1동", neighborhoods: ["구의동"] },
    { id: "구의2동", name: "구의2동", neighborhoods: ["구의동"] },
    { id: "구의3동", name: "구의3동", neighborhoods: ["구의동"] },
    { id: "자양1동", name: "자양1동", neighborhoods: ["자양동"] },
    { id: "자양2동", name: "자양2동", neighborhoods: ["자양동"] },
    { id: "자양3동", name: "자양3동", neighborhoods: ["자양동"] },
    { id: "자양4동", name: "자양4동", neighborhoods: ["자양동"] },
    { id: "광장동", name: "광장동", neighborhoods: ["광장동"] }
  ]
};

const dongdaemunGu: Region = {
  id: "dongdaemun",
  name: "동대문구",
  color: "#DDA0DD",
  districts: [
    { id: "용신동", name: "용신동", neighborhoods: ["용신동"] },
    { id: "제기동", name: "제기동", neighborhoods: ["제기동"] },
    { id: "전농1동", name: "전농1동", neighborhoods: ["전농동"] },
    { id: "전농2동", name: "전농2동", neighborhoods: ["전농동"] },
    { id: "답십리1동", name: "답십리1동", neighborhoods: ["답십리동"] },
    { id: "답십리2동", name: "답십리2동", neighborhoods: ["답십리동"] },
    { id: "장안1동", name: "장안1동", neighborhoods: ["장안동"] },
    { id: "장안2동", name: "장안2동", neighborhoods: ["장안동"] },
    { id: "청량리동", name: "청량리동", neighborhoods: ["청량리동"] },
    { id: "회기동", name: "회기동", neighborhoods: ["회기동"] },
    { id: "휘경1동", name: "휘경1동", neighborhoods: ["휘경동"] },
    { id: "휘경2동", name: "휘경2동", neighborhoods: ["휘경동"] },
    { id: "이문1동", name: "이문1동", neighborhoods: ["이문동"] },
    { id: "이문2동", name: "이문2동", neighborhoods: ["이문동"] }
  ]
};

const jungnangGu: Region = {
  id: "jungnang",
  name: "중랑구",
  color: "#98D8C8",
  districts: [
    { id: "면목본동", name: "면목본동", neighborhoods: ["면목동"] },
    { id: "면목2동", name: "면목2동", neighborhoods: ["면목동"] },
    { id: "면목3·8동", name: "면목3·8동", neighborhoods: ["면목동"] },
    { id: "면목4동", name: "면목4동", neighborhoods: ["면목동"] },
    { id: "면목5동", name: "면목5동", neighborhoods: ["면목동"] },
    { id: "면목7동", name: "면목7동", neighborhoods: ["면목동"] },
    { id: "상봉1동", name: "상봉1동", neighborhoods: ["상봉동"] },
    { id: "상봉2동", name: "상봉2동", neighborhoods: ["상봉동"] },
    { id: "중화1동", name: "중화1동", neighborhoods: ["중화동"] },
    { id: "중화2동", name: "중화2동", neighborhoods: ["중화동"] },
    { id: "묵1동", name: "묵1동", neighborhoods: ["묵동"] },
    { id: "묵2동", name: "묵2동", neighborhoods: ["묵동"] },
    { id: "망우본동", name: "망우본동", neighborhoods: ["망우동"] },
    { id: "망우3동", name: "망우3동", neighborhoods: ["망우동"] },
    { id: "신내1동", name: "신내1동", neighborhoods: ["신내동"] },
    { id: "신내2동", name: "신내2동", neighborhoods: ["신내동"] }
  ]
};

const gangbukGu: Region = {
  id: "gangbuk",
  name: "강북구",
  color: "#BB8FCE",
  districts: [
    { id: "수유1동", name: "수유1동", neighborhoods: ["수유동"] },
    { id: "수유2동", name: "수유2동", neighborhoods: ["수유동"] },
    { id: "수유3동", name: "수유3동", neighborhoods: ["수유동"] },
    { id: "미아동", name: "미아동", neighborhoods: ["미아동"] },
    { id: "번1동", name: "번1동", neighborhoods: ["번동"] },
    { id: "번2동", name: "번2동", neighborhoods: ["번동"] },
    { id: "번3동", name: "번3동", neighborhoods: ["번동"] },
    { id: "우이동", name: "우이동", neighborhoods: ["우이동"] },
    { id: "인수동", name: "인수동", neighborhoods: ["인수동"] },
    { id: "삼각산동", name: "삼각산동", neighborhoods: ["삼각산동"] },
    { id: "삼양동", name: "삼양동", neighborhoods: ["삼양동"] },
    { id: "송중동", name: "송중동", neighborhoods: ["송중동"] },
    { id: "송천동", name: "송천동", neighborhoods: ["송천동"] }
  ]
};

const dobongGu: Region = {
  id: "dobong",
  name: "도봉구",
  color: "#85C1E9",
  districts: [
    { id: "쌍문1동", name: "쌍문1동", neighborhoods: ["쌍문동"] },
    { id: "쌍문2동", name: "쌍문2동", neighborhoods: ["쌍문동"] },
    { id: "쌍문3동", name: "쌍문3동", neighborhoods: ["쌍문동"] },
    { id: "쌍문4동", name: "쌍문4동", neighborhoods: ["쌍문동"] },
    { id: "방학1동", name: "방학1동", neighborhoods: ["방학동"] },
    { id: "방학2동", name: "방학2동", neighborhoods: ["방학동"] },
    { id: "방학3동", name: "방학3동", neighborhoods: ["방학동"] },
    { id: "창1동", name: "창1동", neighborhoods: ["창동"] },
    { id: "창2동", name: "창2동", neighborhoods: ["창동"] },
    { id: "창3동", name: "창3동", neighborhoods: ["창동"] },
    { id: "창4동", name: "창4동", neighborhoods: ["창동"] },
    { id: "창5동", name: "창5동", neighborhoods: ["창동"] },
    { id: "도봉1동", name: "도봉1동", neighborhoods: ["도봉동"] },
    { id: "도봉2동", name: "도봉2동", neighborhoods: ["도봉동"] }
  ]
};

const nowonGu: Region = {
  id: "nowon",
  name: "노원구",
  color: "#F8C471",
  districts: [
    { id: "월계1동", name: "월계1동", neighborhoods: ["월계동"] },
    { id: "월계2동", name: "월계2동", neighborhoods: ["월계동"] },
    { id: "월계3동", name: "월계3동", neighborhoods: ["월계동"] },
    { id: "공릉1동", name: "공릉1동", neighborhoods: ["공릉동"] },
    { id: "공릉2동", name: "공릉2동", neighborhoods: ["공릉동"] },
    { id: "하계1동", name: "하계1동", neighborhoods: ["하계동"] },
    { id: "하계2동", name: "하계2동", neighborhoods: ["하계동"] },
    { id: "중계본동", name: "중계본동", neighborhoods: ["중계동"] },
    { id: "중계1동", name: "중계1동", neighborhoods: ["중계동"] },
    { id: "중계2·3동", name: "중계2·3동", neighborhoods: ["중계동"] },
    { id: "중계4동", name: "중계4동", neighborhoods: ["중계동"] },
    { id: "상계1동", name: "상계1동", neighborhoods: ["상계동"] },
    { id: "상계2동", name: "상계2동", neighborhoods: ["상계동"] },
    { id: "상계3·4동", name: "상계3·4동", neighborhoods: ["상계동"] },
    { id: "상계5동", name: "상계5동", neighborhoods: ["상계동"] },
    { id: "상계6·7동", name: "상계6·7동", neighborhoods: ["상계동"] },
    { id: "상계8동", name: "상계8동", neighborhoods: ["상계동"] },
    { id: "상계9동", name: "상계9동", neighborhoods: ["상계동"] },
    { id: "상계10동", name: "상계10동", neighborhoods: ["상계동"] }
  ]
};

const eunpyeongGu: Region = {
  id: "eunpyeong",
  name: "은평구",
  color: "#82E0AA",
  districts: [
    { id: "녹번동", name: "녹번동", neighborhoods: ["녹번동"] },
    { id: "불광1동", name: "불광1동", neighborhoods: ["불광동"] },
    { id: "불광2동", name: "불광2동", neighborhoods: ["불광동"] },
    { id: "갈현1동", name: "갈현1동", neighborhoods: ["갈현동"] },
    { id: "갈현2동", name: "갈현2동", neighborhoods: ["갈현동"] },
    { id: "구산동", name: "구산동", neighborhoods: ["구산동"] },
    { id: "대조동", name: "대조동", neighborhoods: ["대조동"] },
    { id: "응암1동", name: "응암1동", neighborhoods: ["응암동"] },
    { id: "응암2동", name: "응암2동", neighborhoods: ["응암동"] },
    { id: "응암3동", name: "응암3동", neighborhoods: ["응암동"] },
    { id: "역촌동", name: "역촌동", neighborhoods: ["역촌동"] },
    { id: "신사1동", name: "신사1동", neighborhoods: ["신사동"] },
    { id: "신사2동", name: "신사2동", neighborhoods: ["신사동"] },
    { id: "증산동", name: "증산동", neighborhoods: ["증산동"] },
    { id: "수색동", name: "수색동", neighborhoods: ["수색동"] },
    { id: "연신내동", name: "연신내동", neighborhoods: ["연신내"] }
  ]
};

const seodaemunGu: Region = {
  id: "seodaemun",
  name: "서대문구",
  color: "#F1948A",
  districts: [
    { id: "충현동", name: "충현동", neighborhoods: ["충현동"] },
    { id: "천연동", name: "천연동", neighborhoods: ["천연동"] },
    { id: "신촌동", name: "신촌동", neighborhoods: ["신촌동"] },
    { id: "연희동", name: "연희동", neighborhoods: ["연희동"] },
    { id: "홍제1동", name: "홍제1동", neighborhoods: ["홍제동"] },
    { id: "홍제2동", name: "홍제2동", neighborhoods: ["홍제동"] },
    { id: "홍제3동", name: "홍제3동", neighborhoods: ["홍제동"] },
    { id: "홍은1동", name: "홍은1동", neighborhoods: ["홍은동"] },
    { id: "홍은2동", name: "홍은2동", neighborhoods: ["홍은동"] },
    { id: "남가좌1동", name: "남가좌1동", neighborhoods: ["남가좌동"] },
    { id: "남가좌2동", name: "남가좌2동", neighborhoods: ["남가좌동"] },
    { id: "북가좌1동", name: "북가좌1동", neighborhoods: ["북가좌동"] },
    { id: "북가좌2동", name: "북가좌2동", neighborhoods: ["북가좌동"] },
    { id: "현저동", name: "현저동", neighborhoods: ["현저동"] }
  ]
};

const mapoGu: Region = {
  id: "mapo",
  name: "마포구",
  color: "#85C1E9",
  districts: [
    { id: "공덕동", name: "공덕동", neighborhoods: ["공덕동"] },
    { id: "아현동", name: "아현동", neighborhoods: ["아현동"] },
    { id: "용강동", name: "용강동", neighborhoods: ["용강동"] },
    { id: "대흥동", name: "대흥동", neighborhoods: ["대흥동"] },
    { id: "염리동", name: "염리동", neighborhoods: ["염리동"] },
    { id: "신수동", name: "신수동", neighborhoods: ["신수동"] },
    { id: "서강동", name: "서강동", neighborhoods: ["서강동"] },
    { id: "서교동", name: "서교동", neighborhoods: ["서교동"] },
    { id: "합정동", name: "합정동", neighborhoods: ["합정동"] },
    { id: "망원1동", name: "망원1동", neighborhoods: ["망원동"] },
    { id: "망원2동", name: "망원2동", neighborhoods: ["망원동"] },
    { id: "연남동", name: "연남동", neighborhoods: ["연남동"] },
    { id: "성산1동", name: "성산1동", neighborhoods: ["성산동"] },
    { id: "성산2동", name: "성산2동", neighborhoods: ["성산동"] },
    { id: "상암동", name: "상암동", neighborhoods: ["상암동"] },
    { id: "도화동", name: "도화동", neighborhoods: ["도화동"] }
  ]
};

const gangseoGu: Region = {
  id: "gangseo",
  name: "강서구",
  color: "#A3E4D7",
  districts: [
    { id: "염창동", name: "염창동", neighborhoods: ["염창동"] },
    { id: "등촌1동", name: "등촌1동", neighborhoods: ["등촌동"] },
    { id: "등촌2동", name: "등촌2동", neighborhoods: ["등촌동"] },
    { id: "등촌3동", name: "등촌3동", neighborhoods: ["등촌동"] },
    { id: "화곡본동", name: "화곡본동", neighborhoods: ["화곡동"] },
    { id: "화곡1동", name: "화곡1동", neighborhoods: ["화곡동"] },
    { id: "화곡2동", name: "화곡2동", neighborhoods: ["화곡동"] },
    { id: "화곡3동", name: "화곡3동", neighborhoods: ["화곡동"] },
    { id: "화곡4동", name: "화곡4동", neighborhoods: ["화곡동"] },
    { id: "화곡6동", name: "화곡6동", neighborhoods: ["화곡동"] },
    { id: "화곡8동", name: "화곡8동", neighborhoods: ["화곡동"] },
    { id: "가양1동", name: "가양1동", neighborhoods: ["가양동"] },
    { id: "가양2동", name: "가양2동", neighborhoods: ["가양동"] },
    { id: "가양3동", name: "가양3동", neighborhoods: ["가양동"] },
    { id: "발산1동", name: "발산1동", neighborhoods: ["발산동"] },
    { id: "우장산동", name: "우장산동", neighborhoods: ["우장산동"] },
    { id: "공항동", name: "공항동", neighborhoods: ["공항동"] },
    { id: "방화1동", name: "방화1동", neighborhoods: ["방화동"] },
    { id: "방화2동", name: "방화2동", neighborhoods: ["방화동"] },
    { id: "방화3동", name: "방화3동", neighborhoods: ["방화동"] }
  ]
};

const yangcheonGu: Region = {
  id: "yangcheon",
  name: "양천구",
  color: "#F8D7DA",
  districts: [
    { id: "목1동", name: "목1동", neighborhoods: ["목동"] },
    { id: "목2동", name: "목2동", neighborhoods: ["목동"] },
    { id: "목3동", name: "목3동", neighborhoods: ["목동"] },
    { id: "목4동", name: "목4동", neighborhoods: ["목동"] },
    { id: "목5동", name: "목5동", neighborhoods: ["목동"] },
    { id: "안양천동", name: "안양천동", neighborhoods: ["안양천동"] },
    { id: "신월1동", name: "신월1동", neighborhoods: ["신월동"] },
    { id: "신월2동", name: "신월2동", neighborhoods: ["신월동"] },
    { id: "신월3동", name: "신월3동", neighborhoods: ["신월동"] },
    { id: "신월4동", name: "신월4동", neighborhoods: ["신월동"] },
    { id: "신월5동", name: "신월5동", neighborhoods: ["신월동"] },
    { id: "신월6동", name: "신월6동", neighborhoods: ["신월동"] },
    { id: "신월7동", name: "신월7동", neighborhoods: ["신월동"] },
    { id: "신정1동", name: "신정1동", neighborhoods: ["신정동"] },
    { id: "신정2동", name: "신정2동", neighborhoods: ["신정동"] },
    { id: "신정3동", name: "신정3동", neighborhoods: ["신정동"] },
    { id: "신정4동", name: "신정4동", neighborhoods: ["신정동"] },
    { id: "신정6동", name: "신정6동", neighborhoods: ["신정동"] },
    { id: "신정7동", name: "신정7동", neighborhoods: ["신정동"] }
  ]
};

const guroGu: Region = {
  id: "guro",
  name: "구로구",
  color: "#D5DBDB",
  districts: [
    { id: "신도림동", name: "신도림동", neighborhoods: ["신도림동"] },
    { id: "구로1동", name: "구로1동", neighborhoods: ["구로동"] },
    { id: "구로2동", name: "구로2동", neighborhoods: ["구로동"] },
    { id: "구로3동", name: "구로3동", neighborhoods: ["구로동"] },
    { id: "구로4동", name: "구로4동", neighborhoods: ["구로동"] },
    { id: "구로5동", name: "구로5동", neighborhoods: ["구로동"] },
    { id: "가리봉동", name: "가리봉동", neighborhoods: ["가리봉동"] },
    { id: "고척1동", name: "고척1동", neighborhoods: ["고척동"] },
    { id: "고척2동", name: "고척2동", neighborhoods: ["고척동"] },
    { id: "개봉1동", name: "개봉1동", neighborhoods: ["개봉동"] },
    { id: "개봉2동", name: "개봉2동", neighborhoods: ["개봉동"] },
    { id: "개봉3동", name: "개봉3동", neighborhoods: ["개봉동"] },
    { id: "오류1동", name: "오류1동", neighborhoods: ["오류동"] },
    { id: "오류2동", name: "오류2동", neighborhoods: ["오류동"] },
    { id: "온수동", name: "온수동", neighborhoods: ["온수동"] }
  ]
};

const geumcheonGu: Region = {
  id: "geumcheon",
  name: "금천구",
  color: "#FADBD8",
  districts: [
    { id: "가산동", name: "가산동", neighborhoods: ["가산동"] },
    { id: "독산1동", name: "독산1동", neighborhoods: ["독산동"] },
    { id: "독산2동", name: "독산2동", neighborhoods: ["독산동"] },
    { id: "독산3동", name: "독산3동", neighborhoods: ["독산동"] },
    { id: "독산4동", name: "독산4동", neighborhoods: ["독산동"] },
    { id: "시흥1동", name: "시흥1동", neighborhoods: ["시흥동"] },
    { id: "시흥2동", name: "시흥2동", neighborhoods: ["시흥동"] },
    { id: "시흥3동", name: "시흥3동", neighborhoods: ["시흥동"] },
    { id: "시흥4동", name: "시흥4동", neighborhoods: ["시흥동"] },
    { id: "시흥5동", name: "시흥5동", neighborhoods: ["시흥동"] }
  ]
};

const yeongdeungpoGu: Region = {
  id: "yeongdeungpo",
  name: "영등포구",
  color: "#D6EAF8",
  districts: [
    { id: "영등포본동", name: "영등포본동", neighborhoods: ["영등포동"] },
    { id: "영등포동", name: "영등포동", neighborhoods: ["영등포동"] },
    { id: "여의동", name: "여의동", neighborhoods: ["여의도동"] },
    { id: "당산1동", name: "당산1동", neighborhoods: ["당산동"] },
    { id: "당산2동", name: "당산2동", neighborhoods: ["당산동"] },
    { id: "도림동", name: "도림동", neighborhoods: ["도림동"] },
    { id: "문래동", name: "문래동", neighborhoods: ["문래동"] },
    { id: "양평1동", name: "양평1동", neighborhoods: ["양평동"] },
    { id: "양평2동", name: "양평2동", neighborhoods: ["양평동"] },
    { id: "신길1동", name: "신길1동", neighborhoods: ["신길동"] },
    { id: "신길3동", name: "신길3동", neighborhoods: ["신길동"] },
    { id: "신길4동", name: "신길4동", neighborhoods: ["신길동"] },
    { id: "신길5동", name: "신길5동", neighborhoods: ["신길동"] },
    { id: "신길6동", name: "신길6동", neighborhoods: ["신길동"] },
    { id: "신길7동", name: "신길7동", neighborhoods: ["신길동"] },
    { id: "대림1동", name: "대림1동", neighborhoods: ["대림동"] },
    { id: "대림2동", name: "대림2동", neighborhoods: ["대림동"] },
    { id: "대림3동", name: "대림3동", neighborhoods: ["대림동"] }
  ]
};

const dongjakGu: Region = {
  id: "dongjak",
  name: "동작구",
  color: "#D5F4E6",
  districts: [
    { id: "노량진1동", name: "노량진1동", neighborhoods: ["노량진동"] },
    { id: "노량진2동", name: "노량진2동", neighborhoods: ["노량진동"] },
    { id: "상도1동", name: "상도1동", neighborhoods: ["상도동"] },
    { id: "상도2동", name: "상도2동", neighborhoods: ["상도동"] },
    { id: "상도3동", name: "상도3동", neighborhoods: ["상도동"] },
    { id: "흑석동", name: "흑석동", neighborhoods: ["흑석동"] },
    { id: "동작동", name: "동작동", neighborhoods: ["동작동"] },
    { id: "사당1동", name: "사당1동", neighborhoods: ["사당동"] },
    { id: "사당2동", name: "사당2동", neighborhoods: ["사당동"] },
    { id: "사당3동", name: "사당3동", neighborhoods: ["사당동"] },
    { id: "사당4동", name: "사당4동", neighborhoods: ["사당동"] },
    { id: "사당5동", name: "사당5동", neighborhoods: ["사당동"] },
    { id: "대방동", name: "대방동", neighborhoods: ["대방동"] },
    { id: "신대방1동", name: "신대방1동", neighborhoods: ["신대방동"] },
    { id: "신대방2동", name: "신대방2동", neighborhoods: ["신대방동"] }
  ]
};

const gwanakGu: Region = {
  id: "gwanak",
  name: "관악구",
  color: "#FDEBD0",
  districts: [
    { id: "보라매동", name: "보라매동", neighborhoods: ["보라매동"] },
    { id: "청림동", name: "청림동", neighborhoods: ["청림동"] },
    { id: "행운동", name: "행운동", neighborhoods: ["행운동"] },
    { id: "청룡동", name: "청룡동", neighborhoods: ["청룡동"] },
    { id: "은천동", name: "은천동", neighborhoods: ["은천동"] },
    { id: "성현동", name: "성현동", neighborhoods: ["성현동"] },
    { id: "중앙동", name: "중앙동", neighborhoods: ["중앙동"] },
    { id: "인헌동", name: "인헌동", neighborhoods: ["인헌동"] },
    { id: "남현동", name: "남현동", neighborhoods: ["남현동"] },
    { id: "서원동", name: "서원동", neighborhoods: ["서원동"] },
    { id: "신원동", name: "신원동", neighborhoods: ["신원동"] },
    { id: "서림동", name: "서림동", neighborhoods: ["서림동"] },
    { id: "삼성동", name: "삼성동", neighborhoods: ["삼성동"] },
    { id: "미성동", name: "미성동", neighborhoods: ["미성동"] },
    { id: "난곡동", name: "난곡동", neighborhoods: ["난곡동"] },
    { id: "신사동", name: "신사동", neighborhoods: ["신사동"] },
    { id: "조원동", name: "조원동", neighborhoods: ["조원동"] },
    { id: "신림동", name: "신림동", neighborhoods: ["신림동"] },
    { id: "난향동", name: "난향동", neighborhoods: ["난향동"] },
    { id: "조원동", name: "조원동", neighborhoods: ["조원동"] },
    { id: "대학동", name: "대학동", neighborhoods: ["대학동"] }
  ]
};

// District ID to Region mapping
export const districtToRegionMap: Record<string, Region> = {
  gangnam: gangnamGu,
  seocho: seochoGu,
  songpa: songpaGu,
  yongsan: yongsanGu,
  seongbuk: seongbukGu,
  jongno: jongnoGu,
  jung: jungGu,
  seongdong: seongdongGu,
  gwangjin: gwangjinGu,
  dongdaemun: dongdaemunGu,
  jungnang: jungnangGu,
  gangbuk: gangbukGu,
  dobong: dobongGu,
  nowon: nowonGu,
  eunpyeong: eunpyeongGu,
  seodaemun: seodaemunGu,
  mapo: mapoGu,
  gangseo: gangseoGu,
  yangcheon: yangcheonGu,
  guro: guroGu,
  geumcheon: geumcheonGu,
  yeongdeungpo: yeongdeungpoGu,
  dongjak: dongjakGu,
  gwanak: gwanakGu
};

// Get district details with dong information
export const getDistrictDongInfo = (districtId: string) => {
  const region = districtToRegionMap[districtId];
  if (!region) return null;
  
  return {
    id: region.id,
    name: region.name,
    districts: region.districts || [],
    dongCount: region.districts?.length || 0,
    color: region.color
  };
};