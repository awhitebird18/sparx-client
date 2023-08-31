import { useState } from 'react';
import { PersonAdd, ThreeDotsVertical } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';

import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/ScrollArea';
import SearchInput from '@/components/ui/SearchInput';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import { Channel } from '../types';
import { User } from '@/features/users/types/user';

type MembersProps = { users: User[]; channel: Channel };

const Members = ({ users, channel }: MembersProps) => {
  const [search, setSearch] = useState<string | undefined>('');
  const { findUserByUuid } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');

  const filteredUsers = search
    ? users.filter((user: User) => `${user.firstName} ${user.lastName}}`.includes(search))
    : users;

  const handleOpenUserProfile = (userId: string) => {
    console.info(`Open user profile: ${userId}`);
  };

  const handleOpenAddUserToChannelModal = () => {
    setActiveModal({ type: 'AddUserModal', payload: { channel } });
  };

  const handleOpenRemoveUserFromChannelModal = (user: User) => {
    setActiveModal({ type: 'RemoveUserModal', payload: { channel, user } });
  };

  return (
    <div className="space-y-2 py-1.5 flex-1 flex flex-col h-[550px]">
      <SearchInput value={search} setValue={setSearch} />

      <ScrollArea className="flex overflow-auto">
        {filteredUsers.length ? (
          <>
            <div
              className="flex items-center gap-4 hover:bg-secondary/50 p-2 rounded-md cursor-pointer opacity-60 hover:opacity-100 pr-4 mr-4"
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
            {filteredUsers.map((user: User) => {
              const userFound = findUserByUuid(user.uuid);
              if (!userFound) return null;

              return (
                <div
                  key={user.uuid}
                  className="flex items-center gap-4 hover:bg-secondary/50 p-2 rounded-md cursor-pointer pr-4 mr-4"
                  onClick={() => handleOpenUserProfile(userFound.uuid)}
                >
                  <UserAvatar userId={userFound.uuid} profileImage={userFound.profileImage} />
                  <Username firstName={userFound.firstName} lastName={userFound.lastName} />
                  <OnlineStatusIndicator userId={userFound.uuid} />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="ml-auto">
                      <ThreeDotsVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-60">
                      <DropdownMenuItem className="px-4">
                        {`Message ${user.firstName} ${user.lastName}`}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="px-4 text-rose-500"
                        onClick={() => handleOpenRemoveUserFromChannelModal(user)}
                      >
                        Remove from channel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </>
        ) : (
          <div className="w-full flex justify-center flex-col items-center mt-6 space-y-2 ">
            <p className="text-base">
              No matches found for <span className="font-bold">{search}</span>
            </p>
            <p className="text-sm">
              Not able to find who you are looking for?{' '}
              <Button
                className="text-userDark p-1"
                variant="link"
                onClick={handleOpenAddUserToChannelModal}
              >
                Invtite them
              </Button>
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default observer(Members);
