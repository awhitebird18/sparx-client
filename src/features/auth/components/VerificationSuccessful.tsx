import AnimatedLogo from '@/components/logo/AnimatedLogo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccessful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/app/nodemap');
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>
      <div className="card bg-card flex flex-col items-center gap-0 rounded-xl border border-border p-8 prose">
        <AnimatedLogo />
        <h2 className="text-main mb-4  text-3xl">Verification Successful!</h2>
        <p className="text-secondary">You will be redirected momentarily to get you stater...</p>
      </div>
    </div>
  );
};

export default VerificationSuccessful;
