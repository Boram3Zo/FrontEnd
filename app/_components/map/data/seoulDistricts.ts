export interface SeoulDistrict {
  id: string;
  name: string;
  koreanName: string;
  color: string;
  population?: number;
  area?: number;
  dongCount: number;
  description?: string;
}

export const seoulDistricts: SeoulDistrict[] = [
  { 
    id: 'jongno', 
    name: 'Jongno-gu', 
    koreanName: '종로구', 
    color: '#FF6B6B', 
    dongCount: 17,
    population: 151235,
    area: 23.91,
    description: '서울의 중심부, 경복궁과 창덕궁이 위치한 역사문화의 중심지'
  },
  { 
    id: 'jung', 
    name: 'Jung-gu', 
    koreanName: '중구', 
    color: '#4ECDC4', 
    dongCount: 15,
    population: 125709,
    area: 9.96,
    description: '서울역, 명동, 남대문시장 등 상업과 금융의 중심지'
  },
  { 
    id: 'yongsan', 
    name: 'Yongsan-gu', 
    koreanName: '용산구', 
    color: '#45B7D1', 
    dongCount: 16,
    population: 244203,
    area: 21.87,
    description: '한강과 인접한 국제업무지구, 이태원과 한남동이 위치'
  },
  { 
    id: 'seongdong', 
    name: 'Seongdong-gu', 
    koreanName: '성동구', 
    color: '#96CEB4', 
    dongCount: 17,
    population: 300614,
    area: 16.86,
    description: '성수동 IT밸리와 뚝섬한강공원이 위치한 신흥 문화지역'
  },
  { 
    id: 'gwangjin', 
    name: 'Gwangjin-gu', 
    koreanName: '광진구', 
    color: '#FFEAA7', 
    dongCount: 15,
    population: 350123,
    area: 17.06,
    description: '건대입구와 강변테크노마트가 위치한 젊음의 거리'
  },
  { 
    id: 'dongdaemun', 
    name: 'Dongdaemun-gu', 
    koreanName: '동대문구', 
    color: '#DDA0DD', 
    dongCount: 14,
    population: 346271,
    area: 14.21,
    description: '동대문 패션타운과 경희대학교가 위치한 패션과 교육의 중심'
  },
  { 
    id: 'jungnang', 
    name: 'Jungnang-gu', 
    koreanName: '중랑구', 
    color: '#98D8C8', 
    dongCount: 16,
    population: 410854,
    area: 18.50,
    description: '면목동, 상봉동 등 주거지역이 발달한 서울 동북부 지역'
  },
  { 
    id: 'seongbuk', 
    name: 'Seongbuk-gu', 
    koreanName: '성북구', 
    color: '#F7DC6F', 
    dongCount: 20,
    population: 452062,
    area: 24.58,
    description: '성신여대, 고려대학교가 위치한 교육과 문화의 중심지'
  },
  { 
    id: 'gangbuk', 
    name: 'Gangbuk-gu', 
    koreanName: '강북구', 
    color: '#BB8FCE', 
    dongCount: 13,
    population: 318140,
    area: 23.60,
    description: '북한산 자락에 위치한 자연친화적 주거지역'
  },
  { 
    id: 'dobong', 
    name: 'Dobong-gu', 
    koreanName: '도봉구', 
    color: '#85C1E9', 
    dongCount: 8,
    population: 332424,
    area: 20.67,
    description: '도봉산과 북한산이 인접한 서울 최북단 지역'
  },
  { 
    id: 'nowon', 
    name: 'Nowon-gu', 
    koreanName: '노원구', 
    color: '#F8C471', 
    dongCount: 14,
    population: 544595,
    area: 35.44,
    description: '서울 최대 규모의 신도시, 교육특구로 유명'
  },
  { 
    id: 'eunpyeong', 
    name: 'Eunpyeong-gu', 
    koreanName: '은평구', 
    color: '#82E0AA', 
    dongCount: 16,
    population: 484735,
    area: 29.71,
    description: '연신내와 불광동이 중심인 서울 서북부 신도시'
  },
  { 
    id: 'seodaemun', 
    name: 'Seodaemun-gu', 
    koreanName: '서대문구', 
    color: '#F1948A', 
    dongCount: 14,
    population: 311244,
    area: 17.60,
    description: '연세대학교와 이화여자대학교가 위치한 대학가'
  },
  { 
    id: 'mapo', 
    name: 'Mapo-gu', 
    koreanName: '마포구', 
    color: '#85C1E9', 
    dongCount: 16,
    population: 373324,
    area: 23.84,
    description: '홍대, 합정, 상암동 디지털미디어시티가 위치한 문화창조지역'
  },
  { 
    id: 'yangcheon', 
    name: 'Yangcheon-gu', 
    koreanName: '양천구', 
    color: '#D7BDE2', 
    dongCount: 18,
    population: 470856,
    area: 17.40,
    description: '목동과 신정동 신시가지가 발달한 서울 서남부'
  },
  { 
    id: 'gangseo', 
    name: 'Gangseo-gu', 
    koreanName: '강서구', 
    color: '#A3E4D7', 
    dongCount: 20,
    population: 596906,
    area: 41.44,
    description: '김포공항과 마곡 R&D단지가 위치한 서울의 관문'
  },
  { 
    id: 'guro', 
    name: 'Guro-gu', 
    koreanName: '구로구', 
    color: '#F9E79F', 
    dongCount: 15,
    population: 424037,
    area: 20.12,
    description: '구로디지털단지와 가산디지털단지의 IT산업 중심지'
  },
  { 
    id: 'geumcheon', 
    name: 'Geumcheon-gu', 
    koreanName: '금천구', 
    color: '#FAD7A0', 
    dongCount: 10,
    population: 245424,
    area: 13.02,
    description: '독산동 일대의 산업단지와 시흥대로변 상업지역'
  },
  { 
    id: 'yeongdeungpo', 
    name: 'Yeongdeungpo-gu', 
    koreanName: '영등포구', 
    color: '#AED6F1', 
    dongCount: 18,
    population: 389302,
    area: 24.56,
    description: '여의도 금융중심지와 타임스퀘어가 위치한 상업지역'
  },
  { 
    id: 'dongjak', 
    name: 'Dongjak-gu', 
    koreanName: '동작구', 
    color: '#A9DFBF', 
    dongCount: 16,
    population: 397592,
    area: 16.35,
    description: '노량진과 사당동, 동작대교 남단의 교육과 주거지역'
  },
  { 
    id: 'gwanak', 
    name: 'Gwanak-gu', 
    koreanName: '관악구', 
    color: '#F5B7B1', 
    dongCount: 21,
    population: 508675,
    area: 29.57,
    description: '서울대학교와 관악산이 위치한 교육과 자연이 조화된 지역'
  },
  { 
    id: 'seocho', 
    name: 'Seocho-gu', 
    koreanName: '서초구', 
    color: '#A5D6A7', 
    dongCount: 18,
    population: 433267,
    area: 47.14,
    description: '강남 3구 중 하나, 교육특구와 법조타운이 위치'
  },
  { 
    id: 'gangnam', 
    name: 'Gangnam-gu', 
    koreanName: '강남구', 
    color: '#FFCDD2', 
    dongCount: 22,
    population: 561052,
    area: 39.50,
    description: '대한민국 경제의 중심지, 테헤란로 일대의 업무지구'
  },
  { 
    id: 'songpa', 
    name: 'Songpa-gu', 
    koreanName: '송파구', 
    color: '#DCEDC1', 
    dongCount: 28,
    population: 672045,
    area: 33.87,
    description: '잠실 롯데타워와 올림픽공원이 위치한 스포츠와 쇼핑의 메카'
  },
  { 
    id: 'gangdong', 
    name: 'Gangdong-gu', 
    koreanName: '강동구', 
    color: '#FFE0B2', 
    dongCount: 18,
    population: 467675,
    area: 24.59,
    description: '천호동과 명일동 일대의 한강 연안 주거지역'
  }
];

