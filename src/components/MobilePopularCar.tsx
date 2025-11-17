import React from "react";
import { FC } from "react";
import Image from "next/image";
import { Cars } from "@/lib/Cars-data";
import { CarCard } from "./CarCard";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

export const MobilePopularCar: FC = () => {
  return (
    <Carousel className="lg:hidden mb-8 block px-4 mask-r-from-20% w-screen">
      <CarouselContent className="ml-2 pr-4 gap-x-5">
        {Cars.slice(0, 4).map((car) => (
          <CarouselItem className="basis-2/3 overflow-visible" key={car.id}>
            <CarCard
              name={car.name}
              type={car.type}
              image={car.image}
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
