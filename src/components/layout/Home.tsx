import Logo from '@/components/logo/Logo';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Logo size={20} />
        <h2 className="mt-6 text-center text-4xl font-extrabold">Home</h2>
        <p className="text-center mt-4 text-muted">
          You are now logged in and ready to start messaging your team!
        </p>
      </div>
    </div>
  );
};

export default Home;
