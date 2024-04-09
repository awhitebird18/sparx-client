import { Button } from '@/components/ui/Button';
import {
  Bullseye,
  Fullscreen,
  FullscreenExit,
  Funnel,
  House,
  PencilSquare,
  Robot,
  ZoomIn,
  ZoomOut,
} from 'react-bootstrap-icons';
import SettingsDropdown from './SettingsDropdown';
import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const TransformControls = ({ onZoomIn, onZoomOut, onReset, zoomToElement }: any) => {
  const {
    currentChannelId,
    subscribedChannels,
    isEditing,
    setIsEditing,
    isFullscreen,
    setIsFullscreen,
  } = useStore('channelStore');
  const { lastViewedWorkspace } = useStore('workspaceStore');
  const [, setShowIndicators] = useState(true);
  const { setActiveModal } = useStore('modalStore');

  const handleViewFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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

  const handleGenerateRoadmap = () => {
    setActiveModal({ type: 'GenerateRoadmap' });
  };

  return (
    <div className="flex flex-col gap-3.5 items-center z-10 h-full border-l border-border p-2  bg-background/70 backdrop-blur-lg absolute top-0 right-0">
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={() => onReset()}>
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
      <SettingsDropdown>
        <Button
          className="w-8 h-8 p-0 "
          variant="ghost"
          onClick={() => setShowIndicators((prev) => !prev)}
        >
          <Funnel size={18} />
        </Button>
      </SettingsDropdown>
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={handleViewFullscreen}>
        {isFullscreen ? <FullscreenExit size={18} /> : <Fullscreen size={18} />}
      </Button>
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={() => onZoomIn()}>
        <ZoomIn />
      </Button>
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={() => onZoomOut()}>
        <ZoomOut />
      </Button>
      <Button className="w-8 h-8 p-0 " variant="ghost" onClick={() => handleGenerateRoadmap()}>
        <Robot />
      </Button>
    </div>
  );
};

export default observer(TransformControls);
