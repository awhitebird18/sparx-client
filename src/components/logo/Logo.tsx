interface LogoProps {
  size?: number;
}

const Logo = ({ size = 12 }: LogoProps) => {
  return (
    <img
      className={`w-${size} h-${size} mx-auto`}
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="company-logo"
    />
  );
};

export default Logo;
