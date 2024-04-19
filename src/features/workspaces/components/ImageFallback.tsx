import { Button } from '@/components/ui/Button';
import { Image } from 'react-bootstrap-icons';

type Props = { onClick: any };

const ImageFallback = ({ onClick }: Props) => (
  <Button className="w-full h-full flex items-center justify-center" onClick={onClick}>
    <Image size={36} />
  </Button>
);

export default ImageFallback;
