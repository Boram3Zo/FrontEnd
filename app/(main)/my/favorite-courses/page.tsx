"use client";

import { useState } from "react";
import { MapPin, Clock, Heart, ArrowLeft } from "lucide-react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/app/_components/ui/SafeImage";

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
		spots: [{ id: "spot1", name: "공원", image: "/sunny-city-park.png" }],
		favorite: true,
	},
	{
		id: "2",
		title: "북촌 한옥길",
		location: "종로구 계동길",
		duration: "50분",
		distance: "2.2km",
		spots: [{ id: "spot2", name: "한옥", image: "/traditional-house.png" }],
		favorite: true,
	},
];

export default function FavoriteCoursesPage() {
	const router = useRouter();
	const [courses, setCourses] = useState(INITIAL_FAVORITE_COURSES);

	const toggleFavorite = (id: string) => {
		setCourses(courses =>
			courses.map(course => (course.id === id ? { ...course, favorite: !course.favorite } : course))
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
						<Card key={course.id} className="p-4 bg-white shadow-md hover:shadow-lg transition-shadow flex relative">
							{/* Heart button - right top */}
							<div className="absolute top-4 right-4">
								<Button variant="ghost" size="icon" onClick={() => toggleFavorite(course.id)} aria-label="찜하기">
									<Heart
										className={`h-6 w-6 ${course.favorite ? "text-pink-500 fill-pink-500" : "text-gray-400"}`}
										fill={course.favorite ? "#ec4899" : "none"}
									/>
								</Button>
							</div>
							<div className="flex items-start gap-4 flex-1">
								{/* Course image on the left */}
								<div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
									<SafeImage
										src={course.spots[0]?.image}
										alt={course.title}
										width={80}
										height={80}
										className="w-full h-full object-cover"
									/>
								</div>
								{/* Course information - left aligned */}
								<div className="flex-1 flex flex-col justify-center">
									<h3 className="font-bold text-gray-800 text-lg mb-2">{course.title}</h3>
									<div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
										<MapPin className="h-3 w-3" />
										<span>{course.location}</span>
									</div>
									<div className="text-sm text-gray-600 flex items-center gap-4">
										<div className="flex items-center gap-1">
											<Clock className="h-3 w-3" />
											<span>{course.duration}</span>
										</div>
										<span>거리: {course.distance}</span>
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
