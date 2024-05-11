import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

export type FormValues = z.infer<typeof formSchema>;

export function useSectionForm(defaultName: string) {
  const formMethods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultName || '',
    },
  });

  return formMethods;
}
