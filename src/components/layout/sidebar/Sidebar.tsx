import ListItem from './ListItem';
import { useStore } from '@/stores/RootStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Section as ChannelType } from '@/features/sections/types';
import Section from './Section';
import CompanyDropdown from './CompanyDropdown';
import { useEffect } from 'react';
import {
  ChatLeftDots,
  Person,
  Map,
  House,
  ChevronRight,
  CardHeading,
  Pencil,
  Search,
  ChevronDoubleLeft,
} from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const Divider = () => <div className="w-100 mx-4 border-border border-b my-2" />;

const Sidebar = () => {
  const { setSelectedId, sidebarOpen, toggleSidebar } = useStore('sidebarStore');
  const { sections } = useStore('sectionStore');
  const { setCurrentChannelUuid } = useStore('channelStore');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/app/search');
  };

  useEffect(() => {
    const primaryView = location.pathname.replace('/app/', '');
    setSelectedId(primaryView);
  }, [location.pathname, setCurrentChannelUuid, setSelectedId]);

  const nodeListItems = [
    { id: 'notes', name: 'Notes', icon: <Pencil size={15} /> },
    {
      id: 'flashcards',
      name: 'Flash Cards',
      icon: <CardHeading size={15} />,
    },
    {
      id: 'discussions',
      name: 'Discussions',
      icon: <ChatLeftDots size={15} />,
    },
    { id: 'members', name: 'Members', icon: <Person size={15} /> },
  ];
  const workspaceListItems = [
    { id: 'home', name: 'Home', icon: <House size={15} /> },
    { id: 'nodemap', name: 'Nodemap', icon: <Map size={15} /> },
    // { id: 'goals', name: 'Goals', icon: <Trophy size={14}  /> },
    // { id: 'feed', name: 'Feed', icon: <People size={14}  /> },
  ];

  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <div className="flex flex-col justify-between w-full overflow-hidden h-full bg-background border-r border-border">
      <div className="w-full">
        <div className="flex items-center justify-between overflow-hidden w-full h-16 pl-3.5 gap-4 relative">
          <CompanyDropdown />

          {sidebarOpen && (
            <Button
              className="card overflow-hidden flex-shrink-0 absolute top-1/2 right-1 -translate-y-1/2"
              variant="ghost"
              size="icon"
              onClick={handleToggleSidebar}
            >
              <ChevronDoubleLeft size={20} className="text-primary" />
            </Button>
          )}
        </div>

        <div className="pt-2.5 flex flex-col gap-1.5 px-3.5">
          <Button
            className={`h-9 ${
              !sidebarOpen && 'w-9'
            } mb-4 rounded-md px-2.5 gap-2.5 justify-start bg-transparent card text-muted border-border prose overflow-hidden whitespace-nowrap flex-shrink-0`}
            variant="outline"
            onClick={handleSearch}
          >
            <div className="items-center gap-3">
              <Search size={15} className="flex-shrink-0 text-muted mt-0.5 hover:text-secondary" />
            </div>
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <div>Search</div>
                <Badge
                  variant="outline"
                  className="text-xs text-secondary opacity-30 rounded-lg bg-hover dark:bg-hover"
                >
                  Ctrl K
                </Badge>
              </div>
            )}
          </Button>
          {workspaceListItems.map((listItem) => (
            <ListItem
              key={listItem.id}
              id={listItem.id}
              title={listItem.name}
              icon={listItem.icon}
            />
          ))}
          <Divider />
          {nodeListItems.map((listItem) => (
            <ListItem
              key={listItem.id}
              id={listItem.id}
              title={listItem.name}
              icon={listItem.icon}
            />
          ))}
        </div>
        {sidebarOpen && (
          <div className="flex-1 overflow-hidden h-full">
            <Divider />
            <div className=" flex flex-col h-full">
              {sections.map((section: ChannelType) => (
                <Section key={section.uuid} section={section} index={section.orderIndex} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(Sidebar);
