import { useStore } from '@/stores/RootStore';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip';
import { LayoutTextSidebarReverse } from 'react-bootstrap-icons';

import { Button } from '@/components/ui/Button';
import { observer } from 'mobx-react-lite';

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
  const { sidebarWidth, setSidebarWidth } = useStore('sidebarStore');

  const handleShowSidebar = () => {
    setSidebarWidth(250);
  };

  return (
    <div className="h-full flex flex-col flex-1 overflow-hidden">
      <div className="h-14 flex items-center justify-between px-4 border-b border-border text-lg leading-6 font-medium">
        <div className="flex items-center gap-1">
          {!sidebarWidth ? (
            <Tooltip>
              <TooltipTrigger>
                <Button size="icon" variant="ghost" onClick={handleShowSidebar}>
                  <LayoutTextSidebarReverse className="text-xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" align="start">
                Show sidebar
              </TooltipContent>
            </Tooltip>
          ) : null}
          {title}
        </div>
        {headerComponent}
      </div>
      <div
        className={`flex flex-col flex-1 overflow-hidden ${
          !disablePadding && 'p-3'
        } rounded-md relative`}
      >
        {children}
      </div>
    </div>
  );
};

export default observer(ContentLayout);
