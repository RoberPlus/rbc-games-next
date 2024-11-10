'use client';

import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const StepOne = () => {
  const { cart, totalCart, totalPriceWithDiscount } = useCart();

  return (
    <div className="max-w-7xl flex m-auto space-x-10">
      <div className="relative flex pb-10 mb-10 w-3/5">
        <Card className="my-10 w-full p-3">
          <CardHeader>
            <CardTitle className="text-2xl">Cart</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <CartItem />
          </CardContent>
        </Card>
      </div>
      <div className="relative flex pb-10 mb-10  w-2/5">
        <Card className="my-10 w-full p-3">
          <CardHeader>
            <CardTitle className="text-2xl">Summary</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <div className="space-y-3">
              <div className="flex justify-between font-extralight text-gray-400">
                <span>Original price</span>
                <span>${totalCart}</span>
              </div>
              <div className="flex justify-between font-extralight text-gray-400">
                <span>Discount</span>
                <span>-${(totalCart - totalPriceWithDiscount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-7">
                <span>Subtotal</span>
                <span>${totalPriceWithDiscount.toFixed(2)}</span>
              </div>
              <div className="mt-3">
                <Link href={'/cart?step=2'} className="pt-2">
                  <Button className="w-full text-base h-12 [&_svg]:size-6 my-2">
                    Go to the payment <ChevronRight />
                  </Button>
                </Link>
                <Link href={'/'}>
                  <Button className="w-full text-base h-12 [&_svg]:size-6" variant="ghost">
                    <ChevronLeft />
                    Continue shopping
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepOne;
