import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const LeaveWorkspaceModal = observer(() => {
  const { closeModal } = useStore('modalStore');
  const { currentWorkspace, leaveWorkspaceApi } = useStore('workspaceStore');
  const { currentUser } = useStore('userStore');

  const handleLeave = () => {
    if (!currentWorkspace || !currentUser) return;
    leaveWorkspaceApi(currentUser.uuid, currentWorkspace.uuid);
    closeModal();
  };

  return (
    <Modal title={`Leave ${currentWorkspace?.name}?`}>
      <div className="flex flex-col gap-6 max-w-lg">
        <p>
          This action cannot be undone. You will no longer be able to access this workspace unless
          reinvited.
        </p>
        <div className="ml-auto space-x-4">
          <Button onClick={closeModal} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleLeave} variant="destructive">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
});

export default LeaveWorkspaceModal;
