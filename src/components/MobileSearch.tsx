import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FC } from "react";
import Image from "next/image";

export const MobileSearch: FC = () => {
  return (
    <div className="w-full relative px-6 mb-8 h-[48px] bg-white justify-center gap-x-4 items-center lg:hidden flex">
      <Input
        className="pl-12 rounded-2xl h-full text-xl"
        placeholder="Search something here"
        id="text"
        type="search"
      />
      <Image
        className="absolute top-3 left-9"
        src="/search.svg"
        alt="search"
        height={24}
        width={24}
      />
      <Button
        className="w-[48px] h-full rounded-lg"
        type="button"
        size="icon"
        variant="outline"
      >
        <Image src="/filter.svg" alt="filter2" width={24} height={24} />
      </Button>
    </div>
  );
};
