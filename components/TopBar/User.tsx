'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { Button } from '../ui/button';
import { ShoppingCart, CircleUser } from 'lucide-react';
import { Badge } from '../ui/badge';
import { hasCookie } from 'cookies-next';
import { useCart } from '@/hooks/useCart';

const User = () => {
  const isLogged = hasCookie('token');

  const { cart } = useCart();
  const totalCart = cart.items.length;

  const redirectUserAccount = () => {
    redirect(isLogged ? '/account' : '/join/sign-in');
  };

  const redirectUserCart = () => {
    redirect(isLogged ? '/cart' : '/join/sign-in');
  };

  return (
    <div className="flex">
      <Button
        className="px-3 text-white hover:text-primary hover:bg-transparent [&_svg]:size-7 mx-2"
        onClick={redirectUserCart}
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
        onClick={redirectUserAccount}
        variant={isLogged ? 'link' : 'ghost'}
      >
        <CircleUser />
      </Button>
    </div>
  );
};

export default User;
