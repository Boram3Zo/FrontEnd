import { CatCharacter } from "@/app/_components/cat/CatCharacter";

export function HeroSection() {
  return (
    <div className="text-center py-6 px-4">
      <div className="flex justify-center mb-4 relative">
        <CatCharacter animation="bounce" size="md" />
      </div>

      <div className="mb-3 flex justify-center gap-2">
        <span className="text-2xl animate-pulse">🐾</span>
        <span className="text-2xl animate-pulse delay-300">🐾</span>
      </div>

      <h1 className="text-xl font-bold text-gray-800 mb-1">
        우리 동네의 숨겨진 골목길을
      </h1>
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        함께 발견해보세요! 🚶
      </h1>

      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        나만의 특별한 산책 코스를 만들고
        <br />
        다른 사람들과 공유해보세요
      </p>
    </div>
  );
}
