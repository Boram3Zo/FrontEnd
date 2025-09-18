"use client";

import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface MyCourseSpot {
	id: string;
	name: string;
	image: string;
}

interface MyCourse {
	id: string;
	title: string;
	location: string;
	duration: string;
	distance: string;
	spots: MyCourseSpot[];
}

const MY_COURSES: MyCourse[] = [
	{
		id: "1",
		title: "내가 만든 강남 산책길",
		location: "강남구 테헤란로 123",
		duration: "40분",
		distance: "2.0km",
		spots: [
			{
				id: "spot1",
				name: "공원 입구",
				image: "/sunny-city-park.png",
			},
			{
				id: "spot2",
				name: "강남거리",
				image: "/quiet-city-street.png",
			},
		],
	},
	{
		id: "2",
		title: "내 한강 코스",
		location: "영등포구 여의도동",
		duration: "55분",
		distance: "3.1km",
		spots: [
			{
				id: "spot3",
				name: "한강공원",
				image: "/sunny-city-park.png",
			},
		],
	},
];

export default function MyCoursesPage() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b px-4 py-4">
				<div className="flex items-center gap-3">
					<Button variant="ghost" size="sm" onClick={() => router.push("/my")} className="p-2">
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<div>
						<h1 className="text-xl font-bold text-gray-800">내 코스</h1>
						<p className="text-sm text-gray-500">{MY_COURSES.length}개의 코스</p>
					</div>
				</div>
			</div>
			{/* Course List */}
			<div className="px-4 py-6">
				<div className="space-y-4">
					{MY_COURSES.map(course => (
						<Card key={course.id} className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow">
							<div className="flex items-start gap-4">
								{/* Course image on the left */}
								<div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
									{course.spots[0]?.image ? (
										<Image
											src={course.spots[0].image || "/placeholder.svg"}
											alt={course.title}
											width={80}
											height={80}
											className="w-full h-full object-cover"
										/>
									) : (
										<div className="w-full h-full bg-gray-300 flex items-center justify-center">
											<MapPin className="h-8 w-8 text-gray-500" />
										</div>
									)}
								</div>
								{/* Course information on the right */}
								<div className="flex-1">
									<div className="flex items-start justify-between mb-2">
										<h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
									</div>
									<div className="text-sm text-gray-600 mb-2">
										<div className="flex items-center gap-1 mb-1">
											<MapPin className="h-3 w-3" />
											<span>{course.location}</span>
										</div>
										<div className="flex items-center gap-4">
											<div className="flex items-center gap-1">
												<Clock className="h-3 w-3" />
												<span>{course.duration}</span>
											</div>
											<span>거리: {course.distance}</span>
										</div>
									</div>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
