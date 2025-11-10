"use client";
import React from "react";
import { Cars } from "@/lib/Cars-data";
import { CarCard } from "./CarCard";
import { FC } from "react";

export const RecomendationCar: FC = () => {
  return (
    <div className="px-5 md:px-16 w-screen mb-0 md:mb-8">
      <div className="flex px-2 justify-between items-center mb-5">
        <p className="md:text-base text-sm text-gray-400 font-semibold">
          Recomendation Car
        </p>
      </div>
      {/* Mobile: show first 5 */}
      <div className="flex lg:hidden flex-wrap gap-y-8 justify-center">
        {Cars.slice(0, 5).map((Car) => (
          <div className="w-screen" key={Car.id}>
            <CarCard
              className="w-full h-full"
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
        {Cars.slice(0, 8).map((Car) => (
          <div key={Car.id}>
            <CarCard
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
    </div>
  );
};
