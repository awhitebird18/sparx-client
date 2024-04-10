import { useState } from 'react';
import CreateWorkspaceOnboarding from './CreateWorkspaceOnboarding';
import UserOnboarding from './UserOnboarding';
import ThemeOnboarding from './ThemeOnboarding';
import RoadmapOnboarding from './RoadmapOnboarding';

const Onboarding = () => {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>

      {step === 1 && <CreateWorkspaceOnboarding setStep={setStep} />}
      {step === 2 && <ThemeOnboarding setStep={setStep} />}
      {step === 3 && <RoadmapOnboarding setStep={setStep} />}
      {step === 4 && <UserOnboarding />}
    </div>
  );
};

export default Onboarding;
