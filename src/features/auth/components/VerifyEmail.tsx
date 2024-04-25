import AnimatedLogo from '@/components/logo/AnimatedLogo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export type VerifyEmailProps = { userId: string };

const VerifyEmail = ({ userId }: VerifyEmailProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_URL, { query: { userId } });
    socket.emit('waitingForVerification', { userId });
    socket.on('verified', () => {
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
        <span className="text-2xl font-bold">Sparx</span>
      </div>
      <div className="card bg-card flex flex-col items-center gap-0 rounded-xl border border-border p-8 prose">
        <AnimatedLogo />
        <h2 className="text-main mb-4  text-3xl">Verification Email Sent</h2>
        <p className="text-secondary">
          Please check your email and click on the verification link to continue.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
