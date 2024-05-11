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
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Modal from '@/layout/modal/Modal';
import useCreateWorkspace from '../hooks/useCreateWorkspace';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const CreateWorkspaceModal = observer(() => {
  const { closeModal, isLoading, onSubmit } = useCreateWorkspace();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  return (
    <Modal title="Create workspace">
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
                  <Input placeholder="Enter a workspace name" {...field} />
                </FormControl>
                <FormDescription>This is your publicly displayed workspace name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex ml-auto gap-3 mt-10">
            <Button type="button" className="ml-auto w-24" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button className="ml-auto w-40" type="submit" variant="default">
              {!isLoading ? 'Create workspace' : 'Wait bitch'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
});

export default CreateWorkspaceModal;
