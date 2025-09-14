"use client";

import React from "react";
import { Camera } from "lucide-react";
import { SharePhotoGrid } from "./SharePhotoGrid";
import { usePhotoManager } from "@/app/_hooks/usePhotoManager";
import { PhotoUploaderOptions, SpotPhoto } from "@/app/_types/photoTypes";
import { PHOTO_CONSTANTS } from "@/app/_constants/constants";

interface SharePhotoUploaderProps extends PhotoUploaderOptions {
	/** 제목 (기본값: "스팟 사진") */
	title?: string;
	/** 빈 상태일 때 표시할 메시지 */
	emptyMessage?: string;
	/** 사진 변경 시 호출되는 콜백 */
	onPhotosChange?: (photos: SpotPhoto[]) => void;
	/** 업로드할 게시글 ID (필수: 서버 업로드 시) */
	postId?: number;
}

/**
 * 스팟 사진 업로더 메인 컴포넌트
 * 사진 추가, 삭제, 설명 입력 기능을 통합 제공
 */
export const SharePhotoUploader: React.FC<SharePhotoUploaderProps> = ({
	title = "스팟 사진",
	emptyMessage = "스팟 사진을 추가하고 설명을 작성해주세요",
	maxPhotos = PHOTO_CONSTANTS.MAX_PHOTOS,
	acceptedFileTypes = PHOTO_CONSTANTS.ACCEPTED_FILE_TYPES,
	gridColumns = PHOTO_CONSTANTS.DEFAULT_GRID_COLUMNS,
	onPhotosChange,
	postId,
}) => {
	const { photos, addPhotos, removePhoto, updateDescription, triggerFileSelect, fileInputRef, uploadPhoto } =
		usePhotoManager({
			maxPhotos,
			acceptedFileTypes,
			gridColumns,
		});

	// upload helper (전체 업로드)
	const handleUploadAll = async () => {
		if (!postId) {
			alert("postId가 필요합니다. 서버 업로드를 위해 postId를 전달해주세요.");
			return;
		}
		for (const p of photos) {
			try {
				if (!uploadPhoto) {
					console.warn("uploadPhoto handler is not available");
					continue;
				}
				await uploadPhoto(p, postId);
				// TODO: 성공 처리(예: 상태 변경)
			} catch (err) {
				console.error("사진 업로드 실패", err);
				alert("사진 업로드 실패");
			}
		}
	};

	// 사진 변경 시 부모 컴포넌트에 알림
	React.useEffect(() => {
		onPhotosChange?.(photos);
	}, [photos, onPhotosChange]);

	const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			await addPhotos(files);
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
			<SharePhotoGrid
				photos={photos}
				maxPhotos={maxPhotos}
				onAddPhoto={triggerFileSelect}
				onRemovePhoto={removePhoto}
				onUpdateDescription={updateDescription}
			/>

			{/* 업로드 버튼 */}
			{photos.length > 0 && (
				<div className="mt-4 flex gap-2">
					<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleUploadAll}>
						서버에 업로드
					</button>
				</div>
			)}

			{/* 빈 상태 메시지 */}
			{photos.length === 0 && <p className="text-sm text-gray-500">{emptyMessage}</p>}
		</div>
	);
};
