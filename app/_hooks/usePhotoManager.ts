// hooks/usePhotoManager.ts
import { useState, useRef, useCallback } from "react";
import { SpotPhoto, UsePhotoManagerReturn, PhotoUploaderOptions } from "@/app/_types/photoTypes";
import { filterImageFiles, createPhotoFromFile, revokePhotoPreview, findPhotoById } from "@/app/_libs/photoUtils";

/**
 * 스팟 사진 관리를 위한 커스텀 훅
 *
 * @param options - 사진 업로더 설정 옵션
 * @returns 사진 관리에 필요한 상태와 핸들러들
 */
export const usePhotoManager = (options: PhotoUploaderOptions = {}): UsePhotoManagerReturn => {
	const { maxPhotos = 6 } = options;

	const [photos, setPhotos] = useState<SpotPhoto[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	/**
	 * 파일 목록을 받아 사진으로 추가
	 */
	const addPhotos = useCallback(
		(files: FileList) => {
			const imageFiles = filterImageFiles(files);

			setPhotos(prev => {
				const availableSlots = maxPhotos - prev.length;
				const filesToAdd = imageFiles.slice(0, availableSlots);

				const newPhotos = filesToAdd.map(createPhotoFromFile);
				return [...prev, ...newPhotos];
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
	 * 파일 선택 창 열기
	 */
	const triggerFileSelect = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	return {
		photos,
		addPhotos,
		removePhoto,
		updateDescription,
		updateTitle,
		triggerFileSelect,
		fileInputRef,
	};
};
