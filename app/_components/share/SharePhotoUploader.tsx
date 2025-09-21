"use client";

import React from "react";
import { Camera, Upload } from "lucide-react";
import { SharePhotoGrid } from "./SharePhotoGrid";
import { usePhotoManager } from "@/app/_hooks/usePhotoManager";
import { PhotoUploaderOptions, SpotPhoto } from "@/app/_types/photoTypes";
import { UploadPhotoResponse, DeletePhotoResponse } from "@/app/_libs/photoService";
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
	const {
		photos,
		addPhotos,
		removePhoto,
		updateDescription,
		triggerFileSelect,
		fileInputRef,
		uploadPhoto,
		deletePhoto,
		updatePhotoId,
	} = usePhotoManager({
		maxPhotos,
		acceptedFileTypes,
		gridColumns,
	});

	// 업로드 상태 관리
	const [uploading, setUploading] = React.useState(false);
	const [uploadedPhotos, setUploadedPhotos] = React.useState<Set<string>>(new Set());
	const [uploadingPhotos, setUploadingPhotos] = React.useState<Set<string>>(new Set());

	// upload helper (전체 업로드)
	const handleUploadAll = async () => {
		if (!postId) {
			alert("postId가 필요합니다. 서버 업로드를 위해 postId를 전달해주세요.");
			return;
		}

		setUploading(true);
		let successCount = 0;
		let failCount = 0;

		for (const p of photos) {
			try {
				if (!uploadPhoto) {
					console.warn("uploadPhoto handler is not available");
					continue;
				}

				const result = (await uploadPhoto(p, postId)) as UploadPhotoResponse;
				if (result.success) {
					successCount++;
					setUploadedPhotos(prev => new Set([...prev, p.id]));
					updatePhotoId(p.id, result.data.photoId); // photoId 저장
					console.log(`✅ 사진 업로드 성공: ${p.file.name}`, result.data);
				} else {
					failCount++;
					console.error(`❌ 사진 업로드 실패: ${p.file.name}`, result.message);
				}
			} catch (err) {
				failCount++;
				console.error("사진 업로드 실패", err);
			}
		}

		setUploading(false);

		// 결과 메시지 표시
		if (failCount === 0) {
			alert(`모든 사진이 성공적으로 업로드되었습니다! (${successCount}개)`);
		} else if (successCount > 0) {
			alert(`${successCount}개 업로드 성공, ${failCount}개 실패했습니다.`);
		} else {
			alert("모든 사진 업로드가 실패했습니다. 다시 시도해주세요.");
		}
	};

	// 개별 사진 업로드 핸들러
	const handleUploadSingle = async (photo: SpotPhoto) => {
		if (!postId || !uploadPhoto) {
			alert("업로드할 수 없습니다.");
			return;
		}

		setUploadingPhotos(prev => new Set([...prev, photo.id]));

		try {
			const result = (await uploadPhoto(photo, postId)) as UploadPhotoResponse;
			if (result.success) {
				setUploadedPhotos(prev => new Set([...prev, photo.id]));
				updatePhotoId(photo.id, result.data.photoId); // photoId 저장
				console.log(`✅ 사진 업로드 성공: ${photo.file.name}`, result.data);
			} else {
				console.error(`❌ 사진 업로드 실패: ${photo.file.name}`, result.message);
				alert(`업로드 실패: ${result.message}`);
			}
		} catch (err) {
			console.error("사진 업로드 실패", err);
			alert("사진 업로드 중 오류가 발생했습니다.");
		} finally {
			setUploadingPhotos(prev => {
				const newSet = new Set(prev);
				newSet.delete(photo.id);
				return newSet;
			});
		}
	};

	// 사진 삭제 핸들러 (서버에서 삭제 + 로컬에서 제거)
	const handleDeletePhoto = async (photo: SpotPhoto) => {
		if (!postId || !deletePhoto) {
			// 서버에 업로드되지 않은 사진은 로컬에서만 삭제
			removePhoto(photo.id);
			return;
		}

		if (!photo.photoId) {
			// photoId가 없으면 서버에 업로드되지 않은 사진이므로 로컬에서만 삭제
			removePhoto(photo.id);
			return;
		}

		const confirmed = confirm("서버에서 사진을 삭제하시겠습니까? 삭제된 사진은 복구할 수 없습니다.");
		if (!confirmed) {
			return;
		}

		try {
			const result = (await deletePhoto(photo, postId)) as DeletePhotoResponse;
			if (result.success) {
				removePhoto(photo.id);
				setUploadedPhotos(prev => {
					const newSet = new Set(prev);
					newSet.delete(photo.id);
					return newSet;
				});
				console.log(`✅ 사진 삭제 성공: ${photo.file.name}`);
			} else {
				console.error(`❌ 사진 삭제 실패: ${photo.file.name}`, result.message);
				alert(`삭제 실패: ${result.message}`);
			}
		} catch (err) {
			console.error("사진 삭제 실패", err);
			alert("사진 삭제 중 오류가 발생했습니다.");
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
				onUploadPhoto={postId ? handleUploadSingle : undefined}
				onDeletePhoto={postId ? handleDeletePhoto : undefined}
				uploadedPhotoIds={uploadedPhotos}
				uploadingPhotoIds={uploadingPhotos}
			/>

			{/* 업로드 버튼 */}
			{photos.length > 0 && postId && (
				<div className="mt-4 flex gap-2">
					<button
						className={`px-4 py-2 rounded flex items-center gap-2 ${
							uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
						} text-white`}
						onClick={handleUploadAll}
						disabled={uploading}
					>
						<Upload className="h-4 w-4" />
						{uploading ? "업로드 중..." : "서버에 업로드"}
					</button>
					{uploadedPhotos.size > 0 && (
						<div className="px-3 py-2 bg-green-100 text-green-800 rounded text-sm">
							{uploadedPhotos.size}/{photos.length} 업로드 완료
						</div>
					)}
				</div>
			)}

			{/* 빈 상태 메시지 */}
			{photos.length === 0 && <p className="text-sm text-gray-500">{emptyMessage}</p>}
		</div>
	);
};
