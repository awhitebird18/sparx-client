import { axios } from '@/lib/axios';
import { NotificationType } from '@/stores/NotificationStore';
import { stores } from '@/stores/RootStore';
import { InviteUser } from '../types';

export const inviteUser = async (inviteUser: InviteUser) => {
  try {
    const { data } = await axios.post('/users/send-invite', inviteUser);

    stores.notificationStore.addNotification({
      title: 'User invites sent!',
      type: NotificationType.SUCCESS,
      show: true,
    });

    return data;
  } catch (err) {
    return console.error(err);
  }
};
