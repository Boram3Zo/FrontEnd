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
	addPhotos: (files: FileList) => void;
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
