'use client';

import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { deleteGameWhishlist } from '@/utils/actions';
import { WishList as WishListType } from '@/utils/types';
import placeholderImage from '@/public/images/placeholder.webp';
import { Trash2 } from 'lucide-react';
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
import { authFetcher } from '@/services/fetcher';
import useSWR from 'swr';
import { getCookie } from 'cookies-next';
import { ENV } from '@/utils/constants';
import DeleteDialog from '../Custom/DeleteDialog';

const WishList = () => {
  const { toast } = useToast();
  const userCookie = getCookie('user') as string;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const populate = 'populate[0]=game&populate[1]=game.cover';
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
    <>
      {Object.keys(wishList).length === 0 ? (
        <p className="py-10">No games available.</p>
      ) : (
        <>
          <h2 className="text-lg mt-10">You have {wishList.length} games in your wishlist.</h2>
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 mb-10">
            {Object.entries(wishList).map(([gameIndex, wishListData]) => {
              const discountPrice = (wishListData.game.discount / 100) * wishListData.game.price;
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
                  <DeleteDialog
                    actionFn={onDeleteWishList}
                    itemId={wishListData.documentId}
                    deleteText="This will permanently delete this game from your wishlist."
                    Icon={
                      <Trash2 className="absolute top-0 right-0 p-0 m-2 text-red-800 size-7 cursor-pointer" />
                    }
                  />
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
  );
};

function DeleteGameWishlistModal({
  wishListItemDocumentId,
  onDeleteWishList,
}: {
  wishListItemDocumentId: string;
  onDeleteWishList: (wishListItemDocumentId: string) => void;
}) {
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
          <AlertDialogAction
            className="bg-destructive hover:bg-red-800 text-white"
            onClick={() => onDeleteWishList(wishListItemDocumentId)}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WishList;
