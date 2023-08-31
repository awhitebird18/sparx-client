interface LogoProps {
  size?: number;
}

const Logo = ({ size = 12 }: LogoProps) => {
  return (
    <img
      className={`w-${size} h-${size} mx-auto`}
      src="https://res.cloudinary.com/dwkvw91pm/image/upload/v1692153581/logo_p2v66f.png"
      alt="company-logo"
    />
  );
};

export default Logo;
