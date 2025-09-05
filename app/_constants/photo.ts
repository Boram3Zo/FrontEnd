/**
 * 사진 관련 상수
 */
export const PHOTO_CONSTANTS = {
	/** 최대 업로드 가능한 사진 수 */
	MAX_PHOTOS: 6,
	/** 사진 설명 최대 길이 */
	MAX_DESCRIPTION_LENGTH: 200,
	/** 사진 설명 경고 임계값 */
	DESCRIPTION_WARNING_THRESHOLD: 180,
	/** 허용되는 파일 타입 */
	ACCEPTED_FILE_TYPES: "image/*",
	/** 기본 그리드 컬럼 수 */
	DEFAULT_GRID_COLUMNS: 3,
} as const;
