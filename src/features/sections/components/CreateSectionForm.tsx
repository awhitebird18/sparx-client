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
import { SectionTypes } from '../types/sectionEnums';
import { useStore } from '@/stores/stores';
import Modal from '@/components/modal/Modal';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const CreateSectionForm = () => {
  const { createSection } = useStore('sectionStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createSection({ name: values.name, type: SectionTypes.ANY });
  }

  return (
    <Modal title="Create Section">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col max-w-lg">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a section name" {...field} />
                </FormControl>
                <FormDescription>This is the name of your new sidebar section</FormDescription>
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

export default CreateSectionForm;
