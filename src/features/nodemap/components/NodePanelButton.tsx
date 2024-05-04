import { Button } from '@/components/ui/Button';
import { ReactNode } from 'react';

type Props = {
  isSubscribed: boolean;
  children: ReactNode;
  onClick?: () => void;
};

const NodePanelButton = ({ isSubscribed, children, onClick }: Props) => (
  <Button
    variant="ghost"
    className={`h-12 w-12 text-secondary ${!isSubscribed && 'opacity-40 pointer-events-none'}`}
    size="icon"
    onClick={onClick}
  >
    {children}
  </Button>
);

export default NodePanelButton;
