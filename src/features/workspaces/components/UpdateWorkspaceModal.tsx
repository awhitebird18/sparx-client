import { observer } from 'mobx-react-lite';

import Modal from '@/components/modal/Modal';
import { useState } from 'react';
import General from './General';
import { Bell, Gear, Heart } from 'react-bootstrap-icons';

enum PreferenceTabs {
  GENERAL = 'Theming',
  NOTIFICATIONS = 'Notifications',
  ACCOUNT = 'Account',
}

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

  const listItem = (icon: any, tab: PreferenceTabs, disabled?: boolean) => (
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

  return (
    <Modal title="Workspace settings" disablePadding>
      <div className="card flex transform transition-all w-max h-[36rem]">
        <nav className="space-y-2 border-r border-border py-6 w-44 lg:w-64">
          {listItem(<Heart />, PreferenceTabs.GENERAL)}
          {listItem(<Bell />, PreferenceTabs.NOTIFICATIONS, true)}
          {listItem(<Gear />, PreferenceTabs.ACCOUNT, true)}
        </nav>

        <div className="flex-1 p-6 h-full overflow-hidden w-[40rem]">{renderTabContent()}</div>
      </div>
    </Modal>
  );
};

export default observer(UpdateWorkspaceModal);
