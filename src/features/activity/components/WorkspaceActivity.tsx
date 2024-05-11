import { useCallback, useEffect, useRef } from 'react';
import { ActivityRow } from './ActivityRow';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import SkeletonPlaceholder from './ActivitySkeleton';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { useActivityStore } from '../hooks/useActivityStore';
import SidePanelContainer from '@/layout/sidePanel/SidePanelContainer';
import HeaderContainer from '@/layout/sidePanel/HeaderContainer';
import SidePanelBody from '@/layout/sidePanel/SidePanelBody';

const WorkspaceActivity = observer(() => {
  const {
    displayActivities,
    hasMore,
    isLoading,
    fetchActivities,
    page,
    incrementPage,
    initialLoad,
    setInitialLoad,
  } = useActivityStore();
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { currentProfileUserId } = useStore('userStore');
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMoreActivities = useCallback(() => {
    if (hasMore && !isLoading) {
      incrementPage();
    }
  }, [hasMore, isLoading, incrementPage]);

  useIntersectionObserver(sentinelRef, loadMoreActivities);

  useEffect(() => {
    if (!currentWorkspaceId) return;
    setInitialLoad(page === 1);
    fetchActivities(currentWorkspaceId, currentProfileUserId).finally(() => setInitialLoad(false));
  }, [page, fetchActivities, currentWorkspaceId, currentProfileUserId, setInitialLoad]);

  if (initialLoad && isLoading) {
    return <SkeletonPlaceholder count={5} />;
  }

  return (
    <SidePanelContainer>
      <HeaderContainer title="Workspace Activity" />

      <SidePanelBody className="overflow-y-scroll h-full flex flex-col gap-9">
        {displayActivities.map((activity) => (
          <ActivityRow key={activity.uuid} activity={activity} />
        ))}

        {isLoading && <SkeletonPlaceholder count={1} />}
        {hasMore && <div ref={sentinelRef} style={{ height: '1px' }}></div>}
      </SidePanelBody>
    </SidePanelContainer>
  );
});

export default WorkspaceActivity;
