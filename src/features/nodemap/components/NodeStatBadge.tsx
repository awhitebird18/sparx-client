import { ReactNode } from 'react';

type Props = {
  count: number;
  icon: ReactNode;
};

const NodeStatBadge = ({ count, icon }: Props) => {
  return (
    <div className="flex-shrink-0 whitespace-nowrap text-secondary flex items-center gap-1.5 h-10 w-10 justify-center rounded-md">
      {count}
      {icon}
    </div>
  );
};

export default NodeStatBadge;
