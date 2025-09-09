# 치카쿠 (Chikaku) - 기술 스택 및 구조

## 🛠 기술 스택

- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: Radix UI + shadcn/ui
- **Maps**: Google Maps JavaScript API
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Fonts**: Noto Sans KR

## 📁 프로젝트 구조

```
app/
├── _components/        # 재사용 가능한 UI 컴포넌트
│   ├── auth/          # 인증 관련 컴포넌트
│   ├── cat/           # 고양이 시스템 컴포넌트
│   ├── course/        # 코스 관련 컴포넌트
│   ├── layout/        # 레이아웃 컴포넌트
│   ├── map/           # 지도 관련 컴포넌트
│   ├── photo/         # 사진 업로드 컴포넌트
│   ├── share/         # 공유 기능 컴포넌트
│   ├── theme/         # 테마 관련 컴포넌트
│   ├── ui/            # 기본 UI 컴포넌트 (shadcn/ui)
│   └── walk/          # 산책 추적 컴포넌트
├── _hooks/            # 커스텀 React 훅
├── _libs/             # 비즈니스 로직 및 유틸리티
├── _types/            # TypeScript 타입 정의
├── _utils/            # 헬퍼 함수들
├── _constants/        # 상수 정의
├── _mocks/            # 목업 데이터
├── _providers/        # Context Provider들
├── (main)/            # 메인 앱 라우트
├── (auth)/            # 인증 관련 라우트
└── (features)/        # 주요 기능 라우트
```

## 🔧 환경 설정

### 필수 환경 변수

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:9988
```

### 환경별 API 설정

- **개발 환경**: `http://localhost:9988`
- **스테이징 환경**: `https://staging-api.yourapp.com`
- **프로덕션 환경**: `https://api.yourapp.com`

### Google Maps API 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Maps JavaScript API 활성화
3. API 키 생성 및 제한 설정
4. 허용된 도메인 설정

### 개발 도구 설정

- **ESLint**: TypeScript 및 Next.js 규칙 적용
- **Prettier**: 코드 포맷팅 자동화
- **Jest**: 단위 테스트 및 통합 테스트
- **Tailwind CSS**: 유틸리티 우선 스타일링

## 🧪 테스트

```bash
# 단위 테스트 실행
npm test

# 커버리지 확인
npm run test:coverage

# 특정 파일 테스트
npm test -- usePhotoManager.test.ts
```

## 📦 배포

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 수동 배포

```bash
# 프로덕션 빌드
npm run build

# 정적 파일 생성
npm run export
```

## 🔍 성능 최적화

- **Code Splitting**: Next.js 자동 코드 분할
- **Image Optimization**: Next.js Image 컴포넌트 활용
- **Bundle Analysis**: `npm run analyze`로 번들 크기 분석
- **Lazy Loading**: 동적 import 및 React.lazy 활용

## 🐛 디버깅

### 개발 도구

- **React Developer Tools**: 컴포넌트 디버깅
- **Redux DevTools**: 상태 관리 디버깅 (향후 추가 예정)
- **Network Tab**: API 요청 모니터링

### 로그 설정

```javascript
// 개발 환경에서만 로그 출력
if (process.env.NODE_ENV === "development") {
	console.log("Debug information");
}
```

## 🔐 보안 고려사항

- **API 키 보호**: 환경 변수로 민감한 정보 관리
- **CORS 설정**: API 요청 도메인 제한
- **입력 검증**: 사용자 입력 데이터 검증
- **XSS 방지**: React의 기본 XSS 보호 활용
