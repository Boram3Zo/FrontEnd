import { Button } from "@/app/_components/ui/CButton";
import { Input } from "@/app/_components/ui/CInput";
import { Hash } from "lucide-react";

interface ShareHashtagSectionProps {
	hashtags: string[];
	hashtagInput: string;
	onHashtagInputChange: (input: string) => void;
	onHashtagAdd: (hashtag: string) => void;
	onHashtagRemove: (hashtag: string) => void;
}

const popularHashtags = ["#산책", "#고양이", "#힐링"];

export function ShareHashtagSection({
	hashtags,
	hashtagInput,
	onHashtagInputChange,
	onHashtagAdd,
	onHashtagRemove,
}: ShareHashtagSectionProps) {
	const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && hashtagInput.trim()) {
			e.preventDefault();
			const tag = hashtagInput.startsWith("#") ? hashtagInput : `#${hashtagInput}`;
			if (!hashtags.includes(tag)) {
				onHashtagAdd(tag);
				onHashtagInputChange("");
			}
		}
	};

	const handlePopularTagClick = (tag: string) => {
		if (!hashtags.includes(tag)) {
			onHashtagAdd(tag);
		} else {
			onHashtagRemove(tag);
		}
	};

	return (
		<div className="px-4 py-4">
			<div className="flex items-center gap-2 mb-3">
				<Hash className="h-5 w-5 text-gray-600" />
				<h3 className="text-base font-semibold text-gray-800">해시태그</h3>
			</div>

			<Input
				placeholder="#해시태그를 입력해주세요"
				className="mb-3"
				value={hashtagInput}
				onChange={e => onHashtagInputChange(e.target.value)}
				onKeyPress={handleInputKeyPress}
			/>

			{/* 추가된 해시태그 */}
			{hashtags.length > 0 && (
				<div className="flex flex-wrap gap-2 mb-3">
					{hashtags.map((tag, index) => (
						<Button
							key={index}
							variant="default"
							size="sm"
							className="bg-orange-500 text-white"
							onClick={() => onHashtagRemove(tag)}
						>
							{tag} ×
						</Button>
					))}
				</div>
			)}

			{/* 인기 해시태그 */}
			<div className="flex flex-wrap gap-2">
				{popularHashtags.map((tag, index) => (
					<Button
						key={index}
						variant={hashtags.includes(tag) ? "default" : "outline"}
						size="sm"
						className={hashtags.includes(tag) ? "bg-orange-500 text-white" : ""}
						onClick={() => handlePopularTagClick(tag)}
					>
						{tag}
					</Button>
				))}
			</div>
		</div>
	);
}
