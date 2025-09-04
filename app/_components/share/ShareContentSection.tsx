import { Textarea } from "@/app/_components/ui/Textarea";

interface ShareContentSectionProps {
	content: string;
	onContentChange: (content: string) => void;
}

/**
 * 산책 코스 본문 내용을 작성하는 컴포넌트
 * @param content - 현재 입력된 본문 내용
 * @param onContentChange - 본문 내용 변경 핸들러
 */
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
