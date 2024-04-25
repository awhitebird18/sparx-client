import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Field } from '../types/field';
import Modal from '@/layout/modal/Modal';
import { Input } from '@/components/ui/Input';

export type UpdateFieldProps = { uuid: string; updateFields: Partial<Field> };

const UpdateField = observer(({ uuid, updateFields }: UpdateFieldProps) => {
  const { updateFieldApi } = useStore('flashcardStore');
  const { closeModal } = useStore('modalStore');
  const [value, setValue] = useState(updateFields.title);

  const handleUpdateField = () => {
    updateFieldApi(uuid, { title: value });
    closeModal();
  };

  return (
    <Modal title="Update field">
      <div className="flex flex-col space-y-6 pt-3">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />

        <div className="flex gap-4 ml-auto">
          <Button onClick={closeModal} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleUpdateField}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
});

export default UpdateField;
