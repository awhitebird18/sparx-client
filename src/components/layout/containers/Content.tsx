import React, { ReactElement } from 'react';

const Content = ({ children }: { children: ReactElement | React.ReactNode[] | null }) => {
  return <div className="h-full flex flex-col flex-1 p-2">{children}</div>;
};

export default Content;
