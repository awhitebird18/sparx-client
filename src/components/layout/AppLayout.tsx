import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import WorkspaceBar from '@/components/layout/spacesbar/Spacesbar';
import ModalController from '../modal/ModalController';

export const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <WorkspaceBar />
        <Sidebar />
        <Suspense fallback={<div />}>
          <div className="w-full overflow-hidden">
            <Outlet />
          </div>
        </Suspense>
      </div>
      <ModalController />
    </div>
  );
};
