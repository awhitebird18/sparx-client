import Modal from '@/layout/modal/Modal';
import { ReactNode, useState } from 'react';
import WorkspaceOverview from './WorkspaceOverview';
import { Bell, Gear, Heart } from 'react-bootstrap-icons';
import { PreferenceTabs } from '../types/preferenceTabs';

const UpdateWorkspaceModal = () => {
  const [activeTab, setActiveTab] = useState(PreferenceTabs.GENERAL);

  const renderTabContent = () => {
    switch (activeTab) {
      case PreferenceTabs.GENERAL:
        return <WorkspaceOverview />;
      case PreferenceTabs.NOTIFICATIONS:
        return null;
      case PreferenceTabs.ACCOUNT:
        return null;
      default:
        return null;
    }
  };

  return (
    <Modal title="Workspace settings" disablePadding>
      <div className="card flex transform transition-all w-max h-[36rem]">
        <nav className="space-y-2 border-r border-border py-6 w-44 lg:w-64">
          <ListItem
            icon={<Heart />}
            tab={PreferenceTabs.GENERAL}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <ListItem
            icon={<Bell />}
            tab={PreferenceTabs.NOTIFICATIONS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            disabled
          />

          <ListItem
            icon={<Gear />}
            tab={PreferenceTabs.ACCOUNT}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            disabled
          />
        </nav>

        <div className="flex-1 p-6 h-full overflow-hidden w-[40rem]">{renderTabContent()}</div>
      </div>
    </Modal>
  );
};

export default UpdateWorkspaceModal;

type ListItemProps = {
  icon: ReactNode;
  tab: PreferenceTabs;
  disabled?: boolean;
  activeTab: PreferenceTabs;
  setActiveTab: (preference: PreferenceTabs) => void;
};

const ListItem = ({ icon, tab, disabled, activeTab, setActiveTab }: ListItemProps) => (
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
