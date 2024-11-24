import { Skeleton } from "@/components/ui/skeleton";

const TopBarSkeleton = () => {
  return (
    <div className="absolute top-0 mt-3 h-16 w-2/5 scale-x-105 rounded-full p-2">
      <Skeleton className="mx-2 h-full w-full rounded-full bg-slate-300/30" />
    </div>
  );
};

export default TopBarSkeleton;
