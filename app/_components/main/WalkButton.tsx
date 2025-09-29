import Link from "next/link";

export function WalkButton() {
  return (
    <div className="flex justify-center mb-8 px-4">
      <Link href="/walk" className="w-full max-w-xs">
        <button className="w-full bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-400 hover:from-orange-500 hover:via-orange-600 hover:to-yellow-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-xl">
              <span>🚶‍♂️</span>
              <span>🐾</span>
            </div>
            <span className="text-xl font-extrabold tracking-wide">
              산책하기
            </span>
            <span className="text-xs opacity-90">
              새로운 길을 발견해보세요!
            </span>
          </div>
        </button>
      </Link>
    </div>
  );
}
