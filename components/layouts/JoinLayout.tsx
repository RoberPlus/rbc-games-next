'use client';

import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/images/logo.png';

const JoinLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen max-h-screen flex flex-row justify-between">
      <div className="flex justify-between w-screen absolute top-0 left-0 p-4">
        <Link href="/" className="w-72 max-h-10 absolute translate-x-5 mt-4">
          <Image src={image} alt="logo" width={250} height={40} quality={100} />
        </Link>
      </div>
      <div className="flex items-center justify-center w-2/4">{children}</div>

      <div
        className="bg-cover bg-center bg-no-repeat h-full w-1/2"
        style={{ backgroundImage: `url('/images/sign-wallpaper.jpg')` }}
      ></div>
    </div>
  );
};

export default JoinLayout;
