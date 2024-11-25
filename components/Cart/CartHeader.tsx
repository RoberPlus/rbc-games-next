"use client";

import Link from "next/link";
import { CircleCheck, ShieldCheck, CircleDashed } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Header = () => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") ? searchParams.get("step") : 1;
  const currentStep = step as any;

  const steps = [
    { number: 1, title: "Cart" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Confirm Payment" },
  ];

  return (
    <div className="fixed left-0 top-0 z-10 flex w-full items-center space-x-14 bg-zinc-800 p-5 md:space-x-0">
      <div className="md:w-1/5">
        <Link href="/" className="relative mt-4 max-h-10 w-48 translate-x-5">
          <h2 className="flex text-2xl">
            <span className="font-bold text-primary">RBC&nbsp;</span> Games
          </h2>
        </Link>
      </div>
      <div className="hidden justify-center md:flex md:w-3/5">
        {steps.map((step, index) => {
          return (
            <div key={step.number} className="flex items-center">
              <span
                className={`m-2 ${step.number === Number(currentStep) ? "text-primary" : "text-"} ${step.number <= Number(currentStep) ? "text-primary" : "text-gray-700"} `}
              >
                {step.number < Number(currentStep) ? (
                  <CircleCheck size={30} />
                ) : (
                  <CircleDashed />
                )}
              </span>
              <span>{step.title}</span>
              <span
                className={`ml-4 h-1 w-24 bg-${
                  currentStep >= step.number + 1 ? "primary" : "gray-700"
                } ${index === steps.length - 1 ? "hidden" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end md:w-1/5">
        <ShieldCheck className="mr-2 text-green-600" size={40} />
        <div className="flex flex-col border-l-2 border-slate-600 pl-3 text-sm">
          <span>Secure Payment</span>
          <span className="font-light">256-bit SSL Secure</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
