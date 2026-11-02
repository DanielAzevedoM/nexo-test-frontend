import React from 'react';

interface QuickOptionsProps {
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export const QuickOptions: React.FC<QuickOptionsProps> = ({
  options,
  selectedOption,
  onSelect,
  disabled = false,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {options.map((opt) => {
        const isSelected = selectedOption === opt;

        return (
          <button
            key={opt}
            onClick={() => !disabled && onSelect(opt)}
            disabled={disabled}
            className={`px-3 py-[7px] rounded-[8px] text-[13.5px] font-medium transition-all ${
              isSelected
                ? 'bg-[#0285F712] border border-[#0285F7] text-[#0069C7]'
                : 'bg-white border border-[#E6E8EC] text-[#1B2431] hover:border-[#1B243133] hover:bg-gray-50 shadow-sm'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
};

