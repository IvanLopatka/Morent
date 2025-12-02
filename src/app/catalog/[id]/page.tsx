import { MobileAd, NavigationBar, Sidebar } from "@/components";
import { MobileSearch } from "@/components";
import { RentalCarCard } from "@/components";
import { CompareCars } from "@/components";
import { PopularCar } from "@/components";
import { MobilePopularCar } from "@/components";
import { RecomendationCar } from "@/components";
import { AboutUs } from "@/components";
import { CarInfo } from "@/components";
import { Cars } from "@/lib/Cars-data";
import { Reviews } from "@/components";

export default async function Home({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <MobileSearch />
      <div className="flex">
        <Sidebar />
        <div className="flex-col lg:p-8 p-6">
          <CarInfo
            id={id}
            name={""}
            type={""}
            image={""}
            price={""}
            seats={""}
            spending={""}
            description={""}
          />
          <Reviews />
        </div>
      </div>
      <AboutUs />
    </div>
  );
}
