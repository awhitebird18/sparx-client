import { Button } from '@/components/ui/Button';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useStore } from '@/stores/RootStore';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';
import { ChangeEvent, useRef, useState } from 'react';
import { Camera, Person } from 'react-bootstrap-icons';

const UpdatableAvatar = () => {
  const { uploadProfileImageApi, currentUser } = useStore('userStore');
  const [tempImage, setTempImage] = useState<string | undefined>(undefined);
  const fileInput = useRef<HTMLInputElement | null>(null);
  if (!currentUser) return;
  const transformedImage = currentUser.profileImage ? (
    transformCloudinaryUrl(currentUser.profileImage, 160, 160)
  ) : (
    <Person />
  );

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;
      setTempImage(imageBase64);
      await uploadProfileImageApi(imageBase64);
      setTempImage(undefined);
    };
    reader.readAsDataURL(file);
  };

  const handleClickUploadImageButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div
      className={`card relative flex-shrink-0 shadow rounded-xl bg-gradient-to-tr from-primary to-${currentUser.preferences.primaryColor}-400`}
    >
      {tempImage ? (
        <img
          src={tempImage ?? transformedImage}
          style={{ width: '160px', height: '160px' }}
          className="rounded-xl"
        />
      ) : (
        <UserAvatar
          userId={currentUser.uuid}
          color={currentUser.preferences.primaryColor}
          showStatus
          size={160}
          profileImage={currentUser.profileImage}
        />
      )}

      {currentUser.uuid === currentUser?.uuid && (
        <Button
          className={`absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/40`}
          variant="ghost"
          onClick={(e) => handleClickUploadImageButton(e)}
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
};

export default UpdatableAvatar;
