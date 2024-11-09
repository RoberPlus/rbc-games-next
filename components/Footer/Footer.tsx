import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/images/logo.png';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-zinc-800 p-8">
      <div className="flex justify-between *:w-1/3">
        <div>
          <Link href="/" className="w-56 max-h-10 absolute translate-x-7 mt-4 -translate-y-2">
            <Image src={image} alt="logo" width={250} height={40} quality={100} />
          </Link>
        </div>

        <div>
          <ul className="flex flex-col gap-1 m-0 p-0">
            <Link href="#" className="text-white hover:text-primary">
              Terms of Use
            </Link>
            <Link href="#" className="text-white hover:text-primary">
              Privacy policy
            </Link>
            <Link href="#" className="text-white hover:text-primary">
              Contact
            </Link>
            <Link href="#" className="text-white hover:text-primary">
              FAQ
            </Link>
          </ul>
        </div>

        <div>
          <Button className="ml-2 text-blue-800" variant="link">
            <Facebook className="scale-150" />
          </Button>
          <Button className="ml-2 text-blue-400" variant="link">
            <Twitter className="scale-150" />
          </Button>
          <Button className="ml-2 text-rose-300" variant="link">
            <Instagram className="scale-150" />
          </Button>
          <Button className="ml-2 text-red-600" variant="link">
            <Youtube className="scale-150" />
          </Button>
          <Button className="ml-2 text-violet-700" variant="link">
            <Twitch className="scale-150" />
          </Button>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t-2 border-primary text-center">
        <span className="text-white font-extralight">
          Copyright © 2024 RBC Games - All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
