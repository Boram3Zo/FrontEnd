/**
 * 산책 관련 상수
 */
export const WALKING_CONSTANTS = {
	/** 고양이 발견 확률 임계값 (0.8 = 20% 확률) */
	CAT_DISCOVERY_THRESHOLD: 0.1,
	/** 고양이 발견 체크 간격 (ms) */
	CAT_CHECK_INTERVAL_MS: 30000,
	/** 세션 자동 저장 간격 (ms) - 30초마다 */
	SESSION_AUTO_SAVE_INTERVAL_MS: 30000,
} as const;
