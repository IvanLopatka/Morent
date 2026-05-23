"use client";

import React, { useEffect, useState } from "react";
import { FC } from "react";
import { CarCard } from "./CarCard";
import { CarService, Car } from "@/lib/car.service";
import { useSearchParams } from "next/navigation";
import { filterCars } from "@/lib/filter-utils";

export const PopularCar: FC = () => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      const pickUpLocation = searchParams.get("pickUpLocation") || undefined;
      const data = await CarService.getAllCars(pickUpLocation);
      setCars(data);
      setIsLoading(false);
    };
    fetchCars();
  }, [searchParams]);

  const filters = {
    types: searchParams.get("type")?.split(",") || [],
    capacities: searchParams.get("capacity")?.split(",") || [],
    maxPrice: parseInt(searchParams.get("price") || "500"),
    pickUpDate: searchParams.get("pickUpDate") || undefined,
    dropOffDate: searchParams.get("dropOffDate") || undefined,
  };

  const filteredCars = filterCars(cars, filters);

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
      <div className="hidden gap-4 lg:flex justify-between">
        {filteredCars.slice(0, 4).map((car) => (
          <div key={car.id}>
            <CarCard
              id={car.id}
              name={car.name}
              type={car.type}
              image={car.thumbnail}
              price={car.price}
              seats={car.seats}
              spending={car.spending}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
