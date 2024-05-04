import React from 'react';
import useImageUpload from '../hooks/useImageUpload';
import { useOnboardingStore } from '../hooks/useOnboardingStore';
import { observer } from 'mobx-react-lite';
import { Button } from '@/components/ui/Button';
import { Image } from 'react-bootstrap-icons';

const WorkspaceImageUpload: React.FC = observer(() => {
  const { fileInput, handleSelectImage } = useImageUpload();
  const { workspaceImage } = useOnboardingStore();

  return (
    <div className="flex flex-col gap-2 items-center prose dark:prose-invert h-fit">
      <Button
        className="w-28 h-28 relative card-base rounded-3xl flex items-center justify-center bg-white p-0 overflow-hidden"
        variant="outline"
        onClick={() => fileInput.current?.click()}
      >
        {workspaceImage ? (
          <img className="w-full h-full object-cover" src={workspaceImage} alt="Workspace" />
        ) : (
          <Image size={40} className="opacity-80 text-primary" />
        )}
      </Button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleSelectImage}
      />

      <Button className="text-primary font-medium hover:bg-transparent" variant="ghost">
        Upload logo
      </Button>
    </div>
  );
});

export default WorkspaceImageUpload;
