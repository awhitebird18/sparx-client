import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Check, ChevronDown, Dot } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';

import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import SearchInput from '@/components/ui/SearchInput';
import NoChannelsFallback from '@/features/channels/components/NoChannelsFallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

import {
  SortOptions,
  ChannelVisibility,
  SubscribeStatus,
  ChannelActions,
} from '@/features/channels/enums';
import { Channel } from '@/features/channels/types';
import { filterWorkspaceChannels } from '@/utils/filterUtils';
import { sortWorkspaceChannels } from '@/utils/sortUtils';
import { ChannelType } from '@/features/channels/enums';
import ContentLayout from '@/components/layout/ContentLayout';

const pageSize = 15;

const WorkspaceChannels: React.FC = () => {
  const {
    fetchWorkspaceChannelsApi,
    isLoading,
    hasMore,
    page,
    sortBy,
    filterChannelVisibility,
    filterBySearchValue,
    filterSubscribed,
    setSortBy,
    setFilterBySearchValue,
    setFilterChannelVisibility,
    setFilterSubscribed,
    workspaceChannels,
    findChannelUserCountByChannelUuid,
    channelUserCounts,
    resetWorkspaceChannelStore,
  } = useStore('workspaceChannelStore');
  const {
    findChannelByUuid,
    addSubscribedChannel,
    joinChannelApi,
    leaveChannelApi,
    subscribedChannels,
  } = useStore('channelStore');
  const { findSectionByChannelType, addChannelUuidToSection } = useStore('sectionStore');
  const { formatAutomatedMessage, createMessageApi } = useStore('messageStore');
  const { setActiveModal } = useStore('modalStore');
  const navigate = useNavigate();
  const { currentUser } = useStore('userStore');
  const [typeDropdown, setTypeDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [subscribedDropdownOpen, setSubscribedDropdownOpen] = useState(false);

  const [loader, setLoader] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchWorkspaceChannelsApi(page, pageSize);
        }
      },
      { threshold: 1 },
    );

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
  }, [fetchWorkspaceChannelsApi, hasMore, loader, page]);

  useEffect(() => {
    return () => {
      resetWorkspaceChannelStore();
    };
  }, [resetWorkspaceChannelStore]);

  const handleViewChannel = (channel: Channel) => {
    const subscribedChannel = findChannelByUuid(channel.uuid);
    if (!subscribedChannel) {
      addSubscribedChannel({ ...channel, isTemp: true });
    }

    navigate(`/app/${channel.uuid}`);
  };

  const handleClickCreateChannel = () => {
    setActiveModal({ type: 'CreateChannelModal', payload: null });
  };

  const handleJoinLeaveChannel = async (channelUuid: string, action: ChannelActions) => {
    if (!currentUser) return;
    switch (action) {
      case ChannelActions.JOIN:
        {
          const section = findSectionByChannelType(ChannelType.CHANNEL);
          if (!section) return;
          const formattedMessage = formatAutomatedMessage({
            userId: currentUser.uuid,
            channelId: channelUuid,
            content: `has joined the channel.`,
          });

          const joinChannelPromise = joinChannelApi({
            channelId: channelUuid,
            sectionId: section.uuid,
          });
          const createMessagePromise = createMessageApi(formattedMessage);

          await Promise.all([joinChannelPromise, createMessagePromise]);
          addChannelUuidToSection(channelUuid, section.uuid);

          navigate(`/app/${channelUuid}`);
        }
        break;
      case ChannelActions.LEAVE:
        {
          const formattedMessage = formatAutomatedMessage({
            userId: currentUser.uuid,
            channelId: channelUuid,
            content: `has left the channel.`,
          });

          const leaveChannelPromise = leaveChannelApi(channelUuid);
          const createMessagePromise = createMessageApi(formattedMessage);

          await Promise.all([createMessagePromise, leaveChannelPromise]);
        }
        break;
    }
  };

  const handleSetSort = (sortValue: SortOptions) => {
    setSortBy(sortValue);
  };

  const handleSetChannelType = (channelType: ChannelVisibility | null) => {
    setFilterChannelVisibility(channelType);
  };

  const handleFilterSubscribedChannels = (subscribeFilter: SubscribeStatus | null) => {
    setFilterSubscribed(subscribeFilter);
  };

  const handleClearFilters = () => {
    setFilterSubscribed(null);
    setFilterChannelVisibility(null);
    setFilterBySearchValue('');
  };

  const filteredWorkspaceChannels = filterWorkspaceChannels(workspaceChannels, subscribedChannels, {
    filterSubscribed: filterSubscribed,
    filterBySearchValue: filterBySearchValue,
    filterChannelVisibility: filterChannelVisibility,
  });

  const sortedWorkspaceChannels = sortWorkspaceChannels(
    filteredWorkspaceChannels,
    channelUserCounts,
    sortBy,
  );

  const headerBtn = (
    <Button
      className="bg-userDark hover:bg-userDark text-white h-8 px-2"
      onClick={handleClickCreateChannel}
      size="sm"
    >
      Create Channel
    </Button>
  );

  return (
    <ContentLayout title="Channels" headerComponent={headerBtn}>
      <SearchInput
        value={filterBySearchValue}
        setValue={setFilterBySearchValue}
        placeholder="Search channels"
      />
      <div className="flex gap-2 mt-2 justify-between">
        <div className="flex gap-2">
          {/* Channel type filter */}
          <DropdownMenu open={typeDropdown} onOpenChange={setTypeDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={filterChannelVisibility ? 'default' : 'outline'}
                className="gap-2 py-0 w-40 justify-between"
                size="sm"
              >
                {filterChannelVisibility || 'Channel Type'} <ChevronDown className="text-xs" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
              <DropdownMenuItem onClick={() => handleSetChannelType(null)}>
                Any Channel Type
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSetChannelType(ChannelVisibility.PUBLIC)}>
                Public Channels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSetChannelType(ChannelVisibility.PRIVATE)}>
                Private Channels
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Subscribed Status filter */}
          <DropdownMenu open={subscribedDropdownOpen} onOpenChange={setSubscribedDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={filterSubscribed ? 'default' : 'outline'}
                size="sm"
                className="gap-2 py-0 w-40 justify-between"
              >
                {filterSubscribed || 'Subscribed Status'} <ChevronDown className="text-xs" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
              <DropdownMenuItem onClick={() => handleFilterSubscribedChannels(null)}>
                All Channels
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterSubscribedChannels(SubscribeStatus.SUBSCSRIBED)}
              >
                Subscribed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilterSubscribedChannels(SubscribeStatus.UNSUBSCRIBED)}
              >
                Unsubsribed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {(filterChannelVisibility || filterBySearchValue || filterSubscribed) && (
          <Button size="sm" onClick={handleClearFilters} variant="secondary">
            Clear Filters
          </Button>
        )}
      </div>
      <div className="flex gap-2 mt-2 justify-between border-b border-border items-center py-1 pl-2">
        <span className="text-sm text-muted-foreground items-center">
          {sortedWorkspaceChannels.length} Results
        </span>
        {/* Channel Sort */}
        <DropdownMenu open={sortDropdownOpen} onOpenChange={setSortDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2" size="sm">
              Sort: {sortBy} <ChevronDown className="text-xs" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
            <DropdownMenuItem onClick={() => handleSetSort(SortOptions.ATOZ)}>
              A to Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetSort(SortOptions.ZTOA)}>
              Z to A
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetSort(SortOptions.MOSTMEMBERS)}>
              Most members
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetSort(SortOptions.LEASTMEMBERS)}>
              Least members
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetSort(SortOptions.NEWEST)}>
              Newest channel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSetSort(SortOptions.OLDEST)}>
              Oldest channel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ul className="mt-3 flex-1 overflow-auto">
        {sortedWorkspaceChannels.map((channel: Channel) => {
          const channelFound = subscribedChannels.find((el: Channel) => el.uuid === channel.uuid);

          const isSubscribed = !!channelFound;
          const userCount = findChannelUserCountByChannelUuid(channel.uuid);

          return (
            <li
              key={channel.uuid}
              className="flex justify-between items-center border-b border-border p-4 cursor-pointer group hover:bg-secondary/25"
              onClick={() => handleViewChannel(channel)}
            >
              <div>
                <p className="font-semibold">{channel.name}</p>
                <p className="text-sm h-6 flex gap-1 text-muted-foreground items-center">
                  {isSubscribed ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <Check className="text-lg mt-1" /> <span>Joined</span>
                    </span>
                  ) : null}

                  {isSubscribed && userCount ? <Dot className="text-lg" /> : null}
                  {userCount ? (
                    <span className="flex items-center gap-1">
                      {userCount} member{userCount === 1 ? '' : 's'}
                    </span>
                  ) : null}
                  {userCount && channel.description ? <Dot className="text-lg" /> : null}
                  {channel.description && (
                    <span className="flex items-center gap-1">{channel.description}</span>
                  )}
                </p>
              </div>
              <div className="space-x-2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                {isSubscribed ? (
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinLeaveChannel(channel.uuid, ChannelActions.LEAVE);
                    }}
                    className="py-1 px-2 font-semibold rounded w-20"
                  >
                    {ChannelActions.LEAVE}
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinLeaveChannel(channel.uuid, ChannelActions.JOIN);
                    }}
                    className="py-1 px-2 font-semibold rounded shadow-md  bg-emerald-500 hover:bg-emerald-600 w-20 text-white"
                  >
                    {ChannelActions.JOIN}
                  </Button>
                )}
              </div>
            </li>
          );
        })}
        {isLoading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}

        {!isLoading && !sortedWorkspaceChannels.length ? <NoChannelsFallback /> : null}
        <div ref={setLoader} />
      </ul>
    </ContentLayout>
  );
};

export default observer(WorkspaceChannels);
