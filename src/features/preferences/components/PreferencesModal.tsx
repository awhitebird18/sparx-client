// src/Preferences.tsx

import { Button } from '@/components/ui/Button';
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

  return (
    <Modal title="Preferences">
      <div className="flex transform transition-all sm:w-full h-96 max-h-screen">
        <nav className="space-y-1 border-r border-border pr-2 sm:w-52 w-32">
          <Button
            variant="ghost"
            onClick={() => setActiveTab(PreferenceTabs.THEMING)}
            className={`text-gray-700 py-0 px-1 h-8 block w-full text-left ${
              activeTab === PreferenceTabs.THEMING ? 'bg-muted text-primary' : ''
            }`}
          >
            Theming
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab(PreferenceTabs.NOTIFICATIONS)}
            className={`text-gray-700 py-0 px-1 h-8 block w-full text-left ${
              activeTab === PreferenceTabs.NOTIFICATIONS ? 'bg-hover' : ''
            }`}
          >
            Notifications
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab(PreferenceTabs.ACCOUNT)}
            className={`text-gray-700 py-0 px-1 h-8 block w-full text-left ${
              activeTab === PreferenceTabs.ACCOUNT ? 'bg-hover' : ''
            }`}
          >
            Account
          </Button>
        </nav>

        <div className="flex-1 pl-4 w-96 h-100">{renderTabContent()}</div>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
