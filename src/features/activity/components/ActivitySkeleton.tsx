import { Skeleton } from '@/components/ui/Skeleton';

type Props = { count: number };

const SkeletonPlaceholder = ({ count }: Props) => (
  <div className="card-base opacity-90 h-full">
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className="h-24 w-full rounded-xl border border-border mb-4" />
    ))}
  </div>
);

export default SkeletonPlaceholder;
