import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { nodeDimensions } from '../utils/nodeDimensions';
import { ChannelType } from '@/features/channels/enums';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { Plus } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';

type Props = {
  uuid: string;
  leftSideActive: boolean;
  rightSideActive: boolean;
};

const HoverConnections = observer(({ uuid, leftSideActive, rightSideActive }: Props) => {
  const { findChannelByUuid, createChannelApi } = useStore('channelStore');
  const { channelConnectors, createChannelConnectorApi } = useStore('channelConnectorStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { setActiveModal } = useStore('modalStore');

  const handleCreateNode = async (channelName: string, connectionSide: ConnectionSide) => {
    if (!currentWorkspaceId) return;

    const connectors = channelConnectors.filter(
      (line) => line.start.nodeId === uuid && line.start.side === connectionSide && line.end,
    );

    const currentChannel = findChannelByUuid(uuid);

    if (!currentChannel) return;

    const coordinates = connectors
      .filter((value) => value.end)
      .map((value) => {
        if (!value.end) return { x: 0, y: 0 };

        const channel = findChannelByUuid(value.end?.nodeId);

        if (!channel) return { x: 0, y: 0 };

        return { x: channel?.x, y: channel.y };
      })
      .sort((a, b) => a.y - b.y);

    const nodeXGap = 240;
    const nodeYGap = 120;

    const y = coordinates.length
      ? coordinates[coordinates.length - 1].y + nodeYGap
      : currentChannel.y;
    const x = coordinates.length
      ? coordinates[coordinates.length - 1].x
      : connectionSide === ConnectionSide.LEFT
      ? currentChannel.x - nodeXGap - nodeDimensions.width
      : currentChannel.x + nodeXGap + nodeDimensions.width;

    const newChannel = await createChannelApi(
      {
        name: channelName,
        type: ChannelType.CHANNEL,
        x,
        y,
      },
      undefined,
      currentWorkspaceId,
    );

    let childSide;
    let parentSide;

    if (connectionSide === ConnectionSide.RIGHT) {
      childSide = ConnectionSide.LEFT;
      parentSide = ConnectionSide.RIGHT;
    } else {
      childSide = ConnectionSide.RIGHT;
      parentSide = ConnectionSide.LEFT;
    }

    await createChannelConnectorApi(
      {
        parentChannelId: uuid,
        parentSide,
        childChannelId: newChannel.uuid,
        childSide,
      },
      currentWorkspaceId,
    );
  };

  const handleSetUpdateModal = (connectionSide: ConnectionSide) => {
    const handleSubmit = (channelName: string) => handleCreateNode(channelName, connectionSide);

    setActiveModal({ type: 'CreateChannelModal', payload: { onSubmit: handleSubmit } });
  };

  return (
    <>
      {leftSideActive && (
        <div
          onClick={() => handleSetUpdateModal(ConnectionSide.LEFT)}
          className="absolute top-0 -left-10 h-full w-10 flex items-center justify-center"
        >
          <Button
            className="w-8 h-8 rounded-full bg-card card flex items-center justify-center opacity-70 border-0"
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
          className="absolute top-0 -right-10 h-full w-10 flex items-center justify-center"
        >
          <Button
            className="w-8 h-8 rounded-full bg-card card flex items-center justify-center opacity-70 border-0"
            size="icon"
            variant="secondary"
          >
            <Plus size={20} />
          </Button>
        </div>
      )}
    </>
  );
});

export default HoverConnections;
