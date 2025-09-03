## 📦 주요 패키지 및 사용 이유

### 핵심 프레임워크

- **Next.js 15.2.4**: React 기반 풀스택 프레임워크

  - App Router 사용으로 파일 기반 라우팅
  - 서버사이드 렌더링(SSR) 및 정적 사이트 생성(SSG) 지원
  - 이미지 최적화 및 성능 최적화 내장

- **React 19.0.0**: 최신 React 버전
  - 컴포넌트 기반 UI 구조
  - Hooks를 활용한 상태 관리
  - Virtual DOM으로 최적화된 렌더링

### 스타일링

- **Tailwind CSS 4.1.12**: 유틸리티 퍼스트 CSS 프레임워크

  - 빠른 UI 개발을 위한 유틸리티 클래스
  - 반응형 디자인 지원
  - 일관된 디자인 시스템 구축

- **tw-animate-css 1.3.7**: Tailwind용 추가 애니메이션

  - 고양이 캐릭터의 bounce/wiggle 효과
  - 부드러운 UI 트랜지션

- **tailwind-merge 3.3.1**: Tailwind 클래스 충돌 해결
  - 동적 클래스명 병합
  - 스타일 우선순위 관리

### UI 컴포넌트

- **@radix-ui**: 접근성 중심의 headless UI 컴포넌트

  - `react-checkbox`: 체크박스 컴포넌트
  - `react-dialog`: 모달/다이얼로그 (고양이 발견 팝업)
  - `react-label`: 라벨 컴포넌트
  - `react-slot`: 컴포넌트 합성을 위한 슬롯

- **class-variance-authority 0.7.1**: 조건부 스타일링

  - 버튼 variant 관리 (primary, secondary, outline)
  - 컴포넌트 상태별 스타일 적용

- **clsx 2.1.1**: 조건부 클래스명 관리
  - 동적 CSS 클래스 조합
  - 코드 가독성 향상

### 아이콘 및 UI

- **lucide-react 0.540.0**: 모던 아이콘 라이브러리
  - GPS, 지도, 산책 관련 아이콘
  - SVG 기반으로 확장성 우수
  - Tree-shaking 지원으로 번들 크기 최적화

### 개발 도구

- **TypeScript 5**: 정적 타입 체크

  - 컴파일 타임 에러 검출
  - 코드 자동완성 및 리팩토링 지원
  - 대규모 프로젝트 유지보수성 향상

- **ESLint 9**: 코드 품질 관리
  - Next.js 전용 설정 포함
  - 코딩 컨벤션 일관성 유지

### 테스팅

- **Jest 30.1.3**: JavaScript 테스트 프레임워크

  - 단위 테스트 및 통합 테스트
  - 코드 커버리지 측정
  - Mocking 및 스냅샷 테스트

- **@testing-library/react 16.3.0**: React 컴포넌트 테스트

  - 사용자 중심의 테스트 작성
  - 컴포넌트 상호작용 테스트
  - 접근성 기반 요소 선택

- **@testing-library/jest-dom 6.8.0**: Jest DOM 매처

  - DOM 상태 검증을 위한 커스텀 매처
  - 가독성 높은 테스트 작성

- **@testing-library/user-event 14.6.1**: 사용자 이벤트 시뮬레이션
  - 클릭, 타이핑 등 실제 사용자 행동 모방
  - 더 현실적인 테스트 환경

### 타입 정의

- **@types/google.maps 3.58.1**: Google Maps API 타입 정의

  - Google Maps JavaScript API의 TypeScript 지원
  - GPS 추적 및 지도 렌더링에 필수

- **@types/jest 30.0.0**: Jest 타입 정의
- **@types/node 20**: Node.js 타입 정의
- **@types/react 19**: React 타입 정의
- **@types/react-dom 19**: React DOM 타입 정의

### 빌드 도구

- **@tailwindcss/postcss 4**: Tailwind CSS PostCSS 플러그인

  - CSS 처리 및 최적화
  - 프로덕션 빌드 시 불필요한 스타일 제거

- **jest-environment-jsdom 30.1.2**: Jest DOM 환경
  - 브라우저 환경 시뮬레이션
  - DOM API 테스트 지원
