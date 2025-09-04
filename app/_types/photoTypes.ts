/**
 * EXIF 데이터 타입
 */
export interface ExifData {
	/** 카메라 제조사 */
	make?: string;
	/** 카메라 모델 */
	model?: string;
	/** 촬영 날짜/시간 */
	dateTime?: string;
	/** 원본 촬영 날짜/시간 */
	dateTimeOriginal?: string;
	/** 위도 */
	latitude?: number;
	/** 경도 */
	longitude?: number;
	/** 이미지 방향 */
	orientation?: number;
	/** 플래시 */
	flash?: string;
	/** 초점 거리 */
	focalLength?: number;
	/** ISO 감도 */
	iso?: number;
	/** 조리개 값 */
	aperture?: number;
	/** 셔터 속도 */
	shutterSpeed?: string;
	/** 이미지 너비 */
	width?: number;
	/** 이미지 높이 */
	height?: number;
	/** 파일 크기 */
	fileSize?: number;
	/** 파일명 */
	fileName?: string;
	/** 렌즈 정보 */
	lens?: string;
	/** 소프트웨어 */
	software?: string;
	/** 기타 모든 EXIF 데이터 */
	[key: string]: unknown;
}

/**
 * 스팟 사진 데이터 타입
 */
export interface SpotPhoto {
	/** 고유 식별자 */
	id: string;
	/** 원본 파일 객체 */
	file: File;
	/** 미리보기 URL (createObjectURL로 생성) */
	preview: string;
	/** 사진 제목 */
	title: string;
	/** 사진 설명 */
	description: string;
	/** EXIF 데이터 (선택사항) */
	exifData?: ExifData;
}

/**
 * 사진 업로더 설정 옵션
 */
export interface PhotoUploaderOptions {
	/** 최대 업로드 가능한 사진 수 (기본값: 6) */
	maxPhotos?: number;
	/** 허용되는 파일 타입 (기본값: "image/*") */
	acceptedFileTypes?: string;
	/** 그리드 컬럼 수 (기본값: 3) */
	gridColumns?: number;
}

/**
 * 사진 관리 훅의 반환 타입
 */
export interface UsePhotoManagerReturn {
	/** 현재 사진 목록 */
	photos: SpotPhoto[];
	/** 사진 추가 핸들러 */
	addPhotos: (files: FileList) => Promise<void>;
	/** 사진 삭제 핸들러 */
	removePhoto: (id: string) => void;
	/** 사진 설명 업데이트 핸들러 */
	updateDescription: (id: string, description: string) => void;
	/** 사진 제목 업데이트 핸들러 */
	updateTitle: (id: string, title: string) => void;
	/** 사진 추가 트리거 함수 */
	triggerFileSelect: () => void;
	/** 파일 입력 ref */
	fileInputRef: React.RefObject<HTMLInputElement | null>;
}
