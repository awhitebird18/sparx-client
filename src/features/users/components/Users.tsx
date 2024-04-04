import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import SearchInput from '@/components/ui/SearchInput';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import ContentLayout from '@/components/layout/ContentLayout';
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
import { SubscriptionDetails } from '../types/subsciptionDetails';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/Skeleton';

const Users = () => {
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
  const navigate = useNavigate();
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { leaveWorkspaceApi, currentWorkspaceId } = useStore('workspaceStore');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchChannelUserIdsApi, currentChannelId]);

  const handleViewUserProfile = async (userId: string) => {
    navigate(`/app/profile/${userId}`);
  };

  const handleSetAdmin = async (userId: string, data: { isAdmin: boolean }) => {
    await updateWorkspaceUserApi(userId, data);
  };

  const handleRemoveFromWorkspace = (userId: string) => {
    if (!currentWorkspaceId) return;
    leaveWorkspaceApi(userId, currentWorkspaceId);
  };

  const handleResetFilter = () => {
    // setCompletionFilter(CompletionStatus.);
    setPrivilegesFilter(Privileges.ALL);
    setSearchValue('');
  };

  return (
    <ContentLayout title="Users">
      <div className="flex flex-col gap-6 justify-between">
        <div className="flex items-start pt-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="text-main text-3xl font-medium">Members</h2>
            <p className="text-secondary">See all of your notes for workspace and make changes</p>
          </div>
        </div>

        <div className="flex gap-2 my-2">
          <div className="w-72">
            <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />
          </div>
          <Select onValueChange={setCompletionFilter}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Completion status" />
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
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Privileges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Privileges.ALL}>All users</SelectItem>
              <SelectItem value={Privileges.ADMIN}>Admin</SelectItem>
              <SelectItem value={Privileges.MEMBER}>Member</SelectItem>
            </SelectContent>
          </Select>

          {/* {searchValue && (
            <Button size="sm" variant="secondary">
              Clear Filters
            </Button>
          )} */}
        </div>
      </div>
      {!isLoading && !filteredUsers.length ? (
        <EmptyFallback channelName={currentChannel?.name} onClick={handleResetFilter} />
      ) : null}

      <div className="w-full grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 4xl:grid-cols-4 gap-4 justify-normal items-start grid-rows-[max-content_1fr] pr-3">
        {!isLoading && filteredUsers.length
          ? filteredUsers.map((userChannel: SubscriptionDetails) => {
              const user = findUserByUuid(userChannel.userId);

              if (!user) return null;

              return (
                <Card
                  key={user.uuid}
                  className="p-4 rounded-lg relative cursor-pointer h-28 !shadow-sm !bg-card !border-border border card"
                >
                  <CardContent className="flex gap-4 p-0">
                    <UserAvatar
                      size={40}
                      userId={user.uuid}
                      profileImage={user.profileImage}
                      showStatus
                      color={user.preferences.primaryColor}
                    />
                    <div className="flex flex-col flex-1">
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
                        <ThreeDotsVertical size={20} className="text-main" />
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
};

export default observer(Users);

const EmptyFallback = ({ onClick }: { channelName?: string; onClick: () => void }) => (
  <div className="flex flex-col gap-5 max-w-sm items-center prose pt-12">
    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-center text-main text-xl">No Members Found.</h3>
      <p className="text-center text-secondary flex-items-center">
        All of your notes will appear here.
      </p>
    </div>

    <Button className="items-center gap-1" onClick={onClick}>
      Reset Filters
    </Button>
  </div>
);
