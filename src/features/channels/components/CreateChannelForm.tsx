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

import { useStore } from '@/stores/RootStore';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/modal/Modal';
import { Checkbox } from '@/components/ui/Checkbox';

import { ChannelType } from '../enums';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const formSchema = z.object({
  name: z.string().min(2).max(30),
  isPrivate: z.boolean().default(false),
});

const CreateChannelForm = ({ id: sectionId }: { id: string }) => {
  const { createChannelApi } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      isPrivate: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const channelData = {
      name: values.name,
      type: ChannelType.CHANNEL,
      isPrivate: values.isPrivate,
    };
    const channel = await createChannelApi(channelData, sectionId);
    handleCloseModal();
    navigate(`/app/${channel.uuid}`);
  }

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <Modal title="Create Channel">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex flex-col w-96 space-y-8">
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
          <FormField
            control={form.control}
            name="isPrivate"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        if (typeof checked === 'boolean') {
                          field.onChange(checked);
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel htmlFor="make-private" className="text-primary">
                    Set Channel Private
                  </FormLabel>
                </div>
                <FormDescription>
                  Private channels can only be viewed or joined by invitation
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="flex ml-auto gap-3 mt-10">
            <Button className="ml-auto w-28" variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="ml-auto w-28 bg-userDark hover:bg-userDark text-white" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default observer(CreateChannelForm);
