import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const VerifyEmail = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, { query: { userId } });

    socket.emit('waitingForVerification', { userId });

    socket.on('verified', () => {
      // Handle verification, like redirecting the user.
      navigate('/verified', { replace: true });
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="flex gap-2 items-center absolute top-4 left-5">
        <span className="text-2xl font-bold">Navinotes</span>
      </div>
      <div className="card bg-card flex flex-col items-center gap-0 rounded-xl border border-border p-8 prose">
        {/* <Logo size={44} /> */}
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
        <h2 className="text-main mb-4  text-3xl">Verification Email Sent</h2>
        <p className="text-secondary">
          Please check your email and click on the verification link to continue.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
