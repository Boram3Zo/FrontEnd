# 📚 치카쿠 프로젝트 문서

이 폴더는 프로젝트의 모든 문서를 체계적으로 관리합니다.

## 📁 문서 구조

```
docs/
├── README.md                    # 문서화 시스템 가이드 (이 파일)
│
├── 📋 프로젝트 문서
├── README.기능상세.md           # 핵심 모듈과 주요 화면 상세 설명
├── README.기술스택.md           # 기술 스택 및 프로젝트 구조
├── README.프로젝트구조.md       # 폴더 구조 및 파일 조직
├── README.패키지.md             # 의존성 패키지 및 설치 가이드
├── README.회원가입.md           # 인증 시스템 구현 상세
├── README.프롬프트.md           # AI 어시스턴트 활용 가이드
├── READMD.API.md               # API 엔드포인트 및 사용법
├── README.TODO.md              # 개발 예정 기능 및 개선사항
│
├── 📝 작업 기록 문서
├── templates/          # 문서 템플릿
│   ├── change.md       # 기능 변경/수정 템플릿
│   ├── refactoring.md  # 리팩토링 작업 템플릿
│   └── feature.md      # 새 기능 추가 템플릿
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

### 🏗️ 프로젝트 구조 및 기술

- [📁 프로젝트 구조](README.프로젝트구조.md) - 폴더 구조 및 파일 조직
- [⚡ 기술 스택](README.기술스택.md) - 사용 기술 및 아키텍처
- [📦 패키지 관리](README.패키지.md) - 의존성 및 설치 가이드

### 🎯 기능 및 개발

- [🚀 기능 상세](README.기능상세.md) - 핵심 모듈 및 화면 가이드
- [👤 회원가입 기능](README.회원가입.md) - 인증 시스템 상세
- [🔌 API 문서](READMD.API.md) - API 엔드포인트 및 사용법

### 🛠️ 개발 도구 및 가이드

- [🤖 프롬프트 가이드](README.프롬프트.md) - AI 어시스턴트 활용법
- [📋 TODO 리스트](README.TODO.md) - 개발 예정 및 개선사항
