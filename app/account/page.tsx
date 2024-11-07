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
import DeleteDialog from '../../components/Custom/DeleteDialog';
import { Button } from '@/components/ui/button';

const AccountPage = () => {
  if (!hasCookie('user') || !hasCookie('token')) {
    return redirect('/');
  }

  const logout = () => {
    deleteCookie('user');
    deleteCookie('token');
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
          <DeleteDialog
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
          <h2 className="mt-10 mb-10">Your orders</h2>
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
