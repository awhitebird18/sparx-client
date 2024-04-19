import { useState, useEffect } from 'react';
import '@/styles/complete.css';
import { StarFill } from 'react-bootstrap-icons';

const CelebrationAnimation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`star flex gap-1.5 text-yellow-400 text-sm items-center celebration-container ${
        animate ? 'animate' : ''
      } z-50`}
    >
      <StarFill size={11} /> Complete
    </div>
  );
};

export default CelebrationAnimation;
