"use client";

import StepOne from "@/components/Cart/Steps/StepOne";
import CartLayout from "@/components/Layouts/CartLayout";
import { useSearchParams } from "next/navigation";
import StepTwo from "@/components/Cart/Steps/StepTwo";
import StepThree from "@/components/Cart/Steps/StepThree";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import useCheckAuth from "@/hooks/useCheckAuth";

const CartPage = () => {
  const router = useRouter();
  const isLogged = useCheckAuth(true);
  const { cart } = useCart();
  const searchParams = useSearchParams();

  if (!isLogged) {
    return null;
  }

  if (cart.items.length === 0) {
    return router.replace("/");
  }

  const step = searchParams.get("step") ? Number(searchParams.get("step")) : 1;

  let render;

  switch (Number(step)) {
    case 1:
      render = <StepOne />;
      break;
    case 2:
      render = <StepTwo />;
      break;
    case 3:
      render = <StepThree />;
      break;
    default:
      break;
  }

  return (
    <CartLayout>
      <div className="pt-32">{render}</div>
    </CartLayout>
  );
};

export default CartPage;
