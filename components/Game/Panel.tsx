"use client";

import { Game } from "@/utils/types";
import React from "react";
import Image from "next/image";
import imageplaceholder from "../../public/images/placeholder.webp";
import { Button } from "@/components/ui/button";
import { Check, Tag, ShoppingCart } from "lucide-react";
import WishListButton from "@/components/Game/WishListButton";
import { useCart } from "@/hooks/useCart";
import CartModal from "@/components/Cart/Modal/RightSheet";
import { redirect } from "next/navigation";
import { hasCookie } from "cookies-next";
import Link from "next/link";

type Props = {
  game: Game;
};

const Panel = ({ game }: Props) => {
  const isLogged = hasCookie("token");
  const { addItem } = useCart();
  const discountPrice = (game.discount / 100) * game.price;
  const finalPrice = game.price - discountPrice;

  const handleAddItem = (game: any) => {
    if (!isLogged) {
      return redirect("/join/sign-in");
    }

    addItem(game);
  };

  return (
    <div className="m-auto mx-auto mt-52 flex max-w-6xl flex-col space-y-5 pb-10 md:-mt-48 md:mb-10 md:flex-row md:space-y-0">
      <div className="relative h-80 rounded-md md:w-1/2 md:pr-3">
        <Image
          src={game.cover?.url ? game.cover.url : imageplaceholder}
          quality={100}
          fill
          className="rounded-sm object-cover p-7 md:p-0"
          alt={game.title}
        />
      </div>

      <div className="h-full bg-slate-800 p-4 md:w-1/2 md:bg-transparent md:p-0 md:pl-3">
        <div className="flex flex-col items-center rounded-md p-5 backdrop-blur-lg">
          <h2 className="mb-3 text-3xl">{game.title}</h2>
          <div className="flex items-center rounded-full bg-slate-300/30 p-2 md:bg-slate-500/15">
            <Link href={"/games/" + game.platform.slug}>
              <Button
                className={`m-2 rounded-3xl p-4 text-white hover:bg-transparent hover:text-primary hover:decoration-0`}
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
            </Link>
            <p className="font-extralight text-slate-500">|</p>
            <Check size={20} className="m-2 text-green-700" />
            <span className="mr-2 text-sm">In stock</span>
            <p className="font-extralight text-slate-500">|</p>
            <Check size={20} className="m-2 text-green-700" />
            <span className="mr-2 text-sm">Digital download</span>
          </div>
          <div className="mt-12 flex justify-center space-x-3">
            <span className="flex translate-y-3 text-base line-through">
              <Tag size={15} className="m-1" />${game.price}
            </span>
            <span className="translate-y-3 text-base text-primary">
              -{game.discount}%
            </span>
            <span className="text-3xl">${finalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex w-full">
            <WishListButton game={game} />
            <CartModal>
              <Button
                className="m-2 h-14 w-4/5 [&_svg]:size-7"
                onClick={() =>
                  handleAddItem({
                    gameId: game.documentId,
                    gameTitle: game.title,
                    finalPrice: Number(finalPrice.toFixed(2)),
                    price: Number(game.price.toFixed(2)),
                    discount: game.discount,
                    platform: game.platform.title,
                  })
                }
              >
                <ShoppingCart size={50} className="mx-2" />
                <span className="text-base">Add to cart</span>
              </Button>
            </CartModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
