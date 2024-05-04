import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Table from '@/components/ui/Table';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { ArrowReturnRight, Mouse, ThreeDots, Trash } from 'react-bootstrap-icons';
import { Field } from '../types/field';
import { Column } from 'react-table';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

type VariantData = {
  uuid: string;
  title: string;
  createdOn: string;
};

const VariantTable = observer(() => {
  const { variants, selectedVariant, handleSelectVariant, isLoading } = useStore('flashcardStore');
  const [variantTableDropdownOpen, setVariantTableDropdownOpen] = useState<string | undefined>(
    undefined,
  );
  const { setActiveModal } = useStore('modalStore');

  const handleUpdateVariant = useCallback(
    (uuid: string | undefined, field: Partial<Field>) => {
      if (!uuid) return;
      setActiveModal({
        type: 'UpdateVariantModal',
        payload: { uuid, updateFields: field },
      });
    },
    [setActiveModal],
  );

  const handleRemoveVariant = useCallback(
    (uuid: string | undefined) => {
      if (!uuid) return;
      setActiveModal({ type: 'RemoveVariantModal', payload: { uuid } });
    },
    [setActiveModal],
  );

  const variantColumns: Column<VariantData>[] = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Created On',
        accessor: 'createdOn',
        Cell: ({ value }: { value: string }) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>,
      },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }: { row: { original: VariantData } }) => {
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
        width: 60,
      },
    ],
    [handleRemoveVariant, handleSelectVariant, handleUpdateVariant, variantTableDropdownOpen],
  );

  return (
    <Table
      tableClasses="bg-hover"
      columns={variantColumns}
      data={variants}
      activeId={selectedVariant?.uuid}
      onRowClick={(row) => handleSelectVariant(row.uuid)}
      isLoading={isLoading}
    />
  );
});

export default VariantTable;
