"use client";

import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { ShoppingCart, CircleUser } from "lucide-react";
import { Badge } from "../ui/badge";
import { useCart } from "@/hooks/useCart";
import useCheckAuth from "@/hooks/useCheckAuth";

const User = () => {
  const isLogged = useCheckAuth();
  const { cart } = useCart();

  const redirectUserAccount = () => {
    redirect(isLogged ? "/account" : "/join/sign-in");
  };

  return (
    <div className="flex">
      {isLogged && cart.items.length > 0 && (
        <Button
          className="px-3 text-white hover:text-primary hover:bg-transparent [&_svg]:size-7 mx-2"
          onClick={() => redirect("/cart")}
          variant="ghost"
        >
          <Badge
            variant="default"
            className="px-2 justify-center translate-x-12 -translate-y-3 rounded-full"
          >
            {cart.items.length}
          </Badge>

          <ShoppingCart size={128} />
        </Button>
      )}

      <Button
        className={`px-2 hover:text-primary hover:bg-transparent [&_svg]:size-7 ${
          isLogged && "text-primary"
        }`}
        onClick={redirectUserAccount}
        variant="ghost"
      >
        <CircleUser />
      </Button>
    </div>
  );
};

export default User;
