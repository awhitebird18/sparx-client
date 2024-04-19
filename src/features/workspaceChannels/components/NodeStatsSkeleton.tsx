import { Skeleton } from '@/components/ui/Skeleton';

const NodeStatsSkeleton = () => (
  <div className="card rounded-xl bg-white dark:bg-slate-700/20 border border-border flex gap-2.5 p-2.5 shadow whitespace-nowrap items-center absolute bottom-2 left-2  pr-5">
    <Skeleton className="h-7 w-12 rounded-lg bg-green-200" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />

    <div className="card absolute rounded-md shadow-md border border-border -right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0.5 ml-auto bg-card" />
  </div>
);

export default NodeStatsSkeleton;
