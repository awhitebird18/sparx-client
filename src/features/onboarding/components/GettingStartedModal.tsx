import AnimatedLogo from '@/components/logo/AnimatedLogo';

const GettingSetupModal = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex flex-col items-center gap-0 p-8 prose">
        <AnimatedLogo />
        <h2 className="text-main mb-4 text-3xl">Getting your workspace ready</h2>
        <p className="text-secondary">This will only take a moment...</p>
      </div>
    </div>
  );
};

export default GettingSetupModal;
