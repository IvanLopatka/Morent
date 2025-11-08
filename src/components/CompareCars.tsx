"use client";
import React from "react";
import { FC } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { getCities } from "@/lib/api";

interface CarLocation {
  city: {
    name: string;
  };
  date?: Date;
  time: string;
}

export const CompareCars: FC = () => {
  const { data: cityNames = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const [pickUpLocation, setPickUpLocation] = useState<CarLocation>({
    city: {
      name: "",
    },
    date: undefined,
    time: "",
  });
  const [dropOffLocation, setDropOffLocation] = useState<CarLocation>({
    city: {
      name: "",
    },
    date: undefined,
    time: "",
  });

  const hourOptions = Array.from(
    { length: 24 },
    (_, hour) => `${String(hour).padStart(2, "0")}:00`
  );

  const handlePickUpLocationChange = (location: CarLocation) => {
    setPickUpLocation({
      ...pickUpLocation,
      ...location,
    });
  };
  const handleDropOffLocationChange = (location: CarLocation) => {
    setDropOffLocation({
      ...dropOffLocation,
      ...location,
    });
  };
  const handleSwapLocations = () => {
    const temp = pickUpLocation;
    setPickUpLocation(dropOffLocation);
    setDropOffLocation(temp);
  };

  return (
    <div className="flex w-screen flex-col lg:flex-row px-6 mb-8  lg:px-16 justify-center lg:justify-between gap-8 items-center">
      <Popover>
        <div className="flex justify-center w-[87vw] gap-y-4 bg-white p-4 lg:px-12 lg:py-6 rounded-[10px] flex-col">
          <div className="flex gap-4 flex-row">
            <Image
              alt="pick-up"
              src="./pick-up-mark.svg"
              width={16}
              height={16}
            />
            <p className="font-semibold">Pick - Up</p>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-[40%] lg:w-2/3">
              <p className="font-bold">Location</p>

              <Select
                value={pickUpLocation.city.name}
                onValueChange={(value) =>
                  setPickUpLocation((prev) => ({
                    ...prev,
                    city: { name: value },
                  }))
                }
              >
                <SelectTrigger className="border-none p-0 shadow-none">
                  <p className="text-xs font-medium hover:underline  text-gray-500">
                    {pickUpLocation.city.name
                      ? pickUpLocation.city.name
                      : "Select your city"}
                  </p>
                </SelectTrigger>
                <SelectContent>
                  {cityNames.length > 0 ? (
                    cityNames.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="No cities found">
                      No cities found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="w-[40%] lg:w-2/3 ">
              <p className="font-bold mb-[10px]">Date</p>
              <PopoverTrigger asChild>
                <p className="text-xs font-medium hover:underline  text-gray-500">
                  {pickUpLocation.date
                    ? pickUpLocation.date.toLocaleDateString()
                    : "Select your date"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={pickUpLocation.date}
                  onSelect={(date) =>
                    setPickUpLocation((prev) => ({ ...prev, date }))
                  }
                  className="rounded-md border-none"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </div>

            <div className="w-[20%] lg:w-1/3 flex flex-col">
              <p className="flex-wrap font-bold">Time</p>
              <Select
                value={pickUpLocation.time || undefined}
                onValueChange={(value) =>
                  setPickUpLocation((prev) => ({ ...prev, time: value }))
                }
              >
                <SelectTrigger className="border-none p-0 shadow-none">
                  <SelectValue placeholder="-:-" />
                </SelectTrigger>

                <SelectContent>
                  {hourOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Popover>

      <Button
        size="icon"
        className="w-15 absolute lg:relative h-15 bg-blue-600"
        onClick={handleSwapLocations}
      >
        <Image src="./swap.svg" alt="swap" width={24} height={24} />
      </Button>
      <Popover>
        <div className="flex justify-start gap-y-4 w-[87vw] bg-white p-4 lg:px-12 lg:py-6 rounded-[10px] flex-col">
          <div className="flex gap-2 flex-row">
            <Image
              alt="drop-off"
              src="./drop-off-mark.svg"
              width={16}
              height={16}
            />
            <p className="font-semibold">Drop - Off</p>
          </div>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col w-[40%] lg:w-2/3">
              <p className="font-bold">Location</p>

              <Select
                value={dropOffLocation.city.name}
                onValueChange={(value) =>
                  setDropOffLocation((prev) => ({
                    ...prev,
                    city: { name: value },
                  }))
                }
              >
                <SelectTrigger className="border-none p-0 shadow-none">
                  <p className="text-xs font-medium hover:underline  text-gray-500">
                    {dropOffLocation.city.name
                      ? dropOffLocation.city.name
                      : "Select your city"}
                  </p>
                </SelectTrigger>
                <SelectContent>
                  {cityNames.length > 0 ? (
                    cityNames.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="No cities found">
                      No cities found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col w-[40%] lg:w-2/3">
              <p className="font-bold mb-[10px]">Date</p>
              <PopoverTrigger asChild>
                <p className="text-xs font-medium hover:underline text-gray-500">
                  {dropOffLocation.date
                    ? dropOffLocation.date.toLocaleDateString()
                    : "Select your date"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={dropOffLocation.date}
                  onSelect={(date) =>
                    setDropOffLocation((prev) => ({ ...prev, date }))
                  }
                  className="rounded-md border-none"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </div>
            <div className="flex flex-col w-[20%] lg:w-1/3">
              <p className="flex-wrap font-bold">Time</p>
              <Select
                value={dropOffLocation.time || undefined}
                onValueChange={(value) =>
                  setDropOffLocation((prev) => ({ ...prev, time: value }))
                }
              >
                <SelectTrigger className="border-none p-0 shadow-none">
                  <SelectValue placeholder="-:-" />
                </SelectTrigger>

                <SelectContent>
                  {hourOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};
