"use client";

import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CircleUser } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
          className="mx-2 px-3 text-white hover:bg-transparent hover:text-primary [&_svg]:size-7"
          onClick={() => redirect("/cart")}
          variant="ghost"
        >
          <Badge
            variant="default"
            className="-translate-y-3 translate-x-12 justify-center rounded-full px-2"
          >
            {cart.items.length}
          </Badge>

          <ShoppingCart size={128} />
        </Button>
      )}

      <Button
        className={`px-2 hover:bg-transparent hover:text-primary [&_svg]:size-7 ${
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
