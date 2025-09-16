import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FC } from "react";
import Image from "next/image";

export const MobileSearch: FC = () => {
  return (
    <div className="mx-auto flex">
      <div className="relative flex justify-center gap-4 items-center lg:hidden :flex">
        <Input
          className="pl-12 rounded-2xl text-xl"
          placeholder="Search something here"
          id="text"
          type="search"
        />
        <Image
          className="absolute top-2 left-3"
          src="./search.svg"
          alt="search"
          height={24}
          width={24}
        />
        <Button
          className="w-[36-px]"
          type="button"
          size="icon"
          variant="outline"
        >
          <Image src="./filter.svg" alt="filter2" width={24} height={24} />
        </Button>
      </div>
    </div>
  );
};
