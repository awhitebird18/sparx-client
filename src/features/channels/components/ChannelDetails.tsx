import { useStore } from '@/stores/RootStore';
import Modal from '@/components/modal/Modal';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Channel } from '..';
import About from './About';
import Members from './Members';
import Settings from './Settings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Bell, ChevronDown, Hash } from 'react-bootstrap-icons';

const ChannelDetails = ({ id, defaultTab }: { id: string; defaultTab?: string }) => {
  const { findById } = useStore('channelStore');
  const [channel, setChannel] = useState<Channel>();

  useEffect(() => {
    const channelFound = findById(id);

    setChannel(channelFound);
  }, [findById, id]);

  if (!channel) return;

  return (
    <Modal title={<p className="text-2xl"># {channel.name}</p>}>
      <>
        <div className="flex gap-3">
          <Button className="p-0 text-base text-muted-foreground h-7 w-12 gap-1" variant="outline">
            <Hash className="" />
            <ChevronDown className="text-xs" />
          </Button>
          <Button
            className="px-2 justify-start text-xs text-muted-foreground h-7 gap-2"
            variant="outline"
          >
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
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="h-full">
            <About channel={channel} />
          </TabsContent>
          <TabsContent value="members" className="h-full">
            <Members />
          </TabsContent>
          <TabsContent value="settings" className="h-full">
            <Settings />
          </TabsContent>
        </Tabs>
      </>
    </Modal>
  );
};

export default observer(ChannelDetails);
