import { Skeleton } from '../ui/skeleton';

const GameCardSkeleton = () => {
  return (
    <>
      <div className="relative flex -mt-48 mx-auto max-w-6xl pb-10 mb-10 m-auto">
        <div className="w-1/2 pr-3 rounded-md relative h-80">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-1/2 pl-3 h-80">
          <Skeleton className="p-5 h-full " />
        </div>
      </div>

      <div className="relative flex mx-auto max-w-6xl pb-10 mb-10 m-auto">
        <div className="w-1/2 pr-4 rounded-md relative h-80">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="w-1/2 pl-10 h-80">
          <Skeleton className="h-10 m-2" />
          <Skeleton className="h-10 m-2" />
          <Skeleton className="h-10 m-2" />
          <Skeleton className="h-10 m-2" />
        </div>
      </div>
    </>
  );
};

export default GameCardSkeleton;
