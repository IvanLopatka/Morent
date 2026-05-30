"use client";
import React from "react";
import { FC } from "react";
import { useState, useEffect } from "react";
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
import { cn } from "@/lib/utils";

type CompareCarsVariant = "default" | "catalog";

interface CompareCarsProps {
  gapVariant?: CompareCarsVariant;
  widthVariant?: CompareCarsVariant;
}

interface CarLocation {
  city: {
    name: string;
  };
  date?: Date;
  time: string;
}

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const formatLocalDate = (date?: Date): string | undefined => {
  if (!date) return undefined;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseLocalDate = (dateStr: string | null): Date | undefined => {
  if (!dateStr) return undefined;
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const CompareCars: FC<CompareCarsProps> = ({
  gapVariant = "default",
  widthVariant = "default",
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: cityNames = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });


  const handleClearFilters = () => {
    updateURLParams({
      pickUpLocation: undefined,
      dropOffLocation: undefined,
      pickUpDate: undefined,
      dropOffDate: undefined,
      pickUpTime: undefined,
      dropOffTime: undefined,
    });
  };

  const getInitialLocation = (prefix: string): CarLocation => ({
    city: { name: searchParams.get(`${prefix}Location`) || "" },
    date: parseLocalDate(searchParams.get(`${prefix}Date`)),
    time: searchParams.get(`${prefix}Time`) || "",
  });

  const [pickUpLocation, setPickUpLocation] = useState<CarLocation>(getInitialLocation("pickUp"));
  const [dropOffLocation, setDropOffLocation] = useState<CarLocation>(getInitialLocation("dropOff"));


  useEffect(() => {
    setPickUpLocation(getInitialLocation("pickUp"));
    setDropOffLocation(getInitialLocation("dropOff"));
  }, [searchParams]);

  const updateURLParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hourOptions = Array.from(
    { length: 24 },
    (_, hour) => `${String(hour).padStart(2, "0")}:00`
  );

  const gapVariants = {
    default: "gap-8 w-full lg:w-screen justify-center lg:justify-between",

    catalog: "gap-0 w-full mt-8 justify-center",
  } as const;
  const widthVariants = {
    default: "w-[87vw]",
    catalog: "lg:w-[30vw] w-[87vw]",
  } as const;

  const handleSwapLocations = () => {
    const tempPickUp = pickUpLocation;
    const tempDropOff = dropOffLocation;
    setPickUpLocation(tempDropOff);
    setDropOffLocation(tempPickUp);

    updateURLParams({
      pickUpDate: formatLocalDate(tempDropOff.date),
      dropOffDate: formatLocalDate(tempPickUp.date),
      pickUpLocation: tempDropOff.city.name || undefined,
      dropOffLocation: tempPickUp.city.name || undefined,
      pickUpTime: tempDropOff.time || undefined,
      dropOffTime: tempPickUp.time || undefined,
    });
  };

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row px-6 mb-8 lg:px-16 items-center",
        gapVariants[gapVariant]
      )}
    >
      <div
        className={cn(
          "flex justify-center gap-y-4 bg-white p-4 lg:px-12 lg:py-6 rounded-[10px] flex-col",
          widthVariants[widthVariant]
        )}
      >
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
              onValueChange={(value) => {
                setPickUpLocation((prev) => ({
                  ...prev,
                  city: { name: value },
                }));
                updateURLParams({ pickUpLocation: value });
              }
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
            <Popover>
              <PopoverTrigger asChild>
                <p className="text-xs font-medium hover:underline  text-gray-500">
                  {isMounted && pickUpLocation.date
                    ? pickUpLocation.date.toLocaleDateString()
                    : "Select your date"}
                </p>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  startMonth={new Date()}
                  endMonth={new Date(new Date().getFullYear() + 4, 11)}
                  selected={pickUpLocation.date}
                  onSelect={(date) => {
                    setPickUpLocation((prev) => ({ ...prev, date }));
                    updateURLParams({ pickUpDate: formatLocalDate(date) });
                  }}
                  className="rounded-md border-none"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-[20%] lg:w-1/3 flex flex-col">
            <p className="flex-wrap font-bold">Time</p>
            <Select
              value={pickUpLocation.time}
              onValueChange={(value) => {
                setPickUpLocation((prev) => ({ ...prev, time: value }));
                updateURLParams({ pickUpTime: value || undefined });
              }}
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
      <div className="flex gap-y-4 flex-col">
        <Button
          size="icon"
          className="w-15 absolute lg:relative h-15 bg-blue-600"
          onClick={handleSwapLocations}
        >
          <Image src="./swap.svg" alt="swap" width={24} height={24} />
        </Button>
        <Button onClick={handleClearFilters} size="icon" className="bg- w-15 h-15 text-black">Clear <br /> filters</Button>
      </div>
      <div
        className={cn(
          "flex justify-start gap-y-4 bg-white p-4 lg:px-12 lg:py-6 rounded-[10px] flex-col",
          widthVariants[widthVariant]
        )}
      >
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
              onValueChange={(value) => {
                setDropOffLocation((prev) => ({
                  ...prev,
                  city: { name: value },
                }));
                updateURLParams({ dropOffLocation: value });
              }
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
            <Popover>
              <PopoverTrigger asChild>
                <p className="text-xs font-medium hover:underline text-gray-500">
                  {isMounted && dropOffLocation.date
                    ? dropOffLocation.date.toLocaleDateString()
                    : "Select your date"}
                </p>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  startMonth={new Date()}
                  endMonth={new Date(new Date().getFullYear() + 4, 11)}
                  selected={dropOffLocation.date}
                  onSelect={(date) => {
                    setDropOffLocation((prev) => ({ ...prev, date }));
                    updateURLParams({ dropOffDate: formatLocalDate(date) });
                  }}
                  className="rounded-md border-none"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col w-[20%] lg:w-1/3">
            <p className="flex-wrap font-bold">Time</p>
            <Select
              value={dropOffLocation.time}
              onValueChange={(value) => {
                setDropOffLocation((prev) => ({ ...prev, time: value }));
                updateURLParams({ dropOffTime: value || undefined });
              }}
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

    </div>
  );
};
