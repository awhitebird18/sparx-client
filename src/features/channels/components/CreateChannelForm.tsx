import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';
import { ChannelType } from '../enums';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/modal/Modal';
import { useMemo } from 'react';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const CreateChannelForm = ({
  uuid,
  id: sectionId,
  x,
  y,
}: {
  uuid?: string;
  id?: string;
  x?: number;
  y?: number;
}) => {
  const { createChannelApi, updateChannelApi, findChannelByUuid, joinChannelApi } =
    useStore('channelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');
  const { setActiveModal } = useStore('modalStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      if (!uuid)
        return {
          name: '',
          isPrivate: false,
        };

      const existingChannel = findChannelByUuid(uuid);

      return {
        name: existingChannel?.name,
        isPrivate: existingChannel?.isPrivate,
      };
    }, [findChannelByUuid, uuid]),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!currentWorkspaceId) return;

      const channelData = {
        name: values.name,
        type: ChannelType.CHANNEL,
        x,
        y,
      };

      if (uuid) {
        await updateChannelApi(uuid, channelData, currentWorkspaceId);
      } else {
        const newChannel = await createChannelApi(channelData, sectionId, currentWorkspaceId);

        await joinChannelApi({
          channelId: newChannel.uuid,
          sectionId: undefined,
        });
      }

      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  }

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <Modal title={uuid ? 'Update Channel' : 'Create Channel'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 flex flex-col space-y-12"
          style={{ width: '28rem' }}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a channel name" {...field} />
                </FormControl>
                <FormDescription>This is your publicly displayed channel name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex ml-auto gap-3 mt-10">
            <Button
              type="button"
              className="ml-auto w-28"
              variant="outline"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
            <Button className="ml-auto w-28" type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default observer(CreateChannelForm);
