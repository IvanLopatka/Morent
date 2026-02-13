"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export const ConfirmationForm = () => {
  return (
    <div className="flex flex-col lg:w-[60vw] w-full gap-4">
      <div className="flex flex-col bg-white rounded-lg p-6 gap-8">
        
        <div className="flex flex-row items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-[#1A202C]">Confirmation</h1>
            <span className="text-sm text-[#90A3BF]">
              We are getting to the end. Just few clicks and your rental is ready!
            </span>
          </div>
          <span className="text-sm text-[#90A3BF]">Step 4 of 4</span>
        </div>

        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-lg bg-[#F6F7F9] p-4">
            <Checkbox id="marketing" className="size-6 border-[#90A3BF] data-[state=checked]:bg-[#3563E9] rounded-md" />
            <label
              htmlFor="marketing"
              className="text-base font-semibold text-[#1A202C] cursor-pointer"
            >
              I agree with sending an Marketing and newsletter emails. No spam, promissed!
            </label>
          </div>

          <div className="flex items-center gap-4 rounded-lg bg-[#F6F7F9] p-4">
            <Checkbox id="terms" className="size-6 border-[#90A3BF] data-[state=checked]:bg-[#3563E9] rounded-md" />
            <label
              htmlFor="terms"
              className="text-base font-semibold text-[#1A202C] cursor-pointer"
            >
              I agree with our terms and conditions and privacy policy.
            </label>
          </div>
        </div>

        
        <div>
          <Button className="h-[56px] px-8 bg-[#3563E9] text-white text-base font-bold hover:bg-[#3563E9]/90 rounded-lg">
            Rent Now
          </Button>
        </div>

        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <ShieldCheck className="size-8 text-[#1A202C]" />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-[#1A202C]">
                All your data are safe
              </h3>
              <p className="text-sm text-[#90A3BF]">
                We are using the most advanced security to provide you the best experience ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
