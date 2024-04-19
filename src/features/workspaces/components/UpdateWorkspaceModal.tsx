import Modal from '@/layout/modal/Modal';
import { useState } from 'react';
import General from './General';
import { Bell, Gear, Heart } from 'react-bootstrap-icons';
import { PreferenceTabs } from '../types/preferenceTabs';
import ListItem from './ListItem';

const UpdateWorkspaceModal = () => {
  const [activeTab, setActiveTab] = useState(PreferenceTabs.GENERAL);

  const renderTabContent = () => {
    switch (activeTab) {
      case PreferenceTabs.GENERAL:
        return <General />;
      case PreferenceTabs.NOTIFICATIONS:
        return <General />;
      case PreferenceTabs.ACCOUNT:
        return <General />;
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
