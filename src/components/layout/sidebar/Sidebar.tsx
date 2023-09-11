import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { observer } from 'mobx-react-lite';

import { Section as ChannelType } from '@/features/sections/types';
import Section from './Section';
import CompanyDropdown from '../topbar/CompanyDropdown';
import { useEffect } from 'react';
import { ChatLeftDots, Person, Tv } from 'react-bootstrap-icons';

const Divider = () => <div className="w-100 mx-4 border-border border-b" />;

const Sidebar = () => {
  const { setSelectedId } = useStore('sidebarStore');
  const { sections } = useStore('sectionStore');
  const { setCurrentChannelUuid } = useStore('channelStore');
  const location = useLocation();

  useEffect(() => {
    const primaryView = location.pathname.replace('/app/', '');
    setSelectedId(primaryView);
  }, [location.pathname, setCurrentChannelUuid, setSelectedId]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col w-full overflow-hidden h-full">
        <div className="w-full">
          <CompanyDropdown />
        </div>
        <div className="p-2">
          <ListItem id="users" title="Users" primary icon={<Person size={18} />} />
          <ListItem id="channels" title="Channels" primary icon={<Tv size={16} />} />
          <ListItem id="threads" title="Threads" primary icon={<ChatLeftDots size={15} />} />
        </div>
        <Divider />
        <div className="p-2 overflow-auto flex flex-col">
          {sections.slice().map((section: ChannelType, index: number) => (
            <Section key={section.uuid} section={section} index={index} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default observer(Sidebar);
