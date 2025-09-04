// components/photo/PhotoGrid.tsx
"use client";

import { Card } from "@/app/_components/ui/CCard";
import { Plus, X } from "lucide-react";
import { SpotPhoto } from "@/app/_types/photoTypes";

interface SharePhotoGridProps {
	/** 사진 목록 */
	photos: SpotPhoto[];
	/** 최대 사진 수 */
	maxPhotos?: number;
	/** 사진 추가 핸들러 */
	onAddPhoto: () => void;
	/** 사진 삭제 핸들러 */
	onRemovePhoto: (id: string) => void;
	/** 그리드 컬럼 수 */
	gridColumns?: number;
}

/**
 * 사진 그리드 표시 컴포넌트
 * 업로드된 사진들과 추가 버튼을 그리드 형태로 표시
 */
export const SharePhotoGrid: React.FC<SharePhotoGridProps> = ({
	photos,
	maxPhotos = 6,
	onAddPhoto,
	onRemovePhoto,
	gridColumns = 3,
}) => {
	const gridClass = `grid grid-cols-${gridColumns} gap-2 mb-3`;

	return (
		<div className={gridClass}>
			{/* 업로드된 사진들 표시 */}
			{photos.map(photo => (
				<Card key={photo.id} className="aspect-square relative overflow-hidden">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={photo.preview} alt="스팟 사진" className="w-full h-full object-cover" />
					<button
						onClick={() => onRemovePhoto(photo.id)}
						className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
						aria-label="사진 삭제"
					>
						<X className="w-3 h-3" />
					</button>
				</Card>
			))}

			{/* 사진 추가 버튼 (최대 개수에 도달하지 않은 경우만) */}
			{photos.length < maxPhotos && (
				<Card
					className="aspect-square bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
					onClick={onAddPhoto}
				>
					<div className="text-center">
						<Plus className="h-6 w-6 text-gray-400 mx-auto mb-1" />
						<span className="text-xs text-gray-500">사진 추가</span>
					</div>
				</Card>
			)}
		</div>
	);
};
