"use client";
import React, { useState } from "react";
import { FC } from "react";
import { Cars } from "@/lib/Cars-data";
import Image from "next/image";
import { Button } from "./ui/button";

interface CarInfoProps {
  id: string;
  name: string;
  type: string;
  image: string;
  price: string;
  seats: string;
  spending: string;
  description: string;
}

export const CarInfo: FC<CarInfoProps> = ({
  id,
  name,
  type,
  image,
  price,
  seats,
  spending,
  description,
}) => {
  const Stars = [1, 2, 3, 4, 5];
  const car = Cars.find((car) => car.id === id);
  const [isLiked, setIsLiked] = useState(false);
  const [rating, setRating] = useState(0);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const handleRate = (index: number) => {
    setRating(index + 1);
  };
  return (
    <div className="p-8 flex w-full justify-between items-center">
      <div className="w-[40%] bg-white rounded-lg"></div>
      <div className="justify-center p-6 items-center flex flex-col gap-4 w-[40%] bg-white rounded-lg">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-bold">{car?.name}</h1>
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

        <p className="text-sm text-gray-500">{car?.type}</p>
        <p className="text-sm text-gray-500">{car?.description}</p>
        <p className="text-sm text-gray-500">${car?.price}/day</p>
        <p className="text-sm text-gray-500">{car?.seats} seats</p>
        <p className="text-sm text-gray-500">{car?.spending}L/day</p>
      </div>
    </div>
  );
};
