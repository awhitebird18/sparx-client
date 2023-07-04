// src/Channels.tsx

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import React, { useEffect, useState } from 'react';
import { Channel } from '@/features/channels';
import { useStore } from '@/stores/stores';
import { useNavigate } from 'react-router-dom';

const CHANNELS_PER_PAGE = 10;

enum ChannelActions {
  JOIN = 'Join',
  LEAVE = 'Leave',
}

const Channels: React.FC = () => {
  const { channels, fetchChannels } = useStore('channelStore');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const handleViewChannel = (id: string) => {
    navigate(`/app/${id}`);
  };

  const filteredChannels = channels.filter((channel: Channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedChannels = filteredChannels.slice(
    (currentPage - 1) * CHANNELS_PER_PAGE,
    currentPage * CHANNELS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredChannels.length / CHANNELS_PER_PAGE);

  const handleChannelAction = (channelId: string, action: ChannelActions) => {
    switch (action) {
      case ChannelActions.JOIN:
        console.log(`Join channel: ${channelId}`);
        break;
      case ChannelActions.LEAVE:
        console.log(`Leave channel: ${channelId}`);
        break;
    }
  };

  return (
    <div className="w-full overflow-hidden h-full flex flex-col">
      <h3 className="text-lg leading-6 font-medium mb-3">Channels</h3>
      <Input
        type="text"
        placeholder="Search channels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <ul className="space-y-3 overflow-auto flex-1 pr-2">
        {displayedChannels.map((channel) => (
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
              {channel.joinedAt ? (
                <Button
                  variant="outline"
                  onClick={() => handleChannelAction(channel.uuid, ChannelActions.LEAVE)}
                  disabled={!channel.joinedAt}
                  className="py-1 px-2 font-semibold rounded text-black bg-popover dark:bg-muted-foreground hover:bg-muted-foreground w-20"
                >
                  {ChannelActions.LEAVE}
                </Button>
              ) : (
                <Button
                  onClick={() => handleChannelAction(channel.uuid, ChannelActions.JOIN)}
                  disabled={Boolean(channel.joinedAt)}
                  className="py-1 px-2 font-semibold rounded shadow-md  bg-green-400 hover:bg-green-700 w-20"
                >
                  {ChannelActions.JOIN}
                </Button>
              )}
            </div>
          </li>
        ))}
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
    </div>
  );
};

export default Channels;
