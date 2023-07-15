import { Button } from '@/components/ui/Button';

type props = { setIsEditing: (val: boolean) => void };

const CancelButtonPlugin = ({ setIsEditing }: props) => {
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Button onClick={handleCancel} variant="outline" size="sm" className="w-20">
      Cancel
    </Button>
  );
};

export default CancelButtonPlugin;
