import { useRef, useEffect, forwardRef } from "react";

interface WalkTrackerMapProps {
	onMapLoad: () => void;
}

/**
 * 산책 추적용 Google Maps 컴포넌트
 * 실시간으로 위치를 표시하고 경로를 그려줍니다
 */
export const WalkTrackerMap = forwardRef<HTMLDivElement, WalkTrackerMapProps>(({ onMapLoad }, ref) => {
	useEffect(() => {
		// Google Maps API가 로드된 경우 지도 초기화
		if (window.google && ref && "current" in ref && ref.current) {
			onMapLoad();
		}
	}, [onMapLoad, ref]);

	return <div ref={ref} className="w-full h-[420px] rounded-2xl bg-gray-100" />;
});

WalkTrackerMap.displayName = "WalkTrackerMap";
