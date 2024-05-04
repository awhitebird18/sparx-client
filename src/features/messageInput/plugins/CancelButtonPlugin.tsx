import { Button } from '@/components/ui/Button';

type props = { setIsEditing: (val?: string) => void };

const CancelButtonPlugin = ({ setIsEditing }: props) => {
  const handleCancel = () => {
    setIsEditing(undefined);
  };

  return (
    <Button onClick={handleCancel} variant="outline" size="sm" className="text-xs px-3 h-8">
      Cancel
    </Button>
  );
};

export default CancelButtonPlugin;
