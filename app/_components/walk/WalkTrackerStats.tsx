interface WalkTrackerStatsProps {
	distance: number; // 거리 (미터)
	elapsedMs: number; // 경과 시간 (밀리초)
}

/**
 * 산책 통계 정보를 표시하는 컴포넌트
 * 거리, 시간, 평균 페이스를 실시간으로 보여줍니다
 */
export function WalkTrackerStats({ distance, elapsedMs }: WalkTrackerStatsProps) {
	const minutes = Math.floor(elapsedMs / 60000);
	const seconds = Math.floor((elapsedMs % 60000) / 1000);

	return (
		<div className="grid grid-cols-2 gap-4 text-center">
			<div>
				<div className="text-sm opacity-75">거리</div>
				<div className="text-2xl font-semibold">{(distance / 1000).toFixed(2)} km</div>
			</div>
			<div>
				<div className="text-sm opacity-75">시간</div>
				<div className="text-2xl font-semibold">
					{minutes}:{seconds.toString().padStart(2, "0")}
				</div>
			</div>
		</div>
	);
}
