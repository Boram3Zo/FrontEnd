/**
 * API 테스트를 위한 예제 코드
 * 실제 사용 시에는 실제 산책 데이터를 사용하세요.
 */

import { createPost } from "@/app/_libs/postService";
import { API_BASE_URL } from "@/app/_constants/api";

// 테스트용 데이터
export const testCreatePost = async () => {
	const testData = {
		postId: null,
		memberId: 1,
		title: "한강공원 산책 코스",
		region: "서울시 마포구",
		duration: "01:30:00",
		distance: 3.5,
		content: "한강공원에서 즐긴 힐링 산책 코스입니다. 날씨가 좋아서 정말 기분 좋은 산책이었어요!",
		theme: "힐링",
		hashtagList: ["산책", "한강", "힐링"],
		map: {
			startLatitude: "37.5665",
			startLongitude: "126.978",
			endLatitude: "37.5675",
			endLongitude: "126.980",
			spots: "37.5665,126.978;37.5670,126.979;37.5675,126.980",
		},
	};

	try {
		console.log("API 요청 시작...");
		console.log("요청 데이터:", testData);

		const result = await createPost(testData);

		console.log("API 응답:", result);

		if (result.success) {
			console.log("✅ 게시글 생성 성공!");
			console.log("생성된 postId:", result.postId);
		} else {
			console.log("❌ 게시글 생성 실패:", result.message);
		}

		return result;
	} catch (error) {
		console.error("❌ API 호출 중 오류:", error);
		throw error;
	}
};

// 브라우저 콘솔에서 테스트하려면:
// testCreatePost();

// cURL 명령어와 동일한 요청을 만드는 함수
export const curlEquivalentTest = () => {
	return fetch(`${API_BASE_URL}/post/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			postId: null,
			memberId: 1,
			title: "",
			region: "",
			duration: "01:30:00",
			distance: 3.5,
			content: "",
			theme: "",
			hashtagList: null,
			map: {
				startLatitude: "37.1234",
				startLongitude: "127.1234",
				endLatitude: "37.1250",
				endLongitude: "127.1250",
				spots: "",
			},
		}),
	})
		.then(response => response.json())
		.then(data => {
			console.log("cURL 테스트 결과:", data);
			return data;
		})
		.catch(error => {
			console.error("cURL 테스트 오류:", error);
			throw error;
		});
};
