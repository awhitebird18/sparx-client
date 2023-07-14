import { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className="h-12 px-3 flex items-center justify-between border-b border-border">
      {children}
    </div>
  );
};

export default Header;
