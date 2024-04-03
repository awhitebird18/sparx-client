import dayjs from 'dayjs';
import UserAvatar from '@/features/users/components/UserAvatar';

import { useEffect, useRef, useState } from 'react';
import { axios } from '@/lib/axios';
import { Skeleton } from '@/components/ui/Skeleton';

const WorkspaceActivity = ({ endpoint }: { endpoint: string }) => {
  const [activities, setActivities] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // Correctly typed IntersectionObserver ref
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // if (isLoading) return;
    const callback = (entries: any) => {
      if (entries[0].isIntersecting && hasMore) {
        // Load more data here
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
  }, [page]);

  return (
    <div className="card rounded-2xl opacity-90 h-full">
      {activities.map((activity) => (
        <ActivityRow key={activity.id} activity={activity} />
      ))}

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

const ActivityRow = ({ activity }: any) => {
  const user = activity.user;
  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="card border border-border flex gap-6 w-full rounded-xl items-start bg-card card shadow p-4 h-24 z-10 mb-4">
      <div className="flex gap-4">
        <div className="relative h-full">
          <UserAvatar userId={user.uuid} profileImage={user.profileImage} showStatus />
        </div>
        <div className={`flex flex-col w-full gap-1`}>
          <div className="flex gap-2 items-center">
            <h4 className="text-main leading-snug">
              {userName}{' '}
              <span className="text-secondary font-normal tracking-wide">{activity.text}</span>
            </h4>
          </div>
          <p className="font-medium text-muted text-sm leading-none whitespace-nowrap">
            {dayjs(activity.createdAt).format('h:mm a')}
          </p>
        </div>
      </div>
      <div className="flex gap-2 ml-auto leading-none"></div>
    </div>
  );
};
