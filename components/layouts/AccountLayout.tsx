'use client';

import { LogOut } from 'lucide-react';
import Info from '../Account/Info';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const accountPath = pathname.replace('/account/', '');

  return (
    <>
      <Info />
      <Tabs defaultValue={accountPath} className="w-[1000px] m-auto py-10">
        <TabsList className="grid *:text-base w-full grid-cols-5 *:bg-transparent *:data-[state=active]:decoration-white">
          <Link href="/account/orders">
            <TabsTrigger value="orders">My orders</TabsTrigger>
          </Link>
          <Link href="/account/wishlist">
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </Link>
          <Link href="/account/addresses">
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
          </Link>
          <Link href="/account/settings">
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </Link>
          <TabsTrigger value="logout">
            <LogOut size={20} />
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </>
  );
};

export default AccountLayout;
