'use client';

import { fetchGameDetails } from '@/utils/actions';
import { Game } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Panel from './Panel';
import Info from './Info';
import Media from './Media';
import GameDetailsSkeleton from './GameDetailsSkeleton';

type Params = {
  gameSlug: string;
};

const GameDetails = ({ gameSlug }: Params) => {
  const [game, setGame] = useState<Game | any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGame = (await fetchGameDetails(gameSlug)) as any;
        setGame(fetchedGame);
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
      {isLoading ? (
        <>
          <div className="relative min-h-[500px] w-full">
            <div className="absolute top-0 left-0 w-full h-full bg-secondary"></div>
          </div>
          <div className="dark-bg absolute h-16 w-full triangle-clip -translate-y-16"></div>
          <GameDetailsSkeleton />
        </>
      ) : (
        <>
          <div className="relative min-h-[500px] w-full">
            <Image
              src={game.wallpaper?.url ? game.wallpaper.url : ''}
              fill
              alt={game.title}
              quality={100}
              priority={true}
              className="object-cover opacity-80"
            />
          </div>
          <div className="dark-bg absolute h-16 w-full triangle-clip -translate-y-16"></div>
          <Panel game={game} />
          <h2 className="mx-auto max-w-6xl text-3xl mb-10">About</h2>
          <Info game={game} />
          <h2 className="mx-auto max-w-6xl text-3xl mb-10">Media</h2>
          <Media game={game} />
        </>
      )}
    </>
  );
};

export default GameDetails;
