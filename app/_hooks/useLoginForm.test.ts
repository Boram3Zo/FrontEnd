import { renderHook, act } from "@testing-library/react";
import { useLoginForm } from "./useLoginForm";

// AuthService를 모킹합니다
jest.mock("@/app/_libs/authService", () => ({
	AuthService: {
		login: jest.fn(),
	},
}));

// useRouter를 모킹합니다
jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: jest.fn(),
	}),
}));

// localStorage를 모킹합니다
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
	length: 0,
	key: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
});

// alert을 모킹합니다
global.alert = jest.fn();

describe("useLoginForm", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test("초기 상태가 올바르게 설정된다", () => {
		const { result } = renderHook(() => useLoginForm());

		expect(result.current.formData).toEqual({
			email: "",
			password: "",
		});
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBe("");
	});

	test("입력 값이 올바르게 변경된다", () => {
		const { result } = renderHook(() => useLoginForm());

		act(() => {
			result.current.handleInputChange({
				target: { id: "email", value: "test@example.com" },
			} as React.ChangeEvent<HTMLInputElement>);
		});

		expect(result.current.formData.email).toBe("test@example.com");
	});

	test("유효성 검사에 실패하면 에러가 표시된다", async () => {
		const { result } = renderHook(() => useLoginForm());

		const mockEvent = {
			preventDefault: jest.fn(),
		} as unknown as React.FormEvent;

		await act(async () => {
			result.current.handleSubmit(mockEvent);
		});

		expect(result.current.error).toBe("이메일과 비밀번호를 입력해주세요.");
	});
});
