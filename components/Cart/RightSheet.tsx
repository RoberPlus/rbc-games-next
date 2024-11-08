'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useCart } from '@/hooks/useCart';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';
import CartItem from './CartItem';

const CartModal = ({ children }: { children: React.ReactNode }) => {
  const { cart, totalCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetOverlay>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Cart ({cart.items.length} items)</SheetTitle>
            <Separator className="my-4 bg-zinc-700 h-0.5" />
          </SheetHeader>
          <CartItem />
          <SheetFooter>
            <div className="w-full">
              <Separator className="my-4 bg-zinc-700 h-0.5" />
              <div className="flex justify-between w-full my-3">
                <p>Total Cart:</p>
                <p>${totalCart.toFixed(2)}</p>
              </div>
              <Button
                className="w-full text-base"
                disabled={cart.items.length === 0 ? true : false}
              >
                Go to pay
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </SheetOverlay>
    </Sheet>
  );
};

export default CartModal;
