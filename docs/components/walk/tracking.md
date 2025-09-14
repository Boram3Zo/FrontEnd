# 산책 추적 컴포넌트

GPS 기반 실시간 산책 추적 및 경로 기록 시스템입니다.

## 📍 주요 컴포넌트

### WalkingTracker

**파일**: `app/_components/walk/WalkingTracker.tsx`

#### 기능

- 실시간 GPS 위치 추적 및 경로 기록
- Google Maps API를 활용한 지도 표시
- 수동 모드 지원 (키보드 방향키로 이동)
- 거리/시간 계산 및 실시간 표시
- Haversine 공식으로 정확한 거리 측정

#### Props

```typescript
interface WalkingTrackerProps {
	// Props 정의
}
```

#### 사용법

```typescript
import { WalkingTracker } from "@/components/walk/WalkingTracker";

<WalkingTracker />;
```

## 🏁 산책 완료 처리

### WalkingSummary

**파일**: `app/_components/walk/WalkingSummary.tsx`

#### 기능

- 산책 완료 후 통계 표시 (시간, 거리, 페이스)
- RouteMap 컴포넌트로 경로 시각화
- Google Maps Polyline을 활용한 경로 렌더링
- 세션 저장 및 공유 기능

## 🔗 관련 훅

### useWalkTracker

**파일**: `app/_hooks/useWalkTracker.ts`

- 산책 추적 로직 관리

### useWalkingSession

**파일**: `app/_hooks/useWalkingSession.ts`

- 산책 세션 상태 관리

## 📝 업데이트 가이드

이 컴포넌트를 수정할 때:

1. 위치 추적 정확도 개선 시 → GPS 관련 설정 업데이트
2. 지도 표시 방식 변경 시 → RouteMap 컴포넌트 동시 업데이트
3. 새로운 통계 항목 추가 시 → WalkingSummary 컴포넌트 수정

## 🧪 테스트

관련 테스트 파일:

- `app/_hooks/useWalkTracker.test.ts`
- `app/_components/walk/WalkingTracker.test.tsx`
