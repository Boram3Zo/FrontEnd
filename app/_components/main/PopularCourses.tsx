"use client";

import { Card } from "@/app/_components/ui/Card";
import { MapPin, Heart } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { useEffect, useState } from "react";
import { getPostList, convertPostToPopularCourse, type PopularCourse } from "@/app/_libs/postService";

export function PopularCourses() {
	const [courses, setCourses] = useState<PopularCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadPopularCourses = async () => {
			try {
				setLoading(true);
				const response = await getPostList(1, 5); // 인기 코스 5개만 가져오기
				console.log("🔍 API 응답 원본 데이터:", response.data.boardPage.content);

				// 각 포스트의 사진 정보 로그
				response.data.boardPage.content.forEach((post, index) => {
					console.log(`📷 Post ${index + 1} 사진 정보:`, post.photoList);
					if (post.photoList && post.photoList.length > 0) {
						console.log(`📂 첫 번째 사진 경로:`, post.photoList[0].filePath);
					}
				});

				const popularCourses = response.data.boardPage.content.map(convertPostToPopularCourse);

				// 변환된 코스의 이미지 URL 로그
				popularCourses.forEach((course, index) => {
					console.log(`🖼️ Course ${index + 1} 변환된 이미지 URL:`, course.imageUrl);
				});

				setCourses(popularCourses);
			} catch (err) {
				console.error("인기 코스 로딩 실패:", err);
				setError("인기 코스를 불러오는데 실패했습니다.");
			} finally {
				setLoading(false);
			}
		};

		loadPopularCourses();
	}, []);

	if (loading) {
		return (
			<div className="px-4 mb-6">
				<h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
					<span>🔥</span>
					인기 산책 코스
				</h2>
				<div className="space-y-2">
					{[1, 2].map(i => (
						<Card key={i} className="p-3 bg-white/90 backdrop-blur-sm shadow-md animate-pulse">
							<div className="flex items-center gap-3">
								<div className="w-16 h-16 bg-gray-200 rounded-lg" />
								<div className="flex-1">
									<div className="h-4 bg-gray-200 rounded mb-2" />
									<div className="h-3 bg-gray-200 rounded w-3/4 mb-1" />
									<div className="h-3 bg-gray-200 rounded w-1/2" />
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="px-4 mb-6">
				<h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
					<span>🔥</span>
					인기 산책 코스
				</h2>
				<Card className="p-4 bg-red-50 border-red-200">
					<p className="text-sm text-red-600">{error}</p>
				</Card>
			</div>
		);
	}

	return (
		<div className="px-4 mb-6">
			<h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
				<span>🔥</span>
				인기 산책 코스
			</h2>

			<div className="space-y-2">
				{courses.length > 0 ? (
					courses.map(course => (
						<Link key={course.id} href={`/course/${course.id}`}>
							<Card className="p-3 bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
								<div className="flex items-center gap-3">
									<div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 rounded-lg overflow-hidden">
										<SafeImage
											src={course.imageUrl}
											alt={course.title}
											width={64}
											height={64}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1">
										<h3 className="text-sm font-semibold text-gray-800 mb-1 text-left">{course.title}</h3>
										<div className="flex items-center gap-3 text-xs text-gray-600 mb-1">
											<div className="flex items-center gap-1">
												<MapPin className="h-3 w-3" />
												<span>{course.region}</span>
											</div>
											<div className="flex items-center gap-1">
												<span>⏱️</span>
												<span>{course.duration}</span>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-1">
												<span className="text-blue-500">📏</span>
												<span className="text-xs font-medium text-gray-800">{course.distance}</span>
											</div>
											<div className="flex items-center gap-1">
												<Heart className="h-3 w-3 text-gray-400" />
												<span className="text-xs text-gray-500">{course.likeCount}</span>
											</div>
										</div>
									</div>
								</div>
							</Card>
						</Link>
					))
				) : (
					<Card className="p-4 text-center">
						<p className="text-sm text-gray-500">아직 등록된 인기 코스가 없습니다.</p>
					</Card>
				)}
			</div>
		</div>
	);
}
