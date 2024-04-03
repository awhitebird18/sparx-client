import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

const DropArea = ({ scrollToMiddle, nodemapState }: any) => {
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
  const [gridSize] = useState({ width: 8000, height: 8000 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hideUnstarted] = useState(false);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);

  // Set up global event listeners for keydown and keyup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key, currentLine);
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

  useLayoutEffect(() => {
    scrollToMiddle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridSize.height, gridSize.width]);

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

  const handleMouseMove = () => {
    // if (isDragging && dragStart.x !== 0 && dragStart.y !== 0 && ref.current) {
    //   const dx = e.clientX - dragStart.x;
    //   const dy = e.clientY - dragStart.y;
    //   ref.current.scrollLeft -= dx;
    //   ref.current.scrollTop -= dy;
    //   setDragStart({ x: e.clientX, y: e.clientY });
    // }
  };

  const handleMouseUp = () => {
    setDragStart({ x: 0, y: 0 });
  };

  const onDrop = async (uuid: string, x: number, y: number) => {
    await updateChannelApi(uuid, { x, y }, currentWorkspaceId);
  };

  const [, drop] = useDrop({
    accept: 'node',
    canDrop: () => {
      return true;
    },
    drop: (item: NodeData | undefined, monitor: DropTargetMonitor) => {
      if (item && ref.current) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const scale = nodemapState.scale; // Get the current scale

          let adjustedX = delta.x / scale;
          let adjustedY = delta.y / scale;

          // Snap to grid logic
          if (isControlPressed) {
            const gridSize = 75; // Define your grid size
            adjustedX = Math.round((item.x + adjustedX) / gridSize) * gridSize;
            adjustedY = Math.round((item.y + adjustedY) / gridSize) * gridSize;
          } else {
            adjustedX = item.x + adjustedX;
            adjustedY = item.y + adjustedY;
          }

          // Updating the position of the node
          onDrop(item.uuid, adjustedX, adjustedY);
        }
      }
    },
  });

  const handleCreateChannel = (e: React.MouseEvent) => {
    const nodeWidth = 135;
    const nodeHeight = 60;

    const clickX = e.clientX;
    const clickY = e.clientY;

    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;

    const x = clickX - rect.left + ref.current.scrollLeft - nodeWidth / 2;
    const y = clickY - rect.top + ref.current.scrollTop - nodeHeight / 2;

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
    console.log('creating line!');
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

  function renderLine(line: Line, index: number, isLineActivated: boolean) {
    const pathD = createAngledPath(
      calculateCoordinates(line.start.nodeId, line.start.side, subscribedChannels),
      line.end
        ? calculateCoordinates(line.end.nodeId, line.end.side, subscribedChannels)
        : { x: mousePosition.x, y: mousePosition.y, side: ConnectionSide.TOP },
    );

    return (
      <g key={index}>
        {/* Visible dashed line */}
        <path
          d={pathD}
          fill="none"
          className={`${isLineActivated ? 'stroke-primary' : 'stroke-border opacity-60'} ${
            hideUnstarted && !isLineActivated && 'stroke-transparent'
          } ${line.uuid === selectedLineId && 'stroke-ring'}`}
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
      onMouseMove={handleMouseMove}
      onClick={handleSvgClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={isEditing ? handleCreateChannel : undefined}
    >
      <ContextMenu>
        <ContextMenuTrigger disabled={!isEditing}>
          <>
            <div
              className="relative flex-1 flex w-full h-full"
              style={{
                width: '8000px',
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

                  return renderLine(line, index, false);
                })}

                {channelConnectors.map((line, index) => {
                  if (!isLineActivated(line)) return null; // Skip non-activated lines

                  return renderLine(line, index, true);
                })}

                {/* Current Line */}

                {currentLine && renderLine(currentLine, 100, false)}
              </svg>
              <div className="w-1 h-1 absolute bg-white" style={{ top: 4000, left: 4000 }} />
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
              />
            ))}
          </>
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  );
};

export default observer(DropArea);
