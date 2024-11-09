'use client';

import Image from 'next/image';
import image from '@/public/images/logo.png';
import Link from 'next/link';
import { CircleCheck, ShieldCheck, CircleDashed } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const Header = async () => {
  const searchParams = useSearchParams();
  const step = searchParams.get('step') ? searchParams.get('step') : 1;
  const currentStep = step as any;

  const steps = [
    { number: 1, title: 'Cart' },
    { number: 2, title: 'Payment' },
    { number: 3, title: 'Confirm Payment' },
  ];

  return (
    <div className="fixed top-0 left-0 flex items-center w-full p-5 z-10 bg-zinc-800">
      <div className="w-1/5">
        <Link href="/" className="w-48 max-h-10 relative translate-x-5 mt-4">
          <Image src={image} alt="logo" width={190} height={30} quality={100} />
        </Link>
      </div>
      <div className="w-3/5 flex justify-center">
        {steps.map((step, index) => {
          return (
            <div key={step.number} className="flex items-center">
              <span
                className={`m-2 ${step.number === Number(currentStep) ? 'text-primary' : 'text-'}
                ${step.number <= Number(currentStep) ? 'text-primary' : 'text-gray-700'}
                `}
              >
                {step.number < Number(currentStep) ? <CircleCheck size={30} /> : <CircleDashed />}
              </span>
              <span>{step.title}</span>
              <span
                className={`w-24 h-1 ml-4 bg-${
                  currentStep >= step.number + 1 ? 'primary' : 'gray-700'
                } ${index === steps.length - 1 ? 'hidden' : ''}`}
              />
            </div>
          );
        })}
      </div>
      <div className="w-1/5 flex justify-end items-center">
        <ShieldCheck className="text-green-600 mr-2" size={40} />
        <div className="flex flex-col pl-3 border-l-2 border-slate-600">
          <span>Secure Payment</span>
          <span className="font-light">256-bit SSL Secure</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
