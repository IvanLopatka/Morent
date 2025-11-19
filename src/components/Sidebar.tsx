"use client";
import React from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Cars } from "@/lib/Cars-data";

export const Sidebar = () => {
  const [maxPrice, setMaxPrice] = React.useState<number[]>([100]);
  return (
    <div className="lg:flex hidden px-8 flex-col items-center bg-white justify-center self-stretch ">
      <div className="pl-4 flex flex-col mt-12 gap-12 w-[360px] h-full ">
        <div className="flex flex-col gap-8">
          <p className="text-xs text-gray-500 font-semibold">Type</p>
          <div className="flex items-center gap-2">
            <Checkbox id="sport" />
            <Label htmlFor="sport">
              <span className="text-xl text-gray-500 font-semibold">Sport</span>
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.type === "Sportscar").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="suv" />
            <Label htmlFor="suv">
              <span className="text-xl text-gray-500 font-semibold">SUV</span>
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.type === "SUV").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="mpv" />
            <Label htmlFor="mpv">
              <span className="text-xl text-gray-500 font-semibold">MPV</span>
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.type === "MPV").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="sedan" />
            <Label htmlFor="sedan">
              <span className="text-xl text-gray-500 font-semibold">Sedan</span>
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.type === "Sedan").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="coupe" />
            <Label htmlFor="coupe">
              <span className="text-xl text-gray-500 font-semibold">Coupe</span>
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.type === "Coupe").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="hatchback" />
            <Label htmlFor="hatchback">
              <span className="text-xl text-gray-500 font-semibold">
                Hatchback
              </span>{" "}
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.type === "Hatchback").length})
              </span>
            </Label>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-xs text-gray-400 font-semibold">Capacity</p>
          <div className="flex items-center gap-2">
            <Checkbox id="2-person" />
            <Label htmlFor="2-person">
              <span className="text-xl text-gray-500 font-semibold">
                2 Person
              </span>{" "}
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.seats === "2").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="4-person" />
            <Label htmlFor="4-person">
              <span className="text-xl text-gray-500 font-semibold">
                4 Person
              </span>{" "}
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.seats === "4").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="6-person" />
            <Label htmlFor="6-person">
              <span className="text-xl text-gray-500 font-semibold">
                6 Person
              </span>{" "}
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.seats === "6").length})
              </span>
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="8-or-more" />
            <Label htmlFor="8-or-more">
              <span className="text-xl text-gray-500 font-semibold">
                8 or More
              </span>
              <span className="text-xl text-gray-400 font-semibold">
                ({Cars.filter((car) => car.seats === "8").length})
              </span>
            </Label>
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
