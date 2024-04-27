const GridPattern = () => (
  <svg
    className="absolute h-full w-full -z-10"
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    }}
  >
    <pattern
      id="pattern-1undefined"
      x="0"
      y="0"
      width="40"
      height="40"
      patternUnits="userSpaceOnUse"
    >
      <circle cx="1" cy="1" r="1" fill="#777"></circle>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1undefined)"></rect>
  </svg>
);

export default GridPattern;
