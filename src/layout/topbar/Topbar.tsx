import { observer } from 'mobx-react-lite';
import CompanyDropdown from './CompanyDropdown';
import HistoryDropdown from '@/features/history/components/HistoryDropdown';
import NavigationBar from './NavigationBar';
import { HistoryStoreProvider } from '@/features/history/providers/historyStoreProvider';

const Topbar = observer(() => {
  return (
    <>
      <CompanyDropdown />

      <HistoryStoreProvider>
        <HistoryDropdown />
      </HistoryStoreProvider>

      <NavigationBar />
    </>
  );
});

export default Topbar;
