import React, { useEffect, useState } from 'react';
import { hasCookie } from 'cookies-next';
import { redirect } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { addGameWhishlist, checkGameWhishlist, deleteGameWhishlist } from '@/utils/actions';
import { Game } from '@/utils/types';

type Props = {
  game: Game;
};

const WishListButton = ({ game }: Props) => {
  const { toast } = useToast();
  const [hasWishList, setHasWishList] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await checkGameWhishlist({ gameDocumentId: game.documentId });
        setHasWishList(response);
      } catch (error) {
        setHasWishList(false);
      }
    })();
  }, [game]);

  const deleteWishList = async () => {
    if (!hasCookie('user')) {
      return redirect('/join/sign-in');
    }

    const response = await deleteGameWhishlist({
      wishListItemDocumentId: hasWishList.data[0].documentId,
    });
    setHasWishList(false);

    toast({
      title: 'Game removed!',
      description: `"${game.title}" has been removed from your wishlist.`,
    });
  };

  const addWishList = async () => {
    if (!hasCookie('user')) {
      return redirect('/join/sign-in');
    }

    const response = await addGameWhishlist({ gameDocumentId: game.documentId });

    const transformedResponse = { data: [response.data] };
    setHasWishList(transformedResponse);

    toast({
      title: 'Saved successfully!',
      description: `"${game.title}" is now in your wishlist.`,
    });
  };

  return (
    <Button
      className="w-1/5 h-14 [&_svg]:size-8 m-2"
      onClick={hasWishList ? deleteWishList : addWishList}
    >
      {!hasWishList ? <HeartIcon /> : <HeartFilledIcon className="text-black" />}
    </Button>
  );
};

export default WishListButton;
