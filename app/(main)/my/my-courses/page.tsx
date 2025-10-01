"use client";

import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { useEffect, useState } from "react";
import { getMyCourses, convertPostToMyCourse } from "@/app/_libs/postService";
import { getMemberId } from "@/app/_libs/memberApiService";
import { withAuthGuard } from "@/app/_components/auth/AuthGuard";

interface MyCourse {
	id: string;
	title: string;
	location: string;
	duration: string;
	distance: string;
	imageUrl: string;
	theme: string;
	content: string;
	likeCount: number;
}

function MyCoursesPage() {
	const router = useRouter();
	const [courses, setCourses] = useState<MyCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// 임시로 memberId를 1로 설정 (추후 실제 로그인 상태에서 가져와야 함)
	// const memberId = 1;

	useEffect(() => {
		const loadMyCourses = async () => {
			try {
				setLoading(true);

				// 로그인한 유저의 memberId 가져오기
				const memberId = await getMemberId();

				 // 해당 유저의 코스 불러오기
				const response = await getMyCourses(memberId);
				const myCourses = response.data.map(convertPostToMyCourse);
				setCourses(myCourses);
			} catch (err) {
				console.error("내 코스 로딩 실패:", err);
				setError("내 코스 목록을 불러오는데 실패했습니다.");
			} finally {
				setLoading(false);
			}
		};

		loadMyCourses();
	}, []);

	const formatDistance = (distance: number | string) => {
		if (!distance) return "정보 없음";
			const numDistance = typeof distance === "string" ? parseFloat(distance) : distance;

		if (isNaN(numDistance)) return "정보 없음";

		if (numDistance >= 1) {
			return `${numDistance.toFixed(1)}km`;
		}
		return `${(numDistance * 1000).toFixed(0)}m`;
	};

	if (loading) {
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
							<p className="text-sm text-gray-500">로딩 중...</p>
						</div>
					</div>
				</div>
				{/* Loading skeleton */}
				<div className="px-4 py-6">
					<div className="space-y-4">
						{[1, 2, 3].map(i => (
							<Card key={i} className="p-4 bg-white shadow-md animate-pulse">
								<div className="flex items-start gap-4">
									<div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
									<div className="flex-1">
										<div className="h-5 bg-gray-200 rounded mb-2" />
										<div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
										<div className="h-4 bg-gray-200 rounded w-1/2" />
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (error) {
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
							<p className="text-sm text-gray-500">오류 발생</p>
						</div>
					</div>
				</div>
				<div className="px-4 py-6">
					<Card className="p-4 bg-red-50 border-red-200">
						<p className="text-sm text-red-600">{error}</p>
						<Button className="mt-3" onClick={() => window.location.reload()}>
							다시 시도
						</Button>
					</Card>
				</div>
			</div>
		);
	}

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
						<p className="text-sm text-gray-500">{courses.length}개의 코스</p>
					</div>
				</div>
			</div>
			{/* Course List */}
			<div className="px-4 py-6">
				{courses.length === 0 ? (
					<Card className="p-8 bg-white shadow-md text-center">
						<div className="text-gray-500">
							<MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
							<h3 className="text-lg font-semibold mb-2">아직 코스가 없습니다</h3>
							<p className="text-sm mb-4">첫 번째 산책 코스를 만들어보세요!</p>
							<Button onClick={() => router.push("/walk")}>산책 시작하기</Button>
						</div>
					</Card>
				) : (
					<div className="space-y-4">
						{courses.map((course) => (
							<Card
								key={course.id}
								className="p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
								onClick={() => router.push(`/course/${course.id}`)}
							>
								<div className="flex items-center gap-3">
								{/* 이미지: RegionCourseList 스타일 (16x16, 그라데ーション 박스) */}
								<div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 rounded-lg overflow-hidden">
									{course.imageUrl ? (
									<SafeImage
										src={course.imageUrl}
										alt={course.title ? `${course.title} 산책 코스 이미지` : "산책 코스 이미지"}
										width={64}
										height={64}
										className="w-full h-full object-cover"
									/>
									) : (
									<div className="w-full h-full bg-gray-300 flex items-center justify-center">
										<MapPin className="h-8 w-8 text-gray-500" />
									</div>
									)}
								</div>

								{/* 정보 영역: RegionCourseList처럼 컴팩트한 타이포/행 구성 */}
								<div className="flex-1">
									{/* 제목 */}
									<h3 className="text-sm font-semibold text-gray-800 mb-1 text-left">
									{course.title}
									</h3>

									{/* 지역/시간 한 줄 */}
									<div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
									<div className="flex items-center gap-1">
										<MapPin className="h-3 w-3" />
										<span>{course.location}</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="h-3 w-3" />
										<span>{course.duration}</span>
									</div>
									</div>

									{/* 거리 + 좋아요 */}
									<div className="flex items-center justify-between text-xs">
										<div className="flex items-center gap-1 text-gray-700">
											<span className="text-blue-500">📏</span>
											<span className="font-medium">{formatDistance(course.distance)}</span>
										</div>
										<div className="flex items-center gap-1 text-pink-500">
											<Heart className="h-3 w-3 text-gray-400" />
											<span className="font-medium text-gray-700">{course.likeCount ?? 0}</span>
										</div>
									</div>

									{/* 내용은 기존 요구대로 유지 */}
									{course.content && (
									<p className="mt-1 text-xs text-gray-500 line-clamp-2">
										{course.content}
									</p>
									)}
								</div>
								</div>
							</Card>
							))}
					</div>
				)}
			</div>
		</div>
	);
}

export default withAuthGuard(MyCoursesPage);
