import { ApiClient } from "@/app/_libs/apiClient";

export interface UploadPhotoResponse {
	success: boolean;
	data: {
		photoId: number;
		url: string;
		latitude?: string;
		longitude?: string;
	};
	message?: string | null;
}

export interface DeletePhotoResponse {
	success: boolean;
	data: boolean;
	message?: string | null;
}

/**
 * Upload a photo file (multipart/form-data) to backend.
 */
export async function uploadPhotoFile(
	file: File,
	postId: number,
	latitude?: number,
	longitude?: number,
	description?: string
) {
	const form = new FormData();
	form.append("file", file);
	form.append("postId", String(postId));
	if (latitude !== undefined) form.append("latitude", String(latitude));
	if (longitude !== undefined) form.append("longitude", String(longitude));
	if (description !== undefined) form.append("description", description);

	// ApiClient.request handles FormData bodies specially (no Content-Type override)
	const res = await ApiClient.request<UploadPhotoResponse>("/post/upload-photo", {
		method: "POST",
		body: form,
	});

	return res as UploadPhotoResponse;
}

/**
 * Delete a photo by photoId and postId
 */
export async function deletePhotoFile(photoId: number, postId: number) {
	const formData = new FormData();
	formData.append("photoId", String(photoId));
	formData.append("postId", String(postId));

	const res = await ApiClient.request<DeletePhotoResponse>("/post/delete-photo", {
		method: "POST",
		body: formData,
	});

	return res as DeletePhotoResponse;
}
