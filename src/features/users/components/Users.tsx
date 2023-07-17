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
import { useStore } from '@/stores/RootStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import Content from '@/components/layout/containers/Content';
import SearchInput from '@/components/ui/SearchInput';
import Body from '@/components/layout/containers/Body';
import UserAvatar from './UserAvatar';

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
    <Content>
      <Header>
        <h3 className="text-lg leading-6 font-medium">Users</h3>
      </Header>
      <Body>
        <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />

        {isLoading ? (
          <div className="mt-10 flex-1">
            <Spinner />
          </div>
        ) : null}
        {displayedUsers.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-4 lg:grid-cols-4 gap-4 justify-normal grid-flow-row-dense items-start grid-rows-[max-content_1fr] h-100 overflow-auto mt-3">
            {displayedUsers.map((user) => (
              <Card
                key={user.uuid}
                className="border p-4 rounded shadow relative h-min cursor-pointer dark:bg-card"
                onClick={() => handleClickUser(user.uuid)}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute top-0 right-4">
                    <div className="mt-2 text-right text-2xl">⋮</div>
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
                  <UserAvatar size={36} />
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
        ) : null}
        {!isLoading && !displayedUsers.length ? (
          <div className="w-full flex flex-col items-center flex-1">
            <p className="text-xl font-bold mb-4 mt-16">No results</p>
            <p className="text-sm mb-10">You may want to try adjusting your filters. </p>
          </div>
        ) : null}

        <div className="flex-1" />

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
      </Body>
    </Content>
  );
};

export default observer(Users);
