import { ReactElement } from 'react';

const Header = ({ children }: { children: ReactElement | ReactElement[] }) => {
  return <div className="h-12 flex items-center justify-between px-2 p-1">{children}</div>;
};

export default Header;
