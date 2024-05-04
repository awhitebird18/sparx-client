import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { Plus } from 'react-bootstrap-icons';

const TemplateTableHeader = () => {
  const { setActiveModal } = useStore('modalStore');

  const handleCreateTemplate = () => {
    setActiveModal({ type: 'CreateTemplateModal', payload: null });
  };

  return (
    <div className="flex justify-between items-center prose dark:prose-invert">
      <h3>Templates</h3>
      <Button
        size="icon"
        className="rounded-lg"
        variant="outline-primary"
        onClick={handleCreateTemplate}
      >
        <Plus size={20} />
      </Button>
    </div>
  );
};

export default TemplateTableHeader;
