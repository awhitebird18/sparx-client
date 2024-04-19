import { PreferenceTabs } from '../types/preferenceTabs';

export type Props = {
  icon: any;
  tab: PreferenceTabs;
  disabled?: boolean;
  activeTab: PreferenceTabs;
  setActiveTab: (preference: PreferenceTabs) => void;
};

const ListItem = ({ icon, tab, disabled, activeTab, setActiveTab }: Props) => (
  <div
    onClick={() => setActiveTab(tab)}
    className={`h-9 p-0 px-6 w-full hover:bg-card-hover text-sm text-main flex items-center cursor-pointer overflow-hidden font-medium ${
      activeTab === tab && 'bg-card-hover hover:bg-card-hover'
    } ${disabled && ' opacity-30 pointer-events-none'}`}
  >
    <span className="w-6 text-base">{icon}</span>
    {tab}
  </div>
);

export default ListItem;
