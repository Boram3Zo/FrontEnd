import { saveRoute } from "./routeService";
import { ApiClient } from "./apiClient";

// Mock ApiClient
jest.mock("./apiClient");
const mockApiClient = ApiClient as jest.Mocked<typeof ApiClient>;

describe("routeService", () => {
	beforeEach(() => {
		mockApiClient.post.mockClear();
	});

	describe("saveRoute", () => {
		const mockSession = {
			id: "test-session-id",
			startTime: "2025-09-14T10:00:00.000Z",
			endTime: "2025-09-14T11:00:00.000Z",
			durationSec: 3600,
			distanceKm: 2.5,
			route: [
				{ lat: 37.5665, lng: 126.978, timestamp: "2025-09-14T10:00:00.000Z" },
				{ lat: 37.567, lng: 126.9785, timestamp: "2025-09-14T10:30:00.000Z" },
			],
			pins: [],
			isActive: false,
			isPaused: false,
		};

		const mockPins = [
			{
				lat: 37.5665,
				lng: 126.978,
				type: "start" as const,
				timestamp: "2025-09-14T10:00:00.000Z",
				address: "서울특별시 중구",
				addressDetailed: {
					gu: "중구",
					formatted: "서울특별시 중구 명동길 123",
				},
			},
			{
				lat: 37.567,
				lng: 126.9785,
				type: "end" as const,
				timestamp: "2025-09-14T11:00:00.000Z",
			},
		];

		it("경로 저장이 성공적으로 처리된다", async () => {
			const mockResponse = {
				success: true,
				data: 456,
				message: null,
			};

			mockApiClient.post.mockResolvedValue(mockResponse);

			const result = await saveRoute(mockSession, mockPins, 1, "테스트 경로", "테스트 내용", "휴식", [
				"산책",
				"테스트",
			]);

			expect(mockApiClient.post).toHaveBeenCalledWith("/post/save-route", {
				memberId: 1,
				title: "테스트 경로",
				region: "중구",
				duration: "1시간 0분 0초",
				distance: 2.5,
				content: "테스트 내용",
				theme: "휴식",
				hashtagList: ["산책", "테스트"],
				map: {
					startLatitude: "37.5665",
					startLongitude: "126.978",
					endLatitude: "37.567",
					endLongitude: "126.9785",
					spots: expect.stringContaining("37.5665"),
				},
				photoList: expect.arrayContaining([
					expect.objectContaining({
						originalName: "route-photo.jpg",
						fileName: "route-photo.jpg",
						latitude: "37.5665",
						longitude: "126.978",
					}),
				]),
			});

			expect(result).toEqual(mockResponse);
		});

		it("API 에러가 올바르게 처리된다", async () => {
			const mockError = new Error("Network error");
			mockApiClient.post.mockRejectedValue(mockError);

			await expect(saveRoute(mockSession, mockPins, 1)).rejects.toThrow("Network error");
		});

		it("기본값이 올바르게 설정된다", async () => {
			const mockResponse = { success: true, data: 456, message: null };
			mockApiClient.post.mockResolvedValue(mockResponse);

			await saveRoute(mockSession, mockPins, 1);

			expect(mockApiClient.post).toHaveBeenCalledWith(
				"/post/save-route",
				expect.objectContaining({
					title: expect.stringContaining("산책 경로"),
					theme: "일반",
					hashtagList: [],
				})
			);
		});
	});
});
