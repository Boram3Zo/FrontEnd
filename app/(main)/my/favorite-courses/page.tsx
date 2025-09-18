"use client";

import { useState } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface FavoriteCourseSpot {
	id: string;
	name: string;
	image: string;
}

interface FavoriteCourse {
	id: string;
	title: string;
	location: string;
	duration: string;
	distance: string;
	spots: FavoriteCourseSpot[];
	favorite: boolean;
}

const INITIAL_FAVORITE_COURSES: FavoriteCourse[] = [
	{
		id: "1",
		title: "강남 야경 산책",
		location: "강남구 역삼동",
		duration: "35분",
		distance: "1.8km",
		spots: [
			{ id: "spot1", name: "공원", image: "/sunny-city-park.png" },
		],
		favorite: true,
	},
	{
		id: "2",
		title: "북촌 한옥길",
		location: "종로구 계동길",
		duration: "50분",
		distance: "2.2km",
		spots: [
			{ id: "spot2", name: "한옥", image: "/traditional-house.png" },
		],
		favorite: true,
	},
];

export default function FavoriteCoursesPage() {
	const router = useRouter();
	const [courses, setCourses] = useState(INITIAL_FAVORITE_COURSES);

	const toggleFavorite = (id: string) => {
		setCourses(courses =>
			courses.map(course =>
				course.id === id ? { ...course, favorite: !course.favorite } : course
			)
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white border-b px-4 py-4">
				<div className="flex items-center gap-3">
					<Button variant="ghost" size="sm" onClick={() => router.push("/my")} className="p-2">
						<ArrowLeft className="h-5 w-5" />
					</Button>
					<div>
						<h1 className="text-xl font-bold text-gray-800">찜한 코스</h1>
						<p className="text-sm text-gray-500">{courses.length}개의 코스</p>
					</div>
				</div>
			</div>
			{/* Course List */}
			<div className="px-4 py-6">
				<div className="space-y-4">
					{courses.map(course => (
						<Card key={course.id} className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow flex items-center">
							<div className="flex items-start gap-4 flex-1">
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
							{/* Heart button */}
							<Button
								variant="ghost"
								size="icon"
								onClick={() => toggleFavorite(course.id)}
								aria-label="찜하기"
							>
								<Heart
									className={`h-6 w-6 ${course.favorite ? "text-pink-500 fill-pink-500" : "text-gray-400"}`}
									fill={course.favorite ? "#ec4899" : "none"}
								/>
							</Button>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
