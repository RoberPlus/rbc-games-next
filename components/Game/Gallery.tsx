import React, { useState } from 'react';
import Image from 'next/image';
import { Media } from '@/utils/types';
import placeholderImage from '@/public/images/placeholder.webp';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import { DialogTitle } from '@radix-ui/react-dialog';

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
    <>
      <div className="flex mt-8">
        <div className="w-1/2 pr-3 relative h-80 cursor-pointer" onClick={toggleDialog}>
          <Image
            src={firstImage?.url ? firstImage.url : placeholderImage}
            alt="Gallery image 1"
            fill
            className="object-cover rounded-lg opacity-85 hover:opacity-100"
          />
        </div>
        <div className="w-1/2 flex flex-wrap pl-3">
          {picsClone.map((picture) => (
            <div
              key={picture.documentId}
              className="relative h-1/2 w-1/2 cursor-pointer"
              onClick={toggleDialog}
            >
              <Image
                src={picture.url}
                alt="Gallery image"
                fill
                className="object-cover rounded-lg p-1 opacity-85 hover:opacity-100"
              />
            </div>
          ))}

          <Dialog open={isOpen}>
            <DialogContent
              className="max-w-6xl max-h-[600px] bg-transparent border-none [&_]:text-red"
              onInteractOutside={closeDialog}
            >
              <Carousel>
                <CarouselContent>
                  {picsClone.map((picture) => (
                    <CarouselItem key={picture.documentId}>
                      <Card className="relative -translate-y-2 border-none bg-transparent max-h-[600px]">
                        <CardContent className="aspect-video">
                          <Image src={picture.url} alt="picture" fill className="object-cover" />
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
    </>
  );
};

export default Gallery;
