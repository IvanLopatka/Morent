
import { MobileAd, NavigationBar, Sidebar } from "@/components";
import { MobileSearch } from "@/components";
import { AboutUs } from "@/components";
import { CarInfo } from "@/components";
import { Reviews } from "@/components";

import { CarService } from "@/lib/car.service";

export default async function Home({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await CarService.getCarById(id);

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <MobileSearch />
      <div className="flex">
        <Sidebar />
        <div className="flex-col lg:p-8 p-6">
          <CarInfo
            id={id}
            car={car}
          />
          <Reviews />
        </div>
      </div>
      <AboutUs />
    </div>
  );
}
