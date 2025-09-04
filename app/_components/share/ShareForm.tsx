"use client";

import { useState, useMemo } from "react";
import { Button } from "@/app/_components/ui/CButton";
import { PhotoUploader } from "@/app/_components/photo/PhotoUploader";
import { ShareRouteSection } from "./ShareRouteSection";
import { ShareCourseDetails } from "./ShareCourseDetails";
import { ShareThemeSelection } from "./ShareThemeSelection";
import { ShareHashtagSection } from "./ShareHashtagSection";
import { ShareContentSection } from "./ShareContentSection";
import { loadLatestSession } from "@/app/_libs/walkingStorage";
import { SpotPhoto } from "@/app/_types/photoTypes";
import { ShareFormData } from "@/app/_types/shareTypes";

export function ShareForm() {
	const session = useMemo(() => loadLatestSession(), []);

	// === 폼 데이터 상태 관리 ===
	const [formData, setFormData] = useState<ShareFormData>({
		title: "",
		content: "",
		selectedTheme: null,
		hashtags: [],
		hashtagInput: "",
	});

	// === 스팟 사진 관리 상태 ===
	const [spotPhotos, setSpotPhotos] = useState<SpotPhoto[]>([]);

	// === 폼 데이터 업데이트 핸들러들 ===
	const updateFormData = <K extends keyof ShareFormData>(field: K, value: ShareFormData[K]) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handlePhotosChange = (photos: SpotPhoto[]) => {
		setSpotPhotos(photos);
		console.log("현재 사진 개수:", photos.length);
	};

	const handleHashtagAdd = (hashtag: string) => {
		updateFormData("hashtags", [...formData.hashtags, hashtag]);
	};

	const handleHashtagRemove = (hashtag: string) => {
		updateFormData(
			"hashtags",
			formData.hashtags.filter(tag => tag !== hashtag)
		);
	};

	const handleSubmit = () => {
		const shareData = {
			...formData,
			spotPhotos,
			session,
		};

		// TODO: 실제 API 호출 또는 저장 로직
		console.log("공유 데이터:", shareData);
		alert("코스가 공유되었습니다!"); // 임시 알림
	};

	const isFormValid = formData.title.trim() && formData.content.trim();

	return (
		<main className="pb-20">
			{/* Walking Route Section */}
			<ShareRouteSection session={session} />

			{/* Course Details Section */}
			<ShareCourseDetails
				session={session}
				title={formData.title}
				onTitleChange={title => updateFormData("title", title)}
			/>

			{/* Photo Upload Section */}
			<PhotoUploader
				title="스팟 사진"
				emptyMessage="스팟 사진을 추가하고 설명을 작성해주세요"
				maxPhotos={6}
				onPhotosChange={handlePhotosChange}
			/>

			{/* Photo Count Display */}
			{spotPhotos.length > 0 && (
				<div className="px-4 py-2 text-sm text-gray-600">업로드된 사진: {spotPhotos.length}개</div>
			)}

			{/* Content Section */}
			<ShareContentSection content={formData.content} onContentChange={content => updateFormData("content", content)} />

			{/* Theme Selection */}
			<ShareThemeSelection
				selectedTheme={formData.selectedTheme}
				onThemeSelect={theme => updateFormData("selectedTheme", theme)}
			/>

			{/* Hashtag Section */}
			<ShareHashtagSection
				hashtags={formData.hashtags}
				hashtagInput={formData.hashtagInput}
				onHashtagInputChange={input => updateFormData("hashtagInput", input)}
				onHashtagAdd={handleHashtagAdd}
				onHashtagRemove={handleHashtagRemove}
			/>

			{/* Submit Button */}
			<div className="px-4 py-6">
				<Button
					className={`w-full font-semibold py-3 rounded-lg ${
						isFormValid
							? "bg-orange-500 hover:bg-orange-600 text-white"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					}`}
					onClick={handleSubmit}
					disabled={!isFormValid}
				>
					코스 공유하기
				</Button>
			</div>
		</main>
	);
}
