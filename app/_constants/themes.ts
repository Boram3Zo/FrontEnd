import { ThemeOption } from "@/app/_types/shareTypes";

/**
 * 애플리케이션에서 사용하는 공통 테마 목록
 * ShareThemeSelection과 동일한 테마를 사용하여 일관성을 유지합니다.
 */
export const THEME_OPTIONS: ThemeOption[] = [
	{ 
		emoji: "🐱", 
		label: "고양이",
		color: "#f97316",
		gradient: "from-orange-200 to-amber-200"
	},
	{ 
		emoji: "🌸", 
		label: "벚꽃",
		color: "#ec4899",
		gradient: "from-pink-200 to-rose-200"
	},
	{ 
		emoji: "🏠", 
		label: "한옥",
		color: "#a855f7",
		gradient: "from-purple-200 to-indigo-200"
	},
	{ 
		emoji: "🌊", 
		label: "바다",
		color: "#3b82f6",
		gradient: "from-blue-200 to-cyan-200"
	},
	{ 
		emoji: "🌲", 
		label: "숲길",
		color: "#22c55e",
		gradient: "from-green-200 to-emerald-200"
	},
	{ 
		emoji: "🌅", 
		label: "일출",
		color: "#f59e0b",
		gradient: "from-amber-200 to-orange-200"
	},
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

/**
 * URL slug에서 테마 정보를 찾는 헬퍼 함수
 * slug는 테마 label과 동일하게 처리
 */
export function getThemeBySlug(slug: string): ThemeOption | null {
	return THEME_OPTIONS.find(option => option.label === slug) || null;
}

/**
 * 테마 정보를 확장된 형태로 반환하는 헬퍼 함수
 */
export function getExtendedThemeInfo(slug: string) {
	const theme = getThemeBySlug(slug);
	if (!theme) return null;

	return {
		...theme,
		name: theme.label,
		color: "from-purple-400 to-pink-500", // 기본 그라데이션
		description: `${theme.label} 테마의 다양한 코스를 만나보세요`,
	};
}