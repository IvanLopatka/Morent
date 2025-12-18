import React from "react";
import { FC } from "react";

import { Button } from "@/components/ui/button";
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
import { Input } from "./ui/input";

export const BillingInfo: FC = () => {
  return (
    <div className="flex flex-col lg:w-[60vw] w-full gap-4">
      <div className="flex flex-col bg-white rounded-lg p-6 gap-4">
        <div className="flex flex-row items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Billing Info</h1>{" "}
            <span className="text-sm text-gray-500">
              Enter your billing info
            </span>
          </div>
          <span className="text-sm text-gray-500">Step 1 of 4</span>
        </div>

        <div className="flex lg:flex-row gap-y-8 flex-col justify-between bg-white rounded-lg flex-wrap gap-4">
          <div className="flex lg:w-[45%] w-full flex-col gap-y-4">
            <h1 className="text-xl font-bold">Name</h1>{" "}
            <Input
              type="text"
              placeholder="Enter your name"
              className="w-full p-2 h-14 rounded-md border-none bg-gray-50"
            />
          </div>

          <div className="flex lg:w-[45%] w-full flex-col gap-y-4">
            <h1 className="text-xl font-bold">Town/City</h1>{" "}
            <Input
              type="text"
              placeholder="Enter your town/city"
              className="w-full p-2 h-14 rounded-md border-none bg-gray-50"
            />
          </div>

          <div className="flex lg:w-[45%] w-full flex-col gap-y-4">
            <h1 className="text-xl font-bold">Phone number</h1>{" "}
            <Input
              type="text"
              placeholder="Enter your phone number"
              className="w-full p-2 h-14 rounded-md border-none bg-gray-50"
            />
          </div>

          <div className="flex lg:w-[45%] w-full flex-col gap-y-4">
            <h1 className="text-xl font-bold">Address</h1>{" "}
            <Input
              type="text"
              placeholder="Enter your address"
              className="w-full p-2 h-14 rounded-md border-none bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
