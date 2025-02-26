"use client";

import { fetchLastGame } from "@/utils/actions";
import { Game } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const BannerLastGame = () => {
  const [game, setGame] = useState<Game | any>(null);
  const [isError, setIsError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedGame = (await fetchLastGame()) as any;
        setGame(fetchedGame[0]);

        const discountPrice =
          (fetchedGame[0].discount / 100) * fetchedGame[0].price;
        const fixedFinalPrice = (fetchedGame[0].price - discountPrice).toFixed(
          2,
        );
        setFinalPrice(fixedFinalPrice);
      } catch (error) {
        setIsError(error);
        console.log(isError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-[500px] w-full">
      {isLoading ? (
        <div className="absolute left-0 top-0 h-full w-full bg-secondary"></div>
      ) : (
        <>
          <Image
            src={game.wallpaper?.url ? game.wallpaper.url : ""}
            fill
            alt={game.title}
            quality={100}
            priority={true}
            className="object-cover opacity-80 transition-opacity duration-500"
          />
          <Link
            href={`/game/${game.slug}`}
            className="absolute left-0 top-0 flex h-full w-full items-center"
          >
            <div className="ml-10 block w-96 max-w-full translate-y-24 md:ml-80 md:translate-y-0">
              <h2 className="text-3xl font-medium md:text-4xl">{game.title}</h2>
              <div className="mt-2">
                <label>
                  <Badge className="mr-4 -translate-y-2 text-base">
                    -{game.discount}%
                  </Badge>
                </label>
                <span className="text-4xl md:text-5xl">${finalPrice}</span>
              </div>
            </div>
          </Link>
          <div className="dark-bg triangle-clip absolute bottom-0 h-14 w-full"></div>
        </>
      )}
    </div>
  );
};

export default BannerLastGame;
