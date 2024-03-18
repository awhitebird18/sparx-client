import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import Editor from '@/features/textEditor/Editor';
import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';

const CreateFlashcard = () => {
  const { createFlashcard } = useStore('flashcardStore');
  const [sections] = useState([
    {
      uuid: '1',
      title: 'Front side',
      content: JSON.stringify({
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  text: 'This is a simple Lexical editor paragraph.',
                  type: 'text',
                  version: 1,
                },
              ],
              format: '',
              type: 'paragraph',
              version: 1,
            },
            {
              children: [
                { detail: 0, mode: 'normal', text: 'sd', type: 'text', version: 1 },
                {
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  text: 'fdsfdsfsdfdsf',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
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
      }),
      onChange: (value: string) => {
        console.info(value.toString());
      },
      isOpen: true,
    },
    {
      uuid: '2',
      title: 'Back side',
      content: JSON.stringify({
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'This is a simple Lexical editor paragraph.',
                  detail: 0,
                },
              ],
              version: 1,
              format: 0,
            },
          ],
          direction: 'ltr',
          format: 0,
          indent: 0,
          type: 'root',
          version: 1,
        },
      }),
      onChange: (value: string) => {
        console.info(value);
      },
      isOpen: true,
    },
  ]);

  const handlePreview = () => {
    console.info();
  };

  const handleSave = () => {
    createFlashcard();
  };

  return (
    <Modal title="Create flashcard">
      <div className="card w-[40rem]">
        <div className="flex flex-col gap-16 py-6">
          {sections.map(
            (section: {
              uuid: string;
              title: string;
              content: string;
              isOpen: boolean;
              onChange: (value: string) => void;
            }) => (
              <CardField
                title={section.title}
                content={section.content}
                onFieldChange={section.onChange}
              />
            ),
          )}
        </div>
        <div className="flex justify-between w-full">
          <div className="left-side">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectGroup>
                  <SelectLabel>Javascript</SelectLabel>
                  <SelectItem value="arrays">Arrays</SelectItem>
                  <SelectItem value="objects">Objects</SelectItem>
                  <SelectItem value="dates">Dates</SelectItem>
                  <SelectItem value="variables">Variables</SelectItem>
                </SelectGroup>
                <SelectGroup className="mt-4">
                  <SelectLabel>Docker</SelectLabel>
                  <SelectItem value="setup">Setup</SelectItem>
                  <SelectItem value="deployment">Deployment</SelectItem>
                  <SelectItem value="containers">Containers</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="right-side flex gap-6">
            <Button onClick={handlePreview} variant="outline">
              Preview
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateFlashcard;

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
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger>
        <div className="flex gap-2 items-center">
          <div>
            <ChevronDown size={18} />
          </div>
          <h2>{title}</h2>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="relative h-full">
          <Editor content={content} onChange={onFieldChange} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
