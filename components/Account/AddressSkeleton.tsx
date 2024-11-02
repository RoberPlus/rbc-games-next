import React from 'react';
import { Skeleton } from '../ui/skeleton';

const AddressSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4 mb-2">
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
};

export default AddressSkeleton;
