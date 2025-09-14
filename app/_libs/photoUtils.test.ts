// __tests__/lib/photo/photoUtils.test.ts
import {
	isImageFile,
	createPhotoFromFileSync,
	revokePhotoPreview,
	filterImageFiles,
	findPhotoById,
	isValidDescription,
	getAvailableSlots,
} from "@/app/_libs/photoUtils";
import { SpotPhoto } from "@/app/_types/photoTypes";

// Mock crypto.randomUUID
Object.defineProperty(globalThis, "crypto", {
	value: {
		randomUUID: jest.fn(() => "mock-uuid-123"),
	},
});

// Mock URL.createObjectURL and URL.revokeObjectURL
Object.defineProperty(globalThis, "URL", {
	value: {
		createObjectURL: jest.fn(() => "mock-object-url"),
		revokeObjectURL: jest.fn(),
	},
});

describe("photoUtils", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("isImageFile", () => {
		it("should return true for image files", () => {
			const imageFile = new File([""], "test.jpg", { type: "image/jpeg" });
			expect(isImageFile(imageFile)).toBe(true);
		});

		it("should return false for non-image files", () => {
			const textFile = new File([""], "test.txt", { type: "text/plain" });
			expect(isImageFile(textFile)).toBe(false);
		});

		it("should return true for different image formats", () => {
			const pngFile = new File([""], "test.png", { type: "image/png" });
			const gifFile = new File([""], "test.gif", { type: "image/gif" });
			const webpFile = new File([""], "test.webp", { type: "image/webp" });

			expect(isImageFile(pngFile)).toBe(true);
			expect(isImageFile(gifFile)).toBe(true);
			expect(isImageFile(webpFile)).toBe(true);
		});
	});

	describe("createPhotoFromFile", () => {
		it("should create a SpotPhoto object from a File", () => {
			const file = new File([""], "test.jpg", { type: "image/jpeg" });
			const photo = createPhotoFromFileSync(file);

			expect(photo).toEqual({
				id: "mock-uuid-123",
				file,
				preview: "mock-object-url",
				title: "",
				description: "",
			});

			expect(crypto.randomUUID).toHaveBeenCalledTimes(1);
			expect(URL.createObjectURL).toHaveBeenCalledWith(file);
		});
	});

	describe("revokePhotoPreview", () => {
		it("should call URL.revokeObjectURL with photo preview", () => {
			const mockPhoto: SpotPhoto = {
				id: "test-id",
				file: new File([""], "test.jpg", { type: "image/jpeg" }),
				preview: "mock-preview-url",
				title: "Test Photo",
				description: "test description",
			};
			revokePhotoPreview(mockPhoto);

			expect(URL.revokeObjectURL).toHaveBeenCalledWith("mock-preview-url");
		});
	});

	describe("filterImageFiles", () => {
		it("should filter only image files from FileList", () => {
			const imageFile = new File([""], "image.jpg", { type: "image/jpeg" });
			const textFile = new File([""], "document.txt", { type: "text/plain" });
			const pdfFile = new File([""], "document.pdf", { type: "application/pdf" });

			// Create a mock FileList
			const mockFileList = {
				0: imageFile,
				1: textFile,
				2: pdfFile,
				length: 3,
				item: (index: number) => [imageFile, textFile, pdfFile][index] || null,
				[Symbol.iterator]: function* () {
					for (let i = 0; i < this.length; i++) {
						yield this[i];
					}
				},
			} as FileList;

			const result = filterImageFiles(mockFileList);

			expect(result).toHaveLength(1);
			expect(result[0]).toBe(imageFile);
		});
	});

	describe("findPhotoById", () => {
		const mockPhotos: SpotPhoto[] = [
			{
				id: "photo-1",
				file: new File([""], "test1.jpg", { type: "image/jpeg" }),
				preview: "preview-1",
				title: "Photo 1 Title",
				description: "Photo 1",
			},
			{
				id: "photo-2",
				file: new File([""], "test2.jpg", { type: "image/jpeg" }),
				preview: "preview-2",
				title: "Photo 2 Title",
				description: "Photo 2",
			},
		];

		it("should find photo by id", () => {
			const result = findPhotoById(mockPhotos, "photo-2");
			expect(result).toBe(mockPhotos[1]);
		});

		it("should return undefined for non-existent id", () => {
			const result = findPhotoById(mockPhotos, "non-existent");
			expect(result).toBeUndefined();
		});
	});

	describe("isValidDescription", () => {
		it("should return true for valid descriptions", () => {
			expect(isValidDescription("Valid description")).toBe(true);
			expect(isValidDescription("A".repeat(200))).toBe(true);
		});

		it("should return false for empty or whitespace-only descriptions", () => {
			expect(isValidDescription("")).toBe(false);
			expect(isValidDescription("   ")).toBe(false);
			expect(isValidDescription("\n\t")).toBe(false);
		});

		it("should return false for descriptions longer than 200 characters", () => {
			expect(isValidDescription("A".repeat(201))).toBe(false);
		});
	});

	describe("getAvailableSlots", () => {
		it("should return correct available slots", () => {
			expect(getAvailableSlots(3, 6)).toBe(3);
			expect(getAvailableSlots(6, 6)).toBe(0);
			expect(getAvailableSlots(0, 6)).toBe(6);
		});

		it("should return 0 when current count exceeds max", () => {
			expect(getAvailableSlots(7, 6)).toBe(0);
		});
	});
});
