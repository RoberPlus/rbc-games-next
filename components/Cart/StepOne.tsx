'use client';

import { useCart } from '@/hooks/useCart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CartItem from './CartItem';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

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
              <Button
                className="w-full text-base h-12 [&_svg]:size-6"
                onClick={() => {
                  redirect('/');
                }}
              >
                Go to the payment <ChevronRight />
              </Button>
              <Button
                className="w-full text-base h-12 [&_svg]:size-6"
                variant="ghost"
                onClick={() => {
                  redirect('/cart?step=2');
                }}
              >
                <ChevronLeft />
                Continue shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepOne;
