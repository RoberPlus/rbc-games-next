import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/images/logo.png';
import Account from '../Account/Account';
import Menu from '../Menu/Menu';
import { Suspense } from 'react';

const TopBar = (props: any) => {
  const { isOpenSearch } = props;
  return (
    <div className="flex flex-col md:flex-row items-center p-5 w-full z-10 fixed px-5 bg-gradient-to-b from-slate-950/70 to-transparent">
      <div className="w-full md:w-1/5 flex justify-between md:justify-start">
        <Link href="/" className="w-72 max-h-10 absolute translate-x-5 -translate-y-6">
          <Image src={image} alt="logo" width={250} height={40} quality={100} />
        </Link>
        <div className="block md:hidden">
          <Account />
        </div>
      </div>

      <div className="w-full md:w-3/5 flex justify-center mt-4 md:mt-0">
        <Suspense fallback={'loading...'}>
          <Menu isOpenSearch={isOpenSearch} />
        </Suspense>
      </div>

      <div className="hidden md:flex w-1/5 justify-end">
        <Account />
      </div>
    </div>
  );
};

export default TopBar;
