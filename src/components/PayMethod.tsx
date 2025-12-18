import React from "react";
import { FC } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";

export const PayMethod: FC = () => {
  return (
    <div className="flex flex-col lg:w-[60vw] w-full gap-4">
      <div className="flex flex-col bg-white rounded-lg p-6 gap-4">

        <div className="flex flex-row items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Pay Method</h1>{" "}
            <span className="text-sm text-gray-500">Enter your pay method</span>
          </div>
          <span className="text-sm text-gray-500">Step 3 of 4</span>
        </div>
        <div className="flex flex-col w-full bg-gray-50 rounded-lg gap-8 p-6">
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2"><Image src="/pick-up-mark.svg" alt="card" width={16} height={16} />
            <span className="text-lg font-semibold">Credit Card</span></div>
            <Image src="/visa.svg" alt="arrow" width={92} height={56} />
          </div>
        <div className="flex flex-col gap-8">
          <div className="flex lg:flex-row gap-y-8 flex-col w-full items-center justify-between">
            <div className="flex lg:w-[45%]  w-full flex-col gap-4">
              <span className="text-lg font-semibold">Card Number</span>
              <Input type="number" placeholder="Card Number"  className="border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none   shadow-none h-[56px] bg-white outline-none w-full"/>
            </div>
            <div className="flex lg:w-[45%] w-full flex-col gap-4">
              <span className="text-lg font-semibold">Expration Date</span>
              <Input type="number"  placeholder="DD/MM/YY"  className="border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-none h-[56px] bg-white outline-none w-full"/>
            </div>
          </div>


          <div className="flex lg:flex-row gap-y-8 flex-col w-full items-center justify-between">
            <div className="flex lg:w-[45%] w-full flex-col gap-4">
              <span className="text-lg font-semibold">Card Holder</span>
              <Input type="text" placeholder="Card Holder"  className="border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-none h-[56px] bg-white outline-none w-full"/>
            </div>

            <div className="flex lg:w-[45%] w-full flex-col gap-4">
              <span className="text-lg font-semibold">CVV</span>
              <Input type="number"  placeholder="CVV"  className="border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-none h-[56px] bg-white outline-none w-full"/>
            </div>
          </div>


        </div>

        </div>
        <div className="flex flex-row justify-between items-center w-full bg-gray-50 rounded-lg px-8 py-4">
          <div className="flex items-center gap-4"><Checkbox className="h-[20px] w-[20px] border-2 rounded-lg" /> <span className="text-lg font-semibold">PayPal</span></div> 
          <Image src="/PayPal.svg" alt="paypal" width={120} height={60} />
        </div>
        <div className="flex flex-row justify-between items-center w-full bg-gray-50 rounded-lg px-8 py-4">
          <div className="flex items-center gap-4"><Checkbox className="h-[20px] w-[20px] border-2 rounded-lg" /> <span className="text-lg font-semibold">Bitcoin</span></div> 
          <Image src="/Bitcoin.svg" alt="bitcoin" width={120} height={60} />
        </div>
      </div>
    </div>
  );
};
