# 인증 가드 시스템 가이드

## 📋 개요

치카쿠 앱의 페이지별 접근 권한을 체계적으로 관리하기 위한 인증 가드 시스템입니다.

## 🛡️ 가드 타입

### 1. `withAuthGuard` - 로그인 필수 페이지

로그인하지 않은 사용자는 `/auth/login`으로 리디렉션됩니다.

```tsx
import { withAuthGuard } from "@/app/_components/auth/AuthGuard";

function MyProtectedPage() {
	// 페이지 컨텐츠
	return <div>로그인한 사용자만 볼 수 있는 페이지</div>;
}

export default withAuthGuard(MyProtectedPage);
```

### 2. `withGuestOnlyGuard` - 게스트 전용 페이지

이미 로그인한 사용자는 메인 페이지(`/`)로 리디렉션됩니다.

```tsx
import { withGuestOnlyGuard } from "@/app/_components/auth/AuthGuard";

function LoginPage() {
	// 페이지 컨텐츠
	return <div>로그인하지 않은 사용자만 볼 수 있는 페이지</div>;
}

export default withGuestOnlyGuard(LoginPage);
```

## 📖 페이지별 접근 권한

### 🔓 Public Pages (누구나 접근 가능)

- `/` - 메인 페이지
- `/search` - 검색
- `/region` - 지역
- `/theme` - 테마
- `/course/[id]` - 코스 상세

### 🔒 Protected Pages (로그인 필요)

- `/walk` - 산책하기 ✅ `withAuthGuard` 적용
- `/my` - 마이페이지 ✅ `withAuthGuard` 적용
- `/cat-tower` - 캣타워 ✅ `withAuthGuard` 적용
- `/share` - 코스 공유 ✅ `withAuthGuard` 적용

### 🚪 Auth-Only Pages (게스트 전용)

- `/auth/login` - 로그인 ✅ `withGuestOnlyGuard` 적용
- `/auth/signup` - 회원가입 ✅ `withGuestOnlyGuard` 적용
- `/auth/forgot-password` - 비밀번호 찾기 ✅ `withGuestOnlyGuard` 적용

## 🔧 구현 세부사항

### 로딩 상태 처리

모든 가드는 인증 상태 확인 중 적절한 로딩 화면을 표시합니다:

```tsx
// 로딩 중 표시되는 UI
<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center">
	<div className="text-center">
		<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
		<p className="text-gray-600">로그인 상태를 확인하고 있습니다...</p>
	</div>
</div>
```

### 디버깅 로그

인증 상태 변화 시 콘솔에 디버깅 로그가 출력됩니다:

- `🔒 인증되지 않은 사용자 - 로그인 페이지로 리다이렉트`
- `🔑 이미 로그인된 사용자 - 메인 페이지로 리다이렉트`

## 🚀 새 페이지 추가 시 가이드

### 1. 접근 권한 결정

- **Public**: 로그인 여부와 관계없이 모든 사용자가 접근
- **Protected**: 로그인한 사용자만 접근
- **Auth-Only**: 로그인하지 않은 사용자만 접근

### 2. 해당 가드 적용

```tsx
// Protected 페이지 예시
import { withAuthGuard } from "@/app/_components/auth/AuthGuard";

function MyNewPage() {
	return <div>새로운 보호된 페이지</div>;
}

export default withAuthGuard(MyNewPage);
```

### 3. 이 문서 업데이트

새 페이지를 해당 카테고리에 추가하고 상태를 표시합니다.

## 🔄 의존성

- **useAuth**: `@/app/_providers/AuthProvider`에서 인증 상태 관리
- **useRouter**: Next.js의 `next/navigation`에서 페이지 리디렉션
- **useEffect**: React에서 인증 상태 변화 감지

## 📝 주의사항

1. **Client Component 필수**: 모든 가드는 `"use client"` 지시어가 필요합니다.
2. **함수 컴포넌트**: HOC 패턴을 위해 함수 컴포넌트로 선언 후 가드로 감싸서 export합니다.
3. **중복 가드 방지**: 이미 가드가 적용된 페이지에는 추가 가드 로직을 중복으로 구현하지 않습니다.

## 🧪 테스트 시나리오

### Protected Pages 테스트

1. 로그아웃 상태에서 보호된 페이지 접근 → 로그인 페이지로 리디렉션 확인
2. 로그인 후 보호된 페이지 정상 접근 확인

### Auth-Only Pages 테스트

1. 로그인 상태에서 로그인/회원가입 페이지 접근 → 메인 페이지로 리디렉션 확인
2. 로그아웃 상태에서 로그인/회원가입 페이지 정상 접근 확인

### 로딩 상태 테스트

1. 인증 상태 확인 중 로딩 화면 표시 확인
2. 네트워크 지연 시 적절한 로딩 처리 확인
