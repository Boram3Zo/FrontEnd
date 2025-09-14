/**
 * 회원가입 후 자동 로그인 기능 테스트
 */

// 회원가입 후 자동 로그인 플로우 테스트
const testSignupAutoLogin = async () => {
	console.log("🧪 회원가입 후 자동 로그인 테스트 시작...");

	// 테스트 데이터
	const testUser = {
		name: "테스트유저" + Date.now(),
		email: `test${Date.now()}@example.com`,
		password: "test123456",
	};

	console.log("📝 테스트 사용자 정보:", {
		name: testUser.name,
		email: testUser.email,
		password: "***********",
	});

	try {
		// 1. 회원가입 API 호출 테스트
		console.log("1️⃣ 회원가입 API 호출...");

		const signupResponse = await fetch("http://localhost:9988/member/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // 쿠키 포함
			body: JSON.stringify(testUser),
		});

		if (!signupResponse.ok) {
			const errorText = await signupResponse.text();
			console.error("❌ 회원가입 실패:", signupResponse.status, errorText);
			return;
		}

		const signupResult = await signupResponse.json();
		console.log("✅ 회원가입 성공:", signupResult);

		// 2. 자동 로그인 테스트 (회원가입과 동일한 정보로 로그인 시도)
		console.log("2️⃣ 자동 로그인 시도...");

		const loginResponse = await fetch("http://localhost:9988/member/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // 쿠키 포함
			body: JSON.stringify({
				email: testUser.email,
				password: testUser.password,
			}),
		});

		if (!loginResponse.ok) {
			const loginErrorText = await loginResponse.text();
			console.error("❌ 자동 로그인 실패:", loginResponse.status, loginErrorText);
			return;
		}

		const loginResult = await loginResponse.json();
		console.log("✅ 자동 로그인 성공:", loginResult);

		// 3. 세션 확인 테스트
		console.log("3️⃣ 로그인 상태 확인...");

		const profileResponse = await fetch("http://localhost:9988/member/profile", {
			method: "GET",
			credentials: "include", // 쿠키 포함
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		if (profileResponse.ok) {
			const profileResult = await profileResponse.json();
			console.log("✅ 세션 확인 성공:", profileResult);
			console.log("🎉 회원가입 후 자동 로그인 플로우 테스트 완료!");
		} else {
			console.error("❌ 세션 확인 실패:", profileResponse.status);
		}
	} catch (error) {
		console.error("🚨 테스트 중 에러 발생:", error);
	}

	console.log("🏁 회원가입 후 자동 로그인 테스트 종료\n");
};

// 브라우저 환경에서 테스트 실행
if (typeof window !== "undefined") {
	// 브라우저 콘솔에서 실행 가능하도록 전역 함수로 등록
	window.testSignupAutoLogin = testSignupAutoLogin;
	console.log("🔧 브라우저 콘솔에서 testSignupAutoLogin() 함수를 실행해보세요!");
}

export { testSignupAutoLogin };
