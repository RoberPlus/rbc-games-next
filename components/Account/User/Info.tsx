"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { getCookie } from "cookies-next";
import { DateTime } from "luxon";

const Info = () => {
  const rawUser = getCookie("user") as any;
  const user = JSON.parse(rawUser) as any;

  const memberSinceDate = DateTime.fromISO(user?.createdAt).toLocaleString();

  return (
    <div className="flex flex-col items-center pt-36 pb-6">
      <Button
        variant="secondary"
        className="m-0 rounded-full cursor-auto h-24 w-24 flex items-center justify-center mb-5 [&_svg]:size-12"
      >
        <User size={40} />
      </Button>
      <h2 className="text-3xl tracking-wide">
        {user?.firstName && user?.firstName} {user?.lastName && user?.lastName}
      </h2>
      <h4 className="font-bold">{user?.email}</h4>
      <h3 className="mb-1">@{user?.username}</h3>
      <p className="text-gray-500">Member since: {memberSinceDate}</p>
    </div>
  );
};

export default Info;
