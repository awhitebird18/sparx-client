import React, { useCallback, useEffect, useRef, useState } from 'react';
import DropArea from './DropArea';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import NodeStats from './NodeStats';

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import TransformControls from './TransformControls';
// import useScrollToMiddle from './useScrollToMiddle';
import { Button } from '@/components/ui/Button';
import { XCircle } from 'react-bootstrap-icons';
import { Skeleton } from '@/components/ui/Skeleton';
import useScrollToMiddle from './useScrollToMiddle';

const gridDimensions = { width: 1080, height: 4000 };

const NodeMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollToMiddle(ref, gridDimensions.width, gridDimensions.height);
  const { fetchUserChannelData, isEditing, setIsEditing } = useStore('channelStore');
  const { currentWorkspaceId, currentWorkspace } = useStore('workspaceStore');
  const { fetchChannelUserCounts, fetchNodemapSettingsApi } = useStore('workspaceChannelStore');
  const { fetchWorkspaceChannelConnectorsApi } = useStore('channelConnectorStore');
  const { getFlashcardsDueToday } = useStore('flashcardStore');
  const [isLoading, setIsLoading] = useState(true);
  const [x, setX] = useState(2000);

  const scrollToMiddle = useCallback(() => {
    if (ref.current) {
      const container = ref.current;
      const containerRect = container.getBoundingClientRect();
      // Calculate center position

      setX(Number(containerRect));
    }
  }, []);

  useEffect(() => {
    scrollToMiddle();
  }, []);

  useEffect(() => {
    if (!currentWorkspaceId) return;

    const fn = async () => {
      const minimumLoadingTimePromise = new Promise((resolve) => setTimeout(resolve, 500));
      try {
        setIsLoading(true);

        await Promise.all([
          fetchChannelUserCounts(currentWorkspaceId),
          fetchUserChannelData(currentWorkspaceId),
          fetchNodemapSettingsApi(currentWorkspaceId),
          fetchWorkspaceChannelConnectorsApi(currentWorkspaceId),
          getFlashcardsDueToday({ workspaceId: currentWorkspaceId }),
          minimumLoadingTimePromise,
        ]);
      } catch (error) {
        console.error('An error occurred fetching nodemap data');
      }

      setIsLoading(false);
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspaceId]);

  return (
    <div className="relative flex h-full w-full  overflow-hidden">
      {!isLoading ? (
        <div className="h-full w-full">
          <TransformWrapper
            // disabled={true}
            limitToBounds={false}
            initialScale={1}
            initialPositionX={(x / 2 + 300) * -1}
            initialPositionY={-600}
            minScale={0.1}
            doubleClick={{ disabled: true }}
            zoomAnimation={{ disabled: true }}
            maxScale={4}
            onWheel={(_, event) => {
              if (!event.ctrlKey) {
                event.preventDefault();
              }
            }}
            wheel={{ activationKeys: ['Control'] }}
          >
            {({ zoomIn, zoomOut, resetTransform, zoomToElement, instance }) => (
              <div ref={ref} className="flex h-full w-full overflow-hidden bg-slate-500/5">
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}
                  contentStyle={{ width: '4000px', height: '8000px' }}
                  contentClass="bg-background rounded-lg"
                >
                  <DropArea nodemapState={instance.transformState} />
                </TransformComponent>
                {isEditing && (
                  <Button
                    className="flex items-center gap-2 rounded-3xl p-3.5 absolute top-4 left-1/2 -translate-x-1/2 text-xl hover:opacity-100 transition-opacity duration-500"
                    variant="outline-primary"
                    onClick={() => setIsEditing(false)}
                  >
                    Editing mode <XCircle />
                  </Button>
                )}

                <TransformControls
                  onZoomIn={zoomIn}
                  onZoomOut={zoomOut}
                  onReset={resetTransform}
                  zoomToElement={zoomToElement}
                />
              </div>
            )}
          </TransformWrapper>
        </div>
      ) : (
        <NodemapSkeleton name={currentWorkspace?.name} />
      )}
      {!isLoading ? <NodeStats /> : <NodeStatsSkeleton />}
    </div>
  );
};

export default observer(NodeMap);

const NodemapSkeleton = ({ name }: { name?: string }) => (
  <div className="flex w-full h-full relative">
    <div className="absolute left-1/2 top-[50px] gap-5 -translate-x-3/4 flex flex-col text-white prose dark:prose-invert">
      <h1 className="text-7xl font-semibold">Start</h1>
      <div className="h-72 w-1 bg-card mx-auto" />
    </div>
    <div className="flex items-center justify-center w-full">
      <Skeleton className="w-[325px] h-[100px] rounded-xl p-6 text-2xl font-semibold leading-tight">
        {name}
      </Skeleton>
    </div>
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

const NodeStatsSkeleton = () => (
  <div className="card rounded-xl bg-white dark:bg-slate-700/20 border border-border flex gap-2.5 p-2.5 shadow whitespace-nowrap items-center absolute bottom-2 left-2  pr-5">
    <Skeleton className="h-7 w-12 rounded-lg bg-green-200" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />

    <div className="card absolute rounded-md shadow-md border border-border -right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0.5 ml-auto bg-card" />
  </div>
);
