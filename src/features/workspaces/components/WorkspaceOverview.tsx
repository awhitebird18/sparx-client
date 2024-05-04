import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import WorkspaceForm from './WorkspaceForm';
import WorkspaceImage from './WorkspaceImage';
import { useState } from 'react';
import PrivacySettings from './PrivacySettings';

const WorkspaceOverview = observer(() => {
  const { currentWorkspace } = useStore('workspaceStore');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  if (!currentWorkspace) return;

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="h-full overflow-auto flex flex-col p-6 gap-10">
      <div className="flex gap-10 justify-between border-b border-border pb-10">
        <WorkspaceForm />
        <WorkspaceImage />
      </div>

      <PrivacySettings />
      {isEditing && (
        <div className="flex gap-2 w-fit ml-auto h-10">
          <Button onClick={handleCancelEdit} variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      )}
    </div>
  );
});

export default WorkspaceOverview;
