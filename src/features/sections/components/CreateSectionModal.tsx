import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';
import Modal from '@/layout/modal/Modal';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useSectionForm, FormValues } from '@/features/sections/hooks/useSectionForm';

export type Props = { sectionId: string; name: string };

const CreateSectionModal = observer(({ sectionId, name }: Props) => {
  const { updateSectionApi, createSectionApi } = useStore('sectionStore');
  const { closeModal } = useStore('modalStore');
  const form = useSectionForm(name);

  const onSubmit = async (values: FormValues) => {
    if (sectionId) {
      await updateSectionApi(sectionId, values);
    } else {
      await createSectionApi(values);
    }
    closeModal();
  };

  return (
    <Modal title={name ? `Update ${name}` : 'Create Section'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col max-w-xl w-96"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a section name" {...field} />
                </FormControl>
                {!sectionId && (
                  <FormDescription>This is the name of your new sidebar section</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="ml-auto w-28" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  );
});

export default CreateSectionModal;
