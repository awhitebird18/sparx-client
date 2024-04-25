import { useEffect, useState } from 'react';
import CreateWorkspaceOnboarding from './CreateWorkspaceOnboarding';
import UserOnboarding from './UserOnboarding';
import ThemeOnboarding from './ThemeOnboarding';
import RoadmapOnboarding from './RoadmapOnboarding';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { seedWorkspaceData } from '../api/seedWorkspaceData';
import { useAuth } from '@/providers/contexts/useAuth';
import AnimatedLogo from '@/components/logo/AnimatedLogo';

const Onboarding = observer(() => {
  const [step, setStep] = useState<number>(1);
  const { workspaces, lastViewedWorkspace, currentWorkspaceId, markUserWorkspaceViewedApi } =
    useStore('workspaceStore');
  const navigate = useNavigate();
  const { verifyAndLoginUser } = useAuth();

  const incrementStep = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    if (lastViewedWorkspace && !lastViewedWorkspace.isFirstLogin) {
      return navigate('/app');
    }
    if (workspaces.length) {
      setStep(2);
    }
  }, [lastViewedWorkspace, navigate, workspaces]);

  useEffect(() => {
    if (step < 5 || !lastViewedWorkspace || !currentWorkspaceId) return;

    const finalizeSetupWorkspaceSetup = async () => {
      await markUserWorkspaceViewedApi(lastViewedWorkspace.uuid);
      await seedWorkspaceData(currentWorkspaceId);
      verifyAndLoginUser();
    };
    finalizeSetupWorkspaceSetup();
  }, [
    step,
    currentWorkspaceId,
    verifyAndLoginUser,
    markUserWorkspaceViewedApi,
    lastViewedWorkspace,
  ]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>

      {step === 1 && <CreateWorkspaceOnboarding incrementStep={incrementStep} />}
      {step === 2 && <RoadmapOnboarding incrementStep={incrementStep} />}
      {step === 3 && <ThemeOnboarding incrementStep={incrementStep} />}
      {step === 4 && <UserOnboarding incrementStep={incrementStep} />}
      {step === 5 && <GettingSetupModal />}
    </div>
  );
});

export default Onboarding;

const GettingSetupModal = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="card bg-card flex flex-col items-center gap-0 rounded-xl border border-border p-8 prose">
        <AnimatedLogo />
        <h2 className="text-main mb-4  text-3xl">Getting your workspace ready</h2>
        <p className="text-secondary">This will only take a moment...</p>
      </div>
    </div>
  );
};
