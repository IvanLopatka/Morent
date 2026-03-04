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

export const MobilePopularCar: FC = () => {
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
    <Carousel className="lg:hidden mb-8 block px-4 mask-r-from-20% w-screen">
      <CarouselContent className="ml-2 pr-4 gap-x-5">
        {cars.slice(0, 4).map((car) => (
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
