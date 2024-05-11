import { ChangeEvent, useRef } from 'react';
import { useOnboardingStore } from './useOnboardingStore';

const useImageUpload = () => {
  const { setWorkspaceImage } = useOnboardingStore();
  const fileInput = useRef<HTMLInputElement | null>(null);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setWorkspaceImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return { fileInput, handleSelectImage };
};

export default useImageUpload;
