"use client";

import { Cars } from "@/lib/Cars-data";
import { CarCard } from "./CarCard";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { filterCars } from "@/lib/filter-utils";

interface RecomendationCarProps {
  gridVariant?: "default" | "catalog";
}

export const RecomendationCar: FC<RecomendationCarProps> = ({ gridVariant = "default" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse filters from URL
  const filters = {
    types: searchParams.get("type")?.split(",") || [],
    capacities: searchParams.get("capacity")?.split(",") || [],
    maxPrice: parseInt(searchParams.get("price") || "100"),
  };

  const filteredCars = filterCars(Cars, filters);

  return (
    <div className="px-5 md:px-16 mt-8 mb-12 md:mb-16">
      <div className="flex px-2 justify-between items-center mb-5">
        <p className="md:text-base text-sm text-gray-400 font-semibold">
          Recomendation Car
        </p>
      </div>

      {filteredCars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">No cars found matching your filters.</p>
          <Button 
            variant="link" 
            onClick={() => router.push("/catalog")}
            className="text-blue-600 mt-2"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          {/* Mobile: show first 5 of filtered */}
          <div className="flex lg:hidden flex-wrap gap-y-8 justify-center">
            {filteredCars.slice(0, 5).map((Car) => (
              <div className="w-full" key={Car.id}>
                <CarCard
                  className="w-full h-full"
                  id={Car.id}
                  name={Car.name}
                  type={Car.type}
                  image={Car.thumbnail}
                  price={Car.price}
                  seats={Car.seats}
                  spending={Car.spending}
                />
              </div>
            ))}
          </div>

          {/* Large screens: show filtered cars */}
          <div className={
            `hidden lg:grid gap-8 ${
              gridVariant === "catalog" 
                ? "grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`
          }>
            {filteredCars.slice(0, gridVariant === "catalog" ? 9 : 8).map((Car) => (
              <div key={Car.id} className="flex justify-center">
                <CarCard
                  id={Car.id}
                  name={Car.name}
                  type={Car.type}
                  image={Car.thumbnail}
                  price={Car.price}
                  seats={Car.seats}
                  spending={Car.spending}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex h-11 mt-12 lg:mt-16 relative items-center justify-center w-full">
        <Button
          size="lg"
          onClick={() => router.push("/catalog")}
          className="h-full bg-blue-600"
        >
          Show more car
        </Button>
        <p className="text-sm absolute right-0 text-gray-400 font-semibold">{`${filteredCars.length} cars`}</p>
      </div>
    </div>
  );
};
