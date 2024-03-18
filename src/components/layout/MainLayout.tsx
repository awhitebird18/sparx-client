import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import ModalController from '../modal/ModalController';
import ResizableSidebar from './sidebar/ResizeableSidebar';

import SocketController from '@/sockets/SocketController';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentUser } = useStore('userStore');
  const { isFullscreen } = useStore('channelStore');

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<div />}>
      <DndProvider backend={HTML5Backend}>
        <div className="h-full w-full flex overflow-hidden">
          <ResizableSidebar />
          <div className="flex flex-col h-full w-full bg-background overflow-hidden">
            <Topbar />
            <div
              className={`h-full w-full overflow-hidden ${
                isFullscreen && 'h-screen w-screen fixed left-0 top-0'
              }`}
            >
              {children} {/* This is where Nodemap gets rendered */}
            </div>
          </div>
          <SocketController />
          <ModalController />
        </div>
      </DndProvider>
    </Suspense>
  );
};

export default observer(MainLayout);
