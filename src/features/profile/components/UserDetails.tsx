import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Modal from '@/layout/modal/Modal';
import { useStore } from '@/stores/RootStore';
import { User } from '@/features/users/types/user';

const formSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  location: z.string().min(2).max(30),
  bio: z.string().min(2).max(30),
  goal: z.string().min(2).max(30),
  webUrl: z.string().min(2).max(30),
});

export type UserDetailsProps = { userId: string };

const UserDetails = observer(({ userId }: UserDetailsProps) => {
  const { findUserByUuid, updateUserApi, currentUser } = useStore('userStore');
  const [user, setUser] = useState<User>();
  const [userWorkspaceData] = useState({ location: '', bio: '', goal: '', webUrl: '' });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      const user = findUserByUuid(userId);
      if (!user) return;
      return {
        firstName: user?.firstName,
        lastName: user?.lastName,
        location: userWorkspaceData?.location,
        bio: userWorkspaceData?.bio,
        goal: userWorkspaceData?.goal,
        webUrl: userWorkspaceData?.webUrl,
      };
    }, [findUserByUuid, userId, userWorkspaceData]),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const updatedUser = await updateUserApi(values);

    setUser(updatedUser);
  }

  useEffect(() => {
    setUser(findUserByUuid(userId));
  }, [currentUser, findUserByUuid, userId]);

  if (!user || !currentUser) return;

  return (
    <Modal title="Profile">
      <Form {...form}>
        <div className="flex">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-8 w-80">
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base">First name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base rounded-lg"
                        placeholder="Enter your first name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base ">Last name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base rounded-lg"
                        placeholder="Enter your last name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base ">Location</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base rounded-lg"
                        placeholder="Enter your location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base ">Bio</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base rounded-lg"
                        placeholder="Enter your bio"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-base ">Goal</FormLabel>
                    <FormControl>
                      <Input
                        className="text-base rounded-lg"
                        placeholder="Enter your goal"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full bg-primary-dark border border-primary-lighter">
              Save Changes
            </Button>
          </form>
        </div>
      </Form>
    </Modal>
  );
});

export default UserDetails;
