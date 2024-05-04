import { useStore } from '@/stores/RootStore';
import { Message } from '../types';

const useUserActions = (message: Message) => {
  const { setMainPanel } = useStore('mainPanelStore');
  const { setCurrentUserProfileId } = useStore('userStore');
  const { setMessageEditId } = useStore('messageStore');
  const { setActiveModal } = useStore('modalStore');

  const handleViewUserProfile = () => {
    setCurrentUserProfileId(message.userId);
    setMainPanel({ type: 'profile' });
  };

  const handleEditMessage = () => {
    setMessageEditId(message.uuid);
  };

  const handleDeleteMessage = () => {
    setActiveModal({ type: 'DeleteMessageModal', payload: { message } });
  };

  return { handleViewUserProfile, handleEditMessage, handleDeleteMessage };
};

export default useUserActions;
