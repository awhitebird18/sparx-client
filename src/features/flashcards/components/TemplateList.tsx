import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Table from '@/components/ui/Table';
import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { ArrowReturnRight, Mouse, Plus, ThreeDots, Trash } from 'react-bootstrap-icons';
import { Field } from '../types/Field';

const TemplateList = () => {
  const {
    variants,
    templates,
    handleSelectTemplate,
    selectedTemplate,
    selectedVariant,
    handleSelectVariant,
    isLoading,
  } = useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');
  const [variantDropdownOpen, setVariantDropdownOpen] = useState(false);
  const [templateDropdownOpen, setTemplateDropdownOpen] = useState(false);
  const [variantTableDropdownOpen, setVariantTableDropdownOpen] = useState(null);
  const [templateSelectDropdownOpen, setTemplateSelectDropdownOpen] = useState(false);

  // Templates
  const handleCreateTemplate = () => {
    setActiveModal({ type: 'CreateTemplateModal', payload: null });
    setTemplateSelectDropdownOpen(false);
  };

  // Variants
  const handleCreateVariant = () => {
    setActiveModal({ type: 'CreateVariantModal', payload: { templateId: selectedTemplate?.uuid } });
    setVariantDropdownOpen(false);
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

  const templateColumns: any[] = useMemo(
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
                  onClick={() => handleSelectTemplate(uuid)}
                >
                  <Mouse /> Select
                </DropdownMenuItem>
                <DropdownMenuItem
                  key="rename"
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                  onClick={() => handleUpdateTemplate(uuid, { title: row.original.title })}
                >
                  <ArrowReturnRight /> Rename variant
                </DropdownMenuItem>
                <DropdownMenuItem
                  key="remove"
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer text-rose-500 hover:text-rose-500"
                  onClick={() => handleRemoveTemplate(uuid)}
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

  const variantColumns: any[] = useMemo(
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

  return (
    <div className="flex flex-col gap-12">
      <div className="space-y-3">
        <div className="flex justify-between items-center prose dark:prose-invert">
          <h3>Templates</h3>
          <Button
            size="icon"
            className="rounded-lg"
            variant="outline-primary"
            onClick={handleCreateTemplate}
          >
            <Plus size={20} />
          </Button>
        </div>
        <Table
          tableClasses="bg-hover"
          columns={templateColumns}
          data={templates}
          activeId={selectedTemplate?.uuid}
          onRowClick={(row) => handleSelectTemplate(row.uuid)}
          isLoading={isLoading}
        />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center prose dark:prose-invert">
          <h3>Variants</h3>
          <Button
            size="icon"
            className="rounded-lg"
            variant="outline-primary"
            onClick={handleCreateVariant}
          >
            <Plus size={20} />
          </Button>
        </div>
        <Table
          tableClasses="bg-hover"
          columns={variantColumns}
          data={variants}
          activeId={selectedVariant?.uuid}
          onRowClick={(row) => handleSelectVariant(row.uuid)}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default observer(TemplateList);
