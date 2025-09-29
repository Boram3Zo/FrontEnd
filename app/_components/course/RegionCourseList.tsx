"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, Loader2, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { fetchCoursesByRegion } from "@/app/_libs/courses";
import { type PopularCourse } from "@/app/_libs/postService";

interface RegionCourseListProps {
	selectedRegion?: string | null;
	limit?: number;
}

export function RegionCourseList({ selectedRegion, limit = 5 }: RegionCourseListProps) {
	const router = useRouter();
	const [courses, setCourses] = useState<PopularCourse[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [currentLimit, setCurrentLimit] = useState(limit);
	const [hasMoreCourses, setHasMoreCourses] = useState(false);
	const [allCourses, setAllCourses] = useState<PopularCourse[]>([]);

	// 지역별 코스 로드
	useEffect(() => {
		if (!selectedRegion) {
			setCourses([]);
			setAllCourses([]);
			setHasMoreCourses(false);
			return;
		}

		const loadRegionCourses = async () => {
			try {
				setLoading(true);
				setError(null);

				// 서버 사이드 필터링을 통해 해당 지역의 모든 코스를 가져옴 (충분히 많이 요청)
				const regionCourses = await fetchCoursesByRegion(selectedRegion, 50); // 최대 50개까지 가져옴
				
				// 모든 코스를 저장
				setAllCourses(regionCourses);
				
				// 현재 limit만큼만 표시
				setCourses(regionCourses.slice(0, currentLimit));
				
				// 더 많은 코스가 있는지 확인
				setHasMoreCourses(regionCourses.length > currentLimit);
			} catch (err) {
				console.error("지역 코스 로딩 실패:", err);
				setError("코스를 불러오는데 실패했습니다.");
			} finally {
				setLoading(false);
			}
		};

		// 지역이 변경될 때 currentLimit 초기화
		setCurrentLimit(limit);
		loadRegionCourses();
	}, [selectedRegion, limit]);

	// currentLimit이 변경될 때 표시할 코스 업데이트
	useEffect(() => {
		if (allCourses.length > 0) {
			setCourses(allCourses.slice(0, currentLimit));
			setHasMoreCourses(allCourses.length > currentLimit);
		}
	}, [currentLimit, allCourses]);

	// 더 많은 코스 보기 함수 (페이지 이동 대신 limit 증가)
	const handleLoadMoreCourses = () => {
		setCurrentLimit(prev => prev + 5); // 5개씩 추가로 표시
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
					<p className="text-sm text-gray-500">
						지도에서 원하는 구를 클릭하면
						<br />
						해당 지역의 산책 코스를 볼 수 있어요!
					</p>
				</Card>
			</div>
		);
	}

	if (loading && courses.length === 0) {
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
					<Button variant="outline" size="sm" onClick={() => window.location.reload()}>
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
				<span className="text-sm text-gray-500">
					{courses.length}{allCourses.length > courses.length ? `/${allCourses.length}` : ''}개 코스
				</span>
			</div>

			{courses.length === 0 ? (
				<Card className="p-8 text-center bg-gray-50">
					<MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-600 mb-2">{selectedRegion}에 등록된 코스가 없어요</h3>
					<p className="text-sm text-gray-500 mb-4">
						이 지역의 첫 번째 산책 코스를
						<br />
						만들어보시겠어요?
					</p>
					<Button variant="outline" onClick={() => router.push("/walk")}>
						산책 코스 만들기
					</Button>
				</Card>
			) : (
				<>
					<div className="space-y-3">
						{courses.map(course => (
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

					{/* Load more button - 더 많은 코스가 있을 때만 표시 */}
					{hasMoreCourses && (
						<div className="text-center mt-4">
							<Button 
								variant="outline" 
								className="px-6 bg-transparent text-sm" 
								onClick={handleLoadMoreCourses}
							>
								더 많은 코스 보기 ({allCourses.length - courses.length}개 더)
							</Button>
						</div>
					)}

					{/* 모든 코스를 다 보여준 경우 */}
					{!hasMoreCourses && allCourses.length > limit && (
						<div className="text-center mt-4">
							<p className="text-sm text-gray-500">
								{selectedRegion}의 모든 코스를 확인했습니다 ✅
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}