import { useEffect, useRef, useState } from 'react';
import { axios } from '@/lib/axios';
import { Skeleton } from '@/components/ui/Skeleton';
import { ActivityRow } from './ActivityRow';

export type WorkspaceActivityProps = { endpoint: string };

const WorkspaceActivity = ({ endpoint }: WorkspaceActivityProps) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const callback = (entries: any) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    observer.current = new IntersectionObserver(callback);
    const currentObserver = observer.current;
    if (sentinelRef.current) currentObserver.observe(sentinelRef.current);

    return () => currentObserver.disconnect();
  }, [hasMore, isLoading]);

  useEffect(() => {
    const fetchMoreActivities = async () => {
      setIsLoading(true);
      const minimumLoadingTimePromise = new Promise((resolve) => setTimeout(resolve, 400));
      const [{ data }] = await Promise.all([
        axios.get(`${endpoint}?page=${page}`),
        minimumLoadingTimePromise,
      ]);
      if (data.length < 10) {
        setIsLoading(false);
        setHasMore(false);
      }
      setActivities((prevActivities) => [...prevActivities, ...data]);
      setIsLoading(false);
    };

    fetchMoreActivities();
  }, [page, endpoint]);

  return (
    <div className="h-full pr-2 overflow-auto prose dark:prose-invert">
      {activities.map((activity) => {
        return <ActivityRow key={activity.id} activity={activity} />;
      })}

      {hasMore && <div ref={sentinelRef} style={{ height: '1px' }}></div>}
      {isLoading && (
        <div className="card rounded-2xl opacity-90 h-full">
          <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
          <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
          <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
          <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
          <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
          <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
        </div>
      )}
    </div>
  );
};

export default WorkspaceActivity;