// 구별 색상 테마
export const districtColors = {
  northern: ['#FF6B6B', '#4ECDC4', '#45B7D1'], // 북부권
  central: ['#96CEB4', '#FFEAA7', '#DDA0DD'], // 중부권  
  southern: ['#F7DC6F', '#BB8FCE', '#85C1E9'], // 남부권
  western: ['#F8C471', '#82E0AA', '#F1948A'], // 서부권
  eastern: ['#A3E4D7', '#F9E79F', '#FAD7A0'] // 동부권
};

// 구별 위치 정보 (SVG 좌표)
export const districtPositions: Record<string, { x: number; y: number; width: number; height: number }> = {
  // 이 정보는 실제 서울시 지도 이미지를 기반으로 업데이트 필요
  jongno: { x: 280, y: 120, width: 80, height: 60 },
  jung: { x: 280, y: 200, width: 80, height: 60 },
  yongsan: { x: 180, y: 200, width: 80, height: 60 },
  seongdong: { x: 380, y: 200, width: 80, height: 60 },
  gwangjin: { x: 480, y: 200, width: 80, height: 60 },
  dongdaemun: { x: 480, y: 120, width: 80, height: 60 },
  jungnang: { x: 580, y: 120, width: 80, height: 60 },
  seongbuk: { x: 380, y: 120, width: 80, height: 60 },
  gangbuk: { x: 280, y: 40, width: 80, height: 60 },
  dobong: { x: 180, y: 40, width: 80, height: 60 },
  nowon: { x: 380, y: 40, width: 80, height: 60 },
  eunpyeong: { x: 80, y: 120, width: 80, height: 60 },
  seodaemun: { x: 180, y: 120, width: 80, height: 60 },
  mapo: { x: 80, y: 200, width: 80, height: 60 },
  yangcheon: { x: 180, y: 280, width: 80, height: 60 },
  gangseo: { x: 80, y: 280, width: 80, height: 60 },
  guro: { x: 180, y: 360, width: 80, height: 60 },
  geumcheon: { x: 80, y: 360, width: 80, height: 60 },
  yeongdeungpo: { x: 280, y: 280, width: 80, height: 60 },
  dongjak: { x: 280, y: 360, width: 80, height: 60 },
  gwanak: { x: 380, y: 360, width: 80, height: 60 },
  seocho: { x: 480, y: 360, width: 80, height: 60 },
  gangnam: { x: 380, y: 440, width: 80, height: 60 },
  songpa: { x: 480, y: 440, width: 80, height: 60 },
  gangdong: { x: 580, y: 200, width: 80, height: 60 }
};
