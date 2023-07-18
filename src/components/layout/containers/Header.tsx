import { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return <div className="h-12 flex items-center justify-between p-1.5 mb-1">{children}</div>;
};

export default Header;
