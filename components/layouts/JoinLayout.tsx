"use client";

import Link from "next/link";

const JoinLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen max-h-screen flex-row justify-between">
      <div className="absolute left-0 top-0 flex w-screen justify-between p-4">
        <Link
          href="/"
          className="absolute mt-10 max-h-10 w-72 translate-x-2 scale-75 md:ml-16 md:translate-x-6 md:scale-100"
        >
          <h2 className="flex text-6xl md:text-5xl">
            <span className="font-bold text-primary">RBC&nbsp;</span> Games
          </h2>
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
