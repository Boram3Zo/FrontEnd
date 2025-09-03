// app/course/[id]/page.tsx
// "use client"

import { Header } from "@/app/_components/header";
import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Heart, Share2, Clock, Route, MapPin } from "lucide-react";

interface CourseSpot {
	id: string;
	name: string;
	description: string;
	image: string;
	comment: string;
	coordinates: { lat: number; lng: number };
	order: number;
}

interface Course {
	id: string;
	title: string;
	description: string;
	location: string;
	duration: string;
	distance: string;
	difficulty: "쉬움" | "보통" | "어려움";
	rating: number;
	reviewCount: number;
	author: string;
	createdDate: string;
	tags: string[];
	spots: CourseSpot[];
	route: { lat: number; lng: number }[];
}

// Sample course data - in a real app this would come from an API
const COURSE_DATA: Record<string, Course> = {
	"1": {
		id: "1",
		title: "제목",
		description: "한강공원의 숨겨진 산책로를 따라 걷는 힐링 코스입니다. 도심 속에서 자연을 만끽할 수 있어요.",
		location: "서울 강남구",
		duration: "n분",
		distance: "1.2km",
		difficulty: "쉬움",
		rating: 4.8,
		reviewCount: 128,
		author: "자연러버",
		createdDate: "2024.01.15",
		tags: ["바닷길", "숲도"],
		spots: [
			{
				id: "spot1",
				name: "시작점",
				description: "한강공원 입구",
				image: "/park-entrance.png",
				comment: "넓은 잔디밭이 펼쳐진 아름다운 시작점이에요",
				coordinates: { lat: 37.5219, lng: 127.0411 },
				order: 1,
			},
			{
				id: "spot2",
				name: "벚꽃길",
				description: "봄철 벚꽃이 아름다운 길",
				image: "/cherry-blossom-path.png",
				comment: "봄에는 벚꽃이 만개해서 정말 예뻐요!",
				coordinates: { lat: 37.5225, lng: 127.0425 },
				order: 2,
			},
			{
				id: "spot3",
				name: "전망대",
				description: "한강을 내려다보는 전망대",
				image: "/river-viewpoint.png",
				comment: "한강의 전경을 한눈에 볼 수 있는 최고의 포토존",
				coordinates: { lat: 37.5235, lng: 127.0445 },
				order: 3,
			},
			{
				id: "spot4",
				name: "도착점",
				description: "코스의 마지막 지점",
				image: "/park-exit.png",
				comment: "달달한 약수 맛집_최고의 약수터!",
				coordinates: { lat: 37.5245, lng: 127.0465 },
				order: 4,
			},
		],
		route: [
			{ lat: 37.5219, lng: 127.0411 },
			{ lat: 37.5225, lng: 127.0425 },
			{ lat: 37.5235, lng: 127.0445 },
			{ lat: 37.5245, lng: 127.0465 },
		],
	},
	"2": {
		id: "2",
		title: "북촌 골목길 탐방",
		description: "전통 한옥이 아름다운 북촌의 골목길을 탐방하는 코스입니다.",
		location: "서울 종로구",
		duration: "20분",
		distance: "0.8km",
		difficulty: "보통",
		rating: 4.6,
		reviewCount: 89,
		author: "한옥러버",
		createdDate: "2024.01.10",
		tags: ["한옥", "전통", "골목길"],
		spots: [],
		route: [],
	},
};

type PageParams = Promise<{ id: string }>;

export default async function CourseDetailPage({ params }: { params: PageParams }) {
	const { id } = await params;
	const course = COURSE_DATA[id];

	if (!course) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header />
				<main className="pb-20 px-4 py-8">
					<div className="text-center">
						<h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">코스를 찾을 수 없어요</h2>
						<p className="text-gray-600 mb-6">다른 코스를 둘러보시겠어요?</p>
					</div>
				</main>
				<BottomNavigation />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="pb-20">
				{/* Course Title and Location */}
				<div className="bg-white px-4 py-4">
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
						<div className="flex items-center gap-2">
							<Button variant="ghost" size="icon">
								<Heart className="h-5 w-5 text-gray-600" />
							</Button>
							<Button variant="ghost" size="icon">
								<Share2 className="h-5 w-5 text-gray-600" />
							</Button>
						</div>
					</div>

					<div className="flex items-center gap-1 mb-3">
						<MapPin className="h-4 w-4 text-gray-500" />
						<span className="text-sm text-gray-600">지역: {course.location}</span>
					</div>

					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-gray-500" />
							<span className="text-sm font-medium">소요시간: {course.duration}</span>
						</div>
						<div className="flex items-center gap-2">
							<Route className="h-4 w-4 text-gray-500" />
							<span className="text-sm font-medium">거리: {course.distance}</span>
						</div>
					</div>
				</div>

				{/* Map and Route Visualization */}
				<div className="px-4 py-4">
					<Card className="border border-gray-300 overflow-hidden">
						{/* Title Section */}
						<div className="bg-gray-200 p-3 text-center">
							<h3 className="font-semibold text-gray-800">제목</h3>
						</div>

						{/* Map Section */}
						<div className="bg-gray-100 h-32 flex items-center justify-center">
							<span className="text-gray-500">지도</span>
						</div>

						{/* Photo Section */}
						<div className="bg-gray-200 h-48 flex items-center justify-center">
							<span className="text-gray-500">사진 (텍스트집부)</span>
						</div>
					</Card>
				</div>

				{/* Review and Description */}
				<div className="px-4 py-4">
					<Card className="p-4 border border-gray-300">
						<p className="text-sm text-gray-700 leading-relaxed mb-4">
							여기 와보니까 진짜 rlaehWL 했다리
							<br />
							커플끼리 오면 너무 좋을 것 같아요
							<br />
							저희 수업다시이니 AD 님이 나쁘지않다고
							<br />
							했어요 지는 여기서 커플이 많이 생길 것
							<br />
							같아요!
						</p>

						<div className="flex flex-wrap gap-2">
							{course.tags.map((tag, index) => (
								<span key={index} className="text-sm text-blue-600">
									#{tag}
								</span>
							))}
						</div>
					</Card>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
