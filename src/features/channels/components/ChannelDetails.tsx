import { observer } from 'mobx-react-lite';
import { Bell, Check, ChevronDown, Hash, Lock } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';

import { ChannelType } from '../enums/channelType';

import channelApi from '../api';

import Modal from '@/components/modal/Modal';
import About from './About';
import Members from './Members';
import Settings from './Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import ChannelIcon from './ChannelIcon';
import { useEffect, useRef, useState } from 'react';
import { User } from '@/features/users/types';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';

const ChannelDetails = ({ id, defaultTab }: { id: string; defaultTab?: string }) => {
  const { getChannelByUuid, fetchChannelUserIdsApi, updateChannelApi } = useStore('channelStore');
  const { findUserByUuid, findUserByName } = useStore('userStore');
  const [channelUserIds, setChannelUserIds] = useState<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = async () => {
      const userIds = await channelApi.getChannelUsers(id);

      setChannelUserIds(userIds);
    };

    fn();
  }, [fetchChannelUserIdsApi, id]);

  const channel = getChannelByUuid(id);
  if (!channel) return null;
  const channelIsDirect = channel.type === ChannelType.DIRECT;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      updateChannelApi(id, { icon: imageBase64 });
    };

    reader.readAsDataURL(file);
  };

  const channelUsers = channelUserIds
    .map((el: string) => findUserByUuid(el))
    .filter((user: User | undefined): user is User => user !== undefined) as User[];

  let channelIcon = channel?.icon;

  if (channel?.type === ChannelType.DIRECT) {
    const user = findUserByName(channel.name);
    if (!user) return;
    channelIcon = user.profileImage;
  }

  if (channelIcon) {
    channelIcon = transformCloudinaryUrl(channelIcon, 60, 60);
  }

  return (
    <Modal
      title={
        <div className="flex gap-4 items-center mb-2">
          <Button
            variant="ghost"
            className={`text-primary-dark cursor-pointer flex justify-start h-auto gap-3 items-start h-18 p-0 ${
              channelIsDirect && 'pointer-events-none'
            }`}
            onClick={() => {
              if (channelIsDirect) return;
              fileInput.current?.click();
            }}
          >
            <ChannelIcon
              imageUrl={channelIcon}
              size={50}
              isSelected
              isPrivate={channel.isPrivate}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleSelectImage}
            />
          </Button>
          <div className="flex flex-col h-18 gap-1 h-12">
            <div className="flex gap-1 items-center">
              <p className="text-2xl leading-none">{channel.name}</p>
              <Lock size={17} className="mt-0.5" />
            </div>

            <p className="text-emerald-500 text-sm flex it8ems-center">
              Joined <Check size={18} />
            </p>
          </div>
        </div>
      }
    >
      <>
        <div className="flex gap-3">
          <Button className="h-7 w-12 gap-1 p-0">
            <Hash className="" />
            <ChevronDown className="text-xs" />
          </Button>
          <Button className="px-2 justify-start text-xs h-7 gap-2">
            <Bell />
            Get Notifications for All Messages <ChevronDown className="text-xs" />
          </Button>
        </div>
        <Tabs
          defaultValue={defaultTab || 'about'}
          className="flex flex-col flex-1 h-[65vh] w-[45vw]"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            {channel.type !== ChannelType.DIRECT && (
              <>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </>
            )}
          </TabsList>
          <TabsContent value="about" className="h-full">
            <About channel={channel} />
          </TabsContent>
          <TabsContent value="members" className="h-full">
            <Members users={channelUsers} channel={channel} />
          </TabsContent>
          <TabsContent value="settings" className="h-full">
            <Settings channel={channel} />
          </TabsContent>
        </Tabs>
      </>
    </Modal>
  );
};

export default observer(ChannelDetails);
