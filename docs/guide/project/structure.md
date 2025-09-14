## 📁 프로젝트 구조

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 루트 레이아웃 (Google Maps API 로드)
│   ├── globals.css              # 전역 스타일 (고양이 애니메이션 포함)
│   ├── favicon.ico              # 파비콘
│   │
│   ├── (main)/                  # 메인 라우트 그룹
│   │   ├── page.tsx            # 홈페이지 (메인 대시보드)
│   │   ├── walk/               # 산책 기능
│   │   │   └── page.tsx       # 산책 시작/추적 페이지
│   │   ├── theme/              # 테마별 코스
│   │   │   ├── page.tsx       # 테마 목록
│   │   │   ├── all/           # 모든 테마 보기
│   │   │   └── [slug]/        # 특정 테마 코스 목록
│   │   ├── region/             # 지역별 코스
│   │   │   ├── page.tsx       # 지역 선택 (한국 지도)
│   │   │   └── courses/       # 지역 내 코스 목록
│   │   ├── course/[id]/        # 코스 상세 정보
│   │   ├── cat-tower/          # 고양이 컬렉션
│   │   ├── share/              # 코스 공유 작성
│   │   ├── map/                # 지도 페이지
│   │   ├── my/                 # 마이페이지
│   │   └── signup/             # 회원가입
│   │
│   ├── _components/             # 재사용 가능한 UI 컴포넌트
│   │   ├── header.tsx          # 상단 헤더 (검색, 네비게이션)
│   │   ├── bottom-navigation.tsx # 하단 탭 네비게이션
│   │   ├── cat-character.tsx   # 고양이 캐릭터 컴포넌트
│   │   ├── walking-tracker.tsx # GPS 산책 추적 핵심 컴포넌트
│   │   ├── walking-summary.tsx # 산책 완료 후 요약
│   │   ├── korean-map.tsx      # 한국 지도 (지역 선택)
│   │   ├── theme-recommendations.tsx # 테마 추천
│   │   ├── cat-collection.tsx  # 고양이 컬렉션 관리
│   │   ├── cat-discovery-modal.tsx # 고양이 발견 모달
│   │   ├── collected-cat.tsx   # 고양이 SVG 렌더링
│   │   ├── cat-stats.tsx       # 고양이 수집 통계
│   │   ├── course-*.tsx        # 코스 관련 컴포넌트들
│   │   ├── region-course-list.tsx # 지역별 코스 목록
│   │   ├── photo/              # 사진 관련 컴포넌트
│   │   │   └── PhotoUploader.tsx # 사진 업로드 컴포넌트
│   │   ├── map/                # 지도 관련 컴포넌트
│   │   │   ├── GoogleMap.tsx   # Google Maps 래퍼
│   │   │   ├── RouteMap.tsx    # 경로 표시 지도
│   │   │   └── ManualGpsControl.tsx # 수동 GPS 컨트롤
│   │   └── ui/                 # 기본 UI 컴포넌트 (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── checkbox.tsx
│   │       └── ...
│   │
│   ├── _hooks/                  # Custom React Hooks
│   │   └── usePhotoManager.ts  # 사진 관리 훅
│   │
│   ├── _lib/                    # 유틸리티 및 데이터
│   │   ├── courses.ts          # 샘플 코스 데이터
│   │   ├── utils.ts            # 유틸리티 함수
│   │   └── walking-storage.ts  # 산책 데이터 저장 로직
│   │
│   └── _types/                  # TypeScript 타입 정의
│
├── public/                      # 정적 파일 (이미지 등)
├── coverage/                    # 테스트 커버리지 리포트
└── .next/                       # Next.js 빌드 결과물
```
