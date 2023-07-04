// src/Users.tsx

import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/stores';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';

const USERS_PER_PAGE = 10;

enum UserMenuOptions {
  PROFILE = 'Profile',
  MESSAGE = 'Message',
}

const Users: React.FC = () => {
  const { fetchUserChannels, channels, isLoading } = useStore('channelStore');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserChannels();
  }, [fetchUserChannels]);

  const filteredUsers = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedChannels = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handleClickUser = (id: string) => {
    navigate(`/app/${id}`);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-lg leading-6 font-medium mb-3">Users</h3>
      <Input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-200 rounded mb-4"
      />
      {isLoading ? (
        <div className="mt-10 flex-1">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-4 lg:grid-cols-4 gap-4 flex-1 grid-flow-row-dense items-start grid-rows-[max-content_1fr]">
          {displayedChannels.map((channel) => (
            <Card
              key={channel.uuid}
              className="border p-4 rounded shadow relative h-min cursor-pointer dark:hover:bg-accent hover:bg-accent"
              onClick={() => handleClickUser(channel.uuid)}
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute top-0 right-4">
                  <button className="mt-2 text-right text-2xl">⋮</button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => console.log(`Message ${channel.name}`)}>
                    {UserMenuOptions.PROFILE}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => console.log(`View Profile ${channel.name}s profile`)}
                  >
                    {UserMenuOptions.MESSAGE}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <CardContent className="flex items-center justify-center p-0 mb-2">
                <Avatar className="h-32 w-32 ">
                  <AvatarImage src={channel.image} className="h-32 w-32 rounded-md" />
                  <AvatarFallback children="Fallback" className="rounded-md" />
                </Avatar>
              </CardContent>
              <CardFooter className="flex-col p-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{channel.name}</p>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => page - 1)}
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-primary-foreground hover:bg-accent"
        >
          Previous
        </Button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-primary-foreground hover:bg-accent"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
observer;

export default observer(Users);
