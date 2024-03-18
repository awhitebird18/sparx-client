import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import authApi from '@/features/users/api';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/modal/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const formSchema = z.object({
  email: z.string().email(),
});

const InviteUserForm = () => {
  const { currentWorkspace } = useStore('workspaceStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentWorkspace) return;
    try {
      await authApi.inviteUser({ email: values.email, workspaceId: currentWorkspace.uuid });
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal title={`Invite user to ${currentWorkspace?.name}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-start w-96 space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto " type="submit">
            Send Invite
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default observer(InviteUserForm);
