import { TvFill, PeopleFill, At, Files } from 'react-bootstrap-icons';

import ListItem from './ListItem';
import { useStore } from '@/stores/stores';
import { useEffect } from 'react';

import { Section as SectionType } from '@/features/sections';
import Section from './Section';
import { observer } from 'mobx-react-lite';

const Divider = () => <div className="w-100 m-2 h-px border-border border-b" />;

const Sidebar = () => {
  const { isLoading, sections, fetchsections } = useStore('sectionStore');

  useEffect(() => {
    fetchsections();
  }, [fetchsections]);

  if (isLoading) return null;

  return (
    <div className="border-border border-r flex flex-col py-2 max-w-[14rem] w-full">
      <ListItem uuid="users" title="Users" src={<PeopleFill />} />
      <ListItem uuid="channels" title="Channels" src={<TvFill />} />
      <ListItem uuid="mentions" title="Mentions" src={<At />} />
      <ListItem uuid="drafts" title="Drafts" src={<Files />} />
      <Divider />

      {sections.map((section: SectionType) => (
        <Section key={section.uuid} uuid={section.uuid} name={section.name} channels={[]} />
      ))}
    </div>
  );
};

export default observer(Sidebar);
