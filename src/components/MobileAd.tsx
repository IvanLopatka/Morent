import React from "react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/button";

export const MobileAd: FC = () => {
  return (
    <div className="px-6 mb-8">
      <div className="lg:hidden rounded-2xl bg-bottom bg-cover h-[232px] bg-[url('/mobile-ad.png')]">
        <div className="z-10 flex flex-col pl-6 gap-4 pt-6">
          <h2 className="text-white text-wrap font-semibold ">
            The Best Platform for Car Rental
          </h2>
          <p className="text-white text-xs">
            Providing cheap car rental services <br /> and safe and comfortable
            facilities.
          </p>
          <Button
            variant="default"
            className="w-[120px] rounded-[4px] bg-blue-600 h-[44px]"
          >
            Rental Car
          </Button>
        </div>
      </div>
    </div>
  );
};
