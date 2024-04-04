import Table from '@/components/ui/Table';
import { useMemo, useState } from 'react';
import {
  ArrowReturnRight,
  ChevronDown,
  ChevronLeft,
  Mouse,
  ThreeDots,
  Trash,
} from 'react-bootstrap-icons';
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
  const [templateSelectDropdownOpen, setTemplateSelectDropdownOpen] = useState(false);
  const [fieldDropdownOpen, setFieldDropdownOpen] = useState(false);
  const [variantDropdownOpen, setVariantDropdownOpen] = useState(false);
  const [variantTableDropdownOpen, setVariantTableDropdownOpen] = useState(null);
  const {
    fields,
    variants,
    templates,
    handleSelectTemplate,
    selectedTemplate,
    selectedVariant,
    handleSelectVariant,
    isLoading,
  } = useStore('flashcardStore');
  const navigate = useNavigate();

  // Fields
  const handleCreateField = () => {
    setActiveModal({ type: 'CreateField', payload: { templateId: selectedTemplate?.uuid } });
    setFieldDropdownOpen(false);
  };

  // Templates
  const handleCreateTemplate = () => {
    setActiveModal({ type: 'CreateTemplateModal', payload: null });
    setTemplateSelectDropdownOpen(false);
  };

  const handleUpdateTemplate = (uuid: string | undefined, field: Partial<Field>) => {
    if (!uuid) return;
    setActiveModal({
      type: 'UpdateTemplateModal',
      payload: { uuid, updateFields: field },
    });
    setTemplateDropdownOpen(false);
  };
  const handleRemoveTemplate = (uuid: string | undefined) => {
    if (!uuid) return;
    setActiveModal({ type: 'RemoveTemplateModal', payload: { uuid } });
    setTemplateDropdownOpen(false);
  };

  // Variants
  const handleCreateVariant = () => {
    setActiveModal({ type: 'CreateVariantModal', payload: { templateId: selectedTemplate?.uuid } });
    setVariantDropdownOpen(false);
  };

  const handleUpdateVariant = (uuid: string | undefined, field: Partial<Field>) => {
    if (!uuid) return;
    setActiveModal({
      type: 'UpdateVariantModal',
      payload: { uuid, updateFields: field },
    });
    setVariantDropdownOpen(false);
  };

  const handleRemoveVariant = (uuid: string | undefined) => {
    if (!uuid) return;
    setActiveModal({ type: 'RemoveVariantModal', payload: { uuid } });
    setVariantDropdownOpen(false);
  };

  const columns: any[] = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
        Cell: ({ value }: { value: Date }) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
      },
      {
        Header: 'Actions', // Name it as per your choice
        id: 'actions', // It's a good practice to give an ID for reference
        Cell: ({ row }: { row: any }) => {
          const { uuid } = row.original;

          return (
            <DropdownMenu
              open={variantTableDropdownOpen === uuid}
              onOpenChange={() => setVariantTableDropdownOpen(uuid)}
            >
              <DropdownMenuTrigger className="p-2" onClick={(e) => e.stopPropagation()}>
                <ThreeDots size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="p-1.5 border border-border rounded-md text-sm bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DropdownMenuItem
                  key="select"
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                  onClick={() => handleSelectVariant(uuid)}
                >
                  <Mouse /> Select
                </DropdownMenuItem>
                <DropdownMenuItem
                  key="rename"
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                  onClick={() => handleUpdateVariant(uuid, { title: row.original.title })}
                >
                  <ArrowReturnRight /> Rename variant
                </DropdownMenuItem>
                <DropdownMenuItem
                  key="remove"
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer text-rose-500 hover:text-rose-500"
                  onClick={() => handleRemoveVariant(uuid)}
                >
                  <Trash /> Remove variant
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col relative w-full p-8 overflow-auto gap-10">
      <div className="flex items-start pt-4 gap-6">
        {/* <Button className="card rounded-xl pointer-events-none opacity-70 h-18 w-18 bg-card border border-primary p-2 text-primary shadow-lg">
            <Pencil size={50} />
          </Button> */}
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <Button className="w-fit gap-2 h-8" size="sm" onClick={handleClickBack}>
              <ChevronLeft size={13} /> Go Back
            </Button>
            <h2 className="text-main text-3xl font-medium">Flashcard Templates</h2>
          </div>
          <p className="text-secondary">See all of your notes for workspace and make changes</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Cards */}
        <div className="space-y-2 ">
          <div className="w-full flex justify-between">
            <DropdownMenu
              open={templateSelectDropdownOpen}
              onOpenChange={setTemplateSelectDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <h3 className="text-muted flex gap-2 items-center m-0 text-2xl font-semibold">
                    {selectedTemplate?.title}
                    <ChevronDown />
                  </h3>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-60" align="start" alignOffset={10} sideOffset={0}>
                {templates?.map((template: Template) => (
                  <DropdownMenuItem
                    key={template.uuid}
                    onClick={() => handleSelectTemplate(template.uuid)}
                  >
                    {template.title}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => handleCreateTemplate()}>
                  Create template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={templateDropdownOpen} onOpenChange={setTemplateDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <ThreeDots size={24} className="cursor-pointer" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-36 p-1"
                align="end"
                alignOffset={-14}
                sideOffset={10}
              >
                <DropdownMenuItem
                  onClick={() =>
                    handleUpdateTemplate(selectedTemplate?.uuid, {
                      title: selectedTemplate?.title,
                    })
                  }
                >
                  Rename template
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleRemoveTemplate(selectedTemplate?.uuid)}>
                  Remove template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex gap-10 h-80">
            <TemplateCard side="front" />
            <TemplateCard side="back" />
          </div>
        </div>
        {/* Fields */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <DropdownMenu open={fieldDropdownOpen} onOpenChange={setFieldDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <h3 className="text-muted m-0">Fields</h3>
                  <ChevronDown size={16} className="text-muted" />
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

          <div className=" flex items-center justify-between gap-6 px-6 w-full rounded-xl bg-card h-16 shadow">
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
        {/* Variations */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <DropdownMenu open={variantDropdownOpen} onOpenChange={setVariantDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <h3 className="text-muted flex gap-2 items-center m-0">
                    Variants <ChevronDown />
                  </h3>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-60" align="start" alignOffset={10} sideOffset={0}>
                {variants.map((variant: Variant) => (
                  <DropdownMenuItem
                    key={variant.uuid}
                    onClick={() => handleSelectVariant(variant.uuid)}
                  >
                    {variant.title}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={() => handleCreateVariant()}>
                  Create variant
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="bg-card shadow m-0 rounded-xl">
            <Table
              columns={columns}
              data={variants}
              activeId={selectedVariant?.uuid}
              onRowClick={(row) => handleSelectVariant(row.uuid)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Templates);
