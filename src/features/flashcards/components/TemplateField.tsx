import { Button } from '@/components/ui/Button';
import { GripVertical, X } from 'react-bootstrap-icons';
import { Field } from '../types/field';

type TemplateFieldProps = { field: Field; onRemove: () => void };

const TemplateField = ({ field, onRemove }: TemplateFieldProps) => {
  return (
    <div
      key={field.uuid}
      className="card flex items-center border border-border bg-card h-9 rounded-lg px-2 pr-4 gap-2 w-full justify-between"
    >
      <div className="flex items-center gap-1 cursor-grab">
        <GripVertical size={18} /> {field.title}
      </div>
      <Button className="h-6 w-6 p-0" variant="ghost" onClick={onRemove}>
        <X size={24} />
      </Button>
    </div>
  );
};

export default TemplateField;
