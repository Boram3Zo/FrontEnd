// components/photo/PhotoUploader.tsx
"use client";

import React from "react";
import { Camera } from "lucide-react";
import { PhotoGrid } from "./PhotoGrid";
import { PhotoDescriptions } from "./PhotoDescriptions";
import { usePhotoManager } from "@/hooks/usePhotoManager";
import { PhotoUploaderOptions, SpotPhoto } from "@/lib/photo/photoTypes";

interface PhotoUploaderProps extends PhotoUploaderOptions {
	/** 제목 (기본값: "스팟 사진") */
	title?: string;
	/** 빈 상태일 때 표시할 메시지 */
	emptyMessage?: string;
	/** 사진 변경 시 호출되는 콜백 */
	onPhotosChange?: (photos: SpotPhoto[]) => void;
}

/**
 * 스팟 사진 업로더 메인 컴포넌트
 * 사진 추가, 삭제, 설명 입력 기능을 통합 제공
 */
export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
	title = "스팟 사진",
	emptyMessage = "스팟 사진을 추가하고 설명을 작성해주세요",
	maxPhotos = 6,
	acceptedFileTypes = "image/*",
	gridColumns = 3,
	onPhotosChange,
}) => {
	const { photos, addPhotos, removePhoto, updateDescription, triggerFileSelect, fileInputRef } = usePhotoManager({
		maxPhotos,
		acceptedFileTypes,
		gridColumns,
	});

	// 사진 변경 시 부모 컴포넌트에 알림
	React.useEffect(() => {
		onPhotosChange?.(photos);
	}, [photos, onPhotosChange]);

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			addPhotos(files);
		}

		// 파일 입력 초기화 (같은 파일 재선택 가능하도록)
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="px-4 py-4">
			{/* 헤더 */}
			<div className="flex items-center gap-2 mb-3">
				<Camera className="h-5 w-5 text-gray-600" />
				<h3 className="text-base font-semibold text-gray-800">{title}</h3>
			</div>

			{/* 숨겨진 파일 입력 */}
			<input
				ref={fileInputRef}
				type="file"
				accept={acceptedFileTypes}
				multiple
				onChange={handleFileSelect}
				className="hidden"
				aria-label="사진 파일 선택"
			/>

			{/* 사진 그리드 */}
			<PhotoGrid
				photos={photos}
				maxPhotos={maxPhotos}
				onAddPhoto={triggerFileSelect}
				onRemovePhoto={removePhoto}
				gridColumns={gridColumns}
			/>

			{/* 사진 설명 입력 */}
			<PhotoDescriptions photos={photos} onUpdateDescription={updateDescription} />

			{/* 빈 상태 메시지 */}
			{photos.length === 0 && <p className="text-sm text-gray-500">{emptyMessage}</p>}
		</div>
	);
};
