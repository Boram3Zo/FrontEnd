import { renderHook, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useSignupForm } from "../useSignupForm";
import { AuthService } from "@/app/_libs/authService";
import { AuthResponse } from "@/app/_types/auth";

// Mock dependencies
jest.mock("next/navigation");
jest.mock("@/app/_libs/authService");

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockAuthService = AuthService as jest.Mocked<typeof AuthService>;

// window.alert 모킹
window.alert = jest.fn();

describe("useSignupForm", () => {
	beforeEach(() => {
		mockUseRouter.mockReturnValue({
			push: mockPush,
		} as unknown as ReturnType<typeof useRouter>);

		jest.clearAllMocks();
	});

	it("초기 상태가 올바르게 설정되어야 한다", () => {
		const { result } = renderHook(() => useSignupForm());

		expect(result.current.formData).toEqual({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBe("");
		expect(result.current.termsAccepted).toBe(false);
	});

	it("입력값 변경이 올바르게 처리되어야 한다", () => {
		const { result } = renderHook(() => useSignupForm());

		act(() => {
			result.current.handleInputChange({
				target: { id: "name", value: "홍길동" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.formData.name).toBe("홍길동");
	});

	it("유효하지 않은 폼 제출 시 에러가 설정되어야 한다", async () => {
		const { result } = renderHook(() => useSignupForm());

		await act(async () => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as React.FormEvent);
		});

		expect(result.current.error).toBe("모든 필드를 입력해주세요.");
		expect(mockAuthService.signup).not.toHaveBeenCalled();
	});

	it("유효한 폼 제출 시 회원가입이 성공해야 한다", async () => {
		const { result } = renderHook(() => useSignupForm());

		// 폼 데이터 설정
		act(() => {
			result.current.handleInputChange({
				target: { id: "name", value: "홍길동" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "email", value: "test@example.com" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "password", value: "password123" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "confirmPassword", value: "password123" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.setTermsAccepted(true);
		});

		// AuthService.signup 모킹
		mockAuthService.signup.mockResolvedValueOnce({
			message: "회원가입 성공",
		});

		await act(async () => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as React.FormEvent);
		});

		expect(mockAuthService.signup).toHaveBeenCalledWith({
			name: "홍길동",
			email: "test@example.com",
			password: "password123",
		});
		expect(window.alert).toHaveBeenCalledWith("회원가입이 완료되었습니다!");
		expect(mockPush).toHaveBeenCalledWith("/login");
		expect(result.current.error).toBe("");
	});

	it("회원가입 실패 시 에러가 설정되어야 한다", async () => {
		const { result } = renderHook(() => useSignupForm());

		// 폼 데이터 설정
		act(() => {
			result.current.handleInputChange({
				target: { id: "name", value: "홍길동" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "email", value: "test@example.com" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "password", value: "password123" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "confirmPassword", value: "password123" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.setTermsAccepted(true);
		});

		const errorMessage = "이미 존재하는 이메일입니다.";
		mockAuthService.signup.mockRejectedValueOnce(new Error(errorMessage));

		await act(async () => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as React.FormEvent);
		});

		expect(result.current.error).toBe(errorMessage);
		expect(mockPush).not.toHaveBeenCalled();
	});

	it("로딩 상태가 올바르게 관리되어야 한다", async () => {
		const { result } = renderHook(() => useSignupForm());

		// 폼 데이터 설정
		act(() => {
			result.current.handleInputChange({
				target: { id: "name", value: "홍길동" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "email", value: "test@example.com" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "password", value: "password123" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.handleInputChange({
				target: { id: "confirmPassword", value: "password123" },
			} as React.ChangeEvent<HTMLInputElement>);
			result.current.setTermsAccepted(true);
		});

		// 지연된 응답 모킹
		let resolveSignup: (value: AuthResponse) => void;
		const signupPromise = new Promise<AuthResponse>(resolve => {
			resolveSignup = resolve;
		});
		mockAuthService.signup.mockReturnValueOnce(signupPromise);

		// 제출 시작
		const submitPromise = act(async () => {
			result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as React.FormEvent);
		});

		// 로딩 상태 확인
		expect(result.current.isLoading).toBe(true);

		// 응답 완료
		resolveSignup!({ message: "성공" });
		await submitPromise;

		expect(result.current.isLoading).toBe(false);
	});
});
