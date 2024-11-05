'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import BasicLayout from '@/components/layouts/BasicLayout';
import Info from '@/components/Account/Info';
import { hasCookie } from 'cookies-next';
import WishList from '@/components/Account/WishList';
import Addresses from '@/components/Account/Addresses';
import Settings from '@/components/Account/Settings';

const AccountPage = () => {
  if (!hasCookie('user') || !hasCookie('token')) {
    return redirect('/');
  }

  return (
    <>
      <BasicLayout isContainer>
        <Info />
        <Tabs defaultValue="account" className="w-[1000px] m-auto py-10">
          <TabsList className="grid *:text-base w-full grid-cols-5 *:bg-transparent *:data-[state=active]:decoration-white">
            <TabsTrigger value="orders">My orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="logout">
              <LogOut size={20} />
            </TabsTrigger>
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
    </>
  );
};

export default AccountPage;
