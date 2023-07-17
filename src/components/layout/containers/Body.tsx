import React, { ReactElement } from 'react';

const Body = ({ children }: { children: ReactElement | React.ReactNode[] | null }) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden p-3 bg-card rounded-md">{children}</div>
  );
};

export default Body;
