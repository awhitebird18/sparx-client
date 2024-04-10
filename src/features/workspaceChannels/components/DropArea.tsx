import React, { useCallback, useEffect, useRef, useState } from 'react';
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

const nodeHeight = 75;
const nodeWidth = 275;
const nodeGap = 20;

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
    subscribedChannels,
    isEditing,
    updateChannelApi,
    setIsControlPressed,
    isControlPressed,
    userChannelData,
  } = useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
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
      // Assert event.target as an Element to access classList
      const target = event.target as Element;
      if (!target.classList.contains('connector') && currentLine) {
        setCurrentLine(null);
      }
    };

    window.addEventListener('click', handleClick);

    // Remove event listener on cleanup to prevent memory leaks
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

  const handleRightMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2 && ref.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleRightMouseUp = (e: React.MouseEvent) => {
    if (e.button === 2) {
      setIsDragging(false);
      setDragStart({ x: 0, y: 0 });
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleLineClick = (uuid: string, event: React.MouseEvent<SVGPathElement, MouseEvent>) => {
    if (!isEditing) return;

    event.stopPropagation();
    setSelectedLineId(uuid);
  };

  // const handleMouseMove = (event: any) => {
  //   const containerRect = ref?.current?.getBoundingClientRect();

  //   if (!containerRect) return;

  //   const mouseX = (event.clientX - containerRect.left) / nodemapState.scale;
  //   const mouseY = (event.clientY - containerRect.top) / nodemapState.scale;
  // };

  const handleMouseUp = () => {
    setDragStart({ x: 0, y: 0 });
  };

  const onDrop = useCallback(
    async (uuid: string, x: number, y: number) => {
      await updateChannelApi(uuid, { x, y }, currentWorkspaceId);
    },
    [currentWorkspaceId, updateChannelApi],
  );

  const handleDrop = useCallback(
    (item: NodeData | undefined, monitor: DropTargetMonitor) => {
      if (item && ref.current) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const scale = nodemapState.scale; // Get the current scale

          let adjustedX = delta.x / scale;
          let adjustedY = delta.y / scale;

          // Snap to grid logic
          if (isControlPressed) {
            const gridSize = 150; // Define your grid size
            adjustedX = Math.round((item.x + adjustedX) / gridSize) * gridSize;
            adjustedY = Math.round((item.y + adjustedY) / gridSize) * gridSize;
          } else {
            adjustedX = item.x + adjustedX;
            adjustedY = item.y + adjustedY;
          }

          // Updating the position of the node
          onDrop(
            item.uuid,
            snapState.isSnapping ? snapState.snapPosition.x : adjustedX,
            snapState.isSnapping ? snapState.snapPosition.y : adjustedY,
          );
        }
      }
    },
    [isControlPressed, nodemapState.scale, onDrop, snapState],
  );

  const findClosestChannelWithSimilarValue = (
    channels: any,
    hoveredItem: any,
    direction: 'x' | 'y',
  ) => {
    const closeNodes = channels.filter((channel: Channel) => {
      return (
        channel.uuid !== hoveredItem.uuid &&
        Math.abs(channel[direction] - hoveredItem[direction]) < 50
      );
    });

    // Sort the filtered array based on the absolute difference
    closeNodes.sort(
      (a: any, b: any) =>
        Math.abs(a[direction] - hoveredItem[direction]) -
        Math.abs(b[direction] - hoveredItem[direction]),
    );

    // The first item in the sorted array will be the closest one
    return closeNodes[0];
  };

  const handleHover = (item: NodeData, monitor: DropTargetMonitor<NodeData, void>) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    if (!delta) return;

    const hoveredItem = {
      uuid: item.uuid,
      x: Math.round(item.x + delta.x),
      y: Math.round(item.y + delta.y),
    };

    // Snap to similar nodes
    const channelWithSimilarX = findClosestChannelWithSimilarValue(
      subscribedChannels,
      hoveredItem,
      'x',
    );
    const channelWithSimilarY = findClosestChannelWithSimilarValue(
      subscribedChannels,
      hoveredItem,
      'y',
    );

    let xCoordinate = hoveredItem.x;
    let yCoordinate = hoveredItem.y;

    let xSnapped = false;
    let ySnapped = false;

    if (channelWithSimilarX) {
      xCoordinate = channelWithSimilarX.x;
      xSnapped = true;
    } else {
      xCoordinate = hoveredItem.x;
      xSnapped = false;
    }

    if (channelWithSimilarY) {
      yCoordinate = channelWithSimilarY.y;
      ySnapped = true;
    } else {
      yCoordinate = hoveredItem.y;
      ySnapped = false;
    }

    // Snaps to group
    const closeNode = subscribedChannels.find((channel: Channel) => {
      return (
        channel.uuid !== item.uuid &&
        Math.abs(channel.x + nodeWidth / 2 - hoveredItem.x) < 150 &&
        Math.abs(channel.y + nodeHeight / 2 - hoveredItem.y) < 150
      );
    });

    if (closeNode) {
      const parentConnector = channelConnectors.find(
        (connector: Line) => connector.end?.nodeId === closeNode.uuid,
      );

      if (!parentConnector) {
        return setSnapState((prevState) => ({ ...prevState, isSnapping: false }));
      }

      const closeNodeElMidPoint = closeNode.y + 75 / 2;

      const isAbove = closeNodeElMidPoint > hoveredItem.y;

      if (isAbove) {
        yCoordinate -= nodeHeight + 30;
      } else {
        yCoordinate += nodeHeight + 30;
      }

      switch (parentConnector.start.side) {
        case ConnectionSide.LEFT: {
          const closeNodeRightSide = closeNode.x + nodeWidth / 2;
          xCoordinate = closeNodeRightSide - nodeWidth / 2;
          break;
        }
        case ConnectionSide.RIGHT: {
          const closeNodeLeftSide = closeNode.x - nodeWidth / 2;
          xCoordinate = closeNodeLeftSide + nodeWidth / 2;
          break;
        }
        default:
          break;
      }
    }

    if (!channelWithSimilarX && !channelWithSimilarY && !closeNode) {
      setSnapState({
        isSnapping: false,
        xSnapped: false,
        ySnapped: false,
        snapPosition: {
          x: hoveredItem.x,
          y: hoveredItem.y,
        },
      });

      return;
    }

    setSnapState({
      isSnapping: true,
      xSnapped,
      ySnapped,
      snapPosition: {
        x: xCoordinate,
        y: yCoordinate,
      },
    });
  };

  const [, drop] = useDrop({
    accept: 'node',
    canDrop: () => {
      return true;
    },
    drop: handleDrop,
    hover: handleHover,
  });

  const handleCreateChannel = (e: React.MouseEvent) => {
    const nodeWidth = 175;
    const nodeHeight = 75;

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

  const handleSvgClick = () => {
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
    const pathD = createAngledPath(
      calculateCoordinates(line.start.nodeId, line.start.side, subscribedChannels, scale),
      line.end
        ? calculateCoordinates(line.end.nodeId, line.end.side, subscribedChannels, scale)
        : { x: mousePosition.x, y: mousePosition.y, side: ConnectionSide.TOP },
    );

    return (
      <g key={index}>
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

  return (
    <div
      ref={ref}
      className={`w-full h-full relative ${isDragging ? 'cursor-grabbing' : ''}`}
      onMouseDown={handleRightMouseDown}
      onMouseUp={handleRightMouseUp}
      onMouseLeave={handleMouseUp}
      // onMouseMove={handleMouseMove}
      onClick={handleSvgClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={isEditing ? handleCreateChannel : undefined}
    >
      <ContextMenu>
        <ContextMenuTrigger disabled={!isEditing}>
          <>
            <div className="absolute left-1/2 top-[600px] gap-5 -translate-x-1/2 flex flex-col text-white prose dark:prose-invert">
              <h1 className="text-7xl font-semibold">Start</h1>
              <div className="h-72 w-1 bg-card mx-auto" />
            </div>
            {subscribedChannels.map((channel: any) => (
              <Node
                key={channel.uuid}
                uuid={channel.uuid}
                label={channel.name}
                x={channel.x}
                y={channel.y}
                isDefault={channel.isDefault}
                handleCreateLine={handleCreateLine}
                scale={nodemapState.scale}
              />
            ))}
            <div
              className="relative flex-1 flex w-full h-full"
              style={{
                width: '4000px',
                height: '8000px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <svg
                className="absolute h-full w-full "
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}
              >
                {/* Render lines */}
                {channelConnectors.map((line, index) => {
                  if (isLineActivated(line)) return null; // Skip activated lines

                  return renderLine(line, index, false, nodemapState.scale);
                })}

                {channelConnectors.map((line, index) => {
                  if (!isLineActivated(line)) return null; // Skip non-activated lines

                  return renderLine(line, index, true, nodemapState.scale);
                })}

                {/* Current Line */}
                {currentLine && renderLine(currentLine, 100, false, nodemapState.scale)}
              </svg>
              <div className="w-1 h-1 absolute bg-white" style={{ top: 4000, left: 4000 }} />
            </div>

            <CustomDragLayer scale={nodemapState.scale} snapState={snapState} />
          </>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
};

export default observer(DropArea);
