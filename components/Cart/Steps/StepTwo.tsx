"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { ENV } from "@/utils/constants";
import CartAddresses from "../CartAddresses";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "@/components/Cart/Payment";
import { useState } from "react";

const stripePromise = loadStripe(ENV.STRIPE_TOKEN);

const StepTwo = () => {
  const { cart, totalCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(null);

  return (
    <div className="m-auto flex max-w-7xl flex-col space-x-0 md:flex-row md:space-x-10">
      <div className="relative my-10 flex flex-col space-y-10 md:w-3/5">
        <Card className="w-full p-3">
          <CardHeader>
            <CardTitle className="text-2xl">Summary</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <>
              {Object.entries(cart.items).map(([, item]: any) => (
                <div
                  key={item.gameId}
                  className="flex justify-between border-b p-2"
                >
                  <p className="flex flex-col">
                    <span>{item.gameTitle}</span>{" "}
                    <span className="text-sm font-extralight">
                      {item.platform.title}
                    </span>
                  </p>

                  <p className="translate-y-2 font-extralight">
                    {item.quantity}x ${item.price}
                  </p>
                </div>
              ))}
            </>
          </CardContent>
        </Card>
        <Card className="w-full p-3">
          <CardHeader>
            <CardTitle className="text-2xl">1 - Address</CardTitle>
            <CardDescription>Select your billing address.</CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <CartAddresses
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
          </CardContent>
        </Card>
      </div>
      <div className="relative mt-10 flex flex-col pb-10 md:w-2/5">
        <Card className="w-full p-3">
          <CardHeader>
            <CardTitle className="text-2xl">2 - Payment</CardTitle>
            <CardDescription>Complete your payment.</CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            {selectedAddress && (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: totalCart,
                  currency: "usd",
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#facc15",
                    },
                  },
                }}
              >
                <Payment
                  amount={totalCart}
                  cart={cart}
                  selectedAddress={selectedAddress}
                />
              </Elements>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepTwo;
