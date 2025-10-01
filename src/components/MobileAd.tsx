import React from "react";
import Image from "next/image";
import { FC } from "react";

export const MobileAd: FC = () => {
  return (
    <div className="px-6">
      <div className="lg:hidden px-6  rounded-2xl bg-bottom bg-cover h-[232px] flex bg-[url('/mobile-ad.png')]"></div>
    </div>
  );
};
