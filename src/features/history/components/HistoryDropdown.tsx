import { useRef, useState } from 'react';
import { ClockHistory, Pencil } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { At, Person, Tv } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';
import useHistoryState from '@/hooks/useHistoryState';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { HistoryItem } from '../types';

import ChannelIcon from '@/features/channels/components/ChannelIcon';

const getDefaultType = (id: string) => {
  switch (id) {
    case 'users':
      return { title: 'Users', icon: <Person size={18} /> };
    case 'channels':
      return { title: 'Channels', icon: <Tv size={18} /> };

    case 'mentions':
      return { title: 'Mentions', icon: <At size={18} /> };

    case 'drafts':
      return { title: 'Drafts', icon: <Pencil size={18} /> };

    default:
      return undefined;
  }
};

const HistoryDropdown = () => {
  const { setActiveModal } = useStore('modalStore');
  const { findChannelByUuid } = useStore('channelStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistoryState();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const focusRef = useRef<any>(null);

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
        className="w-80"
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
        <DropdownMenuLabel className="text-muted-foreground">Recent</DropdownMenuLabel>
        <DropdownMenuGroup>
          {history
            ? history
                .slice(-10)
                .sort((a: HistoryItem, b: HistoryItem) => b.timestamp - a.timestamp)
                .map((item: HistoryItem) => {
                  let itemData = getDefaultType(item.primaryView);

                  if (!itemData) {
                    const channel = findChannelByUuid(item.primaryView);

                    if (!channel) return null;

                    itemData = {
                      title: channel.name,
                      icon: (
                        <ChannelIcon
                          imageUrl={channel.icon}
                          size={20}
                          isPrivate={channel.isPrivate}
                        />
                      ),
                    };
                  }

                  if (!itemData) return;

                  return (
                    <DropdownMenuItem
                      key={item.timestamp}
                      onClick={() => handleClickItem(item.primaryView)}
                    >
                      <div className="w-6 h-6 justify-center items-center flex mr-2">
                        {itemData.icon}
                      </div>
                      {itemData.title}
                    </DropdownMenuItem>
                  );
                })
            : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HistoryDropdown;
