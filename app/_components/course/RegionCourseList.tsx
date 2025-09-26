"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, Loader2, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { getPostList, convertPostToPopularCourse, type PopularCourse, getImageUrl } from "@/app/_libs/postService";

interface RegionCourseListProps {
	selectedRegion?: string | null;
	limit?: number;
}

export function RegionCourseList({ selectedRegion, limit = 2 }: RegionCourseListProps) {
	const router = useRouter();
	const [courses, setCourses] = useState<PopularCourse[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// 지역별 코스 로드
	useEffect(() => {
		if (!selectedRegion) {
			setCourses([]);
			return;
		}

		const loadRegionCourses = async () => {
			try {
				setLoading(true);
				setError(null);
				
				// API에서 게시글 목록을 가져옴 (더 많은 데이터를 가져와서 필터링)
				const response = await getPostList(0, 20); // 충분한 데이터 가져옴
				
				// 선택된 지역의 코스만 필터링 (다양한 형태의 지역명 매칭)
				const regionCourses = response.data.boardPage.content
					.filter(post => {
						if (!post.region) return false;
						
						// 정확한 매칭
						if (post.region === selectedRegion) return true;
						
						// 한국어 지역명 매칭 (예: "강남구" vs "강남")
						if (post.region.includes(selectedRegion.replace('구', ''))) return true;
						if (selectedRegion.includes(post.region.replace('구', ''))) return true;
						
						return false;
					})
					.slice(0, limit) // 최대 개수 제한
					.map(convertPostToPopularCourse);
				
				console.log(`🗺️ ${selectedRegion} 지역 코스 ${regionCourses.length}개 로드됨:`, regionCourses);
				setCourses(regionCourses);
			} catch (err) {
				console.error("지역 코스 로딩 실패:", err);
				setError("코스를 불러오는데 실패했습니다.");
			} finally {
				setLoading(false);
			}
		};

		loadRegionCourses();
	}, [selectedRegion, limit]);

	const handleViewMoreCourses = () => {
		if (selectedRegion) {
			router.push(`/region/${selectedRegion}`);
		} else {
			router.push("/region");
		}
	};

	const handleCourseClick = (courseId: number | string) => {
		router.push(`/course/${courseId}`);
	};

	if (!selectedRegion) {
		return (
			<div className="px-4">
				<Card className="p-8 text-center bg-gray-50">
					<MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-600 mb-2">지역을 선택해주세요</h3>
					<p className="text-sm text-gray-500">지도에서 원하는 구를 클릭하면<br/>해당 지역의 산책 코스를 볼 수 있어요!</p>
				</Card>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="px-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-bold text-gray-800">{selectedRegion}의 산책 코스</h2>
				</div>
				
				<div className="flex items-center justify-center py-8">
					<Loader2 className="h-8 w-8 animate-spin text-gray-500" />
					<span className="ml-2 text-gray-500">코스를 불러오는 중...</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="px-4">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-bold text-gray-800">{selectedRegion}의 산책 코스</h2>
				</div>
				
				<Card className="p-4 bg-red-50 border-red-200 text-center">
					<p className="text-sm text-red-600 mb-3">{error}</p>
					<Button 
						variant="outline" 
						size="sm"
						onClick={() => window.location.reload()}
					>
						다시 시도
					</Button>
				</Card>
			</div>
		);
	}

	return (
		<div className="px-4">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-bold text-gray-800">{selectedRegion}의 산책 코스</h2>
				<span className="text-sm text-gray-500">{courses.length}개 코스</span>
			</div>

			{courses.length === 0 ? (
				<Card className="p-8 text-center bg-gray-50">
					<MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-600 mb-2">{selectedRegion}에 등록된 코스가 없어요</h3>
					<p className="text-sm text-gray-500 mb-4">이 지역의 첫 번째 산책 코스를<br/>만들어보시겠어요?</p>
					<Button 
						variant="outline" 
						onClick={() => router.push('/walk')}
					>
						산책 코스 만들기
					</Button>
				</Card>
			) : (
				<>
					<div className="space-y-3">
						{courses.map((course) => (
							<Card 
								key={course.id} 
								className="p-4 bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
								onClick={() => handleCourseClick(course.id)}
							>
								<div className="flex items-start gap-4">
									{/* Course image on the left */}
									<div className="w-20 h-20 bg-gradient-to-br from-green-200 to-green-400 rounded-lg overflow-hidden flex-shrink-0">
										{course.imageUrl ? (
											<SafeImage
												src={course.imageUrl}
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
											<h3 className="font-bold text-gray-800 text-base leading-tight">{course.title}</h3>
											<div className="flex items-center gap-1 ml-2">
												<Heart className="h-3 w-3 text-gray-400" />
												<span className="text-xs text-gray-500">{course.likeCount}</span>
											</div>
										</div>

										<div className="text-sm text-gray-600 mb-2">
											<div className="flex items-center gap-1 mb-1">
												<MapPin className="h-3 w-3" />
												<span className="text-xs">{course.region}</span>
											</div>
											<div className="flex items-center gap-4">
												<div className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													<span className="text-xs">{course.duration}</span>
												</div>
												<div className="flex items-center gap-1">
													<span className="text-blue-500">📏</span>
													<span className="text-xs font-medium">{course.distance}</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Card>
						))}
					</div>

					{/* Load more button - 코스가 limit보다 많을 가능성이 있을 때만 표시 */}
					{courses.length === limit && (
						<div className="text-center mt-4">
							<Button 
								variant="outline" 
								className="px-6 bg-transparent text-sm" 
								onClick={handleViewMoreCourses}
							>
								{selectedRegion}의 더 많은 코스 보기
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
}
