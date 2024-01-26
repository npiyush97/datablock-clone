import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, disabled, type = 'button', ...props }) => {
  return (
    <button
      type={type}
      className={twMerge(
        `bg-navy-500 w-full text-white p-2 uppercase text-xs tracking-wider transition ${className}`
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
