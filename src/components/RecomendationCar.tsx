"use client";
import React from "react";
import { Cars } from "@/lib/Cars-data";
import { CarCard } from "./CarCard";
import { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const RecomendationCar: FC = () => {
  const router = useRouter();
  return (
    <div className="px-5 md:px-16 mt-8 mb-12 md:mb-16">
      <div className="flex px-2 justify-between items-center mb-5">
        <p className="md:text-base text-sm text-gray-400 font-semibold">
          Recomendation Car
        </p>
      </div>
      {/* Mobile: show first 5 */}
      <div className="flex lg:hidden flex-wrap gap-y-8 justify-center">
        {Cars.slice(0, 5).map((Car) => (
          <div className="w-full" key={Car.id}>
            <CarCard
              className="w-full h-full"
              id={Car.id}
              name={Car.name}
              type={Car.type}
              image={Car.image}
              price={Car.price}
              seats={Car.seats}
              spending={Car.spending}
            />
          </div>
        ))}
      </div>
      {/* Large screens: show first 8 */}
      <div className="hidden lg:flex flex-wrap gap-y-8 justify-between">
        {Cars.slice(0, 9).map((Car) => (
          <div key={Car.id}>
            <CarCard
              id={Car.id}
              name={Car.name}
              type={Car.type}
              image={Car.image}
              price={Car.price}
              seats={Car.seats}
              spending={Car.spending}
            />
          </div>
        ))}
      </div>
      <div className="flex h-11 mt-12 lg:mt-16 relative items-center justify-center w-full">
        <Button
          size="lg"
          onClick={() => router.push("/catalog")}
          className="h-full bg-blue-600"
        >
          Show more car
        </Button>
        <p className="text-sm absolute right-0 text-gray-400 font-semibold">{`${Cars.length} cars`}</p>
      </div>
    </div>
  );
};
