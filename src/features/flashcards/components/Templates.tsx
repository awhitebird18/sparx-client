import { useState } from 'react';
import { ChevronDown, ThreeDots } from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { Field } from '../types/field';
import { observer } from 'mobx-react-lite';
import FieldItem from './FieldItem';
import TemplateCard from './TemplateCard';

const Templates = observer(() => {
  const { setActiveModal } = useStore('modalStore');
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const { fields, selectedTemplate } = useStore('flashcardStore');

  const handleCreateField = () => {
    setActiveModal({ type: 'CreateField', payload: { templateId: selectedTemplate?.uuid } });
    setFieldDropdownOpen(false);
  };

  return (
    <div className="flex flex-col relative w-full overflow-auto gap-10">
      <div className="flex gap-10 h-72">
        <TemplateCard side="front" />
        <TemplateCard side="back" />
      </div>

      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <DropdownMenu open={fieldDropdownOpen} onOpenChange={setFieldDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 prose text-main dark:prose-invert">
                <h3 className=" m-0">Fields</h3>
                <ChevronDown size={14} />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60" align="start" alignOffset={10} sideOffset={0}>
              {fields.map((field: Field) => (
                <DropdownMenuItem key={field.uuid}>{field.title}</DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={handleCreateField}>Add field</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThreeDots size={24} className="mr-1" />
        </div>

        <div className="card-base flex items-center justify-between gap-6 px-6 w-full h-16">
          <div className="flex items-center gap-6">
            {fields.map((field: Field) => (
              <FieldItem field={field} />
            ))}
          </div>
          <Button className="rounded-lg h-9" onClick={handleCreateField}>
            Add field
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Templates;
