import React, { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { HeartFilledIcon, HeartIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
  addGameWhishlist,
  checkGameWhishlist,
  deleteGameWhishlist,
} from "@/utils/actions";
import { Game } from "@/utils/types";
import { redirect } from "next/navigation";
import { hasCookie } from "cookies-next";

type Props = {
  game: Game;
};

const WishListButton = ({ game }: Props) => {
  const { toast } = useToast();
  const [whishListItem, setwhishListItem] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const deleteWishList = useCallback(async () => {
    const gameInWishList = await checkGameWhishlist({
      gameDocumentId: game.documentId,
    });

    await deleteGameWhishlist(gameInWishList.documentId);

    setwhishListItem(null);

    toast({
      title: "Game removed!",
      description: `"${game.title}" has been removed from your wishlist.`,
    });
  }, []);

  const addWishList = useCallback(async () => {
    const gameInWishList = await checkGameWhishlist({
      gameDocumentId: game.documentId,
    });

    const response = await addGameWhishlist({
      gameDocumentId: gameInWishList.documentId,
    });

    setwhishListItem(response);

    toast({
      title: "Saved successfully!",
      description: `"${game.title}" is now in your wishlist.`,
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await checkGameWhishlist({
          gameDocumentId: game.documentId,
        });

        setwhishListItem(response);
      } catch (error) {
        setwhishListItem(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleClick = () => {
    if (!hasCookie("token")) {
      return redirect("/join/sign-in");
    }

    if (isLoading) {
      return null;
    }

    if (!whishListItem) {
      return addWishList();
    } else {
      return deleteWishList();
    }
  };

  return (
    <>
      <Button
        className={`w-1/5 h-14 [&_svg]:size-8 m-2 ${
          isLoading && "bg-primary/70"
        }`}
        onClick={handleClick}
      >
        {isLoading && <UpdateIcon className="animate-spin text-black" />}
        {!whishListItem && !isLoading ? (
          <HeartIcon />
        ) : (
          <HeartFilledIcon className="text-black" />
        )}
      </Button>
    </>
  );
};

export default WishListButton;
