import { ThemeOption } from "@/app/_types/shareTypes";

/**
 * 애플리케이션에서 사용하는 공통 테마 목록
 * ShareThemeSelection과 동일한 테마를 사용하여 일관성을 유지합니다.
 */
export const THEME_OPTIONS: ThemeOption[] = [
	{ emoji: "🐱", label: "고양이" },
	{ emoji: "🌸", label: "벚꽃" },
	{ emoji: "🏠", label: "한옥" },
	{ emoji: "🌊", label: "바다" },
	{ emoji: "🌲", label: "숲길" },
	{ emoji: "🌅", label: "일출" },
];

/**
 * 테마 라벨로 이모지를 찾는 헬퍼 함수
 */
export function getThemeEmoji(label: string): string {
	const theme = THEME_OPTIONS.find(option => option.label === label);
	return theme?.emoji || "🎯";
}

/**
 * 테마 라벨이 유효한지 확인하는 헬퍼 함수
 */
export function isValidTheme(label: string): boolean {
	return THEME_OPTIONS.some(option => option.label === label);
}

/**
 * 테마 라벨 목록을 반환하는 헬퍼 함수
 */
export function getThemeLabels(): string[] {
	return THEME_OPTIONS.map(option => option.label);
}