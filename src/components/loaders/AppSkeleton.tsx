import storage from '@/utils/storage';
import { Progress } from '../ui/Progress';
import { useEffect, useState } from 'react';
import { getQuote } from '@/utils/getQuote';

export type AppSkeletonProps = {
  setAnimationComplete: (val: boolean) => void;
  setIsLoginLoading: (val: boolean) => void;
};

const AppSkeleton = ({ setAnimationComplete, setIsLoginLoading }: AppSkeletonProps) => {
  const [progress, setProgress] = useState(0);
  const appTheme = storage.getTheme() || 'dark';
  const isLight = appTheme === 'light';
  const bgColor = isLight ? 'bg-white' : 'bg-background';

  useEffect(() => {
    if (progress >= 140) {
      setAnimationComplete(true);
      setIsLoginLoading(false);
    }
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        return prev + 1;
      });
    }, 13);

    return () => {
      clearInterval(intervalId);
    };
  }, [progress, setAnimationComplete, setIsLoginLoading]);

  return (
    <div className={`h-screen w-screen flex overflow-hidden bg-background prose ${bgColor}`}>
      <div className="flex gap-2 items-center absolute top-4 left-5 text-main">
        <span className="text-2xl font-bold">Sparx</span>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden flex items-center justify-center">
          <div className="flex flex-col gap-6 w-72 items-center">
            <div className="relative w-52 h-52 bird">
              <img className="w-full h-full absolute top-0 left-0" src="/birdBody.png" />
              <img
                className="birdLeftWing w-full h-full absolute top-0 left-0"
                src="/birdLeftWing.png"
              />
              <img
                className="birdRightWing w-full h-full absolute top-0 left-0"
                src="/birdRightWing.png"
              />
              <img
                className="w-full h-full absolute top-0 left-0 opacity-50"
                src="/smallBubbles.png"
              />
              <img
                className="w-full h-full absolute top-0 left-0 opacity-50 bubbles"
                src="/mediumBubbles.png"
              />
            </div>

            <Progress value={progress} className="w-full" />

            <p className="text-secondary text-center">{getQuote()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSkeleton;
