const ShortcutMenu = () => {
  return (
    <div className="flex flex-col space-y-3 w-full h-full gap-4 prose dark:prose-invert">
      <div className="space-y-2">
        <h4>Nodemap</h4>

        <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
        <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
        <ShortcutKeyItem label="Focus on active node" keys={['Ctrl', '.']} />
        <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
        <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
      </div>
      <div className="space-y-2">
        <h4>Members</h4>

        <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
        <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
        <ShortcutKeyItem label="Focus on active node" keys={['Ctrl', '.']} />
        <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
        <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
      </div>
      <div className="space-y-2">
        <h4>Notes</h4>

        <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
        <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
        <ShortcutKeyItem label="Focus on active node" keys={['Ctrl', '.']} />
        <ShortcutKeyItem label="Snap to grid" keys={['Ctrl', 'K']} />
        <ShortcutKeyItem label="Search" keys={['Ctrl', 'F']} />
      </div>
    </div>
  );
};

export default ShortcutMenu;

const ShortcutKeyItem = ({ label, keys }: { label: string; keys: string[] }) => (
  <div className="flex justify-between">
    <p className="text-secondary">{label}</p>
    <div className="flex items-center gap-2">
      {keys.map((key) => (
        <KeyBadge label={key} />
      ))}
    </div>
  </div>
);

const KeyBadge = ({ label }: { label: string }) => (
  <div className="bg-card border border-border p-0.5 px-2 min-w-[2rem] flex items-center justify-center rounded text-secondary">
    {label}
  </div>
);
