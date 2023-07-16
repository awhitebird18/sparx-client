import React, { ReactElement } from 'react';

const Content = ({ children }: { children: ReactElement | React.ReactNode[] | null }) => {
  return (
    <div className="flex-1 flex flex-col h-full px-2 py-3 space-y-3 overflow-hidden">
      {children}
    </div>
  );
};

export default Content;
