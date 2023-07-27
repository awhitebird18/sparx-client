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
      <div
        className="flex transform transition-all sm:w-full"
        style={{ width: '50vw', height: '55vh' }}
      >
        <nav className="space-y-1 border-r border-border pr-4 w-44">
          <Button
            variant="ghost"
            onClick={() => setActiveTab(PreferenceTabs.THEMING)}
            className={`text-secondary-foreground py-0 px-1 h-8 block w-full text-left ${
              activeTab === PreferenceTabs.THEMING
                ? 'bg-userDark text-white hover:bg-userDark hover:text-text-white px-2'
                : ''
            }`}
          >
            Theming
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab(PreferenceTabs.NOTIFICATIONS)}
            className={`text-secondary-foreground py-0 px-1 h-8 block w-full text-left ${
              activeTab === PreferenceTabs.NOTIFICATIONS
                ? 'bg-userDark text-white hover:bg-userDark hover:text-text-white px-2'
                : ''
            }`}
          >
            Notifications
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab(PreferenceTabs.ACCOUNT)}
            className={`text-secondary-foreground py-0 px-1 h-8 block w-full text-left ${
              activeTab === PreferenceTabs.ACCOUNT
                ? 'bg-userDark text-white hover:bg-userDark hover:text-text-white px-2'
                : ''
            }`}
          >
            Account
          </Button>
        </nav>

        <div className="flex-1 px-4 h-96">{renderTabContent()}</div>
      </div>
    </Modal>
  );
};

export default PreferencesModal;
