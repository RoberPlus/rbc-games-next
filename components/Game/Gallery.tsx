import React, { useState } from "react";
import Image from "next/image";
import { Media } from "@/utils/types";
import placeholderImage from "@/public/images/placeholder.webp";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  pics: Media[];
};

const Gallery = ({ pics }: Props) => {
  const picsClone = [...pics];
  const firstImage = picsClone.shift();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => setIsOpen((prevState) => !prevState);
  const closeDialog = () => setIsOpen(false);

  return (
    <div className="mt-8 flex flex-col md:flex-row">
      <div
        className="relative m-0 h-40 cursor-pointer pr-3 md:mr-3 md:h-80 md:w-1/2"
        onClick={toggleDialog}
      >
        <Image
          src={firstImage?.url ? firstImage.url : placeholderImage}
          alt="Gallery image 1"
          fill
          className="rounded-lg object-cover opacity-85 hover:opacity-100"
        />
      </div>

      <div className="mt-10 flex w-full flex-col space-y-10 md:m-0 md:w-1/2 md:flex-wrap md:space-y-0">
        {picsClone.map((picture) => (
          <div
            key={picture.documentId}
            className="relative h-40 w-full cursor-pointer md:h-1/2 md:w-1/2"
            onClick={toggleDialog}
          >
            <Image
              src={picture.url}
              alt="Gallery image"
              fill
              className="object-cover opacity-85 hover:opacity-100 md:rounded-lg md:p-1"
            />
          </div>
        ))}

        <Dialog open={isOpen}>
          <DialogContent
            className="[&_]:text-red max-h-[600px] max-w-6xl border-none bg-transparent"
            onInteractOutside={closeDialog}
          >
            <DialogTitle>
              <p className="absolute text-transparent">Game Gallery</p>
            </DialogTitle>
            <Carousel>
              <CarouselContent>
                {pics.map((picture) => (
                  <CarouselItem key={picture.documentId}>
                    <Card className="relative max-h-[600px] -translate-y-2 border-none bg-transparent">
                      <CardContent className="aspect-video">
                        <Image
                          src={picture.url}
                          alt="picture"
                          fill
                          className="object-cover"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Gallery;
