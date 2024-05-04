import { Task } from '@/features/tasks/types/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(2).max(30),
  dueDate: z.date(),
});

const useUpdateTaskForm = (task: Task) => {
  return useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(
      () => ({
        name: task?.name,
        dueDate: task ? new Date(task.dueDate) : new Date(),
      }),
      [task],
    ),
  });
};

export default useUpdateTaskForm;
