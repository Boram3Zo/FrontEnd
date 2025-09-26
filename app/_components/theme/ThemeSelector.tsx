"use client";

import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { THEME_OPTIONS } from "@/app/_constants/themes";

interface ThemeSelectorProps {
	onThemeSelect?: (themeId: string | null) => void;
	selectedTheme?: string | null;
}

export function ThemeSelector({ onThemeSelect, selectedTheme }: ThemeSelectorProps) {
	const handleThemeClick = (themeLabel: string) => {
		const newSelection = selectedTheme === themeLabel ? null : themeLabel;
		onThemeSelect?.(newSelection);
	};

	return (
		<div className="px-4">
			<div className="mb-4">
				<h3 className="text-lg font-bold text-gray-800 mb-2">테마 선택</h3>
				<p className="text-sm text-gray-600">관심있는 테마를 클릭하면 해당 테마의 코스를 볼 수 있어요</p>
			</div>

			<div className="grid grid-cols-2 gap-3">
				{THEME_OPTIONS.map((theme) => (
					<Card
						key={theme.label}
						className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
							selectedTheme === theme.label
								? 'ring-2 ring-purple-500 bg-purple-50'
								: 'hover:bg-gray-50'
						}`}
						onClick={() => handleThemeClick(theme.label)}
					>
						<div className={`bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-3 text-white mb-3`}>
							<div className="text-center">
								<span className="text-2xl block mb-1">{theme.emoji}</span>
								<span className="text-xs font-medium"></span>
							</div>
						</div>
						<div className="text-center">
							<h4 className={`font-medium text-sm mb-1 ${
								selectedTheme === theme.label ? 'text-purple-700' : 'text-gray-800'
							}`}>
								{theme.label}
							</h4>
							<p className="text-xs text-gray-600">이 테마의 산책 코스</p>
						</div>
					</Card>
				))}
			</div>

			{selectedTheme && (
				<div className="mt-4 text-center">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onThemeSelect?.(null)}
					>
						선택 해제
					</Button>
				</div>
			)}
		</div>
	);
}