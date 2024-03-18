import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
// import { Line } from '@/features/workspaceChannels/types/line';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
// import { removeChannelConnectors } from '../api/removeChannelConnectors';

const RemoveChannelModal = ({ uuid }: { uuid: string }) => {
  const { removeChannelApi, findChannelByUuid } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const { channelConnectors, setChannelConnectors } = useStore('channelConnectorStore');
  const { currentWorkspaceId } = useStore('workspaceStore');

  const handleRemoveField = async () => {
    if (!currentWorkspaceId) return;
    // Remove the node itself
    await removeChannelApi(uuid, currentWorkspaceId);

    // Find connectors related to the node being removed
    // const connectorUuidsToRemove: any[] = channelConnectors
    //   .filter((line: Line) => line.start.nodeId === uuid || (line.end && line.end.nodeId === uuid))
    //   .map((line: Line) => line.uuid);

    // if (connectorUuidsToRemove.length > 0) {
    //   try {
    //     await removeChannelConnectors(connectorUuidsToRemove);
    //   } catch (error) {
    //     console.error('Error removing connectors:', error);

    //     return;
    //   }
    // }

    setChannelConnectors(
      channelConnectors.filter(
        (line) => line.start.nodeId !== uuid && (!line.end || line.end.nodeId !== uuid),
      ),
    );

    setActiveModal(null); // Close the modal after the operation
  };
  const handleCancel = () => {
    setActiveModal(null);
  };

  const channel = findChannelByUuid(uuid);

  if (!channel) return null;

  return (
    <Modal title={`Remove ${channel.name}?`}>
      <>
        <p className="mb-6 text-muted">Are you sure you would like to remove this node?</p>

        <div className="flex gap-4 ">
          <Button onClick={handleCancel} variant="outline" className="ml-auto">
            Cancel
          </Button>
          <Button onClick={handleRemoveField} variant="destructive">
            Confirm
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default observer(RemoveChannelModal);
