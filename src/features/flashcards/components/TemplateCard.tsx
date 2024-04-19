import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef } from 'react';
import { CardText } from 'react-bootstrap-icons';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { Field as FieldType } from '../types/Field';
import TemplateField from './TemplateField';

type TemplateCardProps = { side: 'front' | 'back' };

const TemplateCard = observer(({ side }: TemplateCardProps) => {
  const { selectedVariant, addVariantField, removeVariantFieldApi } = useStore('flashcardStore');
  const ref = useRef<HTMLDivElement>(null);

  const canDropHandler = useCallback((item: FieldType) => {
    if (item) {
      return true;
    }
    return false;
  }, []);

  const collectHandler = (monitor: DropTargetMonitor) => ({
    isOver: !!monitor.isOver(),
  });

  const handleDrop = useCallback(
    (item: FieldType) => {
      if (!item || !selectedVariant) return;
      addVariantField(selectedVariant.uuid, { fieldId: item.uuid, cardSide: side });
    },
    [addVariantField, selectedVariant, side],
  );

  const dropSpec = useMemo(
    () => ({
      accept: 'field-item',
      drop: handleDrop,
      canDrop: canDropHandler,
      collect: collectHandler,
    }),
    [canDropHandler, handleDrop],
  );

  const [{ isOver }, drop] = useDrop(dropSpec);

  drop(ref);

  const fields = selectedVariant?.[side === 'front' ? 'frontFields' : 'backFields'];

  const handleRemoveField = (field: any) => {
    if (!selectedVariant) return;

    removeVariantFieldApi(selectedVariant.uuid, {
      fieldId: field.uuid,
      cardSide: side,
    });
  };

  return (
    <div
      ref={ref}
      className={`rounded-xl w-1/2 p-6 relative shadow-md card bg-hover ${
        isOver && 'outline-dashed outline-primary'
      }`}
    >
      <h2 className="m-0 mb-4">{side === 'front' ? 'Front side' : 'Back side'}</h2>

      {fields ? (
        <div className="space-y-3 my-2">
          {fields.map((field: FieldType) => (
            <TemplateField field={field} onRemove={() => handleRemoveField(field)} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted/70">
          <CardText size={100} />
          <h2 className="text-muted/70 m-0">Drag fields here</h2>
        </div>
      )}
    </div>
  );
});

export default TemplateCard;
