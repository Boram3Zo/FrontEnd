import { Badge } from "@/app/_components/ui/BBadge";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, Route, Star, User, Calendar, Heart, Share } from "lucide-react";

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
}

interface CourseHeaderProps {
	course: Course;
}

const difficultyColors = {
	쉬움: "bg-green-100 text-green-700 border-green-300",
	보통: "bg-yellow-100 text-yellow-700 border-yellow-300",
	어려움: "bg-red-100 text-red-700 border-red-300",
};

export function CourseHeader({ course }: CourseHeaderProps) {
	return (
		<div className="bg-white border-b border-gray-200">
			<div className="px-4 py-6">
				{/* Course title and rating */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex-1">
						<h1 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h1>
						<div className="flex items-center gap-2 mb-3">
							<div className="flex items-center gap-1">
								<Star className="h-4 w-4 fill-orange-400 text-orange-400" />
								<span className="font-medium text-gray-800">{course.rating}</span>
								<span className="text-sm text-gray-500">({course.reviewCount})</span>
							</div>
							<Badge className={difficultyColors[course.difficulty]}>{course.difficulty}</Badge>
						</div>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="icon" className="bg-transparent">
							<Heart className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="icon" className="bg-transparent">
							<Share className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Location and basic info */}
				<div className="space-y-3 mb-4">
					<div className="flex items-center gap-2 text-gray-600">
						<MapPin className="h-4 w-4" />
						<span className="text-sm">{course.location}</span>
					</div>

					<div className="flex items-center gap-6 text-sm text-gray-600">
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							<span>소요시간: {course.duration}</span>
						</div>
						<div className="flex items-center gap-1">
							<Route className="h-4 w-4" />
							<span>거리: {course.distance}</span>
						</div>
					</div>

					<div className="flex items-center gap-4 text-sm text-gray-500">
						<div className="flex items-center gap-1">
							<User className="h-3 w-3" />
							<span>{course.author}</span>
						</div>
						<div className="flex items-center gap-1">
							<Calendar className="h-3 w-3" />
							<span>{course.createdDate}</span>
						</div>
					</div>
				</div>

				{/* Description */}
				<p className="text-gray-600 text-sm leading-relaxed mb-4">{course.description}</p>

				{/* Tags */}
				<div className="flex flex-wrap gap-2">
					{course.tags.map(tag => (
						<Badge key={tag} variant="outline" className="text-xs bg-gray-50">
							#{tag}
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
