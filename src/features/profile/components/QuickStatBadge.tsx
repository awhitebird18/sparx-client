import { ReactNode } from 'react';
import { CardSkeleton } from './CardSkeleton';

type Props = { icon: ReactNode; label: string; count: number; isLoading: boolean };

const QuickStatBadge = ({ icon, label, count, isLoading }: Props) => {
  if (isLoading) return <CardSkeleton />;

  return (
    <div className="card-base flex items-center gap-5 prose dark:prose-invert w-full p-6">
      {icon}
      <div>
        <h3 className="text-main">{count}</h3>
        <p className="text-secondary">{label}</p>
      </div>
    </div>
  );
};

export default QuickStatBadge;
