import Modal from '@/layout/modal/Modal';
import { Form } from '@/components/ui/Form';
import { useStore } from '@/stores/RootStore';
import { Button } from '@/components/ui/Button';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';
import { Task } from '../types/task';
import { CreateTask } from '../types/createTask';
import useUpdateTaskForm, { formSchema } from '@/hooks/useUpdateTaskForm';
import TaskNameField from './TaskNameField';
import DueDateField from './DueDateField';

export type Props = { task: Task; onSubmit: (data: Partial<CreateTask>) => void };

const UpdateTask = observer(({ task, onSubmit }: Props) => {
  const { closeModal } = useStore('modalStore');
  const form = useUpdateTaskForm(task);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      onSubmit(values);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal title={task ? 'Update task' : 'Create task'}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-2 flex flex-col space-y-12 w-72"
        >
          <div className="flex flex-col gap-8">
            <TaskNameField form={form} />
            <DueDateField form={form} />
          </div>

          <div className="flex ml-auto gap-3 mt-10">
            <Button type="button" className="ml-auto w-28" variant="outline" onClick={closeModal}>
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
});

export default UpdateTask;
