# 사진 공유 시스템

산책 코스와 함께 사진을 업로드하고 공유하는 기능입니다.

## 📸 주요 컴포넌트

### PhotoUploader

**파일**: `app/_components/share/PhotoUploader.tsx`

#### 기능

- 다중 사진 업로드 지원
- 최대 사진 수 제한 및 파일 타입 검증
- 사진 미리보기 기능
- 드래그 앤 드롭 업로드

### PhotoDescriptions

**파일**: `app/_components/share/PhotoDescriptions.tsx`

#### 기능

- 각 사진별 설명 입력
- 실시간 입력 검증
- 사진-설명 매핑 관리

## 🔧 사진 관리 훅

### usePhotoManager

**파일**: `app/_hooks/usePhotoManager.ts`

#### 기능

- 사진 상태 관리
- 업로드 진행 상태 추적
- 사진 메타데이터 처리

#### 주요 메서드

```typescript
const {
	photos, // 업로드된 사진 목록
	isUploading, // 업로드 진행 상태
	addPhotos, // 사진 추가
	removePhoto, // 사진 제거
	updateDescription, // 설명 업데이트
} = usePhotoManager();
```

## 🛠️ 사진 처리 유틸리티

### photoUtils

**파일**: `app/_libs/photoUtils.ts`

#### 기능

- 이미지 압축 및 리사이징
- EXIF 데이터 추출
- 파일 크기 및 형식 검증
- 썸네일 생성

## 📝 사진 타입 정의

**파일**: `app/_types/photoTypes.ts`

```typescript
interface SpotPhoto {
	id: string;
	file: File;
	preview: string;
	description: string;
	title: string;
}
```

## 📊 파일 처리 규칙

### 지원 형식

- JPEG, PNG, WebP
- 최대 파일 크기: 10MB
- 최대 업로드 수: 10장

### 자동 처리

- 이미지 압축 (품질 80%)
- 최대 해상도 제한 (1920x1080)
- EXIF 데이터 기반 위치 정보 추출

## 📝 업데이트 가이드

사진 업로드 기능 수정 시:

1. 파일 크기 제한 변경 → `photoUtils.ts` 설정 수정
2. 새로운 이미지 형식 지원 → 파일 검증 로직 업데이트
3. 업로드 UI 개선 → `PhotoUploader.tsx` 컴포넌트 수정
4. 메타데이터 처리 변경 → `usePhotoManager.ts` 훅 업데이트

## 🧪 테스트

관련 테스트 파일:

- `app/_hooks/usePhotoManager.test.tsx`
- `app/_libs/photoUtils.test.ts`
- `app/_components/share/PhotoUploader.test.tsx`

## 🔗 관련 기능

- **지도 연동**: 사진 위치를 지도에 표시
- **코스 공유**: 사진과 함께 산책 코스 공유
- **리뷰 시스템**: 사진을 포함한 코스 리뷰
