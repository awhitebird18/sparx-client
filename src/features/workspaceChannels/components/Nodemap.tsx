import React, { useEffect } from 'react';
import DropArea from './DropArea';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import NodeStats from './NodeStats';

import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import TransformControls from './TransformControls';
// import useScrollToMiddle from './useScrollToMiddle';
import { Button } from '@/components/ui/Button';
import { XCircle } from 'react-bootstrap-icons';
import Spinner from '@/components/ui/Spinner';

// const gridDimensions = { width: 8000, height: 8000 };

const NodeMap: React.FC = () => {
  // const ref = useRef<HTMLDivElement>(null);
  // useScrollToMiddle(ref, gridDimensions.width, gridDimensions.height);
  const { fetchUserChannelData, setIsLoading, isLoading, isEditing, setIsEditing } =
    useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { fetchChannelUserCounts, fetchNodemapSettingsApi } = useStore('workspaceChannelStore');
  const { fetchWorkspaceChannelConnectorsApi } = useStore('channelConnectorStore');

  useEffect(() => {
    if (!currentWorkspaceId) return;

    const fn = async () => {
      setIsLoading(true);
      await fetchChannelUserCounts(currentWorkspaceId);
      await fetchUserChannelData(currentWorkspaceId);
      await fetchNodemapSettingsApi(currentWorkspaceId);
      await fetchWorkspaceChannelConnectorsApi(currentWorkspaceId);

      setIsLoading(false);
    };

    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWorkspaceId]);

  const scrollToMiddle = () => {
    // if (ref.current) {
    //   const container = ref.current;
    //   const containerRect = container.getBoundingClientRect();
    //   // Calculate center position
    //   const scrollLeft = (gridDimensions.width - containerRect.width) / 2;
    //   const scrollTop = (gridDimensions.height - containerRect.height) / 2;
    //   ref.current.scrollTo({
    //     left: scrollLeft,
    //     top: scrollTop,
    //     // behavior: 'smooth',
    //   });
    // }
  };

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="relative flex flex-col h-full">
      <TransformWrapper
        // disabled={true}
        limitToBounds={false}
        initialScale={1}
        initialPositionX={-3300}
        initialPositionY={-3600}
        minScale={0.1}
        doubleClick={{ disabled: true }}
        zoomAnimation={{ disabled: true }}
        maxScale={4}
        // centerOnInit
        onWheel={(_, event) => {
          if (!event.ctrlKey) {
            event.preventDefault();
          }
        }}
        wheel={{ activationKeys: ['Control'] }}
      >
        {({ zoomIn, zoomOut, resetTransform, zoomToElement, instance }) => (
          <div className="flex h-full">
            <div className="h-full w-full">
              <TransformComponent
                wrapperStyle={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <DropArea scrollToMiddle={scrollToMiddle} nodemapState={instance.transformState} />
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
            </div>
            <TransformControls
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onReset={resetTransform}
              zoomToElement={zoomToElement}
            />

            <NodeStats />
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};

export default observer(NodeMap);
