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
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ChannelTypes } from '../types/channelEnums';
import { useStore } from '@/stores/stores';
import Modal from '@/components/modal/Modal';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const CreateChanneForm = () => {
  const { createChannel } = useStore('channelStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ name: values.name, type: ChannelTypes.PUBLIC });
    createChannel({ name: values.name, type: ChannelTypes.PUBLIC });
  }
  return (
    <Modal title="Create Channel">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col max-w-lg">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a channel name" {...field} />
                </FormControl>
                <FormDescription>This is your publicly displayed channel name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto w-28" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default CreateChanneForm;
