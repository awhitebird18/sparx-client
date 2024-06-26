export type ContentLayoutProps = {
  children: React.ReactNode;
  disablePadding?: boolean;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div className="flex flex-col flex-1 h-full gap-4 overflow-auto px-5">{children}</div>;
};

export default ContentLayout;
