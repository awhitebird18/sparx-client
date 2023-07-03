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

const Divider = () => <div className="w-100 m-4 h-px border-border border-b" />;

interface Channel {
  id: string;
  name: string;
  image?: string | JSX.Element;
}

interface Section {
  id: string;
  name: string;
  channels: Channel[];
}

const Sidebar = () => {
  const sections = [
    {
      id: '1',
      name: 'Direct Messages',
      channels: [
        { id: '1', name: 'Shanu Shanu', image: '/images/profile-image-1.png' },
        {
          id: '2',
          name: 'Danika Jones',
          image: '/images/profile-image-2.png',
        },
        { id: '3', name: 'Eric Black', image: '/images/profile-image-3.png' },
      ],
    },
    {
      id: '2',
      name: 'Channels',
      channels: [
        {
          id: '4',
          name: 'Announcements',
          image: <MegaphoneFill />,
        },
        {
          id: '5',
          name: 'Bug Reporting',
          image: <BugFill />,
        },
        { id: '6', name: 'App Updates', image: <ArrowDown /> },
      ],
    },
  ];

  return (
    <div className="border-border border-r flex flex-col py-2 max-w-[14rem] w-full">
      <ListItem id="users" title="Users" src={<PeopleFill />} />
      <ListItem id="channels" title="Channels" src={<TvFill />} />
      <ListItem id="mentions" title="Mentions" src={<At />} />
      <ListItem id="drafts" title="Drafts" src={<Files />} />
      <Divider />

      {sections.map((section: Section, index: number) => (
        <>
          <Section id={section.id} name={section.name} channels={section.channels} />

          {index !== sections.length - 1 && <Divider />}
        </>
      ))}
    </div>
  );
};

export default Sidebar;
