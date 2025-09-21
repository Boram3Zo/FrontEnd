/**
 * 게시글 데이터 변환 매퍼
 */

import {
	CreatePostRequest,
	SharePostRequest,
	WalkingSession,
	PostCreateOptions,
	PostShareOptions,
} from "@/app/_types/post";
import { formatDuration, getRouteEndpoints, convertRouteToSpots, convertRouteToJsonSpots } from "./postUtils";

/**
 * 산책 세션 데이터를 게시글 생성 요청으로 변환하는 함수
 */
export function convertWalkingSessionToPostRequest(
	session: WalkingSession,
	options: PostCreateOptions
): CreatePostRequest {
	// 시작점과 종료점 추출
	const { startPoint, endPoint } = getRouteEndpoints(session.route);

	// spots 데이터 생성 (샘플링된 경로)
	const spots = convertRouteToSpots(session.route);

	return {
		postId: null,
		memberId: options.memberId,
		title: options.title || `${new Date().toLocaleDateString()} 산책`,
		region: options.region || "알 수 없는 지역",
		duration: formatDuration(session.durationSec),
		distance: session.distanceKm,
		content: options.content || "",
		theme: options.theme || "",
		hashtagList: options.hashtags || null,
		map: {
			startLatitude: startPoint.lat.toString(),
			startLongitude: startPoint.lng.toString(),
			endLatitude: endPoint.lat.toString(),
			endLongitude: endPoint.lng.toString(),
			spots: spots,
		},
	};
}

/**
 * 산책 세션 데이터를 게시글 공유 요청으로 변환하는 함수
 */
export function convertWalkingSessionToShareRequest(
	postId: number,
	session: WalkingSession,
	options: PostShareOptions
): SharePostRequest {
	// 시작점과 종료점 추출
	const { startPoint, endPoint } = getRouteEndpoints(session.route);

	// spots 데이터 생성 (전체 경로의 주요 포인트들)
	const spots = convertRouteToJsonSpots(session.route);

	return {
		postId: postId,
		memberId: options.memberId,
		title: options.title,
		region: options.region || "알 수 없는 지역",
		duration: formatDuration(session.durationSec),
		distance: Math.round(session.distanceKm * 1000), // km를 미터로 변환
		content: options.content,
		theme: options.theme || "",
		hashtagList: options.hashtags || [],
		map: {
			startLatitude: startPoint.lat.toString(),
			startLongitude: startPoint.lng.toString(),
			endLatitude: endPoint.lat.toString(),
			endLongitude: endPoint.lng.toString(),
			spots: spots,
		},
	};
}
