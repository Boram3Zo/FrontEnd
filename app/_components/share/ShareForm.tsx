"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/_components/ui/Button";
import { SharePhotoUploader } from "./SharePhotoUploader";
import { ShareRouteSection } from "./ShareRouteSection";
import { ShareCourseDetails } from "./ShareCourseDetails";
import { ShareThemeSelection } from "./ShareThemeSelection";
import { ShareHashtagSection } from "./ShareHashtagSection";
import { ShareContentSection } from "./ShareContentSection";
import { useWalking } from "@/app/_providers";
import { useAuth } from "@/app/_providers";
import { SpotPhoto } from "@/app/_types/photoTypes";
import { ShareFormData } from "@/app/_types/shareTypes";
import { PHOTO_CONSTANTS } from "@/app/_constants/constants";
import {
  sharePost,
  convertWalkingSessionToShareRequest,
} from "@/app/_libs/postService";

interface ShareFormProps {
  postId?: string; // props로 받을 수 있는 postId (동적 라우트용)
}

/**
 * 산책 코스 공유 폼 컴포넌트
 * 사용자가 산책 경로와 관련 정보를 입력하여 다른 사용자들과 공유할 수 있는 폼을 제공합니다.
 */
export function ShareForm({ postId: propsPostId }: ShareFormProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, spotPhotos, setSpotPhotos } = useWalking();
  const { user } = useAuth();

  // postId 우선순위: props > URL 파라미터 > sessionStorage
  const urlPostId = searchParams.get("post_id") || searchParams.get("postId");
  const sessionPostId =
    typeof window !== "undefined"
      ? sessionStorage.getItem("created:postId")
      : null;
  const postId = propsPostId || urlPostId || sessionPostId;

  // 폼 데이터 상태 관리
  const [formData, setFormData] = useState<ShareFormData>({
    title: "",
    content: "",
    selectedTheme: null,
    hashtags: [],
    hashtagInput: "",
  });

  // postId 처리 및 검증
  useEffect(() => {
    if (postId) {
      // sessionStorage 정리 (한 번 사용했으면 제거)
      if (sessionPostId) {
        sessionStorage.removeItem("created:postId");
      }
    } else {
      console.warn("⚠️ ShareForm이 postId 없이 접근됨");
      // 동적 라우트(/share/[id])가 아닌 기본 /share 경로인 경우 허용
      // 하지만 일반적으로는 postId가 있어야 함을 로그로 남김
      if (window.location.pathname === "/share") {
      } else {
        alert("잘못된 접근입니다. 메인 페이지로 이동합니다.");
        router.push("/");
      }
    }
  }, [postId, urlPostId, sessionPostId, router]);

  /**
   * 폼 데이터 필드를 업데이트하는 함수
   * @param field - 업데이트할 필드명
   * @param value - 새로운 값
   */
  const updateFormData = <K extends keyof ShareFormData>(
    field: K,
    value: ShareFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * 사진 업로드 상태 변경 핸들러
   * @param photos - 업로드된 사진 목록
   */
  const handlePhotosChange = (photos: SpotPhoto[]) => {
    setSpotPhotos(photos);
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
      formData.hashtags.filter((tag) => tag !== hashtag)
    );
  };

  /**
   * GPS 좌표에서 실제 주소를 가져오는 함수
   */
  const getAddressFromCoordinates = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    try {
      if (window.google?.maps && window.google.maps.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        const results = await new Promise<google.maps.GeocoderResult[] | null>(
          (resolve) => {
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === "OK" && results) resolve(results);
              else resolve(null);
            });
          }
        );

        if (results && results.length > 0) {
          const first = results[0];
          const addressComponents = first.address_components || [];

          // 시/구/동 정보 추출
          const findComponent = (types: string[]) =>
            addressComponents.find((c) =>
              types.some((t) => c.types.includes(t))
            );

          const cityComp = findComponent([
            "locality",
            "administrative_area_level_2",
          ]);
          const guComp = findComponent([
            "administrative_area_level_2",
            "administrative_area_level_3",
          ]);
          const dongComp = findComponent([
            "sublocality_level_1",
            "sublocality",
          ]);

          // 주소 조합
          const addressParts = [];
          if (cityComp) addressParts.push(cityComp.long_name);
          if (guComp && guComp.long_name !== cityComp?.long_name)
            addressParts.push(guComp.long_name);
          if (dongComp) addressParts.push(dongComp.long_name);

          return addressParts.length > 0
            ? addressParts.join(" ")
            : first.formatted_address;
        }
      }
    } catch (error) {
      console.error("주소 변환 실패:", error);
    }
    return "알 수 없는 지역";
  };

  /**
   * 폼 제출 핸들러
   * 게시글 공유 완료 API를 호출하여 산책 데이터를 서버에 저장
   */
  const handleSubmit = async () => {
    if (!session) {
      alert("산책 데이터가 없습니다.");
      return;
    }

    if (!postId) {
      alert("게시글 ID가 없습니다. 페이지를 새로고침해주세요.");
      return;
    }

    try {
      // user 정보 로그 출력
      console.log("[ShareForm] user 정보:", user);
      // 로그인된 사용자 확인
      if (!user || !user.memberId) {
        alert("공유하려면 로그인해야 합니다.");
        // 로그인 페이지로 이동
        router.push("/login");
        return;
      }

      // 1. 먼저 사진들을 업로드
      if (spotPhotos.length > 0) {
        console.log("[ShareForm] 사진 업로드 시작:", spotPhotos);
        for (const photo of spotPhotos) {
          if (photo.file && !photo.photoId) {
            try {
              const formData = new FormData();
              formData.append("file", photo.file);
              formData.append("postId", postId);
              if (photo.exifData?.latitude)
                formData.append("latitude", photo.exifData.latitude.toString());
              if (photo.exifData?.longitude)
                formData.append(
                  "longitude",
                  photo.exifData.longitude.toString()
                );
              if (photo.description)
                formData.append("description", photo.description);

              const uploadResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/upload-photo`,
                {
                  method: "POST",
                  credentials: "include",
                  body: formData,
                }
              );

              if (uploadResponse.ok) {
                const result = await uploadResponse.json();
                if (result.success) {
                  photo.photoId = result.data.photoId;
                  console.log(
                    "[ShareForm] 사진 업로드 성공:",
                    photo.id,
                    "-> photoId:",
                    photo.photoId
                  );
                } else {
                  console.error(
                    "[ShareForm] 사진 업로드 실패:",
                    result.message
                  );
                  alert(`사진 업로드 실패: ${result.message}`);
                  return;
                }
              } else {
                console.error(
                  "[ShareForm] 사진 업로드 HTTP 에러:",
                  uploadResponse.status
                );
                alert("사진 업로드 중 네트워크 오류가 발생했습니다.");
                return;
              }
            } catch (error) {
              console.error("[ShareForm] 사진 업로드 중 오류:", error);
              alert("사진 업로드 중 오류가 발생했습니다.");
              return;
            }
          }
        }
      }

      // 2. 시작점의 실제 주소 가져오기
      const startPoint = session.route[0];
      const actualRegion = startPoint
        ? await getAddressFromCoordinates(startPoint.lat, startPoint.lng)
        : session.pins?.find((pin) => pin.type === "start")?.guName ||
          "알 수 없는 지역";

      // 3. 산책 세션 데이터를 게시글 공유 요청 형식으로 변환
      const shareRequest = convertWalkingSessionToShareRequest(
        parseInt(postId),
        session,
        {
          memberId: user?.memberId,
          title: formData.title,
          region: actualRegion,
          content: formData.content,
          theme: formData.selectedTheme || "",
          hashtags: formData.hashtags.length > 0 ? formData.hashtags : [],
        }
      );

      // 4. 게시글 공유 완료 API 호출
      const result = await sharePost(shareRequest);

      if (result.success && result.data) {
        alert("코스가 성공적으로 공유되었습니다!");
        // 성공 시 생성된 게시글 상세 페이지로 이동
        router.push(`/course/${result.data}`);
      } else {
        alert(`공유 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("공유 중 오류:", error);
      alert("공유 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 필수 항목 체크
  const requiredFields = {
    title: formData.title.trim(),
    content: formData.content.trim(),
    hasRoute: session?.route && session.route.length > 0,
  };

  const missingFields: string[] = [];
  if (!requiredFields.title) missingFields.push("제목");
  if (!requiredFields.content) missingFields.push("내용");
  if (!requiredFields.hasRoute) missingFields.push("산책 경로");

  const isFormValid = missingFields.length === 0;

  // 버튼 텍스트와 상태 메시지
  const getButtonText = () => {
    if (missingFields.length === 0) return "코스 공유하기";
    if (missingFields.length === 1) return `${missingFields[0]} 입력 필요`;
    return `${missingFields.length}개 항목 입력 필요`;
  };

  return (
    <main className="pb-20">
      {/* 산책 루트 섹션 */}
      <ShareRouteSection />
      {/* 코스 상세 정보 섹션 */}
      <ShareCourseDetails
        session={session}
        title={formData.title}
        onTitleChange={(title) => updateFormData("title", title)}
      />{" "}
      {/* 사진 업로드 섹션 */}
      <SharePhotoUploader
        title="스팟 사진"
        emptyMessage="스팟 사진을 추가하고 설명을 작성해주세요"
        maxPhotos={PHOTO_CONSTANTS.MAX_PHOTOS}
        onPhotosChange={handlePhotosChange}
        postId={postId ? parseInt(postId) : undefined}
      />
      {/* 사진 개수 표시 */}
      {spotPhotos.length > 0 && (
        <div className="px-4 py-2 text-sm text-gray-600">
          업로드된 사진: {spotPhotos.length}개
        </div>
      )}
      {/* 본문 작성 섹션 */}
      <ShareContentSection
        content={formData.content}
        onContentChange={(content) => updateFormData("content", content)}
      />
      {/* 테마 선택 섹션 */}
      <ShareThemeSelection
        selectedTheme={formData.selectedTheme}
        onThemeSelect={(theme) => updateFormData("selectedTheme", theme)}
      />
      {/* 해시태그 섹션 */}
      <ShareHashtagSection
        hashtags={formData.hashtags}
        hashtagInput={formData.hashtagInput}
        onHashtagInputChange={(input) => updateFormData("hashtagInput", input)}
        onHashtagAdd={handleHashtagAdd}
        onHashtagRemove={handleHashtagRemove}
      />
      {/* 필수 항목 체크리스트 (버튼 위에 표시) */}
      <div className="px-4 py-4">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            공유 전 확인사항
          </h4>
          <div className="space-y-2">
            <div
              className={`flex items-center gap-2 text-sm ${
                requiredFields.hasRoute ? "text-green-600" : "text-red-500"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                  requiredFields.hasRoute ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {requiredFields.hasRoute ? "✓" : "!"}
              </span>
              <span>산책 경로 {requiredFields.hasRoute ? "완료" : "필요"}</span>
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                requiredFields.title ? "text-green-600" : "text-red-500"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                  requiredFields.title ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {requiredFields.title ? "✓" : "!"}
              </span>
              <span>코스 제목 {requiredFields.title ? "완료" : "필요"}</span>
            </div>
            <div
              className={`flex items-center gap-2 text-sm ${
                requiredFields.content ? "text-green-600" : "text-red-500"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                  requiredFields.content ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {requiredFields.content ? "✓" : "!"}
              </span>
              <span>코스 설명 {requiredFields.content ? "완료" : "필요"}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 제출 버튼 */}
      <div className="px-4 pb-6">
        <Button
          className={`w-full font-semibold py-3 rounded-lg transition-colors ${
            isFormValid
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          {getButtonText()}
        </Button>
        {!isFormValid && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            위 항목들을 모두 완료하면 공유할 수 있습니다
          </p>
        )}
      </div>
    </main>
  );
}
