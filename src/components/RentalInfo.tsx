"use client";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/lib/api";

interface CarLocation {
  city: {
    name: string;
  };
  date?: Date;
  time: string;
}

export const RentalInfo: FC = () => {
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
  return (
    <div className="flex flex-col lg:w-[60vw] w-full gap-4">
      <div className="flex flex-col bg-white rounded-lg p-6 gap-4">
        <div className="flex flex-row items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Rental Info</h1>{" "}
            <span className="text-sm text-gray-500">
              Enter your rental info
            </span>
          </div>
          <span className="text-sm text-gray-500">Step 2 of 4</span>
        </div>
        {/* Pick-Up */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-1">
            <Image
              src="/pick-up-mark.svg"
              alt="pick-up"
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
                  <p className="text-xs font-medium hover:underline text-gray-500">
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
                  <p className="text-xs font-medium hover:underline text-gray-500">
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
              </Popover>
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
        {/* Drop-Off */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-1">
            <Image
              src="/drop-off-mark.svg"
              alt="drop-off"
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
                  <p className="text-xs font-medium hover:underline text-gray-500">
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
              </Popover>
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
      </div>
    </div>
  );
};
