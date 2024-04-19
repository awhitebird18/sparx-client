import Logo from '@/components/logo/Logo';

export const Home: React.FC = () => {
  return (
    <div className="flex p-36 w-full h-full justify-center">
      <div className="space-y-3">
        <Logo size={36} />

        <h2 className="mt-6 text-center text-3xl font-extrabold">Home</h2>
        <p className="text-center">You are now logged in and ready to start messaging your team!</p>
      </div>
    </div>
  );
};
