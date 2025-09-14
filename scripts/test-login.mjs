#!/usr/bin/env node
import { AuthService } from "../app/_libs/authService.js";

async function testLogin() {
	console.log("🧪 로그인 API 직접 테스트");

	try {
		console.log("📤 로그인 요청: test@example.com / password123");
		const result = await AuthService.login("test@example.com", "password123");
		console.log("✅ 로그인 성공:", result);
	} catch (error) {
		console.error("❌ 로그인 실패:", error.message);
		console.error("상세 에러:", error);
	}
}

testLogin().catch(console.error);
