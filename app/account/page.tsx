"use client";

import { LogOut } from "lucide-react";
import Info from "@/components/Account/User/Info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import { deleteCookie } from "cookies-next";
import WishList from "@/components/Account/WishList/WishList";
import Settings from "@/components/Account/User/Settings";
import Addresses from "@/components/Account/Addresses/Addresses";
import BasicLayout from "@/components/Layouts/BasicLayout";
import AlertModal from "@/components/Custom/AlertModal";
import { Button } from "@/components/ui/button";
import Orders from "@/components/Account/Orders/Orders";
import useCheckAuth from "@/hooks/useCheckAuth";

const AccountPage = () => {
  const isLogged = useCheckAuth(true);

  if (!isLogged) {
    return null;
  }

  const logout = () => {
    deleteCookie("token");
    deleteCookie("user");
    deleteCookie("cart");
    return redirect("/");
  };

  return (
    <BasicLayout>
      <Info />
      <Tabs
        defaultValue="orders"
        className="m-auto min-h-80 py-10 md:w-[1000px]"
      >
        <TabsList className="grid w-full grid-cols-5 *:bg-transparent *:text-base *:data-[state=active]:decoration-white">
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
              <Button className="m-1 bg-destructive text-white hover:bg-red-800">
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
