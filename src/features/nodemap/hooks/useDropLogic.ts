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
    updateChannelApi,
    findChannelByUuid,
    draggingNodeId,
    descendantNodeIds,
    hoverOffset,
    setHoverOffset,
  } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { transformState } = useTransformContext();

  const onDrop = useCallback(
    async (uuid: string, x: number, y: number) => {
      await updateChannelApi(uuid, { x, y }, currentWorkspaceId);
    },
    [currentWorkspaceId, updateChannelApi],
  );

  const handleDrop = useCallback(
    async (item: Channel | undefined, monitor: DropTargetMonitor) => {
      if (item && ref.current) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta && draggingNodeId) {
          const channel = findChannelByUuid(draggingNodeId);

          if (!channel) return;

          const channels = descendantNodeIds.map((nodeId) => findChannelByUuid(nodeId));

          const channelUpdatePromises = [];

          const promiseCurrent = onDrop(
            channel.uuid,
            Math.round(snapToGrid(channel.x) + hoverOffset.x),
            Math.round(snapToGrid(channel.y) + hoverOffset.y),
          );

          channelUpdatePromises.push(promiseCurrent);

          for (let i = 0; i < channels.length; i++) {
            const channelEl = channels[i];

            if (!channelEl) return;

            const promise = onDrop(
              channelEl.uuid,
              Math.round(snapToGrid(channelEl.x) + hoverOffset.x),
              Math.round(snapToGrid(channelEl.y) + hoverOffset.y),
            );

            channelUpdatePromises.push(promise);
          }

          await Promise.all(channelUpdatePromises);

          setHoverOffset({ x: 0, y: 0 });
        }
      }
    },
    [
      ref,
      draggingNodeId,
      findChannelByUuid,
      descendantNodeIds,
      onDrop,
      hoverOffset.x,
      hoverOffset.y,
      setHoverOffset,
    ],
  );

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

  return { handleDrop, handleHover };
};

export default useDropLogic;
