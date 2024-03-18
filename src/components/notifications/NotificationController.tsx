import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { useToast } from '../ui/UseToast';
import { Toaster } from '../ui/Toaster';

const NotificationController = observer(() => {
  const { notifications, dismissNotification } = useStore('notificationStore');
  const { toast } = useToast();

  useEffect(() => {
    notifications
      .filter(({ show }) => show)
      .forEach(({ uuid, title, type, description }) => {
        toast({ title, variant: type, description });
        dismissNotification(uuid as string);
      });
  }, [notifications, toast, dismissNotification]);

  return <Toaster duration={2000} />;
});

export default NotificationController;
