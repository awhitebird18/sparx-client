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
import { Channel } from '..';
import { Textarea } from '@/components/ui/Textarea';
import { useState } from 'react';
import Modal from '@/components/modal/Modal';

enum FieldEnum {
  TOPIC = 'topic',
  DESCRIPTION = 'description',
}

const fields = [FieldEnum.TOPIC, FieldEnum.DESCRIPTION];

const About = ({ channel }: { channel: Channel }) => {
  const [editField, setEditField] = useState<FieldEnum | null>(null);
  const { leaveChannel } = useStore('channelStore');

  const handleOpenForm = (field: FieldEnum) => {
    setEditField(field);
  };

  const handleLeaveChannel = async () => {
    await leaveChannel(channel.uuid);
  };

  return (
    <div className="flex flex-col space-y-6 pt-2 flex-1 h-full">
      {fields.map((field: FieldEnum) => (
        <Button
          className="flex-col justify-start items-start h-20 border border-border relative space-y-1"
          variant="ghost"
          onClick={() => handleOpenForm(field)}
        >
          <p className="text-md font-semibold">{field}</p>
          <p className="text-muted-foreground">{channel[field] ?? `Enter a ${field}`}</p>
          <span className="absolute top-2 right-3">
            <PencilFill />
          </span>
        </Button>
      ))}

      <Button
        className="flex-col justify-start items-start h-20 border border-border space-y-1"
        variant="ghost"
        onClick={() => console.info('copy managed')}
      >
        <p className="text-md font-semibold">Managed by:</p>
        <p className="text-muted-foreground">Channel Owner</p>
      </Button>

      <Button
        className="justify-start items-start h-12 text-rose-500 border border-border space-y-1"
        variant="ghost"
        onClick={handleLeaveChannel}
      >
        Leave Channel
      </Button>

      <div className="flex-grow" />

      <Button
        className="justify-start text-muted dark:hover:bg-transparent hover:bg-transparent p-0"
        variant="ghost"
        onClick={() => console.info('copy channel id')}
      >
        Channel ID: {channel.uuid} <Files />
      </Button>

      {editField && (
        <EditField type={editField} content={channel[editField]} channelId={channel.uuid} />
      )}
    </div>
  );
};

export default About;

const formSchema = z.object({
  topic: z.string().max(200),
  description: z.string().max(200),
});

const EditField = ({
  type,
  content,
  channelId,
}: {
  type: FieldEnum;
  content: string;
  channelId: string;
}) => {
  const { updateChannel } = useStore('channelStore');
  const { setActiveModal } = useStore('modalStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      [type]: content,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateChannel(channelId, values);
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

          <Button className="ml-auto" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Modal>
  );
};
