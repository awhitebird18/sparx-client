import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pencil } from 'react-bootstrap-icons';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';

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
import Modal from '@/components/modal/Modal';
import { useStore } from '@/stores/RootStore';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';

import { User } from '@/features/users/types/user';

const formSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
});

type ProfileModalProps = { userId: string };

const ProfileModal = ({ userId }: ProfileModalProps) => {
  const { findUserByUuid, updateUserApi, uploadProfileImageApi, currentUser } =
    useStore('userStore');
  const [user, setUser] = useState<User>();

  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      const user = findUserByUuid(userId);

      if (!user) return;

      return {
        firstName: user?.firstName,
        lastName: user?.lastName,
      };
    }, [findUserByUuid, userId]),
  });

  useEffect(() => {
    setUser(findUserByUuid(userId));
  }, [currentUser, findUserByUuid, userId]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const updatedUser = await updateUserApi(values);
    setIsEditing(false);
    setUser(updatedUser);
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

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      const updatedUser = await uploadProfileImageApi(imageBase64);

      setUser(updatedUser);
    };

    reader.readAsDataURL(file);
  };

  if (!user || !currentUser) return;

  const transformedImage = transformCloudinaryUrl(user.profileImage, 120, 120);

  return (
    <Modal title={isEditing ? 'Edit your profile' : 'View Profile'}>
      <Form {...form}>
        <div className="flex gap-10 mt-4 ">
          <div className="flex flex-col items-center gap-4 flex-1 w-full">
            <UserAvatar size={165} userId={user.uuid} profileImage={transformedImage} />
            {user.uuid === currentUser.uuid && (
              <Button
                variant="ghost"
                className="text-userMedium hover:text-userMedium w-full cursor-pointer border border-userMedium"
                onClick={(e) => {
                  e.preventDefault();

                  if (fileInput.current) {
                    fileInput.current.click();
                  }
                }}
              >
                Change profile image
              </Button>
            )}
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
            className="flex flex-col w-max space-y-4"
          >
            <div className="flex flex-col flex-1 space-y-4 w-96 mb-4">
              <div className="space-y-2">
                <div className="text-2xl flex items-center gap-4">
                  <Username firstName={user.firstName} lastName={user.lastName} />
                  {!isEditing && user.uuid === currentUser.uuid && (
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
                    <FormLabel className="text-base font-semibold">First name</FormLabel>
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
                          className="text-base text-muted-foreground"
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
                          className="text-base text-muted-foreground"
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
                  <Button onClick={handleCancelEdit} variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
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
