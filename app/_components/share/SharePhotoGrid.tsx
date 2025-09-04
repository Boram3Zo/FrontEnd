// components/photo/PhotoGrid.tsx
"use client";

import { Card } from "@/app/_components/ui/Card";
import { Textarea } from "@/app/_components/ui/Textarea";
import { Plus, X, MapPin } from "lucide-react";
import { SpotPhoto } from "@/app/_types/photoTypes";
import { formatGpsCoordinates } from "@/app/_libs/photoUtils";
import { PHOTO_CONSTANTS } from "@/app/_constants/constants";

interface SharePhotoGridProps {
	/** 사진 목록 */
	photos: SpotPhoto[];
	/** 최대 사진 수 */
	maxPhotos?: number;
	/** 사진 추가 핸들러 */
	onAddPhoto: () => void;
	/** 사진 삭제 핸들러 */
	onRemovePhoto: (id: string) => void;
	/** 설명 업데이트 핸들러 */
	onUpdateDescription: (id: string, description: string) => void;
}

/**
 * 사진 그리드 표시 컴포넌트
 * 업로드된 사진들과 입력 컴포넌트를 함께 표시
 */
export const SharePhotoGrid: React.FC<SharePhotoGridProps> = ({
	photos,
	maxPhotos = PHOTO_CONSTANTS.MAX_PHOTOS,
	onAddPhoto,
	onRemovePhoto,
	onUpdateDescription,
}) => {
	return (
		<div className="space-y-4">
			{/* 업로드된 사진들을 각각 카드로 표시 */}
			{photos.map((photo, index) => (
				<Card key={photo.id} className="p-4">
					<div className="flex gap-4">
						{/* 사진 */}
						<div className="relative w-24 h-24 flex-shrink-0">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={photo.preview}
								alt={`스팟 사진 ${index + 1}`}
								className="w-full h-full object-cover rounded-lg"
							/>
							<button
								onClick={() => onRemovePhoto(photo.id)}
								className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-md"
								aria-label="사진 삭제"
							>
								<X className="w-3 h-3" />
							</button>
						</div>

						{/* 입력 컴포넌트들 */}
						<div className="flex-1 space-y-3">
							{/* 파일 이름 표시 */}
							<div>
								<label className="block text-xs text-gray-500 mb-1">파일 이름</label>
								<div className="text-sm font-medium text-gray-800 p-2 bg-gray-50 rounded border">{photo.file.name}</div>
							</div>

							{/* GPS 좌표 표시 (EXIF에서 추출된 경우) */}
							{photo.exifData?.latitude && photo.exifData?.longitude && (
								<div>
									<label className="block text-xs text-gray-500 mb-1">촬영 위치</label>
									<div className="flex items-center gap-2 text-sm text-gray-700 p-2 bg-blue-50 rounded border">
										<MapPin className="w-4 h-4 text-blue-600" />
										<span className="font-mono">
											{formatGpsCoordinates(photo.exifData.latitude, photo.exifData.longitude)}
										</span>
									</div>
								</div>
							)}

							{/* 사진 설명 */}
							<div>
								<label className="block text-xs text-gray-500 mb-1">사진 설명</label>
								<Textarea
									placeholder="이 사진에 대한 설명을 입력해주세요"
									value={photo.description}
									onChange={e => onUpdateDescription(photo.id, e.target.value)}
									className="text-sm resize-none"
									rows={3}
									maxLength={PHOTO_CONSTANTS.MAX_DESCRIPTION_LENGTH}
								/>
								{photo.description.length > PHOTO_CONSTANTS.DESCRIPTION_WARNING_THRESHOLD && (
									<p className="text-xs text-orange-500 mt-1">
										{PHOTO_CONSTANTS.MAX_DESCRIPTION_LENGTH - photo.description.length}자 남음
									</p>
								)}
							</div>
						</div>
					</div>
				</Card>
			))}

			{/* 사진 추가 버튼 (최대 개수에 도달하지 않은 경우만) */}
			{photos.length < maxPhotos && (
				<Card
					className="p-6 bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
					onClick={onAddPhoto}
				>
					<div className="text-center">
						<Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
						<span className="text-sm text-gray-600 font-medium">사진 추가</span>
						<p className="text-xs text-gray-500 mt-1">
							{photos.length}/{maxPhotos}장
						</p>
					</div>
				</Card>
			)}
		</div>
	);
};
