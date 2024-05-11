import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';

export interface ModalProps {
  title: string | JSX.Element;
  children: ReactNode;
  disablePadding?: boolean;
  className?: string;
}

const Modal = observer(({ title, children, disablePadding, className }: ModalProps) => {
  const { activeModal, closeModal } = useStore('modalStore');

  return (
    <Dialog open={Boolean(activeModal)} onOpenChange={closeModal} modal>
      <DialogContent className="card-base w-full max-w-fit min-w-[20rem] gap-0 p-0">
        {title && (
          <DialogHeader className="border-b border-border p-6 m-0 ">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className={`${!disablePadding && 'px-10 py-8 pt-6'} ${className}`}>{children}</div>
      </DialogContent>
    </Dialog>
  );
});

export default Modal;
