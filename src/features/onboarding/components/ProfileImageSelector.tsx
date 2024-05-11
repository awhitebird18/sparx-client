import React, { ChangeEvent, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Camera } from 'react-bootstrap-icons';
import { useOnboardingStore } from '../hooks/useOnboardingStore';

const ProfileImageSelector: React.FC = () => {
  const { selectedImage, setSelectedImage, generateAvatar, selectedColor } = useOnboardingStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleClickUploadImageButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`card relative bg-${selectedColor}-500 mx-auto flex-shrink-0 h-80 w-80 shadow-md border border-border rounded-xl justify-center items-center`}
    >
      {selectedImage && (
        <img src={selectedImage} className="w-full h-full object-cover rounded-xl" alt="Profile" />
      )}
      <Button
        className="absolute top-0 left-0 w-full h-full flex-col text-xl font-semibold text-white/60 opacity-0 hover:opacity-100 hover:bg-black/40"
        variant="ghost"
        onClick={handleClickUploadImageButton}
      >
        <Camera size={70} className="text-white/60" />
        Upload Image
      </Button>
      <Button
        variant="secondary"
        onClick={generateAvatar}
        className="whitespace-normal h-fit w-20 h-20 rounded-full text-sm -top-4 -right-6 absolute"
      >
        Generate Avatar
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleSelectImage}
      />
    </div>
  );
};

export default ProfileImageSelector;
