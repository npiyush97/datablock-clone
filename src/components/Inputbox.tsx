import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputBox = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, type, disabled, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    };

    return (
      <div>
        {label && <label className="text-gray-400 block mb-1 text-sm">{label}:</label>}
        <input
          type={type}
          className={twMerge(
            `text-sm outline-none bg-navy-600 border border-navy-400 text-white p-1.5 rounded-md px-3 min-w-[230px] mb-2 focus:ring-1 focus:ring-navy-300 ${className}`
          )}
          disabled={disabled}
          ref={ref}
          onClick={handleClick}
          {...props}
        />
      </div>
    );
  }
);

export default InputBox;
