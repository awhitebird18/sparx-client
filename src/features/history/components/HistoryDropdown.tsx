import { useRef, useState } from 'react';
import { ClockHistory } from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ModalName } from '@/components/modal/modalList';
import { useStore } from '@/stores/RootStore';
import useHistoryState from '@/hooks/useHistoryState';
import { useNavigate } from 'react-router-dom';
import { HistoryItem } from './types';

const HistoryDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistoryState();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpenModal = ({ type, payload }: { type: ModalName; payload: any }) => {
    setActiveModal({ type, payload });
  };

  const handleClickItem = (value: string) => {
    navigate(value);
    setActiveModal(null);
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger>
        <div className="flex gap-1.5 hover:bg-transparent px-3.5 h-12 cursor-pointer items-center">
          <ClockHistory size={18} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="start"
        alignOffset={10}
        sideOffset={0}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenuGroup>
          {history
            ? history
                .slice(-10)
                .sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp)
                .map((item: HistoryItem) => (
                  <DropdownMenuItem onClick={() => handleClickItem(item.primaryView)}>
                    {item.primaryView}
                  </DropdownMenuItem>
                ))
            : null}
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <DropdownMenuItem
          onClick={() => handleOpenModal({ type: 'ViewHistory', payload: { history } })}
        >
          Show more
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HistoryDropdown;
