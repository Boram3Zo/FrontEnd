import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { Card } from "@/app/_components/ui/Card";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { LikeButton } from "@/app/_components/ui/LikeButton";
import { Clock, Route, MapPin } from "lucide-react";
import { getPostById, getImageUrl } from "@/app/_libs/postService";
import { Post } from "@/app/_types/post";
import RouteMap from "@/app/_components/map/RouteMap";

type PageParams = Promise<{ id: string }>;

async function fetchCourse(postId: number): Promise<Post | null> {
	try {
		const response = await getPostById(postId);
		if (response.success) {
			return response.data;
		}
		return null;
	} catch (error) {
		console.error("코스 조회 실패:", error);
		return null;
	}
}

function formatDuration(duration: string): string {
	// "00:00:01" 형식을 "1분" 형식으로 변환
	const parts = duration.split(":");
	const hours = parseInt(parts[0]);
	const minutes = parseInt(parts[1]);
	const seconds = parseInt(parts[2]);

	if (hours > 0) {
		return `${hours}시간 ${minutes}분`;
	} else if (minutes > 0) {
		return `${minutes}분`;
	} else {
		return `${seconds}초`;
	}
}

function formatDistance(distance: number): string {
	if (distance >= 1) {
		return `${distance.toFixed(1)}km`;
	} else {
		return `${(distance * 1000).toFixed(0)}m`;
	}
}

function parseRouteFromSpots(spotsJson: string | null): { lat: number; lng: number }[] {
	if (!spotsJson) return [];
	try {
		const spots = JSON.parse(spotsJson);
		if (Array.isArray(spots)) {
			return spots.map((spot: { lat: string; lng: string }) => ({
				lat: parseFloat(spot.lat),
				lng: parseFloat(spot.lng),
			}));
		}
	} catch (error) {
		console.error("경로 파싱 실패:", error);
	}
	return [];
}

export default async function CourseDetailPage({ params }: { params: PageParams }) {
	const { id } = await params;
	const postId = parseInt(id);

	if (isNaN(postId)) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header />
				<main className="pb-20 px-4 py-8">
					<div className="text-center">
						<h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">잘못된 코스 ID입니다</h2>
						<p className="text-gray-600 mb-6">다른 코스를 둘러보시겠어요?</p>
					</div>
				</main>
				<BottomNavigation />
			</div>
		);
	}

	const course = await fetchCourse(postId);

	if (!course) {
		return (
			<div className="min-h-screen bg-gray-50">
				<Header />
				<main className="pb-20 px-4 py-8">
					<div className="text-center">
						<h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">코스를 찾을 수 없어요</h2>
						<p className="text-gray-600 mb-6">다른 코스를 둘러보시겠어요?</p>
					</div>
				</main>
				<BottomNavigation />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="pb-20">
				{/* Course Title and Location */}
				<div className="bg-white px-4 py-4">
					<div className="flex items-center justify-between mb-2">
						<h1 className="text-xl font-bold text-gray-800">{course.title}</h1>
						<div className="flex items-center gap-2">
							<LikeButton postId={postId} />
							{/* <Button variant="ghost" size="icon">
								<Share2 className="h-5 w-5 text-gray-600" />
							</Button> */}
						</div>
					</div>

					<div className="flex items-center gap-1 mb-3">
						<MapPin className="h-4 w-4 text-gray-500" />
						<span className="text-sm text-gray-600">지역: {course.region}</span>
					</div>

					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-gray-500" />
							<span className="text-sm font-medium">소요시간: {formatDuration(course.duration)}</span>
						</div>
						<div className="flex items-center gap-2">
							<Route className="h-4 w-4 text-gray-500" />
							<span className="text-sm font-medium">거리: {formatDistance(course.distance)}</span>
						</div>
					</div>
				</div>

				{/* Map and Route Visualization */}
				<div className="px-4 py-4">
					<Card className="border border-gray-300 overflow-hidden">
						{/* Map Section */}
						<div className="h-48">
							{(() => {
								// 경로 데이터 준비
								const route = parseRouteFromSpots(course.map.spots);

								// 경로가 없으면 시작점과 끝점으로 기본 경로 생성
								if (route.length === 0) {
									const startLat = parseFloat(course.map.startLatitude);
									const startLng = parseFloat(course.map.startLongitude);
									const endLat = parseFloat(course.map.endLatitude);
									const endLng = parseFloat(course.map.endLongitude);

									if (!isNaN(startLat) && !isNaN(startLng) && !isNaN(endLat) && !isNaN(endLng)) {
										route.push({ lat: startLat, lng: startLng });
										route.push({ lat: endLat, lng: endLng });
									}
								}

								// 경로가 있으면 RouteMap 표시, 없으면 메시지 표시
								if (route.length > 0) {
									return <RouteMap route={route} height="h-48" />;
								} else {
									return (
										<div className="bg-gray-100 h-full flex items-center justify-center">
											<span className="text-gray-500">지도 데이터가 없습니다</span>
										</div>
									);
								}
							})()}
						</div>

						{/* Photo Section */}
						<div className="bg-gray-200 h-48 overflow-hidden">
							{course.photoList.length > 0 ? (
								<div className="relative h-full">
									<SafeImage
										src={getImageUrl(course.photoList[0].filePath)}
										alt={course.photoList[0].imageDescription}
										fill
										className="object-cover"
										priority={true}
									/>
									{course.photoList.length > 1 && (
										<div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
											+{course.photoList.length - 1}장 더
										</div>
									)}
								</div>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<span className="text-gray-500">사진 없음</span>
								</div>
							)}
						</div>
					</Card>
				</div>

				{/* Course Info */}
				<div className="px-4 py-4">
					<Card className="p-4 border border-gray-300">
						<div className="mb-4">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-sm font-medium text-gray-600">테마:</span>
								<span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{course.theme}</span>
							</div>
						</div>

						<p className="text-sm text-gray-700 leading-relaxed mb-4">{course.content}</p>

						{course.hashtagList.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{course.hashtagList.map((tag: string, index: number) => (
									<span key={index} className="text-sm text-blue-600">
										#{tag}
									</span>
								))}
							</div>
						)}
					</Card>
				</div>

				{/* Photos Gallery */}
				{course.photoList.length > 1 && (
					<div className="px-4 py-4">
						<Card className="p-4 border border-gray-300">
							<h3 className="text-lg font-semibold text-gray-800 mb-3">사진 갤러리</h3>
							<div className="grid grid-cols-2 gap-2">
								{course.photoList.slice(1).map(photo => (
									<div key={photo.photoId} className="relative aspect-square bg-gray-200 rounded overflow-hidden">
										<SafeImage
											src={getImageUrl(photo.filePath)}
											alt={photo.imageDescription}
											fill
											className="object-cover"
										/>
										{photo.imageDescription && (
											<div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
												{photo.imageDescription}
											</div>
										)}
									</div>
								))}
							</div>
						</Card>
					</div>
				)}
			</main>

			<BottomNavigation />
		</div>
	);
}
