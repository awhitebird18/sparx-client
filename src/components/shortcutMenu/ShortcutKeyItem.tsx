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

export default ShortcutKeyItem;
