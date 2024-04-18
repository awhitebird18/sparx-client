import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useRef } from 'react';
import { CardText, GripVertical, X } from 'react-bootstrap-icons';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { Field as FieldType } from '../types/Field';
import { Button } from '@/components/ui/Button';

const TemplateCard = ({ side }: { side: 'front' | 'back' }) => {
  const { selectedVariant, addVariantField, removeVariantFieldApi } = useStore('flashcardStore');
  const ref = useRef<HTMLDivElement>(null);
  // Drag drop

  const canDropHandler = useCallback((item: FieldType) => {
    if (item) {
      return true;
    }
    return false;
  }, []);

  const collectHandler = (monitor: DropTargetMonitor) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  // const reorderFields = async (draggedSectionId: string, newPosition: number) => {
  //   if (!fields?.length) return;
  //   // Find the section that is being dragged
  //   const draggedSection = fields.find((section) => section.uuid === draggedSectionId);

  //   if (!draggedSection) {
  //     console.error(`Could not find section with id ${draggedSectionId}`);
  //     return;
  //   }

  //   // Remove the dragged section from its current position
  //   const filteredFields = fields.filter((section) => section.uuid !== draggedSectionId);

  //   // Insert it into its new position
  //   const reorderedFields = filteredFields.splice(newPosition, 0, draggedSection);

  //   // Optionally, you can update the `orderIndex` for all items to reflect the new order
  //   const fieldIndexes = [...filteredFields.map((s, i) => ({ ...s, orderIndex: i }))];

  //   const sectionOrderIndexs = fields.map((field: any) => ({
  //     uuid: field.uuid,
  //     orderIndex: field.orderIndex,
  //   }));

  //   const sections = await flashcardsApi.updateSectionOrder(sectionOrderIndexs);

  //   this.setSections(sections);
  // };

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
          {fields.map((field: FieldType, index: number) => (
            <Field field={field} onRemove={() => handleRemoveField(field)} index={index} />
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
};

export default observer(TemplateCard);

// interface DraggedItem {
//   type: string;
//   id: string;
//   index: number;
//   sectionId: string;
// }

const Field = ({ field, onRemove }: any) => {
  // const [isOverTopHalf, setIsOverTopHalf] = useState(false);
  // const [isOverBottomHalf, setIsOverBottomHalf] = useState(false);

  // const [, dragRef] = useDrag(() => ({
  //   type: 'field',
  //   item: { id: field.id, type: 'field', index },
  //   collect: () => ({}),
  // }));

  // // React dnd drop handler
  // const handleDrop = useCallback(
  //   async (item: DraggedItem, monitor: DropTargetMonitor) => {
  //     setIsOverTopHalf(false);
  //     setIsOverBottomHalf(false);

  //     // Determine rectangle on screen
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //     if (!hoverBoundingRect) return;
  //     // Get vertical middle
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();
  //     if (!clientOffset) return;

  //     const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  //     if (hoverClientY > hoverMiddleY && item.index - section.orderIndex === 1) {
  //       return;
  //     }
  //     if (hoverClientY < hoverMiddleY && item.index - section.orderIndex === -1) {
  //       return;
  //     }

  //     if (hoverClientY < hoverMiddleY && item.index < section.orderIndex) {
  //       reorderSections(item.id, section.orderIndex);
  //     }

  //     if (hoverClientY > hoverMiddleY && item.index < section.orderIndex) {
  //       reorderSections(item.id, section.orderIndex);
  //     }

  //     if (hoverClientY < hoverMiddleY && item.index > section.orderIndex) {
  //       reorderSections(item.id, section.orderIndex);
  //     }

  //     if (hoverClientY > hoverMiddleY && item.index > section.orderIndex) {
  //       reorderSections(item.id, section.orderIndex + 1);
  //     }
  //   },
  //   [section.orderIndex, reorderSections, section.uuid, updateChannelSectionApi, uuid],
  // );
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
