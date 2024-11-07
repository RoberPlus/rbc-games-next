'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { getCookie, hasCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

const Info = () => {
  if (!hasCookie('user') || !hasCookie('token')) {
    return redirect('/');
  }

  const rawUser = getCookie('user') as any;
  const user = JSON.parse(rawUser) as any;
  const createdAt = new Date(user?.createdAt).toDateString();

  return (
    <div className="flex flex-col items-center pt-36 pb-6">
      <Button
        variant="secondary"
        className="m-0 rounded-full cursor-auto h-24 w-24 flex items-center justify-center mb-5 [&_svg]:size-12"
      >
        <User size={40} />
      </Button>
      <h3 className="mb-1 text-3xl">{user?.username}</h3>
      <h4 className="font-bold mb-3">{user?.email}</h4>
      <p className="text-secondary text-s">Member since: {createdAt}</p>
    </div>
  );
};

export default Info;
