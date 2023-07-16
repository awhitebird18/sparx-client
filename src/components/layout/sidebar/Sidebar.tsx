import { Tv, People, At, Files } from 'react-bootstrap-icons';

import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';

import { Section as SectionType } from '@/features/sections';
import Section from './Section';
import { observer } from 'mobx-react-lite';

const Divider = () => <div className="w-100 m-2 h-px border-border border-b" />;

const Sidebar = () => {
  const { organizedChannels } = useStore('sidebarStore');

  return (
    <div className="border-border border-r flex flex-col py-2 max-w-[14rem] w-full">
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
