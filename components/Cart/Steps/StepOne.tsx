"use client";

import { useCart } from "@/hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CartItem from "@/components/Cart/CartItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StepOne = () => {
  const { totalCart, totalPriceWithDiscount } = useCart();

  return (
    <div className="m-auto mt-10 flex max-w-7xl flex-col space-x-0 md:flex-row md:space-x-7">
      <div className="relative flex pb-10 md:w-3/5">
        <Card className="w-full md:p-3">
          <CardHeader>
            <CardTitle className="text-2xl">Cart</CardTitle>
          </CardHeader>
          <CardContent className="w-full p-2 md:p-5">
            <CartItem />
          </CardContent>
        </Card>
      </div>
      <div className="relative mb-10 flex pb-10 md:w-2/5">
        <Card className="w-full p-3">
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
              <div className="flex justify-between pt-7 text-lg font-medium">
                <span>Subtotal</span>
                <span>${totalPriceWithDiscount.toFixed(2)}</span>
              </div>
              <div className="mt-3">
                <Link href={"/cart?step=2"} className="pt-2">
                  <Button className="my-2 h-12 w-full text-base [&_svg]:size-6">
                    Go to the payment <ChevronRight />
                  </Button>
                </Link>
                <Link href={"/"}>
                  <Button
                    className="h-12 w-full text-base [&_svg]:size-6"
                    variant="ghost"
                  >
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
