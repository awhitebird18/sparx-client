import React from 'react';

interface BackdropProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={onClick} />;
};

export default Backdrop;
