import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/stores/RootStore';
import { User } from '../types';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import SearchInput from '@/components/ui/SearchInput';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import { getDirectChannel } from '@/features/channels/api/getDirectChannel';
import NoUsersFallback from './NoUsersFallback';
import ContentLayout from '@/components/layout/ContentLayout';
import { ChevronDown } from 'react-bootstrap-icons';

const Users = () => {
  const { isLoading, displayedUsers, searchValue, setSearchValue } = useStore('userStore');
  const navigate = useNavigate();
  const { setActiveModal } = useStore('modalStore');
  const { createDirectChannelApi } = useStore('channelStore');
  const { directChannelSectionId, addChannelUuidToSection } = useStore('sectionStore');
  const { currentUser } = useStore('userStore');
  const { setSelectedId } = useStore('sidebarStore');

  const handleViewUserProfile = async (userId: string) => {
    setActiveModal({ type: 'ProfileModal', payload: { userId } });
  };

  const handleMessageUser = async (user: User) => {
    if (!currentUser || !directChannelSectionId) return;

    const directChannel = await getDirectChannel(user.uuid);

    if (directChannel) {
      return navigate(`/app/${directChannel.uuid}`);
    }

    const newDirectChannel = await createDirectChannelApi([currentUser.uuid, user.uuid]);

    addChannelUuidToSection(newDirectChannel.uuid, directChannelSectionId);

    setSelectedId(newDirectChannel.uuid);

    return navigate(`/app/${newDirectChannel.uuid}`);
  };

  return (
    <ContentLayout title="Users">
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 my-2">
          {/* Channel type filter */}

          <Button className="gap-2 py-0 w-72 justify-between" size="sm" variant="outline">
            Location
            <ChevronDown className="text-xs" />
          </Button>

          <Button className="gap-2 py-0 w-72 justify-between" size="sm" variant="outline">
            Department
            <ChevronDown className="text-xs" />
          </Button>

          <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />
        </div>
        {searchValue && (
          <Button size="sm" variant="secondary">
            Clear Filters
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="absolute right-auto top-20 w-full">
          <Spinner />
        </div>
      ) : null}

      {displayedUsers.length ? (
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-normal items-start grid-rows-[max-content_1fr] h-100 overflow-auto my-3">
          {displayedUsers
            .filter((user: User) => user.uuid !== currentUser?.uuid)
            .map((user: User) => (
              <Card
                key={user.uuid}
                className="p-4 rounded-xl relative cursor-pointer"
                onClick={() => {
                  handleViewUserProfile(user.uuid);
                }}
              >
                <CardContent className="flex items-center justify-center">
                  <UserAvatar
                    size={150}
                    userId={user.uuid}
                    profileImage={user.profileImage}
                    rounded="rounded-xl"
                  />
                </CardContent>
                <CardFooter className="flex-col gap-3 p-0">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-main">
                      <Username firstName={user.firstName} lastName={user.lastName} />
                      <OnlineStatusIndicator userId={user.uuid} />
                    </div>
                    <p className="text-muted">Developer, Brampon Ontario</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleViewUserProfile(user.uuid);
                      }}
                    >
                      Profile
                    </Button>
                    <Button
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleMessageUser(user);
                      }}
                    >
                      Message
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      ) : null}

      {displayedUsers.length === 0 ? <NoUsersFallback /> : null}
    </ContentLayout>
  );
};

export default observer(Users);
