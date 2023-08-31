import { Lock } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';

import { Channel } from '../types';

const Settings = ({ channel }: { channel: Channel }) => {
  const { setActiveModal } = useStore('modalStore');

  const handleOpenConfirmModal = () => {
    setActiveModal({ type: 'ConfirmChannelTypeChange', payload: { channel } });
  };

  return (
    <div className="space-y-2 py-1.5">
      <Button
        variant="outline"
        className="gap-3 w-full justify-start p-6 text-base"
        onClick={handleOpenConfirmModal}
      >
        <Lock size="20" />
        Change to a private channel
      </Button>
    </div>
  );
};

export default Settings;
