import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<
    Partial<{
      firstName: string;
      lastName: string;
      location: string;
      bio: string;
      goal: string;
      webUrl: string;
    }>
  >;
  name: 'firstName' | 'lastName' | 'location' | 'bio' | 'goal' | 'webUrl';
  label: string;
  placeholder: string;
};

const UserDetailsFormField = ({ form, name, label, placeholder }: Props) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-1">
        <FormLabel className="text-base">{label}</FormLabel>
        <FormControl>
          <Input className="text-base rounded-lg" placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default UserDetailsFormField;
