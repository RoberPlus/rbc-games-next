import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/images/logo.png';
import Account from '../Account/Account';
import Menu from '../Menu/Menu';
import { Suspense } from 'react';

const TopBar = (props: any) => {
  const { isOpenSearch } = props;

  return (
    <div className="flex flex-col md:flex-row items-center p-5 w-full z-10 fixed px-5">
      <div className="w-full md:w-1/5 flex justify-between md:justify-start">
        <Link href="/">
          <Image src={image} alt="logo" height={30} width={200} />
        </Link>
        <div className="block md:hidden">
          <Account />
        </div>
      </div>

      <div className="w-full md:w-3/5 flex justify-center mt-4 md:mt-0">
        <Suspense fallback={'loading...'}>
          <Menu isOpenSearch />
        </Suspense>
      </div>

      <div className="hidden md:flex w-1/5 justify-end">
        <Account />
      </div>
    </div>
  );
};

export default TopBar;
