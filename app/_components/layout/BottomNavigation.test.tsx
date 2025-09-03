import React from "react";
import { render, screen } from "@testing-library/react";
import { BottomNavigation } from "./BottomNavigation";

// Mock Next.js navigation
const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
	usePathname: () => mockUsePathname(),
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

describe("BottomNavigation", () => {
	beforeEach(() => {
		mockUsePathname.mockClear();
	});

	// Rendering Tests
	describe("Rendering", () => {
		it("renders the bottom navigation bar", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("renders all navigation items", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			expect(screen.getByText("홈")).toBeInTheDocument();
			expect(screen.getByText("검색")).toBeInTheDocument();
			expect(screen.getByText("지도")).toBeInTheDocument();
			expect(screen.getByText("마이")).toBeInTheDocument();
		});

		it("renders all icons", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			// Lucide icons are rendered as SVG elements
			const icons = container.querySelectorAll("svg");
			expect(icons).toHaveLength(4);
		});

		it("renders correct navigation links", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			expect(screen.getByRole("link", { name: /홈/i })).toHaveAttribute("href", "/");
			expect(screen.getByRole("link", { name: /검색/i })).toHaveAttribute("href", "/search");
			expect(screen.getByRole("link", { name: /지도/i })).toHaveAttribute("href", "/map");
			expect(screen.getByRole("link", { name: /마이/i })).toHaveAttribute("href", "/my");
		});
	});

	// Active State Tests
	describe("Active State", () => {
		it("marks home as active when on home page", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-orange-500");

			const searchButton = screen.getByRole("button", { name: /검색/i });
			expect(searchButton).toHaveClass("text-gray-600");
		});

		it("marks search as active when on search page", () => {
			mockUsePathname.mockReturnValue("/search");
			render(<BottomNavigation />);

			const searchButton = screen.getByRole("button", { name: /검색/i });
			expect(searchButton).toHaveClass("text-orange-500");

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-gray-600");
		});

		it("marks map as active when on map page", () => {
			mockUsePathname.mockReturnValue("/map");
			render(<BottomNavigation />);

			const mapButton = screen.getByRole("button", { name: /지도/i });
			expect(mapButton).toHaveClass("text-orange-500");

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-gray-600");
		});

		it("marks my as active when on my page", () => {
			mockUsePathname.mockReturnValue("/my");
			render(<BottomNavigation />);

			const myButton = screen.getByRole("button", { name: /마이/i });
			expect(myButton).toHaveClass("text-orange-500");

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-gray-600");
		});

		it("marks search as active when on search subpages", () => {
			mockUsePathname.mockReturnValue("/search/results");
			render(<BottomNavigation />);

			const searchButton = screen.getByRole("button", { name: /검색/i });
			expect(searchButton).toHaveClass("text-orange-500");
		});

		it("marks map as active when on map subpages", () => {
			mockUsePathname.mockReturnValue("/map/details");
			render(<BottomNavigation />);

			const mapButton = screen.getByRole("button", { name: /지도/i });
			expect(mapButton).toHaveClass("text-orange-500");
		});

		it("marks my as active when on my subpages", () => {
			mockUsePathname.mockReturnValue("/my/profile");
			render(<BottomNavigation />);

			const myButton = screen.getByRole("button", { name: /마이/i });
			expect(myButton).toHaveClass("text-orange-500");
		});

		it("only marks home as active on exact home path", () => {
			mockUsePathname.mockReturnValue("/home");
			render(<BottomNavigation />);

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).not.toHaveClass("text-orange-500");
			expect(homeButton).toHaveClass("text-gray-600");
		});
	});

	// isActive Function Logic Tests
	describe("isActive function logic", () => {
		it("activates home only for exact root path", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-orange-500");
		});

		it("does not activate home for paths starting with /", () => {
			mockUsePathname.mockReturnValue("/search");
			render(<BottomNavigation />);

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-gray-600");
		});

		it("activates non-home paths when pathname starts with path", () => {
			mockUsePathname.mockReturnValue("/search/advanced");
			render(<BottomNavigation />);

			const searchButton = screen.getByRole("button", { name: /검색/i });
			expect(searchButton).toHaveClass("text-orange-500");
		});

		it("handles complex nested paths correctly", () => {
			mockUsePathname.mockReturnValue("/my/profile/settings");
			render(<BottomNavigation />);

			const myButton = screen.getByRole("button", { name: /마이/i });
			expect(myButton).toHaveClass("text-orange-500");

			const homeButton = screen.getByRole("button", { name: /홈/i });
			expect(homeButton).toHaveClass("text-gray-600");
		});
	});

	// CSS and Layout Tests
	describe("Styling and Layout", () => {
		it("has fixed position at bottom", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			const nav = container.querySelector("nav");
			expect(nav).toHaveClass("fixed bottom-0 left-0 right-0");
		});

		it("has proper background and border styling", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			const nav = container.querySelector("nav");
			expect(nav).toHaveClass("bg-white border-t border-border shadow-lg");
		});

		it("has proper flex layout for items", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			const flexContainer = container.querySelector(".flex.items-center.justify-around");
			expect(flexContainer).toBeInTheDocument();
			expect(flexContainer).toHaveClass("py-2");
		});

		it("applies ghost variant to all buttons", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const buttons = screen.getAllByRole("button");
			buttons.forEach(button => {
				expect(button).toHaveClass("flex flex-col items-center gap-1 py-3 px-4");
			});
		});

		it("has proper text sizing for labels", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			const labels = container.querySelectorAll(".text-xs");
			expect(labels).toHaveLength(4);
		});

		it("has proper icon sizing", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			const icons = container.querySelectorAll(".h-5.w-5");
			expect(icons).toHaveLength(4);
		});
	});

	// Accessibility Tests
	describe("Accessibility", () => {
		it("has proper navigation landmark", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			expect(screen.getByRole("navigation")).toBeInTheDocument();
		});

		it("has accessible links with proper roles", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const links = screen.getAllByRole("link");
			expect(links).toHaveLength(4);
		});

		it("has accessible buttons within links", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const buttons = screen.getAllByRole("button");
			expect(buttons).toHaveLength(4);
		});

		it("provides text labels for all navigation items", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			expect(screen.getByText("홈")).toBeInTheDocument();
			expect(screen.getByText("검색")).toBeInTheDocument();
			expect(screen.getByText("지도")).toBeInTheDocument();
			expect(screen.getByText("마이")).toBeInTheDocument();
		});
	});

	// Edge Cases
	describe("Edge Cases", () => {
		it("handles undefined pathname gracefully", () => {
			mockUsePathname.mockReturnValue(undefined);
			render(<BottomNavigation />);

			// Should not crash and should render all navigation items
			expect(screen.getByText("홈")).toBeInTheDocument();
			expect(screen.getByText("검색")).toBeInTheDocument();
			expect(screen.getByText("지도")).toBeInTheDocument();
			expect(screen.getByText("마이")).toBeInTheDocument();
		});

		it("handles empty pathname gracefully", () => {
			mockUsePathname.mockReturnValue("");
			render(<BottomNavigation />);

			// Should render without crashing
			expect(screen.getByText("홈")).toBeInTheDocument();
		});

		it("handles pathname with query parameters", () => {
			mockUsePathname.mockReturnValue("/search?q=test");
			render(<BottomNavigation />);

			const searchButton = screen.getByRole("button", { name: /검색/i });
			expect(searchButton).toHaveClass("text-orange-500");
		});

		it("handles pathname with hash fragments", () => {
			mockUsePathname.mockReturnValue("/map#location");
			render(<BottomNavigation />);

			const mapButton = screen.getByRole("button", { name: /지도/i });
			expect(mapButton).toHaveClass("text-orange-500");
		});

		it("handles deep nested paths", () => {
			mockUsePathname.mockReturnValue("/my/profile/settings/notifications/email");
			render(<BottomNavigation />);

			const myButton = screen.getByRole("button", { name: /마이/i });
			expect(myButton).toHaveClass("text-orange-500");
		});

		it("handles paths that don't match any navigation item", () => {
			mockUsePathname.mockReturnValue("/some/unknown/path");
			render(<BottomNavigation />);

			const buttons = screen.getAllByRole("button");
			buttons.forEach(button => {
				expect(button).toHaveClass("text-gray-600");
				expect(button).not.toHaveClass("text-orange-500");
			});
		});
	});

	// Navigation Behavior Tests
	describe("Navigation Behavior", () => {
		it("provides correct href attributes for all links", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const homeLink = screen.getByRole("link", { name: /홈/i });
			const searchLink = screen.getByRole("link", { name: /검색/i });
			const mapLink = screen.getByRole("link", { name: /지도/i });
			const myLink = screen.getByRole("link", { name: /마이/i });

			expect(homeLink).toHaveAttribute("href", "/");
			expect(searchLink).toHaveAttribute("href", "/search");
			expect(mapLink).toHaveAttribute("href", "/map");
			expect(myLink).toHaveAttribute("href", "/my");
		});

		it("maintains link structure with nested button elements", () => {
			mockUsePathname.mockReturnValue("/");
			const { container } = render(<BottomNavigation />);

			const links = container.querySelectorAll("a");
			expect(links).toHaveLength(4);

			links.forEach(link => {
				const button = link.querySelector("button");
				expect(button).toBeInTheDocument();
			});
		});
	});

	// Visual State Tests
	describe("Visual States", () => {
		it("shows active state with orange color", () => {
			mockUsePathname.mockReturnValue("/search");
			render(<BottomNavigation />);

			const activeButton = screen.getByRole("button", { name: /검색/i });
			expect(activeButton).toHaveClass("text-orange-500");
		});

		it("shows inactive state with gray color", () => {
			mockUsePathname.mockReturnValue("/search");
			render(<BottomNavigation />);

			const inactiveButtons = [
				screen.getByRole("button", { name: /홈/i }),
				screen.getByRole("button", { name: /지도/i }),
				screen.getByRole("button", { name: /마이/i }),
			];

			inactiveButtons.forEach(button => {
				expect(button).toHaveClass("text-gray-600");
			});
		});

		it("maintains consistent styling across all navigation items", () => {
			mockUsePathname.mockReturnValue("/");
			render(<BottomNavigation />);

			const buttons = screen.getAllByRole("button");
			buttons.forEach(button => {
				expect(button).toHaveClass("flex flex-col items-center gap-1 py-3 px-4");
			});
		});
	});
});
