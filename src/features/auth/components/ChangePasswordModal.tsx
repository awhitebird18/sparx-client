import Modal from '@/layout/modal/Modal';
import ChangePasswordForm from './ChangePasswordForm';
import authApi from '@/features/auth/api';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ChangePasswordData } from '../types/changePasswordData';

const ChangePasswordModal = observer(() => {
  const { currentUser } = useStore('userStore');

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      if (!currentUser) return;

      await authApi.changePassword({ password: data.password, email: currentUser.email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal title="Change password">
      <div className="w-96 py-4">
        <ChangePasswordForm onSubmit={onSubmit} />
      </div>
    </Modal>
  );
});

export default ChangePasswordModal;
