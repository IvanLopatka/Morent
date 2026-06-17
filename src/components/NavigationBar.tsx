"use client";
import Image from "next/image";
import { FC } from "react";
import React from "react";

import { Button } from "./ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "./ui/popover";
import { Input } from "./ui/input";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AuthModal } from "../app/auth/AuthModal";
import { createClient } from "@/utils/supabase/client";
import { CarService, Car } from "@/lib/car.service";
import { Trash2, Heart } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

const supabase = createClient();

export const NavigationBar: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const { session, setSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [savedCars, setSavedCars] = useState<Car[]>([]);
  const [isSavedCarsOpen, setIsSavedCarsOpen] = useState(false);
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

  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
        console.error("Error searching cars:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const handler = setTimeout(fetchResults, 300);
    return () => clearTimeout(handler);
  }, [searchVal, pathname]);

  const fetchSavedCars = async () => {
    if (session?.user?.id) {
      const cars = await CarService.getSavedCars(session.user.id);
      setSavedCars(cars);
    }
  };

  useEffect(() => {
    if (isSavedCarsOpen && session) {
      fetchSavedCars();
    }
  }, [isSavedCarsOpen, session]);

  useEffect(() => {
    setMounted(true);

    // Initial fetch to populate the store
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  const openAuth = (view: "login" | "register") => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };
  return (
    <nav className="flex w-full px-6 lg:px-16  mb-0  lg:h-[124px] h-[96px] bg-white justify-between items-center">
      <div className="flex gap-16">
        <Link href="/">
          <h3 className="lg:text-[32px] text-2xl font-bold text-shadow text-blue-500">
            MORENT
          </h3>
        </Link>

        <Popover open={pathname === "/" && isSearchPopoverOpen} onOpenChange={setIsSearchPopoverOpen}>
          <PopoverAnchor asChild>
            <div className="relative items-center hidden lg:flex">
              <Input
                className="pl-12  rounded-2xl text-2xl"
                placeholder="Search something here"
                id="text"
                size={50}
                type="search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onFocus={() => {
                  if (pathname === "/") setIsSearchPopoverOpen(true);
                }}
              />
              <Image
                className="absolute top-2 left-3"
                src="/search.svg"
                alt="search"
                height={24}
                width={24}
              />
              <Button className="absolute right-0" type="button" variant="ghost">
                <Image src="/filter.svg" alt="filter" width={24} height={24} />
              </Button>
            </div>
          </PopoverAnchor>
          <PopoverContent
            className="w-[492px] p-0 overflow-hidden rounded-2xl shadow-2xl border-slate-100 bg-white"
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="p-2 max-h-[350px] overflow-y-auto custom-scrollbar">
              {isSearching ? (
                <div className="p-8 text-center text-slate-500 text-sm font-medium">
                  Searching cars...
                </div>
              ) : !searchVal.trim() ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  <p className="font-semibold text-slate-700 mb-2">Type to search cars</p>
                  <p className="text-xs text-slate-400">Find your next drive by typing its name...</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  <p className="font-semibold text-slate-700">No cars found</p>
                  <p className="text-xs text-slate-400 mt-1">Try checking your spelling or search another model</p>
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
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0">
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


      </div>
      <div className="flex gap-0 lg:gap-5">
        {mounted ? (
          <Popover open={isSavedCarsOpen} onOpenChange={setIsSavedCarsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-11 h-11 hidden lg:flex border-2 rounded-full relative"
              >
                <Image src="/heart.svg" alt="heart" width={24} height={24} />
                {session && savedCars.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                    {savedCars.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0 overflow-hidden rounded-2xl shadow-2xl border-slate-100" align="end">
              <div className="bg-slate-50/80 backdrop-blur-sm p-4 border-b border-slate-100">
                <h4 className="font-bold flex items-center gap-2 text-slate-800">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  Saved Cars
                </h4>
              </div>
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {!session ? (
                  <div className="p-8 text-center bg-white">
                    <p className="text-slate-500 text-sm font-medium">Please login to view saved cars</p>
                    <Button
                      variant="link"
                      className="text-blue-600 mt-2 h-auto p-0 text-sm"
                      onClick={() => {
                        setIsSavedCarsOpen(false);
                        openAuth("login");
                      }}
                    >
                      Login now
                    </Button>
                  </div>
                ) : savedCars.length === 0 ? (
                  <div className="p-8 text-center bg-white">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">No saved cars yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50 bg-white">
                    {savedCars.map((car) => (
                      <div key={car.id} className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors group">
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image
                            src={car.thumbnail}
                            alt={car.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{car.name}</p>
                          <p className="text-xs text-slate-500 font-medium">${car.price}/day</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                            onClick={async (e) => {
                              e.preventDefault();
                              await CarService.toggleSaveCar(car.id, session.user.id);
                              fetchSavedCars();
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Link
                            href={`/catalog/${car.id}`}
                            onClick={() => setIsSavedCarsOpen(false)}
                            className="text-[10px] text-blue-600 font-bold hover:underline py-1 px-2 text-center"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {session && savedCars.length > 0 && (
                <div className="p-3 bg-slate-50/50 text-center border-t border-slate-100">
                  <Link
                    href={`/profile/${session.user.id}`}
                    onClick={() => setIsSavedCarsOpen(false)}
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    View full list in profile
                  </Link>
                </div>
              )}
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-11 h-11 hidden lg:flex border-2 rounded-full relative"
          >
            <Image src="/heart.svg" alt="heart" width={24} height={24} />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 hidden lg:flex border-2 rounded-full"
        >
          <Image src="/notification.svg" alt="heart" width={24} height={24} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-11 h-11 hidden lg:flex border-2 rounded-full"
        >
          <Image src="/setting.svg" alt="setting" width={24} height={24} />
        </Button>
        {mounted ? (
          session ? (
            <Button
              variant="ghost"
              size="icon"
              className="w-11 h-11 scale-[0.7] lg:scale-none border-2 rounded-full overflow-hidden"
              onClick={() => setIsAuthModalOpen(true)}
            >
              {session?.user?.user_metadata?.avatar_url ? (
                <Image
                  src={session.user.user_metadata.avatar_url}
                  alt="profile"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <Image src="/profile.svg" alt="profile" width={24} height={24} />
              )}
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-11 h-11 scale-[0.7] lg:scale-none border-2 rounded-full"
                >
                  <Image src="/profile.svg" alt="profile" width={24} height={24} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px]">
                <div className="w-full flex flex-col h-full p-4">
                  <h3 className="text-xl font-semibold">Login or Register in your account</h3>
                  <div className="flex flex-row gap-2 mt-2">
                    <Button
                      className="w-1/2"
                      size="lg"
                      variant="outline"
                      onClick={() => openAuth("login")}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-1/2"
                      size="lg"
                      variant="default"
                      onClick={() => openAuth("register")}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="w-11 h-11 scale-[0.7] lg:scale-none border-2 rounded-full"
          >
            <Image src="/profile.svg" alt="profile" width={24} height={24} />
          </Button>
        )}
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultView={authView}
      />
    </nav>
  );
};
