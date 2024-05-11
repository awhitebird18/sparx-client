import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const SidePanelContainer = ({ children, className }: Props) => {
  return (
    <div className={cn('overflow-hidden h-full flex flex-col gap-7 pt-6', className)}>
      {children}
    </div>
  );
};

export default SidePanelContainer;
