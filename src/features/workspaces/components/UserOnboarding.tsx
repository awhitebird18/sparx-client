import { Button } from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { PrimaryColors } from '@/features/preferences/enums';
import { useAuth } from '@/providers/contexts/useAuth';
import { useStore } from '@/stores/RootStore';
import { primaryColors } from '@/utils/primaryColors';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useRef, useState } from 'react';
import { ArrowRightCircle, Camera } from 'react-bootstrap-icons';
import { getAvatarUrl } from '../utils/avatarUrls';

const UserOnboarding = observer(() => {
  const { uploadProfileImageApi } = useStore('userStore');
  const { updatePrimaryColorApi } = useStore('userPreferencesStore');
  const { markUserWorkspaceViewedApi, lastViewedWorkspace } = useStore('workspaceStore');
  const { verifyAndLoginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedImage, setSelectedImage] = useState(getAvatarUrl());
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;
      setSelectedImage(imageBase64);
    };
    reader.readAsDataURL(file);
  };

  const handleClickUploadImageButton = (e: MouseEvent) => {
    e.preventDefault();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleClickNext = async () => {
    setIsLoading(true);
    await updatePrimaryColorApi(selectedColor as PrimaryColors);
    await uploadProfileImageApi(selectedImage);
    await markUserWorkspaceViewedApi(lastViewedWorkspace.uuid);
    setIsLoading(false);
    verifyAndLoginUser();
  };

  const handleSelectPrimaryColor = (primaryColor: string) => {
    setSelectedColor(primaryColor);
  };

  const generateAvatar = async () => {
    const url = getAvatarUrl();

    try {
      const response = await axios.get(url, { responseType: 'text' });
      if (response.status !== 200) {
        throw new Error(`Failed to fetch avatar: ${response.statusText}`);
      }
      const svgData = encodeURIComponent(response.data).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16)),
      );
      const base64EncodedData = btoa(svgData);
      const svgDataUrl = `data:image/svg+xml;base64,${base64EncodedData}`;
      setSelectedImage(svgDataUrl);
    } catch (error) {
      console.error('Error generating avatar:', error);
    }
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
        <div className="flex flex-col gap-6 w-80">
          <div className="flex flex-col gap-3">
            <h4 className="text-main">Select your profile picture</h4>
            <div
              className={`card relative mx-auto flex-shrink-0 h-72 w-full shadow-md border border-border rounded-xl justify-center items-center bg-${selectedColor}-500`}
            >
              <img src={selectedImage} className="w-full h-full rounded-xl" />

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
          <div className="flex div items-center justify-between gap-3">
            <Button variant="outline" onClick={generateAvatar} className="w-full">
              Generate Avatar
            </Button>
            <Button
              variant="outline"
              onClick={(e) => handleClickUploadImageButton(e as any)}
              className="w-full"
            >
              Upload photo
            </Button>
          </div>
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

          <Button
            className={`font-medium gap-2 ${isLoading && 'opacity-50'}`}
            type="submit"
            disabled={isLoading}
            onClick={handleClickNext}
          >
            {isLoading ? 'Saving profile' : 'Continue'}
            {isLoading ? <Spinner size={6} /> : <ArrowRightCircle size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default UserOnboarding;
