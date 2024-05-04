import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useStore } from '@/stores/RootStore';
import { getValidPrimaryColor } from '@/utils/getValidPrimaryColor';
import { primaryColors } from '@/utils/primaryColors';
import { observer } from 'mobx-react-lite';

const PrimaryColorSelection = observer(() => {
  const { primaryColor, updatePrimaryColorApi } = useStore('userPreferencesStore');

  const colorSelectOptions = primaryColors.map((color: string) => (
    <SelectItem key={color} value={color}>
      <div className="flex items-center gap-4">
        <div className={`w-6 h-6 rounded-lg ${`bg-${color}-500`}`} />
        {`${color.charAt(0).toUpperCase()}${color.substring(1).toLowerCase()}`}
      </div>
    </SelectItem>
  ));

  const handlePrimaryColorSelect = (value: string) => {
    updatePrimaryColorApi(getValidPrimaryColor(value));
  };

  return (
    <div className="flex flex-col gap-4 prose dark:prose-invert">
      <h6 className="text-main text-sm">PRIMARY COLOR</h6>
      <Select onValueChange={handlePrimaryColorSelect} defaultValue={primaryColor}>
        <SelectTrigger className="h-10 text-main">
          <SelectValue placeholder="Select primary color" />
        </SelectTrigger>
        <SelectContent className="max-h-48">{colorSelectOptions}</SelectContent>
      </Select>
    </div>
  );
});

export default PrimaryColorSelection;
