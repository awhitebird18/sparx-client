import { useRef, useState } from 'react';
import { ClockHistory } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
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
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';
import { observer } from 'mobx-react-lite';
import { getDefaultType } from '../utils/getDefaultType';

const HistoryDropdown = observer(() => {
  const { closeModal } = useStore('modalStore');
  const { findChannelByUuid } = useStore('channelStore');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const history = useHistoryState();
  const navigate = useNavigate();
  const focusRef = useRef<HTMLInputElement>(null);

  const handleClickItem = (value: string) => {
    navigate(value);
    closeModal();
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger>
        <div className="flex hover:bg-transparent px-3.5 h-12 cursor-pointer items-center">
          <ClockHistory size={18} className="text-white" />
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
                    let channelIcon = channel.icon;

                    if (channelIcon) {
                      channelIcon = transformCloudinaryUrl(channelIcon, 60, 60);
                    }

                    itemData = {
                      title: channel.name,
                      icon: (
                        <ChannelIcon
                          imageUrl={channelIcon}
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
});

export default HistoryDropdown;
