"use client";

import React from "react";
import { SharePhotoUploader } from "@/app/_components/share/SharePhotoUploader";
import { SpotPhoto } from "@/app/_types/photoTypes";

/**
 * EXIF GPS 좌표 표시 테스트 페이지
 */
export default function ExifTestPage() {
	const [uploadedPhotos, setUploadedPhotos] = React.useState<SpotPhoto[]>([]);

	const handlePhotosChange = (photos: SpotPhoto[]) => {
		setUploadedPhotos(photos);
	};

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-2xl mx-auto px-4">
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h1 className="text-2xl font-bold text-gray-900 mb-6">📷 EXIF GPS 좌표 테스트</h1>

					<div className="mb-6">
						<p className="text-gray-600 mb-4">
							GPS 좌표가 포함된 사진을 업로드하면 파일명 아래에 위도/경도가 표시됩니다.
						</p>
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
							<p className="text-sm text-yellow-800">
								<strong>테스트 방법:</strong> 스마트폰으로 찍은 사진(GPS 정보 포함) 또는 EXIF GPS 데이터가 있는 사진을
								업로드해보세요.
							</p>
						</div>
					</div>

					<SharePhotoUploader
						title="GPS 좌표 테스트 사진"
						emptyMessage="GPS 정보가 포함된 사진을 추가해보세요"
						maxPhotos={3}
						onPhotosChange={handlePhotosChange}
					/>

					{/* 디버그 정보 */}
					{uploadedPhotos.length > 0 && (
						<div className="mt-8 p-4 bg-gray-100 rounded-lg">
							<h3 className="text-lg font-semibold mb-4">🔍 EXIF 디버그 정보</h3>
							{uploadedPhotos.map((photo, index) => (
								<div key={photo.id} className="mb-4 p-3 bg-white rounded border">
									<h4 className="font-medium text-gray-900 mb-2">
										사진 {index + 1}: {photo.file.name}
									</h4>

									{photo.exifData ? (
										<div className="text-sm space-y-1">
											<p>
												<strong>GPS 위도:</strong> {photo.exifData.latitude || "없음"}
											</p>
											<p>
												<strong>GPS 경도:</strong> {photo.exifData.longitude || "없음"}
											</p>
											<p>
												<strong>카메라:</strong> {photo.exifData.make} {photo.exifData.model}
											</p>
											<p>
												<strong>촬영일:</strong>{" "}
												{photo.exifData.dateTimeOriginal
													? new Date(photo.exifData.dateTimeOriginal).toLocaleString("ko-KR")
													: photo.exifData.dateTime
													? new Date(photo.exifData.dateTime).toLocaleString("ko-KR")
													: "없음"}
											</p>
											<p>
												<strong>이미지 크기:</strong> {photo.exifData.width} x {photo.exifData.height}
											</p>
										</div>
									) : (
										<p className="text-gray-500 text-sm">EXIF 데이터 로딩 중...</p>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
