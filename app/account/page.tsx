'use client';

import { LogOut } from 'lucide-react';
import Info from '@/components/Account/Info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { redirect } from 'next/navigation';
import { deleteCookie, hasCookie } from 'cookies-next';
import WishList from '@/components/Account/WishList';
import Settings from '@/components/Account/Settings';
import Addresses from '@/components/Account/Addresses';
import BasicLayout from '@/components/layouts/BasicLayout';
import AlertModal from '@/components/Custom/AlertModal';
import { Button } from '@/components/ui/button';
import Orders from '@/components/Account/Orders';

const AccountPage = () => {
  if (!hasCookie('token')) {
    return redirect('/');
  }

  const logout = () => {
    deleteCookie('token');
    deleteCookie('user');
    return redirect('/');
  };

  return (
    <BasicLayout>
      <Info />
      <Tabs defaultValue="orders" className="w-[1000px] m-auto py-10">
        <TabsList className="grid *:text-base w-full grid-cols-5 *:bg-transparent *:data-[state=active]:decoration-white">
          <TabsTrigger value="orders" className="w-full">
            Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="w-full">
            Wishlist
          </TabsTrigger>
          <TabsTrigger value="addresses" className="w-full">
            Addresses
          </TabsTrigger>
          <TabsTrigger value="settings" className="w-full">
            Settings
          </TabsTrigger>
          <AlertModal
            actionFn={logout}
            deleteText="Do you want to log out?"
            Icon={
              <Button className="bg-destructive hover:bg-red-800 text-white m-1">
                <LogOut />
              </Button>
            }
          />
        </TabsList>
        <TabsContent value="orders">
          <Orders />
        </TabsContent>
        <TabsContent value="wishlist">
          <WishList />
        </TabsContent>
        <TabsContent value="addresses">
          <Addresses />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </BasicLayout>
  );
};

export default AccountPage;
