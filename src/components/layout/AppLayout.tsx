import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import ModalController from '../modal/ModalController';
import ResizableSidebar from './sidebar/ResizeableSidebar';

export const AppLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <ResizableSidebar />
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
