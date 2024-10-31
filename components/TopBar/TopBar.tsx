import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/images/logo.png';
import Account from '../Account/Account';
import DarkMode from '../layouts/DarkMode';
import Menu from '../Menu/Menu';
import { Suspense } from 'react';

const TopBar = (props: any) => {
  const { isOpenSearch } = props;

  return (
    <div className="flex items-center p-5 w-full z-10 fixed px-5" style={{ backgroundImage: `url('/images/16902.jpg')` }}>
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
        <DarkMode />
        <Account />
      </div>
    </div>
  );
};

export default TopBar;
