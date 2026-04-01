"use client";
import { cn } from "@/lib/utils";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";




import React, { useState } from "react";
import { FC } from "react";
import { Car } from "@/lib/car.service";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface CarInfoProps {
  id: string;
  car?: Car | null;
}

export const CarInfo: FC<CarInfoProps> = ({ id, car }) => {
  const images = car ? [car.thumbnail, ...(car.gallery || [])] : [];
  const [activeIndex, setActiveIndex] = useState(0);


  const router = useRouter();
  const Stars = [1, 2, 3, 4, 5];

  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const handleRate = (index: number) => {
    setRating(index + 1);
  };
  return (
    <div className="flex lg:flex-row mb-8 flex-col w-full gap-y-8 lg:justify-between ">
      <div className="lg:w-[47%] pl-4 flex h-fit min-h-[300px] lg:justify-center items-center px-4 w-full rounded-lg">
        <div className="flex flex-col gap-4 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl cursor-zoom-in bg-none">
                {images.length > 0 && (
                  <Image
                    src={images[activeIndex]}
                    alt={car?.name || "Car image"}
                    fill
                    className="object-contain p-4"
                    priority
                  />
                )}
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] h-[90vh] p-0 bg-transparent border-none flex flex-col items-center justify-center">
              <DialogHeader className="sr-only">
                <DialogTitle>{car?.name} Gallery</DialogTitle>
              </DialogHeader>

              <Carousel 
                className="w-full max-w-[80vw]" 
                opts={{ startIndex: activeIndex }}
              >
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="flex items-center justify-center h-[80vh]">
                      <div className="relative w-full h-full">
                        <Image
                          src={image}
                          alt={`${car?.name} - image ${index + 1}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-white/20 hover:bg-white/40 border-none text-white" />
                <CarouselNext className="right-4 bg-white/20 hover:bg-white/40 border-none text-white" />
              </Carousel>
            </DialogContent>
          </Dialog>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all",
                  activeIndex === index ? "border-blue-500 ring-2 ring-blue-500/20" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={image}
                  alt={`${car?.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

      </div>
      <div className="justify-center p-6 items-center flex flex-col gap-4 lg:w-[47%] w-full bg-white rounded-lg self-stretch">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-bold">{car?.name}</h1>
            <div className="flex gap-1 flex-row">
              {Stars.map((star, idx) => (
                <div key={star} className="flex flex-row">
                  <Button
                    key={star}
                    className="border-none w-[20px] h-[20px] shadow-none bg-white"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRate(idx)}
                  >
                    <Image
                      src={
                        idx < rating
                          ? "/active-rate-star.svg"
                          : "/passive-rate-star.svg"
                      }
                      alt="star"
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="border-none shadow-none bg-white"
            variant="outline"
            size="icon"
            onClick={handleLike}
          >
            <Image
              src={isLiked ? "/red-like.svg" : "/hollow-like.svg"}
              alt="heart"
              width={24}
              height={24}
            />
          </Button>
        </div>

        <p className="text-xl my-8 text-gray-500">{car?.description}</p>
        <div className="flex w-full mb-8 flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="text-xl font-semibold text-black"> {car?.type}</p>
            <p className="text-xl font-semibold text-black">
              {car?.seats} seats
            </p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-xl font-semibold text-black">
              {car?.spending}L/day
            </p>
            <p className="text-xl font-semibold text-black">Manual</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="lg:text-2xl text-xl font-semibold text-black">
            ${car?.price}/day
          </p>
          <Button
            className="lg:h-[56px] lg:w-[140px] h-[44px] w-[100px] bg-blue-600"
            variant="default"
            size="default"
            onClick={() => router.push(`/payment/${id}`)}
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};
