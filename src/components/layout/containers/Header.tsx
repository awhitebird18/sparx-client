import { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className="h-12 flex items-center justify-between p-3 border-b border-border">
      {children}
    </div>
  );
};

export default Header;
