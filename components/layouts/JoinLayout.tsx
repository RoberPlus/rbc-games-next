import Link from 'next/link';
import Image from 'next/image';
import { Cross1Icon } from '@radix-ui/react-icons';

const JoinLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen max-h-screen flex flex-row justify-between">
      <div className="flex justify-between w-screen absolute top-0 left-0 p-4">
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo" width="200" height="30" />
        </Link>
        <Link href="/">
          <Cross1Icon className="m-0 text-red-500 w-6" />
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
