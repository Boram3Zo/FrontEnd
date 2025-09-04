import { render, screen } from "@testing-library/react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
	CardFooter,
} from "@/app/_components/ui/CCard";

describe("Card 컴포넌트", () => {
	describe("Card 기본 컴포넌트", () => {
		it("카드가 정상적으로 렌더링된다", () => {
			render(<Card data-testid="card">카드 내용</Card>);
			const card = screen.getByTestId("card");
			expect(card).toBeInTheDocument();
			expect(card).toHaveTextContent("카드 내용");
		});

		it("div 태그로 렌더링된다", () => {
			render(<Card data-testid="card">테스트</Card>);
			const card = screen.getByTestId("card");
			expect(card.tagName).toBe("DIV");
		});

		it("기본 스타일 클래스가 적용된다", () => {
			render(<Card data-testid="card">스타일 테스트</Card>);
			const card = screen.getByTestId("card");

			expect(card).toHaveClass("bg-card");
			expect(card).toHaveClass("text-card-foreground");
			expect(card).toHaveClass("flex");
			expect(card).toHaveClass("flex-col");
			expect(card).toHaveClass("gap-6");
			expect(card).toHaveClass("rounded-xl");
			expect(card).toHaveClass("border");
			expect(card).toHaveClass("py-6");
			expect(card).toHaveClass("shadow-sm");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<Card data-testid="card">슬롯 테스트</Card>);
			const card = screen.getByTestId("card");
			expect(card).toHaveAttribute("data-slot", "card");
		});

		it("추가 className이 적용된다", () => {
			render(
				<Card className="custom-class" data-testid="card">
					커스텀 카드
				</Card>
			);
			const card = screen.getByTestId("card");
			expect(card).toHaveClass("custom-class");
			expect(card).toHaveClass("bg-card"); // 기본 클래스도 유지
		});

		it("HTML 속성이 전달된다", () => {
			render(
				<Card id="test-card" title="카드 설명" data-testid="card">
					속성 테스트
				</Card>
			);

			const card = screen.getByTestId("card");
			expect(card).toHaveAttribute("id", "test-card");
			expect(card).toHaveAttribute("title", "카드 설명");
		});
	});

	describe("CardHeader 컴포넌트", () => {
		it("카드 헤더가 정상적으로 렌더링된다", () => {
			render(<CardHeader data-testid="header">헤더 내용</CardHeader>);
			const header = screen.getByTestId("header");
			expect(header).toBeInTheDocument();
			expect(header).toHaveTextContent("헤더 내용");
		});

		it("헤더 스타일 클래스가 적용된다", () => {
			render(<CardHeader data-testid="header">헤더</CardHeader>);
			const header = screen.getByTestId("header");

			expect(header).toHaveClass("@container/card-header");
			expect(header).toHaveClass("grid");
			expect(header).toHaveClass("auto-rows-min");
			expect(header).toHaveClass("grid-rows-[auto_auto]");
			expect(header).toHaveClass("items-start");
			expect(header).toHaveClass("gap-1.5");
			expect(header).toHaveClass("px-6");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<CardHeader data-testid="header">헤더</CardHeader>);
			const header = screen.getByTestId("header");
			expect(header).toHaveAttribute("data-slot", "card-header");
		});
	});

	describe("CardTitle 컴포넌트", () => {
		it("카드 제목이 정상적으로 렌더링된다", () => {
			render(<CardTitle data-testid="title">카드 제목</CardTitle>);
			const title = screen.getByTestId("title");
			expect(title).toBeInTheDocument();
			expect(title).toHaveTextContent("카드 제목");
		});

		it("제목 스타일 클래스가 적용된다", () => {
			render(<CardTitle data-testid="title">제목</CardTitle>);
			const title = screen.getByTestId("title");

			expect(title).toHaveClass("leading-none");
			expect(title).toHaveClass("font-semibold");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<CardTitle data-testid="title">제목</CardTitle>);
			const title = screen.getByTestId("title");
			expect(title).toHaveAttribute("data-slot", "card-title");
		});
	});

	describe("CardDescription 컴포넌트", () => {
		it("카드 설명이 정상적으로 렌더링된다", () => {
			render(<CardDescription data-testid="description">카드 설명</CardDescription>);
			const description = screen.getByTestId("description");
			expect(description).toBeInTheDocument();
			expect(description).toHaveTextContent("카드 설명");
		});

		it("설명 스타일 클래스가 적용된다", () => {
			render(<CardDescription data-testid="description">설명</CardDescription>);
			const description = screen.getByTestId("description");

			expect(description).toHaveClass("text-muted-foreground");
			expect(description).toHaveClass("text-sm");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<CardDescription data-testid="description">설명</CardDescription>);
			const description = screen.getByTestId("description");
			expect(description).toHaveAttribute("data-slot", "card-description");
		});
	});

	describe("CardAction 컴포넌트", () => {
		it("카드 액션이 정상적으로 렌더링된다", () => {
			render(<CardAction data-testid="action">액션 버튼</CardAction>);
			const action = screen.getByTestId("action");
			expect(action).toBeInTheDocument();
			expect(action).toHaveTextContent("액션 버튼");
		});

		it("액션 스타일 클래스가 적용된다", () => {
			render(<CardAction data-testid="action">액션</CardAction>);
			const action = screen.getByTestId("action");

			expect(action).toHaveClass("col-start-2");
			expect(action).toHaveClass("row-span-2");
			expect(action).toHaveClass("row-start-1");
			expect(action).toHaveClass("self-start");
			expect(action).toHaveClass("justify-self-end");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<CardAction data-testid="action">액션</CardAction>);
			const action = screen.getByTestId("action");
			expect(action).toHaveAttribute("data-slot", "card-action");
		});
	});

	describe("CardContent 컴포넌트", () => {
		it("카드 내용이 정상적으로 렌더링된다", () => {
			render(<CardContent data-testid="content">카드 내용</CardContent>);
			const content = screen.getByTestId("content");
			expect(content).toBeInTheDocument();
			expect(content).toHaveTextContent("카드 내용");
		});

		it("내용 스타일 클래스가 적용된다", () => {
			render(<CardContent data-testid="content">내용</CardContent>);
			const content = screen.getByTestId("content");
			expect(content).toHaveClass("px-6");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<CardContent data-testid="content">내용</CardContent>);
			const content = screen.getByTestId("content");
			expect(content).toHaveAttribute("data-slot", "card-content");
		});
	});

	describe("CardFooter 컴포넌트", () => {
		it("카드 푸터가 정상적으로 렌더링된다", () => {
			render(<CardFooter data-testid="footer">푸터 내용</CardFooter>);
			const footer = screen.getByTestId("footer");
			expect(footer).toBeInTheDocument();
			expect(footer).toHaveTextContent("푸터 내용");
		});

		it("푸터 스타일 클래스가 적용된다", () => {
			render(<CardFooter data-testid="footer">푸터</CardFooter>);
			const footer = screen.getByTestId("footer");

			expect(footer).toHaveClass("flex");
			expect(footer).toHaveClass("items-center");
			expect(footer).toHaveClass("px-6");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<CardFooter data-testid="footer">푸터</CardFooter>);
			const footer = screen.getByTestId("footer");
			expect(footer).toHaveAttribute("data-slot", "card-footer");
		});
	});

	describe("통합 카드 구조", () => {
		it("완전한 카드 구조가 올바르게 렌더링된다", () => {
			render(
				<Card data-testid="full-card">
					<CardHeader>
						<CardTitle>카드 제목</CardTitle>
						<CardDescription>카드 설명입니다</CardDescription>
						<CardAction>
							<button>액션</button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<p>이것은 카드의 주요 내용입니다.</p>
					</CardContent>
					<CardFooter>
						<button>확인</button>
						<button>취소</button>
					</CardFooter>
				</Card>
			);

			expect(screen.getByText("카드 제목")).toBeInTheDocument();
			expect(screen.getByText("카드 설명입니다")).toBeInTheDocument();
			expect(screen.getByText("이것은 카드의 주요 내용입니다.")).toBeInTheDocument();
			expect(screen.getByText("확인")).toBeInTheDocument();
			expect(screen.getByText("취소")).toBeInTheDocument();
		});

		it("헤더와 액션이 함께 사용될 때 그리드 레이아웃이 적용된다", () => {
			render(
				<CardHeader data-testid="header-with-action">
					<CardTitle>제목</CardTitle>
					<CardAction data-testid="action">액션</CardAction>
				</CardHeader>
			);

			const header = screen.getByTestId("header-with-action");
			const action = screen.getByTestId("action");

			expect(header).toHaveClass("has-data-[slot=card-action]:grid-cols-[1fr_auto]");
			expect(action).toHaveClass("col-start-2");
		});

		it("border-b 클래스가 있을 때 헤더에 padding-bottom이 적용된다", () => {
			render(
				<Card>
					<CardHeader className="border-b" data-testid="bordered-header">
						<CardTitle>제목</CardTitle>
					</CardHeader>
				</Card>
			);

			const header = screen.getByTestId("bordered-header");
			expect(header).toHaveClass("[.border-b]:pb-6");
		});

		it("border-t 클래스가 있을 때 푸터에 padding-top이 적용된다", () => {
			render(
				<Card>
					<CardFooter className="border-t" data-testid="bordered-footer">
						<button>확인</button>
					</CardFooter>
				</Card>
			);

			const footer = screen.getByTestId("bordered-footer");
			expect(footer).toHaveClass("[.border-t]:pt-6");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("프로필 카드로 사용할 수 있다", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>홍길동</CardTitle>
						<CardDescription>소프트웨어 엔지니어</CardDescription>
					</CardHeader>
					<CardContent>
						<p>React와 TypeScript 전문가</p>
					</CardContent>
					<CardFooter>
						<button>연락하기</button>
					</CardFooter>
				</Card>
			);

			expect(screen.getByText("홍길동")).toBeInTheDocument();
			expect(screen.getByText("소프트웨어 엔지니어")).toBeInTheDocument();
			expect(screen.getByText("React와 TypeScript 전문가")).toBeInTheDocument();
			expect(screen.getByText("연락하기")).toBeInTheDocument();
		});

		it("상품 카드로 사용할 수 있다", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>MacBook Pro</CardTitle>
						<CardDescription>14인치 M3 칩</CardDescription>
						<CardAction>
							<span>₩2,390,000</span>
						</CardAction>
					</CardHeader>
					<CardContent>
						<div>상품 이미지 영역</div>
					</CardContent>
					<CardFooter>
						<button>장바구니 담기</button>
						<button>바로 구매</button>
					</CardFooter>
				</Card>
			);

			expect(screen.getByText("MacBook Pro")).toBeInTheDocument();
			expect(screen.getByText("14인치 M3 칩")).toBeInTheDocument();
			expect(screen.getByText("₩2,390,000")).toBeInTheDocument();
		});

		it("알림 카드로 사용할 수 있다", () => {
			render(
				<Card role="alert" aria-live="polite">
					<CardHeader>
						<CardTitle>새로운 메시지</CardTitle>
						<CardAction>
							<button aria-label="알림 닫기">×</button>
						</CardAction>
					</CardHeader>
					<CardContent>
						<p>김철수님이 메시지를 보냈습니다.</p>
					</CardContent>
				</Card>
			);

			const card = screen.getByRole("alert");
			expect(card).toHaveAttribute("aria-live", "polite");
			expect(screen.getByText("새로운 메시지")).toBeInTheDocument();
			expect(screen.getByLabelText("알림 닫기")).toBeInTheDocument();
		});

		it("통계 카드로 사용할 수 있다", () => {
			render(
				<Card>
					<CardHeader>
						<CardTitle>총 방문자</CardTitle>
						<CardDescription>오늘</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold">1,234</div>
						<div className="text-green-500">+12.5%</div>
					</CardContent>
				</Card>
			);

			expect(screen.getByText("총 방문자")).toBeInTheDocument();
			expect(screen.getByText("1,234")).toBeInTheDocument();
			expect(screen.getByText("+12.5%")).toBeInTheDocument();
		});
	});

	describe("접근성", () => {
		it("role 속성을 설정할 수 있다", () => {
			render(
				<Card role="article" data-testid="article-card">
					<CardTitle>기사 제목</CardTitle>
				</Card>
			);

			const card = screen.getByTestId("article-card");
			expect(card).toHaveAttribute("role", "article");
		});

		it("aria 속성을 설정할 수 있다", () => {
			render(
				<Card aria-labelledby="card-title" aria-describedby="card-desc" data-testid="accessible-card">
					<CardTitle id="card-title">제목</CardTitle>
					<CardDescription id="card-desc">설명</CardDescription>
				</Card>
			);

			const card = screen.getByTestId("accessible-card");
			expect(card).toHaveAttribute("aria-labelledby", "card-title");
			expect(card).toHaveAttribute("aria-describedby", "card-desc");
		});

		it("키보드 내비게이션을 위한 tabIndex를 설정할 수 있다", () => {
			render(
				<Card tabIndex={0} data-testid="focusable-card">
					내용
				</Card>
			);

			const card = screen.getByTestId("focusable-card");
			expect(card).toHaveAttribute("tabIndex", "0");
		});
	});
});
