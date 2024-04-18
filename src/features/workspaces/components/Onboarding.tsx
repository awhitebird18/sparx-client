import { useEffect, useState } from 'react';
import CreateWorkspaceOnboarding from './CreateWorkspaceOnboarding';
import UserOnboarding from './UserOnboarding';
import ThemeOnboarding from './ThemeOnboarding';
import RoadmapOnboarding from './RoadmapOnboarding';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [step, setStep] = useState<number>(1);
  const { workspaces, lastViewedWorkspace } = useStore('workspaceStore');
  const navigate = useNavigate();

  useEffect(() => {
    if (lastViewedWorkspace && !lastViewedWorkspace.isFirstLogin) {
      return navigate('/app');
    }

    if (workspaces.length) {
      setStep(2);
    }
  }, [lastViewedWorkspace, navigate, workspaces]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>

      {step === 1 && <CreateWorkspaceOnboarding setStep={setStep} />}
      {step === 2 && <RoadmapOnboarding setStep={setStep} />}
      {step === 3 && <ThemeOnboarding setStep={setStep} />}
      {step === 4 && <UserOnboarding />}
    </div>
  );
};

export default observer(Onboarding);
