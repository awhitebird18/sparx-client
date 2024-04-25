const AnimatedLogo = () => {
  return (
    <div className="relative w-44 h-44 bird">
      <img className="w-full h-full absolute top-0 left-0" src="/birdBody.png" />
      <img className="birdLeftWing w-full h-full absolute top-0 left-0" src="/birdLeftWing.png" />
      <img className="birdRightWing w-full h-full absolute top-0 left-0" src="/birdRightWing.png" />
      <img className="w-full h-full absolute top-0 left-0 opacity-50" src="/smallBubbles.png" />
      <img
        className="w-full h-full absolute top-0 left-0 opacity-50 bubbles"
        src="/mediumBubbles.png"
      />
    </div>
  );
};

export default AnimatedLogo;
