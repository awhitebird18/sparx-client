import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible';
import { ChevronDown } from 'react-bootstrap-icons';
import Editor from '@/features/textEditor/Editor';
import { useState } from 'react';
import { emptyInputState } from '@/utils/emptyInputState';

export type CardFieldProps = {
  title: string;
  content: string;
  onFieldChange: (value: string) => void;
};

const CardField = ({ title, content, onFieldChange }: CardFieldProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="h-2/5">
      <CollapsibleTrigger asChild>
        <div className="flex gap-2 items-center mb-2">
          <div>
            <ChevronDown size={18} />
          </div>
          <h2>{title}</h2>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="card h-full">
        <div className="relative bg-hover rounded-lg shadow-md h-full py-4">
          <Editor content={content ?? emptyInputState} onChange={onFieldChange} />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CardField;
