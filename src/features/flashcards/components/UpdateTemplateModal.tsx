import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';
import { Input } from '@/components/ui/Input';
import { Template } from '../types/template';

const UpdateTemplateModal = ({
  uuid,
  updateFields,
}: {
  uuid: string;
  updateFields: Partial<Template>;
}) => {
  const { updateTemplateApi } = useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');
  const [value, setValue] = useState(updateFields.title);

  const handleUpdateField = () => {
    updateTemplateApi(uuid, { title: value });
    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <Modal title="Update field">
      <div className="space-y-6 pt-2">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />

        <div className="flex gap-4 justify-end">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpdateField}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(UpdateTemplateModal);