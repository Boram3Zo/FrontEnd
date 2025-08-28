import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, User, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
  helpful: number
}

interface CourseReviewsProps {
  courseId: string
  rating: number
  reviewCount: number
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "산책러버",
    rating: 5,
    comment: "정말 힐링되는 코스예요! 특히 벚꽃길이 너무 예뻤어요. 가족과 함께 걷기 좋은 코스입니다.",
    date: "2024.01.20",
    helpful: 12,
  },
  {
    id: "2",
    author: "자연인",
    rating: 4,
    comment: "한강 전망이 정말 좋네요. 다만 주말에는 사람이 많아서 조금 아쉬웠어요.",
    date: "2024.01.18",
    helpful: 8,
  },
  {
    id: "3",
    author: "걷기좋아",
    rating: 5,
    comment: "코스 설명이 자세해서 길을 잃지 않고 잘 걸을 수 있었어요. 추천합니다!",
    date: "2024.01.15",
    helpful: 15,
  },
]

// export function CourseReviews({ courseId, rating, reviewCount }: CourseReviewsProps) {
export function CourseReviews({ rating, reviewCount }: CourseReviewsProps) {
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">리뷰 ({reviewCount})</h2>
        <Button variant="outline" size="sm" className="bg-transparent">
          리뷰 작성
        </Button>
      </div>

      {/* Rating summary */}
      <Card className="p-4 mb-4 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">{rating}</div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-xs text-gray-600">{reviewCount}개 리뷰</div>
          </div>

          <div className="flex-1">
            <div className="space-y-1">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-3">{stars}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400 rounded-full"
                      style={{
                        width: `${stars === 5 ? 60 : stars === 4 ? 30 : stars === 3 ? 8 : stars === 2 ? 2 : 0}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8">
                    {stars === 5 ? "60%" : stars === 4 ? "30%" : stars === 3 ? "8%" : stars === 2 ? "2%" : "0%"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Individual reviews */}
      <div className="space-y-4">
        {SAMPLE_REVIEWS.map((review) => (
          <Card key={review.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-800">{review.author}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${star <= review.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.comment}</p>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-700 p-0">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    도움됨 {review.helpful}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load more reviews */}
      <div className="text-center mt-6">
        <Button variant="outline" className="bg-transparent">
          더 많은 리뷰 보기
        </Button>
      </div>
    </div>
  )
}
