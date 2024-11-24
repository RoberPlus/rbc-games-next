import React from "react";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, MessageCircleMore, CreditCard } from "lucide-react";

const TrustBar = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 bg-zinc-800 p-10 text-center md:flex-row md:space-x-7 md:text-start">
      <ShieldCheck size={50} className="text-primary" />
      <div>
        <p className="text-xl font-bold">Reliable & safe</p>
        <p className="font-extralight">Over 10.000 games</p>
      </div>
      <Separator orientation="vertical" className="h-20 bg-slate-400" />
      <MessageCircleMore size={50} className="text-primary" />
      <div>
        <p className="text-xl font-bold">Customer support</p>
        <p className="font-extralight">Human support 24/7</p>
      </div>
      <Separator orientation="vertical" className="h-20 bg-slate-400" />
      <CreditCard size={50} className="text-primary" />
      <div>
        <p className="text-xl font-bold">Flex Payment methods</p>
        <p className="font-extralight">Over 10 paymenth methods</p>
      </div>
    </div>
  );
};

export default TrustBar;
