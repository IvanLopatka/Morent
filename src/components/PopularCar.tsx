"use client";

import React, { useEffect, useState } from "react";
import { FC } from "react";
import { CarCard } from "./CarCard";
import { CarService, Car } from "@/lib/car.service";

export const PopularCar: FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      const data = await CarService.getAllCars();
      setCars(data);
      setIsLoading(false);
    };
    fetchCars();
  }, []);

  if (isLoading) return null;

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
        {cars.slice(0, 4).map((Car) => (
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
