import { SpotPhoto, ExifData } from "../_types/photoTypes";
import exifr from "exifr";
import { PHOTO_CONSTANTS } from "../_constants/constants";

/**
 * 파일이 이미지 타입인지 확인
 */
export const isImageFile = (file: File): boolean => {
	return file.type.startsWith("image/");
};

/**
 * EXIF 데이터 추출
 */
export const extractExifData = async (file: File): Promise<ExifData> => {
	try {
		const exifData = (await exifr.parse(file, true)) || {};

		// 이미지 크기 정보를 얻기 위해 HTMLImageElement 객체 생성
		const img = document.createElement("img");
		const imageUrl = URL.createObjectURL(file);

		return new Promise(resolve => {
			img.onload = () => {
				const fullExifData: ExifData = {
					// 기본 파일 정보
					fileName: file.name,
					fileSize: file.size,
					width: img.width,
					height: img.height,

					// EXIF 데이터
					make: exifData.Make,
					model: exifData.Model,
					dateTime: exifData.DateTime,
					dateTimeOriginal: exifData.DateTimeOriginal,
					latitude: exifData.latitude,
					longitude: exifData.longitude,
					orientation: exifData.Orientation,
					flash: exifData.Flash,
					focalLength: exifData.FocalLength,
					iso: exifData.ISO,
					aperture: exifData.FNumber || exifData.ApertureValue,
					shutterSpeed: exifData.ExposureTime,
					lens: exifData.LensModel || exifData.LensMake,
					software: exifData.Software,

					// 모든 원본 EXIF 데이터 포함
					...exifData,
				};

				URL.revokeObjectURL(imageUrl);
				resolve(fullExifData);
			};

			img.onerror = () => {
				// 이미지 로드 실패시 기본 정보만 반환
				URL.revokeObjectURL(imageUrl);
				resolve({
					fileName: file.name,
					fileSize: file.size,
					...exifData,
				});
			};

			img.src = imageUrl;
		});
	} catch (error) {
		console.error("EXIF 데이터 추출 실패:", error);
		// 에러 발생시 기본 파일 정보만 반환
		return {
			fileName: file.name,
			fileSize: file.size,
		};
	}
};

/**
 * 파일을 SpotPhoto 객체로 변환 (EXIF 데이터 포함)
 */
export const createPhotoFromFile = async (file: File): Promise<SpotPhoto> => {
	const exifData = await extractExifData(file);

	return {
		id: crypto.randomUUID(),
		file,
		preview: URL.createObjectURL(file),
		title: "",
		description: "",
		exifData,
	};
};

/**
 * GPS 좌표를 포맷된 문자열로 변환
 */
export const formatGpsCoordinates = (latitude?: number, longitude?: number): string | null => {
	if (!latitude || !longitude) return null;

	const latDirection = latitude >= 0 ? "N" : "S";
	const lngDirection = longitude >= 0 ? "E" : "W";

	const latFormatted = Math.abs(latitude).toFixed(6);
	const lngFormatted = Math.abs(longitude).toFixed(6);

	return `${latFormatted}°${latDirection}, ${lngFormatted}°${lngDirection}`;
};

/**
 * 파일을 SpotPhoto 객체로 변환 (동기 버전, EXIF 없음)
 */
export const createPhotoFromFileSync = (file: File): SpotPhoto => {
	return {
		id: crypto.randomUUID(),
		file,
		preview: URL.createObjectURL(file),
		title: "",
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
	return description.trim().length > 0 && description.length <= PHOTO_CONSTANTS.MAX_DESCRIPTION_LENGTH;
};

/**
 * 업로드 가능한 사진 수 계산
 */
export const getAvailableSlots = (currentCount: number, maxPhotos: number): number => {
	return Math.max(0, maxPhotos - currentCount);
};
