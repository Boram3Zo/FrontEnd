import { CatCharacter } from "@/app/_components/cat/CatCharacter";

export function CatCharactersSection() {
	return (
		<div className="flex justify-between items-center px-6 mb-6">
			<div className="flex flex-col items-center">
				<CatCharacter animation="wiggle" size="sm" />
				<div className="text-xs text-gray-500 mt-1 text-center">
					<p>길고양이처럼</p>
					<p>자유롭게</p>
				</div>
			</div>

			<div className="text-center px-2">
				<div className="text-base mb-1">🌟</div>
				<p className="text-xs text-gray-600 font-medium">새로운 길을</p>
				<p className="text-xs text-gray-600 font-medium">발견해보세요</p>
			</div>

			<div className="flex flex-col items-center">
				<CatCharacter animation="bounce" size="sm" />
				<div className="text-xs text-gray-500 mt-1 text-center">
					<p>골목길을</p>
					<p>탐험해요</p>
				</div>
			</div>
		</div>
	);
}
