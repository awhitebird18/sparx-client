import { Button } from '@/components/ui/Button';
import { ArrowsAngleContract, ArrowsAngleExpand, Bullseye, House } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useControls, useTransformEffect } from 'react-zoom-pan-pinch';
import { useNodemapStore } from '../hooks/useNodemapStore';

const TransformControls = observer(() => {
  const { zoomIn, zoomOut, instance, zoomToElement, setTransform, resetTransform } = useControls();
  const { currentChannelId, channels } = useStore('channelStore');
  const { setScale, scale, toggleFullScreen, isFullscreen } = useNodemapStore();

  const handleViewFullscreen = () => {
    toggleFullScreen();
  };

  const scrollToActiveNode = () => {
    if (currentChannelId) {
      const activeNode = channels.find((channel) => channel.uuid === currentChannelId);
      if (activeNode) {
        const nodeElement = document.getElementById(activeNode.uuid);

        if (nodeElement) {
          zoomToElement(nodeElement, 1);
        }
      }
    }
  };

  const setDefaultZoom = () => {
    setTransform(instance.transformState.positionX, instance.transformState.positionY, 1);
  };

  useTransformEffect(({ state }) => {
    setScale(state.scale);
  });

  return (
    <div className="card-base flex gap-1 items-center z-10 p-1 absolute bottom-2 right-2 h-12">
      <Button className="w-10 h-10 p-0 " variant="ghost" onClick={() => resetTransform()}>
        <House size={18} />
      </Button>
      <Button className="w-10 h-10 p-0 " variant="ghost" onClick={scrollToActiveNode}>
        <Bullseye size={18} />
      </Button>

      <Button
        className="w-10 h-10 p-0 "
        variant={isFullscreen ? 'outline-primary' : 'ghost'}
        onClick={handleViewFullscreen}
      >
        {isFullscreen ? <ArrowsAngleContract size={14} /> : <ArrowsAngleExpand size={14} />}
      </Button>
      <Button className="w-10 h-10 p-0 text-4xl pb-2" variant="ghost" onClick={() => zoomOut(0.2)}>
        -
      </Button>
      <Button onClick={setDefaultZoom} variant="ghost" className="w-14 h-10 px-2 text-sm">
        {`${Math.trunc(scale * 100)}%`}
      </Button>
      <Button className="w-10 h-10 p-0 text-2xl pb-1" variant="ghost" onClick={() => zoomIn(0.2)}>
        +
      </Button>
    </div>
  );
});

export default TransformControls;
