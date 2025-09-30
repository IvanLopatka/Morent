import React from "react";
import Image from "next/image";
import { FC } from "react";

export const RentalCarCard: FC = () => {
  return (
    <div className="lg:flex hidden px-16 gap-8 justify-center ">
      <div className="lg:w-[45vw] overflow-hidden bg-cover h-[360px] rounded-[10px] bg-[url('/left-ad.png')]"></div>

      <div className="w-[45vw] md:flex hidden h-[360px] rounded-[10px] bg-blue-500"></div>
    </div>
  );
};
