import React from 'react';
import { redirect } from 'next/navigation';
import { Button } from '../ui/button';
import { ShoppingCart, CircleUser } from 'lucide-react';
import { Badge } from '../ui/badge';
import { getCookie, hasCookie } from 'cookies-next';

const total = 4;

const Account = () => {
  const user = hasCookie('user') ? getCookie('user') : undefined;
  const redirectUser = () => {
    redirect(user ? '/account' : '/join/sign-in');
  };
  const goToCart = () => redirect('/cart');

  return (
    <div className="flex">
      <Button
        className="px-3 text-white hover:text-primary hover:bg-transparent [&_svg]:size-7 mx-2"
        onClick={goToCart}
        variant="ghost"
      >
        {total > 0 && (
          <Badge
            variant="default"
            className="px-2 justify-center translate-x-12 -translate-y-3 rounded-full"
          >
            {total}
          </Badge>
        )}
        <ShoppingCart size={128} />
      </Button>

      <Button
        className="px-2 hover:text-primary hover:bg-transparent [&_svg]:size-7"
        onClick={redirectUser}
        variant={'link'}
      >
        <CircleUser />
      </Button>
    </div>
  );
};

export default Account;
