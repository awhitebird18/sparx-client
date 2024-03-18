import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Authenticate = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center gap-2 max-w-sm">
        <div className="logo-container">
          <img src="logo.svg" alt="app logo" />
        </div>
        <h1 className="text-4xl font-bold">EDUMAPS</h1>
        <h3 className="text-xl">Where digital learning meets flash cards</h3>

        <div className="auth-partners my-6 flex flex-col w-full gap-4">
          <Button variant="outline" className="w-full">
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full">
            Continue with Discord
          </Button>
        </div>

        <div className="flex gap-2 items-center flex-between divider w-full">
          <div className="h-px w-full bg-border" />
          <span>or</span>
          <div className="h-px w-full bg-border" />
        </div>
        <div className="w-full my-6 gap-6 flex flex-col">
          <Input className="w-full" placeholder="example.email.com" />
          <Button className="w-full">Continue</Button>
          <p className="text-center text-muted-foreground">
            By continuing, you agree to our <span className="text-primary">privacy policy</span> and{" "}
            <span className="text-primary">terms of use</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
