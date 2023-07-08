import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useStore } from '@/stores/stores';
import CreateChanneForm from '@/features/channels/components/CreateChannelForm';
import { observer } from 'mobx-react-lite';
import CreateSectionForm from '@/features/sections/components/CreateSectionForm';

function Modal() {
  const { isOpen, title, type, setModal } = useStore('modalStore');

  return (
    <Dialog open={isOpen} onOpenChange={setModal}>
      <DialogContent className="sm:max-w-[425px]">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {type === 'CREATE_CHANNEL' && <CreateChanneForm />}

        {type === 'CREATE_SECTION' && <CreateSectionForm />}
      </DialogContent>
    </Dialog>
  );
}

export default observer(Modal);
