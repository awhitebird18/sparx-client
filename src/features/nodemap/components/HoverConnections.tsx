import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { Plus } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';
import { nodeDimensions } from '../utils/nodeDimensions';
import { CreateChannel } from '@/features/channels/types';

type Props = {
  uuid: string;
  leftSideActive: boolean;
  rightSideActive: boolean;
};
const nodeXGap = 160;
const nodeYGap = 40;

const HoverConnections = observer(({ uuid, leftSideActive, rightSideActive }: Props) => {
  const { findChannelByUuid, findDirectDescendants, createChannelApi } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { currentWorkspaceId } = useStore('workspaceStore');

  const handleCreateNode = (connectionSide: ConnectionSide) => {
    return async (name: string) => {
      if (!currentWorkspaceId) return;

      const parentChannel = findChannelByUuid(uuid);
      if (!parentChannel) return;

      const childChannels = findDirectDescendants(uuid);

      const newChannel: CreateChannel = { name, parentChannelId: parentChannel.uuid };

      if (childChannels?.length) {
        const nodeWithHighestY = childChannels.reduce((highest, current) => {
          return current.channel.y > highest.channel.y ? current : highest;
        });

        // Assign y coordinate
        newChannel.y = nodeWithHighestY.channel.y + nodeDimensions.height + nodeYGap;
        newChannel.x = nodeWithHighestY.channel.x;
      } else {
        newChannel.y = parentChannel.y;

        // Assign x coordinate
        if (connectionSide === ConnectionSide.RIGHT) {
          newChannel.x = parentChannel.x + nodeXGap + nodeDimensions.width;
        } else if (connectionSide === ConnectionSide.LEFT) {
          newChannel.x = parentChannel.x - nodeXGap - nodeDimensions.width;
        }
      }

      await createChannelApi(newChannel, undefined, currentWorkspaceId);
    };
  };

  const handleSetUpdateModal = (connectionSide: ConnectionSide) => {
    const handleSubmit = handleCreateNode(connectionSide);
    setActiveModal({
      type: 'CreateChannelModal',
      payload: { onSubmit: handleSubmit },
    });
  };

  return (
    <>
      {leftSideActive && (
        <div
          onClick={() => handleSetUpdateModal(ConnectionSide.LEFT)}
          className="absolute top-0 -left-16 h-full w-16 flex items-center justify-center"
        >
          <Button
            className="w-10 h-10 rounded-full bg-card card flex items-center justify-center  border-0"
            size="icon"
            variant="secondary"
          >
            <Plus size={20} />
          </Button>
        </div>
      )}
      {rightSideActive && (
        <div
          onClick={() => handleSetUpdateModal(ConnectionSide.RIGHT)}
          className="absolute top-0 -right-16 h-full w-16 flex items-center justify-center"
        >
          <Button
            className="w-10 h-10 rounded-full bg-card card flex items-center justify-center  border-0"
            size="icon"
            variant="secondary"
          >
            <Plus size={26} className="text-secondary" />
          </Button>
        </div>
      )}
    </>
  );
});

export default HoverConnections;
