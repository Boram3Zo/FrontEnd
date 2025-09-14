# 🔄 API-Content-Type-에러-해결

> **작업 유형**: 기능 변경/수정  
> **작업 날짜**: 2025-09-14  
> **담당자**: mjki

## 📋 작업 개요

### 문제 상황

회원가입 시 서버에서 **"Content-Type 'text/plain;charset=UTF-8' is not supported"** 에러가 발생했습니다.

### 요구사항

- API 요청 시 올바른 `Content-Type: application/json` 헤더 전송
- FormData와 JSON 데이터 구분하여 적절한 헤더 설정
- 서버가 예상하는 Content-Type과 일치하도록 수정

## 🔧 변경 사항

### 수정된 파일

- `app/_libs/apiClient.ts`

### 주요 변경 내용

1. **HTTP 요청 헤더 처리 개선**: FormData와 JSON 데이터를 구분하여 적절한 Content-Type 설정
2. **POST/PUT 메서드 헤더 강화**: 명시적으로 `application/json; charset=utf-8` 설정
3. **Accept 헤더 추가**: 모든 요청에 `Accept: application/json` 헤더 추가
4. **디버깅 로그 추가**: 요청 정보를 콘솔에 출력하여 디버깅 지원

### 코드 변경 예시

```typescript
// Before (기존 코드)
static async request<T = ApiResponse>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const config: RequestInit = {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	};
}

// After (수정된 코드)
static async request<T = ApiResponse>(endpoint: string, options: RequestInit = {}): Promise<T> {
	// 기본 헤더 설정
	const defaultHeaders: Record<string, string> = {
		Accept: "application/json",
	};

	// body가 있는 경우 Content-Type 처리
	if (options.body) {
		if (options.body instanceof FormData) {
			// FormData인 경우 브라우저가 자동으로 Content-Type 설정하도록 함
		} else {
			// JSON 데이터인 경우 명시적으로 설정
			defaultHeaders["Content-Type"] = "application/json; charset=utf-8";
		}
	}

	const config: RequestInit = {
		headers: {
			...defaultHeaders,
			...options.headers,
		},
		...options,
	};

	// 디버깅용 로깅
	console.log("🚀 API Request:", {
		url,
		method: config.method || 'GET',
		headers: config.headers,
		body: config.body,
	});
}
```

## ✅ 개선 효과

### 사용자 경험 개선

- **회원가입 성공률 증가**: Content-Type 에러로 인한 회원가입 실패 해결
- **안정적인 API 통신**: 서버와의 올바른 헤더 통신으로 예기치 못한 에러 방지
- **즉시 피드백**: 정확한 에러 메시지 전달로 사용자 혼란 최소화

### 기술적 개선

- **헤더 처리 표준화**: FormData와 JSON을 구분한 올바른 Content-Type 설정
- **디버깅 편의성 향상**: 요청 로그로 API 호출 추적 가능
- **코드 안정성 증가**: 명시적 헤더 설정으로 예상치 못한 브라우저 동작 방지
- **확장성 개선**: Accept 헤더 추가로 향후 다양한 응답 형식 지원 준비

## 🧪 테스트

### 테스트 시나리오

1. **회원가입 기능 테스트**: 정상적인 JSON 데이터로 회원가입 성공
2. **에러 처리 테스트**: 중복 이메일 등 서버 에러 상황에서 올바른 메시지 표시
3. **헤더 검증 테스트**: 브라우저 개발자 도구에서 올바른 Content-Type 전송 확인

### 확인 사항

- [x] 회원가입 시 Content-Type 에러가 발생하지 않는가?
- [x] 기존 API 호출 기능에 영향이 없는가?
- [x] 디버깅 로그가 올바르게 출력되는가?
- [x] FormData 사용 시에도 올바르게 처리되는가?

### 테스트 실행 결과

```bash
$ node scripts/run-signup-test.mjs

🧪 간단한 회원가입 테스트 시작
1️⃣ 유효성 검사 테스트 - ✅ PASS
2️⃣ API 호출 테스트 - ✅ PASS
3️⃣ 회원가입 플로우 테스트 - ✅ PASS
🎉 모든 테스트 완료!
```

## 📖 사용법

### 변경된 ApiClient 사용 방법

기존 사용법과 동일하지만, 이제 자동으로 올바른 헤더가 설정됩니다:

```typescript
// JSON 데이터 전송 (자동으로 Content-Type: application/json 설정)
await ApiClient.post("/signup", {
	name: "홍길동",
	email: "test@example.com",
	password: "password123",
});

// FormData 전송 (브라우저가 자동으로 multipart/form-data 설정)
const formData = new FormData();
formData.append("file", file);
await ApiClient.post("/upload", formData);
```

### 디버깅 로그 확인

브라우저 콘솔에서 다음과 같은 디버깅 정보를 확인할 수 있습니다:

```javascript
🚀 API Request: {
  url: "http://localhost:9988/signup",
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json; charset=utf-8"
  },
  body: '{"name":"홍길동","email":"test@example.com","password":"password123"}'
}
```

## 🔗 관련 링크

- 회원가입 기능 문서: `docs/components/auth/signup.md`
- API 클라이언트 코드: `app/_libs/apiClient.ts`
- 회원가입 테스트: `scripts/run-signup-test.mjs`

## 📝 비고

- **주의사항**: 디버깅 로그는 개발 환경에서만 사용하고, 프로덕션에서는 제거 고려
- **향후 개선**: 환경에 따라 로깅 레벨 조정 기능 추가 예정
- **브라우저 호환성**: 모든 모던 브라우저에서 fetch API와 헤더 처리 지원
