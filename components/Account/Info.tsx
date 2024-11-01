'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Contact } from 'lucide-react';
import { getCookie, hasCookie } from 'cookies-next';
import { redirect } from 'next/navigation';

const Info = () => {
  if (!hasCookie('user')) {
    return redirect('/');
  }
  
  const rawUser = getCookie('user') as any;
  const user = JSON.parse(rawUser) as any;
  const createdAt = new Date(user?.createdAt).toDateString();

  return (
    <div className="pt-40 flex flex-col items-center">
      <Button
        variant="secondary"
        className="m-0 rounded-full cursor-auto h-24 w-24 flex items-center justify-center mb-5 [&_svg]:size-12"
      >
        <Contact size={40} />
      </Button>
      <h3 className="mb-1 text-3xl">{user?.username}</h3>
      <h4 className="font-bold mb-3">{user?.email}</h4>
      <p className="text-secondary text-s">Member since: {createdAt}</p>
    </div>
  );
};

export default Info;
