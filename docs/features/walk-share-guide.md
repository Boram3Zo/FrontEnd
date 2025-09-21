# 산책 코스 공유 기능 사용 가이드

## 🚀 기능 개요

산책 종료 후 "이 산책 코스 공유하기" 버튼을 클릭하면:

1. `/post/create` API를 호출하여 게시글 생성
2. 성공 시 `/share` 페이지로 이동 (postId 포함)

## 🔄 작동 순서

### 1. 사용자 액션

- 산책 완료 후 WalkSummary 페이지에서 "이 산책 코스 공유하기" 버튼 클릭

### 2. API 호출 과정

```typescript
// 1. 산책 데이터 수집
const sessionData = {
  durationSec: 3600,     // 1시간
  distanceKm: 3.5,       // 3.5km
  route: [...],          // GPS 좌표 배열
  pins: [...]            // 시작/종료 핀 정보
};

// 2. API 요청 형식으로 변환
const postRequest = {
  postId: null,
  memberId: 1,
  title: "2025년 1월 15일 산책",
  region: "서울시 마포구",
  duration: "01:00:00",
  distance: 3.5,
  content: "멋진 산책 코스를 공유합니다!",
  theme: "",
  hashtagList: [],
  map: {
    startLatitude: "37.5665",
    startLongitude: "126.978",
    endLatitude: "37.5675",
    endLongitude: "126.980",
    spots: "37.5665,126.978;37.5670,126.979;37.5675,126.980"
  }
};

// 3. API 호출
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9988';
const result = await fetch(`${apiBaseUrl}/post/create`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(postRequest)
});
```

### 3. 응답 처리

- **성공 시**: `/share?postId=123` 페이지로 이동
- **실패 시**: 에러 메시지 표시 후 현재 페이지 유지

## 🎨 사용자 인터페이스

### 기본 상태

```jsx
<Button onClick={handleShareWalkingCourse}>
	<Share />이 산책 코스 공유하기
</Button>
```

### 로딩 상태

```jsx
<Button disabled>
	<Loader2 className="animate-spin" />
	공유 중...
</Button>
```

## 📊 데이터 변환

### 경로 샘플링

- 효율성을 위해 10개마다 하나씩 좌표 샘플링
- spots 필드에 세미콜론으로 구분된 좌표 저장

### 지역 정보 추출

- 우선순위: startGuRoad > startAddress > "알 수 없는 지역"
- GPS 핀 데이터에서 실제 주소 정보 사용

### 시간 형식 변환

- 밀리초 → "HH:mm:ss" 형식으로 변환
- 예: 3600000ms → "01:00:00"

## 🔧 설정 가능한 옵션

### API 엔드포인트

```typescript
// postService.ts에서 수정 가능
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9988";
const API_ENDPOINT = `${API_BASE_URL}/post/create`;
```

### 사용자 ID

```typescript
// 현재는 하드코딩, 추후 실제 사용자 세션에서 가져오도록 수정 필요
memberId: 1; // TODO: 실제 사용자 ID
```

## 🐛 에러 처리

### 일반적인 에러 케이스

1. **산책 데이터 없음**: "공유할 산책 데이터가 없습니다."
2. **네트워크 오류**: "공유 중 오류가 발생했습니다. 다시 시도해주세요."
3. **API 오류**: "게시글 생성 실패: [서버 메시지]"

### 디버깅

- 브라우저 개발자 도구 Console에서 상세 로그 확인
- API 요청/응답 데이터 확인 가능

## 🚀 확장 가능성

### 향후 개선 사항

1. **사용자 인증 연동**: 실제 사용자 ID 사용
2. **오프라인 지원**: 네트워크 연결 시 자동 재시도
3. **진행률 표시**: 업로드 진행률 시각화
4. **에러 복구**: 실패한 공유 데이터 임시 저장 후 재시도
