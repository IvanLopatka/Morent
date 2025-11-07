import { MobileAd, NavigationBar } from "@/components";
import { MobileSearch } from "@/components";
import { RentalCarCard } from "@/components";
import { CompareCars } from "@/components";
import { PopularCar } from "@/components/";

export default function Home() {
  return (
    <div className="grid mb-20 min-h-screen grid-rows-[auto_1fr_auto] items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <MobileSearch />
      <RentalCarCard />
      <MobileAd />
      <CompareCars />
      <PopularCar />
    </div>
  );
}
