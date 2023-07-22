// src/Users.tsx

import React, { useEffect } from 'react';
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
import { User } from '..';
import Username from './Username';
import OnlineStatusIndicator from './OnlineStatusIndicator';

enum UserMenuOptions {
  PROFILE = 'Profile',
  MESSAGE = 'Message',
}

const Users = () => {
  const {
    fetchUsers,
    isLoading,
    displayedUsers,
    currentPage,
    setCurrentPage,
    totalPages,
    searchValue,
    setSearchValue,
  } = useStore('userStore');
  const navigate = useNavigate();
  const { setActiveModal } = useStore('modalStore');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleViewUserProfile = (userId: string) => {
    setActiveModal({ type: 'ProfileModal', payload: { userId } });
  };

  const handleMessageUser = (uuid: string) => {
    navigate(`/app/${uuid}`);
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
            {displayedUsers.map((user: User) => (
              <Card
                key={user.uuid}
                className="border p-4 rounded shadow relative cursor-pointer dark:bg-card"
                onClick={() => {
                  handleMessageUser(user.uuid);
                }}
              >
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute top-0 right-4" asChild>
                    <Button
                      className="mt-2 text-right text-2xl hover:bg-transparent p-1"
                      variant="ghost"
                    >
                      ⋮
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="bottom">
                    <DropdownMenuItem
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleViewUserProfile(user.uuid);
                      }}
                    >
                      {UserMenuOptions.PROFILE}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleMessageUser(user.uuid);
                      }}
                    >
                      {UserMenuOptions.MESSAGE}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <CardContent className="flex items-center justify-center">
                  <UserAvatar size={120} userId={user.uuid} profileImage={user.profileImage} />
                </CardContent>
                <CardFooter className="flex-col p-0">
                  <div className="flex items-center gap-2">
                    <Username firstName={user.firstName} lastName={user.lastName} />
                    <OnlineStatusIndicator userId={user.uuid} />
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
            onClick={() => setCurrentPage(currentPage - 1)}
            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-primary-foreground hover:bg-accent"
          >
            Previous
          </Button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
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
