import {
  TvFill,
  PeopleFill,
  At,
  Files,
  MegaphoneFill,
  BugFill,
  ArrowDown,
} from 'react-bootstrap-icons';
import Section from './Section';

import ListItem from './ListItem';
import { useStore } from '@/stores/stores';
import { User } from '@/features/users';

const Divider = () => <div className="w-100 m-4 h-px border-border border-b" />;

interface Channel {
  uuid: string;
  name: string;
  image?: string | JSX.Element;
}

interface Section {
  uuid: string;
  name: string;
  channels: Channel[];
}

const Sidebar = () => {
  const { users } = useStore('userStore');
  const sections = [
    {
      uuid: '1',
      name: 'Direct Messages',
      channels: users.map((user: User) => ({
        uuid: user.uuid,
        name: user.displayName,
        image: user.image,
      })),
    },
    {
      uuid: '2',
      name: 'Channels',
      channels: [
        {
          uuid: '4',
          name: 'Announcements',
          image: <MegaphoneFill />,
        },
        {
          uuid: '5',
          name: 'Bug Reporting',
          image: <BugFill />,
        },
        { uuid: '6', name: 'App Updates', image: <ArrowDown /> },
      ],
    },
  ];

  return (
    <div className="border-border border-r flex flex-col py-2 max-w-[14rem] w-full">
      <ListItem uuid="users" title="Users" src={<PeopleFill />} />
      <ListItem uuid="channels" title="Channels" src={<TvFill />} />
      <ListItem uuid="mentions" title="Mentions" src={<At />} />
      <ListItem uuid="drafts" title="Drafts" src={<Files />} />
      <Divider />

      {sections.map((section: Section, index: number) => (
        <>
          <Section uuid={section.uuid} name={section.name} channels={section.channels} />

          {index !== sections.length - 1 && <Divider />}
        </>
      ))}
    </div>
  );
};

export default Sidebar;
