import { Tv, People, At, Files } from 'react-bootstrap-icons';

import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';

import { Section as SectionType } from '@/features/sections';
import Section from './Section';
import CompanyDropdown from '../topbar/CompanyDropdown';
import { observer } from 'mobx-react-lite';

const Divider = () => <div className="w-100 m-2 h-px border-border border-b" />;

const Sidebar = () => {
  const { organizedChannels } = useStore('sidebarStore');

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <CompanyDropdown />
      <ListItem id="users" title="Users" icon={<People />} primary />
      <ListItem id="channels" title="Channels" icon={<Tv />} primary />
      <ListItem id="mentions" title="Mentions" icon={<At />} primary />
      <ListItem id="drafts" title="Drafts" icon={<Files />} primary />

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
