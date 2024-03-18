import { Button } from '@/components/ui/Button';

const AccountTab: React.FC = () => (
  <div>
    <div className="flex flex-col gap-4 items-start">
      <h3 className="text-sm font-semibold">DANGER ZONE</h3>
      <p className="text-sm font-semibold text-muted">
        Once you delete your account, there is no going back.
      </p>
      <Button className="h-8 text-sm font-semibold" variant="destructive">
        Delete Account
      </Button>
    </div>
  </div>
);

export default AccountTab;
