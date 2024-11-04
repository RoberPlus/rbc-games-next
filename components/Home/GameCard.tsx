import Link from 'next/link';
import React from 'react';
import { Card } from '../ui/card';
import imageplaceholder from '../../public/images/placeholder.webp';
import { Badge } from '../ui/badge';
import Image from 'next/image';

const GameCard = (gameData: any) => {
  const discountPrice = (gameData.game.discount / 100) * gameData.game.price;
  const finalPrice = gameData.game.price - discountPrice;

  return (
    <Link href={gameData.game.slug}>
      <Card className="relative max-w-96 h-64 border-none">
        <Image
          src={gameData.game.cover?.url ? gameData.game.cover.url : imageplaceholder}
          alt={gameData.game.title}
          fill
          className="rounded-sm object-cover hover:opacity-100 opacity-85"
        />
        <Badge className="overflow-hidden absolute bottom-0 left-0 rounded-none text-base object-left-bottom">
          -{gameData.game.discount}%
        </Badge>
      </Card>
      <div className="flex justify-between">
        <p className="m-2 font-light">{gameData.game.title}</p>
        <p className="text-lg font-medium my-2">${finalPrice.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default GameCard;
