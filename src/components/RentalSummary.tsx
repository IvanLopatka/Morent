import React from "react";
import { Cars } from "@/lib/Cars-data";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

interface RentalSummaryProps {
  id: string;
  name: string;
  image: string;
  price: string;
}

export const RentalSummary: React.FC<RentalSummaryProps> = ({ id }) => {
  const car = Cars.find((car) => car.id === id);
  const rating = [1, 2, 3, 4, 5];
  return (
    <div className="flex h-fit gap-8 flex-col bg-white rounded-lg p-6 lg:w-[35vw] w-full">
      <div className="flex gap-1 flex-col">
        <h1 className="text-2xl font-bold">Rental Summary</h1>
        <h2 className="text-sm font-medium text-gray-500">
          Prices may change depending on the length of the rental and the price
          of your rental car.
        </h2>
      </div>
      <div className="flex flex-row">
        <div className="flex rounded-lg min-h-[148px] items-center justify-center bg-[url('/background.png')] bg-cover bg-center lg:w-1/2 w-full h-[50%] lg:h-full">
          <Image
            src={car?.image || ""}
            alt={car?.name || ""}
            width={116}
            height={36}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex  p-4 flex-col">
          <h3 className="md:text-3xl text-2xl font-bold">{car?.name}</h3>
          <div className="flex flex-row gap-y-2">
            {rating.map((rating: number) => (
              <div key={rating} className="flex w-[24px] h-[24px] flex-row">
                <Image
                  src={
                    rating < 5
                      ? "/passive-rate-star.svg"
                      : "/active-rate-star.svg"
                  }
                  alt="star"
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl text-gray-500 font-medium">Subtotal</h3>
          <p className="text-lg text-black font-medium">${car?.price}/day</p>
        </div>
        <div className="flex flex-row justify-between">
          <h3 className="text-xl text-gray-500 font-medium">Tax</h3>
          <p className="text-lg text-black font-medium">$0.00</p>
        </div>
      </div>

      <div className="flex relative h-[56px] gap-x-2 flex-row">
        <Input
          type="text"
          placeholder="Apply promo code"
          className=" h-full w-full"
        />
        <Button className="bg-white rounded-none shadow-none h-full border-t-1 border-b-1 absolute right-4 ">
          {" "}
          <p className="text-lg text-black">Apply now</p>
        </Button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl text-black font-medium">Total Rental Price</h3>
          <h4 className="text-sm text-gray-500 font-medium">
            Overall price and includes rental discount
          </h4>
        </div>
        <p className="md:text-3xl text-2xl text-black font-bold">
          ${car?.price}
        </p>
      </div>
    </div>
  );
};
