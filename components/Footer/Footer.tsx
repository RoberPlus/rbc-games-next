import Link from "next/link";
import Image from "next/image";
import image from "@/public/images/logo.png";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Youtube, Twitch } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-zinc-800 p-8">
      <div className="flex flex-col items-center justify-center space-y-10 md:mx-7 md:flex-row md:justify-between md:space-y-0">
        {/* Logo */}
        <div>
          <Link href="/" className="mt-4 max-h-10 w-56">
            <h2 className="flex text-3xl">
              <span className="font-bold text-primary">RBC&nbsp;</span> Games
            </h2>
          </Link>
        </div>

        {/* Links */}
        <div>
          <ul className="m-0 flex flex-col gap-1 p-0">
            <li>
              <span className="cursor-pointer text-white hover:text-primary">
                Terms of Use
              </span>
            </li>
            <li>
              <span className="cursor-pointer text-white hover:text-primary">
                Privacy policy
              </span>
            </li>
            <li>
              <span className="cursor-pointer text-white hover:text-primary">
                Contact
              </span>
            </li>
            <li>
              <span className="cursor-pointer text-white hover:text-primary">
                FAQ
              </span>
            </li>
          </ul>
        </div>

        {/* Socials  */}
        <div>
          <Button
            className="ml-2 text-blue-800 hover:bg-slate-600/20 hover:text-primary"
            variant="link"
          >
            <Facebook className="scale-150" />
          </Button>
          <Button
            className="ml-2 text-blue-400 hover:bg-slate-600/20 hover:text-primary"
            variant="link"
          >
            <Twitter className="scale-150" />
          </Button>
          <Button
            className="ml-2 text-rose-300 hover:bg-slate-600/20 hover:text-primary"
            variant="link"
          >
            <Instagram className="scale-150" />
          </Button>
          <Button
            className="ml-2 text-red-600 hover:bg-slate-600/20 hover:text-primary"
            variant="link"
          >
            <Youtube className="scale-150" />
          </Button>
          <Button
            className="ml-2 text-violet-700 hover:bg-slate-600/20 hover:text-primary"
            variant="link"
          >
            <Twitch className="scale-150" />
          </Button>
        </div>
      </div>

      {/* Copy  */}
      <div className="mt-8 border-t-2 border-primary pt-8 text-center">
        <span className="font-extralight text-white">
          Copyright © 2024 RBC Games - All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
