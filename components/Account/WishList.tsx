import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { deleteGameWhishlist, fetchAllUserWishlist } from '@/utils/actions';
import { WishList as WishListType } from '@/utils/types';
import placeholderImage from '@/public/images/placeholder.webp';
import GameCardSkeleton from '../Home/GameCardSkeleton';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import { useToast } from '@/hooks/use-toast';

const WishList = () => {
  const [wishList, setWishlist] = useState<WishListType[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = (await fetchAllUserWishlist()) as any;
        setWishlist(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-10">
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
        </div>
      ) : (
        <>
          {Object.keys(wishList).length === 0 ? (
            <p className="py-10">No games available.</p>
          ) : (
            <>
              <h2 className="text-lg mt-10">You have {wishList.length} games in your wishlist.</h2>
              <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-10">
                {Object.entries(wishList).map(([gameIndex, wishListData]) => {
                  const discountPrice =
                    (wishListData.game.discount / 100) * wishListData.game.price;
                  const finalPrice = wishListData.game.price - discountPrice;

                  return (
                    <Card
                      key={wishListData?.game.documentId}
                      className="relative h-64 max-w-96 border-none"
                    >
                      <Image
                        src={
                          wishListData?.game?.cover?.url
                            ? wishListData.game.cover?.url
                            : placeholderImage
                        }
                        alt={wishListData.game.title}
                        fill
                        className="rounded-sm object-cover hover:opacity-100 opacity-60"
                      />
                      <DeleteGameWishlistModal wishListItemDocumentId={wishListData.documentId} />
                      <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="font-bold text-white">{wishListData.game.title}</p>
                        <p className="text-lg font-medium my-2 text-primary">
                          ${finalPrice.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

function DeleteGameWishlistModal(wishListItemDocumentId: any) {
  const { toast } = useToast();

  const onDelete = async () => {
    const response = (await deleteGameWhishlist(wishListItemDocumentId)) as any;

    toast({ description: response.message });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className="absolute top-0 right-0 p-0 m-2 text-red-800 size-7 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this game from your wishlist.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-red-800 text-white">
            <button type="submit" onClick={onDelete}>
              Continue
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WishList;
