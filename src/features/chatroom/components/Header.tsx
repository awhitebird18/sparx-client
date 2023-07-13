import AvatarGroup from './AvatarGroup';
import ChannelTitle from './ChannelTitle';

const Header = () => {
  return (
    <div className="h-10 px-3 flex items-center justify-between border-b border-border">
      <ChannelTitle />

      <AvatarGroup />
    </div>
  );
};

export default Header;
