import Link from "next/link";
import User from "@/components/TopBar/User";
import Menu from "@/components/TopBar/Menu";
import { Suspense } from "react";

const TopBar = (props: any) => {
  const { isOpenSearch } = props;
  return (
    <div className="fixed z-10 flex w-full flex-col items-center bg-gradient-to-b from-slate-950/80 to-transparent px-2 pt-0 md:flex-row md:p-5">
      <div className="flex w-full -translate-x-1 justify-between md:w-1/5 md:translate-x-0 md:justify-start">
        <Link href="/" className="mx-5 mt-5 h-10 w-36 md:mt-0 md:w-40">
          <h2 className="flex text-3xl">
            <span className="font-bold text-primary">RBC&nbsp;</span> Games
          </h2>
        </Link>

        <div className="mt-5 block scale-125 md:hidden md:scale-0">
          <User />
        </div>
      </div>

      <div className="mt-4 flex w-full -translate-x-2 justify-center md:mt-0 md:w-3/5 md:translate-x-0">
        <Suspense fallback={"loading..."}>
          <Menu isOpenSearch={isOpenSearch} />
        </Suspense>
      </div>

      <div className="hidden w-1/5 justify-end md:flex">
        <User />
      </div>
    </div>
  );
};

export default TopBar;
