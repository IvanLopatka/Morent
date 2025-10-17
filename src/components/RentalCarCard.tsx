import React from "react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "./ui/button";

export const RentalCarCard: FC = () => {
  return (
    <div className="lg:flex hidden px-16 gap-8 mb-8 justify-center ">
      <div className="w-[45vw] bg-cover h-[360px] bg-bottom rounded-[10px] bg-[url('/left-ad.png')]">
        <div className="z-10 flex flex-col pl-6 gap-4 pt-6">
          <h2 className="text-white text-wrap text-[2rem] font-semibold ">
            The Best Platform <br /> for Car Rental
          </h2>
          <p className="text-white text-[1rem]">
            Ease of doing a car rental safely and <br /> reliably. Of course at
            a low price.
          </p>
          <Button
            variant="default"
            className="w-[120px] rounded-[4px] bg-blue-600 h-[44px]"
          >
            Rental Car
          </Button>
        </div>
      </div>

      <div className="w-[45vw] md:flex hidden h-[360px] bg-cover rounded-[10px] bg-[url('/right-ad.png')]">
        <div className="z-10 flex flex-col pl-6 gap-4 pt-6">
          <h2 className="text-white text-wrap text-[2rem] font-semibold ">
            Easy way to rent a <br /> car at a low price
          </h2>
          <p className="text-white text-[1rem]">
            Providing cheap car rental services <br /> and safe and comfortable
            facilities.
          </p>
          <Button
            variant="default"
            className="w-[120px] rounded-[4px] bg-blue-400 h-[44px]"
          >
            Rental Car
          </Button>
        </div>
      </div>
    </div>
  );
};
