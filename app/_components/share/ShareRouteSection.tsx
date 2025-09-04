import { Card } from "@/app/_components/ui/CCard";
import { MapPin } from "lucide-react";
import RouteMap from "@/app/_components/map/RouteMap";
import { WalkingSession } from "@/app/_types/walking";

interface ShareRouteSectionProps {
	session: WalkingSession | null;
}

/**
 * 산책 루트를 지도로 표시하는 컴포넌트
 * @param session - 산책 세션 데이터 (경로 정보 포함)
 */
export function ShareRouteSection({ session }: ShareRouteSectionProps) {
	return (
		<div className="mb-6">
			<div className="flex items-center gap-2 mb-3">
				<MapPin className="h-5 w-5 text-gray-600" />
				<h3 className="font-medium text-gray-800">산책 루트</h3>
			</div>
			<Card className="p-4 bg-gray-50">
				{session?.route?.length ? (
					<RouteMap height="h-[220px]" route={session.route.map(p => ({ lat: p.lat, lng: p.lng }))} />
				) : (
					<div className="h-32 flex items-center justify-center text-gray-500">표시할 경로가 없습니다.</div>
				)}
			</Card>
		</div>
	);
}
