"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { MapPin, Clock, Users, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Theme {
	id: string;
	name: string;
	emoji: string;
	description: string;
	color: string;
	courseCount: number;
	popularCourse: {
		title: string;
		location: string;
		duration: string;
		participants: number;
		rating: number;
		image: string;
	};
}

const THEMES: Theme[] = [
	{
		id: "nature",
		name: "자연 힐링",
		emoji: "🌳",
		description: "도심 속 자연을 만나는 힐링 코스",
		color: "from-green-400 to-emerald-500",
		courseCount: 24,
		popularCourse: {
			title: "한강공원 숨은 길",
			location: "마포구 망원동",
			duration: "45분",
			participants: 128,
			rating: 4.8,
			image: "/nature-path.png",
		},
	},
	{
		id: "history",
		name: "역사 탐방",
		emoji: "🏛️",
		description: "서울의 역사와 문화를 느끼는 코스",
		color: "from-amber-400 to-orange-500",
		courseCount: 18,
		popularCourse: {
			title: "북촌 한옥마을 둘러보기",
			location: "종로구 계동길",
			duration: "60분",
			participants: 89,
			rating: 4.9,
			image: "/historic-street.png",
		},
	},
	{
		id: "cafe",
		name: "카페 투어",
		emoji: "☕",
		description: "특별한 카페들을 찾아가는 여행",
		color: "from-orange-400 to-red-500",
		courseCount: 31,
		popularCourse: {
			title: "홍대 숨은 카페 탐방",
			location: "마포구 홍익로",
			duration: "90분",
			participants: 156,
			rating: 4.7,
			image: "/cozy-cafe.png",
		},
	},
];

export function ThemeRecommendations() {
	const [recommendedTheme, setRecommendedTheme] = useState<Theme | null>(null);

	useEffect(() => {
		// Randomly select a theme for recommendation
		const randomTheme = THEMES[Math.floor(Math.random() * THEMES.length)];
		setRecommendedTheme(randomTheme);
	}, []);

	if (!recommendedTheme) {
		return (
			<div className="px-4">
				<div className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
					<div className="h-6 bg-gray-200 rounded mb-4"></div>
					<div className="h-4 bg-gray-200 rounded mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-3/4"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="px-4">
			<div className="mb-6">
				<h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
					<span>✨</span>
					오늘의 추천 테마
				</h3>
				<p className="text-sm text-gray-600">랜덤으로 선택된 특별한 테마를 만나보세요</p>
			</div>

			<Card className="overflow-hidden shadow-xl">
				{/* Theme header with gradient */}
				<div className={`bg-gradient-to-r ${recommendedTheme.color} p-6 text-white`}>
					<div className="flex items-center gap-3 mb-3">
						<span className="text-3xl">{recommendedTheme.emoji}</span>
						<div>
							<h4 className="text-xl font-bold">{recommendedTheme.name}</h4>
							<p className="text-white/90 text-sm">{recommendedTheme.description}</p>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-sm text-white/90">{recommendedTheme.courseCount}개의 코스</span>
						<Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
							<Heart className="h-4 w-4 mr-1" />
							관심 테마
						</Button>
					</div>
				</div>

				{/* Popular course preview */}
				<div className="p-4">
					<h5 className="font-semibold text-gray-800 mb-3">이 테마의 인기 코스</h5>
					<div className="flex gap-3">
						<div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
							<Image
								src={recommendedTheme.popularCourse.image || "/placeholder.svg"}
								alt={recommendedTheme.popularCourse.title}
								width={80}
								height={80}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex-1">
							<h6 className="font-medium text-gray-800 mb-1">{recommendedTheme.popularCourse.title}</h6>
							<div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
								<MapPin className="h-3 w-3" />
								<span>{recommendedTheme.popularCourse.location}</span>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3 text-xs text-gray-600">
									<div className="flex items-center gap-1">
										<Clock className="h-3 w-3" />
										<span>{recommendedTheme.popularCourse.duration}</span>
									</div>
									<div className="flex items-center gap-1">
										<Users className="h-3 w-3" />
										<span>{recommendedTheme.popularCourse.participants}명</span>
									</div>
								</div>
								<span className="text-xs font-medium text-orange-600">⭐ {recommendedTheme.popularCourse.rating}</span>
							</div>
						</div>
					</div>
				</div>

				{/* Action button */}
				<div className="p-4 pt-0">
					<Link href={`/theme/${recommendedTheme.id}`}>
						<Button className="w-full bg-gray-800 hover:bg-gray-900 text-white">
							{recommendedTheme.name} 코스 둘러보기
						</Button>
					</Link>
				</div>
			</Card>
		</div>
	);
}
