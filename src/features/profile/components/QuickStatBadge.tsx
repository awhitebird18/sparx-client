import { ReactNode } from 'react';
import { CardSkeleton } from './CardSkeleton';

type Props = { icon: ReactNode; label: string; count: number; isLoading: boolean };

const QuickStatBadge = ({ icon, label, count, isLoading }: Props) => {
  return (
    <>
      {!isLoading ? (
        <div className="card flex items-center gap-4 prose w-full bg-card shadow-md border border-border p-6 rounded-lg">
          {icon}
          <div>
            <h3 className="text-main">{count}</h3>
            <p className="text-secondary">{label}</p>
          </div>
        </div>
      ) : (
        <CardSkeleton />
      )}
    </>
  );
};

export default QuickStatBadge;
