import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Skeleton } from '@/components/ui/Skeleton';
import EmptyFallback from '@/components/EmptyFallback';
import { ChannelSubscription } from '@/features/channels/types';
import UserCard from './UserCard';
import UserFilters from './UserFilters';

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

  return (
    <div className="overflow-hidden h-full">
      <div className="flex justify-between prose dark:prose-invert p-5 mb-3">
        <h3 className="">Users</h3>
        <UserFilters />
      </div>

      {!isLoading && !filteredUsers.length ? (
        <EmptyFallback
          title="No Members Found."
          description={<>All of your notes will appear here.</>}
          action={{ title: 'Reset Filters', callback: setFilterToDefault }}
        />
      ) : null}

      <div className=" overflow-auto px-5 flex flex-col gap-3 h-full">
        {!isLoading && filteredUsers.length
          ? filteredUsers.map((userChannel: ChannelSubscription) => (
              <UserCard userChannel={userChannel} />
            ))
          : null}
        {isLoading ? (
          <>
            <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
            <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
            <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
            <Skeleton className="p-4 rounded-lg relative cursor-pointer h-28 shadow-sm !bg-card card border-border border" />
          </>
        ) : null}
      </div>
    </div>
  );
});

export default Users;
