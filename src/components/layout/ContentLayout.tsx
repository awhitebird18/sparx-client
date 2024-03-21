import { observer } from 'mobx-react-lite';

type ContentLayoutProps = {
  children: React.ReactNode;
  headerComponent?: React.ReactNode;
  title: string | React.ReactNode;
  disablePadding?: boolean;
};

const ContentLayout = ({ children }: ContentLayoutProps) => {
  return <div className="flex flex-col flex-1 h-full gap-4 overflow-auto p-8">{children}</div>;
};

export default observer(ContentLayout);
