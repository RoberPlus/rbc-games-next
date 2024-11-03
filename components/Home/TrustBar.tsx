import React from 'react';
import { Separator } from '../ui/separator';
import { ShieldCheck, MessageCircleMore, CreditCard } from 'lucide-react';

const TrustBar = () => {
  return (
    <div className="m-auto w-full flex justify-center items-center h-36 p-4 bg-slate-800">
      <div className="flex h-5 items-center space-x-8">
        <ShieldCheck size={50} className="text-violet-600" />
        <div>
          <p className="text-xl font-bold">Reliable & safe</p>
          <p className="font-extralight">Over 10.000 games</p>
        </div>
        <Separator orientation="vertical" className="h-20 bg-slate-400" />
        <MessageCircleMore size={50}  className="text-violet-600"/>
        <div>
          <p className="text-xl font-bold">Customer support</p>
          <p className="font-extralight">Huma support 24/7</p>
        </div>
        <Separator orientation="vertical" className="h-20 bg-slate-400" />
        <CreditCard size={50} className="text-violet-600" />
        <div>
          <p className="text-xl font-bold">Flex Payment methods</p>
          <p className="font-extralight">Over 10 paymenth methods</p>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
