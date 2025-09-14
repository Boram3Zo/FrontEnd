# 고양이 컬렉션 시스템

산책 중 고양이를 발견하고 수집하는 게임 요소입니다.

## 🐱 주요 컴포넌트

### CatCollection

**파일**: `app/_components/cat/CatCollection.tsx`

#### 기능

- 고양이 목록 표시 및 필터링
- 수집된/미수집 고양이 구분 표시
- 등급별 필터링 (일반~전설)

### CollectedCat

**파일**: `app/_components/cat/CollectedCat.tsx`

#### 기능

- SVG 기반 고양이 캐릭터 렌더링
- 고양이별 고유한 시각적 표현
- 수집 상태에 따른 표시 변화

### CatDiscoveryModal

**파일**: `app/_components/cat/CatDiscoveryModal.tsx`

#### 기능

- 고양이 발견 시 모달 표시
- 발견 애니메이션 효과
- 새로 수집된 고양이 정보 표시

## 📊 고양이 시스템

### 등급 시스템

- **일반** (Common): 자주 만날 수 있는 고양이
- **특별** (Rare): 가끔 만날 수 있는 고양이
- **전설** (Legendary): 매우 드문 고양이

### 총 22종의 고양이

각 고양이마다 고유한:

- 이름과 설명
- SVG 디자인
- 발견 확률
- 발견 위치 정보

## 🎲 발견 시스템

### 랜덤 발견 로직

- 산책 중 일정 거리마다 발견 확률 계산
- 위치별 고양이 출현 설정
- 이미 수집된 고양이는 재발견 방지

## 🔗 관련 파일

### 데이터

**파일**: `app/_mocks/cats.ts`

- 고양이 데이터 정의
- 각 고양이의 속성 및 메타데이터

### 타입

**파일**: `app/_types/cat.ts`

- Cat, CatRarity 등 타입 정의

### 서비스

**파일**: `app/_libs/cats.ts`

- 고양이 관련 유틸리티 함수
- 발견 로직, 필터링 함수

## 📝 업데이트 가이드

새로운 고양이 추가 시:

1. `app/_mocks/cats.ts`에 데이터 추가
2. SVG 디자인 파일 생성
3. `CollectedCat.tsx`에 렌더링 로직 추가
4. 이 문서의 고양이 수 업데이트

고양이 발견 로직 수정 시:

1. `app/_libs/cats.ts`의 발견 함수 수정
2. `CatDiscoveryModal.tsx`의 표시 로직 확인
3. 관련 테스트 케이스 업데이트

## 🧪 테스트

관련 테스트 파일:

- `app/_libs/cats.test.ts`
- `app/_components/cat/CatCollection.test.tsx`
