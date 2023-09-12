import { useEffect, useState } from 'react';
import { ChevronBarExpand, X } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';

import Modal from '@/components/modal/Modal';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import UserAvatar from '@/features/users/components/UserAvatar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/Command';
import { getChannelUsers } from '@/features/channels/api/getChannelUsers';

import { Channel } from '@/features/channels/types';
import { User } from '@/features/users/types/user';
import { observer } from 'mobx-react-lite';

type AddUserModalProps = {
  channel: Channel;
};

const AddUserModal = ({ channel }: AddUserModalProps) => {
  const { users, findBot, currentUser } = useStore('userStore');
  const { createMessageApi, formatAutomatedMessage } = useStore('messageStore');
  const { inviteUsersToChannelApi } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [inviteList, setInviteList] = useState<User[]>([]);
  const [channelUsers, setChannelUsers] = useState<string[]>([]);

  useEffect(() => {
    const fn = async () => {
      const users = await getChannelUsers(channel.uuid);
      if (!users) return;

      setChannelUsers(users);
    };

    fn();
  }, [channel.uuid]);

  const handleAddUserToInviteList = (user: User) => {
    setInviteList((prev: User[]) => [...prev, user]);
  };

  const handleRemoveUserFromInviteList = (userId: string) => {
    setInviteList((prev: User[]) => prev.filter((user: User) => user.uuid !== userId));
  };

  const handleCancelInvite = () => {
    setActiveModal(null);
  };

  const handleInviteUsers = async () => {
    if (!inviteList.length) return;

    await inviteUsersToChannelApi(channel.uuid, inviteList);

    setActiveModal(null);

    const bot = findBot();
    if (!bot || !currentUser) return;

    const formattedMessage = formatAutomatedMessage({
      userId: bot.uuid,
      channelId: channel.uuid,
      content: `${inviteList
        .map((user: User) => `${user.firstName} ${user.lastName}`)
        .join(', ')} ${inviteList.length > 1 ? 'have' : 'has'} been invited to the channel by ${
        currentUser.firstName
      } ${currentUser.lastName}.`,
    });

    await createMessageApi(formattedMessage);
  };

  const unsubscribedUsers = users.filter(
    (user: User) =>
      !channelUsers.find((userId: string) => userId === user.uuid) &&
      !inviteList.find((invitedUser: User) => invitedUser.uuid === user.uuid),
  );

  return (
    <Modal title={`Add users to ${channel.name}`}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-10 h-96">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="justify-between w-56">
                Select User
                <ChevronBarExpand className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandEmpty>No users found.</CommandEmpty>
                <CommandGroup>
                  {unsubscribedUsers
                    .filter((user: User) => user.uuid !== currentUser?.uuid)
                    .map((user: User) => (
                      <CommandItem
                        key={user.uuid}
                        onSelect={(currentValue) => {
                          setSearchValue(currentValue === searchValue ? '' : currentValue);
                          handleAddUserToInviteList(user);
                          setOpen(false);
                        }}
                        className="gap-2 bg-transparent"
                      >
                        <UserAvatar userId={user.uuid} profileImage={user.profileImage} size={24} />
                        {`${user.firstName} ${user.lastName}`}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex flex-col h-full">
            <p className="h-12 leading-10 text-lg px-1 font-semibold">Users to invite</p>
            <ul className="flex flex-col h-full overflow-auto w-72">
              {inviteList.length ? (
                inviteList.map((user: User) => (
                  <li
                    className="flex justify-between p-0 h-10 px-2 rounded-lg hover:bg-secondary/50 items-center cursor-pointer gap-1"
                    onClick={() => handleRemoveUserFromInviteList(user.uuid)}
                  >
                    <div className="flex items-center gap-2">
                      <UserAvatar userId={user.uuid} profileImage={user.profileImage} size={28} />
                      {`${user.firstName} ${user.lastName}`}
                    </div>
                    <X size={24} />
                  </li>
                ))
              ) : (
                <span className="p-1 mt-2 text-muted-foreground">No users added</span>
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancelInvite} type="button">
            Cancel
          </Button>
          <Button onClick={handleInviteUsers} type="submit">
            Invite Users
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(AddUserModal);
