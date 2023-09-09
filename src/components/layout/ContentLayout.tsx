import React from 'react';

type ContentLayoutProps = {
  children: React.ReactNode;
  headerComponent?: React.ReactNode;
  title: string | React.ReactNode;
  disablePadding?: boolean;
};

const ContentLayout = ({
  children,
  title,
  headerComponent,
  disablePadding,
}: ContentLayoutProps) => {
  return (
    <div className="h-full flex flex-col flex-1 overflow-hidden bg-card dark:bg-background">
      <div className="h-14 flex items-center justify-between p-3 bg-card dark:bg-background border-b border-border text-lg leading-6 font-medium">
        {title}
        {headerComponent}
      </div>
      <div
        className={`flex flex-col flex-1 overflow-hidden ${
          !disablePadding && 'p-3'
        } bg-card dark:bg-background rounded-md relative`}
      >
        {children}
      </div>
    </div>
  );
};

export default ContentLayout;