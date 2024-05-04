import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const CreateTemplateModal = observer(() => {
  const { createTemplateApi, handleSelectTemplate } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');
  const [value, setValue] = useState('');
  const { currentWorkspaceId } = useStore('workspaceStore');

  const handleCreateTemplate = async () => {
    if (!currentWorkspaceId) return;
    const template = await createTemplateApi(value, currentWorkspaceId);
    closeModal();
    handleSelectTemplate(template.uuid);
  };

  return (
    <Modal title="Create template" className="space-y-6 pt-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter template name"
      />

      <div className="flex gap-4 justify-end">
        <Button onClick={closeModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleCreateTemplate}>Submit</Button>
      </div>
    </Modal>
  );
});

export default CreateTemplateModal;
