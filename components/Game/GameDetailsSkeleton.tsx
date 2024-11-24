import { Skeleton } from "@/components/ui/skeleton";

const GameCardSkeleton = () => {
  return (
    <>
      <div className="relative m-auto mx-auto -mt-48 mb-10 flex max-w-6xl pb-10">
        <div className="relative h-80 w-1/2 rounded-md pr-3">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-80 w-1/2 pl-3">
          <Skeleton className="h-full p-5" />
        </div>
      </div>

      <div className="relative m-auto mx-auto mb-10 flex max-w-6xl pb-10">
        <div className="relative h-80 w-1/2 rounded-md pr-4">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="h-80 w-1/2 pl-10">
          <Skeleton className="m-2 h-10" />
          <Skeleton className="m-2 h-10" />
          <Skeleton className="m-2 h-10" />
          <Skeleton className="m-2 h-10" />
        </div>
      </div>
    </>
  );
};

export default GameCardSkeleton;
