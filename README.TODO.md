# 치카쿠 프로젝트 TODO 체크리스트

## 🚨 긴급 수정 필요 (Critical Issues)

### TypeScript 컴파일 에러

- [ ] **SpotPhoto 타입 에러 수정** - `title` 속성 누락 문제
  - `app/_components/share/SharePhotoDescriptions.test.tsx` (2건)
  - `app/_libs/photoUtils.test.ts` (3건)
- [ ] **WalkingSession 타입 에러 수정** - `pins` 속성 누락 문제
  - `app/_libs/walkingStorage.test.ts` (2건)
- [ ] **PhotoUploader export 에러 수정**
  - `app/__tests__/integration/photo-upload-workflow.test.tsx` (1건)

## 🧪 테스트 수정 필요 (Test Fixes)

### 빈 테스트 파일 수정

- [ ] `app/_hooks/useSignupForm.test.ts` - 테스트 코드 작성
- [ ] `app/_utils/validation.test.ts` - 테스트 코드 작성
- [ ] `app/_libs/authService.test.ts` - 테스트 코드 작성

### 테스트 로직 수정

- [ ] **고양이 데이터 테스트 수정** (`app/_libs/cats.test.ts`)

  - 일반 등급: 8마리 → 7마리로 예상 변경
  - 희귀 등급: 6마리 → 7마리로 예상 변경
  - 에픽 등급: 4마리 → 5마리로 예상 변경
  - 전설 등급: 3마리 → 2마리로 예상 변경
  - 발견된 고양이: 13마리 → 11마리로 예상 변경
  - 미발견 고양이: 9마리 → 11마리로 예상 변경

- [ ] **Photo 관련 테스트 수정**
  - `app/_components/share/SharePhotoGrid.test.tsx` - alt 텍스트 불일치
  - `app/_hooks/usePhotoManager.test.tsx` - Blob 인스턴스 에러
  - `app/_libs/photoUtils.test.ts` - Blob 인스턴스 에러
  - `app/_components/share/SharePhotoUploader.test.tsx` - CSS 클래스 찾기 실패

## 🔧 코드 개선 사항

### 새로 생성한 로그인 기능

- [x] LoginForm 컴포넌트 생성
- [x] useLoginForm 훅 생성
- [x] login 페이지 리팩터링
- [ ] **useLoginForm 테스트 코드 완성**

### Copilot 최적화

- [x] `.copilotrc.md` 파일 생성
- [x] VS Code workspace 설정
- [ ] **불필요한 파일 정리**
  - `app/_constants/copilot-context.ts` 삭제 고려

## 🎨 UI/UX 개선 사항

- [ ] **반응형 디자인 테스트**

  - 모바일 환경에서 로그인/회원가입 폼 테스트
  - 터치 이벤트 동작 확인

- [ ] **접근성 개선**
  - 스크린 리더 호환성 테스트
  - 키보드 네비게이션 개선

## 🏗️ 아키텍처 개선

- [ ] **API 에러 처리 통합**

  - 공통 에러 처리 훅 또는 컨텍스트 생성
  - 일관된 에러 메시지 표시

- [ ] **로딩 상태 관리 통합**
  - 전역 로딩 상태 관리
  - 스켈레톤 UI 추가

## 📝 문서화

- [x] README 파일들 정리 완료
- [ ] **API 문서화**
  - AuthService 메서드 문서화
  - 에러 코드 정의서 작성

## 🚀 배포 준비

- [ ] **환경 변수 설정**

  - 프로덕션 환경 설정 확인
  - API 엔드포인트 환경별 분리

- [ ] **성능 최적화**
  - 이미지 최적화 구현
  - 코드 스플리팅 적용
  - Bundle 사이즈 분석

## 📱 기능 추가 계획

- [ ] **소셜 로그인 추가**

  - Google OAuth 연동
  - Apple Sign In 연동

- [ ] **비밀번호 재설정 기능 구현**
  - 이메일 인증 시스템
  - 새 비밀번호 설정 플로우

---

## 🎯 우선순위 추천

1. **🚨 긴급**: TypeScript 에러 수정 (빌드 실패 방지)
2. **🧪 중요**: 실패하는 테스트 수정 (CI/CD 안정화)
3. **🔧 보통**: 코드 개선 및 최적화
4. **🎨 낮음**: UI/UX 개선 사항
