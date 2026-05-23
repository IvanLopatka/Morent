"use client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { CarService, Car } from "@/lib/car.service";
import { CarCard } from "./CarCard";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
} from "./ui/carousel";

import { useSearchParams } from "next/navigation";
import { filterCars } from "@/lib/filter-utils";

export const MobilePopularCar: FC = () => {
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
    <Carousel className="lg:hidden mb-8 block px-4 mask-r-from-20% w-screen">
      <CarouselContent className="ml-2 pr-4 gap-x-5">
        {filteredCars.slice(0, 4).map((car) => (
          <CarouselItem className="basis-2/3 overflow-visible" key={car.id}>
            <CarCard
              id={car.id}
              name={car.name}
              type={car.type}
              image={car.thumbnail}
              price={car.price}
              seats={car.seats}
              spending={car.spending}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
