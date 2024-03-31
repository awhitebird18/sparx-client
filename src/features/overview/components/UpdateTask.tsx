'use client';

import Modal from '@/components/modal/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/RootStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { observer } from 'mobx-react-lite';
import { Calendar2 } from 'react-bootstrap-icons';

const formSchema = z.object({
  name: z.string().min(2).max(30),
  dueDate: z.date({
    required_error: 'A due date is required.',
  }),
});

const UpdateTask = ({ task, onSubmit }: any) => {
  const { setActiveModal } = useStore('modalStore');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(() => {
      return {
        name: task?.name,
        dueDate: task ? new Date(task.dueDate) : new Date(),
      };
    }, [task]),
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      await onSubmit(values);
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  }

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <Modal title={task ? 'Update task' : 'Create task'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-2 flex flex-col space-y-12 w-72"
        >
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && 'text-muted-foreground'
                          }`}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <Calendar2 className="ml-auto h-4 w-4 opacity-30 !z-[200]" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-red-200 " align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(day) => {
                          if (day) {
                            field.onChange(day);
                          }
                        }}
                        // disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex ml-auto gap-3 mt-10">
            <Button
              type="button"
              className="ml-auto w-28"
              variant="outline"
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
            <Button className="ml-auto w-28" type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default observer(UpdateTask);
