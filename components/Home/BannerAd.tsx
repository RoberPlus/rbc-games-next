import { StaticImageData } from "next/image";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

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
    <div className="relative flex min-h-[500px] w-full bg-gradient-radial from-[#489bca] via-[#154483] to-[#0f0f1b]">
      <Image
        src={image}
        alt={title}
        fill
        className="hidden overflow-hidden object-none pl-96 md:flex"
      />

      <div className="absolute left-0 top-0 flex h-full w-full items-center">
        <div className="m-w-full ml-10 block w-96 md:ml-80">
          <h2 className="text-4xl font-medium">{title}</h2>
          <div className="mt-2">
            <h3 className="pt-2">{subtitle}</h3>
            <Link href={btnLink}>
              <Button className="mt-4">{btnTitle}</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dark-bg triangle-clip absolute bottom-0 h-14 w-full translate-y-0.5"></div>
    </div>
  );
};

export default BannerAd;
