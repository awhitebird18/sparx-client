import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '@/stores/RootStore';

const formSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  location: z.string().min(2).max(30),
  bio: z.string().min(2).max(30),
  goal: z.string().min(2).max(30),
  webUrl: z.string().min(2).max(30),
});

export function useUserProfileForm(initialValues: Partial<z.infer<typeof formSchema>>) {
  const { updateUserApi } = useStore('userStore');

  async function onSubmit(values: Partial<z.infer<typeof formSchema>>) {
    await updateUserApi(values);
  }

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = formMethods.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return { formMethods, handleSubmit };
}
