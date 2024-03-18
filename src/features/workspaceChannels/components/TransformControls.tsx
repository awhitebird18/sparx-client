import { Button } from '@/components/ui/Button';
import {
  Bullseye,
  Fullscreen,
  FullscreenExit,
  Funnel,
  House,
  PencilSquare,
  ZoomIn,
  ZoomOut,
} from 'react-bootstrap-icons';
import SettingsDropdown from './SettingsDropdown';
import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const TransformControls = ({ onZoomIn, onZoomOut, onReset, zoomToElement }: any) => {
  const { currentUser } = useStore('userStore');
  const {
    currentChannelId,
    subscribedChannels,
    isEditing,
    setIsEditing,
    isFullscreen,
    setIsFullscreen,
  } = useStore('channelStore');
  const [, setShowIndicators] = useState(true);

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
  return (
    <div className="flex flex-col gap-2 items-center absolute top-3 right-3 z-10">
      <Button
        className="w-12 h-12 p-0 rounded-full bg-background"
        variant="outline"
        onClick={() => onReset()}
      >
        <House size={18} />
      </Button>
      <Button
        className="w-12 h-12 p-0 rounded-full bg-background"
        variant="outline"
        onClick={scrollToActiveNode}
      >
        <Bullseye size={18} />
      </Button>
      {currentUser?.isAdmin && (
        <Button
          className="w-12 h-12 p-0 rounded-full bg-background"
          variant={isEditing ? 'outline-primary' : 'outline'}
          onClick={() => setIsEditing(!isEditing)}
        >
          <PencilSquare size={18} />
        </Button>
      )}
      <SettingsDropdown>
        <Button
          className="w-12 h-12 p-0 border rounded-full bg-background"
          variant="outline"
          onClick={() => setShowIndicators((prev) => !prev)}
        >
          <Funnel size={18} />
        </Button>
      </SettingsDropdown>
      <Button
        className="w-12 h-12 p-0 border rounded-full bg-background"
        variant="outline"
        onClick={handleViewFullscreen}
      >
        {isFullscreen ? <FullscreenExit size={18} /> : <Fullscreen size={18} />}
      </Button>
      <Button
        className="w-12 h-12 p-0 border rounded-full bg-background"
        variant="outline"
        onClick={() => onZoomIn()}
      >
        <ZoomIn />
      </Button>
      <Button
        className="w-12 h-12 p-0 border rounded-full bg-background"
        variant="outline"
        onClick={() => onZoomOut()}
      >
        <ZoomOut />
      </Button>
    </div>
  );
};

export default observer(TransformControls);
