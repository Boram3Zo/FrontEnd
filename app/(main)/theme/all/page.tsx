"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatCharacter } from "@/app/_components/cat/CatCharacter";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { THEME_OPTIONS } from "@/app/_constants/themes";
import { fetchAllThemePostCounts } from "@/app/_libs/themes";
import Link from "next/link";

// ThemeOption을 확장하여 추가 정보 포함
interface ExtendedTheme {
	id: string;
	emoji: string;
	label: string;
	description: string;
	color: string;
	courseCount: number;
	tags: string[];
}

// 실제 DB 데이터를 사용하여 테마 데이터 생성
function createExtendedThemes(postCounts: Record<string, number>): ExtendedTheme[] {
	return THEME_OPTIONS.map((theme, index) => ({
		id: theme.label.toLowerCase().replace(/\s+/g, '-'),
		emoji: theme.emoji,
		label: theme.label,
		description: getThemeDescription(theme.label),
		color: getThemeColor(index),
		courseCount: postCounts[theme.label] || 0, // 실제 DB에서 가져온 포스트 개수
		tags: getThemeTags(theme.label),
	}));
}

function getThemeDescription(label: string): string {
	const descriptions: Record<string, string> = {
		"고양이": "귀여운 고양이들과 함께하는 힐링 산책",
		"벚꽃": "아름다운 벚꽃과 함께하는 봄날 산책",
		"한옥": "전통 한옥의 정취를 느끼는 문화 산책",
		"바다": "시원한 바닷바람과 함께하는 해안 산책",
		"숲길": "푸르른 자연 속에서 즐기는 힐링 산책",
		"일출": "아름다운 일출을 감상하며 하는 새벽 산책"
	};
	return descriptions[label] || `${label} 테마의 특별한 산책 코스`;
}

function getThemeColor(index: number): string {
	const colors = [
		"from-pink-400 to-rose-500",
		"from-pink-400 to-purple-500", 
		"from-amber-400 to-orange-500",
		"from-blue-400 to-cyan-500",
		"from-green-400 to-emerald-500",
		"from-orange-400 to-red-500"
	];
	return colors[index % colors.length];
}

function getThemeTags(label: string): string[] {
	const tagMap: Record<string, string[]> = {
		"고양이": ["고양이", "힐링", "동물"],
		"벚꽃": ["벚꽃", "봄", "꽃구경"],
		"한옥": ["전통", "문화", "역사"],
		"바다": ["바다", "해안", "자연"],
		"숲길": ["숲", "자연", "힐링"],
		"일출": ["일출", "새벽", "경치"]
	};
	return tagMap[label] || [label];
}

export default function AllThemesPage() {
	const [allThemes, setAllThemes] = useState<ExtendedTheme[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadThemeData = async () => {
			setLoading(true);
			setError(null);
			
			try {
				console.log('[AllThemePage] Loading theme post counts...');
				const postCounts = await fetchAllThemePostCounts();
				const themes = createExtendedThemes(postCounts);
				setAllThemes(themes);
				console.log('[AllThemePage] Theme data loaded successfully:', themes);
			} catch (err) {
				console.error('[AllThemePage] Error loading theme data:', err);
				setError('테마 정보를 불러오는데 실패했습니다.');
				// 에러 시 기본값으로 0개 설정
				const defaultThemes = createExtendedThemes({});
				setAllThemes(defaultThemes);
			} finally {
				setLoading(false);
			}
		};

		loadThemeData();
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
				<Header />
				<main className="pb-20 px-4 py-8">
					<div className="text-center">
						<CatCharacter size="lg" animation="bounce" />
						<h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">테마 정보를 불러오는 중...</h3>
						<p className="text-gray-600">잠시만 기다려주세요</p>
					</div>
				</main>
				<BottomNavigation />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
			<Header />

			<main className="pb-20">
				{/* Page title */}
				<div className="bg-white border-b border-gray-200 px-4 py-4">
					<div className="flex items-center justify-center gap-3">
						<CatCharacter size="sm" animation="bounce" />
						<h1 className="text-lg font-bold text-gray-800">모든 테마 둘러보기</h1>
						<CatCharacter size="sm" animation="wiggle" />
					</div>
				</div>

				{/* Stats */}
				<div className="px-4 py-6">
					{error && (
						<div className="text-center mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
							<p className="text-sm text-yellow-700">{error}</p>
						</div>
					)}
					
					<div className="text-center mb-6">
						<h2 className="text-xl font-bold text-gray-800 mb-2">총 {allThemes.length}개의 다양한 테마</h2>
						<p className="text-sm text-gray-600">
							{allThemes.reduce((sum: number, theme: ExtendedTheme) => sum + theme.courseCount, 0)}개의 산책 코스가 기다리고 있어요
						</p>
					</div>

					{/* Theme grid */}
					<div className="grid grid-cols-1 gap-4">
						{allThemes.map((theme: ExtendedTheme) => (
							<Card key={theme.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
								<div className={`bg-gradient-to-r ${theme.color} p-4`}>
									<div className="flex items-center justify-between text-white">
										<div className="flex items-center gap-3">
											<span className="text-2xl">{theme.emoji}</span>
											<div>
												<h3 className="font-bold text-lg">{theme.label}</h3>
												<p className="text-white/90 text-sm">{theme.description}</p>
											</div>
										</div>
										<div className="text-right">
											<div className="text-sm font-medium">{theme.courseCount}개</div>
											<div className="text-xs text-white/80">코스</div>
										</div>
									</div>
								</div>

								<div className="p-4">
									<div className="flex items-center justify-between mb-3">
										<div className="flex items-center gap-2">
											<span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"></span>
											<span className="text-xs text-gray-500">난이도</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-1 mb-4">
										{theme.tags.map((tag: string) => (
											<span key={tag} className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded">
												#{tag}
											</span>
										))}
									</div>

									<Link href={`/theme/${theme.id}`}>
										<Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">코스 둘러보기</Button>
									</Link>
								</div>
							</Card>
						))}
					</div>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
