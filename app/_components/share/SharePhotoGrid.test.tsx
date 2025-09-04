// __tests__/components/photo/SharePhotoGrid.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { SharePhotoGrid } from "@/app/_components/share/SharePhotoGrid";
import { SpotPhoto } from "@/app/_types/photoTypes";

// Mock Lucide React icons
jest.mock("lucide-react", () => ({
	Plus: () => <div data-testid="plus-icon">Plus Icon</div>,
	X: () => <div data-testid="x-icon">X Icon</div>,
}));

describe("SharePhotoGrid", () => {
	const mockPhotos: SpotPhoto[] = [
		{
			id: "photo-1",
			file: new File([""], "test1.jpg", { type: "image/jpeg" }),
			preview: "preview-url-1",
			description: "Photo 1",
		},
		{
			id: "photo-2",
			file: new File([""], "test2.jpg", { type: "image/jpeg" }),
			preview: "preview-url-2",
			description: "Photo 2",
		},
	];

	const defaultProps = {
		photos: mockPhotos,
		maxPhotos: 6,
		onAddPhoto: jest.fn(),
		onRemovePhoto: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render all photos", () => {
		render(<SharePhotoGrid {...defaultProps} />);

		const images = screen.getAllByAltText("스팟 사진");
		expect(images).toHaveLength(2);
		expect(images[0]).toHaveAttribute("src", "preview-url-1");
		expect(images[1]).toHaveAttribute("src", "preview-url-2");
	});

	it("should render add photo button when under maxPhotos limit", () => {
		render(<SharePhotoGrid {...defaultProps} />);

		expect(screen.getByText("사진 추가")).toBeInTheDocument();
		expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
	});

	it("should not render add photo button when at maxPhotos limit", () => {
		render(<SharePhotoGrid {...defaultProps} maxPhotos={2} />);

		expect(screen.queryByText("사진 추가")).not.toBeInTheDocument();
	});

	it("should call onAddPhoto when add button is clicked", () => {
		render(<SharePhotoGrid {...defaultProps} />);

		const addButton = screen.getByText("사진 추가").closest(".cursor-pointer");
		fireEvent.click(addButton!);

		expect(defaultProps.onAddPhoto).toHaveBeenCalledTimes(1);
	});

	it("should call onRemovePhoto when remove button is clicked", () => {
		render(<SharePhotoGrid {...defaultProps} />);

		const removeButtons = screen.getAllByTestId("x-icon");
		fireEvent.click(removeButtons[0].closest("button")!);

		expect(defaultProps.onRemovePhoto).toHaveBeenCalledWith("photo-1");
	});

	it("should render remove buttons for each photo", () => {
		render(<SharePhotoGrid {...defaultProps} />);

		const removeButtons = screen.getAllByTestId("x-icon");
		expect(removeButtons).toHaveLength(2);
	});

	it("should apply correct grid class", () => {
		const { container } = render(<SharePhotoGrid {...defaultProps} gridColumns={4} />);

		const gridContainer = container.querySelector(".grid");
		expect(gridContainer).toHaveClass("grid-cols-4");
	});

	it("should handle empty photos array", () => {
		render(<SharePhotoGrid {...defaultProps} photos={[]} />);

		expect(screen.queryByAltText("스팟 사진")).not.toBeInTheDocument();
		expect(screen.getByText("사진 추가")).toBeInTheDocument();
	});
});
