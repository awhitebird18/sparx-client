import storage from '@/utils/storage';

const AppSkeleton = () => {
  const sidebarWidth = storage.getSidebarWidth() || 250;
  const appTheme = storage.getTheme() || 'light';

  const isLight = appTheme === 'light';

  const borderColor = isLight ? 'border-gray-300' : 'border-gray-800';
  const bgColor = isLight ? 'bg-white' : 'bg-background';

  return (
    <div className={`h-screen w-screen flex overflow-hidden bg-background ${bgColor}`}>
      <div className={`h-full border-r ${borderColor}`} style={{ width: `${sidebarWidth}px` }} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div
          className={`h-12 border-b ${borderColor} flex items-center justify-between pr-4 pl-3 gap-6`}
        />
        <div className="flex-1 overflow-hidden" />
      </div>
    </div>
  );
};

export default AppSkeleton;
