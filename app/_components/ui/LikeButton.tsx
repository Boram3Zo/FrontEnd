"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import { Heart } from "lucide-react";
import { likePost } from "@/app/_libs/postService";
import { useAuth } from "@/app/_providers/AuthProvider";

interface LikeButtonProps {
	postId: number;
	className?: string;
}

export function LikeButton({ postId, className }: LikeButtonProps) {
	const [isLiking, setIsLiking] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const { isLoggedIn, user } = useAuth();

	const handleLike = async () => {
		if (!isLoggedIn || !user?.memberId) {
			alert("로그인이 필요합니다.");
			return;
		}

		if (isLiking) return;

		try {
			setIsLiking(true);
			const response = await likePost(postId, user.memberId);

			if (response.success) {
				setIsLiked(!isLiked);
			} else {
				console.error("좋아요 처리 실패:", response.message);
				alert("좋아요 처리에 실패했습니다.");
			}
		} catch (error) {
			console.error("좋아요 처리 중 오류:", error);
			alert("좋아요 처리 중 오류가 발생했습니다.");
		} finally {
			setIsLiking(false);
		}
	};

	return (
		<Button variant="ghost" size="icon" onClick={handleLike} disabled={isLiking} className={className}>
			<Heart
				className={`h-5 w-5 transition-colors ${isLiked ? "text-red-500 fill-red-500" : "text-gray-600"} ${
					isLiking ? "opacity-50" : ""
				}`}
			/>
		</Button>
	);
}
