import { ManualGpsControl } from "@/app/_components/map/ManualGpsControl";

interface WalkTrackerManualProps {
	manualMode: boolean;
	manualLatLng: { lat: number; lng: number } | null;
	onManualLatLngChange: (latLng: { lat: number; lng: number }) => void;
	onManualMove: (next: { lat: number; lng: number }) => void;
	delta: number;
}

/**
 * 수동 GPS 모드에서 키보드로 위치를 조작하는 컴포넌트
 * 수동 모드가 활성화된 경우에만 표시됩니다
 */
export function WalkTrackerManual({
	manualMode,
	manualLatLng,
	onManualLatLngChange,
	onManualMove,
	delta,
}: WalkTrackerManualProps) {
	if (!manualMode || !manualLatLng) {
		return null;
	}

	return (
		<ManualGpsControl
			manualLatLng={manualLatLng}
			setManualLatLng={onManualLatLngChange}
			setLocation={() => {}}
			DELTA={delta}
			onMove={onManualMove}
		/>
	);
}
