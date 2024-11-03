'use client';

import { fetchGames } from '@/utils/actions';
import { Game } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import GameCardSkeleton from './GameCardSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

type GridGamesType = {
  title: string,
  platformSlug?: string,
  quantity?: number
}

const GridGames = ({title, platformSlug, quantity}: GridGamesType) => {
  const [latestGames, setlatestGames] = useState<Game[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLatestGames = (await fetchGames({quantity, platformSlug})) as any;
        setlatestGames(fetchedLatestGames);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-auto max-w-6xl pb-10 mb-10 mt-20">
      <h2 className="text-3xl my-8">{title}</h2>
      <div className="grid grid-cols-3 m-2 gap-3">
        {isLoading ? (
          <>
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
            <GameCardSkeleton />
          </>
        ) : (
          <>
            {Object.keys(latestGames).length === 0 ? (
              <p>No games available.</p>
            ) : (
              Object.entries(latestGames).map(([game, gameProps]) => {
                const discountPrice = (gameProps.discount / 100) * gameProps.price;
                const finalPrice = gameProps.price - discountPrice;

                return (
                  <Link href={gameProps.slug} key={gameProps.id}>
                    <Card className="relative max-w-96 h-64 border-none">
                      <Image
                        src={gameProps.cover?.url ? gameProps.cover?.url : ''}
                        alt={gameProps.title}
                        fill
                        className="rounded-sm object-cover hover:opacity-100 opacity-85"
                      />
                      <Badge className="overflow-hidden absolute bottom-0 left-0 rounded-none text-base object-left-bottom">
                        -{gameProps.discount}%
                      </Badge>
                    </Card>
                    <div className="flex justify-between">
                      <p className="m-2 font-light">{gameProps.title}</p>
                      <p className="text-lg font-medium my-2">${finalPrice.toFixed(2)}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GridGames;
