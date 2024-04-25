import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { observer } from 'mobx-react-lite';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/ContextMenu';
import { useStore } from '@/stores/RootStore';
import { createAngledPath } from '../utils/createAngledPath';
import { calculateCoordinates } from '../utils/calculateCoordinates';
import Node from './Node';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { Channel } from '@/features/channels/types';
import { nodeDimensions } from '../utils/nodeDimensions';
import { gridSize } from '../utils/gridSize';
import { ReactZoomPanPinchState } from 'react-zoom-pan-pinch';

type Props = { nodemapState: ReactZoomPanPinchState };

interface ChannelTreeNode {
  channel: Channel;
  children: ChannelTreeNode[];
}

const DropArea = observer(({ nodemapState }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setActiveModal } = useStore('modalStore');
  const { channels, updateChannelApi, channelTree } = useStore('channelStore');
  const { isEditing } = useStore('nodemapStore');
  const { currentWorkspaceId, setNodemapState } = useStore('workspaceStore');
  const [isDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [renderKey] = useState(0);
  const [hoverOffset, setHoverOffset] = useState({ x: 0, y: 0 });
  const [focusedNode, setFocusedNode] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setNodemapState(nodemapState);
    };
  }, [nodemapState, setNodemapState]);

  const handleMouseDown = (e: MouseEvent) => {
    setIsSelecting(true);
    const { offsetX, offsetY } = e.nativeEvent;

    setSelectionBox((prevBox) => ({
      ...prevBox,
      startX: offsetX,
      startY: offsetY,
      endX: offsetX,
      endY: offsetY,
    }));
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    const nodesWithinSelection = getNodesWithinSelection();

    setSelectedNodes(nodesWithinSelection);

    setSelectionBox({ startX: 0, startY: 0, endX: 0, endY: 0 });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isSelecting || !ref.current) return;
    const containerRect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - containerRect.left;
    const offsetY = event.clientY - containerRect.top;

    setSelectionBox((prevBox) => ({
      ...prevBox,
      endX: offsetX / nodemapState.scale,
      endY: offsetY / nodemapState.scale,
    }));
  };

  const getNodesWithinSelection = () => {
    const minX = Math.min(selectionBox.startX, selectionBox.endX);
    const minY = Math.min(selectionBox.startY, selectionBox.endY);
    const maxX = Math.max(selectionBox.startX, selectionBox.endX);
    const maxY = Math.max(selectionBox.startY, selectionBox.endY);

    const nodesWithinSelection = channels
      .filter((node) => {
        return (
          node.x + nodeDimensions.width >= minX &&
          node.x <= maxX &&
          node.y + nodeDimensions.height >= minY &&
          node.y <= maxY
        );
      })
      .map((node) => node.uuid);

    return [...nodesWithinSelection];
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

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
        if (delta) {
          const selectedChannels = channels.filter((channel: Channel) =>
            selectedNodes.find((nodeId) => nodeId === channel.uuid),
          );

          for (let i = 0; i < selectedChannels.length; i++) {
            await onDrop(
              selectedChannels[i].uuid,
              Math.round((selectedChannels[i].x + hoverOffset.x) / gridSize) * gridSize,
              Math.round((selectedChannels[i].y + hoverOffset.y) / gridSize) * gridSize,
            );
          }

          setHoverOffset({ x: 0, y: 0 });
        }
      }
    },
    [hoverOffset.x, hoverOffset.y, onDrop, selectedNodes, channels],
  );

  const handleHover = useCallback((_: any, monitor: DropTargetMonitor<Channel, void>) => {
    const delta = monitor.getDifferenceFromInitialOffset();

    if (!delta) return;

    setHoverOffset(delta);
  }, []);

  const dropConfig = {
    accept: 'node',
    canDrop: () => {
      return true;
    },
    drop: handleDrop,
    hover: handleHover,
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  };

  const [, drop] = useDrop(dropConfig);

  const handleCreateChannel = (e: React.MouseEvent) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;

    const x = (clickX - rect.left + ref.current.scrollLeft) / nodemapState.scale;
    const y = (clickY - rect.top + ref.current.scrollTop) / nodemapState.scale;

    setActiveModal({
      type: 'CreateChannelModal',
      payload: {
        onSubmit: () => console.info(x, y),
      },
    });
  };

  useEffect(() => {
    const handleMouseMove: any = (event: MouseEvent<Document>) => {
      if (ref.current) {
        const { left, top } = ref.current.getBoundingClientRect();
        const mouseX = event.clientX - left;
        const mouseY = event.clientY - top;

        setMousePosition({ x: mouseX, y: mouseY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  function renderLine(line: any, isLineActivated: boolean) {
    const adjustedChannels = channels.map((channel) => {
      if (selectedNodes.includes(channel.uuid)) {
        const xoffset = selectedNodes.includes(channel.uuid) ? hoverOffset.x : 0;
        const yoffset = selectedNodes.includes(channel.uuid) ? hoverOffset.y : 0;

        return {
          ...channel,
          x: Math.round((channel.x + xoffset) / gridSize) * gridSize,
          y: Math.round((channel.y + yoffset) / gridSize) * gridSize,
        };
      }

      return channel;
    });

    const pathD = createAngledPath(
      calculateCoordinates(line.start.nodeId, line.start.side, adjustedChannels),
      line.end
        ? calculateCoordinates(line.end.nodeId, line.end.side, adjustedChannels)
        : { x: mousePosition.x, y: mousePosition.y, side: ConnectionSide.TOP },
    );

    return <Line path={pathD} isLineActivated={isLineActivated} />;
  }

  drop(ref);

  const handleDragStart = (uuid: string) => {
    setSelectedNodes((prev) => {
      const copy = [...prev];
      copy.push(uuid);

      return copy;
    });
  };

  const onSelectNode = () => {
    console.info('to implement');
  };

  useEffect(() => {
    const currentRef = ref.current;

    const clickHandler: any = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
      const clickedElement = e.target as HTMLElement;

      if (clickedElement.dataset.nodeId) {
        const nodeId = clickedElement.dataset.nodeId;

        if (nodeId) setFocusedNode(nodeId);
      } else if (clickedElement.classList.contains('nodemap')) {
        setFocusedNode(null);
      }
    };

    if (currentRef) {
      const handleEvent: EventListener = clickHandler;
      currentRef.addEventListener('click', handleEvent);

      return () => {
        currentRef.removeEventListener('click', handleEvent);
      };
    }
  }, [ref]);

  const renderNode = (node: ChannelTreeNode) => (
    <Node
      key={node.channel.uuid}
      uuid={node.channel.uuid}
      label={node.channel.name}
      x={node.channel.x}
      y={node.channel.y}
      isDefault={!!node.channel.isDefault}
      isHighlighted={selectedNodes.includes(node.channel.uuid)}
      onSelectNode={onSelectNode}
      onDragStart={handleDragStart}
      isFocused={focusedNode === node.channel.uuid}
    >
      {node.children.map(renderNode)}
    </Node>
  );

  return (
    <div className="w-full h-full">
      <div
        ref={ref}
        className={`nodemap absolute top-0 left-0  w-full h-full !z-30 ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onContextMenu={handleContextMenu}
        onDoubleClick={isEditing ? handleCreateChannel : undefined}
      >
        {/* {channelTree.map(({ channel, children }: ChannelTreeNode) => {
          const xoffset = selectedNodes.includes(channel.uuid) ? hoverOffset.x : 0;
          const yoffset = selectedNodes.includes(channel.uuid) ? hoverOffset.y : 0;
          return (
            <Node
              key={channel.uuid}
              uuid={channel.uuid}
              label={channel.name}
              x={Math.round((channel.x + xoffset) / gridSize) * gridSize}
              y={Math.round((channel.y + yoffset) / gridSize) * gridSize}
              isDefault={!!channel.isDefault}
              isHighlighted={!!selectedNodes.find((nodeId: string) => nodeId === channel.uuid)}
              onSelectNode={onSelectNode}
              onDragStart={handleDragStart}
              isHovering={isOver}
              onDragEnd={() => setSelectedNodes([])}
              isFocused={focusedNode === channel.uuid}
              hideUnstarted={false}
              childChannels={children}
            />
          );
        })} */}

        {channelTree.map(renderNode)}
      </div>
      <ContextMenu>
        <ContextMenuTrigger disabled={!isEditing}>
          <>
            <svg
              className="absolute h-full w-full -z-10"
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <pattern
                id="pattern-1undefined"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="#777"></circle>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1undefined)"></rect>
            </svg>

            <div
              className="relative flex-1 flex w-full h-full -z-10"
              style={{
                width: '8000px',
                height: '8000px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <svg
                key={renderKey}
                className="absolute h-full w-full "
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}
              >
                {/* {channelConnectors.map((line) => {
                  if (isLineActivated(line)) return null;

                  return renderLine(line, false);
                })}

                {channelConnectors.map((line) => {
                  if (!isLineActivated(line)) return null;

                  return renderLine(line, true);
                })} */}
              </svg>

              <div className="w-1 h-1 absolute bg-white" style={{ top: 4000, left: 4000 }} />
            </div>

            {isSelecting && (
              <div
                className="absolute border-dashed border-2 border-blue-500 z-50"
                style={{
                  left: Math.min(selectionBox.startX, selectionBox.endX),
                  top: Math.min(selectionBox.startY, selectionBox.endY),
                  width: Math.abs(selectionBox.endX - selectionBox.startX),
                  height: Math.abs(selectionBox.endY - selectionBox.startY),
                }}
              />
            )}
          </>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
});

export default DropArea;

type LineProps = { path: any; isLineActivated: boolean };

const Line = ({ path, isLineActivated }: LineProps) => {
  return (
    <g key={Math.random()}>
      <path
        d={path}
        fill="none"
        className={`${
          isLineActivated ? 'stroke-primary-light dark:stroke-primary' : 'stroke-border opacity-60'
        } ${!isLineActivated && 'stroke-transparent'}`}
        strokeWidth="4"
      ></path>

      <path d={path} fill="none" stroke="transparent" strokeWidth="10" />
    </g>
  );
};
