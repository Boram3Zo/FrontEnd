// components/photo/PhotoDescriptions.tsx
"use client";

import { Input } from "@/app/_components/ui/input";
import { SpotPhoto } from "@/app/_types/photoTypes";

interface PhotoDescriptionsProps {
	/** 사진 목록 */
	photos: SpotPhoto[];
	/** 설명 업데이트 핸들러 */
	onUpdateDescription: (id: string, description: string) => void;
}

/**
 * 사진 설명 입력 컴포넌트
 * 각 사진에 대한 설명을 입력할 수 있는 입력 필드들을 제공
 */
export const PhotoDescriptions: React.FC<PhotoDescriptionsProps> = ({ photos, onUpdateDescription }) => {
	if (photos.length === 0) {
		return null;
	}

	return (
		<div className="space-y-3">
			<h4 className="text-sm font-medium text-gray-700">사진 설명</h4>
			{photos.map((photo, index) => (
				<div key={photo.id} className="space-y-1">
					<label className="text-xs text-gray-500">사진 {index + 1}</label>
					<Input
						placeholder="이 사진에 대한 설명을 입력해주세요"
						value={photo.description}
						onChange={e => onUpdateDescription(photo.id, e.target.value)}
						className="text-sm"
						maxLength={200}
					/>
					{photo.description.length > 180 && (
						<p className="text-xs text-orange-500">{200 - photo.description.length}자 남음</p>
					)}
				</div>
			))}
		</div>
	);
};
