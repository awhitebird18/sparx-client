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
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Modal from '@/layout/modal/Modal';
import { useMemo } from 'react';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

export type CreateChannelModalProps = { onSubmit: any; channelId?: string };

const CreateChannelModal = observer(({ onSubmit, channelId }: CreateChannelModalProps) => {
  const { setActiveModal } = useStore('modalStore');
  const { findChannelByUuid } = useStore('channelStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      if (!channelId)
        return {
          name: '',
          isPrivate: false,
        };

      const existingChannel = findChannelByUuid(channelId);

      return {
        name: existingChannel?.name,
        isPrivate: existingChannel?.isPrivate,
      };
    }, [channelId, findChannelByUuid]),
  });

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.name);
    handleCloseModal();
  }

  return (
    <Modal title={'Create Channel'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
});

export default CreateChannelModal;
