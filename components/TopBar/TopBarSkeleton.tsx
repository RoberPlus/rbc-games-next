import { Skeleton } from '../ui/skeleton';

const TopBarSkeleton = () => {
  return (
    <div className="absolute top-0 h-16 rounded-full w-2/5 scale-x-105 p-2 mt-3">
      <Skeleton className="w-full h-full rounded-full mx-2 bg-slate-300/30" />
    </div>
  );
};

export default TopBarSkeleton;
