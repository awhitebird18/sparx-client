import { Button } from '@/components/ui/Button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/Collapsible';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { ChannelTreeNode } from '@/features/nodemap/types/channelTreeNode';
import { useStore } from '@/stores/RootStore';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { ChevronRight, CupHotFill, PlayFill, StarFill } from 'react-bootstrap-icons';

const getStatusIcon = (completionStatus: CompletionStatus) => {
  if (completionStatus === CompletionStatus.Complete)
    return <StarFill size={14} className="text-yellow-400" />;
  if (completionStatus === CompletionStatus.InProgress)
    return <PlayFill size={18} className="text-primary" />;
  if (completionStatus === CompletionStatus.OnHold)
    return <CupHotFill size={15} className="text-muted/70 mb-0.5 mr-0.5" />;
};

const StatsPanel = observer(() => {
  const { channelTree, findUserChannelDataByChannelId, completionPercentage } =
    useStore('channelStore');

  const renderNode = (node: ChannelTreeNode): JSX.Element => {
    const subscription = findUserChannelDataByChannelId(node.channel.uuid);
    const hasChildren = node.children.length;
    const channel = node.channel;

    return (
      <div key={node.channel.uuid} className="relative">
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex w-full gap-1.5 justify-start collapsible h-14">
            <div className="w-4 h-4 toggler flex items-center justify-center">
              {hasChildren ? <ChevronRight className="text-main ml-0.5" size={13} /> : null}
            </div>
            <div className="flex flex-col prose dark:prose-invert space-y-1.5">
              <p className="text-start font-medium leading-none text-main">{channel.name}</p>
              {subscription?.status === CompletionStatus.Complete ? (
                <p className="text-xs text-secondary leading-none text-left pl-0.5">
                  Completed on {dayjs(channel.createdAt).format('MMM d, YYYY')}
                </p>
              ) : null}
            </div>

            <p
              className={`ml-auto text-sm flex gap-1.5 items-center ${
                subscription?.status === CompletionStatus.InProgress ? 'text-primary' : 'text-muted'
              } ${
                subscription?.status === CompletionStatus.Complete && 'text-yellow-500'
              } leading-none`}
            >
              {subscription?.status ? getStatusIcon(subscription.status) : null}
              {subscription?.status ? subscription?.status : 'Not started'}
            </p>
          </CollapsibleTrigger>
          {hasChildren ? (
            <CollapsibleContent className="pl-8 flex flex-col">
              {node.children.map(renderNode)}
            </CollapsibleContent>
          ) : null}
        </Collapsible>
      </div>
    );
  };

  const nodes = channelTree.map(renderNode);

  return (
    <div className="flex flex-col rounded-xl w-full h-full prose dark:prose-invert">
      <div className="flex items-center justify-between p-5 mb-3">
        <h3 className="flex items-center text-main">Progress</h3>

        <div
          className={`flex items-center whitespace-nowrap gap-4 transition-all ease-in-out duration-300 overflow-hidden`}
        >
          <Button size="sm" className="px-4 font-medium">{`${completionPercentage}%`}</Button>
        </div>
      </div>

      <div className="flex flex-col overflow-auto h-full px-5">{nodes}</div>
    </div>
  );
});

export default StatsPanel;
