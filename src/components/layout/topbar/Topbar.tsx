import Search from '@/features/search/components/Search';
import UserDropdown from './UserDropdown';
import { observer } from 'mobx-react-lite';
import HistoryDropdown from '@/features/history/components/HistoryDropdown';
import Logo from '@/components/logo/Logo';

const Topbar = () => {
  return (
    <div className="h-12 border-b border-border flex items-center justify-between px-6 gap-6 bg-neutral-800 dark:bg-hover">
      <div className="flex gap-1.5 hover:bg-transparent h-12 cursor-pointer items-center">
        <Logo size={5} />
        <h1 className="font-bold flex-grow-1 whitespace-nowrap text-xl text-white">SPARX</h1>
      </div>

      <div className="flex items-center gap-1 max-w-xl w-full">
        <HistoryDropdown />
        <Search />
      </div>
      <UserDropdown />
    </div>
  );
};

export default observer(Topbar);
