import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

const SidePanelBody = ({ children, className }: Props) => {
  return (
    <div className={cn('overflow-auto flex flex-col h-full relative px-7', className)}>
      {children}
    </div>
  );
};

export default SidePanelBody;
