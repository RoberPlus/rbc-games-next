'use client';

import { fetchLastGame } from '@/utils/actions';
import { Game } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';

const BannerLastGame = () => {
  const [game, setGame] = useState<Game>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGame = (await fetchLastGame()) as any;
        setGame(fetchedGame[0]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!game) return null;

  const discountPrice = (game.discount / 100) * game.price;
  const finalPrice = game.price - discountPrice;

  return (
    <div className="relative min-h-[500px] w-full">
      <Image
        src={game.wallpaper?.url ? game.wallpaper.url : ''}
        fill
        alt={game.title}
        quality={100}
        priority={true}
        className="object-cover opacity-80"
      />
      <Link href={game.slug} className="absolute top-0 left-0 w-full h-full flex items-center">
        <div className="ml-10 md:ml-80 m-w-full block w-96">
          <h2 className="text-4xl font-medium">{game.title}</h2>
          <div className="mt-2">
            <label>
              <Badge className="text-base mr-4 -translate-y-2">-{game.discount}%</Badge>
            </label>
            <span className="text-5xl">${finalPrice.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BannerLastGame;
