import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Textarea } from "@/app/_components/ui/CTextarea";

describe("Textarea 컴포넌트", () => {
	describe("렌더링", () => {
		it("텍스트 영역이 정상적으로 렌더링된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toBeInTheDocument();
		});

		it("textarea 태그로 렌더링된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea.tagName).toBe("TEXTAREA");
		});

		it("data-slot 속성이 설정된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("data-slot", "textarea");
		});
	});

	describe("기본 스타일링", () => {
		it("기본 스타일 클래스가 적용된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			expect(textarea).toHaveClass("border-input");
			expect(textarea).toHaveClass("flex");
			expect(textarea).toHaveClass("field-sizing-content");
			expect(textarea).toHaveClass("min-h-16");
			expect(textarea).toHaveClass("w-full");
			expect(textarea).toHaveClass("rounded-md");
			expect(textarea).toHaveClass("border");
			expect(textarea).toHaveClass("bg-transparent");
			expect(textarea).toHaveClass("px-3");
			expect(textarea).toHaveClass("py-2");
			expect(textarea).toHaveClass("text-base");
			expect(textarea).toHaveClass("shadow-xs");
			expect(textarea).toHaveClass("outline-none");
		});

		it("포커스 스타일 클래스가 포함된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			expect(textarea).toHaveClass("focus-visible:border-ring");
			expect(textarea).toHaveClass("focus-visible:ring-ring/50");
			expect(textarea).toHaveClass("focus-visible:ring-[3px]");
		});

		it("disabled 스타일 클래스가 포함된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			expect(textarea).toHaveClass("disabled:cursor-not-allowed");
			expect(textarea).toHaveClass("disabled:opacity-50");
		});

		it("유효성 검사 오류 스타일 클래스가 포함된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			expect(textarea).toHaveClass("aria-invalid:ring-destructive/20");
			expect(textarea).toHaveClass("dark:aria-invalid:ring-destructive/40");
			expect(textarea).toHaveClass("aria-invalid:border-destructive");
		});

		it("placeholder 스타일 클래스가 포함된다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			expect(textarea).toHaveClass("placeholder:text-muted-foreground");
		});
	});

	describe("속성 전달", () => {
		it("placeholder가 올바르게 설정된다", () => {
			render(<Textarea placeholder="내용을 입력하세요" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("placeholder", "내용을 입력하세요");
		});

		it("value가 올바르게 설정된다", () => {
			render(<Textarea value="테스트 내용" data-testid="textarea" readOnly />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveValue("테스트 내용");
		});

		it("defaultValue가 올바르게 설정된다", () => {
			render(<Textarea defaultValue="기본 내용" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveValue("기본 내용");
		});

		it("disabled 속성이 올바르게 설정된다", () => {
			render(<Textarea disabled data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toBeDisabled();
		});

		it("readOnly 속성이 올바르게 설정된다", () => {
			render(<Textarea readOnly data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("readOnly");
		});

		it("required 속성이 올바르게 설정된다", () => {
			render(<Textarea required data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toBeRequired();
		});

		it("maxLength 속성이 올바르게 설정된다", () => {
			render(<Textarea maxLength={100} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("maxLength", "100");
		});

		it("minLength 속성이 올바르게 설정된다", () => {
			render(<Textarea minLength={10} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("minLength", "10");
		});

		it("rows 속성이 올바르게 설정된다", () => {
			render(<Textarea rows={5} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("rows", "5");
		});

		it("cols 속성이 올바르게 설정된다", () => {
			render(<Textarea cols={30} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("cols", "30");
		});

		it("wrap 속성이 올바르게 설정된다", () => {
			render(<Textarea wrap="hard" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("wrap", "hard");
		});

		it("autoComplete 속성이 올바르게 설정된다", () => {
			render(<Textarea autoComplete="off" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("autoComplete", "off");
		});

		it("autoFocus 속성이 올바르게 설정된다", () => {
			render(<Textarea autoFocus data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveFocus();
		});
	});

	describe("CSS 클래스 커스터마이제이션", () => {
		it("추가 className이 적용된다", () => {
			render(<Textarea className="custom-class" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveClass("custom-class");
			expect(textarea).toHaveClass("flex"); // 기본 클래스도 유지
		});

		it("기본 클래스를 오버라이드할 수 있다", () => {
			render(<Textarea className="min-h-32 bg-gray-100" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveClass("min-h-32");
			expect(textarea).toHaveClass("bg-gray-100");
		});
	});

	describe("사용자 상호작용", () => {
		it("텍스트를 입력할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.type(textarea, "안녕하세요");
			expect(textarea).toHaveValue("안녕하세요");
		});

		it("여러 줄 텍스트를 입력할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			const multilineText = "첫 번째 줄\n두 번째 줄\n세 번째 줄";
			await user.type(textarea, multilineText);
			expect(textarea).toHaveValue(multilineText);
		});

		it("엔터키로 새 줄을 생성할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.type(textarea, "첫 줄{Enter}둘째 줄");
			expect(textarea).toHaveValue("첫 줄\n둘째 줄");
		});

		it("텍스트를 선택하고 삭제할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Textarea defaultValue="테스트 내용" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.tripleClick(textarea); // 모든 텍스트 선택
			await user.keyboard("{Delete}");
			expect(textarea).toHaveValue("");
		});
	});

	describe("이벤트 처리", () => {
		it("onChange 이벤트가 올바르게 호출된다", async () => {
			const handleChange = jest.fn();
			const user = userEvent.setup();

			render(<Textarea onChange={handleChange} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.type(textarea, "test");

			expect(handleChange).toHaveBeenCalled();
			expect(textarea).toHaveValue("test");
		});

		it("onFocus 이벤트가 올바르게 호출된다", async () => {
			const handleFocus = jest.fn();
			const user = userEvent.setup();

			render(<Textarea onFocus={handleFocus} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.click(textarea);

			expect(handleFocus).toHaveBeenCalled();
		});

		it("onBlur 이벤트가 올바르게 호출된다", async () => {
			const handleBlur = jest.fn();
			const user = userEvent.setup();

			render(<Textarea onBlur={handleBlur} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.click(textarea);
			await user.tab();

			expect(handleBlur).toHaveBeenCalled();
		});

		it("onKeyDown 이벤트가 올바르게 호출된다", async () => {
			const handleKeyDown = jest.fn();
			const user = userEvent.setup();

			render(<Textarea onKeyDown={handleKeyDown} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.click(textarea);
			await user.keyboard("{Enter}");

			expect(handleKeyDown).toHaveBeenCalled();
		});

		it("onKeyUp 이벤트가 올바르게 호출된다", async () => {
			const handleKeyUp = jest.fn();
			const user = userEvent.setup();

			render(<Textarea onKeyUp={handleKeyUp} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.click(textarea);
			await user.keyboard("a");

			expect(handleKeyUp).toHaveBeenCalled();
		});
	});

	describe("접근성", () => {
		it("aria-label이 올바르게 설정된다", () => {
			render(<Textarea aria-label="의견 작성" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("aria-label", "의견 작성");
		});

		it("aria-describedby가 올바르게 설정된다", () => {
			render(
				<div>
					<Textarea aria-describedby="help-text" data-testid="textarea" />
					<div id="help-text">최대 500자까지 입력 가능합니다</div>
				</div>
			);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("aria-describedby", "help-text");
		});

		it("aria-invalid가 올바르게 설정된다", () => {
			render(<Textarea aria-invalid="true" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("aria-invalid", "true");
		});

		it("role 속성을 설정할 수 있다", () => {
			render(<Textarea role="textbox" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("role", "textbox");
		});

		it("키보드로 접근할 수 있다", async () => {
			const user = userEvent.setup();
			render(
				<div>
					<button>이전 요소</button>
					<Textarea data-testid="textarea" />
					<button>다음 요소</button>
				</div>
			);

			await user.tab();
			await user.tab();

			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveFocus();
		});
	});

	describe("폼 통합", () => {
		it("name 속성이 올바르게 설정된다", () => {
			render(<Textarea name="comment" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("name", "comment");
		});

		it("id 속성이 올바르게 설정된다", () => {
			render(<Textarea id="user-comment" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("id", "user-comment");
		});

		it("form 속성이 올바르게 설정된다", () => {
			render(<Textarea form="feedback-form" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveAttribute("form", "feedback-form");
		});
	});

	describe("제어 및 비제어 모드", () => {
		it("제어 컴포넌트로 사용할 수 있다", async () => {
			const ControlledTextarea = () => {
				const [value, setValue] = useState("");
				return <Textarea value={value} onChange={e => setValue(e.target.value)} data-testid="controlled-textarea" />;
			};

			const user = userEvent.setup();
			render(<ControlledTextarea />);
			const textarea = screen.getByTestId("controlled-textarea");

			await user.type(textarea, "controlled");
			expect(textarea).toHaveValue("controlled");
		});

		it("비제어 컴포넌트로 사용할 수 있다", async () => {
			const user = userEvent.setup();
			render(<Textarea defaultValue="uncontrolled" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.clear(textarea);
			await user.type(textarea, "changed");
			expect(textarea).toHaveValue("changed");
		});
	});

	describe("상태 변화", () => {
		it("disabled 상태에서는 입력이 불가능하다", async () => {
			const user = userEvent.setup();
			render(<Textarea disabled data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.type(textarea, "test");
			expect(textarea).toHaveValue("");
		});

		it("readOnly 상태에서는 입력이 불가능하다", async () => {
			const user = userEvent.setup();
			render(<Textarea readOnly value="readonly content" data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.type(textarea, "test");
			expect(textarea).toHaveValue("readonly content");
		});

		it("maxLength 제한이 적용된다", async () => {
			const user = userEvent.setup();
			render(<Textarea maxLength={5} data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");

			await user.type(textarea, "12345678");
			expect(textarea).toHaveValue("12345");
		});
	});

	describe("다양한 사용 시나리오", () => {
		it("댓글 입력으로 사용할 수 있다", () => {
			render(
				<div>
					<label htmlFor="comment">댓글 작성</label>
					<Textarea
						id="comment"
						name="comment"
						placeholder="댓글을 입력하세요"
						maxLength={500}
						rows={4}
						data-testid="comment-textarea"
					/>
				</div>
			);

			const textarea = screen.getByTestId("comment-textarea");
			expect(textarea).toHaveAttribute("id", "comment");
			expect(textarea).toHaveAttribute("placeholder", "댓글을 입력하세요");
			expect(textarea).toHaveAttribute("maxLength", "500");
			expect(textarea).toHaveAttribute("rows", "4");
		});

		it("피드백 폼으로 사용할 수 있다", () => {
			render(
				<div>
					<label htmlFor="feedback">피드백</label>
					<Textarea
						id="feedback"
						name="feedback"
						placeholder="개선사항이나 문의사항을 작성해주세요"
						required
						minLength={10}
						aria-describedby="feedback-help"
						data-testid="feedback-textarea"
					/>
					<div id="feedback-help">최소 10자 이상 작성해주세요</div>
				</div>
			);

			const textarea = screen.getByTestId("feedback-textarea");
			expect(textarea).toBeRequired();
			expect(textarea).toHaveAttribute("minLength", "10");
			expect(textarea).toHaveAttribute("aria-describedby", "feedback-help");
		});

		it("메모 작성으로 사용할 수 있다", () => {
			render(
				<div>
					<label htmlFor="memo">메모</label>
					<Textarea
						id="memo"
						name="memo"
						placeholder="메모를 작성하세요"
						wrap="soft"
						autoComplete="off"
						data-testid="memo-textarea"
					/>
				</div>
			);

			const textarea = screen.getByTestId("memo-textarea");
			expect(textarea).toHaveAttribute("wrap", "soft");
			expect(textarea).toHaveAttribute("autoComplete", "off");
		});

		it("긴 텍스트 입력으로 사용할 수 있다", () => {
			render(
				<div>
					<label htmlFor="description">상세 설명</label>
					<Textarea
						id="description"
						name="description"
						placeholder="상세한 설명을 입력하세요"
						rows={8}
						cols={50}
						maxLength={2000}
						aria-describedby="description-counter"
						data-testid="description-textarea"
					/>
					<div id="description-counter">최대 2000자까지 입력 가능</div>
				</div>
			);

			const textarea = screen.getByTestId("description-textarea");
			expect(textarea).toHaveAttribute("rows", "8");
			expect(textarea).toHaveAttribute("cols", "50");
			expect(textarea).toHaveAttribute("maxLength", "2000");
		});
	});

	describe("리사이징", () => {
		it("field-sizing-content 클래스로 자동 크기 조정이 가능하다", () => {
			render(<Textarea data-testid="textarea" />);
			const textarea = screen.getByTestId("textarea");
			expect(textarea).toHaveClass("field-sizing-content");
		});

		it("고정 크기로 설정할 수 있다", () => {
			render(<Textarea className="resize-none" rows={5} data-testid="fixed-textarea" />);
			const textarea = screen.getByTestId("fixed-textarea");
			expect(textarea).toHaveClass("resize-none");
			expect(textarea).toHaveAttribute("rows", "5");
		});
	});
});
