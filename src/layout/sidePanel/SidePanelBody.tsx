import { ReactNode, RefObject } from 'react';
import { cn } from '@/utils/utils';

type Props = {
  children: ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement>;
};

const SidePanelBody = ({ ref, children, className }: Props) => {
  return (
    <div ref={ref} className={cn('overflow-auto flex flex-col h-full relative px-7', className)}>
      {children}
    </div>
  );
};

export default SidePanelBody;
