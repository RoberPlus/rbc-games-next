"use client";

import Link from "next/link";
import Image from "next/image";
import image from "@/public/images/logo.png";

const JoinLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-h-screen flex-row justify-between">
      <div className="absolute left-0 top-0 flex w-screen justify-between p-4">
        <Link
          href="/"
          className="absolute mt-4 max-h-10 w-72 translate-x-5 scale-75 md:ml-16 md:scale-100"
        >
          <Image src={image} alt="logo" width={250} height={40} quality={100} />
        </Link>
      </div>
      <div className="flex w-full items-center justify-center md:w-2/4">
        {children}
      </div>

      <div
        className="hidden h-full w-1/2 bg-cover bg-center bg-no-repeat md:flex"
        style={{ backgroundImage: `url('/images/sign-wallpaper.jpg')` }}
      ></div>
    </div>
  );
};

export default JoinLayout;
