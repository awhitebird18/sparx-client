import React, { useEffect, useRef, useState } from 'react';
import DropArea from './DropArea';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import NodeStats from './NodeStats';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import TransformControls from './TransformControls';
import { Button } from '@/components/ui/Button';
import { XCircle } from 'react-bootstrap-icons';
import useScrollToMiddle from '../../../hooks/useScrollToMiddle';
import NodemapSkeleton from './NodemapSkeleton';
import NodeStatsSkeleton from './NodeStatsSkeleton';
import { gridDimensions } from '../utils/gridSize';

const NodeMap: React.FC = observer(() => {
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
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

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (event) => {
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
            onWheel={(_, event: WheelEvent) => {
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
});

export default NodeMap;
