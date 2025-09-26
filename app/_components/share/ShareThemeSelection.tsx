import { Button } from "@/app/_components/ui/Button";
import { THEME_OPTIONS } from "@/app/_constants/themes";

interface ShareThemeSelectionProps {
	selectedTheme: string | null;
	onThemeSelect: (theme: string) => void;
}

/**
 * 산책 코스 테마를 선택하는 컴포넌트
 * @param selectedTheme - 현재 선택된 테마
 * @param onThemeSelect - 테마 선택 핸들러
 */
export function ShareThemeSelection({ selectedTheme, onThemeSelect }: ShareThemeSelectionProps) {
	return (
		<div className="px-4 py-4">
			<h3 className="text-base font-semibold text-gray-800 mb-3">테마 선택</h3>
			<div className="flex flex-wrap gap-2 mb-4">
				{THEME_OPTIONS.map((theme, index) => (
					<Button
						key={index}
						variant={selectedTheme === theme.label ? "default" : "outline"}
						size="sm"
						className={`flex items-center gap-1 ${
							selectedTheme === theme.label ? "bg-orange-500 text-white" : "bg-transparent"
						}`}
						onClick={() => onThemeSelect(theme.label)}
					>
						<span>{theme.emoji}</span>
						<span>{theme.label}</span>
					</Button>
				))}
			</div>
		</div>
	);
}
