import { Button } from "@/app/_components/ui/button"
import { Play, Bookmark, Share, MessageCircle } from "lucide-react"

// interface Course {
//   id: string
//   title: string
// }

// interface CourseActionsProps {
//   course: Course
// }

// export function CourseActions({ course }: CourseActionsProps) {
export function CourseActions() {
  return (
    <div className="px-4 py-6 bg-white border-t border-gray-200">
      <div className="space-y-3">
        {/* Primary action - Start walking */}
        <Button className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white py-4 text-lg font-medium rounded-xl shadow-lg">
          <Play className="h-5 w-5 mr-2" />이 코스로 산책 시작하기
        </Button>

        {/* Secondary actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col items-center gap-1 py-4 bg-transparent">
            <Bookmark className="h-5 w-5" />
            <span className="text-xs">저장</span>
          </Button>

          <Button variant="outline" className="flex flex-col items-center gap-1 py-4 bg-transparent">
            <Share className="h-5 w-5" />
            <span className="text-xs">공유</span>
          </Button>

          <Button variant="outline" className="flex flex-col items-center gap-1 py-4 bg-transparent">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">문의</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
