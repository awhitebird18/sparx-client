import Modal from '../modal/Modal';

const ShortcutMenu = () => {
  return (
    <Modal title="Keyboard shortcuts">
      <div className="flex flex-col space-y-3 w-96">
        <Title title="Nodemap actions" />
        <div className="flex flex-col gap-2">
          <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
          <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
          <ShortcutKeyItem label="Focus on active node" keys={['Ctrl', '.']} />
        </div>
      </div>
    </Modal>
  );
};

export default ShortcutMenu;

const Title = ({ title }: { title: string }) => (
  <h4 className="font-medium text-sm text-muted">{title}</h4>
);

const ShortcutKeyItem = ({ label, keys }: { label: string; keys: string[] }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <div className="flex items-center gap-2">
      {keys.map((key) => (
        <KeyBadge label={key} />
      ))}
    </div>
  </div>
);

const KeyBadge = ({ label }: { label: string }) => (
  <div className="bg-card border border-border p-0.5 px-2 min-w-[2rem] flex items-center justify-center rounded">
    {label}
  </div>
);
