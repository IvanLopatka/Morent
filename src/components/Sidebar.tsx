"use client";
import React from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";

export const Sidebar = () => {
  const [maxPrice, setMaxPrice] = React.useState<number[]>([100]);
  return (
    <div className="lg:flex hidden px-8 flex-col items-center bg-white justify-center self-stretch ">
      <div className="pl-4 flex flex-col mt-12 gap-12 w-[360px] h-full ">
        <div className="flex flex-col gap-8">
          <p className="text-xs text-gray-500 font-semibold">Type</p>
          <div className="flex gap-2">
            <Checkbox id="sport" />
            <Label htmlFor="sport">Sport</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="suv" />
            <Label htmlFor="suv">SUV</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="mpv" />
            <Label htmlFor="mpv">MPV</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="sedan" />
            <Label htmlFor="sedan">Sedan</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="coupe" />
            <Label htmlFor="coupe">Coupe</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="hatchback" />
            <Label htmlFor="hatchback">Hatchback</Label>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-xs text-gray-500 font-semibold">Capacity</p>
          <div className="flex gap-2">
            <Checkbox id="2-person" />
            <Label htmlFor="2-person">2 Person</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="4-person" />
            <Label htmlFor="4-person">4 Person</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="6-person" />
            <Label htmlFor="6-person">6 Person</Label>
          </div>
          <div className="flex gap-2">
            <Checkbox id="8-or-more" />
            <Label htmlFor="8-or-more">8 or More</Label>
          </div>
        </div>
        <div className="flex h-5 flex-col gap-8">
          <p className="text-xs text-gray-500 font-semibold">Price</p>
          <Slider
            className="h-full"
            defaultValue={[100]}
            max={100}
            step={1}
            value={maxPrice}
            onValueChange={setMaxPrice}
          />

          <div className="text-xs text-gray-500 font-semibold">
            Max. ${maxPrice[0].toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
