'use client';

import { fetchGameDetails } from '@/utils/actions';
import { Game } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import GameCardSkeleton from '../Home/GameCardSkeleton';
import Image from 'next/image';
import Link from 'next/link';
import Panel from './Panel';
import Info from './Info';
import Media from './Media';

type Params = {
  gameSlug: string;
};

const GameDetails = ({ gameSlug }: Params) => {
  const [game, setGame] = useState<Game>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(gameSlug);

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
          <GameCardSkeleton />
        </>
      ) : (
        <>
          {!game ? (
            <p>No games available.</p>
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
      )}
    </>
  );
};

export default GameDetails;
