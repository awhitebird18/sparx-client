import storage from '@/utils/storage';
import { Progress } from '../ui/Progress';
import { useEffect, useState } from 'react';

const quotes = [
  "Dreams don't work unless you do. - John C. Maxwell",
  'Do it with passion or not at all. - Rosa Nouchette Carey',
  'Study hard, dream big, stay focused.',
  'The secret of getting ahead is getting started. - Mark Twain',
  'Success is the sum of small efforts, repeated. - R. Collier',
  'Knowledge is power. - Francis Bacon',
  'Don’t wish it were easier. Wish you were better. - Jim Rohn',
  'Push yourself, because no one else is going to do it for you.',
  'Failure is the opportunity to begin again more intelligently. - Henry Ford',
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
  'Learn as if you will live forever. - Mahatma Gandhi',
  "Hard work beats talent when talent doesn't work hard. - Tim Notke",
  'The best way to predict your future is to create it. - Abraham Lincoln',
  'Procrastination makes easy things hard, hard things harder. - Mason Cooley',
];

const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];

const AppSkeleton = ({ setAnimationComplete }: any) => {
  const [progress, setProgress] = useState(0);

  const sidebarWidth = storage.getSidebarWidth() || 250;
  const appTheme = storage.getTheme() || 'light';

  const isLight = appTheme === 'light';

  const borderColor = isLight ? 'border-gray-300' : 'border-gray-800';
  const bgColor = isLight ? 'bg-white' : 'bg-background';

  useEffect(() => {
    if (progress >= 120) {
      setAnimationComplete(true);
    }
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        return prev + 1;
      });
    }, 10);

    return () => {
      clearInterval(intervalId);
      // setProgress(0);
    };
  }, [progress, setAnimationComplete]);

  return (
    <div className={`h-screen w-screen flex overflow-hidden bg-background prose ${bgColor}`}>
      <div className="flex gap-2 items-center absolute top-4 left-5 text-main">
        <span className="text-2xl font-bold">Navinotes</span>
      </div>
      {/* <div className={`h-full border-r ${borderColor}`} style={{ width: `${sidebarWidth}px` }} /> */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <div
          className={`h-12 border-b ${borderColor} flex items-center justify-between pr-4 pl-3 gap-6`}
        /> */}
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

            <p className="text-secondary text-center">{selectedQuote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSkeleton;
