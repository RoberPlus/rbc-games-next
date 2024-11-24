import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import imageplaceholder from "../../public/images/placeholder.webp";
import { Badge } from "../ui/badge";
import Image from "next/image";

const GameCard = (gameData: any) => {
  const discountPrice = (gameData.game.discount / 100) * gameData.game.price;
  const finalPrice = gameData.game.price - discountPrice;

  return (
    <Link href={{ pathname: `/game/${gameData.game.slug}` }}>
      <Card className="relative h-64 w-60 border-none md:w-full">
        <Image
          src={
            gameData.game.cover?.url
              ? gameData.game.cover.url
              : imageplaceholder
          }
          alt={gameData.game.title}
          fill
          className="rounded-sm object-cover opacity-85 hover:opacity-100"
        />
        <Badge className="absolute bottom-0 left-0 overflow-hidden rounded-none object-left-bottom text-base">
          -{gameData.game.discount}%
        </Badge>
      </Card>
      <div className="flex justify-between">
        <p className="m-2 font-light">{gameData.game.title}</p>
        <p className="my-2 text-lg font-medium">${finalPrice.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default GameCard;
