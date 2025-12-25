import React from "react";
import { FC } from "react";
import { Cars } from "@/lib/Cars-data";
import { CarCard } from "./CarCard";

export const PopularCar: FC = () => {
  return (
    <div className="px-5 md:px-16 w-screen mb-0 md:mb-8">
      <div className="flex px-4 justify-between items-center mb-5">
        <p className="md:text-base text-sm text-gray-400 font-semibold">
          Popular Car
        </p>
        <p className="md:text-base text-xs font-semibold text-blue-600 ">
          View all
        </p>
      </div>
      <div className="hidden lg:flex justify-between">
        {Cars.slice(0, 4).map((Car) => (
          <div key={Car.id}>
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
    </div>
  );
};
