import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Card, CardContent } from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import ContentLayout from '@/layout/contentContainer/ContentLayout';
import {
  ThreeDotsVertical,
  Alarm,
  ChevronDoubleRight,
  PlayCircle,
  StarFill,
} from 'react-bootstrap-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Badge } from '@/components/ui/Badge';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/Select';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { Privileges } from '../enums/privileges';
import { Skeleton } from '@/components/ui/Skeleton';
import EmptyFallback from '@/components/EmptyFallback';
import { ChannelSubscription } from '@/features/channels/types';

const Users = observer(() => {
  const {
    isLoading,
    setSearchValue,
    updateWorkspaceUserApi,
    findUserByUuid,
    searchValue,
    setCompletionFilter,
    setPrivilegesFilter,
    fetchChannelUserIdsApi,
    filteredUsers,
    setIsLoading,
  } = useStore('userStore');
  const { currentChannelId } = useStore('channelStore');
  const { leaveWorkspaceApi, currentWorkspaceId } = useStore('workspaceStore');
  const { setMainPanel } = useStore('mainPanelStore');

  const handleViewUserProfile = async (userId: string) => {
    setMainPanel({ type: 'profile', payload: { userId } });
  };

  const handleSetAdmin = async (userId: string, data: { isAdmin: boolean }) => {
    await updateWorkspaceUserApi(userId, data);
  };

  const handleRemoveFromWorkspace = (userId: string) => {
    if (!currentWorkspaceId) return;
    leaveWorkspaceApi(userId, currentWorkspaceId);
  };

  const handleResetFilter = useCallback(() => {
    setPrivilegesFilter(Privileges.ALL);
    setSearchValue('');
  }, [setPrivilegesFilter, setSearchValue]);

  useEffect(() => {
    if (!currentChannelId) return;
    const fn = async () => {
      try {
        setIsLoading(true);
        const minimumLoadingTimePromise = new Promise((resolve) => setTimeout(resolve, 400));
        await Promise.all([fetchChannelUserIdsApi(currentChannelId), minimumLoadingTimePromise]);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fn();
    return () => {
      setIsLoading(true);
      handleResetFilter();
    };
  }, [fetchChannelUserIdsApi, currentChannelId, setIsLoading, handleResetFilter]);

  return (
    <ContentLayout>
      <div className="flex flex-col gap-6 justify-between">
        <div className="flex gap-2">
          <div className="w-72">
            <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />
          </div>
          <Select onValueChange={setCompletionFilter}>
            <SelectTrigger className="w-52 h-9 rounded-lg">
              <SelectValue placeholder="Completion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                <div className="flex gap-3 items-center">
                  <ChevronDoubleRight /> All statuses
                </div>
              </SelectItem>
              <SelectItem value={CompletionStatus.Skip}>
                <div className="flex gap-3 items-center">
                  <ChevronDoubleRight /> Skip
                </div>
              </SelectItem>
              <SelectItem value={CompletionStatus.InProgress}>
                <div className="flex gap-3 items-center">
                  <PlayCircle /> In progress
                </div>
              </SelectItem>
              <SelectItem value={CompletionStatus.OnHold}>
                <div className="flex gap-3 items-center">
                  <Alarm /> On hold
                </div>
              </SelectItem>
              <SelectItem value={CompletionStatus.Complete}>
                <div className="flex gap-3 items-center">
                  <StarFill className="text-yellow-400" />
                  Complete
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setPrivilegesFilter}>
            <SelectTrigger className="w-52 rounded-lg h-9">
              <SelectValue placeholder="Privileges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Privileges.ALL}>All users</SelectItem>
              <SelectItem value={Privileges.ADMIN}>Admin</SelectItem>
              <SelectItem value={Privileges.MEMBER}>Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {!isLoading && !filteredUsers.length ? (
        <EmptyFallback
          title="No Members Found."
          description={<>All of your notes will appear here.</>}
          action={{ title: 'Reset Filters', callback: handleResetFilter }}
        />
      ) : null}

      <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-1 4xl:grid-cols-2 gap-4 justify-normal items-start grid-rows-[max-content_1fr]">
        {!isLoading && filteredUsers.length
          ? filteredUsers.map((userChannel: ChannelSubscription) => {
              const user = findUserByUuid(userChannel.userId);

              if (!user) return null;

              return (
                <Card
                  key={user.uuid}
                  className="p-4 rounded-lg relative cursor-pointer !shadow-sm !bg-card !border-border border card"
                  onClick={() => {
                    handleViewUserProfile(user.uuid);
                  }}
                >
                  <CardContent className="flex flex-col items-center gap-2 p-0">
                    <UserAvatar
                      size={80}
                      userId={user.uuid}
                      profileImage={user.profileImage}
                      showStatus
                      color={user.preferences.primaryColor}
                    />
                    <div className="flex flex-col flex-1 items-center">
                      <div className="flex text-main gap-2 items-center">
                        <Username firstName={user.firstName} lastName={user.lastName} />
                        {user.isAdmin && <Badge variant="outline">Admin</Badge>}
                      </div>

                      <p className="text-sm text-secondary text-ellipsis overflow-hidden whitespace-nowrap mb-1">
                        Software Engineer
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          userChannel.status === CompletionStatus.Complete
                            ? 'text-yellow-400'
                            : 'text-violet-500'
                        }`}
                      >
                        {userChannel.status}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <ThreeDotsVertical size={20} className="text-main absolute top-2 right-2" />
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-50" align="end" alignOffset={-10}>
                        <DropdownMenuItem
                          onClick={() => {
                            handleViewUserProfile(user.uuid);
                          }}
                        >
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            handleSetAdmin(user.uuid, { isAdmin: !user.isAdmin });
                          }}
                        >
                          {user.isAdmin ? 'Set as member' : 'Set as admin'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            handleRemoveFromWorkspace(user.uuid);
                          }}
                          className="text-rose-500"
                        >
                          Remove from workspace
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              );
            })
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
    </ContentLayout>
  );
});

export default Users;
