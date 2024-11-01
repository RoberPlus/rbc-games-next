'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import image from '@/public/images/16902.jpg';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';

import BasicLayout from '@/components/layouts/BasicLayout';
import Info from '@/components/Account/Info';
import ChangeNamesForm from '@/components/Account/ChangeNamesForm';

const AccountPage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    redirect('/');
    return null;
  }

  return (
    <>
      <BasicLayout isContainer>
        <Info />
        <Tabs defaultValue="account" className="w-[1000px] m-auto pt-10">
          <TabsList className="grid w-full grid-cols-5 *:bg-transparent *:data-[state=active]:decoration-white">
            <TabsTrigger value="orders">My orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="address">Addresses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="logout" onClick={logout}>
              <LogOut size={20} />
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="orders"
            className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
          >
            <Card>
              <Image src={image} alt="sims" className="rounded-sm" />
              <CardContent className=" pt-3 m-0">
                <div className="flex justify-between">
                  <p className="">Life is Strange: Double Exposure</p>
                  <p className="scale-125">$42.86</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <Image src={image} alt="sims" className="rounded-sm" />
              <CardContent className=" pt-3 m-0">
                <div className="flex justify-between">
                  <p className="">Life is Strange: Double Exposure</p>
                  <p className="scale-125">$42.86</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Name and Lastname</CardTitle>
                <CardDescription>
                  Change your account data here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <ChangeNamesForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </BasicLayout>
    </>
  );
};

export default AccountPage;
