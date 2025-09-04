import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "./CHeader";

// Mock Next.js navigation
const mockPush = jest.fn();
const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
		back: mockBack,
	}),
}));

// Next.js Link mock
jest.mock("next/link", () => {
	return function MockLink({
		children,
		href,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		[key: string]: unknown;
	}) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	};
});

describe("Header 컴포넌트", () => {
	beforeEach(() => {
		mockPush.mockClear();
		mockBack.mockClear();
	});

	// 기본 렌더링 테스트
	describe("기본 렌더링", () => {
		it("Header 컴포넌트가 렌더링된다", () => {
			render(<Header />);
			expect(screen.getByRole("banner")).toBeInTheDocument();
		});

		it("로고가 표시된다", () => {
			render(<Header />);
			expect(screen.getByText("치카쿠")).toBeInTheDocument();
		});

		it("검색 입력창이 표시된다", () => {
			render(<Header />);
			expect(screen.getByRole("textbox")).toBeInTheDocument();
			expect(screen.getByPlaceholderText("키워드로 산책 코스를 찾아보세요")).toBeInTheDocument();
		});

		it("카테고리 버튼들이 표시된다", () => {
			render(<Header />);
			expect(screen.getByRole("button", { name: "지역" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "테마" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "캣타워" })).toBeInTheDocument();
		});
	});

	// 네비게이션 테스트
	describe("네비게이션", () => {
		it("로고 클릭 시 홈으로 이동한다", () => {
			render(<Header />);
			const logoLink = screen.getByRole("link", { name: "🐾 치카쿠 🐾" });
			expect(logoLink).toHaveAttribute("href", "/");
		});

		it("지역 버튼이 올바른 링크를 가진다", () => {
			render(<Header />);
			const regionButton = screen.getByRole("button", { name: "지역" });
			const regionLink = regionButton.closest("a");
			expect(regionLink).toHaveAttribute("href", "/region");
		});

		it("테마 버튼이 올바른 링크를 가진다", () => {
			render(<Header />);
			const themeButton = screen.getByRole("button", { name: "테마" });
			const themeLink = themeButton.closest("a");
			expect(themeLink).toHaveAttribute("href", "/theme");
		});

		it("캣타워 버튼이 올바른 링크를 가진다", () => {
			render(<Header />);
			const catTowerButton = screen.getByRole("button", { name: "캣타워" });
			const catTowerLink = catTowerButton.closest("a");
			expect(catTowerLink).toHaveAttribute("href", "/cat-tower");
		});
	});

	// 뒤로가기 버튼 테스트
	describe("뒤로가기 기능", () => {
		it("뒤로가기 버튼이 클릭 가능하다", async () => {
			const user = userEvent.setup();
			render(<Header />);

			const buttons = screen.getAllByRole("button");
			const backButton = buttons[0]; // 첫 번째 버튼이 뒤로가기 버튼

			await user.click(backButton);
			expect(mockBack).toHaveBeenCalledTimes(1);
		});

		it("뒤로가기 아이콘이 표시된다", () => {
			const { container } = render(<Header />);
			const backIcon = container.querySelector(".lucide-arrow-left");
			expect(backIcon).toBeInTheDocument();
		});
	});

	// 메뉴 버튼 테스트
	describe("메뉴 버튼", () => {
		it("메뉴 링크가 올바른 경로를 가진다", () => {
			const { container } = render(<Header />);
			const menuLinks = container.querySelectorAll('a[href="/menu"]');
			expect(menuLinks.length).toBeGreaterThan(0);
		});

		it("메뉴 아이콘이 표시된다", () => {
			const { container } = render(<Header />);
			const menuIcon = container.querySelector(".lucide-menu");
			expect(menuIcon).toBeInTheDocument();
		});
	});

	// 검색 기능 테스트
	describe("검색 기능", () => {
		it("검색 입력창에 텍스트를 입력할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Header />);

			const searchInput = screen.getByRole("textbox");
			await user.type(searchInput, "한강공원");

			expect(searchInput).toHaveValue("한강공원");
		});

		it("검색 아이콘이 표시된다", () => {
			const { container } = render(<Header />);
			const searchIcon = container.querySelector(".lucide-search");
			expect(searchIcon).toBeInTheDocument();
		});
	});

	// 스타일링 테스트
	describe("스타일링", () => {
		it("Header가 올바른 CSS 클래스를 가진다", () => {
			const { container } = render(<Header />);
			const header = container.querySelector("header");
			expect(header).toHaveClass("bg-white border-b border-border sticky top-0 z-50");
		});

		it("로고가 올바른 스타일을 가진다", () => {
			render(<Header />);
			const logoText = screen.getByText("치카쿠");
			expect(logoText).toHaveClass("text-lg font-bold text-primary");
		});

		it("검색 입력창이 올바른 스타일을 가진다", () => {
			render(<Header />);
			const searchInput = screen.getByRole("textbox");
			expect(searchInput).toHaveClass("pl-10 bg-muted/50 border-0 rounded-full");
		});
	});

	// 레이아웃 테스트
	describe("레이아웃", () => {
		it("3행 구조를 가진다", () => {
			const { container } = render(<Header />);

			// 첫 번째 행: 뒤로가기, 로고, 메뉴
			const firstRow = container.querySelector(".flex.items-center.justify-between");
			expect(firstRow).toBeInTheDocument();

			// 두 번째 행: 검색
			const searchContainer = container.querySelector(".px-4.pb-3");
			expect(searchContainer).toBeInTheDocument();

			// 세 번째 행: 카테고리 버튼들
			const categoryRow = container.querySelector(".flex.items-center.justify-around");
			expect(categoryRow).toBeInTheDocument();
		});
	});

	// 접근성 테스트
	describe("접근성", () => {
		it("Header가 banner role을 가진다", () => {
			render(<Header />);
			expect(screen.getByRole("banner")).toBeInTheDocument();
		});

		it("검색 입력창이 textbox role을 가진다", () => {
			render(<Header />);
			expect(screen.getByRole("textbox")).toBeInTheDocument();
		});

		it("모든 버튼이 렌더링된다", () => {
			render(<Header />);
			const buttons = screen.getAllByRole("button");
			expect(buttons.length).toBeGreaterThan(0);
		});
	});

	// 다양한 사용 시나리오
	describe("다양한 사용 시나리오", () => {
		it("모든 네비게이션 요소가 함께 작동한다", () => {
			render(<Header />);

			// 로고가 첫 번째 행에 있음
			expect(screen.getByText("치카쿠")).toBeInTheDocument();

			// 검색 기능이 두 번째 행에 있음
			expect(screen.getByRole("textbox")).toBeInTheDocument();

			// 카테고리 버튼들이 세 번째 행에 있음
			expect(screen.getByRole("button", { name: "지역" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "테마" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "캣타워" })).toBeInTheDocument();
		});

		it("검색과 네비게이션이 독립적으로 작동한다", async () => {
			const user = userEvent.setup();
			render(<Header />);

			// 검색 입력
			const searchInput = screen.getByRole("textbox");
			await user.type(searchInput, "테스트");
			expect(searchInput).toHaveValue("테스트");

			// 네비게이션 버튼들이 여전히 작동하는지 확인
			expect(screen.getByRole("button", { name: "지역" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "테마" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "캣타워" })).toBeInTheDocument();
		});
	});
});
