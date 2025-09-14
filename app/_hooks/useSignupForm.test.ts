import { renderHook, act } from "@testing-library/react";
import { useSignupForm } from "./useSignupForm";
import { AuthService } from "@/app/_libs/authService";
import { useAuth } from "@/app/_providers/AuthProvider";

jest.mock("@/app/_libs/authService");
jest.mock("@/app/_providers/AuthProvider");

const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockRouterPush,
	}),
}));

const mockLogin = jest.fn();
const mockedAuthService = AuthService as jest.Mocked<typeof AuthService>;
const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("useSignupForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedUseAuth.mockReturnValue({
			isLoggedIn: false,
			isLoading: false,
			login: mockLogin,
			logout: jest.fn(),
			checkAuthStatus: jest.fn(),
		});
	});

	it("should initialize with correct default values", () => {
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

	it("should handle input changes", () => {
		const { result } = renderHook(() => useSignupForm());

		act(() => {
			result.current.handleInputChange({
				target: { id: "name", value: "테스트유저" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.formData.name).toBe("테스트유저");
	});

	it("should handle successful signup with auto login", async () => {
		mockedAuthService.signup.mockResolvedValueOnce({ message: "회원가입 성공" });
		mockedAuthService.login.mockResolvedValueOnce({ message: "로그인 성공" });

		const { result } = renderHook(() => useSignupForm());

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

		await act(async () => {
			await result.current.handleSubmit({
				preventDefault: jest.fn(),
			} as unknown as React.FormEvent);
		});

		expect(mockedAuthService.signup).toHaveBeenCalledWith({
			name: "홍길동",
			email: "test@example.com",
			password: "password123",
		});
		expect(mockedAuthService.login).toHaveBeenCalledWith("test@example.com", "password123");
		expect(mockLogin).toHaveBeenCalled();
		expect(mockRouterPush).toHaveBeenCalledWith("/");
	});
});
