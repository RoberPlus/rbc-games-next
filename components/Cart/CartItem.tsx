'use client';

import { useCart } from '@/hooks/useCart';
import fetcher from '@/services/fetcher';
import { ENV } from '@/utils/constants';
import React from 'react';
import useSWR from 'swr';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Tag } from 'lucide-react';

const CartItem = () => {
  const { cart, addItem, removeItem } = useCart();

  if (cart.items.length === 0) return <p className="m-5"> No items in cart.</p>;

  const ids = cart.items.map((item: any, index: any) => {
    return `filters[documentId][$eq][${index}]=${item.gameId}&populate=cover`;
  });

  const idsConJoin = ids.join('&');

  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAME}?${idsConJoin}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, { revalidateOnFocus: false });

  if (isLoading) return <p>Loading...</p>;

  const cartWithBackendData = cart.items.map((cartItem: any) => {
    const newItem = data.data.find(
      (backendItem: any) => backendItem.documentId === cartItem.gameId
    );
    return { ...newItem, quantity: cartItem.quantity };
  });

  const getStoreName = (platform: string) => {
    switch (platform) {
      case 'xbox':
        return 'Microsoft Store';
      case 'playstation':
        return 'PSN Store';
      case 'pc':
        return 'Steam';
      case 'nintendo':
        return 'Nintendo eShop';
      default:
        return 'Unknown Store';
    }
  };

  return (
    <>
      {Object.entries(cartWithBackendData).map(([index, item]: any) => (
        <div className="flex gap-4 py-2" key={item.documentId}>
          <div className="relative h-24 max-w-40 w-1/3">
            <Image className="rounded-sm object-cover" src={item.cover.url} fill alt={item.title} />
          </div>
          <div className="-translate-y-1 w-2/3">
            <p>{item.title}</p>
            <p className="font-extralight text-slate-400">{getStoreName(item.platform)}</p>
            <p className="translate-y-3 flex pt-2">
              <span className="line-through flex text-base">
                <Tag size={15} className="m-1" />${item.price}
              </span>
              <span className="text-base pl-2">
                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
              </span>
              <span className="text-primary text-base pl-2">-{item.discount}%</span>
            </p>
            <p className="space-x-1 justify-end flex -translate-y-6">
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
              <span className="px-2 mt-2">{item.quantity}</span>
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
