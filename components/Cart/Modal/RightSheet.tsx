"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/Cart/CartItem";
import Link from "next/link";

const CartModal = ({ children }: { children: React.ReactNode }) => {
  const { cart, totalCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetOverlay>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Cart ({cart.items.length} items)</SheetTitle>
            <Separator className="my-4 h-0.5 bg-zinc-700" />
          </SheetHeader>
          <CartItem />
          <SheetFooter>
            <div className="w-full">
              <Separator className="my-4 h-0.5 bg-zinc-700" />
              <div className="my-3 flex w-full justify-between">
                <p>Total Cart:</p>
                <p>${totalCart.toFixed(2)}</p>
              </div>
              <Link href={"/cart"}>
                <Button
                  className="w-full text-base"
                  disabled={cart.items.length === 0 ? true : false}
                >
                  Go to pay
                </Button>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </SheetOverlay>
    </Sheet>
  );
};

export default CartModal;
