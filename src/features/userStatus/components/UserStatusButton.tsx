// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const SetUserStatusButton = observer(() => {
  const { activeUserStatus } = useStore('userStatusStore');

  return (
    <Button className="w-full rounded-md p-2 gap-2 text-muted" variant="outline">
      <div className="h-6.5 border-r border-border pr-2">
        <em-emoji
          id={activeUserStatus ? activeUserStatus.emoji : 'smiley'}
          set="apple"
          style={{ fontSize: '1.5rem', lineHeight: '1.1rem' }}
        />
      </div>
      <p className="flex-1 last:text-left">
        {activeUserStatus ? activeUserStatus.text : 'Update your status'}
      </p>
    </Button>
  );
});

export default SetUserStatusButton;
