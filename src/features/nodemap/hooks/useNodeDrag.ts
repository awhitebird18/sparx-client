import { useDrag } from 'react-dnd';
import { createTransparentImage } from '../utils/createTransparentImage';

const useNodeDrag = (uuid: string, x: number, y: number, label: string) => {
  const [, drag, preview] = useDrag(
    () => ({
      type: 'node',
      item: { uuid, x, y, name: label },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [uuid, x, y, label],
  );

  preview(createTransparentImage());

  return drag;
};

export default useNodeDrag;
