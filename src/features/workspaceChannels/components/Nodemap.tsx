import React, { useEffect, useRef, useState } from 'react';
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

const gridDimensions = { width: 8000, height: 8000 };

const NodeMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollToMiddle(ref, gridDimensions.width, gridDimensions.height);
  const { fetchUserChannelData, isEditing, setIsEditing, subscribedChannels } =
    useStore('channelStore');
  const { currentWorkspaceId, nodemapState } = useStore('workspaceStore');
  const { fetchChannelUserCounts, fetchNodemapSettingsApi } = useStore('workspaceChannelStore');
  const { fetchWorkspaceChannelConnectorsApi } = useStore('channelConnectorStore');
  const { getFlashcardsDueToday } = useStore('flashcardStore');
  const [isLoading, setIsLoading] = useState(true);
  const [defaultCoords, setDefaultCoods] = useState<{ x: number; y: number } | undefined>(
    undefined,
  );

  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.code === 'Space') {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: any) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const defaultChannel = subscribedChannels.find((channel) => channel.isDefault);

    if (!defaultChannel) return;

    const width = containerRef.current?.offsetWidth ?? 0;
    const height = containerRef.current?.offsetHeight ?? 0;

    setDefaultCoods({ x: -defaultChannel.x + width / 2, y: -defaultChannel.y + height / 2 });
  }, [subscribedChannels]);

  // const scrollToMiddle = useCallback(() => {
  //   if (ref.current) {
  //     const container = ref.current;
  //     const containerRect = container.getBoundingClientRect();

  //     setX(Number(containerRect));
  //   }
  // }, []);

  // useEffect(() => {
  //   scrollToMiddle();
  // }, []);

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

  const handleContextMenu = (event: any) => {
    // Prevent right-click from affecting the cursor
    event.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full overflow-hidden ${
        isSpacePressed ? 'cursor-grab' : ''
      }`}
      onContextMenu={handleContextMenu}
    >
      {!isLoading && defaultCoords ? (
        <div className="h-full w-full">
          <TransformWrapper
            limitToBounds={false}
            initialScale={nodemapState?.scale ?? 1}
            initialPositionX={defaultCoords.x}
            initialPositionY={defaultCoords.y}
            minScale={0.1}
            doubleClick={{ disabled: true }}
            zoomAnimation={{ disabled: true }}
            panning={{
              allowMiddleClickPan: false,
              activationKeys: [' '],
              allowRightClickPan: false,
              allowLeftClickPan: true,
            }}
            maxScale={4}
            onWheel={(_, event: any) => {
              if (!event.ctrlKey) {
                event.preventDefault();
              }
            }}
            wheel={{ activationKeys: ['Control'] }}
          >
            {({ instance }) => {
              return (
                <div
                  ref={ref}
                  className="flex h-full w-full overflow-hidden"
                  onContextMenu={handleContextMenu}
                >
                  <TransformComponent
                    wrapperStyle={{
                      width: '100%',
                      height: '100%',
                      position: 'relative',
                    }}
                    contentStyle={{
                      width: '8000px',
                      height: '8000px',
                    }}
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
                  <TransformControls />
                </div>
              );
            }}
          </TransformWrapper>
        </div>
      ) : (
        <NodemapSkeleton />
      )}
      {!isLoading ? <NodeStats /> : <NodeStatsSkeleton />}
    </div>
  );
};

export default observer(NodeMap);

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

const NodeStatsSkeleton = () => (
  <div className="card rounded-xl bg-white dark:bg-slate-700/20 border border-border flex gap-2.5 p-2.5 shadow whitespace-nowrap items-center absolute bottom-2 left-2  pr-5">
    <Skeleton className="h-7 w-12 rounded-lg bg-green-200" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />
    <Skeleton className="h-7 w-12 rounded-lg bg-slate-100" />

    <div className="card absolute rounded-md shadow-md border border-border -right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0.5 ml-auto bg-card" />
  </div>
);
