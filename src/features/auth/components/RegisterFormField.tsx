import { Input } from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { FieldValues, UseFormRegister, FieldError, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  label: string;
  type: 'text' | 'email' | 'password';
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: Partial<Record<keyof T, FieldError>>;
  placeholder?: string;
}

const FormField = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
  placeholder,
}: FormFieldProps<T>) => (
  <div className="relative pb-6">
    <label htmlFor={String(name)} className="block text-sm font-medium">
      {label}
    </label>
    <div className="mt-1">
      {type === 'password' ? (
        <PasswordInput {...register(name)} placeholder={placeholder || label} />
      ) : (
        <Input {...register(name)} type={type} placeholder={placeholder || label} />
      )}
    </div>
    {errors[name] && <ErrorLabel>{errors[name]?.message}</ErrorLabel>}
  </div>
);

const ErrorLabel = ({ children }: { children?: string }) => (
  <p className="absolute bottom-1.5 left-1 mt-1 text-red-500 text-xs">{children}</p>
);

export default FormField;
