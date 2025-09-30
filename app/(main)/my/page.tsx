"use client";

import { useState } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { Card } from "@/app/_components/ui/Card";
import { Award, MapPin, Heart, Edit3 } from "lucide-react";
import { CatSelectionModal } from "@/app/_components/cat/CatSelectionModal";
import { CollectedCat } from "@/app/_components/cat/CollectedCat";
import { withAuthGuard } from "@/app/_components/auth/AuthGuard";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { getMemberName } from "@/app/_libs/memberApiService";

function MyPage() {
	const [showCatSelection, setShowCatSelection] = useState(false);
	const [selectedCatBreed, setSelectedCatBreed] = useState("코리안 숏헤어");
	const [userName, setUserName] = useState<string>("");
	const router = useRouter();

	const handleCatChange = (breed: string) => {
		setSelectedCatBreed(breed);
		setShowCatSelection(false);
	};

	useEffect(() => {
		// 현재 로그인한 유저 이름 요청
		const fetchUserName = async () => {
			try {
				const name = await getMemberName();
				setUserName(name || "");
			} catch (err) {
				console.error("유저 이름 로딩 실패:", err);
				setUserName("");
			}
		};
		fetchUserName();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
			<Header />
			<main className="pb-20 px-4">
				{/* Profile Section */}
				<div className="py-6 text-center">
					<div className="relative inline-block mb-4">
						<CollectedCat breed={selectedCatBreed} size="lg" />
						<button
							onClick={() => setShowCatSelection(true)}
							className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
						>
							<Edit3 className="h-2 w-2 text-white" />
						</button>
					</div>

					<h1 className="text-2xl font-bold text-gray-800 mb-2">{userName ? userName : "고양이 탐험가"}</h1>
					<p className="text-gray-600 mb-4">길고양이처럼 자유롭게 탐험하는 산책러</p>

					<div className="flex justify-center gap-4 mb-6">
						<div className="text-center">
							<div className="text-xl font-bold text-orange-600">47</div>
							<div className="text-xs text-gray-600">완주한 코스</div>
						</div>
						<div className="text-center">
							<div className="text-xl font-bold text-pink-600">23</div>
							<div className="text-xs text-gray-600">발견한 고양이</div>
						</div>
						<div className="text-center">
							<div className="text-xl font-bold text-blue-600">156km</div>
							<div className="text-xs text-gray-600">총 걸은 거리</div>
						</div>
					</div>
				</div>

				{/* Achievement Section */}
				<div className="mb-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
						<Award className="h-5 w-5 text-yellow-500" />
						최근 달성한 업적
					</h2>

					<Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
						<div className="flex items-center gap-3">
							<div className="text-3xl">🏆</div>
							<div>
								<h3 className="font-semibold text-gray-800">산책 초보자</h3>
								<p className="text-sm text-gray-600">50개 코스 완주 달성!</p>
							</div>
						</div>
					</Card>
				</div>

				{/* My Activities */}
				<div className="mb-6">
					<h2 className="text-lg font-semibold text-gray-800 mb-3">나의 활동</h2>

					<div className="grid grid-cols-2 gap-3">
						<Card
							className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
							onClick={() => router.push("/my/my-courses")}
						>
							<MapPin className="h-6 w-6 text-orange-500 mx-auto mb-2" />
							<div className="text-lg font-bold text-gray-800">내 코스</div>
							<div className="text-sm text-gray-600">12개</div>
						</Card>

						<Card
							className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer"
							onClick={() => router.push("/my/favorite-courses")}
						>
							<Heart className="h-6 w-6 text-pink-500 mx-auto mb-2" />
							<div className="text-lg font-bold text-gray-800">찜한 코스</div>
							<div className="text-sm text-gray-600">28개</div>
						</Card>
					</div>
				</div>
			</main>

			<BottomNavigation />

			<CatSelectionModal
				isOpen={showCatSelection}
				onClose={() => setShowCatSelection(false)}
				onCatSelect={handleCatChange}
				currentBreed={selectedCatBreed}
			/>
		</div>
	);
}

// 인증 가드로 보호된 마이페이지 export
export default withAuthGuard(MyPage);
