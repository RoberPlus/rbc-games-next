'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { Button } from '../ui/button';
import { ShoppingCart, CircleUser } from 'lucide-react';
import { Badge } from '../ui/badge';
import { hasCookie } from 'cookies-next';
import { useCart } from '@/hooks/useCart';

const Account = () => {
  const isLogged = hasCookie('token');

  const { cart } = useCart();
  const totalCart = cart.items.length;

  const redirectUser = () => {
    redirect(isLogged ? '/account' : '/join/sign-in');
  };

  const goToCart = () => redirect('/cart');

  return (
    <div className="flex">
      <Button
        className="px-3 text-white hover:text-primary hover:bg-transparent [&_svg]:size-7 mx-2"
        onClick={goToCart}
        variant="ghost"
      >
        {totalCart > 0 && (
          <Badge
            variant="default"
            className="px-2 justify-center translate-x-12 -translate-y-3 rounded-full"
          >
            {totalCart}
          </Badge>
        )}
        <ShoppingCart size={128} />
      </Button>

      <Button
        className="px-2 hover:text-primary hover:bg-transparent [&_svg]:size-7"
        onClick={redirectUser}
        variant={isLogged ? 'link' : 'ghost'}
      >
        <CircleUser />
      </Button>
    </div>
  );
};

export default Account;
