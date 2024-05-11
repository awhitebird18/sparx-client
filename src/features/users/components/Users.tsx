import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Skeleton } from '@/components/ui/Skeleton';
import EmptyFallback from '@/components/EmptyFallback';
import { ChannelSubscription } from '@/features/channels/types';
import UserCard from './UserCard';
import UserFilters from './UserFilters';
import HeaderContainer from '@/layout/sidePanel/HeaderContainer';
import SidePanelContainer from '@/layout/sidePanel/SidePanelContainer';
import SidePanelBody from '@/layout/sidePanel/SidePanelBody';

const Users = observer(() => {
  const { isLoading, fetchChannelUserIdsApi, filteredUsers, setFilterToDefault } =
    useStore('userStore');
  const { currentChannelId } = useStore('channelStore');

  useEffect(() => {
    if (!currentChannelId) return;
    const fetchData = async () => {
      await fetchChannelUserIdsApi(currentChannelId);
    };
    fetchData();
  }, [currentChannelId, fetchChannelUserIdsApi]);

  useEffect(() => {
    return setFilterToDefault;
  }, [setFilterToDefault]);

  const resultsExist = filteredUsers.length;

  return (
    <SidePanelContainer>
      <HeaderContainer title="Users" element={<UserFilters />} />

      <SidePanelBody className="gap-3 overflow-y-scroll pr-5">
        {!isLoading && !resultsExist ? (
          <EmptyFallback
            title="No Members Found."
            description={<>All of your notes will appear here.</>}
            action={{ title: 'Reset Filters', callback: setFilterToDefault }}
          />
        ) : null}

        {!isLoading && resultsExist
          ? filteredUsers.map((userChannel: ChannelSubscription) => (
              <UserCard userChannel={userChannel} />
            ))
          : null}

        {isLoading ? <UserCardSkeletons /> : null}
      </SidePanelBody>
    </SidePanelContainer>
  );
});

export default Users;

// Supplemental components
const UserCardSkeletons = () => {
  return (
    <>
      <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
      <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
      <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
      <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
    </>
  );
};
