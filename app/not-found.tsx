import BasicLayout from "@/components/layouts/BasicLayout";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <BasicLayout>
      <div className="pt-32">
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-primary">404</p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white/50 sm:text-7xl">
              Page not found
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Link
                href="/"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </BasicLayout>
  );
};

export default NotFound;
