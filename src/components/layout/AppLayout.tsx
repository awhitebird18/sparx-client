import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import ModalController from '../modal/ModalController';
import ResizableSidebar from './sidebar/ResizeableSidebar';

import SocketController from '@/sockets/SocketController';
import { useAuth } from '@/providers/auth';

export const AppLayout = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <ResizableSidebar />
      <Suspense fallback={<div />}>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-hidden">
            <Outlet />
          </div>
        </div>
      </Suspense>
      <SocketController />
      <ModalController />
    </div>
  );
};
