"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FC } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const MobileSearch: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");

  // Sync external search param changes to local state
  useEffect(() => {
    setSearchVal(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounced search logic to update the URL
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (searchVal === currentSearch) return;

      const params = new URLSearchParams(searchParams.toString());
      if (searchVal.trim()) {
        params.set("search", searchVal.trim());
      } else {
        params.delete("search");
      }

      const targetPath = (pathname === "/" || pathname.startsWith("/catalog")) ? pathname : "/catalog";
      router.push(`${targetPath}?${params.toString()}`, { scroll: false });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchVal, router, searchParams, pathname]);

  return (
    <div className="w-full relative px-6 mb-8 h-[48px] bg-white justify-center gap-x-4 items-center lg:hidden flex">
      <Input
        className="pl-12 rounded-2xl h-full text-xl"
        placeholder="Search something here"
        id="text"
        type="search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <Image
        className="absolute top-3 left-9"
        src="/search.svg"
        alt="search"
        height={24}
        width={24}
      />
      <Button
        className="w-[48px] h-full rounded-lg"
        type="button"
        size="icon"
        variant="outline"
      >
        <Image src="/filter.svg" alt="filter2" width={24} height={24} />
      </Button>
    </div>
  );
};
