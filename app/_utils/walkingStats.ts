/**
 * 산책 통계와 관련된 유틸리티 함수들
 */

/**
 * 시간을 사람이 읽기 쉬운 형태로 포맷팅
 * @param milliseconds - 밀리초 단위의 시간
 * @returns 포맷된 시간 문자열 (예: "1:23:45", "23:45")
 */
export function formatElapsedTime(milliseconds: number): string {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * 거리를 사람이 읽기 쉬운 형태로 포맷팅
 * @param meters - 미터 단위의 거리
 * @returns 포맷된 거리 문자열 (예: "1.23 km", "850 m")
 */
export function formatDistance(meters: number): string {
	if (meters >= 1000) {
		return `${(meters / 1000).toFixed(2)} km`;
	}
	return `${Math.round(meters)} m`;
}

/**
 * 평균 페이스를 계산하고 포맷팅
 * @param milliseconds - 경과 시간 (밀리초)
 * @param meters - 거리 (미터)
 * @returns 페이스 문자열 (예: "5'30"/km", "- '/km")
 */
export function calculatePace(milliseconds: number, meters: number): string {
	if (meters === 0 || milliseconds === 0) {
		return "- '/km";
	}

	const totalMinutes = milliseconds / 60000; // 밀리초를 분으로 변환
	const kilometers = meters / 1000; // 미터를 킬로미터로 변환
	const paceMinutesPerKm = totalMinutes / kilometers;

	const minutes = Math.floor(paceMinutesPerKm);
	const seconds = Math.round((paceMinutesPerKm - minutes) * 60);

	return `${minutes}'${seconds.toString().padStart(2, "0")}"/km`;
}

/**
 * 칼로리를 추정 계산 (간단한 공식 사용)
 * @param meters - 거리 (미터)
 * @param weightKg - 체중 (kg), 기본값 70kg
 * @returns 추정 칼로리
 */
export function estimateCalories(meters: number, weightKg: number = 70): number {
	// 간단한 칼로리 계산 공식: 체중 × 거리(km) × 0.5
	const kilometers = meters / 1000;
	return Math.round(weightKg * kilometers * 0.5);
}

/**
 * 속도를 계산하고 포맷팅
 * @param meters - 거리 (미터)
 * @param milliseconds - 시간 (밀리초)
 * @returns 속도 문자열 (예: "4.5 km/h")
 */
export function calculateSpeed(meters: number, milliseconds: number): string {
	if (milliseconds === 0) {
		return "0.0 km/h";
	}

	const hours = milliseconds / 3600000; // 밀리초를 시간으로 변환
	const kilometers = meters / 1000; // 미터를 킬로미터로 변환
	const speedKmh = kilometers / hours;

	return `${speedKmh.toFixed(1)} km/h`;
}
