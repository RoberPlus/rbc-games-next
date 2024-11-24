"use client";

import { fetchLastGame } from "@/utils/actions";
import { Game } from "@/utils/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

const BannerLastGame = () => {
  const [game, setGame] = useState<Game | any>(null);
  const [error, setError] = useState<any>(null);
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
          2
        );
        setFinalPrice(fixedFinalPrice);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative h-[500px] w-full">
      {isLoading ? (
        <div className="absolute top-0 left-0 w-full h-full bg-secondary"></div>
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
            className="absolute top-0 left-0 w-full h-full flex items-center"
          >
            <div className="ml-10 md:ml-80 max-w-full block w-96">
              <h2 className="text-4xl font-medium">{game.title}</h2>
              <div className="mt-2">
                <label>
                  <Badge className="text-base mr-4 -translate-y-2">
                    -{game.discount}%
                  </Badge>
                </label>
                <span className="text-5xl">${finalPrice}</span>
              </div>
            </div>
          </Link>
          <div className="dark-bg absolute h-14 w-full triangle-clip bottom-0"></div>
        </>
      )}
    </div>
  );
};

export default BannerLastGame;
