import { useState } from 'react';
import { useStore } from '@/stores/RootStore';

const useImageUploader = () => {
  const { uploadProfileImageApi } = useStore('userStore');
  const [tempImage, setTempImage] = useState<string | undefined>(undefined);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;
      setTempImage(imageBase64);
      await uploadProfileImageApi(imageBase64);
      setTempImage(undefined);
    };
    reader.readAsDataURL(file);
  };

  return { tempImage, handleImageUpload };
};

export default useImageUploader;
