import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/Form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useStore } from '@/stores/RootStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ChangeEvent, useRef, useState } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { observer } from 'mobx-react-lite';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/providers/contexts/useAuth';
import ImageFallback from './ImageFallback';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

type Props = { setStep: (val: number) => void };

const CreateWorkspaceOnboarding = observer(({ setStep }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userLogout } = useAuth();
  const { createWorkspaceApi, joinWorkspaceApi, setLastViewedWorkspace } =
    useStore('workspaceStore');
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [workspaceImage, setWorkspaceImage] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const workspace = await createWorkspaceApi({ name: values.name, imgUrl: workspaceImage });

      await joinWorkspaceApi(workspace.uuid);
      setLastViewedWorkspace();
      setStep(2);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;
      setWorkspaceImage(imageBase64);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background relative">
      <div className="card bg-card rounded-2xl p-6 py-10 w-full border border-border flex flex-col items-center gap-2 max-w-md">
        <h2 className="text-2xl font-bold">Create a workspace</h2>
        <p className="text-center text-secondary">
          This can be any topic you are interested in studying. Later, you can invite friends to
          join in.
        </p>

        <div className="flex flex-col gap-2  my-8 items-center">
          <div className="w-28 h-28 relative flex flex-col items-center gap-4 rounded-lg overflow-hidden">
            {workspaceImage ? (
              <img className="w-full h-full  " src={workspaceImage} />
            ) : (
              <ImageFallback onClick={() => fileInput.current?.click()} />
            )}

            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleSelectImage}
            />
          </div>
          <p className="text-secondary text-blue-200">Upload logo</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-6 max-w-xs"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <Input placeholder="Enter a workspace name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={`font-medium gap-2 ${isLoading && 'opacity-50'}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving Workspace...' : 'Create workspace'}
              {isLoading ? <Spinner size={6} /> : <ArrowRightCircle size={18} />}
            </Button>
          </form>
        </Form>
      </div>
      <Button onClick={userLogout} variant="outline">
        Logout
      </Button>
    </div>
  );
});

export default CreateWorkspaceOnboarding;