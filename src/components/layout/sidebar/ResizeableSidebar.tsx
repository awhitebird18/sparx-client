import Sidebar from './Sidebar';
import 'react-resizable/css/styles.css';
import { Resizable, ResizeHandle } from 'react-resizable';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const ResizableSidebar = () => {
  const { sidebarWidth, setSidebarWidth } = useStore('sidebarStore');

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

  return (
    <Resizable
      width={sidebarWidth}
      height={Infinity} // Height is not resizable
      onResize={onResize}
      resizeHandles={resizeHandles}
      minConstraints={[0, Infinity]} // Minimum width of 0
      maxConstraints={[400, Infinity]} // Maximum width of 600
    >
      <div
        style={{ width: `${sidebarWidth}px`, position: 'relative' }}
        className="border-r border-border"
      >
        <DndProvider backend={HTML5Backend}>
          <Sidebar />
        </DndProvider>
      </div>
    </Resizable>
  );
};

export default observer(ResizableSidebar);
