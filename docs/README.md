# 📚 치카쿠 프로젝트 문서

이 폴더는 프로젝트의 모든 문서를 체계적으로 관리합니다.

## 📁 새로운 문서 구조

```
docs/
├── README.md                    # 문서화 시스템 가이드 (이 파일)
│
├── � guide/                    # 프로젝트 가이드
│   ├── project/                 # 프로젝트 전반
│   │   ├── tech-stack.md        # 기술 스택 및 아키텍처
│   │   ├── structure.md         # 프로젝트 구조
│   │   └── packages.md          # 패키지 및 의존성
│   └── development/             # 개발 가이드
│       ├── prompt-guide.md      # AI 어시스턴트 활용
│       └── roadmap.md           # 개발 로드맵 및 TODO
│
├── 🧩 components/               # 컴포넌트별 문서
│   ├── auth/                    # 인증 관련
│   │   └── signup.md            # 회원가입 시스템
│   ├── walk/                    # 산책 기능
│   │   └── tracking.md          # 산책 추적 시스템
│   ├── cat/                     # 고양이 컬렉션
│   │   └── collection.md        # 고양이 수집 시스템
│   ├── share/                   # 공유 기능
│   │   └── photo-upload.md      # 사진 업로드 시스템
│   └── main/                    # 메인 화면
│       └── homepage.md          # 홈페이지 컴포넌트
│
├── 📄 pages/                    # 페이지별 문서 (향후 확장)
├── 🔌 api/                      # API 문서
│   └── endpoints.md             # API 엔드포인트
│
├── 📝 작업 기록 문서
├── templates/          # 문서 템플릿
├── changes/           # 기능 변경/수정 문서
├── refactoring/       # 리팩토링 문서
└── features/          # 새 기능 문서
```

## 📝 문서 작성 규칙

### 파일명 규칙

- 날짜 + 작업 내용으로 명명: `YYYY-MM-DD-작업내용.md`
- 예: `2025-09-14-회원가입-메인화면-이동.md`

### 문서 종류별 분류

- **changes/**: 기존 기능의 변경 및 버그 수정
- **refactoring/**: 코드 구조 개선 및 최적화
- **features/**: 완전히 새로운 기능 추가

## 🚀 자동화 도구

### 문서 생성 스크립트

```bash
# 새 문서 생성
npm run docs:create [type] [title]

# 예시
npm run docs:create change "회원가입-메인화면-이동"
npm run docs:create refactoring "API-에러처리-공통화"
npm run docs:create feature "사진-업로드-기능"
```

### GitHub Copilot 통합

`.copilotrc.md`에 문서화 프로세스가 포함되어 있어 작업 완료 시 자동으로 문서 생성을 안내받을 수 있습니다.

## 📊 문서 품질 관리

- 모든 문서는 템플릿을 기반으로 작성
- 변경사항, 개선점, 사용법 등을 명확히 기술
- 코드 예시와 스크린샷 포함 권장
- 관련 이슈나 PR 링크 첨부

## 📖 프로젝트 문서 목록

### 🏗️ 프로젝트 가이드

- [⚡ 기술 스택](guide/project/tech-stack.md) - 사용 기술 및 아키텍처
- [📁 프로젝트 구조](guide/project/structure.md) - 폴더 구조 및 파일 조직
- [📦 패키지 관리](guide/project/packages.md) - 의존성 및 설치 가이드

### 🛠️ 개발 가이드

- [🤖 프롬프트 가이드](guide/development/prompt-guide.md) - AI 어시스턴트 활용법
- [� 개발 로드맵](guide/development/roadmap.md) - 개발 예정 및 개선사항

### 🧩 컴포넌트 문서

- [👤 회원가입 시스템](components/auth/signup.md) - 인증 및 회원가입 기능
- [🚶‍♂️ 산책 추적](components/walk/tracking.md) - GPS 기반 산책 추적 시스템
- [🐱 고양이 컬렉션](components/cat/collection.md) - 고양이 수집 게임 시스템
- [� 사진 업로드](components/share/photo-upload.md) - 사진 공유 시스템
- [🏠 홈페이지](components/main/homepage.md) - 메인 화면 컴포넌트

### 🔌 API 문서

- [📡 API 엔드포인트](api/endpoints.md) - REST API 사용법

### 📝 작업 기록

- [� 변경 기록](changes/) - 기능 변경 및 수정 내역
- [⚙️ 리팩토링](refactoring/) - 코드 구조 개선 내역
- [✨ 새 기능](features/) - 신규 기능 개발 내역
