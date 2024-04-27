import { useCallback, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { ActivityRow } from './ActivityRow';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

type IntersectionObserverEntry = {
  isIntersecting: boolean;
};

export type Props = { endpoint: string };

const WorkspaceActivity = observer(({ endpoint }: Props) => {
  const { activities, hasMore, isLoading, fetchMoreActivities, page, incrementPage } =
    useStore('activityStore');
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIncrementPage = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        incrementPage();
      }
    },
    [hasMore, incrementPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIncrementPage);
    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [handleIncrementPage, hasMore, incrementPage, isLoading]);

  useEffect(() => {
    fetchMoreActivities(endpoint);
  }, [page, endpoint, fetchMoreActivities]);

  if (isLoading)
    return (
      <div className="card rounded-2xl opacity-90 h-full">
        <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
        <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
        <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
        <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
        <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
        <Skeleton className="h-24 w-full rounded-xl border border-border mb-4" />
      </div>
    );

  return (
    <div className="h-full pr-2 overflow-auto prose dark:prose-invert">
      {activities.map((activity) => {
        return <ActivityRow key={activity.uuid} activity={activity} />;
      })}

      {hasMore && <div ref={sentinelRef} style={{ height: '1px' }}></div>}
    </div>
  );
});

export default WorkspaceActivity;
