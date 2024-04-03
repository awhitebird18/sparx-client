import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import useHistoryState from '@/hooks/useHistoryState';
import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { Fire, PlayBtnFill, StarFill, ThreeDots } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import { useState } from 'react';
import WorkspaceActivity from './WorkspaceActivity';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

// Duplicated from CurrentNode
type HistoryItem = {
  nodeId: string;
  primaryView: string;
  timestamp: number;
  name: string;
  status: string;
  lastViewed: string;
};

const Overview = () => {
  const { currentUser } = useStore('userStore');
  const { currentWorkspaceId, currentUserWorkspaceData } = useStore('workspaceStore');
  const navigate = useNavigate();
  const { findChannelByUuid } = useStore('channelStore');
  const history = useHistoryState();

  const [activityFilter, setActivityFiler] = useState('all');

  const sortedArray = history.sort((a: any, b: any) => b.timestamp - a.timestamp);

  const uniqueNodes: HistoryItem[] = [];
  const seenNodeIds = new Set();

  sortedArray.forEach((item: any) => {
    if (!seenNodeIds.has(item.nodeId)) {
      const channel = findChannelByUuid(item.nodeId);

      if (channel) {
        uniqueNodes.push({
          ...item,
          name: channel.name,
          status: channel.subscriptionDetails?.status,
          lastViewed: channel.subscriptionDetails?.lastRead,
        });
        seenNodeIds.add(item.nodeId);
      }
    }
  });

  // Now, let's get the top 3 unique items from uniqueNodes.
  const sortedUniqueNodes = uniqueNodes.sort((a, b) => b.timestamp - a.timestamp);
  const top3UniqueNodes = sortedUniqueNodes.slice(0, 3);

  // useEffect(() => {
  //   if (!currentWorkspaceId) return;

  //   const fn = async () => {
  //     const data = await homeApi.getRecentWorkspaceActivity(currentWorkspaceId);

  //     setActivity(data);
  //     setActivityLoading(false);
  //   };

  //   fn();
  // }, [currentWorkspaceId]);

  const handleClickQuickAction = (path: string) => {
    navigate(path);
  };

  // const filteredActivity =
  //   activityFilter === 'all' ? activity : activity.filter((a: any) => a.type === activityFilter);

  return (
    <div className="flex flex-col gap-5 w-full text-main prose p-8 h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between w-full pt-4">
        {/* Welcome Message */}
        <div className="flex flex-col gap-1">
          <h2 className="text-main text-3xl font-medium">
            {`Welcome, ${currentUser?.firstName} ${currentUser?.lastName}`}
          </h2>
          <p className="text-secondary">Here is what's happening in your workspace</p>
        </div>

        {/* Streak */}
        {/* Change condition to only show after 1 day streak */}
        {currentUserWorkspaceData.streakCount > 0 ? (
          <h3 className="block text-main whitespace-nowrap gap-0">
            You are on a{' '}
            <span className="font-bold gap-2 flex items-center leading-normal text-3xl bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-emerald-500">
              {`${currentUserWorkspaceData.streakCount} day streak!`}{' '}
              <Fire className="text-emerald-500 ml-1" size={24} />
            </span>
          </h3>
        ) : null}
      </div>

      {/* Main */}
      <div className="flex flex-col 2xl:flex-row gap-10 flex-1 overflow-hidden w-full">
        {/* Left */}
        <div className="flex flex-col gap-10 z-10 w-full">
          {/* Quick Actions */}
          <div className="space-y-3  prose">
            <h3 className="text-main">Quick Actions</h3>
            <div className="flex gap-3 card border border-border bg-card rounded-xl px-5 py-6 shadow overflow-auto">
              <Button
                onClick={() => handleClickQuickAction('/app/nodemap')}
                size="sm"
                variant="outline-primary"
                className="gap-2 rounded-2xl px-4 whitespace-nowrap"
              >
                {/* <Diagram2 size={20} /> */}
                View Nodemap
              </Button>
              <Button
                onClick={() => handleClickQuickAction('/app/flashcards')}
                size="sm"
                variant="outline-primary"
                className="gap-2 rounded-2xl px-4 whitespace-nowrap"
              >
                {/* <CardHeading size={18} /> */}
                Study Flashcards
              </Button>
              <Button
                onClick={() => handleClickQuickAction('/app/notes')}
                size="sm"
                variant="outline-primary"
                className="gap-2 rounded-2xl px-4 whitespace-nowrap"
              >
                View Notes
                {/* <PencilFill size={14} /> */}
              </Button>
              <Button
                onClick={() => handleClickQuickAction('/app/discussions')}
                size="sm"
                variant="outline-primary"
                className="gap-2 rounded-2xl px-4 whitespace-nowrap"
              >
                {/* <ChatLeftDots size={18} /> */}
                View Discussions
              </Button>
            </div>
          </div>
          {/* Recent */}
          <div className="prose space-y-3 rounded-xl">
            <h3 className="text-main">Recent Nodes</h3>
            <div className="flex w-full gap-4">
              {top3UniqueNodes.map((item: HistoryItem) => (
                <LastViewedCard
                  title={item.name}
                  date={item.lastViewed}
                  status={item.status}
                  channelId={item.nodeId}
                />
              ))}
            </div>
          </div>

          {/* Tasks */}
          <TaskList />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6 relative h-full overflow-hidden w-full 2xl:w-[26rem] flex-shrink-0">
          <div className="absolute top-0 right-0 flex flex-col w-full card prose space-y-3 rounded-xl h-full">
            <div className="flex justify-between items-center">
              <h3 className="text-main">Activity</h3>

              <Select onValueChange={(value: string) => setActivityFiler(value)} defaultValue="all">
                <SelectTrigger className="w-min gap-2 h-8 rounded-lg prose text-secondary text-sm whitespace-nowrap">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem key="all" value="all">
                    All
                  </SelectItem>
                  <SelectItem key="content" value="content">
                    Content
                  </SelectItem>
                  <SelectItem key="user" value="user">
                    New users
                  </SelectItem>
                  <SelectItem key="Node Completed" value="Node Completed">
                    Completions
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-full overflow-auto pr-2">
              <WorkspaceActivity endpoint={`/activity/workspace/${currentWorkspaceId}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(Overview);

const LastViewedCard = ({
  title,
  date,
  status,
  channelId,
}: {
  title: string;
  date: string;
  status: string;
  channelId: string;
}) => {
  const { setCurrentChannelUuid } = useStore('channelStore');
  const navigate = useNavigate();
  const statusColor = status === CompletionStatus.Complete ? 'text-complete' : 'text-progress';

  const statusIcon =
    status === CompletionStatus.Complete ? (
      <StarFill className={`${statusColor}`} size={14} />
    ) : (
      <PlayBtnFill className={`${statusColor}`} size={14} />
    );

  const handleNavigation = async (path: string) => {
    await setCurrentChannelUuid(channelId);
    navigate(path);
  };

  return (
    <div className="w-1/3 relative h-36 rounded-xl flex flex-col shadow p-5  justify-center text-main prose bg-card card border border-border">
      <div className="flex justify-between items-start flex-1">
        <div className="flex flex-col flex-1 gap-3 overflow-hidden">
          <h3 className="text-main prose-lg leading-none truncate">{title}</h3>
          <div className="flex items-center gap-2">
            {statusIcon}
            <p
              className={`text-complete text-sm font-medium tracking-wide leading-none ${statusColor}`}
            >
              {status}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ThreeDots />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleNavigation('/app/notes')}>
              View Notes
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation('/app/flashcards')}>
              Study Flashcards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation('/app/discussions')}>
              View Discussions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-secondary text-sm">{`Last viewed on ${dayjs(date).format('MMM D')}`}</p>
    </div>
  );
};
