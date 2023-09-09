import Modal from '@/components/modal/Modal';
import ChangePasswordForm from './ChangePasswordForm';
import authApi from '@/features/auth/api';
import { useStore } from '@/stores/RootStore';

type FormData = {
  password: string;
  confirmPassword: string;
};

const ChangePasswordModal = () => {
  const { currentUser } = useStore('userStore');
  const onSubmit = async (data: FormData) => {
    try {
      if (!currentUser) return;

      await authApi.changePassword({ password: data.password, email: currentUser.email });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal title="Change password">
      <div className="w-72">
        <ChangePasswordForm onSubmit={onSubmit} />
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;