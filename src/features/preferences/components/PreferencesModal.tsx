import React, { useState } from 'react';
import ThemeTab from './ThemeTab';
import NotificationsTab from './NotificationsTab';
import Modal from '@/components/modal/Modal';

const AccountTab: React.FC = () => <div>Account content...</div>;

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

  const listItem = (tab: PreferenceTabs) => (
    <div
      onClick={() => setActiveTab(tab)}
      className={`${
        tab !== PreferenceTabs.THEMING && 'pointer-events-none opacity-20'
      } h-8 rounded-sm p-0 px-3 w-full text-sm justify-between flex items-center cursor-pointer overflow-hidden font-medium ${
        activeTab === tab
          ? 'bg-active hover:bg-active text-active dark:text-active'
          : 'text-main hover:bg-hover'
      }`}
    >
      {tab}
    </div>
  );

  return (
    <Modal title="Preferences">
      <div className="flex transform transition-all w-max">
        <nav className="space-y-1 border-r border-border pr-4 w-52">
          {listItem(PreferenceTabs.THEMING)}
          {listItem(PreferenceTabs.NOTIFICATIONS)}
          {listItem(PreferenceTabs.ACCOUNT)}
        </nav>

        <div className="flex-1 pl-4 overflow-auto" style={{ width: '32rem', height: '30rem' }}>
          {renderTabContent()}
        </div>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
