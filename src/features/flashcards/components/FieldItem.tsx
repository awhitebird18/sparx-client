import { observer } from 'mobx-react-lite';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Field } from '../types/Field';
import { useStore } from '@/stores/RootStore';
import { ChevronDown, GripVertical } from 'react-bootstrap-icons';
import { useDrag } from 'react-dnd';
import { useState } from 'react';

const FieldItem = ({ field }: { field: Field }) => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [, dragRef] = useDrag(() => ({
    type: 'field-item',
    item: { uuid: field.uuid },
    collect: () => ({}),
  }));

  const handleUpdateField = (uuid: string, field: Partial<Field>) => {
    setActiveModal({
      type: 'UpdateFieldModal',
      payload: { uuid, updateFields: field },
    });
    setDropdownOpen(false);
  };

  const handleRemoveField = (uuid: string) => {
    setActiveModal({ type: 'RemoveFieldModal', payload: { uuid } });
    setDropdownOpen(false);
  };

  return (
    <div
      key={field.uuid}
      ref={dragRef}
      className="flex items-center border border-border bg-card h-9 rounded-lg px-2 pr-4 gap-2 w-40 justify-between overflow-hidden"
    >
      <div className="flex items-center gap-1 cursor-grab overflow-hidden">
        <GripVertical size={18} className="flex-shrink-0" />
        <span className="whitespace-nowrap w-5/6 overflow-hidden text-ellipsis">{field.title}</span>
      </div>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <ChevronDown className="cursor-pointer flex-shrink-0 w-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-36 p-1" align="end" alignOffset={-14} sideOffset={10}>
          <DropdownMenuItem onClick={() => handleUpdateField(field.uuid, { title: field.title })}>
            Update field
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRemoveField(field.uuid)}>
            Remove field
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default observer(FieldItem);
