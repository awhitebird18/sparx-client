import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export type CreateFieldModalProps = { templateId: string };

const CreateFieldModal = observer(({ templateId }: CreateFieldModalProps) => {
  const { createFieldApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');
  const [value, setValue] = useState('');

  const handleCreateField = () => {
    createFieldApi({ templateId, title: value });
    closeModal();
  };

  return (
    <Modal title="Add field">
      <div className="space-y-6">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter field name"
        />

        <div className="flex gap-4 justify-end">
          <Button onClick={closeModal} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleCreateField}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
});

export default CreateFieldModal;
