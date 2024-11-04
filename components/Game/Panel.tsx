import { Game } from '@/utils/types';
import React from 'react';
import Image from 'next/image';
import imageplaceholder from '../../public/images/placeholder.webp';
import { Button } from '../ui/button';
import { Check, Tag, Heart, ShoppingCart } from 'lucide-react';

type Props = {
  game: Game;
};

const Panel = ({ game }: Props) => {
  const discountPrice = (game.discount / 100) * game.price;
  const finalPrice = game.price - discountPrice;

  return (
    <div className="relative flex -mt-48 mx-auto max-w-6xl pb-10 mb-10 m-auto">
      <div className="w-1/2 pr-3 rounded-md relative h-80">
        <Image
          src={game.cover?.url ? game.cover.url : imageplaceholder}
          quality={100}
          fill
          className="rounded-sm object-cover"
          alt={game.title}
        />
      </div>

      <div className="w-1/2 pl-3 h-full">
        <div className="backdrop-blur-lg rounded-md p-5 flex flex-col items-center">
          <h2 className="mb-3 text-2xl">{game.title}</h2>
          <div className="flex items-center bg-slate-800/30 p-2 rounded-full">
            <Button
              className={`p-4 hover:decoration-0 hover:bg-transparent  text-white hover:text-primary rounded-3xl m-2 `}
              variant="ghost"
            >
              <Image
                src={game.platform.icon.url}
                alt={game.platform.title}
                height={30}
                width={30}
                className="pr-1 hover:text-white"
              />
              {game.platform.title}
            </Button>
            <p className="font-extralight text-slate-500">|</p>
            <Check size={20} className="text-green-700 m-2" />
            <span className="mr-2 text-sm">In stock</span>
            <p className="font-extralight text-slate-500">|</p>
            <Check size={20} className="text-green-700 m-2" />
            <span className="mr-2 text-sm">Digital download</span>
          </div>
          <div className="space-x-3 flex justify-center mt-12">
            <span className="line-through flex text-base translate-y-3">
              <Tag size={15} className="m-1" />${game.price}
            </span>
            <span className="text-primary text-base translate-y-3">-{game.discount}%</span>
            <span className="text-3xl">${finalPrice.toFixed(2)}</span>
          </div>
          <div className="w-full mt-4 flex">
            <Button className="w-1/5 h-14 [&_svg]:size-7 m-2">
              <Heart className="text-xl" />
            </Button>
            <Button className="w-4/5 h-14 [&_svg]:size-7 m-2">
              <ShoppingCart size={50} className="mx-2" />{' '}
              <span className="text-base">Add to cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
