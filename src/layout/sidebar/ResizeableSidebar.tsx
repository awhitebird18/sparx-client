import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Resizable, ResizeHandle } from 'react-resizable';
import Sidebar from './Sidebar';
import { useStore } from '@/stores/RootStore';
import Backdrop from '@/components/ui/Backdrop';
import 'react-resizable/css/styles.css';

const ResizableSidebar = observer(() => {
  const { sidebarWidth, setSidebarWidth, handleResize, isSidebarAbsolute } =
    useStore('sidebarStore');

  const resizeHandles: ResizeHandle[] = ['e'];

  const onResize = (_event: unknown, { size }: { size: { width: number } }) => {
    if (size.width < 75) {
      setSidebarWidth(65);
    } else {
      setSidebarWidth(size.width);
    }
  };

  const closeSidebar = () => {
    setSidebarWidth(65);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <>
      {isSidebarAbsolute && sidebarWidth > 65 && <Backdrop onClick={closeSidebar} />}
      <Resizable
        width={sidebarWidth}
        height={Infinity}
        onResize={onResize}
        resizeHandles={resizeHandles}
        minConstraints={[65, Infinity]}
        maxConstraints={[300, Infinity]}
        transformScale={0.6}
      >
        <div
          style={{
            width: `${sidebarWidth}px`,
            position: 'relative',
            overflow: 'hidden',
            ...(isSidebarAbsolute && { position: 'absolute', top: 0, left: 0, bottom: 0 }),
          }}
          className="transition-all duration-150 flex-shrink-0 z-40"
        >
          <div className="glass-blur-background" />

          <Sidebar />
        </div>
      </Resizable>
    </>
  );
});

export default ResizableSidebar;
