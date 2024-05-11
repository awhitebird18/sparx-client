import { useState, useRef, ChangeEvent, MouseEventHandler } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { Camera } from 'react-bootstrap-icons';
import { getCurrentWorkspaceImage } from '../utils/getCurrentWorkspaceImage';
import { readFileAsDataURL } from '../utils/readFileAsDataURL';

const WorkspaceImage = observer(() => {
  const { currentWorkspace, uploadWorkspaceImageApi } = useStore('workspaceStore');
  const [tempImg, setTempImg] = useState<string | undefined>(currentWorkspace?.imgUrl);
  const fileInput = useRef<HTMLInputElement | null>(null);
  if (!currentWorkspace) return;

  const handleSelectImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageBase64 = await readFileAsDataURL(file);
    setTempImg(imageBase64);
    await uploadWorkspaceImageApi(currentWorkspace.uuid, imageBase64);
  };

  const handleClickImage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  return (
    <div className="w-28 h-28 relative flex flex-col items-center gap-4 rounded-lg overflow-hidden border border-border card">
      <img
        className="w-full h-full"
        src={tempImg ?? currentWorkspace.imgUrl ?? getCurrentWorkspaceImage()}
      />
      <OverlayButton onClick={handleClickImage} />
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

export default WorkspaceImage;

const OverlayButton = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className="flex flex-col items-center w-full h-full absolute top-0 left-0 hover:opacity-50 opacity-0 hover:bg-black transition-colors duration-200"
    >
      <Camera size={20} /> Change
    </Button>
  );
};
