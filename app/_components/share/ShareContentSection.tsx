import { Textarea } from "@/app/_components/ui/CTextarea";

interface ShareContentSectionProps {
	content: string;
	onContentChange: (content: string) => void;
}

export function ShareContentSection({ content, onContentChange }: ShareContentSectionProps) {
	return (
		<div className="px-4 py-4">
			<h3 className="text-base font-semibold text-gray-800 mb-3">본문</h3>
			<Textarea
				placeholder="산책 코스에 대한 자세한 설명을 작성해주세요"
				className="min-h-24 mb-4"
				value={content}
				onChange={e => onContentChange(e.target.value)}
			/>
		</div>
	);
}
