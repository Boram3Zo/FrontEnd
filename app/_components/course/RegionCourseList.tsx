"use client";

import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
// import { MapPin, Clock, Users } from "lucide-react"
import { MapPin, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CourseSpot {
	id: string;
	name: string;
	image: string;
}

interface Course {
	id: string;
	title: string;
	location: string;
	duration: string;
	distance: string;
	spots: CourseSpot[];
}

const SAMPLE_COURSES: Course[] = [
	{
		id: "1",
		title: "oo의 산책길",
		location: "강남구 압구정로 14-2",
		duration: "n분",
		distance: "1.2km",
		spots: [
			{
				id: "spot1",
				name: "제목",
				image: "/sunny-city-park.png",
			},
			{
				id: "spot2",
				name: "지도",
				image: "/quiet-city-street.png",
			},
		],
	},
	{
		id: "2",
		title: "북촌 한옥마을 둘러보기",
		location: "종로구 계동길 37",
		duration: "45분",
		distance: "2.1km",
		spots: [
			{
				id: "spot3",
				name: "한옥카페",
				image: "/traditional-house.png",
			},
		],
	},
];

export function RegionCourseList() {
	const router = useRouter();

	const handleViewMoreCourses = () => {
		router.push("/region/courses");
	};

	return (
		<div className="px-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold text-gray-800">이 지역의 산책 코스</h2>
				<span className="text-sm text-gray-500">{SAMPLE_COURSES.length}개 코스</span>
			</div>

			<div className="space-y-4">
				{SAMPLE_COURSES.map(course => (
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
									<div className="text-right">
										<div className="text-sm font-medium text-orange-600 flex items-center gap-1"></div>
									</div>
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

			{/* Load more button */}
			<div className="text-center mt-6">
				<Button variant="outline" className="px-8 bg-transparent" onClick={handleViewMoreCourses}>
					더 많은 코스 보기
				</Button>
			</div>
		</div>
	);
}
