import { Header } from "@/app/_components/layout/header";
import { BottomNavigation } from "@/app/_components/layout/bottom-navigation";
import { CatCharacter } from "@/app/_components/cat/cat-character";
import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";

interface Theme {
	id: string;
	name: string;
	emoji: string;
	description: string;
	color: string;
	courseCount: number;
	difficulty: "쉬움" | "보통" | "어려움";
	tags: string[];
}

const ALL_THEMES: Theme[] = [
	{
		id: "nature",
		name: "자연 힐링",
		emoji: "🌳",
		description: "도심 속 자연을 만나는 힐링 코스",
		color: "from-green-400 to-emerald-500",
		courseCount: 24,
		difficulty: "쉬움",
		tags: ["공원", "강변", "숲길"],
	},
	{
		id: "history",
		name: "역사 탐방",
		emoji: "🏛️",
		description: "서울의 역사와 문화를 느끼는 코스",
		color: "from-amber-400 to-orange-500",
		courseCount: 18,
		difficulty: "보통",
		tags: ["한옥", "궁궐", "문화재"],
	},
	{
		id: "cafe",
		name: "카페 투어",
		emoji: "☕",
		description: "특별한 카페들을 찾아가는 여행",
		color: "from-orange-400 to-red-500",
		courseCount: 31,
		difficulty: "쉬움",
		tags: ["카페", "디저트", "브런치"],
	},
	{
		id: "night",
		name: "야경 명소",
		emoji: "🌙",
		description: "밤에만 볼 수 있는 아름다운 풍경",
		color: "from-indigo-400 to-purple-500",
		courseCount: 15,
		difficulty: "보통",
		tags: ["야경", "조명", "데이트"],
	},
	{
		id: "market",
		name: "전통 시장",
		emoji: "🏪",
		description: "정겨운 전통 시장의 맛과 멋",
		color: "from-red-400 to-pink-500",
		courseCount: 12,
		difficulty: "쉬움",
		tags: ["시장", "먹거리", "전통"],
	},
	{
		id: "art",
		name: "예술 거리",
		emoji: "🎨",
		description: "예술과 문화가 살아있는 거리",
		color: "from-purple-400 to-pink-500",
		courseCount: 20,
		difficulty: "보통",
		tags: ["갤러리", "벽화", "공연"],
	},
	{
		id: "riverside",
		name: "강변 산책",
		emoji: "🌊",
		description: "시원한 강바람과 함께하는 산책",
		color: "from-blue-400 to-cyan-500",
		courseCount: 16,
		difficulty: "쉬움",
		tags: ["한강", "강변", "자전거"],
	},
	{
		id: "shopping",
		name: "쇼핑 거리",
		emoji: "🛍️",
		description: "쇼핑과 구경이 함께하는 코스",
		color: "from-pink-400 to-rose-500",
		courseCount: 22,
		difficulty: "보통",
		tags: ["쇼핑", "패션", "트렌드"],
	},
];

export default function AllThemesPage() {
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
					<div className="text-center mb-6">
						<h2 className="text-xl font-bold text-gray-800 mb-2">총 {ALL_THEMES.length}개의 다양한 테마</h2>
						<p className="text-sm text-gray-600">
							{ALL_THEMES.reduce((sum, theme) => sum + theme.courseCount, 0)}개의 산책 코스가 기다리고 있어요
						</p>
					</div>

					{/* Theme grid */}
					<div className="grid grid-cols-1 gap-4">
						{ALL_THEMES.map(theme => (
							<Card key={theme.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
								<div className={`bg-gradient-to-r ${theme.color} p-4`}>
									<div className="flex items-center justify-between text-white">
										<div className="flex items-center gap-3">
											<span className="text-2xl">{theme.emoji}</span>
											<div>
												<h3 className="font-bold text-lg">{theme.name}</h3>
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
											<span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
												{theme.difficulty}
											</span>
											<span className="text-xs text-gray-500">난이도</span>
										</div>
									</div>

									<div className="flex flex-wrap gap-1 mb-4">
										{theme.tags.map(tag => (
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
