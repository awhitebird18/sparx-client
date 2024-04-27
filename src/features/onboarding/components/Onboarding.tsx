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
  const { currentUser } = useStore('userStore');
  const [step, setStep] = useState<number>(1);
  const { workspaces, lastViewedWorkspace, currentWorkspaceId, markUserWorkspaceViewedApi } =
    useStore('workspaceStore');
  const navigate = useNavigate();
  const { verifyAndLoginUser } = useAuth();

  useEffect(() => {
    if (currentUser && lastViewedWorkspace && !lastViewedWorkspace.isFirstLogin) {
      return navigate('/app');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, lastViewedWorkspace]);

  useEffect(() => {
    if (workspaces.length) {
      setStep(2);
    }
  }, [workspaces.length]);

  const finalizeSetupWorkspaceSetup = async () => {
    if (!lastViewedWorkspace || !currentWorkspaceId) return;

    await markUserWorkspaceViewedApi(lastViewedWorkspace.uuid);

    await seedWorkspaceData(currentWorkspaceId);

    verifyAndLoginUser();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>

      {step === 1 && <CreateWorkspaceOnboarding setStep={setStep} />}
      {step === 2 && <RoadmapOnboarding setStep={setStep} />}
      {step === 3 && <ThemeOnboarding setStep={setStep} />}
      {step === 4 && (
        <UserOnboarding finalizeSetup={finalizeSetupWorkspaceSetup} setStep={setStep} />
      )}
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
