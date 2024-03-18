import { useState, useEffect } from 'react';
import './complete.css'; // Import your CSS file
import { StarFill } from 'react-bootstrap-icons';

const CelebrationAnimation = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);

    // Set a timer to remove the animation
    const timer = setTimeout(() => setAnimate(false), 3000); // 3 seconds for example

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`star flex gap-2 text-yellow-400 items-center celebration-container ${
        animate ? 'animate' : ''
      } z-50`}
    >
      <StarFill size={11} /> Complete
    </div>
  );
};

export default CelebrationAnimation;
