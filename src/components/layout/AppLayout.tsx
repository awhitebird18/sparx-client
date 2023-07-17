import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import ModalController from '../modal/ModalController';

export const AppLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <Suspense fallback={<div />}>
        <div className="flex flex-col flex-1">
          <Topbar />
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </Suspense>

      <ModalController />
    </div>
  );
};
