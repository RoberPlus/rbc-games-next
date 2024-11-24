"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { ENV } from "@/utils/constants";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

const Payment = ({
  amount,
  cart,
  selectedAddress,
}: {
  amount: number;
  cart: any;
  selectedAddress: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const userCookie = getCookie("user") as string;
  const token = getCookie("token") as string;
  const user = userCookie ? JSON.parse(userCookie) : null;

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState();
  const [IsStripeLoading, setIsStripeLoading] = useState(true);

  if (!amount) return null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      } catch (error) {
        setErrorMessage("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsStripeLoading(true);

    if (!stripe || !elements) {
      setIsStripeLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setIsStripeLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/cart?step=3`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsStripeLoading(false);
    } else {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
      const paymentToken = paymentIntent.id;

      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentIntentId: paymentToken,
          products: cart.items,
          idUser: user.id,
          addressShipping: selectedAddress,
          totalPayment: amount,
        }),
      };

      const response = await fetch(url, params);

      if (response.status === 200) {
        setIsStripeLoading(false);
        redirect("/cart?step=3");
      }

      setIsStripeLoading(false);
    }

    if (!clientSecret || !stripe || !elements) {
      return (
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="w-full rounded-lg p-5 flex flex-col">
        <form onSubmit={handleSubmit}>
          {clientSecret && (
            <PaymentElement onReady={() => setIsStripeLoading(false)} />
          )}
          {errorMessage && (
            <div className="text-red-500/90">{errorMessage}</div>
          )}
          <Button
            disabled={!stripe || IsStripeLoading}
            className="w-full text-lg font-medium h-12 [&_svg]:size-6 mt-8"
            type="submit"
          >
            {!stripe || IsStripeLoading ? "Processing..." : `Pay $${amount}`}
            {!stripe || IsStripeLoading ? "" : <CreditCard />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
