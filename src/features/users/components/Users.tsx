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
import { useStore } from '@/stores/RootStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import Content from '@/components/layout/containers/Content';
import SearchInput from '@/components/ui/SearchInput';

const USERS_PER_PAGE = 10;

enum UserMenuOptions {
  PROFILE = 'Profile',
  MESSAGE = 'Message',
}

const Users: React.FC = () => {
  const { users, fetchUsers, isLoading } = useStore('userStore');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handleClickUser = (id: string) => {
    navigate(`/app/${id}`);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Header>
        <h3 className="text-lg leading-6 font-medium">Users</h3>
      </Header>

      <Content>
        <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />
        {isLoading ? (
          <div className="mt-10 flex-1">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-4 lg:grid-cols-4 gap-4 flex-1 grid-flow-row-dense items-start grid-rows-[max-content_1fr] h-100 overflow-auto">
            {displayedUsers.map((user) => (
              <Card
                key={user.uuid}
                className="border p-4 rounded shadow relative h-min cursor-pointer dark:hover:bg-accent hover:bg-accent"
                onClick={() => handleClickUser(user.uuid)}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute top-0 right-4">
                    <button className="mt-2 text-right text-2xl">⋮</button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => console.info(`Message ${user.firstName}`)}>
                      {UserMenuOptions.PROFILE}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => console.info(`View Profile ${user.firstName}s profile`)}
                    >
                      {UserMenuOptions.MESSAGE}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <CardContent className="flex items-center justify-center p-0 mb-2">
                  <Avatar className="h-32 w-32 ">
                    <AvatarImage src={user.profileImage} className="h-32 w-32 rounded-md" />
                    <AvatarFallback children="Fallback" className="rounded-md" />
                  </Avatar>
                </CardContent>
                <CardFooter className="flex-col p-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{user.firstName}</p>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center pt-2">
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
      </Content>
    </div>
  );
};

export default observer(Users);
