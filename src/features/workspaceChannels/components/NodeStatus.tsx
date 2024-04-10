import { useEffect, useState } from 'react';
import { ChevronDoubleRight, CupHot, Play, StarFill } from 'react-bootstrap-icons';
import CelebrationAnimation from './CompleteAnimation';
import { observer } from 'mobx-react-lite';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';

const NodeStatus = ({ status, isActive }: { uuid: string; status: string; isActive: boolean }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  let icon = undefined;

  useEffect(() => {
    if (status === CompletionStatus.Complete) {
      setShowLabel(false);

      // Show animation
      setShowAnimation(true); // Trigger animation
      setTimeout(() => {
        setShowAnimation(false);
        setShowLabel(true);
      }, 3000);
    }
  }, [status]);

  switch (status) {
    case CompletionStatus.Complete:
      icon = <StarFill size={11} />;
      break;
    case CompletionStatus.InProgress:
      icon = <Play />;
      break;
    case CompletionStatus.OnHold:
      icon = <CupHot />;
      break;
    case CompletionStatus.Skip:
      icon = <ChevronDoubleRight />;
      break;
    default:
      break;
  }

  return (
    <span
      className={`transition-all duration-[3000ms] flex items-center text-muted w-16 leading-tight whitespace-nowrap relative ${
        status === CompletionStatus.Complete && 'text-yellow-400'
      } ${status === CompletionStatus.InProgress && 'text-primary'} text-sm ${
        isActive && 'text-white'
      }`}
    >
      {status === CompletionStatus.Complete ? (
        <>
          {showAnimation && <CelebrationAnimation />}

          <div className={`flex items-center text-sm gap-1.5 ${!showLabel && 'opacity-0'}`}>
            <StarFill size={11} className="mt-[0.08rem]" /> Complete
          </div>
        </>
      ) : (
        status
      )}
    </span>
  );
};

export default observer(NodeStatus);
