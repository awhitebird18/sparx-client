import React from 'react';
import { primaryColors } from '@/utils/primaryColors';
import { useOnboardingStore } from '../hooks/useOnboardingStore';

const PrimaryColorPicker: React.FC = () => {
  const { selectedColor, setSelectedColor } = useOnboardingStore();

  const handleSelectPrimaryColor = (primaryColor: string) => {
    setSelectedColor(primaryColor);
  };

  return (
    <div className="flex justify-between w-full">
      {primaryColors
        .filter((color, index) => index % 3 === 0 && color)
        .map((color, index) => (
          <div
            key={index}
            onClick={() => handleSelectPrimaryColor(color)}
            className={`w-11 h-11 bg-${color}-500 rounded-lg border cursor-pointer border-transparent ${
              selectedColor === color && '!border-white border-4 shadow shadow-white'
            }`}
          />
        ))}
    </div>
  );
};

export default PrimaryColorPicker;
