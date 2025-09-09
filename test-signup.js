#!/usr/bin/env node

// 간단한 회원가입 테스트 실행 스크립트
console.log("🧪 회원가입 기능 테스트 시작\n");

async function runTests() {
	try {
		// 1. Validation 테스트
		console.log("1️⃣ Validation 테스트");
		const { runValidationTests } = require("./app/_utils/validation.test.ts");
		runValidationTests();

		// 2. AuthService 테스트
		console.log("2️⃣ AuthService 테스트");
		const { runAuthServiceTests } = require("./app/_libs/authService.test.ts");
		await runAuthServiceTests();

		// 3. useSignupForm 테스트
		console.log("3️⃣ useSignupForm 테스트");
		const { runAllSignupTests } = require("./app/_hooks/useSignupForm.test.ts");
		await runAllSignupTests();

		console.log("\n🎉 모든 테스트 완료! 회원가입 기능이 정상 작동합니다.");
	} catch (error) {
		console.error("❌ 테스트 실행 중 오류:", error);
		process.exit(1);
	}
}

// 실행
runTests();
