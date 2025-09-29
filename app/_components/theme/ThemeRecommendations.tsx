"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import Link from "next/link";
import { THEME_OPTIONS } from "@/app/_constants/themes";

export function ThemeRecommendations() {
	// 클라이언트에서만 랜덤 선택을 수행하여 hydration 에러 방지
	const [recommendedThemes, setRecommendedThemes] = useState(() => THEME_OPTIONS.slice(0, 2));
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		// 클라이언트에서만 랜덤으로 2개 선택
		const shuffled = [...THEME_OPTIONS].sort(() => 0.5 - Math.random());
		setRecommendedThemes(shuffled.slice(0, 2));
	}, []);

	return (
		<div className="px-4">
			<div className="mb-6">
				<h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
					<span>✨</span>
					오늘의 추천 테마
				</h3>
				<p className="text-sm text-gray-600">
					{isClient ? `랜덤으로 선택된 ${recommendedThemes.length}가지 특별한 테마를 만나보세요` : '특별한 테마를 준비 중입니다'}
				</p>
			</div>

			<div className="space-y-4">
				{recommendedThemes.map((theme) => (
					<Card key={theme.label} className="overflow-hidden shadow-xl">
						{/* Theme header */}
						<div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
							<div className="flex items-center gap-3 mb-3">
								<span className="text-3xl">{theme.emoji}</span>
								<div>
									<h4 className="text-xl font-bold">{theme.label}</h4>
									<p className="text-white/90 text-sm">{theme.label} 테마의 다양한 코스를 만나보세요</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm text-white/90">다양한 코스 준비 중</span>
							</div>
						</div>

						{/* Action button */}
						<div className="p-4">
							<Link href={`/theme/${theme.label}`}>
								<Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
									{theme.label} 코스 둘러보기
								</Button>
							</Link>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
