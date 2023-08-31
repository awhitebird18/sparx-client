import React, { ReactElement } from 'react';

const Body = ({ children }: { children: ReactElement | React.ReactNode[] | null }) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden p-3 bg-card dark:bg-background rounded-md relative">
      {children}
    </div>
  );
};

export default Body;
