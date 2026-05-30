
import { NavigationBar } from "@/components";
import { MobileSearch } from "@/components";
import { CompareCars } from "@/components";

import { RecomendationCar } from "@/components";
import { Sidebar } from "@/components";
import { AboutUs } from "@/components";

import { Suspense } from "react";
import {connection} from 'next/server'

export default async function Home() {
  await connection()
  return (
    <div className="min-h-screen items-start justify-center font-[family-name:var(--font-geist-sans)">
      <NavigationBar />
      <MobileSearch />
      <div className="flex">
        <Suspense fallback={<div className="w-[360px] h-screen bg-gray-50 animate-pulse" />}>
          <Sidebar />
        </Suspense>
        <div className="flex-grow flex-col">
          <Suspense fallback={<div className="h-[120px]" />}>
            <CompareCars gapVariant="catalog" widthVariant="catalog" />
          </Suspense>
          <Suspense fallback={<div className="p-20 text-center">Loading cars...</div>}>
            <RecomendationCar gridVariant="catalog" />
          </Suspense>
        </div>
      </div>
      <AboutUs />
    </div>
  );
}
