import logo from '@/assets/images/appLogo.svg';

type Props = {
  size?: number;
};

const Logo = ({ size = 12 }: Props) => {
  return (
    <div className={`w-${size} h-${size} mx-auto block`}>
      <img className="w-full h-full" src={logo} alt="company-logo" />
    </div>
  );
};

export default Logo;
