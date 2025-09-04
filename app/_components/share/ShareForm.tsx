"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/CButton";
import { SharePhotoUploader } from "./SharePhotoUploader";
import { ShareRouteSection } from "./ShareRouteSection";
import { ShareCourseDetails } from "./ShareCourseDetails";
import { ShareThemeSelection } from "./ShareThemeSelection";
import { ShareHashtagSection } from "./ShareHashtagSection";
import { ShareContentSection } from "./ShareContentSection";
import { useWalking } from "@/app/_providers";
import { SpotPhoto } from "@/app/_types/photoTypes";
import { ShareFormData } from "@/app/_types/shareTypes";
import { PHOTO_CONSTANTS } from "@/app/_constants/constants";

/**
 * 산책 코스 공유 폼 컴포넌트
 * 사용자가 산책 경로와 관련 정보를 입력하여 다른 사용자들과 공유할 수 있는 폼을 제공합니다.
 */
export function ShareForm() {
	const { session, spotPhotos, setSpotPhotos } = useWalking();

	// 폼 데이터 상태 관리
	const [formData, setFormData] = useState<ShareFormData>({
		title: "",
		content: "",
		selectedTheme: null,
		hashtags: [],
		hashtagInput: "",
	});

	/**
	 * 폼 데이터 필드를 업데이트하는 함수
	 * @param field - 업데이트할 필드명
	 * @param value - 새로운 값
	 */
	const updateFormData = <K extends keyof ShareFormData>(field: K, value: ShareFormData[K]) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	/**
	 * 사진 업로드 상태 변경 핸들러
	 * @param photos - 업로드된 사진 목록
	 */
	const handlePhotosChange = (photos: SpotPhoto[]) => {
		setSpotPhotos(photos);
		console.log("현재 사진 개수:", photos.length);
	};

	/**
	 * 해시태그 추가 핸들러
	 * @param hashtag - 추가할 해시태그
	 */
	const handleHashtagAdd = (hashtag: string) => {
		updateFormData("hashtags", [...formData.hashtags, hashtag]);
	};

	/**
	 * 해시태그 제거 핸들러
	 * @param hashtag - 제거할 해시태그
	 */
	const handleHashtagRemove = (hashtag: string) => {
		updateFormData(
			"hashtags",
			formData.hashtags.filter(tag => tag !== hashtag)
		);
	};

	/**
	 * 폼 제출 핸들러
	 * 현재는 콘솔 로그와 알림으로 처리, 추후 실제 API 연동 예정
	 */
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
			{/* 산책 루트 섹션 */}
			<ShareRouteSection />
			{/* 코스 상세 정보 섹션 */}
			<ShareCourseDetails
				session={session}
				title={formData.title}
				onTitleChange={title => updateFormData("title", title)}
			/>{" "}
			{/* 사진 업로드 섹션 */}
			<SharePhotoUploader
				title="스팟 사진"
				emptyMessage="스팟 사진을 추가하고 설명을 작성해주세요"
				maxPhotos={PHOTO_CONSTANTS.MAX_PHOTOS}
				onPhotosChange={handlePhotosChange}
			/>
			{/* 사진 개수 표시 */}
			{spotPhotos.length > 0 && (
				<div className="px-4 py-2 text-sm text-gray-600">업로드된 사진: {spotPhotos.length}개</div>
			)}
			{/* 본문 작성 섹션 */}
			<ShareContentSection content={formData.content} onContentChange={content => updateFormData("content", content)} />
			{/* 테마 선택 섹션 */}
			<ShareThemeSelection
				selectedTheme={formData.selectedTheme}
				onThemeSelect={theme => updateFormData("selectedTheme", theme)}
			/>
			{/* 해시태그 섹션 */}
			<ShareHashtagSection
				hashtags={formData.hashtags}
				hashtagInput={formData.hashtagInput}
				onHashtagInputChange={input => updateFormData("hashtagInput", input)}
				onHashtagAdd={handleHashtagAdd}
				onHashtagRemove={handleHashtagRemove}
			/>
			{/* 제출 버튼 */}
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
