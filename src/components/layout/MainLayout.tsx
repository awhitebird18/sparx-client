import { Suspense, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';

import Topbar from '@/components/layout/topbar/Topbar';
import ModalController from '../modal/ModalController';

import SocketController from '@/sockets/SocketController';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SidePanel from './SidePanel.tsx/SidePanel';
import MainPanel from './sheet/MainPanel';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentUser } = useStore('userStore');
  const { setRef } = useStore('sidebarStore');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    setRef(ref);
  }, [ref, setRef]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<div />}>
      <DndProvider backend={HTML5Backend}>
        <div ref={ref} className="h-full w-full flex overflow-hidden relative">
          <div className="flex flex-col h-full w-full bg-background overflow-hidden">
            <Topbar />
            <div className={`main-layout relative h-full overflow-hidden w-full `}>
              {children}

              <MainPanel />
              <SidePanel />
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
