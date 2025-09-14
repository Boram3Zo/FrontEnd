#!/usr/bin/env node

console.log("🧪 세션 기반 로그인 테스트 시작\n");

async function testSessionLogin() {
	const API_BASE = "http://localhost:9988";

	try {
		console.log("📤 로그인 요청...");

		const loginResponse = await fetch(`${API_BASE}/member/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				Accept: "application/json",
			},
			credentials: "include", // 세션 쿠키 포함
			body: JSON.stringify({
				email: "test123@example.com",
				password: "password123",
			}),
		});

		console.log("📋 응답 상태:", loginResponse.status);
		console.log("🍪 응답 헤더 (Set-Cookie):", loginResponse.headers.get("Set-Cookie"));

		if (loginResponse.ok) {
			const result = await loginResponse.json();
			console.log("✅ 로그인 성공:", result);

			// 세션 확인을 위한 추가 요청 (예: 사용자 정보 조회)
			console.log("\n🔍 세션 유지 확인 중...");
			// 추후 인증이 필요한 API가 있다면 여기서 테스트
		} else {
			const error = await loginResponse.text();
			console.error("❌ 로그인 실패:", error);
		}
	} catch (error) {
		console.error("💥 네트워크 에러:", error.message);
	}
}

testSessionLogin().catch(console.error);
