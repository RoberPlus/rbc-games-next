import { deleteCookie } from 'cookies-next';
import { CircleCheckBig } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const StepThree = () => {
  deleteCookie('cart');

  return (
    <div className="max-w-7xl flex m-auto items-center flex-col h-4/6">
      <CircleCheckBig className="mt-20 text-green-700" size={100} />
      <p className="text-2xl font-light mt-7">Purchase successful!</p>
      <Link href={'/account'} className="mt-7">
        <Button className="mb-48 text-lg h-12 w-56">Go to my orders</Button>
      </Link>
    </div>
  );
};

export default StepThree;
