"use client";

import { WalkTrackerStats } from "./WalkTrackerStats";
import { WalkTrackerControls } from "./WalkTrackerControls";
import { WalkTrackerManual } from "./WalkTrackerManual";
import { useWalkTracker } from "@/app/_hooks/useWalkTracker";

interface WalkingTrackerProps {
	onStop: () => void;
}

/**
 * 산책 추적 메인 컴포넌트
 * 커스텀 훅을 사용하여 UI 렌더링에만 집중합니다
 */
export default function WalkingTracker({ onStop }: WalkingTrackerProps) {
	const {
		mapRef,
		tracking,
		paused,
		manualMode,
		manualLatLng,
		elapsedMs,
		distance,
		togglePause,
		toggleManualMode,
		finishAndNotifyParent,
		handleManualMove,
		setManualLatLng,
		DELTA,
	} = useWalkTracker({ onStop });

	return (
		<div className="space-y-4 p-4">
			{/* 지도 영역 */}
			<div ref={mapRef} className="w-full h-[420px] rounded-2xl bg-gray-100" />

			{/* 정보/컨트롤 */}
			<div className="rounded-2xl p-4 bg-white/70 dark:bg-zinc-900/70 shadow">
				<WalkTrackerStats distance={distance} elapsedMs={elapsedMs} />

				<WalkTrackerControls
					paused={paused}
					tracking={tracking}
					manualMode={manualMode}
					onTogglePause={togglePause}
					onFinish={finishAndNotifyParent}
					onToggleManualMode={toggleManualMode}
				/>
			</div>

			{/* 수동 모드 컨트롤 */}
			<WalkTrackerManual
				manualMode={manualMode}
				manualLatLng={manualLatLng}
				onManualLatLngChange={setManualLatLng}
				onManualMove={handleManualMove}
				delta={DELTA}
			/>
		</div>
	);
}
