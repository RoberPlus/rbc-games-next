import { deleteCookie } from "cookies-next";
import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StepThree = () => {
  deleteCookie("cart");

  return (
    <div className="m-auto flex h-4/6 max-w-7xl flex-col items-center">
      <CircleCheckBig className="mt-20 text-green-700" size={100} />
      <p className="mt-7 text-2xl font-light">Purchase successful!</p>
      <Link href={"/account"} className="mt-7">
        <Button className="mb-48 h-12 w-56 text-lg">Go to my orders</Button>
      </Link>
    </div>
  );
};

export default StepThree;
