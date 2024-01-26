import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { SelectOption } from '../types';

interface SelectDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  value?: string;
  key?: string;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  label,
  key,
  className,
  options,
  value,
  onChange,
  ...props
}) => {
  const stopPropagation = (e: React.MouseEvent<HTMLSelectElement | HTMLOptionElement>) => {
    e.stopPropagation();
  };

  return (
    <div key={key} className="flex flex-col gap-1 mb-3">
      <label className="text-gray-400 text-sm">{label}:</label>
      <select
        className={twMerge(
          `text-sm outline-none bg-navy-600 border border-navy-400 text-white p-1 rounded-md px-2 min-w-[230px] ${className}`
        )}
        value={value || ''}
        onChange={onChange}
        onClick={stopPropagation}
        {...props}
      >
        {options.length == 0 ? (
          <option
            disabled
            selected
            value=""
            className="text-xs lowercase"
            onClick={stopPropagation}
          >
            <>&larr; connect dataset...</>
          </option>
        ) : (
          options?.map((option) => (
            <option
              value={option.value || option.text}
              className="text-xs"
              key={option.text}
              onClick={stopPropagation}
            >
              {option.text}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default SelectDropdown;
