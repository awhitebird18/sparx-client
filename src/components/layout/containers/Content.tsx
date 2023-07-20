import React, { ReactElement } from 'react';

const Content = ({ children }: { children: ReactElement | React.ReactNode[] | null }) => {
  return <div className="h-full flex flex-col flex-1 overflow-hidden">{children}</div>;
};

export default Content;
