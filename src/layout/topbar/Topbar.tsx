import { observer } from 'mobx-react-lite';
import CompanyDropdown from './CompanyDropdown';
import CurrentNode from './CurrentNode';
import NavigationBar from './NavigationBar';

const Topbar = observer(() => {
  return (
    <>
      <CompanyDropdown />
      <CurrentNode />
      <NavigationBar />
    </>
  );
});

export default Topbar;
