import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';
import { DropdownMenuItem } from './DropdownMenu';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DropdownDialogItem = React.forwardRef((props: any, forwardedRef: any) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>

      <DialogContent className="DialogContent w-fit max-w-fit">{children}</DialogContent>
    </Dialog>
  );
});

export { DropdownDialogItem };
