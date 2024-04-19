import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

export interface ModalProps {
  title: string | JSX.Element;
  children: JSX.Element;
  disablePadding?: boolean;
}

const Modal = observer(({ title, children, disablePadding }: ModalProps) => {
  const { activeModal, setActiveModal } = useStore('modalStore');

  const handleClose = () => {
    setActiveModal(null);
  };

  return (
    <Dialog open={Boolean(activeModal)} onOpenChange={handleClose} modal>
      <DialogContent className="w-full max-w-fit min-w-[20rem] gap-0 p-0 dark:border-border dark:rounded-xl bg-card">
        {title && (
          <DialogHeader className="border-b border-border p-6 m-0 ">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className={`${!disablePadding && 'px-10 py-8 pt-6'}`}>{children}</div>
      </DialogContent>
    </Dialog>
  );
});

export default Modal;
