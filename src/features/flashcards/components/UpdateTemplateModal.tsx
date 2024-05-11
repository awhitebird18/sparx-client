import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Modal from '@/layout/modal/Modal';
import { Input } from '@/components/ui/Input';
import { Template } from '../types/template';

export type UpdateTemplateModalProps = { uuid: string; updateFields: Partial<Template> };

const UpdateTemplateModal = observer(({ uuid, updateFields }: UpdateTemplateModalProps) => {
  const { updateTemplateApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');
  const [value, setValue] = useState(updateFields.title);

  const handleUpdateField = () => {
    updateTemplateApi(uuid, { title: value });
    closeModal();
  };

  return (
    <Modal title="Update field">
      <div className="space-y-6 pt-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />

        <div className="flex gap-4 justify-end">
          <Button onClick={closeModal} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpdateField}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
});

export default UpdateTemplateModal;
