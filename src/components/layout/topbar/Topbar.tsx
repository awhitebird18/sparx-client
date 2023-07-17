import Search from '@/features/search/components/Search';

import UserDropdown from './UserDropdown';

const Topbar = () => {
  return (
    <div className="h-12 border-b border-border flex items-center justify-between px-4">
      <div />
      <Search />
      <UserDropdown />
    </div>
  );
};

export default Topbar;
