import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useStore } from '@/stores/RootStore';
import CardField from './CardField';
import { defaultCreateCard } from '../utils/defaultCreateCard';
import { observer } from 'mobx-react-lite';

const CreateFlashcard = observer(() => {
  const { createFlashcard } = useStore('flashcardStore');

  const handleSave = () => {
    createFlashcard();
  };

  return (
    <Modal title="Create flashcard">
      <div className="card w-[40rem]">
        <div className="flex flex-col gap-16 py-6">
          {defaultCreateCard.map(
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
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default CreateFlashcard;
