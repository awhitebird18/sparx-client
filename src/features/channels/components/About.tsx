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
import { useStore } from '@/stores/RootStore';
import { Channel } from '..';

const formSchema = z.object({
  topic: z.string().max(200),
  description: z.string().max(200),
});

const About = ({ channel }: { channel: Channel }) => {
  const { updateChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateChannel(channel.uuid, values);
    setActiveModal(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col max-w-lg">
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a topic" {...field} multiple />
              </FormControl>
              <FormDescription>This is your publicly displayed channel topic</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a description" {...field} multiple />
              </FormControl>
              <FormDescription>This is your publicly displayed channel description</FormDescription>
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

export default About;
