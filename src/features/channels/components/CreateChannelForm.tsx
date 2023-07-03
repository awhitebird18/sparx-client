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

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const CreateChanneForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Private</FormLabel>
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

export default CreateChanneForm;
