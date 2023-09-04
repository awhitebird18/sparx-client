import { Link } from 'react-bootstrap-icons';
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

const formSchema = z.object({
  email: z.string().email(),
});

const InviteUserForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await authApi.inviteUser({ email: values.email });
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal title="Invite user to Sparx">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start w-96">
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
          <Button
            variant="ghost"
            className="text-blue-500 font-semibold flex items-center gap-2 hover:bg-transparent px-0"
          >
            <Link size={24} />
            Copy invite link
          </Button>

          <Button className="ml-auto" type="submit">
            Send Invite
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default InviteUserForm;
