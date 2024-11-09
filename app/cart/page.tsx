'use client';
import StepOne from '@/components/Cart/StepOne';
import CartLayout from '@/components/layouts/CartLayout';
import { useSearchParams } from 'next/navigation';
import StepTwo from '@/components/Cart/StepTwo';
import StepThree from '@/components/Cart/StepThree';

const CartPage = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step') ? searchParams.get('step') : 1;

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
