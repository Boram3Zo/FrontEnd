import { Button } from "@/app/_components/ui/CButton";
import { ThemeOption } from "@/app/_types/shareTypes";

interface ShareThemeSelectionProps {
	selectedTheme: string | null;
	onThemeSelect: (theme: string) => void;
}

const themeEmojis: ThemeOption[] = [
	{ emoji: "🐱", label: "고양이" },
	{ emoji: "🌸", label: "벚꽃" },
	{ emoji: "🏠", label: "한옥" },
	{ emoji: "🌊", label: "바다" },
	{ emoji: "🌲", label: "숲길" },
	{ emoji: "🌅", label: "일출" },
];

export function ShareThemeSelection({ selectedTheme, onThemeSelect }: ShareThemeSelectionProps) {
	return (
		<div className="px-4 py-4">
			<h3 className="text-base font-semibold text-gray-800 mb-3">테마 선택</h3>
			<div className="flex flex-wrap gap-2 mb-4">
				{themeEmojis.map((theme, index) => (
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
