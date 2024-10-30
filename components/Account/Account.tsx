import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { redirect } from 'next/navigation';
import { Button } from '../ui/button';
import { ShoppingCart, CircleUser } from 'lucide-react';
import { Badge } from '../ui/badge';

const total = 4;

const Account = () => {
  const { user } = useAuth();
  const goToLogin = () => redirect('/join/sign-in');
  const goToAccount = () => redirect('/account');

  const goToCart = () => {
    if (!user) goToLogin();
    else redirect('/cart');
  };

  return (
    <div className="flex">
      <Button className="px-3 [&_svg]:size-5 mx-2" onClick={goToCart} variant='ghost'>
        {total > 0 && (
          <Badge variant="secondary" className="px-1 justify-center">
            {total}
          </Badge>
        )}
        <ShoppingCart size={128} />
      </Button>

      <Button className="px-2 [&_svg]:size-6" onClick={!user ? goToLogin : goToLogin} variant={user ? 'link' : 'ghost'}>
        <CircleUser />
      </Button>
    </div>
  );
};

export default Account;
