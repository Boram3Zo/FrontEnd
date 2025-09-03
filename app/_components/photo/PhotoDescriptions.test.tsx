// __tests__/components/photo/PhotoDescriptions.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhotoDescriptions } from "@/app/_components/photo/PhotoDescriptions";
import { SpotPhoto } from "@/app/_libs/photo/photoTypes";

describe("PhotoDescriptions", () => {
	const mockPhotos: SpotPhoto[] = [
		{
			id: "photo-1",
			file: new File([""], "test1.jpg", { type: "image/jpeg" }),
			preview: "preview-url-1",
			description: "Photo 1 description",
		},
		{
			id: "photo-2",
			file: new File([""], "test2.jpg", { type: "image/jpeg" }),
			preview: "preview-url-2",
			description: "",
		},
	];

	const defaultProps = {
		photos: mockPhotos,
		onUpdateDescription: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render all photo descriptions", () => {
		render(<PhotoDescriptions {...defaultProps} />);

		const inputs = screen.getAllByPlaceholderText("이 사진에 대한 설명을 입력해주세요");
		expect(inputs).toHaveLength(2);
	});

	it("should display existing descriptions", () => {
		render(<PhotoDescriptions {...defaultProps} />);

		const inputs = screen.getAllByPlaceholderText("이 사진에 대한 설명을 입력해주세요");
		expect(inputs[0]).toHaveValue("Photo 1 description");
		expect(inputs[1]).toHaveValue("");
	});

	it("should call onUpdateDescription when description changes", async () => {
		const user = userEvent.setup();
		render(<PhotoDescriptions {...defaultProps} />);

		const inputs = screen.getAllByPlaceholderText("이 사진에 대한 설명을 입력해주세요");

		await user.clear(inputs[1]);
		await user.type(inputs[1], "New");

		// Check that the function was called multiple times during typing
		expect(defaultProps.onUpdateDescription).toHaveBeenCalled();
		// Verify it was called with the correct ID
		expect(defaultProps.onUpdateDescription).toHaveBeenCalledWith("photo-2", expect.any(String));
	});

	it("should render photo labels", () => {
		render(<PhotoDescriptions {...defaultProps} />);

		expect(screen.getByText("사진 1")).toBeInTheDocument();
		expect(screen.getByText("사진 2")).toBeInTheDocument();
	});

	it("should handle empty photos array", () => {
		render(<PhotoDescriptions {...defaultProps} photos={[]} />);

		expect(screen.queryByPlaceholderText("이 사진에 대한 설명을 입력해주세요")).not.toBeInTheDocument();
	});

	it("should maintain focus when typing in input", async () => {
		const user = userEvent.setup();
		render(<PhotoDescriptions {...defaultProps} />);

		const inputs = screen.getAllByPlaceholderText("이 사진에 대한 설명을 입력해주세요");

		await user.click(inputs[0]);
		await user.type(inputs[0], "Test");

		expect(inputs[0]).toHaveFocus();
	});
});
