import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

export type CreateVariantModalProps = { templateId: string };

const CreateVariantModal = observer(({ templateId }: CreateVariantModalProps) => {
  const { createVariantApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');
  const [value, setValue] = useState('');

  const handleCreateTemplate = () => {
    createVariantApi({ title: value, templateId });
    closeModal();
  };

  return (
    <Modal title="Create variant" className="space-y-6 pt-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter variant name"
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

export default CreateVariantModal;
