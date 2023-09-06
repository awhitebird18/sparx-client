import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import ModalController from '../modal/ModalController';
import ResizableSidebar from './sidebar/ResizeableSidebar';

import SocketController from '@/sockets/SocketController';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentUser } = useStore('userStore');

  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="h-screen flex overflow-hidden">
      <ResizableSidebar />
      <Suspense fallback={<div />}>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </Suspense>
      <SocketController />
      <ModalController />
    </div>
  );
};

export default observer(MainLayout);
