import { useEffect, useState } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import CelebrationAnimation from './CompleteAnimation';
import { observer } from 'mobx-react-lite';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';

const NodeStatus = ({ status, isActive }: { uuid: string; status: string; isActive: boolean }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

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

  return (
    <span
      className={`transition-all duration-[3000ms] flex items-center gap-2 text-muted relative ${
        status === CompletionStatus.Complete && 'text-yellow-400'
      } ${status === CompletionStatus.InProgress && 'text-primary'} text-sm font-medium ${
        isActive && 'text-white'
      }`}
    >
      {status === CompletionStatus.Complete ? (
        <>
          {showAnimation && <CelebrationAnimation />}

          <div className={`flex items-center gap-2 ${!showLabel && 'opacity-0'}`}>
            <StarFill size={11} /> Complete
          </div>
        </>
      ) : (
        status
      )}
    </span>
  );
};

export default observer(NodeStatus);
