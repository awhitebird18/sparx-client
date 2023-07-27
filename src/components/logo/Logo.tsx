import logo from '/logo.png';

interface LogoProps {
  size?: number;
}

const Logo = ({ size = 12 }: LogoProps) => {
  return <img className={`w-${size} h-${size} mx-auto`} src={logo} alt="company-logo" />;
};

export default Logo;
