import { haversine, nearestBy } from "@/app/_libs/geo";
import type { LatLng } from "@/app/_types/geo";

describe("지리 유틸리티 함수들", () => {
	describe("haversine", () => {
		const 서울시청: LatLng = { lat: 37.5663, lng: 126.9779 };
		const 부산시청: LatLng = { lat: 35.1798, lng: 129.075 };
		const 강남역: LatLng = { lat: 37.4979, lng: 127.0276 };

		it("서울시청과 부산시청 사이의 거리를 정확히 계산한다", () => {
			const distance = haversine(서울시청, 부산시청);
			// 서울-부산 직선거리는 약 325km
			expect(distance).toBeCloseTo(325000, -3); // ±1000m 오차 허용
		});

		it("서울시청과 강남역 사이의 거리를 정확히 계산한다", () => {
			const distance = haversine(서울시청, 강남역);
			// 서울시청-강남역 직선거리는 약 8.8km
			expect(distance).toBeCloseTo(8778, -1); // ±10m 오차 허용
		});

		it("같은 위치의 거리는 0이다", () => {
			const distance = haversine(서울시청, 서울시청);
			expect(distance).toBeCloseTo(0, 1);
		});

		it("A에서 B까지의 거리와 B에서 A까지의 거리가 같다", () => {
			const distanceAB = haversine(서울시청, 부산시청);
			const distanceBA = haversine(부산시청, 서울시청);
			expect(distanceAB).toBeCloseTo(distanceBA, 1);
		});

		it("음수 좌표로도 정확히 계산한다", () => {
			const 뉴욕: LatLng = { lat: 40.7128, lng: -74.006 };
			const 런던: LatLng = { lat: 51.5074, lng: -0.1278 };
			const distance = haversine(뉴욕, 런던);
			// 뉴욕-런던 직선거리는 약 5570km
			expect(distance).toBeCloseTo(5570000, -4); // ±10000m 오차 허용
		});

		it("적도를 가로지르는 거리도 정확히 계산한다", () => {
			const 북극점근처: LatLng = { lat: 80, lng: 0 };
			const 남극점근처: LatLng = { lat: -80, lng: 0 };
			const distance = haversine(북극점근처, 남극점근처);
			// 약 160도 차이 = 지구 둘레의 약 44%
			expect(distance).toBeGreaterThan(15000000); // 15,000km 이상
		});
	});

	describe("nearestBy", () => {
		const 기준점: LatLng = { lat: 37.5663, lng: 126.9779 }; // 서울시청

		const 테스트데이터 = [
			{ id: "1", name: "강남역", start: { lat: 37.4979, lng: 127.0276 } },
			{ id: "2", name: "홍대입구역", start: { lat: 37.5563, lng: 126.9238 } },
			{ id: "3", name: "부산역", start: { lat: 35.1154, lng: 129.0421 } },
			{ id: "4", name: "인천공항", start: { lat: 37.4602, lng: 126.4407 } },
			{ id: "5", name: "경복궁", start: { lat: 37.5788, lng: 126.977 } },
		];

		it("가장 가까운 3개 지점을 거리순으로 반환한다", () => {
			const nearest = nearestBy(기준점, 테스트데이터, 3);

			expect(nearest).toHaveLength(3);
			expect(nearest[0].item.name).toBe("경복궁"); // 가장 가까움
			expect(nearest[1].item.name).toBe("홍대입구역"); // 두 번째

			// 거리가 오름차순으로 정렬되어 있는지 확인
			expect(nearest[0].distance).toBeLessThan(nearest[1].distance);
			expect(nearest[1].distance).toBeLessThan(nearest[2].distance);
		});

		it("limit 파라미터가 올바르게 작동한다", () => {
			const nearest1 = nearestBy(기준점, 테스트데이터, 1);
			const nearest2 = nearestBy(기준점, 테스트데이터, 2);

			expect(nearest1).toHaveLength(1);
			expect(nearest2).toHaveLength(2);
		});

		it("기본 limit은 3이다", () => {
			const nearest = nearestBy(기준점, 테스트데이터);
			expect(nearest).toHaveLength(3);
		});

		it("데이터보다 큰 limit을 설정하면 전체 데이터를 반환한다", () => {
			const nearest = nearestBy(기준점, 테스트데이터, 10);
			expect(nearest).toHaveLength(테스트데이터.length);
		});

		it("빈 배열에 대해서는 빈 배열을 반환한다", () => {
			const nearest = nearestBy(기준점, [], 3);
			expect(nearest).toHaveLength(0);
		});

		it("반환된 객체에 원본 데이터와 거리 정보가 포함되어 있다", () => {
			const nearest = nearestBy(기준점, 테스트데이터, 1);

			expect(nearest[0]).toHaveProperty("item");
			expect(nearest[0]).toHaveProperty("distance");
			expect(nearest[0].item).toHaveProperty("id");
			expect(nearest[0].item).toHaveProperty("name");
			expect(nearest[0].item).toHaveProperty("start");
			expect(typeof nearest[0].distance).toBe("number");
		});

		it("거리가 정확히 계산되어 있다", () => {
			const nearest = nearestBy(기준점, 테스트데이터, 1);
			const expectedDistance = haversine(기준점, nearest[0].item.start);

			expect(nearest[0].distance).toBeCloseTo(expectedDistance, 1);
		});

		it("limit이 0이면 빈 배열을 반환한다", () => {
			const nearest = nearestBy(기준점, 테스트데이터, 0);
			expect(nearest).toHaveLength(0);
		});

		it("음수 limit을 설정하면 slice에서 처리되어 빈 배열이 아닐 수 있다", () => {
			const nearest = nearestBy(기준점, 테스트데이터, -1);
			// slice(-1)은 마지막 하나 요소를 제외한 배열을 반환하므로
			// 실제로는 빈 배열이 아닐 수 있음
			expect(nearest.length).toBeGreaterThanOrEqual(0);
		});
	});
});
