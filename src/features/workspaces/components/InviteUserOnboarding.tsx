import { useState } from 'react';
import UserOnboarding from './UserOnboarding';
import ThemeOnboarding from './ThemeOnboarding';
import { useStore } from '@/stores/RootStore';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import RoadmapOnboarding from './RoadmapOnboarding';

const InviteUserOnboarding = () => {
  const [step, setStep] = useState(2);
  const { currentUser } = useStore('userStore');
  const { lastViewedWorkspace } = useStore('workspaceStore');

  if (currentUser && !lastViewedWorkspace.isFirstLogin) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>

      {step === 2 && <ThemeOnboarding setStep={setStep} />}
      {step === 3 && <RoadmapOnboarding setStep={setStep} />}
      {step === 4 && <UserOnboarding />}
    </div>
  );
};

export default observer(InviteUserOnboarding);
