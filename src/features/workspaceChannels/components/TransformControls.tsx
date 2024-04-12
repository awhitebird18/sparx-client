import { Button } from '@/components/ui/Button';
import {
  ArrowsAngleContract,
  ArrowsAngleExpand,
  ArrowsFullscreen,
  Bullseye,
  Fullscreen,
  FullscreenExit,
  House,
  PencilSquare,
} from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useControls, useTransformEffect } from 'react-zoom-pan-pinch';

const TransformControls = () => {
  const { zoomIn, zoomOut, instance, zoomToElement, setTransform, resetTransform } = useControls();
  const {
    currentChannelId,
    subscribedChannels,
    isEditing,
    setIsEditing,
    isFullscreen,
    setIsFullscreen,
  } = useStore('channelStore');
  const { lastViewedWorkspace } = useStore('workspaceStore');
  const { enterFullScreen } = useStore('sidebarStore');

  const [scale, setScale] = useState(1);

  const handleViewFullscreen = () => {
    enterFullScreen();
  };

  const scrollToActiveNode = () => {
    if (currentChannelId) {
      const activeNode = subscribedChannels.find((channel) => channel.uuid === currentChannelId);
      if (activeNode) {
        // Assuming each node has a unique ID and is an HTMLElement
        const nodeElement = document.getElementById(activeNode.uuid);

        if (nodeElement) {
          // Use zoomToElement with the node element
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
    <div className="flex gap-1 items-center z-10 border border-border p-1 h-min rounded-xl bg-background/40 backdrop-blur-md absolute bottom-2 right-2">
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={() => resetTransform()}>
        <House size={18} />
      </Button>
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={scrollToActiveNode}>
        <Bullseye size={18} />
      </Button>
      {lastViewedWorkspace?.isAdmin && (
        <Button
          className="w-8 h-8 p-0 "
          variant={isEditing ? 'outline-primary' : 'ghost'}
          onClick={() => setIsEditing(!isEditing)}
        >
          <PencilSquare size={18} />
        </Button>
      )}
      {/* <SettingsDropdown>
        <Button
          className="w-8 h-8 p-0 "
          variant="ghost"
          onClick={() => setShowIndicators((prev) => !prev)}
        >
          <Funnel size={18} />
        </Button>
      </SettingsDropdown> */}
      <Button className="w-10 h-10 p-0 " variant="ghost" onClick={handleViewFullscreen}>
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
};

export default observer(TransformControls);
