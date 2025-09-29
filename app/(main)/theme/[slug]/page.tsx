"use client";

import { useState, useEffect } from "react";
import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { CatCharacter } from "@/app/_components/cat/CatCharacter";
import { Card } from "@/app/_components/ui/Card";
import { Button } from "@/app/_components/ui/Button";
import { MapPin, Clock, Users, Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/app/_components/ui/SafeImage";
import { getExtendedThemeInfo, THEME_OPTIONS } from "@/app/_constants/themes";
import { fetchCoursesByTheme } from "@/app/_libs/themes";
import type { PopularCourse } from "@/app/_types/post";



type PageParams = Promise<{ slug: string }>;

export default function ThemeCoursesPage({ params }: { params: PageParams }) {
	const [slug, setSlug] = useState<string>("");
	const [courses, setCourses] = useState<PopularCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// params에서 slug 추출
	useEffect(() => {
		params.then(({ slug }) => {
			console.log(`[Client] Loading theme page for slug: ${slug}`);
			setSlug(slug);
		});
	}, [params]);

	// 테마별 코스 데이터 로드
	useEffect(() => {
		if (!slug) {
			console.log(`[Client] No slug provided, skipping data load`);
			return;
		}

		console.log(`[Client] Starting data load for slug: ${slug}`);

		const loadCourses = async () => {
			setLoading(true);
			setError(null);
			
			try {
				// URL 인코딩된 slug를 디코딩
				const decodedSlug = decodeURIComponent(slug);
				console.log(`[Client] Calling fetchCoursesByTheme for theme: ${slug} (decoded: ${decodedSlug})`);
				const fetchedCourses = await fetchCoursesByTheme(decodedSlug, 100);
				console.log(`[Client] fetchCoursesByTheme returned ${fetchedCourses.length} courses:`, fetchedCourses);
				setCourses(fetchedCourses);
			} catch (err) {
				console.error(`[Client] Error in fetchCoursesByTheme for theme ${slug}:`, err);
				setError('코스를 불러오는데 실패했습니다.');
				setCourses([]);
			} finally {
				console.log(`[Client] Finished loading courses for theme: ${slug}`);
				setLoading(false);
			}
		};

		loadCourses();
	}, [slug]);

	// 테마 정보 가져오기 (URL 디코딩된 slug 사용)
	const themeInfo = slug ? getExtendedThemeInfo(decodeURIComponent(slug)) : null;
	
	// 테마가 존재하지 않는 경우
	if (slug && !themeInfo) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
				<Header />
				<main className="pb-20 px-4 py-8">
					<div className="text-center">
						<CatCharacter size="lg" animation="wiggle" />
						<h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">테마를 찾을 수 없어요</h2>
						<p className="text-gray-600 mb-6">다른 테마를 둘러보시겠어요?</p>
						<Link href="/theme">
							<Button>테마 목록으로 돌아가기</Button>
						</Link>
					</div>
				</main>
				<BottomNavigation />
			</div>
		);
	}

	// 로딩 중이거나 테마 정보가 없는 경우
	if (!themeInfo) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
				<Header />
				<main className="pb-20 px-4 py-8">
					<div className="text-center">
						<CatCharacter size="lg" animation="bounce" />
						<h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">테마를 로드하는 중...</h2>
					</div>
				</main>
				<BottomNavigation />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
			<Header />

			<main className="pb-20">
				{/* Theme header */}
				<div className={`bg-gradient-to-r ${themeInfo.color} text-white`}>
					<div className="px-4 py-6">
						<div className="flex items-center gap-2 mb-4">
							<Link href="/theme">
								<Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
									<ArrowLeft className="h-4 w-4" />
								</Button>
							</Link>
							<span className="text-sm text-white/90">테마별 코스</span>
						</div>

						<div className="flex items-center gap-4 mb-4">
							<span className="text-4xl">{themeInfo.emoji}</span>
							<div>
								<h1 className="text-2xl font-bold">{themeInfo.name}</h1>
								<p className="text-white/90">{themeInfo.description}</p>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<span className="text-sm text-white/90">{courses.length}개의 코스</span>
							<div className="flex items-center gap-2">
								<Star className="h-4 w-4 fill-current" />
							</div>
						</div>
					</div>
				</div>

				{/* Course list */}
				<div className="px-4 py-6">
					{loading ? (
						<div className="text-center py-12">
							<CatCharacter size="lg" animation="bounce" />
							<h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">코스를 불러오는 중...</h3>
							<p className="text-gray-600">잠시만 기다려주세요</p>
						</div>
					) : error ? (
						<div className="text-center py-12">
							<CatCharacter size="lg" animation="wiggle" />
							<h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">코스를 불러올 수 없어요</h3>
							<p className="text-gray-600 mb-6">{error}</p>
							<Button onClick={() => window.location.reload()}>
								다시 시도
							</Button>
						</div>
					) : courses.length === 0 ? (
						<div className="space-y-8">
							{/* 코스가 없을 때 메시지 */}
							<div className="text-center py-8">
								<CatCharacter size="lg" animation="wiggle" />
								<h3 className="text-lg font-bold text-gray-800 mt-4 mb-2">아직 코스가 없어요</h3>
								<p className="text-gray-600 mb-6">{themeInfo.name} 테마의 첫 번째 코스를 만들어보시겠어요?</p>
								<div className="flex gap-2 justify-center">
									<Link href="/walk">
										<Button>코스 만들기</Button>
									</Link>
								</div>
							</div>

							{/* 다른 테마 둘러보기 섹션 */}
							<div className="px-4">
								<div className="mb-4">
									<h3 className="text-lg font-bold text-gray-800 mb-2">다른 테마 둘러보기</h3>
									<p className="text-sm text-gray-600">관심있는 다른 테마의 코스를 확인해보세요</p>
								</div>

								<div className="grid grid-cols-2 gap-3">
									{THEME_OPTIONS.filter(theme => theme.label !== decodeURIComponent(slug)).map((theme) => (
										<Link key={theme.label} href={`/theme/${theme.label}`}>
											<Card className="p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-gray-50">
												<div className={`bg-gradient-to-r ${theme.gradient || 'from-purple-400 to-pink-500'} rounded-lg p-3 text-white mb-3`}>
													<div className="text-center">
														<span className="text-2xl block mb-1">{theme.emoji}</span>
													</div>
												</div>
												<div className="text-center">
													<h4 className="font-medium text-sm mb-1 text-gray-800">
														{theme.label}
													</h4>
													<p className="text-xs text-gray-600">이 테마의 산책 코스</p>
												</div>
											</Card>
										</Link>
									))}
								</div>
							</div>
						</div>
					) : (
						<div className="space-y-4">
							{courses.map(course => (
								<Card key={course.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
									<div className="flex">
										<div className="w-24 h-24 bg-gray-200 overflow-hidden">
											<SafeImage
												src={course.imageUrl}
												alt={course.title}
												width={96}
												height={96}
												className="w-full h-full object-cover"
											/>
										</div>

										<div className="flex-1 p-4">
											<div className="flex items-start justify-between mb-2">
												<h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
												<div className="flex items-center gap-1 text-sm text-orange-600">
													<Star className="h-4 w-4 fill-current" />
													<span>{course.likeCount}</span>
												</div>
											</div>

											<p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.theme} 테마 코스</p>

											<div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
												<div className="flex items-center gap-1">
													<MapPin className="h-3 w-3" />
													<span>{course.region}</span>
												</div>
												<div className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													<span>{course.duration}</span>
												</div>
												<div className="flex items-center gap-1">
													<Users className="h-3 w-3" />
													<span>{course.distance}</span>
												</div>
											</div>

											<div className="flex items-center justify-between">
												<div className="flex flex-wrap gap-1">
													<span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
														#{course.theme}
													</span>
													<span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
														#{course.region}
													</span>
												</div>
												<Link href={`/course/${course.id}`}>
													<Button size="sm" className="bg-gray-800 hover:bg-gray-900 text-white">
														자세히 보기
													</Button>
												</Link>
											</div>
										</div>
									</div>
								</Card>
							))}
						</div>
					)}
				</div>
			</main>

			<BottomNavigation />
		</div>
	);
}
