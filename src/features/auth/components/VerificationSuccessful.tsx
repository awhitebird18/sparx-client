import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccessful = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/app/nodemap');
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Sparx</span>
      </div>
      <div className="card bg-card flex flex-col items-center gap-0 rounded-xl border border-border p-8 prose">
        <div className="relative w-44 h-44 bird">
          <img className="w-full h-full absolute top-0 left-0" src="/birdBody.png" />
          <img
            className="birdLeftWing w-full h-full absolute top-0 left-0"
            src="/birdLeftWing.png"
          />
          <img
            className="birdRightWing w-full h-full absolute top-0 left-0"
            src="/birdRightWing.png"
          />
          <img className="w-full h-full absolute top-0 left-0 opacity-50" src="/smallBubbles.png" />
          <img
            className="w-full h-full absolute top-0 left-0 opacity-50 bubbles"
            src="/mediumBubbles.png"
          />
        </div>
        <h2 className="text-main mb-4  text-3xl">Verification Successful!</h2>
        <p className="text-secondary">You will be redirected momentarily to get you stater...</p>
      </div>
    </div>
  );
};

export default VerificationSuccessful;
