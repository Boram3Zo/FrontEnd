import { Button } from "@/app/_components/ui/Button";

interface WalkTrackerControlsProps {
	paused: boolean;
	tracking: boolean;
	manualMode: boolean;
	onTogglePause: () => void;
	onFinish: () => void;
	onToggleManualMode: () => void;
}

/**
 * 산책 추적 컨트롤 버튼들을 관리하는 컴포넌트
 * 일시정지, 종료, 수동모드 기능을 제공합니다
 */
export function WalkTrackerControls({
	paused,
	tracking,
	manualMode,
	onTogglePause,
	onFinish,
	onToggleManualMode,
}: WalkTrackerControlsProps) {
	return (
		<div className="mt-4 grid grid-cols-3 gap-2">
			<Button variant="secondary" onClick={onTogglePause} disabled={!tracking && !manualMode}>
				{paused ? "재개" : "일시정지"}
			</Button>
			<Button variant="destructive" onClick={onFinish}>
				종료
			</Button>
			{/* 수동 모드: GPS 중엔 전환 불가 */}
			<Button variant="outline" onClick={onToggleManualMode}>
				{manualMode ? "수동 종료" : "수동 측정"}
			</Button>
		</div>
	);
}
