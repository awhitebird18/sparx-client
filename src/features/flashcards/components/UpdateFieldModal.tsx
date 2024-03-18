import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Field } from '../types/Field';
import Modal from '@/components/modal/Modal';
import { Input } from '@/components/ui/Input';

const UpdateField = ({ uuid, updateFields }: { uuid: string; updateFields: Partial<Field> }) => {
  const { updateFieldApi } = useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');
  const [value, setValue] = useState(updateFields.title);

  const handleUpdateField = () => {
    updateFieldApi(uuid, { title: value });
    setActiveModal(null);
  };

  const handleCancel = () => {
    setActiveModal(null);
  };

  return (
    <Modal title="Update field">
      <div className="flex flex-col space-y-6 pt-3">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />

        <div className="flex gap-4 ml-auto">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpdateField}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(UpdateField);
