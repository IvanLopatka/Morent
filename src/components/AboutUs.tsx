import React from "react";
import { FC } from "react";
import Link from "next/link";

export const AboutUs: FC = () => {
  return (
    <div className="w-screen bg-white pt-16 pb-10 px-6 lg:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <h3 className="lg:text-[32px] text-2xl font-bold text-blue-500">
            MORENT
          </h3>
          <p className="mt-6 text-gray-500 leading-relaxed">
            Our vision is to provide convenience
            <br className="hidden lg:block" /> and help increase your sales
            business.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div>
            <h4 className="text-lg font-semibold text-black">About</h4>
            <ul className="mt-5 space-y-4 text-gray-500">
              <Link href="/how-it-works" className="block hover:text-black">
                How it works
              </Link>
              <Link href="/featured" className="block hover:text-black">
                Featured
              </Link>
              <Link href="/partnership" className="block hover:text-black">
                Partnership
              </Link>
              <Link
                href="/business-relation"
                className="block hover:text-black"
              >
                Bussiness Relation
              </Link>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black">Community</h4>
            <ul className="mt-5 space-y-4 text-gray-500">
              <Link href="/events" className="block hover:text-black">
                Events
              </Link>
              <Link href="/blog" className="block hover:text-black">
                Blog
              </Link>
              <Link href="/podcast" className="block hover:text-black">
                Podcast
              </Link>
              <Link href="/invite-friend" className="block hover:text-black">
                Invite a friend
              </Link>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-black">Socials</h4>
            <ul className="mt-5 space-y-4 text-gray-500">
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black"
              >
                Discord
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black"
              >
                Instagram
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black"
              >
                Twitter
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-black"
              >
                Facebook
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full border-t mt-16 pt-6 flex flex-col lg:flex-row items-center font-semibold justify-between gap-4 ">
        <p>©2022 MORENT. All rights reserved</p>
        <div className="flex items-center gap-8">
          <p>Privacy & Policy</p>
          <p>Terms & Condition</p>
        </div>
      </div>
    </div>
  );
};
