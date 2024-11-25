"use client";

import { useCart } from "@/hooks/useCart";
import fetcher from "@/services/fetcher";
import { ENV } from "@/utils/constants";
import React from "react";
import useSWR from "swr";
import { Button } from "../ui/button";
import Image from "next/image";
import { Tag } from "lucide-react";

const CartItem = () => {
  const { cart, addItem, removeItem } = useCart();
  if (cart.items.length === 0) return <p className="m-5"> No items in cart.</p>;

  const ids = cart.items.map((item: any, index: any) => {
    return `filters[documentId][$eq][${index}]=${item.gameId}&populate=cover`;
  });

  const idsConJoin = ids.join("&");

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${idsConJoin}`;

  /* eslint-disable */
  const { data, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });
  /* eslint-enable */

  if (isLoading) return <p>Loading...</p>;

  const cartWithBackendData = cart.items.map((cartItem: any) => {
    const newItem = data.data.find(
      (backendItem: any) => backendItem.documentId === cartItem.gameId,
    );

    return {
      ...newItem,
      quantity: cartItem.quantity,
      platform: cartItem.platform,
    };
  });

  const getStoreName = (platform: string) => {
    switch (platform) {
      case "Xbox":
        return "Microsoft Store";
      case "Playstation":
        return "PSN Store";
      case "PC":
        return "Steam";
      case "Nintendo":
        return "Nintendo eShop";
      default:
        return "Unknown Store";
    }
  };

  return (
    <>
      {Object.entries(cartWithBackendData).map(([, item]: any) => (
        <div className="flex gap-4 py-5 md:py-2" key={item.documentId}>
          {/* Image */}
          <div className="relative h-24 w-1/3 max-w-40">
            <Image
              className="rounded-sm object-cover"
              src={item.cover.url}
              fill
              alt={item.title}
            />
          </div>

          {/* Details */}
          <div className="w-2/3 -translate-y-1">
            <p>{item.title}</p>
            <p className="font-extralight text-slate-400">
              {getStoreName(item.platform)}
            </p>

            {/* Prices */}
            <p className="flex translate-y-3 pt-2">
              <span className="flex text-base line-through">
                <Tag size={15} className="m-1" />${item.price}
              </span>
              <span className="pl-2 text-base">
                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
              </span>
              <span className="pl-2 text-base text-primary">
                -{item.discount}%
              </span>
            </p>

            {/* Buttons */}
            <p className="flex translate-y-4 justify-end space-x-1 md:-translate-y-7">
              <Button
                variant="secondary"
                onClick={() =>
                  removeItem({
                    gameId: item.documentId,
                    gameTitle: item.title,
                    price: item.price,
                  })
                }
              >
                -
              </Button>
              <span className="mt-2 px-2">{item.quantity}</span>
              <Button
                variant="secondary"
                onClick={() =>
                  addItem({
                    gameId: item.documentId,
                    gameTitle: item.title,
                    price: item.price,
                  })
                }
              >
                +
              </Button>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
