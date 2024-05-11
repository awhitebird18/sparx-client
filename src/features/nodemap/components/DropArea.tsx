import { useMemo, useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import GridPattern from './GridPattern';
import Lines from './Lines';
import Nodes from './Nodes';
import useDropLogic from '../hooks/useDropLogic';
import useClickNodeHandler from '../hooks/useNodeClickHandler';
import useSyncNodemapSettings from '../hooks/useSyncNodemapSettings';

const DropArea = () => {
  const ref = useRef<HTMLDivElement>(null);
  useClickNodeHandler({ ref });
  useSyncNodemapSettings();
  const { handleDrop, handleHover } = useDropLogic({ ref });

  const dropConfig = useMemo(
    () => ({
      accept: 'node',
      canDrop: (item: any) => {
        return item;
      },
      drop: handleDrop,
      hover: handleHover,
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
      }),
    }),
    [handleDrop, handleHover],
  );

  const [, drop] = useDrop(dropConfig);
  drop(ref);

  return (
    <div ref={ref} className="w-full h-full relative">
      <Nodes />
      <GridPattern />
      <Lines />
    </div>
  );
};

export default DropArea;
