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

        {/* Course List Section */}
        <RegionCourseList />
      </main>

      <BottomNavigation />
    </div>
  )
}
