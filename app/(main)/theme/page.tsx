"use client";

import { useState } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatCharacter } from "@/app/_components/cat/CatCharacter";
import { ThemeRecommendations } from "@/app/_components/theme/ThemeRecommendations";
import { ThemeSelector } from "@/app/_components/theme/ThemeSelector";
import { ThemeCourseList } from "@/app/_components/theme/ThemeCourseList";
import { Button } from "@/app/_components/ui/Button";
import Link from "next/link";

export default function ThemePage() {
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
			<Header />

			<main className="pb-20">
				{/* Page title with cute cat */}
				<div className="bg-white border-b border-gray-200 px-4 py-4">
					<div className="flex items-center justify-center gap-3">
						<CatCharacter size="sm" animation="bounce" />
						<h1 className="text-lg font-bold text-gray-800">테마별 산책 코스</h1>
						<CatCharacter size="sm" animation="wiggle" />
					</div>
				</div>

				{/* Hero section */}
				<div className="text-center py-8 px-4">
					<div className="flex justify-center mb-4">
						<CatCharacter animation="wiggle" size="lg" />
					</div>
					<h2 className="text-xl font-bold text-gray-800 mb-2">오늘은 어떤 테마로</h2>
					<h2 className="text-xl font-bold text-gray-800 mb-4">산책해볼까요?</h2>
					<p className="text-sm text-gray-600">
						다양한 테마의 산책 코스를 둘러보고
						<br />
						새로운 경험을 만나보세요
					</p>
				</div>

				{/* Theme recommendations */}
				<ThemeRecommendations />

				{/* Theme selector */}
				<div className="mt-8">
					<ThemeSelector
						selectedTheme={selectedTheme}
						onThemeSelect={setSelectedTheme}
					/>
				</div>

				{/* Theme course list */}
				<ThemeCourseList
					selectedTheme={selectedTheme}
					limit={6}
				/>

				{/* View all themes button */}
				<div className="px-4 mt-8">
					<Link href="/theme/all">
						<Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-medium rounded-xl shadow-lg">
							모든 테마 보기 ✨
						</Button>
					</Link>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
