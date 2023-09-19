import { useMemo, useRef, useState } from 'react';
import { Check } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';
import { SidebarItem, SortBy } from './enums';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import { ModalName } from '@/components/modal/modalList';
import { useDrag } from 'react-dnd';
import { observer } from 'mobx-react-lite';

interface ListHeaderProps {
  id: string;
  icon?: JSX.Element;
  title: string;
  isSystem?: boolean;
  index: number;
  isOpen?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
  sortBy?: SortBy;
}

const ListHeader = ({ id, icon, title, isSystem, ref, sortBy, index }: ListHeaderProps) => {
  const { setActiveModal } = useStore('modalStore');
  const { updateSectionApi } = useStore('sectionStore');
  const [hasOpenDialog] = useState(false);

  const dragFunction = useMemo(() => {
    return {
      type: SidebarItem.SECTION,
      item: { id, type: SidebarItem.SECTION, index },
      collect: () => ({}),
    };
  }, [id, index]);

  const [, dragRef] = useDrag(dragFunction);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);

  const handleClickItem = ({
    type,
    payload,
  }: {
    type: ModalName;
    payload?: { id: string; name?: string };
  }) => {
    setActiveModal({ type, payload });
  };

  const handleSetSectionSort = async (sortBy: SortBy) => {
    await updateSectionApi(id, { sortBy });
  };

  return (
    <ContextMenu>
      <div
        ref={dragRef}
        className="h-8 p-0 px-3 w-100 flex items-center gap-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden text-main"
      >
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">{icon}</div>
        <ContextMenuTrigger>
          <div
            className="font-medium whitespace-nowrap text-ellipsis overflow-hidden text-sm"
            ref={ref}
          >
            {title}
          </div>
        </ContextMenuTrigger>
      </div>

      <ContextMenuContent
        className="ContextMenuContent w-60"
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <ContextMenuSub>
          <ContextMenuSubTrigger>Create</ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuItem
                onClick={() => handleClickItem({ type: 'CreateChannelModal', payload: { id } })}
              >
                Create Channel
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleClickItem({ type: 'CreateSectionModal' })}>
                Create Section
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Sort</ContextMenuSubTrigger>
          <ContextMenuPortal>
            <ContextMenuSubContent>
              <ContextMenuLabel className="text-xs text-black ml-6">
                Sort this section
              </ContextMenuLabel>
              <ContextMenuItem onClick={() => handleSetSectionSort(SortBy.ALPHA)}>
                <div className="w-6">{sortBy === SortBy.ALPHA && <Check />}</div>Alphabetically
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleSetSectionSort(SortBy.RECENT)}>
                <div className="w-6">{sortBy === SortBy.RECENT && <Check />}</div> Most Recent{' '}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuPortal>
        </ContextMenuSub>
        {!isSystem && (
          <ContextMenuSub>
            <ContextMenuSubTrigger>Manage</ContextMenuSubTrigger>
            <ContextMenuPortal>
              <ContextMenuSubContent>
                <ContextMenuItem
                  onClick={() =>
                    handleClickItem({ type: 'CreateSectionModal', payload: { id, name: title } })
                  }
                >
                  {`Rename ${title}`}
                </ContextMenuItem>

                <ContextMenuItem
                  className="text-rose-500"
                  onClick={() =>
                    handleClickItem({ type: 'DeleteSectionModal', payload: { id, name: title } })
                  }
                >{`Delete ${title}`}</ContextMenuItem>

                <ContextMenuSeparator />
              </ContextMenuSubContent>
            </ContextMenuPortal>
          </ContextMenuSub>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default observer(ListHeader);
