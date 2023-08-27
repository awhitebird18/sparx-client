import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { useStore } from '@/stores/RootStore';

import { User } from '../types';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import Content from '@/components/layout/containers/Content';
import SearchInput from '@/components/ui/SearchInput';
import Body from '@/components/layout/containers/Body';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import { getDirectChannel } from '@/features/channels/api/getDirectChannel';
import { ChannelType } from '@/features/channels/enums';
import NoUsersFallback from './NoUsersFallback';

enum UserMenuOptions {
  PROFILE = 'Profile',
  MESSAGE = 'Message',
}

const Users = () => {
  const { isLoading, displayedUsers, searchValue, setSearchValue } = useStore('userStore');
  const navigate = useNavigate();
  const { setActiveModal } = useStore('modalStore');
  const { addSubscribedChannel } = useStore('channelStore');
  const { directChannelSectionId } = useStore('sectionStore');
  const { currentUser } = useStore('userStore');
  const { setSelectedId } = useStore('sidebarStore');

  const handleViewUserProfile = (userId: string) => {
    setActiveModal({ type: 'ProfileModal', payload: { userId } });
  };

  const handleMessageUser = async (user: User) => {
    if (!currentUser) return;
    const directChannel = await getDirectChannel(user.uuid);

    if (directChannel) {
      return navigate(`/app/${directChannel.uuid}`);
    }

    const sectionId = directChannelSectionId;
    const channelId = uuid();

    if (!sectionId) return;

    const tempChannel = {
      uuid: uuid(),
      channelId: channelId,
      name: `${user.firstName} ${user.lastName}`,
      sectionId: sectionId,
      type: ChannelType.DIRECT,
      isTemp: true,
      isSubscribed: true,
      createdAt: dayjs(),
    };

    addSubscribedChannel(tempChannel);
    setSelectedId(tempChannel.uuid);
    return navigate(`/app/${channelId}`);
  };

  console.log(displayedUsers);

  return (
    <Content>
      <Header>
        <h3 className="text-lg leading-6 font-medium">Users</h3>
      </Header>
      <Body>
        <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />

        {isLoading ? (
          <div className="absolute right-auto top-20 w-full">
            <Spinner />
          </div>
        ) : null}

        {!isLoading && displayedUsers.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-4 lg:grid-cols-4 gap-4 justify-normal items-start grid-rows-[max-content_1fr] h-100 overflow-auto mt-3">
            {displayedUsers
              .filter((user: User) => user.uuid !== currentUser?.uuid)
              .map((user: User) => (
                <Card
                  key={user.uuid}
                  className="border p-4 rounded shadow relative cursor-pointer dark:bg-card"
                  onClick={() => {
                    handleMessageUser(user);
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
                          handleMessageUser(user);
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

        {!displayedUsers.length ? <NoUsersFallback /> : null}
      </Body>
    </Content>
  );
};

export default observer(Users);
