import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

interface ModalProps {
  title: string;
  children: JSX.Element;
}

function Modal({ title, children }: ModalProps) {
  const { activeModal, setActiveModal } = useStore('modalStore');

  const handleClose = () => {
    setActiveModal(null);
  };

  return (
    <Dialog open={Boolean(activeModal)} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
}

export default observer(Modal);
