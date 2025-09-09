import { validateSignupForm } from "./validation";
import { SignupFormData } from "@/app/_types/auth";

// 간단한 테스트 함수들
const runValidationTests = () => {
	console.log("🧪 Validation Tests 시작...");

	const validData: SignupFormData = {
		name: "홍길동",
		email: "test@example.com",
		password: "password123",
		confirmPassword: "password123",
	};

	// 테스트 1: 유효한 데이터
	const test1 = validateSignupForm(validData, true);
	console.log("✅ 유효한 데이터:", test1 === null ? "PASS" : "FAIL");

	// 테스트 2: 이름 없음
	const test2 = validateSignupForm({ ...validData, name: "" }, true);
	console.log("✅ 이름 없음:", test2?.includes("모든 필드") ? "PASS" : "FAIL");

	// 테스트 3: 비밀번호 불일치
	const test3 = validateSignupForm({ ...validData, confirmPassword: "different" }, true);
	console.log("✅ 비밀번호 불일치:", test3?.includes("일치하지 않습니다") ? "PASS" : "FAIL");

	// 테스트 4: 약관 미동의
	const test4 = validateSignupForm(validData, false);
	console.log("✅ 약관 미동의:", test4?.includes("이용약관") ? "PASS" : "FAIL");

	// 테스트 5: 잘못된 이메일
	const test5 = validateSignupForm({ ...validData, email: "invalid-email" }, true);
	console.log("✅ 잘못된 이메일:", test5?.includes("이메일 형식") ? "PASS" : "FAIL");

	console.log("🎉 Validation Tests 완료!\n");
};

// 테스트 실행
if (typeof window === "undefined") {
	// Node.js 환경에서만 실행
	runValidationTests();
}

export { runValidationTests };
