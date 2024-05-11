import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useStore } from '@/stores/RootStore';
import { useOnboardingStore } from './useOnboardingStore';
import { ONBOARDING_STEPS } from '../utils/onboardingSteps';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

export function useWorkspaceForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });
  const { createWorkspaceAndJoinApi, setLastViewedWorkspace } = useStore('workspaceStore');
  const { setIsLoading, setStep, workspaceImage } = useOnboardingStore();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createWorkspaceAndJoinApi({
        name: values.name,
        imgUrl: workspaceImage,
      });

      setLastViewedWorkspace();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setStep(ONBOARDING_STEPS.ROADMAP);
    }
  }

  const handleFormSubmit = form.handleSubmit(onSubmit);

  return { form, handleFormSubmit };
}
