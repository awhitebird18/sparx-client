import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const WorkspaceForm = observer(() => {
  const { currentWorkspace, updateWorkspaceApi } = useStore('workspaceStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return {
        name: currentWorkspace?.name,
      };
    }, [currentWorkspace]),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentWorkspace) return;
    await updateWorkspaceApi(currentWorkspace.uuid, values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter workspace name" />
              </FormControl>
              <FormDescription>This is your publicly displayed workspace name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
});

export default WorkspaceForm;
