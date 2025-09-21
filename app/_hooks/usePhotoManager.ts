// hooks/usePhotoManager.ts
import { useState, useRef, useCallback } from "react";
import { SpotPhoto, UsePhotoManagerReturn, PhotoUploaderOptions } from "@/app/_types/photoTypes";
import { uploadPhotoFile, deletePhotoFile } from "@/app/_libs/photoService";
import {
	filterImageFiles,
	createPhotoFromFile,
	createPhotoFromFileSync,
	revokePhotoPreview,
	findPhotoById,
} from "@/app/_libs/photoUtils";
import { PHOTO_CONSTANTS } from "@/app/_constants/constants";

/**
 * 스팟 사진 관리를 위한 커스텀 훅
 *
 * @param options - 사진 업로더 설정 옵션
 * @returns 사진 관리에 필요한 상태와 핸들러들
 */
export const usePhotoManager = (options: PhotoUploaderOptions = {}): UsePhotoManagerReturn => {
	const { maxPhotos = PHOTO_CONSTANTS.MAX_PHOTOS } = options;

	const [photos, setPhotos] = useState<SpotPhoto[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	/**
	 * 파일 목록을 받아 사진으로 추가 (EXIF 데이터 추출 포함)
	 */
	const addPhotos = useCallback(
		async (files: FileList) => {
			const imageFiles = filterImageFiles(files);

			setPhotos(prev => {
				const availableSlots = maxPhotos - prev.length;
				const filesToAdd = imageFiles.slice(0, availableSlots);

				// 먼저 동기적으로 사진을 추가 (미리보기용)
				const tempPhotos = filesToAdd.map(createPhotoFromFileSync);
				const newPhotos = [...prev, ...tempPhotos];

				// 비동기적으로 EXIF 데이터 추출 후 업데이트
				Promise.all(
					filesToAdd.map(async (file, index) => {
						const photoWithExif = await createPhotoFromFile(file);
						return { ...photoWithExif, id: tempPhotos[index].id }; // 기존 ID 유지
					})
				).then(photosWithExif => {
					setPhotos(currentPhotos =>
						currentPhotos.map(photo => {
							const exifPhoto = photosWithExif.find(p => p.id === photo.id);
							return exifPhoto ? { ...photo, exifData: exifPhoto.exifData } : photo;
						})
					);
				});

				return newPhotos;
			});
		},
		[maxPhotos]
	);

	/**
	 * 특정 ID의 사진 삭제
	 */
	const removePhoto = useCallback((id: string) => {
		setPhotos(prev => {
			const photoToRemove = findPhotoById(prev, id);
			if (photoToRemove) {
				revokePhotoPreview(photoToRemove);
			}
			return prev.filter(photo => photo.id !== id);
		});
	}, []);

	/**
	 * 사진 설명 업데이트
	 */
	const updateDescription = useCallback((id: string, description: string) => {
		setPhotos(prev => prev.map(photo => (photo.id === id ? { ...photo, description } : photo)));
	}, []);

	/**
	 * 사진 제목 업데이트
	 */
	const updateTitle = useCallback((id: string, title: string) => {
		setPhotos(prev => prev.map(photo => (photo.id === id ? { ...photo, title } : photo)));
	}, []);

	/**
	 * 사진의 photoId 업데이트 (업로드 성공 후)
	 */
	const updatePhotoId = useCallback((id: string, photoId: number) => {
		setPhotos(prev => prev.map(photo => (photo.id === id ? { ...photo, photoId } : photo)));
	}, []);

	/**
	 * 파일 선택 창 열기
	 */
	const triggerFileSelect = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const uploadPhoto = async (photo: SpotPhoto, postId: number) => {
		try {
			const lat = photo.exifData?.latitude;
			const lng = photo.exifData?.longitude;
			const resp = await uploadPhotoFile(photo.file, postId, lat, lng, photo.description);
			return resp;
		} catch (err) {
			console.error("Upload failed", err);
			throw err;
		}
	};

	const deletePhoto = async (photo: SpotPhoto, postId: number) => {
		if (!photo.photoId) {
			throw new Error("사진이 서버에 업로드되지 않았습니다.");
		}

		try {
			const resp = await deletePhotoFile(photo.photoId, postId);
			return resp;
		} catch (err) {
			console.error("Delete failed", err);
			throw err;
		}
	};

	return {
		photos,
		addPhotos,
		uploadPhoto,
		deletePhoto,
		removePhoto,
		updateDescription,
		updateTitle,
		updatePhotoId,
		triggerFileSelect,
		fileInputRef,
	};
};
