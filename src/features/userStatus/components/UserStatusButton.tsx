// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';

const SetUserStatusButton = () => {
  const { activeUserStatus } = useStore('userStatusStore');

  return (
    <Button className="w-full roudned-sm p-2 gap-2" variant="primaryOutlined">
      <div className="h-6 border-r border-border pr-2">
        <em-emoji
          id={activeUserStatus ? activeUserStatus.emoji : 'smiley'}
          set="apple"
          style={{ fontSize: '1.3rem', lineHeight: '1.1rem' }}
        ></em-emoji>
      </div>
      <p className="flex-1 last:text-left">
        {activeUserStatus ? activeUserStatus.text : 'Update your status'}
      </p>
    </Button>
  );
};

export default SetUserStatusButton;
