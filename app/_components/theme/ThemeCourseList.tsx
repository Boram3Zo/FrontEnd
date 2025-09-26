"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, Loader2, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { fetchCoursesByTheme } from "@/app/_libs/themes";
import { type PopularCourse } from "@/app/_libs/postService";

interface ThemeCourseListProps {
	selectedTheme?: string | null;
	limit?: number;
}

export function ThemeCourseList({ selectedTheme, limit = 6 }: ThemeCourseListProps) {
	const router = useRouter();
	const [courses, setCourses] = useState<PopularCourse[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadCourses = async () => {
			if (!selectedTheme) {
				setCourses([]);
				return;
			}

			try {
				setLoading(true);
				setError(null);
				const themeCourses = await fetchCoursesByTheme(selectedTheme, limit);
				setCourses(themeCourses);
			} catch (err) {
				console.error('Failed to fetch theme courses:', err);
				setError('코스를 불러오는데 실패했습니다.');
			} finally {
				setLoading(false);
			}
		};

		loadCourses();
	}, [selectedTheme, limit]);

	const handleCourseClick = (course: PopularCourse) => {
		router.push(`/course/${course.id}`);
	};

	if (!selectedTheme) {
		return (
			<div className="px-4 mt-6">
				<Card className="p-8 text-center">
					<div className="text-4xl mb-4">🎯</div>
					<h3 className="text-lg font-bold text-gray-800 mb-2">테마를 선택해보세요</h3>
					<p className="text-sm text-gray-600">
						위에서 관심있는 테마를 클릭하면<br />
						해당 테마의 코스들을 볼 수 있어요
					</p>
				</Card>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="px-4 mt-6">
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-800">선택된 테마의 코스</h3>
					<p className="text-sm text-gray-600">코스 목록을 불러오고 있어요</p>
				</div>
				<div className="flex items-center justify-center py-8">
					<Loader2 className="h-8 w-8 animate-spin text-purple-500" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="px-4 mt-6">
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-800">선택된 테마의 코스</h3>
				</div>
				<Card className="p-6 text-center">
					<p className="text-gray-600 mb-4">{error}</p>
					<Button
						onClick={() => window.location.reload()}
						variant="outline"
						size="sm"
					>
						다시 시도
					</Button>
				</Card>
			</div>
		);
	}

	if (courses.length === 0) {
		return (
			<div className="px-4 mt-6">
				<div className="mb-4">
					<h3 className="text-lg font-bold text-gray-800">선택된 테마의 코스</h3>
				</div>
				<Card className="p-8 text-center">
					<div className="text-4xl mb-4">😢</div>
					<h3 className="text-lg font-bold text-gray-800 mb-2">코스가 없어요</h3>
					<p className="text-sm text-gray-600">
						이 테마에 등록된 코스가 아직 없습니다.<br />
						다른 테마를 선택해보세요!
					</p>
				</Card>
			</div>
		);
	}

	return (
		<div className="px-4 mt-6">
			<div className="mb-4">
				<h3 className="text-lg font-bold text-gray-800">선택된 테마의 코스</h3>
				<p className="text-sm text-gray-600">{courses.length}개의 코스를 찾았어요</p>
			</div>

			<div className="space-y-4">
				{courses.map((course) => (
					<Card
						key={course.id}
						className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
						onClick={() => handleCourseClick(course)}
					>
						<div className="flex gap-4 p-4">
							{/* Course image */}
							<div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
								<SafeImage
									src={course.imageUrl}
									alt={course.title}
									width={96}
									height={96}
									className="w-full h-full object-cover"
								/>
							</div>

							{/* Course info */}
							<div className="flex-1 min-w-0">
								<div className="flex items-start justify-between mb-2">
									<h4 className="font-bold text-gray-800 text-base line-clamp-1">
										{course.title}
									</h4>
									<Button
										variant="ghost"
										size="sm"
										className="text-gray-400 hover:text-red-500 flex-shrink-0"
									>
										<Heart className="h-4 w-4" />
									</Button>
								</div>

								<div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
									<MapPin className="h-4 w-4 flex-shrink-0" />
									<span className="line-clamp-1">{course.region}</span>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4 text-sm text-gray-600">
										<div className="flex items-center gap-1">
											<Clock className="h-4 w-4" />
											<span>{course.duration}</span>
										</div>
										<span className="text-purple-600 font-medium">{course.distance}</span>
									</div>
									<div className="flex items-center gap-1 text-sm">
										<Heart className="h-4 w-4 text-red-400" />
										<span className="text-gray-600">{course.likeCount}</span>
									</div>
								</div>

								<div className="mt-2">
									<span className="inline-block bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
										{course.theme}
									</span>
								</div>
							</div>
						</div>
					</Card>
				))}
			</div>

			{courses.length >= limit && (
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600 mb-4">
						더 많은 코스가 있을 수 있어요
					</p>
					<Button variant="outline" onClick={() => window.location.reload()}>
						더 보기
					</Button>
				</div>
			)}
		</div>
	);
}