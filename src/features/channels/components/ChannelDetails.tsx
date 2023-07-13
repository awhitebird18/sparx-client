import { useStore } from '@/stores/RootStore';
import Modal from '@/components/modal/Modal';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Channel } from '..';
import About from './About';
import Members from './Members';
import Settings from './Settings';

enum Tabs {
  ABOUT = 'about',
  MEMBERS = 'members',
  SETTINGS = 'settings',
}

const tabList = [Tabs.ABOUT, Tabs.MEMBERS, Tabs.SETTINGS];

const ChannelDetails = ({ id }: { id: string }) => {
  const { findById } = useStore('channelStore');
  const [channel, setChannel] = useState<Channel>();
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.ABOUT);

  useEffect(() => {
    const channelFound = findById(id);

    setChannel(channelFound);
  }, [findById, id]);

  const handleClickTab = (name: Tabs) => {
    setCurrentTab(name);
  };
  console.log(channel);

  if (!channel) return;

  return (
    <Modal title={channel.name}>
      <div className="h-fit w-fit">
        <ul className="w-full bg-slate-500 flex border-b border-border">
          {tabList.map((tab: Tabs) => (
            <li
              key={tab}
              className={`flex-1 ${currentTab === tab ? 'outline-b-2 outline-purple-500' : ''}`}
              onClick={() => handleClickTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
        <div className="flex-1 h-[70vh] w-[40vw]">
          {currentTab === Tabs.ABOUT && <About channel={channel} />}
          {currentTab === Tabs.MEMBERS && <Members />}
          {currentTab === Tabs.SETTINGS && <Settings />}
        </div>
      </div>
    </Modal>
  );
};

export default observer(ChannelDetails);
