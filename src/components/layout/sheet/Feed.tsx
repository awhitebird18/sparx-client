import { Button } from '@/components/ui/Button';
import WorkspaceActivity from '@/features/overview/components/WorkspaceActivity';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Funnel, X } from 'react-bootstrap-icons';

function Feed() {
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { toggleFeedOpen, isFeedOpen } = useStore('sidebarStore');

  const handleClose = () => {
    toggleFeedOpen();
  };

  return (
    <div
      className={`absolute top-0 right-0 h-full w-[28rem] p-2 transition-transform duration-300 ease-in-out ${
        isFeedOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {isFeedOpen ? (
        <div className="flex flex-col gap-5 bg-card card h-full p-5 rounded-md shadow-md">
          <div className="flex justify-between items-center prose dark:prose-invert">
            <h2 className="font-normal">Feed</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <Funnel size={19} />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleClose}>
                <X size={34} />
              </Button>
            </div>
          </div>
          <WorkspaceActivity endpoint={`/activity/workspace/${currentWorkspaceId}`} />
        </div>
      ) : null}
    </div>
  );
}

export default observer(Feed);
