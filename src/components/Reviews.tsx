"use client";
import React, { useState } from "react";
import { FC } from "react";
import { Reviews as ReviewsData } from "@/lib/Reviews-data";
import Image from "next/image";
import { Button } from "./ui/button";
export const Reviews: FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? ReviewsData : ReviewsData.slice(0, 2);
  return (
    <div className="flex w-full rounded-lg flex-col bg-white gap-4 p-8">
      {" "}
      <div className="flex flex-row gap-3 items-center">
        <h1 className="text-2xl font-bold">Reviews</h1>{" "}
        <div className="text-sm p-2 w-11 h-7 justify-center rounded-md items-center flex bg-blue-500">
          <p className="text-white text-sm font-bold">{`${ReviewsData.length}`}</p>
        </div>
      </div>
      <div className="flex flex-col gap-10 justify-start items-start">
        {visibleReviews.map((review) => (
          <div className="w-full gap-y-2 flex flex-col" key={review.id}>
            <div className="flex w-full justify-between items-start">
              <div className="flex flex-row w-full gap-x-2 items-center">
                <Image
                  src="/profile-2user.svg"
                  alt="profile"
                  width={56}
                  height={56}
                />
                <div className="flex w-full flex-row  justify-between items-center">
                  <div className="flex flex-col items-start">
                    <p className="text-lg text-wrap font-bold">{review.name}</p>
                    <p className="text-sm text-gray-500"> {review.position}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500"> {review.date}</p>
                    <div className="flex flex-row  items-center">
                      {[...Array(review.rating)].map((star, id) => (
                        <div key={id} className="flex flex-row">
                          <Button
                            key={star}
                            className="border-none w-[20px] h-[20px] shadow-none bg-white"
                            variant="outline"
                            size="icon"
                          >
                            <Image
                              src={
                                id < review.rating
                                  ? "/active-rate-star.svg"
                                  : "/passive-rate-star.svg"
                              }
                              alt="star"
                              width={20}
                              height={20}
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full lg:px-15 px-13 justify-start items-start">
              <p className="text-xs text-gray-500"> {review.comment}</p>
            </div>
          </div>
        ))}
      </div>
      {ReviewsData.length > 2 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="border-none text-gray-500 text-base shadow-none bg-white"
          >
            {showAll
              ? "Show less"
              : `Show all (${ReviewsData.length - 2} more)`}
          </Button>
        </div>
      )}
    </div>
  );
};
