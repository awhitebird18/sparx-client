import Topbar from '@/layout/topbar/Topbar';
import ModalController from '@/layout/modal/ModalController';
import SocketController from '@/sockets/SocketController';
import { observer } from 'mobx-react-lite';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SidePanel } from '../sidePanel/SidePanel';
import { MainPanel } from '../mainPanel/MainPanel';
import { TaskStoreProvider } from '@/features/tasks/providers/taskStoreProvider';

export type Props = {
  children: React.ReactNode;
};

const MainLayout = observer(({ children }: Props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full w-full flex overflow-hidden relative">
        <div className="flex flex-col h-full w-full bg-background overflow-hidden">
          <Topbar />
          <div className={`main-layout relative h-full overflow-hidden w-full `}>
            {children}

            <TaskStoreProvider>
              <MainPanel />
              <SidePanel />
            </TaskStoreProvider>
          </div>
        </div>
        <SocketController />
        <ModalController />
      </div>
    </DndProvider>
  );
});

export default MainLayout;
