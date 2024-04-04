import { useState } from 'react';
import Modal from '@/components/modal/Modal';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { ChevronDown } from 'react-bootstrap-icons';
import Editor from '@/features/textEditor/Editor';

const AddFlashcardModal = () => {
  const { closeModal } = useStore('modalStore');
  const { templates, handleSelectTemplate, createCardNoteApi, fields, selectedTemplate } =
    useStore('flashcardStore');
  const { currentChannelId } = useStore('channelStore');

  const [fieldValues, setFieldValues] = useState<any>([]); // This will hold the updated field values as an array

  // Handle selecting a template
  const handleTemplateChange = (value: string) => {
    handleSelectTemplate(value);

    setFieldValues([]); // Reset field values when template changes
  };

  // Handle field content changes
  const handleFieldChange = (uuid: string, value: string) => {
    const index = fieldValues.findIndex((fv: any) => fv.uuid === uuid);
    if (index !== -1) {
      // Update existing field value
      const updatedFieldValues = [...fieldValues];
      updatedFieldValues[index] = { ...updatedFieldValues[index], value };
      setFieldValues(updatedFieldValues);
    } else {
      // Add new field value
      setFieldValues([...fieldValues, { uuid, value }]);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    if (selectedTemplate && fieldValues.length > 0 && currentChannelId) {
      await createCardNoteApi(selectedTemplate.uuid, fieldValues, currentChannelId);

      handleCancel();
    } else {
      alert('Please fill in all fields and select a template');
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal title="Add flashcard">
      <div className="flex flex-col w-screen max-w-2xl h-[40rem] space-y-8">
        <div className="flex flex-col gap-8 flex-1 overflow-auto pr-4">
          {/* Display fields based on selected template */}
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
            {/* Template selection */}
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
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default observer(AddFlashcardModal);

const CardField = ({
  title,
  content,
  onFieldChange,
}: {
  title: string;
  content: string;
  onFieldChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const emptyContent = JSON.stringify({
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              text: '',
              type: 'text',
              version: 1,
            },
          ],
          format: '',
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  });

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>
        <div className="flex gap-2 items-center mb-2">
          <div>
            <ChevronDown size={18} />
          </div>
          <h2>{title}</h2>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="card">
        <div className="relative bg-card rounded-lg border-border-input border">
          <Editor content={content ?? emptyContent} onChange={onFieldChange} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
