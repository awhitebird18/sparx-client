import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import Table from '@/components/ui/Table';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowReturnRight, Mouse, ThreeDots, Trash } from 'react-bootstrap-icons';
import { Field } from '../types/field';
import { Column } from 'react-table';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

type TemplateData = {
  uuid: string;
  title: string;
  createdOn: string;
};

const TemplateTable = observer(() => {
  const { templates, handleSelectTemplate, selectedTemplate, isLoading, fetchTemplatesApi } =
    useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [dropdownMenuId, setDropdownMenuId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!currentWorkspaceId) return;
      await fetchTemplatesApi(currentWorkspaceId);
    };
    fetchTemplates();
  }, [fetchTemplatesApi, currentWorkspaceId]);

  const handleUpdateTemplate = useCallback(
    (uuid: string | undefined, field: Partial<Field>) => {
      if (!uuid) return;
      setActiveModal({
        type: 'UpdateTemplateModal',
        payload: { uuid, updateFields: field },
      });
    },
    [setActiveModal],
  );

  const handleRemoveTemplate = useCallback(
    (uuid: string | undefined) => {
      if (!uuid) return;
      setActiveModal({ type: 'RemoveTemplateModal', payload: { uuid } });
    },
    [setActiveModal],
  );

  const templateColumns: Column<TemplateData>[] = useMemo(
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
        Cell: ({ row }: { row: { original: TemplateData } }) => {
          const { uuid } = row.original;

          return (
            <DropdownMenu
              open={dropdownMenuId === uuid}
              onOpenChange={() => setDropdownMenuId(uuid)}
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
        width: 60,
      },
    ],

    [dropdownMenuId, handleRemoveTemplate, handleSelectTemplate, handleUpdateTemplate],
  );

  return (
    <Table
      columns={templateColumns}
      data={templates}
      activeId={selectedTemplate?.uuid}
      onRowClick={(row) => handleSelectTemplate(row.uuid)}
      isLoading={isLoading}
    />
  );
});

export default TemplateTable;
