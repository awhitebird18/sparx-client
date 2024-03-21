import { Button } from '@/components/ui/Button';
import { PrimaryColors } from '@/features/preferences/enums';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useAuth } from '@/providers/auth';
import { useStore } from '@/stores/RootStore';
import { primaryColors } from '@/utils/primaryColors';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useRef, useState } from 'react';
import { ArrowRight, Camera } from 'react-bootstrap-icons';

const UserOnboarding = ({ setStep }: { setStep: (arg: number) => void }) => {
  const { uploadProfileImageApi, currentUser } = useStore('userStore');
  const { updatePrimaryColorApi } = useStore('userPreferencesStore');
  const { markUserWorkspaceViewedApi, lastViewedWorkspace } = useStore('workspaceStore');
  const { verifyAndLoginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedImage, setSelectedImage] = useState('');

  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      const res = await uploadProfileImageApi(imageBase64);

      if (res.profileImage) {
        setSelectedImage(res.profileImage);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleClickUploadImageButton = (e: MouseEvent) => {
    e.preventDefault();

    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const transformedImage = transformCloudinaryUrl(selectedImage, 300, 300);

  const handleClickNext = async () => {
    setIsLoading(true);

    const createWorkspace = async () => {
      await updatePrimaryColorApi(selectedColor as PrimaryColors);

      await markUserWorkspaceViewedApi(lastViewedWorkspace.uuid);
      setIsLoading(false);
      verifyAndLoginUser();
    };
    setTimeout(async () => {
      await createWorkspace();
    }, 2000);
  };

  const handleSelectPrimaryColor = (primaryColor: string) => {
    setSelectedColor(primaryColor);
  };

  const GettingSetup = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
        <div className="card bg-card flex flex-col items-center gap-0 rounded-xl border border-border p-8 prose">
          {/* <Logo size={44} /> */}
          <div className="relative w-44 h-44 bird">
            <img className="w-full h-full absolute top-0 left-0" src="/birdBody.png" />
            <img
              className="birdLeftWing w-full h-full absolute top-0 left-0"
              src="/birdLeftWing.png"
            />
            <img
              className="birdRightWing w-full h-full absolute top-0 left-0"
              src="/birdRightWing.png"
            />
            <img
              className="w-full h-full absolute top-0 left-0 opacity-50"
              src="/smallBubbles.png"
            />
            <img
              className="w-full h-full absolute top-0 left-0 opacity-50 bubbles"
              src="/mediumBubbles.png"
            />
          </div>
          <h2 className="text-main mb-4  text-3xl">Getting your workspace ready</h2>
          <p className="text-secondary">This will only take a moment...</p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <GettingSetup />;
  }

  return (
    <div className="prose flex flex-col gap-6">
      <h2 className="text-main">Create your account</h2>
      <div className="card bg-card rounded-xl border border-border shadow flex gap-20 prose p-8">
        {/* Avatar */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-main">Select your profile picture</h4>
            <div className="card relative flex-shrink-0 shadow-md border border-border rounded-xl items-center ">
              <UserAvatar
                size={350}
                userId={currentUser ? currentUser.uuid : ''}
                profileImage={transformedImage}
              />

              <Button
                className={`absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-black/40`}
                variant="ghost"
                onClick={(e) => handleClickUploadImageButton(e as any)}
              >
                <Camera size={60} className="text-white/60" />
              </Button>

              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleSelectImage}
              />
            </div>
          </div>
          <Button variant="outline" onClick={(e) => handleClickUploadImageButton(e as any)}>
            Upload new photo
          </Button>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-main">Select a primary color</h4>

            <div className="grid grid-cols-6 gap-3">
              {primaryColors.map((color) => (
                <div
                  onClick={() => handleSelectPrimaryColor(color)}
                  className={`w-10 h-10 bg-${color}-500 rounded-lg border cursor-pointer border-transparent ${
                    selectedColor === color && '!border-white border-4 shadow shadow-white'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          <Button onClick={handleClickNext}>
            Continue <ArrowRight className="mt-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(UserOnboarding);
