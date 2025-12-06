import { NavigationBar } from "@/components";
import { MobileSearch } from "@/components";
import { CompareCars } from "@/components";

import { RecomendationCar } from "@/components";
import { Sidebar } from "@/components";
import { AboutUs } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <MobileSearch />
      <div className="flex ">
        <Sidebar />
        <div className="flex-col">
          <CompareCars gapVariant="catalog" widthVariant="catalog" />
          <RecomendationCar />
        </div>
      </div>
      <AboutUs />
    </div>
  );
}
