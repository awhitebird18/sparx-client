import logo from '@/assets/images/appLogo.svg';

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 12 }: LogoProps) => {
  return (
    <div className={`w-${size} h-${size} mx-auto block`}>
      <img className="w-full h-full" src={logo} alt="company-logo" />
    </div>
  );
};

export default Logo;
