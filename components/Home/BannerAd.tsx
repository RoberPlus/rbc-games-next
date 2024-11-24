import { StaticImageData } from "next/image";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

type BannerAdProps = {
  title: string;
  subtitle: string;
  btnTitle: string;
  btnLink: string;
  image: StaticImageData;
};

const BannerAd = ({
  title,
  subtitle,
  btnTitle,
  btnLink,
  image,
}: BannerAdProps) => {
  return (
    <div className="w-full min-h-[500px] relative flex bg-gradient-radial from-[#489bca] via-[#154483] to-[#0f0f1b]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-none pl-96 overflow-hidden"
      />

      <div className="absolute top-0 left-0 w-full h-full flex items-center">
        <div className="ml-10 md:ml-80 m-w-full block w-96">
          <h2 className="text-4xl font-medium">{title}</h2>
          <div className="mt-2">
            <h3 className="pt-2">{subtitle}</h3>
            <Link href={btnLink}>
              <Button className="mt-4">{btnTitle}</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dark-bg absolute h-14 w-full triangle-clip bottom-0 translate-y-0.5"></div>
    </div>
  );
};

export default BannerAd;
