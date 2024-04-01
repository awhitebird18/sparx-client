import React, { useState } from 'react';
import ThemeTab from './ThemeTab';
import NotificationsTab from './NotificationsTab';
import Modal from '@/components/modal/Modal';
import AccountTab from './AccountTab';
import { Bell, Gear, Heart } from 'react-bootstrap-icons';

enum PreferenceTabs {
  THEMING = 'Theming',
  NOTIFICATIONS = 'Notifications',
  ACCOUNT = 'Account',
}

const PreferencesModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PreferenceTabs.THEMING);

  const renderTabContent = () => {
    switch (activeTab) {
      case PreferenceTabs.THEMING:
        return <ThemeTab />;
      case PreferenceTabs.NOTIFICATIONS:
        return <NotificationsTab />;
      case PreferenceTabs.ACCOUNT:
        return <AccountTab />;
      default:
        return null;
    }
  };

  const listItem = (icon: any, tab: PreferenceTabs) => (
    <div
      onClick={() => setActiveTab(tab)}
      className={`card h-9 rounded-md p-0 px-3 w-full hover:bg-hover text-sm text-main flex items-center cursor-pointer overflow-hidden font-medium ${
        activeTab === tab ? 'bg-hover' : ''
      } ${tab !== PreferenceTabs.THEMING && 'pointer-events-none opacity-30'} `}
    >
      <span className="w-6 text-base ">{icon}</span>
      {tab}
    </div>
  );

  return (
    <Modal title="Preferences" disablePadding>
      <div className="flex transform transition-all w-max">
        <nav className="space-y-2 border-r border-border p-6 w-64">
          {listItem(<Heart />, PreferenceTabs.THEMING)}
          {listItem(<Bell />, PreferenceTabs.NOTIFICATIONS)}
          {listItem(<Gear />, PreferenceTabs.ACCOUNT)}
        </nav>

        <div className="flex-1 p-10 overflow-auto w-[40rem] h-[34rem]">{renderTabContent()}</div>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
