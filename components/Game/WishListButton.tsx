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
  const [whishListItemId, setwhishListItemId] = useState<any>();

  useEffect(() => {
    (async () => {
      try {
        const response = await checkGameWhishlist({
          gameDocumentId: game.documentId,
        });

        setwhishListItemId(response);
      } catch (error) {
        setwhishListItemId(null);
      }
    })();
  }, []);

  const deleteWishList = async () => {
    try {
      await deleteGameWhishlist(whishListItemId);

      setwhishListItemId(null);
    } catch (error) {
      console.error("Error deleting wishlist item:");
    }

    toast({
      title: "Game removed!",
      description: `"${game.title}" has been removed from your wishlist.`,
    });
  };

  const addWishList = async () => {
    const response = await addGameWhishlist({
      gameDocumentId: game.documentId,
    });

    setwhishListItemId(response);

    toast({
      title: "Saved successfully!",
      description: `"${game.title}" is now in your wishlist.`,
    });
  };

  const handleClick = () => {
    if (!hasCookie("token")) {
      return redirect("/join/sign-in");
    }

    if (!whishListItemId) {
      return addWishList();
    } else {
      return deleteWishList();
    }
  };

  return (
    <Button className={`w-1/5 h-14 [&_svg]:size-8 m-2 `} onClick={handleClick}>
      {!whishListItemId ? (
        <HeartIcon />
      ) : (
        <HeartFilledIcon className="text-black" />
      )}
    </Button>
  );
};

export default WishListButton;
