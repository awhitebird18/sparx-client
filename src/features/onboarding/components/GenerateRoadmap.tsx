import { observer } from 'mobx-react-lite';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { NodemapStoreProvider } from '@/features/nodemap/providers/nodemapStoreProvider';
import RoadmapConfirmationPanel from './RoadmapConfirmationPanel';

const GenerateRoadmap = observer(() => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <DndProvider backend={HTML5Backend}>
        <NodemapStoreProvider readonly />
      </DndProvider>

      <RoadmapConfirmationPanel />
    </div>
  );
});

export default GenerateRoadmap;
