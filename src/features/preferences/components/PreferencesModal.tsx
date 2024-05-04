import React, { ReactNode, useState } from 'react';
import ThemeTab from './ThemeTab';
import Modal from '@/layout/modal/Modal';
import { Bell, Gear, Heart } from 'react-bootstrap-icons';
import { PreferenceTabs } from '../enums/preferenceTabs';

const PreferencesModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PreferenceTabs.THEMING);

  const renderTabContent = () => {
    switch (activeTab) {
      case PreferenceTabs.THEMING:
        return <ThemeTab />;
      default:
        return null;
    }
  };

  const listItem = (icon: ReactNode, tab: PreferenceTabs) => (
    <div
      onClick={() => setActiveTab(tab)}
      className={`card h-9 prose dark:prose-invert rounded-md p-0 px-3 w-full hover:bg-hover text-sm text-main gap-2 flex items-center cursor-pointer overflow-hidden font-medium ${
        activeTab === tab ? 'bg-hover' : ''
      } ${tab !== PreferenceTabs.THEMING && 'pointer-events-none opacity-30'} `}
    >
      <span className="w-6 text-base">{icon}</span>

      <p className="leading-none mb-0.5">{tab}</p>
    </div>
  );

  return (
    <Modal title="Preferences" disablePadding className="flex transform transition-all w-max">
      <nav className="space-y-2 border-r border-border p-3 w-64">
        {listItem(<Heart />, PreferenceTabs.THEMING)}
        {listItem(<Bell />, PreferenceTabs.NOTIFICATIONS)}
        {listItem(<Gear />, PreferenceTabs.ACCOUNT)}
      </nav>

      <div className="flex-1 p-10 overflow-auto w-[40rem] h-[34rem]">{renderTabContent()}</div>
    </Modal>
  );
};

export default PreferencesModal;
