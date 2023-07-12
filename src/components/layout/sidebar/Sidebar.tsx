import { TvFill, PeopleFill, At, Files } from 'react-bootstrap-icons';

import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';
import { useEffect } from 'react';

import { Section as SectionType } from '@/features/sections';
import Section from './Section';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const Divider = () => <div className="w-100 m-2 h-px border-border border-b" />;

const Sidebar = () => {
  const { isLoading, sections, fetchsections } = useStore('sectionStore');

  const navigate = useNavigate();

  useEffect(() => {
    fetchsections();
  }, [fetchsections]);

  return (
    <div className="border-border border-r flex flex-col py-2 max-w-[14rem] w-full">
      <ListItem title="Users" icon={<PeopleFill />} onClick={() => navigate('users')} primary />
      <ListItem title="Channels" icon={<TvFill />} onClick={() => navigate('channels')} primary />
      <ListItem title="Mentions" icon={<At />} onClick={() => navigate('mentions')} primary />
      <ListItem title="Drafts" icon={<Files />} onClick={() => navigate('drafts')} primary />

      <Divider />

      {!isLoading &&
        sections.map((section: SectionType) => (
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
