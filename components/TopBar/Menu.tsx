"use client";

import { useEffect, useState } from "react";
import { fetchPlatforms } from "@/utils/actions";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/TopBar/SearchInput";
import { Search, X } from "lucide-react";
import { Platform } from "@/utils/types";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Menu = (props: any) => {
  const { isOpenSearch } = props;
  const pathname = usePathname();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isError, setIsError] = useState<any>(null);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(isOpenSearch);

  const toggleSearchInput = () => setShowSearchInput((prevState) => !prevState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlatforms = (await fetchPlatforms()) as any;
        setPlatforms(fetchedPlatforms);
      } catch (error) {
        setIsError(error);
        console.log(isError);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex items-end justify-end rounded-3xl p-2 pr-10 backdrop-blur-xl">
      {Object.entries(platforms).map(([, platformProps]) => (
        <Link href={`/games/${platformProps.slug}`} key={platformProps.id}>
          <Button
            className={`m-1 rounded-3xl p-4 text-white hover:bg-slate-50/5 hover:text-white hover:decoration-0`}
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
            <span className="hidden md:flex">{platformProps.title}</span>
          </Button>
        </Link>
      ))}

      <div
        className={`group absolute -right-5 top-0.5 rounded-full bg-primary p-[19px] text-black hover:cursor-pointer ${
          showSearchInput ? "hidden" : "flex"
        }`}
        onClick={toggleSearchInput}
      >
        <Search
          className="transition-all duration-300 group-hover:scale-125"
          size={20}
        />
      </div>

      <div
        className={`absolute left-0 top-0 h-16 w-full scale-x-105 rounded-full bg-primary text-white shadow-none ${
          showSearchInput ? "flex" : "hidden"
        }`}
      >
        <SearchInput />
        <X
          className="-translate-x-8 translate-y-5 scale-125 cursor-pointer text-black transition duration-300 hover:scale-150 md:translate-x-8 md:text-white"
          onClick={toggleSearchInput}
        />
      </div>
    </div>
  );
};

export default Menu;
