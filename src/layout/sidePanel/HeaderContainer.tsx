import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

type Props = {
  title: string;
  className?: string;
  element?: ReactNode;
};

const HeaderContainer = ({ title, className, element }: Props) => {
  return (
    <div
      className={cn('flex justify-between items-center prose dark:prose-invert px-7', className)}
    >
      <h3>{title}</h3>

      {element}
    </div>
  );
};

export default HeaderContainer;
