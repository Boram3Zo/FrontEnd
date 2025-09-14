# 치카쿠 (Chikaku) - 기능 상세 가이드

## 🎯 핵심 모듈 설명

### 1. GPS 산책 추적 ([`walking-tracker.tsx`](app/_components/walking-tracker.tsx))

- 실시간 GPS 위치 추적 및 경로 기록
- Google Maps API를 활용한 지도 표시
- 수동 모드 지원 (키보드 방향키로 이동)
- 거리/시간 계산 및 실시간 표시
- Haversine 공식으로 정확한 거리 측정

### 2. 산책 요약 ([`walking-summary.tsx`](app/_components/walking-summary.tsx))

- 산책 완료 후 통계 표시 (시간, 거리, 페이스)
- [`RouteMap`](app/_components/walking-summary.tsx) 컴포넌트로 경로 시각화
- Google Maps Polyline을 활용한 경로 렌더링
- 세션 저장 및 공유 기능

### 3. 고양이 컬렉션 시스템

- [`cat-collection.tsx`](app/_components/cat-collection.tsx): 고양이 목록 및 필터링
- [`collected-cat.tsx`](app/_components/collected-cat.tsx): SVG 기반 고양이 렌더링
- [`cat-discovery-modal.tsx`](app/_components/cat-discovery-modal.tsx): 발견 이벤트 처리
- 22종의 다양한 고양이 (일반~전설 등급)
- 산책 중 랜덤 발견 시스템

### 4. 사진 관리 시스템

- [`PhotoUploader.tsx`](app/_components/photo/PhotoUploader.tsx): 다중 사진 업로드
- [`usePhotoManager.ts`](app/_hooks/usePhotoManager.ts): 사진 상태 관리 훅
- 최대 사진 수 제한 및 파일 타입 검증
- 사진 설명 추가 및 미리보기 기능

### 5. 지도 컴포넌트

- [`GoogleMap.tsx`](app/_components/map/GoogleMap.tsx): Google Maps 기본 래퍼
- [`RouteMap.tsx`](app/_components/map/RouteMap.tsx): 산책 경로 표시
- [`korean-map.tsx`](app/_components/korean-map.tsx): SVG 기반 한국 지도

### 6. 테마 시스템

- [`theme-recommendations.tsx`](app/_components/theme-recommendations.tsx): 랜덤 테마 추천
- 8가지 테마: 자연힐링, 역사탐방, 카페투어, 야경명소 등
- 각 테마별 코스 분류 및 필터링

### 7. 코스 관리

- [`course-header.tsx`](app/_components/course-header.tsx): 코스 기본 정보
- [`course-map.tsx`](app/_components/course-map.tsx): 코스 지도 시각화
- [`course-reviews.tsx`](app/_components/course-reviews.tsx): 리뷰 시스템
- [`course-spots.tsx`](app/_components/course-spots.tsx): 코스 내 주요 스팟

## 📱 주요 화면

1. **홈페이지** ([`app/(main)/page.tsx`](<app/(main)/page.tsx>))

   - 산책 시작 버튼, 인기 코스, 기능 소개

2. **산책 추적** ([`app/(main)/walk/page.tsx`](<app/(main)/walk/page.tsx>))

   - GPS 추적, 실시간 통계, 고양이 발견

3. **테마별 코스** ([`app/(main)/theme/page.tsx`](<app/(main)/theme/page.tsx>))

   - 테마 목록, 추천 시스템

4. **지역별 코스** ([`app/(main)/region/page.tsx`](<app/(main)/region/page.tsx>))

   - 한국 지도, 구/동 선택

5. **캣타워** ([`app/(main)/cat-tower/page.tsx`](<app/(main)/cat-tower/page.tsx>))

   - 고양이 컬렉션 관리

6. **코스 공유** ([`app/(main)/share/page.tsx`](<app/(main)/share/page.tsx>))
   - 산책 후 코스 공유 작성

## 🎨 디자인 시스템

- **컬러**: Orange/Pink 그라데이션 기반
- **애니메이션**: 고양이 캐릭터 bounce/wiggle 효과 ([`globals.css`](app/globals.css))
- **반응형**: 모바일 우선 디자인
- **일관성**: shadcn/ui 컴포넌트 활용

## 📊 데이터 저장

- **LocalStorage**: 사용자 설정, 저장된 경로
- **SessionStorage**: 최근 산책 세션 데이터 ([`walking-summary.tsx`](app/_components/walking-summary.tsx))
- **Mock Data**: 샘플 코스 및 고양이 데이터

## 🔮 향후 계획

- [ ] 백엔드 API 연동
- [ ] 사용자 인증 시스템
- [ ] 실제 코스 데이터베이스
- [ ] 소셜 공유 기능
- [ ] PWA 지원
