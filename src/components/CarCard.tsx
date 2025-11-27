"use client";
import React, { useState } from "react";
import { FC } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CarCardProps {
  className?: string;
  id: string;
  name: string;
  type: string;
  image: string;
  price: string;
  seats: string;
  spending: string;
}

export const CarCard: FC<CarCardProps> = ({
  id,
  name,
  type,
  image,
  price,
  seats,
  spending,
  className,
}) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div
      className={cn(
        "lg:w-[21vw] w-[65vw] overflow-hidden justify-between px-4 md:px-6 py-3 h-[310px] md:h-[380px] gap-y-4 flex flex-col rounded-[10px] bg-white",
        className
      )}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-1">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-400 font-semibold">{type}</p>
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
      <Image
        className="w-full p-5"
        src={image}
        alt={name}
        width={100}
        height={100}
      />
      <div className="flex flex-row justify-between items-center">
        <div className="flex gap-x-1">
          <Image src="/gas-station.svg" alt="fuel" width={24} height={24} />
          <p className="text-md text-gray-400 font-semibold">{spending}L</p>
        </div>
        <div className="flex gap-x-1">
          <Image src="/helm.svg" alt="helm" width={24} height={24} />
          <p className="text-md text-gray-400 font-semibold">Manual</p>
        </div>
        <div className="flex gap-x-1">
          <Image src="/profile-2user.svg" alt="person" width={24} height={24} />
          <p className="text-md text-gray-400 font-semibold">{seats}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="md:text-xl text-md text-nowrap text-black font-semibold">
          ${price}/ <span className="text-sm text-gray-400 ">day</span>
        </p>
        <Button
          onClick={() => router.push(`/catalog/${id}`)}
          variant="default"
          className="md:w-[120px] w-[100px] rounded-[4px] bg-blue-600 md:h-[44px] h-[36px]"
        >
          <p className="md:text-sm text-xs">Rent Now</p>
        </Button>
      </div>
    </div>
  );
};
