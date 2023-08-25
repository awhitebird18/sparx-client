import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Section as SectionType } from '@/features/sections/types';
import Section from './Section';
import CompanyDropdown from '../topbar/CompanyDropdown';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { At, Pencil, Person, Tv } from 'react-bootstrap-icons';

const Divider = () => <div className="w-100 h-px border-border border-b" />;

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
      <div className="flex flex-col w-full overflow-hidden">
        <CompanyDropdown />
        <div className="m-2">
          <ListItem id="users" title="Users" primary icon={<Person size={18} />} />
          <ListItem id="channels" title="Channels" primary icon={<Tv size={16} />} />
          <ListItem id="mentions" title="Mentions" primary icon={<At size={18} />} />
          <ListItem id="drafts" title="Drafts" primary icon={<Pencil size={15} />} />
        </div>
        <Divider />
        <div className="m-2">
          {sections.map((section: SectionType) => (
            <Section section={section} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default observer(Sidebar);
