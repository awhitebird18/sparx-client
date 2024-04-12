import UserDropdown from './UserDropdown';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/Button';
import { Bell, House, Map, QuestionCircle } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import CompanyDropdown from '../sidebar/CompanyDropdown';
import { useNavigate } from 'react-router-dom';
import CurrentNode from './CurrentNode';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

const Topbar = () => {
  const { setActiveModal } = useStore('modalStore');
  const { toggleFeedOpen, isFeedOpen } = useStore('sidebarStore');
  const navigate = useNavigate();

  const showShortcutModal = () => {
    setActiveModal({ type: 'ShortcutMenu', payload: null });
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-14 flex items-center bg-background justify-between px-4 gap-6 flex-shrink-0 border-b border-border w-full">
      <div className="flex items-center h-16 w-1/3">
        <div className="overflow-hidden min-w-[2.25rem]">
          <CompanyDropdown />
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 hover:bg-transparent h-12 cursor-pointer prose w-1/3">
        <CurrentNode />
      </div>

      <div className="flex justify-end items-center gap-2.5 w-1/3">
        <Button
          onClick={() => handleNavigate('/app/home')}
          variant="ghost"
          className="w-9 h-9 p-0 rounded-md"
        >
          <House size={18} />
        </Button>
        <Button
          onClick={() => handleNavigate('/app/nodemap')}
          variant="ghost"
          className="w-9 h-9 p-0 rounded-md"
        >
          <Map size={17} />
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={`w-9 h-9 p-0 rounded-md ${isFeedOpen ? 'bg-primary-transparent' : ''}`}
              onClick={() => toggleFeedOpen()}
            >
              <Bell size={19} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>Feed</TooltipContent>
        </Tooltip>
        <Button variant="ghost" className="w-9 h-9 p-0 rounded-md" onClick={showShortcutModal}>
          <QuestionCircle size={19} />
        </Button>

        <UserDropdown />
      </div>
    </div>
  );
};

export default observer(Topbar);
