import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Plus } from 'react-bootstrap-icons';

const VariantTableHeader = observer(() => {
  const { selectedTemplate } = useStore('flashcardStore');
  const { setActiveModal } = useStore('modalStore');

  const handleCreateVariant = () => {
    setActiveModal({ type: 'CreateVariantModal', payload: { templateId: selectedTemplate?.uuid } });
  };

  return (
    <div className="flex justify-between items-center prose dark:prose-invert">
      <h3>Variants</h3>
      <Button
        size="icon"
        className="rounded-lg"
        variant="outline-primary"
        onClick={handleCreateVariant}
      >
        <Plus size={20} />
      </Button>
    </div>
  );
});

export default VariantTableHeader;
