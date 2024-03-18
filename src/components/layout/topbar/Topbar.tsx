import UserDropdown from './UserDropdown';
import { observer } from 'mobx-react-lite';
import CurrentNode from './CurrentNode';
import { Button } from '@/components/ui/Button';
import { QuestionCircle } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';

const Topbar = () => {
  const { setActiveModal } = useStore('modalStore');

  const showShortcutModal = () => {
    setActiveModal({ type: 'ShortcutMenu', payload: null });
  };

  return (
    <div className="h-16 flex items-center justify-between px-6 gap-6 flex-shrink-0 border-b border-border">
      <div className="flex items-center gap-4 hover:bg-transparent h-12 cursor-pointer prose">
        <CurrentNode />
        {/* <h3 className="text-main leading-none">Members</h3>
        <p className="whitespace-nowrap text-secondary">Javascript / Arrays</p> */}
      </div>

      <div className="w-full flex justify-end items-center gap-2">
        <Button variant="ghost" className="w-8 h-8 p-0" onClick={showShortcutModal}>
          <QuestionCircle className="thick-icon" />
        </Button>
        <UserDropdown />
      </div>
    </div>
  );
};

export default observer(Topbar);
