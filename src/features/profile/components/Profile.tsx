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
import { useAuth } from '@/providers/auth';
import Modal from '@/components/modal/Modal';
import { User } from '@/features/users';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/stores/RootStore';
import UserAvatar from '@/features/users/components/UserAvatar';
import { Pencil } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import { uploadProfileImage } from '@/features/users/api/uploadProfileImage';
import { updateUserApi } from '@/features/users/api/updateUser';

const formSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
});

type ProfileModalProps = { userId: string };
const ProfileModal = ({ userId }: ProfileModalProps) => {
  const { findUser, updateUser } = useStore('userStore');
  const [user, setUser] = useState<User>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    },
  });

  useEffect(() => {
    setUser(findUser(userId));
  }, [currentUser, findUser, userId]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const updatedUser = await updateUserApi(userId, values);

    updateUser(userId, { firstName: updatedUser.firstName, lastName: updatedUser.lastName });
  }

  const handleEditForm = () => {
    setIsEditing(true);
    if (userId === currentUser?.uuid) {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      const updatedUser = await uploadProfileImage(currentUser?.uuid as string, imageBase64);

      console.log(updatedUser);

      updateUser(updatedUser.uuid, { profileImage: updatedUser.profileImage });
    };

    reader.readAsDataURL(file);
  };

  return (
    <Modal title={isEditing ? 'Edit your profile' : 'View Profile'}>
      <Form {...form}>
        <div className="flex gap-10 mt-4">
          <div className="flex flex-col items-center gap-6">
            <UserAvatar size={165} userId={currentUser?.uuid} />
            <Button
              variant="outline"
              className="text-indigo-500 w-full"
              onClick={(e) => {
                e.preventDefault();

                fileInput.current.click();
              }}
            >
              Change profile image
            </Button>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleSelectImage}
            />
          </div>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col w-max space-y-6"
          >
            <div className="flex flex-col flex-1 space-y-6 w-96 mb-6">
              <div className="space-y-2">
                <div className="text-2xl flex items-center gap-4">
                  <p>Shanu Shanu</p>
                  {!isEditing && (
                    <Button
                      className="h-7 py-0 gap-2 text-base text-muted-foreground"
                      size="sm"
                      variant="outline"
                      onClick={handleEditForm}
                      type="button"
                    >
                      <Pencil className="text-sm" /> Edit
                    </Button>
                  )}
                </div>
                <FormDescription>This is your publicly displayed username</FormDescription>
              </div>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">First name</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          className="text-base"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      ) : (
                        <p
                          style={{ height: '37.5px', paddingLeft: '0.8rem', paddingTop: '0.55rem' }}
                          className="text-base"
                        >
                          {user?.firstName}
                        </p>
                      )}
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
                    <FormLabel className="text-base">Last name</FormLabel>
                    <FormControl>
                      {isEditing ? (
                        <Input
                          className="text-base"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      ) : (
                        <p
                          style={{ height: '37.5px', paddingLeft: '0.8rem', paddingTop: '0.55rem' }}
                          className="text-base"
                        >
                          {user?.lastName}
                        </p>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 w-fit ml-auto h-10">
              {isEditing ? (
                <>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                  <Button className="bg-indigo-600 text-white" type="submit">
                    Save Changes
                  </Button>
                </>
              ) : null}
            </div>
          </form>
        </div>
      </Form>
    </Modal>
  );
};

export default observer(ProfileModal);
