import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import CardField from './CardField';

const AddFlashcardModal = observer(() => {
  const { closeModal } = useStore('modalStore');
  const { templates, handleSelectTemplate, createCardNoteApi, fields, selectedTemplate } =
    useStore('flashcardStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { currentChannelId } = useStore('channelStore');
  const [fieldValues, setFieldValues] = useState<any>([]);

  const handleTemplateChange = (value: string) => {
    handleSelectTemplate(value);

    setFieldValues([]);
  };

  const handleFieldChange = (uuid: string, value: string) => {
    const index = fieldValues.findIndex((fv: any) => fv.uuid === uuid);
    if (index !== -1) {
      const updatedFieldValues = [...fieldValues];
      updatedFieldValues[index] = { ...updatedFieldValues[index], value };
      setFieldValues(updatedFieldValues);
    } else {
      setFieldValues([...fieldValues, { uuid, value }]);
    }
  };

  const handleSubmit = async () => {
    if (selectedTemplate && fieldValues.length > 0 && currentChannelId && currentWorkspaceId) {
      await createCardNoteApi(
        selectedTemplate.uuid,
        fieldValues,
        currentChannelId,
        currentWorkspaceId,
      );

      handleCancel();
    } else {
      alert('Please fill in all fields and select a template');
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="flex flex-col h-full w-full gap-10">
      <div className="flex flex-col gap-12 flex-1 overflow-auto w-full">
        {fields.map((field) => (
          <CardField
            key={field.uuid}
            title={field.title}
            content={fieldValues.find((fv: any) => fv.uuid === field.uuid)?.value || undefined}
            onFieldChange={(value) => handleFieldChange(field.uuid, value)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Select onValueChange={handleTemplateChange} defaultValue={selectedTemplate?.uuid}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.uuid} value={template.uuid}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-6">
          <Button onClick={handleSubmit}>Create flashcard</Button>
        </div>
      </div>
    </div>
  );
});

export default AddFlashcardModal;
