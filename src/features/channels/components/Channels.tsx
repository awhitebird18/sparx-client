import { Button } from '@/components/ui/Button';
import React, { useEffect, useState } from 'react';
import { Channel } from '@/features/channels';
import { useStore } from '@/stores/RootStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import Content from '@/components/layout/containers/Content';
import SearchInput from '@/components/ui/SearchInput';
import NoChannelsFallback from './NoChannelsFallback';
import Body from '@/components/layout/containers/Body';
import { Check, ChevronDown, Dot } from 'react-bootstrap-icons';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

const CHANNELS_PER_PAGE = 10;

enum ChannelActions {
  JOIN = 'Join',
  LEAVE = 'Leave',
}

const Channels: React.FC = () => {
  const { channels, fetchWorkspaceChannels, isLoading, joinChannel, leaveChannel } =
    useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  useEffect(() => {
    fetchWorkspaceChannels();
  }, [fetchWorkspaceChannels]);

  const handleViewChannel = (id: string) => {
    navigate(`/app/${id}`);
  };

  const handleClickCreateChannel = () => {
    setActiveModal({ type: 'CreateChannelModal', payload: null });
  };

  const filteredChannels = channels.filter((channel: Channel) =>
    channel.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const displayedChannels = filteredChannels.slice(
    (currentPage - 1) * CHANNELS_PER_PAGE,
    currentPage * CHANNELS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredChannels.length / CHANNELS_PER_PAGE);

  const handleChannelAction = (channelId: string, action: ChannelActions) => {
    switch (action) {
      case ChannelActions.JOIN:
        joinChannel(channelId);
        break;
      case ChannelActions.LEAVE:
        leaveChannel(channelId);

        break;
    }
  };

  return (
    <Content>
      <Header>
        <h3 className="text-lg leading-6 font-medium">Channels</h3>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white h-8 px-2"
          onClick={handleClickCreateChannel}
          size="sm"
        >
          Create Channel
        </Button>
      </Header>
      <Body>
        <SearchInput value={searchValue} setValue={setSearchValue} placeholder="Search channels" />
        <div className="flex gap-2 mt-3">
          <DropdownMenu open={sortDropdownOpen} onOpenChange={setSortDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" size="sm">
                Sort: Alphabetically <ChevronDown className="text-xs" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
              <DropdownMenuItem>Alphabetical</DropdownMenuItem>
              <DropdownMenuItem>Most members</DropdownMenuItem>
              <DropdownMenuItem>Least members</DropdownMenuItem>
              <DropdownMenuItem>Newest channel</DropdownMenuItem>
              <DropdownMenuItem>Oldest channel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" size="sm">
                Channel Type <ChevronDown className="text-xs" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
              <DropdownMenuItem>Alphabetical</DropdownMenuItem>
              <DropdownMenuItem>Most members</DropdownMenuItem>
              <DropdownMenuItem>Least members</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ul className="mt-3 flex-1 overflow-auto">
          {isLoading ? (
            <div className="mt-10">
              <Spinner />
            </div>
          ) : null}

          {!isLoading && displayedChannels.length
            ? displayedChannels.map((channel) => (
                <li
                  key={channel.uuid}
                  className="flex justify-between items-center border-b border-border p-4 cursor-pointer group hover:bg-secondary/25"
                  onClick={() => handleViewChannel(channel.uuid)}
                >
                  <div>
                    <p className="font-semibold">{channel.name}</p>
                    {channel.isSubscribed ? (
                      <p className="text-sm h-6 flex gap-2 text-muted-foreground">
                        <span className="text-emerald-500 flex items-center gap-1">
                          <Check className="text-lg mt-1" /> <span>Joined</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Dot className="text-lg" />
                          <span>2 members</span>
                        </span>
                        {channel.description && (
                          <span className="flex items-center gap-1">
                            <Dot className="text-lg" />
                            <span>{channel.description}</span>
                          </span>
                        )}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-x-2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                    {channel.isSubscribed ? (
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChannelAction(channel.uuid, ChannelActions.LEAVE);
                        }}
                        className="py-1 px-2 font-semibold rounded text-black bg-popover dark:bg-muted-foreground hover:bg-muted-foreground w-20"
                      >
                        {ChannelActions.LEAVE}
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChannelAction(channel.uuid, ChannelActions.JOIN);
                        }}
                        className="py-1 px-2 font-semibold rounded shadow-md  bg-green-400 hover:bg-green-700 w-20"
                      >
                        {ChannelActions.JOIN}
                      </Button>
                    )}
                  </div>
                </li>
              ))
            : null}

          {!isLoading && !displayedChannels.length ? <NoChannelsFallback /> : null}
        </ul>
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
          >
            Previous
          </Button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700"
          >
            Next
          </Button>
        </div>
      </Body>
    </Content>
  );
};

export default observer(Channels);
