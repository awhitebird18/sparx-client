import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

const CreateTemplateModal = () => {
  const { createTemplateApi, handleSelectTemplate } = useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');
  const [value, setValue] = useState('');

  const handleCreateTemplate = async () => {
    const template = await createTemplateApi(value);
    setActiveModal(null);

    handleSelectTemplate(template.uuid);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <Modal title="Create template">
      <div className="space-y-6 pt-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter template name"
        />

        <div className="flex gap-4 justify-end">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleCreateTemplate}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(CreateTemplateModal);
