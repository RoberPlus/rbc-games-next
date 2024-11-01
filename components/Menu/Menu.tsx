'use client';

import { useEffect, useState } from 'react';
import { fetchPlatforms } from '@/utils/actions';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '../ui/button';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Platform } from '@/utils/types';
import { Skeleton } from '../ui/skeleton';

const Menu = ({ isOpenSearch }: { isOpenSearch: boolean }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSearchInput, setShowSearchInput] = useState(false);

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
    <div className="relative flex justify-end items-end p-2 rounded-3xl backdrop-blur-xl">
      {isLoading ? (
        <Skeleton /> // Display a loading indicator while data is fetching
      ) : (
        <>
          {Object.entries(platforms).map(([platform, platformProps]) => (
            <Button
              key={platformProps.id}
              className="p-4 hover:bg-slate-50/5 hover:decoration-0 text-white hover:text-white rounded-3xl m-1"
              variant="ghost"
            >
              <Image
                src={platformProps.icon.url}
                alt={platformProps.title}
                height={30}
                width={30}
                className="pr-1 hover:text-white" // Consider using a different class for hover effect on the image
              />
              <Link href={`/${platformProps.icon.url}`}>{platformProps.title}</Link>
            </Button>
          ))}

          <Button
            className={`p-5 w-12 h-12 translate-x-4 scale-125 hover:bg-primary rounded-full *:scale-100 *:transition *:duration-300 *:hover:scale-125 shadow-none`}
            onClick={toggleSearchInput}
          >
            <Search className="" />
          </Button>

          <div
            className={`absolute top-0 h-16 bg-primary shadow-none rounded-full w-full text-white scale-x-105 ${
              showSearchInput ? 'flex' : 'hidden'
            }`}
          >
            <Input
              id="search-games"
              placeholder="Minecraft, RPG, multiplayer..."
              className="w-full h-full overflow-hidden rounded-full border-none shadow-none ring-inset placeholder:text-muted-white mx-2"
            />
            <X
              className="translate-x-8 translate-y-5 scale-125 transition duration-300 hover:scale-150 cursor-pointer"
              onClick={toggleSearchInput}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
