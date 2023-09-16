import Logo from '@/components/logo/Logo';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 relative w-full h-full bg-secondary dark:bg-background">
      <div className="flex items-center bg-background dark:bg-secondary/40 rounded-3xl w-full h-full justify-center border-borderLight shadow-lg">
        <div>
          <Logo size={50} resolution={200} />

          <h2 className="mt-6 text-center text-5xl font-extrabold">Home</h2>
          <p className=" text-2xl text-center mt-4">
            You are now logged in and ready to start messaging your team!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
