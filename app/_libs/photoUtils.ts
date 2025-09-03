import { SpotPhoto } from "../_types/photoTypes";

/**
 * 파일이 이미지 타입인지 확인
 */
export const isImageFile = (file: File): boolean => {
	return file.type.startsWith("image/");
};

/**
 * 파일을 SpotPhoto 객체로 변환
 */
export const createPhotoFromFile = (file: File): SpotPhoto => {
	return {
		id: crypto.randomUUID(),
		file,
		preview: URL.createObjectURL(file),
		description: "",
	};
};

/**
 * 사진 미리보기 URL 정리 (메모리 누수 방지)
 */
export const revokePhotoPreview = (photo: SpotPhoto): void => {
	URL.revokeObjectURL(photo.preview);
};

/**
 * 파일 목록을 필터링하여 이미지만 반환
 */
export const filterImageFiles = (files: FileList): File[] => {
	return Array.from(files).filter(isImageFile);
};

/**
 * 사진 목록에서 특정 ID의 사진 찾기
 */
export const findPhotoById = (photos: SpotPhoto[], id: string): SpotPhoto | undefined => {
	return photos.find(photo => photo.id === id);
};

/**
 * 사진 설명 유효성 검사
 */
export const isValidDescription = (description: string): boolean => {
	return description.trim().length > 0 && description.length <= 200;
};

/**
 * 업로드 가능한 사진 수 계산
 */
export const getAvailableSlots = (currentCount: number, maxPhotos: number): number => {
	return Math.max(0, maxPhotos - currentCount);
};
