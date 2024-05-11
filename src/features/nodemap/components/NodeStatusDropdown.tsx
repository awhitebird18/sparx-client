import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { useStore } from '@/stores/RootStore';
import { updateUserChannel } from '@/features/channels/api/updateUserChannel';
import { Alarm, ChevronDoubleRight, PlayCircle, Star, StarFill } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';

const NodeStatusDropdown = ({ uuid }: { uuid: string }) => {
  const { userChannelData, updateUserChannelData } = useStore('channelStore');
  const { setSidePanelComponent } = useStore('sidePanelStore');
  const userChannelDetails = userChannelData.find((el) => el.channelId === uuid);

  const handleUpdateChannelStatus = async (
    statusVal: CompletionStatus,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const channel = await updateUserChannel(uuid, { status: statusVal });
    updateUserChannelData({ uuid: channel.uuid, status: channel.status });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 w-12 text-secondary"
          size="icon"
          onClick={() => setSidePanelComponent({ type: 'assistant' })}
        >
          <Star size={17} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-52 p-2 space-y-1" align="start" sideOffset={10}>
        <>
          <DropdownMenuLabel className="text-secondary font-normal text-sm py-1">
            Set Status
          </DropdownMenuLabel>

          <DropdownMenuItem
            className={`flex items-center gap-3 ${
              userChannelDetails?.status === CompletionStatus.Skip &&
              'bg-primary hover:!bg-primary !text-white'
            }`}
            onClick={(e) => handleUpdateChannelStatus(CompletionStatus.Skip, e)}
          >
            <ChevronDoubleRight /> Skip
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex items-center gap-3 ${
              userChannelDetails?.status === CompletionStatus.InProgress &&
              'bg-primary hover:!bg-primary !text-white'
            }`}
            onClick={(e) => handleUpdateChannelStatus(CompletionStatus.InProgress, e)}
          >
            <PlayCircle /> In progress
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex items-center gap-3 ${
              userChannelDetails?.status === CompletionStatus.OnHold &&
              'bg-primary hover:!bg-primary !text-white'
            }`}
            onClick={(e) => handleUpdateChannelStatus(CompletionStatus.OnHold, e)}
          >
            <Alarm /> On hold
          </DropdownMenuItem>
          <DropdownMenuItem
            className={`flex items-center gap-3 ${
              userChannelDetails?.status === CompletionStatus.Complete &&
              'bg-primary hover:!bg-primary !text-white'
            }`}
            onClick={(e) => handleUpdateChannelStatus(CompletionStatus.Complete, e)}
          >
            <StarFill className="text-yellow-400" />
            Complete
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NodeStatusDropdown;
