import Table from '@/components/ui/Table';
import { useMemo, useState } from 'react';
import { ArrowReturnRight, ChevronDown, Mouse, ThreeDots, Trash } from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { Field } from '../types/Field';
import { observer } from 'mobx-react-lite';
import { Template } from '../types/template';
import { Variant } from '../types/variant';
import dayjs from 'dayjs';
import FieldItem from './FieldItem';
import TemplateCard from './TemplateCard';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const { setActiveModal } = useStore('modalStore');
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);

  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [variantDropdownOpen, setVariantDropdownOpen] = useState(false);
  const [variantTableDropdownOpen, setVariantTableDropdownOpen] = useState(null);
  const { fields, variants, selectedTemplate, selectedVariant, handleSelectVariant, isLoading } =
    useStore('flashcardStore');
  const navigate = useNavigate();

  // Fields
  const handleCreateField = () => {
    setActiveModal({ type: 'CreateField', payload: { templateId: selectedTemplate?.uuid } });
    setFieldDropdownOpen(false);
  };

  return (
    <div className="flex flex-col relative w-full overflow-auto gap-10">
      <div className="space-y-8">
        {/* Cards */}
        <div className="space-y-4">
          <div className="flex gap-10 h-72">
            <TemplateCard side="front" />
            <TemplateCard side="back" />
          </div>
        </div>
        {/* Fields */}
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

          <div className=" flex items-center justify-between gap-6 px-6 w-full rounded-xl bg-hover card h-16 shadow-md">
            <div className="flex items-center gap-6">
              {/* Field */}
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
    </div>
  );
};

export default observer(Templates);
