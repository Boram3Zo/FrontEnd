import { useState, useEffect } from "react";
import { WalkingSession } from "@/app/_types/walking";
import { Cat } from "@/app/_types/cat";
import { MOCK_CATS } from "@/app/_mocks/cats";
import { WALKING_CONSTANTS } from "@/app/_constants/constants";
import { saveLatestSession } from "@/app/_libs/walkingStorage";
import { notifyCatDetected } from "@/app/_libs/catService";

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
			pins: [], // 시작할 때는 빈 배열
			isActive: true,
			isPaused: false,
		};
		setSession(newSession);
		// 🔴 시작 시에도 세션을 저장하여 복구 가능하도록 함
		saveLatestSession(newSession);
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
			const timer = setInterval(() => {
				console.log("Checking for cat discovery...");
				if (Math.random() > WALKING_CONSTANTS.CAT_DISCOVERY_THRESHOLD) {
					// 항상 첫 번째 고양이 (치즈, id: 1)를 발견하도록 설정
					const discoveredCat: Cat = {
						...MOCK_CATS[0],
						// override discovered date and location with current context
						discoveredAt: "현재 위치",
						discoveredDate: new Date().toLocaleDateString("ko-KR"),
						isDiscovered: true,
					};
					setDiscoveredCat(discoveredCat);
				}
			}, WALKING_CONSTANTS.CAT_CHECK_INTERVAL_MS);

			return () => clearInterval(timer);
		}
	}, [session?.isActive, session?.isPaused]);

	// Notify server when a cat is discovered
	useEffect(() => {
		if (!discoveredCat) return;

		const notify = async () => {
			try {
				await notifyCatDetected({
					id: discoveredCat.id,
					discoveredAt: discoveredCat.discoveredAt,
					discoveredDate: discoveredCat.discoveredDate,
					name: discoveredCat.name,
				});
			} catch (err) {
				console.error("Failed to notify backend about discovered cat:", err);
			}
		};

		notify();
	}, [discoveredCat]);

	return {
		session,
		showSummary,
		discoveredCat,
		startWalking,
		stopWalking,
		setDiscoveredCat,
	};
}
