import { useState, useEffect } from "react";
import { WalkingSession } from "@/app/_types/walking";
import { Cat } from "@/app/_types/cat";

export function useWalkingSession() {
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

	return {
		session,
		showSummary,
		discoveredCat,
		startWalking,
		stopWalking,
		setDiscoveredCat,
	};
}
