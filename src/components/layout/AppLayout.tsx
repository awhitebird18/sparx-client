import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import WorkspaceBar from '@/components/layout/spacesbar/Spacesbar';
import { useAuth } from '@/providers/auth';
import { isUser } from '@/utils/isUser';
import Modal from '../modal/Modal';

export const AppLayout = () => {
  const { currentUser } = useAuth();

  if (!isUser(currentUser)) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <WorkspaceBar />
        <Sidebar />
        <Suspense fallback={<div />}>
          <div className="w-full p-4">
            <Outlet />
          </div>
        </Suspense>
      </div>
      <Modal />
    </div>
  );
};
