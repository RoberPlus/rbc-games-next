"use client";

import { useEffect, useState } from "react";
import { fetchPlatforms } from "@/utils/actions";

import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import { Search, X } from "lucide-react";
import { Platform } from "@/utils/types";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Menu = (props: any) => {
  const { isOpenSearch } = props;
  const pathname = usePathname();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(isOpenSearch);

  const toggleSearchInput = () => setShowSearchInput((prevState) => !prevState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlatforms = (await fetchPlatforms()) as any;
        setPlatforms(fetchedPlatforms);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="relative flex justify-end items-end p-2 pr-10 rounded-3xl backdrop-blur-xl">
        {Object.entries(platforms).map(([platform, platformProps]) => (
          <Link href={`/games/${platformProps.slug}`} key={platformProps.id}>
            <Button
              className={`p-4 hover:bg-slate-50/5 hover:decoration-0 text-white hover:text-white rounded-3xl m-1 `}
              variant={
                pathname === "/games/" + platformProps.slug
                  ? "secondary"
                  : "ghost"
              }
            >
              <Image
                src={platformProps.icon.url}
                alt={platformProps.title}
                height={30}
                width={30}
                className="pr-1 hover:text-white"
              />
              {platformProps.title}
            </Button>
          </Link>
        ))}

        <div
          className={`absolute -right-5 rounded-full top-0.5 bg-primary text-black p-[19px] hover:cursor-pointer group ${
            showSearchInput ? "hidden" : "flex"
          }`}
          onClick={toggleSearchInput}
        >
          <Search
            className="group-hover:scale-125 transition-all duration-300"
            size={20}
          />
        </div>

        <div
          className={`absolute top-0 left-0 h-16 bg-primary shadow-none rounded-full w-full text-white scale-x-105 ${
            showSearchInput ? "flex" : "hidden"
          }`}
        >
          <SearchInput />
          <X
            className="translate-x-8 translate-y-5 scale-125 transition duration-300 hover:scale-150 cursor-pointer"
            onClick={toggleSearchInput}
          />
        </div>
      </div>
    </>
  );
};

export default Menu;
