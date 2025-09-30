import { Header } from "@/app/_components/layout/Header";
import { BottomNavigation } from "@/app/_components/layout/BottomNavigation";
import { HeroSection } from "@/app/_components/main/HeroSection";
import { FeatureCards } from "@/app/_components/main/FeatureCards";
import { WalkButton } from "@/app/_components/main/WalkButton";
import { CatCharactersSection } from "@/app/_components/main/CatCharactersSection";
import { PopularCourses } from "@/app/_components/main/PopularCourses";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <Header hideBackButton={true} />

      <main className="pb-20">
        <HeroSection />
        <FeatureCards />
        <WalkButton />
        <CatCharactersSection />
        <PopularCourses />
      </main>

      <BottomNavigation />
    </div>
  );
}
