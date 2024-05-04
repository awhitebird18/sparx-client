import * as z from 'zod';
import { useStore } from '@/stores/RootStore';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const useCreateWorkspace = () => {
  const { createWorkspaceAndJoinApi, selectWorkspace } = useStore('workspaceStore');
  const { closeModal } = useStore('modalStore');
  const { joinChannelApi, createChannelApi } = useStore('channelStore');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const workspace = await createWorkspaceAndJoinApi(values);
      const newChannel = { name: workspace.name, x: 4000, y: 4000, isDefault: true };
      const channel = await createChannelApi(newChannel, undefined, workspace.uuid);
      await joinChannelApi({ channelId: channel.uuid });
      selectWorkspace(workspace.uuid);
      closeModal();
    } catch (error) {
      console.error('Unable to create workspace', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, closeModal };
};

export default useCreateWorkspace;
