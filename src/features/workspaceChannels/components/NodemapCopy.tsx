import { useRef } from 'react';
import useScrollToMiddle from './useScrollToMiddle';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Node from './NodeCopy';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';

const gridDimensions = { width: 8000, height: 8000 };

const Nodemap = () => {
  const ref = useRef<HTMLDivElement>(null);
  useScrollToMiddle(ref, gridDimensions.width, gridDimensions.height);
  const { subscribedChannels } = useStore('channelStore');

  const nodes = [
    { id: 1, name: 'Node 1', x: 0, y: 0 },
    { id: 2, name: 'Node 2', x: -200, y: 200 },
    { id: 3, name: 'Node 3', x: 0, y: 400 },
  ];

  return (
    <div className="w-screen h-screen overflow-auto" ref={ref}>
      <TransformWrapper
        limitToBounds={false}
        initialScale={1}
        minScale={0.5}
        zoomAnimation={{ disabled: true }}
        maxScale={2}
        centerOnInit
        onWheel={(_, event) => {
          if (!event.ctrlKey) {
            event.preventDefault();
          }
        }}
        wheel={{ activationKeys: ['Control'] }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="flex flex-col gap-2 tools absolute top-4 right-4 z-50">
              <Button variant="outline" onClick={() => zoomIn()}>
                +
              </Button>
              <Button variant="outline" onClick={() => zoomOut()}>
                -
              </Button>
              <Button variant="outline" onClick={() => resetTransform()}>
                x
              </Button>
            </div>

            <TransformComponent
              wrapperStyle={{
                width: gridDimensions.width,
                height: gridDimensions.height,
                position: 'relative',
                overflow: 'auto',
              }}
            >
              {subscribedChannels.map((node) => (
                <Node key={node.uuid} name={node.name} x={node.x} y={node.y} zoomLevel={1} />
              ))}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Nodemap;
