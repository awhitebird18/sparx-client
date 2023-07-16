// src/Channels.tsx

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
    <div className="w-full overflow-hidden h-full flex flex-col">
      <Header>
        <h3 className="text-lg leading-6 font-medium">Channels</h3>
        <Button
          className="dark:bg-indigo-500 text-white h-8 px-2"
          onClick={handleClickCreateChannel}
          size="sm"
        >
          Create Channel
        </Button>
      </Header>

      <Content>
        <SearchInput value={searchValue} setValue={setSearchValue} placeholder="Search channels" />
        <ul className="space-y-3 overflow-auto flex-1 pr-2">
          {isLoading ? (
            <div className="mt-10">
              <Spinner />
            </div>
          ) : null}

          {!isLoading && displayedChannels.length
            ? displayedChannels.map((channel) => (
                <li
                  key={channel.uuid}
                  className="flex justify-between items-center border border-border p-4 cursor-pointer rounded-md group hover:bg-accent"
                  onClick={() => handleViewChannel(channel.uuid)}
                >
                  <div>
                    <p className="font-semibold">{channel.name}</p>
                    {channel.joinedAt ? (
                      <p className="text-sm h-6 ">
                        <span className="text-emerald-500">Joined</span>
                        {` - ${channel.joinedAt.format('MMM DD YYYY')}`}
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
      </Content>
    </div>
  );
};

export default observer(Channels);
