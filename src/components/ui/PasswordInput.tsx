import { forwardRef, useState } from 'react';
import { Button } from './Button';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Input, InputProps } from './Input';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-1 relative">
      <Input type={showPassword ? 'text' : 'password'} {...props} ref={ref} />

      <Button
        size="icon"
        variant="ghost"
        className="absolute top-0 right-1 hover:bg-inherit"
        onClick={() => setShowPassword((prev: boolean) => !prev)}
        type="button"
        tabIndex={-1}
      >
        {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
});

export default PasswordInput;
