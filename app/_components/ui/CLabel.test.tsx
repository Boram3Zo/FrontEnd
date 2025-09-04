import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Label } from "@/app/_components/ui/CLabel";

describe("Label 컴포넌트", () => {
	describe("렌더링", () => {
		it("라벨이 정상적으로 렌더링된다", () => {
			render(<Label data-testid="label">라벨 텍스트</Label>);
			const label = screen.getByTestId("label");
			expect(label).toBeInTheDocument();
			expect(label).toHaveTextContent("라벨 텍스트");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<Label data-testid="label">라벨</Label>);
			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("data-slot", "label");
		});

		it("자식 요소를 렌더링할 수 있다", () => {
			render(
				<Label data-testid="label">
					<span>아이콘</span>
					<span>텍스트</span>
				</Label>
			);
			expect(screen.getByText("아이콘")).toBeInTheDocument();
			expect(screen.getByText("텍스트")).toBeInTheDocument();
		});
	});

	describe("기본 스타일링", () => {
		it("기본 스타일 클래스가 적용된다", () => {
			render(<Label data-testid="label">라벨</Label>);
			const label = screen.getByTestId("label");

			expect(label).toHaveClass("flex");
			expect(label).toHaveClass("items-center");
			expect(label).toHaveClass("gap-2");
			expect(label).toHaveClass("text-sm");
			expect(label).toHaveClass("leading-none");
			expect(label).toHaveClass("font-medium");
			expect(label).toHaveClass("select-none");
		});

		it("그룹 disabled 상태 스타일 클래스가 포함된다", () => {
			render(<Label data-testid="label">라벨</Label>);
			const label = screen.getByTestId("label");

			expect(label).toHaveClass("group-data-[disabled=true]:pointer-events-none");
			expect(label).toHaveClass("group-data-[disabled=true]:opacity-50");
		});

		it("peer disabled 상태 스타일 클래스가 포함된다", () => {
			render(<Label data-testid="label">라벨</Label>);
			const label = screen.getByTestId("label");

			expect(label).toHaveClass("peer-disabled:cursor-not-allowed");
			expect(label).toHaveClass("peer-disabled:opacity-50");
		});
	});

	describe("속성 전달", () => {
		it("htmlFor 속성이 올바르게 설정된다", () => {
			render(
				<Label htmlFor="input-id" data-testid="label">
					라벨
				</Label>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("for", "input-id");
		});

		it("id 속성이 올바르게 설정된다", () => {
			render(
				<Label id="label-id" data-testid="label">
					라벨
				</Label>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("id", "label-id");
		});

		it("HTML 속성이 전달된다", () => {
			render(
				<Label title="라벨 도움말" data-custom="custom-value" data-testid="label">
					라벨
				</Label>
			);

			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("title", "라벨 도움말");
			expect(label).toHaveAttribute("data-custom", "custom-value");
		});
	});

	describe("CSS 클래스 커스터마이제이션", () => {
		it("추가 className이 적용된다", () => {
			render(
				<Label className="custom-class" data-testid="label">
					라벨
				</Label>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveClass("custom-class");
			expect(label).toHaveClass("flex"); // 기본 클래스도 유지
		});

		it("기본 클래스를 오버라이드할 수 있다", () => {
			render(
				<Label className="text-lg text-red-500" data-testid="label">
					라벨
				</Label>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveClass("text-lg");
			expect(label).toHaveClass("text-red-500");
		});
	});

	describe("사용자 상호작용", () => {
		it("클릭 이벤트가 올바르게 호출된다", async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();

			render(
				<Label onClick={handleClick} data-testid="label">
					클릭 가능한 라벨
				</Label>
			);
			const label = screen.getByTestId("label");

			await user.click(label);
			expect(handleClick).toHaveBeenCalled();
		});

		it("라벨 클릭으로 연결된 input에 포커스를 준다", async () => {
			const user = userEvent.setup();

			render(
				<div>
					<Label htmlFor="test-input" data-testid="label">
						사용자 이름
					</Label>
					<input id="test-input" data-testid="input" />
				</div>
			);

			const label = screen.getByTestId("label");
			const input = screen.getByTestId("input");

			await user.click(label);
			expect(input).toHaveFocus();
		});

		it("라벨 클릭으로 연결된 checkbox의 상태를 변경한다", async () => {
			const user = userEvent.setup();

			render(
				<div>
					<Label htmlFor="test-checkbox" data-testid="label">
						동의합니다
					</Label>
					<input type="checkbox" id="test-checkbox" data-testid="checkbox" />
				</div>
			);

			const label = screen.getByTestId("label");
			const checkbox = screen.getByTestId("checkbox");

			expect(checkbox).not.toBeChecked();

			await user.click(label);
			expect(checkbox).toBeChecked();
		});
	});

	describe("접근성", () => {
		it("aria-label이 올바르게 설정된다", () => {
			render(
				<Label aria-label="필수 입력 필드" data-testid="label">
					이름 *
				</Label>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("aria-label", "필수 입력 필드");
		});

		it("aria-describedby가 올바르게 설정된다", () => {
			render(
				<div>
					<Label aria-describedby="help-text" data-testid="label">
						비밀번호
					</Label>
					<div id="help-text">8자 이상 입력하세요</div>
				</div>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("aria-describedby", "help-text");
		});

		it("role 속성을 설정할 수 있다", () => {
			render(
				<Label role="heading" data-testid="label">
					섹션 제목
				</Label>
			);
			const label = screen.getByTestId("label");
			expect(label).toHaveAttribute("role", "heading");
		});
	});

	describe("폼 요소와의 연결", () => {
		it("input과 올바르게 연결된다", () => {
			render(
				<div>
					<Label htmlFor="username" data-testid="label">
						사용자 이름
					</Label>
					<input id="username" name="username" type="text" />
				</div>
			);

			const label = screen.getByTestId("label");
			const input = screen.getByLabelText("사용자 이름");

			expect(label).toHaveAttribute("for", "username");
			expect(input).toHaveAttribute("id", "username");
		});

		it("textarea와 올바르게 연결된다", () => {
			render(
				<div>
					<Label htmlFor="comment" data-testid="label">
						댓글
					</Label>
					<textarea id="comment" name="comment" />
				</div>
			);

			const label = screen.getByTestId("label");
			const textarea = screen.getByLabelText("댓글");

			expect(label).toHaveAttribute("for", "comment");
			expect(textarea).toHaveAttribute("id", "comment");
		});

		it("select와 올바르게 연결된다", () => {
			render(
				<div>
					<Label htmlFor="country" data-testid="label">
						국가
					</Label>
					<select id="country" name="country">
						<option value="kr">한국</option>
						<option value="us">미국</option>
					</select>
				</div>
			);

			const label = screen.getByTestId("label");
			const select = screen.getByLabelText("국가");

			expect(label).toHaveAttribute("for", "country");
			expect(select).toHaveAttribute("id", "country");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("필수 입력 표시와 함께 사용할 수 있다", () => {
			render(
				<Label htmlFor="required-field" data-testid="label">
					이메일 주소
					<span className="text-red-500" aria-label="필수">
						*
					</span>
				</Label>
			);

			const label = screen.getByTestId("label");
			const asterisk = screen.getByLabelText("필수");

			expect(label).toHaveTextContent("이메일 주소");
			expect(asterisk).toBeInTheDocument();
			expect(asterisk).toHaveClass("text-red-500");
		});

		it("아이콘과 함께 사용할 수 있다", () => {
			render(
				<Label htmlFor="search" data-testid="label">
					<svg data-testid="search-icon" width="16" height="16">
						<path d="M11 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
					</svg>
					검색어
				</Label>
			);

			const label = screen.getByTestId("label");
			const icon = screen.getByTestId("search-icon");

			expect(label).toHaveTextContent("검색어");
			expect(icon).toBeInTheDocument();
		});

		it("도움말 텍스트와 함께 사용할 수 있다", () => {
			render(
				<div>
					<Label htmlFor="password" data-testid="label">
						비밀번호
						<span className="text-xs text-gray-500">(선택사항)</span>
					</Label>
					<input id="password" type="password" />
				</div>
			);

			const label = screen.getByTestId("label");
			expect(label).toHaveTextContent("비밀번호(선택사항)");
		});

		it("그룹 라벨로 사용할 수 있다", () => {
			render(
				<fieldset>
					<legend>
						<Label data-testid="group-label">연락처 정보</Label>
					</legend>
					<div>
						<Label htmlFor="phone">전화번호</Label>
						<input id="phone" type="tel" />
					</div>
					<div>
						<Label htmlFor="email">이메일</Label>
						<input id="email" type="email" />
					</div>
				</fieldset>
			);

			const groupLabel = screen.getByTestId("group-label");
			expect(groupLabel).toHaveTextContent("연락처 정보");
		});

		it("체크박스 그룹과 함께 사용할 수 있다", () => {
			render(
				<div>
					<Label data-testid="group-label">관심 분야</Label>
					<div>
						<Label htmlFor="frontend">
							<input id="frontend" type="checkbox" />
							프론트엔드
						</Label>
					</div>
					<div>
						<Label htmlFor="backend">
							<input id="backend" type="checkbox" />
							백엔드
						</Label>
					</div>
				</div>
			);

			const groupLabel = screen.getByTestId("group-label");
			expect(groupLabel).toHaveTextContent("관심 분야");
			expect(screen.getByLabelText("프론트엔드")).toBeInTheDocument();
			expect(screen.getByLabelText("백엔드")).toBeInTheDocument();
		});

		it("라디오 버튼 그룹과 함께 사용할 수 있다", () => {
			render(
				<div>
					<Label data-testid="group-label">선호하는 연락 방법</Label>
					<div>
						<Label htmlFor="email-contact">
							<input id="email-contact" type="radio" name="contact" value="email" />
							이메일
						</Label>
					</div>
					<div>
						<Label htmlFor="phone-contact">
							<input id="phone-contact" type="radio" name="contact" value="phone" />
							전화
						</Label>
					</div>
				</div>
			);

			const groupLabel = screen.getByTestId("group-label");
			expect(groupLabel).toHaveTextContent("선호하는 연락 방법");
			expect(screen.getByLabelText("이메일")).toBeInTheDocument();
			expect(screen.getByLabelText("전화")).toBeInTheDocument();
		});
	});

	describe("상태 변화", () => {
		it("disabled peer 요소와 함께 사용될 때 스타일이 적용된다", () => {
			render(
				<div>
					<input className="peer" disabled data-testid="input" />
					<Label data-testid="label">비활성화된 필드</Label>
				</div>
			);

			const label = screen.getByTestId("label");
			expect(label).toHaveClass("peer-disabled:cursor-not-allowed");
			expect(label).toHaveClass("peer-disabled:opacity-50");
		});

		it("그룹 disabled 상태에서 적절한 스타일이 적용된다", () => {
			render(
				<div className="group" data-disabled="true">
					<Label data-testid="label">그룹 비활성화</Label>
				</div>
			);

			const label = screen.getByTestId("label");
			expect(label).toHaveClass("group-data-[disabled=true]:pointer-events-none");
			expect(label).toHaveClass("group-data-[disabled=true]:opacity-50");
		});
	});

	describe("키보드 접근성", () => {
		it("탭으로 접근할 수 있다", async () => {
			const user = userEvent.setup();

			render(
				<div>
					<button>이전 요소</button>
					<Label tabIndex={0} data-testid="label">
						포커스 가능한 라벨
					</Label>
					<button>다음 요소</button>
				</div>
			);

			await user.tab();
			await user.tab();

			const label = screen.getByTestId("label");
			expect(label).toHaveFocus();
		});

		it("엔터키로 클릭할 수 있다", async () => {
			const handleClick = jest.fn();
			const user = userEvent.setup();

			render(
				<Label
					tabIndex={0}
					onClick={handleClick}
					onKeyDown={e => e.key === "Enter" && handleClick()}
					data-testid="label"
				>
					키보드 클릭 가능
				</Label>
			);

			const label = screen.getByTestId("label");
			label.focus();

			await user.keyboard("{Enter}");
			expect(handleClick).toHaveBeenCalled();
		});
	});
});
