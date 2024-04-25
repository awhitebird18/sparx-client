import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChangeEvent, useState } from 'react';
import roadmapApi from '@/features/nodemap/api';
import { Label } from '@/components/ui/Label';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const GenerateRoadmap = observer(() => {
  const { currentWorkspaceId } = useStore('workspaceStore');
  const [topic, setTopic] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTopic(e.target.value);
  };

  const handleSubmit = async () => {
    if (!currentWorkspaceId) return;
    const generateRoadmapPromise = roadmapApi.generateRoadmap(topic, currentWorkspaceId);
    setTopic('');
    await generateRoadmapPromise;
  };

  return (
    <Modal title="Generate Roadmap">
      <div className="flex flex-col gap-3">
        <Label>Topic</Label>
        <Input value={topic} onChange={handleChange} />
        <Button onClick={handleSubmit} className="ml-auto">
          Submit
        </Button>
      </div>
    </Modal>
  );
});

export default GenerateRoadmap;
