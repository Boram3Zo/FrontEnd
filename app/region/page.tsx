import { Header } from "@/components/header"
import { BottomNavigation } from "@/components/bottom-navigation"
import { KoreanMap } from "@/components/korean-map"
import { RegionCourseList } from "@/components/region-course-list"
import { CatCharacter } from "@/components/cat-character"

export default function RegionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Header />

      <main className="pb-20">
        {/* Page title with cute cat */}
        <div className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <CatCharacter size="sm" animation="wiggle" />
            <h1 className="text-lg font-bold text-gray-800">지역별 산책 코스</h1>
            <CatCharacter size="sm" animation="bounce" />
          </div>
        </div>

        {/* Korean Map Section */}
        <div className="px-4 py-6">
          <KoreanMap />
        </div>

        {/* Instructions */}
        <div className="px-4 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              서울시 기준, 구 단위 → 동 단위로 좁혀가며 지역 선택 가능
              <br />
              지역 선택 시 하단에서 산책길 코스 리스트 확인 가능
              <br />
              도토(dot) 터치 시 해당 스팟의 사진 및 코멘트 미리 확인 가능
            </p>
          </div>
        </div>

        {/* Course List Section */}
        <RegionCourseList />
      </main>

      <BottomNavigation />
    </div>
  )
}
