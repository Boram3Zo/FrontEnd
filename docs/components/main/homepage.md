# 메인 홈페이지

사용자가 처음 접하는 메인 화면 컴포넌트들입니다.

## 🏠 주요 컴포넌트

### HeroSection

**파일**: `app/_components/main/HeroSection.tsx`

#### 기능

- 앱 소개 및 주요 기능 홍보
- 산책 시작 CTA 버튼
- 브랜딩 이미지 및 메시지

### FeatureCards

**파일**: `app/_components/main/FeatureCards.tsx`

#### 기능

- 주요 기능들을 카드 형태로 표시
- 각 기능별 아이콘 및 설명
- 해당 기능 페이지로 네비게이션

### CatCharactersSection

**파일**: `app/_components/main/CatCharactersSection.tsx`

#### 기능

- 수집 가능한 고양이 캐릭터 미리보기
- 게임 요소 소개
- 고양이 컬렉션 페이지로 연결

### PopularCourses

**파일**: `app/_components/main/PopularCourses.tsx`

#### 기능

- 인기 산책 코스 추천
- 코스 썸네일 및 기본 정보
- 코스 상세 페이지로 연결

## 📱 페이지 구조

### 홈페이지

**파일**: `app/(main)/page.tsx`

```typescript
export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
			<Header />

			<main className="pb-20">
				<HeroSection />
				<FeatureCards />
				<CatCharactersSection />
				<PopularCourses />
			</main>

			<BottomNavigation />
		</div>
	);
}
```

## 🎨 디자인 시스템

### 컬러 팔레트

- Primary: Orange/Pink 그라디언트
- Background: orange-50 to amber-50
- Text: gray-800, gray-600

### 레이아웃

- 모바일 퍼스트 설계
- 반응형 그리드 시스템
- 일관된 간격 (Tailwind spacing)

## 🔗 네비게이션 연결

### 주요 연결 페이지

- 산책 시작 → `/walk`
- 코스 탐색 → `/course`
- 고양이 컬렉션 → `/cat-tower`
- 지역별 코스 → `/region`

## 📝 업데이트 가이드

홈페이지 수정 시:

1. 새로운 기능 추가 → `FeatureCards.tsx`에 카드 추가
2. 인기 코스 알고리즘 변경 → `PopularCourses.tsx` 로직 수정
3. 브랜딩 메시지 수정 → `HeroSection.tsx` 콘텐츠 업데이트
4. 레이아웃 변경 → `app/(main)/page.tsx` 구조 수정

## 🧪 테스트

관련 테스트 파일:

- `app/(main)/page.test.tsx`
- `app/_components/main/HeroSection.test.tsx`
- `app/_components/main/FeatureCards.test.tsx`

## 📊 성능 고려사항

### 최적화

- 이미지 lazy loading
- 컴포넌트 code splitting
- 초기 로딩 성능 최적화

### 모니터링 지표

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- 사용자 참여도 (CTA 클릭률)
