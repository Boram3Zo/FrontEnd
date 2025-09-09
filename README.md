# 치카쿠 (Chikaku) - 숨겨진 골목길 산책 앱

나만 알고 있는 숨겨진 골목길 산책 코스를 기록하고 공유하는 모바일 웹 애플리케이션입니다.

## 🚀 주요 기능

- **GPS 기반 산책 추적**: 실시간으로 산책 경로를 기록하고 거리/시간을 측정
- **테마별 코스 탐색**: 자연힐링, 역사탐방, 카페투어 등 다양한 테마
- **지역별 코스 검색**: 서울시 구/동별 산책 코스 찾기
- **고양이 캐릭터 수집**: 산책하며 만나는 귀여운 고양이 친구들
- **코스 공유**: 나만의 산책 코스를 사진과 함께 공유
- **리뷰 시스템**: 다른 사용자들의 코스 후기 확인

## 🚀 프로젝트 실행하기

### 필요 조건

- Node.js 18+
- Google Maps API 키

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:9988" >> .env.local

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm start
```

## � 문서 가이드

프로젝트에 대한 자세한 정보는 아래 문서들을 참고해주세요:

### 📖 주요 문서

- **[기능 상세 가이드](README.기능상세.md)** - 핵심 모듈과 주요 화면에 대한 상세 설명
- **[기술 스택 및 구조](README.기술스택.md)** - 사용된 기술과 프로젝트 구조 설명
- **[프로젝트 구조](README.프로젝트구조.md)** - 폴더 구조 및 파일 조직 방법
- **[패키지 관리](README.패키지.md)** - 의존성 패키지 및 설치 가이드

### 🔧 개발 관련 문서

- **[회원가입 기능](README.회원가입.md)** - 인증 시스템 구현 상세
- **[프롬프트 가이드](README.프롬프트.md)** - AI 어시스턴트 활용 가이드

## � 기술 스택

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps JavaScript API
- **UI**: shadcn/ui + Radix UI

## 📄 라이선스

이 프로젝트는 Next.js 기반으로 제작되었습니다.
