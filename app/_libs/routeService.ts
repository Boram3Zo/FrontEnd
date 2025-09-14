import { ApiClient } from "@/app/_libs/apiClient";
import { WalkingSession, WalkingPin } from "@/app/_types/walking";

export interface SaveRouteRequest {
	memberId: number;
	title: string;
	region: string;
	duration: string;
	distance: number;
	content: string;
	theme: string;
	hashtagList: string[];
	map: {
		startLatitude: string;
		startLongitude: string;
		endLatitude: string;
		endLongitude: string;
		spots: string;
	};
	photoList: Array<{
		originalName: string;
		fileName: string;
		latitude: string;
		longitude: string;
		imageDescription: string;
		filePath: string;
		file: string;
	}>;
}

export interface SaveRouteResponse {
	success: boolean;
	data: number; // 생성된 게시글/경로 ID
	message?: string | null;
}

/**
 * 산책 경로를 서버에 저장합니다.
 * 세션 데이터를 기반으로 요청 페이로드를 구성합니다.
 */
export async function saveRoute(
	session: WalkingSession,
	pins: WalkingPin[],
	memberId: number,
	title?: string,
	content?: string,
	theme?: string,
	hashtags?: string[]
): Promise<SaveRouteResponse> {
	// 시작/종료 지점 추출
	const startPin = pins.find(p => p.type === "start");
	const endPin = pins.find(p => p.type === "end");

	// 경로 데이터를 JSON 문자열로 변환 (spots 필드용)
	const routeSpots = JSON.stringify(session.route || []);

	// 사진 메타데이터 변환 (현재는 빈 배열, 실제 사진은 upload-photo로 별도 처리)
	const photoList = pins
		.filter(p => p.type === "start") // 예시로 시작점 사진만
		.map(pin => ({
			originalName: "route-photo.jpg",
			fileName: "route-photo.jpg",
			latitude: pin.lat.toString(),
			longitude: pin.lng.toString(),
			imageDescription: pin.addressDetailed?.formatted || "",
			filePath: "",
			file: "", // base64 또는 식별자 (실제 파일은 upload-photo에서 처리)
		}));

	const payload: SaveRouteRequest = {
		memberId,
		title: title || `산책 경로 - ${new Date().toLocaleDateString()}`,
		region: startPin?.addressDetailed?.gu || startPin?.address || "미지정",
		duration: formatDuration(session.durationSec),
		distance: session.distanceKm,
		content: content || `총 거리: ${session.distanceKm}km, 소요시간: ${formatDuration(session.durationSec)}`,
		theme: theme || "일반",
		hashtagList: hashtags || [],
		map: {
			startLatitude: startPin?.lat.toString() || "0",
			startLongitude: startPin?.lng.toString() || "0",
			endLatitude: endPin?.lat.toString() || startPin?.lat.toString() || "0",
			endLongitude: endPin?.lng.toString() || startPin?.lng.toString() || "0",
			spots: routeSpots,
		},
		photoList,
	};

	const response = await ApiClient.post<SaveRouteResponse>("/post/save-route", payload);
	return response;
}

/**
 * 초 단위 지속 시간을 문자열로 포맷팅
 */
function formatDuration(seconds: number): string {
	const h = Math.floor(seconds / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;

	if (h > 0) return `${h}시간 ${m}분 ${s}초`;
	return `${m}분 ${s}초`;
}
