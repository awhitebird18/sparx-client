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
import Modal from '@/components/modal/Modal';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const CreateSectionForm = ({ id, name }: { id: string; name: string }) => {
  const { createSection, updateSection } = useStore('sectionStore');
  const { setActiveModal } = useStore('modalStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  console.log(id);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (id) {
      updateSection(id, { name: values.name });
    } else {
      createSection({ name: values.name });
    }
    setActiveModal(null);
  }

  return (
    <Modal title={name ? `Update ${name}` : 'Create Section'}>
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
                {!id && (
                  <FormDescription>This is the name of your new sidebar section</FormDescription>
                )}
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
