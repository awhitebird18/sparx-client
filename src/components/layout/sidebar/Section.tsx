import { useCallback, useMemo, useRef, useState } from 'react';
import { CaretDownFill, Plus } from 'react-bootstrap-icons';
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
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';

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
  const { uuid, type, name, channelIds, isSystem, isOpen, sortBy } = section;
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
      if (item.type === SidebarItem.ITEM && item.sectionId !== section.uuid) {
        await updateChannelSectionApi(uuid, item.id);
      }

      if (item.type === SidebarItem.SECTION) {
        let hoverIndex = index;

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        if (!hoverBoundingRect) return;
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        if (!clientOffset) return;

        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (hoverClientY > hoverMiddleY) {
          hoverIndex += 1;
        }

        reorderSections(item.id, hoverIndex);
      }

      setIsOverTopHalf(false);
      setIsOverBottomHalf(false);
    },
    [index, reorderSections, section.uuid, updateChannelSectionApi, uuid],
  );

  // React dnd hover handler
  const handleHover = useCallback(
    (item: DraggedItem, monitor: DropTargetMonitor) => {
      if (!monitor.isOver({ shallow: true })) {
        setIsOverBottomHalf(false);
        setIsOverTopHalf(false);
        return;
      }
      if (item.type === SidebarItem.SECTION) {
        if (!ref.current) {
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

        if (hoverClientY < hoverMiddleY) {
          setIsOverTopHalf(true);
          setIsOverBottomHalf(false);
        } else {
          setIsOverTopHalf(false);
          setIsOverBottomHalf(true);
        }
      }
    },
    [index],
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

  const [{ isOver }, drop] = useDrop(dropSpec);
  drop(ref);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleToggleSection}
      className={`py-1 my-1 ${isOver ? 'outline-border rounded-lg outline-dotted' : ''} ${
        isOverBottomHalf ? 'border-b-2' : ''
      } ${isOverTopHalf ? 'border-t-2' : ''}`}
      ref={ref}
    >
      <div>
        <ListHeader
          id={uuid}
          title={name}
          index={index}
          isSystem={isSystem}
          isOpen={isOpen}
          sortBy={sortBy}
          icon={
            <CollapsibleTrigger asChild>
              <Button
                className={`${!isOpen ? '-rotate-90' : ''} w-6 h-6 rounded-md text-main`}
                size="icon"
                variant="ghost"
              >
                <CaretDownFill />
              </Button>
            </CollapsibleTrigger>
          }
        />
      </div>

      <CollapsibleContent>
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

              if (channelIcon) {
                channelIcon = transformCloudinaryUrl(channelIcon, 60, 60);
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
                      size={22}
                      userId={userId}
                    />
                  }
                />
              );
            })
          : null}

        {isSystem ? (
          <ListItem
            id={type === ChannelType.CHANNEL ? 'channels' : 'users'}
            icon={<Plus size={16} />}
            title={type === ChannelType.DIRECT ? 'View Users' : 'Explore Channels'}
            disabled
          />
        ) : (
          ''
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default observer(Section);
