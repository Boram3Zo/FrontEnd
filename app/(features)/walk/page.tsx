"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/_components/header";
import { BottomNavigation } from "@/app/_components/bottom-navigation";
import WalkingTracker from "@/app/_components/walking-tracker";
import WalkingSummary from "@/app/_components/walking-summary";
import { CatDiscoveryModal } from "@/app/_components/cat-discovery-modal";
import { WalkingSession } from "@/app/_lib/walking-storage";
import { Cat } from "@/app/_lib/cat";

// interface WalkingSession {
//   id: string
//   startTime: Date
//   endTime?: Date
//   duration: number
//   distance: number
//   route: { lat: number; lng: number; timestamp: Date }[]
//   isActive: boolean
//   isPaused: boolean
// }

export default function WalkPage() {
	const [session, setSession] = useState<WalkingSession | null>(null);
	const [showSummary, setShowSummary] = useState(false);
	const [discoveredCat, setDiscoveredCat] = useState<Cat | null>(null);

	const startWalking = () => {
		const newSession: WalkingSession = {
			id: Date.now().toString(),
			startTime: new Date().toISOString(),
			endTime: "0",
			durationSec: 0,
			distanceKm: 0,
			route: [],
			isActive: true,
			isPaused: false,
		};
		setSession(newSession);
	};

	const stopWalking = () => {
		if (session) {
			const updatedSession = {
				...session,
				endTime: new Date().toISOString(),
				isActive: false,
			};
			setSession(updatedSession);
			setShowSummary(true);
		}
	};

	// const pauseWalking = () => {
	//   if (session) {
	//     setSession({ ...session, isPaused: !session.isPaused });
	//   }
	// };

	// Simulate cat discovery during walk
	useEffect(() => {
		if (session?.isActive && !session.isPaused) {
			const timer = setTimeout(() => {
				if (Math.random() > 0.7) {
					// 30% chance of discovering a cat
					setDiscoveredCat({
						id: "random-cat",
						name: "길냥이",
						breed: "코리안 숏헤어",
						personality: "호기심 많은",
						discoveredAt: "현재 위치",
						discoveredDate: new Date().toLocaleDateString("ko-KR"),
						rarity: "common" as const,
						description: "산책 중에 만난 귀여운 길고양이예요!",
						favoriteFood: "참치",
						hobby: "햇볕쬐기",
						isDiscovered: true,
					});
				}
			}, 10000); // Check every 10 seconds

			return () => clearTimeout(timer);
		}
	}, [session?.isActive, session?.isPaused]);

	if (showSummary && session) {
		// return <WalkingSummary session={session} onClose={() => setShowSummary(false)} />
		return (
			<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
				<Header />

				<main className="pb-20">
					<WalkingSummary />
				</main>

				<BottomNavigation />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
			<Header />

			<main className="pb-20">
				{session ? (
					// <WalkingTracker onStop={stopWalking} onPause={pauseWalking} onUpdateSession={setSession} />
					<WalkingTracker onStop={stopWalking} />
				) : (
					<div className="px-4 py-8">
						<div className="text-center mb-8">
							<h1 className="text-2xl font-bold text-gray-800 mb-4">새로운 산책을 시작해보세요!</h1>
							<p className="text-gray-600 mb-8">
								실시간으로 경로를 기록하고
								<br />
								새로운 고양이 친구들을 만나보세요
							</p>
						</div>

						<div className="space-y-4">
							<button
								onClick={startWalking}
								className="w-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white py-6 rounded-2xl shadow-lg text-xl font-bold"
							>
								🚶‍♀️ 산책 시작하기
							</button>

							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="bg-white rounded-lg p-4 shadow-sm">
									<div className="text-2xl mb-2">🎯</div>
									<div className="text-sm text-gray-600">목표 거리</div>
									<div className="font-bold text-gray-800">2.0km</div>
								</div>
								<div className="bg-white rounded-lg p-4 shadow-sm">
									<div className="text-2xl mb-2">⏱️</div>
									<div className="text-sm text-gray-600">예상 시간</div>
									<div className="font-bold text-gray-800">30분</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</main>

			<BottomNavigation />

			{/* Cat discovery modal */}
			{discoveredCat && (
				<CatDiscoveryModal
					cat={discoveredCat}
					isOpen={!!discoveredCat}
					onClose={() => setDiscoveredCat(null)}
					isDetailView={false}
				/>
			)}
		</div>
	);
}
