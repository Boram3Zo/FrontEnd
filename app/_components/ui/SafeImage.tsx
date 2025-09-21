"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "src"> {
	src: string | null | undefined;
	fallbackSrc?: string;
}

/**
 * 404 에러가 발생할 때 자동으로 기본 이미지로 대체하는 안전한 Image 컴포넌트
 */
export function SafeImage({ src, fallbackSrc = "/hangang-park-walkway.png", alt, ...props }: SafeImageProps) {
	const [imageError, setImageError] = useState(false);

	// src가 없거나 에러가 발생한 경우 fallback 사용
	const imageSrc = !src || imageError ? fallbackSrc : src;

	return (
		<Image
			{...props}
			src={imageSrc}
			alt={alt}
			unoptimized
			onError={() => {
				setImageError(true);
			}}
		/>
	);
}
