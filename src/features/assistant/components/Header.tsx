import { Button } from '@/components/ui/Button';
import { observer } from 'mobx-react-lite';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useAssistantStore } from '../hooks/useAssistantStore';

const Header = observer(() => {
  const { setScreen } = useAssistantStore();

  const handleClickBack = () => {
    setScreen(undefined);
  };

  return (
    <div className="flex gap-3 items-center">
      <Button variant="outline" className="gap-2 h-8" size="sm" onClick={handleClickBack}>
        <ChevronLeft size={12} /> Back
      </Button>
      <h3>Here is what I came up with...</h3>
    </div>
  );
});

export default Header;
