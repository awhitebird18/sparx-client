import { useEffect, useState } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import CelebrationAnimation from './CompleteAnimation';
import { observer } from 'mobx-react-lite';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';

export type Props = { uuid: string; status: string; isActive: boolean };

const NodeStatus = observer(({ status, isActive }: Props) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (status === CompletionStatus.Complete) {
      setShowLabel(false);

      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        setShowLabel(true);
      }, 3000);
    }
  }, [status]);

  return (
    <span
      className={`flex items-center text-muted pointer-events-none w-16 leading-tight whitespace-nowrap relative ${
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
});

export default NodeStatus;
