"use client";
import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FC } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "./ui/popover";
import { CarService, Car } from "@/lib/car.service";
import Link from "next/link";

export const MobileSearch: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchVal, setSearchVal] = useState(searchParams.get("search") || "");
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // Popover search results fetching for homepage search
  useEffect(() => {
    if (pathname !== "/") {
      setIsSearchPopoverOpen(false);
      return;
    }

    if (!searchVal.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const results = await CarService.getAllCars({ search: searchVal });
        setSearchResults(results);
      } catch (err) {
        console.error("Error searching cars on mobile:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const handler = setTimeout(fetchResults, 300);
    return () => clearTimeout(handler);
  }, [searchVal, pathname]);

  return (
    <div className="w-full relative px-6 mb-8 h-[48px] bg-white justify-center gap-x-4 items-center lg:hidden flex">
      <Popover open={pathname === "/" && isSearchPopoverOpen} onOpenChange={setIsSearchPopoverOpen}>
        <PopoverAnchor asChild>
          <div className="relative flex-1 h-full">
            <Input
              className="pl-12 pr-4 rounded-2xl h-full text-xl w-full"
              placeholder="Search something here"
              id="text"
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onFocus={() => {
                if (pathname === "/") setIsSearchPopoverOpen(true);
              }}
            />
            <Image
              className="absolute top-3 left-3"
              src="/search.svg"
              alt="search"
              height={24}
              width={24}
            />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="w-[calc(100vw-48px)] max-w-[400px] p-0 overflow-hidden rounded-2xl shadow-2xl border-slate-100 bg-white"
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
            {isSearching ? (
              <div className="p-6 text-center text-slate-500 text-sm font-medium">
                Searching cars...
              </div>
            ) : !searchVal.trim() ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                <p className="font-semibold text-slate-700 mb-1">Type to search cars</p>
                <p className="text-xs text-slate-400">Find your next drive by typing its name...</p>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                <p className="font-semibold text-slate-700">No cars found</p>
                <p className="text-xs text-slate-400 mt-1">Try another search query</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {searchResults.slice(0, 5).map((car) => (
                  <Link
                    key={car.id}
                    href={`/catalog/${car.id}`}
                    onClick={() => setIsSearchPopoverOpen(false)}
                    className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
                      <Image
                        src={car.thumbnail}
                        alt={car.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {car.name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium capitalize">{car.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">${car.price}</p>
                      <p className="text-[10px] text-slate-400">/day</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {searchVal.trim() && searchResults.length > 0 && (
            <div className="p-3 bg-slate-50/50 text-center border-t border-slate-100">
              <Link
                href={`/catalog?search=${encodeURIComponent(searchVal)}`}
                onClick={() => setIsSearchPopoverOpen(false)}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                View all {searchResults.length} results in catalog
              </Link>
            </div>
          )}
        </PopoverContent>
      </Popover>
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
