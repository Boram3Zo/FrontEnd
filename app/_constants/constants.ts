/**
 * 애플리케이션 전역 상수 정의
 */

// 사진 관련 상수
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

// UI 관련 상수
export const UI_CONSTANTS = {
	/** 기본 애니메이션 지속 시간 (ms) */
	DEFAULT_ANIMATION_DURATION: 300,
	/** 디바운스 지연 시간 (ms) */
	DEFAULT_DEBOUNCE_DELAY: 300,
} as const;

// 지도 관련 상수
export const MAP_CONSTANTS = {
	/** 기본 줌 레벨 */
	DEFAULT_ZOOM: 15,
	/** 최대 줌 레벨 */
	MAX_ZOOM: 20,
	/** 최소 줌 레벨 */
	MIN_ZOOM: 1,
} as const;
