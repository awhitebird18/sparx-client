import { Button } from '@/components/ui/Button';

type Props = { icon: string; active: boolean; onClick: () => void };

const IconButton = ({ icon, active, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      className={`w-8 h-8 p-0 border-none rounded-none ${active && 'bg-violet-700 text-white'}`}
      variant="outline"
    >
      {icon[0].toUpperCase()}
    </Button>
  );
};

export default IconButton;
