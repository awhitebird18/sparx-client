import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { Plus } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';

type Props = {
  uuid: string;
  leftSideActive: boolean;
  rightSideActive: boolean;
};

const HoverConnections = observer(({ uuid, leftSideActive, rightSideActive }: Props) => {
  const { handleCreateNode } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { currentWorkspaceId } = useStore('workspaceStore');

  const handleSetUpdateModal = (connectionSide: ConnectionSide) => {
    if (!currentWorkspaceId) return;
    const handleSubmit = handleCreateNode(uuid, currentWorkspaceId, connectionSide);
    setActiveModal({
      type: 'CreateChannelModal',
      payload: { onSubmit: handleSubmit },
    });
  };

  const activeSides = [];
  leftSideActive && activeSides.push(ConnectionSide.LEFT);
  rightSideActive && activeSides.push(ConnectionSide.RIGHT);

  return (
    <>
      {activeSides.map((connectionSide: ConnectionSide) => {
        return (
          <div
            key={connectionSide}
            onClick={() => handleSetUpdateModal(connectionSide)}
            className={`absolute top-0 ${
              connectionSide === ConnectionSide.LEFT ? '-left-16' : '-right-16'
            } h-full w-16 flex items-center justify-center`}
          >
            <Button
              className="w-10 h-10 rounded-full bg-card flex items-center justify-center  border-0"
              size="icon"
              variant="secondary"
            >
              <Plus size={20} />
            </Button>
          </div>
        );
      })}
    </>
  );
});

export default HoverConnections;
