import { Button } from "@/components/ui/Button";

const IconButton = ({ icon, active, onClick }: any) => {
  return (
    <Button
      onClick={onClick}
      className={`w-8 h-8 p-0 border-none rounded-none ${active && "bg-violet-700 text-white"}`}
      variant="outline"
    >
      {icon[0].toUpperCase()}
    </Button>
  );
};

export default IconButton;
