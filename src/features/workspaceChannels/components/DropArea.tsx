import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { NodeData } from '../types/nodeData';
import { observer } from 'mobx-react-lite';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/ContextMenu';
import { useStore } from '@/stores/RootStore';
import { createAngledPath } from '../utils/createAngledPath';
import { calculateCoordinates } from '../utils/calculateCoordinates';

import { Line } from '../types/line';
import Node from './Node';
import { ConnectionSide } from '@/features/channels/enums/connectionSide';
import { Channel } from '@/features/channels/types';
import CustomDragLayer from './CustomDragLayer';
import { nodeDimensions } from '../utils/nodeDimensions';

const nodeHeight = 80;
const nodeWidth = 280;
const nodeGap = 20;
const gridSize = 40; // Size of each grid square
const snapToGrid = true;

const DropArea = ({ nodemapState }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setActiveModal } = useStore('modalStore');

  const {
    channelConnectors,
    removeChannelConnectorApi,
    selectedLineId,
    setSelectedLineId,
    createChannelConnectorApi,
  } = useStore('channelConnectorStore');
  const {
    updateSubscribedChannel,
    subscribedChannels,
    isEditing,
    updateChannelApi,
    setIsControlPressed,
    isControlPressed,
    userChannelData,
  } = useStore('channelStore');
  const { currentWorkspaceId, setNodemapState, currentWorkspace } = useStore('workspaceStore');
  const [isDragging, setIsDragging] = useState(false);
  // Review
  const [, setDragStart] = useState({ x: 0, y: 0 });
  // const [gridSize] = useState({ width: 4000, height: 8000 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hideUnstarted] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [snapState, setSnapState] = useState({
    isSnapping: false,
    xSnapped: false,
    ySnapped: false,
    snapPosition: { x: 0, y: 0 },
  });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [renderKey, setRenderKey] = useState(0);
  const [hoverOffset, setHoverOffset] = useState({ x: 0, y: 0 });
  const [focusedNode, setFocusedNode] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setNodemapState(nodemapState);
    };
  }, [nodemapState, setNodemapState]);

  // Set up global event listeners for keydown and keyup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && currentLine) {
        setCurrentLine(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLine]);

  // Set up global event listeners for keydown and keyup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsControlPressed(true);
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsControlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;

      if (!target.classList.contains('connector') && currentLine) {
        setCurrentLine(null);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [currentLine]);

  useEffect(() => {
    if (currentLine && !isEditing) {
      setCurrentLine(null);
    }
  }, [isEditing, currentLine]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selectedLineId !== null && isEditing && currentWorkspaceId) {
        const channelConnector = channelConnectors.find((el: Line) => el.uuid === selectedLineId);

        if (!channelConnector?.uuid) return;

        await removeChannelConnectorApi(channelConnector.uuid, currentWorkspaceId);

        setSelectedLineId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    channelConnectors,
    currentWorkspaceId,
    isEditing,
    removeChannelConnectorApi,
    selectedLineId,
    setSelectedLineId,
  ]);

  const handleMouseDown = (e: any) => {
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

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsSelecting(false);
    const nodesWithinSelection = getNodesWithinSelection();

    setSelectedNodes(nodesWithinSelection);

    // Clear selection box
    setSelectionBox({ startX: 0, startY: 0, endX: 0, endY: 0 });
  };

  const handleMouseMove = (event: any) => {
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
    // Calculate coordinates of the selection box
    const minX = Math.min(selectionBox.startX, selectionBox.endX);
    const minY = Math.min(selectionBox.startY, selectionBox.endY);
    const maxX = Math.max(selectionBox.startX, selectionBox.endX);
    const maxY = Math.max(selectionBox.startY, selectionBox.endY);

    // Get nodes within the selection box
    const nodesWithinSelection = subscribedChannels
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

  const handleLineClick = (uuid: string, event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    if (!isEditing) return;

    // event.stopPropagation();
    setSelectedLineId(uuid);
  };

  // const handleMouseMove = (event: any) => {
  //   const containerRect = ref?.current?.getBoundingClientRect();

  //   if (!containerRect) return;

  //   const mouseX = (event.clientX - containerRect.left) / nodemapState.scale;
  //   const mouseY = (event.clientY - containerRect.top) / nodemapState.scale;

  // };

  const onDrop = useCallback(
    async (uuid: string, x: number, y: number) => {
      await updateChannelApi(uuid, { x, y }, currentWorkspaceId);
    },
    [currentWorkspaceId, updateChannelApi],
  );

  const handleDrop = useCallback(
    async (item: NodeData | undefined, monitor: DropTargetMonitor) => {
      if (item && ref.current) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const scale = nodemapState.scale; // Get the current scale

          const selectedChannels = subscribedChannels.filter((channel: Channel) =>
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

          setSnapState({
            isSnapping: false,
            xSnapped: false,
            ySnapped: false,
            snapPosition: {
              x: 0,
              y: 0,
            },
          });
        }
      }
    },
    [hoverOffset.x, hoverOffset.y, nodemapState.scale, onDrop, selectedNodes, subscribedChannels],
  );

  const handleHover = useCallback((item: NodeData, monitor: DropTargetMonitor<NodeData, void>) => {
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
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
    }),
  };

  const [{ isOver }, drop] = useDrop(dropConfig);

  const handleCreateChannel = (e: React.MouseEvent) => {
    const clickX = e.clientX;
    const clickY = e.clientY;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;

    const x = (clickX - rect.left + ref.current.scrollLeft) / nodemapState.scale;
    const y = (clickY - rect.top + ref.current.scrollTop) / nodemapState.scale;

    setActiveModal({
      type: 'CreateChannelModal',
      payload: { x: x.toFixed(3), y: y.toFixed(3) },
    });
  };

  const handleSvgClick = (e: any) => {
    console.log(e.target);
    setSelectedLineId(null);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const { left, top } = ref.current.getBoundingClientRect();
        // Calculate mouse position relative to the container
        const mouseX = event.clientX - left;
        const mouseY = event.clientY - top;

        setMousePosition({ x: mouseX, y: mouseY });
      }
    };

    // Add event listener to the document or a larger scope if necessary
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCreateLine = async (uuid: string, side: ConnectionSide) => {
    if (!currentLine) {
      setCurrentLine({
        start: { nodeId: uuid, side },
      });
    } else {
      if (!currentWorkspaceId) return;

      const updatedLine = { ...currentLine, end: { nodeId: uuid, side } };
      setCurrentLine(null);

      await createChannelConnectorApi(
        {
          parentChannelId: updatedLine.start.nodeId,
          childChannelId: updatedLine.end.nodeId,
          parentSide: updatedLine.start.side,
          childSide: updatedLine.end.side,
        },
        currentWorkspaceId,
      );
    }
  };

  const isLineActivated = (line: any) => {
    const startActivated = userChannelData.find(
      (subscription) => subscription.channel.uuid === line.start.nodeId,
    )?.isSubscribed;

    const endActivated = userChannelData.find(
      (subscription) => subscription.channel.uuid === line?.end?.nodeId,
    )?.isSubscribed;

    return startActivated && endActivated;
  };

  function renderLine(line: Line, index: number, isLineActivated: boolean, scale: number) {
    const adjustedChannels = subscribedChannels.map((channel) => {
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

    return (
      <g key={Math.random()}>
        {/* Visible dashed line */}
        <path
          d={pathD}
          fill="none"
          className={`${
            isLineActivated
              ? 'stroke-primary-light dark:stroke-primary'
              : 'stroke-border opacity-60'
          } ${hideUnstarted && !isLineActivated && 'stroke-transparent'} ${
            line.uuid === selectedLineId && 'stroke-ring'
          }`}
          strokeWidth="4"
          strokeDasharray={isEditing ? '8 12' : '0'}
        >
          {isEditing && (
            <animate
              attributeName="stroke-dashoffset"
              values="20;0"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </path>
        {/* Invisible wider line for easier click detection */}
        <path
          d={pathD}
          fill="none"
          stroke="transparent"
          strokeWidth="10" // Adjust this width to be wider than the visible line
          onClick={(e) => {
            if (!line.uuid) return;
            handleLineClick(line.uuid, e);
          }}
        />
      </g>
    );
  }

  drop(ref);

  const handleDragStart = (e: any, uuid: string) => {
    setSelectedNodes((prev) => {
      const copy = [...prev];
      copy.push(uuid);

      return copy;
    });
  };

  const onSelectNode = (uuid: string) => {
    // setSelectedNodes((prevSelectedNodes: any) => {
    //   if (prevSelectedNodes?.find((node: Channel) => node.uuid === uuid)) {
    //     return prevSelectedNodes.filter((node: Channel) => node.uuid !== uuid);
    //   } else {
    //     return [
    //       ...prevSelectedNodes,
    //       { ...subscribedChannels.find((channel) => channel.uuid === uuid) },
    //     ];
    //   }
    // });
  };

  useEffect(() => {
    const clickHandler = (e: any) => {
      const clickedElement = e.target;

      // Check if the clicked element is a node
      if (clickedElement.dataset.nodeId) {
        // Store the ID of the clicked node
        const nodeId = clickedElement.dataset.nodeId;
        // Use nodeId as needed
        if (nodeId) setFocusedNode(nodeId);
      } else if (clickedElement.classList.contains('nodemap')) {
        setFocusedNode(null);
      }
    };

    ref.current?.addEventListener('click', clickHandler);

    return () => ref.current?.removeEventListener('click', clickHandler);
  }, []);

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
        onClick={handleSvgClick}
        onContextMenu={handleContextMenu}
        onDoubleClick={isEditing ? handleCreateChannel : undefined}
      >
        {subscribedChannels.map((channel: any) => {
          const xoffset = selectedNodes.includes(channel.uuid) ? hoverOffset.x : 0;
          const yoffset = selectedNodes.includes(channel.uuid) ? hoverOffset.y : 0;
          return (
            <Node
              key={channel.uuid}
              uuid={channel.uuid}
              label={channel.name}
              x={Math.round((channel.x + xoffset) / gridSize) * gridSize}
              y={Math.round((channel.y + yoffset) / gridSize) * gridSize}
              isDefault={channel.isDefault}
              handleCreateLine={handleCreateLine}
              isHighlighted={selectedNodes.find((nodeId: string) => nodeId === channel.uuid)}
              onSelectNode={onSelectNode}
              onDragStart={handleDragStart}
              selectedNodes={selectedNodes}
              isHovering={isOver}
              onDragEnd={() => setSelectedNodes([])}
              isFocused={focusedNode === channel.uuid}
            />
          );
        })}
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
                // patternTransform="translate(-1,-1)"
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
                {channelConnectors.map((line, index) => {
                  if (isLineActivated(line)) return null;

                  return renderLine(line, index, false, nodemapState.scale);
                })}

                {channelConnectors.map((line, index) => {
                  if (!isLineActivated(line)) return null;

                  return renderLine(line, index, true, nodemapState.scale);
                })}

                {currentLine && renderLine(currentLine, 100, false, nodemapState.scale)}
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

            {/* <CustomDragLayer
              selectedNodes={selectedNodes}
              scale={nodemapState.scale}
              snapState={snapState}
            /> */}
          </>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
};

export default observer(DropArea);
