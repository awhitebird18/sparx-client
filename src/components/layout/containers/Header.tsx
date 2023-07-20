import { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className="h-12 flex items-center justify-between px-3 mb-1 border-b border-border">
      {children}
    </div>
  );
};

export default Header;
