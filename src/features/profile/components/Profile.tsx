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
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useAuth } from '@/providers/auth';
import Modal from '@/components/modal/Modal';

const formSchema = z.object({
  username: z.string().min(2).max(30),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  company: z.string().min(2).max(30),
  department: z.string().min(2).max(30),
  location: z.string().min(2).max(30),
  phone: z.string().min(2).max(30),
});

const ProfileModal = () => {
  const { currentUser } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      company: '',
      department: '',
      location: '',
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.info(values);
  }

  const handleCancel = () => {
    console.info('handle cancel');
  };

  return (
    <Modal title="Profile">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-fit">
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar>
                <AvatarImage src={currentUser?.image} className="rounded-lg overflow-hidden" />
                <AvatarFallback children={currentUser?.firstName} />
              </Avatar>
              <Button
                variant="ghost"
                className="text-indigo-500"
                onClick={(e) => e.preventDefault()}
              >
                Change profile image
              </Button>
            </div>
            <div className="flex flex-col flex-1 space-y-4 w-96">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormDescription>This is your publicly displayed username</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deparment</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your department" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex gap-2 w-fit ml-auto">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button className="bg-indigo-600 text-white" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ProfileModal;
