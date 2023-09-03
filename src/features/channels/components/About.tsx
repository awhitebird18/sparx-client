import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/Form';
import { PencilFill, Files } from 'react-bootstrap-icons';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { Textarea } from '@/components/ui/Textarea';
import Modal from '@/components/modal/Modal';
import { observer } from 'mobx-react-lite';

import ChannelIcon from './ChannelIcon';

import { Channel } from '../types';
import { ChannelType } from '../enums';

enum FieldEnum {
  TOPIC = 'topic',
  DESCRIPTION = 'description',
}

const fields = [FieldEnum.TOPIC, FieldEnum.DESCRIPTION];

const About = ({ channel }: { channel: Channel }) => {
  const { currentUser } = useStore('userStore');
  const [editField, setEditField] = useState<FieldEnum | null>(null);
  const { leaveChannelApi, updateChannelApi } = useStore('channelStore');
  const { formatAutomatedMessage, createMessageApi } = useStore('messageStore');
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fileInput = useRef<any>(null);
  const isDirectChannel = channel.type === ChannelType.DIRECT;

  const handleOpenForm = (field: FieldEnum) => {
    setEditField(field);
  };

  const handleLeaveChannel = async () => {
    if (!currentUser) return;
    await leaveChannelApi(channel.uuid);

    const formattedMessage = formatAutomatedMessage({
      userId: currentUser.uuid,
      channelId: channel.uuid,
      content: `has left the channel.`,
    });

    createMessageApi(formattedMessage);
    navigate(`/app`);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result as string;

      updateChannelApi(channel.uuid, { icon: imageBase64 });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col space-y-5 pt-2 flex-1 h-full">
      {fields.map((field: FieldEnum) => (
        <Button
          key={field}
          className="flex-col justify-start items-start h-28 border border-border relative space-y-1 hover:bg-secondary/50 gap-2"
          variant="outline"
          onClick={() => handleOpenForm(field)}
        >
          <p className="text-md font-semibold">{`${field.charAt(0).toUpperCase()}${field
            .substring(1)
            .toLowerCase()}`}</p>
          <p className="text-muted-foreground text-left">{channel[field] ?? `Enter a ${field}`}</p>
          <span className="absolute top-2 right-3">
            <PencilFill />
          </span>
        </Button>
      ))}

      {!isDirectChannel && (
        <Button
          variant="outline"
          className="text-userDark w-full cursor-pointer flex justify-start h-auto gap-3 items-start p-2 hover:bg-secondary/50"
          onClick={() => {
            fileInput.current.click();
          }}
        >
          <ChannelIcon size={60} imageUrl={channel.icon} isPrivate={channel.isPrivate} />

          <p className="mt-0.5 text-primary">Change channel image</p>

          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInput}
            onChange={handleSelectImage}
          />
        </Button>
      )}

      {!isDirectChannel && (
        <Button
          className="flex-col justify-start items-start h-20 border border-border space-y-1"
          variant="ghost"
          onClick={() => console.info('copy managed')}
        >
          <p className="text-md font-semibold">Managed by:</p>
          <p className="text-muted-foreground">Channel Owner</p>
        </Button>
      )}

      {!isDirectChannel && (
        <Button
          className="justify-start items-start h-12 text-rose-500 border border-border space-y-1"
          variant="ghost"
          onClick={handleLeaveChannel}
        >
          Leave Channel
        </Button>
      )}

      <div className="flex-grow" />

      <Button
        className="justify-start text-muted dark:hover:bg-transparent hover:bg-transparent"
        variant="ghost"
        onClick={() => console.info('copy channel id')}
      >
        Channel ID: {channel.uuid} <Files />
      </Button>

      {editField && (
        <EditField type={editField} content={channel[editField] || ''} channelId={channel.uuid} />
      )}
    </div>
  );
};

export default observer(About);

const EditField = observer(
  ({ type, content, channelId }: { type: FieldEnum; content: string; channelId: string }) => {
    const formSchema = z.object({
      [type]: z.string().max(200),
    });
    const { updateChannelApi } = useStore('channelStore');
    const { setActiveModal } = useStore('modalStore');
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        [type]: content || '',
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      await updateChannelApi(channelId, values);

      setActiveModal(null);
    }

    return (
      <Modal title={`Edit ${type}`}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col pt-2 h-full w-[28rem]"
          >
            <FormField
              control={form.control}
              name={type}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder={`Enter a ${type}`} {...field} className="resize-none" />
                  </FormControl>
                  <FormDescription>{`This is your publicly displayed channel ${type}`}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="ml-auto bg-userDark hover:bg-userDark text-primary" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </Modal>
    );
  },
);
