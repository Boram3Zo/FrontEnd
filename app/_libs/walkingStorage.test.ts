import { saveLatestSession, loadLatestSession, clearLatestSession } from "@/app/_libs/walkingStorage";
import type { WalkingSession } from "@/app/_types/walking";

// sessionStorage 모킹
const mockSessionStorage = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: jest.fn((key: string) => store[key] || null),
		setItem: jest.fn((key: string, value: string) => {
			store[key] = value;
		}),
		removeItem: jest.fn((key: string) => {
			delete store[key];
		}),
		clear: jest.fn(() => {
			store = {};
		}),
	};
})();

// 전역 sessionStorage 모킹
Object.defineProperty(window, "sessionStorage", {
	value: mockSessionStorage,
});

describe("산책 세션 저장소 함수들", () => {
	const 테스트세션: WalkingSession = {
		id: "test-session-1",
		startTime: "2024-01-15T10:00:00Z",
		endTime: "2024-01-15T11:30:00Z",
		durationSec: 5400, // 90분
		distanceKm: 3.5,
		isActive: false,
		isPaused: false,
		route: [
			{ lat: 37.5663, lng: 126.9779, timestamp: "2024-01-15T10:00:00Z" },
			{ lat: 37.5664, lng: 126.978, timestamp: "2024-01-15T10:15:00Z" },
			{ lat: 37.5665, lng: 126.9781, timestamp: "2024-01-15T10:30:00Z" },
		],
		pins: [
			{ lat: 37.5663, lng: 126.9779, type: "start", timestamp: "2024-01-15T10:00:00Z" },
			{ lat: 37.5665, lng: 126.9781, type: "end", timestamp: "2024-01-15T11:30:00Z" },
		],
	};

	beforeEach(() => {
		// 각 테스트 전에 mock을 초기화
		mockSessionStorage.clear();
		jest.clearAllMocks();
	});

	describe("saveLatestSession", () => {
		it("산책 세션을 sessionStorage에 정상적으로 저장한다", () => {
			saveLatestSession(테스트세션);

			expect(mockSessionStorage.setItem).toHaveBeenCalledWith("walking:latest", JSON.stringify(테스트세션));
		});

		it("여러 번 저장해도 마지막 세션으로 덮어쓴다", () => {
			const 첫번째세션 = { ...테스트세션, id: "session-1" };
			const 두번째세션 = { ...테스트세션, id: "session-2" };

			saveLatestSession(첫번째세션);
			saveLatestSession(두번째세션);

			expect(mockSessionStorage.setItem).toHaveBeenCalledTimes(2);
			expect(mockSessionStorage.setItem).toHaveBeenLastCalledWith("walking:latest", JSON.stringify(두번째세션));
		});

		it("복잡한 객체도 정상적으로 직렬화한다", () => {
			const 복잡한세션: WalkingSession = {
				id: "complex-session",
				startTime: "2024-01-15T09:00:00Z",
				endTime: "2024-01-15T10:00:00Z",
				durationSec: 3600,
				distanceKm: 2.1,
				isActive: true,
				isPaused: false,
				route: [],
				pins: [],
			};

			saveLatestSession(복잡한세션);

			expect(mockSessionStorage.setItem).toHaveBeenCalledWith("walking:latest", JSON.stringify(복잡한세션));
		});
	});

	describe("loadLatestSession", () => {
		it("저장된 세션을 정상적으로 불러온다", () => {
			// 먼저 세션을 저장
			saveLatestSession(테스트세션);

			// 불러오기
			const loadedSession = loadLatestSession();

			expect(loadedSession).toEqual(테스트세션);
			expect(mockSessionStorage.getItem).toHaveBeenCalledWith("walking:latest");
		});

		it("저장된 세션이 없으면 null을 반환한다", () => {
			const loadedSession = loadLatestSession();

			expect(loadedSession).toBeNull();
			expect(mockSessionStorage.getItem).toHaveBeenCalledWith("walking:latest");
		});

		it("잘못된 JSON 데이터가 저장되어 있으면 null을 반환한다", () => {
			// 직접 잘못된 데이터를 저장
			mockSessionStorage.setItem("walking:latest", "invalid json {");

			const loadedSession = loadLatestSession();

			expect(loadedSession).toBeNull();
		});

		it("빈 문자열이 저장되어 있으면 null을 반환한다", () => {
			mockSessionStorage.setItem("walking:latest", "");

			const loadedSession = loadLatestSession();

			expect(loadedSession).toBeNull();
		});

		it("불러온 데이터의 타입이 올바르다", () => {
			saveLatestSession(테스트세션);
			const loadedSession = loadLatestSession();

			expect(loadedSession).toBeDefined();
			expect(typeof loadedSession?.id).toBe("string");
			expect(typeof loadedSession?.startTime).toBe("string");
			expect(typeof loadedSession?.endTime).toBe("string");
			expect(typeof loadedSession?.durationSec).toBe("number");
			expect(typeof loadedSession?.distanceKm).toBe("number");
			expect(typeof loadedSession?.isActive).toBe("boolean");
			expect(typeof loadedSession?.isPaused).toBe("boolean");
			expect(Array.isArray(loadedSession?.route)).toBe(true);
		});
	});

	describe("clearLatestSession", () => {
		it("저장된 세션을 정상적으로 삭제한다", () => {
			// 먼저 세션을 저장
			saveLatestSession(테스트세션);

			// 삭제
			clearLatestSession();

			expect(mockSessionStorage.removeItem).toHaveBeenCalledWith("walking:latest");
		});

		it("삭제 후에는 세션을 불러올 수 없다", () => {
			// 세션 저장 및 삭제
			saveLatestSession(테스트세션);
			clearLatestSession();

			// 불러오기 시도
			const loadedSession = loadLatestSession();

			expect(loadedSession).toBeNull();
		});

		it("저장된 세션이 없어도 에러가 발생하지 않는다", () => {
			expect(() => clearLatestSession()).not.toThrow();
			expect(mockSessionStorage.removeItem).toHaveBeenCalledWith("walking:latest");
		});
	});

	describe("브라우저 환경이 아닌 경우", () => {
		const originalWindow = global.window;

		beforeAll(() => {
			// window 객체를 일시적으로 제거하여 서버 환경을 시뮬레이션
			delete (global as { window?: Window }).window;
		});

		afterAll(() => {
			// window 객체 복원
			global.window = originalWindow;
		});

		it("saveLatestSession이 서버에서 에러를 발생시키지 않는다", () => {
			expect(() => saveLatestSession(테스트세션)).not.toThrow();
		});

		it("loadLatestSession이 서버에서 null을 반환한다", () => {
			const result = loadLatestSession();
			expect(result).toBeNull();
		});

		it("clearLatestSession이 서버에서 에러를 발생시키지 않는다", () => {
			expect(() => clearLatestSession()).not.toThrow();
		});
	});

	describe("통합 시나리오", () => {
		it("저장 → 불러오기 → 삭제 → 불러오기 전체 플로우가 정상 작동한다", () => {
			// 1. 저장
			saveLatestSession(테스트세션);
			let loadedSession = loadLatestSession();
			expect(loadedSession).toEqual(테스트세션);

			// 2. 삭제
			clearLatestSession();
			loadedSession = loadLatestSession();
			expect(loadedSession).toBeNull();

			// 3. 다시 저장
			const 새세션 = { ...테스트세션, id: "new-session" };
			saveLatestSession(새세션);
			loadedSession = loadLatestSession();
			expect(loadedSession).toEqual(새세션);
		});

		it("여러 세션을 저장하면 마지막 세션만 유지된다", () => {
			const 세션들 = [
				{ ...테스트세션, id: "session-1" },
				{ ...테스트세션, id: "session-2" },
				{ ...테스트세션, id: "session-3" },
			];

			세션들.forEach(saveLatestSession);

			const loadedSession = loadLatestSession();
			expect(loadedSession?.id).toBe("session-3");
		});
	});
});
