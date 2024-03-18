import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const ConfirmCode = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center gap-2 max-w-sm">
        <div className="logo-container">
          <img src="logo.svg" alt="app logo" />
        </div>

        <h3 className="text-xl">Check your email to continue</h3>
        <div className="text-center text-muted-foreground">
          <p>We've sent an email to example@email.com</p>
          <p>Log in with the magic link or enter the code below:</p>
        </div>

        <div className="relative">
          <div className="my-8 flex w-full gap-4 items-center justify-between">
            <Input className="w-1/6 h-12 text-center text-xl" maxLength={1} />
            <Input className="w-1/6 h-12 text-center text-xl" maxLength={1} />
            <Input className="w-1/6 h-12 text-center text-xl" maxLength={1} />
            <div className="h-2 rounded-md w-6 flex-shrink-0 bg-border" />
            <Input className="w-1/6 h-12 text-center text-xl" maxLength={1} />
            <Input className="w-1/6 h-12 text-center text-xl" maxLength={1} />
            <Input className="w-1/6 h-12 text-center text-xl" maxLength={1} />
          </div>
          <span className="text-emerald-400 text-lg absolute left-1/2 -translate-x-1/2 -bottom-4">
            Success
          </span>
        </div>

        <div className="flex gap-2 items-center flex-between divider w-full"></div>
        <div className="w-full my-6 gap-6 flex flex-col">
          <Button className="w-full">Continue</Button>
          <p className="text-center text-muted-foreground">
            Can't find the email? Make sure to check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCode;
