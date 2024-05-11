import React from 'react';
import DropArea from './DropArea';
import { observer } from 'mobx-react-lite';
import NodeStats from './NodeStats';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import TransformControls from './TransformControls';
import useKeysPressed from '../hooks/useKeysPressed';
import useInitialDataLoader from '../hooks/useInitializeDataLoader';
import { useNodemapStore } from '../hooks/useNodemapStore';
import useSetupFullscreenHandler from '../hooks/useSetupFullscreenHandler';
import NodemapLoader from './NodemapLoader';
import useCenterNodemap from '../hooks/useCenterNodemap';

type Props = {
  readonly: boolean;
};

const NodeMap: React.FC<Props> = observer(({ readonly }) => {
  const isSpacePressed = useKeysPressed();
  const { scale, initialCoordinates, isLoading } = useNodemapStore();
  const ref = useSetupFullscreenHandler();
  useInitialDataLoader();
  useCenterNodemap();

  if (isLoading) return <NodemapLoader />;

  return (
    <div
      className={`relative flex h-full w-full overflow-hidden ${
        isSpacePressed ? 'cursor-grab' : ''
      }`}
      onContextMenu={(e) => e.preventDefault()}
    >
      <TransformWrapper
        limitToBounds={true}
        disablePadding
        initialScale={scale}
        initialPositionX={initialCoordinates.x > 0 ? -initialCoordinates.x : initialCoordinates.x}
        initialPositionY={initialCoordinates.y > 0 ? -initialCoordinates.y : initialCoordinates.y}
        minScale={0.3}
        maxScale={1.5}
        doubleClick={{ disabled: true }}
        zoomAnimation={{ disabled: true }}
        panning={{
          allowMiddleClickPan: false,
          activationKeys: [' '],
          // allowRightClickPan: false,
          // allowLeftClickPan:  true,
        }}
        onWheel={(_, event: WheelEvent) => {
          if (!event.ctrlKey) {
            event.preventDefault();
          }
        }}
        wheel={{ activationKeys: ['Control'] }}
      >
        {() => {
          return (
            <div ref={ref} className="flex h-full w-full overflow-hidden bg-background">
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
                <DropArea />
              </TransformComponent>

              {!readonly && <TransformControls />}
            </div>
          );
        }}
      </TransformWrapper>
      {!readonly && <NodeStats />}
    </div>
  );
});

export default NodeMap;
