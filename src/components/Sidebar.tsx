"use client";
import React from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Cars } from "@/lib/Cars-data";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Initialize state from URL
  const selectedTypes = searchParams.get("type")?.split(",") || [];
  const selectedCapacities = searchParams.get("capacity")?.split(",") || [];
  const initialPrice = parseInt(searchParams.get("price") || "100");
  const [maxPrice, setMaxPrice] = React.useState<number[]>([initialPrice]);

  const updateFilters = (key: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(",") || [];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index > -1) {
        currentValues.splice(index, 1);
      }
    }

    if (currentValues.length > 0 && currentValues[0] !== "") {
      params.set(key, currentValues.join(","));
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updatePriceFilter = (value: number[]) => {
    setMaxPrice(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("price", value[0].toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const types = [
    { id: "sport", label: "Sport", value: "Sportscar" },
    { id: "suv", label: "SUV", value: "SUV" },
    { id: "mpv", label: "MPV", value: "MPV" },
    { id: "sedan", label: "Sedan", value: "Sedan" },
    { id: "coupe", label: "Coupe", value: "Coupe" },
    { id: "hatchback", label: "Hatchback", value: "Hatchback" },
  ];

  const capacities = [
    { id: "2-person", label: "2 Person", value: "2" },
    { id: "4-person", label: "4 Person", value: "4" },
    { id: "6-person", label: "6 Person", value: "6" },
    { id: "8-or-more", label: "8 or More", value: "8" },
  ];

  return (
    <div className="lg:flex hidden px-8 flex-col items-center border-y border-gray-100 bg-white justify-center self-stretch ">
      <div className="pl-4 flex flex-col mt-12 gap-12 w-[360px] h-full ">
        <div className="flex flex-col gap-8">
          <p className="text-base text-gray-500 font-semibold">Type</p>
          {types.map((type) => (
            <div className="flex items-center gap-2" key={type.id}>
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.value)}
                onCheckedChange={(checked) =>
                  updateFilters("type", type.value, checked as boolean)
                }
              />
              <Label htmlFor={type.id}>
                <span className="text-xl text-gray-500 font-semibold">
                  {type.label}
                </span>
                <span className="text-xl text-gray-400 font-semibold ml-1">
                  ({Cars.filter((car) => car.type === type.value).length})
                </span>
              </Label>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-base text-gray-500 font-semibold">Capacity</p>
          {capacities.map((cap) => (
            <div className="flex items-center gap-2" key={cap.id}>
              <Checkbox
                id={cap.id}
                checked={selectedCapacities.includes(cap.value)}
                onCheckedChange={(checked) =>
                  updateFilters("capacity", cap.value, checked as boolean)
                }
              />
              <Label htmlFor={cap.id}>
                <span className="text-xl text-gray-500 font-semibold">
                  {cap.label}
                </span>
                <span className="text-xl text-gray-400 font-semibold ml-1">
                  ({Cars.filter((car) => {
                    if (cap.value === "8") return parseInt(car.seats) >= 8;
                    return car.seats === cap.value;
                  }).length})
                </span>
              </Label>
            </div>
          ))}
        </div>

        <div className="flex h-5 flex-col gap-8">
          <p className="text-base text-gray-500 font-semibold">Price</p>
          <Slider
            className="h-full"
            max={100}
            step={1}
            value={maxPrice}
            onValueChange={updatePriceFilter}
          />

          <div className="text-base text-gray-500 font-semibold">
            Max. ${maxPrice[0].toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};
