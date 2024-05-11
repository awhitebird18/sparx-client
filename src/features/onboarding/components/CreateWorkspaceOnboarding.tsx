import { observer } from 'mobx-react-lite';
import WorkspaceImageUpload from './WorkspaceImageUpload';
import WorkspaceForm from './WorkspaceForm';
import Header from './Header';

const CreateWorkspaceOnboarding = observer(() => {
  return (
    <div className="rounded-2xl w-full flex flex-col items-center gap-8 max-w-md">
      <Header
        title="Create a roadmap"
        description="This is the main topic you would like to learn about."
      />
      <WorkspaceImageUpload />
      <WorkspaceForm />
    </div>
  );
});

export default CreateWorkspaceOnboarding;
