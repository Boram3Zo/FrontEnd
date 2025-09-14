# 📚 Documentation System

이 폴더는 프로젝트의 모든 작업 완료 문서를 체계적으로 관리합니다.

## 📁 폴더 구조

```
docs/
├── README.md           # 이 파일
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
