import { Input } from "@/app/_components/ui/CInput";
import { Clock, Route } from "lucide-react";
import { WalkingSession } from "@/app/_types/walking";

interface ShareCourseDetailsProps {
	session: WalkingSession | null;
	title: string;
	onTitleChange: (title: string) => void;
}

/**
 * 코스 제목과 산책 정보(시간, 거리)를 입력/표시하는 컴포넌트
 * @param session - 산책 세션 데이터
 * @param title - 현재 입력된 제목
 * @param onTitleChange - 제목 변경 핸들러
 */
export function ShareCourseDetails({ session, title, onTitleChange }: ShareCourseDetailsProps) {
	// 실제 세션 데이터에서 시간과 거리 계산 (현재는 임시 하드코딩)
	const duration = session?.durationSec ? Math.round(session.durationSec / 60) : 45;
	const distance = session?.distanceKm ? session.distanceKm.toFixed(1) : "2.3";

	return (
		<div className="px-4 py-4">
			<h3 className="text-base font-semibold text-gray-800 mb-3">게시글 제목</h3>
			<Input
				placeholder="산책 코스의 제목을 입력해주세요"
				className="mb-4"
				value={title}
				onChange={e => onTitleChange(e.target.value)}
			/>

			<h3 className="text-base font-semibold text-gray-800 mb-3">산책 정보</h3>
			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="flex items-center gap-2">
					<Clock className="h-4 w-4 text-gray-600" />
					<span className="text-sm text-gray-600">소요 시간</span>
				</div>
				<div className="flex items-center gap-2">
					<Route className="h-4 w-4 text-gray-600" />
					<span className="text-sm text-gray-600">산책 거리</span>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 mb-4">
				<span className="text-lg font-semibold">{duration}분</span>
				<span className="text-lg font-semibold">{distance}km</span>
			</div>
		</div>
	);
}
