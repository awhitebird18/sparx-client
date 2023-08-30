import { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return (
    <div className="h-14 flex items-center justify-between p-3 bg-card dark:bg-background border-b border-border">
      {children}
    </div>
  );
};

export default Header;
