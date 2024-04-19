import logo from '@/assets/images/appLogo.svg';
import { LogoProps } from './logoProps';

const Logo = ({ size = 12 }: LogoProps) => {
  return (
    <div className={`w-${size} h-${size} mx-auto block`}>
      <img className="w-full h-full" src={logo} alt="company-logo" />
    </div>
  );
};

export default Logo;
