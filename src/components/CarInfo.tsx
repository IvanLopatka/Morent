"use client";
import React, { useState } from "react";
import { FC } from "react";
import { Cars } from "@/lib/Cars-data";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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

export const CarInfo: FC<CarInfoProps> = ({ id }) => {
  const router = useRouter();
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
    <div className="flex lg:flex-row mb-8 flex-col w-full gap-y-8 lg:justify-between items-stretch">
      <div className="lg:w-[47%] pl-4 flex lg:h-max-content lg:justify-center justify-start items-center bg-cover bg-[url('/background.png')] w-full rounded-lg">
        <Image
          src={car?.image || ""}
          alt={car?.name || ""}
          width={200}
          height={200}
          className="w-full object-cover"
        />
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
