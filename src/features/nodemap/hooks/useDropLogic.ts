import { RefObject, useCallback } from 'react';
import { useStore } from '@/stores/RootStore';
import { useTransformContext } from 'react-zoom-pan-pinch';
import { snapToGrid } from '../utils/snapToGrid';
import { DropTargetMonitor } from 'react-dnd';
import { Channel } from '@/features/channels/types';

type Props = {
  ref: RefObject<HTMLDivElement>;
};

const useDropLogic = ({ ref }: Props) => {
  const {
    findChannelByUuid,
    draggingNodeId,
    nodesDragging,
    setHoverOffset,
    setDraggingNodeId,
    updateChannelPositions,
    findCollisionFreePosition,
  } = useStore('channelStore');
  const { transformState } = useTransformContext();

  const handleHover = useCallback(
    (_: unknown, monitor: DropTargetMonitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (!delta) return;

      const adjustedX = delta.x / transformState.scale;
      const adjustedY = delta.y / transformState.scale;
      const snappedX = snapToGrid(adjustedX);
      const snappedY = snapToGrid(adjustedY);

      setHoverOffset({ x: snappedX, y: snappedY });
    },
    [setHoverOffset, transformState.scale],
  );

  const handleDrop = useCallback(
    async (item: Channel | undefined, monitor: DropTargetMonitor) => {
      if (item && ref.current) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta && draggingNodeId) {
          const collisionOffset = findCollisionFreePosition();
          const adjustedX = (delta.x + collisionOffset.x) / transformState.scale;
          const adjustedY = (delta.y + collisionOffset.y) / transformState.scale;
          const snappedX = snapToGrid(adjustedX);
          const snappedY = snapToGrid(adjustedY);

          const hoverOffset = { x: snappedX, y: snappedY };
          const channel = findChannelByUuid(draggingNodeId);
          if (!channel) return;

          const channels = nodesDragging;
          const channelsToUpdate: { uuid: string; x: number; y: number }[] = [];

          const draggedChannelUpdate = {
            uuid: channel.uuid,
            x: Math.round(snapToGrid(channel.x) + hoverOffset.x),
            y: Math.round(snapToGrid(channel.y) + hoverOffset.y),
          };
          channelsToUpdate.push(draggedChannelUpdate);

          for (let i = 0; i < channels.length; i++) {
            const channelEl = channels[i];
            if (!channelEl) return;

            const childChannelUpdate = {
              uuid: channelEl.uuid,
              x: Math.round(snapToGrid(channelEl.x) + hoverOffset.x),
              y: Math.round(snapToGrid(channelEl.y) + hoverOffset.y),
            };
            channelsToUpdate.push(childChannelUpdate);
          }

          await updateChannelPositions(channelsToUpdate);

          setDraggingNodeId(null);
          setHoverOffset({ x: 0, y: 0 });
        }
      }
    },
    [
      draggingNodeId,
      findChannelByUuid,
      findCollisionFreePosition,
      nodesDragging,
      ref,
      setDraggingNodeId,
      setHoverOffset,
      transformState.scale,
      updateChannelPositions,
    ],
  );

  return { handleDrop, handleHover };
};

export default useDropLogic;
