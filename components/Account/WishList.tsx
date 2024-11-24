"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { deleteGameWhishlist } from "@/utils/actions";
import { WishList as WishListType } from "@/utils/types";
import placeholderImage from "@/public/images/placeholder.webp";
import { Trash2 } from "lucide-react";
import { authFetcher } from "@/services/fetcher";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { ENV } from "@/utils/constants";
import AlertModal from "@/components/Custom/AlertModal";
import Link from "next/link";

const WishList = () => {
  const userCookie = getCookie("user") as string;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const populate = "populate[0]=game&populate[1]=game.cover";
  const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WHISHLIST}?filters[user][id][$eq]=${user.id}&${populate}`;
  const { data, error, isLoading, mutate } = useSWR(url, authFetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const wishList = data.data as WishListType[];

  const onDeleteWishList = async (wishListItemDocumentId: string) => {
    await deleteGameWhishlist(wishListItemDocumentId);
    mutate();
  };

  return (
    <Card className="my-10">
      <CardHeader className="text-xl">Your Whishlist</CardHeader>
      <CardContent className="w-full">
        <div>
          <>
            {Object.keys(wishList).length === 0 ? (
              <p className="py-10">No games in your wishlist.</p>
            ) : (
              <>
                <h2 className="text-lg">
                  You have {wishList.length} games in your wishlist.
                </h2>
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-10">
                  {Object.entries(wishList).map(([gameIndex, wishListData]) => {
                    const discountPrice =
                      (wishListData.game.discount / 100) *
                      wishListData.game.price;
                    const finalPrice = wishListData.game.price - discountPrice;

                    return (
                      <Card
                        key={wishListData?.game.id}
                        className="relative h-64 max-w-96 border-none group"
                      >
                        <Link href={`/game/${wishListData.game.slug}`}>
                          <Image
                            src={
                              wishListData?.game?.cover?.url
                                ? wishListData.game.cover?.url
                                : placeholderImage
                            }
                            alt={wishListData.game.title}
                            fill
                            className="rounded-sm object-cover group-hover:opacity-100 opacity-60"
                          />
                        </Link>
                        <AlertModal
                          actionFn={onDeleteWishList}
                          itemId={wishListData.documentId}
                          deleteText="This will permanently delete this game from your wishlist."
                          Icon={
                            <Trash2 className="absolute top-0 right-0 p-0 m-2 text-red-800 size-7 cursor-pointer" />
                          }
                        />
                        <Link href={wishListData.game.slug}>
                          <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="font-bold text-white">
                              {wishListData.game.title}
                            </p>
                            <p className="text-lg font-medium my-2 text-primary">
                              ${finalPrice.toFixed(2)}
                            </p>
                          </CardContent>
                        </Link>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </>
        </div>
      </CardContent>
    </Card>
  );
};

export default WishList;
