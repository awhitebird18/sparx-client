import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { User } from '@/features/users';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import { useStore } from '@/stores/RootStore';
import { useState } from 'react';
import { Search, PersonAdd, X } from 'react-bootstrap-icons';

const Members = () => {
  const { users } = useStore('userStore');
  const [search, setSearch] = useState<string | undefined>('');

  const filteredUsers = search
    ? users.filter((user: User) => `${user.firstName} ${user.lastName}}`.includes(search))
    : users;

  const handleOpenUserProfile = (userId: string) => {
    console.info(`Open user profile: ${userId}`);
  };

  const handleOpenAddUserToChannelModal = () => {
    console.info('Open modal to search for user to add to channel');
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="space-y-2 py-1.5">
      <div className="relative flex items-center">
        <Input
          placeholder="Search members"
          className="pl-12"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Search className="absolute left-3.5 top-auto text-base" />
        {search ? (
          <Button
            className="h-6 w-6 absolute right-2 top-auto text-base rounded-full p-0"
            variant="secondary"
            onClick={handleClearSearch}
          >
            <X />
          </Button>
        ) : null}
      </div>

      <ScrollArea>
        <div>
          {filteredUsers.length ? (
            <>
              <div
                className="flex items-center gap-4 hover:bg-muted py-1.5 rounded-md cursor-pointer opacity-60 hover:opacity-100"
                onClick={handleOpenAddUserToChannelModal}
              >
                <Avatar className="w-10 h-10 rounded-sm">
                  <AvatarFallback
                    children={<PersonAdd className="text-xl" />}
                    className="w-full h-full text-sm rounded-sm"
                  />
                </Avatar>
                <p>Add User</p>
              </div>
              {search && filteredUsers.length ? (
                <p className="text-xs mt-1">In this channel</p>
              ) : null}
              {filteredUsers.map((user: User) => (
                <div
                  className="flex items-center gap-4 hover:bg-muted py-1.5 rounded-md cursor-pointer"
                  onClick={() => handleOpenUserProfile(user.uuid)}
                >
                  <Avatar className="w-10 h-10 rounded-sm">
                    {<AvatarImage src={user.profileImage} />}
                    <AvatarFallback
                      children={user.firstName.substring(0, 2).toUpperCase()}
                      className="w-full h-full text-sm rounded-sm"
                    />
                  </Avatar>
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <OnlineStatusIndicator status={user.status} />
                </div>
              ))}
            </>
          ) : (
            <div className="w-full flex justify-center flex-col items-center mt-6 space-y-2 ">
              <p className="text-base">
                No matches found for <span className="font-bold">{search}</span>
              </p>
              <p className="text-sm">
                Not able to find who you are looking for?{' '}
                <Button
                  className="text-indigo-500 p-1"
                  variant="link"
                  onClick={handleOpenAddUserToChannelModal}
                >
                  Invtite them
                </Button>
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Members;
