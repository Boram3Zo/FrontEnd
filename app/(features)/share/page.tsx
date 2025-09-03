"use client";

import { Header } from "@/app/_components/layout/header";
import { BottomNavigation } from "@/app/_components/layout/bottom-navigation";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { MapPin, Hash, Clock, Route } from "lucide-react";
import { useMemo, useState } from "react";
import RouteMap from "@/app/_components/map/RouteMap";
import { PhotoUploader } from "@/app/_components/photo/PhotoUploader";
import { loadLatestSession } from "@/app/_libs/walking-storage";
import { SpotPhoto } from "@/app/_libs/photo/photoTypes";

export default function ShareCoursePage() {
	const session = useMemo(() => loadLatestSession(), []);

	// === 스팟 사진 관리 상태 ===
	const [spotPhotos, setSpotPhotos] = useState<SpotPhoto[]>([]);

	// 사진 변경 시 호출되는 콜백
	const handlePhotosChange = (photos: SpotPhoto[]) => {
		setSpotPhotos(photos);
		// 여기서 추가적인 로직 수행 가능 (예: 유효성 검사, 외부 상태 업데이트 등)
		console.log("현재 사진 개수:", photos.length);
	};

	const themeEmojis = [
		{ emoji: "🐱", label: "고양이" },
		{ emoji: "🌸", label: "벚꽃" },
		{ emoji: "🏠", label: "한옥" },
		{ emoji: "🌊", label: "바다" },
		{ emoji: "🌲", label: "숲길" },
		{ emoji: "🌅", label: "일출" },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<main className="pb-20">
				{/* Walking Route Section */}
				<div className="mb-6">
					<div className="flex items-center gap-2 mb-3">
						<MapPin className="h-5 w-5 text-gray-600" />
						<h3 className="font-medium text-gray-800">산책 루트</h3>
					</div>
					<Card className="p-4 bg-gray-50">
						{session?.route?.length ? (
							<RouteMap height="h-[220px]" route={session.route.map(p => ({ lat: p.lat, lng: p.lng }))} />
						) : (
							<div className="h-32 flex items-center justify-center text-gray-500">표시할 경로가 없습니다.</div>
						)}
					</Card>
				</div>

				{/* Course Details Section */}
				<div className="px-4 py-4">
					<h3 className="text-base font-semibold text-gray-800 mb-3">게시글 제목</h3>
					<Input placeholder="산책 코스의 제목을 입력해주세요" className="mb-4" />

					<h3 className="text-base font-semibold text-gray-800 mb-3">산책 정보</h3>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-gray-600" />
							<span className="text-sm text-gray-600">소요 시간</span>
						</div>
						<div className="flex items-center gap-2">
							<Route className="h-4 w-4 text-gray-600" />
							<span className="text-sm text-gray-600">산책 거리</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 mb-4">
						<span className="text-lg font-semibold">45분</span>
						<span className="text-lg font-semibold">2.3km</span>
					</div>
				</div>

				{/* Photo Upload Section */}
				<PhotoUploader
					title="스팟 사진"
					emptyMessage="스팟 사진을 추가하고 설명을 작성해주세요"
					maxPhotos={6}
					onPhotosChange={handlePhotosChange}
				/>

				{/* Photo Count Display */}
				{spotPhotos.length > 0 && (
					<div className="px-4 py-2 text-sm text-gray-600">업로드된 사진: {spotPhotos.length}개</div>
				)}

				{/* Review Section */}
				<div className="px-4 py-4">
					<h3 className="text-base font-semibold text-gray-800 mb-3">본문</h3>
					<Textarea placeholder="산책 코스에 대한 자세한 설명을 작성해주세요" className="min-h-24 mb-4" />
				</div>

				{/* Theme Selection */}
				<div className="px-4 py-4">
					<h3 className="text-base font-semibold text-gray-800 mb-3">테마 선택</h3>
					<div className="flex flex-wrap gap-2 mb-4">
						{themeEmojis.map((theme, index) => (
							<Button key={index} variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
								<span>{theme.emoji}</span>
								<span>{theme.label}</span>
							</Button>
						))}
					</div>
				</div>

				{/* Hashtag Section */}
				<div className="px-4 py-4">
					<div className="flex items-center gap-2 mb-3">
						<Hash className="h-5 w-5 text-gray-600" />
						<h3 className="text-base font-semibold text-gray-800">해시태그</h3>
					</div>

					<Input placeholder="#해시태그를 입력해주세요" className="mb-3" />

					<div className="flex flex-wrap gap-2">
						<Button variant="outline" size="sm">
							#산책
						</Button>
						<Button variant="outline" size="sm">
							#고양이
						</Button>
						<Button variant="outline" size="sm">
							#힐링
						</Button>
					</div>
				</div>

				{/* Submit Button */}
				<div className="px-4 py-6">
					<Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg">
						코스 공유하기
					</Button>
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
