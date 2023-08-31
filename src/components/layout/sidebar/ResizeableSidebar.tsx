import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Resizable, ResizeHandle } from 'react-resizable';

import 'react-resizable/css/styles.css';

import Sidebar from './Sidebar';
import { useStore } from '@/stores/RootStore';
import Backdrop from '@/components/ui/Backdrop';

const ResizableSidebar = () => {
  const { sidebarWidth, setSidebarWidth, handleResize, isSidebarAbsolute } =
    useStore('sidebarStore');

  // The handle for resizing is on the right ('e')
  const resizeHandles: ResizeHandle[] = ['e'];

  const onResize = (_event: unknown, { size }: { size: { width: number } }) => {
    // If the new size is smaller than some value, hide the sidebar
    if (size.width < 100) {
      setSidebarWidth(0);
    } else {
      setSidebarWidth(size.width);
    }
  };

  const closeSidebar = () => {
    setSidebarWidth(0);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <>
      {isSidebarAbsolute && sidebarWidth > 0 && <Backdrop onClick={closeSidebar} />}
      <Resizable
        width={sidebarWidth}
        height={Infinity} // Height is not resizable
        onResize={onResize}
        resizeHandles={resizeHandles}
        minConstraints={[0, Infinity]} // Minimum width of 0
        maxConstraints={[400, Infinity]} // Maximum width of 600
      >
        <div
          style={{
            width: `${sidebarWidth}px`,
            position: 'relative',
            overflow: 'hidden',
            ...(isSidebarAbsolute && { position: 'absolute', top: 0, left: 0, bottom: 0 }),
          }}
          className="border-r border-border bg-background z-50"
        >
          {/* Glass Blur Background with Image */}
          <div
            className="glass-blur-background"
            // style={{ backgroundImage: `url(${bgBlueImage})` }}
          />

          {/* Existing Sidebar Content */}
          <DndProvider backend={HTML5Backend}>
            <Sidebar />
          </DndProvider>
        </div>
      </Resizable>
    </>
  );
};

export default observer(ResizableSidebar);
