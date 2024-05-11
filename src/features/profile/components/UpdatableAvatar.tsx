import { Button } from '@/components/ui/Button';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useRef } from 'react';
import { Camera } from 'react-bootstrap-icons';
import useImageUploader from '../hooks/useImageUploader';

const UpdatableAvatar = observer(() => {
  const { currentUser } = useStore('userStore');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const { tempImage, handleImageUpload } = useImageUploader();
  if (!currentUser) return;

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const handleClickUploadImageButton = () => fileInput.current?.click();

  return (
    <div
      className={`card relative flex-shrink-0 shadow rounded-xl bg-gradient-to-tr from-primary to-${currentUser.preferences.primaryColor}-400`}
    >
      <UserAvatar
        userId={currentUser.uuid}
        color={currentUser.preferences.primaryColor}
        showStatus
        size={160}
        profileImage={tempImage || currentUser.profileImage}
      />

      {currentUser.uuid === currentUser?.uuid && (
        <Button
          className={`absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/40`}
          variant="ghost"
          onClick={handleClickUploadImageButton}
        >
          <Camera size={60} className="text-white/60" />
        </Button>
      )}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleSelectImage}
      />
    </div>
  );
});

export default UpdatableAvatar;
