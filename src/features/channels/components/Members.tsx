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
import { useStore } from '@/stores/RootStore';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const Members = () => {
  const { createChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createChannel({ name: values.name, type: ChannelTypes.CHANNEL });
    setActiveModal(null);
  }
  return (
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
  );
};

export default Members;
