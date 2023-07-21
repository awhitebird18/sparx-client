import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import SearchInput from '@/components/ui/SearchInput';
import { User } from '@/features/users';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { PersonAdd } from 'react-bootstrap-icons';

type MembersProps = { users: User[] };

const Members = ({ users }: MembersProps) => {
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

  return (
    <div className="space-y-2 py-1.5">
      <SearchInput value={search} setValue={setSearch} />

      <ScrollArea>
        <div>
          {filteredUsers.length ? (
            <>
              <div
                className="flex items-center gap-4 hover:bg-secondary/50 p-2 rounded-md cursor-pointer opacity-60 hover:opacity-100"
                onClick={handleOpenAddUserToChannelModal}
              >
                <Avatar className="w-11 h-11 rounded-sm">
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
                  key={user.uuid}
                  className="flex items-center gap-4 hover:bg-secondary/50 p-2 rounded-md cursor-pointer"
                  onClick={() => handleOpenUserProfile(user.uuid)}
                >
                  <UserAvatar userId={user.uuid} />
                  <Username userId={user.uuid} />
                  <OnlineStatusIndicator userId={user.uuid} />
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
                  className="text-userMedium p-1"
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

export default observer(Members);
