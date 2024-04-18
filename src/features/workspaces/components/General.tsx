import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transformCloudinaryUrl } from '@/utils/transformCloudinaryUrl';
import workspaceNight from '@/assets/images/lgoo.png';
import workspaceDay from '@/assets/images/workspaceDay.png';
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
import { useStore } from '@/stores/RootStore';
import { Camera } from 'react-bootstrap-icons';
import { Switch } from '@/components/ui/Switch';

const formSchema = z.object({
  name: z.string().min(2).max(30),
});

const General = () => {
  const { currentWorkspace, updateWorkspaceApi, uploadWorkspaceImageApi } =
    useStore('workspaceStore');

  const [tempImg, setTempImg] = useState<any>(null);

  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return {
        name: currentWorkspace?.name,
      };
    }, [currentWorkspace]),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (!currentWorkspace) return;

    await updateWorkspaceApi(currentWorkspace.uuid, values);
    setIsEditing(false);
  }

  const handleUpdateWorkspace = async (values: any) => {
    if (!currentWorkspace) return;

    await updateWorkspaceApi(currentWorkspace.uuid, values);
    setIsEditing(false);
  };

  const handleEditForm = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !currentWorkspace) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;
      setTempImg(imageBase64);

      await uploadWorkspaceImageApi(currentWorkspace.uuid, imageBase64);
      setTempImg(null);
    };

    reader.readAsDataURL(file);
  };

  if (!currentWorkspace) return;

  function getCurrentWorkspaceImage() {
    const hour = new Date().getHours(); // Gets the current hour (0-23)
    const isDaytime = hour > 6 && hour < 18; // Define day time (e.g., 6 AM to 6 PM)

    if (isDaytime) {
      return workspaceDay; // Return the day image if it's day time
    } else {
      return workspaceNight; // Return the night image if it's night time
    }
  }

  return (
    <div className="h-full overflow-auto flex flex-col p-6 gap-10">
      <Form {...form}>
        <div className="flex gap-10 justify-between border-b border-border pb-10">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col w-max space-y-4"
          >
            <div className="flex flex-col flex-1 space-y-4 w-80">
              {/* <div className="text-2xl flex items-center gap-4 relative">
                {!isEditing && (
                  <Button
                    className="absolute top-0 right-0 h-7 py-0 gap-2 text-base text-muted-foreground"
                    size="sm"
                    variant="outline"
                    onClick={handleEditForm}
                    type="button"
                  >
                    <Pencil className="text-sm" /> Edit
                  </Button>
                )}
              </div> */}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem onDoubleClick={handleEditForm} className="cursor-pointer">
                    <FormLabel className="text-sm font-semibold">Workspace name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        className="text-base !cursor-pointer border-none"
                        placeholder="Enter workspace name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDescription className="pl-3">
                This is your publicly displayed username
              </FormDescription>
            </div>
          </form>
          <div className="w-28 h-28 relative flex flex-col items-center gap-4 rounded-lg overflow-hidden border border-border card">
            <img
              className="w-full h-full"
              src={tempImg ?? currentWorkspace.imgUrl ?? getCurrentWorkspaceImage()}
            />

            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();

                if (fileInput.current) {
                  fileInput.current.click();
                }
              }}
              className="flex flex-col items-center w-full h-full absolute top-0 left-0 hover:opacity-50 opacity-0 hover:bg-black transition-colors duration-200"
            >
              <Camera size={20} /> Change
            </Button>

            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleSelectImage}
            />
          </div>
        </div>
      </Form>
      <div className="space-y-2 flex-1">
        <h3 className="font-bold">Privacy</h3>

        <div className="space-y-10">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Workpace searchable</p>
              <p className="text-sm font-semibold text-muted">
                Allows users to search and view this workspace on the global repository.
              </p>
            </div>
            <Switch
              checked={currentWorkspace.isPrivate}
              onCheckedChange={(val) => handleUpdateWorkspace({ isPrivate: val })}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Work</p>
              <p className="text-sm font-semibold text-muted">
                Allows members of your workspace to invite other users.
              </p>
            </div>
            <Switch
              checked={currentWorkspace.allowInvites}
              onCheckedChange={(val) => handleUpdateWorkspace({ allowInvites: val })}
            />
          </div>
        </div>
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
    </div>
  );
};

export default observer(General);
