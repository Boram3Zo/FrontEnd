# WalkTrackerStats 컴포넌트 사용법

## 개요

`WalkTrackerStats`는 산책 통계 정보를 다양한 레이아웃으로 표시하는 재사용 가능한 컴포넌트입니다.

## 기능

- 📊 실시간 통계 표시 (거리, 시간, 페이스, 속도)
- 🎨 다양한 레이아웃 지원 (grid, horizontal, compact)
- 🔄 로딩 상태 지원
- 📱 반응형 디자인
- 🎯 확장 통계 옵션

## Props

### WalkTrackerStatsProps

```typescript
interface WalkTrackerStatsProps {
	distance: number; // 거리 (미터)
	elapsedMs: number; // 경과 시간 (밀리초)
	layout?: "grid" | "horizontal" | "compact"; // 레이아웃 타입
	showExtended?: boolean; // 추가 통계 표시 여부
	loading?: boolean; // 로딩 상태
}
```

## 사용 예시

### 기본 사용법

```tsx
import { WalkTrackerStats } from "@/app/_components/walk/WalkTrackerStats";

function MyComponent() {
	return (
		<WalkTrackerStats
			distance={1500} // 1.5km
			elapsedMs={900000} // 15분
		/>
	);
}
```

### 다양한 레이아웃

```tsx
// 그리드 레이아웃 (기본)
<WalkTrackerStats
  distance={1500}
  elapsedMs={900000}
  layout="grid"
/>

// 가로형 레이아웃
<WalkTrackerStats
  distance={1500}
  elapsedMs={900000}
  layout="horizontal"
/>

// 컴팩트 레이아웃
<WalkTrackerStats
  distance={1500}
  elapsedMs={900000}
  layout="compact"
/>
```

### 확장 통계 포함

```tsx
<WalkTrackerStats
	distance={1500}
	elapsedMs={900000}
	showExtended={true} // 평균 속도 등 추가 통계 표시
/>
```

### 로딩 상태

```tsx
<WalkTrackerStats
	distance={0}
	elapsedMs={0}
	loading={true} // 스켈레톤 UI 표시
/>
```

## 관련 컴포넌트

### StatCard

개별 통계 항목을 표시하는 기본 카드 컴포넌트

### StatCardHorizontal

가로형 레이아웃을 위한 컴팩트한 카드 컴포넌트

## 유틸리티 함수

### walkingStats.ts

통계 계산 및 포맷팅을 위한 유틸리티 함수들:

- `formatElapsedTime()` - 시간 포맷팅
- `formatDistance()` - 거리 포맷팅
- `calculatePace()` - 페이스 계산
- `calculateSpeed()` - 속도 계산
- `estimateCalories()` - 칼로리 추정

## 스타일링

각 통계 카드는 다른 색상 테마를 사용합니다:

- 시간: 파란색 (`text-blue-500`, `bg-blue-50`)
- 거리: 초록색 (`text-green-500`, `bg-green-50`)
- 페이스: 주황색 (`text-orange-500`, `bg-orange-50`)
- 속도: 보라색 (`text-purple-500`, `bg-purple-50`)

## 반응형 지원

모든 레이아웃은 모바일 친화적이며, Tailwind CSS의 반응형 클래스를 활용합니다.
