import Search from '@/features/search/components/Search';
import UserDropdown from './UserDropdown';
import { LayoutTextSidebarReverse } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import HistoryDropdown from '@/features/history/components/HistoryDropdown';

const Topbar = () => {
  const { sidebarWidth, setSidebarWidth } = useStore('sidebarStore');

  const handleShowSidebar = () => {
    setSidebarWidth(250);
  };

  return (
    <div className="h-14 border-b border-border flex items-center justify-between pr-4 pl-3 gap-6">
      {!sidebarWidth ? (
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="ghost" onClick={handleShowSidebar}>
              <LayoutTextSidebarReverse className="text-xl" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" align="start">
            Show sidebar
          </TooltipContent>
        </Tooltip>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-1 max-w-xl w-full">
        <HistoryDropdown />
        <Search />
      </div>
      <UserDropdown />
    </div>
  );
};

export default observer(Topbar);
