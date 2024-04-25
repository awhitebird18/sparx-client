import { ReactNode } from 'react';
import { Button } from './ui/Button';

type Props = {
  title: string;
  description: string | ReactNode;
  action?: { icon?: ReactNode; title: string; callback: () => void };
};

const EmptyFallback = ({ title, description, action }: Props) => {
  return (
    <div className="flex flex-col gap-5 max-w-sm items-center prose">
      <div className="flex flex-col gap-2 items-center">
        <h3 className="text-center text-main text-xl">{title}</h3>
        <p className="text-center text-secondary flex-items-center">{description}</p>
      </div>

      <Button className="items-center gap-1" onClick={action?.callback}>
        {action?.icon}
        {action?.title}
      </Button>
    </div>
  );
};

export default EmptyFallback;
