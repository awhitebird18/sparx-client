import { Skeleton } from '@/components/ui/Skeleton';

export const MessageSkeleton = () => (
  <div className="flex gap-3 w-1/2 items-center mx-2 mb-4">
    <Skeleton className="w-10 h-10 rounded-md" />
    <Skeleton className="w-full h-10 rounded-md" />
  </div>
);
