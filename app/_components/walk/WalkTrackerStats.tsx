import React from "react";
import { Clock, Route, Activity } from "lucide-react";
import { StatCard, StatCardHorizontal } from "./WalkStatCard";
import { formatElapsedTime, formatDistance, calculatePace, calculateSpeed } from "@/app/_utils/walkingStats";

export interface WalkTrackerStatsProps {
	/** 거리 (미터) */
	distance: number;
	/** 경과 시간 (밀리초) */
	elapsedMs: number;
	/** 레이아웃 타입 */
	layout?: "grid" | "horizontal" | "compact";
	/** 추가 통계 표시 여부 */
	showExtended?: boolean;
	/** 로딩 상태 */
	loading?: boolean;
}

/**
 * 산책 통계 정보를 표시하는 컴포넌트
 * 거리, 시간, 평균 페이스를 실시간으로 보여줍니다
 */
export function WalkTrackerStats({
	distance,
	elapsedMs,
	layout = "grid",
	showExtended = false,
	loading = false,
}: WalkTrackerStatsProps) {
	// 통계 데이터 계산
	const stats = React.useMemo(
		() => ({
			time: formatElapsedTime(elapsedMs),
			distance: formatDistance(distance),
			pace: calculatePace(elapsedMs, distance),
			speed: calculateSpeed(distance, elapsedMs),
		}),
		[distance, elapsedMs]
	);

	// 기본 통계 항목들
	const basicStats = [
		{
			title: "시간",
			value: stats.time,
			icon: Clock,
			iconColor: "text-blue-500",
			backgroundColor: "bg-blue-50",
		},
		{
			title: "거리",
			value: stats.distance,
			icon: Route,
			iconColor: "text-green-500",
			backgroundColor: "bg-green-50",
		},
	];

	// 확장 통계 항목들
	const extendedStats = [
		{
			title: "평균 속도",
			value: stats.speed,
			icon: Activity,
			iconColor: "text-purple-500",
			backgroundColor: "bg-purple-50",
		},
	];

	const allStats = showExtended ? [...basicStats, ...extendedStats] : basicStats;

	// 컴팩트 레이아웃 (1x4 또는 2x2)
	if (layout === "compact") {
		return (
			<div className="space-y-2">
				<div className="grid grid-cols-2 gap-2">
					{allStats.slice(0, 2).map((stat, index) => (
						<StatCardHorizontal key={index} {...stat} loading={loading} />
					))}
				</div>
				{allStats.length > 2 && (
					<div className="grid grid-cols-2 gap-2">
						{allStats.slice(2).map((stat, index) => (
							<StatCardHorizontal key={index + 2} {...stat} loading={loading} />
						))}
					</div>
				)}
			</div>
		);
	}

	// 가로형 레이아웃
	if (layout === "horizontal") {
		return (
			<div className="space-y-3">
				{allStats.map((stat, index) => (
					<StatCardHorizontal key={index} {...stat} loading={loading} />
				))}
			</div>
		);
	}

	// 기본 그리드 레이아웃
	const gridCols = showExtended ? "grid-cols-2" : "grid-cols-2";

	return (
		<div className={`grid ${gridCols} gap-3`}>
			{allStats.map((stat, index) => (
				<StatCard key={index} {...stat} loading={loading} />
			))}
		</div>
	);
}
