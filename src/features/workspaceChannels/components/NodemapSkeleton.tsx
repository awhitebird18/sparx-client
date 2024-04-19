import { Skeleton } from '@/components/ui/Skeleton';

const NodemapSkeleton = () => (
  <div className="flex w-full h-full relative">
    <div className="flex items-center justify-center w-full"></div>
    <div className="flex flex-col gap-3.5 items-center h-full border-l border-border bg-background p-2 w-14">
      <Skeleton className="w-8 h-8" />
      <Skeleton className="w-8 h-8" />
      <Skeleton className="w-8 h-8" />
      <Skeleton className="w-8 h-8" />
      <Skeleton className="w-8 h-8" />
      <Skeleton className="w-8 h-8" />
      <Skeleton className="w-8 h-8" />
    </div>
  </div>
);

export default NodemapSkeleton;
