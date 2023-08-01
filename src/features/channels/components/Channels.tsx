import { Button } from '@/components/ui/Button';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/stores/RootStore';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';
import Header from '@/components/layout/containers/Header';
import Content from '@/components/layout/containers/Content';
import SearchInput from '@/components/ui/SearchInput';
import NoChannelsFallback from './NoChannelsFallback';
import Body from '@/components/layout/containers/Body';
import { Check, ChevronDown, Dot } from 'react-bootstrap-icons';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { joinChannelApi } from '../api/joinChannel';
import { leaveChannelApi } from '../api/leaveChannelApi';
import { SortOptions } from '../types/channelEnums';
import { ChannelPrivateEnum, SubscribeStatusEnum, ChannelActions } from '../types/channelEnums';
import { Channel } from '..';

const pageSize = 15;

const Channels: React.FC = () => {
  const {
    fetchWorkspaceChannels,
    isLoading,
    hasMore,
    page,
    sortBy,
    filteredAndSortedChannels,
    filterChannelType,
    filterBySearchValue,
    filterSubscribed,
    setSortBy,
    setFilterBySearchValue,
    setFilterChannelType,
    setFilterSubscribed,
    addSubscribedChannel,
    findById,
    findfindWorkspaceChannelByIdById,
  } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const navigate = useNavigate();
  const [typeDropdown, setTypeDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [subscribedDropdownOpen, setSubscribedDropdownOpen] = useState(false);

  const [loader, setLoader] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchWorkspaceChannels(page, pageSize);
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
  }, [fetchWorkspaceChannels, hasMore, loader, page]);

  const handleViewChannel = (id: string) => {
    const subscribedChannel = findById(id);
    if (!subscribedChannel) {
      const workspaceChannel = findfindWorkspaceChannelByIdById(id);

      if (!workspaceChannel) return;
      addSubscribedChannel({ ...workspaceChannel, isSubscribed: false });
    }

    navigate(`/app/${id}`);
  };

  const handleClickCreateChannel = () => {
    setActiveModal({ type: 'CreateChannelModal', payload: null });
  };

  const handleJoinLeaveChannel = async (channelId: string, action: ChannelActions) => {
    switch (action) {
      case ChannelActions.JOIN:
        {
          await joinChannelApi(channelId);
        }
        break;
      case ChannelActions.LEAVE:
        {
          await leaveChannelApi(channelId);
        }
        break;
    }
  };

  const handleSetSort = (sortValue: SortOptions) => {
    setSortBy(sortValue);
  };

  const handleSetChannelType = (channelType: ChannelPrivateEnum | null) => {
    setFilterChannelType(channelType);
  };

  const handleFilterSubscribedChannels = (subscribeFilter: SubscribeStatusEnum | null) => {
    setFilterSubscribed(subscribeFilter);
  };

  const handleClearFilters = () => {
    setFilterSubscribed(null);
    setFilterChannelType(null);
    setFilterBySearchValue('');
  };

  return (
    <Content>
      <Header>
        <h3 className="text-lg leading-6 font-medium">Channels</h3>
        <Button
          className="bg-userDark hover:bg-userDark text-white h-8 px-2"
          onClick={handleClickCreateChannel}
          size="sm"
        >
          Create Channel
        </Button>
      </Header>
      <Body>
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
                  variant={filterChannelType ? 'default' : 'outline'}
                  className={`gap-2 py-0 w-40 justify-between ${
                    filterChannelType && 'bg-userLight hover:bg-userLight text-white'
                  }`}
                  size="sm"
                >
                  {filterChannelType || 'Channel Type'} <ChevronDown className="text-xs" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
                <DropdownMenuItem onClick={() => handleSetChannelType(null)}>
                  Any Channel Type
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSetChannelType(ChannelPrivateEnum.PUBLIC)}>
                  Public Channels
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSetChannelType(ChannelPrivateEnum.PRIVATE)}>
                  Private Channels
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Subscribed Status filter */}
            <DropdownMenu open={subscribedDropdownOpen} onOpenChange={setSubscribedDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={filterSubscribed ? 'default' : 'outline'}
                  className={`gap-2 py-0 w-40 justify-between ${
                    filterSubscribed && 'bg-userLight hover:bg-userLight text-white'
                  }`}
                  size="sm"
                >
                  {filterSubscribed || 'Subscribed Status'} <ChevronDown className="text-xs" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="DropdownMenuContent w-60" align="start">
                <DropdownMenuItem onClick={() => handleFilterSubscribedChannels(null)}>
                  All Channels
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterSubscribedChannels(SubscribeStatusEnum.SUBSCSRIBED)}
                >
                  Subscribed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilterSubscribedChannels(SubscribeStatusEnum.UNSUBSCRIBED)}
                >
                  Unsubsribed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {(filterChannelType || filterBySearchValue || filterSubscribed) && (
            <Button
              className="justify-self-end bg-muted-foreground hover:bg-muted-foreground text-white"
              size="sm"
              onClick={handleClearFilters}
              variant="default"
            >
              Clear Filters
            </Button>
          )}
        </div>
        <div className="flex gap-2 mt-2 justify-between border-b border-border items-center py-1 pl-2">
          <span className="text-sm text-muted-foreground items-center">
            {filteredAndSortedChannels.length} Results
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
          {filteredAndSortedChannels.map((channel: Channel) => (
            <li
              key={channel.uuid}
              className="flex justify-between items-center border-b border-border p-4 cursor-pointer group hover:bg-secondary/25"
              onClick={() => handleViewChannel(channel.uuid)}
            >
              <div>
                <p className="font-semibold">{channel.name}</p>
                <p className="text-sm h-6 flex gap-1 text-muted-foreground items-center">
                  {channel.isSubscribed ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <Check className="text-lg mt-1" /> <span>Joined</span>
                    </span>
                  ) : null}

                  {channel.isSubscribed && channel.userCount > 0 ? (
                    <Dot className="text-lg" />
                  ) : null}
                  {channel.userCount > 0 ? (
                    <span className="flex items-center gap-1">
                      {channel.userCount} member{channel.userCount === 1 ? '' : 's'}
                    </span>
                  ) : null}
                  {channel.userCount > 0 && channel.description ? (
                    <Dot className="text-lg" />
                  ) : null}
                  {channel.description && (
                    <span className="flex items-center gap-1">{channel.description}</span>
                  )}
                </p>
              </div>
              <div className="space-x-2 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out">
                {channel.isSubscribed ? (
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinLeaveChannel(channel.uuid, ChannelActions.LEAVE);
                    }}
                    className="py-1 px-2 font-semibold rounded text-white bg-popover dark:bg-secondary hover:bg-secondary w-20"
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
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}

          {!isLoading && !filteredAndSortedChannels.length ? <NoChannelsFallback /> : null}
          <div ref={setLoader} />
        </ul>
      </Body>
    </Content>
  );
};

export default observer(Channels);
