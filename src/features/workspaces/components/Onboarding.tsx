import { useState } from 'react';
import CreateWorkspaceOnboarding from './CreateWorkspaceOnboarding';
import UserOnboarding from './UserOnboarding';
import ThemeOnboarding from './ThemeOnboarding';

const Onboarding = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Navinotes</span>
      </div>

      {step === 1 && <CreateWorkspaceOnboarding setStep={setStep} />}
      {step === 2 && <ThemeOnboarding setStep={setStep} />}
      {step === 3 && <UserOnboarding setStep={setStep} />}
    </div>
  );
};

export default Onboarding;
