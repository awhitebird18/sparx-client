import Search from '@/features/search/components/Search';

import UserDropdown from './UserDropdown';
import ComapnyDropdown from './CompanyDropdown';

const Topbar = () => {
  return (
    <div className="h-12 min-h-[h-12] max-h-[h-12] border-b border-border flex items-center justify-between gap-12 px-3">
      <ComapnyDropdown />
      <Search />
      <UserDropdown />
    </div>
  );
};

export default Topbar;
