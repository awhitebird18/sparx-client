import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<{
    name: string;
    dueDate: Date;
  }>;
};
const TaskNameField = ({ form }: Props) => (
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
);

export default TaskNameField;
