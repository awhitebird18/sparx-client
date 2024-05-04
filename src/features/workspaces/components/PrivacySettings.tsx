import { Switch } from '@/components/ui/Switch';
import { Workspace } from '../types/workspace';
import { useStore } from '@/stores/RootStore';

const PrivacySettings = () => {
  const { currentWorkspace, updateWorkspaceApi } = useStore('workspaceStore');
  if (!currentWorkspace) return;

  const handleUpdateWorkspace = async (values: Partial<Workspace>) => {
    await updateWorkspaceApi(currentWorkspace.uuid, values);
  };

  return (
    <div className="space-y-2 flex-1">
      <h3 className="font-bold">Privacy</h3>
      <div className="space-y-10">
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Workpace searchable</p>
            <p className="text-sm font-semibold text-muted">
              Allows users to search and view this workspace on the global repository.
            </p>
          </div>
          <Switch
            checked={currentWorkspace.isPrivate}
            onCheckedChange={(val) => handleUpdateWorkspace({ isPrivate: val })}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Work</p>
            <p className="text-sm font-semibold text-muted">
              Allows members of your workspace to invite other users.
            </p>
          </div>
          <Switch
            checked={currentWorkspace.allowInvites}
            onCheckedChange={(val) => handleUpdateWorkspace({ allowInvites: val })}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
