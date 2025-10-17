"use client";
import React from "react";
import { FC } from "react";
import { useState } from "react";

import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface CarLocation {
  city: {
    name: string;
  };
  date?: Date;
  time: string;
}

export const CompareCars: FC = () => {
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
    <div className="flex w-screen flex-col lg:flex-row px-6 mb-50 lg:px-16 justify-center lg:justify-between gap-8 lg:gap-11 items-center">
      <Popover>
        <div className="flex justify-start w-[90vw] gap-y-4 bg-white p-4 lg:px-12 lg:py-6 rounded-[10px] flex-col">
          <div className="flex gap-2 flex-row">
            <Image
              alt="pick-up"
              src="./pick-up-mark.svg"
              width={16}
              height={16}
            />
            <p className="font-semibold">Pick - Up</p>
          </div>

          <Accordion
            type="single"
            className="justify-between gap-6 lg:gap-12 flex"
            orientation="horizontal"
            collapsible
          >
            <div className="w-1/3">
              <AccordionItem value="location">
                <p className="font-bold">Location</p>

                <AccordionTrigger>
                  <p className="text-xs font-medium text-gray-500">
                    Select your city
                  </p>
                </AccordionTrigger>
              </AccordionItem>
            </div>
            <div className="w-1/3">
              <AccordionItem value="Date">
                <p className="font-bold">Date</p>
                <PopoverTrigger asChild>
                  <AccordionTrigger>
                    <p className="text-xs font-medium text-gray-500">
                      {pickUpLocation.date
                        ? pickUpLocation.date.toLocaleDateString()
                        : "Select your date"}
                    </p>
                  </AccordionTrigger>
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
              </AccordionItem>
            </div>
            <div className="w-1/3">
              <AccordionItem value="Time">
                <p className="font-bold">Time</p>
                <AccordionTrigger>
                  <p className="text-xs font-medium text-gray-500">
                    Select your time
                  </p>
                </AccordionTrigger>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </Popover>

      <Button
        size="icon"
        className="w-15 absolute lg:relative h-15 bg-blue-600"
      >
        <Image src="./swap.svg" alt="swap" width={24} height={24} />
      </Button>
      <Popover>
        <div className="flex justify-start gap-y-4 w-[90vw] bg-white p-4 lg:px-12 lg:py-6 rounded-[10px] flex-col">
          <div className="flex gap-2 flex-row">
            <Image
              alt="drop-off"
              src="./drop-off-mark.svg"
              width={16}
              height={16}
            />
            <p className="font-semibold">Drop - Off</p>
          </div>

          <Accordion
            type="single"
            className="justify-between gap-12 flex"
            orientation="horizontal"
            collapsible
          >
            <div className="w-1/3">
              <AccordionItem value="location">
                <p className="font-bold">Location</p>
                <AccordionTrigger>
                  <p className="text-xs font-medium text-gray-500">
                    Select your city
                  </p>
                </AccordionTrigger>
              </AccordionItem>
            </div>
            <div className="w-1/3">
              <AccordionItem value="Date">
                <p className="font-bold">Date</p>
                <PopoverTrigger asChild>
                  <AccordionTrigger>
                    <p className="text-xs font-medium text-gray-500">
                      {dropOffLocation.date
                        ? dropOffLocation.date.toLocaleDateString()
                        : "Select your date"}
                    </p>
                  </AccordionTrigger>
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
              </AccordionItem>
            </div>
            <div className="w-1/3">
              <AccordionItem value="Time">
                <p className="font-bold">Time</p>
                <AccordionTrigger>
                  <p className="text-xs font-medium text-gray-500">
                    Select your time
                  </p>
                </AccordionTrigger>
              </AccordionItem>
            </div>
          </Accordion>
        </div>
      </Popover>
    </div>
  );
};
