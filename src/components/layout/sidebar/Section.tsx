import { useCallback, useMemo, useRef, useState } from 'react';
import { CaretDownFill } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { useStore } from '@/stores/RootStore';
import { SidebarItem } from './enums/itemTypes';
import { sortSectionChannels } from '@/utils/sortUtils';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import ListItem from './ListItem';
import ListHeader from './ListHeader';
import ChannelIcon from '@/features/channels/components/ChannelIcon';
import { Button } from '@/components/ui/Button';
import { Section } from '@/features/sections/types';
import { Channel } from '@/features/channels/types';
import { ChannelType } from '@/features/channels/enums';

interface SectionProps {
  section: Section;
  index: number;
}

interface DraggedItem {
  type: string;
  id: string;
  index: number;
  channelType: ChannelType;
  sectionId: string;
}

const Section = ({ section, index }: SectionProps) => {
  const { uuid, name, channelIds, isSystem, isOpen, sortBy } = section;
  const { selectedId } = useStore('sidebarStore');
  const { updateSectionApi, updateChannelSectionApi, reorderSections } = useStore('sectionStore');
  const { findChannelByUuid } = useStore('channelStore');
  const { findUserByName } = useStore('userStore');
  const [isOverTopHalf, setIsOverTopHalf] = useState(false);
  const [isOverBottomHalf, setIsOverBottomHalf] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // React dnd drop handler
  const handleDrop = useCallback(
    async (item: DraggedItem, monitor: DropTargetMonitor) => {
      setIsOverTopHalf(false);
      setIsOverBottomHalf(false);

      if (item.type === SidebarItem.ITEM && item.sectionId !== section.uuid) {
        await updateChannelSectionApi(uuid, item.id);
      }

      if (item.type === SidebarItem.SECTION && item.id !== section.uuid) {
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        if (!hoverBoundingRect) return;
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (hoverClientY > hoverMiddleY && item.index - section.orderIndex === 1) {
          return;
        }
        if (hoverClientY < hoverMiddleY && item.index - section.orderIndex === -1) {
          return;
        }

        if (hoverClientY < hoverMiddleY && item.index < section.orderIndex) {
          reorderSections(item.id, section.orderIndex);
        }

        if (hoverClientY > hoverMiddleY && item.index < section.orderIndex) {
          reorderSections(item.id, section.orderIndex);
        }

        if (hoverClientY < hoverMiddleY && item.index > section.orderIndex) {
          reorderSections(item.id, section.orderIndex);
        }

        if (hoverClientY > hoverMiddleY && item.index > section.orderIndex) {
          reorderSections(item.id, section.orderIndex + 1);
        }
      }
    },
    [section.orderIndex, reorderSections, section.uuid, updateChannelSectionApi, uuid],
  );

  // React dnd hover handler
  const handleHover = useCallback(
    (item: DraggedItem, monitor: DropTargetMonitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }

      if (item.type === SidebarItem.SECTION) {
        if (!ref.current || item.id === section.uuid) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        if (!clientOffset) return;

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // if (hoverClientY > hoverMiddleY && item.index - section.orderIndex === 1) {
        //   setIsOverTopHalf(false);
        //   setIsOverBottomHalf(false);
        //   return;
        // }
        // if (hoverClientY < hoverMiddleY && item.index - section.orderIndex === -1) {
        //   setIsOverTopHalf(false);
        //   setIsOverBottomHalf(false);
        //   return;
        // }

        if (hoverClientY < hoverMiddleY) {
          setIsOverTopHalf(true);
          setIsOverBottomHalf(false);
        } else if (hoverClientY > hoverMiddleY) {
          setIsOverTopHalf(false);
          setIsOverBottomHalf(true);
        } else {
          setIsOverTopHalf(false);
          setIsOverBottomHalf(false);
        }
      }
    },
    [index, section.uuid],
  );

  // React dnd can drop handler
  const canDropHandler = useCallback(
    (item: DraggedItem) => {
      if (item.type === SidebarItem.SECTION) {
        return true;
      }
      if (item.type === SidebarItem.ITEM) {
        if (item.channelType === section.type || section.type === ChannelType.ANY) {
          return true;
        }
      }
      return false;
    },
    [section.type],
  );

  // React dnd collect handler
  const collectHandler = (monitor: DropTargetMonitor) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    isOver: monitor.getItem()?.type === SidebarItem.ITEM && !!monitor.isOver(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sectionIsOver: monitor.getItem()?.type === SidebarItem.SECTION && !!monitor.isOver(),
  });

  // Handles opening and closing section
  const handleToggleSection = async (bool: boolean) => {
    await updateSectionApi(uuid, { isOpen: bool });
  };

  // Drag drop setup
  const dropSpec = useMemo(
    () => ({
      accept: [SidebarItem.ITEM, SidebarItem.SECTION],
      drop: handleDrop,
      canDrop: canDropHandler,
      hover: handleHover,
      collect: collectHandler,
    }),
    [canDropHandler, handleDrop, handleHover],
  );

  const [{ isOver, sectionIsOver }, drop] = useDrop(dropSpec);
  drop(ref);

  return (
    <div
      className={`relative mb-3 ${isOpen && channelIds.length && 'flex-0'}`}
      // style={{ maxHeight: '70%' }}
    >
      {isOverTopHalf && sectionIsOver && (
        <div className="absolute top-0 left-0 w-full h-px bg-slate-500" />
      )}
      <Collapsible
        open={isOpen}
        onOpenChange={handleToggleSection}
        className={`${isOver ? 'outline-border rounded-lg outline-dotted' : ''} `}
        ref={ref}
      >
        <ListHeader
          id={uuid}
          title={name === 'Default' ? 'Favorites' : name}
          index={section.orderIndex}
          isSystem={isSystem}
          isOpen={isOpen}
          sortBy={sortBy}
          icon={
            <CollapsibleTrigger asChild>
              <Button
                className={`${!isOpen ? '-rotate-90' : ''} w-9 h-9 mt-0.5 rounded-md text-muted`}
                size="icon"
                variant="ghost"
              >
                <CaretDownFill size={15} className="text-secondary" />
              </Button>
            </CollapsibleTrigger>
          }
        />

        <CollapsibleContent className="overflow-auto h-full max-h-[20rem]">
          {channelIds?.length
            ? sortSectionChannels(
                channelIds
                  .map((channelUuid: string) => findChannelByUuid(channelUuid))
                  .filter((channel: Channel | undefined) => channel !== undefined) as Channel[],
                section.sortBy,
              ).map((channel: Channel | undefined) => {
                if (!channel) return null;
                let channelIcon = channel.icon;
                let userId = undefined;
                let userStatus = undefined;

                if (channel.type === ChannelType.DIRECT) {
                  const user = findUserByName(channel.name);
                  if (!user) return;
                  channelIcon = user.profileImage;
                  userId = user.uuid;
                  userStatus = user.status;
                }

                return (
                  <ListItem
                    key={channel.uuid}
                    id={channel.uuid}
                    sectionId={section.uuid}
                    title={channel.name}
                    isChannel
                    type={channel.type}
                    isTemp={channel.isTemp}
                    status={userStatus}
                    isPrivate={channel.isPrivate}
                    icon={
                      <ChannelIcon
                        imageUrl={channelIcon}
                        isPrivate={channel.isPrivate}
                        isSelected={selectedId === channel.uuid}
                        // size={23}
                        userId={userId}
                      />
                    }
                  />
                );
              })
            : null}
        </CollapsibleContent>
      </Collapsible>
      {isOverBottomHalf && sectionIsOver && (
        <div className="absolute bottom-0 left-0 w-full h-px bg-slate-500" />
      )}
    </div>
  );
};

export default observer(Section);
