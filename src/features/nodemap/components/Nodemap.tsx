import React, { useRef } from 'react';
import DropArea from './DropArea';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import NodeStats from './NodeStats';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import TransformControls from './TransformControls';
import useScrollToMiddle from '../../../hooks/useScrollToMiddle';
import NodemapSkeleton from './NodemapSkeleton';
import NodeStatsSkeleton from './NodeStatsSkeleton';
import { gridDimensions } from '../utils/gridSize';
import useKeysPressed from '../hooks/useKeysPressed';
import useInitialDataLoader from '../hooks/useInitializeDataLoader';
import useLocalStorage from '@/hooks/useLocalStorage';

const NodeMap: React.FC = observer(() => {
  useInitialDataLoader();
  const { isLoading } = useStore('nodemapStore');
  const ref = useRef<HTMLDivElement>(null);
  useScrollToMiddle(ref, gridDimensions.width, gridDimensions.height);
  const isSpacePressed = useKeysPressed();
  const [nodemapSettings] = useLocalStorage('nodemapSettings', {
    xPosition: 4000,
    yPosition: 4000,
    zoomLevel: 1,
  });

  if (isLoading)
    return (
      <div className="relative h-full w-full">
        <NodemapSkeleton />
        <NodeStatsSkeleton />
      </div>
    );

  console.log(nodemapSettings);

  return (
    <div
      className={`relative flex h-full w-full overflow-hidden ${
        isSpacePressed ? 'cursor-grab' : ''
      }`}
    >
      <TransformWrapper
        limitToBounds={false}
        initialScale={nodemapSettings.zoomLevel}
        initialPositionX={nodemapSettings.xPosition}
        initialPositionY={nodemapSettings.yPosition}
        minScale={0.3}
        maxScale={1.5}
        doubleClick={{ disabled: true }}
        zoomAnimation={{ disabled: true }}
        panning={{
          allowMiddleClickPan: false,
          activationKeys: [' '],
          allowRightClickPan: false,
          allowLeftClickPan: true,
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
            <div ref={ref} className="flex h-full w-full overflow-hidden">
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

              <TransformControls />
            </div>
          );
        }}
      </TransformWrapper>
      <NodeStats /> :
    </div>
  );
});

export default NodeMap;
