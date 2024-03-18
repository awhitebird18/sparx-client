const Node: React.FC<{ name: string; x: number; y: number }> = ({ name, x, y }) => {
  return (
    <>
      <span
        className="absolute text-black z-50"
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          // transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="bg-black w-2 h-2 rounded-full" />
        {`${x}, ${y}`}
      </span>
      <div
        className="bg-indigo-500 h-16 w-36 rounded-xl flex items-center justify-center border-2 border-indigo-600 font-medium"
        style={{
          position: 'absolute',
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {name}
      </div>
    </>
  );
};

export default Node;
