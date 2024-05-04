import { Button } from '@/components/ui/Button';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ChevronLeft, CupHot, Play, StarFill } from 'react-bootstrap-icons';
import NodeStatBadge from './NodeStatBadge';
import NodeStatsSkeleton from './NodeStatsSkeleton';
import { useNodemapStore } from '../hooks/useNodemapStore';

const NodeStats = observer(() => {
  const [isOpen, setIsOpen] = useState(true);
  const { completionPercentage, channelStats } = useStore('channelStore');
  const { isLoading } = useNodemapStore();

  if (isLoading) return <NodeStatsSkeleton />;

  return (
    <div className="card-base flex gap-2.5 whitespace-nowrap items-center fixed bottom-2 left-2 p-1 pr-5 h-12">
      <Button variant="outline-primary">{`${completionPercentage}%`}</Button>

      <div
        className={`flex items-center whitespace-nowrap gap-2.5 transition-all ease-in-out duration-300 ${
          isOpen ? 'max-w-lg' : 'max-w-0'
        } overflow-hidden`}
      >
        <NodeStatBadge
          count={channelStats[CompletionStatus.Complete]}
          icon={<StarFill className="text-yellow-400" />}
        />
        <NodeStatBadge count={channelStats[CompletionStatus.OnHold]} icon={<CupHot />} />
        <NodeStatBadge count={channelStats[CompletionStatus.InProgress]} icon={<Play />} />
      </div>
      <CloseButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
});

export default NodeStats;

type CloseButtonProps = { isOpen: boolean; setIsOpen: (value: boolean) => void };
const CloseButton = ({ isOpen, setIsOpen }: CloseButtonProps) => {
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Button
      onClick={handleToggleOpen}
      className="absolute -right-3 top-1/2 -translate-y-1/2 h-7 w-7 p-0.5 ml-auto bg-card !border-border"
      variant="default"
    >
      <ChevronLeft
        className={`transition-transform transform duration-300 text-muted ${
          !isOpen && 'rotate-180'
        }`}
      />
    </Button>
  );
};
