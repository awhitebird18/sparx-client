import UserDropdown from './UserDropdown';
import { observer } from 'mobx-react-lite';
import CurrentNode from './CurrentNode';
import { Button } from '@/components/ui/Button';
import { LayoutTextSidebarReverse, QuestionCircle } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';

const Topbar = () => {
  const { setActiveModal } = useStore('modalStore');
  const { sidebarOpen, toggleSidebar } = useStore('sidebarStore');

  const showShortcutModal = () => {
    setActiveModal({ type: 'ShortcutMenu', payload: null });
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 gap-6 flex-shrink-0 border-b border-border">
      <div className="flex items-center gap-2 hover:bg-transparent h-12 cursor-pointer prose w-1/2">
        {!sidebarOpen && (
          <Button
            className="card flex-shrink-0 p-0.5"
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
          >
            <LayoutTextSidebarReverse size={18} />
          </Button>
        )}
        <CurrentNode />
        {/* <h3 className="text-main leading-none">Members</h3>
        <p className="whitespace-nowrap text-secondary">Javascript / Arrays</p> */}
      </div>

      <div className="flex justify-end items-center gap-2 w-1/2">
        <Button variant="ghost" className="w-8 h-8 p-0" onClick={showShortcutModal}>
          <QuestionCircle className="thick-icon" />
        </Button>
        <UserDropdown />
      </div>
    </div>
  );
};

export default observer(Topbar);
