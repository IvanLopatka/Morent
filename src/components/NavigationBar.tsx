"use client";
import Image from "next/image";
import { FC } from "react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const NavigationBar: FC = () => {
  return (
    <nav className="flex w-full px-6 lg:px-16  mb-0 lg:mb-8 lg:h-[124px] h-[96px] bg-white justify-between items-center">
      <div className="flex gap-16">
        <h3 className="lg:text-[32px] text-2xl font-bold text-shadow text-blue-500">
          MORENT
        </h3>
        <div className="relative items-center hidden lg:flex">
          <Input
            className="pl-12  rounded-2xl text-2xl"
            placeholder="Search something here"
            id="text"
            size={50}
            type="search"
          />
          <Image
            className="absolute top-2 left-3"
            src="./search.svg"
            alt="search"
            height={24}
            width={24}
          />
          <Button className="absolute right-0" type="button" variant="ghost">
            <Image src="./filter.svg" alt="filter" width={24} height={24} />
          </Button>
        </div>
      </div>
      <div className="flex gap-0 lg:gap-5">
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 hidden lg:flex border-2 rounded-full"
        >
          <Image src="./heart.svg" alt="heart" width={24} height={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 hidden lg:flex border-2 rounded-full"
        >
          <Image src="./notification.svg" alt="heart" width={24} height={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 hidden lg:flex border-2 rounded-full"
        >
          <Image src="./setting.svg" alt="heart" width={24} height={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 scale-[0.7] lg:scale-none border-2 rounded-full"
        >
          <Image src="./profile.svg" alt="heart" width={24} height={24} />
        </Button>
      </div>
    </nav>
  );
};
