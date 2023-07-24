import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';
import { useLocation } from 'react-router-dom';

import { Section as SectionType } from '@/features/sections';
import Section from './Section';
import CompanyDropdown from '../topbar/CompanyDropdown';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { At, Pencil, Person, Tv } from 'react-bootstrap-icons';

const Divider = () => <div className="w-100 m-2 h-px border-border border-b" />;

const Sidebar = () => {
  const { organizedChannels, setSelectedId } = useStore('sidebarStore');
  const location = useLocation();

  useEffect(() => {
    setSelectedId(location.pathname.replace('/app/', ''));
  }, [location.pathname, setSelectedId]);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <CompanyDropdown />
      <ListItem id="users" title="Users" primary icon={<Person size={18} />} />
      <ListItem id="channels" title="Channels" primary icon={<Tv size={16} />} />
      <ListItem id="mentions" title="Mentions" primary icon={<At size={18} />} />
      <ListItem id="drafts" title="Drafts" primary icon={<Pencil size={15} />} />

      <Divider />

      {organizedChannels.map((section: SectionType) => (
        <Section
          key={section.uuid}
          id={section.uuid}
          type={section.type}
          name={section.name}
          channels={section.channels}
          isSystem={section.isSystem}
        />
      ))}
    </div>
  );
};

export default observer(Sidebar);
