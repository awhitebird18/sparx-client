import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { UseFormReturn } from 'react-hook-form';
import { Calendar } from '@/components/ui/Calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { Calendar2 } from 'react-bootstrap-icons';

type Props = {
  form: UseFormReturn<{
    name: string;
    dueDate: Date;
  }>;
};

const DueDateField = ({ form }: Props) => {
  return (
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
                  {field.value ? format(new Date(field.value), 'PPP') : <span>Pick a date</span>}
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
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DueDateField;
