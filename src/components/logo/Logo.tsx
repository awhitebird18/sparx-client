import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';

interface LogoProps {
  size?: number;
  resolution?: number;
}

const Logo = ({ size = 12, resolution = 100 }: LogoProps) => {
  const thumbnailUrl = transformCloudinaryUrl(
    'https://res.cloudinary.com/dwkvw91pm/image/upload/v1692153581/logo_p2v66f.png',
    resolution,
    resolution,
  );

  return <img className={`w-${size} h-${size} mx-auto`} src={thumbnailUrl} alt="company-logo" />;
};

export default Logo;
