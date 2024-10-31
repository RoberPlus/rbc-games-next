import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/images/logo.png';
import Account from '../Account/Account';
import Menu from '../Menu/Menu';
import { Suspense } from 'react';

const TopBar = (props: any) => {
  const { isOpenSearch } = props;

  return (
    <div className="flex items-center p-5 w-full z-10 fixed px-5">
      <div className="w-1/5">
        <Link href="/">
          <Image src={image} alt="logo" height={30} width={200} />
        </Link>
      </div>

      <div className="w-3/5 flex justify-center">
        <Suspense fallback={'loading...'}>
          <Menu isOpenSearch />
        </Suspense>
      </div>

      <div className="w-1/5 flex justify-end">
        <Account />
      </div>
    </div>
  );
};

export default TopBar;
